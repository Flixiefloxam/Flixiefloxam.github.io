window.PORTFOLIO_PROJECTS = [
  {
    id: 'king-of-meat',
    category: 'professional-games',
    categoryLabel: 'Professional Game',
    title: 'King of Meat',
    role: 'Programming Intern',
    technologies: ['C++'],
    focus: 'Gameplay Systems · Live-Service Development',
    year: '2024',
    image: 'https://images.ctfassets.net/z4mnmfs6j6sv/4h1LHXbkjEUbbGQlOaBVBi/f0c1cd339eadbcf42a7bb55231d78669/KoM_StandardEdition_KeyArt2.jpg',
    imageFallback: 'assets/images/project-king-of-meat.svg',
    imageCredit: 'Official King of Meat standard-edition key art — Amazon Games / Glowmade',
    pageBackground: {
      src: 'https://images.ctfassets.net/5lpapfxq15sk/6yPOUzjMRJD3feXiuNOlm4/c5d8687753fe866e7c224a1f7d88cb99/KOM_SGF_2025_Screens_Combat_F_1080_CT-000018970.jpg',
      position: 'center top'
    },
    trailer: {
      title: 'King of Meat: Announce Trailer',
      youtubeId: 'xPmUWMUKWQY'
    },
    gallery: [
      {
        src: 'https://images.ctfassets.net/5lpapfxq15sk/6yPOUzjMRJD3feXiuNOlm4/c5d8687753fe866e7c224a1f7d88cb99/KOM_SGF_2025_Screens_Combat_F_1080_CT-000018970.jpg',
        alt: 'King of Meat contenders fighting through a colourful dungeon arena',
        caption: 'Co-op combat and dungeon action'
      },
      {
        src: 'https://images.ctfassets.net/5lpapfxq15sk/3ZJVa5hDq3hKZ142vchvj8/ceed7468619dbbd5065d29e824b231b7/CreateMode-1920.jpg',
        alt: 'The King of Meat Create Mode interface used to build a dungeon',
        caption: 'Dungeon creation tools'
      },
      {
        src: 'https://images.ctfassets.net/5lpapfxq15sk/2YlFc3fLD7WxkIKqhWdfcm/f9be84fcb40bd7795d654e33412e2970/KOM_SGF_2025_Screens_Combat_E_1080_CT-000018970.jpg',
        alt: 'King of Meat characters battling enemies amid traps and bright effects',
        caption: 'Player-facing systems in action'
      }
    ],
    sectionVisuals: {
      overview: {
        src: 'https://images.ctfassets.net/5lpapfxq15sk/3ZJVa5hDq3hKZ142vchvj8/ceed7468619dbbd5065d29e824b231b7/CreateMode-1920.jpg',
        alt: 'King of Meat dungeon creation interface with a colourful arena in progress',
        caption: 'Dungeon creation and gameplay systems'
      },
      contribution: {
        src: 'https://images.ctfassets.net/5lpapfxq15sk/2YlFc3fLD7WxkIKqhWdfcm/f9be84fcb40bd7795d654e33412e2970/KOM_SGF_2025_Screens_Combat_E_1080_CT-000018970.jpg',
        alt: 'King of Meat characters using combat and interactable systems in a dungeon',
        caption: 'Player-facing systems in action'
      }
    },
    galleryCredit: 'Official promotional screenshots — Amazon Games / Glowmade',
    gallerySource: 'https://www.amazongamestudios.com/en-gb/news/articles/king-of-meat-out-now',
    summary: 'Credited programmer on the shipped title King of Meat. Developed gameplay systems, live-service level mutators, player upgrades, throwing mechanics and interactable systems within a large production codebase.',
    overview: 'During my 2024 programming internship at Glowmade, I contributed to King of Meat as a credited programmer. I worked within a large existing codebase and collaborated closely with designers and other gameplay programmers to develop and refine player-facing systems.',
    contributions: [
      'Developed and implemented a dispenser and throwing gameplay system.',
      'Developed level mutators for live-service events.',
      'Implemented player upgrades that supported gameplay progression.',
      'Extended the grabbable system and implemented pushing mechanics.',
      'Collaborated with designers and gameplay programmers in a large production codebase.'
    ],
    tech: ['C++', 'Gameplay Systems', 'Live Service'],
    links: []
  },
  {
    id: 'neon-swarm',
    category: 'personal-games',
    categoryLabel: 'Personal Game',
    title: 'Neon Swarm',
    wip: true,
    role: 'Solo Developer',
    technologies: ['Godot', 'C#'],
    focus: 'Gameplay Systems · Enemy Swarms · Combat Architecture',
    year: 'In development',
    image: 'assets/images/project-neon-swarm-cover.png',
    imageCredit: 'Neon Swarm gameplay screenshot',
    pageBackground: {
      src: 'assets/images/project-neon-swarm-page-tile.png',
      position: 'left top',
      size: '128px 128px',
      repeat: 'repeat',
      attachment: 'fixed',
      overlay: 0.10
    },
    summary: 'A solo-developed action game built in Godot and C#, featuring large enemy swarms, modular combat systems, weapons, pickups, upgrades and effects-driven player feedback.',
    overview: 'Neon Swarm is a solo-developed action game built in Godot with C#. I structured the codebase around modular and data driven player, enemy, weapon, spawning, pickup, upgrade, UI and visual-effects systems, allowing features to be developed, balanced and extended independently.',
    keyFeatures: [
      '<strong>Centralised swarm controller:</strong> Coordinates large enemy groups efficiently while reducing the processing required from individual agents.',
      '<strong>Modular combat architecture:</strong> Separates player, enemy, weapon, and spawning systems so gameplay features can be extended and balanced independently.',
      '<strong>Data-driven progression:</strong> Reusable pickup and upgrade systems support flexible combinations and rapid gameplay iteration.',
      '<strong>Reusable Godot architecture:</strong> Components, scenes, and resources keep the C# codebase organised and make new gameplay content easier to build.',
      '<strong>Responsive game feel:</strong> UI and visual-effects systems provide clear combat feedback while reinforcing the neon presentation.'
    ],
    tech: ['Godot', 'C#', 'Gameplay Systems'],
    links: [{ label: 'View source code', url: 'https://github.com/Flixiefloxam/Neon-Swarm' }]
  },
  {
    id: 'ai-level-platformer',
    category: 'personal-projects',
    categoryLabel: 'Personal Project',
    title: 'AI Level Platformer',
    role: 'AI & Gameplay Programmer',
    technologies: ['Godot', 'C#', 'Python'],
    focus: 'Procedural Generation · AI Systems · Gameplay Integration',
    year: '2026',
    image: 'assets/images/project-ai-level-platformer-cover.png',
    imageCredit: 'AI-Generated Level Platformer project image',
    pageBackground: {
      src: 'assets/images/project-ai-level-platformer-page-background.png',
      position: 'center center',
      overlay: 0.74
    },
    summary: 'A solo-developed Godot platformer comparing AI and procedural level-generation techniques, with Python-generated layouts integrated into a complete C# gameplay layer.',
    overview: 'This experimental Godot platformer compares several approaches to procedural level generation, including 1D and 2D Markov chains, Wave Function Collapse and a convolutional neural network experiment. Python-generated layouts are loaded into a C# gameplay layer containing the player controller, level selection, menus and supporting game systems.',
    keyFeatures: [
      '<strong>Multiple generation approaches:</strong> Compares 1D and 2D Markov chains, Wave Function Collapse and a CNN-based experiment within one project.',
      '<strong>Cross-language pipeline:</strong> Integrates Python level-generation code with a Godot and C# gameplay layer.',
      '<strong>Playable generated levels:</strong> Converts generated layouts into runtime scenes that can be selected, loaded and played.',
      '<strong>Complete gameplay framework:</strong> Includes player control, animation, menus, pausing, scene transitions and victory handling.'
    ],
    tech: ['Godot', 'C#', 'Python', 'Procedural Generation'],
    links: [{ label: 'View source code', url: 'https://github.com/Flixiefloxam/AiLevelPlatformer' }]
  },
  {
    id: 'genetic-algorithm-maze',
    category: 'personal-projects',
    categoryLabel: 'Personal Project',
    title: 'Genetic Algorithm Maze',
    heroDisplay: 'contain',
    role: 'AI Programmer',
    technologies: ['Python'],
    focus: 'Genetic Algorithms · Pathfinding · Procedural Generation',
    year: '2025',
    image: 'assets/images/genetic-maze-learning-progress-v2.gif',
    imageCredit: 'Genetic Algorithm Maze learning-progress animation',
    pageBackground: {
      src: 'assets/images/project-genetic-maze-cover.png',
      position: 'center center',
      size: 'cover',
      repeat: 'no-repeat',
      attachment: 'fixed',
      overlay: 0.95
    },
    summary: 'A solo-developed Python project that generates random mazes and uses a population-based genetic algorithm to evolve increasingly effective routes through them.',
    overview: 'Genetic Algorithm Maze explores evolutionary search in procedurally generated pathfinding environments. Each run creates a random maze, then applies a population-based genetic algorithm to evaluate, select and evolve candidate routes until it finds a solution.',
    keyFeatures: [
      '<strong>Evolutionary pathfinding:</strong> Uses a genetic algorithm instead of a conventional deterministic search method to solve generated mazes.',
      '<strong>Procedural environments:</strong> Creates a different random maze for each run, testing the solver against changing layouts.',
      '<strong>Fitness-driven evolution:</strong> Evaluates candidate routes using a fitness function, then improves the population through repeated generations.',
      '<strong>Focused Python implementation:</strong> Presents procedural generation, pathfinding and evolutionary optimisation in a compact, inspectable project.'
    ],
    tech: ['Python', 'Genetic Algorithms', 'Pathfinding', 'Procedural Generation'],
    links: [{ label: 'View source code', url: 'https://github.com/Flixiefloxam/GeneticAlgorithmMaze' }]
  },
  {
    id: 'face-recognition-ai',
    category: 'personal-projects',
    categoryLabel: 'Personal Project',
    title: 'Facial Recognition AI',
    role: 'Machine Learning Programmer',
    technologies: ['Python'],
    focus: 'Computer Vision · Machine Learning · Facial Landmark Detection',
    year: '2025',
    image: 'assets/images/project-face-alignment-cover.png',
    imageCredit: 'Facial Recognition AI project results',
    pageBackground: {
      src: 'assets/images/project-face-recognition-page-background.png',
      position: 'right center',
      overlay: 0.56
    },
    summary: 'A solo-developed Python computer-vision project that uses machine learning to locate five key facial landmarks: both eyes, the nose and both corners of the mouth.',
    overview: 'Facial Recognition AI is a machine-learning project focused on locating key facial features within portrait images. It compares alternative models for predicting five facial landmarks and converts each image into structured coordinate data that can support face alignment and further image-processing tasks.',
    keyFeatures: [
      '<strong>Facial landmark prediction:</strong> Locates both eyes, the nose and both corners of the mouth within portrait images.',
      '<strong>Model comparison:</strong> Evaluates alternative machine-learning approaches against the same landmark-localisation task.',
      '<strong>Image-to-coordinate pipeline:</strong> Converts visual input into structured facial-coordinate data for further processing.',
      '<strong>Applied computer vision:</strong> Demonstrates practical machine-learning experimentation and image processing in Python.'
    ],
    tech: ['Python', 'Computer Vision', 'Machine Learning', 'Facial Landmarks'],
    links: [{ label: 'View source code', url: 'https://github.com/Flixiefloxam/FaceAlignmentAi' }]
  }
];
