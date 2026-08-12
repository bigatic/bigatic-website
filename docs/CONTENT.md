# Guía de contenido

Esta guía explica cómo mantener el contenido bilingüe de BIGATIC mediante Astro Content Collections. Los schemas `.strict()` de `src/content.config.ts` son la fuente de verdad: rechazan cualquier propiedad desconocida. Si esta guía y el código difieren, siga el schema vigente y corrija la documentación en el mismo pull request.

## Modelo editorial

El formato editorial del proyecto es Markdown (`.md`), no MDX. El contenido vive dentro de `src/content/<collection>/` y se separa por idioma:

```text
src/content/
├── research/{es,en}/
├── projects/{es,en}/
├── people/{es,en}/
├── outputs/{es,en}/
├── news/{es,en}/
└── calls/{es,en}/
```

Cada archivo contiene frontmatter YAML entre `---` y, cuando hace falta, cuerpo Markdown. Astro valida el frontmatter durante `npm run check` y `npm run build`. No agregue archivos `.mdx` ni campos que no estén declarados en el schema estricto.

### Reglas generales

- `routeSlug` controla el segmento localizado de URL. Use minúsculas ASCII, números y guiones, sin guiones iniciales/finales, y manténgalo único dentro de la colección y el idioma.
- `locale` solo admite `es` o `en`.
- `translationKey` sigue la misma sintaxis de `routeSlug`: identifica una entidad conceptual, se comparte únicamente entre sus versiones ES/EN y debe ser único para esa entidad dentro de la colección.
- No use el campo reservado `slug` en frontmatter. Con el loader `glob()` de Astro puede reemplazar el ID de la entrada y provocar colisiones entre idiomas. `routeSlug` mantiene separada la URL del `entry.id`, que Astro deriva de la ruta relativa del archivo.
- El nombre de archivo puede seguir el patrón legible `<slug>.md`; no controla la URL pública. Por ejemplo, `es/convocatoria-2026b.md` tiene un `entry.id` distinto de `en/convocatoria-2026b.md`, aunque compartan nombre de archivo. La URL la define `routeSlug`.
- `draft: true` excluye la entrada de publicación en `projects`, `people`, `outputs`, `news` y `calls`. `research` no posee ese campo: sus dos traducciones deben llegar aprobadas en el mismo pull request.
- Use fechas civiles ISO entre comillas (`"YYYY-MM-DD"`); las comillas impiden que YAML las convierta a otro tipo y la interfaz se encarga de localizarlas.
- Use URLs absolutas con `https://` en campos validados como URL.
- Las rutas a assets de `public/` empiezan por `/`, por ejemplo `/posters/convocatoria-2026b.jpg`.
- Omita campos opcionales vacíos. No publique secciones sin contenido ni valores como `N/A`, `TBD` o `-`.
- Verifique nombres, roles, fechas, DOI, repositorios y enlaces académicos. No infiera datos.
- Cualquier fixture temporal en una colección que admita drafts debe llevar `draft: true` y una marca inequívoca `DEMO`, `PLACEHOLDER` o `TODO`; elimínelo antes de producción. No use fixtures en `research`.

### Entradas sentinela

`projects`, `people` y `outputs` incluyen respectivamente `src/content/<collection>/collection-sentinel.md`. Estos archivos no son fixtures editoriales: son registros técnicos mínimos que mantienen disponibles y tipadas las colecciones mientras no hay entidades reales.

- Deben conservar exactamente `draft: true`; como el schema usa `false` por defecto, omitir el campo los publicaría accidentalmente.
- `isPublished()` los excluye de rutas, listados y conteos públicos.
- No los traduzca, destaque, enlace ni reutilice como plantilla de contenido real.
- Pueden permanecer cuando se agreguen entidades reales.
- Si cambia un consumidor de estas colecciones, filtre siempre con `isPublished()` antes de generar rutas o UI.

`research` no admite `draft`, no usa sentinela y solo debe recibir pares ES/EN aprobados.

### Convención de referencias

Los schemas usan strings estables para las relaciones. Zod valida su forma y `npm run check:content` comprueba que el destino exista en el mismo idioma, además de la unicidad y paridad ES/EN. Para mantener relaciones claras:

- use el `translationKey` del destino en relaciones internas como `news.relatedCall`, `news.relatedProject`, `outputs.project`, `outputs.researchArea`, `people.projects`, `people.publications`, `projects.lead`, `projects.members`, `projects.publications`, `projects.software` y `projects.datasets`; los tres últimos apuntan a entradas de `outputs` del tipo correspondiente;
- use el `translationKey` de la persona para `lead` y `members` cuando esos campos representen perfiles internos;
- `projects.collaborators` contiene nombres institucionales o personales localizados listos para mostrarse; no crea relaciones automáticas mientras no exista una colección de colaboradores u organizaciones;
- `authors` contiene nombres de autor listos para mostrarse, no identificadores;
- `projects.researchAreas`, `people.researchAreas` y `outputs.researchArea` usan el `translationKey` de un área; los listados deben resolver su nombre localizado antes de mostrarlo;
- `people.researchInterests` contiene intereses académicos localizados, listos para mostrarse; no crea vínculos automáticos con `research`;
- `calls.researchAreas` contiene etiquetas localizadas listas para mostrarse porque una convocatoria puede describir enfoques más específicos que la taxonomía estable. Es una decisión editorial deliberada y esas etiquetas no crean vínculos automáticos a `research`;
- `research` no contiene `relatedProjects`, `relatedPeople` ni `relatedOutputs`; las relaciones se derivan desde proyectos, perfiles y outputs que apuntan al área;
- mantenga relaciones inversas coherentes si ambas colecciones las declaran;
- ejecute `npm run check:content`; el build y su link checker validan además las rutas internas que finalmente se renderizan.

Ejemplo de pareja traducida:

```yaml
# projects/es/ejemplo.md
routeSlug: ejemplo
locale: es
translationKey: example-project
```

```yaml
# projects/en/example.md
routeSlug: example
locale: en
translationKey: example-project
```

## Flujo común para publicar una entidad

1. Confirme que la información y los assets están autorizados para publicación.
2. Elija una colección y copie la plantilla correspondiente; no copie datos de otra entidad.
3. Cree primero las versiones ES y EN con el mismo `translationKey`.
4. Localice `routeSlug`, título, resumen, cuerpo, etiquetas visibles y metadatos.
5. Conecte relaciones mediante identificadores existentes y compruebe las dos direcciones cuando corresponda.
6. Mantenga `draft: true` hasta que ambas versiones estén revisadas. Para `research`, que no admite drafts, conserve el cambio en la branch hasta aprobar el par.
7. Ejecute `npm run check`, `npm run build` y revise visualmente las rutas.
8. Cambie `draft` a `false`, abra un pull request y documente la fuente de los datos. Para `research`, que no tiene `draft`, integre únicamente el par ya aprobado.

## Agregar un proyecto

Ruta de archivos recomendada:

```text
src/content/projects/es/<slug-es>.md
src/content/projects/en/<slug-en>.md
```

Plantilla completa; elimine los campos opcionales que no tengan datos reales:

```yaml
---
title: 'TODO: título verificado'
routeSlug: proyecto-ejemplo
locale: es
translationKey: example-project
summary: 'TODO: resumen académico breve y verificable.'
status: planned
startDate: '2026-01-01'
# endDate: "2026-12-31"
researchAreas:
  - software-engineering
# lead: person-translation-key
members: []
collaborators: []
# abstract: "..."
# problem: "..."
objectives: []
# methodology: "..."
technologies: []
# repository: https://github.com/bigatic/example
# website: https://example.org
# Añada `doi` únicamente con el identificador exacto, sin https://doi.org/.
publications: []
software: []
datasets: []
# funding: "..."
partners: []
featured: false
# coverImage:
#   src: /images/projects/example-cover.webp
#   alt: 'TODO: descripción objetiva de la imagen'
#   width: 1600
#   height: 900
#   caption: 'TODO: pie de foto opcional'
#   credit: 'TODO: crédito opcional'
gallery: []
tags: []
draft: true
---
Descripción ampliada opcional del proyecto. No repita el resumen si no agrega contexto.
```

Estados admitidos: `active`, `completed`, `planned`, `archived`. Si existen ambas fechas, `endDate` debe ser igual o posterior a `startDate`. Solo marque `featured: true` cuando el comité editorial decida destacar un proyecto real. No muestre repositorio si es privado.

Rutas esperadas:

```text
/proyectos/<route-slug-es>/
/en/projects/<route-slug-en>/
```

Después de crear el proyecto, no edite el área para crear un backlink: las páginas de investigación derivan la relación desde `project.researchAreas`. Actualice perfiles u outputs únicamente cuando sus propios campos relacionales deban reflejar el vínculo y existan identificadores verificados.

## Agregar un integrante

Ruta recomendada:

```text
src/content/people/es/<slug-es>.md
src/content/people/en/<slug-en>.md
```

```yaml
---
name: 'TODO: nombre público autorizado'
routeSlug: nombre-apellido
locale: es
translationKey: person-name
role: student-researcher
roleLabel: Estudiante investigador
affiliation: Universidad de Santander (UDES)
academicProgram: Ingeniería de Software
academicSemester: 5
previousBigaticMembership: false
# Experiencia investigativa verificable y externa a la vinculación actual.
researchExperience: []
# photo: /images/people/nombre-apellido.webp
# shortBio: "..."
researchAreas:
  - software-engineering
# Debe repetir una clave incluida en researchAreas.
# primaryResearchArea: software-engineering
researchInterests:
  - Arquitectura de software
# Bloque localizado y opcional para integrantes con vinculación vigente.
participation:
  nucleus: Ingeniería de Software e Inteligencia Artificial
  category: Investigador
  activity: Proyecto o actividad propuesta
  role: Integrante del núcleo
# email: correo.institucional@example.org
# github: https://github.com/usuario
# orcid: https://orcid.org/0000-0000-0000-0000
# linkedin: https://www.linkedin.com/in/usuario
# googleScholar: https://scholar.google.com/citations?user=...
# researchGate: https://www.researchgate.net/profile/...
# website: https://example.org
projects: []
publications: []
status: current
order: 100
draft: true
---
Biografía ampliada opcional, aprobada por la persona.
```

Roles admitidos:

| Valor                | Uso                            |
| -------------------- | ------------------------------ |
| `research-lead`      | Investigador líder             |
| `faculty-researcher` | Docente investigador           |
| `student-researcher` | Estudiante investigador        |
| `collaborator`       | Colaborador                    |
| `alumni`             | Egresado o integrante anterior |

`roleLabel` se localiza en cada archivo. `order` debe ser un entero positivo y solo controla presentación, no jerarquía institucional. Para una persona anterior use `status: alumni` y confirme si también corresponde el rol `alumni`.

`academicProgram` identifica el programa académico público y se localiza en cada idioma. Se usa para la insignia disciplinar de la tarjeta —por ejemplo, Ingeniería de Software o Psicología—, pero no modifica el puntaje.

`academicSemester` es obligatorio para estudiantes investigadores y aporta la base académica del rango. Debe actualizarse al inicio de cada periodo y nunca extraerse durante el build desde la biografía. `previousBigaticMembership` también debe ser explícito: use `true` solo si la persona estuvo vinculada a BIGATIC en un periodo anterior. Este dato aporta un reconocimiento reducido al cálculo, pero la interfaz no lo publica como trayectoria ni como XP del periodo actual.

`researchExperience` registra experiencia investigativa equivalente con un `kind` estable y un `name` público localizado. Admite proyectos de investigación, otros semilleros o grupos, asistencias de investigación, intercambios académicos y experiencia profesional pertinente. No agregue un elemento únicamente porque un interés aparece en la biografía.

`primaryResearchArea` es opcional. Cuando se use, debe repetir una clave incluida en `researchAreas`; la ficha la presenta como el principal campo de especialización de la persona.

`participation` es opcional y se localiza en cada idioma. Resume la vinculación pública al semillero mediante núcleo, categoría, proyecto o actividad propuesta y función. No incluya allí puntajes, disponibilidad, recomendaciones internas ni otros datos administrativos.

El grid y la ficha muestran un "Rango BIGATIC" calculado automáticamente desde el semestre, un reconocimiento reducido por vinculación anterior, la experiencia investigativa estructurada y los proyectos o publicaciones vinculados. Sus cinco etapas son Aprendiz, Explorador, Constructor, Vanguardia y Mentor. Todas las personas comienzan el periodo actual con cero XP BIGATIC. La interfaz muestra la experiencia externa en puntos y adapta las estadísticas para no presentar semestre en perfiles docentes. La fotografía, la biografía, las redes y la cantidad de intereses no suman puntos. No agregue puntajes manuales al frontmatter. La fórmula, los umbrales, badges, ejemplos y reglas de evolución están en [RANKING.md](RANKING.md).

Antes de publicar una foto, registre consentimiento, autoría/licencia, crop consistente y texto alternativo. No cree URLs de ORCID, Scholar o ResearchGate por inferencia; déjelas ausentes.

## Agregar un output académico o técnico

Todos los resultados viven en `outputs`, incluidas publicaciones, datasets, pósteres, tesis, prototipos y software:

```text
src/content/outputs/es/<slug-es>.md
src/content/outputs/en/<slug-en>.md
```

```yaml
---
title: 'TODO: título oficial'
routeSlug: output-example
locale: es
translationKey: output-example
authors:
  - 'TODO: autor en el orden oficial'
year: 2026
type: conference-paper
# venue: "..."
# publisher: "..."
# Añada `doi` únicamente con el identificador exacto, sin https://doi.org/.
# url: https://example.org/output
# repository: https://github.com/bigatic/example
# citation: "..."
# bibtex: |-
#   @inproceedings{...}
# abstract: "..."
# project: example-project
# researchArea: software-engineering
featured: false
draft: true
---
```

Tipos admitidos:

```text
journal-article
conference-paper
book-chapter
software
dataset
technical-report
poster
presentation
thesis
research-prototype
other
```

`authors` requiere al menos una entrada. Conserve el orden oficial de autores y el título publicado. No modifique un DOI; el schema exige la forma `10.` + 4–9 dígitos + `/` + sufijo, sin anteponer `https://doi.org/`. Use únicamente el identificador exacto emitido y confirme que resuelve mediante `https://doi.org/<doi>`. La cita y BibTeX deben provenir de una fuente editorial o repositorio confiable, no generarse sin revisión.

## Agregar software de investigación

No cree una colección separada. Use `outputs` con `type: software` y complete los campos específicos disponibles:

```yaml
---
title: 'TODO: nombre oficial del software'
routeSlug: software-example
locale: es
translationKey: software-example
authors:
  - 'TODO: autor o equipo acreditado'
year: 2026
type: software
# url: https://example.org/software
repository: https://github.com/bigatic/example
# Añada `doi` únicamente con el identificador exacto, sin https://doi.org/.
# project: example-project
# researchArea: software-engineering
# version: 1.0.0
# language: TypeScript
# license: SPDX-Identifier
featured: false
draft: true
---
Descripción del propósito, alcance y estado del software.
```

- Publique únicamente repositorios públicos.
- `version` debe corresponder a una release real.
- `license` debe coincidir con la licencia del repositorio; no la suponga.
- `language` describe la tecnología principal y no debe derivarse de una API en runtime.
- Si existe DOI de una release, vincule esa versión concreta.
- Agregue el `translationKey` del software al campo `software` del proyecto relacionado cuando aplique.

## Publicar una noticia

Ruta recomendada:

```text
src/content/news/es/<slug-es>.md
src/content/news/en/<slug-en>.md
```

```yaml
---
title: 'TODO: título informativo'
routeSlug: noticia-ejemplo
locale: es
translationKey: news-example
date: '2026-01-01'
# updatedDate: "2026-01-02"
summary: 'TODO: qué ocurrió, sin lenguaje promocional vacío.'
author: BIGATIC
# image: /images/news/example.webp
# imageAlt: 'TODO: descripción objetiva y localizada de la imagen'
# imageWidth: 1600
# imageHeight: 900
tags: []
featured: false
draft: true
# relatedProject: example-project
# relatedEvent: event-example
# relatedCall: call-example
---
Cuerpo de la noticia en Markdown. Indique contexto, fecha y vínculos verificables.
```

Use `updatedDate` solo para cambios sustanciales y nunca antes de `date`. El feed RSS se genera a partir de noticias publicadas; revise título, resumen y URL antes de quitar `draft`. `image`, `imageAlt`, `imageWidth` e `imageHeight` se publican juntos; localice el texto alternativo en cada idioma y use las dimensiones intrínsecas del archivo. Si no hay imagen autorizada, omita los cuatro campos: la tarjeta usa una composición solo de texto.

## Crear una convocatoria

Las convocatorias son contenido reutilizable, no bloques hardcodeados en la Home:

```text
src/content/calls/es/<slug-es>.md
src/content/calls/en/<slug-en>.md
```

```yaml
---
semester: 2026B
routeSlug: convocatoria-ejemplo
locale: es
translationKey: call-example
title: 'TODO: título oficial'
status: upcoming
# openDate: "2026-01-01"
closeDate: '2026-01-31'
formUrl: https://example.org/formulario-oficial
summary: 'TODO: resumen verificable.'
requirements:
  - 'TODO: requisito verificable.'
workMode:
  - 'TODO: modalidad o dinámica confirmada.'
researchAreas:
  - 'TODO: enfoque visible localizado.'
transversalNote: 'TODO: nota aprobada o redacción factual aplicable.'
# poster: /posters/convocatoria-ejemplo.jpg
# posterSmall: /posters/convocatoria-ejemplo-960.webp
# posterLarge: /posters/convocatoria-ejemplo-1600.webp
# posterAlt: 'TODO: descripción completa del póster'
featured: false
draft: true
---
Contexto adicional de la convocatoria.
```

Estados admitidos: `upcoming`, `open`, `closed`. `closeDate` es obligatoria; `openDate` es opcional porque no debe inventarse. El estado efectivo se evalúa en `America/Bogota` **durante el build**: una página estática ya desplegada no cambia al avanzar el reloj.

| Frontmatter                                        | Estado efectivo al compilar                                    |
| -------------------------------------------------- | -------------------------------------------------------------- |
| `status: closed`                                   | Siempre cerrado                                                |
| `status: upcoming` sin `openDate`                  | Permanece próximo y requiere cambiar el contenido a `open`     |
| Cualquier estado no cerrado + `openDate` futura    | Próximo hasta un build ejecutado en `openDate` o después       |
| Cualquier estado no cerrado + `openDate` alcanzada | Abierto desde el primer build ejecutado en esa fecha o después |
| `status: open` dentro del intervalo                | Abierto, incluido todo el día de `closeDate`                   |
| Cualquier estado no cerrado después de `closeDate` | Cerrado desde el primer build del día siguiente                |

El schedule diario de GitHub Pages intenta materializar las transiciones de fecha, pero GitHub puede deshabilitar schedules en repositorios públicos sin actividad durante 60 días y una ejecución cron puede retrasarse. Verifique el workflow y use `workflow_dispatch` antes de fechas críticas. Cloudflare u otro proveedor necesita su propio rebuild. Cambiar después el frontmatter a `status: closed` conserva integridad editorial e histórica.

`requirements`, `workMode` y `researchAreas` requieren al menos un elemento. `formUrl` y `transversalNote` también son obligatorios en el schema actual. Si una convocatoria todavía no cuenta con alguno de esos datos, no invente un valor: manténgala fuera de producción y proponga un ajuste de schema justificado si fuera necesario. Cuando exista `openDate`, debe ser igual o anterior a `closeDate`.

Antes de publicar:

1. verifique visualmente el URL de formulario contra la fuente oficial;
2. confirme fecha límite, semestre y elegibilidad;
3. compruebe que el póster no se usa como fondo ni sustituye el contenido accesible;
4. agregue una noticia relacionada cuando exista información editorial suficiente;
5. use el mismo `translationKey` en `news.relatedCall`;
6. pruebe que una convocatoria cerrada no muestre botón de inscripción.

Rutas previstas:

```text
/convocatorias/<route-slug-es>/
/en/calls/<route-slug-en>/
```

## Mantener un área de investigación

Las áreas se guardan en `research/{es,en}`. Su schema no admite `draft` ni relaciones inversas. Plantilla estricta:

```yaml
---
name: 'TODO: nombre localizado y aprobado'
routeSlug: area-ejemplo
locale: es
translationKey: example-area
shortDescription: 'TODO: descripción académica breve.'
topics:
  - 'TODO: tema asociado localizado.'
icon: network
featured: false
order: 100
status: developing
---
Descripción editorial del alcance del área.
```

Campos controlados:

- `topics`: etiquetas localizadas;
- `icon`: `code`, `shield`, `cloud`, `pointer`, `data` o `network`;
- `featured`: visibilidad destacada;
- `order`: entero positivo;
- `status`: `current` o `developing`.

No agregue `relatedProjects`, `relatedPeople` ni `relatedOutputs`: el schema estricto los rechaza. Los vínculos se derivan desde `projects.researchAreas`, `people.researchAreas` y `outputs.researchArea` mediante el `translationKey` del área.

Describa temas como alcance posible, no como actividad demostrada, cuando todavía no existan proyectos u outputs asociados. En español use exactamente «Interacción Hombre-Computador» o «Interacción Hombre-Computador y UX».

## Traducciones

### Crear una pareja

1. Duplique solo la estructura del frontmatter, no una traducción automática sin revisión.
2. Mantenga el mismo `translationKey`.
3. Localice el `routeSlug` si mejora claridad: `convocatoria-2026b` ↔ `call-2026b`.
4. Traduzca campos visibles, cuerpo, tags, `roleLabel`, requisitos y áreas mostradas.
5. Mantenga identificadores, nombres propios, DOI y URLs oficiales.
6. Actualice enlaces internos al sistema de rutas del idioma destino.
7. Revise que el selector ES/EN lleve a la entidad equivalente y que canonical/`hreflang` sean correctos.

### Traducción todavía no disponible

La política editorial de v1 es no publicar una entrada localizada de forma unilateral. En las colecciones compatibles, mantenga ambas entradas con `draft: true` hasta que exista un par revisado. Para `research`, prepare y apruebe los dos archivos en el mismo pull request. Esto evita enlaces de idioma y alternates SEO hacia páginas inexistentes.

Si en el futuro se permite contenido monolingüe, el cambio debe implementarse explícitamente: el selector dirigirá al índice equivalente de la sección, la página no anunciará un `hreflang` inexistente y se mostrará una nota de disponibilidad. No simule una traducción copiando el texto del otro idioma.

### UI frente a contenido

- Navegación, botones y labels compartidos: `src/i18n/ui.ts`.
- Equivalencias de rutas estáticas: `src/i18n/routes.ts`.
- Información institucional global: `src/data/site.ts`.
- Copy localizado y estable de las páginas principales: `src/data/pages.ts`.
- Entidades académicas que crecen y se relacionan: Content Collections Markdown.

No coloque contenido editorial directamente en componentes o rutas. `src/data/pages.ts` es la capa tipada actual para copy estático; si ese contenido requiere autoría no técnica, historial editorial o publicación independiente, migre el bloque completo a una futura colección `pages` sin duplicar fuentes de verdad.

## Assets editoriales

Use `public/` para archivos que deban conservar una URL estable:

```text
public/images/people/
public/images/projects/
public/images/news/
public/posters/
```

Requisitos:

- nombres descriptivos en minúsculas con guiones;
- formato y tamaño adecuados para web;
- dimensiones intrínsecas para evitar layout shift;
- `alt` contextual en el componente que muestra la imagen;
- fuente, autor, licencia y consentimiento documentados en el PR;
- ninguna modificación de proporciones, colores o elementos integrados de logos oficiales.

No use una imagen decorativa como sustituto de información. Para documentos o pósteres, publique también el contenido esencial como HTML accesible.

El asset original UDES con sello de acreditación se conserva fuera del artefacto publicado. Su eventual incorporación está pendiente de confirmar con UDES la autorización, vigencia del sello, resolución, alcance de la acreditación y contexto de uso.

## Auditoría del contenido inicial

La convocatoria 2026B se basa en el póster suministrado. El póster confirma el cierre del 14 de agosto de 2026 y el URL de Microsoft Forms, pero no una fecha u hora de apertura. La noticia asociada utiliza actualmente `date: 2026-08-11` como fecha editorial; ese dato debe ser confirmado por el responsable de publicación o corregido antes de considerar el contenido institucionalmente aprobado.

## Checklist editorial

Antes de cambiar `draft` a `false` —o antes de integrar un área `research`, que no admite drafts—:

- [ ] la información proviene de una fuente autorizada;
- [ ] ES y EN comparten `translationKey` y tienen `routeSlug` válidos;
- [ ] no hay campos opcionales vacíos ni datos ficticios;
- [ ] fechas, nombres, roles, URLs, DOI y licencias están verificados;
- [ ] las relaciones usan identificadores existentes;
- [ ] los assets tienen derechos, optimización y texto alternativo;
- [ ] `npm run check` pasa;
- [ ] `npm run build` pasa y no reporta enlaces internos rotos;
- [ ] ambas rutas se revisaron visualmente;
- [ ] selector de idioma, canonical, `hreflang`, RSS y CTA funcionan según corresponda.
