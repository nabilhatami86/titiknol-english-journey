export interface TOEFLQuestion {
  number: number;
  stem: string;
  options: { letter: string; text: string }[];
  answer: string;
}

export interface TOEFLPassage {
  id: string;
  title: string;
  text: string;
  questions: TOEFLQuestion[];
}

export const TOEFL_PASSAGES: TOEFLPassage[] = [
  {
    id: 'p1',
    title: 'Bioluminescence in Marine Organisms',
    text: `Bioluminescence—the production and emission of light by living organisms—is one of nature's most extraordinary phenomena. Found primarily in marine environments, this ability has evolved independently in at least 40 different lineages of organisms, including bacteria, dinoflagellates, jellyfish, squid, and deep-sea fish.

The chemical process underlying bioluminescence involves an enzyme called luciferase, which catalyzes the oxidation of a substrate molecule called luciferin. This reaction produces light with remarkable efficiency: nearly 90% of the energy is emitted as light, compared to only 5% for traditional incandescent bulbs.

In marine ecosystems, bioluminescence serves several distinct functions. Some organisms use it for counterillumination—a form of camouflage where the animal produces light on its ventral surface to match the faint light filtering down from above, thereby eliminating its own shadow and becoming invisible to predators below. Others employ it as a lure: the anglerfish dangles a bioluminescent appendage above its mouth to attract prey in the lightless deep sea.

Communication is another critical function. Fireflies—one of the few terrestrial bioluminescent organisms—use species-specific flash patterns to attract mates. In the ocean, certain squid flash complex light patterns that may serve as signals between individuals.

Bioluminescence also functions as a defense mechanism. Some organisms release bioluminescent secretions when threatened, which can startle predators or attract secondary predators that will then prey on the original attacker. The ostracod crustacean, for instance, releases a cloud of glowing mucus when swallowed, often causing the predator to spit it out.

Scientists have found numerous practical applications for bioluminescence. The gene encoding luciferase has become an invaluable tool in molecular biology, used as a reporter gene to track gene expression in laboratory cells. Bioluminescent proteins have also been used in medical imaging, allowing researchers to observe cellular processes in living organisms without harmful radiation.`,
    questions: [
      {
        number: 1,
        stem: 'According to the passage, which of the following is true about bioluminescence?',
        options: [
          { letter: 'A', text: 'It is found only in marine organisms' },
          { letter: 'B', text: 'It has evolved independently in multiple lineages' },
          { letter: 'C', text: 'It is most common in terrestrial environments' },
          { letter: 'D', text: 'It was first discovered in jellyfish' },
        ],
        answer: 'B',
      },
      {
        number: 2,
        stem: 'The word "catalyzes" in paragraph 2 is closest in meaning to:',
        options: [
          { letter: 'A', text: 'slows down' },
          { letter: 'B', text: 'prevents' },
          { letter: 'C', text: 'speeds up' },
          { letter: 'D', text: 'reverses' },
        ],
        answer: 'C',
      },
      {
        number: 3,
        stem: 'According to the passage, counterillumination helps organisms:',
        options: [
          { letter: 'A', text: 'attract prey in deep water' },
          { letter: 'B', text: 'communicate with potential mates' },
          { letter: 'C', text: 'avoid detection by predators below them' },
          { letter: 'D', text: 'release defensive secretions' },
        ],
        answer: 'C',
      },
      {
        number: 4,
        stem: 'Why does the passage mention the anglerfish?',
        options: [
          { letter: 'A', text: 'To illustrate the use of bioluminescence as a lure' },
          { letter: 'B', text: 'To show how bioluminescence is used for communication' },
          { letter: 'C', text: 'To provide an example of counterillumination' },
          { letter: 'D', text: 'To explain the chemical process of light production' },
        ],
        answer: 'A',
      },
      {
        number: 5,
        stem: 'The passage implies that the bioluminescence reaction is energetically:',
        options: [
          { letter: 'A', text: 'less efficient than a standard light bulb' },
          { letter: 'B', text: 'equally efficient to incandescent lighting' },
          { letter: 'C', text: 'more efficient than incandescent bulbs' },
          { letter: 'D', text: 'only 5% efficient' },
        ],
        answer: 'C',
      },
      {
        number: 6,
        stem: 'Which organism primarily uses bioluminescence for mate attraction?',
        options: [
          { letter: 'A', text: 'Anglerfish' },
          { letter: 'B', text: 'Ostracod' },
          { letter: 'C', text: 'Firefly' },
          { letter: 'D', text: 'Dinoflagellate' },
        ],
        answer: 'C',
      },
      {
        number: 7,
        stem: 'What happens when the ostracod is swallowed by a predator?',
        options: [
          { letter: 'A', text: 'It releases glowing mucus that causes the predator to release it' },
          { letter: 'B', text: 'It uses flash patterns to communicate distress' },
          { letter: 'C', text: 'It becomes counterilluminated to escape' },
          { letter: 'D', text: 'It releases a lure to distract the predator' },
        ],
        answer: 'A',
      },
      {
        number: 8,
        stem: 'The author mentions the luciferase gene in the final paragraph in order to:',
        options: [
          { letter: 'A', text: 'explain how bioluminescence first evolved' },
          { letter: 'B', text: 'show a scientific application of bioluminescence' },
          { letter: 'C', text: 'describe how marine organisms produce light' },
          { letter: 'D', text: 'argue that marine research is valuable' },
        ],
        answer: 'B',
      },
      {
        number: 9,
        stem: 'Which of the following functions of bioluminescence is NOT mentioned in the passage?',
        options: [
          { letter: 'A', text: 'Defense from predators' },
          { letter: 'B', text: 'Attracting prey' },
          { letter: 'C', text: 'Navigation in deep water' },
          { letter: 'D', text: 'Communication between individuals' },
        ],
        answer: 'C',
      },
      {
        number: 10,
        stem: 'Which best describes the organization of the passage?',
        options: [
          { letter: 'A', text: 'A historical account of bioluminescence research' },
          { letter: 'B', text: 'A comparison of marine and terrestrial organisms' },
          { letter: 'C', text: 'An explanation of a phenomenon followed by its functions and applications' },
          { letter: 'D', text: "A description of a single organism's bioluminescent behavior" },
        ],
        answer: 'C',
      },
    ],
  },
  {
    id: 'p2',
    title: 'The Columbian Exchange',
    text: `The Columbian Exchange refers to the widespread transfer of plants, animals, culture, human populations, technology, and ideas between the Americas and the Old World following Christopher Columbus's 1492 voyage. The term was coined by historian Alfred Crosby in his 1972 book, and it fundamentally reshaped human civilization on both sides of the Atlantic.

From the Americas to Europe, Africa, and Asia, the exchange introduced crops that would become dietary staples worldwide. The potato transformed the diet of Europeans and contributed to population growth, particularly in Ireland, where it became the primary food source. Similarly, maize spread throughout Africa, where it became a critical caloric source. Tomatoes, now inseparable from Italian cuisine, are native to South America. Cacao, tobacco, and quinine—the first effective treatment for malaria—also traveled eastward.

The exchange flowed in the other direction as well. Europeans introduced horses to the Americas, which profoundly changed the cultures of many Native American groups, particularly those on the Great Plains, who adopted an equestrian lifestyle. Cattle, sheep, and pigs arrived with European colonizers, dramatically altering the ecology of the Americas. Wheat, rice, and sugarcane were also introduced and became major cash crops.

The exchange had devastating consequences for indigenous populations. European diseases—including smallpox, measles, and influenza—against which Native Americans had no immunity, killed an estimated 50–90% of the indigenous population in the Americas within a century of contact. This demographic catastrophe fundamentally altered the social and political structures of indigenous societies.

The Columbian Exchange also indirectly contributed to the transatlantic slave trade. As indigenous populations collapsed, European colonizers sought labor to cultivate the sugar, tobacco, and cotton plantations they had established. This demand was met through the forced migration of millions of Africans, reshaping the demographics of the Western Hemisphere.`,
    questions: [
      {
        number: 11,
        stem: 'Who coined the term "Columbian Exchange"?',
        options: [
          { letter: 'A', text: 'Christopher Columbus' },
          { letter: 'B', text: 'Alfred Crosby' },
          { letter: 'C', text: 'A Native American historian' },
          { letter: 'D', text: 'An Irish economist' },
        ],
        answer: 'B',
      },
      {
        number: 12,
        stem: "According to the passage, the potato's introduction to Europe:",
        options: [
          { letter: 'A', text: 'caused widespread agricultural failure' },
          { letter: 'B', text: 'contributed to population growth' },
          { letter: 'C', text: 'replaced maize as the main European crop' },
          { letter: 'D', text: "arrived before Columbus's voyage" },
        ],
        answer: 'B',
      },
      {
        number: 13,
        stem: 'The word "equestrian" in paragraph 3 refers to:',
        options: [
          { letter: 'A', text: 'farming practices' },
          { letter: 'B', text: 'warfare techniques' },
          { letter: 'C', text: 'horse-riding culture' },
          { letter: 'D', text: 'indigenous trade networks' },
        ],
        answer: 'C',
      },
      {
        number: 14,
        stem: 'Which of the following was introduced FROM Europe TO the Americas?',
        options: [
          { letter: 'A', text: 'Potato' },
          { letter: 'B', text: 'Tobacco' },
          { letter: 'C', text: 'Cattle' },
          { letter: 'D', text: 'Cacao' },
        ],
        answer: 'C',
      },
      {
        number: 15,
        stem: 'According to the passage, European diseases were significant because:',
        options: [
          { letter: 'A', text: 'they were deliberately spread by colonizers' },
          { letter: 'B', text: 'indigenous populations had no immunity to them' },
          { letter: 'C', text: 'they came from African slaves' },
          { letter: 'D', text: 'they only affected children' },
        ],
        answer: 'B',
      },
      {
        number: 16,
        stem: 'What percentage of Native Americans died within a century of contact?',
        options: [
          { letter: 'A', text: '10–30%' },
          { letter: 'B', text: '30–50%' },
          { letter: 'C', text: '50–90%' },
          { letter: 'D', text: 'More than 90%' },
        ],
        answer: 'C',
      },
      {
        number: 17,
        stem: 'Why does the author mention quinine?',
        options: [
          { letter: 'A', text: 'To show it was a major food crop from the Americas' },
          { letter: 'B', text: 'To illustrate that the exchange included medically important substances' },
          { letter: 'C', text: 'To explain how malaria spread to Europe' },
          { letter: 'D', text: 'To contrast it with tobacco as a New World crop' },
        ],
        answer: 'B',
      },
      {
        number: 18,
        stem: 'The passage implies that the Columbian Exchange was:',
        options: [
          { letter: 'A', text: 'entirely beneficial for all parties involved' },
          { letter: 'B', text: 'a planned cultural exchange' },
          { letter: 'C', text: 'more beneficial to Europe than to indigenous Americans' },
          { letter: 'D', text: 'primarily a trading relationship between equals' },
        ],
        answer: 'C',
      },
      {
        number: 19,
        stem: 'According to the passage, what was the primary reason for the growth of the transatlantic slave trade?',
        options: [
          { letter: 'A', text: 'European interest in African culture' },
          { letter: 'B', text: 'The need for labor after indigenous populations declined' },
          { letter: 'C', text: 'The expansion of the sugar trade to Africa' },
          { letter: 'D', text: "Columbus's recommendation to use African labor" },
        ],
        answer: 'B',
      },
      {
        number: 20,
        stem: 'What is the main purpose of the passage?',
        options: [
          { letter: 'A', text: "To argue that Columbus's voyage was harmful" },
          { letter: 'B', text: 'To describe the broad historical consequences of biological and cultural exchange' },
          { letter: 'C', text: 'To compare the economies of Europe and the Americas' },
          { letter: 'D', text: 'To explain the origins of specific food crops' },
        ],
        answer: 'B',
      },
    ],
  },
  {
    id: 'p3',
    title: 'Plate Tectonics',
    text: `Plate tectonics is the scientific theory describing the large-scale motion of the rigid outermost shell of Earth, known as the lithosphere, which is divided into tectonic plates. These plates move at rates ranging from 1 to 20 centimeters per year, driven by convection currents in the underlying asthenosphere—a layer of the mantle where rock flows slowly under extreme heat and pressure.

The theory emerged from the earlier hypothesis of continental drift, proposed by Alfred Wegener in 1912. Wegener noticed that the continents appeared to fit together like puzzle pieces, and that similar fossils and rock formations were found on continents now separated by vast oceans. However, Wegener could not explain the mechanism that would drive continents to move, and his theory was not widely accepted during his lifetime.

It was not until the 1950s and 1960s that seafloor spreading—the process by which new oceanic crust is created at mid-ocean ridges—was discovered. This discovery provided the mechanism that Wegener's theory had lacked. As molten rock rises from the mantle and solidifies along mid-ocean ridges, the oceanic plates are pushed apart. This process also explains why the ocean floor is geologically young compared to the continents.

There are three main types of plate boundaries: convergent, divergent, and transform. At convergent boundaries, plates collide; when an oceanic plate meets a continental plate, the denser oceanic plate is subducted beneath the continental plate, often forming deep ocean trenches and volcanic mountain ranges. When two continental plates collide, neither subducts easily, and immense mountain ranges like the Himalayas form instead. At divergent boundaries, plates move apart, creating rifts and mid-ocean ridges. At transform boundaries, plates slide horizontally past one another, generating earthquakes without creating or destroying crust.

The theory of plate tectonics has unified much of geology, providing explanations for the distribution of earthquakes, volcanoes, and mountain ranges, as well as the formation of ocean basins and the movement of continents over geological time.`,
    questions: [
      {
        number: 21,
        stem: 'According to the passage, what drives the movement of tectonic plates?',
        options: [
          { letter: 'A', text: 'Gravity from the moon' },
          { letter: 'B', text: 'Convection currents in the asthenosphere' },
          { letter: 'C', text: "Rotation of the Earth's core" },
          { letter: 'D', text: 'Ocean currents' },
        ],
        answer: 'B',
      },
      {
        number: 22,
        stem: "Alfred Wegener's hypothesis was initially rejected because:",
        options: [
          { letter: 'A', text: 'his fossil evidence was inaccurate' },
          { letter: 'B', text: 'he could not explain the mechanism driving movement' },
          { letter: 'C', text: 'other scientists believed continents were stationary' },
          { letter: 'D', text: 'the continents did not actually fit together' },
        ],
        answer: 'B',
      },
      {
        number: 23,
        stem: 'The word "subducted" in paragraph 4 is closest in meaning to:',
        options: [
          { letter: 'A', text: 'pushed upward' },
          { letter: 'B', text: 'dissolved into magma' },
          { letter: 'C', text: 'forced beneath another plate' },
          { letter: 'D', text: 'stretched apart' },
        ],
        answer: 'C',
      },
      {
        number: 24,
        stem: 'According to the passage, how do mountains like the Himalayas form?',
        options: [
          { letter: 'A', text: 'An oceanic plate collides with a continental plate' },
          { letter: 'B', text: 'Two diverging plates create a rift valley' },
          { letter: 'C', text: 'Two continental plates collide without either subducting' },
          { letter: 'D', text: 'Transform boundaries generate lateral pressure' },
        ],
        answer: 'C',
      },
      {
        number: 25,
        stem: 'What was the significance of the discovery of seafloor spreading?',
        options: [
          { letter: 'A', text: 'It proved that the ocean floor is older than the continents' },
          { letter: 'B', text: 'It provided the missing mechanism for plate movement' },
          { letter: 'C', text: "It disproved Wegener's continental drift hypothesis" },
          { letter: 'D', text: 'It showed that plates move faster than previously thought' },
        ],
        answer: 'B',
      },
      {
        number: 26,
        stem: 'At which type of boundary do plates slide horizontally past each other?',
        options: [
          { letter: 'A', text: 'Convergent' },
          { letter: 'B', text: 'Divergent' },
          { letter: 'C', text: 'Transform' },
          { letter: 'D', text: 'Subduction' },
        ],
        answer: 'C',
      },
      {
        number: 27,
        stem: 'According to the passage, when was seafloor spreading discovered?',
        options: [
          { letter: 'A', text: 'By Alfred Wegener in 1912' },
          { letter: 'B', text: 'At the same time as continental drift theory' },
          { letter: 'C', text: 'In the 1950s and 1960s' },
          { letter: 'D', text: 'After plate tectonics was fully accepted' },
        ],
        answer: 'C',
      },
      {
        number: 28,
        stem: 'The passage implies that oceanic crust is geologically younger than continental crust because:',
        options: [
          { letter: 'A', text: 'oceanic plates move faster than continental plates' },
          { letter: 'B', text: 'new oceanic crust is constantly created at mid-ocean ridges' },
          { letter: 'C', text: 'oceanic crust is destroyed at transform boundaries' },
          { letter: 'D', text: 'the mantle is hotter beneath the oceans' },
        ],
        answer: 'B',
      },
      {
        number: 29,
        stem: 'Which of the following is NOT mentioned as a result of plate tectonics?',
        options: [
          { letter: 'A', text: 'Formation of mountain ranges' },
          { letter: 'B', text: 'Distribution of earthquakes' },
          { letter: 'C', text: 'Changes in global climate patterns' },
          { letter: 'D', text: 'Creation of ocean basins' },
        ],
        answer: 'C',
      },
      {
        number: 30,
        stem: 'What is the main purpose of the final paragraph?',
        options: [
          { letter: 'A', text: 'To introduce a new theory about plate tectonics' },
          { letter: 'B', text: 'To summarize the geological evidence for plate movement' },
          { letter: 'C', text: 'To explain the broader significance of the theory for geology' },
          { letter: 'D', text: 'To compare plate tectonics with continental drift' },
        ],
        answer: 'C',
      },
    ],
  },
];
