import type { ModuleLesson } from "@/types/module";

// ── Advance Grammar Lessons ───────────────────────────────────────────────────

const advanceGrammarLessons: ModuleLesson[] = [
  // ── Day 2 · Noun Clause ──────────────────────────────────────────────────────
  {
    id: "adv-grammar-1",
    track: "grammar",
    day: 2,
    tutor: "Ms. Vita",
    title: "Noun Clause",
    subtitle:
      "NC of Question · Statement · Exclamation · Request — Omitting & Abridgement",
    overview:
      "Noun Clause (NC) adalah sub-clause yang berfungsi sebagai noun (singular). Terdapat 4 jenis NC berdasarkan conjunction: NC of Question (whether/if/wh-words), NC of Statement (that/the fact that), NC of Exclamation (what/how), dan NC of Request (that + subjunctive V1).",
    materialSections: [
      {
        title: "A. Pengertian Noun Clause",
        points: [
          "Noun Clause = sub-clause yang berfungsi sebagai NOUN di dalam kalimat.",
          "NC bersifat SINGULAR (tunggal) meskipun isinya jamak.",
          "",
          "Fungsi NC dalam kalimat:",
          "  1. Subject    : What you said is true.",
          "  2. Object     : I know that he is right.",
          "  3. Complement : The truth is that he lied.",
          "  4. Obj. Prep. : My decision depends on whether he will work harder.",
          "",
          "Formula umum NC: CONJ + S + V (statement word order — bukan question order!)",
        ],
      },
      {
        title: "B.1. NC of Question — Yes/No Question",
        points: [
          "Conjunction : WHETHER, IF",
          "Formula     : CONJ + S + V",
          "",
          "Perbedaan WHETHER dan IF:",
          "",
          "1) Jika ada 'or not' → WHETHER bisa langsung di depan 'or not',",
          "   sedangkan IF TIDAK bisa.",
          "   ✅ Abi knows WHETHER OR NOT Bella will come.",
          "   ✅ Abi knows whether Bella will come OR NOT.",
          "   ✅ Abi knows if Bella will come or not.",
          "   ❌ Abi knows if or not Bella will come.",
          "",
          "2) WHETHER bisa di awal kalimat (sebagai subject), IF TIDAK bisa.",
          "   ✅ WHETHER he will come or not is still uncertain.",
          "   ❌ If he will come or not is still uncertain.",
          "",
          "3) IF TIDAK bisa menjadi objek preposisi, WHETHER bisa.",
          "   ✅ My decision depends on WHETHER he will work harder or not.",
          "   ❌ My decision depends on IF he will work harder or not.",
        ],
      },
      {
        title: "B.1. NC of Question — WH-Question sebagai Pronoun",
        points: [
          "Conjunction : who, whoever, what, whatever, whom, whomever, which",
          "",
          "Fungsi:",
          "a) Sebagai SUBJECT NC:",
          "   WHO will come is my best friend.",
          "   S(NC)      V    CS",
          "",
          "b) Sebagai OBJECT NC:",
          "   He will employ WHOEVER will work hard.",
          "   S    V         [S      V    ]",
          "                  NC as object",
          "",
          "'Whoever' = siapa pun yang | 'Whatever' = apa pun yang",
          "   'Whomever' = siapa pun (object position dalam NC)",
        ],
      },
      {
        title: "B.1. NC of Question — WH-Question sebagai Modifier & Adverb",
        points: [
          "Sebagai MODIFIER (conjunction + noun):",
          "  Whose + noun + S+V : possessive (kepemilikan)",
          "  What  + noun + S+V : situation/condition/type",
          "  Which + noun + S+V : choice/pilihan 2 hal",
          "",
          "  e.g: The police are investigating WHOSE BAG was left in the bus.",
          "       I don't know WHICH BOOKS I should read.",
          "       I don't know WHAT COUNTRIES he likes.",
          "       → I think about WHOSE HOUSE it is.",
          "       → WHICH MUSEUM I needed to explore was determined by my teacher.",
          "       → WHAT PHENOMENON just happened was observed by them.",
          "       → I'm confused about WHAT FOOD I should make for this competition.",
          "",
          "Sebagai ADVERB (keterangan):",
          "  Conjunction: when (kapan), where (dimana), how (bagaimana), why (mengapa)",
          "  Formula: CONJ + S + V",
          "",
          "  How much + noun + S+V  (uncountable — seberapa banyak)",
          "  How many + noun + S+V  (countable — seberapa banyak)",
          "",
          "  e.g: We have not decided WHERE we will hold the event.",
          "       The question is WHEN he will go to Pare.",
          "       I cannot understand WHY my parents give me much money.",
          "       I don't know HOW we can repair this computer.",
          "       HOW MANY STUDENTS did a scientific research was still uncertain.",
          "       Our health depends on HOW MUCH WATER flows in our bodies.",
          "       → They forecast WHEN the heavy rain will come down.",
          "       → She asked WHERE her cat is.",
          "       → I learn about HOW gravity works.",
          "       → She tells us WHY the filters are broken.",
          "       → HOW MUCH WATER we drink will affect our health.",
          "       → I am astonished by HOW MANY audience came to my concert.",
        ],
      },
      {
        title: "B.1. Contoh Lengkap: NC as Pronoun (Ringkasan)",
        points: [
          "Formula: CONJ + S+V (sebagai NC) / CONJ + V (jika conj = subject NC)",
          "",
          "who / Whoever    + S+V / +V  → siapa / siapa pun yang",
          "whom / Whomever  + S+V       → kepada siapa / siapa pun (object)",
          "which / Whichever+ S+V / +V  → yang mana / yang mana pun (2 pilihan)",
          "what / Whatever  + S+V / +V  → apa / apa pun yang (subject)",
          "",
          "Contoh analisis lengkap:",
          "",
          "→ WHO will lead the meeting is decided by the board.",
          "   NC (subj)    ↑V          V(main)   O",
          "   'Who will lead...' = NC sebagai subject",
          "",
          "→ She asks WHICH I should finish first.",
          "   S    V   NC(obj) ↑S  V",
          "   'which I should finish first' = NC sebagai object",
          "",
          "→ They are interested in WHAT we learn today.",
          "   S    V           Prep   NC(O.Prep)  S  V",
          "   'what we learn today' = NC sebagai objek preposisi",
          "",
          "→ WHOM my mom selects as a secretary is my closest friend.",
          "   NC(subj)  S    V                   V(main)",
          "   'Whom my mom selects...' = NC sebagai subject",
          "",
          "→ WHOEVER will decide the schedule will be awarded.",
          "   NC(subj) + V                      V(main)",
          "   'Whoever' berfungsi sekaligus sebagai subject dalam NC",
          "",
          "→ She explains WHAT we should bring in the trip.",
          "   S    V       NC(obj)",
          "",
          "→ I deal with WHICH is the best.",
          "   S  V   Prep NC(O.Prep)",
        ],
      },
      {
        title: "B.2. NC of Statement",
        points: [
          "Conjunction: THAT, THE FACT THAT",
          "",
          "Perbedaan THAT dan THE FACT THAT:",
          "",
          "a) Keduanya bisa menjadi subject, TETAPI 'the fact that' TIDAK bisa",
          "   menjadi subject dalam 'anticipatory it'.",
          "   ✅ It is not generally known THAT the company is almost bankrupt.",
          "   ❌ It is not generally known THE FACT THAT the company is...",
          "   ✅ THAT / THE FACT THAT the company is almost bankrupt is not known.",
          "",
          "b) THE FACT THAT bisa menjadi objek preposisi, THAT tidak bisa.",
          "   ✅ He was irritated by THE FACT THAT his friend ate his cakes.",
          "   ❌ He was irritated by THAT his friend ate his cakes.",
        ],
      },
      {
        title: "B.3. NC of Exclamation  &  B.4. NC of Request",
        points: [
          "NC OF EXCLAMATION — Conjunction: WHAT, HOW",
          "",
          "  WHAT : what + a/an + adjective + nC singular",
          "         what + a/an + adjective",
          "         what + adjective + nC plural",
          "         what + adjective + nC uncountable",
          "  HOW  : how + adjective / adverb",
          "",
          "  e.g: He realized WHAT A HARD PROBLEM I face.",
          "       I am amazed at HOW BEAUTIFUL his wife is.",
          "",
          "═══════════════════════════════════",
          "",
          "NC OF REQUEST — Conjunction: THAT + V1 (Subjunctive)",
          "",
          "  ✦ NC of Request adalah objek dari verb yang mengandung makna",
          "    urgency, advisability, atau desirability.",
          "  ✦ Verb dalam NC of Request menggunakan PRESENT SUBJUNCTIVE (V1).",
          "",
          "  e.g: The doctor recommended that he TAKE a vacation.",
          "       He is requesting that a company car BE PLACED at the disposal.",
          "",
          "  Verb yang sering diikuti NC of Request:",
          "  advise, ask, beg, command, demand, desire, forbid, insist,",
          "  move, propose, recommend, request, require, stipulate, suggest, urge",
        ],
      },
      {
        title: "C. Perbedaan AC dan NC",
        points: [
          "1) Posisi conjunction AC ('who, whom, which, when, where, why')",
          "   selalu SETELAH NOUN, sedangkan NC tidak.",
          "",
          "   AC : The girl [WHO is singing the new song] is my friend.",
          "         ↑ ada noun 'the girl' sebelum conjunction",
          "   NC : [WHO is singing the new song] is my friend.",
          "         ↑ tidak ada antecedent, NC = subject",
          "",
          "2) 'That' dalam AC SELALU setelah noun,",
          "   'that' dalam NC boleh setelah noun atau tidak.",
          "",
          "   AC : I borrow your book THAT is red.",
          "   NC : It is an evidence THAT he is a thief.",
          "   NC : I know THAT you are smart.",
          "",
          "3) NC sebagai subject bersifat SINGULAR.",
          "   e.g: WHAT YOU DID hurts me. (hurts, bukan hurt)",
        ],
      },
      {
        title: "D. Omitting & Abridgement dalam NC",
        points: [
          "1) OMITTING:",
          "   Dari semua conjunction NC, hanya 'THAT' yang bisa dihilangkan",
          "   ketika 'that' berfungsi sebagai OBJECT.",
          "",
          "   e.g: I agree [that] education is essential for our life.",
          "        I agree education is essential for our life. ✅",
          "",
          "2) ABRIDGEMENT — mengubah NC menjadi TO INFINITIVE:",
          "",
          "   Syarat:",
          "   a. Conjunction berasal dari QUESTION WORD (wh-word)",
          "   b. Subject di sub clause = subject di main clause",
          "   c. Di sub clause ada MODAL (can, must, should, dll.)",
          "",
          "   e.g: I don't know what I SHOULD do.",
          "        → I don't know WHAT TO DO.",
          "",
          "        She doesn't know where she SHOULD go.",
          "        → She doesn't know WHERE TO GO.",
          "",
          "        He asked me how he CAN fix the machine.",
          "        → He asked me HOW TO FIX the machine.",
        ],
      },
    ],
    exercises: [
      {
        id: "adv-g1-mc1",
        type: "multiple-choice",
        question:
          "My decision depends on ______ he will accept the offer or not.",
        options: ["A. if", "B. whether", "C. that", "D. what"],
        correctAnswer: "B. whether",
        reason:
          "'Whether' bisa menjadi objek preposisi ('on'), sedangkan 'if' tidak bisa. Pola: depends on + WHETHER + S + V.",
      },
      {
        id: "adv-g1-mc2",
        type: "multiple-choice",
        question: "______ or not she passes the exam is not my concern.",
        options: ["A. If", "B. That", "C. Whether", "D. What"],
        correctAnswer: "C. Whether",
        reason:
          "'Whether' bisa berada di awal kalimat sebagai subject NC, sedangkan 'if' tidak bisa. 'Whether or not she passes' = NC sebagai subject.",
      },
      {
        id: "adv-g1-mc3",
        type: "multiple-choice",
        question:
          "The doctor recommended that the patient ______ a complete rest.",
        options: ["A. takes", "B. took", "C. take", "D. to take"],
        correctAnswer: "C. take",
        reason:
          "NC of Request: setelah 'recommended that', gunakan V1 (present subjunctive). Meskipun subject 'the patient' singular, subjunctive tetap 'take' (tanpa -s).",
      },
      {
        id: "adv-g1-mc4",
        type: "multiple-choice",
        question:
          "He was surprised by ______ his employees had quit without notice.",
        options: ["A. that", "B. if", "C. whether", "D. the fact that"],
        correctAnswer: "D. the fact that",
        reason:
          "'The fact that' bisa menjadi objek preposisi ('by'), sedangkan 'that' tidak bisa. Pola: surprised by + THE FACT THAT + S + V.",
      },
      {
        id: "adv-g1-mc5",
        type: "multiple-choice",
        question:
          "I don't know what I should wear to the party. → Abridgement yang benar?",
        options: [
          "A. I don't know what wearing to the party.",
          "B. I don't know what to wear to the party.",
          "C. I don't know to wear to the party.",
          "D. I don't know what I wear to the party.",
        ],
        correctAnswer: "B. I don't know what to wear to the party.",
        reason:
          "Abridgement NC: conjunction dari wh-word (what) + sama subject + ada modal (should) → hapus S + modal, tambah 'to'. 'what I should wear' → 'what to wear'.",
      },
      {
        id: "adv-g1-mc6",
        type: "multiple-choice",
        question: "He will hire ______ is the most qualified for the position.",
        options: ["A. who", "B. whoever", "C. whom", "D. whomever"],
        correctAnswer: "B. whoever",
        reason:
          "'Whoever' = siapa pun yang (subject position dalam NC as object). NC 'whoever is the most qualified' = objek dari 'hire'. 'Who' bisa tetapi 'whoever' lebih tepat untuk menyatakan 'anyone who'.",
      },
      {
        id: "adv-g1-task",
        type: "task",
        section: "final",
        question:
          "A. Tentukan jenis NC (Question/Statement/Exclamation/Request) dan fungsinya (S/O/Complement/Obj.Prep):\n1. That she survived the accident is a miracle.\n2. The committee suggested that all members attend the meeting.\n3. I wonder whether they have arrived safely.\n4. She is amazed at how quickly he learned the language.\n5. Nobody knows whose car was parked in the director's spot.\n\nB. Buat abridgement dari kalimat berikut:\n6. She doesn't know how she should respond to the offer.\n7. He asked me where he could find a good restaurant.",
        sampleAnswer:
          "A.\n1. NC of Statement ('that') — Subject\n2. NC of Request ('that' + V1 subjunctive) — Object\n3. NC of Question (whether) — Object\n4. NC of Exclamation (how) — Object of Preposition\n5. NC of Question (whose + noun as modifier) — Object\n\nB.\n6. She doesn't know how to respond to the offer.\n   (how + she + should respond → how + to respond)\n7. He asked me where to find a good restaurant.\n   (where + he + could find → where + to find)",
      },

      // ── Exercise 9 — Correct / Incorrect ────────────────────────────────────
      {
        id: "adv-g1-ex9-1",
        type: "multiple-choice",
        section: "final",
        question:
          'Exercise 9 — Correct (C) or Incorrect (I)?\n\n"When the season starts is determined by the weather."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "C — Correct",
        reason:
          "'When the season starts' = NC of Question (when) sebagai SUBJECT. Main verb: 'is determined'. Kalimat benar.",
      },
      {
        id: "adv-g1-ex9-2",
        type: "multiple-choice",
        section: "final",
        question:
          'Exercise 9 — Correct (C) or Incorrect (I)?\n\n"The manual how the device should be built."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "I — Incorrect",
        reason:
          "Main clause tidak memiliki verb. 'The manual' = subject, tapi tidak ada predicate. Koreksi: 'The manual EXPLAINS how the device should be built.'",
      },
      {
        id: "adv-g1-ex9-3",
        type: "multiple-choice",
        section: "final",
        question:
          'Exercise 9 — Correct (C) or Incorrect (I)?\n\n"The schedule indicated if the teams would be playing in the final game."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "C — Correct",
        reason:
          "S: 'The schedule'. V: 'indicated'. NC (object): 'if the teams would be playing...' — 'if' sebagai conjunction NC of Question. Kalimat benar.",
      },
      {
        id: "adv-g1-ex9-4",
        type: "multiple-choice",
        section: "final",
        question:
          'Exercise 9 — Correct (C) or Incorrect (I)?\n\n"He refused to enter a plea could not be determined by the lawyer."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "I — Incorrect",
        reason:
          "Double predicate tanpa conjunction: 'refused to enter' dan 'could not be determined'. Koreksi: 'WHETHER he refused to enter a plea could not be determined by the lawyer.'",
      },
      {
        id: "adv-g1-ex9-5",
        type: "multiple-choice",
        section: "final",
        question:
          'Exercise 9 — Correct (C) or Incorrect (I)?\n\n"Talked about where we should go for lunch."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "I — Incorrect",
        reason:
          "Tidak ada subject! 'Talked' tidak memiliki subject. Koreksi: 'WE talked about where we should go for lunch.'",
      },
      {
        id: "adv-g1-ex9-6",
        type: "multiple-choice",
        section: "final",
        question:
          'Exercise 9 — Correct (C) or Incorrect (I)?\n\n"Why the condition of the patient deteriorated so rapidly it was not explained."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "I — Incorrect",
        reason:
          "Double subject: NC 'Why the condition...' sebagai subject, lalu 'it' adalah pronoun redundan. Koreksi: 'Why the condition of the patient deteriorated so rapidly WAS not explained.' (hapus 'it')",
      },
      {
        id: "adv-g1-ex9-7",
        type: "multiple-choice",
        section: "final",
        question:
          'Exercise 9 — Correct (C) or Incorrect (I)?\n\n"Whether or not the new office would be built was to be determined at the meeting."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "C — Correct",
        reason:
          "'Whether or not the new office would be built' = NC of Question sebagai subject. Main verb: 'was to be determined'. 'Whether' bisa di awal kalimat sebagai subject. Kalimat benar.",
      },
      {
        id: "adv-g1-ex9-8",
        type: "multiple-choice",
        section: "final",
        question:
          'Exercise 9 — Correct (C) or Incorrect (I)?\n\n"That the professor has not yet decided when the paper is due."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "I — Incorrect",
        reason:
          "NC 'That the professor has not yet decided when the paper is due' hanyalah subject — tidak ada main predicate/verb untuk seluruh kalimat. Koreksi: 'That the professor has not yet decided when the paper is due IS A PROBLEM.'",
      },
      {
        id: "adv-g1-ex9-9",
        type: "multiple-choice",
        section: "final",
        question:
          'Exercise 9 — Correct (C) or Incorrect (I)?\n\n"The contract will be awarded is the question to be answered at the meeting."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "I — Incorrect",
        reason:
          "'The contract will be awarded' dan 'is the question' = double predicate. Subject kalimat seharusnya NC. Koreksi: 'WHETHER the contract will be awarded is the question to be answered at the meeting.'",
      },
      {
        id: "adv-g1-ex9-10",
        type: "multiple-choice",
        section: "final",
        question:
          'Exercise 9 — Correct (C) or Incorrect (I)?\n\n"He always talked with whomever he pleased and did whatever he wanted."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "C — Correct",
        reason:
          "S: He. V1: talked with + NC (whomever he pleased = obj. of prep). Conjunction: and. V2: did + NC (whatever he wanted = object). Compound sentence dengan dua NC. Kalimat benar.",
      },

      // ── Part 1 Translation — NC (Pronoun) ───────────────────────────────────
      {
        id: "adv-g1-trans1",
        type: "task",
        section: "final",
        question:
          "PART 1 — Terjemahkan kalimat berikut ke dalam bahasa Inggris menggunakan Noun Clause yang tepat!\n\n1. Yang sudah berumur 17 tahun wajib memiliki KTP.\n2. Kita tidak tahu siapa lagi yang bisa kita percaya di negara ini.\n3. Rakyat sedang melihat apakah semua program yang disampaikan oleh kandidat terpilih akan benar-benar direalisasikan dengan baik.\n4. Beberapa mahasiswa telah mengetahui mana yang harus mereka kerjakan terlebih dulu.\n5. Apa yang kita lakukan hari ini menentukan masa depan kita nanti.",
        sampleAnswer:
          "1. Whoever has reached the age of 17 is required to have an ID card.\n   → NC: 'Whoever has reached 17' = subject (whoever = siapa pun yang)\n\n2. We don't know who else we can trust in this country.\n   → NC: 'who else we can trust' = object of 'know'\n\n3. The people are watching whether all programs proposed by the elected candidate will truly be realized properly.\n   → NC: 'whether all programs...realized' = object of 'watching'\n\n4. Some students have already known which one they should do first.\n   → NC: 'which one they should do first' = object of 'known'\n\n5. What we do today determines our future.\n   → NC: 'What we do today' = subject (bersifat singular → 'determines')",
      },

      // ── Part 2 Translation — NC (Adverb) ────────────────────────────────────
      {
        id: "adv-g1-trans2",
        type: "task",
        section: "final",
        question:
          "PART 2 — Terjemahkan kalimat berikut ke dalam bahasa Inggris menggunakan Noun Clause yang tepat!\n\n1. Kita harus paham kapan kita harus diam.\n2. Kepribadian kita ditentukan oleh bagaimana kita dulu dididik.\n3. Menjadi bahagia tidak dijamin oleh berapa banyak uang yang kita miliki.\n4. Kapan dan di mana kita akan pergi masih direncanakan.\n5. Para pendaki dapat dengan cepat menentukan mana langkah yang harus mereka ambil ketika tersesat.",
        sampleAnswer:
          "1. We must understand when we should be silent.\n   → NC: 'when we should be silent' = object of 'understand'\n   (Abridgement: We must understand when to be silent.)\n\n2. Our personality is determined by how we were raised/educated.\n   → NC: 'how we were raised' = object of preposition 'by'\n\n3. Being happy is not guaranteed by how much money we have.\n   → NC: 'how much money we have' = object of preposition 'by'\n   Alt: How much money we have does not guarantee happiness.\n\n4. When and where we will go is still being planned.\n   → Two NC joined: 'When and where we will go' = compound NC as subject\n   (singular → 'is still being planned')\n\n5. Hikers can quickly determine which steps they should take when they get lost.\n   → NC: 'which steps they should take when they get lost' = object of 'determine'",
      },
    ],
  },

  // ── Day 3 · NC of Statement, Request & Exclamation ──────────────────────────
  {
    id: "adv-grammar-2",
    track: "grammar",
    day: 3,
    tutor: "Ms. Vita",
    title: "Noun Clause — Statement, Request & Exclamation",
    subtitle: "NC of Statement · NC of Request · NC of Exclamation",
    overview:
      "Melanjutkan Noun Clause Day 2. NC of Statement (that/the fact that) memberikan sebuah pernyataan atau fakta. NC of Request (that + bare infinitive) menyatakan permintaan dengan subjunctive verb. NC of Exclamation (how/what) mengekspresikan kekaguman atau seruan.",
    materialSections: [
      {
        title: "A. NC of Statement",
        points: [
          "Berfungsi memberikan sebuah PERNYATAAN.",
          "",
          "Conjunction:",
          "  that          = Bahwa      → C + S + V",
          "  the fact that = Fakta bahwa → C + S + V",
          "",
          "NB:",
          "  'The fact that' bisa menempati SEMUA posisi (subject, object, objek preposisi).",
          "  'That' hanya bisa sebagai SUBJECT dan OBJECT of verb.",
          "",
          "Contoh:",
          "→ The fact that the four-clove leaf can bring luck was once just common beliefs.",
          "→ She admits that the infrastructure is wrongly developed.",
          "→ That Indonesia is still a developing country is widely believed.",
          "→ They are concerned about the fact that the ministry will allocate the budget mistakenly.",
          "→ The government states that the deforestation is illegal.",
          "→ The architect insists that the workers follow her design.",
        ],
      },
      {
        title: "B. NC of Request",
        points: [
          "Berfungsi sebagai PERMINTAAN.",
          "",
          "Conjunction: that = Agar",
          "",
          "NB:",
          "  Berlaku subjunctive verb yang bermakna meminta:",
          "  insist, beg, force, urge, ask, require, dll.",
          "  Hanya sebagai OBJECT of verb.",
          "  Verb di sub-clause → 'bare infinitive' (apapun subjeknya).",
          "",
          "Contoh:",
          "→ I ask that my sister follow the rules.",
          "→ Secretary urged that the document be submitted.",
          "→ She begs that her friends pick her up tonight.",
        ],
      },
      {
        title: "C. NC of Exclamation",
        points: [
          "Berfungsi sebagai SERUAN.",
          "",
          "Conjunction:",
          "  → How + Adj/Adv + S+V / +V    (Betapa...)",
          "  → What + noun phrase + S+V / +V",
          "",
          "Contoh:",
          "→ I'm amazed by how wonderful the scenery is.",
          "→ What a beautiful weather today makes us happy.",
          "→ She thinks how complicated Indonesian rules are.",
          "→ I'm surprised by how handsome he is.",
          "→ How beautiful you are inspires me.",
        ],
      },
      {
        title: "5. Noun Clause Connector/Subjects",
        points: [
          "NC Connector/Subject berfungsi sebagai SUBJECT dalam noun clause sekaligus penghubung.",
          "Connector ini: who · whoever · what · whatever · which · whichever",
          "",
          "NC as OBJECT of verb:",
          "   Pola: S  V  [NC Connector/Subject  V]",
          "   Contoh: I know  [what  happened].",
          "",
          "NC as SUBJECT:",
          "   Pola: [NC Connector/Subject  V]  V",
          "   Contoh: [What  happened]  was great.",
          "",
          "⚠️  Ingat: setelah NC Connector/Subject HARUS ada VERB di dalam noun clause.",
          "   ❌ You should find out which the best physics department.",
          "   ✅ You should find out which IS the best physics department.",
        ],
      },
    ],
    exercises: [
      // ── Exercise 10: NC Connector/Subject — Correct (C) or Incorrect (I) ──────
      {
        id: "adv-g2-ex10-1",
        type: "multiple-choice",
        question:
          'Exercise 10 — Correct (C) or Incorrect (I)?\n\n"The game show contestant was able to respond to whatever was asked."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "C — Correct",
        reason:
          "NC Connector/Subject 'whatever' diikuti verb 'was asked' → NC sebagai object of preposition 'to'. Struktur benar.",
      },
      {
        id: "adv-g2-ex10-2",
        type: "multiple-choice",
        question:
          'Exercise 10 — Correct (C) or Incorrect (I)?\n\n"You should find out which the best physics department."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "I — Incorrect",
        reason:
          "NC Connector/Subject 'which' harus diikuti verb dalam noun clause. Tidak ada verb setelah 'which'. Koreksi: '...find out which IS the best physics department.'",
      },
      {
        id: "adv-g2-ex10-3",
        type: "multiple-choice",
        question:
          'Exercise 10 — Correct (C) or Incorrect (I)?\n\n"The employee was unhappy about what was added to his job description."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "C — Correct",
        reason:
          "NC Connector/Subject 'what' diikuti verb 'was added' → NC sebagai object of preposition 'about'. Struktur benar.",
      },
      {
        id: "adv-g2-ex10-4",
        type: "multiple-choice",
        question:
          'Exercise 10 — Correct (C) or Incorrect (I)?\n\n"Whoever wants to take the desert tour during spring break signing up at the office."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "I — Incorrect",
        reason:
          "'Signing up' adalah Ving tanpa auxiliary — bukan main verb. NC Subject 'Whoever wants...' tidak memiliki main verb. Koreksi: '...should sign up at the office.'",
      },
      {
        id: "adv-g2-ex10-5",
        type: "multiple-choice",
        question:
          'Exercise 10 — Correct (C) or Incorrect (I)?\n\n"The motorist was unable to discover who he had struck his car."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "I — Incorrect",
        reason:
          "Struktur NC salah: 'who he had struck his car' ambigu/janggal. Koreksi: '...discover whose car he had struck.' (jika NC sebagai object dari 'struck')",
      },
      {
        id: "adv-g2-ex10-6",
        type: "multiple-choice",
        question:
          'Exercise 10 — Correct (C) or Incorrect (I)?\n\n"The voters should elect whichever of the candidates seems best to them."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "C — Correct",
        reason:
          "NC Connector/Subject 'whichever' diikuti prepositional phrase 'of the candidates' lalu verb 'seems' → NC sebagai object of 'elect'. Struktur benar.",
      },
      {
        id: "adv-g2-ex10-7",
        type: "multiple-choice",
        question:
          'Exercise 10 — Correct (C) or Incorrect (I)?\n\n"It was difficult to distinguish what was on sale and what was merely on display."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "C — Correct",
        reason:
          "Dua NC Connector/Subject: 'what was on sale' dan 'what was merely on display', keduanya sebagai object of 'distinguish'. Struktur benar.",
      },
      {
        id: "adv-g2-ex10-8",
        type: "multiple-choice",
        question:
          'Exercise 10 — Correct (C) or Incorrect (I)?\n\n"You should buy whatever the cheapest and most durable."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "I — Incorrect",
        reason:
          "NC 'whatever the cheapest and most durable' tidak memiliki verb. Koreksi: '...whatever IS the cheapest and most durable.'",
      },
      {
        id: "adv-g2-ex10-9",
        type: "multiple-choice",
        question:
          'Exercise 10 — Correct (C) or Incorrect (I)?\n\n"What was written in the letter angered him beyond belief."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "C — Correct",
        reason:
          "NC Connector/Subject 'What was written in the letter' berfungsi sebagai SUBJECT kalimat, diikuti main verb 'angered'. Struktur benar.",
      },
      {
        id: "adv-g2-ex10-10",
        type: "multiple-choice",
        question:
          'Exercise 10 — Correct (C) or Incorrect (I)?\n\n"You can spend your time with whoever important to you."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "I — Incorrect",
        reason:
          "NC 'whoever important to you' tidak memiliki verb. Koreksi: '...with whoever IS important to you.'",
      },
      {
        id: "adv-g2-mc1",
        type: "multiple-choice",
        section: "part1",
        question:
          "The board hasn't decided ___ the new branch will be established in Jakarta or Surabaya next year.",
        options: ["a. whether", "b. who", "c. whom", "d. which"],
        correctAnswer: "a. whether",
        reason:
          "'Whether' untuk yes/no NC dengan dua pilihan (Jakarta OR Surabaya). Pola: haven't decided WHETHER...or...",
      },
      {
        id: "adv-g2-mc2",
        type: "multiple-choice",
        section: "part1",
        question:
          "The supervisor asked me ___ I had completed all the revisions before the deadline yesterday.",
        options: ["a. if", "b. who", "c. whom", "d. which"],
        correctAnswer: "a. if",
        reason:
          "'If' untuk indirect yes/no question sebagai object of verb 'asked'. Pola: asked me IF + S + V.",
      },
      {
        id: "adv-g2-mc3",
        type: "multiple-choice",
        section: "part1",
        question:
          "Nobody knows ___ will be appointed as the new ambassador to Japan by the president.",
        options: ["a. who", "b. whom", "c. what", "d. which"],
        correctAnswer: "a. who",
        reason:
          "'Who' sebagai SUBJECT dalam NC (posisi subject: ___ will be appointed). Refers to a person. 'Whom' untuk object position.",
      },
      {
        id: "adv-g2-mc4",
        type: "multiple-choice",
        section: "part1",
        question:
          "It remains unclear ___ the annual meeting will be held at the headquarters or at a different location.",
        options: ["a. whether", "b. who", "c. what", "d. which"],
        correctAnswer: "a. whether",
        reason:
          "'Whether' untuk dua alternatif: headquarters OR different location. Pola: unclear WHETHER...or...",
      },
      {
        id: "adv-g2-mc5",
        type: "multiple-choice",
        section: "part1",
        question:
          "The principal wants to find out ___ of the students in the science club won the national competition.",
        options: ["a. which", "b. who", "c. whom", "d. what"],
        correctAnswer: "a. which",
        reason:
          "'Which' sebagai modifier + noun: 'which OF the students' = memilih dari kelompok spesifik. Conjunction + noun (modifier) untuk pilihan terbatas.",
      },
      {
        id: "adv-g2-mc6",
        type: "multiple-choice",
        section: "part1",
        question:
          "We are not sure ___ the financial report was reviewed by the auditing team last week.",
        options: ["a. if", "b. who", "c. whom", "d. which"],
        correctAnswer: "a. if",
        reason:
          "'If' untuk yes/no indirect question sebagai complement. Tidak ada 'or not' dan tidak di posisi subject/obj.prep → pakai 'if'.",
      },
      {
        id: "adv-g2-mc7",
        type: "multiple-choice",
        section: "part1",
        question:
          "The question is ___ should be responsible for coordinating the international conference this year.",
        options: ["a. who", "b. whom", "c. what", "d. which"],
        correctAnswer: "a. who",
        reason:
          "'Who' sebagai SUBJECT NC (posisi subject: ___ should be responsible). NC sebagai complement. 'Whom' untuk object position.",
      },
      {
        id: "adv-g2-mc8",
        type: "multiple-choice",
        section: "part1",
        question:
          "They haven't decided ___ will cancel the outdoor event because of the severe weather forecast or not.",
        options: ["a. whether", "b. who", "c. whom", "d. which"],
        correctAnswer: "a. whether",
        reason:
          "Ada 'or not' di akhir → 'whether'. Pola: WHETHER...or not = apakah...atau tidak.",
      },
      {
        id: "adv-g2-mc9",
        type: "multiple-choice",
        section: "part1",
        question:
          "It has not been confirmed ___ the guest speaker will be able to attend the business summit in Singapore.",
        options: ["a. whether or not", "b. who", "c. what", "d. which"],
        correctAnswer: "a. whether or not",
        reason:
          "'Whether or not' sebagai kesatuan conjunction untuk yes/no question. NC sebagai subject dengan anticipatory 'It'. Pola: It has not been confirmed WHETHER OR NOT + S + V.",
      },
      {
        id: "adv-g2-mc10",
        type: "multiple-choice",
        section: "part1",
        question:
          "We couldn't decide ___ of the two proposed designs would be more effective for the marketing campaign.",
        options: ["a. which", "b. who", "c. whom", "d. what"],
        correctAnswer: "a. which",
        reason:
          "'Which' + 'of the two' = memilih dari dua pilihan spesifik. 'Which + of + noun' untuk pilihan terbatas.",
      },
      {
        id: "adv-g2-mc11",
        type: "multiple-choice",
        section: "part1",
        question:
          "The committee is discussing ___ should represent the university at the upcoming global youth forum.",
        options: ["a. who", "b. whom", "c. what", "d. which"],
        correctAnswer: "a. who",
        reason:
          "'Who' sebagai SUBJECT NC (posisi subject: ___ should represent). NC sebagai object of 'discussing'. Refers to a person.",
      },
      {
        id: "adv-g2-mc12",
        type: "multiple-choice",
        section: "part1",
        question:
          "I'm not certain ___ she submitted the final version of her research paper on time or not.",
        options: ["a. whether", "b. who", "c. what", "d. which"],
        correctAnswer: "a. whether",
        reason:
          "Ada 'or not' di akhir → 'whether'. Pola: not certain WHETHER + S + V + or not. NC sebagai complement.",
      },
      {
        id: "adv-g2-mc13",
        type: "multiple-choice",
        section: "part1",
        question:
          "They are still debating ___ will approve the new budget proposal after the unexpected increase in costs.",
        options: ["a. whether or not", "b. what", "c. whom", "d. which"],
        correctAnswer: "a. whether or not",
        reason:
          "'Whether or not' = apakah...atau tidak. NC menjadi object of 'debating'. Menyatakan ketidakpastian apakah proposal akan disetujui.",
      },
      {
        id: "adv-g2-mc14",
        type: "multiple-choice",
        section: "part1",
        question:
          "The manager asked ___ could handle the investor presentation during his absence next Friday.",
        options: ["a. who", "b. whom", "c. what", "d. which"],
        correctAnswer: "a. who",
        reason:
          "'Who' sebagai SUBJECT NC (posisi subject: ___ could handle). NC sebagai object of 'asked'. Refers to a person.",
      },
      {
        id: "adv-g2-mc15",
        type: "multiple-choice",
        section: "part1",
        question:
          "It is still unknown ___ caused the sudden breakdown of the main computer system during the conference.",
        options: ["a. what", "b. which", "c. who", "d. whom"],
        correctAnswer: "a. what",
        reason:
          "'What' sebagai SUBJECT NC (posisi subject: ___ caused the breakdown). Refers to a thing/cause (bukan orang). NC sebagai subject dengan anticipatory 'It'.",
      },
      {
        id: "adv-g2-tr1",
        type: "short-answer",
        section: "part2",
        question:
          "Translate to English: Tidak jelas siapa yang mengirim paket itu ke kantor kami.",
        sampleAnswer: "It is not clear who sent that package to our office.",
      },
      {
        id: "adv-g2-tr2",
        type: "short-answer",
        section: "part2",
        question:
          "Translate to English: Tolong beritahu saya buku mana yang harus saya baca terlebih dahulu.",
        sampleAnswer: "Please tell me which book I should read first.",
      },
      {
        id: "adv-g2-tr3",
        type: "short-answer",
        section: "part2",
        question:
          "Translate to English: Kami masih mempertimbangkan apakah akan membuka cabang baru atau tidak.",
        sampleAnswer:
          "We are still considering whether or not to open a new branch.",
      },
      {
        id: "adv-g2-tr4",
        type: "short-answer",
        section: "part2",
        question:
          "Translate to English: Dia bertanya apakah kita bisa menunda rapat sampai minggu depan.",
        sampleAnswer:
          "She asked whether we could postpone the meeting until next week.",
      },
      {
        id: "adv-g2-tr5",
        type: "short-answer",
        section: "part2",
        question:
          "Translate to English: Tidak seorang pun tahu siapa yang menemukan ide itu pertama kali.",
        sampleAnswer: "Nobody knows who came up with that idea first.",
      },
      {
        id: "adv-g2-tr6",
        type: "short-answer",
        section: "part2",
        question:
          "Translate to English: Masalahnya adalah apakah anggaran itu cukup untuk membiayai proyek ini.",
        sampleAnswer:
          "The problem is whether the budget is sufficient to fund this project.",
      },
      {
        id: "adv-g2-tr7",
        type: "short-answer",
        section: "part2",
        question:
          "Translate to English: Saya tidak ingat apa yang dia katakan tentang peraturan baru itu.",
        sampleAnswer:
          "I don't remember what she said about the new regulation.",
      },
      {
        id: "adv-g2-tr8",
        type: "short-answer",
        section: "part2",
        question:
          "Translate to English: Tolong tanyakan siapa yang akan menjadi pembicara utama di acara tersebut.",
        sampleAnswer: "Please ask who will be the main speaker at that event.",
      },
      {
        id: "adv-g2-tr9",
        type: "short-answer",
        section: "part2",
        question:
          "Translate to English: Kami belum memutuskan apakah akan menerima tawaran tersebut atau tidak.",
        sampleAnswer: "We haven't decided whether or not to accept that offer.",
      },
      {
        id: "adv-g2-tr10",
        type: "short-answer",
        section: "part2",
        question:
          "Translate to English: Polisi ingin tahu apa yang membuat tersangka melarikan diri.",
        sampleAnswer: "The police want to know what made the suspect flee.",
      },
      {
        id: "adv-g2-tr11",
        type: "short-answer",
        section: "part2",
        question:
          "Translate to English: Saya penasaran apakah perusahaan itu akan mempekerjakan karyawan baru tahun ini.",
        sampleAnswer:
          "I am curious whether that company will hire new employees this year.",
      },
      {
        id: "adv-g2-tr12",
        type: "short-answer",
        section: "part2",
        question:
          "Translate to English: Mereka sedang mendiskusikan siapa yang akan menjadi duta merek.",
        sampleAnswer:
          "They are discussing who will become the brand ambassador.",
      },
      {
        id: "adv-g2-tr13",
        type: "short-answer",
        section: "part2",
        question:
          "Translate to English: Tidak ada yang tahu barang mana yang akan dijual dengan diskon terbesar.",
        sampleAnswer:
          "Nobody knows which item will be sold with the biggest discount.",
      },
      {
        id: "adv-g2-tr14",
        type: "short-answer",
        section: "part2",
        question:
          "Translate to English: Belum dipastikan apakah pertandingan itu akan tetap dilaksanakan meskipun hujan.",
        sampleAnswer:
          "It has not been confirmed whether the match will still be held despite the rain.",
      },
      {
        id: "adv-g2-tr15",
        type: "short-answer",
        section: "part2",
        question:
          "Translate to English: Terlihat sangat jelas bahwa bahagia tidak hanya soal uang.",
        sampleAnswer:
          "It is very clear that happiness is not just about money.",
      },
      {
        id: "adv-g2-tr16",
        type: "short-answer",
        section: "part2",
        question:
          "Translate to English: Kita tidak bisa menolak fakta bahwa pendidikan berperan penting dalam bagaimana kita bersosialisasi.",
        sampleAnswer:
          "We cannot deny the fact that education plays an important role in how we socialize.",
      },
      {
        id: "adv-g2-tr17",
        type: "short-answer",
        section: "part2",
        question:
          "Translate to English: Pecinta CGI kagum dengan betapa detailnya gambar dalam film Avatar karya James Cameron.",
        sampleAnswer:
          "CGI enthusiasts are amazed by how detailed the images are in James Cameron's Avatar.",
      },
      {
        id: "adv-g2-tr18",
        type: "short-answer",
        section: "part2",
        question:
          "Translate to English: dr. Tirta menyarankan agar anak muda mengurangi konsumsi gula untuk menghindarkan mereka dari diabetes pada usia dini.",
        sampleAnswer:
          "Dr. Tirta suggested that young people reduce their sugar intake to prevent them from getting diabetes at an early age.",
      },
      {
        id: "adv-g2-tr19",
        type: "short-answer",
        section: "part2",
        question:
          "Translate to English: Bahwa melakukan olahraga yang cukup dapat meningkatkan kualitas tidur telah dibuktikan oleh beberapa penelitian.",
        sampleAnswer:
          "That getting enough exercise can improve sleep quality has been proven by several studies.",
      },
      {
        id: "adv-g2-tr20",
        type: "short-answer",
        section: "part2",
        question:
          "Translate to English: Jake Sully belum menemukan apa alasan yang dia harus jelaskan pada Tonowari, ketua klan Metkayina.",
        sampleAnswer:
          "Jake Sully hasn't found out what reason he should explain to Tonowari, the leader of the Metkayina clan.",
      },
    ],
  },

  // ── Day 4 · Peringkasan NC & Adjective Clause ───────────────────────────────
  {
    id: "adv-grammar-3",
    track: "grammar",
    day: 4,
    tutor: "Ms. Vita",
    title: "Peringkasan NC · Adjective Clause",
    subtitle: "NC Omitting & Abridgement · AC Kinds · AC Reducing & Omitting",
    overview:
      "Peringkasan Noun Clause adalah proses perubahan struktur kalimat tanpa merubah makna, melalui Omitting (penghapusan 'that') dan Abridgement (penyingkatan menjadi to-infinitive). Adjective Clause (AC) adalah clause yang berfungsi memodifikasi noun, menggunakan relative pronoun who/whom/which/that/whose atau relative adverb when/where/why. AC dapat dipersingkat melalui Reducing (mengubah verb menjadi participle) atau Omitting.",
    materialSections: [
      {
        title: "A. Peringkasan NC — 1. Omitting",
        points: [
          "Penghapusan Conjunction 'that' yang bermakna 'bahwa' di posisi object of verb.",
          "",
          "e.g.:",
          "→ They admit that they are guilty.         → They admit they are guilty.",
          "→ She states that the ruler are complicated. → She states the ruler are complicated.",
          "→ The pilot said that the passengers should be calming down during turbulency.",
          "   → The pilot said the passengers should be calming down during turbulency.",
        ],
      },
      {
        title: "A. Peringkasan NC — 2. Abridgement",
        points: [
          "Penghapusan subject di Sub-Clause (SC) dan mengubah verb SC menjadi 'to-Infinitive'.",
          "",
          "Form  : Conj + to + V₁ (Bare)",
          "",
          "Syarat:",
          "  1. NC yang berposisi object of verb + preposition",
          "  2. Seluruh NC yang memakai Conjunction WH",
          "  3. Subject antara SC dan MC harus sama",
          "  4. Ada modal di SC (tidak bisa untuk NC of Exclamation)",
          "",
          "Contoh:",
          "→ She wonders whether she can finish the task (or not).",
          "   A: She wonders whether to finish the task (or not).",
          "",
          "→ I know what I should do next.",
          "   A: I know what to do next.",
          "",
          "→ She asked which book she should read first.",
          "   A: She asked which book to read first.",
          "",
          "→ They don't understand where they must go.",
          "   A: They don't understand where to go.",
          "",
          "→ I will tell you how I can make this cake.",
          "   A: I will tell you how to make this cake.",
          "",
          "→ I'm concerned how much money I will save.",
          "   A: I'm concerned how much money to save.",
          "",
          "→ We're interested in how we can solve the problem.",
          "→ The scientist explains about how to discover the new formula.",
          "→ The evidence shows how to be found.",
        ],
      },
      {
        title: "B. Adjective Clause — Pengertian & Jenis",
        points: [
          "Clause yang berfungsi memodifikasi noun.",
          "Letak: di belakang noun yang dijelaskan.",
          "",
          "Contoh sederhana:",
          "  I have 2 flowers. + They are roses.",
          "  → I have 2 flowers which are roses.",
          "",
          "  I talk to a man. + I deal with him.",
          "  → I talk to a man whom I deal with.",
          "  → A man with whom I deal.",
          "",
          "Kinds of Adjective Clause:",
          "",
          "who   : C+V → untuk orang → yang",
          "  e.g. A leader who gives us an advice looks so great.",
          "",
          "whom  : C+S+V → untuk orang → yang (posisi object)",
          "  e.g. I call a girl whom my brother likes.",
          "",
          "which : C+S+V / C+V → untuk benda/hal",
          "  e.g. I carry a box which is heavy.",
          "",
          "that  : C+S+V / C+V → untuk semua (orang & benda)",
          "  e.g. Many students that join the competition are so smart.",
          "",
          "whose : C+noun+S+V / +V → Kepemilikan",
          "  e.g. A girl whose car is red is angry.",
          "",
          "when  : C+S+V → Keterangan waktu → ketika",
          "  e.g. I remember a time when I met you.",
          "",
          "where : C+S+V → Keterangan tempat → di mana",
          "  e.g. A hotel where my mom works is huge.",
          "",
          "why   : C+S+V → Alasan → mengapa",
          "  e.g. I know the reason why she looks so sad.",
        ],
      },
      {
        title: "C. Peringkasan AC — 1. Reducing (C+V)",
        points: [
          "Perubahan verb dalam AC menjadi bentuk yang lebih singkat.",
          "",
          "Jenis perubahan verb:",
          "  Active  : V-ing (Present Participle)",
          "  Passive : V3 (Past Participle), adj, noun, dll.",
          "  Non-verb: ANA / Being + ANA",
          "",
          "Contoh:",
          "→ A man who stands is my friend.",
          "   → A man standing is my friend.   [Active → V-ing]",
          "",
          "→ I work at the company which is built too quickly.",
          "   → I work at the company built too quickly.   [Passive → V3]",
          "",
          "→ Elon Musk who is the founder of Tesla is so smart.",
          "   → Elon Musk, the founder of Tesla, is so smart.   [Non-verb → Appositive]",
        ],
      },
      {
        title: "C. Peringkasan AC — 2. Omitting (C+S+V)",
        points: [
          "Penghapusan conjunction + subject dalam AC.",
          "",
          "Contoh:",
          "→ I call a girl whom he likes.",
          "→ A time when I saw you every yesterday.",
        ],
      },
    ],
    exercises: [
      // ── TOEFL Exercise (Skills 9–12) ─ regular / no section ──────────────────
      {
        id: "adv-g3-toefl-1",
        type: "multiple-choice",
        question:
          "TOEFL Exercise (Skills 9–12)\n\nDolphins form extremely complicated allegiances and ____ continually changing.",
        options: [
          "A. enmities that",
          "B. that are enmities",
          "C. enmities that are",
          "D. that enmities",
        ],
        correctAnswer: "C. enmities that are",
        reason:
          "'Enmities that are continually changing' = noun + adjective clause (AC). 'that are' = relative pronoun + BE sebagai verb dalam AC. Option A ('enmities that') tidak perlu karena 'change' membutuhkan BE untuk membentuk progressive.",
      },
      {
        id: "adv-g3-toefl-2",
        type: "multiple-choice",
        question:
          "Scientists are now beginning to conduct experiments on ____ trigger different sorts of health risks.",
        options: [
          "A. noise pollution can",
          "B. that noise pollution",
          "C. how noise pollution",
          "D. how noise pollution can",
        ],
        correctAnswer: "D. how noise pollution can",
        reason:
          "Preposisi 'on' membutuhkan noun sebagai objeknya → NC. 'How noise pollution can trigger' = NC of Question (how) sebagai object of preposition. 'Can' diperlukan sebagai modal verb dalam NC.",
      },
      {
        id: "adv-g3-toefl-3",
        type: "multiple-choice",
        question:
          "The Apollo 11 astronauts ____ of the Earth's inhabitants witnessed on the famous first moonwalk on July 20, 1969, were Neil Armstrong and Buzz Aldrin.",
        options: [
          "A. whom",
          "B. whom millions",
          "C. were some",
          "D. whom some were",
        ],
        correctAnswer: "B. whom millions",
        reason:
          "'Whom millions of the Earth's inhabitants witnessed' = AC modifying 'astronauts'. 'Whom' = relative pronoun (object position), 'millions of the Earth's inhabitants' = subject dari AC. Option A tidak ada subject AC-nya.",
      },
      {
        id: "adv-g3-toefl-4",
        type: "multiple-choice",
        question:
          "At the end of the nineteenth century, Alfred Binet developed a test for measuring intelligence ____ served as the basis of modern IQ tests.",
        options: ["A. has", "B. it has", "C. and", "D. which has"],
        correctAnswer: "D. which has",
        reason:
          "'Which has served as the basis of modern IQ tests' = AC modifying 'test'. 'Which' = relative pronoun untuk benda (test). 'Has served' = present perfect sebagai verb dalam AC.",
      },
      {
        id: "adv-g3-toefl-5",
        type: "multiple-choice",
        question:
          "____ have at least four hours of hazardous materials response training is mandated by federal law.",
        options: [
          "A. All police officers",
          "B. All police officers must",
          "C. That all police officers",
          "D. For all police officers",
        ],
        correctAnswer: "C. That all police officers",
        reason:
          "Kalimat ini membutuhkan NC sebagai SUBJECT ('is mandated' = main verb). 'That all police officers have at least four hours...' = NC of Statement sebagai subject. 'That' = conjunction NC.",
      },
      {
        id: "adv-g3-toefl-6",
        type: "multiple-choice",
        question:
          "A cloud's reservoir of negative charge extends upward from the altitude at ____ the freezing point.",
        options: [
          "A. temperatures hit",
          "B. hit temperatures",
          "C. which temperatures hit",
          "D. which hit temperatures",
        ],
        correctAnswer: "C. which temperatures hit",
        reason:
          "'at which temperatures hit the freezing point' = AC modifying 'altitude'. 'at which' = preposition + relative pronoun untuk benda. 'temperatures' = subject AC, 'hit' = verb AC.",
      },
      {
        id: "adv-g3-toefl-7",
        type: "multiple-choice",
        question:
          "In a 1988 advanced officers' training program, Sampson developed a plan to incorporate police in enforcing environmental protection laws whenever ____ feasible.",
        options: ["A. it is", "B. is", "C. has", "D. it has"],
        correctAnswer: "A. it is",
        reason:
          "'whenever it is feasible' = Adverbial Clause of Time. 'it' = dummy subject (expletive), 'is' = verb, 'feasible' = adjective complement. Pola lengkap: whenever + S + V + Adj.",
      },
      {
        id: "adv-g3-toefl-8",
        type: "multiple-choice",
        question:
          "____ will be carried in the next space shuttle payload has not yet been announced to the public.",
        options: ["A. It", "B. What", "C. When", "D. That"],
        correctAnswer: "B. What",
        reason:
          "'What will be carried in the next space shuttle payload' = NC sebagai SUBJECT kalimat. 'What' = NC connector/subject untuk benda yang tidak diketahui. 'has not yet been announced' = main verb.",
      },
      {
        id: "adv-g3-toefl-9",
        type: "multiple-choice",
        question:
          "During free fall, ____ up to a full minute, a skydiver will fall at a constant speed of 120 m.p.h.",
        options: ["A. it is", "B. which is", "C. being", "D. is"],
        correctAnswer: "B. which is",
        reason:
          "'which is up to a full minute' = AC non-restrictive modifying 'free fall'. 'which' = relative pronoun untuk benda (free fall), 'is' = verb, 'up to a full minute' = complement.",
      },
      {
        id: "adv-g3-toefl-10",
        type: "multiple-choice",
        question:
          "The fact ____ the most important ratings period is about to begin has caused all the networks to shore up their schedules.",
        options: ["A. is that", "B. of", "C. that", "D. what"],
        correctAnswer: "C. that",
        reason:
          "'The fact that...' = NC of Statement. 'that' = conjunction NC yang mengikuti noun 'fact'. Pola: the fact + that + S + V.",
      },
      // ── Exercise 4 — Present Participles ─ Part 1 ────────────────────────────
      {
        id: "adv-g3-ex4-1",
        type: "multiple-choice",
        section: "part1",
        question:
          'Exercise 4 — Present Participles: Correct (C) or Incorrect (I)?\n\n"The companies offering the lowest prices will have the most customers."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "C — Correct",
        reason:
          "'offering' = present participle (ADJ modifier untuk 'companies'), 'will have' = main verb. Satu verb utama, satu participle modifier. Correct.",
      },
      {
        id: "adv-g3-ex4-2",
        type: "multiple-choice",
        section: "part1",
        question:
          'Exercise 4 — Present Participles: Correct (C) or Incorrect (I)?\n\n"Those travelers are completing their trip on Delta should report to Gate Three."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "I — Incorrect",
        reason:
          "'are completing' = verb1, 'should report' = verb2. Tidak ada conjunction yang menghubungkan. Double verb → Incorrect. Harusnya: 'Those travelers completing their trip on Delta should report...'",
      },
      {
        id: "adv-g3-ex4-3",
        type: "multiple-choice",
        section: "part1",
        question:
          'Exercise 4 — Present Participles: Correct (C) or Incorrect (I)?\n\n"The artisans were demonstrating various handicrafts at booths throughout the fair."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "C — Correct",
        reason:
          "'were demonstrating' = verb (progressive tense) — hanya satu verb dalam kalimat. Kalimat benar secara struktural. Correct.",
      },
      {
        id: "adv-g3-ex4-4",
        type: "multiple-choice",
        section: "part1",
        question:
          'Exercise 4 — Present Participles: Correct (C) or Incorrect (I)?\n\n"The fraternities are giving the wildest parties attract the most new pledges."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "I — Incorrect",
        reason:
          "'are giving' = verb1, 'attract' = verb2. Tidak ada conjunction. Double verb → Incorrect. Harusnya: 'The fraternities giving the wildest parties attract the most new pledges.'",
      },
      {
        id: "adv-g3-ex4-5",
        type: "multiple-choice",
        section: "part1",
        question:
          'Exercise 4 — Present Participles: Correct (C) or Incorrect (I)?\n\n"The first team winning four games is awarded the championship."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "C — Correct",
        reason:
          "'winning' = present participle (ADJ modifier untuk 'team'), 'is awarded' = main verb. Correct.",
      },
      {
        id: "adv-g3-ex4-6",
        type: "multiple-choice",
        section: "part1",
        question:
          'Exercise 4 — Present Participles: Correct (C) or Incorrect (I)?\n\n"The speaker was trying to make his point was often interrupted vociferously."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "I — Incorrect",
        reason:
          "'was trying' = verb1, 'was interrupted' = verb2. Tidak ada conjunction. Double verb → Incorrect. Harusnya: 'The speaker trying to make his point was often interrupted vociferously.'",
      },
      {
        id: "adv-g3-ex4-7",
        type: "multiple-choice",
        section: "part1",
        question:
          'Exercise 4 — Present Participles: Correct (C) or Incorrect (I)?\n\n"The fruits were rotting because of the moisture in the crates carrying them to market."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "C — Correct",
        reason:
          "'were rotting' = main verb (progressive), 'carrying' = present participle (ADJ modifier untuk 'crates'). Correct.",
      },
      {
        id: "adv-g3-ex4-8",
        type: "multiple-choice",
        section: "part1",
        question:
          'Exercise 4 — Present Participles: Correct (C) or Incorrect (I)?\n\n"Any students desiring official transcripts should complete the appropriate form."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "C — Correct",
        reason:
          "'desiring' = present participle (ADJ modifier untuk 'students'), 'should complete' = main verb. Correct.",
      },
      {
        id: "adv-g3-ex4-9",
        type: "multiple-choice",
        section: "part1",
        question:
          'Exercise 4 — Present Participles: Correct (C) or Incorrect (I)?\n\n"The advertisements were announcing the half-day sale received a lot of attention."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "I — Incorrect",
        reason:
          "'were announcing' = verb1, 'received' = verb2. Tidak ada conjunction. Double verb → Incorrect. Harusnya: 'The advertisements announcing the half-day sale received a lot of attention.'",
      },
      {
        id: "adv-g3-ex4-10",
        type: "multiple-choice",
        section: "part1",
        question:
          'Exercise 4 — Present Participles: Correct (C) or Incorrect (I)?\n\n"The spices flavoring the meal were quite distinctive."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "C — Correct",
        reason:
          "'flavoring' = present participle (ADJ modifier untuk 'spices'), 'were' = main verb. Correct.",
      },
      // ── Exercise 5 — Past Participles ─ Part 2 ───────────────────────────────
      {
        id: "adv-g3-ex5-1",
        type: "multiple-choice",
        section: "part2",
        question:
          'Exercise 5 — Past Participles: Correct (C) or Incorrect (I)?\n\n"The money was offered by the client was not accepted."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "I — Incorrect",
        reason:
          "'was offered' = verb1, 'was not accepted' = verb2. Double passive tanpa conjunction → Incorrect. Harusnya: 'The money offered by the client was not accepted.'",
      },
      {
        id: "adv-g3-ex5-2",
        type: "multiple-choice",
        section: "part2",
        question:
          'Exercise 5 — Past Participles: Correct (C) or Incorrect (I)?\n\n"The car listed in the advertisement had already stalled."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "C — Correct",
        reason:
          "'listed' = past participle (ADJ modifier untuk 'car'), 'had stalled' = main verb (past perfect). Correct.",
      },
      {
        id: "adv-g3-ex5-3",
        type: "multiple-choice",
        section: "part2",
        question:
          'Exercise 5 — Past Participles: Correct (C) or Incorrect (I)?\n\n"The chapters were taught by the professor this morning will be on next week\'s exam."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "I — Incorrect",
        reason:
          "'were taught' = verb1, 'will be' = verb2. Double verb tanpa conjunction → Incorrect. Harusnya: 'The chapters taught by the professor this morning will be on next week's exam.'",
      },
      {
        id: "adv-g3-ex5-4",
        type: "multiple-choice",
        section: "part2",
        question:
          'Exercise 5 — Past Participles: Correct (C) or Incorrect (I)?\n\n"The loaves of bread were baked in a brick oven at a low temperature for many hours."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "C — Correct",
        reason:
          "'were baked' = passive main verb (satu verb utama). Kalimat pasif sederhana yang benar. Correct.",
      },
      {
        id: "adv-g3-ex5-5",
        type: "multiple-choice",
        section: "part2",
        question:
          'Exercise 5 — Past Participles: Correct (C) or Incorrect (I)?\n\n"The ports were reached by the sailors were under the control of a foreign nation."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "I — Incorrect",
        reason:
          "'were reached' = verb1, 'were under' = verb2. Double verb tanpa conjunction → Incorrect. Harusnya: 'The ports reached by the sailors were under the control of a foreign nation.'",
      },
      {
        id: "adv-g3-ex5-6",
        type: "multiple-choice",
        section: "part2",
        question:
          'Exercise 5 — Past Participles: Correct (C) or Incorrect (I)?\n\n"Those suspected in the string of robberies were arrested by the police."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "C — Correct",
        reason:
          "'suspected' = past participle (ADJ modifier untuk 'those'), 'were arrested' = main verb. Correct.",
      },
      {
        id: "adv-g3-ex5-7",
        type: "multiple-choice",
        section: "part2",
        question:
          'Exercise 5 — Past Participles: Correct (C) or Incorrect (I)?\n\n"The pizza is served in this restaurant is the tastiest in the county."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "I — Incorrect",
        reason:
          "'is served' = verb1, 'is' = verb2. Double verb tanpa conjunction → Incorrect. Harusnya: 'The pizza served in this restaurant is the tastiest in the county.'",
      },
      {
        id: "adv-g3-ex5-8",
        type: "multiple-choice",
        section: "part2",
        question:
          'Exercise 5 — Past Participles: Correct (C) or Incorrect (I)?\n\n"The courses are listed on the second page of the brochure have several prerequisites."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "I — Incorrect",
        reason:
          "'are listed' = verb1, 'have' = verb2. Double verb tanpa conjunction → Incorrect. Harusnya: 'The courses listed on the second page of the brochure have several prerequisites.'",
      },
      {
        id: "adv-g3-ex5-9",
        type: "multiple-choice",
        section: "part2",
        question:
          'Exercise 5 — Past Participles: Correct (C) or Incorrect (I)?\n\n"All the tenants were invited to the Independence Day barbecue at the apartment complex."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "C — Correct",
        reason:
          "'were invited' = passive main verb (satu verb utama). Kalimat pasif sederhana yang benar. Correct.",
      },
      {
        id: "adv-g3-ex5-10",
        type: "multiple-choice",
        section: "part2",
        question:
          'Exercise 5 — Past Participles: Correct (C) or Incorrect (I)?\n\n"Any bills paid by the first of the month will be credited to your account by the next day."',
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "C — Correct",
        reason:
          "'paid' = past participle (ADJ modifier untuk 'bills'), 'will be credited' = main verb (passive future). Correct.",
      },
    ],
  },

  // ── Day 5 · Adverbial Clause ─────────────────────────────────────────────────

  // ── Day 6 · Causative Verb ───────────────────────────────────────────────────
  {
    id: "adv-grammar-4b",
    track: "grammar",
    day: 5,
    tutor: "Ms. Vita",
    title: "Causative Verb",
    subtitle: "Get · Have · Make · Let · Help — Active & Passive",
    overview:
      "Causative Verb (CV) digunakan ketika subjek menyuruh/meminta/memaksa/mengizinkan orang lain melakukan sesuatu. Ada 5 jenis CV: Get (persuade), Have (ask), Make (force), Let (allow), Help (assist). Setiap verb punya formula Active dan Passive yang berbeda.",
    materialSections: [
      {
        title: "Pengertian & Ketentuan Causative Verb",
        points: [
          "Causative Verb (CV) = Verb makes someone do something",
          "Verb yg menyuruh/menyebabkan orang lain melakukan pekerjaan",
          "",
          "Types:",
          "Get (persuade) · Have (ask) · Make (force) · Let (allow) · Help (assist)",
          "",
          "Key Terms:",
          "Agent = orang/benda yg meminta, menyuruh",
          "Object = orang/benda yg diterima pekerjaan",
          "",
          "Ketentuan:",
          "→ Berlaku rumus khusus yg aktif & passive",
          "→ CV bisa diganti berdasarkan subject & bentuk tertennya",
          "→ Rumus bersifat absolut",
          "→ Beberapa jenis tidak bermakna asli",
          "→ Jk menggunakan verb yg bermakna asli maka menggunakan rumus biasa",
        ],
      },
      {
        title: "Get, Have, Make, Let, Help — Formula & Contoh",
        points: [
          "──1) GET → persuade (meyakinkan)──",
          "Active → S + Get + Agent + to-Inf + object:",
          "   'I get my friend to take my phone'",
          "   'the pilot got the passengers to sit / still'",
          "   'He gets the captain to lead the competition'",
          "Passive → S + get + object + V3 + (by Agent):",
          "   'the board will get the files reviewed by an accountant'",
          "   'the secretary has gotten the printer repaired immediately'",
          "",
          "──2) HAVE → meminta (ask)──",
          "Active → S + have + Agent + V1 (bare) + object:",
          "   'the security had the thief return the stealing stuff'",
          "   'the vice president has the people follow the rules'",
          "   'the designer had the sailors sew based on his design'",
          "Passive → S + have + object + V3 + (by Agent):",
          "   'the boys have their hair cut'",
          "   'I have my nails done'",
          "   'the technician has the machine sent'",
          "",
          "──3) MAKE → force (memaksa)──",
          "Active → S + make + Agent + V1 (bare) + object:",
          "   'they made the corruptors admit their mistake'",
          "   'my brother makes me memorize all of the formulas fast'",
          "Passive → S + make + object + V3 + (by Agent):",
          "   'the minister of finance will make the taxation rate increased'",
          "   'the poet has made her work accepted based on current circumstances'",
          "",
          "──4) LET → allow / permit (mengizinkan)──",
          "Active → S + let + Agent + V1 (bare) + object:",
          "   'I let my sister eat the candy'",
          "   'my mom lets the cat play in the garden'",
          "Passive → S + let + object + V3 + (by Agent):",
          "   'they will let the floor swept manually'",
          "   'the engineer has let the prototype copied by his junior'",
          "",
          "──5) HELP → assist (membantu)──",
          "⚠ Hanya Active — tidak ada passive causative",
          "Active → S + help + Agent + to-Inf / V1 (bare) + object:",
          "   'I help my mom carry / to carry the heavy stuff'",
          "   'She helps her friends arrange / to arrange the puzzle'",
          "",
          "──Ordinary Verb (non-causative)──",
          "→ It will be back to the usual formula",
          "→ All use to-V1 (active) / to be + V3 (passive):",
          "   'I persuade my sister to buy me some food.'",
          "   'they asked the box to be lifted in the trunk.'",
          "   'She forces her junior to ride a car.'",
          "   'He allowed his gadget to be checked.'",
        ],
      },
    ],
    exercises: [
      {
        id: "adv-g4-mc1",
        type: "multiple-choice",
        question: "I ______ my friend to take my phone.",
        options: ["A. made", "B. had", "C. got", "D. let"],
        correctAnswer: "C. got",
        reason:
          "GET active = S + Get + Agent + to-Inf. 'I get my friend to take' — langsung dari contoh papan tulis. GET pakai to-Inf, bukan V1 bare.",
      },
      {
        id: "adv-g4-mc2",
        type: "multiple-choice",
        question: "The boys have their hair ______.",
        options: ["A. cut", "B. cutting", "C. to cut", "D. cuts"],
        correctAnswer: "A. cut",
        reason:
          "HAVE passive = S + have + object + V3. 'Their hair' = object (benda), 'cut' = V3 (past participle). Dari contoh: 'the boys have their hair cut'.",
      },
      {
        id: "adv-g4-mc3",
        type: "multiple-choice",
        question: "They made the corruptors ______ their mistake.",
        options: ["A. admitting", "B. admitted", "C. to admit", "D. admit"],
        correctAnswer: "D. admit",
        reason:
          "MAKE active = S + make + Agent + V1 bare. 'The corruptors' = Agent, 'admit' = V1 bare (tidak pakai TO, tidak pakai -ing). Dari contoh papan tulis.",
      },
      {
        id: "adv-g4-mc4",
        type: "multiple-choice",
        question: "My mom lets the cat ______ in the garden.",
        options: ["A. to play", "B. played", "C. play", "D. playing"],
        correctAnswer: "C. play",
        reason:
          "LET active = S + let + Agent + V1 bare. 'The cat' = Agent, 'play' = V1 bare. LET tidak pakai TO infinitive. Dari contoh: 'my mom lets the cat play in the garden'.",
      },
      {
        id: "adv-g4-mc5",
        type: "multiple-choice",
        question: "She helps her friends ______ the puzzle.",
        options: ["A. arranges", "B. arranged", "C. arrange", "D. arranging"],
        correctAnswer: "C. arrange",
        reason:
          "HELP active = S + help + Agent + V1 bare / to-Inf. Kedua bentuk 'arrange' dan 'to arrange' benar. Dari contoh: 'She helps her friends arrange / to arrange the puzzle'.",
      },
      {
        id: "adv-g4-mc6",
        type: "multiple-choice",
        question: "The secretary has gotten the printer ______ immediately.",
        options: ["A. repair", "B. to repair", "C. repairing", "D. repaired"],
        correctAnswer: "D. repaired",
        reason:
          "GET passive = S + get + object + V3. 'The printer' = object (benda), 'repaired' = V3. Dari contoh: 'the secretary has gotten the printer repaired immediately'.",
      },
      {
        id: "adv-g4-mc7",
        type: "multiple-choice",
        question: "The engineer has let the prototype ______ by his junior.",
        options: ["A. copy", "B. to copy", "C. copied", "D. copying"],
        correctAnswer: "C. copied",
        reason:
          "LET passive = S + let + object + V3. 'The prototype' = object (benda), 'copied' = V3. Dari contoh: 'the engineer has let the prototype copied by his junior'.",
      },
      {
        id: "adv-g4-task",
        type: "task",
        section: "final",
        question:
          "Tulis 5 kalimat Causative Verb menggunakan verb yang berbeda-beda (GET, HAVE, MAKE, LET, HELP). Pilih active atau passive untuk setiap kalimat dan cantumkan label Agent/Object pada hasil tulisanmu.",
        sampleAnswer:
          "1. GET active: I got my friend to fix my laptop. (Agent = my friend, to-Inf = to fix)\n2. HAVE passive: She had her dress altered before the wedding. (Object = her dress, V3 = altered)\n3. MAKE active: The teacher made the students rewrite the essay. (Agent = the students, V1 = rewrite)\n4. LET active: My parents let me travel abroad alone. (Agent = me, V1 = travel)\n5. HELP active: He helped his brother carry / to carry the boxes. (Agent = his brother, V1/to-Inf = carry)",
      },
    ],
  },

  // ── Day 7 · Comparison Degree ────────────────────────────────────────────────
  {
    id: "adv-grammar-5",
    track: "grammar",
    day: 6,
    tutor: "Ms. Vita",
    title: "Comparison Degree",
    subtitle:
      "Positive · Comparative (b.1–b.4) · Superlative (c.1–c.3) · Inversion Alternatives",
    overview:
      "Comparison Degree (Perbandingan) terbagi tiga: Positive Degree (perbandingan setara — as...as), Comparative Degree (perbandingan tidak setara — -er/more/less + than), dan Superlative Degree (yang paling — the -est/most/least). Termasuk pola inversion alternatives pada bentuk komparatif.",
    materialSections: [
      {
        title: "Jenis-Jenis Comparison Degree",
        points: [
          "a) POSITIVE DEGREE  — Perbandingan Setara",
          "b) COMPARATIVE DEGREE — Perbandingan Tidak Setara",
          "c) SUPERLATIVE DEGREE — Yang Paling",
        ],
      },
      {
        title: "a) Positive Degree — Perbandingan Setara",
        points: [
          "Form:  as + Adj / Adv + as",
          "",
          "NB — pilih ADJ atau ADV:",
          "  • ADJ → pakai verb tobe (is, am, are, was, were, be, been)",
          "  • ADV → pakai verb aktif/pasif (does, did, has, will, ran, dll.)",
          "",
          "Contoh ADJ (verb tobe):",
          "{{alts: She is as smart as BJ Habibie. | as is BJ Habibie. | or BJ Habibie is.}}",
          "{{alts: Ms Salsa was as diligent as her sister. | as was her sister. | as her sister was.}}",
          "",
          "Contoh ADV (action verb):",
          "{{alts: She studies as smartly as BJ Habibie. | or does BJ Habibie. | or BJ Habibie does.}}",
          "{{alts: Mr Nabil ran as fast as the deer. | as did the deer. | as the deer did.}}",
          "",
          "Contoh lainnya:",
          "  → Burj Khalifa is as high as the Eiffel Tower.",
          "  → The demand increases the same as the supply.",
        ],
      },
      {
        title: "b) Comparative Degree — Perbandingan Tidak Setara",
        points: [
          "Form — Qualitative (Adj/Adv):",
          "  more + Adj/Adv + than   → lebih (prefix)",
          "  less  + Adj/Adv + than  → kurang",
          "  Adj/Adv + er    + than  → lebih (suffix, 1-2 suku kata)",
          "",
          "Form — Quantitative (Noun):",
          "  more / less + noun + than",
        ],
      },
      {
        title: "b.1) Adj/Adv + er + than  (1-2 suku kata)",
        points: [
          "Gunakan SUFFIX -er untuk adj/adv dengan 1-2 suku kata.",
          "",
          "{{alts: The kite flew higher than the plane. | than did the plane. | than the plane did.}}",
          "{{alts: Her dress looks prettier than my gown. | than does my gown. | than my gown does.}}",
          "{{alts: Yogurt has a higher percentage than milk. | than does milk. | than milk does.}}",
          "{{alts: She has been here longer than I (have). | than have I. | than I have.}}",
        ],
      },
      {
        title: "b.2) more + Adj/Adv + than  (2-3 suku kata)",
        points: [
          "Gunakan PREFIX more untuk adj/adv dengan 2-3+ suku kata.",
          "",
          "{{alts: She will finish the report more slowly than I (will). | than will I. | than I will.}}",
          "{{alts: He drove the car more quickly than I (did). | than did I. | than I did.}}",
          "{{alts: I get a more expensive price than she (does). | than does she. | than she does.}}",
        ],
      },
      {
        title: "b.3) less + Adj/Adv + than  (semua suku kata)",
        points: [
          "Gunakan less untuk menyatakan yang KURANG/LEBIH SEDIKIT kualitasnya.",
          "",
          "{{alts: She is more beautiful than Selena. | than is Selena. | than Selena is.}}",
          "{{alts: The temperature was less hot than the weather. | than was the weather. | than the weather was.}}",
          "  → The data are less favourable.",
          "  → My neighbours are less interesting than your neighbour.",
        ],
      },
      {
        title: "b.4) more/less + Noun + than  (Count & Uncountable)",
        points: [
          "Gunakan more/less sebelum NOUN (baik count maupun uncountable).",
          "",
          "{{alts: I earn much more money than you (do). | than do you. | than you do.}}",
          "  → Less people are interested in learning English.",
          "  → I read more books every day.",
          "  → She drank less water.",
        ],
      },
      {
        title: "c.1) the + Adj/Adv + est  (1-2 suku kata)",
        points: [
          "Superlative suffix: the + Adj/Adv + est (untuk 1-2 suku kata).",
          "",
          "  → Semeru has the highest peak of mountain in Jago.",
          "  → The lowest / deepest trench in the ocean is the Mariana Trench.",
          "  → This grocery store offers the cheapest price.",
          "  → Ferrari car is the fastest in F1.",
          "  → Mr Alga has the longest hair in the class.",
        ],
      },
      {
        title: "c.2) the most + Adj/Adv  (2-3+ suku kata)",
        points: [
          "Superlative prefix: the most + Adj/Adv (untuk 2-3+ suku kata).",
          "",
          "  → I got the most unforgettable memory in Pune.",
          "  → Germany experienced the most favourable conditions among others.",
          "  → Woman is the most complicated creature in the world.",
        ],
      },
      {
        title: "c.3) the least + Adj/Adv  (semua suku kata)",
        points: [
          "Superlative inferior: the least + Adj/Adv (semua suku kata).",
          "",
          "  → She is the least experienced candidate.",
          "  → Candle has the least bright light.",
          "  → The trend reached the least point in the final year.",
        ],
      },
      {
        title: "Kapan Pakai -er/-est?",
        points: [
          "1) Adj/Adv 1 SUKU KATA → SUFFIX -er/-est:",
          "   high → higher → the highest",
          "   low  → lower  → the lowest",
          "   cheap → cheaper → the cheapest",
          "   long  → longer  → the longest",
          "",
          "2) Adj 2 suku kata berakhiran -er, -y, -le, -ow, -some → SUFFIX atau PREFIX:",
          "   clever   → cleverer / more clever   — the cleverest / the most clever",
          "   pretty   → prettier / more pretty   — the prettiest / the most pretty",
          "   gentle   → gentler  / more gentle   — the gentlest  / the most gentle",
          "   narrow   → narrower / more narrow   — the narrowest / the most narrow",
          "   handsome → handsomer / more handsome — the handsomest / the most handsome",
          "",
          "3) Adj 3+ SUKU KATA → selalu PREFIX (more/most):",
          "   beautiful → more beautiful → the most beautiful",
        ],
      },
    ],
    exercises: [
      {
        id: "adv-g5-mc1",
        type: "multiple-choice",
        question: "The kite flew ______ the plane.",
        options: [
          "A. more high than",
          "B. the highest than",
          "C. higher than",
          "D. highest than",
        ],
        correctAnswer: "C. higher than",
        reason:
          "'High' = 1 suku kata → pakai SUFFIX -er: 'higher than'. 'More high' salah untuk adj 1 suku kata reguler. Comparative b.1.",
      },
      {
        id: "adv-g5-mc2",
        type: "multiple-choice",
        question: "He drove the car ______ I did.",
        options: [
          "A. more quickly as",
          "B. more quickly than",
          "C. most quickly than",
          "D. quicker than",
        ],
        correctAnswer: "B. more quickly than",
        reason:
          "'Quickly' = adv 3 suku kata → pakai PREFIX: 'more quickly than'. Comparative b.2. 'Quicker' salah untuk adverb 3 suku kata.",
      },
      {
        id: "adv-g5-mc3",
        type: "multiple-choice",
        question: "My neighbours are ______ yours.",
        options: [
          "A. less interesting as",
          "B. least interesting than",
          "C. less interesting than",
          "D. more less interesting",
        ],
        correctAnswer: "C. less interesting than",
        reason:
          "Comparative inferior: LESS + adj + THAN. 'Less interesting than' = kurang menarik daripada. Comparative b.3.",
      },
      {
        id: "adv-g5-mc4",
        type: "multiple-choice",
        question: "Ferrari car is ______ in F1.",
        options: [
          "A. most fast",
          "B. faster",
          "C. the fastest",
          "D. the most fastest",
        ],
        correctAnswer: "C. the fastest",
        reason:
          "Superlative 1 suku kata: the + adj + est. 'Fast' → 'the fastest'. Superlative selalu pakai 'the'. 'The most fastest' = double superlative (salah). c.1.",
      },
      {
        id: "adv-g5-mc5",
        type: "multiple-choice",
        question: "Woman is ______ creature in the world.",
        options: [
          "A. the most complicated",
          "B. the more complicated",
          "C. most complicated",
          "D. the complicatedest",
        ],
        correctAnswer: "A. the most complicated",
        reason:
          "Superlative 3+ suku kata: THE MOST + adj. 'Complicated' = 4 suku kata → 'the most complicated'. Superlative c.2.",
      },
      {
        id: "adv-g5-mc6",
        type: "multiple-choice",
        question: "She is as smart ______ BJ Habibie.",
        options: ["A. than", "B. as", "C. like", "D. with"],
        correctAnswer: "B. as",
        reason:
          "Positive degree: as + adj + AS. Kedua 'as' wajib digunakan. 'Than' untuk comparative, bukan positive degree.",
      },
      {
        id: "adv-g5-mc7",
        type: "multiple-choice",
        question: "I earn much more money than you ______.",
        options: ["A. does", "B. do", "C. did", "D. are"],
        correctAnswer: "B. do",
        reason:
          "Inversion alternative: 'than you do' = subjek (you) + auxiliary (do). Karena kalimat utama Present Simple dengan 'I earn', maka auxiliary = 'do'. Comparative b.4.",
      },
      {
        id: "adv-g5-task",
        type: "task",
        section: "final",
        question:
          "A. Lengkapi kalimat dengan bentuk comparison yang tepat:\n1. Burj Khalifa / high / Eiffel Tower (positive degree)\n2. She will finish the report / slowly / I will (comparative b.2)\n3. Ferrari car / fast / car in F1 (superlative c.1)\n4. Woman / complicated / creature in the world (superlative c.2)\n\nB. Tulis 2 inversion alternatives dari kalimat berikut:\n5. Her dress looks prettier than my gown.\n   → than _____ / than _____\n6. He drove the car more quickly than I did.\n   → than _____ / than _____\n\nC. Pilih bentuk yang BENAR:\n7. clever → ______ (comparative, 2 opsi boleh)\n8. beautiful → ______ (superlative)",
        sampleAnswer:
          "A.\n1. Burj Khalifa is as high as the Eiffel Tower. (as + adj + as)\n2. She will finish the report more slowly than I will. (more + adv + than)\n3. Ferrari car is the fastest car in F1. (the + adj + est, c.1)\n4. Woman is the most complicated creature in the world. (the most + adj, c.2)\n\nB.\n5. → than does my gown. / than my gown does.\n6. → than did I. / than I did.\n\nC.\n7. clever → cleverer (suffix) / more clever (prefix) — keduanya benar\n8. beautiful → the most beautiful (prefix, 3+ suku kata selalu prefix)",
      },
    ],
  },

  // ── Day 8 · Irregular & Double Comparative + Logical Comparison ─────────────
  {
    id: "adv-grammar-5b",
    track: "grammar",
    day: 7,
    tutor: "Ms. Vita",
    title: "Irregular Comparison · Double Comparative · Logical Comparison",
    subtitle:
      "Irregular Forms · DC I (sebab-akibat) · DC II (semakin…semakin…) · Perbandingan Setara",
    overview:
      "Melanjutkan materi Comparative Degree: bentuk irregular, Double Comparative (DC) I sebab-akibat dan DC II semakin…semakin…, serta Logical Comparison (Perbandingan Setara) dengan pronoun that/those dan ekspresi similar to, different from, the same as.",
    materialSections: [
      {
        title: "Irregular Comparison",
        points: [
          "Kata sifat/adverb berikut memiliki bentuk comparative dan superlative yang TIDAK BERATURAN:",
          "",
          "Word              | Comparative  | Superlative",
          "  good / well     | better       | the best",
          "  bad             | worse        | the worst",
          "  far             | farther      | the farthest",
          "  early           | earlier      | the earliest",
          "  soon            | sooner       | —",
          "",
          "Contoh kalimat:",
          "  → My score is better than your score.",
          "  → The worst accident happening is caused by human.",
          "  → The earliest human touching down on the moon is Neil Armstrong.",
        ],
      },
      {
        title: "Double Comparative (DC) I — Sebab-Akibat",
        points: [
          "DC I digunakan untuk menyatakan hubungan SEBAB-AKIBAT.",
          "",
          "Formula:",
          "  The + comparative (+S+V)  ,  the + comparative (+S+V)",
          "  ↑ sebab/kondisi                ↑ akibat/hasil",
          "",
          "Contoh:",
          "  → The sooner, the better.",
          "  → The more I chase you, the farther you are.",
          "              S      V              S        V",
          "  → The more we know someone's position, the more we can respect them.",
          "              S   V                                S       V",
          "  → The more you complain, the less chance you will get.",
          "              S     V                          S      V",
          "  → The cuter the stuff is, the greater number of customers.",
          "                    S    V          V",
          "",
          "Catatan: Jika tidak ada verb eksplisit, subjek dan verb tetap tersirat.",
          "  e.g: The sooner (, you leave), the better (, it is).",
        ],
      },
      {
        title: "Double Comparative (DC) II — Semakin…Semakin…",
        points: [
          "DC II digunakan untuk menyatakan sesuatu yang terus MENINGKAT atau MENURUN.",
          "",
          "Formula:",
          "  Comparative + and + comparative",
          "  (S + V + comparative + and + comparative)",
          "",
          "Contoh:",
          "  → She looks prettier and prettier.",
          "  → Mr. Lessan is getting more and more annoying.",
          "  → The visitors of Bali Island are more and more.",
          "  → Grammar becomes easier and easier.",
          "  → Her followers are getting lesser and lesser.",
          "",
          "Catatan penting:",
          "  • Jika 1 suku kata / -y → comparative + and + comparative:",
          "    prettier and prettier  |  harder and harder",
          "  • Jika 2+ suku kata → more and more + adj / less and less + adj:",
          "    more and more annoying  |  less and less popular",
        ],
      },
      {
        title: "Logical Comparison — Perbandingan Setara",
        points: [
          "Logical Comparison: membandingkan dua hal secara SETARA dan LOGIS.",
          "",
          "Gunakan THAT / THOSE untuk menggantikan noun agar perbandingan logis:",
          "  • THAT  → menggantikan noun SINGULAR",
          "  • THOSE → menggantikan noun PLURAL",
          "  Berlaku untuk comparative & positive degree.",
          "",
          "❌ SALAH:",
          "   The ears of elephants are wider than giraffe.",
          "   (membandingkan 'ears' ← → 'giraffe' — tidak logis!)",
          "",
          "✅ BENAR:",
          "   The ears of elephants are wider than those of giraffe.",
          "   (THOSE = the ears → plural, logis ✓)",
          "",
          "Contoh lainnya:",
          "  → The price of my bag is cheaper than that of your bag.",
          "    (THAT = the price → singular)",
          "  → My hometown environment is freer than that of yours.",
          "    (THAT = environment → singular)",
          "  → The movements of data in 1995 were as fluctuative as those of in 2004.",
          "    (THOSE = the movements → plural)",
          "  → The air quality in Indonesia is as bad as that in India.",
          "    (THAT = the air quality → singular)",
        ],
      },
      {
        title:
          "Similar Expressions — similar to · different from · the same as",
        points: [
          "Ekspresi berikut juga digunakan untuk perbandingan setara:",
          "",
          "similar to     = sama  →  subjek + be + similar to + that/those + of...",
          "different from = berbeda dari  →  subjek + be + different from + those/that + of...",
          "the same as    = sama dengan   →  subjek + be + the same as + that + in...",
          "",
          "Contoh:",
          "  → The size of my shoes is similar to that of yours.",
          "    (THAT = the size → singular)",
          "  → The colors of my drawing are different from those of yours.",
          "    (THOSE = the colors → plural)",
          "  → Indonesian economic condition is the same as that in Malaysia.",
          "    (THAT = Indonesian economic condition → singular)",
        ],
      },
    ],
    exercises: [
      {
        id: "adv-g5b-mc1",
        type: "multiple-choice",
        question: "The sooner you start, ______ you will finish.",
        options: [
          "A. the more early",
          "B. the earlier",
          "C. the earliest",
          "D. earlier",
        ],
        correctAnswer: "B. the earlier",
        reason:
          "DC I (sebab-akibat): The + comparative, the + comparative. 'Early' → irregular: earlier. Jawaban: B. The sooner…, the earlier…",
      },
      {
        id: "adv-g5b-mc2",
        type: "multiple-choice",
        question: "______ he complained, ______ help he received.",
        options: [
          "A. The more / the less",
          "B. More / less",
          "C. The most / the least",
          "D. The more / less",
        ],
        correctAnswer: "A. The more / the less",
        reason:
          "DC I: The + comparative, the + comparative. 'The more he complained, the less help he received.' Kedua bagian harus pakai 'the + comparative'. Jawaban: A.",
      },
      {
        id: "adv-g5b-mc3",
        type: "multiple-choice",
        question: "Traffic in this city is getting ______.",
        options: [
          "A. more and more worse",
          "B. worse and worse",
          "C. more worse and worse",
          "D. bad and bad",
        ],
        correctAnswer: "B. worse and worse",
        reason:
          "DC II (semakin...semakin...): comparative + and + comparative. 'Bad' → irregular comparative: worse. Jadi 'worse and worse'. 'More and more worse' salah (double). Jawaban: B.",
      },
      {
        id: "adv-g5b-mc4",
        type: "multiple-choice",
        question:
          "The population of Jakarta is larger than ______ of Surabaya.",
        options: ["A. it", "B. that", "C. those", "D. the population"],
        correctAnswer: "B. that",
        reason:
          "THAT menggantikan singular noun 'the population'. Logical comparison: membandingkan 'the population of Jakarta' (singular) → pakai THAT. THOSE untuk plural. Jawaban: B.",
      },
      {
        id: "adv-g5b-mc5",
        type: "multiple-choice",
        question:
          "The leaves of maple trees are more colorful than ______ of pine trees.",
        options: ["A. that", "B. it", "C. those", "D. the leaf"],
        correctAnswer: "C. those",
        reason:
          "THOSE menggantikan plural noun 'the leaves'. Logical comparison: membandingkan 'the leaves' (plural) → pakai THOSE. 'That' untuk singular. Jawaban: C.",
      },
      {
        id: "adv-g5b-mc6",
        type: "multiple-choice",
        question: "The design of my portfolio is ______ yours.",
        options: [
          "A. similar with",
          "B. same as",
          "C. similar to that of",
          "D. different with",
        ],
        correctAnswer: "C. similar to that of",
        reason:
          "'Similar to' (bukan 'similar with') + THAT OF untuk logical comparison (singular noun). Ekspresi yang benar: similar to that of. Jawaban: C.",
      },
      {
        id: "adv-g5b-mc7",
        type: "multiple-choice",
        question: "She is becoming ______ as her presentation skills improve.",
        options: [
          "A. more confident and more confident",
          "B. most and most confident",
          "C. more and more confident",
          "D. confident and confident",
        ],
        correctAnswer: "C. more and more confident",
        reason:
          "DC II untuk adj 2+ suku kata: more and more + adj. 'Confident' = 3 suku kata → 'more and more confident'. Bukan 'more confident and more confident'. Jawaban: C.",
      },
      {
        id: "adv-g5b-task",
        type: "task",
        section: "final",
        question:
          "A. Lengkapi kalimat DC I:\n1. The harder you study, ______ (good) your grades will be.\n2. ______ (many) people attend, the merrier it will be.\n3. The more she practised, ______ (fluent) she became.\n\nB. Ubah menjadi DC II:\n4. She sings well. Her singing improves every day. → She sings ______.\n5. The exam is becoming difficult. → The exam is becoming ______.\n\nC. Perbaiki logical comparison yang salah:\n6. The price of this hotel is higher than the other hotel.\n7. The results of the 2020 research are more accurate than the 2019 research.\n8. The air quality in Bali is as good as Jakarta.",
        sampleAnswer:
          "A.\n1. The harder you study, the better your grades will be.\n2. The more people attend, the merrier it will be.\n3. The more she practised, the more fluent she became.\n\nB.\n4. She sings better and better. (1 suku kata: well → better)\n5. The exam is becoming more and more difficult. (3 suku kata: 'more and more + adj')\n\nC.\n6. The price of this hotel is higher than THAT OF the other hotel. (THAT = the price, singular)\n7. The results of the 2020 research are more accurate than THOSE OF the 2019 research. (THOSE = the results, plural)\n8. The air quality in Bali is as good as THAT IN Jakarta. (THAT = the air quality, singular)",
      },
    ],
  },

  // ── Day 8A · Noun Clause — Shortcuts + Fill in the Blank ────────────────────
  {
    id: "adv-g8a",
    track: "grammar",
    day: 8,
    tutor: "Ms. Vita",
    title: "Noun Clause — Shortcuts & Fill in the Blank",
    subtitle: "Whether / If / Who / Whom / Which / What · 15 soal latihan",
    overview:
      "Latihan soal fill-in-the-blank Noun Clause. Gunakan shortcuts di bawah untuk menjawab dengan cepat dan tepat.",
    materialSections: [
      {
        title: "Quick Tips — Cara Menjawab Soal NC",
        points: [
          "1. IT IS / IT WAS + adj  →  jawaban pasti THAT",
          "   Contoh: It is clear ___ she is right. → that she is right.",
          "   Alasan: 'It is + adj + that + S + V' adalah struktur baku NC of Statement.",
          "",
          "2. Setelah THAT  →  pasti S + V (word order pernyataan, BUKAN question order)",
          "   ✅ I know that he is right.   ❌ I know that is he right.",
          "",
          "3. THAT = memberikan pernyataan / fakta (NC of Statement)",
          "   Trigger: know, think, believe, feel, say, state, prove, indicate, show, obvious, clear, certain, sure...",
          "",
          "4. THAT tidak bisa langsung setelah PREPOSISI",
          "   ❌ depend on that...   ❌ surprised at that...",
          "   ✅ depend on what...   ✅ surprised at what/how...",
          "",
          "5. WHETHER / IF  →  ya/tidak indirect question",
          "   Trigger kata: wonder, doubt, unsure, uncertain, not sure, ask, decide, question, confirm, know (yes/no sense)",
          "   + bila ada OR NOT di kalimat → pasti WHETHER (bukan IF)",
          "   ✅ She wonders whether he will come or not.",
          "   ✅ I'm not sure if/whether they passed.",
          "   ❌ WHETHER/IF bisa setelah preposisi? → hanya WHETHER yang bisa.",
          "",
          "6. WHO  →  subjek klausa, merujuk ORANG",
          "   Nobody knows WHO will be appointed. (who = subject of 'will be appointed')",
          "",
          "7. WHOM  →  objek klausa, merujuk ORANG (setelah verb atau preposisi)",
          "   Tell me WHOM you trust. (whom = object of 'trust')",
          "",
          "8. WHICH  →  pilihan spesifik dari sekumpulan (specific selection)",
          "   We couldn't decide WHICH of the two designs was better.",
          "",
          "9. WHAT  →  benda/konsep terbuka (open-ended thing or concept)",
          "   It is unknown WHAT caused the breakdown. (what = what thing caused it)",
          "",
          "10. HOW  →  cara / tingkat (manner or degree)",
          "    I know HOW smart she is.  (how + adj + S + V)",
          "    They explained HOW the system works. (how + S + V)",
        ],
      },
    ],
    exercises: [
      {
        id: "adv-g8a-mc1",
        type: "multiple-choice",
        question:
          "The board hasn't decided ___ the new branch will be established in Jakarta or Surabaya next year.",
        options: ["A. whether", "B. who", "C. whom", "D. which"],
        correctAnswer: "A. whether",
        reason:
          "Dua pilihan (Jakarta OR Surabaya) + makna yes/no → WHETHER. 'Whether A or B' = salah satu dari dua kemungkinan.",
      },
      {
        id: "adv-g8a-mc2",
        type: "multiple-choice",
        question:
          "The supervisor asked me ___ I had completed all the revisions before the deadline yesterday.",
        options: ["A. if", "B. who", "C. whom", "D. which"],
        correctAnswer: "A. if",
        reason:
          "Indirect yes/no question setelah 'asked' → IF atau WHETHER. Tidak ada 'or not' di sini → IF bisa dipakai.",
      },
      {
        id: "adv-g8a-mc3",
        type: "multiple-choice",
        question:
          "Nobody knows ___ will be appointed as the new ambassador to Japan by the president.",
        options: ["A. who", "B. whom", "C. what", "D. which"],
        correctAnswer: "A. who",
        reason:
          "WHO = subjek NC merujuk orang. '___ will be appointed' → butuh subjek pronoun → WHO (bukan WHOM yang adalah objek).",
      },
      {
        id: "adv-g8a-mc4",
        type: "multiple-choice",
        question:
          "It remains unclear ___ the annual meeting will be held at the headquarters or at a different location.",
        options: ["A. whether", "B. who", "C. what", "D. which"],
        correctAnswer: "A. whether",
        reason:
          "TIP 5: 'unclear' = trigger WHETHER/IF. Ada makna dua kemungkinan (headquarters OR different location) → WHETHER.",
      },
      {
        id: "adv-g8a-mc5",
        type: "multiple-choice",
        question:
          "The principal wants to find out ___ of the students in the science club won the national competition.",
        options: ["A. which", "B. who", "C. whom", "D. what"],
        correctAnswer: "A. which",
        reason:
          "TIP 8: WHICH + 'of the students' = pilihan spesifik dari kelompok tertentu (specific selection from a defined group).",
      },
      {
        id: "adv-g8a-mc6",
        type: "multiple-choice",
        question:
          "We are not sure ___ the financial report was reviewed by the auditing team last week.",
        options: ["A. if", "B. who", "C. whom", "D. which"],
        correctAnswer: "A. if",
        reason:
          "TIP 5: 'not sure' = trigger WHETHER/IF. Pertanyaan ya/tidak → IF.",
      },
      {
        id: "adv-g8a-mc7",
        type: "multiple-choice",
        question:
          "The question is ___ should be responsible for coordinating the international conference this year.",
        options: ["A. who", "B. whom", "C. what", "D. which"],
        correctAnswer: "A. who",
        reason:
          "TIP 6: WHO = subjek NC merujuk orang. '___ should be responsible' → butuh subjek yang merujuk orang → WHO.",
      },
      {
        id: "adv-g8a-mc8",
        type: "multiple-choice",
        question:
          "They haven't decided ___ will cancel the outdoor event because of the severe weather forecast or not.",
        options: ["A. whether", "B. who", "C. whom", "D. which"],
        correctAnswer: "A. whether",
        reason:
          "TIP 5: Ada 'or not' di akhir klausa → pasti WHETHER (bukan IF, karena IF tidak bisa langsung sebelum 'or not' di awal).",
      },
      {
        id: "adv-g8a-mc9",
        type: "multiple-choice",
        question:
          "It has not been confirmed ___ the guest speaker will be able to attend the business summit in Singapore.",
        options: ["A. whether or not", "B. who", "C. what", "D. which"],
        correctAnswer: "A. whether or not",
        reason:
          "'confirmed' = trigger WHETHER/IF. 'Whether or not' langsung di depan = WHETHER OR NOT (opsi A menggunakan bentuk lengkap).",
      },
      {
        id: "adv-g8a-mc10",
        type: "multiple-choice",
        question:
          "We couldn't decide ___ of the two proposed designs would be more effective for the marketing campaign.",
        options: ["A. which", "B. who", "C. whom", "D. what"],
        correctAnswer: "A. which",
        reason:
          "TIP 8: WHICH + 'of the two' = pilihan spesifik antara dua opsi yang sudah ditetapkan.",
      },
      {
        id: "adv-g8a-mc11",
        type: "multiple-choice",
        question:
          "The committee is discussing ___ should represent the university at the upcoming global youth forum.",
        options: ["A. who", "B. whom", "C. what", "D. which"],
        correctAnswer: "A. who",
        reason:
          "TIP 6: WHO = subjek NC merujuk orang. '___ should represent' → WHO (subject position, person).",
      },
      {
        id: "adv-g8a-mc12",
        type: "multiple-choice",
        question:
          "I'm not certain ___ she submitted the final version of her research paper on time or not.",
        options: ["A. whether", "B. who", "C. what", "D. which"],
        correctAnswer: "A. whether",
        reason:
          "TIP 5: 'not certain' = trigger WHETHER. Ada 'or not' → pasti WHETHER.",
      },
      {
        id: "adv-g8a-mc13",
        type: "multiple-choice",
        question:
          "They are still debating ___ will approve the new budget proposal after the unexpected increase in costs.",
        options: ["A. whether or not", "B. what", "C. whom", "D. which"],
        correctAnswer: "A. whether or not",
        reason:
          "'debating whether or not [they] will approve' = membahas apakah proposal itu akan disetujui atau tidak. Subjek 'they' tersirat dari klausa utama.",
      },
      {
        id: "adv-g8a-mc14",
        type: "multiple-choice",
        question:
          "The manager asked ___ could handle the investor presentation during his absence next Friday.",
        options: ["A. who", "B. whom", "C. what", "D. which"],
        correctAnswer: "A. who",
        reason:
          "TIP 6: WHO = subjek NC merujuk orang. '___ could handle' → butuh subjek orang → WHO.",
      },
      {
        id: "adv-g8a-mc15",
        type: "multiple-choice",
        question:
          "It is still unknown ___ caused the sudden breakdown of the main computer system during the conference.",
        options: ["A. what", "B. which", "C. who", "D. whom"],
        correctAnswer: "A. what",
        reason:
          "TIP 9: WHAT = hal/penyebab yang tidak diketahui (open-ended, bisa benda atau situasi). 'What caused' = penyebabnya apa. WHAT lebih tepat dari WHO untuk kerusakan sistem.",
      },
    ],
  },

  // ── Day 8B · Comparison Degree Exercise ────────────────────────────────────
  {
    id: "adv-g8b",
    track: "grammar",
    day: 8,
    tutor: "Ms. Vita",
    title: "Comparison Degree Exercise",
    subtitle:
      "Positive · Comparative · Superlative · Logical Comparison · 15 soal",
    overview:
      "Latihan soal pilihan ganda Comparison Degree dari worksheet kelas. Fokus pada as...as, than, the most, logical comparison (that of / those of), dan irregular forms.",
    materialSections: [
      {
        title: "Quick Tips — Cara Menjawab Soal Comparison",
        points: [
          "1. AS + adj/adv + AS  →  positive degree (perbandingan setara)",
          "   ✅ as good as (adj)   ✅ as well as (adv)   ❌ so good as / as high than",
          "",
          "2. VERB comparison  →  gunakan ADVERB (bukan adjective)",
          "   'train as well as' (bukan 'as good as' karena 'train' adalah verb)",
          "",
          "3. Logical Comparison (Perbandingan Setara) — jangan bandingkan benda yang berbeda jenis:",
          "   ✅ The salary of a driver is higher THAN THAT OF a teacher. (salary vs salary)",
          "   ❌ The salary of a driver is higher than a teacher. (salary vs person = salah!)",
          "   THAT OF = singular noun   |   THOSE OF = plural noun",
          "",
          "4. Superlative + OF + plural group",
          "   ✅ the most difficult OF all gases  (bukan 'more difficult of')",
          "",
          "5. COMPARATIVE + THAN (bukan 'that')",
          "   ✅ higher THAN any other one   ❌ higher THAT any other one",
          "",
          "6. Word order: superlative + adverb + adjective + noun",
          "   ✅ most commonly used material   ❌ commonly most material used",
          "",
          "7. DENSER / RICHER = comparative 1-2 suku kata (pakai -er, bukan 'more dense')",
        ],
      },
    ],
    exercises: [
      {
        id: "adv-g8b-mc1",
        type: "multiple-choice",
        question:
          "Pilots who prepare for military careers train on the ground ___ in the air.",
        options: ["A. as good as", "B. as well as", "C. well as", "D. good as"],
        correctAnswer: "B. as well as",
        reason:
          "TIP 2: 'train' adalah verb → gunakan ADVERB 'well' bukan adjective 'good'. Format: as + adv + as → 'as well as'.",
      },
      {
        id: "adv-g8b-mc2",
        type: "multiple-choice",
        question: "The salary of a bus driver is much higher ___",
        options: [
          "A. in comparison with the salary of a teacher",
          "B. than a teacher",
          "C. than that of a teacher",
          "D. to compare as a teacher",
        ],
        correctAnswer: "C. than that of a teacher",
        reason:
          "TIP 3: Logical comparison. Membandingkan salary vs salary (bukan salary vs person). 'that of' = 'the salary of'. Opsi B salah karena membandingkan salary dengan teacher (orang).",
      },
      {
        id: "adv-g8b-mc3",
        type: "multiple-choice",
        question:
          "Tuition at an American university runs ___ twenty thousand dollars a semester.",
        options: [
          "A. so high as",
          "B. as high to",
          "C. as high as",
          "D. as high than",
        ],
        correctAnswer: "C. as high as",
        reason:
          "TIP 1: Positive degree → AS + adj + AS. Hanya 'as high as' yang benar. 'So...as' hanya untuk kalimat negatif.",
      },
      {
        id: "adv-g8b-mc4",
        type: "multiple-choice",
        question:
          "The observation deck at the World Trade Center ___ in New York.",
        options: [
          "A. is highest than any other one",
          "B. is higher than any other one",
          "C. is highest that any other one",
          "D. is higher that any other one",
        ],
        correctAnswer: "B. is higher than any other one",
        reason:
          "TIP 5: Comparative + THAN (bukan 'that'). Gunakan comparative 'higher' (bukan superlative 'highest') dengan 'than any other one'.",
      },
      {
        id: "adv-g8b-mc5",
        type: "multiple-choice",
        question:
          "Migraine headaches are more frequent among women ___ among men.",
        options: ["A. than", "B. however", "C. except for", "D. as are"],
        correctAnswer: "A. than",
        reason:
          "'more frequent...than' = structure comparative standard. Parallel: 'more frequent among women than [more frequent] among men'.",
      },
      {
        id: "adv-g8b-mc6",
        type: "multiple-choice",
        question:
          "Helium is ___ all gasses to liquify and is impossible to solidify at normal air pressure.",
        options: [
          "A. more than difficult",
          "B. the most difficult of",
          "C. more difficult of",
          "D. most difficult",
        ],
        correctAnswer: "B. the most difficult of",
        reason:
          "TIP 4: Superlative + OF + plural → 'the most difficult of all gases'. Harus ada 'the' sebelum superlative.",
      },
      {
        id: "adv-g8b-mc7",
        type: "multiple-choice",
        question: "Wood has been the ___ for furniture since antiquity.",
        options: [
          "A. commonly most material used",
          "B. used material commonly used",
          "C. commonly material used most",
          "D. most commonly used material",
        ],
        correctAnswer: "D. most commonly used material",
        reason:
          "TIP 6: Urutan benar → superlative + adverb + adjective + noun = 'most commonly used material'.",
      },
      {
        id: "adv-g8b-mc8",
        type: "multiple-choice",
        question: "Living organisms contain more water ___ substance.",
        options: [
          "A. than do any other",
          "B. does than any other",
          "C. other than do they any",
          "D. than they do any other",
        ],
        correctAnswer: "A. than do any other",
        reason:
          "Inverted comparison setelah 'than': 'more water than do any other [living organisms]'. Subject-auxiliary inversion setelah 'than' sering muncul di TOEFL.",
      },
      {
        id: "adv-g8b-mc9",
        type: "multiple-choice",
        question: "The femur is the ___ in the body.",
        options: [
          "A. bone is the largest and longest",
          "B. largest and the longest bone that",
          "C. largest and longest bone",
          "D. bone largest and longest and",
        ],
        correctAnswer: "C. largest and longest bone",
        reason:
          "Superlative adjective sebelum noun: 'the largest and longest bone in the body'. Tidak perlu 'the' kedua sebelum 'longest'.",
      },
      {
        id: "adv-g8b-mc10",
        type: "multiple-choice",
        question:
          "Although beavers rarely remain submerged for more than two minutes, they can stay underwater ___ fifteen minutes before having to surface for air.",
        options: [
          "A. as long",
          "B. as long as",
          "C. so long",
          "D. so long that",
        ],
        correctAnswer: "B. as long as",
        reason:
          "'As long as' = selama / hingga (durasi). 'As long as fifteen minutes' = hingga lima belas menit. Perlu 'as...as' lengkap.",
      },
      {
        id: "adv-g8b-mc11",
        type: "multiple-choice",
        question:
          "Liquid water has fewer hydrogen bonds than ice, so more molecules can occupy the same space, making liquid water ___ than ice.",
        options: [
          "A. denser",
          "B. is denser",
          "C. more than dense",
          "D. As more dense",
        ],
        correctAnswer: "A. denser",
        reason:
          "TIP 7: 'dense' = 1 suku kata → comparative form '-er' → 'denser'. Struktur 'making + obj + adj comparative' tidak butuh 'is'.",
      },
      {
        id: "adv-g8b-mc12",
        type: "multiple-choice",
        question:
          "Although thunder and lightning are produced at the same time, light waves travel faster ___, so we see the lightning before we hear the thunder.",
        options: [
          "A. than sound waves do",
          "B. than sound waves are",
          "C. do sound waves",
          "D. sound waves",
        ],
        correctAnswer: "A. than sound waves do",
        reason:
          "Parallel comparison: 'travel faster than sound waves do [travel]'. 'Do' menggantikan 'travel' untuk menghindari pengulangan. 'Are' tidak tepat karena 'travel' adalah action verb.",
      },
      {
        id: "adv-g8b-mc13",
        type: "multiple-choice",
        question:
          "The decimal numeral system is one of the ___ ways of expressing numbers.",
        options: [
          "A. useful mort world's",
          "B. world's most useful",
          "C. useful world's most",
          "D. most world's useful",
        ],
        correctAnswer: "B. world's most useful",
        reason:
          "Urutan kata yang benar: possessive ('world's') + superlative ('most') + adjective ('useful') + noun. → 'the world's most useful ways'.",
      },
      {
        id: "adv-g8b-mc14",
        type: "multiple-choice",
        question:
          "The province of Newfoundland has ___ than any other region of North America in which the first language is English.",
        options: [
          "A. its longer history",
          "B. a longer history",
          "C. the longer the history",
          "D. the history is longer",
        ],
        correctAnswer: "B. a longer history",
        reason:
          "Comparative 'longer' + indefinite article 'a' + noun 'history'. 'Has a longer history than...' adalah struktur yang benar.",
      },
      {
        id: "adv-g8b-mc15",
        type: "multiple-choice",
        question:
          "The knee is ___ most other joints in the body because it cannot twist without injury.",
        options: [
          "A. more likely to be damaged than",
          "B. likely to be more than damaged",
          "C. more than likely to be damaged",
          "D. to be damaged more than likely",
        ],
        correctAnswer: "A. more likely to be damaged than",
        reason:
          "Comparative adjective phrase: 'more likely to be damaged than most other joints.' Urutan: more + adj phrase + than.",
      },
    ],
  },

  // ── Day 8C · Compilation Exercise Week 1–2 ─────────────────────────────────
  {
    id: "adv-g8c",
    track: "grammar",
    day: 8,
    tutor: "Ms. Vita",
    title: "Compilation Exercise — Week 1–2",
    subtitle:
      "NC · Comparison · Causative · Parallel Structure · 15 soal review",
    overview:
      "Soal kompilasi dari materi Week 1–2: Noun Clause, Comparison Degree, Causative Verbs, dan Parallel Structure. Semua topik digabung dalam satu sesi review.",
    materialSections: [
      {
        title: "Reminder — Causative Verbs",
        points: [
          "HAVE / GET / MAKE / LET / HELP + object + ??",
          "",
          "  MAKE + obj + V-base (bare infinitive)  →  'He made me rewrite it.'",
          "  HAVE + obj + V-base (active)           →  'She had him present the report.'",
          "  HAVE + obj + past participle (passive)  →  'She had the report presented.'",
          "  LET  + obj + V-base                    →  'Let the musicians know when to play.'",
          "  ALLOW / PERMIT + obj + TO + V          →  'The film allows the artist to bring...'",
          "  HELP + obj + (TO) + V                  →  'Help him (to) understand.'",
          "",
          "Parallel Structure Reminder:",
          "  whether TO + V  ... or  TO + V   →  sejajarkan bentuknya",
          "  'whether to increase ... or to sell' ✅",
          "  'To answer accurately' vs 'to finish quickly' ✅ (infinitive parallel)",
        ],
      },
    ],
    exercises: [
      {
        id: "adv-g8c-mc1",
        type: "multiple-choice",
        question:
          "___ was caused by breathing impure air was once a common belief.",
        options: [
          "A. Malaria",
          "B. That Malaria",
          "C. Why Malaria",
          "D. Because Malaria",
        ],
        correctAnswer: "B. That Malaria",
        reason:
          "NC sebagai Subject kalimat utama. 'That Malaria was caused by...' = NC of Statement sebagai Subject. 'That' mengawali NC, bukan 'Why' atau 'Because'.",
      },
      {
        id: "adv-g8c-mc2",
        type: "multiple-choice",
        question:
          "Scientists cannot agree on ___ related to other orders of insects.",
        options: [
          "A. How fleas are",
          "B. Fleas that are",
          "C. That are fleas",
          "D. How are fleas",
        ],
        correctAnswer: "A. How fleas are",
        reason:
          "TIP 4: THAT tidak bisa langsung setelah preposisi 'on'. Gunakan HOW. NC setelah preposisi harus berurutan S + V (statement order) → 'How fleas are [related]' bukan 'How are fleas'.",
      },
      {
        id: "adv-g8c-mc3",
        type: "multiple-choice",
        question:
          "Hubble's law states that the greater the distance between any two galaxies, ___ is their relative speed of separation.",
        options: [
          "A. The greatest",
          "B. The greater",
          "C. Greater than",
          "D. As great as",
        ],
        correctAnswer: "B. The greater",
        reason:
          "Double Comparative I (sebab-akibat): 'The greater... the greater...' Kedua bagian harus comparative, bukan superlative.",
      },
      {
        id: "adv-g8c-mc4",
        type: "multiple-choice",
        question:
          "We know that in 1000 AD Leif Erikcson ___ on the North American coast, and Norwegian companions were the first white men to see the new world.",
        options: ["A. Landed", "B. Is landed", "C. Landing", "D. To land"],
        correctAnswer: "A. Landed",
        reason:
          "Simple Past untuk fakta sejarah (1000 AD). 'Is landed' = salah (passive present). 'Landing' dan 'To land' tidak membentuk klausa lengkap.",
      },
      {
        id: "adv-g8c-mc5",
        type: "multiple-choice",
        question:
          "The flexibility of films allows the artist ___ unbridled imagination to the animation of cartoon characters.",
        options: ["A. Brings", "B. Is brought", "C. Bringing", "D. To bring"],
        correctAnswer: "D. To bring",
        reason:
          "ALLOW + object + TO + V1. 'allows the artist TO BRING' = struktur baku causative 'allow'.",
      },
      {
        id: "adv-g8c-mc6",
        type: "multiple-choice",
        question:
          "Usually, the more skilled an athlete ___, the more effortless the athlete's movements appear to be.",
        options: ["A. It is that", "B. That it is", "C. That is", "D. Is"],
        correctAnswer: "D. Is",
        reason:
          "DC I: 'The more skilled an athlete IS, the more effortless...' Dibutuhkan verb 'is' untuk melengkapi 'an athlete ___'.",
      },
      {
        id: "adv-g8c-mc7",
        type: "multiple-choice",
        question:
          "Hardin's professor had him ___ his thesis many times before allowing him to present it to the committee.",
        options: [
          "A. Rewrite",
          "B. Who writes",
          "C. To rewriting",
          "D. To rewrite",
        ],
        correctAnswer: "A. Rewrite",
        reason:
          "HAVE + object + V-base. 'had him REWRITE' = bare infinitive tanpa 'to'. 'To rewrite' (D) salah karena 'have' causative tidak pakai 'to'.",
      },
      {
        id: "adv-g8c-mc8",
        type: "multiple-choice",
        question:
          "A three-foot octopus can crawl through a hole ___ in diameter.",
        options: [
          "A. Than one inch less",
          "B. Less than one inch",
          "C. One less inch than",
          "D. Than less one inch",
        ],
        correctAnswer: "B. Less than one inch",
        reason:
          "'Less than one inch in diameter' = urutan kata yang benar. 'Less than' = kurang dari, mengikuti pola quantity expression.",
      },
      {
        id: "adv-g8c-mc9",
        type: "multiple-choice",
        question:
          "If one of the participants in a conversation wonders ___ no real communication has taken place.",
        options: [
          "A. What said the person",
          "B. What the other person said",
          "C. What did the other person say",
          "D. What was the other person saying",
        ],
        correctAnswer: "B. What the other person said",
        reason:
          "NC setelah 'wonders' → statement word order (S + V). 'What the other person said' = urutan benar. C dan D salah karena memakai question word order.",
      },
      {
        id: "adv-g8c-mc10",
        type: "multiple-choice",
        question:
          "Dr. James was displeased because the student had turned in unacceptable report, so he made it ___.",
        options: [
          "A. Presented",
          "B. To presented",
          "C. To be presented",
          "D. Presenting",
        ],
        correctAnswer: "A. Presented",
        reason:
          "MAKE + object + past participle (passive causative). 'Made it presented' = caused the report to be in a presented state. 'To be presented' salah karena MAKE tidak pakai 'to'.",
      },
      {
        id: "adv-g8c-mc11",
        type: "multiple-choice",
        question: "To answer accurately is more important than ___.",
        options: [
          "A. A quick finish",
          "B. To finish quickly",
          "C. Finishing quickly",
          "D. You finish quickly",
        ],
        correctAnswer: "B. To finish quickly",
        reason:
          "Parallel structure: 'To answer accurately' ↔ 'to finish quickly'. Kedua elemen harus infinitive (TO + V).",
      },
      {
        id: "adv-g8c-mc12",
        type: "multiple-choice",
        question:
          "Ostrich eggs are larger ___ of any other living animals; they may be 150 mm long and 127 mm wide.",
        options: ["A. Than those", "B. Of those", "C. Those that", "D. than"],
        correctAnswer: "A. Than those",
        reason:
          "Logical comparison (plural): 'larger than THOSE [= eggs] of any other living animals.' THOSE menggantikan plural noun 'eggs'.",
      },
      {
        id: "adv-g8c-mc13",
        type: "multiple-choice",
        question:
          "The chief justice of the United States is the country's ___ and is appointed by the president with the approval of the senate.",
        options: [
          "A. Judicial officer highest",
          "B. Officer judicial highest",
          "C. Officer highest judicial",
          "D. Highest judicial officer",
        ],
        correctAnswer: "D. Highest judicial officer",
        reason:
          "Urutan adjective: superlative ('highest') + adjective ('judicial') + noun ('officer'). → 'highest judicial officer'.",
      },
      {
        id: "adv-g8c-mc14",
        type: "multiple-choice",
        question:
          "To generate income, magazine publishers must decide whether to increase the subscription price or ___.",
        options: [
          "A. To sell advertising",
          "B. If they should sell advertising",
          "C. Selling advertising",
          "D. To sold advertising",
        ],
        correctAnswer: "A. To sell advertising",
        reason:
          "Parallel structure: 'whether TO increase... or TO sell...' Kedua pilihan harus TO + V1. 'If' salah karena parallel dengan 'whether'.",
      },
      {
        id: "adv-g8c-mc15",
        type: "multiple-choice",
        question:
          "A conductor uses signals and gestures to let the musicians ___ when to play various parts of a composition.",
        options: ["A. Knowing", "B. Known", "C. To know", "D. Know"],
        correctAnswer: "D. Know",
        reason:
          "LET + object + V-base. 'let the musicians KNOW' = bare infinitive tanpa 'to'. LET tidak menggunakan 'to' seperti ALLOW.",
      },
    ],
  },

  // ── Day 8D · Noun Clause Exercise I & II ───────────────────────────────────
  {
    id: "adv-g8d",
    track: "grammar",
    day: 8,
    tutor: "Ms. Vita",
    title: "Noun Clause Exercise — Part I & II",
    subtitle: "22 soal: what / why / whether / that / how · 2 bagian latihan",
    overview:
      "Latihan 22 soal Noun Clause dari dua seri worksheet. Part I fokus pada NC sebagai subject/object. Part II fokus pada NC setelah preposisi dan fakta ('The fact that...'). Termasuk 2 soal Adjective Clause (Relative Clause).",
    materialSections: [],
    exercises: [
      {
        id: "adv-g8d-mc1",
        type: "multiple-choice",
        section: "part1",
        question:
          "[Part I — Q1] No one could really understand ___ he left the meeting at the very beginning of the debate.",
        options: ["A. What", "B. Why", "C. Where", "D. Whom"],
        correctAnswer: "B. Why",
        reason:
          "'Why' memperkenalkan NC yang mengungkapkan alasan (reason). 'Why he left' = alasan ia pergi. 'What' salah (bukan benda), 'Where' salah (bukan tempat), 'Whom' salah (bukan orang).",
      },
      {
        id: "adv-g8d-mc2",
        type: "multiple-choice",
        section: "part1",
        question: "[Part I — Q2] It is very obvious ___",
        options: [
          "A. Why did he ask the lecturer",
          "B. Why is he going to marry a man who is 20 years older than herself",
          "C. That AIDS has change social practices",
          "D. The one of the seven deadly sins is pride",
        ],
        correctAnswer: "C. That AIDS has change social practices",
        reason:
          "TIP 1+2: 'It is + adj (obvious) + THAT + S + V'. Hanya opsi C yang menggunakan THAT + S + V (statement order). A dan B salah karena question word order.",
      },
      {
        id: "adv-g8d-mc3",
        type: "multiple-choice",
        section: "part1",
        question: "[Part I — Q3] Can you imagine ___?",
        options: [
          "A. How cute they are",
          "B. How cute are they",
          "C. How they are cute",
          "D. Are they cute",
        ],
        correctAnswer: "A. How cute they are",
        reason:
          "NC of Exclamation: HOW + adj + S + V. 'How cute they are' = urutan benar. B salah (question order), C salah (adj setelah subject), D salah (question form).",
      },
      {
        id: "adv-g8d-mc4",
        type: "multiple-choice",
        section: "part1",
        question:
          "[Part I — Q4] The dogs are so noisy that I can hardly hear what ___",
        options: [
          "A. Are saying you",
          "B. That you are saying",
          "C. Are you saying",
          "D. You are saying",
        ],
        correctAnswer: "D. You are saying",
        reason:
          "NC setelah 'what' → statement word order (S + V). 'You are saying' = urutan benar. A, B, C memakai question order atau tambahan 'that' yang tidak perlu.",
      },
      {
        id: "adv-g8d-mc5",
        type: "multiple-choice",
        section: "part1",
        question:
          "[Part I — Q5] ___ the speaker said next was lost in the general uproar.",
        options: ["A. Why", "B. The thing", "C. How", "D. What"],
        correctAnswer: "D. What",
        reason:
          "TIP 9: WHAT = 'hal yang' (the thing that). 'What the speaker said next' = NC sebagai subject kalimat. WHAT menggantikan 'the thing that'.",
      },
      {
        id: "adv-g8d-mc6",
        type: "multiple-choice",
        section: "part1",
        question:
          "[Part I — Q6] The authorities called for checks to discover ___ corruption officials are being bribed to conceive of construction or not.",
        options: ["A. Whether", "B. Why", "C. Because", "D. Although"],
        correctAnswer: "A. Whether",
        reason:
          "TIP 5: 'or not' di akhir → pasti WHETHER. 'To discover whether...' = menemukan apakah (yes/no). 'Because' dan 'Although' adalah conjunction, bukan conjunction NC.",
      },
      {
        id: "adv-g8d-mc7",
        type: "multiple-choice",
        section: "part1",
        question:
          "[Part I — Q7] ___ so incredible is that these insects successfully migrate to places that they have never even seen.",
        options: [
          "A. That makes the monarch butterflies' migration",
          "B. What makes the monarch butterflies' migration",
          "C. The migration of the monarch butterflies'",
          "D. The migration of the monarch butterflies that",
        ],
        correctAnswer: "B. What makes the monarch butterflies' migration",
        reason:
          "'What makes... so incredible' = NC sebagai subject kalimat. 'What' = hal yang. Kalimat lengkap: 'What makes... so incredible IS THAT...'",
      },
      {
        id: "adv-g8d-mc8",
        type: "multiple-choice",
        section: "part1",
        question:
          "[Part I — Q8] Most of ___ archeologists know about prehistoric cultures based on studies of material remains.",
        options: ["A. These", "B. What", "C. Which", "D. Their"],
        correctAnswer: "B. What",
        reason:
          "TIP 9: WHAT setelah preposisi 'of'. 'Most of what archeologists know' = sebagian besar hal yang diketahui arkeolog.",
      },
      {
        id: "adv-g8d-mc9",
        type: "multiple-choice",
        section: "part1",
        question:
          "[Part I — Q9] In the eighteenth century, questions of how we come to know ___ is known as epistemology.",
        options: [
          "A. What we believe",
          "B. There is believe",
          "C. Is is believed",
          "D. Which believes",
        ],
        correctAnswer: "A. What we believe",
        reason:
          "NC di dalam NC: 'how we come to know WHAT WE BELIEVE'. 'What we believe' = hal yang kita percayai, sebagai objek dari 'know'.",
      },
      {
        id: "adv-g8d-mc10",
        type: "multiple-choice",
        section: "part1",
        question:
          "[Part I — Q10] In the modern era, some scientists assume ___ traditional parts of philosophy become academic disciplines.",
        options: ["A. It is that", "B. That it is", "C. That", "D. Is that"],
        correctAnswer: "C. That",
        reason:
          "TIP 3: ASSUME + THAT + S + V (NC of Statement). Cukup 'that' saja, tidak perlu 'it is' atau 'it is that' di tengah.",
      },
      {
        id: "adv-g8d-mc11",
        type: "multiple-choice",
        section: "part2",
        question:
          "[Part II — Q1] Scientists are now beginning to conduct experiments on ___ trigger different sorts of health risks.",
        options: [
          "A. Noise pollution can",
          "B. That noise pollution",
          "C. How noise pollution",
          "D. How nice pollution can",
        ],
        correctAnswer: "C. How noise pollution",
        reason:
          "TIP 4: Setelah preposisi 'on' → tidak bisa THAT. Gunakan HOW. 'experiments on HOW noise pollution can trigger...' (statement order: S + V).",
      },
      {
        id: "adv-g8d-mc12",
        type: "multiple-choice",
        section: "part2",
        question:
          "[Part II — Q2] ___ Have at least 4 hours of hazardous materials response training is mandated by federal laws.",
        options: [
          "A. All police officers",
          "B. All police officers must",
          "C. That all police officers",
          "D. For all police officers",
        ],
        correctAnswer: "C. That all police officers",
        reason:
          "TIP 1 + TIP 2: NC sebagai Subject. 'That all police officers have at least 4 hours...' = NC of Statement sebagai subject dari 'is mandated'.",
      },
      {
        id: "adv-g8d-mc13",
        type: "multiple-choice",
        section: "part2",
        question:
          "[Part II — Q3] The fact ___ the most important ratings period is about to begin has caused all the networks to shore up their schedules.",
        options: ["A. Is that", "B. Of", "C. That", "D. What"],
        correctAnswer: "C. That",
        reason:
          "'The fact THAT...' = NC in apposition. 'That' memperkenalkan isi dari 'the fact'. Ini adalah struktur khusus: The fact THAT + S + V.",
      },
      {
        id: "adv-g8d-mc14",
        type: "multiple-choice",
        section: "part2",
        question:
          "[Part II — Q4] ___ will be carried in the next space shuttle payload has not been announced to the public.",
        options: ["A. It", "B. What", "C. When", "D. That"],
        correctAnswer: "B. What",
        reason:
          "TIP 9: WHAT = NC sebagai Subject. 'What will be carried... has not been announced.' WHAT = benda/hal yang akan dibawa.",
      },
      {
        id: "adv-g8d-mc15",
        type: "multiple-choice",
        section: "part2",
        question:
          "[Part II — Q5] ___ contained in the chromosomes and they are thought of as the units of heredity.",
        options: [
          "A. Genes which are",
          "B. Genes are",
          "C. When genes",
          "D. Because of genes",
        ],
        correctAnswer: "B. Genes are",
        reason:
          "Kalimat deklaratif sederhana butuh S + V. 'Genes ARE contained in the chromosomes and they are thought of as the units of heredity.' Bukan klausa NC.",
      },
      {
        id: "adv-g8d-mc16",
        type: "multiple-choice",
        section: "part2",
        question:
          "[Part II — Q6] ___ in the first draft of the budget will not necessarily be in the final draft.",
        options: [
          "A. Although it appears",
          "B. It appears",
          "C. What appears",
          "D. Despite its appearance",
        ],
        correctAnswer: "C. What appears",
        reason:
          "TIP 9: WHAT = NC sebagai Subject. 'What appears in the first draft' = hal yang muncul di draft pertama. Berfungsi sebagai subject dari 'will not necessarily be'.",
      },
      {
        id: "adv-g8d-mc17",
        type: "multiple-choice",
        section: "part2",
        question:
          "[Part II — Q7] If a food label indicates that a food is mostly carbohydrate, it doesn't mean ___ is a good food to eat.",
        options: ["A. and it", "B. End", "C. That it", "D. When"],
        correctAnswer: "C. That it",
        reason:
          "TIP 3: MEAN + THAT + S + V. 'It doesn't mean THAT IT is a good food to eat.' 'That it' = NC of Statement sebagai objek 'mean'.",
      },
      {
        id: "adv-g8d-mc18",
        type: "multiple-choice",
        section: "part2",
        question:
          "[Part II — Q8] The report on the nuclear power plant indicated that when the plan had gone on line ___ unsafe.",
        options: [
          "A. and it had been",
          "B. It had been",
          "C. Had been",
          "D. That it had been",
        ],
        correctAnswer: "D. That it had been",
        reason:
          "NC embedded: 'indicated THAT [when the plan had gone on line] THAT IT HAD BEEN unsafe.' 'That it had been' melengkapi NC kedua sebagai objek dari 'indicated'.",
      },
      {
        id: "adv-g8d-mc19",
        type: "multiple-choice",
        section: "part2",
        question:
          "[Part II — Q9] ___ a cheese shop has since grown into a small conglomerate consisting of a catering business and two retail stores.",
        options: [
          "A. In the beginning of",
          "B. It began us",
          "C. Its beginning which was",
          "D. What began as",
        ],
        correctAnswer: "D. What began as",
        reason:
          "TIP 9: WHAT = NC sebagai Subject. 'What began as a cheese shop has since grown...' = hal yang dimulai sebagai toko keju.",
      },
      {
        id: "adv-g8d-mc20",
        type: "multiple-choice",
        section: "part2",
        question:
          "[Part II — Q10] Because the project depends on ___ at the federal level, the city and country may have to wait until the budget cutting ends.",
        options: [
          "A. it happens",
          "B. Which happening",
          "C. What happens",
          "D. That it happens",
        ],
        correctAnswer: "C. What happens",
        reason:
          "TIP 4+9: Setelah preposisi 'on' → tidak bisa THAT. Gunakan WHAT. 'depends on WHAT HAPPENS at the federal level' = bergantung pada apa yang terjadi.",
      },
      {
        id: "adv-g8d-mc21",
        type: "multiple-choice",
        question:
          "[Extra — Q1 Relative Clause] The boy ___ was rescued from the collapsed building survived without serious injuries.",
        options: ["A. what", "B. who", "C. that", "D. whom"],
        correctAnswer: "B. who",
        reason:
          "Adjective Clause (Relative Clause): WHO = relative pronoun subject untuk orang. 'The boy WHO was rescued...' WHO menjadi subject dari 'was rescued'.",
      },
      {
        id: "adv-g8d-mc22",
        type: "multiple-choice",
        question:
          "[Extra — Q2 Relative Clause] The proposal ___ by the research team was finally accepted after several revisions.",
        options: ["A. what", "B. submitting", "C. which", "D. submitted"],
        correctAnswer: "D. submitted",
        reason:
          "Reduced Relative Clause (passive): 'The proposal [which was] SUBMITTED by the research team.' 'Submitted' = past participle dalam bentuk reduced relative clause pasif.",
      },
    ],
  },

  // ── Day 10 · Adverbial Clause ────────────────────────────────────────────────
  {
    id: "adv-grammar-day10",
    track: "grammar",
    day: 10,
    tutor: "Ms. Manda",
    title: "Adverbial Clause",
    subtitle: "AVC of Time · AVC of Place · AVC of Contrast",
    overview:
      "Adverbial Clause (AVC) adalah Subordinate Clause (SC) yang berfungsi sebagai adverb — menerangkan verb, adj, atau adv dalam Main Clause. AVC terbagi tiga jenis utama: AVC of Time (menjelaskan waktu), AVC of Place (menjelaskan tempat), dan AVC of Contrast (pertentangan). AVC bisa diletakkan di posisi Initial, Middle, atau Final.",
    materialSections: [
      {
        title: "Pengertian & Posisi Adverbial Clause",
        points: [
          "Adverbial Clause (AVC) = Subordinate Clause (SC) yang berfungsi sebagai adverb",
          "  → SC: C + S + V",
          "",
          "Posisi AVC dalam kalimat:",
          "",
          "1) INITIAL (awal) — perlu koma",
          "   Formula: C + S + V ,  S + V",
          "             SC           MC",
          "   Contoh: 'When my phone rang, I was ironing.'",
          "",
          "2) MIDDLE (tengah) — koma di kedua sisi",
          "   Formula: S , C + S + V , V",
          "   Contoh: 'Mr. Panji, when I was walking, waved to me.'",
          "",
          "3) FINAL (akhir) — tidak perlu koma",
          "   Formula: S + V + C + S + V",
          "   Contoh: 'Mr. Panji waved to me when I was walking.'",
        ],
      },
      {
        title: "1) AVC of Time — Konjungsi & Jenis",
        points: [
          "AVC of Time = AVC yang menjelaskan WAKTU (I, M, F)",
          "",
          "Konjungsi AVC of Time:",
          "  • before",
          "  • after",
          "  • as soon as / once  = setelah (segera setelah)",
          "  • whenever           = kapanpun",
          "  • since              = sejak",
          "  • when / while",
          "  • as long as         = selama",
          "  • as                 = setelah / ketika",
          "",
          "Terbagi menjadi dua kategori berdasarkan hubungan antar kegiatan:",
          "  A) Non K2K  — dua kegiatan TIDAK berpotongan",
          "  B) K2K      — dua kegiatan BERPOTONGAN (Kegiatan I masih berlangsung, Kegiatan II terjadi)",
        ],
      },
      {
        title: "A) Non K2K — Since (Sejak)",
        points: [
          "Non K2K: dua kegiatan tidak saling tumpang tindih.",
          "Konjungsi utama: SINCE (sejak)",
          "",
          "Contoh:",
          "  → 'Ms. Manda has learnt English since she was a student in UM.'",
          "  → 'Since I was a child, I lived in NY.'",
          "  → 'Mr. Nabil has learnt IT since he was newborn.'",
        ],
      },
      {
        title: "B) K2K — Berpotongan: Berdurasi & Tanpa Durasi",
        points: [
          "K2K: Kegiatan I MASIH BERLANGSUNG saat Kegiatan II terjadi.",
          "",
          "── Berdurasi ──  (K1 = Perfect / Perfect Continuous, K2 = Simple)",
          "  → 'When I had studied for an hour, the lights were suddenly off.'",
          "  → 'As soon as my mom has been angry for 2 hours, I cry.'",
          "",
          "── Tanpa Durasi ──  (K1 = Continuous, K2 = Simple)",
          "  → 'While I was cooking, my baby cried.'",
          "  → 'After I was running, I am tired.'",
          "  → 'I don't still understand as my coach is teaching to me.'",
        ],
      },
      {
        title: "AVC of Time — Berurutan (K1 selesai, K2 terjadi)",
        points: [
          "II. BERURUTAN: Kegiatan I selesai lebih dulu, baru Kegiatan II terjadi.",
          "",
          "── Tanpa Jeda ──  (K1 = Simple, K2 = Simple)",
          "  → 'After I have grammar class, I have speaking class.'",
          "  → 'After I graduated my bachelor degree, I continue my master degree.'",
          "",
          "── Jeda (ada selisih waktu) ──  (K1 = Perfect, K2 = Simple)",
          "  → 'When I have had breakfast, I drink some coffee.'",
          "  → 'When I have done my homework, I go to run.'",
        ],
      },
      {
        title: "AVC of Time — Bersamaan (K1 & K2 berlangsung bersama)",
        points: [
          "III. BERSAMAAN: Kegiatan I dan Kegiatan II masih berlangsung di waktu yang sama.",
          "  K1 = Continuous,  K2 = Continuous",
          "",
          "Contoh:",
          "  → 'When I am learning, I am listening to music.'",
          "  → 'When I am taking a shower, my brother is knocking the door.'",
        ],
      },
      {
        title: "2) AVC of Place — Konjungsi & Contoh",
        points: [
          "AVC of Place = AVC yang menjelaskan TEMPAT (I, M, F)",
          "",
          "Konjungsi AVC of Place:",
          "  • where (ver)           = di mana pun",
          "  • anywhere (that)       = di mana saja",
          "  • every place (that)    = ke mana saja",
          "  • nowhere (that)        = di manapun tidak",
          "  • everywhere (that)     = ke manapun",
          "  • anyplace (that)       = di mana saja",
          "  • no place (that)       = di manapun tidak",
          "",
          "Contoh:",
          "  → 'Whenever my sister goes, I will follow her.'",
          "  → 'She lives where her parents used to live.'  ← AVC ✓",
          "  → 'She remembers where her parents used to live.'  ← NC (bukan AVC)",
          "  → 'Students can access the online class anywhere they need.'",
        ],
      },
      {
        title: "3) AVC of Contrast — Konjungsi & Contoh",
        points: [
          "AVC of Contrast = AVC yang menyatakan PERTENTANGAN (I, M, F)",
          "",
          "Konjungsi AVC of Contrast:",
          "  • though              = meskipun (less formal)",
          "  • although            = walaupun",
          "  • even though         = meskipun (lebih kuat/emphatik)",
          "  • while   (informal)  = meskipun",
          "  • whereas (formal)    = meskipun / sedangkan",
          "",
          "Contoh:",
          "  → 'Even though it was raining, advanced B students still attended class.'",
        ],
      },
    ],
    exercises: [
      {
        id: "adv-g10-mc1",
        type: "multiple-choice",
        question: "___ my phone rang, I was ironing my shirt.",
        options: ["A. Although", "B. When", "C. Wherever", "D. Because"],
        correctAnswer: "B. When",
        reason:
          "'When' = konjungsi AVC of Time yang tepat untuk menyatakan dua kegiatan yang terjadi bersamaan (berpotongan). 'Although' = kontras, 'Wherever' = tempat, 'Because' = sebab-akibat.",
      },
      {
        id: "adv-g10-mc2",
        type: "multiple-choice",
        question: "Mr. Panji waved to me ___ I was walking down the street.",
        options: ["A. wherever", "B. even though", "C. when", "D. as long as"],
        correctAnswer: "C. when",
        reason:
          "'When' = konjungsi AVC of Time posisi FINAL (tidak perlu koma). Dua kegiatan berpotongan: 'waved' (K2) terjadi saat 'was walking' (K1) masih berlangsung.",
      },
      {
        id: "adv-g10-mc3",
        type: "multiple-choice",
        question:
          "___ I have had breakfast, I drink some coffee. (Pilih konjungsi yang menunjukkan Berurutan-Jeda)",
        options: ["A. While", "B. Although", "C. When", "D. Wherever"],
        correctAnswer: "C. When",
        reason:
          "Berurutan-Jeda: K1 = Perfect (have had), K2 = Simple (drink). 'When' tepat untuk menyatakan urutan dengan jeda. 'While' = bersamaan (continuous), 'Although' = kontras, 'Wherever' = tempat.",
      },
      {
        id: "adv-g10-mc4",
        type: "multiple-choice",
        question: "She lives ___ her parents used to live.",
        options: ["A. when", "B. although", "C. where", "D. since"],
        correctAnswer: "C. where",
        reason:
          "'Where' = konjungsi AVC of Place. Verb 'lives' adalah action verb yang menjelaskan tempat tinggal → AVC of Place. 'When' = waktu, 'Although' = kontras, 'Since' = waktu/sebab.",
      },
      {
        id: "adv-g10-mc5",
        type: "multiple-choice",
        question:
          "___ it was raining heavily, the advanced B students still attended the class.",
        options: ["A. Since", "B. When", "C. Wherever", "D. Even though"],
        correctAnswer: "D. Even though",
        reason:
          "'Even though' = konjungsi AVC of Contrast posisi INITIAL (perlu koma). Menyatakan pertentangan: hujan deras TAPI tetap hadir. 'Since' = sejak/sebab, 'When' = waktu, 'Wherever' = tempat.",
      },
      {
        id: "adv-g10-mc6",
        type: "multiple-choice",
        question:
          "___ I was cooking, my baby cried. (Pilih konjungsi K2K Tanpa Durasi yang tepat)",
        options: ["A. After", "B. Since", "C. While", "D. Even though"],
        correctAnswer: "C. While",
        reason:
          "K2K Tanpa Durasi: K1 = Continuous (was cooking), K2 = Simple (cried). 'While' = konjungsi untuk dua kegiatan berpotongan tanpa durasi. 'After' = berurutan, 'Since' = sejak, 'Even though' = kontras.",
      },
      {
        id: "adv-g10-mc7",
        type: "multiple-choice",
        question: "Ms. Manda has learnt English ___ she was a student in UM.",
        options: ["A. when", "B. since", "C. wherever", "D. although"],
        correctAnswer: "B. since",
        reason:
          "'Since' = konjungsi AVC of Time Non K2K yang menyatakan SEJAK kapan. 'Ms. Manda has learnt English since she was a student' → dari dulu sampai sekarang (Present Perfect + since). 'When' bisa tapi kurang tepat di sini karena menekankan titik awal waktu.",
      },
      {
        id: "adv-g10-mc8",
        type: "multiple-choice",
        question: "Students can access the online class ___ they need.",
        options: ["A. whenever", "B. anywhere", "C. although", "D. since"],
        correctAnswer: "B. anywhere",
        reason:
          "'Anywhere' = konjungsi AVC of Place (di mana saja). Kalimat menjelaskan TEMPAT akses belajar. 'Whenever' = waktu kapanpun, 'Although' = kontras, 'Since' = waktu/sebab.",
      },
      {
        id: "adv-g10-mc9",
        type: "multiple-choice",
        question:
          "Identify the position of the Adverbial Clause in this sentence:\n'Mr. Panji, when I was walking, waved to me.'",
        options: [
          "A. Initial — di awal kalimat",
          "B. Middle — di tengah kalimat",
          "C. Final — di akhir kalimat",
          "D. Bukan Adverbial Clause",
        ],
        correctAnswer: "B. Middle — di tengah kalimat",
        reason:
          "Posisi MIDDLE (tengah): SC diapit dua koma di tengah kalimat. Formula: S , C+S+V , V → 'Mr. Panji , when I was walking , waved to me.' Perlu koma di kedua sisi.",
      },
      {
        id: "adv-g10-mc10",
        type: "multiple-choice",
        question: "Which sentence uses AVC of Contrast correctly?",
        options: [
          "A. Though she studied hard, she passed the exam.",
          "B. She studied hard, where she passed the exam.",
          "C. She studied hard since she passed the exam.",
          "D. Wherever she studied hard, she passed the exam.",
        ],
        correctAnswer: "A. Though she studied hard, she passed the exam.",
        reason:
          "'Though' = konjungsi AVC of Contrast posisi INITIAL (perlu koma). Menyatakan pertentangan: belajar keras TAPI lulus (seolah mengejutkan). Pilihan B = AVC of Place, C = AVC of Time (since), D = AVC of Place (wherever).",
      },
    ],
  },

  // ── Day 11 · AVC of Reason · AVC of Result · AVC of Purpose ─────────────
  {
    id: "adv-grammar-day11",
    track: "grammar",
    day: 11,
    tutor: "Ms. Manda",
    title: "Adverbial Clause (Lanjutan)",
    subtitle: "AVC of Reason · AVC of Result · AVC of Purpose",
    overview:
      "Melanjutkan Adverbial Clause: (4) AVC of Reason — menyatakan sebab/alasan dengan because, since, inasmuch as, now that, in that; (5) AVC of Result — menyatakan akibat/hasil dengan so...that dan such...that; (6) AVC of Purpose — menyatakan tujuan dengan so that, in order that (positif) dan for fear that, lest (negatif).",
    materialSections: [
      {
        title: "4) AVC of Reason (I, M, F) — Sebab / Alasan",
        points: [
          "AVC of Reason = menyatakan SEBAB / ALASAN terjadinya suatu peristiwa → artinya 'karena'",
          "",
          "Konjungsi AVC of Reason:",
          "  • because          = karena (paling umum)",
          "  • since            = karena (lebih formal)",
          "  • inasmuch as      = karena (sangat formal/written)",
          "  • now that         = karena (sekarang) — setelah ada perubahan situasi",
          "  • in that          = dalam hal bahwa",
          "",
          "Posisi: Initial (I), Middle (M), Final (F)",
          "",
          "Contoh INITIAL:",
          "  → 'Because he is tired, he looks stressed.'",
          "       AVC (SC)           MC",
          "",
          "Contoh MIDDLE:",
          "  → 'She, since she was sick, couldn't come to the class.'",
          "       S   ←── AVC ───→    V",
          "",
          "Contoh FINAL:",
          "  → 'The president addressed the nation because the situation was serious.'",
          "       MC                                    AVC",
          "",
          "Contoh 'now that':",
          "  → 'Now that I have passed the exam, I can relax.'",
          "  → 'Now that you are here, we can start the meeting.'",
        ],
      },
      {
        title: "5) AVC of Result — Akibat / Hasil (So...That & Such...That)",
        points: [
          "AVC of Result = menyatakan HASIL / AKIBAT suatu peristiwa → artinya 'sehingga'",
          "",
          "━━ Formula 1: So + adj/adv + that ━━",
          "  → 'She is SO BEAUTIFUL that I feel insecure.'",
          "  → 'The test was SO DIFFICULT that many students failed.'",
          "  → 'She looks SO TIRED that she sleeps in the class.'",
          "",
          "━━ Formula 2: So + many/few + Plural Noun + that ━━",
          "  → 'There were SO MANY gallon waters in front of my house that I could not pass it.'",
          "  → 'There are SO MANY beaches in Bali that many tourists visit every year.'",
          "  → 'There are SO MANY chairs in the class that I can sit anywhere.'",
          "",
          "━━ Formula 3: So + much/little + Uncountable Noun + that ━━",
          "  → 'There is SO MUCH fog that I couldn't see the road.'",
          "  → 'There is SO LITTLE money that he can't spend more.'",
          "  → 'There was SO MUCH water in my bedroom that I could not sleep.'",
          "",
          "━━ Formula 4: Such + a/an + adj + Singular Noun + that ━━",
          "  → 'It is SUCH FRESH AIR in my home that I love being there.'",
          "  → 'Today is SUCH A HARD DAY that I decided to sleep at home.'",
          "  → 'She is SUCH A KIND PERSON that everyone respects her.'",
          "  → 'He is SUCH A FRIENDLY PERSON that everyone likes him.'",
          "",
          "━━ Formula 5: Such + adj + Uncountable Noun + that ━━",
          "  → 'He drinks SUCH BLACK COFFEE that he can't sleep very well.'",
          "  → 'It is SUCH FRESH WATER that I really want to buy it.'",
          "",
          "⚠️ Ingat: 'So' diikuti adj/adv; 'Such' diikuti noun phrase (a/an + adj + N).",
        ],
      },
      {
        title: "6) AVC of Purpose (I, F) — Tujuan",
        points: [
          "AVC of Purpose = menyatakan TUJUAN → 'agar / supaya'",
          "",
          "━━ (+) POSITIF — Agar / Supaya ━━",
          "  Konjungsi: in order that  /  so that",
          "",
          "  Contoh:",
          "  → 'MBG was given for students SO THAT the nutrition can be fulfilled.'",
          "  → 'I study hard SO THAT I can get good grades.'",
          "  → 'I slept earlier SO THAT I can wake up early in the morning.'",
          "  → 'He often practises swimming SO THAT he can win the competition.'",
          "  → 'I saved some money IN ORDER THAT I could buy a new computer.'",
          "",
          "━━ (-) NEGATIF — Agar/Supaya... TIDAK ━━",
          "  Konjungsi: for fear that  /  lest (formal)",
          "",
          "  Contoh 'for fear that':",
          "  → 'He goes out early FOR FEAR THAT he will be late.'",
          "  → 'The workers wore helmets FOR FEAR THAT an accident would happen.'",
          "",
          "  Contoh 'lest' (formal — langsung diikuti bare infinitive/should):",
          "  → 'I study hard LEST I fail in the exam.'",
          "       S     V        C    V",
          "  → 'She checked the door twice lest she forget to lock it.'",
          "",
          "⚠️ Catatan 'so that' vs 'so...that':",
          "  • 'so THAT' (purpose) = agar/supaya → tidak ada adj/adv di antara so dan that",
          "    e.g. 'I study hard so that I can pass.'",
          "  • 'so ADJ/ADV that' (result) = sehingga → ada adj/adv setelah 'so'",
          "    e.g. 'She studied so hard that she passed.'",
        ],
      },
    ],
    exercises: [
      {
        id: "adv-g11-mc1",
        type: "multiple-choice",
        question:
          "_____ he had missed several classes, he still managed to pass the exam.",
        options: [
          "A. Although",
          "B. Because",
          "C. Even though",
          "D. Despite",
        ],
        correctAnswer: "C. Even though",
        reason:
          "Kalimat ini menyatakan PERTENTANGAN (missed classes ↔ still passed). Pilihan A & C sama-sama AVC of Contrast; pilihan C 'Even though' lebih tepat untuk menekankan kejutan. 'Despite' tidak bisa diikuti S+V. 'Because' = alasan, bukan pertentangan.",
      },
      {
        id: "adv-g11-mc2",
        type: "multiple-choice",
        question:
          "She couldn't attend the meeting _____ she was stuck in traffic for two hours.",
        options: [
          "A. so that",
          "B. in order that",
          "C. because",
          "D. lest",
        ],
        correctAnswer: "C. because",
        reason:
          "Kalimat ini menyatakan ALASAN (kenapa dia tidak bisa hadir). 'Because' = AVC of Reason. 'So that' & 'in order that' = tujuan. 'Lest' = agar tidak.",
      },
      {
        id: "adv-g11-mc3",
        type: "multiple-choice",
        question:
          "The music was _____ loud that the neighbours called the police.",
        options: ["A. such", "B. very", "C. too", "D. so"],
        correctAnswer: "D. so",
        reason:
          "Formula AVC of Result: So + adj + that. 'So loud that...' = sangat keras sehingga... 'Such' diikuti noun phrase (a/an + adj + N). 'Very' dan 'too' tidak berpasangan dengan 'that' dalam pola ini.",
      },
      {
        id: "adv-g11-mc4",
        type: "multiple-choice",
        question:
          "It was _____ a boring lecture that half the students fell asleep.",
        options: ["A. so", "B. such", "C. very", "D. too"],
        correctAnswer: "B. such",
        reason:
          "Formula: Such + a/an + adj + Singular Noun + that. 'Such a boring lecture that...' → 'lecture' adalah singular noun, jadi gunakan 'such a'. 'So' diikuti adj/adv langsung (bukan noun phrase).",
      },
      {
        id: "adv-g11-mc5",
        type: "multiple-choice",
        question:
          "I always double-check my work _____ I make a careless mistake.",
        options: [
          "A. so that",
          "B. lest",
          "C. in order that",
          "D. because",
        ],
        correctAnswer: "B. lest",
        reason:
          "'Lest' = AVC of Purpose NEGATIF (agar tidak). 'I double-check my work LEST I make a mistake' = agar saya tidak membuat kesalahan. 'So that' & 'in order that' = tujuan positif (agar). 'Because' = alasan.",
      },
      {
        id: "adv-g11-mc6",
        type: "multiple-choice",
        question:
          "The manager reduced working hours _____ the employees could spend more time with their families.",
        options: [
          "A. for fear that",
          "B. lest",
          "C. so that",
          "D. because",
        ],
        correctAnswer: "C. so that",
        reason:
          "'So that' = AVC of Purpose POSITIF (agar/supaya). Tujuan pengurangan jam kerja = supaya karyawan bisa lebih banyak waktu dengan keluarga. 'For fear that' & 'lest' = tujuan negatif (agar tidak).",
      },
      {
        id: "adv-g11-mc7",
        type: "multiple-choice",
        question:
          "There were _____ many applicants for the job that the company had to hold a second round of interviews.",
        options: ["A. such", "B. very", "C. so", "D. too"],
        correctAnswer: "C. so",
        reason:
          "Formula: So + many + Plural Noun + that. 'So many applicants that...' → 'applicants' adalah plural noun, gunakan 'so many'. 'Such' dipakai dengan 'such + a/an + adj + N.sing'.",
      },
      {
        id: "adv-g11-mc8",
        type: "multiple-choice",
        question:
          "_____ now that she has graduated, she is looking for a job in the city.",
        options: [
          "A. Because",
          "B. Since",
          "C. Inasmuch as",
          "D. Now that",
        ],
        correctAnswer: "D. Now that",
        reason:
          "'Now that' = AVC of Reason yang menyatakan alasan karena adanya PERUBAHAN SITUASI (dia baru saja lulus). Berbeda dari 'because/since' yang bersifat statis. 'Inasmuch as' sangat formal dan jarang dipakai lisan.",
      },
      {
        id: "adv-g11-mc9",
        type: "multiple-choice",
        question:
          "She wore a thick coat _____ she would feel cold on the way home.",
        options: [
          "A. so that",
          "B. in order that",
          "C. for fear that",
          "D. because",
        ],
        correctAnswer: "C. for fear that",
        reason:
          "'For fear that' = AVC of Purpose NEGATIF → memakai mantel tebal AGAR TIDAK kedinginan. Bandingkan: 'so that she would feel warm' (positif). 'Because' = alasan, bukan tujuan.",
      },
      {
        id: "adv-g11-mc10",
        type: "multiple-choice",
        question:
          "The presentation was _____ well-prepared that the audience gave a standing ovation.",
        options: ["A. such", "B. very", "C. too", "D. so"],
        correctAnswer: "D. so",
        reason:
          "Formula: So + adv + that. 'So well-prepared that...' = sangat well-prepared sehingga... 'Well-prepared' di sini berfungsi sebagai adjective/adverb. 'Such' perlu noun phrase setelahnya.",
      },
    ],
  },

  // ── Day 12 · AVC of Condition · AVC of Manner ────────────────────────────
  {
    id: "adv-grammar-day12",
    track: "grammar",
    day: 12,
    tutor: "Ms. Manda",
    title: "Adverbial Clause (Lanjutan 2)",
    subtitle: "AVC of Condition · AVC of Manner",
    overview:
      "Dua AVC terakhir: (7) AVC of Condition — menyatakan syarat/kondisi dengan if, unless, provided that, as long as, in case, on condition that; berbagai tipe conditional. (8) AVC of Manner — menyatakan cara/metode dengan as, as if, as though.",
    materialSections: [
      {
        title: "7) AVC of Condition (I, F) — Syarat / Kondisi",
        points: [
          "AVC of Condition = menyatakan SYARAT agar sesuatu terjadi",
          "",
          "Konjungsi AVC of Condition:",
          "  • if                 = jika / kalau",
          "  • unless             = kecuali jika / if... not",
          "  • provided (that)    = asalkan",
          "  • as long as         = selama / asalkan",
          "  • in case            = jika / untuk berjaga-jaga",
          "  • on condition that  = dengan syarat bahwa",
          "",
          "━━ Tipe Conditional ━━",
          "",
          "Type 0 — Fakta umum / kebenaran ilmiah",
          "  Formula: If + Simple Present, Simple Present",
          "  → 'If you heat water to 100°C, it boils.'",
          "  → 'If it rains, the ground gets wet.'",
          "",
          "Type 1 — Kemungkinan NYATA (real future) → 90% kemungkinan terjadi",
          "  Formula: If + Sp, Sp / Sf  (Simple Present → Simple Present / Future)",
          "  → 'If I run slowly, I will not get my goal pace.'",
          "  → 'If I study hard, I will have high grades.'",
          "  → 'If you don't sleep early, you will be late to come to class.'",
          "  → 'If she calls me, I will answer immediately.'",
          "  → 'Unless you wake up early, you will be late.'",
          "  → 'If only Real Madrid does not recruit Mbappe, the dressing room will be okay.'",
          "",
          "Type 2 — Kondisi TIDAK NYATA saat ini (unreal present) → 1% kemungkinan terjadi",
          "  Formula: If + Sps (were), Past Future (would + V1)",
          "  ⚠️ Gunakan 'were' (bukan 'was') untuk SEMUA subject dalam Type 2.",
          "  → 'If I were rich, I would travel around the world.'",
          "  → 'If I were a lion, I would eat you.'",
          "  → 'If I were pretty, I would be an actress.'",
          "  → 'If she knew the answer, she would tell us.'",
          "  → 'If I had more time, I could help you.'",
          "  → 'If Mourinho became Madrid coach, the dressing room would be more harmonic.'",
          "  → 'Imagine I had some girlfriends — it would make me happy.'",
          "",
          "Type 3 — Kondisi TIDAK NYATA di masa lalu (unreal past) → 0% (sudah terjadi/tidak mungkin diubah)",
          "  Formula: If + PpChad (Past Perfect / had + V3), PFP (would have + V3)",
          "  → 'If I had accepted your proposal, we would have married now.'",
          "  → 'If I had learned English, I would have studied abroad.'",
          "  → 'If you had not cheated, we would have been happy together.'",
          "  → 'If she had taken that job, she would have been happier.'",
          "  → 'If it hadn't rained, we could have gone to the beach.'",
          "",
          "━━ Unless ━━",
          "  Unless = if... not (kecuali jika tidak)",
          "  → 'Unless you wake up early, you will be late.'",
          "     = 'If you don't wake up early, you will be late.'",
          "  → 'Unless you apologise, she won't forgive you.'",
          "     = 'If you don't apologise, she won't forgive you.'",
          "",
          "━━ Contoh Lain ━━",
          "  → 'They allow him to use the lab provided he cleans it up after.'",
          "  → 'You can go, provided (that) you finish your homework first.'",
          "  → 'I will lend you the money on condition that you pay it back.'",
          "  → 'Take an umbrella in case it rains.'",
          "  → 'As long as you are honest, I will trust you.'",
        ],
      },
      {
        title: "8) AVC of Manner (F) — Cara / Metode",
        points: [
          "AVC of Manner = menyatakan CARA atau METODE melakukan sesuatu",
          "  → 'sebagaimana', 'seolah-olah', 'seperti halnya'",
          "",
          "Konjungsi AVC of Manner:",
          "  • as           = sebagaimana / seperti yang",
          "  • as if        = seolah-olah (kenyataannya TIDAK demikian)",
          "  • as though    = seolah-olah (sama dengan as if, lebih formal)",
          "  • the way      = dengan cara",
          "",
          "━━ 'As' ━━",
          "  → 'Do it as I showed you.' = lakukan seperti yang aku tunjukkan",
          "  → 'She speaks as a native speaker does.'",
          "  → 'He works hard as his father always did.'",
          "  → 'Please guide them as the prophet showed.'",
          "",
          "━━ 'As if / As though' ━━",
          "  Digunakan untuk situasi TIDAK NYATA (unreal).",
          "  Diikuti Past Tense (meski konteksnya present) = bentuk subjunctive.",
          "",
          "  → 'Mr. Proba leads us as though he is a dictator.'  (padahal dia bukan diktator)",
          "  → 'She ignored me as if I had never existed.'  (padahal aku ada)",
          "  → 'He talks as if he knew everything.'  (padahal dia tidak tahu segalanya)",
          "  → 'She acts as though she were the boss.' (padahal dia bukan bos)",
          "  → 'He spent money as if he were a millionaire.' (padahal dia bukan)",
          "  → 'The child cried as if she had lost everything.'",
          "  → 'They looked at me as though I had said something wrong.'",
          "",
          "━━ 'The way' ━━",
          "  → 'She sings the way her mother taught her.'",
          "  → 'He fixed the car the way the manual instructed.'",
          "",
          "⚠️ Catatan 'as if' vs 'as':",
          "  • 'as' = membandingkan dengan fakta NYATA",
          "    e.g. 'Do it as I told you.' (saya memang memberitahu kamu — nyata)",
          "  • 'as if / as though' = membandingkan dengan sesuatu yang TIDAK nyata",
          "    e.g. 'He acted as if he owned the place.' (dia tidak memiliki tempat itu)",
        ],
      },
      {
        title: "Peringkasan AVC — Abridgment & Reducing",
        points: [
          "Peringkasan AVC = menyingkat Adverbial Clause tanpa mengubah makna.",
          "",
          "Berlaku untuk: AVC of TIME, PLACE, CONTRAST, REASON, MANNER",
          "(TIDAK berlaku untuk AVC of Condition & Purpose)",
          "",
          "━━ Syarat Peringkasan ━━",
          "  1) Subjek SC & MC harus SAMA",
          "  2) Tidak ada MODAL di dalam SC",
          "",
          "━━ ABRIDGMENT (konjungsi DIPERTAHANKAN) ━━",
          "  Formula: Conj + Ving (aktif) / V3 (pasif) / ANA (non-verbal)",
          "",
          "  Aktif     : Conj + Ving",
          "  Pasif     : Conj + V3",
          "  Non-verbal: Conj + ANA (Adjective/Noun/Adverb)",
          "",
          "  Contoh (aktif):",
          "  Full      : Before Panji met Putri, Panji went to Sakura Mart.",
          "  Abridgment: Before meeting Putri, Panji went to Sakura Mart.",
          "",
          "  Contoh (pasif):",
          "  Full      : After the letter was signed, it was sent to the office.",
          "  Abridgment: After signed, it was sent to the office.",
          "",
          "━━ REDUCING (konjungsi DIHILANGKAN) ━━",
          "  Formula: Ving (aktif) / V3 (pasif) / Being + ANA (non-verbal)",
          "  → Konjungsi dihilangkan; non-verbal menggunakan 'being' di depan",
          "",
          "  Contoh (aktif):",
          "  Full     : Before Panji met Putri, Panji went to Sakura Mart.",
          "  Reducing : Meeting Putri, Panji went to Sakura Mart.",
          "",
          "  Contoh (non-verbal):",
          "  Full     : Although he was tired, he continued working.",
          "  Reducing : Being tired, he continued working.",
          "",
          "  Contoh (pasif):",
          "  Full     : After it was built, the bridge was opened to the public.",
          "  Reducing : Built, the bridge was opened to the public.",
          "",
          "━━ Ringkasan Rumus ━━",
          "  Abridgment: Conj + Ving / V3 / ANA",
          "  Reducing  : Ving / V3 / Being + ANA  (tanpa konjungsi)",
        ],
      },
      {
        title: "Ringkasan 8 Jenis AVC",
        points: [
          "1) AVC of Time      → when, while, before, after, since, as soon as",
          "2) AVC of Place     → where, wherever",
          "3) AVC of Contrast  → although, even though, whereas, while",
          "4) AVC of Reason    → because, since, inasmuch as, now that, in that",
          "5) AVC of Result    → so...that, such...that",
          "6) AVC of Purpose   → so that, in order that (positif); for fear that, lest (negatif)",
          "7) AVC of Condition → if, unless, provided that, as long as, in case",
          "8) AVC of Manner    → as, as if, as though, the way",
          "",
          "Peringkasan berlaku untuk: Time, Place, Contrast, Reason, Manner",
          "   Syarat: subjek SC = subjek MC, tidak ada modal di SC",
          "   Abridgment = konjungsi tetap + Ving/V3/ANA",
          "   Reducing   = konjungsi hilang + Ving/V3/Being+ANA",
        ],
      },
    ],
    exercises: [
      {
        id: "adv-g12-mc1",
        type: "multiple-choice",
        question:
          "_____ you don't leave now, you will miss the last train.",
        options: ["A. Unless", "B. If", "C. Provided that", "D. In case"],
        correctAnswer: "A. Unless",
        reason:
          "'Unless' = 'if... not'. 'Unless you leave now' = 'If you don't leave now'. Menyatakan syarat negatif. Pilihan B 'If' bisa dipakai jika diubah menjadi 'If you don't leave now'.",
      },
      {
        id: "adv-g12-mc2",
        type: "multiple-choice",
        question:
          "If I _____ a million dollars, I would travel the world.",
        options: ["A. have", "B. had", "C. will have", "D. would have"],
        correctAnswer: "B. had",
        reason:
          "Type 2 Conditional (kondisi tidak nyata sekarang): If + Simple Past, would + V1. 'If I had (a million dollars), I would travel...' Gunakan Simple Past 'had', bukan present 'have' atau 'will have'.",
      },
      {
        id: "adv-g12-mc3",
        type: "multiple-choice",
        question:
          "She speaks French _____ she had lived in Paris all her life.",
        options: ["A. as", "B. because", "C. as if", "D. so that"],
        correctAnswer: "C. as if",
        reason:
          "'As if' = AVC of Manner yang menyatakan sesuatu yang TIDAK NYATA (dia belum tentu pernah tinggal di Paris). 'As if she had lived...' = seolah-olah dia pernah tinggal. 'As' = membandingkan fakta nyata.",
      },
      {
        id: "adv-g12-mc4",
        type: "multiple-choice",
        question:
          "You can borrow my car _____ you return it before 6 p.m.",
        options: [
          "A. unless",
          "B. in case",
          "C. provided that",
          "D. lest",
        ],
        correctAnswer: "C. provided that",
        reason:
          "'Provided that' = AVC of Condition yang berarti 'asalkan'. 'Provided that you return it before 6' = asalkan kamu mengembalikannya sebelum pukul 6. Menyatakan syarat positif.",
      },
      {
        id: "adv-g12-mc5",
        type: "multiple-choice",
        question:
          "If she _____ the warning, the accident would not have happened.",
        options: [
          "A. had heeded",
          "B. heeded",
          "C. would heed",
          "D. has heeded",
        ],
        correctAnswer: "A. had heeded",
        reason:
          "Type 3 Conditional (kondisi tidak nyata di masa lalu): If + Past Perfect + would/could have + V3. 'If she had heeded (the warning), the accident would not have happened.' Past Perfect = had + V3.",
      },
      {
        id: "adv-g12-mc6",
        type: "multiple-choice",
        question:
          "He acts _____ he owns the entire company, but he is just an intern.",
        options: [
          "A. as",
          "B. as if",
          "C. the way",
          "D. because",
        ],
        correctAnswer: "B. as if",
        reason:
          "'As if' = seolah-olah (kondisi tidak nyata). Dia bertingkah seolah-olah memiliki perusahaan, padahal dia hanya magang. 'As' dipakai untuk perbandingan nyata.",
      },
      {
        id: "adv-g12-mc7",
        type: "multiple-choice",
        question:
          "Take a spare key _____ you lock yourself out of the house.",
        options: [
          "A. unless",
          "B. so that",
          "C. in case",
          "D. provided that",
        ],
        correctAnswer: "C. in case",
        reason:
          "'In case' = untuk berjaga-jaga jika sesuatu terjadi. 'Take a spare key in case you lock yourself out' = bawa kunci cadangan untuk berjaga-jaga kalau terkunci di luar. Berbeda dari 'so that' yang menyatakan tujuan positif.",
      },
      {
        id: "adv-g12-mc8",
        type: "multiple-choice",
        question:
          "Do the report _____ the professor explained in the last class.",
        options: [
          "A. as if",
          "B. as though",
          "C. the way",
          "D. unless",
        ],
        correctAnswer: "C. the way",
        reason:
          "'The way' = AVC of Manner yang menyatakan cara nyata. 'Do it the way the professor explained' = lakukan dengan cara yang dijelaskan profesor (nyata, bukan seolah-olah). 'As if/as though' = tidak nyata.",
      },
      {
        id: "adv-g12-mc9",
        type: "multiple-choice",
        question:
          "Water freezes _____ the temperature drops below zero degrees.",
        options: ["A. unless", "B. if", "C. provided", "D. in case"],
        correctAnswer: "B. if",
        reason:
          "Type 0 Conditional (fakta umum / kebenaran ilmiah): If + Simple Present, Simple Present. 'If the temperature drops below zero, water freezes.' — menyatakan hukum alam yang selalu benar.",
      },
      {
        id: "adv-g12-mc10",
        type: "multiple-choice",
        question:
          "The student stared blankly at the board _____ he hadn't understood anything the teacher said.",
        options: ["A. as", "B. because", "C. as though", "D. so that"],
        correctAnswer: "C. as though",
        reason:
          "'As though' = AVC of Manner TIDAK NYATA, sama dengan 'as if'. 'As though he hadn't understood' = seolah-olah dia tidak mengerti (kita tidak tahu pasti, hanya mengamati tingkah lakunya). 'Because' = alasan, bukan cara.",
      },
    ],
  },

  // ── Day 13 · Latihan Peringkasan AVC ─────────────────────────────────────────
  {
    id: "adv-grammar-day13",
    track: "grammar",
    day: 13,
    tutor: "Ms. Manda",
    title: "Latihan Peringkasan AVC",
    subtitle: "Abridgment & Reducing — Aktif · Pasif · Non-Verbal · Result · Purpose",
    overview:
      "Latihan lengkap peringkasan Adverbial Clause melalui Abridgment (konjungsi dipertahankan) dan Reducing (konjungsi dihilangkan). Mencakup kalimat aktif, pasif, non-verbal, serta aturan khusus AVC of Result dan AVC of Purpose.",
    materialSections: [
      {
        title: "Latihan Aktif — Abridgment & Reducing",
        points: [
          "Abridgment aktif : Conj + Ving",
          "Reducing aktif   : Ving  (konjungsi dihilangkan)",
          "",
          "━━ Contoh 1 ━━",
          "Full : After Panji comes to the class, he is sitting near to me.",
          "Abr  : After coming to the class, Panji is sitting near to me.",
          "Red  : Coming to the class, Panji is sitting near to me.",
          "",
          "━━ Contoh 2 ━━",
          "Full : Before he goes to Pare, he does not understand English.",
          "Abr  : Before going to Pare, he does not understand English.",
          "Red  : Going to Pare, he does not understand English.",
        ],
      },
      {
        title: "Latihan Pasif — Abridgment & Reducing",
        points: [
          "Abridgment pasif : Conj + V3",
          "Reducing pasif   : V3  (konjungsi dihilangkan)",
          "",
          "━━ Contoh 1 ━━",
          "Full : Although he was bought a new car, he is not happy.",
          "Abr  : Although bought a new car, he is not happy.",
          "Red  : Bought a new car, he is not happy.",
          "",
          "━━ Contoh 2 ━━",
          "Full : Although I was given beautiful shoes, I still want to buy Omas Brand.",
          "Abr  : Although given beautiful shoes, I'm still want to buy Omas Brand.",
          "Red  : Given beautiful shoes, I'm still want to buy Omas Brand.",
        ],
      },
      {
        title: "Latihan Non-Verbal — Abridgment & Reducing",
        points: [
          "Abridgment non-verbal : Conj + ANA (Adjective / Noun / Adverb)",
          "Reducing non-verbal   : Being + ANA  (konjungsi dihilangkan, tambah 'being')",
          "",
          "━━ Contoh 1 ━━",
          "Full : As though she is an angel, Putri wears a white dress.",
          "Abr  : As though an angel, Putri wears a white dress.",
          "Red  : (Being) an angel, Putri wears a white dress.",
          "",
          "━━ Contoh 2 ━━",
          "Full : As though he is a superstar, he spent so much money.",
          "Abr  : As though a superstar, he spent so much money.",
          "Red  : Being a superstar, he spent so much money.",
        ],
      },
      {
        title: "Peringkasan AVC of Result — so/such...that",
        points: [
          "Syarat peringkasan AVC of Result:",
          "  1) Subjek SC & MC harus SAMA",
          "  2) SC harus ada MODAL (can, could, would, dll.)",
          "",
          "Abridgment : so/such...that  →  so/such...as + to inf",
          "Reducing   : so/such...that  →  (+) ...enough + to inf",
          "                               (-) too...+ to inf",
          "",
          "━━ Contoh 1 (positif) ━━",
          "Full : Arya is so diligent that he can finish the exam quickly.",
          "Abr  : Arya is so diligent as to finish the exam quickly.",
          "Red  : Arya is diligent enough to finish the exam quickly.",
          "",
          "━━ Contoh 2 (negatif / can't) ━━",
          "Full : Panji is so young that he can't go to Lombok alone.",
          "Abr  : Panji is so young as not to go to Lombok alone.",
          "Red  : Panji is too young to go to Lombok alone.",
          "",
          "━━ Contoh 3 (positif) ━━",
          "Full : Probo is so smart that he can do the exam easily.",
          "Abr  : Probo is so smart as to do the exam easily.",
          "Red  : Probo is smart enough to do the exam easily.",
          "",
          "━━ Contoh 4 (such...that) ━━",
          "Full : They faced such difficult problems that they would almost give up.",
          "Abr  : They faced such difficult problems as almost to give up.",
          "Red  : They faced difficult problems enough almost to give up.",
        ],
      },
      {
        title: "Peringkasan AVC of Purpose — so that / in order that",
        points: [
          "Syarat peringkasan AVC of Purpose:",
          "  1) Subjek SC & MC harus SAMA",
          "  2) SC ada MODAL (can, could, will, dll.)",
          "",
          "Abridgment : so that / in order that  →  so as to inf / in order to inf",
          "Reducing   : so that / in order that  →  to inf",
          "",
          "━━ Contoh 1 ━━",
          "Full : Salsa studies English in Pare so that she can speak fluently.",
          "Abr  : Salsa studies English in Pare so as to speak fluently.",
          "Red  : Salsa studies English in Pare to speak fluently.",
          "",
          "━━ Contoh 2 ━━",
          "Full : Ms. Nadine joins the run competition so that she can get the gold medal.",
          "Abr  : Ms. Nadine joins the competition so as to get the gold medal.",
          "Red  : Ms. Nadine joins the competition to get the gold medal.",
          "",
          "━━ Contoh 3 ━━",
          "Full : I saved our old photos in order that we could remember the good moments.",
          "Abr  : I saved our old photos in order to remember the good moments.",
          "Red  : I saved our old photos to remember the good moments.",
        ],
      },
    ],
    exercises: [
      {
        id: "adv-g13-mc1",
        type: "multiple-choice",
        question:
          "After Panji comes to the class, he sits near to me.\nAbridgment yang tepat adalah...",
        options: [
          "A. After coming to the class, Panji sits near to me.",
          "B. After comes to the class, Panji sits near to me.",
          "C. After come to the class, Panji sits near to me.",
          "D. After Panji coming to the class, he sits near to me.",
        ],
        correctAnswer: "A. After coming to the class, Panji sits near to me.",
        reason:
          "Abridgment aktif: Conj + Ving. Subjek SC 'Panji' sama dengan MC. Ganti 'comes' → 'coming', konjungsi 'After' dipertahankan. Subjek SC dihapus sehingga subjek MC yang disebutkan.",
      },
      {
        id: "adv-g13-mc2",
        type: "multiple-choice",
        question:
          "Before he goes to Pare, he does not understand English.\nReducing yang tepat adalah...",
        options: [
          "A. Before going to Pare, he does not understand English.",
          "B. Going to Pare, he does not understand English.",
          "C. Gone to Pare, he does not understand English.",
          "D. To go to Pare, he does not understand English.",
        ],
        correctAnswer: "B. Going to Pare, he does not understand English.",
        reason:
          "Reducing aktif: konjungsi DIHILANGKAN, verb → Ving. 'Before' dihapus, 'goes' → 'Going'. Pilihan A adalah Abridgment (konjungsi masih ada), bukan Reducing.",
      },
      {
        id: "adv-g13-mc3",
        type: "multiple-choice",
        question:
          "Although he was bought a new car, he is not happy.\nAbridgment yang tepat adalah...",
        options: [
          "A. Although buying a new car, he is not happy.",
          "B. Although bought a new car, he is not happy.",
          "C. Bought a new car, he is not happy.",
          "D. Although being bought a new car, he is not happy.",
        ],
        correctAnswer: "B. Although bought a new car, he is not happy.",
        reason:
          "Abridgment PASIF: Conj + V3. Konjungsi 'Although' dipertahankan, 'was bought' → 'bought' (V3 saja). Pilihan C adalah Reducing (tanpa konjungsi). Pilihan A salah karena aktif Ving dipakai untuk pasif.",
      },
      {
        id: "adv-g13-mc4",
        type: "multiple-choice",
        question:
          "Although I was given beautiful shoes, I still want to buy Omas Brand.\nReducing yang tepat adalah...",
        options: [
          "A. Although given beautiful shoes, I still want to buy Omas Brand.",
          "B. Being given beautiful shoes, I still want to buy Omas Brand.",
          "C. Given beautiful shoes, I still want to buy Omas Brand.",
          "D. Giving beautiful shoes, I still want to buy Omas Brand.",
        ],
        correctAnswer: "C. Given beautiful shoes, I still want to buy Omas Brand.",
        reason:
          "Reducing PASIF: V3 saja (konjungsi dihilangkan). 'Although' dihapus, 'was given' → 'Given'. Pilihan A = Abridgment (konjungsi masih ada). Pilihan B pakai 'Being' yang dipakai untuk non-verbal, bukan pasif.",
      },
      {
        id: "adv-g13-mc5",
        type: "multiple-choice",
        question:
          "As though she is an angel, Putri wears a white dress.\nReducing yang tepat adalah...",
        options: [
          "A. As though an angel, Putri wears a white dress.",
          "B. Angel, Putri wears a white dress.",
          "C. Being an angel, Putri wears a white dress.",
          "D. Angling, Putri wears a white dress.",
        ],
        correctAnswer: "C. Being an angel, Putri wears a white dress.",
        reason:
          "Reducing NON-VERBAL: Being + ANA. Konjungsi 'As though' dihilangkan, tambahkan 'Being' di depan noun 'an angel'. Pilihan A = Abridgment (konjungsi masih ada).",
      },
      {
        id: "adv-g13-mc6",
        type: "multiple-choice",
        question:
          "Arya is so diligent that he can finish the exam quickly.\nAbridgment (AVC of Result) yang tepat adalah...",
        options: [
          "A. Arya is diligent enough to finish the exam quickly.",
          "B. Arya is so diligent as to finish the exam quickly.",
          "C. Arya is so diligent to finish the exam quickly.",
          "D. Arya is too diligent to finish the exam quickly.",
        ],
        correctAnswer: "B. Arya is so diligent as to finish the exam quickly.",
        reason:
          "Abridgment AVC of Result: so...that → so...as + to inf. 'so diligent that he can finish' → 'so diligent as to finish'. Pilihan A adalah Reducing (+enough). Pilihan D (too) dipakai untuk kalimat negatif/can't.",
      },
      {
        id: "adv-g13-mc7",
        type: "multiple-choice",
        question:
          "Panji is so young that he can't go to Lombok alone.\nReducing (AVC of Result) yang tepat adalah...",
        options: [
          "A. Panji is so young as not to go to Lombok alone.",
          "B. Panji is young enough to go to Lombok alone.",
          "C. Panji is too young to go to Lombok alone.",
          "D. Panji is so young to go to Lombok alone.",
        ],
        correctAnswer: "C. Panji is too young to go to Lombok alone.",
        reason:
          "Reducing AVC of Result negatif (can't): so...that (negatif) → too...+ to inf. 'so young that he can't' → 'too young to go'. Pilihan A = Abridgment. Pilihan B salah arti karena 'enough' berarti positif (mampu).",
      },
      {
        id: "adv-g13-mc8",
        type: "multiple-choice",
        question:
          "Salsa studies English in Pare so that she can speak fluently.\nAbridgment (AVC of Purpose) yang tepat adalah...",
        options: [
          "A. Salsa studies English in Pare to speak fluently.",
          "B. Salsa studies English in Pare so as to speak fluently.",
          "C. Salsa studies English in Pare in order to speak fluently.",
          "D. Salsa studies English in Pare so that to speak fluently.",
        ],
        correctAnswer: "B. Salsa studies English in Pare so as to speak fluently.",
        reason:
          "Abridgment AVC of Purpose: so that → so as to inf. Konjungsi dipertahankan dalam bentuk 'so as to'. Pilihan A = Reducing (langsung to inf). Pilihan C juga benar tapi itu dari 'in order that', bukan 'so that'.",
      },
      {
        id: "adv-g13-mc9",
        type: "multiple-choice",
        question:
          "I saved our old photos in order that we could remember the good moments.\nReducing (AVC of Purpose) yang tepat adalah...",
        options: [
          "A. I saved our old photos in order to remember the good moments.",
          "B. I saved our old photos so as to remember the good moments.",
          "C. I saved our old photos to remember the good moments.",
          "D. I saved our old photos for remembering the good moments.",
        ],
        correctAnswer: "C. I saved our old photos to remember the good moments.",
        reason:
          "Reducing AVC of Purpose: in order that → to inf (konjungsi dihilangkan sepenuhnya). 'in order that we could remember' → 'to remember'. Pilihan A = Abridgment (in order to). Pilihan B = Abridgment dari 'so that'.",
      },
      {
        id: "adv-g13-mc10",
        type: "multiple-choice",
        question:
          "Probo is so smart that he can do the exam easily.\nReducing (AVC of Result) yang tepat adalah...",
        options: [
          "A. Probo is too smart to do the exam easily.",
          "B. Probo is so smart as to do the exam easily.",
          "C. Probo is smart enough to do the exam easily.",
          "D. Probo is smart so to do the exam easily.",
        ],
        correctAnswer: "C. Probo is smart enough to do the exam easily.",
        reason:
          "Reducing AVC of Result positif (can): so...that → ...enough + to inf. 'so smart that he can' → 'smart enough to'. Pilihan A (too) dipakai untuk negatif/can't. Pilihan B = Abridgment (so...as to).",
      },
    ],
  },
  // ── Day 14 · Inversion · Causative Verbs ─────────────────────────────────────
  {
    id: "adv-grammar-day14",
    track: "grammar",
    day: 14,
    tutor: "Ms. Manda",
    title: "Inversion & Causative Verbs",
    subtitle: "Subject Inversion (7 Tipe) · Tabel Causative Verbs",
    overview:
      "Inversion = susunan balik di mana verb terletak SEBELUM subject. Digunakan untuk menambah penekanan (emphasis), membuat kalimat lebih formal, dan lebih dramatis. Ada 7 tipe inversion: Question Word, Expression of Place, Negative Word, So+adj, Comparison, Only+Prep/Con/Adv, dan Conditional. Ditambah tabel Causative Verbs (get/have/make/let/help).",
    materialSections: [
      {
        title: "Pengertian & Pola Inversion",
        points: [
          "Definisi : Susunan balik di mana VERB terletak SEBELUM subject.",
          "",
          "Fungsi Inversion:",
          "  • To add EMPHASIS (penekanan)",
          "  • To make more FORMAL",
          "  • To make more DRAMATIC",
          "",
          "Pola Normal  : S + V",
          "Pola Inversion: Vaux + S + Vord  atau  Vord + S",
          "",
          "Catatan: 'Vaux' = auxiliary verb (is/are/do/does/did/can/will/dll.)",
          "         'Vord' = ordinary verb (main verb)",
        ],
      },
      {
        title: "1) Inversion — Question Word",
        points: [
          "Dalam kalimat tanya, auxiliary verb (Vaux) mendahului subject (S).",
          "",
          "  → Are you okay?           (Vaux + S)",
          "  → What are you doing?     (Wh + Vaux + S + Vord)",
          "  → Is it your home?        (Vaux + S)",
          "  → Where are you going?    (Wh + Vaux + S + Vord)",
        ],
      },
      {
        title: "2) Inversion — Expression of Place",
        points: [
          "Ketika kalimat dimulai dengan keterangan tempat (in front of, there, here),",
          "verb berpindah ke depan subject.",
          "",
          "Formula: Place/There/Here + Vord + S",
          "",
          "  → In front of TN is Ganesha.",
          "     (V = 'is', S = 'Ganesha')",
          "  → There is my house.",
          "     (V = 'is', S = 'my house')",
          "  → Here is (the) police station.",
          "     (V = 'is', S = 'police station')",
        ],
      },
      {
        title: "3) Inversion — Negative Word",
        points: [
          "Ketika kalimat dimulai dengan kata negatif, auxiliary verb mendahului subject.",
          "",
          "Kata-kata negatif yang memicu inversion:",
          "  no / not / nor",
          "  never / little",
          "  rarely / seldom",
          "  hardly / barely / scarcely",
          "  not only...but also",
          "",
          "Formula: Neg Word + Vaux + S + Vord",
          "",
          "  → Not only did he steal her money, but also he betrayed her.",
          "     (inversion setelah 'not only')",
          "  → Rarely does Probo take a bath.",
          "  → Seldom does Indi call Putri.",
          "  → Never does Arsenal win the Europe League.",
          "  → Little do I know about him.",
        ],
      },
      {
        title: "4) Inversion — So + Adjective/Adverb (means 'also')",
        points: [
          "'So' di awal klausa berarti 'juga/also' — memicu inversion.",
          "",
          "Formula A (adj → makna deskriptif): So + adj + Vord + S",
          "  → So amazing is the view which Jakarta provides.",
          "  → So bright are the lamps at my room.",
          "  → So clean is the toilet in my boarding house.",
          "",
          "Formula B (makna 'juga' — menyatakan kesamaan): ...and so + Vaux + S",
          "  Full : Panji loves swimming and Nabil loves swimming.",
          "  Inv  : Panji loves swimming and so does Nabil.",
          "  ('so does Nabil' = 'Nabil juga')",
          "",
          "  → The Belgium class is so hot and so is Ukraine.",
          "     (Ukraine is also hot)",
          "",
          "Formula C (so + adv + did... that): So + adv + Vaux + S + Vord + that...",
          "  → So slowly did she speak that nobody heard her.",
        ],
      },
      {
        title: "5) Inversion — Comparison",
        points: [
          "Dalam klausa perbandingan, verb bisa diinversi untuk variasi formal.",
          "",
          "Formula: ...than/as + Vaux/Vord + S",
          "",
          "  → Nadine is more talkative than Indi is.",
          "     Inv: Nadine is more talkative than is Indi.",
          "",
          "  → Salsa is as beautiful as Selena Gomez is.",
          "     Inv: Salsa is as beautiful as is Selena.",
          "",
          "  → I run as fast as a horse does.",
          "     Inv: I run as fast as does a horse.",
          "",
          "  → I speak as fluently as my tutor does.",
          "     Inv: I speak as fluently as does my tutor.",
        ],
      },
      {
        title: "6) Inversion — Only + Prep / Con / Adv",
        points: [
          "Ketika 'only' diikuti preposition, conjunction, atau adverb di awal kalimat,",
          "auxiliary verb mendahului subject.",
          "",
          "Tipe 'only' pemicu inversion:",
          "  only + Preposition : only in / on / at / by / ...",
          "  only + Conjunction : only after / only if / ...",
          "  only + Adverb      : only now / only recently / ...",
          "",
          "Formula: Only + Prep/Con/Adv + Vaux + S + Vord",
          "",
          "  → Only by using headphones can I listen to the music clearly.",
          "     (only + prep 'by' → inversion: can I)",
          "  → Only after Panji studied could he play FF game.",
          "     (only + con 'after' → inversion: could he)",
          "  → Only now can you buy this house.",
          "     (only + adv 'now' → inversion: can you)",
          "  → Only after practicing every day did I understand grammar.",
          "  → Only recently can I study English in Pare.",
          "  → Only in Sakura Mart can I buy Soda.",
        ],
      },
      {
        title: "7) Inversion — Conditional Sentence (Formal)",
        points: [
          "Dalam conditional formal, konjungsi 'if' dihilangkan dan auxiliary diinversi ke depan.",
          "",
          "Type 1 → Should + S + V1",
          "  Normal : If Ms. Nadine speaks up about the environment, I will respond well.",
          "  Inv    : Should Ms. Nadine speak up about the environment, I will respond very well.",
          "",
          "Type 2 → Were + S + (to inf)",
          "  Normal : If I had much money, I would watch TXT concert every year.",
          "  Inv    : Were I to have much money, I will watch TXT concert every year.",
          "",
          "Type 3 → Had + S + V3",
          "  Normal : If he had exercised regularly, he would have avoided being injured.",
          "  Inv    : Had he exercised regularly, he would have avoided injured.",
          "",
          "⚠️ Catatan: 'if' dihilangkan — auxiliary (should/were/had) langsung ke depan.",
        ],
      },
      {
        title: "Tabel Causative Verbs — Get / Have / Make / Let / Help",
        points: [
          "Causative verb = kata kerja yang menyatakan bahwa subject MENYEBABKAN orang lain melakukan sesuatu.",
          "",
          "{{causative-table}}",
          "",
          "Contoh Aktif:",
          "  get  : I got him to fix my car.            (to + V1)",
          "  have : She had the plumber repair the sink. (V1)",
          "  make : The teacher made the students study. (V1)",
          "  let  : Mom let me go to the concert.        (V1)",
          "  help : He helped me (to) carry the box.     ((to) V1)",
          "",
          "Contoh Pasif:",
          "  get  : I got my car fixed.              (V3)",
          "  have : She had the sink repaired.       (V3)",
          "  make : She was made to apologise.       (be + V3)",
        ],
      },
    ],
    exercises: [
      {
        id: "adv-g14-mc1",
        type: "multiple-choice",
        question:
          "Rarely _____ Probo take a bath on time.",
        options: ["A. Probo does", "B. does Probo", "C. do Probo", "D. Probo is"],
        correctAnswer: "B. does Probo",
        reason:
          "'Rarely' adalah negative word yang memicu inversion: Neg Word + Vaux + S + Vord. 'Probo' (subject tunggal, simple present) → auxiliary 'does' + S 'Probo'. Formula: Rarely + does + Probo + V.",
      },
      {
        id: "adv-g14-mc2",
        type: "multiple-choice",
        question:
          "In front of our school _____ a beautiful garden.",
        options: ["A. is there", "B. it is", "C. is", "D. there is"],
        correctAnswer: "C. is",
        reason:
          "Expression of Place inversion: Place + Vord + S. 'In front of our school' adalah keterangan tempat → verb 'is' mendahului subject 'a beautiful garden'. Formula: In front of... + is + S.",
      },
      {
        id: "adv-g14-mc3",
        type: "multiple-choice",
        question:
          "Not only _____ her money, but also he betrayed her.",
        options: [
          "A. he stole",
          "B. did he steal",
          "C. he did steal",
          "D. does he steal",
        ],
        correctAnswer: "B. did he steal",
        reason:
          "'Not only' adalah negative word yang memicu inversion. Kalimat past tense → auxiliary 'did'. Formula: Not only + did + S + V1. 'did he steal' = inversion yang benar.",
      },
      {
        id: "adv-g14-mc4",
        type: "multiple-choice",
        question:
          "Nadine is more talkative than _____ Indi. (inversion)",
        options: ["A. is", "B. does", "C. Indi is", "D. was"],
        correctAnswer: "A. is",
        reason:
          "Comparison inversion: ...than + Vaux/Vord + S. Karena 'Nadine is more talkative', maka klausa perbandingan menggunakan 'is' (be-verb). Formula: than + is + Indi.",
      },
      {
        id: "adv-g14-mc5",
        type: "multiple-choice",
        question:
          "Panji loves swimming and _____ Nabil. (inversion dengan 'so')",
        options: [
          "A. so loves",
          "B. so does",
          "C. so is",
          "D. so do",
        ],
        correctAnswer: "B. so does",
        reason:
          "'So' + inversion menyatakan 'juga/also'. 'Panji loves swimming' → 'so does Nabil' (Nabil also loves swimming). Gunakan auxiliary 'does' karena simple present + subject tunggal 'Nabil'.",
      },
      {
        id: "adv-g14-mc6",
        type: "multiple-choice",
        question:
          "Only by practicing every day _____ improve your English.",
        options: [
          "A. you can",
          "B. can you",
          "C. you will",
          "D. will",
        ],
        correctAnswer: "B. can you",
        reason:
          "'Only + Preposition (by)' memicu inversion: Only + by + ... + Vaux + S + Vord. 'can you' = auxiliary 'can' di depan subject 'you'. Pilihan A tidak terinversi.",
      },
      {
        id: "adv-g14-mc7",
        type: "multiple-choice",
        question:
          "_____ he exercised regularly, he would have avoided the injury. (formal conditional)",
        options: ["A. If", "B. Should", "C. Had", "D. Were"],
        correctAnswer: "C. Had",
        reason:
          "Inversion conditional Type 3: Had + S + V3 (menggantikan 'If + Past Perfect'). 'Had he exercised' = 'If he had exercised'. Ini Type 3 karena konteksnya masa lalu dengan 'would have'.",
      },
      {
        id: "adv-g14-mc8",
        type: "multiple-choice",
        question:
          "_____ Ms. Nadine speak up about the issue, I will respond immediately. (formal conditional)",
        options: ["A. Had", "B. Were", "C. Should", "D. If"],
        correctAnswer: "C. Should",
        reason:
          "Inversion conditional Type 1: Should + S + V1 (menggantikan 'If + Simple Present'). 'Should Ms. Nadine speak up' = 'If Ms. Nadine speaks up'. Ini Type 1 karena hasil klausa 'I will respond' adalah future.",
      },
      {
        id: "adv-g14-mc9",
        type: "multiple-choice",
        question:
          "I got my car _____. (causative pasif)",
        options: ["A. repair", "B. to repair", "C. repaired", "D. repairing"],
        correctAnswer: "C. repaired",
        reason:
          "Causative 'get' pasif: get + O + V3. 'I got my car repaired' = saya menyuruh mobil saya diperbaiki (oleh orang lain). 'Repaired' = V3. Aktif: 'I got someone to repair my car' (to inf).",
      },
      {
        id: "adv-g14-mc10",
        type: "multiple-choice",
        question:
          "So _____ is the view from the top of the mountain.",
        options: [
          "A. beautiful it",
          "B. beautiful is",
          "C. is beautiful",
          "D. beautiful",
        ],
        correctAnswer: "B. beautiful is",
        reason:
          "Inversion dengan 'So + adjective': So + adj + Vord + S. 'So beautiful is the view' = penekanan betapa indahnya pemandangan. Formula: So + beautiful (adj) + is (Vord) + the view (S).",
      },
    ],
  },
];

export { advanceGrammarLessons };
