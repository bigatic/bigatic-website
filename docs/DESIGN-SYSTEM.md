# Sistema de diseño BIGATIC

El sistema visual traduce la identidad observada en el póster BIGATIC 2026B a una interfaz académica mantenible. Prioriza credibilidad, claridad, contenido, accesibilidad y rendimiento. No intenta reproducir el póster como layout ni rediseñar las marcas BIGATIC o UDES.

La implementación base vive en `src/styles/global.css`; los componentes están en `src/components/`.

## Principios

1. **Investigación primero.** La interfaz debe parecer la presencia de un grupo universitario de investigación, no una landing de reclutamiento o SaaS.
2. **Jerarquía editorial.** Titulares precisos, bloques de lectura contenidos y espacio en blanco organizan el contenido.
3. **Marca con moderación.** Azul como estructura, verde como acento puntual y UDES como afiliación, sin competencia entre logos.
4. **Entidades, no contenedores.** Cards solo para proyectos, áreas, integrantes, noticias o software; no encerrar cada párrafo.
5. **Accesible por defecto.** HTML semántico, focus visible, contraste AA, teclado y reducción de movimiento son parte del diseño.
6. **Static-first.** Decoración y contenido no justifican JavaScript; las interacciones deben ser pequeñas y progresivas.

## Color

### Tokens semánticos

| Token CSS         | Valor     | Uso                                   |
| ----------------- | --------- | ------------------------------------- |
| `--background`    | `#fbfdff` | Canvas general                        |
| `--surface`       | `#ffffff` | Superficie principal                  |
| `--surface-muted` | `#f1f7fb` | Separación suave de secciones         |
| `--text`          | `#172438` | Texto principal                       |
| `--text-muted`    | `#4b5c72` | Metadata y texto secundario           |
| `--border`        | `#d6e0ea` | Divisores y bordes de 1 px            |
| `--primary`       | `#0a3b70` | Títulos, marca y CTA principal        |
| `--primary-hover` | `#075baa` | Estados interactivos                  |
| `--accent`        | `#08a32c` | Acento de nodos y convocatoria activa |
| `--accent-muted`  | `#dff5e5` | Fondo de acento discreto              |
| `--success`       | `#087e35` | Estado activo/abierto con contraste   |
| `--focus`         | `#b66b00` | Anillo de focus visible               |

La escala Tailwind añade tonos `brand-950` a `brand-50` y `accent-700` a `accent-100`. Prefiera tokens semánticos para componentes compartidos; use tonos de escala solo cuando el significado permanezca claro.

### Reglas de uso

- El azul profundo sostiene headings, navegación y acciones principales.
- El verde no debe ocupar grandes superficies ni competir con el azul; reserve su uso para estados, nodos, pequeños highlights y convocatoria abierta.
- No use gradient text. El gradiente azul-verde solo aparece como detalle fino, por ejemplo `.divider-gradient`.
- No agregue púrpura, neón, fondos oscuros o un dark mode en v1.
- Compruebe contraste en estado normal, hover, focus, disabled y sobre superficies mutadas.

## Tipografía

La familia principal es **IBM Plex Sans Variable**, empaquetada localmente durante el build mediante `@fontsource-variable/ibm-plex-sans`, sin solicitudes a un CDN. No vive en `public/fonts/`. Los fallbacks son IBM Plex Sans, `system-ui` y `sans-serif`.

| Rol           | Clase            | Escala                                                                 |
| ------------- | ---------------- | ---------------------------------------------------------------------- |
| Display       | `.display-title` | `clamp(2.65rem, 7vw, 6.5rem)`; máximo 15 caracteres visuales por línea |
| H1 de página  | `.page-title`    | `clamp(2.45rem, 5vw, 5rem)`                                            |
| H2 de sección | `.section-title` | `clamp(2rem, 4vw, 3.65rem)`                                            |
| Introducción  | `.lead-copy`     | `clamp(1.1rem, 1.7vw, 1.35rem)`                                        |
| Cuerpo        | `body`           | `1rem / 1.7`                                                           |
| Editorial     | `.prose-content` | `1.0625rem`, ancho máximo `72ch`                                       |
| Eyebrow       | `.eyebrow`       | `0.76rem`, uppercase y tracking controlado                             |

Use pesos variables alrededor de 600–720 para jerarquía, sin depender únicamente del color. Mantenga una sola `h1` por página y niveles de headings consecutivos. No reduzca el texto base para acomodar layouts estrechos.

## Layout y espacio

- Contenedor principal: `--container: 80rem` (1280 px), con gutters responsivos.
- Longitud editorial: `--reading: 72ch`.
- Ritmo de sección: `.section-space`, entre 4.5 y 8 rem según viewport.
- Header: `--header-height: 5rem`; 4.5 rem en mobile.
- Desktop puede usar grids asimétricos; el orden del DOM debe seguir siendo lógico al apilarse.
- El breakpoint CSS recurrente es cercano a 48 rem, con ajustes específicos por componente cuando el contenido lo exige.
- Body tiene un ancho mínimo de 320 px. Todo overflow horizontal debe corregirse en el componente responsable, no ocultarse globalmente.

El espacio debe separar ideas, no crear una Home interminable. Las páginas índice resumen y enlazan; las páginas internas desarrollan el contenido.

## Forma, bordes y sombras

- Borde estándar: 1 px con `--border`.
- Radios de producto: `0.5rem` para controles, `0.75rem` para interiores y `1rem` para paneles o tarjetas principales.
- Evite pills gigantes salvo badges de estado o tags con significado.
- Prefiera borde y cambio de superficie a sombras. Si una sombra es indispensable, debe ser sutil y no simular cards flotantes.
- Divisores finos y alineación de grid tienen prioridad sobre decoración.

## Iconografía y contenido contextual

Lucide Astro es el único sistema de iconos de interfaz. Use trazo lineal, tamaño coherente y `aria-hidden="true"` cuando el texto adyacente ya comunica la acción. Un botón solo con icono necesita nombre accesible.

Los heroes no tienen una ilustración predeterminada. La segunda columna se habilita únicamente cuando aporta información propia de la página, por ejemplo: fotografía y datos de una persona, póster de una convocatoria, imagen de una noticia, temas de un área o un índice navegable. Si no existe ese contenido, el hero usa una sola columna y una altura compacta.

No agregue un gráfico para equilibrar visualmente el layout. Primero ajuste la composición de la página. Las imágenes contextuales deben reservar dimensiones, tener texto alternativo cuando aportan información y desaparecer del flujo si no existen.

No use cerebros de IA, robots, candados flotantes, código Matrix, circuitos genéricos, partículas animadas ni fotografía stock tecnológica.

## Componentes base

| Componente         | Responsabilidad                      | Regla de uso                                                       |
| ------------------ | ------------------------------------ | ------------------------------------------------------------------ |
| `Brand`            | Logo BIGATIC + descriptor localizado | Marca primaria del sitio; el logo enlaza al inicio desde el header |
| `SiteHeader`       | Navegación, idioma y GitHub          | Compacto, sticky y operable con teclado/mobile                     |
| `SiteFooter`       | Afiliación y navegación secundaria   | Año calculado al compilar; no declarar derechos no aprobados       |
| `LanguageSwitcher` | Cambio ES/EN                         | Debe llevar a la página equivalente, no a una URL inexistente      |
| `Breadcrumbs`      | Contexto de páginas profundas        | `<nav aria-label>` y último elemento sin enlace                    |
| `SectionHeader`    | Eyebrow, título y resumen            | Mantiene ritmo editorial consistente                               |
| `ResearchAreaCard` | Área de investigación real           | No usar como feature comercial ni mostrar porcentajes              |
| `ProjectCard`      | Resumen de proyecto real             | Estado sobrio; ocultar links o metadata ausente                    |
| `NewsCard`         | Noticia o evento                     | Título/enlace descriptivo y fecha localizada                       |
| `StatusBadge`      | Estado de proyecto/convocatoria      | El texto comunica el estado; color nunca es la única señal         |
| `ContentLayout`    | Hero editorial y metadata de página  | Aside opcional solo para contenido contextual real                 |
| `PeopleGrid`       | Grid de integrantes                  | Retrato estandarizado, insignia de programa y pines de logro       |
| `PersonProgress`   | Nivel, puntaje y logros              | Solo datos estructurados; ver `docs/RANKING.md`                    |
| `BadgeIcon`        | Icono de un badge de trayectoria     | Mapea una clave de badge a Lucide; nunca decorativo suelto         |

Antes de crear un componente, compruebe que representa una entidad o patrón repetido. No extraiga wrappers de una sola línea ni instale Storybook para v1.

## Botones y enlaces

Clases disponibles:

- `.button-primary`: acción principal de una sección;
- `.button-secondary`: acción alternativa;
- `.button-text`: enlace editorial con tratamiento ligero.

Reglas:

- una sección no debe competir con múltiples CTA primarios;
- use `<a>` para navegación y `<button>` para acciones;
- el texto debe describir el destino: «Ver proyecto LogTriage», no «Haz clic aquí»;
- los enlaces internos se abren en la pestaña actual;
- perfiles sociales o académicos externos, repositorios, DOI y sitios personales se abren en una pestaña nueva;
- use `rel="noopener noreferrer"` cuando corresponda;
- preserve un área táctil mínima cercana a 44 × 44 px;
- hover puede mover una flecha 2–4 px, nunca el layout completo.

## Estados

### Vacío

`.empty-state` usa divisores y texto sobrio. Mensajes posibles:

- «No hay proyectos publicados actualmente.»
- «No research outputs have been published yet.»

Oculte una sección vacía si el mensaje no agrega contexto. Nunca rellene el espacio con métricas o entidades ficticias.

### Draft y contenido incompleto

Los drafts de `projects`, `people`, `outputs`, `news` y `calls` no se renderizan en producción. Los archivos `collection-sentinel.md` de las tres primeras colecciones son entradas técnicas con `draft: true`, no estados visuales ni contenido de muestra. `research` no admite drafts. Dentro de una entidad publicada, omita cualquier sección sin datos; no muestre headings vacíos, botones deshabilitados sin explicación ni placeholders confundibles con contenido real.

### Focus, hover y active

- Focus global: outline de 3 px `--focus`, offset de 4 px.
- Hover dura entre 120 y 180 ms, solo se aplica en dispositivos con hover real y no es requisito para comprender la acción.
- Active/open puede usar verde, siempre acompañado por una etiqueta textual.
- Disabled necesita contraste legible y no debe ocultar el motivo de indisponibilidad si la acción sigue visible.

## Movimiento

El movimiento comunica jerarquía y progreso; nunca decora. No use librerías de animación: todo lo permitido se resuelve con CSS y, cuando hace falta disparar por scroll, con un `IntersectionObserver` mínimo en `BaseLayout.astro`.

### Permitido

| Patrón             | Uso                                                      | Parámetros                                                    |
| ------------------ | -------------------------------------------------------- | ------------------------------------------------------------- |
| Transición de UI   | Color, borde y desplazamiento en hover/focus             | 160–180 ms, `ease`                                            |
| Elevación en hover | Tarjetas de entidad (proyecto, integrante)               | `translateY(-3px)` máximo                                     |
| Reveal de entrada  | Tarjetas al entrar en viewport                           | 240 ms máximo, `cubic-bezier(0.22, 1, 0.36, 1)`, una sola vez |
| Escalonado         | Elementos hermanos dentro de una grilla                  | 60 ms entre elementos, tope de 6                              |
| Conteo             | Cifras grandes de resumen que ya existen en el contenido | 240 ms máximo, ease-out cúbico                                |
| Barra de progreso  | Medidor de puntaje en `PersonProgress`                   | 240 ms máximo, una sola vez                                   |

### Prohibido

Parallax, partículas, reveals largos o encadenados, secuencias cinematográficas, view transitions, scroll secuestrado, animación en acciones repetidas (navegación, menú) y cualquier movimiento que no dependa de contenido real. No se incorpora Remotion ni una infraestructura de video mientras no exista una superficie audiovisual del producto.

### Reglas de implementación

1. El reveal se activa solo bajo `.js` en `<html>`. Sin JavaScript el contenido se renderiza visible, nunca oculto.
2. `prefers-reduced-motion: reduce` muestra todo de inmediato: sin reveal, sin conteo y sin elevación.
3. El conteo parte de la cifra ya renderizada en el HTML y conserva su relleno de ceros, de modo que el valor final coincide con el servidor.
4. Cada elemento se observa una vez y se deja de observar al activarse; no hay animación al volver a hacer scroll.

### Carga coordinada de imágenes

Una tarjeta con fotografía **no se revela hasta que su imagen está decodificada**, para que marco y foto aparezcan juntos en lugar de que la foto entre después. Esto conserva el lazy-loading: `decode()` se invoca solo cuando la tarjeta está por entrar en viewport, no antes.

| Regla                      | Valor                                                           |
| -------------------------- | --------------------------------------------------------------- |
| Primeras imágenes del grid | `loading="eager"`, las tres primeras con `fetchpriority="high"` |
| Resto del grid             | `loading="lazy"`                                                |
| Margen del observador      | `0px 0px 12% 0px`, para dar tiempo a decodificar                |
| Tope de espera             | 1200 ms                                                         |

El tope es obligatorio: una imagen rota o muy lenta nunca puede dejar una tarjeta oculta de forma indefinida. Toda imagen debe declarar `width` y `height` para reservar espacio y evitar saltos de layout.

## Imágenes y marca

Assets oficiales actuales:

```text
public/branding/bigatic/logo-bigatic.png
public/branding/udes/udes-logo-principal.svg
public/images/og-default.png
```

Jerarquía:

```text
BIGATIC
Semillero de Investigación / Research Group

Afiliado a / Affiliated with
Universidad de Santander · UDES
```

- No altere proporciones, color, símbolos ni tipografía integrada de los logos.
- No reconstruya el escudo UDES ni cree variantes nuevas de BIGATIC.
- BIGATIC es la marca primaria; UDES establece afiliación en About, Affiliation y Footer sin competir visualmente.
- El asset original UDES con sello de acreditación se conserva fuera del artefacto publicado. No se distribuye desde `public/` mientras su autorización, vigencia y contexto de uso estén pendientes.
- Defina `width` y `height`; optimice imágenes editoriales con formatos modernos cuando corresponda.
- Fotografías de personas requieren consentimiento, autoría/licencia, crop coherente y texto alternativo.
- Si falta una fotografía, prefiera composición tipográfica o vectorial; no use stock como documentación institucional.

### Imagen Open Graph

`public/images/og-default.png` es el asset social de producción, con dimensiones de 1200 × 630. `npm run generate:og` lo recompone desde los logos locales mediante `scripts/generate-og-image.mjs`; el build ordinario no ejecuta ese paso. Después de modificar el generador o sus entradas, revise legibilidad, proporciones y fidelidad de marca, y versione el PNG resultante en el mismo pull request.

## Accesibilidad

Objetivo: WCAG 2.2 AA.

Checklist de componente o página:

- HTML semántico y landmarks (`header`, `nav`, `main`, `article`, `footer`);
- enlace «Saltar al contenido» funcional;
- orden de headings consistente;
- teclado completo y focus visible, incluido menú mobile;
- `aria-expanded` y `aria-controls` en controles desplegables;
- Escape cierra el menú cuando está abierto;
- color no es la única señal;
- labels explícitos y mensajes comprensibles;
- alt describe el propósito; imágenes decorativas usan alt vacío;
- contraste AA en estados interactivos;
- idioma de documento y cambios de idioma declarados;
- contenido comprensible a 200 % de zoom y desde 320 px;
- tablas con headers y scroll/transformación accesible en mobile;
- motion reducido respetado.

ARIA complementa HTML, no lo sustituye. Pruebe con teclado real y, para cambios importantes, con una herramienta automática más revisión manual.

## Responsive y QA

Revise como mínimo:

| Viewport     | Riesgo principal                                       |
| ------------ | ------------------------------------------------------ |
| 320–430 px   | navegación, headings, tap targets, overflow y metadata |
| 768 px       | grids intermedios, wrapping y espacios vacíos          |
| 1024–1440 px | ritmo editorial, alineación y densidad                 |
| 1920 px      | líneas demasiado largas y secciones sobredimensionadas |

No se considera responsive solo porque las cards se apilan. Compruebe orden de lectura, longitud de línea, imágenes, tablas, filtros, breadcrumbs, español con palabras largas e inglés con títulos distintos.

## Impresión

Los estilos globales ocultan header, footer, CTA y decoración marcada durante impresión. Proyectos, perfiles y outputs deben conservar título, metadata, cuerpo y URLs útiles. Si agrega un componente decorativo o interactivo, use `.no-print` o `.decorative` cuando deba omitirse.

## Añadir o modificar un token

1. Identifique un patrón reutilizado, no un caso aislado.
2. Determine su significado semántico y contraste.
3. Añádalo en `@theme` si Tailwind debe exponerlo y/o en `:root` si es un token de producto.
4. Migre usos duplicados relevantes; no deje dos tokens para el mismo concepto.
5. Pruebe estados, mobile, impresión y reduced motion.
6. Actualice esta documentación en el mismo pull request.

No agregue valores institucionales aproximados a partir de una captura si existe un asset oficial. Los tokens de UI pueden ajustar luminosidad para accesibilidad, pero nunca modifican el color dentro de un logo.
