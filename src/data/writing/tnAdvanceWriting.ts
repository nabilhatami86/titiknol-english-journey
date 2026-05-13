import type { ModuleLesson } from "@/types/module";

export const advanceWritingLessons: ModuleLesson[] = [

  // ── Day 1 · Subject-Verb Agreement ───────────────────────────────────────────
  {
    id: "adv-writing-1",
    track: "writing",
    day: 1,
    tutor: "Ms. Manda",
    title: "Subject-Verb Agreement",
    subtitle: "Key Points · What Can Be a Verb · Interrupting Phrase",
    overview:
      "Di dalam sebuah kalimat harus ada minimal 1 Subject dan 1 Verb. Kalimat tanpa subject atau tanpa verb bukan merupakan kalimat yang valid. Pelajari aturan dasar Subject-Verb Agreement termasuk Interrupting Phrase yang sering menjebak.",
    materialSections: [
      {
        title: "A. Key Points in Building a Sentence",
        points: [
          "1. Di dalam sebuah kalimat, setidaknya harus ada 1 Subject dan 1 Verb.",
          "2. Kalimat yang tidak mengandung Subject = Bukan Kalimat.",
          "3. Kalimat yang tidak mengandung Verb = Bukan Kalimat.",
          "4. Tidak boleh double Subject ataupun double Verb di dalam kalimat.",
          "5. Boleh double Subject & double Verb asalkan ada 1 Conjunction.",
          "",
          "📌 Rumus Conjunction:",
          "   1 Conjunction = 2S + 2V",
          "   2 Conjunction = 3S + 3V",
          "   3 Conjunction = 4S + 4V",
        ],
      },
      {
        title: "B. Yang Bisa Menjadi Verb",
        points: [
          "✅ Auxiliary  : is, am, are, was, were, have, has, had",
          "✅ Ordinary   : attain, compete, study, publish, learn, dst.",
          "✅ Modal      : can, will, must, may, might, should, could, would, shall, ought to, dst.",
          "",
          "❌ BUKAN VERB (kecuali didahului auxiliary):",
          "   Gerund (Ving)       → Speaking    → Bukan Verb",
          "   To Infinitive       → To Speak    → Bukan Verb",
          "   V3 (Past Participle)→ Spoken      → Bukan Verb",
          "",
          "✅ Ketika didahului Auxiliary:",
          "   Aux + Ving  = Am Speaking  = Sedang Berbicara",
          "   Aux + To Inf= Have To Speak= Harus Berbicara",
          "   Aux + V3    = Was Spoken   = Dibicarakan (Dulu)",
        ],
      },
      {
        title: "C. Interrupting Phrase",
        points: [
          "Interrupting Phrase adalah phrase yang 'menggangu' dalam penentuan subject.",
          "Verb tetap mengikuti SUBJECT ASLI, bukan kata di dalam interrupting phrase.",
          "",
          "Contoh Interrupting Phrase:",
          "  together with   | accompanied by | by the way    | as you know",
          "  along with      | in addition to | including     | as long as",
          "  especially      | as well as     | in my opinion | besides",
          "",
          "❌ Salah : Nina, together with her friends, ARE cleaning the room.",
          "✅ Benar : Nina, together with her friends, IS cleaning the room.",
          "",
          "Penjelasan: Subject adalah Nina (singular), maka verb yang digunakan IS.",
          "'Together with her friends' adalah interrupting phrase — diabaikan.",
        ],
      },
      {
        title: "D. Hierarki Bahasa",
        points: [
          "Alphabet → Word → Phrase → Clause → Sentence → Paragraph → Essay → Book/Article → Library/Journal",
          "",
          "📌 Perbedaan Clause dan Sentence:",
          "   Clause   = S + V  (tanpa meaning / bisa jadi bagian kalimat)",
          "   Sentence = S + V  (ada meaning, diakhiri titik)",
        ],
      },
      {
        title: "E. Pola Kalimat dengan Conjunction",
        points: [
          "Rumus:",
          "   2S + (2V) → 1 Conj",
          "   4S + (4V) → 3 Conj",
          "",
          "Pola penulisan:",
          "   ▸ SV, Conj, SV",
          "   ▸ Conj, SV, SV",
          "",
          "Contoh:",
          "   ▸ Ms Rosa AND Ms Aya eat dessert together.  → [2S + 1V + 1Conj]",
          "   ▸ She opens the door AND enters the room.   → [1S + 2V + 1Conj]",
        ],
      },
      {
        title: "F. Cara Identifikasi Kalimat",
        points: [
          "Langkah-langkah mengidentifikasi kalimat:",
          "   1️⃣  Cek verb",
          "   2️⃣  Cari conj (kalau verb > 1)",
          "   3️⃣  Singular / plural",
          "   4️⃣  Meaning → passive",
        ],
      },
      {
        title: "G. Contoh Analisis Kalimat",
        points: [
          "▸ Mr Panji eats rice.",
          "   S = Mr Panji  |  V = eats  |  Simple Sentence",
          "",
          "▸ Mr Rafa, together with Mr Aryoo, plays football.",
          "   S = Mr Rafa  |  'together with Mr Aryoo' = interrupting phrase (koma apositif)",
          "   V = plays (singular, mengikuti Mr Rafa)",
          "",
          "▸ (Cardiovascular) study is currently becoming headline.",
          "   'Cardiovascular' = adjective yang menerangkan 'study'",
          "   S = study  |  V = is becoming  |  Meaning: studi tentang kesehatan jantung",
        ],
      },
    ],
    exercises: [
      {
        id: "adv-w1-q1",
        type: "multiple-choice",
        section: "final",
        question:
          "Beri kode yang tepat:\n\n\"Magnificent Mountain and coastal scenery are British Columbia's chief tourist attractions.\"\n\nA = No Subject  |  B = Missing Verb  |  C = Double Subject (no conj.)  |  D = Double Verb (no conj.)  |  E = Correct",
        options: [
          "A — Tidak mengandung subject",
          "B — Tidak mengandung verb / kurang verb",
          "C — Double subject tanpa conjunction",
          "D — Double verb tanpa conjunction",
          "E — Kalimat sudah benar",
        ],
        correctAnswer: "E — Kalimat sudah benar",
        reason:
          "Subject: 'Mountain and coastal scenery' (compound subject dihubungkan 'and'). Verb: 'are'. Kalimat sudah benar.",
      },
      {
        id: "adv-w1-q2",
        type: "multiple-choice",
        section: "final",
        question:
          "Beri kode yang tepat:\n\n\"The midnight sun is a phenomenon remains in the sky for twenty-four hours or longer.\"\n\nA = No Subject  |  B = Missing Verb  |  C = Double Subject (no conj.)  |  D = Double Verb (no conj.)  |  E = Correct",
        options: [
          "A — Tidak mengandung subject",
          "B — Tidak mengandung verb / kurang verb",
          "C — Double subject tanpa conjunction",
          "D — Double verb tanpa conjunction",
          "E — Kalimat sudah benar",
        ],
        correctAnswer: "D — Double verb tanpa conjunction",
        reason:
          "Subject: 'The midnight sun'. V1: 'is'. V2: 'remains' — dua verb tanpa conjunction. Koreksi: '...is a phenomenon THAT remains in the sky...'",
      },
      {
        id: "adv-w1-q3",
        type: "multiple-choice",
        section: "final",
        question:
          "Beri kode yang tepat:\n\n\"James Dicke's first poem has been published annually he still a senior in college.\"\n\nA = No Subject  |  B = Missing Verb  |  C = Double Subject (no conj.)  |  D = Double Verb (no conj.)  |  E = Correct",
        options: [
          "A — Tidak mengandung subject",
          "B — Tidak mengandung verb / kurang verb",
          "C — Double subject tanpa conjunction",
          "D — Double verb tanpa conjunction",
          "E — Kalimat sudah benar",
        ],
        correctAnswer: "C — Double subject tanpa conjunction",
        reason:
          "Ada dua subject ('poem' dan 'he') tanpa conjunction. Koreksi: '...has been published annually WHEN he WAS still a senior in college.'",
      },
      {
        id: "adv-w1-q4",
        type: "multiple-choice",
        section: "final",
        question:
          "Beri kode yang tepat:\n\n\"Those travelers are completing their trip on Delta should report to Gate three.\"\n\nA = No Subject  |  B = Missing Verb  |  C = Double Subject (no conj.)  |  D = Double Verb (no conj.)  |  E = Correct",
        options: [
          "A — Tidak mengandung subject",
          "B — Tidak mengandung verb / kurang verb",
          "C — Double subject tanpa conjunction",
          "D — Double verb tanpa conjunction",
          "E — Kalimat sudah benar",
        ],
        correctAnswer: "D — Double verb tanpa conjunction",
        reason:
          "V1: 'are completing'. V2: 'should report' — dua verb tanpa conjunction. Koreksi: 'Those travelers COMPLETING their trip on Delta should report to Gate three.'",
      },
      {
        id: "adv-w1-q5",
        type: "multiple-choice",
        section: "final",
        question:
          "Beri kode yang tepat:\n\n\"Last year has been filtered through permeable rocks but contains some dissolved minerals.\"\n\nA = No Subject  |  B = Missing Verb  |  C = Double Subject (no conj.)  |  D = Double Verb (no conj.)  |  E = Correct",
        options: [
          "A — Tidak mengandung subject",
          "B — Tidak mengandung verb / kurang verb",
          "C — Double subject tanpa conjunction",
          "D — Double verb tanpa conjunction",
          "E — Kalimat sudah benar",
        ],
        correctAnswer: "A — Tidak mengandung subject",
        reason:
          "'Last year' adalah time expression (keterangan waktu), bukan subject. Koreksi: 'THE WATER last year has been filtered through permeable rocks but contains some dissolved minerals.'",
      },
      {
        id: "adv-w1-q6",
        type: "multiple-choice",
        section: "final",
        question:
          "Beri kode yang tepat:\n\n\"Because the students got low score, they had to retake the exam with the professor.\"\n\nA = No Subject  |  B = Missing Verb  |  C = Double Subject (no conj.)  |  D = Double Verb (no conj.)  |  E = Correct",
        options: [
          "A — Tidak mengandung subject",
          "B — Tidak mengandung verb / kurang verb",
          "C — Double subject tanpa conjunction",
          "D — Double verb tanpa conjunction",
          "E — Kalimat sudah benar",
        ],
        correctAnswer: "E — Kalimat sudah benar",
        reason:
          "Complex sentence: S1 'the students' + V1 'got' (subordinate clause dengan 'because'), S2 'they' + V2 'had to retake' (main clause). Kalimat sudah benar.",
      },
      {
        id: "adv-w1-q7",
        type: "multiple-choice",
        section: "final",
        question:
          "Beri kode yang tepat:\n\n\"The companies offered the lowest prices attracted a large number of customers.\"\n\nA = No Subject  |  B = Missing Verb  |  C = Double Subject (no conj.)  |  D = Double Verb (no conj.)  |  E = Correct",
        options: [
          "A — Tidak mengandung subject",
          "B — Tidak mengandung verb / kurang verb",
          "C — Double subject tanpa conjunction",
          "D — Double verb tanpa conjunction",
          "E — Kalimat sudah benar",
        ],
        correctAnswer: "D — Double verb tanpa conjunction",
        reason:
          "V1: 'offered'. V2: 'attracted' — dua verb tanpa conjunction. Koreksi: 'The companies THAT offered the lowest prices attracted a large number of customers.'",
      },
      {
        id: "adv-w1-q8",
        type: "multiple-choice",
        section: "final",
        question:
          "Beri kode yang tepat:\n\n\"The text for history class in school and college it contains more than twenty chapters.\"\n\nA = No Subject  |  B = Missing Verb  |  C = Double Subject (no conj.)  |  D = Double Verb (no conj.)  |  E = Correct",
        options: [
          "A — Tidak mengandung subject",
          "B — Tidak mengandung verb / kurang verb",
          "C — Double subject tanpa conjunction",
          "D — Double verb tanpa conjunction",
          "E — Kalimat sudah benar",
        ],
        correctAnswer: "C — Double subject tanpa conjunction",
        reason:
          "S1: 'The text'. S2: 'it' (pronoun redundan). Koreksi: 'The text for history class in school and college contains more than twenty chapters.' (hapus 'it')",
      },
      {
        id: "adv-w1-q9",
        type: "multiple-choice",
        section: "final",
        question:
          "Beri kode yang tepat:\n\n\"A job on the day shift or the night shift of rotation schedules available at the company.\"\n\nA = No Subject  |  B = Missing Verb  |  C = Double Subject (no conj.)  |  D = Double Verb (no conj.)  |  E = Correct",
        options: [
          "A — Tidak mengandung subject",
          "B — Tidak mengandung verb / kurang verb",
          "C — Double subject tanpa conjunction",
          "D — Double verb tanpa conjunction",
          "E — Kalimat sudah benar",
        ],
        correctAnswer: "B — Tidak mengandung verb / kurang verb",
        reason:
          "Subject: 'A job'. Tidak ada verb. Koreksi: 'A job on the day shift or the night shift of rotation schedules IS available at the company.'",
      },
      {
        id: "adv-w1-q10",
        type: "multiple-choice",
        section: "final",
        question:
          "Beri kode yang tepat:\n\n\"With a sudden jerk of his hand threw the ball across the field to one of the other players.\"\n\nA = No Subject  |  B = Missing Verb  |  C = Double Subject (no conj.)  |  D = Double Verb (no conj.)  |  E = Correct",
        options: [
          "A — Tidak mengandung subject",
          "B — Tidak mengandung verb / kurang verb",
          "C — Double subject tanpa conjunction",
          "D — Double verb tanpa conjunction",
          "E — Kalimat sudah benar",
        ],
        correctAnswer: "A — Tidak mengandung subject",
        reason:
          "'With a sudden jerk of his hand' adalah prepositional phrase, bukan subject. Verb 'threw' tidak memiliki subject. Koreksi: 'With a sudden jerk of his hand, HE threw the ball across the field...'",
      },
    ],
  },

  // ── Day 2 · Sentence Types ────────────────────────────────────────────────────
  {
    id: "adv-writing-2",
    track: "writing",
    day: 2,
    tutor: "Ms. Manda",
    title: "Sentence Types",
    subtitle: "Simple · Compound · Complex · Compound-Complex",
    overview:
      "Dalam bahasa Inggris terdapat 4 jenis kalimat berdasarkan struktur: Simple, Compound, Complex, dan Compound-Complex. Perbedaannya terletak pada jumlah clause dan jenis conjunction yang digunakan.",
    materialSections: [
      {
        title: "1. Simple Sentence",
        points: [
          "Kalimat yang hanya terdiri dari 1S + 1V saja.",
          "(Compound subject atau compound predicate masih tergolong Simple)",
          "",
          "Contoh:",
          "  ▸ Many students want to study abroad.",
          "  ▸ The skier turned and jumped.  (1S + compound predicate)",
          "  ▸ You and I need piano lessons.  (compound S + 1V)",
        ],
      },
      {
        title: "2. Compound Sentence",
        points: [
          "Kalimat yang terdiri dari 2S + 2V disertai dengan Conjunction FANBOYS.",
          "",
          "FANBOYS: For, And, Nor, But, Or, Yet, So",
          "",
          "Contoh:",
          "  ▸ Many students want to study abroad AND they will apply the scholarship.",
          "  ▸ I planned to go the hockey game, BUT I couldn't get tickets.",
          "  ▸ Dorothy likes white water rafting, BUT she also enjoys kayaking.",
        ],
      },
      {
        title: "3. Complex Sentence",
        points: [
          "Kalimat yang terdiri dari 2 atau lebih S+V dengan Subordinating Conjunction",
          "(Adjective Clause / Noun Clause / Adverbial Clause).",
          "",
          "Contoh subordinators: who, which, that, because, although, while, when, since, if...",
          "",
          "Contoh:",
          "  ▸ Many students WHO want to study abroad prepare themselves for the scholarship.",
          "  ▸ He stands at the bottom of the cliff WHILE the climber moves up the rock.",
          "  ▸ BECAUSE Kayla has so much climbing experience, we asked her to lead our group.",
        ],
      },
      {
        title: "4. Compound-Complex Sentence",
        points: [
          "Kalimat yang terdiri dari 2 atau lebih Conjunction.",
          "(Gabungan dari conj. FANBOYS dan Subordinating Conjunction)",
          "",
          "Contoh:",
          "  ▸ Many students WHO want to study abroad come to Pare AND they learn IELTS.",
          "  ▸ There are many problems to solve BEFORE this program can be used,",
          "    BUT engineers believe THAT they will be able to solve them soon.",
        ],
      },
      {
        title: "5. Noun Clause Connector/Subjects",
        points: [
          "NC Connector/Subject berfungsi sebagai SUBJECT dalam noun clause sekaligus penghubung.",
          "Connector ini: who · whoever · what · whatever · which · whichever",
          "",
          "📌 NC as OBJECT of verb:",
          "   Pola: S  V  [NC Connector/Subject  V]",
          "   Contoh: I know  [what  happened].",
          "",
          "📌 NC as SUBJECT:",
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
      {
        id: "adv-w2-q1",
        type: "multiple-choice",
        section: "final",
        question: "Tentukan jenis kalimat berikut:\n\n\"The bell rang.\"",
        options: ["Simple", "Compound", "Complex", "Compound-Complex"],
        correctAnswer: "Simple",
        reason: "1 Subject (the bell) + 1 Verb (rang). Kalimat paling sederhana.",
      },
      {
        id: "adv-w2-q2",
        type: "multiple-choice",
        section: "final",
        question:
          "Tentukan jenis kalimat berikut:\n\n\"Bridget ran the first part of the race, and Tara biked the second part.\"",
        options: ["Simple", "Compound", "Complex", "Compound-Complex"],
        correctAnswer: "Compound",
        reason:
          "S1: Bridget + V1: ran. S2: Tara + V2: biked. Conjunction FANBOYS: 'and'. Ini Compound Sentence.",
      },
      {
        id: "adv-w2-q3",
        type: "multiple-choice",
        section: "final",
        question:
          "Tentukan jenis kalimat berikut:\n\n\"He stands at the bottom of the cliff while the climber moves up the rock.\"",
        options: ["Simple", "Compound", "Complex", "Compound-Complex"],
        correctAnswer: "Complex",
        reason:
          "Main clause: 'He stands...' Subordinate clause: 'while the climber moves...' — 'while' adalah subordinating conjunction. Ini Complex Sentence.",
      },
      {
        id: "adv-w2-q4",
        type: "multiple-choice",
        section: "final",
        question: "Tentukan jenis kalimat berikut:\n\n\"The skier turned and jumped.\"",
        options: ["Simple", "Compound", "Complex", "Compound-Complex"],
        correctAnswer: "Simple",
        reason:
          "1 Subject (the skier) + compound predicate (turned and jumped). 'And' di sini menghubungkan dua verb pada subject yang sama — bukan dua clause. Ini Simple Sentence.",
      },
      {
        id: "adv-w2-q5",
        type: "multiple-choice",
        section: "final",
        question:
          "Tentukan jenis kalimat berikut:\n\n\"Naoki passed the test because he studied hard and understood the material.\"",
        options: ["Simple", "Compound", "Complex", "Compound-Complex"],
        correctAnswer: "Complex",
        reason:
          "Main clause: 'Naoki passed the test'. Subordinate clause: 'because he studied hard and understood...' — 'because' adalah subordinating conjunction. Ini Complex Sentence.",
      },
      {
        id: "adv-w2-q6",
        type: "multiple-choice",
        section: "final",
        question:
          "Tentukan jenis kalimat berikut:\n\n\"Because Kayla has so much climbing experience, we asked her to lead our group.\"",
        options: ["Simple", "Compound", "Complex", "Compound-Complex"],
        correctAnswer: "Complex",
        reason:
          "Subordinate clause di depan: 'Because Kayla has...'. Main clause: 'we asked her...' — subordinating conjunction 'because'. Ini Complex Sentence.",
      },
      {
        id: "adv-w2-q7",
        type: "multiple-choice",
        section: "final",
        question: "Tentukan jenis kalimat berikut:\n\n\"You and I need piano lessons.\"",
        options: ["Simple", "Compound", "Complex", "Compound-Complex"],
        correctAnswer: "Simple",
        reason:
          "Compound subject (You and I) + 1 Verb (need). Meskipun ada 'and', ini menghubungkan dua subject dalam satu clause — tetap Simple Sentence.",
      },
      {
        id: "adv-w2-q8",
        type: "multiple-choice",
        section: "final",
        question:
          "Tentukan jenis kalimat berikut:\n\n\"I planned to go the hockey game, but I couldn't get tickets.\"",
        options: ["Simple", "Compound", "Complex", "Compound-Complex"],
        correctAnswer: "Compound",
        reason:
          "S1: I + V1: planned. S2: I + V2: couldn't get. Conjunction FANBOYS: 'but'. Ini Compound Sentence.",
      },
      {
        id: "adv-w2-q9",
        type: "multiple-choice",
        section: "final",
        question:
          "Tentukan jenis kalimat berikut:\n\n\"Dorothy likes white water rafting, but she also enjoys kayaking.\"",
        options: ["Simple", "Compound", "Complex", "Compound-Complex"],
        correctAnswer: "Compound",
        reason:
          "S1: Dorothy + V1: likes. S2: she + V2: enjoys. Conjunction FANBOYS: 'but'. Ini Compound Sentence.",
      },
      {
        id: "adv-w2-q10",
        type: "multiple-choice",
        section: "final",
        question:
          "Tentukan jenis kalimat berikut:\n\n\"There are many problems to solve before this program can be used, but engineers believe that they will be able to solve them soon.\"",
        options: ["Simple", "Compound", "Complex", "Compound-Complex"],
        correctAnswer: "Compound-Complex",
        reason:
          "Terdapat FANBOYS 'but' DAN subordinators 'before' dan 'that' — gabungan Compound dan Complex. Ini Compound-Complex Sentence.",
      },
      // ── Exercise 10: NC Connector/Subject — Correct (C) or Incorrect (I) ──────
      {
        id: "adv-w2-ex10-1",
        type: "multiple-choice",
        section: "final",
        question:
          "Exercise 10 — Correct (C) or Incorrect (I)?\n\n\"The game show contestant was able to respond to whatever was asked.\"",
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "C — Correct",
        reason:
          "NC Connector/Subject 'whatever' diikuti verb 'was asked' → NC sebagai object of preposition 'to'. Struktur benar.",
      },
      {
        id: "adv-w2-ex10-2",
        type: "multiple-choice",
        section: "final",
        question:
          "Exercise 10 — Correct (C) or Incorrect (I)?\n\n\"You should find out which the best physics department.\"",
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "I — Incorrect",
        reason:
          "NC Connector/Subject 'which' harus diikuti verb dalam noun clause. Tidak ada verb setelah 'which'. Koreksi: '...find out which IS the best physics department.'",
      },
      {
        id: "adv-w2-ex10-3",
        type: "multiple-choice",
        section: "final",
        question:
          "Exercise 10 — Correct (C) or Incorrect (I)?\n\n\"The employee was unhappy about what was added to his job description.\"",
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "C — Correct",
        reason:
          "NC Connector/Subject 'what' diikuti verb 'was added' → NC sebagai object of preposition 'about'. Struktur benar.",
      },
      {
        id: "adv-w2-ex10-4",
        type: "multiple-choice",
        section: "final",
        question:
          "Exercise 10 — Correct (C) or Incorrect (I)?\n\n\"Whoever wants to take the desert tour during spring break signing up at the office.\"",
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "I — Incorrect",
        reason:
          "'Signing up' adalah Ving tanpa auxiliary — bukan main verb. NC Subject 'Whoever wants...' tidak memiliki main verb. Koreksi: '...should sign up at the office.'",
      },
      {
        id: "adv-w2-ex10-5",
        type: "multiple-choice",
        section: "final",
        question:
          "Exercise 10 — Correct (C) or Incorrect (I)?\n\n\"The motorist was unable to discover who he had struck his car.\"",
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "I — Incorrect",
        reason:
          "Struktur NC salah: 'who he had struck his car' ambigu/janggal. Koreksi: '...discover whose car he had struck.' (jika NC sebagai object dari 'struck')",
      },
      {
        id: "adv-w2-ex10-6",
        type: "multiple-choice",
        section: "final",
        question:
          "Exercise 10 — Correct (C) or Incorrect (I)?\n\n\"The voters should elect whichever of the candidates seems best to them.\"",
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "C — Correct",
        reason:
          "NC Connector/Subject 'whichever' diikuti prepositional phrase 'of the candidates' lalu verb 'seems' → NC sebagai object of 'elect'. Struktur benar.",
      },
      {
        id: "adv-w2-ex10-7",
        type: "multiple-choice",
        section: "final",
        question:
          "Exercise 10 — Correct (C) or Incorrect (I)?\n\n\"It was difficult to distinguish what was on sale and what was merely on display.\"",
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "C — Correct",
        reason:
          "Dua NC Connector/Subject: 'what was on sale' dan 'what was merely on display', keduanya sebagai object of 'distinguish'. Struktur benar.",
      },
      {
        id: "adv-w2-ex10-8",
        type: "multiple-choice",
        section: "final",
        question:
          "Exercise 10 — Correct (C) or Incorrect (I)?\n\n\"You should buy whatever the cheapest and most durable.\"",
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "I — Incorrect",
        reason:
          "NC 'whatever the cheapest and most durable' tidak memiliki verb. Koreksi: '...whatever IS the cheapest and most durable.'",
      },
      {
        id: "adv-w2-ex10-9",
        type: "multiple-choice",
        section: "final",
        question:
          "Exercise 10 — Correct (C) or Incorrect (I)?\n\n\"What was written in the letter angered him beyond belief.\"",
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "C — Correct",
        reason:
          "NC Connector/Subject 'What was written in the letter' berfungsi sebagai SUBJECT kalimat, diikuti main verb 'angered'. Struktur benar.",
      },
      {
        id: "adv-w2-ex10-10",
        type: "multiple-choice",
        section: "final",
        question:
          "Exercise 10 — Correct (C) or Incorrect (I)?\n\n\"You can spend your time with whoever important to you.\"",
        options: ["C — Correct", "I — Incorrect"],
        correctAnswer: "I — Incorrect",
        reason:
          "NC 'whoever important to you' tidak memiliki verb. Koreksi: '...with whoever IS important to you.'",
      },
    ],
  },

  // ── Day 3 · SVA Exercise 2 (True/False) ──────────────────────────────────────
  {
    id: "adv-writing-3",
    track: "writing",
    day: 3,
    tutor: "Ms. Manda",
    title: "Subject-Verb Agreement — Exercise 2",
    subtitle: "True/False: Identifikasi kalimat yang benar dan salah (No. 1–20)",
    overview:
      "Berikan penilaian True atau False pada setiap kalimat. Jika False, perhatikan penjelasan koreksinya untuk memahami letak kesalahannya.",
    materialSections: [
      {
        title: "Pengingat: Aturan SVA Penting",
        points: [
          "✅ Kalimat harus memiliki minimal 1 Subject + 1 Verb.",
          "✅ Ving (Gerund/Present Participle) tanpa auxiliary = BUKAN Verb.",
          "✅ V3 (Past Participle) tanpa auxiliary = BUKAN Verb (hanya modifier).",
          "✅ Relative clause (who/which/that + S + V) tidak menghilangkan kebutuhan main verb.",
          "✅ Kalimat dengan dua clause harus memiliki conjunction yang sesuai.",
          "",
          "Contoh analisis:",
          "  'Many students WHO WANT to study abroad COME to Pare.' ✅",
          "   → Main S: students | Relative clause: who want | Main V: come",
          "",
          "  'Many students WHO WANT to study abroad [__] to Pare.' ❌",
          "   → Main V hilang!",
        ],
      },
    ],
    exercises: [
      {
        id: "adv-w3-q1",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"There are many students want to study abroad.\"",
        options: ["True", "False"],
        correctAnswer: "False",
        reason:
          "V1: 'are'. V2: 'want' — double verb tanpa conjunction. Koreksi: 'There are many students WHO want to study abroad.'",
      },
      {
        id: "adv-w3-q2",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"There are many students who want to study abroad.\"",
        options: ["True", "False"],
        correctAnswer: "True",
        reason:
          "Main V: 'are'. Relative clause: 'who want...' — terstruktur dengan benar. Kalimat benar.",
      },
      {
        id: "adv-w3-q3",
        type: "multiple-choice",
        section: "final",
        question: "True or False?\n\n\"Many students want to study abroad.\"",
        options: ["True", "False"],
        correctAnswer: "True",
        reason: "S: 'Many students'. V: 'want'. Simple sentence yang benar.",
      },
      {
        id: "adv-w3-q4",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"There are many students wanting to study abroad.\"",
        options: ["True", "False"],
        correctAnswer: "True",
        reason:
          "Main V: 'are'. 'Wanting' adalah present participle modifier (menjelaskan 'students'). Kalimat benar.",
      },
      {
        id: "adv-w3-q5",
        type: "multiple-choice",
        section: "final",
        question: "True or False?\n\n\"Many students wanting to study abroad.\"",
        options: ["True", "False"],
        correctAnswer: "False",
        reason:
          "'Wanting' adalah Ving tanpa auxiliary — bukan verb. Tidak ada main verb. Koreksi: 'Many students WANT to study abroad.'",
      },
      {
        id: "adv-w3-q6",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"Many students who want to study abroad to Pare to prepare themselves for IELTS test.\"",
        options: ["True", "False"],
        correctAnswer: "False",
        reason:
          "'Who want' hanya ada di relative clause. Main clause tidak memiliki verb. Koreksi: '...who want to study abroad COME to Pare to prepare...'",
      },
      {
        id: "adv-w3-q7",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"Many students who want to study abroad come to Pare to prepare themselves for IELTS test.\"",
        options: ["True", "False"],
        correctAnswer: "True",
        reason:
          "Main S: 'students'. Relative clause: 'who want...'. Main V: 'come'. Terstruktur dengan benar.",
      },
      {
        id: "adv-w3-q8",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"Soekarno who known as one of the founding fathers of Indonesia was an orator\"",
        options: ["True", "False"],
        correctAnswer: "False",
        reason:
          "'Known' tanpa auxiliary dalam relative clause — bukan complete verb. Koreksi: 'Soekarno who IS KNOWN as one of the founding fathers of Indonesia was an orator.'",
      },
      {
        id: "adv-w3-q9",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"Soekarno who is known as one of the founding fathers of Indonesia was an orator\"",
        options: ["True", "False"],
        correctAnswer: "True",
        reason:
          "Relative clause: 'who is known...' (V: is known). Main V: 'was'. Kalimat benar.",
      },
      {
        id: "adv-w3-q10",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"Soekarno is known as one of the founding fathers of Indonesia was an orator\"",
        options: ["True", "False"],
        correctAnswer: "False",
        reason:
          "V1: 'is known'. V2: 'was' — double verb tanpa conjunction. Koreksi: 'Soekarno WHO is known as one of the founding fathers of Indonesia was an orator.'",
      },
      {
        id: "adv-w3-q11",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"Soekarno known as one of the founding fathers of Indonesia was an orator\"",
        options: ["True", "False"],
        correctAnswer: "True",
        reason:
          "'Known as...' adalah reduced relative clause (= who was known as...) yang berfungsi sebagai modifier. Main V: 'was'. Kalimat benar.",
      },
      {
        id: "adv-w3-q12",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"Soekarno who is known as one of the founding fathers of Indonesia an orator\"",
        options: ["True", "False"],
        correctAnswer: "False",
        reason:
          "Tidak ada main verb. 'Is known' hanya ada dalam relative clause. Koreksi: '...Indonesia WAS an orator.'",
      },
      {
        id: "adv-w3-q13",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"During an eclipse of the sun, the Earth when lying in the shadow of the Moon\"",
        options: ["True", "False"],
        correctAnswer: "False",
        reason:
          "'When lying' bukan main verb — tidak ada main verb dalam kalimat. Koreksi: '...the Earth LIES in the shadow of the Moon.'",
      },
      {
        id: "adv-w3-q14",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"During an eclipse of the sun, the Earth that lies in the shadow of the Moon\"",
        options: ["True", "False"],
        correctAnswer: "False",
        reason:
          "'That lies...' adalah relative clause modifier. Tidak ada main verb. Koreksi: '...the Earth LIES in the shadow of the Moon.' (tanpa 'that')",
      },
      {
        id: "adv-w3-q15",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"During an eclipse of the sun, the Earth lies in the shadow of the Moon\"",
        options: ["True", "False"],
        correctAnswer: "True",
        reason: "S: 'the Earth'. V: 'lies'. Kalimat benar.",
      },
      {
        id: "adv-w3-q16",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"During an eclipse of the sun, the Earth lying in the shadow of the Moon\"",
        options: ["True", "False"],
        correctAnswer: "False",
        reason:
          "'Lying' adalah Ving tanpa auxiliary — bukan verb. Tidak ada main verb. Koreksi: '...the Earth LIES in the shadow of the Moon.'",
      },
      {
        id: "adv-w3-q17",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"The Puritans were not the only colonist to be driven by religious motives\"",
        options: ["True", "False"],
        correctAnswer: "True",
        reason:
          "S: 'The Puritans'. V: 'were'. 'To be driven' adalah to-infinitive sebagai modifier. Kalimat benar.",
      },
      {
        id: "adv-w3-q18",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"The Puritans were not the only colonist drove religious motives\"",
        options: ["True", "False"],
        correctAnswer: "False",
        reason:
          "V1: 'were'. V2: 'drove' — double verb tanpa conjunction. Koreksi: '...the only colonist DRIVEN by religious motives.'",
      },
      {
        id: "adv-w3-q19",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"The Puritans were not the only colonist who was driven by religious motives\"",
        options: ["True", "False"],
        correctAnswer: "True",
        reason:
          "Main V: 'were'. Relative clause: 'who was driven...' Kalimat benar.",
      },
      {
        id: "adv-w3-q20",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"The Puritans were not the only colonist who driven by religious motive\"",
        options: ["True", "False"],
        correctAnswer: "False",
        reason:
          "'Who driven by' — 'driven' tanpa auxiliary dalam relative clause adalah tidak lengkap. Koreksi: '...who WAS DRIVEN by religious motives.'",
      },
    ],
  },

  // ── Day 4 · SVA Exercise 3 (True/False) ──────────────────────────────────────
  {
    id: "adv-writing-4",
    track: "writing",
    day: 4,
    tutor: "Ms. Manda",
    title: "Subject-Verb Agreement — Exercise 3",
    subtitle: "True/False: Identifikasi kalimat yang benar dan salah (No. 1–25)",
    overview:
      "Latihan lanjutan Subject-Verb Agreement dengan kalimat-kalimat akademik. Fokus pada subject-verb agreement dan penggunaan tense yang tepat.",
    materialSections: [
      {
        title: "Tip: Pola Kesalahan yang Sering Muncul",
        points: [
          "1. Singular subject + plural verb (atau sebaliknya)",
          "   ❌ The children IS advanced.  ✅ The children ARE advanced.",
          "",
          "2. Interrupted subject — verb mengikuti subject asli, bukan noun terdekat",
          "   ❌ The path to my purposes ARE laid.  ✅ The path IS laid.",
          "",
          "3. 'A number of' vs 'The number of'",
          "   'A number of' = many → plural verb",
          "   'The number of' = jumlahnya → singular verb",
          "   ❌ A number of companies HAS...  ✅ A number of companies HAVE...",
          "",
          "4. Tense yang tidak konsisten",
          "   ❌ ...Rutherford CONDUCT an experiment  ✅ CONDUCTED",
          "",
          "5. Passive voice: will be + V3 (bukan Ving)",
          "   ❌ will be INCLUDING  ✅ will be INCLUDED",
        ],
      },
    ],
    exercises: [
      {
        id: "adv-w4-q1",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"A possible solution could be utilise to the food prevention techniques used by countries like Holland.\"",
        options: ["True", "False"],
        correctAnswer: "False",
        reason:
          "'could be utilise' salah — seharusnya passive 'could be utilized' atau infinitive 'could be to utilize'. Koreksi: '...could be to UTILIZE the food prevention techniques...'",
      },
      {
        id: "adv-w4-q2",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"Many people prove that most of the men in the world does not like to go shopping for a long time.\"",
        options: ["True", "False"],
        correctAnswer: "False",
        reason:
          "'Men' adalah plural — seharusnya 'DO not'. Koreksi: '...most of the men in the world DO not like...'",
      },
      {
        id: "adv-w4-q3",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"The principal feel responsible for enforcing a law that they see as detrimental to students.\"",
        options: ["True", "False"],
        correctAnswer: "False",
        reason:
          "'The principal' singular — seharusnya 'feels'. Koreksi: 'The principal FEELS responsible...'",
      },
      {
        id: "adv-w4-q4",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"Scientists has compared the hardness of two minerals by how easily they can be scratched.\"",
        options: ["True", "False"],
        correctAnswer: "False",
        reason:
          "'Scientists' adalah plural — seharusnya 'have compared'. Koreksi: 'Scientists HAVE compared...'",
      },
      {
        id: "adv-w4-q5",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"Positive emotions facilitate the creative aspects of earning positive and negative emotions.\"",
        options: ["True", "False"],
        correctAnswer: "True",
        reason:
          "S: 'Positive emotions' (plural). V: 'facilitate' (plural). Struktur kalimat benar secara gramatikal.",
      },
      {
        id: "adv-w4-q6",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"The children in the program is significantly more advanced in language development than their peers.\"",
        options: ["True", "False"],
        correctAnswer: "False",
        reason:
          "'Children' adalah plural, 'in the program' adalah interrupting phrase. Koreksi: 'The children in the program ARE significantly more advanced...'",
      },
      {
        id: "adv-w4-q7",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"It is an old city holy site which was endorsed over the weekend by the United States and Jordan.\"",
        options: ["True", "False"],
        correctAnswer: "True",
        reason:
          "Anticipatory 'It' sebagai dummy subject. V: 'is'. Relative clause: 'which was endorsed...' Kalimat benar.",
      },
      {
        id: "adv-w4-q8",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"In 1909, Ernest Rutherford conduct an experiment in which he aimed a beam of positive particles.\"",
        options: ["True", "False"],
        correctAnswer: "False",
        reason:
          "Kalimat berbicara tentang masa lalu (1909) — 'conduct' harus past tense. Koreksi: '...Rutherford CONDUCTED an experiment...'",
      },
      {
        id: "adv-w4-q9",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"The Sunlight is the ultimate source of most energy used by plants and animals on the Earth.\"",
        options: ["True", "False"],
        correctAnswer: "True",
        reason: "S: 'The Sunlight'. V: 'is'. Kalimat benar secara gramatikal.",
      },
      {
        id: "adv-w4-q10",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"There is growing evidence in New Zealand that children from poor background is arriving at school.\"",
        options: ["True", "False"],
        correctAnswer: "False",
        reason:
          "Dalam noun clause 'that children...', subject 'children' adalah plural — seharusnya 'ARE arriving'. Koreksi: '...that children from poor background ARE arriving at school.'",
      },
      {
        id: "adv-w4-q11",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"Many States have made a determined effort to strengthen human rights protection for women.\"",
        options: ["True", "False"],
        correctAnswer: "True",
        reason:
          "S: 'Many States' (plural). V: 'have made'. Kalimat benar.",
      },
      {
        id: "adv-w4-q12",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"The effort to clean up cars may do little to cut pollution if nothing is done about the tendency.\"",
        options: ["True", "False"],
        correctAnswer: "True",
        reason:
          "S: 'The effort'. V: 'may do'. Complex sentence dengan 'if'. Kalimat benar.",
      },
      {
        id: "adv-w4-q13",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"Now, there are only two ice sheets left on Earth and most of them cover Greenland and Antarctica.\"",
        options: ["True", "False"],
        correctAnswer: "True",
        reason:
          "Compound sentence: 'there are...' AND 'most of them cover...'. Kalimat benar.",
      },
      {
        id: "adv-w4-q14",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"When a bird inhales, air actually leave its lungs and fresh air enters the lungs as it exhales.\"",
        options: ["True", "False"],
        correctAnswer: "False",
        reason:
          "'Air' adalah singular (uncountable) — seharusnya 'leaves'. Koreksi: '...air actually LEAVES its lungs...'",
      },
      {
        id: "adv-w4-q15",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"This phenomenon is the flooding of homes and then submit building flood prevention.\"",
        options: ["True", "False"],
        correctAnswer: "False",
        reason:
          "'Submit' tidak paralel dan tidak logis dalam konteks ini. Koreksi: '...and the SUBMISSION of building flood prevention measures.'",
      },
      {
        id: "adv-w4-q16",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"When a criminal case goes to trial, the defendant may elect to have it heard either by a jury or by a judge.\"",
        options: ["True", "False"],
        correctAnswer: "True",
        reason:
          "Complex sentence dengan 'when'. S: 'the defendant'. V: 'may elect'. Kalimat benar.",
      },
      {
        id: "adv-w4-q17",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"When it concerns about embarrassment matters less, other fears becomes irrelevant.\"",
        options: ["True", "False"],
        correctAnswer: "False",
        reason:
          "Struktur kalimat kacau. 'Fears' adalah plural — seharusnya 'become'. Koreksi: 'When embarrassment MATTERS less, other fears BECOME irrelevant.'",
      },
      {
        id: "adv-w4-q18",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"There are two researches that have thrown some light on the origins of the American population.\"",
        options: ["True", "False"],
        correctAnswer: "False",
        reason:
          "'Research' adalah uncountable noun — tidak bisa 'two researches'. Koreksi: 'There are two STUDIES that have thrown some light...'",
      },
      {
        id: "adv-w4-q19",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"This condition also disturb their psychological states which can increase their stress level.\"",
        options: ["True", "False"],
        correctAnswer: "False",
        reason:
          "'This condition' singular — seharusnya 'disturbs'. Koreksi: 'This condition also DISTURBS their psychological states...'",
      },
      {
        id: "adv-w4-q20",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"This happens to such a high degree in some children that they appears to be demonstrated talent.\"",
        options: ["True", "False"],
        correctAnswer: "False",
        reason:
          "'They' adalah plural — seharusnya 'appear'. Koreksi: '...that they APPEAR to DEMONSTRATE talent.'",
      },
      {
        id: "adv-w4-q21",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"There are quite a number of new methods which can help, such as child-initiated learning.\"",
        options: ["True", "False"],
        correctAnswer: "True",
        reason:
          "'A number of' = many → plural verb 'are'. Kalimat benar.",
      },
      {
        id: "adv-w4-q22",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"The path to my fixed purposes are laid on iron rails on which my soul is grooved to run.\"",
        options: ["True", "False"],
        correctAnswer: "False",
        reason:
          "Subject asli adalah 'The path' (singular). 'To my fixed purposes' adalah interrupting phrase. Koreksi: 'The path to my fixed purposes IS laid...'",
      },
      {
        id: "adv-w4-q23",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"A number of large insurance companies has their headquarters in Hartford, Connecticut.\"",
        options: ["True", "False"],
        correctAnswer: "False",
        reason:
          "'A number of' = many → plural verb. Koreksi: 'A number of large insurance companies HAVE their headquarters...'",
      },
      {
        id: "adv-w4-q24",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"Since we have read the article, we should know that cell-phone radiation may cause health problems.\"",
        options: ["True", "False"],
        correctAnswer: "True",
        reason:
          "Complex sentence dengan 'since'. S1: we + V1: have read. S2: we + V2: should know. Kalimat benar.",
      },
      {
        id: "adv-w4-q25",
        type: "multiple-choice",
        section: "final",
        question:
          "True or False?\n\n\"Interpreting parts from famous drama will be including in the City Readers Theater sessions.\"",
        options: ["True", "False"],
        correctAnswer: "False",
        reason:
          "Passive voice: will be + V3 (past participle). 'Including' (Ving) salah. Koreksi: '...will be INCLUDED in the City Readers Theater sessions.'",
      },
    ],
  },

  // ── Day 5 · Connectors: Usage and Meaning ─────────────────────────────────────
  {
    id: "adv-writing-5",
    track: "writing",
    day: 5,
    tutor: "Ms. Manda",
    title: "Connectors: Usage and Meaning",
    subtitle: "Coordinators · Subordinators · Transitions — Fungsi dan Penggunaan",
    overview:
      "Connector adalah kata penghubung yang digunakan untuk menghubungkan ide dalam tulisan. Terdapat 3 jenis connector: Coordinators (antara dua elemen setara), Subordinators (memulai subordinate clause), dan Transitions (menghubungkan antar kalimat).",
    materialSections: [
      {
        title: "Jenis-Jenis Connector",
        points: [
          "📌 COORDINATORS",
          "   Memberi nilai setara pada dua elemen. Diletakkan DI ANTARA dua elemen.",
          "   Contoh: I want three beers AND a glass of lemonade.",
          "",
          "📌 SUBORDINATORS",
          "   Diletakkan di awal subordinate clause. Menghubungkan main clause",
          "   dengan subordinate clause (clarifies/expands/explains meaning).",
          "   Contoh: I'm going to London BECAUSE I've got a new job.",
          "",
          "📌 TRANSITIONS",
          "   Menghubungkan satu main idea ke main idea lain (dipisah titik/titik koma).",
          "   Jika di awal kalimat → diikuti koma.",
          "   Contoh: Drawing is all about mastering each step. FURTHERMORE, it takes daily practice.",
        ],
      },
      {
        title: "To Add Another Idea",
        points: [
          "Coordinator  : and",
          "Subordinator : —",
          "Transitions  : Furthermore, Moreover, Besides, Also, In addition",
        ],
      },
      {
        title: "To Restate / Explain / Emphasize",
        points: [
          "Coordinator  : —",
          "Subordinator : —",
          "Transitions  : That is, In other words, In fact, Actually, Namely",
        ],
      },
      {
        title: "To Give an Example",
        points: [
          "Coordinator  : —",
          "Subordinator : —",
          "Transitions  : For example, For instance, To illustrate",
        ],
      },
      {
        title: "To Show a Choice",
        points: [
          "Coordinator  : Or, Nor",
          "Subordinator : —",
          "Transitions  : —",
        ],
      },
      {
        title: "To Show a Difference",
        points: [
          "Coordinator  : But",
          "Subordinator : While, Whereas, Though",
          "Transitions  : In contrast, On the contrary, On the other hand,",
          "               Instead, However, Still, Otherwise",
        ],
      },
      {
        title: "To Show the Opposite of What You Might Expect",
        points: [
          "Coordinator  : Yet",
          "Subordinator : Although, Though, Even",
          "Transitions  : Nevertheless, Admittedly, Even so, Nonetheless",
        ],
      },
      {
        title: "To Show Similarity",
        points: [
          "Coordinator  : —",
          "Subordinator : Just as, As",
          "Transitions  : Similarly, Likewise, In the same way",
        ],
      },
      {
        title: "To Show a Cause or Reason",
        points: [
          "Coordinator  : For",
          "Subordinator : Because, Since, As now, As long as",
          "Transitions  : —",
        ],
      },
      {
        title: "To Show a Result or Effect",
        points: [
          "Coordinator  : So",
          "Subordinator : —",
          "Transitions  : As a result, Consequently, As a consequence,",
          "               Therefore, Thus, Hence, Accordingly",
        ],
      },
      {
        title: "To Show a Time Relationship",
        points: [
          "Coordinator  : —",
          "Subordinator : Before, After, When, Whenever, While, As soon as,",
          "               Since, The moment that, Once",
          "Transitions  : Previously, Subsequently, Finally, Afterward, Meanwhile,",
          "               First/Second/etc., After that, Then, At first",
        ],
      },
      {
        title: "To Show a Condition",
        points: [
          "Coordinator  : Or",
          "Subordinator : If, Unless, Even if, When, Whenever",
          "Transitions  : —",
        ],
      },
    ],
    exercises: [
      {
        id: "adv-w5-q1",
        type: "multiple-choice",
        section: "final",
        question:
          "Connector manakah yang tepat untuk menambahkan ide?\n\n\"The new policy has many benefits. ___, it also reduces operational costs.\"",
        options: ["However", "Furthermore", "Therefore", "Unless"],
        correctAnswer: "Furthermore",
        reason:
          "'Furthermore' adalah transition yang digunakan untuk menambahkan ide (to add another idea). 'However' = perbedaan; 'Therefore' = hasil; 'Unless' = kondisi.",
      },
      {
        id: "adv-w5-q2",
        type: "multiple-choice",
        section: "final",
        question:
          "Connector manakah yang tepat untuk menunjukkan perbedaan?\n\n\"She enjoys classical music, ___ her brother prefers hip-hop.\"",
        options: ["whereas", "because", "therefore", "moreover"],
        correctAnswer: "whereas",
        reason:
          "'Whereas' adalah subordinator untuk menunjukkan perbedaan (to show a difference). 'Because' = alasan; 'therefore' = hasil; 'moreover' = penambahan ide.",
      },
      {
        id: "adv-w5-q3",
        type: "multiple-choice",
        section: "final",
        question:
          "Connector manakah yang tepat untuk menunjukkan hasil?\n\n\"He didn't study for the exam. ___, he failed.\"",
        options: ["Nevertheless", "As a result", "Although", "In addition"],
        correctAnswer: "As a result",
        reason:
          "'As a result' adalah transition untuk menunjukkan hasil/akibat. 'Nevertheless' = meskipun begitu; 'Although' = walaupun; 'In addition' = tambahan.",
      },
      {
        id: "adv-w5-q4",
        type: "multiple-choice",
        section: "final",
        question:
          "Connector manakah yang tepat untuk menunjukkan waktu?\n\n\"___ the teacher entered the room, the students stopped talking.\"",
        options: ["However", "Therefore", "As soon as", "Similarly"],
        correctAnswer: "As soon as",
        reason:
          "'As soon as' adalah subordinator untuk menunjukkan time relationship. 'However' = perbedaan; 'Therefore' = hasil; 'Similarly' = kesamaan.",
      },
      {
        id: "adv-w5-q5",
        type: "multiple-choice",
        section: "final",
        question:
          "Connector manakah yang tepat untuk memberikan contoh?\n\n\"Many factors affect learning. ___, sleep quality plays a crucial role.\"",
        options: ["On the contrary", "For instance", "Nevertheless", "Whereas"],
        correctAnswer: "For instance",
        reason:
          "'For instance' adalah transition untuk memberikan contoh (to give an example). Pilihan lain tidak sesuai fungsinya.",
      },
      {
        id: "adv-w5-q6",
        type: "multiple-choice",
        section: "final",
        question:
          "Manakah penggunaan connector yang BENAR?\n\nA) \"She was tired. But she kept working.\"\nB) \"She was tired but she kept working.\"\nC) \"Although she was tired, she kept working.\"\nD) \"She was tired; however, she kept working.\"",
        options: [
          "A — She was tired. But she kept working.",
          "B — She was tired but she kept working.",
          "C — Although she was tired, she kept working.",
          "D — She was tired; however, she kept working.",
        ],
        correctAnswer: "C — Although she was tired, she kept working.",
        reason:
          "Semua pilihan sebenarnya bisa benar, tapi C menggunakan subordinator 'although' dengan benar sebagai complex sentence, dan struktur subordinate clause + main clause sudah tepat. B juga benar sebagai compound sentence. A kurang umum (coordinator tidak biik memulai kalimat baru dalam formal writing). D benar dengan transition.",
      },
    ],
  },

  // ── Day 6 · Informal Letter ───────────────────────────────────────────────────
  {
    id: "adv-writing-6",
    track: "writing",
    day: 6,
    tutor: "Ms. Manda",
    title: "Informal Letter",
    subtitle: "Struktur · Greeting · Closing · Contoh Surat Informal",
    overview:
      "Informal letter adalah surat yang dikirim kepada teman atau keluarga untuk mengekspresikan hal-hal personal. Meskipun informal/kasual, ada aturan struktur yang harus diikuti agar tetap bisa disebut surat.",
    materialSections: [
      {
        title: "Aturan Menulis Informal Letter",
        points: [
          "1️⃣  TANGGAL — di kiri atau kanan atas halaman.",
          "    Boleh tambahkan alamat di bawah tanggal (opsional).",
          "    Contoh:",
          "    October 10, 2019",
          "    No. 75 Brawijaya Street",
          "    Kediri, East Java, 64212",
          "",
          "2️⃣  GREETING — Bisa menunjukkan kasih sayang atau keakraban.",
          "    Dear Sumiyati,",
          "    Dearest Mom and Dad,",
          "    My beloved Sansa,",
          "",
          "3️⃣  BODY — Isi surat (bebas sesuai tujuan penulis).",
          "    I have missed you...",
          "    I want to tell you about...",
          "",
          "4️⃣  CLOSING — Di kanan atau kiri bawah. Bisa menunjukkan afeksi.",
          "    Sincerely yours,",
          "    Affectionately,",
          "    With all my love,",
          "",
          "5️⃣  TANDA TANGAN — Nama pengirim.",
          "    Jenny / Maimunah / Wiranto",
          "",
          "6️⃣  POSTSCRIPT (opsional) — Pikiran tambahan di akhir.",
          "    P.S. If you want to call me, I have a new number: ...",
        ],
      },
      {
        title: "Jenis-Jenis Greeting",
        points: [
          "FRIENDLY GREETINGS    : Dear Mary, / My Dear Mary, / Hello Mary, / Hi Mary,",
          "AFFECTIONATE GREETINGS: My Dearest Mary, / Dearest Mary, / My Dearest, / Dearest,",
          "LOVING GREETINGS      : My Beloved Mary, / My Darling Mary, / My Sweet, / My Darling,",
        ],
      },
      {
        title: "Jenis-Jenis Closing",
        points: [
          "FRIENDLY CLOSINGS     : Sincerely, / Sincerely yours, / Truly, / Truly yours,",
          "                        Yours truly, / Yours sincerely,",
          "AFFECTIONATE CLOSINGS : Fondly, / Affectionately, / With fond regards,",
          "                        With sincere affection,",
          "LOVING CLOSINGS       : Love, / Lovingly, / With all my love, / I love you,",
        ],
      },
      {
        title: "Contoh Informal Letter",
        points: [
          "June 30, 2009",
          "2990 West Main Street",
          "Johnstown, IL 60622",
          "",
          "Dear Mary,",
          "",
          "I'm sorry I haven't written sooner, but I've been away on the most wonderful trip.",
          "My friend Bill and I rented a van and traveled from Johnstown to Seattle, then from",
          "Seattle to Los Angeles, and returned home by way of the Grand Canyon.",
          "",
          "It was the most spectacular trip. We saw mountain ranges, beautiful forestlands,",
          "deserts, and the magnificent Grand Canyon. I never expected the Grand Canyon to be",
          "so big or to be so breathtaking.",
          "",
          "The only bad moment came when Bill sprained his ankle hiking down a trail. I carried",
          "him piggyback all the way back to the van. We both laughed for a long time, even",
          "though Bill was in a lot of pain.",
          "",
          "I wish you could have been with us. Let's get together soon. I look forward to seeing you.",
          "",
          "Yours truly,",
          "Jim",
          "",
          "P.S. If you want to call me, I have a new cell phone number: 555-1234",
        ],
      },
    ],
    exercises: [
      {
        id: "adv-w6-q1",
        type: "multiple-choice",
        section: "final",
        question:
          "Manakah komponen yang WAJIB ada dalam informal letter?",
        options: [
          "Tanggal, Greeting, Body, Closing, Nama — semua wajib",
          "Tanggal dan Greeting saja sudah cukup",
          "Hanya Body yang wajib; yang lain opsional",
          "Alamat pengirim wajib ada di atas",
        ],
        correctAnswer:
          "Tanggal, Greeting, Body, Closing, Nama — semua wajib",
        reason:
          "Komponen wajib informal letter: tanggal, greeting, body, closing, dan tanda tangan/nama. Alamat sifatnya opsional.",
      },
      {
        id: "adv-w6-q2",
        type: "multiple-choice",
        section: "final",
        question:
          "Manakah greeting yang termasuk kategori LOVING greeting?",
        options: [
          "Dear Mary,",
          "My Dear Mary,",
          "Dearest Mary,",
          "My Darling Mary,",
        ],
        correctAnswer: "My Darling Mary,",
        reason:
          "'My Darling Mary,' termasuk loving greeting. 'Dear Mary' = friendly; 'My Dear Mary' = friendly; 'Dearest Mary' = affectionate.",
      },
      {
        id: "adv-w6-q3",
        type: "multiple-choice",
        section: "final",
        question:
          "Dalam contoh surat Jim kepada Mary, apa yang terjadi dengan Bill saat perjalanan?",
        options: [
          "Bill kehilangan kameranya",
          "Bill keseleo pergelangan kaki saat hiking",
          "Bill sakit dan harus pulang lebih awal",
          "Bill bertengkar dengan Jim",
        ],
        correctAnswer: "Bill keseleo pergelangan kaki saat hiking",
        reason:
          "Dari contoh surat: 'The only bad moment came when Bill sprained his ankle hiking down a trail.'",
      },
      {
        id: "adv-w6-q4",
        type: "task",
        section: "final",
        question:
          "WRITING TASK:\n\nTulis sebuah informal letter kepada teman baikmu tentang pengalamanmu belajar bahasa Inggris di Pare (atau cerita pribadimu sendiri).\n\nPastikan kalimatmu mengandung:\n✅ Tanggal\n✅ Greeting yang sesuai\n✅ Minimal 3 paragraf body\n✅ Closing yang sesuai\n✅ Nama pengirim\n\nGunakan variasi Sentence Types (Simple, Compound, Complex) dalam tulisanmu!",
        sampleAnswer:
          "May 12, 2026\n\nDear Rahma,\n\nI hope you are doing well! I'm writing to tell you about my experience studying English in Pare, Kediri. It has been an amazing journey that I will never forget.\n\nThe courses here are very intensive, but they are also incredibly rewarding. Every day, I attend writing and grammar classes in the morning, and I have speaking practice in the evening. The tutors are very helpful, so I feel motivated to learn more.\n\nI have improved a lot since I arrived. Although it was hard at first, I can now speak more confidently and write better sentences. I wish you could join me here someday!\n\nSincerely yours,\n[Your Name]",
      },
    ],
  },

  // ── Day 7 · Formal Letter ─────────────────────────────────────────────────────
  {
    id: "adv-writing-7",
    track: "writing",
    day: 7,
    tutor: "Ms. Manda",
    title: "Formal Letter",
    subtitle: "Struktur · Greeting Formal · Contoh Surat Formal",
    overview:
      "Formal letter adalah surat yang digunakan untuk tujuan profesional atau resmi, seperti antara perusahaan, dari perusahaan ke individu, atau sebaliknya. Formal letter memiliki struktur yang lebih ketat dibandingkan informal letter.",
    materialSections: [
      {
        title: "Aturan Menulis Formal Letter",
        points: [
          "1️⃣  TANGGAL + ALAMAT PENGIRIM (kiri atas)",
          "    June 30, 2009",
          "    2990 West Main Street",
          "    Johnstown, IL 60622 (311) 555-1234",
          "",
          "2️⃣  NAMA & ALAMAT PENERIMA (baris berikutnya)",
          "    Ms. Mary Brown",
          "    Jones Medical Center",
          "    400 East Oak Street",
          "    Johnstown, IL 60634",
          "",
          "3️⃣  SUBJECT LINE",
          "    Subject: Billing Problem",
          "",
          "4️⃣  GREETING FORMAL",
          "    To whom it may concern,",
          "    Dear Sir/Madam,",
          "    Dear Mr./Mrs. Art Director",
          "    Dear Ms Wanda Maximov",
          "",
          "5️⃣  BODY LETTER",
          "    Jika memulai korespondensi: perkenalkan diri atau langsung ke tujuan",
          "    I am a student from Indonesia...",
          "    I am writing this letter to enquire about...",
          "",
          "    Jika membalas surat: mulai dengan berterima kasih",
          "    Thank you for contacting me about...",
          "",
          "6️⃣  POLITE FINAL STATEMENT (opsional)",
          "    Thank you.",
          "",
          "7️⃣  CLOSING + TANDA TANGAN",
          "    Sincerely,",
          "    [Your signature]",
          "    [Your typed name]",
          "    [Your title]",
          "",
          "8️⃣  ENCLOSURE (jika ada lampiran)",
          "    Enclosure (1)",
          "",
          "📌 Formal letter typewritten harus SINGLE-SPACED.",
        ],
      },
      {
        title: "Perbedaan Informal vs Formal Letter",
        points: [
          "INFORMAL LETTER:",
          "  • Ditujukan kepada teman/keluarga",
          "  • Bahasa kasual dan personal",
          "  • Tidak perlu subject line",
          "  • Bisa menggunakan loving/affectionate greeting & closing",
          "  • Boleh ada P.S.",
          "",
          "FORMAL LETTER:",
          "  • Ditujukan untuk keperluan profesional/resmi",
          "  • Bahasa formal dan impersonal",
          "  • Wajib ada subject line",
          "  • Greeting: Dear Sir/Madam atau nama dengan gelar",
          "  • Closing: Sincerely, / Yours faithfully,",
          "  • Tidak ada P.S.",
          "  • Jika ada lampiran: tulis Enclosure",
        ],
      },
      {
        title: "Contoh Formal Letter",
        points: [
          "June 30, 2009",
          "2990 West Main Street",
          "Johnstown, IL 60622 (311) 555-1234",
          "",
          "Ms. Mary Brown",
          "Jones Medical Center",
          "400 East Oak Street",
          "Johnstown, IL 60634",
          "",
          "Subject: Billing Problem",
          "",
          "Dear Ms. Brown,",
          "",
          "I am a patient who underwent outpatient surgery on my left hand on May 3, 2009.",
          "My doctor was Dr. Wilma Jones, and I am insured by the Johnstown HMO.",
          "My insurance number is ABC2003.",
          "",
          "On June 25, 2009, I received a bill from your office in the amount of $2,500.00.",
          "It is my understanding that my insurer will cover $2,400.00 of this amount.",
          "",
          "Please contact Mr. Roger Smith at Johnstown HMO for confirmation of my insurance",
          "and to adjust my bill. Inform me of any other steps I must take to correct this error.",
          "I have enclosed a copy of my insurance policy with this letter.",
          "",
          "Thank you.",
          "Sincerely,",
          "William Green",
        ],
      },
    ],
    exercises: [
      {
        id: "adv-w7-q1",
        type: "multiple-choice",
        section: "final",
        question:
          "Manakah yang TIDAK termasuk komponen formal letter?",
        options: [
          "Subject line",
          "Nama dan alamat penerima",
          "Postscript (P.S.)",
          "Closing formal",
        ],
        correctAnswer: "Postscript (P.S.)",
        reason:
          "P.S. hanya digunakan dalam informal letter, bukan formal letter.",
      },
      {
        id: "adv-w7-q2",
        type: "multiple-choice",
        section: "final",
        question:
          "Manakah greeting yang tepat untuk formal letter jika kamu tidak mengetahui nama penerima?",
        options: [
          "Dearest Sir,",
          "Hi Manager,",
          "To whom it may concern,",
          "My Dear Director,",
        ],
        correctAnswer: "To whom it may concern,",
        reason:
          "'To whom it may concern,' adalah greeting standar formal letter saat nama penerima tidak diketahui.",
      },
      {
        id: "adv-w7-q3",
        type: "multiple-choice",
        section: "final",
        question:
          "Dalam contoh formal letter William Green, apa yang William minta kepada Ms. Brown?",
        options: [
          "Minta bill dihapus seluruhnya",
          "Minta Ms. Brown menghubungi Johnstown HMO untuk konfirmasi dan penyesuaian tagihan",
          "Minta pertemuan langsung dengan Dr. Wilma Jones",
          "Minta nomor asuransi baru",
        ],
        correctAnswer:
          "Minta Ms. Brown menghubungi Johnstown HMO untuk konfirmasi dan penyesuaian tagihan",
        reason:
          "Dari surat: 'Please contact Mr. Roger Smith at Johnstown HMO for confirmation of my insurance and to adjust my bill.'",
      },
      {
        id: "adv-w7-q4",
        type: "task",
        section: "final",
        question:
          "WRITING TASK:\n\nTulis sebuah formal letter dengan salah satu skenario berikut:\n\nOpsi A: Tulis surat kepada professor di luar negeri dan tanyakan persyaratan untuk mendaftar kursus yang kamu inginkan.\n\nOpsi B: Tulis surat kepada sebuah perusahaan dan tanyakan tentang lowongan pekerjaan yang tersedia.\n\nPastikan suratmu mengandung:\n✅ Tanggal + alamat pengirim\n✅ Nama & alamat penerima\n✅ Subject line\n✅ Formal greeting\n✅ Body (minimal 2 paragraf)\n✅ Polite final statement\n✅ Formal closing + nama",
        sampleAnswer:
          "May 12, 2026\n123 Learning Street\nJakarta, Indonesia 12345\n(021) 555-7890\n\nProf. John Smith\nDepartment of Linguistics\nMelbourne University\n123 University Avenue\nMelbourne, Australia 3000\n\nSubject: Inquiry Regarding Linguistics Program Requirements\n\nDear Prof. Smith,\n\nI am writing to inquire about the requirements for applying to the Master of Linguistics program at Melbourne University. I am an Indonesian student with a strong interest in Applied Linguistics and English Language Teaching.\n\nCould you please provide information regarding the required qualifications, IELTS score requirements, and application deadlines? I would also appreciate any guidance on scholarship opportunities available to international students.\n\nThank you for your time and assistance. I look forward to your response.\n\nSincerely,\n[Your signature]\n[Your Full Name]\n[Student]",
      },
    ],
  },
];
