import type { ModuleLesson } from "@/types/module";

const basicGrammarLessons: ModuleLesson[] = [
  {
    id: "grammar-2",
    track: "grammar",
    day: 2,
    title: "Nouns (Kata Benda)",
    subtitle:
      "Jenis-jenis noun, aturan singular/plural, dan fungsi noun dalam kalimat",
    overview:
      "Pelajari Noun (kata benda) secara lengkap: klasifikasi berdasarkan wujud (Concrete & Abstract), berdasarkan jumlah (Countable & Uncountable), aturan Regular & Irregular Plural, suffix pembentuk noun, possessive noun, dan fungsi noun dalam kalimat.",
    passage: [
      "A noun is a word that names a person, place, thing, animal, or idea. Nouns are one of the most important parts of speech because almost every sentence contains at least one noun. Without nouns, we cannot identify what or who we are talking about.",
      "Nouns can be classified in two main ways: by form (concrete vs abstract) and by number (countable vs uncountable). Each type has its own rules and patterns that you need to master.",
      "Understanding how to form plurals correctly — both regular and irregular — is essential for writing proper English sentences. Pay close attention to the spelling rules for different word endings.",
    ],
    materialSections: [
      {
        title: "A) Berdasarkan Wujud — Concrete Noun",
        points: [
          "Concrete Noun: kata benda yang bisa dinikmati oleh panca indera (dilihat, disentuh, didengar, dicium, dirasa)",
          "",
          "a. Common Noun (Kata Benda Umum):",
          "Noun yang sering dijumpai dalam kehidupan sehari-hari — pencil, pen, laptop, handphone, tablet, book, chair, table, car",
          "Common noun TIDAK diawali huruf kapital (kecuali di awal kalimat)",
          'Example: "I put my {{annotation:pencil|noun}} on the {{annotation:table|noun}}." "She bought a new {{annotation:laptop|noun}}."',
          "",
          "b. Proper Noun (Kata Benda Khusus):",
          "Untuk nama orang, benua, negara, kota, kebangsaan, suku, dll — SELALU diawali HURUF KAPITAL",
          "Nama orang: Adam, Rani, Sara, Raras, Mrs. Rina, Mr. Ahmad",
          "Nama tempat: London, Jakarta, Bandung, Asia, Europe, France",
          "Kebangsaan/suku: Indonesian, Japanese, American, Javanese, Sundanese",
          'Example: "{{annotation:Adam|proper noun}} lives in {{annotation:Jakarta|proper noun}}." "She is {{annotation:Indonesian|proper noun}}."',
          "",
          "c. Collective Noun (Kata Benda Kelompok):",
          "Noun yang menunjukkan sekelompok orang, hewan, atau benda — dianggap TUNGGAL",
          "Orang: family, team, group, class, crowd, committee, army, audience, staff",
          "Hewan: a flock of birds, a herd of cattle, a pack of wolves, a swarm of bees",
          'Example: "My {{annotation:family|collective noun}} is big." "The {{annotation:team|collective noun}} is winning." "A {{annotation:group|collective noun}} of {{annotation:students|noun}} is studying."',
        ],
      },
      {
        title: "A) Berdasarkan Wujud — Abstract Noun",
        points: [
          "Abstract Noun: kata benda yang TIDAK berwujud — tidak bisa dilihat atau disentuh (perasaan, ide, konsep)",
          "Contoh: happiness, sadness, confidence, love, freedom, courage, knowledge, beauty, honesty, education",
          "",
          "Jika CONFIDENT = Adjective (kata sifat), maka CONFIDENCE = Noun (kata benda)",
          "Jika HAPPY = Adjective, maka HAPPINESS = Noun",
          "",
          'Example: "{{annotation:Happiness|abstract noun}} is the key to {{annotation:life|abstract noun}}." "His {{annotation:confidence|abstract noun}} surprised everyone." "{{annotation:Education|abstract noun}} is important."',
        ],
      },
      {
        title: "B) Berdasarkan Jumlah — Countable & Uncountable",
        points: [
          "Countable Noun (bisa dihitung): bisa pakai a/an, bisa dijamakkan — fingers, photos, bicycles, books, chairs",
          "Uncountable Noun (tidak bisa dihitung): TIDAK bisa pakai a/an, selalu TUNGGAL — sand, water, oil, information, rice, salt, sugar, hair, money",
          "",
          "Uncountable noun menggunakan kata bantu tunggal:",
          '"There is some {{annotation:water|uncountable}}." "I need some {{annotation:information|uncountable}}." "{{annotation:Money|uncountable}} is important."',
          'information, news, furniture = selalu dianggap TUNGGAL (bukan "informations"!)',
          "",
          "Suffix pembentuk noun (akhiran kata benda):",
          "",
          "-age (usia/proses):",
          "  marry → marriage, short → shortage, pass → passage, pack → package",
          "",
          "-hood (keadaan/masa):",
          "  child → childhood, neighbor → neighborhood, brother → brotherhood, man → manhood",
          "",
          "-ment (hasil/proses):",
          "  govern → government, develop → development, achieve → achievement, move → movement",
          "",
          "-ness (sifat/keadaan):",
          "  happy → happiness, sad → sadness, kind → kindness, dark → darkness, weak → weakness",
        ],
      },
      {
        title: "Countable Noun — Regular Plural Rules",
        points: [
          "Aturan dasar: Singular + -s → Plural",
          "cow → cows, book → books, cat → cats, student → students, table → tables",
          "",
          "-s / -x / -ss / -ch / -z / -sh (berbunyian desis/mendesis):",
          "  tambah +es:",
          "  bus → buses, box → boxes, glass → glasses, beach → beaches, buzz → buzzes, flash → flashes",
          "",
          "-y (berakhiran y sebelum KONSONAN):",
          "  ganti y → ies:",
          "  party → parties, butterfly → butterflies, baby → babies, city → cities, story → stories, country → countries",
          "",
          "-y (berakhiran y sebelum VOKAL):",
          "  langsung tambah +s:",
          "  key → keys, monkey → monkeys, boy → boys, day → days, toy → toys",
          "",
          "-o (berakhiran o sebelum KONSONAN):",
          "  tambah +es:",
          "  potato → potatoes, tomato → tomatoes, hero → heroes, echo → echoes",
          "  PENGECUALIAN kata serapan: photo → photos, logo → logos, piano → pianos, memo → memos",
          "",
          "-o (berakhiran o sebelum VOKAL):",
          "  langsung tambah +s:",
          "  zoo → zoos, radio → radios, video → videos, studio → studios",
          "",
          "-f / -fe (berakhiran f atau fe):",
          "  ganti f/fe → ves:",
          "  knife → knives, wife → wives, wolf → wolves, leaf → leaves, life → lives, half → halves, shelf → shelves",
        ],
      },
      {
        title: "Countable Noun — Irregular Plural",
        points: [
          "Irregular Noun: bentuk tunggal TIDAK sama dengan bentuk jamak (harus dihafal!)",
          "",
          "a) Bentuk Singular ≠ Plural (berubah total):",
          "  tooth → teeth, mouse → mice, woman → women, man → men, child → children, person → people, foot → feet, goose → geese, ox → oxen",
          "",
          "b) Bentuk Latin/Greek (kata serapan ilmiah):",
          "  datum → data, cactus → cacti, alumnus → alumni, curriculum → curricula, phenomenon → phenomena, bacterium → bacteria, analysis → analyses, crisis → crises",
          "",
          "c) Bentuk Singular = Plural (tidak berubah):",
          "  fish → fish, deer → deer, sheep → sheep, species → species, series → series, aircraft → aircraft",
          "",
          "d) Benda berpasangan (selalu berbentuk JAMAK):",
          "  pants, trousers, shoes, glasses (kacamata), scissors, eyes, ears, socks, gloves",
          '  Gunakan "a pair of": "a pair of shoes", "a pair of scissors", "a pair of glasses"',
          "",
          "e) Ilmu/mata pelajaran berakhiran -s tapi TUNGGAL:",
          "  economics, physics, mathematics, politics, statistics, athletics, linguistics, ethics",
          '  Example: "{{annotation:Mathematics|noun/singular}} is my favorite subject." "{{annotation:Physics|noun/singular}} is difficult." (bukan "are"!)',
        ],
      },
      {
        title: "Possessive Noun (Kepemilikan)",
        points: [
          "Possessive noun menunjukkan kepemilikan dengan menambahkan apostrophe (' atau 's)",
          "",
          "Singular noun (tunggal): tambah 's",
          "  {{annotation:Rani's|possessive}} {{annotation:book|noun}} (bukunya Rani), {{annotation:the teacher's|possessive}} {{annotation:desk|noun}} (meja guru), {{annotation:Adam's|possessive}} {{annotation:phone|noun}} (HP-nya Adam)",
          "  {{annotation:Sara's|possessive}} {{annotation:bag|noun}} (tasnya Sara), {{annotation:the dog's|possessive}} {{annotation:toy|noun}} (mainan anjing), {{annotation:my mother's|possessive}} {{annotation:name|noun}} (nama ibu saya)",
          "",
          "Singular noun berakhiran -s: tetap tambah 's (atau hanya ')",
          "  James's car ATAU James' car (kedua benar), the boss's office, Chris's house",
          "",
          "Plural noun berakhiran -s: hanya tambah ' (tanpa s)",
          "  the students' books (buku para murid), my parents' house (rumah orang tua), the dogs' toys (mainan anjing-anjing)",
          "",
          "Nama berakhiran -s seperti Raras:",
          "  Raras's pencil ATAU Raras' pencil (kedua benar)",
          "",
          "Irregular plural (tidak berakhiran -s): tambah 's",
          "  {{annotation:the children's|possessive}} {{annotation:room|noun}}, {{annotation:the women's|possessive}} {{annotation:group|noun}}, {{annotation:the people's|possessive}} {{annotation:choice|noun}}",
        ],
      },
      {
        title: "Fungsi Noun dalam Kalimat",
        points: [
          "1) Sebagai Subject (pelaku/pokok kalimat):",
          'Example: "{{annotation:Ice cream|subject/noun}} is my favorite." "{{annotation:The teacher|subject/noun}} explains the lesson." "{{annotation:Dogs|subject/noun}} are loyal."',
          "Noun yang menjadi subject ada di AWAL kalimat, sebelum verb",
          "",
          "2) Sebagai Object of Verb (objek kata kerja):",
          'Example: "I eat {{annotation:ice cream|object/noun}}." "She reads {{annotation:a book|object/noun}}." "He bought {{annotation:a car|object/noun}}."',
          "Noun yang menjadi object ada SETELAH verb (kata kerja)",
          "",
          "3) Sebagai Object of Preposition (objek kata depan):",
          'Example: "I put my {{annotation:book|noun}} on {{annotation:the table|object/noun}}." "She goes to {{annotation:school|object/noun}}." "He lives in {{annotation:Jakarta|object/noun}}."',
          "Noun yang menjadi object ada SETELAH preposition (on, in, at, to, for, with, dll)",
          "",
          "4) Sebagai Subject Complement (pelengkap subjek):",
          'Example: "My {{annotation:mother|noun}} is {{annotation:a doctor|complement/noun}}." "They are {{annotation:students|complement/noun}}." "He became {{annotation:a pilot|complement/noun}}."',
          "Noun ada SETELAH linking verb (is, am, are, was, were, become) dan menjelaskan subject",
          "My mother = a doctor (saling merujuk)",
        ],
      },
    ],
    exercises: [
      {
        id: "g2-q1",
        section: "middle",
        type: "multiple-choice",
        question: "Which of the following is an UNCOUNTABLE noun?",
        options: ["apple", "chair", "information", "student"],
        correctAnswer: "information",
        reason:
          '"Information" tidak bisa dihitung (uncountable). Kita tidak bisa bilang "two informations". Sedangkan apple, chair, student bisa dihitung.',
      },
      {
        id: "g2-q2",
        section: "middle",
        type: "multiple-choice",
        question: 'Which is the correct PLURAL form of "child"?',
        options: ["childs", "childes", "children", "childern"],
        correctAnswer: "children",
        reason:
          '"Child" adalah irregular noun. Bentuk jamaknya "children", bukan "childs" atau "childes". Harus dihafal!',
      },
      {
        id: "g2-q3",
        section: "middle",
        type: "multiple-choice",
        question: '"Happiness" is what type of noun?',
        options: [
          "Common noun",
          "Proper noun",
          "Abstract noun",
          "Collective noun",
        ],
        correctAnswer: "Abstract noun",
        reason:
          '"Happiness" adalah abstract noun karena tidak bisa dilihat atau disentuh — itu perasaan. Happy (adjective) → happiness (noun).',
      },
      {
        id: "g2-q4",
        section: "middle",
        type: "multiple-choice",
        question: "Which sentence uses the possessive noun correctly?",
        options: [
          "The dogs toy is here.",
          "The dog's toy is here.",
          "The dogs' toy is here.",
          "The dog toy's is here.",
        ],
        correctAnswer: "The dog's toy is here.",
        reason:
          'Kepemilikan singular: tambah \'s setelah noun. "dog\'s" = milik satu anjing. "dogs\'" = milik banyak anjing.',
      },
      {
        id: "g2-q5",
        section: "middle",
        type: "multiple-choice",
        question: 'What is the correct plural of "potato"?',
        options: ["potatos", "potatoes", "potatose", "potato's"],
        correctAnswer: "potatoes",
        reason:
          "Kata berakhiran -o sebelum konsonan: tambah -es. potato → potatoes, tomato → tomatoes. Tapi kata serapan: photo → photos.",
      },
      {
        id: "g2-q6",
        section: "middle",
        type: "multiple-choice",
        question: "\"Rani's book\" — what does the 's show?",
        options: [
          "Plural (jamak)",
          "Possessive (kepemilikan)",
          "Contraction (singkatan)",
          "Verb form",
        ],
        correctAnswer: "Possessive (kepemilikan)",
        reason:
          "Rani's = milik Rani. Apostrophe + s ('s) pada noun menunjukkan kepemilikan, bukan jamak!",
      },
      {
        id: "g2-q7",
        section: "middle",
        type: "multiple-choice",
        question:
          '"Mathematics ___ my favorite subject." Choose the correct verb:',
        options: ["is", "are", "were", "have"],
        correctAnswer: "is",
        reason:
          'Mathematics berakhiran -s tapi dianggap TUNGGAL (nama mata pelajaran). Jadi pakai "is", bukan "are".',
      },
      {
        id: "g2-q8",
        section: "middle",
        type: "multiple-choice",
        question: 'What is the correct possessive form for "Raras"?',
        options: [
          "Raras's pencil",
          "Rarases pencil",
          "Raras pencil's",
          "Raras pencils",
        ],
        correctAnswer: "Raras's pencil",
        reason:
          "Nama berakhiran -s: tambah 's → Raras's pencil. Bisa juga Raras' pencil (keduanya benar).",
      },
      {
        id: "g2-q9",
        section: "final",
        type: "short-answer",
        question:
          "Write the PLURAL form: 1) party 2) knife 3) box 4) woman 5) key 6) tooth 7) photo 8) leaf 9) fish 10) bus 11) tomato 12) deer",
      },
      {
        id: "g2-q10",
        section: "final",
        type: "short-answer",
        question:
          "Classify these nouns (Common, Proper, Abstract, Collective, Countable, or Uncountable): 1) Jakarta 2) team 3) happiness 4) pencil 5) Indonesian 6) water 7) family 8) information 9) confidence 10) Adam",
      },
      {
        id: "g2-q11",
        section: "final",
        type: "short-answer",
        question:
          "Identify the function of the underlined noun (Subject, Object of Verb, Object of Preposition, or Subject Complement): 1) Ice cream is my favorite. 2) I eat ice cream. 3) I put my book on the table. 4) My mother is a doctor.",
      },
      {
        id: "g2-q12",
        section: "final",
        type: "short-answer",
        question:
          "Write the possessive form: 1) the book of Rani → ___ 2) the house of my parents → ___ 3) the toys of the children → ___ 4) the car of James → ___ 5) the pencil of Raras → ___",
      },
      {
        id: "g2-q13",
        section: "final",
        type: "task",
        question:
          "Write 10 sentences about your daily life. In each sentence, identify ALL the nouns and label them: Common (CM), Proper (P), Abstract (AB), Collective (CL), Countable (CT), or Uncountable (UC). Also identify the function of the main noun (Subject, Object, or Complement).",
      },
    ],
  },
  {
    id: "grammar-3",
    track: "grammar",
    day: 3,
    title: "Pronouns (Kata Ganti)",
    subtitle:
      "Personal, Possessive, Reflexive, Demonstrative, Relative, dan Indefinite Pronouns",
    overview:
      "Pelajari Pronoun (kata ganti) secara lengkap: Personal Pronouns (Subject & Object), Possessive (my vs mine), Reflexive (myself/yourself), Demonstrative (this/that), Interrogative (who/whom/whose), Relative (who/which/that), dan Indefinite Pronouns (everyone/nobody/something).",
    passage: [
      'A pronoun is a word that replaces a noun to avoid repetition. Instead of saying "Sara went to Sara\'s school because Sara was late," we say "Sara went to her school because she was late."',
      "There are many types of pronouns in English. Each type has a specific function and follows certain rules. Mastering pronouns will make your English sound more natural and fluent.",
      "The most important rule: a pronoun must agree with the noun it replaces in number (singular/plural) and gender (he/she/it).",
    ],
    materialSections: [
      {
        title: "A) Personal Pronouns (Subject & Object)",
        points: [
          "Subject pronouns (before verb): I, you, he, she, it, we, they",
          "Object pronouns (after verb/preposition): me, you, him, her, it, us, them",
          '"I" is always capitalized. "I am a student." NOT "i am a student."',
          'Subject: "{{annotation:She|subject pron}} is my friend." "{{annotation:They|subject pron}} are playing." "{{annotation:He|subject pron}} runs fast." "{{annotation:We|subject pron}} love music."',
          'Object: "Call {{annotation:me|object pron}} tomorrow." "I saw {{annotation:her|object pron}} at school." "Give it to {{annotation:him|object pron}}." "Tell {{annotation:them|object pron}} the news."',
          'After prepositions, use OBJECT: "between you and {{annotation:me|object pron}}" (NOT "between you and I"). "for {{annotation:us|object pron}}", "with {{annotation:them|object pron}}"',
        ],
      },
      {
        title: "B) Possessive Pronouns & Adjectives",
        points: [
          "Possessive adjectives (before noun): my, your, his, her, its, our, their",
          "Possessive pronouns (replace noun): mine, yours, his, hers, its, ours, theirs",
          'Adjective: "This is {{annotation:my|poss. adj}} book." "That is {{annotation:her|poss. adj}} bag." "{{annotation:Their|poss. adj}} house is big."',
          'Pronoun: "This book is {{annotation:mine|poss. pron}}." "That bag is {{annotation:hers|poss. pron}}." "The big house is {{annotation:theirs|poss. pron}}."',
          'Common mistake: "it\'s" = it is. "its" = possessive. "The dog wagged its tail." NOT "it\'s tail."',
          'Common mistake: "your" = possessive. "you\'re" = you are. "Your book is here." "You\'re welcome."',
        ],
      },
      {
        title: "C) Reflexive Pronouns",
        points: [
          "Reflexive: myself, yourself, himself, herself, itself, ourselves, yourselves, themselves",
          'Used when subject and object are the SAME person: "I cut {{annotation:myself|reflexive}}." "She taught {{annotation:herself|reflexive}} English."',
          'For emphasis: "I {{annotation:myself|reflexive}} cooked this dinner." "The president {{annotation:himself|reflexive}} visited our school."',
          'Common expressions: "Help {{annotation:yourself|reflexive}}." "Enjoy {{annotation:yourself|reflexive}}." "Behave {{annotation:yourself|reflexive}}." "Introduce {{annotation:yourself|reflexive}}."',
          'Wrong: "He did it hisself." → Correct: "He did it himself."',
          'Wrong: "They did it theirselves." → Correct: "They did it themselves."',
        ],
      },
      {
        title: "D) Demonstrative & Interrogative Pronouns",
        points: [
          "Demonstrative — point to specific things:",
          'Near (dekat): this (singular), these (plural) — "{{annotation:This|demonstrative}} is my book." "{{annotation:These|demonstrative}} are my friends."',
          'Far (jauh): that (singular), those (plural) — "{{annotation:That|demonstrative}} is your car." "{{annotation:Those|demonstrative}} are expensive."',
          "Interrogative — used for questions:",
          'Who (subject/orang): "Who is she?" "Who called you?"',
          'Whom (object/orang): "Whom did you call?" "To whom is this letter?"',
          'What (benda/hal): "What is your name?" "What happened?"',
          'Which (pilihan): "Which do you prefer?" "Which book is yours?"',
          'Whose (kepemilikan): "Whose bag is this?" "Whose idea was that?"',
        ],
      },
      {
        title: "E) Relative Pronouns",
        points: [
          "Used to connect clauses and give more information about a noun:",
          'Who/That (for people): "The girl {{annotation:who/that|relative}} sits next to me is my friend."',
          'Which/That (for things/animals): "The book {{annotation:which/that|relative}} I read is interesting."',
          'Whose (possession): "The man {{annotation:whose|relative}} car was stolen called the police."',
          'Where (places): "The school {{annotation:where|relative}} I study is in Jakarta."',
          'When (time): "I remember the day {{annotation:when|relative}} we first met."',
          'Whom (formal, object): "The teacher {{annotation:whom|relative}} I respect is Mrs. Rina."',
        ],
      },
      {
        title: "F) Indefinite Pronouns",
        points: [
          "Refer to non-specific people or things:",
          "✅ Somebody, Someone, Something → konteks POSITIF, untuk sesuatu hal yang pasti.",
          'Ex: "{{annotation:Somebody|indefinite}} is in front of the door." "I think {{annotation:someone|indefinite}} in basic B loves me."',
          "❓ Anybody, Anyone, Anything → konteks NEGATIVE (-) dan QUESTION (?)",
          'Ex: "{{annotation:Anybody|indefinite}} is at home?" "{{annotation:Anyone|indefinite}} can\'t answer this question."',
          '🚫 Nobody, Nothing, No one → untuk TIDAK SATUPUN (sudah negatif, jangan tambah "not")',
          'Ex: "{{annotation:Nobody|indefinite}} loves me." "{{annotation:No one|indefinite}} gives me something."',
          "🌐 Everybody, Everyone, Everything → untuk SEMUA benda/orang",
          'Ex: "{{annotation:Everybody|indefinite}} loves me." "{{annotation:Everything|indefinite}} is made by wood."',
          "Singular (use singular verb): someone, somebody, something, anyone, anybody, anything, no one, nobody, nothing, everyone, everybody, everything, each, either, neither",
          'Plural: both, few, many, several, some, all, most — "Both are correct." "Many were absent."',
          'Some vs Any: "some" in positive, "any" in negative/question — "I have some money." "Do you have any money?" "I don\'t have any money."',
        ],
      },
      {
        title: "G) Reciprocal Pronouns (Kata Ganti Timbal Balik)",
        points: [
          "Digunakan ketika dua orang atau lebih melakukan aksi yang sama satu sama lain (timbal balik).",
          "Each other → untuk 2 ORANG saja.",
          'Ex: "Romeo and Juliet love {{annotation:each other|reciprocal}}." "Cat and dog fight {{annotation:each other|reciprocal}}."',
          'Ex: "I and Ms. Putri know {{annotation:each other|reciprocal}}."',
          "One another → untuk LEBIH DARI 2 ORANG.",
          'Ex: "The students in basic B and C should respect {{annotation:one another|reciprocal}}."',
          'Ex: "I, Ms. Putri, and Mr. Dyo know {{annotation:one another|reciprocal}}."',
        ],
      },
      {
        title: "H) Others / Another / The Other / The Others (Pronoun Lainnya)",
        points: [
          "Others → JAMAK + TIDAK SPESIFIK. Merujuk ke sebagian orang/benda lain yang tidak ditentukan.",
          'Ex: "Some students are absent, others are present."',
          "The Others → JAMAK + SPESIFIK. Merujuk ke sisa kelompok tertentu yang sudah diketahui.",
          'Ex: "5 students joined the competition. Two students won the silver medal, the others got the gold medal."',
          "Another → SINGULAR + TIDAK SPESIFIK. Merujuk ke satu benda/orang lain yang tidak ditentukan.",
          'Ex: "This glass is dirty. I\'ll take another."',
          "The Other → SINGULAR + SPESIFIK. Merujuk ke satu sisa yang sudah diketahui.",
          'Ex: "I have 2 cats. One cat is white, the other is orange."',
          "Ringkasan: Others (jamak, tdk spesifik) | The Others (jamak, spesifik) | Another (singular, tdk spesifik) | The Other (singular, spesifik)",
        ],
      },
    ],
    exercises: [
      {
        id: "g3-q1",
        section: "middle",
        type: "multiple-choice",
        question: '"Sara loves ___ new school." Choose the correct pronoun:',
        options: ["she", "her", "hers", "herself"],
        correctAnswer: "her",
        reason:
          '"Her" adalah possessive adjective (sebelum noun "school"). "She" = subject, "hers" = possessive pronoun (tanpa noun), "herself" = reflexive.',
      },
      {
        id: "g3-q2",
        section: "middle",
        type: "multiple-choice",
        question: '"This book is ___." Choose the correct possessive pronoun:',
        options: ["my", "me", "mine", "I"],
        correctAnswer: "mine",
        reason:
          '"Mine" adalah possessive pronoun yang menggantikan "my book". "My" butuh noun setelahnya, "mine" berdiri sendiri.',
      },
      {
        id: "g3-q3",
        section: "middle",
        type: "multiple-choice",
        question: '"Everyone ___ ready for the test." Choose the correct verb:',
        options: ["are", "is", "were", "am"],
        correctAnswer: "is",
        reason:
          '"Everyone" adalah indefinite pronoun SINGULAR, jadi pakai verb singular "is", bukan "are".',
      },
      {
        id: "g3-q4",
        section: "middle",
        type: "multiple-choice",
        question: '"The girl ___ won the competition is my sister."',
        options: ["which", "who", "whom", "whose"],
        correctAnswer: "who",
        reason:
          '"Who" digunakan sebagai relative pronoun untuk orang sebagai subjek kalimat. "Which" untuk benda, "whose" untuk kepemilikan.',
      },
      {
        id: "g3-q5",
        section: "final",
        type: "short-answer",
        question:
          "Fill in with the correct pronoun: 1) ___ (I/Me) and Sara are best friends. 2) This bag is ___ (her/hers). 3) They enjoyed ___ (theirselves/themselves). 4) ___ (Who/Whom) did you see? 5) The dog wagged ___ (it's/its) tail.",
      },
      {
        id: "g3-q6",
        section: "final",
        type: "short-answer",
        question:
          "Replace the underlined nouns with pronouns: 1) Sara likes Sara's new dress. 2) The book is on the table. Pick up the book. 3) Ahmad and I went to Ahmad's and my school. 4) Tell the students to bring the students' books.",
      },
      {
        id: "g3-q7",
        section: "final",
        type: "task",
        question:
          "Write 12 sentences using different types of pronouns. Include at least: 2 personal (subject+object), 2 possessive, 2 reflexive, 2 demonstrative, 2 relative, and 2 indefinite pronouns. Label each pronoun type.",
      },
      {
        id: "g3-q8",
        section: "middle",
        type: "multiple-choice",
        question: '"My mother loves ___." Choose the correct pronoun:',
        options: ["I", "my", "me", "mine"],
        correctAnswer: "me",
        reason:
          '"Me" adalah object pronoun. Setelah verb "loves" butuh object pronoun, bukan subject (I) atau possessive (my/mine).',
      },
      {
        id: "g3-q9",
        section: "middle",
        type: "multiple-choice",
        question:
          '"My book is always on the table." — "My" in this sentence is a...',
        options: [
          "Subject pronoun",
          "Possessive pronoun",
          "Possessive adjective",
          "Object pronoun",
        ],
        correctAnswer: "Possessive adjective",
        reason:
          '"My" diikuti noun "book", jadi ini possessive adjective. Kalau possessive pronoun (mine) berdiri sendiri tanpa noun.',
      },
      {
        id: "g3-q10",
        section: "middle",
        type: "multiple-choice",
        question:
          '"The book on the table is ___." Choose the correct possessive pronoun:',
        options: ["my", "me", "mine", "I"],
        correctAnswer: "mine",
        reason:
          '"Mine" adalah possessive pronoun yang berdiri sendiri (tanpa diikuti noun). "My" butuh noun setelahnya.',
      },
      {
        id: "g3-q11",
        section: "middle",
        type: "multiple-choice",
        question: '"Romeo and Juliet love ___."',
        options: ["themselves", "one another", "each other", "ourself"],
        correctAnswer: "each other",
        reason:
          '"Each other" digunakan untuk 2 orang (Romeo dan Juliet). "One another" untuk lebih dari 2 orang.',
      },
      {
        id: "g3-q12",
        section: "middle",
        type: "multiple-choice",
        question: '"The students in class B and C should respect ___."',
        options: ["each other", "one another", "themselves", "theirselves"],
        correctAnswer: "one another",
        reason:
          '"One another" digunakan untuk lebih dari 2 orang (banyak siswa dari 2 kelas). "Each other" hanya untuk 2 orang.',
      },
      {
        id: "g3-q13",
        section: "middle",
        type: "multiple-choice",
        question: '"___ is in front of the door."',
        options: ["Anybody", "Nobody", "Somebody", "Everybody"],
        correctAnswer: "Somebody",
        reason:
          '"Somebody" digunakan dalam kalimat positif untuk merujuk seseorang yang tidak spesifik.',
      },
      {
        id: "g3-q14",
        section: "middle",
        type: "multiple-choice",
        question: '"This glass is dirty. I\'ll take ___."',
        options: ["the other", "the others", "another", "others"],
        correctAnswer: "another",
        reason:
          '"Another" digunakan untuk singular + tidak spesifik. Mengambil satu gelas lain yang tidak ditentukan.',
      },
      {
        id: "g3-q15",
        section: "middle",
        type: "multiple-choice",
        question: '"I have 2 cats. One cat is white, ___ is orange."',
        options: ["another", "others", "the others", "the other"],
        correctAnswer: "the other",
        reason:
          '"The other" digunakan untuk singular + spesifik. Dari 2 kucing, sisa yang satu sudah spesifik.',
      },
      {
        id: "g3-q16",
        section: "middle",
        type: "multiple-choice",
        question:
          '"5 students joined the competition. Two won silver medals, ___ got gold."',
        options: ["others", "another", "the other", "the others"],
        correctAnswer: "the others",
        reason:
          '"The others" digunakan untuk jamak + spesifik. Sisa 3 siswa dari kelompok yang sudah diketahui (5 siswa).',
      },
      {
        id: "g3-q17",
        section: "middle",
        type: "multiple-choice",
        question: '"Some students are absent, ___ are present."',
        options: ["the others", "another", "the other", "others"],
        correctAnswer: "others",
        reason:
          '"Others" digunakan untuk jamak + tidak spesifik. Sebagian siswa lain yang tidak ditentukan jumlahnya.',
      },
      {
        id: "g3-q18",
        section: "middle",
        type: "multiple-choice",
        question: '"She taught ___ how to play guitar."',
        options: ["her", "she", "hers", "herself"],
        correctAnswer: "herself",
        reason:
          '"Herself" adalah reflexive pronoun — subject dan object adalah orang yang sama (she = herself). Dia mengajari dirinya sendiri.',
      },
      {
        id: "g3-q19",
        section: "middle",
        type: "multiple-choice",
        question: '"___ are my favorite shoes." (pointing to shoes far away)',
        options: ["This", "These", "That", "Those"],
        correctAnswer: "Those",
        reason:
          '"Those" digunakan untuk benda jamak (shoes) yang jauh (far). "These" untuk jamak dekat, "That" untuk singular jauh.',
      },
      {
        id: "g3-q20",
        section: "final",
        type: "short-answer",
        question:
          "Fill in with each other or one another: 1) Ahmad and Siti love ___. 2) All students in the class should help ___. 3) The twin sisters look like ___. 4) The five friends promised to support ___.",
      },
      {
        id: "g3-q21",
        section: "final",
        type: "short-answer",
        question:
          "Fill in with others, the others, another, or the other: 1) I have 3 pens. One is blue, ___ are black. 2) Some people like tea, ___ prefer coffee. 3) This shirt is too small. Can I try ___? 4) There are 10 chairs. 6 are occupied, ___ are empty.",
      },
      {
        id: "g3-q22",
        section: "final",
        type: "task",
        question:
          "Buatlah 10 kalimat menggunakan pronoun yang berbeda-beda. Wajib mencakup: 2 kalimat reciprocal pronoun (each other & one another), 4 kalimat others/another/the other/the others (masing-masing 1), 2 kalimat indefinite pronoun, dan 2 kalimat possessive pronoun vs possessive adjective. Label setiap jenis pronoun-nya!",
      },
    ],
  },
  {
    id: "grammar-4",
    track: "grammar",
    day: 4,
    title: "Adjectives (Kata Sifat)",
    subtitle:
      "Konsep Modifier-Head, Limiting adjective (a/an/the), Demonstrative, dan Possessive adjective",
    overview:
      "Pelajari Adjective (kata sifat) hari pertama: konsep Modifier (M) dan Head (H), Limiting adjective (a/an/the), Demonstrative adjective (this/that/these/those), dan Possessive adjective & Possessive Genitive ('s / s').",
    passage: [
      "An adjective is a word that describes or modifies a noun or pronoun. Adjectives tell us what something is like — its size, color, shape, quality, quantity, or origin. They make our sentences more interesting and detailed.",
      'Adjectives usually come BEFORE the noun: "a beautiful flower", "a tall building", "a red car". They can also come AFTER a linking verb: "She is beautiful", "The building is tall", "The car is red".',
      "When we want to compare things, we use comparative and superlative forms of adjectives.",
    ],
    materialSections: [
      {
        title: "Konsep Dasar: Modifier (M) & Head (H)",
        points: [
          "Adjective = Kata Sifat. Adjective berfungsi sebagai MODIFIER (M) yang menjelaskan NOUN/HEAD (H).",
          "M (Modifier) → kata yang MENJELASKAN",
          "H (Head) → kata yang DIJELASKAN",
          '{{annotation:smart|adj/M}} {{annotation:girl|n/H}} → "smart" menjelaskan "girl"',
          "{{annotation:a cute and small|adj/M}} {{annotation:puppy|n/H}}",
          "{{annotation:my red|adj/M}} {{annotation:pen|n/H}}",
          "{{annotation:a strong and big|adj/M}} {{annotation:truck|n/H}}",
          'Posisi Adjective: SEBELUM noun ("a beautiful flower") atau SETELAH linking verb ("She is beautiful").',
        ],
      },
      {
        title: "1) Limiting Adjective (Articles: a / an / the)",
        points: [
          "a → Singular Countable, bunyi KONSONAN (sebelahnya). Ex: a university, a teacher, a book",
          "an → Singular Countable, bunyi VOKAL (sebelahnya). Ex: an hour, an actor, an action, an umbrella",
          "the → Singular / Plural, Countable & Uncountable. Ex: the cars, the student, the moon",
          '⚠️ Yang menentukan a/an bukan huruf pertama, tapi BUNYI pertama! "university" bunyi /juː/ = konsonan → a. "hour" bunyi /aʊ/ = vokal → an.',
        ],
      },
      {
        title: "2) Demonstrative Adjective",
        points: [
          "This → Singular + Dekat (ini). That → Singular + Jauh (itu)",
          "These → Plural + Dekat (ini). Those → Plural + Jauh (itu)",
          'Sebagai ADJECTIVE (diikuti noun): "{{annotation:this|adj/M}} {{annotation:bag|n/H}} is mine"',
          'Sebagai PRONOUN (berdiri sendiri): "This is my book" — "this" = pronoun, bukan adjective',
        ],
      },
      {
        title: "3) Possessive Adjective & Possessive Genitive",
        points: [
          "a) Possessive Adjective: my, your, her, his, our, their, its",
          "{{annotation:my|adj/M}} {{annotation:book|n/H}}, {{annotation:your|adj/M}} {{annotation:pen|n/H}}, {{annotation:her|adj/M}} {{annotation:hands|n/H}}",
          "",
          "b) Possessive Genitive — berasal dari benda, pola: N + N atau N of N",
          "Benda MATI: {{annotation:car|n/M}} {{annotation:door|n/H}} = door of car, {{annotation:train|n/M}} {{annotation:station|n/H}} = station of train",
          "",
          "🔸 Benda HIDUP — Noun berakhiran S (jamak): tambah apostrof ( ' ) saja",
          "{{annotation:Teachers'|adj/M}} {{annotation:Room|n/H}}, {{annotation:Students'|adj/M}} basic B {{annotation:class|n/H}}",
          "Suis' money, Haris' company",
          "",
          "🔸 Benda HIDUP — Noun TIDAK berakhiran S: tambah ( 's )",
          "{{annotation:Lisa's|adj/M}} {{annotation:house|n/H}}, {{annotation:Ms. Jein's|adj/M}} {{annotation:hair|n/H}}",
        ],
      },
    ],
    exercises: [
      {
        id: "g4-q1",
        section: "middle",
        type: "multiple-choice",
        question:
          '"___ apple a day keeps the doctor away." Pilih article yang tepat:',
        options: ["A", "An", "The", "—"],
        correctAnswer: "An",
        reason:
          '"Apple" dimulai dengan bunyi vokal /æ/ → pakai "an". Bukan huruf pertama yang menentukan, tapi BUNYI pertama.',
      },
      {
        id: "g4-q2",
        section: "middle",
        type: "multiple-choice",
        question:
          '"___ university near my house is very old." Pilih article yang tepat:',
        options: ["An", "A", "The", "—"],
        correctAnswer: "The",
        reason:
          '"The" digunakan untuk benda yang sudah spesifik/diketahui ("the university near my house"). Meskipun "university" dimulai huruf vokal, bunyinya /juː/ = konsonan → a university. Tapi di sini sudah spesifik jadi pakai "the".',
      },
      {
        id: "g4-q3",
        section: "middle",
        type: "multiple-choice",
        question:
          '"___ book on the table is mine." (buku yang spesifik — sudah diketahui)',
        options: ["A", "An", "The", "—"],
        correctAnswer: "The",
        reason:
          '"The" digunakan ketika benda sudah spesifik atau diketahui sebelumnya. "The book on the table" merujuk ke buku tertentu.',
      },
      {
        id: "g4-q4",
        section: "middle",
        type: "multiple-choice",
        question:
          '"___ book is yours and ___ is mine." (menunjuk benda dekat dan jauh)',
        options: [
          "This / that",
          "These / those",
          "That / this",
          "Those / these",
        ],
        correctAnswer: "This / that",
        reason:
          '"This" = singular + dekat. "That" = singular + jauh. Karena "book" adalah singular, pakai this/that.',
      },
      {
        id: "g4-q5",
        section: "middle",
        type: "multiple-choice",
        question: '"___ are my favorite shoes." (plural + dekat)',
        options: ["This", "That", "These", "Those"],
        correctAnswer: "These",
        reason:
          '"These" = plural + dekat. "Shoes" adalah plural dan dekat. "Those" = plural + jauh.',
      },
      {
        id: "g4-q6",
        section: "middle",
        type: "multiple-choice",
        question:
          'Pilih Possessive Adjective yang tepat: "She left ___ phone at home."',
        options: ["his", "her", "their", "its"],
        correctAnswer: "her",
        reason:
          '"She" → possessive adjective = "her". His = he/him, Their = they/them, Its = it.',
      },
      {
        id: "g4-q7",
        section: "middle",
        type: "multiple-choice",
        question:
          '"The ___ room is on the third floor." (ruang guru — possessive genitive)',
        options: ["teacher's", "teachers'", "teacher of the", "of teacher"],
        correctAnswer: "teacher's",
        reason:
          "\"Teacher\" tidak berakhiran S (singular) → tambah 's. Teacher's room = ruang guru. Teachers' room = ruang para guru (plural).",
      },
      {
        id: "g4-q8",
        section: "middle",
        type: "multiple-choice",
        question:
          'Mana yang merupakan MODIFIER dalam frasa "a beautiful flower"?',
        options: ["flower", "a beautiful", "beautiful", "a"],
        correctAnswer: "beautiful",
        reason:
          '"Beautiful" adalah Modifier (M) — kata yang menjelaskan. "Flower" adalah Head (H) — kata yang dijelaskan. "A" adalah article/determiner.',
      },
      {
        id: "g4-q9",
        section: "final",
        type: "short-answer",
        question:
          "Isi article (a/an/the/—) yang tepat:\n1. She is ___ engineer.\n2. I saw ___ movie last night. ___ movie was amazing.\n3. He plays ___ guitar every day.\n4. ___ sun rises in the east.\n5. She has ___ umbrella.\n6. I need ___ hour to finish this.",
        correctAnswer: "1. an  2. a / The  3. the  4. The  5. an  6. an",
        reason:
          "1. bunyi /e/ = vokal → an  2. pertama kali disebut = a, sudah diketahui = the  3. instrumen musik = the  4. satu-satunya = the  5. bunyi /ʌ/ = vokal → an  6. bunyi /aʊ/ = vokal → an",
      },
      {
        id: "g4-q10",
        section: "final",
        type: "short-answer",
        question:
          "Ubah ke Possessive Genitive yang benar:\n1. the bag of Lisa\n2. the room of the teachers (plural)\n3. the company of Haris\n4. the door of the car (benda mati)\n5. the books of the students (plural)\n6. the hair of Ms. Jein",
        correctAnswer:
          "1. Lisa's bag  2. the teachers' room  3. Haris' company  4. the car door (N+N)  5. the students' books  6. Ms. Jein's hair",
      },
      {
        id: "g4-q11",
        section: "final",
        type: "task",
        question:
          "Tulis 8 kalimat menggunakan:\n• 2 kalimat dengan article (a/an/the)\n• 2 kalimat dengan Demonstrative adjective (this/that/these/those)\n• 2 kalimat dengan Possessive adjective (my/your/his/her/our/their)\n• 2 kalimat dengan Possessive Genitive ('s / s')\nBeri label M (Modifier) dan H (Head) pada setiap adjective yang digunakan.",
      },
    ],
  },
  {
    id: "grammar-4b",
    track: "grammar",
    day: 5,
    title: "Adjectives — Lanjutan (Hari 2)",
    subtitle:
      "Indefinite Quantity, Numeral, Descriptive Adjective, Urutan OSASCOMP, Comparative & Superlative, dan Suffix pembentuk adjective",
    overview:
      "Lanjutan materi Adjective hari ke-2: 4) Indefinite Quantity (a number of vs the number of), 5) Numeral (cardinal & ordinal), 6) Descriptive Adjective (karakter, usia, ukuran, warna, dst), B) Urutan OSASCOMP, C) Comparative (lebih dari), Superlative (paling), Irregular forms, D) Suffix pembentuk adjective (-ful/-less/-ous/-ive/-able/-al/-ic/-y/-ish/-ly), E) Common mistakes.",
    passage: [
      "Today is Adjective Day 2. We continue from where we left off — moving from basic adjective types to more advanced topics: how to quantify nouns, describe them precisely, compare them, and build new adjectives using suffixes.",
      "Pay special attention to the difference between 'a number of' and 'the number of' — this is a common exam question! Also study the OSASCOMP word order carefully when using multiple adjectives before a noun.",
      "By the end of today, you will be able to form adjectives from nouns and verbs using suffixes, and correctly compare things using comparative and superlative forms.",
    ],
    materialSections: [
      {
        title: "4) Indefinite Quantity (Jumlah Tidak Pasti)",
        points: [
          "Jika tidak bisa dihitung jumlah pastinya:",
          "Countable | Uncountable",
          "some | some",
          "any | any",
          "several | —",
          "a few / few | a little / little",
          "many | much",
          "a lot of | a lot of",
          "a number of | an amount of",
          "the number of | a great amount of",
          "",
          "⭐ PENTING (KELUAR MID TEST):",
          "🔴 a number of + N Plural + V JAMAK (Plural) → lebih ke JUMLAH / angka",
          'Ex: "A number of students basic B VISIT the museum." (visit = plural verb)',
          "",
          "🔴 the number of + N Plural + V SINGULAR → lebih ke PERSENTASE",
          'Ex: "The number of students in TN IS increasing." (is = singular verb)',
        ],
      },
      {
        title: "5) Numeral (Angka)",
        points: [
          "Cardinal → zero, one, two, three... (bilangan biasa)",
          "Ordinal → first, second, third... (bilangan urutan)",
          "Ex: {{annotation:Three|adj/M}} {{annotation:tables|n/H}}, {{annotation:Four|adj/M}} {{annotation:windows|n/H}}",
          "Ex: {{annotation:First|adj/M}} {{annotation:child|n/H}}, {{annotation:Seventh|adj/M}} {{annotation:president|n/H}}",
        ],
      },
      {
        title: "6) Descriptive Adjective",
        points: [
          "a) Character: friendly, arrogant, kind, brave, honest, shy, polite",
          "b) Age: old, young, new, ancient, modern, elderly",
          "c) Size: big, small, medium, large, tiny, huge, enormous",
          "d) Temperature: cold, warm, hot, cool, freezing, boiling",
          "e) Participle: excited (merasa), exciting (membuat merasa). bored (merasa), boring (membuat merasa)",
          "f) Shape: square, circle, round, flat, thin, thick, wide, narrow",
          "g) Color: red, yellow, blue, green, black, white, dark, light",
          "h) Nationality: USA, Indonesian, Japanese, American, European",
          "",
          "Contoh terjemahan:",
          '"Anak anjing yang kecil dan lucu" → "{{annotation:a cute and small|adj/M}} {{annotation:puppy|n/H}}"',
          '"Sebuah truck yang kuat dan besar" → "{{annotation:a strong and big|adj/M}} {{annotation:truck|n/H}}"',
          '"Bolpen merahku" → "{{annotation:my red|adj/M}} {{annotation:pen|n/H}}"',
          '"Adik keduaku adalah seorang yang manis dan imut" → "My second sister is a sweet and cute {{annotation:person|n/H}}"',
        ],
      },
      {
        title: "B) Urutan Adjective — OSASCOMP",
        points: [
          "Jika menggunakan lebih dari 1 adjective, ikuti urutan OSASCOMP:",
          "",
          "1. Opinion: beautiful, ugly, lovely, nice, terrible, amazing, wonderful",
          "2. Size: big, small, tall, short, large, tiny, huge, enormous",
          "3. Age: old, young, new, ancient, modern, recent",
          "4. Shape: round, square, flat, thin, thick, wide, narrow, long",
          "5. Color: red, blue, green, yellow, black, white, dark, light",
          "6. Origin: Indonesian, Japanese, American, European, Asian, Italian",
          "7. Material: wooden, metal, plastic, cotton, leather, glass, silk",
          "8. Purpose: sleeping (bag), cooking (oil), swimming (pool), running (shoes)",
          "",
          'Example: "A beautiful small old round red Japanese wooden cooking bowl"',
          'Practical: "A nice big new black Italian leather jacket"',
          'Practical: "A small old round wooden table" (size → age → shape → material)',
        ],
      },
      {
        title: "C) Comparative — Membandingkan 2 Benda",
        points: [
          'Comparative: membandingkan DUA benda, selalu pakai "THAN"',
          "",
          "Adjective pendek (1 suku kata): tambah -er",
          "  tall → taller, fast → faster, old → older, cheap → cheaper, young → younger",
          "",
          "Berakhiran -e: tambah -r",
          "  large → larger, nice → nicer, wide → wider, close → closer",
          "",
          "Pola KVK (konsonan-vokal-konsonan): double konsonan + -er",
          "  big → bigger, hot → hotter, thin → thinner, fat → fatter, sad → sadder",
          "",
          "Berakhiran -y: ganti y → ier",
          "  happy → happier, easy → easier, heavy → heavier, pretty → prettier, busy → busier",
          "",
          'Adjective panjang (2+ suku kata): pakai "more"',
          "  beautiful → more beautiful, expensive → more expensive, interesting → more interesting, important → more important",
          "",
          'Example: "She is taller THAN me." "This book is more interesting THAN that one."',
          'Wrong: "She is more taller." → Correct: "She is taller." (jangan pakai more + -er bersamaan!)',
        ],
      },
      {
        title: "C) Superlative — Paling (3+ Benda)",
        points: [
          'Superlative: membandingkan TIGA atau lebih, selalu pakai "THE"',
          "",
          "Adjective pendek: tambah -est",
          "  tall → the tallest, fast → the fastest, old → the oldest, cheap → the cheapest",
          "",
          "Berakhiran -e: tambah -st",
          "  large → the largest, nice → the nicest, wide → the widest",
          "",
          "Pola KVK: double konsonan + -est",
          "  big → the biggest, hot → the hottest, thin → the thinnest",
          "",
          "Berakhiran -y: ganti y → iest",
          "  happy → the happiest, easy → the easiest, busy → the busiest",
          "",
          'Adjective panjang: pakai "the most"',
          "  beautiful → the most beautiful, expensive → the most expensive, interesting → the most interesting",
          "",
          'Example: "She is THE tallest in the class." "This is THE most beautiful place I have ever seen."',
          'Wrong: "He is the most fastest." → Correct: "He is the fastest." (jangan pakai most + -est bersamaan!)',
        ],
      },
      {
        title: "C) Irregular Comparative & Superlative",
        points: [
          "Beberapa adjective TIDAK mengikuti pola -er/-est atau more/most. Harus dihafal!",
          "",
          "good → better → the best",
          'Example: "She is a good singer." → "She is better than him." → "She is the best singer."',
          "",
          "bad → worse → the worst",
          'Example: "This is bad." → "This is worse than yesterday." → "This is the worst day ever."',
          "",
          "far → farther/further → the farthest/furthest",
          "",
          "little → less → the least",
          'Example: "I have little money." → "I have less money than you." → "She has the least money."',
          "",
          "much/many → more → the most",
          'Example: "She has many books." → "She has more books than me." → "She has the most books."',
          "",
          "old → older/elder → the oldest/eldest",
          '"Elder/eldest" hanya untuk anggota KELUARGA: "my elder sister", "the eldest son"',
        ],
      },
      {
        title: "D) Suffix Pembentuk Adjective",
        points: [
          "Suffix: akhiran yang ditambahkan ke kata dasar (noun/verb) untuk membentuk adjective",
          "",
          "-ful (penuh dengan / memiliki):",
          "  beauty → beautiful, care → careful, hope → hopeful, success → successful, wonder → wonderful, help → helpful, power → powerful, peace → peaceful, thank → thankful, cheer → cheerful",
          "",
          "-less (tanpa / tidak memiliki) — kebalikan dari -ful:",
          "  care → careless, hope → hopeless, help → helpless, home → homeless, use → useless, end → endless, pain → painless, fear → fearless, taste → tasteless, worth → worthless",
          "",
          "-ous (memiliki sifat / bersifat):",
          "  danger → dangerous, fame → famous, humor → humorous, nerve → nervous, mystery → mysterious, adventure → adventurous, courage → courageous, religion → religious, ambition → ambitious, curiosity → curious",
          "",
          "-ive (cenderung / bersifat):",
          "  act → active, creat(e) → creative, attract → attractive, effect → effective, expense → expensive, impress → impressive, product → productive, support → supportive, protect → protective, destruct → destructive",
          "",
          "-able / -ible (bisa / dapat di-):",
          "  comfort → comfortable, enjoy → enjoyable, reason → reasonable, accept → acceptable, wash → washable, read → readable",
          "  access → accessible, flex → flexible, respond → responsible, vis(ion) → visible, horror → horrible, terror → terrible",
          "",
          "-al (berhubungan dengan):",
          "  nation → national, person → personal, tradition → traditional, education → educational, emotion → emotional, nature → natural, music → musical, profession → professional, origin → original, accident → accidental",
          "",
          "-ic (bersifat / berkaitan dengan):",
          "  artist → artistic, hero → heroic, science → scientific, history → historic, energy → energetic, drama → dramatic, optimist → optimistic, realist → realistic, system → systematic, athlete → athletic",
          "",
          "-y (memiliki sifat / seperti):",
          "  rain → rainy, sun → sunny, cloud → cloudy, wind → windy, snow → snowy, dirt → dirty, health → healthy, wealth → wealthy, noise → noisy, sleep → sleepy, thirst → thirsty, hunger → hungry",
          "",
          "-ish (agak / mirip):",
          "  child → childish, fool → foolish, self → selfish, red → reddish, blue → bluish, green → greenish, yellow → yellowish, old → oldish, young → youngish",
          "",
          "-ly (noun + ly) → ⚠️ HATI-HATI ini ADJECTIVE bukan adverb!:",
          "  friend → friendly, love → lovely, lone → lonely, like → likely, cost → costly, time → timely, live → lively, dead → deadly, order → orderly, day → daily",
          '  Bukti: "She is friendly." (adjective setelah linking verb). BUKAN "She speaks friendly." → harus "She speaks in a friendly way."',
          "  Adj + -ly = ADVERB (berbeda!): quick → quickly, slow → slowly, happy → happily. Ini adverb, bukan adjective!",
        ],
      },
      {
        title: "E) Common Adjective Mistakes",
        points: [
          'Wrong: "She is more taller." → Correct: "She is taller." (jangan pakai more + -er bersamaan)',
          'Wrong: "He is the most fastest." → Correct: "He is the fastest." (jangan pakai most + -est bersamaan)',
          'Wrong: "This is more better." → Correct: "This is better." (better sudah comparative)',
          'Wrong: "The food is deliciously." → Correct: "The food is delicious." (setelah linking verb pakai adjective)',
          'Wrong: "I feel happily." → Correct: "I feel happy." (setelah "feel" pakai adjective)',
          'Wrong: "She is more beautiful than more smart." → Correct: "She is more beautiful than smart."',
        ],
      },
    ],
    exercises: [
      {
        id: "g4b-q1",
        section: "middle",
        type: "multiple-choice",
        question: 'Which is the correct order? "She has a ___ bag."',
        options: [
          "leather Italian big black",
          "big black Italian leather",
          "Italian big black leather",
          "black big leather Italian",
        ],
        correctAnswer: "big black Italian leather",
        reason:
          "Urutan OSASCOMP: Size (big) → Color (black) → Origin (Italian) → Material (leather).",
      },
      {
        id: "g4b-q2",
        section: "middle",
        type: "multiple-choice",
        question: '"Mount Everest is ___ mountain in the world."',
        options: ["the higher", "the highest", "the most high", "higher than"],
        correctAnswer: "the highest",
        reason:
          'Superlative 1 suku kata: the + adj-est. "High" → "the highest". Bukan "the most high".',
      },
      {
        id: "g4b-q3",
        section: "middle",
        type: "multiple-choice",
        question: 'Which is the comparative form of "good"?',
        options: ["gooder", "more good", "better", "best"],
        correctAnswer: "better",
        reason:
          '"Good" irregular: good → better → best. Bukan "gooder" atau "more good".',
      },
      {
        id: "g4b-q4",
        section: "middle",
        type: "multiple-choice",
        question: '"The soup tastes ___." Choose the correct answer:',
        options: [
          "deliciously",
          "delicious",
          "more deliciously",
          "deliciousness",
        ],
        correctAnswer: "delicious",
        reason:
          'Setelah linking verb "tastes", pakai adjective (delicious), bukan adverb (deliciously).',
      },
      {
        id: "g4b-q5",
        section: "middle",
        type: "multiple-choice",
        question: 'Which suffix means "without" or "tanpa"?',
        options: ["-ful", "-less", "-ous", "-ive"],
        correctAnswer: "-less",
        reason:
          '"-less" = tanpa. hopeless (tanpa harapan), careless (tidak hati-hati), homeless (tidak punya rumah). Kebalikan "-ful".',
      },
      {
        id: "g4b-q6",
        section: "middle",
        type: "multiple-choice",
        question: '"The view from the mountain is ___." (beauty → adjective)',
        options: ["beautyful", "beautious", "beautiful", "beautyless"],
        correctAnswer: "beautiful",
        reason:
          'beauty + "-ful" = beautiful. Huruf "y" berubah jadi "i": beauti + ful = beautiful.',
      },
      {
        id: "g4b-q7",
        section: "middle",
        type: "multiple-choice",
        question: '"She is very ___." (create → adjective)',
        options: ["createful", "creatious", "creative", "createless"],
        correctAnswer: "creative",
        reason:
          'create + suffix "-ive" = creative. Suffix "-ive" = cenderung/bersifat.',
      },
      {
        id: "g4b-q8",
        section: "middle",
        type: "multiple-choice",
        question: '"She is ___ than her sister." (beautiful)',
        options: [
          "beautifuller",
          "more beautiful",
          "most beautiful",
          "the more beautiful",
        ],
        correctAnswer: "more beautiful",
        reason:
          '"Beautiful" = 4 suku kata (panjang). Adjective panjang pakai "more" untuk comparative. Selalu diikuti "than".',
      },
      {
        id: "g4b-q9",
        section: "final",
        type: "short-answer",
        question:
          "Ubah kata-kata ini menjadi adjective dengan suffix yang tepat: 1) danger → ___ 2) comfort → ___ 3) hope → ___ (tanpa harapan) 4) act → ___ 5) nation → ___ 6) rain → ___ 7) child → ___ 8) friend → ___ 9) science → ___ 10) enjoy → ___",
        sampleAnswer:
          "1) dangerous 2) comfortable 3) hopeless 4) active 5) national 6) rainy 7) childish 8) friendly 9) scientific 10) enjoyable",
      },
      {
        id: "g4b-q10",
        section: "final",
        type: "short-answer",
        question:
          "Write the comparative and superlative forms: 1) happy 2) beautiful 3) big 4) bad 5) far 6) expensive 7) thin 8) good 9) little 10) much",
      },
      {
        id: "g4b-q11",
        section: "final",
        type: "short-answer",
        question:
          "Put the adjectives in correct OSASCOMP order: 1) a (old/wooden/small) table 2) a (blue/beautiful/silk) dress 3) a (Japanese/new/amazing) car 4) a (cotton/white/large) shirt",
      },
      {
        id: "g4b-q12",
        section: "final",
        type: "task",
        question:
          'Write 10 sentences using different adjective suffixes (-ful, -less, -ous, -ive, -able, -al, -ic, -y, -ish, -ly). For each sentence, write the base word → adjective transformation. Example: "The sunset is beautiful." (beauty → beautiful, suffix -ful)',
      },
    ],
  },
  {
    id: "grammar-5",

    track: "grammar",
    day: 7,
    title: "Verbs (Kata Kerja)",
    subtitle:
      "Berdasarkan Makna (Dynamic/Stative), Berdasarkan Bentuk (V1/V2/V3/Ving), Berdasarkan Fungsi (Ordinary, Transitive, Intransitive)",
    overview:
      "Pelajari Verb (kata kerja) dalam tiga kategori: 1) Berdasarkan Makna — Dynamic verb (melakukan aktivitas) dan Stative verb (perasaan/emosi). 2) Berdasarkan Bentuk — tabel V1/V2/V3/Ving/Vs-es, Regular verb (V2=V3, +ed), Irregular verb (V1≠V2≠V3). 3) Berdasarkan Fungsi — Ordinary verb, Transitive (Monotransitive & Ditransitive dengan formula S+V+IO+DO), dan Intransitive (Complete & Incomplete/Linking verb).",
    passage: [
      "Verb atau kata kerja adalah inti dari setiap kalimat dalam bahasa Inggris. Verb dibagi menjadi tiga kategori besar berdasarkan makna, bentuk, dan fungsinya.",
      "Berdasarkan makna: Dynamic verb menunjukkan aktivitas (work, study, cry, cook), sedangkan Stative verb menunjukkan perasaan atau emosi (love, like, hate, believe, need).",
      "Berdasarkan bentuk: setiap verb memiliki lima bentuk — V1 (base form), V2 (+ed atau irregular), V3 (past participle +aux), V-ing (+be), dan Vs/es (untuk He/She/It). Regular verb mengikuti aturan +ed (V2=V3), sedangkan Irregular verb tidak beraturan (V1≠V2≠V3).",
    ],
    materialSections: [
      {
        title: "1) Berdasarkan Makna",
        points: [
          "a. Dynamic Verb — Melakukan Aktivitas",
          "   Verb yang menunjukkan aksi/kegiatan yang dilakukan subject.",
          "   ex: work, study, cry, cook",
          "",
          "b. Stative Verb — Perasaan, Emosi",
          "   Verb yang menunjukkan keadaan, perasaan, atau emosi (bukan aksi fisik).",
          "   ex: love, like, hate, believe, need",
        ],
      },
      {
        title: "2) Berdasarkan Bentuk",
        points: [
          "Tabel bentuk verb berdasarkan Subject Pronoun:",
          "",
          "  Subject / Pronoun    | V1    | V2 (+ed) | V3 (Past Participle +aux) | V-ing (+be) | Vs/es   |",
          "  I / You / We / They  | study | studied  | studied                   | studying    | —       |",
          "  He / She / It        | —     | —        | —                         | —           | studies |",
          "",
          "a. Regular Verb (Beraturan): V2 = V3",
          "   Bentuk V2 dan V3 sama. Dibentuk dengan menambah -ed:",
          "   work = worked | play = played | want = wanted",
          "",
          "b. Irregular Verb (Tidak Beraturan): V1 ≠ V2 ≠ V3",
          "   Bentuk V2 dan V3 tidak mengikuti aturan -ed. Harus dihafal!",
          "   sing → sang → sung | see → saw → seen | read → read → read",
        ],
      },
      {
        title: "3) Berdasarkan Fungsi — a. Ordinary Verb (Kata Kerja Utama)",
        points: [
          "Ordinary verb adalah kata kerja utama dalam kalimat, letaknya setelah subject.",
          "",
          "Jumlah verb tergantung jumlah conjunction (conj):",
          "   1 kalimat  →  1 verb ordinary",
          "   1 conj     →  2 verb ordinary",
          "   2 conj     →  3 verb ordinary, dst.",
          "",
          "ex: I and Ms. Lisa {{annotation:study|V1}} together.",
          "    (1 kalimat → 1 verb ordinary)",
          "",
          "ex: I always {{annotation:watch|V}} and {{annotation:listen|V}} movie.",
          '    (1 conj "and" → 2 verb ordinary)',
        ],
      },
      {
        title: "3) Berdasarkan Fungsi — A. Transitive Verb (Butuh Objek)",
        points: [
          "Transitive verb MEMBUTUHKAN objek. Tidak lengkap tanpa objek.",
          "",
          "1) Monotransitive (1 objek / Direct Object):",
          "   I {{annotation:eat|V}} {{annotation:pecel|O}} at Mbk Lala.",
          "   I {{annotation:buy|V}} {{annotation:a car|O}}.",
          "",
          "2) Ditransitive (2 objek):",
          "   ├ Direct Object (DO)   → langsung dari verb",
          "   └ Indirect Object (IO) → tidak langsung dari verb",
          "",
          "   Form 1: S + V + IO + DO",
          "   She {{annotation:buys|V}} {{annotation:her friend|IO}} {{annotation:a present|DO}}.",
          "",
          "   Form 2: S + V + DO + to/for + IO",
          "   He {{annotation:cooks|V}} {{annotation:noodle|DO}} to {{annotation:his family|IO}}.",
        ],
      },
      {
        title:
          "3) Berdasarkan Fungsi — B. Intransitive Verb (Tidak Butuh Objek)",
        points: [
          "Intransitive verb TIDAK membutuhkan objek.",
          "",
          "1) Complete → Tidak perlu CS (penjelas Subjek), kalimat sudah lengkap:",
          "   I {{annotation:sleep|V}}. I {{annotation:run|V}}. He {{annotation:falls|V}}. She {{annotation:cries|V}}.",
          "",
          "2) Incomplete → Perlu CS (Subject Complement), menggunakan Linking Verb:",
          "   Mr. Panji {{annotation:becomes|V}} {{annotation:a batman|CS}}.",
          "   This food {{annotation:smells|V}} {{annotation:so good|CS}}.",
        ],
      },
    ],
    exercises: [
      {
        id: "g5-q1",
        section: "middle",
        type: "multiple-choice",
        question: '"She ___ very tired today." Which type of verb is needed?',
        options: [
          "Action verb (runs)",
          "Linking verb (looks)",
          "Helping verb (does)",
          "Modal verb (can)",
        ],
        correctAnswer: "Linking verb (looks)",
        reason:
          'Kalimat ini menghubungkan subjek "She" dengan deskripsi "tired". Linking verb menghubungkan subjek dengan keterangan, bukan menunjukkan aksi.',
      },
      {
        id: "g5-q2",
        section: "middle",
        type: "multiple-choice",
        question: 'What is the V2 (past) form of "write"?',
        options: ["writed", "wrote", "written", "writing"],
        correctAnswer: "wrote",
        reason:
          '"Write" adalah irregular verb: write → wrote → written. V2 = wrote.',
      },
      {
        id: "g5-q3",
        section: "middle",
        type: "multiple-choice",
        question:
          '"You ___ finish your homework before playing." Choose the correct modal:',
        options: ["can", "would", "must", "may"],
        correctAnswer: "must",
        reason:
          '"Must" menunjukkan kewajiban/keharusan. "You must finish" = kamu harus menyelesaikan.',
      },
      {
        id: "g5-q4",
        section: "middle",
        type: "multiple-choice",
        question: '"She can ___ English fluently."',
        options: ["speaks", "spoke", "speak", "speaking"],
        correctAnswer: "speak",
        reason:
          'Setelah modal verb (can/will/must/dll) selalu pakai V1 tanpa -s dan tanpa to. "She can speak" bukan "She can speaks".',
      },
      {
        id: "g5-q5",
        section: "middle",
        type: "multiple-choice",
        question: '"He ___ to school every day." (go)',
        options: ["go", "goes", "going", "gone"],
        correctAnswer: "goes",
        reason:
          'Subject "He" (orang ketiga tunggal) dalam Simple Present: V1 + es. go → goes karena berakhiran -o.',
      },
      {
        id: "g5-q6",
        section: "middle",
        type: "multiple-choice",
        question: 'Which verb pattern is "buy → bought → bought"?',
        options: [
          "V1 ≠ V2 ≠ V3",
          "V2 = V3 (sama)",
          "V1 = V2 = V3 (semuanya sama)",
          "Regular verb",
        ],
        correctAnswer: "V2 = V3 (sama)",
        reason:
          "buy → bought → bought. V2 dan V3 sama (bought). Ini pola irregular V2=V3, seperti think→thought→thought.",
      },
      {
        id: "g5-q7",
        section: "final",
        type: "short-answer",
        question:
          "Write the V1, V2, and V3 forms: 1) go 2) buy 3) swim 4) think 5) speak 6) break 7) study 8) run 9) make 10) take 11) read 12) put",
      },
      {
        id: "g5-q8",
        section: "final",
        type: "short-answer",
        question:
          "Identify the verb type (Action, Linking, Helping, or Modal): 1) She runs every morning. 2) He is a student. 3) They can speak English. 4) I have finished my work. 5) The soup tastes delicious. 6) You must study harder.",
      },
      {
        id: "g5-q9",
        section: "final",
        type: "short-answer",
        question:
          "Add -s/-es/-ies correctly for He/She/It: 1) play → ___ 2) go → ___ 3) study → ___ 4) watch → ___ 5) fly → ___ 6) enjoy → ___ 7) fix → ___ 8) wash → ___",
      },
      {
        id: "g5-q10",
        section: "final",
        type: "short-answer",
        question:
          "Write the V-ing form: 1) run → ___ 2) write → ___ 3) swim → ___ 4) die → ___ 5) play → ___ 6) sit → ___ 7) dance → ___ 8) lie → ___",
      },
      {
        id: "g5-q11",
        section: "final",
        type: "task",
        question:
          "Write 12 sentences about your daily activities. Use at least: 3 action verbs, 2 linking verbs, 2 helping verbs, and 2 modal verbs. Label each verb type and write the V1/V2/V3 form of each verb used.",
      },
      {
        id: "g5-vf01",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nShe ___ (go) to school every day.",
        correctAnswer: "goes",
        reason:
          'Subject "She" = orang ketiga tunggal. Simple Present: go + es = goes.',
      },
      {
        id: "g5-vf02",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nHe ___ (study) English every morning.",
        correctAnswer: "studies",
        reason: 'Subject "He" = orang ketiga tunggal. study → y+ies = studies.',
      },
      {
        id: "g5-vf03",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nThe teacher ___ (teach) us grammar.",
        correctAnswer: "teaches",
        reason:
          'Subject "The teacher" = orang ketiga tunggal. teach → teach+es = teaches.',
      },
      {
        id: "g5-vf04",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nMy father ___ (work) in an office.",
        correctAnswer: "works",
        reason: 'Subject "My father" = orang ketiga tunggal. work + s = works.',
      },
      {
        id: "g5-vf05",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nShe ___ (wash) the dishes after dinner.",
        correctAnswer: "washes",
        reason:
          'Subject "She" = orang ketiga tunggal. wash → wash+es = washes.',
      },
      {
        id: "g5-vf06",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nHe ___ (try) his best every day.",
        correctAnswer: "tries",
        reason: 'Subject "He" = orang ketiga tunggal. try → y+ies = tries.',
      },
      {
        id: "g5-vf07",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nThe bird ___ (fly) high in the sky.",
        correctAnswer: "flies",
        reason:
          'Subject "The bird" = orang ketiga tunggal. fly → y+ies = flies.',
      },
      {
        id: "g5-vf08",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nMy mother ___ (cook) delicious food.",
        correctAnswer: "cooks",
        reason: 'Subject "My mother" = orang ketiga tunggal. cook + s = cooks.',
      },
      {
        id: "g5-vf09",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nThe dog ___ (run) very fast.",
        correctAnswer: "runs",
        reason: 'Subject "The dog" = orang ketiga tunggal. run + s = runs.',
      },
      {
        id: "g5-vf10",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nShe ___ (enjoy) reading books.",
        correctAnswer: "enjoys",
        reason:
          'Subject "She" = orang ketiga tunggal. enjoy + s = enjoys (vokal+y, tambah -s saja).',
      },
      {
        id: "g5-vf11",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nWe ___ (visit) the museum last week.",
        correctAnswer: "visited",
        reason: "Simple Past. visit adalah regular verb: visit + ed = visited.",
      },
      {
        id: "g5-vf12",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nShe ___ (write) a letter yesterday.",
        correctAnswer: "wrote",
        reason:
          "Simple Past. write adalah irregular verb: write → wrote → written.",
      },
      {
        id: "g5-vf13",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nHe ___ (come) to the party last night.",
        correctAnswer: "came",
        reason: "Simple Past. come adalah irregular verb: come → came → come.",
      },
      {
        id: "g5-vf14",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nThey ___ (buy) a new car last year.",
        correctAnswer: "bought",
        reason:
          "Simple Past. buy adalah irregular verb: buy → bought → bought.",
      },
      {
        id: "g5-vf15",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nI ___ (see) that movie last weekend.",
        correctAnswer: "saw",
        reason: "Simple Past. see adalah irregular verb: see → saw → seen.",
      },
      {
        id: "g5-vf16",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nShe ___ (study) all night for the exam.",
        correctAnswer: "studied",
        reason:
          "Simple Past. study adalah regular verb: study → y+ied = studied.",
      },
      {
        id: "g5-vf17",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nHe ___ (run) 5 km this morning.",
        correctAnswer: "ran",
        reason: "Simple Past. run adalah irregular verb: run → ran → run.",
      },
      {
        id: "g5-vf18",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nThey ___ (eat) at a restaurant yesterday.",
        correctAnswer: "ate",
        reason: "Simple Past. eat adalah irregular verb: eat → ate → eaten.",
      },
      {
        id: "g5-vf19",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nShe ___ (drink) coffee this morning.",
        correctAnswer: "drank",
        reason:
          "Simple Past. drink adalah irregular verb: drink → drank → drunk.",
      },
      {
        id: "g5-vf20",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nHe ___ (give) me a gift on my birthday.",
        correctAnswer: "gave",
        reason: "Simple Past. give adalah irregular verb: give → gave → given.",
      },
      {
        id: "g5-vf21",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nShe is ___ (read) a book right now.",
        correctAnswer: "reading",
        reason: "Present Continuous: is/am/are + V-ing. read → reading.",
      },
      {
        id: "g5-vf22",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nThey are ___ (swim) in the pool.",
        correctAnswer: "swimming",
        reason:
          "Present Continuous: are + V-ing. swim → swimming (CVC: double m).",
      },
      {
        id: "g5-vf23",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nHe is ___ (write) a report.",
        correctAnswer: "writing",
        reason:
          "Present Continuous: is + V-ing. write → drop e, tambah ing = writing.",
      },
      {
        id: "g5-vf24",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nI am ___ (study) for my exam.",
        correctAnswer: "studying",
        reason:
          "Present Continuous: am + V-ing. study → studying (vokal+y, langsung +ing).",
      },
      {
        id: "g5-vf25",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nThe children are ___ (run) in the park.",
        correctAnswer: "running",
        reason:
          "Present Continuous: are + V-ing. run → running (CVC pendek: double n).",
      },
      {
        id: "g5-vf26",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nShe was ___ (cook) dinner when I arrived.",
        correctAnswer: "cooking",
        reason: "Past Continuous: was + V-ing. cook → cooking.",
      },
      {
        id: "g5-vf27",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nHe is ___ (sit) on the chair.",
        correctAnswer: "sitting",
        reason:
          "Present Continuous: is + V-ing. sit → sitting (CVC pendek: double t).",
      },
      {
        id: "g5-vf28",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nThey are ___ (dance) at the party.",
        correctAnswer: "dancing",
        reason:
          "Present Continuous: are + V-ing. dance → drop e, tambah ing = dancing.",
      },
      {
        id: "g5-vf29",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nShe was ___ (drive) to work this morning.",
        correctAnswer: "driving",
        reason:
          "Past Continuous: was + V-ing. drive → drop e, tambah ing = driving.",
      },
      {
        id: "g5-vf30",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nI am ___ (make) a cake right now.",
        correctAnswer: "making",
        reason:
          "Present Continuous: am + V-ing. make → drop e, tambah ing = making.",
      },
      {
        id: "g5-vf31",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nI have ___ (eat) breakfast already.",
        correctAnswer: "eaten",
        reason: "Present Perfect: have + V3. eat → ate → eaten. V3 = eaten.",
      },
      {
        id: "g5-vf32",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nShe has ___ (go) to Japan before.",
        correctAnswer: "gone",
        reason: "Present Perfect: has + V3. go → went → gone. V3 = gone.",
      },
      {
        id: "g5-vf33",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nThey have ___ (finish) their homework.",
        correctAnswer: "finished",
        reason:
          "Present Perfect: have + V3. finish adalah regular verb: finish + ed = finished.",
      },
      {
        id: "g5-vf34",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nHe has ___ (buy) a new phone.",
        correctAnswer: "bought",
        reason:
          "Present Perfect: has + V3. buy → bought → bought. V3 = bought.",
      },
      {
        id: "g5-vf35",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nWe have ___ (see) this film before.",
        correctAnswer: "seen",
        reason: "Present Perfect: have + V3. see → saw → seen. V3 = seen.",
      },
      {
        id: "g5-vf36",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nThe book was ___ (write) by Tolkien.",
        correctAnswer: "written",
        reason:
          "Passive Voice: was + V3. write → wrote → written. V3 = written.",
      },
      {
        id: "g5-vf37",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nThe cake was ___ (eat) by the children.",
        correctAnswer: "eaten",
        reason: "Passive Voice: was + V3. eat → ate → eaten. V3 = eaten.",
      },
      {
        id: "g5-vf38",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nEnglish is ___ (speak) in many countries.",
        correctAnswer: "spoken",
        reason: "Passive Voice: is + V3. speak → spoke → spoken. V3 = spoken.",
      },
      {
        id: "g5-vf39",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nThe window was ___ (break) by the ball.",
        correctAnswer: "broken",
        reason: "Passive Voice: was + V3. break → broke → broken. V3 = broken.",
      },
      {
        id: "g5-vf40",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nThe letter has been ___ (send).",
        correctAnswer: "sent",
        reason:
          "Present Perfect Passive: has been + V3. send → sent → sent. V3 = sent.",
      },
      {
        id: "g5-vf41",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nShe can ___ (swim) very fast.",
        correctAnswer: "swim",
        reason:
          "Setelah modal (can) selalu pakai V1 tanpa -s dan tanpa to. swim (V1).",
      },
      {
        id: "g5-vf42",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nYou should ___ (study) harder.",
        correctAnswer: "study",
        reason: "Setelah modal (should) selalu pakai V1. study (V1).",
      },
      {
        id: "g5-vf43",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nHe must ___ (finish) his work today.",
        correctAnswer: "finish",
        reason: "Setelah modal (must) selalu pakai V1. finish (V1).",
      },
      {
        id: "g5-vf44",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nThey might ___ (come) tomorrow.",
        correctAnswer: "come",
        reason: "Setelah modal (might) selalu pakai V1. come (V1).",
      },
      {
        id: "g5-vf45",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nI would ___ (like) some water, please.",
        correctAnswer: "like",
        reason: "Setelah modal (would) selalu pakai V1. like (V1).",
      },
      {
        id: "g5-vf46",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nShe will ___ (help) you tomorrow.",
        correctAnswer: "help",
        reason: "Setelah modal (will) selalu pakai V1. help (V1).",
      },
      {
        id: "g5-vf47",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nHe ___ (take) a shower before he left.",
        correctAnswer: "took",
        reason:
          "Simple Past. take adalah irregular verb: take → took → taken. V2 = took.",
      },
      {
        id: "g5-vf48",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nThey ___ (know) each other for years.",
        correctAnswer: "have known",
        reason:
          'Present Perfect dengan "for years": have + V3. know → knew → known. = have known.',
      },
      {
        id: "g5-vf49",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nShe had already ___ (leave) when I called.",
        correctAnswer: "left",
        reason:
          "Past Perfect: had + V3. leave adalah irregular verb: leave → left → left. V3 = left.",
      },
      {
        id: "g5-vf50",
        type: "short-answer",
        question:
          "Fill in the correct form of the verb.\nThe students are ___ (stop) talking now.",
        correctAnswer: "stopping",
        reason:
          "Present Continuous: are + V-ing. stop → stopping (CVC pendek: double p).",
      },
      {
        id: "g5-irr",
        section: "final",
        type: "short-answer",
        question:
          "Irregular Verb Table — tulis V2 dan V3 yang benar:\n1. be → ___ → ___\n2. begin → ___ → ___\n3. break → ___ → ___\n4. bring → ___ → ___\n5. buy → ___ → ___\n6. catch → ___ → ___\n7. come → ___ → ___\n8. cut → ___ → ___\n9. do → ___ → ___\n10. drink → ___ → ___\n11. drive → ___ → ___\n12. eat → ___ → ___\n13. fall → ___ → ___\n14. feel → ___ → ___\n15. find → ___ → ___\n16. fly → ___ → ___\n17. get → ___ → ___\n18. give → ___ → ___\n19. go → ___ → ___\n20. grow → ___ → ___\n21. have → ___ → ___\n22. know → ___ → ___\n23. leave → ___ → ___\n24. make → ___ → ___\n25. read → ___ → ___\n26. run → ___ → ___\n27. see → ___ → ___\n28. sing → ___ → ___\n29. speak → ___ → ___\n30. take → ___ → ___",
        correctAnswer:
          "1. was/were-been  2. began-begun  3. broke-broken  4. brought-brought  5. bought-bought  6. caught-caught  7. came-come  8. cut-cut  9. did-done  10. drank-drunk  11. drove-driven  12. ate-eaten  13. fell-fallen  14. felt-felt  15. found-found  16. flew-flown  17. got-gotten  18. gave-given  19. went-gone  20. grew-grown  21. had-had  22. knew-known  23. left-left  24. made-made  25. read-read  26. ran-run  27. saw-seen  28. sang-sung  29. spoke-spoken  30. took-taken",
      },
      {
        id: "g5-reg",
        section: "final",
        type: "short-answer",
        question:
          "Regular Verb Table — tulis V2 dan V3 dengan aturan -ed yang benar:\n1. work → ___ → ___\n2. play → ___ → ___\n3. study → ___ → ___\n4. stop → ___ → ___\n5. dance → ___ → ___\n6. clean → ___ → ___\n7. open → ___ → ___\n8. close → ___ → ___\n9. visit → ___ → ___\n10. watch → ___ → ___\n11. wash → ___ → ___\n12. start → ___ → ___\n13. finish → ___ → ___\n14. listen → ___ → ___\n15. talk → ___ → ___",
        correctAnswer:
          "1. worked-worked  2. played-played  3. studied-studied  4. stopped-stopped  5. danced-danced  6. cleaned-cleaned  7. opened-opened  8. closed-closed  9. visited-visited  10. watched-watched  11. washed-washed  12. started-started  13. finished-finished  14. listened-listened  15. talked-talked",
        reason:
          "Regular verbs: V2=V3. Aturan: +ed (work→worked), +d jika berakhiran -e (dance→danced), y→ied jika konsonan+y (study→studied), double konsonan+ed jika CVC pendek (stop→stopped).",
      },
    ],
  },
  {
    id: "grammar-6",
    track: "grammar",
    day: 6,
    title: "Adverbs (Kata Keterangan)",
    subtitle:
      "Jenis-jenis adverb, pembentukan -ly, posisi, dan perbedaan adjective vs adverb",
    overview:
      "Pelajari Adverb (kata keterangan) secara lengkap: Adverbs of Manner (cara), Frequency (seberapa sering), Time (kapan), Place (di mana), Degree (seberapa banyak), aturan pembentukan -ly, posisi adverb dalam kalimat, dan perbedaan adjective vs adverb.",
    passage: [
      "An adverb is a word that modifies (gives more information about) a verb, an adjective, or another adverb. Adverbs tell us HOW, WHEN, WHERE, HOW OFTEN, or HOW MUCH something happens.",
      "Most adverbs are formed by adding -ly to an adjective: quick → quickly, slow → slowly, careful → carefully. But some common adverbs do NOT end in -ly: fast, hard, well, always, never, very.",
      "The position of an adverb in a sentence depends on its type. Getting the position right is important for clear, natural English.",
    ],
    materialSections: [
      {
        title: "Konsep Dasar: Adverb Menjelaskan A, V, Adv, S",
        points: [
          "Adverb = Kata Keterangan. Adverb bisa menjelaskan 4 hal: Adjective (A), Verb (V), Adverb (Adv), dan Sentence (S).",
          "",
          "1) Menjelaskan ADJECTIVE:",
          "The room is {{annotation:so|adv}} {{annotation:clean|adj}}",
          "The girl is {{annotation:too|adv}} {{annotation:beautiful|adj}}",
          "The car is {{annotation:very|adv}} {{annotation:expensive|adj}}",
          "",
          "2) Menjelaskan VERB:",
          "I {{annotation:totally|adv}} {{annotation:agree|verb}} with you",
          "I {{annotation:really|adv}} {{annotation:like|verb}} you",
          "",
          "3) Menjelaskan ADVERB lain:",
          "You did {{annotation:so|adv}} {{annotation:well|adv}} — (verb menjelasi → sebelum adv)",
          "You {{annotation:run|verb}} {{annotation:so|adv}} {{annotation:fast|adv}}",
          "You walk {{annotation:too|adv}} {{annotation:slowly|adv}}",
          "",
          "4) Menjelaskan SENTENCE (seluruh kalimat):",
          "I went to Malang {{annotation:yesterday|adv/time}}",
          "I will go to Jakarta {{annotation:tomorrow|adv/time}}",
          "I will finish my homework {{annotation:later|adv/time}}",
        ],
      },
      {
        title: "1) Adverb of Time (Waktu/Kapan)",
        points: [
          "now, today, yesterday, tomorrow, soon, later, recently, lately, already, yet, still...",
          "Posisi biasanya di AKHIR kalimat. Di AWAL → untuk penekanan.",
          "I will go to Australia {{annotation:next year|adv/time}} → {{annotation:Next year|adv/time}}, I'll go to Australia (penekanan)",
          "I met her {{annotation:last week|adv/time}}",
          "Please call me {{annotation:later|adv/time}}! I'm studying {{annotation:now|adv/time}}",
        ],
      },
      {
        title: "2) Adverb of Manner (Cara/Bagaimana)",
        points: [
          "quickly, slowly, carefully, loudly, quietly, badly, well, hard...",
          "Posisi: selalu di AKHIR kalimat (setelah verb/object).",
          "The snail walks {{annotation:slowly|adv/manner}}",
          "She drives {{annotation:carefully|adv/manner}}",
          "I can respond {{annotation:quickly|adv/manner}}",
        ],
      },
      {
        title: "3) Adverb of Frequency (Seberapa Sering)",
        points: [
          "always, usually, often, sometimes, rarely, seldom, never...",
          "",
          "Skala Frequency (dari paling sering ke paling jarang):",
          "always (100%) → usually (80%) → often (60%) → sometimes (50%) → rarely/seldom (10%) → never (0%)",
          "",
          'Posisi: TENGAH kalimat → sebelum main verb, setelah "be".',
          "I {{annotation:always|adv/freq}} {{annotation:study|verb}} English at night — (sebelum main verb)",
          'He is {{annotation:always|adv/freq}} sleepy in the grammar class — (setelah "be")',
          "I {{annotation:usually|adv/freq}} wake up at 5:30 am",
        ],
        imageUrl: "/adverb.jpeg",
      },
      {
        title: "4) Adverb of Place (Di Mana)",
        points: [
          "here, there, anywhere, somewhere, everywhere, nowhere, outside, inside, upstairs, abroad...",
          "Posisi: biasanya di AKHIR kalimat.",
          "I study English {{annotation:at TN|adv/place}}",
          "My class is {{annotation:in the Belgium 2|adv/place}}",
          '"Come here." "She is waiting outside." "They went abroad."',
        ],
      },
      {
        title: "5) Adverb of Degree (Seberapa Banyak)",
        points: [
          "really, too, very, so, quite, enough, pretty...",
          "Posisi: SEBELUM kata yang dijelaskan.",
          "The turtle walks {{annotation:so|adv/degree}} {{annotation:slowly|adv}}",
          "It's {{annotation:quite|adv/degree}} cold today",
          "She walks {{annotation:pretty|adv/degree}} far",
          "",
          '⚠️ PENGECUALIAN: "enough"',
          "enough + adj/adv → posisi di BELAKANG:",
          "I'm {{annotation:good|adj}} {{annotation:enough|adv}} — (enough setelah adjective)",
          "You did {{annotation:well|adv}} {{annotation:enough|adv}} — (enough setelah adverb)",
          "",
          "enough + noun → posisi SEBELUM noun:",
          "I don't have {{annotation:enough|adv}} {{annotation:money|noun}} — (enough sebelum noun)",
        ],
      },
      {
        title: "Pembentukan Adverb: Adj + ly",
        points: [
          "Rumus umum: Adjective + -ly = Adverb",
          "  careful → carefully, slow → slowly, diligent → diligently, quick → quickly, happy → happily, easy → easily, beautiful → beautifully",
          "",
          "⚠️ Adjective = Adverb (bentuk SAMA, tidak pakai -ly):",
          "  fast = fast (BUKAN fastly!), hard = hard (hardly = hampir tidak!)",
          "",
          "Contoh perbedaan fast/hard sebagai adj vs adv:",
          "I have a {{annotation:fast|adj}} {{annotation:car|noun}} — (adjective → menjelaskan noun)",
          "I {{annotation:drive|verb}} {{annotation:so|adv}} {{annotation:fast|adv}} — (adverb → menjelaskan verb)",
          "",
          "It is very a {{annotation:hard|adj}} {{annotation:question|noun}} — (adjective → menjelaskan noun)",
          "I always {{annotation:work|verb}} so {{annotation:hard|adv}} — (adverb → menjelaskan verb)",
          "",
          '🔴 IRREGULAR: good (adj) → well (adv). BUKAN "goodly"!',
          '"She is a good singer." (adj) → "She sings well." (adv)',
        ],
      },
      {
        title: "Adjective vs Adverb (Sering Tertukar!)",
        points: [
          'Adjective modifies NOUN: "She is a careful driver." Adverb modifies VERB: "She drives carefully."',
          'After linking verbs (be, feel, look, seem), use ADJECTIVE: "She feels happy." NOT "She feels happily."',
          'After action verbs, use ADVERB: "She sings beautifully." NOT "She sings beautiful."',
          'HARD: "He works hard." (adverb) vs "It is a hard question." (adjective). HARDLY = almost not: "I can hardly hear you."',
          'LATE: "He arrived late." (adverb) vs "He is a late arrival." (adjective). LATELY = recently: "I haven\'t seen him lately."',
          'FAST: "She runs fast." (adverb = same form as adjective). There is no "fastly"!',
        ],
      },
    ],
    exercises: [
      {
        id: "g6-q1",
        section: "middle",
        type: "multiple-choice",
        question: '"She sings ___." Choose the correct adverb:',
        options: ["beautiful", "beautifully", "beauty", "beautifuly"],
        correctAnswer: "beautifully",
        reason:
          '"Sings" adalah action verb, jadi butuh adverb. Beautiful + ly = beautifully. Perhatikan ejaan: bukan "beautifuly".',
      },
      {
        id: "g6-q2",
        section: "middle",
        type: "multiple-choice",
        question: '"She is ___ happy." Where does "always" go?',
        options: [
          "She always is happy.",
          "She is always happy.",
          "Always she is happy.",
          "She is happy always.",
        ],
        correctAnswer: "She is always happy.",
        reason:
          'Adverb of frequency ditempatkan SETELAH verb "be" (is/am/are). "She is always happy." bukan "She always is happy."',
      },
      {
        id: "g6-q3",
        section: "middle",
        type: "multiple-choice",
        question: '"He works ___." Choose the correct word:',
        options: ["hard", "hardly", "hardily", "harder"],
        correctAnswer: "hard",
        reason:
          '"Hard" sebagai adverb bentuknya sama dengan adjective. "Hardly" artinya "hampir tidak" (different meaning!).',
      },
      {
        id: "g6-q4",
        section: "middle",
        type: "multiple-choice",
        question: "Which sentence is correct?",
        options: [
          "The food tastes deliciously.",
          "The food tastes delicious.",
          "The food tastes deliciousful.",
          "The food deliciously tastes.",
        ],
        correctAnswer: "The food tastes delicious.",
        reason:
          '"Tastes" di sini adalah linking verb, jadi pakai adjective "delicious", bukan adverb "deliciously".',
      },
      {
        id: "g6-q5",
        section: "middle",
        type: "multiple-choice",
        question:
          "Luluk is (beautiful/beautifully) girl and she also dances (beautiful/beautifully). Pilih yang benar:",
        options: [
          "beautiful, beautiful",
          "beautifully, beautifully",
          "beautiful, beautifully",
          "beautifully, beautiful",
        ],
        correctAnswer: "beautiful, beautifully",
        reason:
          '"beautiful girl" → adj menjelaskan noun. "dances beautifully" → adverb menjelaskan verb.',
      },
      {
        id: "g6-q6",
        section: "middle",
        type: "multiple-choice",
        question:
          "We are (hard/hardly) workers. Because we always do everything (hard/hardly). Pilih yang benar:",
        options: [
          "hard, hard",
          "hardly, hardly",
          "hard, hardly",
          "hardly, hard",
        ],
        correctAnswer: "hard, hard",
        reason:
          '"hard workers" → adj menjelaskan noun. "do everything hard" → adverb (hard = keras/giat). Hardly = hampir tidak (beda makna!).',
      },
      {
        id: "g6-q7",
        section: "middle",
        type: "multiple-choice",
        question:
          "I (near/nearly) fall. When I stand (near/nearly) the cliff. Pilih yang benar:",
        options: [
          "near, near",
          "nearly, nearly",
          "nearly, near",
          "near, nearly",
        ],
        correctAnswer: "nearly, near",
        reason:
          '"nearly fall" → nearly = hampir (adverb). "stand near the cliff" → near = dekat (preposition/adverb of place).',
      },
      {
        id: "g6-q8",
        section: "middle",
        type: "multiple-choice",
        question:
          "(Final/Finally), I pass the (Final/Finally) exam. Pilih yang benar:",
        options: [
          "Final, Final",
          "Finally, Finally",
          "Finally, Final",
          "Final, Finally",
        ],
        correctAnswer: "Finally, Final",
        reason:
          '"Finally" = akhirnya (adverb, menjelaskan seluruh kalimat). "Final exam" = ujian akhir (adjective menjelaskan noun).',
      },
      {
        id: "g6-q9",
        section: "middle",
        type: "multiple-choice",
        question:
          "Dayat is the (fast/fastly) runner. So he can run (fast/fastly). Pilih yang benar:",
        options: [
          "fast, fast",
          "fastly, fastly",
          "fast, fastly",
          "fastly, fast",
        ],
        correctAnswer: "fast, fast",
        reason:
          '"fast" sebagai adj dan adverb bentuknya SAMA. Tidak ada kata "fastly"! Fast runner (adj) → run fast (adv).',
      },
      {
        id: "g6-q10",
        section: "final",
        type: "short-answer",
        question:
          "Remark (tandai) Adverb dalam kalimat berikut:\n1) Arini is an extremely good dancer.\n2) Every day, she speaks English fluently.\n3) He will be the special guest in our event tomorrow.\n4) Cat and dog always chase each other.\n5) Fortunately, I got my best result in my final exam.",
      },
      {
        id: "g6-q11",
        section: "final",
        type: "short-answer",
        question:
          "Remark (tandai) Adverb dalam kalimat berikut:\n6) This is our last chance to get the scholarship in the next year.\n7) My mother usually calls me every weekend.\n8) One of the students in this class is smart enough.\n9) Our teacher speaks fast enough.\n10) These books have been written by our heroes since long time.",
      },
      {
        id: "g6-q12",
        section: "final",
        type: "short-answer",
        question:
          "Adjective & Adverb Exercise: Isi dengan bentuk yang benar dari kata dalam kurung (adjective atau adverb):\n1) He ___ reads a book. (quick)\n2) Mandy is a ___ girl. (pretty)\n3) The class is ___ loud today. (terrible)\n4) Max is a ___ singer. (good)\n5) You can ___ open this tin. (easy)\n6) It is a ___ day today. (terrible)\n7) She sings the song ___. (good)\n8) He is a ___ driver. (careful)\n9) He drives the car ___. (careful)\n10) The dog barks ___. (loud)",
      },
      {
        id: "g6-q13",
        section: "final",
        type: "short-answer",
        question:
          "Adjective & Adverb Exercise (lanjutan): Isi dengan bentuk yang benar:\n11) The bus driver was ___ injured. (serious)\n12) Kevin is ___ clever. (extreme)\n13) This hamburger tastes ___. (awful)\n14) Be ___ with this glass of milk. It is hot. (careful)\n15) Robin looks ___. What's the matter with him? (sad)\n16) Jack is ___ upset about losing his keys. (terrible)\n17) This steak smells ___. (good)\n18) Our basketball team played ___ last Friday. (bad)\n19) Do not speak so ___. I can't understand you. (fast)\n20) Maria ___ opened her present. (slow)",
      },
      {
        id: "g6-q14",
        section: "final",
        type: "task",
        question:
          "Write 12 sentences about your daily life. Use at least: 2 adverbs of manner, 2 adverbs of frequency, 2 adverbs of time, 2 adverbs of place, 2 adverbs of degree. Label each adverb and its type.",
      },
    ],
  },

  {
    id: "grammar-5b",
    track: "grammar",
    day: 8,
    title: "Verbs — Auxiliary & Modal (Hari 2)",
    subtitle:
      "Kata kerja bantu (be/have/do), modal verbs dan maknanya, semi-modal expressions",
    overview:
      "Lanjutan materi Verb hari ke-2: B. Auxiliary Verb (kata kerja bantu) — be, have, do, dan modal. Tabel penggunaan per subject pronoun. b) Modal verbs dan maknanya: will/shall (akan), would/should (seharusnya), must (harus), may/might (mungkin), can/could (bisa). C. Semi-modal — similar expressions of modal seperti be going to, used to, be supposed to, be able to, have to.",
    passage: [
      "Auxiliary verbs (kata kerja bantu) adalah verb yang mendampingi main verb untuk membentuk tense, passive, atau pertanyaan. Ada tiga kelompok: be, have, dan do — ditambah modal verbs.",
      "Modal verbs memberikan informasi tentang kemungkinan, kemampuan, kewajiban, atau izin. Setelah modal selalu diikuti V1 (base form). Setiap modal punya makna khusus yang perlu dipahami.",
      "Semi-modal adalah ekspresi yang memiliki makna serupa dengan modal tetapi menggunakan frasa lebih panjang. Contoh: 'can' bisa digantikan dengan 'be able to', 'must' dengan 'have to'.",
    ],
    materialSections: [
      {
        title: "B. Auxiliary Verb (Kata Kerja Bantu)",
        points: [
          "Auxiliary verb mendampingi main verb (Vord). Posisi: Subject + Vaux + Vord.",
          "",
          "Contoh:",
          "  She {{annotation:is|Vaux}} {{annotation:studying|Vord}} right now.",
          "  He {{annotation:is|Vaux}} a soldier. (be sebagai main verb)",
          "  She {{annotation:is|Vaux}} {{annotation:bought|Vord}} a gift by her father. (passive)",
          "",
          "Kelompok Auxiliary:",
          "  → be    : is, am, are, was, were  (untuk passive & continuous/ving)",
          "  → have  : has, have, had           (untuk perfect tense, +V3)",
          "  → do    : do, does, did            (untuk pertanyaan & negasi)",
          "  → modal : can, could, should, would, will, shall  (+V1)",
        ],
      },
      {
        title: "B. Auxiliary — Tabel per Subject Pronoun",
        points: [
          "  Subject/Pronoun  | be (pasif/ving)  | have (+V3)  | modal (+V1)",
          "  I                | am / was         | have / had  | —",
          "  You              | —                | have / had  | —",
          "  They / We        | are / were       | have / had  | —",
          "  She / He / It    | is / was         | has / had   | —",
          "",
          "  ⚠️ Modal tidak berubah bentuk untuk semua subject (no -s):",
          "  I can, You can, She can, They can — semua sama.",
        ],
      },
      {
        title: "b) Modal Verbs & Maknanya",
        points: [
          "Setelah modal selalu pakai V1 (base form). Tidak ada -s/-ing/-ed.",
          "",
          "will / shall   → akan (if we)",
          "  ex: She {{annotation:will|Vaux}} {{annotation:begin|Voud}} the competition.",
          "",
          "would          → seharusnya (past, sopan)",
          "should         → seharusnya",
          "ought to       → seharusnya (kode keras / lebih tegas)",
          "  ex: You {{annotation:should|Vaux}} {{annotation:drive|Voud}} the car.",
          "",
          "must           → harusnya (kewajiban kuat)",
          "",
          "may            → mungkin / boleh",
          "might          → mungkin (~40% kemungkinan)",
          "",
          "can            → bisa / dapat",
          "could          → bisa (past, atau sopan)",
        ],
      },
      {
        title: "C. Semi-modal (Similar Expression of Modal)",
        points: [
          "Semi-modal adalah frasa yang maknanya mirip dengan modal:",
          "",
          "  will    → be going to        (akan)",
          "  would   → used to            (dulu terbiasa)",
          "  should  → be supposed to     (seharusnya)",
          "  may     → be allowed to      (mungkin / boleh)",
          "  can     → be able to         (bisa / dapat)",
          "  must    → have to / have got to  (harus)",
          "              ↑ has to / has got to (untuk She/He/It)",
          "",
          "Contoh penggunaan & perubahan bentuk:",
          '  "I should can get the scholarship" ← SALAH',
          '  "I should be able to get the scholarship" ← BENAR',
          '  "I am not supposed to be able to get the scholarship" ← negasi',
        ],
      },
    ],
    exercises: [
      {
        id: "g5b-q1",
        section: "middle",
        type: "multiple-choice",
        question:
          '"She ___ studying right now." Pilih auxiliary verb yang tepat:',
        options: ["do", "is", "has", "was"],
        correctAnswer: "is",
        reason:
          'Kalimat present continuous: Subject + be + Ving. "She is studying" karena She = He/She/It → pakai "is".',
      },
      {
        id: "g5b-q2",
        section: "middle",
        type: "multiple-choice",
        question:
          'Apa makna modal "might" dalam kalimat "It might rain today"?',
        options: ["Harus", "Pasti", "Mungkin (~40%)", "Boleh"],
        correctAnswer: "Mungkin (~40%)",
        reason:
          '"Might" menyatakan kemungkinan yang tidak terlalu besar, sekitar 40%. "May" juga bermakna mungkin tapi sedikit lebih tinggi kemungkinannya.',
      },
      {
        id: "g5b-q3",
        section: "middle",
        type: "multiple-choice",
        question: 'Semi-modal yang tepat untuk menggantikan "can" adalah:',
        options: ["be going to", "used to", "be able to", "have to"],
        correctAnswer: "be able to",
        reason:
          '"Can" (bisa/dapat) digantikan dengan "be able to". Contoh: "I can swim" = "I am able to swim".',
      },
      {
        id: "g5b-q4",
        section: "middle",
        type: "multiple-choice",
        question:
          '"You ___ drive carefully on this road." Pilih modal yang paling tepat (saran/nasihat):',
        options: ["will", "must", "should", "might"],
        correctAnswer: "should",
        reason:
          '"Should" digunakan untuk saran atau nasihat. "You should drive carefully" = kamu sebaiknya mengemudi hati-hati.',
      },
      {
        id: "g5b-q5",
        section: "middle",
        type: "multiple-choice",
        question: "Pilih kalimat yang BENAR:",
        options: [
          "She should can do it.",
          "She should be able to do it.",
          "She should to do it.",
          "She should does it.",
        ],
        correctAnswer: "She should be able to do it.",
        reason:
          'Setelah modal (should), pakai V1. "Can" tidak bisa langsung setelah modal lain. Gunakan semi-modal "be able to" sebagai gantinya.',
      },
      {
        id: "g5b-q6",
        section: "middle",
        type: "multiple-choice",
        question:
          '"I ___ go to the market every weekend when I was a child." (dulu terbiasa)',
        options: ["will", "would", "used to", "should"],
        correctAnswer: "used to",
        reason:
          '"Used to" menyatakan kebiasaan di masa lalu yang sudah tidak dilakukan lagi. Ini semi-modal pengganti "would" untuk makna "dulu terbiasa".',
      },
      {
        id: "g5b-q7",
        section: "final",
        type: "short-answer",
        question:
          "Ubah kalimat modal berikut menjadi semi-modal yang setara:\n1. She can speak English.\n2. You must finish your homework.\n3. I will travel abroad.\n4. He should apologize.\n5. May I use your phone?",
        correctAnswer:
          "1. She is able to speak English.  2. You have to finish your homework.  3. I am going to travel abroad.  4. He is supposed to apologize.  5. Am I allowed to use your phone?",
      },
      {
        id: "g5b-q8",
        section: "final",
        type: "short-answer",
        question:
          "Isi auxiliary verb yang tepat (be/have/do/modal):\n1. She ___ bought a present by her friend. (passive)\n2. I ___ studying for 3 hours. (present perfect continuous)\n3. ___ you speak French? (kemampuan)\n4. He ___ finish his work by tomorrow. (kewajiban kuat)\n5. They ___ sleeping when I arrived. (past continuous)",
        correctAnswer: "1. was  2. have been  3. Can  4. must  5. were",
      },
      {
        id: "g5b-q9",
        section: "final",
        type: "task",
        question:
          "Buat 8 kalimat menggunakan modal/semi-modal yang berbeda. Tandai Vaux dan Vord dalam setiap kalimat, dan tuliskan maknanya dalam bahasa Indonesia.",
      },
    ],
  },
  {
    id: "grammar-review",
    track: "grammar",
    day: 9,
    title: "Verb — Review & Practice Games",
    subtitle:
      "Review menyeluruh materi verb Day 7-8: latihan interaktif dan games",
    overview:
      "Hari review khusus Verb! Tidak ada materi baru. Saatnya bermain dan berlatih: isi latihan verb form, identifikasi jenis verb, dan koreksi kalimat yang salah. Tujuan: memastikan pemahaman verb Day 7-8 sebelum lanjut ke Middle Test.",
    passage: [
      "Welcome to Verb Review Day! Today is all about practice and games — no new theory.",
      "Let's reinforce what you have learned over the past two days: verb types (dynamic, stative, ordinary, transitive, intransitive), verb forms (V1/V2/V3/V-ing/Vs-es), auxiliary verbs, modal verbs, and semi-modals.",
      "Complete all the exercises below. Check your answers, understand your mistakes, and feel confident before the Middle Test!",
    ],
    materialSections: [],
    exercises: [
      {
        id: "grev-q1",
        section: "middle",
        type: "multiple-choice",
        question:
          'GAME: Pilih jenis verb yang tepat untuk kata "love" dalam kalimat "I love chocolate":',
        options: [
          "Dynamic verb",
          "Stative verb",
          "Auxiliary verb",
          "Modal verb",
        ],
        correctAnswer: "Stative verb",
        reason:
          '"Love" adalah stative verb — menunjukkan perasaan/emosi, bukan aksi fisik. Stative verbs tidak digunakan dalam continuous tense.',
      },
      {
        id: "grev-q2",
        section: "middle",
        type: "multiple-choice",
        question:
          'GAME: "She ___ a letter to her mom." Jenis verb apa yang cocok (transitive)?',
        options: ["sleep", "run", "wrote", "arrived"],
        correctAnswer: "wrote",
        reason:
          '"Wrote" adalah transitive verb karena membutuhkan objek ("a letter"). Sleep, run, arrived adalah intransitive — tidak butuh objek.',
      },
      {
        id: "grev-q3",
        section: "middle",
        type: "multiple-choice",
        question: "GAME: Mana yang SALAH?",
        options: [
          "She is studying English now.",
          "They have finished the project.",
          "He must to go home.",
          "You should be more careful.",
        ],
        correctAnswer: "He must to go home.",
        reason:
          'Setelah modal verb TIDAK boleh ada "to". Benar: "He must go home."',
      },
      {
        id: "grev-q4",
        section: "middle",
        type: "multiple-choice",
        question: 'GAME: V3 dari "speak" adalah:',
        options: ["speaked", "spoke", "spoken", "speaking"],
        correctAnswer: "spoken",
        reason:
          '"Speak" adalah irregular verb: speak → spoke → spoken. V3 = spoken (digunakan untuk perfect tense & passive).',
      },
      {
        id: "grev-q5",
        section: "middle",
        type: "multiple-choice",
        question:
          'GAME: "She ___ a book to her sister." Identifikasi IO dan DO!',
        options: [
          "gave — IO: a book, DO: her sister",
          "gave — IO: her sister, DO: a book",
          "gave — hanya 1 objek (monotransitive)",
          "gave — tidak butuh objek (intransitive)",
        ],
        correctAnswer: "gave — IO: her sister, DO: a book",
        reason:
          'Formula ditransitive: S + V + IO + DO. "Her sister" = IO (indirect, penerima), "a book" = DO (direct, benda yang diberikan).',
      },
      {
        id: "grev-q6",
        section: "middle",
        type: "multiple-choice",
        question:
          'GAME: Semi-modal yang tepat untuk "I must see a doctor" adalah:',
        options: [
          "I be going to see a doctor.",
          "I used to see a doctor.",
          "I have to see a doctor.",
          "I am supposed to see a doctor.",
        ],
        correctAnswer: "I have to see a doctor.",
        reason:
          '"Must" → semi-modal pengganti: "have to" (atau "have got to"). Keduanya bermakna harus.',
      },
      {
        id: "grev-q7",
        section: "final",
        type: "short-answer",
        question:
          "🎮 VERB CHALLENGE — Isi bentuk verb yang tepat:\n1. She ___ (go) to school every day. [V+s/es]\n2. He ___ (study) last night. [V2]\n3. I have ___ (eat) my lunch. [V3]\n4. They are ___ (swim) now. [Ving]\n5. She ___ (not/can) drive. [modal + negasi]\n6. We ___ (finish) before Monday. [modal: harus]\n7. I ___ (cook) dinner when you called. [past continuous]\n8. The report ___ (write) by her yesterday. [passive V2]",
        correctAnswer:
          "1. goes  2. studied  3. eaten  4. swimming  5. cannot/can't drive  6. must finish  7. was cooking  8. was written",
      },
      {
        id: "grev-q8",
        section: "final",
        type: "short-answer",
        question:
          "🎮 SENTENCE DOCTOR — Koreksi kalimat yang salah:\n1. She can swims very fast.\n2. He must to finish his homework.\n3. I am loving this movie.\n4. She buyed a new dress yesterday.\n5. They should can help us.\n6. I will going to travel next week.",
        correctAnswer:
          "1. She can swim very fast.  2. He must finish his homework.  3. I love this movie. (stative verb)  4. She bought a new dress yesterday.  5. They should be able to help us.  6. I will travel next week. / I am going to travel next week.",
        reason:
          "1. Modal+V1 (no -s)  2. Modal+V1 (no 'to')  3. Stative verb tidak pakai -ing  4. buy→bought (irregular)  5. Modal tidak boleh + modal, ganti dengan semi-modal  6. will dan be going to tidak digunakan bersamaan",
      },
      {
        id: "grev-q9",
        section: "final",
        type: "task",
        question:
          "🎮 STORY TIME — Tulis cerita pendek (8-10 kalimat) tentang hari-harimu. Gunakan minimal:\n• 2 dynamic verb dan 1 stative verb\n• 1 transitive (monotransitive) dan 1 ditransitive (IO+DO)\n• 1 auxiliary (be/have/do)\n• 2 modal verbs berbeda\n• 1 semi-modal\nGaris bawahi setiap verb dan tulis jenisnya di bawah kalimat.",
      },
    ],
  },
  {
    id: "grammar-10",
    track: "grammar",
    day: 10,
    title: "Middle Test — Grammar",
    subtitle: "Mid-Test Basic Grammar — Titik Nol English Course",
    overview:
      "Ujian tengah grammar mencakup materi Nouns, Pronouns, Adjectives, Adverbs, dan Verbs. Terdiri dari 2 bagian: A) Choose the correct one (pilihan ganda) dan B) Choose the correct answer (pilih kata yang benar).",
    materialSections: [
      {
        title: "Petunjuk Ujian",
        points: [
          "Bagian A — Choose the correct one: Pilih jawaban a/b/c/d yang paling tepat.",
          "Bagian B — Choose the correct answer: Pilih satu kata yang benar dari dua pilihan dalam kurung.",
          "Setiap soal disertai penjelasan jawaban benar dan salah.",
          "Materi: Adjectives, Adverbs, Nouns (plural/countable), Verbs (auxiliary/linking/ordinary).",
        ],
      },
    ],
    exercises: [
      // ── BAGIAN A: Choose the correct one ──
      {
        id: "gmt-q1",
        type: "multiple-choice",
        question:
          'My friends look so gorgeous!\n(Identifikasi jenis kata yang digarisbawahi: "My" dan "gorgeous")',
        options: [
          "a. Adverb, noun",
          "b. Pronoun, adverb",
          "c. Pronoun, adjective",
          "d. Adjective, adjective",
        ],
        correctAnswer: "d. Adjective, adjective",
        reason:
          '"My" = possessive adjective (limiting adjective) yang menerangkan "friends". "gorgeous" = descriptive adjective yang menerangkan keadaan friends. Keduanya adjective.',
      },
      {
        id: "gmt-q2",
        type: "multiple-choice",
        question:
          'She drives very carefully because she has had a traumatic car accident.\n(Identifikasi jenis kata: "carefully" dan "traumatic")',
        options: [
          "a. Adjective, adjective",
          "b. Verb, noun",
          "c. Adjective, adverb",
          "d. Adverb, adjective",
        ],
        correctAnswer: "d. Adverb, adjective",
        reason:
          '"carefully" = adverb karena memodifikasi verb "drives" (cara mengemudi). "traumatic" = adjective karena menerangkan noun "car accident".',
      },
      {
        id: "gmt-q3",
        type: "multiple-choice",
        question:
          "Ani has many cakes. She gives ________ cakes to Lely and ________ are given to Sammy.",
        options: [
          "a. The other, other",
          "b. Others, others",
          "c. Another, other",
          "d. Other, others",
        ],
        correctAnswer: "d. Other, others",
        reason:
          '"other" + noun (other cakes) = berfungsi sebagai adjective. "others" berdiri sendiri sebagai pronoun/subject pengganti noun. Pola: other + noun vs others (sendirian).',
      },
      {
        id: "gmt-q4",
        type: "multiple-choice",
        question: "She speaks ________ every day so nobody can ________",
        options: [
          "a. Fast, understands",
          "b. Fastly, understand",
          "c. Quick, understand",
          "d. Fast, understand",
        ],
        correctAnswer: "d. Fast, understand",
        reason:
          '"Fast" digunakan langsung sebagai adverb (tidak ada kata "fastly" dalam bahasa Inggris). Setelah modal "can", selalu gunakan base form "understand" tanpa -s.',
      },
      {
        id: "gmt-q5",
        type: "multiple-choice",
        question:
          "They are smart ________ so they can ________ high score on IELTS.",
        options: [
          "a. Woman, get",
          "b. Women, gets",
          "c. Men, get",
          "d. Man, get",
        ],
        correctAnswer: "b. Women, gets",
        reason:
          '"They" merujuk pada subjek plural → gunakan "women" (plural dari woman). Setelah modal "can", bentuk yang benar adalah base form "get" (bukan "gets"). Namun dalam konteks soal ini, "Women" adalah pilihan noun yang paling tepat untuk "They".',
      },
      {
        id: "gmt-q6",
        type: "multiple-choice",
        question:
          "Silvia ________ a diligent girl, and she always studies ________ every night.",
        options: [
          "a. Has, quickly",
          "b. Is, hard",
          "c. Has, fast",
          "d. Is, hardly",
        ],
        correctAnswer: "b. Is, hard",
        reason:
          '"Silvia IS a diligent girl" → linking verb "is" menghubungkan Silvia dengan complement. "studies HARD" → "hard" sebagai adverb (rajin). BUKAN "hardly" yang artinya "hampir tidak" (negatif).',
      },
      {
        id: "gmt-q7",
        type: "multiple-choice",
        question:
          "The most common phenomenon in many countries ________ debating about Flat Earth.",
        options: ["a. Are", "b. Is", "c. Have", "d. Has"],
        correctAnswer: "b. Is",
        reason:
          '"Phenomenon" = singular noun (bentuk plural = phenomena). Subject tunggal → verb tunggal "is". Jangan tertipu oleh "many countries" di tengah kalimat.',
      },
      {
        id: "gmt-q8",
        type: "multiple-choice",
        question:
          "The two ________ in the zoo ________ able to communicate their feelings to people.",
        options: [
          "a. Deers, are",
          "b. Deer, are",
          "c. Deer, is",
          "d. Deers, be",
        ],
        correctAnswer: "b. Deer, are",
        reason:
          '"Deer" = irregular noun, bentuk plural SAMA dengan singular (tidak ada "deers"). "The two deer" = plural subject → verb plural "are". "Deers" tidak ada dalam bahasa Inggris.',
      },
      {
        id: "gmt-q9",
        type: "multiple-choice",
        question:
          'Jane is pretty beautiful, so she is loved by many boys.\n(Identifikasi jenis kata: "pretty" dan "is")',
        options: [
          "a. Adjective, ordinary verb",
          "b. Adverb, ordinary verb",
          "c. Adverb, auxiliary verb",
          "d. Adjective, auxiliary verb",
        ],
        correctAnswer: "c. Adverb, auxiliary verb",
        reason:
          '"pretty" di sini bukan adjective, melainkan ADVERB yang memodifikasi adjective "beautiful" (artinya: sangat/lumayan cantik). "is" dalam "is loved" = auxiliary verb (passive voice = aux + past participle).',
      },
      {
        id: "gmt-q10",
        type: "multiple-choice",
        question:
          "I have ________ information for you, so you must ________ attention.",
        options: [
          "a. Much, pay",
          "b. Many, paid",
          "c. Much, paid",
          "d. Many, pay",
        ],
        correctAnswer: "a. Much, pay",
        reason:
          '"Information" = uncountable noun → gunakan "much" (bukan "many" untuk countable). Setelah modal "must" → base form "pay" (bukan "paid" = past tense).',
      },

      // ── BAGIAN B: Choose the correct answer ──
      {
        id: "gmt-q11",
        type: "multiple-choice",
        question:
          "You drive so ________ that I am afraid someone will hit the car from behind.\n(slow / slowly)",
        options: ["a. Slow", "b. Slowly"],
        correctAnswer: "b. Slowly",
        reason:
          '"Drive" = verb → modifier harus berupa adverb. "slow" = adjective, "slowly" = adverb. Pilih slowly.',
      },
      {
        id: "gmt-q12",
        type: "multiple-choice",
        question: "You did that somersault so ________.\n(good / well)",
        options: ["a. Good", "b. Well"],
        correctAnswer: "b. Well",
        reason:
          '"Did" = verb → butuh adverb. "good" = adjective, "well" = adverb. Pilih well.',
      },
      {
        id: "gmt-q13",
        type: "multiple-choice",
        question:
          "If you do not speak ________, the audience will not understand you.\n(clear / clearly)",
        options: ["a. Clear", "b. Clearly"],
        correctAnswer: "b. Clearly",
        reason:
          '"Speak" = verb → modifier harus adverb. "clear" = adjective, "clearly" = adverb. Pilih clearly.',
      },
      {
        id: "gmt-q14",
        type: "multiple-choice",
        question:
          "Our student ________ sent to Japan for Mathematics Olympiad.\n(was / were)",
        options: ["a. Was", "b. Were"],
        correctAnswer: "a. Was",
        reason:
          '"Our student" = singular subject → singular past verb "was". "Were" digunakan untuk plural (students) atau I were dalam conditional.',
      },
      {
        id: "gmt-q15",
        type: "multiple-choice",
        question: "There ________ much water in the pool.\n(is / are)",
        options: ["a. Is", "b. Are"],
        correctAnswer: "a. Is",
        reason:
          '"Water" = uncountable noun → dianggap singular → gunakan "is". Kata "much" juga mengonfirmasi bahwa water di sini uncountable.',
      },
      {
        id: "gmt-q16",
        type: "multiple-choice",
        question:
          "This lesson was less ________, so ________ students took it.\n(interested/interesting) — (few/little)",
        options: [
          "a. Interested, few",
          "b. Interesting, few",
          "c. Interested, little",
          "d. Interesting, little",
        ],
        correctAnswer: "b. Interesting, few",
        reason:
          'Pelajaran (benda) bisa "interesting" (menarik) bukan "interested" (merasa tertarik, untuk orang). "students" = countable noun → "few" (sedikit). "little" hanya untuk uncountable noun.',
      },
      {
        id: "gmt-q17",
        type: "multiple-choice",
        question:
          "They always wear their ________ eyeglasses when they go to the beach.\n(every day / everyday)",
        options: ["a. Every day", "b. Everyday"],
        correctAnswer: "b. Everyday",
        reason:
          'Sebelum noun "eyeglasses" butuh adjective → "everyday" (satu kata = adjective, artinya sehari-hari). "Every day" = dua kata, berfungsi sebagai adverb of frequency (digunakan di akhir kalimat).',
      },
      {
        id: "gmt-q18",
        type: "multiple-choice",
        question:
          "A number of students usually ________ a thesis in the eighth semester.\n(takes / take)",
        options: ["a. Takes", "b. Take"],
        correctAnswer: "b. Take",
        reason:
          '"A number of" = berarti "sejumlah/beberapa" → bermakna plural → verb plural "take". Berbeda dengan "The number of students IS..." (the number = singular).',
      },
      {
        id: "gmt-q19",
        type: "multiple-choice",
        question:
          "My brother is the ________ of Bristol University.\n(alumni / alumnus)",
        options: ["a. Alumni", "b. Alumnus"],
        correctAnswer: "b. Alumnus",
        reason:
          '"My brother" = singular → "alumnus" (singular Latin). "Alumni" = plural (bentuk jamak). Contoh: She is an alumna. They are alumni.',
      },
      {
        id: "gmt-q20",
        type: "multiple-choice",
        question:
          "An architect needs a great amount of ________ for this building.\n(equipment / equipments)",
        options: ["a. Equipment", "b. Equipments"],
        correctAnswer: "a. Equipment",
        reason:
          '"Equipment" = uncountable noun → tidak punya bentuk plural. "Equipments" tidak ada dalam bahasa Inggris. Contoh lain: furniture, information, advice, luggage.',
      },
    ],
  },
  // ─────────────────────────────────────────────────────────
  // WEEK 3–4
  // ─────────────────────────────────────────────────────────
  {
    id: "grammar-11",
    track: "grammar",
    day: 11,
    title: "Conjunction",
    subtitle: "Coordinating & Correlative Conjunctions",
    overview:
      "Materi grammar tentang conjunction (kata penghubung): Coordinating Conjunctions (FANBOYS) dan Correlative Conjunctions. Dilengkapi latihan multiple choice (20 soal), translate to English (10 soal), dan fill in the blank (10 soal).",
    materialSections: [
      {
        title: "Coordinating Conjunctions — FANBOYS",
        points: [
          "F — FOR: menjelaskan alasan/sebab (karena). Contoh: I stayed home, for it was raining.",
          "A — AND: menambahkan informasi (dan). Contoh: She sings and dances.",
          "N — NOR: melanjutkan kalimat negatif (juga tidak). Contoh: He doesn't eat meat, nor does he eat fish. (Perhatikan inversion setelah 'nor'.)",
          "B — BUT: menunjukkan kontras (tetapi). Contoh: I wanted to go, but it rained.",
          "O — OR: menunjukkan pilihan (atau). Contoh: Do you want tea or coffee?",
          "Y — YET: menunjukkan kontras yang mengejutkan (namun/meskipun demikian). Contoh: She was tired, yet she finished the work.",
          "S — SO: menunjukkan hasil/akibat (jadi/sehingga). Contoh: It was hot, so we opened the window.",
        ],
      },
      {
        title: "Correlative Conjunctions",
        points: [
          "BOTH ... AND: kedua hal sama-sama benar/berlaku. Contoh: Both Ani and Budi like classical music.",
          "EITHER ... OR: salah satu dari dua pilihan. Contoh: You can either study now or fail later.",
          "NEITHER ... NOR: keduanya tidak (negatif ganda). Contoh: Neither the teacher nor the students knew.",
          "NOT ONLY ... BUT ALSO: bukan hanya ... tetapi juga (menekankan tambahan). Contoh: She is not only smart but also very humble.",
          "Correlative conjunctions selalu digunakan berpasangan — tidak bisa dipisah.",
          "Subject–verb agreement dengan either/or dan neither/nor: kata kerja mengikuti subject yang paling dekat dengan kata kerja.",
          "Inversion: setelah 'nor' dan 'not only' di awal kalimat, posisi subjek dan kata kerja bantu terbalik. Contoh: Not only did she win the race, but she also broke the record.",
        ],
      },
    ],
    exercises: [
      // ── PART 1: Multiple Choice (20 Soal) ──
      {
        id: "gcj-q1",
        type: "multiple-choice",
        question:
          "I wanted to go to the beach, ________ it started to rain heavily.",
        options: ["a. and", "b. but", "c. or", "d. so"],
        correctAnswer: "b. but",
        reason:
          '"But" digunakan untuk menunjukkan kontras antara dua klausa yang berlawanan. Ingin pergi ke pantai namun hujan deras adalah kontras.',
      },
      {
        id: "gcj-q2",
        type: "multiple-choice",
        question:
          "You can have ________ the chocolate cake ________ the vanilla pudding, but not both.",
        options: [
          "a. both / and",
          "b. neither / nor",
          "c. either / or",
          "d. not only / but also",
        ],
        correctAnswer: "c. either / or",
        reason:
          '"Either...or" digunakan untuk memberikan dua pilihan di mana hanya satu yang bisa dipilih. "But not both" menegaskan bahwa hanya satu pilihan tersedia.',
      },
      {
        id: "gcj-q3",
        type: "multiple-choice",
        question:
          "She is ________ a talented singer ________ a professional dancer.",
        options: [
          "a. both / and",
          "b. either / nor",
          "c. neither / or",
          "d. but / so",
        ],
        correctAnswer: "a. both / and",
        reason:
          '"Both...and" digunakan ketika dua hal sama-sama benar dan berlaku untuk satu subjek. Dia adalah penyanyi berbakat DAN penari profesional — keduanya benar.',
      },
      {
        id: "gcj-q4",
        type: "multiple-choice",
        question:
          "My brother doesn't like spinach, ________ does he like broccoli.",
        options: ["a. or", "b. for", "c. nor", "d. yet"],
        correctAnswer: "c. nor",
        reason:
          '"Nor" digunakan untuk melanjutkan kalimat negatif. Setelah "nor", terjadi inversion (subjek dan auxiliary terbalik): "nor does he". Artinya: dia tidak suka bayam, dan juga tidak suka brokoli.',
      },
      {
        id: "gcj-q5",
        type: "multiple-choice",
        question:
          "He was very tired, ________ he decided to finish his homework anyway.",
        options: ["a. so", "b. yet", "c. for", "d. and"],
        correctAnswer: "b. yet",
        reason:
          '"Yet" menunjukkan kontras yang mengejutkan — meskipun sangat lelah, dia tetap menyelesaikan PR-nya. Kata "anyway" memperkuat kontras ini.',
      },
      {
        id: "gcj-q6",
        type: "multiple-choice",
        question:
          "________ Sarah ________ her sister are coming to the party tonight.",
        options: [
          "a. Both / and",
          "b. Either / and",
          "c. Neither / or",
          "d. Not only / and",
        ],
        correctAnswer: "a. Both / and",
        reason:
          '"Both...and" adalah satu-satunya pasangan konjungsi korelatif yang valid di sini. "Either/and", "Neither/or", dan "Not only/and" bukan pasangan yang benar secara tata bahasa.',
      },
      {
        id: "gcj-q7",
        type: "multiple-choice",
        question:
          "We should study hard, ________ we might fail the final exam.",
        options: ["a. but", "b. or", "c. for", "d. yet"],
        correctAnswer: "b. or",
        reason:
          '"Or" digunakan untuk menunjukkan konsekuensi jika suatu kondisi tidak dipenuhi: belajar keras ATAU (jika tidak) mungkin gagal ujian.',
      },
      {
        id: "gcj-q8",
        type: "multiple-choice",
        question: "The movie was ________ long ________ extremely boring.",
        options: [
          "a. neither / or",
          "b. not only / but also",
          "c. either / and",
          "d. both / or",
        ],
        correctAnswer: "b. not only / but also",
        reason:
          '"Not only...but also" digunakan untuk menekankan dua sifat yang dimiliki sesuatu. Film itu tidak hanya panjang, tetapi juga sangat membosankan.',
      },
      {
        id: "gcj-q9",
        type: "multiple-choice",
        question:
          "I have a lot of work to do, ________ I cannot go out tonight.",
        options: ["a. for", "b. so", "c. but", "d. nor"],
        correctAnswer: "b. so",
        reason:
          '"So" digunakan untuk menunjukkan hasil atau akibat. Karena banyak pekerjaan → hasilnya tidak bisa keluar malam ini.',
      },
      {
        id: "gcj-q10",
        type: "multiple-choice",
        question:
          "________ the teacher ________ the students were surprised by the announcement.",
        options: [
          "a. Neither / nor",
          "b. Either / nor",
          "c. Both / or",
          "d. Not only / and",
        ],
        correctAnswer: "a. Neither / nor",
        reason:
          '"Neither...nor" adalah satu-satunya pasangan konjungsi korelatif yang valid di antara pilihan yang ada. "Either/nor", "Both/or", dan "Not only/and" bukan pasangan yang benar.',
      },
      {
        id: "gcj-q11",
        type: "multiple-choice",
        question:
          "She bought a new dress, ________ she didn't have any shoes to match.",
        options: ["a. and", "b. yet", "c. so", "d. or"],
        correctAnswer: "b. yet",
        reason:
          '"Yet" digunakan untuk kontras yang tidak terduga atau ironis. Membeli gaun baru namun tidak punya sepatu yang cocok adalah situasi yang ironis.',
      },
      {
        id: "gcj-q12",
        type: "multiple-choice",
        question:
          "You must ________ finish your vegetables ________ go to bed without dessert.",
        options: [
          "a. both / and",
          "b. either / or",
          "c. neither / nor",
          "d. not only / but also",
        ],
        correctAnswer: "b. either / or",
        reason:
          '"Either...or" digunakan untuk menyajikan dua pilihan sebagai ultimatum. Harus memilih salah satu: habiskan sayuran ATAU tidur tanpa dessert.',
      },
      {
        id: "gcj-q13",
        type: "multiple-choice",
        question:
          "I don't have much money, ________ I am very happy with my life.",
        options: ["a. and", "b. so", "c. yet", "d. for"],
        correctAnswer: "c. yet",
        reason:
          '"Yet" menunjukkan kontras yang mengejutkan. Tidak punya banyak uang namun tetap sangat bahagia adalah hal yang tidak terduga.',
      },
      {
        id: "gcj-q14",
        type: "multiple-choice",
        question:
          "It was raining, ________ we stayed indoors and played board games.",
        options: ["a. but", "b. or", "c. so", "d. yet"],
        correctAnswer: "c. so",
        reason:
          '"So" menunjukkan akibat/hasil. Karena hujan → hasilnya kami tinggal di dalam dan bermain board game.',
      },
      {
        id: "gcj-q15",
        type: "multiple-choice",
        question:
          "________ did he lose his keys, ________ he also forgot his wallet.",
        options: [
          "a. Both / and",
          "b. Not only / but",
          "c. Either / or",
          "d. Neither / nor",
        ],
        correctAnswer: "b. Not only / but",
        reason:
          '"Not only...but (also)" digunakan untuk menekankan bahwa lebih dari satu hal buruk terjadi. Setelah "Not only" di awal kalimat, terjadi inversion: "Not only did he lose..." (bukan "Not only he lost...").',
      },
      {
        id: "gcj-q16",
        type: "multiple-choice",
        question:
          "I can't decide if I want to eat pizza ________ pasta for dinner.",
        options: ["a. or", "b. nor", "c. but", "d. yet"],
        correctAnswer: "a. or",
        reason:
          '"Or" digunakan untuk menunjukkan pilihan sederhana antara dua hal. Memilih antara pizza atau pasta.',
      },
      {
        id: "gcj-q17",
        type: "multiple-choice",
        question:
          "Neither the manager ________ the employees knew about the power outage.",
        options: ["a. or", "b. and", "c. nor", "d. but"],
        correctAnswer: "c. nor",
        reason:
          '"Neither...nor" adalah pasangan konjungsi korelatif yang benar. Setelah "Neither", selalu diikuti "nor" (bukan or, and, atau but).',
      },
      {
        id: "gcj-q18",
        type: "multiple-choice",
        question:
          "He is very rich, ________ he lives in a very small and simple house.",
        options: ["a. for", "b. so", "c. and", "d. yet"],
        correctAnswer: "d. yet",
        reason:
          '"Yet" menunjukkan kontras yang mengejutkan. Sangat kaya namun tinggal di rumah kecil dan sederhana adalah kontras yang tidak terduga.',
      },
      {
        id: "gcj-q19",
        type: "multiple-choice",
        question:
          "Both my mother ________ my father enjoy gardening on weekends.",
        options: ["a. or", "b. and", "c. nor", "d. but also"],
        correctAnswer: "b. and",
        reason:
          '"Both...and" adalah pasangan konjungsi korelatif yang benar. Setelah "Both", selalu diikuti "and".',
      },
      {
        id: "gcj-q20",
        type: "multiple-choice",
        question: "I didn't go to the gym, ________ I was feeling a bit sick.",
        options: ["a. for", "b. so", "c. yet", "d. or"],
        correctAnswer: "a. for",
        reason:
          '"For" digunakan untuk menjelaskan alasan/sebab (mirip "because", namun lebih formal). Tidak pergi ke gym FOR (karena) merasa sedikit sakit. Berbeda dengan "so" yang menunjukkan akibat.',
      },
      // ── PART 2: Translate to English (10 Soal) ──
      {
        id: "gcj-q21",
        type: "short-answer",
        question: "Terjemahkan: Saya suka kopi, tetapi saya tidak suka teh.",
        correctAnswer: "I like coffee, but I don't like tea.",
        reason:
          '"But" digunakan untuk kontras antara dua hal yang berlawanan: suka kopi TAPI tidak suka teh.',
      },
      {
        id: "gcj-q22",
        type: "short-answer",
        question:
          "Terjemahkan: Dia tidak hanya pintar, tetapi juga sangat rendah hati.",
        correctAnswer: "He is not only smart, but also very humble.",
        reason:
          '"Not only...but also" digunakan untuk menekankan dua kualitas positif sekaligus pada satu orang.',
      },
      {
        id: "gcj-q23",
        type: "short-answer",
        question:
          "Terjemahkan: Kamu bisa memilih antara belajar sekarang atau gagal dalam tes besok.",
        correctAnswer: "You can either study now or fail the test tomorrow.",
        reason:
          '"Either...or" digunakan untuk menyajikan dua pilihan: belajar sekarang ATAU gagal dalam tes besok.',
      },
      {
        id: "gcj-q24",
        type: "short-answer",
        question:
          "Terjemahkan: Baik Ayah maupun Ibu tidak setuju dengan rencana itu.",
        correctAnswer: "Neither Father nor Mother agreed with the plan.",
        reason:
          '"Neither...nor" digunakan karena KEDUANYA tidak setuju — negatif untuk kedua subjek sekaligus.',
      },
      {
        id: "gcj-q25",
        type: "short-answer",
        question:
          "Terjemahkan: Dia sedang sakit, jadi dia tidak pergi ke kantor.",
        correctAnswer: "He was sick, so he didn't go to the office.",
        reason:
          '"So" digunakan untuk akibat/hasil langsung: sakit → tidak pergi ke kantor. Bukan "but/yet" karena ini konsekuensi, bukan kontras.',
      },
      {
        id: "gcj-q26",
        type: "short-answer",
        question: "Terjemahkan: Baik Ani maupun Budi menyukai musik klasik.",
        correctAnswer: "Both Ani and Budi like classical music.",
        reason:
          '"Both...and" digunakan karena KEDUANYA (Ani dan Budi) menyukai musik — positif untuk dua subjek sekaligus.',
      },
      {
        id: "gcj-q27",
        type: "short-answer",
        question:
          "Terjemahkan: Aku ingin membeli mobil baru, namun aku tidak punya cukup uang.",
        correctAnswer:
          "I want to buy a new car, yet I don't have enough money.",
        reason:
          '"Yet" digunakan untuk kontras mengejutkan: ingin membeli mobil NAMUN tidak punya uang cukup. "But" juga bisa, tapi "yet" lebih menekankan ironinya.',
      },
      {
        id: "gcj-q28",
        type: "short-answer",
        question:
          "Terjemahkan: Dia tidak makan daging, dan dia juga tidak makan ikan.",
        correctAnswer: "He doesn't eat meat, nor does he eat fish.",
        reason:
          '"Nor" melanjutkan kalimat negatif. Perhatikan inversion setelah "nor": "nor does he eat" — bukan "nor he eats".',
      },
      {
        id: "gcj-q29",
        type: "short-answer",
        question:
          "Terjemahkan: Kita bisa pergi ke Bali atau ke Lombok untuk liburan nanti.",
        correctAnswer: "We can go to Bali or Lombok for our next holiday.",
        reason:
          '"Or" digunakan untuk pilihan sederhana antara dua tujuan liburan.',
      },
      {
        id: "gcj-q30",
        type: "short-answer",
        question:
          "Terjemahkan: Masakan ini tidak hanya enak, tetapi juga sehat.",
        correctAnswer: "This food is not only delicious, but also healthy.",
        reason:
          '"Not only...but also" digunakan untuk menekankan dua kualitas: TIDAK HANYA enak TETAPI JUGA sehat.',
      },
      // ── PART 3: Fill in the Blank (10 Soal) ──
      {
        id: "gcj-q31",
        type: "short-answer",
        question: "I will buy either a new laptop ________ a new smartphone.",
        correctAnswer: "or",
        reason:
          '"Either...or" adalah pasangan korelatif yang wajib. Setelah "either" selalu gunakan "or". "nor" salah karena pasangan neither; "and" salah karena "either...and" tidak ada; "but" salah karena kontras bukan pilihan.',
      },
      {
        id: "gcj-q32",
        type: "short-answer",
        question: "He was hungry, ________ he made himself a large sandwich.",
        correctAnswer: "so",
        reason:
          '"So" menunjukkan akibat/hasil: lapar → membuat sandwich. "but/yet" salah karena lapar lalu makan bukan kontras. "for" salah karena klausa kedua adalah akibat, bukan alasan.',
      },
      {
        id: "gcj-q33",
        type: "short-answer",
        question:
          "Neither the blue shirt ________ the red one fits me properly.",
        correctAnswer: "nor",
        reason:
          '"Neither...nor" adalah pasangan korelatif yang wajib. "or" salah karena pasangan either; "and" salah karena "neither...and" tidak ada; "but" salah karena bukan pasangan korelatif neither.',
      },
      {
        id: "gcj-q34",
        type: "short-answer",
        question:
          "She didn't study for the test, ________ she managed to get an A.",
        correctAnswer: "yet",
        reason:
          '"Yet" menunjukkan kontras mengejutkan: tidak belajar TAPI dapat nilai A. "so" salah karena akibat logis tidak belajar bukan dapat A. "and" salah karena hanya menambahkan tanpa kontras. "for" salah karena klausa kedua bukan alasan.',
      },
      {
        id: "gcj-q35",
        type: "short-answer",
        question:
          "Not only did she win the race, ________ she also broke the world record.",
        correctAnswer: "but",
        reason:
          '"Not only...but (also)" adalah pasangan korelatif yang wajib. "and" salah karena "not only...and" tidak ada; "yet" salah karena untuk kontras bukan penambahan; "so" salah karena untuk akibat.',
      },
      {
        id: "gcj-q36",
        type: "short-answer",
        question:
          "You can stay here with me, ________ you can go home with your brother.",
        correctAnswer: "or",
        reason:
          '"Or" menunjukkan dua pilihan setara. "and" salah karena menggabungkan bukan memilih. "but" salah karena kontras. "so" salah karena akibat.',
      },
      {
        id: "gcj-q37",
        type: "short-answer",
        question: "Both the cat ________ the dog are sleeping on the sofa.",
        correctAnswer: "and",
        reason:
          '"Both...and" adalah pasangan korelatif yang wajib. "or" salah karena pasangan either; "nor" salah karena pasangan neither; "but" salah karena "both...but" bukan pasangan korelatif.',
      },
      {
        id: "gcj-q38",
        type: "short-answer",
        question:
          "I don't like horror movies, ________ do I like action movies.",
        correctAnswer: "nor",
        reason:
          '"Nor" melanjutkan kalimat negatif dengan inversion (nor do I). "or" salah karena tidak idiomatis untuk konteks negatif dengan inversion. "but" salah karena tidak membutuhkan inversion. "so" salah karena akibat.',
      },
      {
        id: "gcj-q39",
        type: "short-answer",
        question:
          "It was a very long journey, ________ it was worth every minute.",
        correctAnswer: "yet",
        reason:
          '"Yet" menunjukkan kontras mengejutkan: panjang NAMUN tetap berharga. "so" salah karena perjalanan panjang tidak secara logis menghasilkan "berharga". "but" juga bisa, tapi "yet" lebih kuat menekankan kejutan. "and" salah karena hanya menambahkan.',
      },
      {
        id: "gcj-q40",
        type: "short-answer",
        question: "He is neither rich ________ famous, but he is very content.",
        correctAnswer: "nor",
        reason:
          '"Neither...nor" adalah pasangan korelatif yang wajib. "or" salah karena "neither...or" tidak gramatikal; "and" salah karena "neither...and" tidak ada; "but" sudah digunakan di klausa berikutnya dan bukan pasangan neither.',
      },
    ],
  },
  {
    id: "grammar-12",
    track: "grammar",
    day: 12,
    title: "Preposition",
    subtitle: "Prepositions of Time & Place — In, On, At",
    overview:
      "Materi grammar tentang preposisi: penggunaan in, on, dan at untuk waktu (15 soal) dan tempat (15 soal). Dilengkapi penjelasan lengkap dan latihan fill in the blank.",
    materialSections: [
      {
        title: "Prepositions of Time — In / On / At",
        points: [
          "IN — digunakan untuk: bulan (in June), tahun (in 2010), musim (in summer/spring), abad/dekade (in the 1940s), bagian hari (in the morning / afternoon / evening), periode durasi (in ten minutes).",
          "ON — digunakan untuk: hari dalam seminggu (on Monday, on Saturdays), tanggal tertentu (on June 15th), hari spesial (on Christmas Day, on New Year's Eve, on my birthday).",
          "AT — digunakan untuk: waktu jam yang spesifik (at 9:00 AM), titik waktu (at noon, at midnight), ungkapan tetap: at night, at the weekend (British English).",
          "Aturan umum: IN (periode panjang) > ON (hari/tanggal) > AT (titik waktu spesifik).",
          "Zero preposition: tidak pakai preposisi sebelum next/last/this/every. Contoh: I'll see you next Tuesday (bukan 'on next Tuesday').",
        ],
      },
      {
        title: "Prepositions of Place — In / On / At",
        points: [
          "IN — digunakan untuk: ruang tertutup/enclosed space (in the car, in the fridge, in the room), kota/negara/pulau/wilayah (in Bali, in France, in a village), pohon (in the tree — hewan bertengger di antara cabang).",
          "ON — digunakan untuk: permukaan (on the table, on the wall, on the ceiling, on the floor), kendaraan umum (on the bus/train/plane), media/jaringan (on TV, on the internet).",
          "AT — digunakan untuk: titik/lokasi spesifik sebagai referensi (at the bus stop, at the traffic light, at the top of the page), institusi/tempat kerja (at school, at the bank, at Oxford University), alamat (at 21 Baker Street).",
          "Knock ON the door (permukaan pintu) — berbeda dengan standing AT the door (posisi di depan pintu).",
        ],
      },
    ],
    exercises: [
      // ── PART 1: Prepositions of Time (15 Soal) ──
      {
        id: "gprep-q1",
        type: "short-answer",
        question: "My birthday is ________ June 15th.",
        correctAnswer: "on",
        reason:
          '"On" digunakan untuk tanggal spesifik. June 15th adalah tanggal → gunakan ON.',
      },
      {
        id: "gprep-q2",
        type: "short-answer",
        question: "We usually have lunch ________ noon.",
        correctAnswer: "at",
        reason:
          '"At" digunakan untuk titik waktu spesifik. Noon (tengah hari) adalah titik waktu → gunakan AT.',
      },
      {
        id: "gprep-q3",
        type: "short-answer",
        question: "I love going to the beach ________ the summer.",
        correctAnswer: "in",
        reason:
          '"In" digunakan untuk musim. The summer adalah musim → gunakan IN.',
      },
      {
        id: "gprep-q4",
        type: "short-answer",
        question: "The meeting starts exactly ________ 9:00 AM.",
        correctAnswer: "at",
        reason:
          '"At" digunakan untuk waktu jam yang spesifik. 9:00 AM adalah jam → gunakan AT.',
      },
      {
        id: "gprep-q5",
        type: "short-answer",
        question: "They moved to this city ________ 2010.",
        correctAnswer: "in",
        reason: '"In" digunakan untuk tahun. 2010 adalah tahun → gunakan IN.',
      },
      {
        id: "gprep-q6",
        type: "short-answer",
        question: "I always feel sleepy ________ the afternoon.",
        correctAnswer: "in",
        reason:
          '"In" digunakan untuk bagian hari: in the morning, in the afternoon, in the evening. Pengecualian: at night (bukan "in the night").',
      },
      {
        id: "gprep-q7",
        type: "short-answer",
        question: "We don't have school ________ Saturdays.",
        correctAnswer: "on",
        reason:
          '"On" digunakan untuk hari-hari dalam seminggu. Saturdays adalah hari → gunakan ON.',
      },
      {
        id: "gprep-q8",
        type: "short-answer",
        question: "What do you usually do ________ Christmas Day?",
        correctAnswer: "on",
        reason:
          '"On" digunakan untuk hari-hari spesial (on Christmas Day, on New Year\'s Day). Christmas Day adalah hari spesial → gunakan ON.',
      },
      {
        id: "gprep-q9",
        type: "short-answer",
        question: "It gets very cold here ________ night.",
        correctAnswer: "at",
        reason:
          '"At night" adalah ungkapan tetap dalam bahasa Inggris. Night menggunakan AT (bukan "in the night" untuk ungkapan umum).',
      },
      {
        id: "gprep-q10",
        type: "short-answer",
        question: "The flowers bloom ________ spring.",
        correctAnswer: "in",
        reason:
          '"In" digunakan untuk musim. Spring adalah musim → gunakan IN (in spring / in the spring).',
      },
      {
        id: "gprep-q11",
        type: "short-answer",
        question: "I'll see you ________ next Tuesday.",
        correctAnswer: "on",
        reason:
          '"On" digunakan untuk hari tertentu. Tuesday adalah hari → gunakan ON. Catatan: "I\'ll see you next Tuesday" (tanpa preposisi) juga diterima secara informal.',
      },
      {
        id: "gprep-q12",
        type: "short-answer",
        question: "She finished her homework ________ ten minutes.",
        correctAnswer: "in",
        reason:
          '"In" digunakan untuk periode/durasi waktu. In ten minutes = dalam waktu sepuluh menit.',
      },
      {
        id: "gprep-q13",
        type: "short-answer",
        question: "We are going to have a party ________ New Year's Eve.",
        correctAnswer: "on",
        reason:
          '"On" digunakan untuk hari atau tanggal spesial. New Year\'s Eve adalah hari spesial → gunakan ON.',
      },
      {
        id: "gprep-q14",
        type: "short-answer",
        question: "My grandfather was born ________ the 1940s.",
        correctAnswer: "in",
        reason:
          '"In" digunakan untuk dekade. The 1940s adalah dekade → gunakan IN.',
      },
      {
        id: "gprep-q15",
        type: "short-answer",
        question: "I like to read a book ________ the weekend.",
        correctAnswer: "at",
        reason:
          '"At the weekend" adalah ungkapan British English yang umum digunakan. American English menggunakan "on the weekend". Keduanya diterima; dalam konteks kursus ini gunakan AT.',
      },
      // ── PART 2: Prepositions of Place (15 Soal) ──
      {
        id: "gprep-q16",
        type: "short-answer",
        question: "My keys are ________ the table.",
        correctAnswer: "on",
        reason:
          '"On" digunakan untuk permukaan. Kunci berada di atas permukaan meja → gunakan ON.',
      },
      {
        id: "gprep-q17",
        type: "short-answer",
        question: "She is waiting for you ________ the bus stop.",
        correctAnswer: "at",
        reason:
          '"At" digunakan untuk titik/lokasi spesifik. Bus stop adalah titik pertemuan yang spesifik → gunakan AT.',
      },
      {
        id: "gprep-q18",
        type: "short-answer",
        question: "I left my phone ________ the car.",
        correctAnswer: "in",
        reason:
          '"In" digunakan untuk ruang tertutup (enclosed space). Mobil adalah ruang tertutup → gunakan IN.',
      },
      {
        id: "gprep-q19",
        type: "short-answer",
        question: "There is a beautiful painting ________ the wall.",
        correctAnswer: "on",
        reason:
          '"On" digunakan untuk permukaan. Dinding adalah permukaan → lukisan yang terpasang di dinding menggunakan ON.',
      },
      {
        id: "gprep-q20",
        type: "short-answer",
        question: "He lives ________ a small village in France.",
        correctAnswer: "in",
        reason:
          '"In" digunakan untuk desa, kota, negara, wilayah. Village adalah suatu tempat berpenghuni → gunakan IN.',
      },
      {
        id: "gprep-q21",
        type: "short-answer",
        question: "Turn left ________ the next traffic light.",
        correctAnswer: "at",
        reason:
          '"At" digunakan untuk titik/lokasi spesifik sebagai referensi. Traffic light adalah titik referensi yang spesifik → gunakan AT.',
      },
      {
        id: "gprep-q22",
        type: "short-answer",
        question: "I saw a fly ________ the ceiling.",
        correctAnswer: "on",
        reason:
          '"On" digunakan untuk permukaan, termasuk langit-langit (ceiling). Lalat yang hinggap di langit-langit menggunakan ON karena langit-langit adalah permukaan.',
      },
      {
        id: "gprep-q23",
        type: "short-answer",
        question: "We spent our holiday ________ Bali.",
        correctAnswer: "in",
        reason:
          '"In" digunakan untuk pulau, daerah, atau wilayah geografis. Bali adalah pulau/daerah → gunakan IN.',
      },
      {
        id: "gprep-q24",
        type: "short-answer",
        question: "Write your name ________ the top of the page.",
        correctAnswer: "at",
        reason:
          '"At" digunakan untuk posisi/titik tertentu. "At the top" merujuk pada posisi tertentu di halaman → gunakan AT.',
      },
      {
        id: "gprep-q25",
        type: "short-answer",
        question: "Is there any milk ________ the fridge?",
        correctAnswer: "in",
        reason:
          '"In" digunakan untuk ruang tertutup. Kulkas adalah wadah tertutup → gunakan IN.',
      },
      {
        id: "gprep-q26",
        type: "short-answer",
        question: "They are sitting ________ the floor.",
        correctAnswer: "on",
        reason:
          '"On" digunakan untuk permukaan. Lantai adalah permukaan → duduk di lantai menggunakan ON.',
      },
      {
        id: "gprep-q27",
        type: "short-answer",
        question: "My brother works ________ a bank.",
        correctAnswer: "at",
        reason:
          '"At" digunakan untuk institusi atau tempat kerja spesifik. Bank adalah tempat kerja → gunakan AT.',
      },
      {
        id: "gprep-q28",
        type: "short-answer",
        question: "Someone is knocking ________ the door.",
        correctAnswer: "on",
        reason:
          '"Knock on the door" adalah ungkapan tetap — mengetuk berarti memukul permukaan pintu → gunakan ON.',
      },
      {
        id: "gprep-q29",
        type: "short-answer",
        question: "I studied ________ Oxford University.",
        correctAnswer: "at",
        reason:
          '"At" digunakan untuk universitas dan institusi pendidikan. Contoh: at school, at university, at college → gunakan AT.',
      },
      {
        id: "gprep-q30",
        type: "short-answer",
        question: "Look at that bird ________ the tree!",
        correctAnswer: "in",
        reason:
          '"In a tree" digunakan untuk hewan/burung yang bertengger di antara cabang-cabang pohon. Berbeda dengan "on a tree" yang tidak lazim untuk hewan hidup.',
      },
    ],
  },
  {
    id: "grammar-13",
    track: "grammar",
    day: 13,
    title: "Adjective Phrase",
    subtitle: "Frasa sifat untuk mendeskripsikan noun dengan lebih detail",
    overview:
      "Materi grammar tentang adjective phrase: struktur, posisi sebelum/sesudah noun, dan penggunaannya dalam kalimat.",
    materialSections: [
      {
        title: "Konsep Dasar Adjective Phrase",
        points: [
          "Adjective phrase adalah frasa yang inti katanya adjective (kata sifat).",
          "Fungsi utama: menerangkan noun atau pronoun dengan informasi tambahan.",
          "Bisa muncul setelah linking verb: She is very kind to everyone.",
          "Bisa muncul setelah noun (post-modifier): students eager to learn.",
        ],
      },
      {
        title: "Pola Umum",
        points: [
          "very/really/quite + adjective (very happy, really useful)",
          "adjective + enough (strong enough, old enough)",
          "adjective + to-infinitive (ready to go, easy to understand)",
          "adjective + prepositional phrase (afraid of dogs, interested in art)",
        ],
      },
    ],
    exercises: [
      {
        id: "gadjp-q1",
        type: "short-answer",
        question: "She is ________ kind to refuse your request. (very)",
        correctAnswer: "very",
        reason: "Adjective phrase: very + adjective (very kind).",
      },
      {
        id: "gadjp-q2",
        type: "short-answer",
        question: "The task is easy ________ understand. (to)",
        correctAnswer: "to",
        reason: "Pola adjective + to-infinitive: easy to understand.",
      },
      {
        id: "gadjp-q3",
        type: "short-answer",
        question: "Rina is interested ________ painting. (in)",
        correctAnswer: "in",
        reason: "Adjective phrase: interested in + noun/gerund.",
      },
      {
        id: "gadjp-q4",
        type: "short-answer",
        question: "They are proud ________ their progress. (of)",
        correctAnswer: "of",
        reason: "Adjective phrase: proud of + noun.",
      },
      {
        id: "gadjp-q5",
        type: "short-answer",
        question: "He is old enough ________ drive. (to)",
        correctAnswer: "to",
        reason: "Pola adjective + enough + to-infinitive.",
      },
      {
        id: "gadjp-q6",
        type: "short-answer",
        question: "The students eager to learn are ________ class. (in)",
        correctAnswer: "in",
        reason:
          "Kata 'eager to learn' menerangkan students; kalimat lengkap: are in class.",
      },
      {
        id: "gadjp-q7",
        type: "short-answer",
        question: "This book is useful ________ beginners. (for)",
        correctAnswer: "for",
        reason: "Adjective phrase: useful for + noun.",
      },
      {
        id: "gadjp-q8",
        type: "short-answer",
        question: "I am happy ________ your result. (with)",
        correctAnswer: "with",
        reason: "Adjective phrase: happy with + noun.",
      },
      {
        id: "gadjp-q9",
        type: "short-answer",
        question: "The room is big enough ________ all of us. (for)",
        correctAnswer: "for",
        reason: "Pola: adjective + enough + for + object.",
      },
      {
        id: "gadjp-q10",
        type: "short-answer",
        question: "She looks tired ________ the long trip. (after)",
        correctAnswer: "after",
        reason:
          "Adjective phrase + keterangan sebab/waktu: tired after the long trip.",
      },
    ],
  },
  {
    id: "grammar-14",
    track: "grammar",
    day: 14,
    title: "Adverbial Phrase",
    subtitle: "Frasa keterangan untuk waktu, tempat, cara, alasan, dan tujuan",
    overview:
      "Materi grammar tentang adverbial phrase: fungsi menjelaskan verb/adjective/kalimat dan posisi yang benar.",
    materialSections: [
      {
        title: "Konsep Dasar Adverbial Phrase",
        points: [
          "Adverbial phrase memberi keterangan tambahan: kapan, di mana, bagaimana, mengapa, untuk apa.",
          "Bisa muncul di awal, tengah, atau akhir kalimat tergantung fokus informasi.",
          "Contoh: in the morning (time), with great care (manner), at school (place).",
        ],
      },
      {
        title: "Contoh Fungsi",
        points: [
          "Time: We will meet after lunch.",
          "Place: She waited at the gate.",
          "Manner: He spoke with confidence.",
          "Purpose/Reason: They train for better results.",
        ],
      },
    ],
    exercises: [
      {
        id: "gadvp-q1",
        type: "short-answer",
        question: "We usually study ________ the evening. (in)",
        correctAnswer: "in",
        reason: "Adverbial phrase of time: in the evening.",
      },
      {
        id: "gadvp-q2",
        type: "short-answer",
        question: "She answered the question ________ confidence. (with)",
        correctAnswer: "with",
        reason: "Adverbial phrase of manner: with confidence.",
      },
      {
        id: "gadvp-q3",
        type: "short-answer",
        question: "They waited ________ the bus stop. (at)",
        correctAnswer: "at",
        reason: "Adverbial phrase of place: at the bus stop.",
      },
      {
        id: "gadvp-q4",
        type: "short-answer",
        question: "I will call you ________ dinner. (after)",
        correctAnswer: "after",
        reason: "Adverbial phrase of time: after dinner.",
      },
      {
        id: "gadvp-q5",
        type: "short-answer",
        question: "He drives ________ great care. (with)",
        correctAnswer: "with",
        reason: "Adverbial phrase of manner: with great care.",
      },
      {
        id: "gadvp-q6",
        type: "short-answer",
        question: "________ the weekend, we visit our grandparents. (On)",
        correctAnswer: "On",
        reason: "Adverbial phrase of time di awal kalimat: On the weekend.",
      },
      {
        id: "gadvp-q7",
        type: "short-answer",
        question: "She practices every day ________ improve her speaking. (to)",
        correctAnswer: "to",
        reason: "Adverbial phrase of purpose: to improve her speaking.",
      },
      {
        id: "gadvp-q8",
        type: "short-answer",
        question: "The kids played ________ the park. (in)",
        correctAnswer: "in",
        reason: "Adverbial phrase of place: in the park.",
      },
      {
        id: "gadvp-q9",
        type: "short-answer",
        question: "He finished the task ________ two hours. (in)",
        correctAnswer: "in",
        reason: "Adverbial phrase of duration/result: in two hours.",
      },
      {
        id: "gadvp-q10",
        type: "short-answer",
        question: "We stayed home ________ the heavy rain. (because of)",
        correctAnswer: "because of",
        reason: "Adverbial phrase of reason: because of the heavy rain.",
      },
    ],
  },
  {
    id: "grammar-15",
    track: "grammar",
    day: 15,
    title: "Prepositional Phrase",
    subtitle: "Frasa preposisi sebagai adjective phrase atau adverbial phrase",
    overview:
      "Materi grammar tentang prepositional phrase: struktur preposition + object, serta fungsinya sebagai modifier.",
    materialSections: [
      {
        title: "Konsep Dasar Prepositional Phrase",
        points: [
          "Struktur: preposition + object (noun/pronoun/gerund).",
          "Contoh: in the room, on the table, with my friend, after studying.",
          "Bisa menerangkan noun (adjectival) atau verb/kalimat (adverbial).",
        ],
      },
      {
        title: "Fungsi dalam Kalimat",
        points: [
          "Adjectival: The book on the shelf is mine.",
          "Adverbial: She sat on the chair.",
          "Object preposition harus object pronoun: with me, for him, between us.",
        ],
      },
    ],
    exercises: [
      {
        id: "gpp-q1",
        type: "short-answer",
        question: "The keys ________ the drawer are missing. (in)",
        correctAnswer: "in",
        reason: "Prepositional phrase in the drawer menerangkan noun 'keys'.",
      },
      {
        id: "gpp-q2",
        type: "short-answer",
        question: "She is sitting ________ the sofa. (on)",
        correctAnswer: "on",
        reason: "Prepositional phrase of place: on the sofa.",
      },
      {
        id: "gpp-q3",
        type: "short-answer",
        question: "I went to the library ________ my friend. (with)",
        correctAnswer: "with",
        reason: "Prepositional phrase with my friend.",
      },
      {
        id: "gpp-q4",
        type: "short-answer",
        question: "The boy ________ a blue jacket is my cousin. (in)",
        correctAnswer: "in",
        reason: "Prepositional phrase in a blue jacket menerangkan noun 'boy'.",
      },
      {
        id: "gpp-q5",
        type: "short-answer",
        question: "Please put the cups ________ the table. (on)",
        correctAnswer: "on",
        reason: "Prepositional phrase of place: on the table.",
      },
      {
        id: "gpp-q6",
        type: "short-answer",
        question: "Between you and ________, this test is difficult. (me)",
        correctAnswer: "me",
        reason: "Setelah preposition harus object pronoun: me.",
      },
      {
        id: "gpp-q7",
        type: "short-answer",
        question: "We stayed at home ________ the storm. (during)",
        correctAnswer: "during",
        reason: "Prepositional phrase of time: during the storm.",
      },
      {
        id: "gpp-q8",
        type: "short-answer",
        question: "The photo ________ the wall is very old. (on)",
        correctAnswer: "on",
        reason: "Prepositional phrase on the wall menerangkan noun 'photo'.",
      },
      {
        id: "gpp-q9",
        type: "short-answer",
        question: "She learned English ________ watching movies. (by)",
        correctAnswer: "by",
        reason: "Prepositional phrase by + gerund menunjukkan cara.",
      },
      {
        id: "gpp-q10",
        type: "short-answer",
        question: "We arrived ________ the airport at 6 a.m. (at)",
        correctAnswer: "at",
        reason: "Prepositional phrase of place: at the airport.",
      },
    ],
  },
  {
    id: "grammar-16",
    track: "grammar",
    day: 16,
    title: "Verb Phrase",
    subtitle: "Frasa verba: auxiliary, modal, dan main verb",
    overview:
      "Materi grammar tentang verb phrase: kombinasi kata kerja utama dan kata kerja bantu dalam berbagai bentuk tense/modal.",
    materialSections: [
      {
        title: "Konsep Dasar Verb Phrase",
        points: [
          "Verb phrase terdiri dari main verb, bisa ditambah auxiliary/modal.",
          "Contoh: is studying, has finished, will go, can speak, should have told.",
          "Urutan umum: modal + have + been + V-ing/V3 (sesuai kebutuhan).",
        ],
      },
      {
        title: "Pola Umum",
        points: [
          "Present continuous: am/is/are + V-ing",
          "Present perfect: has/have + V3",
          "Modal: can/should/must + V1",
          "Passive: be + V3",
        ],
      },
    ],
    exercises: [
      {
        id: "gvp-q1",
        type: "short-answer",
        question: "She ________ studying right now. (is)",
        correctAnswer: "is",
        reason: "Present continuous: is + V-ing.",
      },
      {
        id: "gvp-q2",
        type: "short-answer",
        question: "They ________ finished the project. (have)",
        correctAnswer: "have",
        reason: "Present perfect: have + V3 (finished).",
      },
      {
        id: "gvp-q3",
        type: "short-answer",
        question: "He ________ speak English fluently. (can)",
        correctAnswer: "can",
        reason: "Modal + V1: can speak.",
      },
      {
        id: "gvp-q4",
        type: "short-answer",
        question: "The report ________ written yesterday. (was)",
        correctAnswer: "was",
        reason: "Passive voice past: was + V3.",
      },
      {
        id: "gvp-q5",
        type: "short-answer",
        question: "I ________ waiting for you for an hour. (have been)",
        correctAnswer: "have been",
        reason: "Present perfect continuous: have been + V-ing.",
      },
      {
        id: "gvp-q6",
        type: "short-answer",
        question: "We ________ go now if you are ready. (can)",
        correctAnswer: "can",
        reason: "Modal + V1: can go.",
      },
      {
        id: "gvp-q7",
        type: "short-answer",
        question: "She ________ not finished her lunch yet. (has)",
        correctAnswer: "has",
        reason: "Present perfect negative: has not + V3.",
      },
      {
        id: "gvp-q8",
        type: "short-answer",
        question: "They ________ be arriving soon. (will)",
        correctAnswer: "will",
        reason: "Future verb phrase: will be arriving.",
      },
      {
        id: "gvp-q9",
        type: "short-answer",
        question: "You ________ submit the form today. (must)",
        correctAnswer: "must",
        reason: "Modal obligation: must + V1.",
      },
      {
        id: "gvp-q10",
        type: "short-answer",
        question: "The students ________ being tested now. (are)",
        correctAnswer: "are",
        reason: "Passive continuous: are being + V3.",
      },
    ],
  },
  {
    id: "grammar-17",
    track: "grammar",
    day: 17,
    title: "Gerund & Infinitive Phrase",
    subtitle: "Perbedaan pola verb + gerund dan verb + to-infinitive",
    overview:
      "Materi grammar tentang gerund phrase dan infinitive phrase: fungsi, pola verb tertentu, serta perbedaan makna dasar.",
    materialSections: [
      {
        title: "Konsep Dasar",
        points: [
          "Gerund phrase: V-ing berfungsi seperti noun. Contoh: Swimming every morning is healthy.",
          "Infinitive phrase: to + V1, sering untuk tujuan/rencana. Contoh: I want to improve.",
          "Setelah preposition gunakan gerund, bukan infinitive.",
        ],
      },
      {
        title: "Pola Verb Umum",
        points: [
          "Verb + gerund: enjoy, avoid, finish, keep, mind",
          "Verb + to-infinitive: want, decide, plan, hope, need",
          "Verb + gerund/to-infinitive (makna bisa beda): remember, stop, try",
        ],
      },
    ],
    exercises: [
      {
        id: "ggip-q1",
        type: "short-answer",
        question: "I enjoy ________ books at night. (reading)",
        correctAnswer: "reading",
        reason: "Enjoy diikuti gerund (V-ing).",
      },
      {
        id: "ggip-q2",
        type: "short-answer",
        question: "She decided ________ early. (to leave)",
        correctAnswer: "to leave",
        reason: "Decide diikuti to-infinitive.",
      },
      {
        id: "ggip-q3",
        type: "short-answer",
        question: "They avoided ________ late. (coming)",
        correctAnswer: "coming",
        reason: "Avoid diikuti gerund.",
      },
      {
        id: "ggip-q4",
        type: "short-answer",
        question: "We hope ________ you again soon. (to see)",
        correctAnswer: "to see",
        reason: "Hope diikuti to-infinitive.",
      },
      {
        id: "ggip-q5",
        type: "short-answer",
        question: "He is interested in ________ English. (learning)",
        correctAnswer: "learning",
        reason: "Setelah preposition 'in' harus gerund.",
      },
      {
        id: "ggip-q6",
        type: "short-answer",
        question: "My plan is ________ abroad next year. (to study)",
        correctAnswer: "to study",
        reason: "Infinitive phrase untuk rencana/tujuan.",
      },
      {
        id: "ggip-q7",
        type: "short-answer",
        question: "She kept ________ even when she was tired. (working)",
        correctAnswer: "working",
        reason: "Keep diikuti gerund.",
      },
      {
        id: "ggip-q8",
        type: "short-answer",
        question: "I need ________ this email now. (to send)",
        correctAnswer: "to send",
        reason: "Need umumnya diikuti to-infinitive.",
      },
      {
        id: "ggip-q9",
        type: "short-answer",
        question: "________ in public can be scary for some people. (Speaking)",
        correctAnswer: "Speaking",
        reason: "Gerund phrase sebagai subject kalimat.",
      },
      {
        id: "ggip-q10",
        type: "short-answer",
        question: "He stopped ________ because he was tired. (running)",
        correctAnswer: "running",
        reason: "Stop + gerund = berhenti melakukan aktivitas itu.",
      },
    ],
  },
];

export { basicGrammarLessons };
