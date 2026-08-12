import type { Locale } from './site';

type Localized<T> = Record<Locale, T>;
type CopyPair = readonly [title: string, description: string];

interface HomePageCopy {
  title: string;
  description: string;
  kicker: string;
  heroTitle: string;
  heroBody: string;
  unitRecords: string;
  explore: string;
  projects: string;
  location: string;
  researchTitle: string;
  researchDescription: string;
  allResearch: string;
  transversalLabel: string;
  transversalBody: string;
  projectsTitle: string;
  projectsDescription: string;
  allProjects: string;
  peopleTitle: string;
  peopleDescription: string;
  viewPeople: string;
  outputsTitle: string;
  outputsDescription: string;
  viewOutputs: string;
  softwareTitle: string;
  softwareBody: string;
  githubCta: string;
  newsTitle: string;
  allNews: string;
  callLabel: string;
  callDeadline: string;
  callCta: string;
}

export const homePageCopy = {
  es: {
    title: 'BIGATIC | Semillero de Investigación - Universidad de Santander',
    description:
      'Semillero de investigación de la Universidad de Santander enfocado en ingeniería de software, ciberseguridad y computación aplicada.',
    kicker: 'Semillero de investigación · UDES',
    heroTitle: 'Ingeniería de software para problemas reales',
    heroBody:
      'BIGATIC formula y desarrolla proyectos de investigación aplicada en ingeniería de software, ciberseguridad y otras áreas de la computación.',
    unitRecords: 'registros',
    explore: 'Explorar investigación',
    projects: 'Ver proyectos',
    location: 'Programa de Ingeniería de Software',
    researchTitle: 'Áreas de investigación',
    researchDescription:
      'Las áreas organizan los temas de trabajo y permiten relacionar proyectos, integrantes y resultados.',
    allResearch: 'Ver todas las áreas',
    transversalLabel: 'Enfoque transversal',
    transversalBody:
      'La inteligencia artificial, la analítica de datos y la automatización pueden apoyar varias áreas. Su uso depende de la pregunta, los datos y el método de cada proyecto.',
    projectsTitle: 'Proyectos de investigación',
    projectsDescription:
      'Cada ficha reúne el problema, los objetivos, el método, el equipo, el estado y los resultados disponibles.',
    allProjects: 'Explorar proyectos',
    peopleTitle: 'Equipo de investigación',
    peopleDescription:
      'Conoce a quienes participan en los proyectos, procesos y actividades de investigación de BIGATIC.',
    viewPeople: 'Ver todos los integrantes',
    outputsTitle: 'Producción académica y técnica',
    outputsDescription:
      'El catálogo relaciona publicaciones, software, datos e informes con los proyectos y las áreas de investigación de BIGATIC.',
    viewOutputs: 'Consultar producción',
    softwareTitle: 'BIGATIC Research Group',
    softwareBody:
      'La organización de BIGATIC en GitHub reúne sus repositorios públicos, prototipos y documentación técnica.',
    githubCta: 'Ir a la organización en GitHub',
    newsTitle: 'Actividad y convocatorias del semillero',
    allNews: 'Ver actualidad',
    callLabel: 'Convocatoria abierta',
    callDeadline: 'Inscripciones hasta el',
    callCta: 'Conocer la convocatoria',
  },
  en: {
    title: 'BIGATIC Research Group | Universidad de Santander',
    description:
      'BIGATIC Research Group develops applied research in software engineering, cybersecurity, and computing at Universidad de Santander.',
    kicker: 'Research group · UDES',
    heroTitle: 'Software engineering for real-world problems',
    heroBody:
      'BIGATIC develops applied research projects in software engineering, cybersecurity, and other areas of computing.',
    unitRecords: 'records',
    explore: 'Explore research',
    projects: 'View projects',
    location: 'Software Engineering Program',
    researchTitle: 'Research areas',
    researchDescription:
      'The areas organize topics of work and connect projects, people, and outputs.',
    allResearch: 'View all research areas',
    transversalLabel: 'Cross-cutting approach',
    transversalBody:
      'Artificial intelligence, data analytics, and automation can support several areas. Their use depends on each project’s question, data, and method.',
    projectsTitle: 'Research projects',
    projectsDescription:
      'Each record presents the problem, objectives, method, team, status, and available results.',
    allProjects: 'Explore projects',
    peopleTitle: 'Research team',
    peopleDescription:
      'Meet the people who contribute to BIGATIC’s research projects, processes, and activities.',
    viewPeople: 'View all people',
    outputsTitle: 'Academic and technical outputs',
    outputsDescription:
      'The catalog connects publications, software, data, and reports with BIGATIC projects and research areas.',
    viewOutputs: 'Browse outputs',
    softwareTitle: 'BIGATIC Research Group',
    softwareBody:
      'BIGATIC’s GitHub organization brings together its public repositories, prototypes, and technical documentation.',
    githubCta: 'Open the GitHub organization',
    newsTitle: 'Research group activity and calls',
    allNews: 'View news',
    callLabel: 'Open call',
    callDeadline: 'Applications through',
    callCta: 'View the call',
  },
} satisfies Localized<HomePageCopy>;

interface AboutPageCopy {
  title: string;
  description: string;
  purposeTitle: string;
  purposeBody: string;
  identity: string;
  identityBody: string;
  objectivesTitle: string;
  objectiveIntro: string;
  items: readonly string[];
  research: string;
  institutional: string;
}

export const aboutPageCopy = {
  es: {
    title: 'Investigación aplicada desde la Ingeniería de Software',
    description:
      'BIGATIC es un semillero de investigación de la Universidad de Santander orientado al desarrollo de proyectos tecnológicos y soluciones en computación.',
    purposeTitle: 'Propósito del semillero',
    purposeBody:
      'BIGATIC ofrece un espacio para formular preguntas, desarrollar proyectos y fortalecer capacidades investigativas en ingeniería de software y computación. El grupo articula estudio, experimentación, diseño, implementación y evaluación.',
    identity: 'Identidad institucional',
    identityBody:
      'BIGATIC es un semillero de investigación de UDES, adscrito al Programa de Ingeniería de Software en Bucaramanga.',
    objectivesTitle: 'Objetivos de trabajo',
    objectiveIntro:
      'Estos objetivos expresan la orientación actual del semillero; no constituyen una misión o visión oficial aprobada por UDES.',
    items: [
      'Promover investigación aplicada en ingeniería de software y computación.',
      'Fortalecer capacidades para formular, ejecutar y comunicar procesos de investigación.',
      'Desarrollar proyectos con sustento técnico y metodológico.',
      'Generar resultados académicos y tecnológicos documentados.',
      'Promover investigación interdisciplinaria y buenas prácticas de ingeniería.',
      'Favorecer software reproducible y abierto cuando el contexto lo permita.',
    ],
    research: 'Explorar investigación',
    institutional: 'Perfil institucional UDES',
  },
  en: {
    title: 'Applied research grounded in Software Engineering',
    description:
      'BIGATIC is a research group at Universidad de Santander focused on technology projects and computing solutions.',
    purposeTitle: 'Purpose of the research group',
    purposeBody:
      'BIGATIC provides a setting for posing questions, developing projects, and strengthening research capabilities in software engineering and computing. The group connects study, experimentation, design, implementation, and evaluation.',
    identity: 'Institutional identity',
    identityBody:
      'BIGATIC is a UDES research group affiliated with the Software Engineering Program in Bucaramanga.',
    objectivesTitle: 'Working objectives',
    objectiveIntro:
      "These objectives express the group's current direction; they are not an official mission or vision approved by UDES.",
    items: [
      'Promote applied research in software engineering and computing.',
      'Strengthen capabilities to formulate, conduct, and communicate research.',
      'Develop projects with sound technical and methodological foundations.',
      'Generate documented academic and technological results.',
      'Promote interdisciplinary research and good engineering practices.',
      'Support reproducible and open software when appropriate.',
    ],
    research: 'Explore research',
    institutional: 'UDES institutional profile',
  },
} satisfies Localized<AboutPageCopy>;

interface ResearchPageCopy {
  title: string;
  description: string;
  introTitle: string;
  intro: string;
  current: string;
  developing: string;
  transversalTitle: string;
  transversalBody: string;
}

export const researchPageCopy = {
  es: {
    title: 'Áreas de investigación',
    description:
      'Las áreas de BIGATIC cubren distintos campos de la ingeniería de software y la computación. Cada una conecta preguntas, métodos, proyectos y resultados.',
    introTitle: 'Cómo se organizan las áreas',
    intro:
      'Las áreas delimitan campos de trabajo y ayudan a relacionar el catálogo académico. Indican temas de interés, no porcentajes de especialización ni actividad publicada.',
    current: 'Áreas actuales',
    developing: 'Áreas en desarrollo',
    transversalTitle: 'Capacidades transversales',
    transversalBody:
      'La inteligencia artificial, la analítica de datos y la automatización pueden apoyar proyectos en varias áreas. Su uso depende de la pregunta de investigación, los datos disponibles y la forma de evaluar los resultados.',
  },
  en: {
    title: 'Research areas',
    description:
      'BIGATIC covers several fields within software engineering and computing. Each area connects research questions, methods, projects, and outputs.',
    introTitle: 'How the areas are organized',
    intro:
      'The areas define fields of work and connect the academic catalog. They indicate topics of interest, not percentages of specialization or published activity.',
    current: 'Current areas',
    developing: 'Areas in development',
    transversalTitle: 'Cross-cutting capabilities',
    transversalBody:
      'Artificial intelligence, data analytics, and automation can support projects across several areas. Their use depends on the research question, available data, and evaluation approach.',
  },
} satisfies Localized<ResearchPageCopy>;

interface ProjectsPageCopy {
  title: string;
  description: string;
  frameworkTitle: string;
  frameworkBody: string;
  principles: readonly CopyPair[];
  catalog: string;
  catalogNote: string;
  emptyTitle: string;
  emptyBody: string;
  research: string;
}

export const projectsPageCopy = {
  es: {
    title: 'Proyectos de investigación',
    description:
      'Un catálogo preparado para documentar preguntas, métodos, equipos y resultados de investigación de BIGATIC.',
    frameworkTitle: 'Marco de documentación',
    frameworkBody:
      'Cada proyecto debe poder leerse y verificarse. Su ficha conecta el problema investigado con los objetivos, la metodología, los integrantes, las tecnologías y los productos, y solo muestra los campos que cuentan con información validada.',
    principles: [
      ['Problema', 'Contexto y pregunta de investigación claramente formulados.'],
      ['Método', 'Objetivos, metodología y criterios de evaluación documentados.'],
      ['Trazabilidad', 'Relación con áreas, integrantes, repositorios y productos.'],
    ],
    catalog: 'Catálogo',
    catalogNote:
      'Cartera inicial priorizada por coincidencia de intereses. Los equipos de los proyectos planificados son propuestas de trabajo sujetas a revisión académica.',
    emptyTitle: 'No hay proyectos publicados actualmente',
    emptyBody:
      'La estructura está lista para incorporar proyectos reales. Antes de publicarlos se validarán título, estado, equipo, alcance y vínculos institucionales.',
    research: 'Explorar las áreas de investigación',
  },
  en: {
    title: 'Research projects',
    description:
      'A catalog designed to document BIGATIC research questions, methods, teams, and results.',
    frameworkTitle: 'Documentation framework',
    frameworkBody:
      'Every project should be readable and verifiable. Its record connects the research problem with the objectives, methodology, people, technologies, and outputs, and only shows fields with validated information.',
    principles: [
      ['Problem', 'A clearly formulated context and research question.'],
      ['Method', 'Documented objectives, methodology, and evaluation criteria.'],
      ['Traceability', 'Connections to areas, people, repositories, and outputs.'],
    ],
    catalog: 'Catalog',
    catalogNote:
      'An initial portfolio prioritized through shared interests. Teams shown for planned projects are working proposals subject to academic review.',
    emptyTitle: 'No projects are currently published',
    emptyBody:
      'The structure is ready for real projects. Before publication, the title, status, team, scope, and institutional links will be validated.',
    research: 'Explore research areas',
  },
} satisfies Localized<ProjectsPageCopy>;

export const peopleRoles = [
  'research-lead',
  'faculty-researcher',
  'student-researcher',
  'collaborator',
  'alumni',
] as const;

type PeopleRole = (typeof peopleRoles)[number];

export const peopleRoleLabels = {
  es: {
    'research-lead': 'Investigador líder',
    'faculty-researcher': 'Investigadores docentes',
    'student-researcher': 'Estudiantes investigadores',
    collaborator: 'Colaboradores',
    alumni: 'Egresados',
  },
  en: {
    'research-lead': 'Research Lead',
    'faculty-researcher': 'Faculty Researchers',
    'student-researcher': 'Student Researchers',
    collaborator: 'Collaborators',
    alumni: 'Alumni',
  },
} satisfies Localized<Record<PeopleRole, string>>;

interface PeoplePageCopy {
  title: string;
  description: string;
  modelTitle: string;
  modelBody: string;
  fieldsLabel: string;
  roleAndAffiliation: string;
  interestsAndProjects: string;
  emptyTitle: string;
  emptyBody: string;
  contact: string;
  publishedProfile: string;
  publishedProfiles: string;
  alphabeticalOrder: string;
  alphabeticalDetail: string;
  rankLegendTitle: string;
  rankLegendBody: string;
}

export const peoplePageCopy = {
  es: {
    title: 'Integrantes',
    description:
      'Conoce los roles, intereses, proyectos y resultados de las personas que participan en BIGATIC.',
    modelTitle: 'Equipo BIGATIC',
    modelBody:
      'El directorio está organizado por función académica. Cada perfil puede relacionarse con proyectos, publicaciones, software y áreas de investigación.',
    fieldsLabel: 'Campos de perfil',
    roleAndAffiliation: 'Rol y afiliación',
    interestsAndProjects: 'Intereses y proyectos',
    emptyTitle: 'No hay perfiles publicados actualmente',
    emptyBody:
      'El directorio está listo para incorporar al investigador líder, investigadores docentes, estudiantes investigadores, colaboradores y egresados cuando su información sea aprobada.',
    contact: 'Consultar cómo aportar información',
    publishedProfile: 'perfil publicado',
    publishedProfiles: 'perfiles publicados',
    alphabeticalOrder: 'Orden alfabético A-Z',
    alphabeticalDetail: 'Por nombre dentro de cada categoría',
    rankLegendTitle: 'Trayectoria BIGATIC',
    rankLegendBody:
      'El rango refleja avance académico y resultados documentados en proyectos y publicaciones. No es una calificación académica ni una certificación de competencias.',
  },
  en: {
    title: 'People',
    description:
      'Meet the people in BIGATIC and learn about their roles, interests, projects, and outputs.',
    modelTitle: 'The BIGATIC team',
    modelBody:
      'The directory is organized by academic role. Each profile can connect to projects, publications, software, and research areas.',
    fieldsLabel: 'Profile fields',
    roleAndAffiliation: 'Role and affiliation',
    interestsAndProjects: 'Interests and projects',
    emptyTitle: 'No profiles are currently published',
    emptyBody:
      'The directory is ready for the research lead, faculty researchers, student researchers, collaborators, and alumni once their information is approved.',
    contact: 'Ask how to contribute information',
    publishedProfile: 'published profile',
    publishedProfiles: 'published profiles',
    alphabeticalOrder: 'Alphabetical order A-Z',
    alphabeticalDetail: 'By name within each category',
    rankLegendTitle: 'BIGATIC trajectory',
    rankLegendBody:
      'Rank reflects academic progress and documented results in projects and publications. It is not an academic grade or a skills certification.',
  },
} satisfies Localized<PeoplePageCopy>;

type OutputType =
  | 'journal-article'
  | 'conference-paper'
  | 'book-chapter'
  | 'software'
  | 'dataset'
  | 'technical-report'
  | 'poster'
  | 'presentation'
  | 'thesis'
  | 'research-prototype'
  | 'other';

export const outputTypeLabels = {
  es: {
    'journal-article': 'Artículo de revista',
    'conference-paper': 'Ponencia',
    'book-chapter': 'Capítulo de libro',
    software: 'Software',
    dataset: 'Dataset',
    'technical-report': 'Informe técnico',
    poster: 'Póster',
    presentation: 'Presentación',
    thesis: 'Trabajo de grado',
    'research-prototype': 'Prototipo de investigación',
    other: 'Otro',
  },
  en: {
    'journal-article': 'Journal Article',
    'conference-paper': 'Conference Paper',
    'book-chapter': 'Book Chapter',
    software: 'Software',
    dataset: 'Dataset',
    'technical-report': 'Technical Report',
    poster: 'Poster',
    presentation: 'Presentation',
    thesis: 'Thesis',
    'research-prototype': 'Research Prototype',
    other: 'Other',
  },
} as const satisfies Localized<Record<OutputType, string>>;

interface OutputsPageCopy {
  title: string;
  description: string;
  systemTitle: string;
  systemBody: string;
  types: readonly CopyPair[];
  catalog: string;
  emptyTitle: string;
  emptyBody: string;
  github: string;
}

export const outputsPageCopy = {
  es: {
    title: 'Producción académica y técnica',
    description:
      'Catálogo unificado para publicaciones, software, datos, informes, presentaciones, trabajos de grado y prototipos de BIGATIC.',
    systemTitle: 'Sistema de resultados',
    systemBody:
      'Publicar también significa documentar: cada resultado puede conservar su cita, autores, año, venue, DOI, repositorio y relación con un proyecto. El software recibe el mismo tratamiento académico que los demás productos técnicos.',
    types: [
      ['Publicaciones', 'Artículos, ponencias y capítulos.'],
      ['Software', 'Versiones, licencias y repositorios.'],
      ['Datos', 'Datasets vinculados y citables.'],
      ['Otros resultados', 'Informes, pósteres, tesis y prototipos.'],
    ],
    catalog: 'Catálogo de producción',
    emptyTitle: 'Aún no hay productos publicados en el catálogo',
    emptyBody:
      'No se han inventado publicaciones, DOI ni repositorios. El modelo está preparado para incorporar resultados académicos y técnicos verificados.',
    github: 'Explorar software en GitHub',
  },
  en: {
    title: 'Research outputs',
    description:
      'A unified catalog for BIGATIC publications, software, data, reports, presentations, theses, and prototypes.',
    systemTitle: 'Output system',
    systemBody:
      'Publishing also means documenting: each output can preserve its citation, authors, year, venue, DOI, repository, and connection to a project. Software receives the same academic treatment as other technical outputs.',
    types: [
      ['Publications', 'Articles, papers, and chapters.'],
      ['Software', 'Versions, licenses, and repositories.'],
      ['Data', 'Connected and citable datasets.'],
      ['Other outputs', 'Reports, posters, theses, and prototypes.'],
    ],
    catalog: 'Output catalog',
    emptyTitle: 'No outputs have been published in the catalog yet',
    emptyBody:
      'No publications, DOIs, or repositories have been invented. The model is ready for verified academic and technical outputs.',
    github: 'Explore software on GitHub',
  },
} satisfies Localized<OutputsPageCopy>;

interface NewsPageCopy {
  title: string;
  description: string;
  introTitle: string;
  introBody: string;
  catalog: string;
  emptyTitle: string;
  emptyBody: string;
  rss: string;
}

export const newsPageCopy = {
  es: {
    title: 'Actualidad',
    description:
      'Convocatorias, eventos, proyectos, publicaciones, releases y actividades institucionales de BIGATIC.',
    introTitle: 'Registro público de la actividad del grupo',
    introBody:
      'Las noticias documentan hechos con fecha, autoría y vínculos relacionados. También sirven para conectar convocatorias y eventos con la actividad académica permanente.',
    catalog: 'Publicaciones recientes',
    emptyTitle: 'No hay noticias publicadas actualmente',
    emptyBody:
      'Las futuras convocatorias, participaciones, publicaciones y actividades se registrarán aquí.',
    rss: 'Suscribirse por RSS',
  },
  en: {
    title: 'News',
    description:
      'BIGATIC calls, events, projects, publications, releases, and institutional activities.',
    introTitle: 'A public record of group activity',
    introBody:
      'News entries document events with dates, authorship, and related links. They also connect calls and events with ongoing academic activity.',
    catalog: 'Recent posts',
    emptyTitle: 'No news is currently published',
    emptyBody: 'Future calls, participation, publications, and activities will be documented here.',
    rss: 'Subscribe via RSS',
  },
} satisfies Localized<NewsPageCopy>;

interface JoinPageCopy {
  title: string;
  description: string;
  intro: string;
  who: string;
  whoItems: readonly string[];
  how: string;
  howItems: readonly string[];
  expect: string;
  expectItems: readonly string[];
  call: string;
  close: string;
  apply: string;
  poster: string;
  closed: string;
  noCall: string;
  faq: string;
  faqs: readonly CopyPair[];
  statusOpen: string;
  statusUpcoming: string;
  statusClosed: string;
  viewDetails: string;
  pathTitle: string;
  pathBody: string;
  pathNote: string;
}

export const joinPageCopy = {
  es: {
    title: 'Únete a BIGATIC',
    description:
      'Información para estudiantes interesados en participar en investigación aplicada dentro del Semillero de Investigación BIGATIC.',
    intro:
      'BIGATIC es un espacio de investigación formativa. Participar implica aprender a formular problemas, trabajar con método, documentar decisiones y construir resultados que puedan evaluarse.',
    who: '¿Quién puede participar?',
    whoItems: [
      'Estudiantes de Ingeniería de Software según los requisitos de cada convocatoria.',
      'Estudiantes de otros programas UDES cuando existan proyectos interdisciplinarios.',
    ],
    how: '¿Cómo trabajamos?',
    howItems: [
      'Encuentros definidos por cada convocatoria o proyecto.',
      'Trabajo organizado alrededor de preguntas y entregables.',
      'Acompañamiento para fortalecer capacidades investigativas y técnicas.',
    ],
    expect: '¿Qué esperamos?',
    expectItems: [
      'Compromiso con el proceso.',
      'Curiosidad para investigar.',
      'Iniciativa y disposición para documentar el trabajo.',
    ],
    call: 'Convocatoria actual',
    close: 'Inscripciones hasta el',
    apply: 'Ir al formulario de inscripción',
    poster: 'Ver póster',
    closed: 'La convocatoria está cerrada',
    noCall: 'No hay una convocatoria publicada actualmente.',
    faq: 'Preguntas frecuentes',
    faqs: [
      [
        '¿Necesito experiencia previa?',
        'No para la convocatoria 2026B. Cada convocatoria puede establecer requisitos diferentes.',
      ],
      [
        '¿BIGATIC es solo para Ingeniería de Software?',
        'La adscripción principal es al Programa de Ingeniería de Software. Pueden participar estudiantes de otros programas en proyectos interdisciplinarios.',
      ],
      [
        '¿Dónde se realizan los encuentros?',
        'La convocatoria 2026B indica encuentros presenciales semanales. La ubicación específica será comunicada por la coordinación.',
      ],
    ],
    statusOpen: 'Abierta',
    statusUpcoming: 'Próxima',
    statusClosed: 'Cerrada',
    viewDetails: 'Ver detalles',
    pathTitle: 'Ruta de trayectoria',
    pathBody:
      'Cada perfil publicado muestra un rango que resume su avance académico y los resultados documentados durante el periodo. El rango sube cuando el trabajo queda publicado en el sitio.',
    pathNote:
      'El rango no es una calificación académica ni una certificación de competencias, y el directorio no publica una tabla de posiciones.',
  },
  en: {
    title: 'Join BIGATIC',
    description:
      'Information for students interested in applied research with the BIGATIC Research Group.',
    intro:
      'BIGATIC is a student research setting. Participation means learning to formulate problems, work methodically, document decisions, and build results that can be evaluated.',
    who: 'Who can take part?',
    whoItems: [
      'Software Engineering students who meet the requirements of each call.',
      'Students from other UDES programs when interdisciplinary projects are available.',
    ],
    how: 'How do we work?',
    howItems: [
      'Meetings defined by each call or project.',
      'Work organized around questions and deliverables.',
      'Guidance to strengthen research and technical capabilities.',
    ],
    expect: 'What do we expect?',
    expectItems: [
      'Commitment to the process.',
      'Curiosity to investigate.',
      'Initiative and willingness to document the work.',
    ],
    call: 'Current call',
    close: 'Applications through',
    apply: 'Open application form',
    poster: 'View poster',
    closed: 'The call is closed',
    noCall: 'No call is currently published.',
    faq: 'Frequently asked questions',
    faqs: [
      [
        'Do I need prior experience?',
        'Not for the 2026B call. Each future call may set different requirements.',
      ],
      [
        'Is BIGATIC only for Software Engineering?',
        'The primary affiliation is with the Software Engineering Program. Students from other programs may join interdisciplinary projects.',
      ],
      [
        'Where do meetings take place?',
        'The 2026B call states that meetings are held in person every week. The specific location will be communicated by the coordination.',
      ],
    ],
    statusOpen: 'Open',
    statusUpcoming: 'Upcoming',
    statusClosed: 'Closed',
    viewDetails: 'View details',
    pathTitle: 'Trajectory path',
    pathBody:
      'Every published profile shows a rank summarising academic progress and the results documented during the period. The rank rises once the work is published on the site.',
    pathNote:
      'The rank is not an academic grade or a skills certification, and the directory does not publish a leaderboard.',
  },
} satisfies Localized<JoinPageCopy>;

interface ContactPageCopy {
  title: string;
  description: string;
  introTitle: string;
  introBody: string;
  group: string;
  university: string;
  program: string;
  location: string;
  github: string;
  profile: string;
  website: string;
}

export const contactPageCopy = {
  es: {
    title: 'Contacto',
    description:
      'Información institucional y canales públicos del Semillero de Investigación BIGATIC en la Universidad de Santander.',
    introTitle: 'Canales públicos y afiliación verificable',
    introBody:
      'BIGATIC aún no cuenta con un correo general, teléfono, oficina u horario público confirmado. Esta página reúne sus canales institucionales verificados.',
    group: 'Semillero de Investigación BIGATIC',
    university: 'Universidad de Santander - UDES',
    program: 'Programa de Ingeniería de Software',
    location: 'Ubicación',
    github: 'Organización en GitHub',
    profile: 'Perfil institucional UDES',
    website: 'Sitio web',
  },
  en: {
    title: 'Contact',
    description:
      'Institutional information and public channels for the BIGATIC Research Group at Universidad de Santander.',
    introTitle: 'Public channels and verifiable affiliation',
    introBody:
      'BIGATIC does not yet have a confirmed public group email, phone number, office, or schedule. This page lists its verified institutional channels.',
    group: 'BIGATIC Research Group',
    university: 'Universidad de Santander - UDES',
    program: 'Software Engineering Program',
    location: 'Location',
    github: 'GitHub organization',
    profile: 'UDES institutional profile',
    website: 'Website',
  },
} satisfies Localized<ContactPageCopy>;
