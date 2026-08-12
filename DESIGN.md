# Dirección de diseño de BIGATIC

**Sistema Instrumento, versión 2.** Documento rector, 30 de agosto de 2026.

Este archivo reúne las decisiones visuales, editoriales y de interacción aprobadas para el sitio web de BIGATIC. Su propósito es permitir que una persona diseñe, implemente o revise una página nueva sin reconstruir el criterio a partir del historial del proyecto.

Las reglas técnicas detalladas siguen en `docs/DESIGN-SYSTEM.md`; la lógica de niveles y puntajes vive en `docs/RANKING.md`. Si una implementación contradice este documento, se corrige la implementación o se actualiza la decisión de diseño de forma explícita y fechada.

---

## 1. De dónde sale el sistema

El sello de BIGATIC ya es un grafo dentro de un anillo: un centro, aristas que salen de él, anillos azules huecos y puntos verdes llenos, texto en arco y el año 2023. El sistema no le añade una metáfora al semillero. Le devuelve la suya a escala de interfaz.

Esto importa porque fija el nivel formal. La estética no viene de un videojuego ni de una referencia importada: viene de la identidad institucional que el semillero ya usa. Lo que las referencias aportan es el **modo de leer**, no la forma:

- **Outer Wilds:** el conocimiento se organiza como un mapa de relaciones que se recorre, no como un catálogo que se hojea.
- **Fallout y The Outer Worlds:** una interfaz puede sentirse como un aparato con carcasa, etiquetas grabadas y cifras tabulares, sin ser un juguete.
- **Assassin's Creed Black Flag, las pantallas de Abstergo:** la capa de instrumento existe encima del contenido y se sabe finita.

De ahí el nombre. El sitio se comporta como un **instrumento**: una superficie de lectura clara y una consola contenida desde la que se opera.

### Dos estados del mismo instrumento

Decisión de producto, 30 de agosto de 2026. Las superficies claras y profundas no
son dos temas visuales. Son dos estados materiales del mismo objeto:

- **cabina encendida:** dial, banda GitHub y pie; fondo profundo, carcasa
  usada, fósforo ámbar, escalas y sonido visual de terminal;
- **cuaderno de campo:** navegación, héroes, catálogos y prosa; papel blanco sobre
  suelo azul frío, tinta azul, retícula tenue, chasis y controles biselados.

Comparten el azul profundo, el papel, la geometría a escuadra, el corte de
carcasa, las escalas, la mono para datos y el mismo grano. Cambia la luz, no cambia el
sistema. El sitio no imita una CRT en cada tarjeta: la continuidad viene del
material y la gramática, no de uniformar todas las superficies.

## 2. Visión

BIGATIC debe sentirse como un semillero universitario contemporáneo que investiga y construye tecnología. La interfaz combina dos cualidades:

- seriedad académica: claridad, trazabilidad, lectura cómoda y contenido verificable;
- identidad de instrumento: retículas, registros, cifras, estados y anillos que recuerdan aparatos de medición y cartografía, no paneles de videojuego.

Las tarjetas de integrantes se inspiran en las tarjetas coleccionables contemporáneas solo en su capacidad de condensar identidad, rango, afiliación y estadísticas. No se copian marcas, ilustraciones, brillos ni exceso visual.

El sitio no debe parecer:

- una landing de SaaS;
- un videojuego infantil o un HUD;
- un tablero administrativo genérico;
- un póster convertido literalmente a HTML;
- una galería de efectos tecnológicos sin relación con el contenido.

## 3. Principios aprobados

### Investigación primero

Las entidades reales (personas, proyectos, áreas, productos, noticias) estructuran la interfaz. No se crean métricas, gráficos ni tarjetas únicamente para ocupar espacio.

### Toda forma representa una entidad

Regla que gobierna todo lo generativo del sitio. Un punto es un proyecto. Un anillo es un área. El radio de un cuerpo es un número real de integrantes. Si una forma no se puede trazar hasta una entrada publicada de las colecciones, es decoración y no se dibuja. Esta regla es lo que separa la carta de relaciones de la galería de efectos que §2 prohíbe.

### Jerarquía editorial

Cada pantalla tiene un punto de entrada claro, una sola `h1`, bloques de lectura con longitud controlada y espacios que separan ideas. El contenido principal gana sobre la decoración.

### Gamificación sobria

Los rangos y logros ayudan a leer una trayectoria; no califican el valor de una persona. El directorio se ordena alfabéticamente, nunca como clasificación competitiva. El color distingue núcleos y programas, y no establece superioridad.

### Accesibilidad y rendimiento

El sitio funciona con teclado, zoom al 200 %, movimiento reducido y desde 320 px de ancho. El contenido esencial no depende de JavaScript ni de hover.

### Nada que delate una plantilla

Prohibiciones explícitas, por ser marcas reconocibles de interfaz generada sin criterio:

- una etiqueta corta encima de cada título de sección solo porque el patrón existe; una etiqueta se admite cuando nombra una categoría real o acompaña una cifra real;
- avisos de actividad con un punto que parpadea o pulsa;
- guiones largos y guiones medios en la interfaz y en la copia editorial; se reescribe la frase o se usa coma, dos puntos o paréntesis;
- iconos decorativos que repiten la palabra que tienen al lado;
- emoji como icono de producto;
- cifras inventadas, porcentajes de relleno y barras de progreso sin dato detrás;
- códigos, siglas o identificadores derivados de un slug o de una posición: si el
  dato no existe en la colección, no se imprime.

### Cada cosa se dice una vez

Dentro de una misma página, un contenido aparece en un solo lugar. Si una sección
lista áreas con sus cifras, ninguna otra sección de esa página vuelve a listarlas.
La relación admitida entre dos bloques es de escala, no de repetición: una pieza
puede mostrar el conjunto en resumen y otra desarrollar una parte, siempre que la
segunda añada algo que la primera no dice. Cuando una pieza decorativa y una
sección de contenido compiten por decir lo mismo, se recorta la decorativa.

## 4. Identidad de marca

BIGATIC es la marca primaria. Universidad de Santander, UDES, aparece como afiliación institucional sin competir visualmente con ella.

```text
BIGATIC
Semillero de Investigación / Research Group

Afiliado a / Affiliated with
Universidad de Santander, UDES
```

Reglas:

- no modificar proporciones, símbolos, colores ni tipografía incorporada de los logos;
- no reconstruir el escudo UDES ni crear variantes del logo BIGATIC;
- reservar dimensiones de imagen para evitar saltos de layout;
- usar los assets oficiales versionados en `public/branding/`;
- no añadir sellos institucionales cuya vigencia o autorización no esté confirmada;
- la sigla UDES se compone en monoespaciada dentro de un recuadro fino, nunca en verde ni precedida de un guion.

## 5. Paleta

La paleta se parte por **función**, no por gusto. Es la decisión que sostiene todo el sistema: las superficies frías y claras son para **leer**, las superficies profundas y cálidas son para **operar**. Promediarlas produciría un sitio tibio; separarlas produce dos registros que se reconocen al instante.

### Superficie de lectura

| Token             | Valor     | Uso                               |
| ----------------- | --------- | --------------------------------- |
| `--background`    | `#e9eeec` | Suelo general de la página        |
| `--surface`       | `#f8f6ee` | Papel: tarjetas y paneles         |
| `--surface-muted` | `#dfe7e4` | Bandas de contraste suave         |
| `--text`          | `#101f30` | Texto principal                   |
| `--text-muted`    | `#4f5e68` | Texto secundario y metadatos      |
| `--border`        | `#c8d1cd` | Divisores y bordes                |
| `--rule-strong`   | `#aab9b3` | Guías punteadas y reglas de peso  |
| `--primary`       | `#10293d` | Azul del aparato, marca y títulos |
| `--primary-hover` | `#1b5c8e` | Estado interactivo                |
| `--accent`        | `#08a32c` | Verde del sello, estado y nodos   |
| `--accent-muted`  | `#dff5e5` | Fondo suave del acento            |
| `--success`       | `#087e35` | Estado positivo con texto         |
| `--focus`         | `#b66b00` | Foco visible con contraste        |

El suelo no es blanco. Es un gris azulado verdoso muy claro; las tarjetas usan
un papel marfil frío, no blanco digital. Esa diferencia permite que se separen
del fondo con bordes de 1 px y conecta la lectura con las etiquetas de papel de
la computadora.

### Materiales compartidos

| Token                | Valor     | Uso                                     |
| -------------------- | --------- | --------------------------------------- |
| `--instrument-black` | `#02070b` | Negro de cabina y CRT                   |
| `--instrument-paper` | `#d6c39b` | Rotulado cálido sobre carcasa           |
| `--instrument-muted` | `#877a61` | Rotulado secundario de cabina           |
| `--metal`            | `#403a2d` | Bisel y carcasa                         |
| `--metal-edge`       | `#a88b55` | Canto iluminado, nunca acento editorial |
| `--chamfer`          | `0.52rem` | Corte de controles físicos              |

El metal puede bordear una superficie profunda o definir un control. No se usa
como color de texto corrido. El grano aparece fuerte en cabina y casi
imperceptible sobre el papel.

### Superficie profunda del instrumento

| Token          | Valor     | Uso                                    |
| -------------- | --------- | -------------------------------------- |
| `--deep`       | `#08192a` | Fondo del aparato                      |
| `--deep-2`     | `#10293d` | Elevación baja                         |
| `--deep-3`     | `#16344b` | Elevación alta y foco de luz           |
| `--deep-rule`  | `#1e4056` | Divisores sobre fondo profundo         |
| `--deep-ink`   | `#d3e2ef` | Texto principal sobre fondo profundo   |
| `--deep-ink-2` | `#7e9ab4` | Texto secundario sobre fondo profundo  |
| `--amber`      | `#e3a54c` | Etiqueta y hallazgo dentro del aparato |
| `--amber-hi`   | `#f5c682` | Punto activo y núcleo                  |

**El ámbar y el verde nunca comparten superficie.** El verde marca estado verificado en la superficie clara; el ámbar marca lectura activa dentro del aparato. Si aparecen juntos, uno de los dos está fuera de su superficie.

### Un solo azul

Decisión de producto, 30 de agosto de 2026. El azul claro de marca (`#0a3b70`) se
retira del sistema. Donde antes iba (títulos, botones, banda institucional) va la
misma tinta profunda del aparato. Un solo azul evita que el sitio parezca dos
sistemas superpuestos, y hace que la superficie profunda se lea como la versión
encendida de la clara, no como un tema aparte.

### Alcance de la superficie profunda

La superficie profunda existe en tres lugares y solo en tres: el **dial de áreas**
del hero, la **banda institucional de GitHub** y el **pie de página**. El sitio
permanece en modo claro. No es dark mode: es una consola contenida y contable.

No se añaden púrpuras globales, neón ni texto con gradiente. El gradiente azul a verde solo puede aparecer como línea o detalle fino.

## 6. Colores de los núcleos

Cada núcleo tiene familia cromática propia, visible en badges, bordes, medallones, fondos suaves y barras. Nunca cambia la legibilidad del contenido.

| Núcleo                       | Acento    | Profundo  | Fondo suave |
| ---------------------------- | --------- | --------- | ----------- |
| CyberBIGATIC                 | `#0878b4` | `#07517b` | `#e6f6fc`   |
| Ingeniería de Software e IA  | `#5954b8` | `#383578` | `#f0effc`   |
| IHC y Tecnologías Emergentes | `#b24778` | `#762b50` | `#fbedf4`   |
| Tecnología y Salud           | `#278a65` | `#185b43` | `#e9f7f1`   |
| Sistemas Inteligentes        | `#bd6a16` | `#80460c` | `#fff3e3`   |
| Perfil multiárea             | `#14777d` | `#0c5055` | `#e7f7f7`   |
| BIGATIC sin núcleo           | `#176b91` | `#0a3b70` | `#eaf3f8`   |

Sobre la superficie profunda estas familias se levantan en luminosidad para conservar contraste. Es la misma identidad, no una paleta nueva.

El color del núcleo expresa el equipo. El color del rango expresa el nivel. Cuando ambos aparecen, cada uno conserva una función clara y no compiten por la misma superficie.

## 7. Distinción por programa académico

| Programa               | Código ES / EN | Acento    | Fondo suave |
| ---------------------- | -------------- | --------- | ----------- |
| Ingeniería de Software | `ISW` / `SWE`  | `#0a5c9e` | `#e8f2fb`   |
| Psicología             | `PSI` / `PSY`  | `#9d3f70` | `#f9eaf2`   |
| Otros programas        | `ACAD`         | `#596b7b` | `#edf1f4`   |

La insignia muestra código y nombre. No suma puntos, no altera el orden alfabético y no debe interpretarse como jerarquía académica.

## 8. Tipografía: tres voces con función distinta

Tres familias, todas servidas localmente mediante `@fontsource`, sin peticiones a un CDN. La regla que sostiene el sistema es la tercera.

**Instrument Serif** (peso 400) es la voz editorial. Se reserva para los tres tamaños display: `.display-title`, `.page-title` y `.section-title`, más el nombre de la entidad seleccionada dentro de la carta y el titular de la banda institucional. Nunca en cuerpo, tarjetas, botones ni metadatos. Tiene un único peso, así que la jerarquía se construye con tamaño y medida, no con grosor.

**IBM Plex Sans Variable** es la voz de lectura. Sostiene cuerpo, prosa, descripciones, nombres de tarjeta y navegación.

**IBM Plex Mono** (400 y 600) es la **voz del aparato**, y es una regla, no un efecto:

> Toda etiqueta, cifra, código y estado del sistema va en monoespaciada.

Eso incluye ordinales, conteos, puntajes, semestres, códigos de nivel, códigos de programa, estados, tallies de sección y sellos de fecha. Un número que el sistema calculó se compone en mono con `tabular-nums`. Un número dentro de una frase se compone en sans. Esta separación es lo que hace que el sitio se lea como un instrumento sin disfrazarse de uno.

| Rol           | Tamaño o escala                 | Familia | Regla                                           |
| ------------- | ------------------------------- | ------- | ----------------------------------------------- |
| Display       | `clamp(2.9rem, 7.4vw, 6.9rem)`  | Serif   | Máximo aproximado de 15 caracteres por línea    |
| H1 de página  | `clamp(2.7rem, 5.4vw, 5.3rem)`  | Serif   | Una por página                                  |
| H2 de sección | `clamp(2.15rem, 4.2vw, 3.8rem)` | Serif   | Marca cambio de idea, no solo separación        |
| Introducción  | `clamp(1.1rem, 1.7vw, 1.35rem)` | Sans    | Máximo cercano a 61 caracteres                  |
| Cuerpo        | `1rem / 1.7`                    | Sans    | No reducir para hacer caber una composición     |
| Prosa         | `1.0625rem`, máximo `72ch`      | Sans    | Perfiles, proyectos y publicaciones             |
| Etiqueta      | `0.6rem` a `0.7rem`             | Mono    | Mayúsculas, tracking `0.11em` a `0.16em`        |
| Cifra         | `0.8rem` a `1.05rem`            | Mono    | `tabular-nums`, peso 600, rellena a dos dígitos |

Use pesos de 600 a 720 en la sans para jerarquía. Evite fuentes muy grandes dentro de paneles de estadísticas. Nombres largos deben envolver de forma natural y no desplazar foto, descripción ni métricas.

## 9. Los cuatro motivos

Los cuatro salen del sello. Ninguno se inventa, y cada uno tiene significado fijo.

### Anillo

Un círculo hueco que encierra algo. Es la entidad que **contiene**: un área de investigación, un medallón de nivel, una marca de la página. Aparece como `.ring-mark` alrededor de un icono o una cifra, y a escala de página como arco tenue recortado por el borde en el hero y en el pie.

### Nodo y arista

`.mark-ring` es un anillo hueco pequeño: entidad contenedora, un área. `.mark-node` es un punto lleno: entidad concreta, un proyecto. La distinción es semántica y se respeta en todo el sitio: en las fichas de proyecto las áreas llevan anillo, en el pie los enlaces llevan punto, en la carta los proyectos son puntos que viajan sobre el anillo de su área.

### Insignia de misión

Texto corto en mayúsculas y monoespaciada dentro de una forma cerrada. Se usa para el nivel, el código de programa, el núcleo y el estado. Siempre lleva texto: el color nunca es la única señal.

### Registro

Etiqueta en mono, guía punteada y cifra tabular alineada a la derecha, como una tabla de almanaque. Sustituye a las cajas de estadística con número gigante. Cuando la cifra tiene una unidad contable, la guía puede ser el dato mismo: en las fichas de área, la guía de "Proyectos" son los puntos de esos proyectos.

### Chasis

Dos escuadras de 2 px en esquinas opuestas encuadran un módulo. Es la marca que
convierte una tarjeta en un panel de instrumento. Por coherencia, un módulo va a
escuadra: el radio redondo pertenece a otra familia y no se mezcla con el chasis.
Al pasar el cursor, las escuadras toman el color de estado del módulo.

### Escala

Una línea de marcas graduadas, larga cada cinco. Abre cada sección y cada hero en
lugar de una regla lisa, y lleva la cifra de la sección en el extremo derecho. Es
el elemento que da al sitio su lectura de aparato de medida.

## 10. Retícula, ritmo y dimensiones

Unidad de 4 px. Los espacios recurrentes se resuelven en múltiplos de 4 u 8 px.

| Elemento                | Parámetro                                                     |
| ----------------------- | ------------------------------------------------------------- |
| Contenedor principal    | máximo `80rem` (1280 px)                                      |
| Gutters desktop         | mínimo 16 px, normalmente 24 a 32 px                          |
| Gutters mobile          | 12 px por lado como mínimo; objetivo 16 px                    |
| Header desktop          | 80 px                                                         |
| Header mobile           | 72 px                                                         |
| Área táctil mínima      | 44 × 44 px                                                    |
| Espacio entre secciones | 72 a 128 px según viewport y densidad                         |
| Longitud editorial      | máximo `72ch`                                                 |
| Borde estándar          | 1 px                                                          |
| Radios                  | 8 px, 12 px, 16 px; el interior siempre menor que el exterior |
| Radio de badge          | píldora solo cuando expresa estado, equipo o etiqueta         |

El papel milimetrado (`.surface-grid`) tiene dos frecuencias, la fina dentro de la gruesa. Se reserva para bandas de catálogo y superficies de trabajo; no se usa como fondo general.

### Breakpoints de revisión

| Viewport     | Qué se comprueba                                         |
| ------------ | -------------------------------------------------------- |
| 320 a 430 px | Menú, nombres largos, tap targets, overflow y metadatos  |
| 768 px       | Grids intermedios, apilado, vacíos y longitud de línea   |
| 1024 a 1440  | Alineación, densidad y ritmo editorial                   |
| 1920 px      | Líneas demasiado largas y superficies sobredimensionadas |

## 11. Bordes, superficies y profundidad

Los bordes y la alineación construyen la interfaz. Las sombras solo añaden separación leve, y van teñidas del azul del sello para que el objeto pertenezca a la escena.

- borde exterior de una entidad: 1 px con el color semántico o el acento del núcleo a baja opacidad;
- borde interior de tarjeta de integrante: más tenue y con radio menor;
- sombras difusas, de baja opacidad, sin efecto de panel flotante;
- grano (`--grain`) solo sobre superficies profundas, en `mix-blend-mode: overlay` y opacidad máxima 0.16;
- no encerrar párrafos sueltos en tarjetas;
- no apilar tarjetas dentro de tarjetas salvo jerarquía funcional inequívoca.

## 12. Tarjetas de integrantes

Orden de lectura:

1. rango y nivel;
2. núcleo;
3. fotografía e insignia de programa;
4. nombre;
5. rol;
6. descripción breve;
7. puntaje y estadísticas resumidas.

Composición:

- marco exterior con color del núcleo;
- borde interior discreto;
- medallón de nivel con geometría propia;
- chip del equipo;
- imagen contenida en un escenario con microgrilla;
- badge disciplinar superpuesto sin cubrir el rostro;
- bloque inferior de estadísticas con etiquetas y cifras en mono tabular.

### Proporción y densidad

- tres columnas en desktop, dos en tablet, una en mobile;
- todas las tarjetas de una fila mantienen coherencia de altura;
- la fotografía ocupa entre 36 % y 42 % de la altura visible;
- el nombre admite dos o tres líneas sin empujar las estadísticas fuera del marco;
- la descripción se limita a tres líneas en el grid y permanece completa en el perfil;
- las estadísticas no convierten la tarjeta en un tablero.

### Interacción

Toda la tarjeta enlaza al perfil mediante un enlace semántico en el nombre. El hover eleva hasta 3 px y refuerza el borde, solo en dispositivos con hover real. El estado `active` reduce ligeramente la escala. El foco es visible sobre el contorno completo.

## 13. Fotografías de integrantes

Misma proporción, mismo marco, misma forma. Las diferencias de archivo original no pueden producir círculos, óvalos, alturas ni recortes incompatibles.

- fuente en proporción 1:1, renderizada con `object-fit: cover`;
- encuadre de cabeza y hombros, con ojos y rostro en una zona estable entre tarjetas;
- el sujeto llena el marco sin vacío excesivo sobre la cabeza;
- se permite zoom adicional cuando el retrato deja a la persona demasiado pequeña;
- no estirar ni deformar;
- dimensiones declaradas y formato web optimizado;
- fondo sólido suave, compatible con la UI y el color del núcleo, cuando la edición esté autorizada;
- sin fotografía válida, placeholder tipográfico con iniciales.

### Ajustes editoriales vigentes

Excepciones de contenido, no variantes del componente:

- Erit Santiago Arenas Rangel, Juan David Ortiz Galvis, Juan Diego Castellanos Pinzón, Lucas Sumalave y Mariana Acero Velásquez requieren zoom mayor para llenar el encuadre;
- el encuadre de Erit Santiago Arenas Rangel, Ismael Manuel Castellano Galván, Jhilmar Andrey Toloza Joya, Juan David Ortiz Galvis, Juan Diego Castellanos Pinzón, Lucas Sumalave y Mariana Acero Velásquez compensa la posición vertical del original;
- el encuadre de Roland Duván Lizarazo Calderón se desplaza en dirección opuesta para equilibrar el rostro;
- Ismael Manuel Castellano Galván conserva el fondo original;
- Juan Diego Castellanos Donado, Andrés Gonzalo Beltrán Almeyda, Jhilmar Andrey Toloza Joya y Sofía Forero Melo conservan su fondo original;
- Jorge Armando Rincones Torres no usa la fotografía grupal recibida: se muestra placeholder hasta contar con un retrato individual.

El recorte final se revisa dentro de la tarjeta real, no únicamente sobre el archivo cuadrado.

## 14. Sistema de rangos, stats y badges

| Nivel | Código   | Rango ES    | Rango EN   |
| ----: | -------- | ----------- | ---------- |
|     1 | `LVL 01` | Aprendiz    | Apprentice |
|     2 | `LVL 02` | Explorador  | Explorer   |
|     3 | `LVL 03` | Constructor | Builder    |
|     4 | `LVL 04` | Vanguardia  | Vanguard   |
|     5 | `LVL 05` | Mentor      | Mentor     |

### Reglas de presentación

- el nivel se calcula; no se escribe manualmente en un perfil;
- el semestre es campo estructurado y aparece como estadística de estudiantes;
- XP externa significa puntos por experiencia investigativa verificada, no años ni cantidad de actividades;
- proyectos y publicaciones solo cuentan cuando son resultados públicos del periodo actual;
- una asignación a un proyecto planificado no concede XP;
- la vinculación previa puede aportar al cálculo, pero nunca se muestra como stat, badge ni explicación pública;
- la página no publica razones individualizadas de valoración ni tabla de posiciones;
- docentes y roles sin semestre usan estadísticas pertinentes a su perfil, no un "semestre 0";
- todo código, nivel y cifra de este sistema se compone en monoespaciada, según §8;
- un valor ausente se imprime como `--`, nunca como guion largo ni como cero inventado.

La fórmula, pesos y reglas editoriales completas están en `docs/RANKING.md`, siempre con ejemplos ficticios.

### Badges

Representan hechos documentados, equipo o disciplina. Incluyen texto y, cuando corresponde, un icono Lucide. El color nunca es la única señal. Tres familias: equipo, disciplina y logro. Los logros futuros pueden aparecer bloqueados únicamente si explican qué evidencia los activa, y no prometen premios ni resultados inexistentes.

## 15. Perfil individual

- la foto es menor que en la primera versión validada y no compite con el nombre;
- "Formación y enfoque" ocupa la columna editorial principal;
- "Detalles del perfil", áreas e intereses forman la columna complementaria;
- el panel de rango, stats y logros ocupa el espacio bajo "Formación y enfoque";
- el panel conserva retícula limpia, tipografía contenida y cuatro estadísticas de igual ancho;
- no se enumera "experiencia verificada" dentro del panel de rango;
- no se muestra "trayectoria en BIGATIC";
- las redes y perfiles externos se distinguen de la navegación interna.

## 16. Directorio de integrantes

Grid A a Z por nombre dentro de cada categoría, declarado de forma visible. Categorías: Investigador líder, Investigadores docentes, Estudiantes investigadores, Colaboradores, Egresados. No usar "investigadores estudiantes". El orden alfabético no se altera por rango, semestre, programa, núcleo ni fotografía.

## 17. Proyectos y actividad vinculada

Las páginas de detalle de líneas y proyectos no muestran personas como lista de enlaces sin jerarquía: usan el lenguaje visual del grid de integrantes en densidad menor.

Para proyectos planificados:

- el estado "Planificado" es visible;
- el equipo se presenta como propuesta inicial sujeta a revisión académica;
- la coordinación se denomina "Coordinación propuesta" hasta que el proyecto esté activo;
- objetivos y metodología se escriben en futuro o como propuesta;
- no se inventan fechas, repositorios, resultados, financiación ni alianzas;
- el proyecto planificado no modifica las estadísticas personales.

## 18. Enlaces y navegación

Los enlaces internos abren en la pestaña actual: header, breadcrumbs, tarjetas, cambio de idioma, proyectos, áreas, noticias, perfiles y carta de relaciones.

Solo los destinos externos de identidad o producción (GitHub, ORCID, LinkedIn, Google Scholar, ResearchGate, sitios personales, DOI, repositorios) abren en pestaña nueva con `target="_blank"` y `rel="noopener noreferrer"`.

- usar `<a>` para navegar y `<button>` para ejecutar una acción;
- el texto describe el destino;
- una flecha externa refuerza el cambio de contexto cuando sea útil;
- no usar "haz clic aquí";
- una sección tiene una sola acción primaria.

## 19. Componentes y patrones

| Componente            | Función                      | Regla clave                                                       |
| --------------------- | ---------------------------- | ----------------------------------------------------------------- |
| `SiteHeader`          | Navegación principal         | Compacto, sticky, 44 px de objetivo táctil, operable por teclado  |
| `SiteFooter`          | Cierre e identidad           | Superficie profunda; etiquetas en mono ámbar; enlaces con nodo    |
| `StarChart`           | Carta de relaciones          | Ver §22; toda forma representa una entidad publicada              |
| `ContentLayout`       | Hero y contexto de páginas   | Segunda columna solo con información real                         |
| `SectionHeader`       | Apertura de sección          | Regla fina y cifra real a la derecha; sin etiqueta decorativa     |
| `PeopleGrid`          | Directorio y equipos         | Tarjeta uniforme, A a Z, fotografía estandarizada                 |
| `PersonProgress`      | Nivel y estadísticas         | Datos estructurados, mono tabular, sin explicaciones personales   |
| `ProjectCard`         | Resumen de proyecto          | Nodo lleno en el título, áreas con anillo, cruce declarado        |
| `ProjectBuildSketch`  | Esquema técnico del proyecto | Código, build, áreas reales y estado; sin métricas inventadas     |
| `ProjectDetailPage`   | Expediente técnico bilingüe  | Índice, metadatos y secciones en una única implementación         |
| `ResearchAreaCard`    | Línea de investigación       | Anillo, croquis propio y registro con guía punteada               |
| `ResearchFieldPlate`  | Apertura visual del catálogo | Ilustración editorial y pie legible; nunca una sección vacía      |
| `TransmissionConsole` | Enlace científico compartido | Una misma estación visual para convocatorias, únete y contacto    |
| `StatusBadge`         | Estado textual               | El color complementa, nunca reemplaza, la etiqueta                |
| `RankLadder`          | Escala de rangos             | Progresión continua, nunca clasificación                          |
| `NewsCard`            | Actualidad                   | Fecha localizada y enlace descriptivo                             |
| `CatalogEmptyState`   | Colección sin contenido      | Explica con sobriedad; no inventa entidades                       |
| `BitProbe`            | Mascota de campo interactiva | SVG transparente; deriva leve, antena, brazo y registro accesible |

Antes de crear una tarjeta, comprobar que representa una entidad o un patrón repetido. No crear wrappers abstractos sin responsabilidad propia.

## 20. Iconografía

Lucide Astro es el único sistema de iconos de interfaz. Trazo lineal y tamaño coherente.

- si el texto adyacente ya explica la acción, el icono usa `aria-hidden="true"`;
- un botón solo con icono necesita nombre accesible;
- no usar emoji como icono de producto;
- no añadir bibliotecas de iconos paralelas;
- los motivos de §9 no son iconos: son marcas semánticas y se dibujan en CSS o Canvas.

### Ilustración de campo

La ilustración no es iconografía ni visualización de datos. Añade mundo y
materialidad sin fingir que una forma decorativa es una cifra real. Tiene tres
escalas aprobadas:

- **lámina editorial:** una escena panorámica original, integrada en el catálogo
  de investigación con pie de figura, texto alternativo y tratamiento de papel;
- **croquis de área:** un SVG lineal propio por cada tipo de área. Sustituye al
  icono genérico y representa su modo de trabajo: módulos, radar, infraestructura,
  interacción, datos o red;
- **fondo ambiental:** una ilustración raster muy tenue y recortada por máscara.
  Solo puede vivir en una pausa amplia de contenido o en una superficie profunda;
  nunca cubre toda la página.

Reglas:

- no copiar vehículos, computadores, interfaces ni personajes reconocibles de
  las referencias de videojuegos;
- no incrustar texto generado, cifras falsas, logos ni marcas dentro de una
  ilustración;
- una lámina raster se entrega en WebP, con dimensiones reservadas y un máximo
  de 250 KB;
- un fondo raster se entrega en WebP y apunta a menos de 120 KB. Su color de
  borde coincide con la superficie donde se monta para que el recorte no forme
  un rectángulo;
- el croquis SVG usa los tokens del sitio, hereda el contraste y conserva su
  significado sin movimiento;
- solo el barrido que responde al hover puede moverse, dura menos de 800 ms y se
  elimina con movimiento reducido;
- una ilustración se integra dentro de una sección con contenido real. No crea
  por sí sola una sección ni repite la información de la tarjeta;
- una página admite como máximo dos fondos ambientales claros. El footer tiene
  una escena propia y compartida por todo el sitio;
- el contenido y sus controles quedan en una capa superior. La ilustración es
  `aria-hidden`, no recibe eventos y se atenúa o recoloca en móvil.

Activos aprobados del home:

| Archivo                            | Función                                   | Presupuesto |
| ---------------------------------- | ----------------------------------------- | ----------: |
| `research-field-plate-v2.webp`     | Lámina editorial de investigación         |      250 KB |
| `background-orbital-study.webp`    | Fondo ambiental de proyectos              |      120 KB |
| `background-archive-recorder.webp` | Fondo ambiental de producción             |      120 KB |
| `opensource-computing-bay-v1.webp` | Banco de software de la banda GitHub      |      120 KB |
| `footer-computing-outpost-v2.webp` | Observatorio de cómputo dentro del footer |      120 KB |

BIT-01 no es un activo raster. Se dibuja como SVG inline para conservar un fondo
transparente real, responder a los tokens y animar por separado plato, brazo y
señal sin desplazar un rectángulo de imagen.

Activo compartido en páginas de participación:

| Archivo                        | Función                                        | Presupuesto |
| ------------------------------ | ---------------------------------------------- | ----------: |
| `transmission-console-v1.webp` | Consola de enlace para colaboración y llamadas |      250 KB |

## 21. Movimiento

La animación comunica respuesta, jerarquía o progreso. No existe una secuencia
cinematográfica activa en el home: la dirección de intro queda diferida hasta una
decisión posterior y no forma parte del alcance actual del sitio.

| Patrón                 |      Duración | Propiedades                                |
| ---------------------- | ------------: | ------------------------------------------ |
| Hover/focus de control |  120 a 180 ms | color, fondo, borde y `transform`          |
| Elevación de tarjeta   |  160 a 200 ms | `transform` y sombra                       |
| Reveal opcional        | máximo 240 ms | opacidad y desplazamiento de hasta 12 px   |
| Barra de progreso      | máximo 240 ms | escala o ancho, una vez                    |
| Escalonado             |    40 a 60 ms | máximo seis elementos visibles             |
| Deriva ambiental       |      continuo | solo dentro del dial de áreas (§22)        |
| BIT-01                 |      continuo | arco leve y señal; se pausa al interactuar |
| Cambio de página       |        380 ms | contracción y expansión de tubo CRT        |

Reglas:

- animar `transform` y `opacity`; evitar propiedades que fuerzan layout;
- no usar `transition: all`;
- hover solo bajo `@media (hover: hover) and (pointer: fine)`;
- `active` da respuesta inmediata y no desplaza el layout;
- `prefers-reduced-motion: reduce` elimina reveals, conteos, elevación y toda deriva;
- sin JavaScript, el contenido permanece visible;
- no usar parallax de scroll, scroll secuestrado, partículas ni animaciones repetidas del menú; el único cambio de documento admitido es el cierre CRT y el único parallax es el de cursor acotado que define §22;
- no añadir Remotion ni infraestructura de video: no existe superficie audiovisual que lo justifique;
- no añadir Three.js ni WebGL mientras el contenido se resuelva en Canvas 2D; la geometría 3D real sería el único caso que lo justificaría.

## 22. Dial de áreas

Estado: aprobado el 30 de agosto de 2026. Sustituye a la carta de relaciones, que
ocupaba una sección entera del hero y repetía el catálogo de áreas que la página
ya lista más abajo.

El dial ocupa la columna derecha del hero de inicio. **Es una pieza decorativa, no
una sección.** Muestra los cuerpos, sus relaciones y el rótulo de cada área, y
nada más: ni cifras, ni descripciones, ni listas de proyectos. Todo eso vive en la
sección de áreas y en el catálogo de proyectos, y por §3 no se repite aquí.

### Qué representa

- **Cuerpo:** un área de investigación. Su radio se calcula desde la cantidad real de integrantes vinculados. Se dibuja con terminador día y noche, con una sola fuente de luz para toda la escena.
- **Anillo:** la órbita del área. Existe solo si el área tiene proyectos.
- **Punto sobre el anillo:** un proyecto vinculado a esa área.
- **Núcleo ámbar:** BIGATIC.
- **Arista:** la pertenencia del área al semillero.
- **Bisel graduado:** marcas cada 6 grados, largas cada 30. Es el borde del aparato.

### Regla que gobierna la excepción

**Toda forma dibujada corresponde a una entrada publicada de las colecciones.** Si
un punto no se puede trazar hasta un área, un proyecto o un integrante real, es
partícula y no se admite.

### Alcance

| Aspecto                | Límite                                                   |
| ---------------------- | -------------------------------------------------------- |
| Superficies permitidas | Un dial por sitio, en el hero de inicio                  |
| Paleta                 | Solo los tokens profundos de §5 y las familias de núcleo |
| Movimiento             | Los proyectos recorren su anillo; los cuerpos no derivan |
| Tecnología             | Canvas 2D, sin librerías de render                       |
| Presupuesto            | 40 KB de JavaScript y 60 fps en portátil de gama media   |

Los cuerpos quedan fijos a propósito: los rótulos son HTML colocado sobre las
mismas coordenadas, y cualquier deriva los desincronizaría del dibujo.

### Contrato obligatorio

1. Los rótulos de área son enlaces reales renderizados en el servidor. Sin JavaScript el dial queda vacío pero los seis enlaces siguen ahí y llevan a su página.
2. El rótulo usa `shortName`, no el nombre completo: el campo existe justamente porque el nombre largo no cabe en el bisel.
3. Enfocar o apuntar un rótulo enciende su cuerpo, y al soltar se apaga. Rótulo y cuerpo son la misma entidad.
4. Con `prefers-reduced-motion: reduce` el lienzo se dibuja una vez y queda estático.
5. El lienzo lleva `aria-hidden="true"`; toda la información vive en los rótulos.
6. Si el presupuesto de rendimiento no se cumple, se recorta el dial, no el presupuesto.

### Riel de secciones

Complemento del dial en el resto del sitio. Es el índice de la página leído como
aparato: una marca por sección real, la activa encendida en verde, el rótulo
visible solo al acercarse para no tapar contenido. Reglas:

- se construye en el cliente a partir de los `section[aria-labelledby]` que la página ya declara, así que no se cablea por ruta y no puede desincronizarse del contenido;
- omite el `h1`, que titula la página entera y no es una parada;
- aparece solo desde 78 rem y con tres secciones o más;
- es ayuda de navegación, no contenido: sin JavaScript no existe y no se pierde nada.

## 23. Accesibilidad

Objetivo: WCAG 2.2 AA.

- landmarks semánticos y enlace para saltar al contenido;
- headings consecutivos;
- foco visible de 3 px con offset de 4 px; sobre superficie profunda el foco es ámbar;
- navegación completa con teclado;
- `aria-expanded` y `aria-controls` en desplegables;
- Escape cierra el menú móvil;
- contraste AA en normal, hover, focus y disabled;
- color acompañado de texto o forma;
- alt útil; imágenes decorativas con alt vacío;
- targets mínimos de 44 × 44 px;
- contenido legible a 200 % de zoom;
- ausencia de overflow horizontal desde 320 px;
- español e inglés probados, incluidos nombres y títulos largos;
- movimiento reducido respetado;
- tablas con encabezados y comportamiento móvil accesible.

## 24. Contenido y privacidad

El repositorio es público. El diseño no debe incentivar que se expongan datos administrativos ni explicaciones internas.

- publicar únicamente información apropiada para la web;
- no copiar documentos de identidad, códigos, teléfonos, correos privados, disponibilidad horaria, respuestas de formularios ni evaluaciones internas;
- no publicar razones individualizadas de puntajes ni decisiones de asignación;
- `docs/RANKING.md` contiene reglas globales y ejemplos ficticios;
- una corrección directa del responsable editorial prevalece sobre datos erróneos de un archivo de origen;
- las versiones ES y EN conservan relaciones y datos estructurados equivalentes;
- el sitio omite campos vacíos en lugar de mostrar placeholders que parezcan datos reales.

## 25. Contenido bilingüe

Cada entidad pública tiene par español e inglés cuando el esquema lo exige. La traducción preserva clave de traducción, estado, relaciones con personas, áreas y productos, semestre y señales estructuradas del ranking, fechas, URLs e intención editorial. Los slugs pueden localizarse, pero el cambio de idioma siempre lleva al equivalente real.

## 26. QA visual

Antes de considerar terminada una pantalla:

1. comprobar jerarquía sin color ni imágenes;
2. revisar alineaciones contra la retícula de 4 y 8 px;
3. verificar que radios interiores y exteriores sean coherentes;
4. detectar márgenes colapsados, padding duplicado y vacíos sin función;
5. probar nombres, títulos y traducciones largas;
6. comprobar tarjetas con y sin foto, enlaces o metadatos;
7. recorrer con teclado y revisar foco, incluida la carta;
8. probar 320, 390, 768, 1024, 1440 y 1920 px;
9. activar reducción de movimiento y confirmar que la carta queda estática;
10. revisar contraste y zoom al 200 %;
11. confirmar que ninguna etiqueta ni cifra del sistema quedó en sans;
12. confirmar que no aparecen guiones largos ni medios en la interfaz;
13. ejecutar las validaciones de contenido y el build;
14. comparar la página real, no solo el componente aislado.

## 27. Criterio para futuras decisiones

Cuando aparezca una necesidad nueva, resolverla en este orden:

1. contenido y significado;
2. estructura semántica;
3. jerarquía y espaciado;
4. responsive y accesibilidad;
5. color, borde e iconografía;
6. movimiento, solo si mejora la comprensión o la respuesta.

Dos preguntas cierran la decisión:

- ¿la forma nueva representa una entidad real del sitio?
- ¿mejora identidad, lectura o interacción, o solo hace que se vea más tecnológico?

Si la respuesta a la primera es no, o la segunda cae del lado equivocado, no se incorpora.
