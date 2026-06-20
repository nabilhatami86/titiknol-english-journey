export type ToeflQType = "mc" | "multi" | "ordering" | "table" | "summary";

export interface ToeflOption {
  label: string;
  text: string;
}

export interface ToeflQuestion {
  n: number;
  prompt: string;
  options?: ToeflOption[];
  answer: string;
  type?: ToeflQType;
  alts?: string[];
  categories?: string[];
  items?: string[] | { text: string; answer: string }[];
}

export interface ToeflSample {
  id: string;
  title: string;
  section: "Listening";
  audioPath: string;
  taskType?: string;
  questions: ToeflQuestion[];
}

export const TOEFL_SAMPLES: ToeflSample[] = [
  {
    id: "library-research",
    title: "Library Research",
    section: "Listening",
    audioPath: "tpo1_listening_passage1_1.mp3",
    questions: [
      {
        n: 1,
        prompt: "Why does the student go to see the librarian?",
        options: [
          {
            label: "A",
            text: "To sign up for a seminar on using electronic sources for research",
          },
          {
            label: "B",
            text: "To report that a journal is missing from the reference area",
          },
          {
            label: "C",
            text: "To find out the procedure for checking out journal articles",
          },
          {
            label: "D",
            text: "To ask about how to look for resources for a class paper",
          },
        ],
        answer: "D",
      },
      {
        n: 2,
        prompt:
          "What does the librarian say about the availability of journals and articles in the library?",
        options: [
          {
            label: "A",
            text: "They are not easy to find if a professor put them on reserve",
          },
          {
            label: "B",
            text: "Most of them are accessible in an electronic format",
          },
          {
            label: "C",
            text: "Most of them can be checked out for three weeks",
          },
          {
            label: "D",
            text: "Printed versions from the past three years are located in the reference section",
          },
        ],
        answer: "B",
      },
      {
        n: 3,
        prompt:
          "What does the librarian suggest the student should do to save time?",
        options: [
          {
            label: "A",
            text: "Choose an easier research topic",
          },
          {
            label: "B",
            text: "Concentrate on five journals",
          },
          {
            label: "C",
            text: "Read the summaries of the articles first",
          },
          {
            label: "D",
            text: "Install a new program on her home computer",
          },
        ],
        answer: "C",
      },
      {
        n: 4,
        prompt:
          "What can be inferred about why the woman decides to use the computer in the library?",
        options: [
          {
            label: "A",
            text: "She thinks she might need additional help from the man",
          },
          {
            label: "B",
            text: "She does not have a computer at home",
          },
          {
            label: "C",
            text: "She has to hand in her assignment by the end of the day",
          },
          {
            label: "D",
            text: "She will be meeting a friend in the library later on",
          },
        ],
        answer: "A",
      },
      {
        n: 5,
        prompt: "Replay: Why does the woman say this?",
        options: [
          {
            label: "A",
            text: "She had forgotten about the information",
          },
          {
            label: "B",
            text: "She is surprised she was not aware of the information",
          },
          {
            label: "C",
            text: "She is annoyed that the information was published only recently",
          },
          {
            label: "D",
            text: "She is concerned that the librarian gave her incorrect information",
          },
        ],
        answer: "B",
      },
    ],
  },
  {
    id: "frantzen-art-lecture",
    title: "Frantzen Art Lecture",
    section: "Listening",
    audioPath: "tpo1_listening_passage1_2.mp3",
    questions: [
      {
        n: 1,
        prompt: "What is the purpose of the lecture?",
        options: [
          {
            label: "A",
            text: "To explain the difference between two artistic styles",
          },
          {
            label: "B",
            text: "To describe a new art gallery to the class",
          },
          {
            label: "C",
            text: "To introduce an artist's work to the class",
          },
          {
            label: "D",
            text: "To show how artists' styles can evolve over time",
          },
        ],
        answer: "C",
      },
      {
        n: 2,
        prompt:
          "What does the professor say about Frantzen's painting of a farm scene?",
        options: [
          {
            label: "A",
            text: "It resembles a photograph",
          },
          {
            label: "B",
            text: "It may be Frantzen's best-known painting",
          },
          {
            label: "C",
            text: "It was painted in the Impressionist style",
          },
          {
            label: "D",
            text: "It was painted while Frantzen lived abroad",
          },
        ],
        answer: "C",
      },
      {
        n: 3,
        prompt: "Why did Frantzen go to the Sales Barn?",
        options: [
          {
            label: "A",
            text: "To study human form and movement",
          },
          {
            label: "B",
            text: "To earn money by painting portraits",
          },
          {
            label: "C",
            text: "To paint farm animals in an outdoor setting",
          },
          {
            label: "D",
            text: "To meet people who could model for her paintings",
          },
        ],
        answer: "A",
      },
      {
        n: 4,
        prompt:
          "What does the professor imply about the painting of the young woman surrounded by pumpkins?",
        options: [
          {
            label: "A",
            text: "It was painted at an art fair",
          },
          {
            label: "B",
            text: "It combines Impressionism with Realism",
          },
          {
            label: "C",
            text: "It convinced Frantzen that she was a good illustrator",
          },
          {
            label: "D",
            text: "It was originally meant to be used in an advertisement",
          },
        ],
        answer: "B",
      },
      {
        n: 5,
        prompt: "What does the professor imply when he says this?",
        options: [
          {
            label: "A",
            text: "The students can understand Frantzen's art without knowing about her life",
          },
          {
            label: "B",
            text: "The students should pay very close attention to what he is going to say",
          },
          {
            label: "C",
            text: "Some of his students are already familiar with Frantzen's life story",
          },
          {
            label: "D",
            text: "Some of his students may not appreciate Frantzen's work",
          },
        ],
        answer: "A",
      },
    ],
  },
  {
    id: "uranium-lead-dating",
    title: "Uranium-Lead Dating",
    section: "Listening",
    audioPath: "tpo1_listening_passage1_3.mp3",
    questions: [
      {
        n: 1,
        type: "mc",
        prompt: "What does the professor mainly discuss?",
        options: [
          {
            label: "A",
            text: "The differences in age among American mountain ranges",
          },
          {
            label: "B",
            text: "The importance of a technique used for dating geological materials",
          },
          {
            label: "C",
            text: "The recent discovery of an ancient canyon",
          },
          {
            label: "D",
            text: "A comparison of various minerals used for dating",
          },
        ],
        answer: "B",
      },
      {
        n: 2,
        type: "mc",
        prompt:
          "Before the use of uranium-lead analysis, where did most geologists think the Grand Canyon sandstone came from?",
        options: [
          {
            label: "A",
            text: "An ancient lake located in the American Southwest",
          },
          {
            label: "B",
            text: "A desert that once connected two continents",
          },
          {
            label: "C",
            text: "Sands carried by a river from the Appalachian Mountains",
          },
          {
            label: "D",
            text: "A nearby mountain range that had flattened out over time",
          },
        ],
        answer: "D",
      },
      {
        n: 3,
        type: "ordering",
        prompt:
          "In the talk, the professor describes the sequence of uranium-lead dating. Put the events in the correct order.",
        items: [
          "A. Zircon in the sandstone is matched to the zircon in a particular mountain range",
          "B. The amount of lead in sandstone zircon is measured",
          "C. The age of zircon in a sandstone sample is determined",
        ],
        answer: "BCA",
      },
      {
        n: 4,
        type: "mc",
        prompt:
          "According to the professor, what change has caused uranium-lead dating to gain popularity recently?",
        options: [
          {
            label: "A",
            text: "It can be performed outside a laboratory",
          },
          {
            label: "B",
            text: "It can now be done more efficiently",
          },
          {
            label: "C",
            text: "It no longer involves radioactive elements",
          },
          {
            label: "D",
            text: "It can be used in fields other than geology",
          },
        ],
        answer: "B",
      },
      {
        n: 5,
        type: "mc",
        prompt:
          "Why does the professor talk about the breaking apart of Earth's continents?",
        options: [
          {
            label: "A",
            text: "To give another example of how uranium-lead dating might be useful",
          },
          {
            label: "B",
            text: "To explain how the Grand Canyon was formed",
          },
          {
            label: "C",
            text: "To demonstrate how difficult uranium-lead dating is",
          },
          {
            label: "D",
            text: "To disprove a theory about the age of Earth's first mountain ranges",
          },
        ],
        answer: "A",
      },
      {
        n: 6,
        type: "mc",
        prompt: "What does the professor imply when he says this?",
        options: [
          {
            label: "A",
            text: "The class is easier than other geology classes",
          },
          {
            label: "B",
            text: "The class has already studied the information he is discussing",
          },
          {
            label: "C",
            text: "Some students should take a course in geological dating techniques",
          },
          {
            label: "D",
            text: "He will discuss the topic later in the class",
          },
        ],
        answer: "B",
      },
    ],
  },
  {
    id: "classroom-observation",
    title: "Classroom Observation",
    section: "Listening",
    audioPath: "tpo1_listening_passage2_1.mp3",
    questions: [
      {
        n: 1,
        type: "mc",
        prompt: "What is the conversation mainly about?",
        options: [
          {
            label: "A",
            text: "A lesson Matthew prepared for his students",
          },
          {
            label: "B",
            text: "A class Matthew has been observing",
          },
          {
            label: "C",
            text: "A term paper that Matthew has written",
          },
          {
            label: "D",
            text: "A problem in Matthew's classroom",
          },
        ],
        answer: "D",
      },
      {
        n: 2,
        type: "mc",
        prompt:
          "What is Matthew's opinion about observing Mr. Grabell's third-grade class?",
        options: [
          {
            label: "A",
            text: "It will help him become a more effective teacher",
          },
          {
            label: "B",
            text: "It could help improve his study habits",
          },
          {
            label: "C",
            text: "It has improved his public-speaking skills",
          },
          {
            label: "D",
            text: "It may be the most difficult assignment he has had",
          },
        ],
        answer: "A",
      },
      {
        n: 3,
        type: "mc",
        prompt: "Why does Matthew mention Greek and Roman mythology?",
        options: [
          {
            label: "A",
            text: "To identify a topic frequently discussed in third grade",
          },
          {
            label: "B",
            text: "To get the professor's opinion about a lesson he taught",
          },
          {
            label: "C",
            text: "To make a suggestion to improve the class he is taking",
          },
          {
            label: "D",
            text: "To illustrate a technique used to teach a third-grade class",
          },
        ],
        answer: "B",
      },
      {
        n: 4,
        type: "multi",
        prompt:
          "What important skills did Mr. Grabell introduce to his third-grade class? Choose THREE answers.",
        options: [
          {
            label: "A",
            text: "Reviewing other students' reports",
          },
          {
            label: "B",
            text: "Using books in the library",
          },
          {
            label: "C",
            text: "Interviewing their classmates",
          },
          {
            label: "D",
            text: "Speaking in public",
          },
          {
            label: "E",
            text: "Writing reports",
          },
        ],
        answer: "BDE",
        alts: ["BED", "DBE", "DEB", "EBD", "EDB"],
      },
      {
        n: 5,
        type: "mc",
        prompt: "What will Matthew probably do in next Wednesday's class?",
        options: [
          {
            label: "A",
            text: "Hand in his assignment early",
          },
          {
            label: "B",
            text: "Try to start a study group",
          },
          {
            label: "C",
            text: "Make a presentation to the class",
          },
          {
            label: "D",
            text: "Choose a topic for his paper",
          },
        ],
        answer: "C",
      },
    ],
  },
  {
    id: "tpo1-l3-catalhoyuk",
    title: "Archaeology Class (Catalhoyuk)",
    section: "Listening",
    taskType: "Multiple Choice + Multi Selection",
    audioPath: "tpo1_listening_passage2_2.mp3",
    questions: [
      {
        n: 1,
        type: "mc",
        prompt: "What is the lecture mainly about?",
        options: [
          { label: "A", text: "Art in the Neolithic period." },
          { label: "B", text: "The site of a Neolithic town." },
          { label: "C", text: "Methods of making stone tools." },
          {
            label: "D",
            text: "The domestication of plants and animals by early farmers.",
          },
        ],
        answer: "B",
      },
      {
        n: 2,
        type: "mc",
        prompt:
          "What does the professor imply about the tools used by the people of Catalhoyuk?",
        options: [
          {
            label: "A",
            text: "They were made of stone that came from Catalhoyuk.",
          },
          {
            label: "B",
            text: "They were among the sharpest tools available at the time.",
          },
          {
            label: "C",
            text: "They were often used for religious or magical purposes.",
          },
          {
            label: "D",
            text: "They were not strong enough to cut through wood or brick.",
          },
        ],
        answer: "B",
      },
      {
        n: 3,
        type: "multi",
        prompt:
          "What does the professor say about the entrances to the houses in Catalhoyuk? Click on 2 answers.",
        options: [
          { label: "A", text: "They were in the roof." },
          { label: "B", text: "They were usually kept closed." },
          { label: "C", text: "They allowed smoke to escape from the house." },
          {
            label: "D",
            text: "They stood opposite one another across narrow streets.",
          },
        ],
        answer: "AC",
        alts: ["CA"],
      },
      {
        n: 4,
        type: "mc",
        prompt: "What does the professor say about the graves at Catalhoyuk?",
        options: [
          { label: "A", text: "They were located outside the town walls." },
          { label: "B", text: "They were marked with elaborate paintings." },
          { label: "C", text: "They were located under the house floors." },
          { label: "D", text: "They contained many objects made of obsidian." },
        ],
        answer: "C",
      },
      {
        n: 5,
        type: "mc",
        prompt:
          "What does the professor say about the paintings on the walls of the houses?",
        options: [
          { label: "A", text: "They became covered with soot." },
          { label: "B", text: "They often show farmers at work." },
          { label: "C", text: "Their significance is unknown." },
          { label: "D", text: "They contain many hunting scenes." },
        ],
        answer: "C",
      },
      {
        n: 6,
        type: "mc",
        prompt:
          "What does the professor imply about archaeological interpretations of physical remains?",
        options: [
          {
            label: "A",
            text: "They are rarely supported by physical artifacts.",
          },
          {
            label: "B",
            text: "They are likely to change as more evidence is excavated.",
          },
          {
            label: "C",
            text: "They cannot provide certain knowledge about what ancient people thought.",
          },
          {
            label: "D",
            text: "They are more accurate when dealing with art than with architecture.",
          },
        ],
        answer: "C",
      },
    ],
  },
  {
    id: "tpo1-l4-marmots",
    title: "Biology Class (Marmots)",
    section: "Listening",
    taskType: "Multiple Choice + Multi Selection",
    audioPath: "tpo1_listening_passage2_3.mp3",
    questions: [
      {
        n: 1,
        type: "mc",
        prompt: "What is the lecture mainly about?",
        options: [
          {
            label: "A",
            text: "The effect of environment on the social behavior of marmots.",
          },
          {
            label: "B",
            text: "The difference in hibernation patterns between two marmot species.",
          },
          {
            label: "C",
            text: "The physical characteristics of marmots that live in different climates.",
          },
          {
            label: "D",
            text: "Reasons why marmots are excellent subjects for behavioral studies.",
          },
        ],
        answer: "A",
      },
      {
        n: 2,
        type: "mc",
        prompt:
          "According to the case study, why are marmots good subjects for behavioral studies?",
        options: [
          {
            label: "A",
            text: "They do not migrate from their home territories.",
          },
          {
            label: "B",
            text: "They are active during the day and easy to see.",
          },
          { label: "C", text: "They have a short hibernation period." },
          {
            label: "D",
            text: "They display a wide variety of emotional expressions.",
          },
        ],
        answer: "B",
      },
      {
        n: 3,
        type: "mc",
        prompt:
          "What does the professor say about the growing season for eastern marmots?",
        options: [
          {
            label: "A",
            text: "It is the time when eastern marmots are growing.",
          },
          { label: "B", text: "It is five months long." },
          { label: "C", text: "It is a period when food is scarce." },
          { label: "D", text: "It starts when the snow melts." },
        ],
        answer: "B",
      },
      {
        n: 4,
        type: "mc",
        prompt:
          'Why does the professor say this: "Well, it’s not as if they aren’t ready for the real world… because they are."',
        options: [
          {
            label: "A",
            text: "To criticize the student's assumption about the offspring's age.",
          },
          {
            label: "B",
            text: "To emphasize that the young marmots are capable of independent survival.",
          },
          {
            label: "C",
            text: "To explain why eastern marmots have a low survival rate.",
          },
          {
            label: "D",
            text: "To compare the maturity levels of different marmot species.",
          },
        ],
        answer: "B",
      },
      {
        n: 5,
        type: "multi",
        prompt:
          "According to the lecture, what are two reasons why eastern marmots can survive on their own after six weeks? Click on 2 answers.",
        options: [
          {
            label: "A",
            text: "They live in a temperate climate with mild weather.",
          },
          {
            label: "B",
            text: "They are naturally aggressive and independent.",
          },
          {
            label: "C",
            text: "There is an abundance of food available in their environment.",
          },
          {
            label: "D",
            text: "Their mothers continue to protect them from a distance.",
          },
        ],
        answer: "AC",
        alts: ["CA"],
      },
      {
        n: 6,
        type: "mc",
        prompt:
          "What does the professor imply about the social behavior of Olympic marmots?",
        options: [
          {
            label: "A",
            text: "It is more aggressive than that of eastern marmots.",
          },
          {
            label: "B",
            text: "It is heavily influenced by the harsh mountain climate.",
          },
          {
            label: "C",
            text: "It changes depending on the length of their hibernation.",
          },
          {
            label: "D",
            text: "It makes them difficult for researchers to observe.",
          },
        ],
        answer: "B",
      },
    ],
  },
  {
    id: "weather-report-discussion",
    title: "Weather Report Discussion",
    section: "Listening",
    audioPath: "tpo2_listening_passage1_1.mp3",
    questions: [
      {
        n: 1,
        type: "mc",
        prompt: "Why does the man go to see his professor?",
        options: [
          {
            label: "A",
            text: "To borrow some charts and graphs from her",
          },
          {
            label: "B",
            text: "To ask her to explain some statistical procedures",
          },
          {
            label: "C",
            text: "To talk about a report he is writing",
          },
          {
            label: "D",
            text: "To discuss a grade he got on a paper",
          },
        ],
        answer: "C",
      },

      {
        n: 2,
        type: "table",
        prompt: "What information will the man include in his report?",
        categories: ["Include in report", "Not include in report"],
        items: [
          {
            text: "Climate charts",
            answer: "Include in report",
          },
          {
            text: "Interviews with meteorologists",
            answer: "Not include in report",
          },
          {
            text: "Journal notes",
            answer: "Include in report",
          },
          {
            text: "Statistical tests",
            answer: "Include in report",
          },
        ],
        answer: "ABAA",
      },

      {
        n: 3,
        type: "mc",
        prompt:
          "Why does the professor tell the man about the appointment at the doctor's office?",
        options: [
          {
            label: "A",
            text: "To demonstrate a way of remembering things",
          },
          {
            label: "B",
            text: "To explain why she needs to leave soon",
          },
          {
            label: "C",
            text: "To illustrate a point that appears in his report",
          },
          {
            label: "D",
            text: "To emphasize the importance of good health",
          },
        ],
        answer: "C",
      },

      {
        n: 4,
        type: "mc",
        prompt: "What does the professor offer to do for the man?",
        options: [
          {
            label: "A",
            text: "Help him collect more data in other areas of the state",
          },
          {
            label: "B",
            text: "Submit his research findings for publication",
          },
          {
            label: "C",
            text: "Give him the doctor's telephone number",
          },
          {
            label: "D",
            text: "Review the first version of his report",
          },
        ],
        answer: "D",
      },

      {
        n: 5,
        type: "mc",
        prompt: "Why does the professor say this?",
        options: [
          {
            label: "A",
            text: "To question the length of the paper",
          },
          {
            label: "B",
            text: "To offer encouragement",
          },
          {
            label: "C",
            text: "To dispute the data sources",
          },
          {
            label: "D",
            text: "To explain a theory",
          },
        ],
        answer: "B",
      },
    ],
  },
  {
    id: "motor-theory-of-thinking",
    title: "Motor Theory of Thinking",
    section: "Listening",
    audioPath: "tpo2_listening_passage1_2.mp3",
    questions: [
      {
        n: 1,
        type: "mc",
        prompt: "What is the professor mainly discussing?",
        options: [
          {
            label: "A",
            text: "The development of motor skills in children",
          },
          {
            label: "B",
            text: "How psychologists measure muscle activity in the throat",
          },
          {
            label: "C",
            text: "A theory about the relationship between muscle activity and thinking",
          },
          {
            label: "D",
            text: "A study on deaf people's problem-solving techniques",
          },
        ],
        answer: "C",
      },

      {
        n: 2,
        type: "mc",
        prompt: "Why does the professor say this?",
        options: [
          {
            label: "A",
            text: "To give an example of a laryngeal habit",
          },
          {
            label: "B",
            text: "To explain the meaning of a term",
          },
          {
            label: "C",
            text: "To explain why he is discussing laryngeal habits",
          },
          {
            label: "D",
            text: "To remind students of a point he had discussed previously",
          },
        ],
        answer: "B",
      },

      {
        n: 3,
        type: "mc",
        prompt:
          "What does the professor say about people who use sign language?",
        options: [
          {
            label: "A",
            text: "It is not possible to study their thinking habits",
          },
          {
            label: "B",
            text: "They exhibit laryngeal habits",
          },
          {
            label: "C",
            text: "The muscles in their hands move when they solve problems",
          },
          {
            label: "D",
            text: "They do not exhibit ideomotor action",
          },
        ],
        answer: "C",
      },

      {
        n: 4,
        type: "mc",
        prompt:
          "What point does the professor make when he refers to the university library?",
        options: [
          {
            label: "A",
            text: "A study on problem solving took place there",
          },
          {
            label: "B",
            text: "Students should go there to read more about behaviorism",
          },
          {
            label: "C",
            text: "Students' eyes will turn toward it if they think about it",
          },
          {
            label: "D",
            text: "He learned about William James's concept of thinking there",
          },
        ],
        answer: "C",
      },

      {
        n: 5,
        type: "mc",
        prompt:
          "The professor describes a magic trick to the class. What does the magic trick demonstrate?",
        options: [
          {
            label: "A",
            text: "An action people make that they are not aware of",
          },
          {
            label: "B",
            text: "That behaviorists are not really scientists",
          },
          {
            label: "C",
            text: "How psychologists study children",
          },
          {
            label: "D",
            text: "A method for remembering locations",
          },
        ],
        answer: "A",
      },

      {
        n: 6,
        type: "mc",
        prompt:
          "What is the professor's opinion of the motor theory of thinking?",
        options: [
          {
            label: "A",
            text: "Most of the evidence he has collected contradicts it",
          },
          {
            label: "B",
            text: "It explains adult behavior better than it explains child behavior",
          },
          {
            label: "C",
            text: "It is the most valid theory of thinking at the present time",
          },
          {
            label: "D",
            text: "It cannot be completely proved or disproved",
          },
        ],
        answer: "D",
      },
    ],
  },
  {
    id: "manila-hemp-fibers",
    title: "Manila Hemp Fibers",
    section: "Listening",
    audioPath: "tpo2_listening_passage1_3.mp3",
    questions: [
      {
        n: 1,
        type: "mc",
        prompt:
          "What aspect of Manila hemp fibers does the professor mainly discuss in the lecture?",
        options: [
          {
            label: "A",
            text: "Similarities between cotton fibers and manila hemp fibers",
          },
          {
            label: "B",
            text: "Various types of manila hemp fibers",
          },
          {
            label: "C",
            text: "The economic importance of Manila hemp fibers",
          },
          {
            label: "D",
            text: "A use of Manila hemp fibers",
          },
        ],
        answer: "D",
      },

      {
        n: 2,
        type: "mc",
        prompt: "Why does the professor mention going away for the weekend?",
        options: [
          {
            label: "A",
            text: "To tell the class a joke",
          },
          {
            label: "B",
            text: "To apologize for not completing some work",
          },
          {
            label: "C",
            text: "To introduce the topic of the lecture",
          },
          {
            label: "D",
            text: "To encourage students to ask about her trip",
          },
        ],
        answer: "B",
      },

      {
        n: 3,
        type: "mc",
        prompt: 'What does the professor imply about the name "Manila hemp"?',
        options: [
          {
            label: "A",
            text: "It is a commercial brand name",
          },
          {
            label: "B",
            text: "Part of the name is inappropriate",
          },
          {
            label: "C",
            text: "The name has recently changed",
          },
          {
            label: "D",
            text: "The name was first used in the 1940s",
          },
        ],
        answer: "B",
      },

      {
        n: 4,
        type: "mc",
        prompt: "Why does the professor mention the Golden Gate Bridge?",
        options: [
          {
            label: "A",
            text: "To demonstrate a disadvantage of steel cables",
          },
          {
            label: "B",
            text: "To give an example of the creative use of color",
          },
          {
            label: "C",
            text: "To show that steel cables are able to resist salt water",
          },
          {
            label: "D",
            text: "To give an example of a use of Manila hemp",
          },
        ],
        answer: "A",
      },

      {
        n: 5,
        type: "mc",
        prompt:
          "According to the professor, what was the main reason that many ships used Manila hemp ropes instead of steel cables?",
        options: [
          {
            label: "A",
            text: "Manila hemp was cheaper",
          },
          {
            label: "B",
            text: "Manila hemp was easier to produce",
          },
          {
            label: "C",
            text: "Manila hemp is more resistant to salt water",
          },
          {
            label: "D",
            text: "Manila hemp is lighter in weight",
          },
        ],
        answer: "C",
      },

      {
        n: 6,
        type: "multi",
        prompt:
          "According to the lecture, what are TWO ways to increase the strength of rope made from Manila hemp fibers?",
        options: [
          {
            label: "A",
            text: "Coat the fibers with zinc-based paint",
          },
          {
            label: "B",
            text: "Combine the fibers into bundles",
          },
          {
            label: "C",
            text: "Soak bundles of fibers in salt water",
          },
          {
            label: "D",
            text: "Twist bundles of fibers",
          },
        ],
        answer: "BD",
        alts: ["DB"],
      },
    ],
  },
  {
    id: "poetry-kitchen-club",
    title: "Poetry Kitchen Club",
    section: "Listening",
    audioPath: "tpo2_listening_passage2_1.mp3",
    questions: [
      {
        n: 1,
        type: "multi",
        prompt: "What are the students mainly discussing? Choose TWO answers.",
        options: [
          {
            label: "A",
            text: "Their courses for next semester",
          },
          {
            label: "B",
            text: "Their plans for the weekend",
          },
          {
            label: "C",
            text: "A poetry club",
          },
          {
            label: "D",
            text: "A class assignment",
          },
        ],
        answer: "AC",
        alts: ["CA"],
      },

      {
        n: 2,
        type: "mc",
        prompt: "What does the man plan to do at the end of the month?",
        options: [
          {
            label: "A",
            text: "Register for classes",
          },
          {
            label: "B",
            text: "Finish writing his master's thesis",
          },
          {
            label: "C",
            text: "Leave his job at the coffee shop",
          },
          {
            label: "D",
            text: "Take a short vacation",
          },
        ],
        answer: "C",
      },

      {
        n: 3,
        type: "mc",
        prompt:
          'Why does the man talk to the woman about the "Poetry Kitchen"?',
        options: [
          {
            label: "A",
            text: "To find out how often the club meets",
          },
          {
            label: "B",
            text: "To inform her that the date of the next meeting has changed",
          },
          {
            label: "C",
            text: "To complain that not enough people are reading their poems",
          },
          {
            label: "D",
            text: "To encourage her to attend",
          },
        ],
        answer: "D",
      },

      {
        n: 4,
        type: "mc",
        prompt:
          "What is the woman's attitude toward participating in the poetry club?",
        options: [
          {
            label: "A",
            text: "She is looking forward to hearing her professor's poetry",
          },
          {
            label: "B",
            text: "She is interested in attending but she has no time",
          },
          {
            label: "C",
            text: "She thinks the poetry that is read there is not very good",
          },
          {
            label: "D",
            text: "She used to participate but did not enjoy it",
          },
        ],
        answer: "B",
      },

      {
        n: 5,
        type: "mc",
        prompt: "What will the students do in the summer?",
        options: [
          {
            label: "A",
            text: "They will both take courses",
          },
          {
            label: "B",
            text: "They will both have full-time jobs",
          },
          {
            label: "C",
            text: "They will travel to England together",
          },
          {
            label: "D",
            text: "They will teach a class together",
          },
        ],
        answer: "A",
      },
    ],
  },
  {
    id: "aristotle-happiness",
    title: "Aristotle and Human Happiness",
    section: "Listening",
    audioPath: "tpo2_listening_passage2_2.mp3",
    questions: [
      {
        n: 1,
        type: "mc",
        prompt: "What is the main purpose of the lecture?",
        options: [
          {
            label: "A",
            text: "To illustrate the importance of extrinsic values",
          },
          {
            label: "B",
            text: "To explain Aristotle's views about the importance of teaching",
          },
          {
            label: "C",
            text: "To explain why people change what they value",
          },
          {
            label: "D",
            text: "To discuss Aristotle's views about human happiness",
          },
        ],
        answer: "D",
      },

      {
        n: 2,
        type: "table",
        prompt:
          "Indicate for each example what type of value it has for the professor.",
        categories: [
          "Only extrinsic value",
          "Only intrinsic value",
          "Both extrinsic and intrinsic value",
        ],
        items: [
          {
            text: "Teaching",
            answer: "Both extrinsic and intrinsic value",
          },
          {
            text: "Exercise",
            answer: "Only intrinsic value",
          },
          {
            text: "Health",
            answer: "Only extrinsic value",
          },
          {
            text: "Playing a musical instrument",
            answer: "Both extrinsic and intrinsic value",
          },
        ],
        answer: "BACB",
      },

      {
        n: 3,
        type: "mc",
        prompt: "Why is happiness central to Aristotle's theory?",
        options: [
          {
            label: "A",
            text: "Because it is so difficult for people to attain",
          },
          {
            label: "B",
            text: "Because it is valued for its own sake by all people",
          },
          {
            label: "C",
            text: "Because it is a means to a productive life",
          },
          {
            label: "D",
            text: "Because most people agree about what happiness is",
          },
        ],
        answer: "B",
      },

      {
        n: 4,
        type: "mc",
        prompt:
          "According to the professor, why does Aristotle think that fame cannot provide true happiness?",
        options: [
          {
            label: "A",
            text: "Fame cannot be obtained without help from other people",
          },
          {
            label: "B",
            text: "Fame cannot be obtained by all people",
          },
          {
            label: "C",
            text: "Fame does not last forever",
          },
          {
            label: "D",
            text: "People cannot share their fame with other people",
          },
        ],
        answer: "A",
      },

      {
        n: 5,
        type: "mc",
        prompt: "What does the professor mean when she says this?",
        options: [
          {
            label: "A",
            text: "Teaching is not a highly valued profession in society",
          },
          {
            label: "B",
            text: "She may change professions in order to earn more money",
          },
          {
            label: "C",
            text: "The reason she is a teacher has little to do with her salary",
          },
          {
            label: "D",
            text: "More people would become teachers if the salary were higher",
          },
        ],
        answer: "C",
      },
    ],
  },
  {
    id: "aristotle-happiness",
    title: "Aristotle and Human Happiness",
    section: "Listening",
    audioPath: "tpo2_listening_passage2_3.mp3",
    questions: [
      {
        n: 1,
        type: "mc",
        prompt: "What is the main purpose of the lecture?",
        options: [
          {
            label: "A",
            text: "To illustrate the importance of extrinsic values",
          },
          {
            label: "B",
            text: "To explain Aristotle's views about the importance of teaching",
          },
          {
            label: "C",
            text: "To explain why people change what they value",
          },
          {
            label: "D",
            text: "To discuss Aristotle's views about human happiness",
          },
        ],
        answer: "D",
      },

      {
        n: 2,
        type: "table",
        prompt:
          "Indicate for each example what type of value it has for the professor.",
        categories: [
          "Only extrinsic value",
          "Only intrinsic value",
          "Both extrinsic and intrinsic value",
        ],
        items: [
          {
            text: "Teaching",
            answer: "Both extrinsic and intrinsic value",
          },
          {
            text: "Exercise",
            answer: "Only intrinsic value",
          },
          {
            text: "Health",
            answer: "Only extrinsic value",
          },
          {
            text: "Playing a musical instrument",
            answer: "Both extrinsic and intrinsic value",
          },
        ],
        answer: "BACB",
      },

      {
        n: 3,
        type: "mc",
        prompt: "Why is happiness central to Aristotle's theory?",
        options: [
          {
            label: "A",
            text: "Because it is so difficult for people to attain",
          },
          {
            label: "B",
            text: "Because it is valued for its own sake by all people",
          },
          {
            label: "C",
            text: "Because it is a means to a productive life",
          },
          {
            label: "D",
            text: "Because most people agree about what happiness is",
          },
        ],
        answer: "B",
      },

      {
        n: 4,
        type: "mc",
        prompt:
          "According to the professor, why does Aristotle think that fame cannot provide true happiness?",
        options: [
          {
            label: "A",
            text: "Fame cannot be obtained without help from other people",
          },
          {
            label: "B",
            text: "Fame cannot be obtained by all people",
          },
          {
            label: "C",
            text: "Fame does not last forever",
          },
          {
            label: "D",
            text: "People cannot share their fame with other people",
          },
        ],
        answer: "A",
      },

      {
        n: 5,
        type: "mc",
        prompt: "What does the professor mean when she says this?",
        options: [
          {
            label: "A",
            text: "Teaching is not a highly valued profession in society",
          },
          {
            label: "B",
            text: "She may change professions in order to earn more money",
          },
          {
            label: "C",
            text: "The reason she is a teacher has little to do with her salary",
          },
          {
            label: "D",
            text: "More people would become teachers if the salary were higher",
          },
        ],
        answer: "C",
      },
    ],
  },
];
