# BIGATIC Website

Sitio web institucional, académico y técnico del **Semillero de Investigación BIGATIC**, adscrito al Programa de Ingeniería de Software de la Universidad de Santander (UDES), Bucaramanga, Colombia.

El sitio presenta las líneas de investigación, proyectos, integrantes, producción académica y técnica, software de investigación, noticias y convocatorias de BIGATIC. `bigatic.org` complementa —no reemplaza— el [perfil institucional en UDES](https://udes.edu.co/investigacion/institutos-y-grupos/semilleros/bigatic).

## Principios de arquitectura

- **Estático y HTML-first:** Astro genera HTML en `dist/`; producción no requiere Node.js, SSR, base de datos ni APIs propias.
- **Content-first:** las entidades académicas viven en Astro Content Collections; el copy estable de páginas se centraliza en una capa TypeScript localizada y tipada.
- **Bilingüe desde origen:** español es el idioma principal (`/`) e inglés se publica bajo `/en/`; no hay traducción automática en runtime.
- **JavaScript mínimo:** los componentes son `.astro` y el cliente solo recibe scripts para interacciones reales.
- **Portable:** la misma compilación puede publicarse en GitHub Pages o Cloudflare Pages.
- **Privacidad por defecto:** no hay cookies, cuentas, trackers ni analytics habilitados.

El flujo de datos principal es:

```text
Markdown + copy editorial + configuración institucional
                  │
                  ▼
 Content Collections + datos tipados
                  │
                  ▼
       páginas y componentes Astro
                  │
                  ▼
             build estático
                  │
                  ▼
                dist/
            ┌─────┴─────┐
            ▼           ▼
     GitHub Pages  Cloudflare Pages
```

## Stack

| Capa       | Tecnología                                      | Función                                                   |
| ---------- | ----------------------------------------------- | --------------------------------------------------------- |
| Framework  | Astro                                           | Generación estática, rutas, layouts y Content Collections |
| Lenguaje   | TypeScript estricto                             | Tipos de configuración, contenido y utilidades            |
| Estilos    | Tailwind CSS 4 + CSS custom properties          | Utilidades, tokens y estilos globales                     |
| Tipografía | IBM Plex Sans Variable, empaquetada en el build | Interfaz y lectura editorial sin dependencia de CDN       |
| Iconos     | Lucide Astro                                    | Iconografía lineal consistente                            |
| Validación | Astro check, ESLint y Prettier                  | Tipos, calidad y formato                                  |
| SEO        | `@astrojs/sitemap`, metadatos y JSON-LD         | Sitemap, canonical, `hreflang` y datos estructurados      |
| Feeds      | `@astrojs/rss`                                  | RSS estático para Actualidad                              |

Las versiones concretas están fijadas por `package.json` y `package-lock.json`. No mezcle npm con otros gestores de paquetes.

## Requisitos

- Node.js 24 recomendado mediante `.nvmrc`; el rango admitido está declarado en `package.json`.
- npm, incluido con Node.js.
- Git para el flujo de contribución.

## Instalación y desarrollo

El nombre remoto previsto es `bigatic/bigatic.github.io`, pero el administrador todavía debe crear y publicar ese repositorio. Desde un checkout local ya disponible:

```bash
cd /ruta/al/checkout
nvm use
npm install
npm run dev
```

Astro mostrará la URL local en la terminal. Si el lockfile ya está actualizado y no se modificarán dependencias, `npm ci` permite una instalación reproducible.

### Comandos

| Comando                 | Propósito                                                          |
| ----------------------- | ------------------------------------------------------------------ |
| `npm run dev`           | Inicia el servidor local con recarga automática                    |
| `npm run check`         | Valida Astro, TypeScript y Content Collections                     |
| `npm run test`          | Prueba límites temporales de convocatorias con el runner de Node   |
| `npm run check:content` | Valida pares, unicidad y referencias entre entradas                |
| `npm run lint`          | Ejecuta ESLint                                                     |
| `npm run format`        | Formatea los archivos compatibles con Prettier                     |
| `npm run format:check`  | Comprueba formato sin modificar archivos                           |
| `npm run generate:og`   | Regenera `public/images/og-default.png` desde los assets oficiales |
| `npm run build`         | Genera `dist/` y verifica enlaces internos construidos             |
| `npm run check:links`   | Revisa enlaces internos de un `dist/` existente                    |
| `npm run preview`       | Sirve localmente la compilación de producción                      |
| `npm run verify`        | Ejecuta tipos, tests, integridad, lint, formato y build            |

Antes de abrir un pull request debe pasar, como mínimo:

```bash
npm run verify
```

`npm run build` no regenera la imagen Open Graph. Cuando cambien el generador o sus logos de entrada, ejecute `npm run generate:og`, revise el PNG de 1200 × 630 y versione el resultado junto con el cambio.

## Estructura del proyecto

```text
.
├── .github/workflows/       # CI y despliegue a GitHub Pages
├── docs/                    # Guías de contenido, diseño y despliegue
├── public/                  # Assets que se copian sin transformar
│   ├── branding/            # Assets oficiales BIGATIC y UDES
│   ├── posters/             # Piezas institucionales descargables
│   ├── CNAME                # Declaración portable/legacy; Settings es autoritativo
│   └── _headers             # Headers opcionales para Cloudflare Pages
├── scripts/                 # Validaciones y generación de assets derivados
├── src/
│   ├── components/          # Componentes de interfaz Astro
│   ├── content/             # Contenido localizado Markdown
│   ├── data/                # Configuración institucional y copy editorial tipado
│   ├── i18n/                # Diccionarios y equivalencias de rutas
│   ├── layouts/             # Layouts, SEO y estructura de página
│   ├── pages/               # Rutas estáticas y dinámicas ES/EN
│   ├── styles/              # Tokens y estilos globales
│   ├── utils/               # Selección, fechas y traducciones de contenido
│   └── content.config.ts    # Schemas de Content Collections
├── astro.config.mjs         # Configuración estática, dominio y sitemap
├── package.json             # Scripts, dependencias y versión de Node
└── tsconfig.json            # TypeScript estricto
```

Los valores institucionales compartidos —dominio, afiliación, ubicación, GitHub y perfil UDES— viven en `src/data/site.ts`. No deben repetirse manualmente en componentes o contenido.

El copy estable de las nueve páginas principales vive en `src/data/pages.ts`, organizado por idioma y comprobado por TypeScript. Esta capa evita duplicar redacción dentro de componentes; las entidades que crecen editorialmente (investigación, proyectos, integrantes, producción, noticias y convocatorias) permanecen en Content Collections Markdown.

## Contenido

`src/content.config.ts` es la fuente de verdad para seis colecciones:

- `research`: áreas de investigación;
- `projects`: proyectos de investigación;
- `people`: perfiles académicos;
- `outputs`: publicaciones, datasets, software y otros resultados;
- `news`: noticias y eventos;
- `calls`: convocatorias reutilizables.

Cada entrada pública debe contener información verificable. Si todavía no existe información real, se prefiere un estado vacío o `draft: true` en las colecciones que lo admiten, antes que datos de demostración. `projects`, `people` y `outputs` incluyen entradas sentinela técnicas con `draft: true`: mantienen registradas colecciones todavía vacías y nunca son contenido público. Las instrucciones, excepciones, convenciones de referencias y plantillas están en [docs/CONTENT.md](docs/CONTENT.md). La lógica del sistema gamificado de perfiles está especificada en [docs/RANKING.md](docs/RANKING.md).

El contenido editorial se escribe en Markdown (`.md`), no MDX. Los schemas usan `.strict()`: un campo desconocido, como el antiguo `slug`, hace fallar la validación. Use `routeSlug` para el segmento localizado de URL; se eligió ese nombre para no sobrescribir el `entry.id` que Astro deriva de la ruta del archivo. El archivo puede seguir llamándose `<slug>.md` por legibilidad.

## Internacionalización

- Español usa rutas localizadas en la raíz, por ejemplo `/proyectos/`.
- Inglés usa el prefijo `/en/`, por ejemplo `/en/projects/`.
- `src/i18n/routes.ts` centraliza las rutas equivalentes.
- `src/i18n/ui.ts` contiene cadenas de interfaz; el contenido editorial no debe vivir allí.
- Las dos versiones de una entidad comparten `translationKey`, pero pueden tener `routeSlug` localizado.
- Títulos, descripciones, cuerpo, etiquetas, fechas presentadas y metadatos se localizan; nombres propios, DOI y URLs oficiales no se traducen.

En la versión actual, las entradas públicas deben publicarse como par ES/EN para que el selector de idioma y los alternates SEO tengan un destino válido. Consulte el flujo completo en [docs/CONTENT.md](docs/CONTENT.md#traducciones).

## Despliegue

La salida de producción siempre es `dist/`:

```bash
npm run build
```

### GitHub Pages

El workflow `.github/workflows/deploy.yml` valida y despliega en cada push a `main`, admite ejecución manual y programa una reconstrucción diaria. La ejecución diaria importa porque el estado efectivo de las convocatorias se calcula durante el build: el HTML ya publicado no cambia por el paso del tiempo. GitHub puede deshabilitar schedules en repositorios públicos sin actividad durante 60 días; antes de una fecha crítica, compruebe la ejecución o use `workflow_dispatch`. En GitHub debe seleccionarse **GitHub Actions** como fuente de Pages. `astro.config.mjs` define `https://bigatic.org` como `site`. En un workflow personalizado de Actions, GitHub ignora el `CNAME` incluido en el artefacto: la asociación y verificación del dominio se realiza de forma autoritativa en **Settings → Pages**. `public/CNAME` queda solo como declaración portable/legacy de la intención del repositorio.

### Cloudflare Pages

Cloudflare Pages es el hosting preferido y puede conectarse al mismo repositorio con esta configuración:

| Ajuste            | Valor           |
| ----------------- | --------------- |
| Production branch | `main`          |
| Build command     | `npm run build` |
| Output directory  | `dist`          |

No se requiere adapter de Cloudflare ni Pages Functions. `public/_headers` es opcional: Astro lo copia como `dist/_headers`, Cloudflare lo interpreta y GitHub Pages lo ignora.

La configuración completa, los previews, el cambio de proveedor, HTTPS y el procedimiento prudente para `bigatic.org` están en [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md). Esa guía no prescribe registros DNS: el administrador debe aplicar únicamente los valores vigentes indicados por el proveedor elegido.

## Privacidad y analytics

La versión inicial no recolecta datos de visitantes y no incluye Google Analytics, píxeles, cookies ni embeds de terceros. Cloudflare Web Analytics queda como integración opcional y **deshabilitada**; activarla requiere aprobación institucional, revisión de privacidad, revisión de Content Security Policy y documentación del cambio. La necesidad de avisos o mecanismos de consentimiento debe evaluarse institucional y jurídicamente según las tecnologías activas y las jurisdicciones aplicables; no se presupone solo a partir de esta documentación técnica.

## Diseño y accesibilidad

El sistema visual deriva del póster BIGATIC 2026B: superficies claras, azul institucional, verde puntual, tipografía editorial y motivos discretos de nodos. La dirección de producto y las decisiones visuales aprobadas se consolidan en [DESIGN.md](DESIGN.md); los tokens y detalles de implementación se documentan en [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md). La implementación apunta a WCAG 2.2 AA, respeta `prefers-reduced-motion`, mantiene focus visible y ofrece estilos básicos de impresión.

## Contribuciones

El proyecto usa branches cortas, pull requests revisables y merge a `main` solo después de validar. Consulte [CONTRIBUTING.md](CONTRIBUTING.md) antes de modificar código, contenido o assets.

## Licencias y propiedad intelectual

La publicación del repositorio no implica que todo su contenido sea open source:

| Material                           | Política                                                                                                                     |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Código fuente del sitio            | Licencia MIT conforme al archivo `LICENSE`                                                                                   |
| Textos y datos editoriales         | No quedan cubiertos automáticamente por una licencia de software; requieren una política de contenido aprobada               |
| Logos BIGATIC y UDES               | Marcas institucionales excluidas de cualquier licencia de código; no deben modificarse ni reutilizarse sin autorización      |
| Fotografías, pósteres y multimedia | Se rigen por su autoría, consentimiento y licencia específica; la presencia en `public/` no concede permiso de reutilización |

La licencia MIT se limita al código fuente del sitio. `NOTICE.md` excluye expresamente nombres y marcas institucionales, logos, pósteres, fotografías y contenido editorial o académico. Para esos materiales no se debe asumir permiso de reutilización; cada contribuyente garantiza que puede aportar lo incluido.

## Mantenimiento

Revisión recomendada al menos una vez por semestre y antes de cada convocatoria:

1. comprobar integrantes, roles, enlaces académicos y afiliaciones;
2. actualizar estados y fechas de proyectos y convocatorias;
3. publicar outputs con metadatos verificables;
4. retirar o archivar información vencida sin borrar el registro histórico útil;
5. validar las dos versiones lingüísticas;
6. ejecutar `npm run verify` y revisar visualmente mobile, desktop y enlaces externos;
7. revisar dependencias mediante un PR separado, sin mezclarlo con cambios editoriales;
8. confirmar que dominio, HTTPS, sitemap, RSS, canonical y `hreflang` siguen correctos.

Las fechas de convocatoria se materializan al compilar. Después de modificar `openDate`, `closeDate` o `status`, publique un build nuevo. El schedule diario intenta actualizar GitHub Pages; verifíquelo antes de cada fecha crítica y use la ejecución manual como respaldo. Un despliegue de Cloudflare conectado solo a commits necesita además una reconstrucción en la fecha pertinente.

### Pendientes editoriales e institucionales

No deben completarse por inferencia:

- integrantes, fotografías, perfiles académicos y consentimientos de publicación;
- proyectos, investigadores responsables, financiación, aliados y repositorios públicos;
- publicaciones, DOI, datasets, releases y licencias de software;
- historia, trayectoria, misión y visión aprobadas institucionalmente;
- correo, oficina, teléfono y demás datos de contacto oficiales;
- política de licencias para código, contenido y multimedia;
- decisión institucional sobre analytics;
- fecha editorial `2026-08-11` de la noticia inicial de convocatoria, que debe verificarse porque no proviene del póster;
- fotografías reales de actividades y textos alternativos aprobados.

### Pendientes de assets

- versión vectorial oficial del logo BIGATIC, si existe y es autorizada;
- validación institucional de la imagen Open Graph implementada y definición de futuras variantes sociales;
- fotografías institucionales optimizadas, con autoría, licencia, consentimiento y `alt`;
- autorización y confirmación de vigencia del asset original UDES con sello de acreditación, conservado fuera del artefacto publicado;
- variantes oficiales futuras de marca, únicamente si UDES/BIGATIC las suministran.

No se deben recrear, modernizar ni alterar los logos para cubrir estos pendientes.
