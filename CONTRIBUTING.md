# Contribuir al sitio de BIGATIC

Gracias por colaborar con la presencia web académica de BIGATIC. Este repositorio gestiona código, contenido bilingüe y assets institucionales; cada cambio debe conservar la precisión académica, la afiliación con la Universidad de Santander y la posibilidad de construir el sitio de forma estática.

## Antes de comenzar

1. Lea el [README](README.md), la [guía de contenido](docs/CONTENT.md) y, si modifica UI, el [sistema de diseño](docs/DESIGN-SYSTEM.md).
2. Confirme que la información es publicable y que cuenta con autorización para aportar textos, imágenes, logos o datos personales.
3. Busque un issue o pull request existente para evitar trabajo duplicado. No se requiere pertenecer a un equipo específico de GitHub.
4. Para cambios amplios de arquitectura, schemas, rutas o branding, abra primero un issue con el problema, alcance y migración propuesta.

No invente proyectos, integrantes, métricas, cargos, DOI, contactos, aliados, historia ni resultados para completar una sección vacía. En colecciones que admiten drafts, use `draft: true`; para `research`, conserve el par ES/EN sin integrar hasta su aprobación. Un `TODO` inequívoco solo sirve durante desarrollo y debe permanecer fuera de producción.

## Preparar el entorno

El repositorio remoto previsto es `bigatic/bigatic.github.io`, pero su creación y publicación corresponden al administrador. Parta de un checkout local ya disponible:

```bash
cd /ruta/al/checkout
nvm use
npm install
npm run dev
```

Use npm y conserve `package-lock.json`. Para una instalación limpia basada en el lockfile:

```bash
npm ci
```

## Flujo Git

El flujo normal es branch → commit → pull request → review → merge.

1. Actualice `main` y cree una branch corta desde esa versión.

   ```bash
   git switch main
   git pull --ff-only
   git switch -c content/nombre-descriptivo
   ```

2. Use un prefijo que describa el cambio:

   - `content/` para entradas editoriales;
   - `feat/` para funcionalidad;
   - `fix/` para correcciones;
   - `docs/` para documentación;
   - `chore/` para mantenimiento aislado.

3. Haga commits pequeños, en imperativo y con un único propósito. Ejemplos:

   ```text
   content: add 2026B call translation
   fix: preserve locale on project links
   docs: clarify Cloudflare deployment
   ```

4. Antes de publicar la branch, sincronice con `main` sin reescribir trabajo ajeno y resuelva conflictos localmente.
5. Abra un pull request con contexto, alcance, verificación realizada y capturas cuando cambie la interfaz.
6. Atienda la revisión y haga merge solo cuando las comprobaciones pasen. No se asume un número o equipo fijo de revisores; el responsable del repositorio define la aprobación requerida según el riesgo.

No haga push directo a `main` salvo un procedimiento de emergencia autorizado por quienes administran el repositorio.

## Tipos de cambio

### Contenido

- Siga las plantillas y los campos definidos en [docs/CONTENT.md](docs/CONTENT.md).
- Escriba entradas editoriales en Markdown (`.md`); no agregue MDX.
- Publique pares ES/EN con el mismo `translationKey` y `routeSlug` localizados.
- No use `slug` en el frontmatter. `routeSlug` evita sobrescribir el `entry.id` derivado por Astro; el nombre del archivo puede conservar la forma `<slug>.md`.
- Respete exactamente los campos de `src/content.config.ts`: los schemas `.strict()` rechazan propiedades desconocidas.
- Use fechas civiles ISO entre comillas en YAML (`"YYYY-MM-DD"`) y deje que la interfaz las localice.
- Verifique nombres, roles, DOI, URLs, fechas y afiliaciones contra una fuente autorizada.
- No traduzca nombres propios, DOI, nombres oficiales de instituciones ni identificadores persistentes.
- No publique repositorios privados, correos personales como fallback ni información sensible.

### Código y UI

- Prefiera componentes `.astro`, HTML semántico y generación estática.
- No agregue un framework cliente, backend, base de datos, tracker o dependencia pesada sin una necesidad documentada.
- Reutilice tokens y componentes existentes; no añada colores o tamaños aislados para resolver un único caso.
- Mantenga navegación por teclado, focus visible, contraste WCAG 2.2 AA, jerarquía de headings y compatibilidad con `prefers-reduced-motion`.
- El sitio debe funcionar sin JavaScript excepto donde una interacción lo necesite.
- Pruebe al menos una vista mobile y una desktop cuando cambie layout o navegación.

### Assets

- Coloque archivos públicos en una carpeta semántica dentro de `public/`: `branding/`, `posters/`, `images/` u otra categoría aprobada.
- Use nombres minúsculos, descriptivos y estables, separados con guiones.
- Optimice peso y dimensiones; indique `width` y `height` al renderizar para evitar CLS.
- Registre fuente, autoría, licencia, consentimiento y texto alternativo en el pull request.
- No genere personas con IA ni use fotografías stock como evidencia institucional.
- No recorte, recoloree, reconstruya ni altere los logos BIGATIC o UDES. Use únicamente assets oficiales suministrados.
- Confirme con UDES la vigencia y el contexto autorizado de cualquier sello de acreditación antes de publicarlo.
- Si cambian el layout OG o los logos que usa, ejecute `npm run generate:og`, revise `public/images/og-default.png` y versione el PNG generado en el mismo pull request. El build no lo genera automáticamente.

### Entradas sentinela

`projects`, `people` y `outputs` contienen un archivo `collection-sentinel.md`. Es una entrada técnica que permite conservar registrada una colección sin entidades reales:

- debe conservar `draft: true` de forma explícita;
- no se traduce, destaca, enlaza ni convierte en contenido real;
- no debe aparecer en listados, conteos, sitemap o RSS;
- puede permanecer cuando se agregue contenido real;
- cualquier cambio al filtrado `isPublished` debe comprobar que los sentinelas siguen excluidos.

`research` no admite `draft` ni utiliza sentinela. Prepare y apruebe el par ES/EN de cada área en la misma branch.

## Traducciones

Una traducción no es un cambio mecánico de palabras. Debe conservar significado, tono académico, metadatos y enlaces válidos:

- español: «Semillero de Investigación BIGATIC», «Interacción Hombre-Computador»;
- inglés: «BIGATIC Research Group», «Human-Computer Interaction»;
- institución: «Universidad de Santander (UDES)» en ambos idiomas.

Al agregar o modificar una entrada, revise también su pareja lingüística. Si una traducción aún no está aprobada, mantenga ambas entradas como borrador en las colecciones que lo admiten; para `research`, no integre el cambio hasta aprobar el par. No cree un enlace de idioma hacia una ruta inexistente.

Una fecha no cambia el HTML que ya está desplegado. Al modificar una convocatoria, construya y publique de nuevo. El workflow de GitHub Pages intenta ejecutar un build diario para reevaluar el estado efectivo; compruebe su ejecución y use `workflow_dispatch` antes de una fecha crítica. Confirme por separado el rebuild de cualquier otro proveedor.

## Validación local

Ejecute antes de cada pull request:

```bash
npm run verify
```

`npm run verify` realiza type/content checking, lint, comprobación de formato, build y verificación de enlaces internos. Además, cuando aplique:

- navegue la ruta nueva en ES y EN;
- pruebe teclado, focus, menú móvil y selector de idioma;
- compruebe 390 px y 1440 px como mínimo;
- inspeccione wrapping, overflow, contraste, imágenes y estados vacíos;
- pruebe enlaces externos y confirme que no exponen recursos privados;
- revise canonical, `hreflang`, Open Graph y RSS para contenido publicable.

Si el cambio modifica dependencias, use `npm install` para actualizar `package-lock.json` y explique por qué la dependencia es necesaria.

## Pull request

Incluya en la descripción:

- problema u objetivo;
- archivos y rutas afectadas;
- fuente o responsable de los datos editoriales;
- estado de las traducciones;
- pruebas y comandos ejecutados;
- capturas mobile/desktop para cambios visuales;
- PNG Open Graph regenerado y revisado, si cambió su fuente o composición;
- riesgos, compatibilidad de despliegue y trabajo pendiente.

No mezcle una actualización masiva de dependencias con cambios de contenido o diseño. Esto facilita la revisión y un eventual rollback.

## Licencias y derechos

Código, contenido y material institucional no comparten automáticamente una licencia:

- el código fuente del sitio está cubierto por la licencia MIT declarada en `LICENSE`;
- textos y datos requieren una política editorial independiente;
- logos BIGATIC/UDES, fotografías y pósteres quedan excluidos de la licencia de software salvo autorización expresa;
- el contribuyente debe tener derecho a aportar cada asset y documentar restricciones de uso.

Consulte `NOTICE.md` para las exclusiones de nombres y marcas institucionales, assets oficiales y contenido editorial o académico. La presencia de un archivo dentro del repositorio no concede derechos de reutilización fuera del alcance de `LICENSE`.

No copie contenido, imágenes o código de otros grupos de investigación. Las referencias externas sirven para analizar patrones, no para reproducir su implementación o identidad.

## Seguridad y privacidad

- Nunca incluya tokens, claves, contraseñas, archivos `.env` con secretos ni credenciales privadas.
- No añada analytics, cookies, formularios embebidos o scripts de terceros sin aprobación y revisión de privacidad/CSP.
- Si encuentra una credencial o vulnerabilidad sensible, no la publique en un issue abierto; comuníquela por un canal privado al administrador de la organización o del repositorio.
- Mantenga el sitio sin backend, cuentas o recolección de datos salvo decisión arquitectónica institucional posterior.
