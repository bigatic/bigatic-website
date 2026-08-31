import CoreImage
import Foundation
import ImageIO
import Vision

enum PortraitError: Error, CustomStringConvertible {
  case invalidArguments
  case cannotReadImage(String)
  case noForeground(String)
  case cannotRender(String)
  case cannotWriteImage(String)

  var description: String {
    switch self {
    case .invalidArguments:
      return "Uso: process-person-portrait <entrada> <salida.png> <desplazamiento-y> [fondo]"
    case .cannotReadImage(let path):
      return "No se pudo leer la imagen: \(path)"
    case .noForeground(let path):
      return "No se detectó una persona en: \(path)"
    case .cannotRender(let path):
      return "No se pudo renderizar la imagen: \(path)"
    case .cannotWriteImage(let path):
      return "No se pudo escribir la imagen: \(path)"
    }
  }
}

func loadImage(at path: String) throws -> CGImage {
  let url = URL(fileURLWithPath: path) as CFURL
  guard
    let source = CGImageSourceCreateWithURL(url, nil),
    let image = CGImageSourceCreateImageAtIndex(source, 0, nil)
  else {
    throw PortraitError.cannotReadImage(path)
  }
  return image
}

func writePng(_ image: CGImage, to path: String) throws {
  let url = URL(fileURLWithPath: path) as CFURL
  guard
    let destination = CGImageDestinationCreateWithURL(url, "public.png" as CFString, 1, nil)
  else {
    throw PortraitError.cannotWriteImage(path)
  }
  CGImageDestinationAddImage(destination, image, nil)
  guard CGImageDestinationFinalize(destination) else {
    throw PortraitError.cannotWriteImage(path)
  }
}

do {
  guard
    (CommandLine.arguments.count == 4 || CommandLine.arguments.count == 5),
    let offsetY = Double(CommandLine.arguments[3])
  else {
    throw PortraitError.invalidArguments
  }

  let inputPath = CommandLine.arguments[1]
  let outputPath = CommandLine.arguments[2]
  let image = try loadImage(at: inputPath)
  let request = VNGenerateForegroundInstanceMaskRequest()
  let handler = VNImageRequestHandler(cgImage: image, options: [:])
  try handler.perform([request])

  guard let observation = request.results?.first, !observation.allInstances.isEmpty else {
    throw PortraitError.noForeground(inputPath)
  }

  let maskBuffer = try observation.generateScaledMaskForImage(
    forInstances: observation.allInstances,
    from: handler
  )
  let source = CIImage(cgImage: image)
  let mask = CIImage(cvPixelBuffer: maskBuffer)
  let movement = CGAffineTransform(translationX: 0, y: offsetY)
  let movedSource = source.transformed(by: movement)
  let movedMask = mask.transformed(by: movement)
  let background: CIImage
  if CommandLine.arguments.count == 5 {
    let backgroundImage = CIImage(cgImage: try loadImage(at: CommandLine.arguments[4]))
    let scaleX = source.extent.width / backgroundImage.extent.width
    let scaleY = source.extent.height / backgroundImage.extent.height
    background = backgroundImage
      .transformed(by: CGAffineTransform(scaleX: scaleX, y: scaleY))
      .cropped(to: source.extent)
  } else {
    background = CIImage(
      color: CIColor(red: 220 / 255, green: 236 / 255, blue: 249 / 255)
    ).cropped(to: source.extent)
  }

  let filter = CIFilter(name: "CIBlendWithMask")!
  filter.setValue(movedSource, forKey: kCIInputImageKey)
  filter.setValue(background, forKey: kCIInputBackgroundImageKey)
  filter.setValue(movedMask, forKey: kCIInputMaskImageKey)

  let context = CIContext(options: [.useSoftwareRenderer: false])
  guard
    let output = filter.outputImage?.cropped(to: source.extent),
    let rendered = context.createCGImage(output, from: source.extent)
  else {
    throw PortraitError.cannotRender(inputPath)
  }

  try writePng(rendered, to: outputPath)
} catch {
  FileHandle.standardError.write(Data("\(error)\n".utf8))
  exit(1)
}
