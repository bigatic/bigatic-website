# Sistema de rangos y trayectoria BIGATIC

Estado: versión 2.3, 29 de agosto de 2026.

Este documento especifica el sistema de niveles, experiencia, badges y estadísticas que aparece en el grid de integrantes y en las fichas individuales. La fórmula vive en `src/utils/personRanking.ts` y su presentación en `src/components/PersonProgress.astro`.

## Propósito

El sistema representa la trayectoria académica e investigativa documentada de cada integrante. El puntaje combina tres dimensiones distintas:

1. avance en el programa académico;
2. un reconocimiento mínimo por vinculación anterior y los resultados verificables del periodo actual;
3. experiencia investigativa equivalente obtenida en proyectos, semilleros, asistencias, intercambios o experiencia profesional pertinente.

No es una calificación académica ni una certificación de competencias. El directorio continúa ordenado alfabéticamente y no publica una tabla de posiciones. Los rangos sirven como una lectura de progreso que puede evolucionar cuando se registren nuevos resultados.

## Datos estructurados

El cálculo utiliza exclusivamente estos campos de la colección `people`:

- `academicSemester`;
- `previousBigaticMembership`;
- `researchExperience`;
- `projects`;
- `publications`;
- `role`, únicamente para los pisos de la jerarquía institucional.

`academicProgram`, `participation` y el núcleo controlan badges, textos y colores, pero no suman puntos. La fotografía, biografía, cantidad de intereses, áreas, correo y perfiles sociales tampoco alteran el rango.

Ejemplo de datos:

```yaml
academicSemester: 6
previousBigaticMembership: false
researchExperience:
  - kind: research-group
    name: Semillero externo verificado
  - kind: professional-experience
    name: Experiencia profesional pertinente
```

`academicSemester` es obligatorio para `student-researcher`. `previousBigaticMembership` debe escribirse de forma explícita en cada perfil estudiantil. `researchExperience` es una lista localizada; el `kind` se conserva igual en español e inglés y `name` se traduce cuando corresponde.

## Fórmula

### Base académica

Cada semestre aporta 2 puntos:

```text
base_académica = semestre × 2
```

La base reconoce que un estudiante avanzado normalmente ha acumulado más formación. No representa experiencia en BIGATIC y no impide que una trayectoria investigativa excepcional adelante a otra persona.

### Reconocimiento previo y resultados actuales

| Señal                                    | Puntos | Tope |
| ---------------------------------------- | -----: | ---: |
| Vinculación previa confirmada            |      5 |  una |
| Proyecto BIGATIC vinculado en `projects` |     12 |  dos |
| Publicación vinculada en `publications`  |     18 |  dos |

```text
xp_BIGATIC_actual = proyectos + publicaciones
```

Todas las personas comienzan el periodo actual con `0 XP BIGATIC`. La vinculación anterior aporta cinco puntos al cálculo general como reconocimiento de contexto, pero no se muestra como estadística, badge ni trayectoria pública. Los proyectos y publicaciones solo cuentan cuando se registran como resultados del trabajo actual.

La categoría editorial de `participation` no otorga puntos por sí sola porque describe una asignación, no un resultado terminado.

### Experiencia investigativa equivalente

| `researchExperience.kind` | Uso                                                 | Puntos |
| ------------------------- | --------------------------------------------------- | -----: |
| `research-project`        | Participación verificable en otro proyecto          |     20 |
| `research-group`          | Vinculación a otro semillero o grupo                |     12 |
| `research-assistantship`  | Asistencia formal de investigación                  |     25 |
| `academic-exchange`       | Intercambio académico vigente                       |     10 |
| `professional-experience` | Experiencia profesional pertinente para el proyecto |     10 |

Estas equivalencias forman la **XP externa**, expresada en puntos. No representan años ni cantidad de experiencias. Cada elemento debe tener un nombre público y verificable; no se extrae automáticamente de la biografía.

### Puntaje total

```text
puntaje_documentado =
  base_académica
  + reconocimiento_previo
  + xp_BIGATIC_actual
  + experiencia_equivalente

puntaje = mínimo(100, máximo(puntaje_documentado, piso_por_rol))
```

Los pisos institucionales se mantienen:

| `role`               | Piso |
| -------------------- | ---: |
| `research-lead`      |   90 |
| `faculty-researcher` |   70 |
| Los demás roles      |    0 |

## Niveles

| Nivel | Código   | Rango ES    | Rango EN   | Puntaje |
| ----: | -------- | ----------- | ---------- | ------: |
|     1 | `LVL 01` | Aprendiz    | Apprentice |    0-19 |
|     2 | `LVL 02` | Explorador  | Explorer   |   20-39 |
|     3 | `LVL 03` | Constructor | Builder    |   40-59 |
|     4 | `LVL 04` | Vanguardia  | Vanguard   |   60-79 |
|     5 | `LVL 05` | Mentor      | Mentor     |  80-100 |

## Estadísticas visibles

Las tarjetas y fichas usan estadísticas distintas según el rol.

Para estudiantes:

| Stat          | Definición                                                   |
| ------------- | ------------------------------------------------------------ |
| Semestre      | Valor explícito de `academicSemester`                        |
| XP externa    | Puntos obtenidos por los elementos de `researchExperience`   |
| Proyectos     | Cantidad de proyectos BIGATIC vinculados                     |
| Publicaciones | Cantidad de publicaciones BIGATIC vinculadas                 |
| Resultados    | Proyectos + publicaciones; se usa como resumen en la tarjeta |

Para docentes, investigadores y otros roles sin semestre:

| Stat       | Definición                                                      |
| ---------- | --------------------------------------------------------------- |
| Áreas      | Cantidad de áreas de investigación públicas                     |
| Focos      | Intereses registrados + área principal                          |
| Perfiles   | ORCID, GitHub, LinkedIn, Scholar, ResearchGate y sitio personal |
| Resultados | Proyectos + publicaciones vinculados                            |

La vinculación previa nunca se muestra. Las experiencias externas se resumen en el total de XP externa; el panel no enumera cada experiencia para conservar una composición compacta.

## Casos genéricos de referencia

Los ejemplos siguientes son deliberadamente abstractos. Documentan el comportamiento global de la fórmula y no describen a integrantes concretos.

### Estudiante de décimo semestre con continuidad

```text
décimo semestre                 20
+ reconocimiento previo          5
= 25
```

Resultado: `LVL 02 · Explorador`. La vinculación anterior se reconoce sin presentarla como trabajo realizado durante la dirección actual.

### Estudiante avanzado con experiencia en otro semillero

```text
noveno semestre                 18
+ semillero externo             12
= 30
```

Resultado: `LVL 02 · Explorador`. La experiencia externa debe estar estructurada y verificada para aportar al puntaje.

### Estudiante con resultados del periodo actual

```text
octavo semestre                 16
+ proyecto BIGATIC              12
+ publicación BIGATIC           18
= 46
```

Resultado: `LVL 03 · Constructor`. Una asignación planificada no cuenta: el proyecto y la publicación deben existir como resultados públicos del periodo.

### Integrante nuevo de cuarto semestre

```text
cuarto semestre                  8
+ XP BIGATIC actual              0
+ experiencia equivalente        0
= 8
```

Resultado: `LVL 01 · Aprendiz`. El nivel subirá cuando se documenten proyectos, publicaciones o experiencias verificables.

## Sistema visual complementario

El núcleo define el color principal de cada tarjeta:

| Núcleo visual      | Color acento | Familia cromática  |
| ------------------ | ------------ | ------------------ |
| CyberBIGATIC       | `#0878B4`    | Azul eléctrico     |
| Software + IA      | `#5954B8`    | Índigo             |
| IHC + Tech         | `#B24778`    | Magenta editorial  |
| Tech + Salud       | `#278A65`    | Verde clínico      |
| Sistemas IA        | `#BD6A16`    | Ámbar              |
| Multiárea          | `#14777D`    | Turquesa profundo  |
| BIGATIC sin núcleo | `#176B91`    | Azul institucional |

La insignia disciplinar se deriva de `academicProgram`: `ISW`/`SWE` para Ingeniería de Software, `PSI`/`PSY` para Psicología y `ACAD` para otros programas. Núcleo y programa no alteran el puntaje.

## Badges de logros

Los badges viven en `src/utils/personBadges.ts` y se derivan **únicamente de campos estructurados del frontmatter**, nunca de la biografía en prosa. No otorgan puntos ni modifican el nivel: son una lectura cualitativa de la misma información que ya sustenta el puntaje.

| Badge                       | Condición                                          | Icono         |
| --------------------------- | -------------------------------------------------- | ------------- |
| Proyecto BIGATIC            | `projects` no vacío                                | `layers`      |
| Publicación                 | `publications` no vacío                            | `file-text`   |
| Asistencia de investigación | `researchExperience.kind: research-assistantship`  | `microscope`  |
| Intercambio académico       | `researchExperience.kind: academic-exchange`       | `globe`       |
| Proyecto externo            | `researchExperience.kind: research-project`        | `flask`       |
| Semillero externo           | `researchExperience.kind: research-group`          | `users`       |
| Experiencia profesional     | `researchExperience.kind: professional-experience` | `briefcase`   |
| Multiárea                   | `researchAreas` con tres o más entradas            | `compass`     |
| Liderazgo de proyecto       | `participation.role` contiene «líder de proyecto»  | `flag`        |
| Apoyo a coordinación        | `participation.role` contiene «coordinación»       | `network`     |
| Divulgación                 | `participation.role` contiene «divulgación»        | `megaphone`   |
| ORCID                       | `orcid` presente                                   | `badge-check` |

Reglas:

1. `previousBigaticMembership` **no genera badge**, en coherencia con la regla de que la vinculación previa nunca se muestra públicamente.
2. Los tipos de `researchExperience` se deduplican: dos semilleros externos producen un solo badge.
3. Los roles de participación son excluyentes entre sí; `Integrante del núcleo` es el valor por defecto y no genera badge.
4. En el grid se muestran como máximo cuatro pines sobre el retrato, con nombre accesible; la ficha individual lista todos con su descripción.

### Próximos logros

Solo para `student-researcher`, la ficha individual muestra los badges de resultado que aún no se alcanzan (`Proyecto BIGATIC`, `Publicación`, `Multiárea`) en estado bloqueado. Es una ruta de avance, no una carencia: se excluyen deliberadamente los badges que dependen de circunstancias externas (intercambio, experiencia profesional) porque no son metas que el semillero pueda proponer.

## Reglas editoriales

1. No agregue puntajes, niveles ni posiciones manuales al frontmatter.
2. Actualice `academicSemester` al inicio de cada periodo académico.
3. Marque `previousBigaticMembership: true` solo cuando exista una vinculación en un periodo anterior; participar por primera vez en el periodo vigente no basta.
4. Registre experiencias externas únicamente en `researchExperience`, con tipo y nombre explícitos.
5. Añada `projects` y `publications` solo cuando exista la entrada pública correspondiente en esas colecciones.
6. Mantenga iguales el semestre, la continuidad, los tipos de experiencia y las relaciones entre el par ES/EN.
7. No use foto, redes, extensión de la biografía o cantidad de intereses como sustitutos de trayectoria.
8. El grid permanece A-Z; los puntajes no cambian el orden editorial.

La validación de integridad compara automáticamente las señales de ranking entre español e inglés. Las pruebas automatizadas utilizan perfiles ficticios para verificar las reglas globales y la evolución del puntaje mediante resultados actuales.

## Evolución

Toda modificación de pesos, umbrales o tipos debe actualizar en el mismo cambio:

1. `src/utils/personRanking.ts`;
2. este documento;
3. las pruebas de ranking;
4. los pares de contenido ES/EN afectados.

Después se debe ejecutar `npm run verify`.

## Historial

| Versión | Fecha                | Cambio                                                                                             |
| ------- | -------------------- | -------------------------------------------------------------------------------------------------- |
| 2.3     | 29 de agosto de 2026 | Badges de logros derivados de campos estructurados y ruta de próximos logros para estudiantes      |
| 2.2     | 29 de agosto de 2026 | Casos y datos de ejemplo completamente genéricos para documentación pública                        |
| 2.1     | 29 de agosto de 2026 | Estadísticas por rol, XP externa explícita, reconocimiento previo reducido y rango Aprendiz        |
| 2.0     | 29 de agosto de 2026 | Semestre estructurado, continuidad, equivalencias de experiencia y XP BIGATIC basado en resultados |
| 1.1     | 29 de agosto de 2026 | Sistema cromático por núcleo e insignia estructurada de programa académico                         |
| 1.0     | 29 de agosto de 2026 | Fórmula inicial basada en conexión documental                                                      |
