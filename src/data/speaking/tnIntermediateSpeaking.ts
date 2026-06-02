import type { ModuleLesson } from "@/types/module";

// ── Intermediate Speaking Lessons ────────────────────────────────────────────

const intermediateSpeakingLessons: ModuleLesson[] = [
  // ── Day 1: Past Events ───────────────────────────────────────────────────────
  {
    id: "int-speaking-1",
    track: "speaking",
    day: 1,
    tutor: "Ms. Aul",
    title: "Past Events",
    subtitle: "Describing memorable events using a mind map framework",
    overview:
      "Materi speaking tentang cara menceritakan kejadian di masa lalu menggunakan 5 pertanyaan panduan: what it was, when, what happened, why it happened, where & who was there, how you felt, dan why it was special.",
    materialSections: [
      {
        title: "Mind Map — Past Events",
        points: [
          "🗺️ Gunakan 5 pertanyaan ini sebagai panduan saat berbicara tentang past event:",
          "1. WHAT it was — Kejadian apa yang ingin kamu ceritakan?",
          "2. WHEN — Kapan kejadian itu terjadi?",
          "3. WHAT happened — Apa yang terjadi? Ceritakan urutannya.",
          "4. WHY it happened — Kenapa bisa terjadi?",
          "5. WHERE & WHO was there — Di mana lokasinya? Siapa saja yang hadir?",
          "6. How was your FEELING — Bagaimana perasaanmu saat itu?",
          "7. Why do you think it was SPECIAL — Kenapa kejadian itu berkesan bagimu?",
        ],
      },
      {
        title: 'Example Narrative — "My First Day at School"',
        points: [
          '"I would like to tell you about one of the most memorable events in my life — my first day at junior high school."',
          '"It happened in July, about eight years ago, at SMPN 5 in my hometown."',
          '"On that day, my mum dropped me off early in the morning. I was carrying a new bag and wearing a brand new uniform. I felt so proud, but also very nervous at the same time."',
          '"When I entered the school gate, I suddenly realized I had no idea where my classroom was. I walked around the corridor for almost ten minutes, looking lost and confused. Fortunately, a kind senior student noticed me and helped me find my class."',
          '"The reason it happened was because I was too nervous to read the notice board at the entrance, where the class list was already posted."',
          '"When I finally sat down in my seat, I felt so relieved. It was then that the person next to me smiled and introduced herself — and that was the beginning of a friendship that still lasts until today."',
          '"I think this event was very special because it was the first time I truly had to handle a situation on my own. It also taught me that it is okay to ask for help. Most importantly, it was the day I met my best friend."',
        ],
      },
      {
        title: "Useful Language for Telling Past Events",
        points: [
          'It happened on / in / at … — "It happened in the summer of 2018."',
          "At that time, … / Back then, … — memberi konteks waktu",
          "First … / Then … / After that … / Finally … — urutan kejadian",
          'I remember feeling … — "I remember feeling very nervous."',
          'What made it special was … — "What made it special was meeting my best friend."',
          'Looking back, … — "Looking back, I realize how much I learned from that experience."',
          'I will never forget … — "I will never forget the moment when …"',
        ],
      },
      {
        title: "Key Vocabulary — Feelings & Reactions",
        points: [
          "Positive: excited, thrilled, overjoyed, relieved, proud, grateful, touched",
          "Negative: nervous, anxious, scared, embarrassed, disappointed, overwhelmed",
          "Mixed: bittersweet, nostalgic, confused, surprised, speechless",
          'Tip: jangan hanya bilang "happy" atau "sad" — gunakan kata yang lebih spesifik untuk membuat ceritamu lebih hidup.',
        ],
      },
      {
        title: "Non-Familiar Vocabulary (from the Example)",
        points: [
          'memorable /ˈmem.ər.ə.bəl/ — (adj) berkesan, mudah diingat | "It was the most memorable event of my life."',
          'corridor /ˈkɒr.ɪ.dɔːr/ — (n) lorong, selasar di dalam gedung | "I walked around the corridor for ten minutes."',
          'noticed /ˈnəʊ.tɪst/ — (v) memperhatikan, menyadari | "A kind student noticed me and helped."',
          'fortunately /ˈfɔː.tʃən.ət.li/ — (adv) untungnya, beruntung sekali | "Fortunately, someone helped me."',
          'relieved /rɪˈliːvd/ — (adj) lega, merasa bebas dari tekanan | "I felt so relieved when I found my class."',
          'brand new — (phrase) baru sekali, belum pernah dipakai | "I was wearing a brand new uniform."',
          'handle /ˈhæn.dəl/ — (v) mengatasi, mengurus sendiri | "It was the first time I had to handle a situation on my own."',
          'entrance /ˈen.trəns/ — (n) pintu masuk, gerbang | "The class list was posted at the entrance."',
          'posted /ˈpəʊ.stɪd/ — (v) ditempelkan, dipasang (pengumuman) | "The list was already posted on the board."',
          'lasts /lɑːsts/ — (v) bertahan, berlangsung | "A friendship that still lasts until today."',
        ],
      },
    ],
    exercises: [
      {
        id: "int-sp1-q1",
        type: "task",
        question:
          "Buat mind map Past Event kamu sendiri di kertas! Tulis 1 kejadian berkesan di tengah, lalu isi 7 cabang: what, when, what happened, why it happened, where & who, feeling, why special.",
      },
      {
        id: "int-sp1-q2",
        type: "task",
        question:
          "Gunakan mind map yang sudah kamu buat untuk bercerita selama 2 menit kepada teman/tutor. Jangan membaca — cukup lihat mind map sebagai panduan. Gunakan minimal 4 useful language expressions dari daftar.",
      },
      {
        id: "int-sp1-q3",
        type: "task",
        question:
          'Partner activity: setelah temanmu selesai bercerita, ajukan 3 pertanyaan tentang past event mereka (contoh: "How did you feel when that happened?" / "Who was the most important person in that story?" / "Would you want to experience it again? Why?"). Lalu bergantian.',
      },
    ],
  },

  // ── Day 2: Pronunciation ─────────────────────────────────────────────────────
  {
    id: "int-speaking-2",
    track: "speaking",
    day: 2,
    tutor: "Ms. Aul",
    title: "Pronunciation",
    subtitle: "Silent Letters, Syllables, Stress & the Schwa Sound",
    overview:
      'Materi pronunciation: mengenal silent letters dalam bahasa Inggris, latihan membaca "A Plastic Ocean", pengenalan suku kata (syllable), pola tekanan kata (stress), dan bunyi schwa.',
    materialSections: [
      {
        title: "Silent Letters",
        points: [
          'B — silent setelah "m": lamb, bomb, thumb, climb, comb, debt, subtle',
          'C — silent sebelum "k": knock, knife, know, kneel, knight',
          'G — silent sebelum "n": gnome, gnat, gnaw, sign, foreign',
          "H — silent di awal kata: hour, honest, heir, honor, vehicle",
          'K — silent sebelum "n": knee, knit, knock, know, knife',
          "L — silent: calm, palm, walk, talk, half, could, would, should, folk",
          "P — silent di awal kata: pneumonia, psychology, pterodactyl",
          "T — silent: listen, castle, fasten, whistle, often, mortgage",
          'W — silent sebelum "r": write, wrong, wrap, wrist, wrestle',
        ],
      },
      {
        title: 'Reading Practice — "A Plastic Ocean"',
        points: [
          "Bacaan bertema lingkungan tentang polusi plastik di lautan.",
          "Fokus: membaca keras dengan pelafalan yang benar, perhatikan silent letters.",
          "Latihan: baca per paragraf, tutor koreksi pelafalan kata-kata kunci.",
          "Kata-kata perhatian: pollution, ocean, microplastics, environment, creatures.",
        ],
      },
      {
        title: "Syllables (Suku Kata)",
        points: [
          "Syllable = unit bunyi yang mengandung satu vokal/bunyi vokal.",
          "1 syllable: cat, dog, school, speak",
          "2 syllables: stu-dent, teach-er, com-plex, sim-ple",
          "3 syllables: com-pu-ter, un-der-stand, re-mem-ber",
          "4 syllables: com-mu-ni-cate, un-be-liev-able",
          "Cara menghitung: tempelkan tangan di dagu — tiap vokal yang terasa = 1 syllable.",
        ],
      },
      {
        title: "Word Stress & Sentence Stress",
        points: [
          "Word stress: setiap kata >1 syllable punya satu suku kata yang ditekan lebih keras.",
          "pho-TO-graph (noun) vs. pho-to-GRAPH-ic (adjective)",
          "RE-cord (noun) vs. re-CORD (verb)",
          "Sentence stress: kata konten (nouns, verbs, adjectives, adverbs) biasanya ditekan; kata fungsi (the, a, is, at) biasanya lemah.",
          'Contoh: "She\'s GOING to the STORE to BUY some MILK."',
        ],
      },
      {
        title: "The Schwa Sound /ə/",
        points: [
          'Schwa = bunyi vokal paling umum dalam bahasa Inggris — berbunyi seperti "uh" yang singkat dan lemah.',
          "Terjadi pada suku kata yang tidak ditekan.",
          "about /ə-BOUT/, today /tə-DAY/, banana /bə-NA-nə/",
          "teacher /TEE-chər/, problem /PROB-ləm/, family /FAM-ə-lee/",
          "Latihan: ucapkan kata-kata di atas dan rasakan di mana bunyi schwa muncul.",
        ],
      },
    ],
    exercises: [
      {
        id: "int-sp2-q1",
        type: "task",
        question:
          "Baca daftar silent letter words berikut keras-keras dan tandai huruf yang diam: lamb, knock, gnome, honest, calm, listen, write, psychology. Lalu tulis 2 kata baru dengan silent letter masing-masing.",
      },
      {
        id: "int-sp2-q2",
        type: "task",
        question:
          "Hitung jumlah syllable kata-kata berikut dan tandai suku kata yang ditekan: photograph, comfortable, university, international, pronunciation, communication.",
      },
      {
        id: "int-sp2-q3",
        type: "task",
        question:
          'Ucapkan kalimat berikut dan identifikasi kata mana yang mengandung schwa sound /ə/: "The teacher asked the student to open the textbook to chapter seven."',
      },
    ],
  },

  // ── Day 3: Describe Past Event ───────────────────────────────────────────────
  {
    id: "int-speaking-3",
    track: "speaking",
    day: 3,
    tutor: "Ms. Aul",
    title: "Describe Past Event",
    subtitle: "Using prepositions of time & place to talk about events",
    overview:
      "Materi speaking tentang cara mendeskripsikan kejadian di masa lalu: preposisi waktu & tempat, kosakata untuk event, hubungan/profesi, dan adjektiva untuk menggambarkan suasana acara.",
    materialSections: [
      {
        title: "Prepositions of Time",
        points: [
          "AT — waktu spesifik: at 7 o'clock, at noon, at midnight, at the weekend",
          "ON — hari & tanggal: on Monday, on 15 March, on my birthday, on New Year's Day",
          "IN — periode: in the morning, in 2023, in January, in the 20th century",
          "FOR — durasi: for two hours, for a week, for a long time",
          "DURING — dalam rentang: during the concert, during the holiday",
          "AGO — waktu lalu: three days ago, a year ago, long ago",
          "BEFORE / AFTER — urutan: before dinner, after the show",
        ],
      },
      {
        title: "Prepositions of Location",
        points: [
          "AT — lokasi spesifik: at school, at home, at the airport, at the corner",
          "IN — dalam suatu ruang/area: in the classroom, in Jakarta, in the box",
          "ON — permukaan: on the table, on the street, on the wall",
          "NEXT TO / BESIDE — di samping: next to the door",
          "IN FRONT OF / BEHIND — di depan/belakang",
          "BETWEEN — di antara: between the library and the cafeteria",
          "NEAR — dekat: near the park",
        ],
      },
      {
        title: "Words & Phrases for Describing Events",
        points: [
          'Organized / held — "The event was organized by the school committee."',
          'Took place / was held at — "It took place at the sports hall."',
          'Attended by — "It was attended by over 200 students."',
          'Opened / started — "The ceremony opened with a speech."',
          'Ended / concluded — "The event concluded with a group photo."',
          "Memorable / unforgettable / special — kata sifat untuk suasana",
          "Crowded / lively / cheerful / solemn — menggambarkan suasana acara",
        ],
      },
      {
        title: "Relationship & Occupation Words",
        points: [
          "Relatives: grandmother, grandfather, aunt, uncle, cousin, nephew, niece",
          "Occupations: teacher, principal, committee member, volunteer, organizer",
          "Group words: audience, participants, guests, performers, attendees",
        ],
      },
      {
        title: "Adjectives for Events",
        points: [
          "Exciting / thrilling / entertaining — menyenangkan/mengasyikkan",
          "Boring / dull / monotonous — membosankan",
          "Inspiring / motivating — menginspirasi",
          "Touching / emotional / moving — mengharukan",
          "Crowded / packed — penuh sesak",
          "Well-organized / chaotic — terorganisir/kacau",
        ],
      },
      {
        title: "SPEAKING TASK — Describe a Foreign Country",
        points: [
          "Describe a foreign country you would like to visit in the future.",
          "─────────────────────────────",
          "You should say:",
          "1️⃣ What country it is",
          "2️⃣ What you already know about it",
          "3️⃣ Who you would like to go there with",
          "4️⃣ And explain why you would like to visit that country",
          "─────────────────────────────",
          "⏱ Preparation time: 1 minute  |  Speaking time: 1–2 minutes",
          "Tip: Tip: gunakan Present tense untuk fakta, Future tense (would like to / want to) untuk rencana.",
        ],
      },
      {
        title: "Contoh Jawaban — Describe a Foreign Country",
        points: [
          "── Point 1: What country it is ──",
          '   "The country I would like to visit in the future is Japan. It is an island country located in East Asia, and it is well known for its unique blend of ancient traditions and modern technology."',
          "── Point 2: What you already know about it ──",
          '   "I already know quite a lot about Japan. I know that it has a very rich culture, including traditional tea ceremonies, beautiful temples, and stunning landscapes like Mount Fuji. Japan is also famous for its delicious food such as sushi, ramen, and takoyaki. Besides that, I have watched many Japanese anime series and films, so I feel like I already have a connection with the country."',
          "── Point 3: Who you would like to go with ──",
          '   "I would like to go there with my best friend because we both share the same interest in Japanese culture and food. I think travelling together would make the experience even more memorable and enjoyable."',
          "── Point 4: Why you would like to visit ──",
          '   "The main reason why I want to visit Japan is because I am deeply fascinated by how the Japanese people manage to preserve their traditional culture while at the same time being one of the most technologically advanced countries in the world. I would love to experience that contrast myself — walking through ancient shrines in Kyoto in the morning and exploring the futuristic city of Tokyo in the evening. I also believe that visiting Japan would broaden my perspective and help me appreciate different cultures more deeply."',
          "─────────────────────────────",
          "Key phrases to use:",
          "   would like to / want to / hope to / plan to + V1",
          "   I already know that... / I have heard that... / As far as I know...",
          "   The main reason is... / One of the reasons why... / That is why...",
          "   I believe that... / I think that... / In my opinion...",
        ],
      },
    ],
    exercises: [
      {
        id: "int-sp3-q1",
        type: "task",
        question:
          "Ceritakan satu event yang pernah kamu hadiri (ulang tahun, pernikahan, pertandingan, konser, dll). Gunakan minimal 5 preposisi waktu dan 3 preposisi lokasi dalam ceritamu.",
      },
      {
        id: "int-sp3-q2",
        type: "task",
        question:
          'Lengkapi kalimat: "Last _____, I attended a _____ at _____. It was organized by _____. The event took place _____ and was attended by _____. The atmosphere was _____ because _____."',
      },
      {
        id: "int-sp3-q3",
        type: "task",
        question:
          "Dengan pasangan: satu orang cerita tentang past event, yang lain bertanya minimal 3 pertanyaan (When? Where? Who was there? What happened? How was it?) lalu bergantian.",
      },
      {
        id: "int-sp3-q4",
        type: "task",
        question:
          "SPEAKING TASK: Describe a foreign country you would like to visit in the future.\n\nYou should cover:\n1. What country it is\n2. What you already know about it\n3. Who you would like to go there with\n4. Why you would like to visit that country\n\nPractice speaking for 1–2 minutes. Use the example in the material as a guide, but describe YOUR OWN chosen country.",
        sampleAnswer:
          "Contoh (Japan): 'The country I would like to visit is Japan. I know it is famous for its culture, food like sushi and ramen, and places like Mount Fuji and Tokyo. I would go there with my best friend because we both love Japanese culture. The main reason I want to visit is because I am fascinated by how Japan mixes ancient traditions with modern technology, and I believe it would be an unforgettable experience.'",
      },
    ],
  },

  // ── Day 4: Describe Past Events — Unusual Experience ─────────────────────────
  {
    id: "int-speaking-4",
    track: "speaking",
    day: 4,
    tutor: "Ms. Aul",
    title: "Describe Past Events — Unusual Experience",
    subtitle: "Talking about bizarre, quirky, or unexpected experiences",
    overview:
      "Materi speaking tentang cara mendeskripsikan pengalaman unik atau tidak biasa di masa lalu menggunakan kosakata khusus dan ekspresi naratif.",
    materialSections: [
      {
        title: "Vocabulary — Unusual / Strange",
        points: [
          'Peculiar — aneh/tidak biasa (milder): "It was a peculiar experience."',
          'Quirky — unik/eksentrik: "She has a quirky sense of humor."',
          'Bizarre — sangat aneh/ganjil: "The whole situation was bizarre."',
          'Odd — agak aneh: "That\'s an odd thing to say."',
          'Weird — aneh (informal): "It was a really weird day."',
          'Unexpected — tidak terduga: "The result was completely unexpected."',
          'Coincidence — kebetulan: "What a strange coincidence!"',
          "Unbelievable / Incredible — tidak terpercaya/luar biasa",
        ],
      },
      {
        title: 'Example Story — "A Bad Shopping Experience"',
        points: [
          '"Last Saturday, I went to the supermarket to buy some groceries."',
          '"It was a peculiar experience from the start — the power went out just as I entered."',
          '"I wandered around in the dark, which was quite bizarre."',
          '"Then, unexpectedly, I bumped into my old teacher from primary school."',
          '"What a coincidence! We hadn\'t seen each other for over ten years."',
          '"By the time the lights came back on, I had forgotten everything I needed to buy."',
          '"It was weird, funny, and unforgettable all at once!"',
        ],
      },
      {
        title: "Useful Narrative Phrases",
        points: [
          "It all started when … — cerita dimulai ketika…",
          "All of a sudden / Suddenly — tiba-tiba",
          "Out of nowhere — muncul tiba-tiba",
          "Before I knew it — sebelum aku sadar",
          "To make matters worse — memperparah situasi",
          "Fortunately / Luckily — untungnya",
          "In the end / Eventually — pada akhirnya",
          "Looking back, … — melihat ke belakang…",
        ],
      },
      {
        title: "Grammar Reminder — Simple Past",
        points: [
          "Regular: walk → walked, talk → talked, decide → decided",
          "Irregular: go → went, buy → bought, see → saw, meet → met, forget → forgot",
          "Negative: did not (didn't) + V1: \"I didn't see him.\"",
          'Question: Did + S + V1? "Did you enjoy it?"',
        ],
      },
      {
        title: "SPEAKING TASK — Describe a Useful Job",
        points: [
          "Describe a job that is useful to society.",
          "─────────────────────────────",
          "You should say:",
          "1️⃣ What job it is",
          "2️⃣ How you know about this job",
          "3️⃣ What type of people do this job",
          "4️⃣ And explain why you think this job is useful to society",
          "─────────────────────────────",
          "⏱ Preparation time: 1 minute  |  Speaking time: 1–2 minutes",
          "Tip: Tip: gunakan Present tense untuk fakta umum dan pendapat, Simple Past untuk pengalaman pribadi yang membuatmu tahu tentang pekerjaan ini.",
        ],
      },
      {
        title: "Contoh Jawaban — Describe a Useful Job",
        points: [
          "── Point 1: What job it is ──",
          '   "The job I would like to talk about is a doctor. A doctor is a medical professional whose main responsibility is to diagnose illnesses, treat patients, and help people recover from various health conditions."',
          "── Point 2: How you know about this job ──",
          '   "I have known about this job since I was a child because my uncle is a doctor at a public hospital in my city. I used to visit him at the hospital and I was always amazed by how he took care of the patients with so much patience and dedication. Apart from that, I have also learned about this profession from television programmes and health-related books."',
          "── Point 3: What type of people do this job ──",
          '   "In my opinion, people who become doctors are usually very hardworking, disciplined, and compassionate individuals. They need to be patient because they deal with sick people every day, and they must be detail-oriented since a small mistake can have serious consequences. Most doctors spend many years studying at university and continue learning throughout their career to keep up with the latest medical knowledge."',
          "── Point 4: Why this job is useful to society ──",
          '   "I strongly believe that doctors are one of the most important and useful members of society. Without doctors, people would have no one to turn to when they are seriously ill. Doctors save lives every single day, whether it is treating a child with a fever or performing a complex surgery. They also play a key role in preventing diseases by educating the public about healthy lifestyles and vaccinations. On a larger scale, doctors helped the world fight against dangerous pandemics like COVID-19, which showed us just how essential this profession truly is. That is why I think being a doctor is not only a great career but also a noble contribution to humanity."',
          "─────────────────────────────",
          "Key phrases to use:",
          "   In my opinion / I believe / I strongly think that...",
          "   Without... / If there were no..., ...",
          "   Not only... but also... / As well as...",
          "   Play a key role in / contribute to / be responsible for",
          "   On a larger scale / In general / As a result",
        ],
      },
    ],
    exercises: [
      {
        id: "int-sp4-q1",
        type: "task",
        question:
          "Ceritakan satu pengalaman tidak biasa/unik yang pernah kamu alami. Gunakan minimal 4 vocabulary dari daftar (peculiar, quirky, bizarre, dll) dan 3 narrative phrases (suddenly, out of nowhere, dll). Bicara minimal 1,5 menit.",
      },
      {
        id: "int-sp4-q2",
        type: "task",
        question:
          'Tulis kemudian ceritakan "A Bad _____ Experience" (ganti dengan topik pilihanmu: trip, cooking, exam, date, etc.) menggunakan pola dari contoh cerita "Bad Shopping Experience".',
      },
      {
        id: "int-sp4-q3",
        type: "task",
        question:
          "Two truths and a lie: ceritakan 3 pengalaman unik (2 nyata, 1 rekayasa). Teman menebak mana yang bohong. Gunakan past tense dan kosakata unusual experience.",
      },
      {
        id: "int-sp4-q4",
        type: "task",
        question:
          "SPEAKING TASK: Describe a job that is useful to society.\n\nYou should cover:\n1. What job it is\n2. How you know about this job\n3. What type of people do this job\n4. Why you think this job is useful to society\n\nPractice speaking for 1–2 minutes. Use the example in the material as a guide, but choose YOUR OWN job.",
        sampleAnswer:
          "Contoh (Doctor): 'The job I want to describe is a doctor. I know about this job because my uncle is a doctor. Doctors are usually hardworking, patient, and compassionate people who study for many years. I think this job is very useful because doctors save lives every day, help prevent diseases, and were essential during the COVID-19 pandemic. Without doctors, society would be in serious trouble.'",
      },
    ],
  },

  // ── Day 5: Describe Future Plans ─────────────────────────────────────────────
  {
    id: "int-speaking-5",
    track: "speaking",
    day: 5,
    tutor: "Ms. Aul",
    title: "Describe Future Plans",
    subtitle:
      "Using will, be going to, and simple present to talk about the future",
    overview:
      "Materi speaking tentang cara menyatakan rencana, tujuan, dan ambisi masa depan menggunakan berbagai ekspresi future tense.",
    materialSections: [
      {
        title: "Future Tense Forms",
        points: [
          "WILL — spontaneous decision, prediction, offer/promise:",
          '  "I think it will rain tomorrow."',
          '  "I\'ll help you with that."',
          "BE GOING TO — planned intention, evidence-based prediction:",
          '  "I\'m going to study abroad next year."',
          '  "Look at those clouds — it\'s going to rain."',
          "SIMPLE PRESENT — scheduled/timetabled events:",
          '  "The flight leaves at 8 a.m."',
          '  "The semester starts in September."',
          "PRESENT CONTINUOUS — arranged personal plans:",
          '  "I\'m meeting my advisor tomorrow."',
          '  "We\'re visiting my grandparents this weekend."',
        ],
      },
      {
        title: "Vocabulary — Goals & Ambitions",
        points: [
          'Goal — tujuan yang ingin dicapai: "My goal is to graduate with honors."',
          'Ambition — ambisi/cita-cita: "My ambition is to become a doctor."',
          'Dream — impian: "I have a dream of traveling to Europe."',
          'Plan — rencana konkret: "My plan is to save money every month."',
          'Aim — sasaran: "I aim to improve my English to C1 level."',
          'Aspire — bercita-cita: "I aspire to be a successful entrepreneur."',
          'Intend — bermaksud: "I intend to apply for a scholarship."',
          'Hope — berharap: "I hope to get a promotion this year."',
        ],
      },
      {
        title: "Short-term vs. Long-term Goals",
        points: [
          "Short-term (within 1 year): finish this course, get a new job, save IDR 10 million",
          "Long-term (more than 1 year): buy a house, start a business, move abroad, get a masters degree",
          'Template short-term: "In the next ___ months, I plan to ___."',
          'Template long-term: "In the next ___ years, I hope to ___."',
          'Linking goals: "First I will ___, then I\'m going to ___, and eventually I hope to ___."',
        ],
      },
      {
        title: "Useful Expressions for Future Plans",
        points: [
          "I'm planning to … / I plan to …",
          "I'm thinking about …-ing",
          "I'm looking forward to …-ing",
          "I've decided to …",
          "If everything goes well, I will …",
          "My ultimate goal is to …",
          "I really want to … someday",
          "Eventually, I hope to …",
        ],
      },
    ],
    exercises: [
      {
        id: "int-sp5-q1",
        type: "task",
        question:
          "Ceritakan rencana masa depanmu dalam 2 menit: satu short-term goal (dalam 6–12 bulan) dan satu long-term goal (5 tahun ke depan). Gunakan minimal 3 future forms berbeda (will, be going to, present continuous/simple).",
      },
      {
        id: "int-sp5-q2",
        type: "task",
        question:
          'Partner activity: interview temanmu tentang rencana mereka dengan pertanyaan: "What are you planning to do after this course?" / "Where do you see yourself in 5 years?" / "What is your biggest ambition?" Lalu laporkan ke kelas.',
      },
      {
        id: "int-sp5-q3",
        type: "task",
        question:
          'Buat "Dream Board" lisan: sebutkan 5 impian/tujuanmu (karier, keluarga, pendidikan, kesehatan, travel) dan jelaskan mengapa itu penting bagimu. Gunakan kosakata goal, ambition, dream, aim, aspire.',
      },
    ],
  },

  // ── Day 6: Describing Future Events — Technology ─────────────────────────────
  {
    id: "int-speaking-6",
    track: "speaking",
    day: 6,
    tutor: "Ms. Aul",
    title: "Describing Future Events — Technology",
    subtitle: "Talking about AI, future tech trends, and related phrasal verbs",
    overview:
      "Materi speaking tentang teknologi masa depan: AI, Biotechnology, Quantum Computing, IoT, 5G, Robotics — plus phrasal verbs penting di bidang teknologi.",
    materialSections: [
      {
        title: "Future Technology Themes",
        points: [
          "Artificial Intelligence (AI) — machine learning, chatbots, autonomous systems",
          "Biotechnology — gene editing (CRISPR), personalized medicine, lab-grown food",
          "Quantum Computing — faster computation, cryptography, drug discovery",
          "Internet of Things (IoT) — smart homes, wearables, connected devices",
          "5G & Connectivity — ultra-fast internet, autonomous vehicles, remote surgery",
          "Robotics — industrial robots, delivery drones, humanoid assistants",
        ],
      },
      {
        title: "Example — AI in the Future",
        points: [
          '"In the near future, AI will transform the way we work and live."',
          '"AI-powered tools are going to replace repetitive tasks in many industries."',
          '"Self-driving cars will soon be a common sight on our roads."',
          '"AI is expected to revolutionize healthcare by detecting diseases early."',
          '"However, many experts worry that AI could lead to widespread job losses."',
          '"It is crucial that governments set up regulations to ensure AI is used ethically."',
        ],
      },
      {
        title: "Phrasal Verbs for Technology",
        points: [
          'Set up — to establish or install: "We set up a new server."',
          'Log in / Log out — access/leave a system: "Log in with your username."',
          'Back up — save a copy: "Always back up your files."',
          'Shut down / Power up — turn off/on: "Shut down the computer before leaving."',
          'Roll out — release gradually: "The company will roll out the new app next month."',
          'Phase out — discontinue gradually: "CDs are being phased out by streaming."',
          'Keep up with — stay current: "It\'s hard to keep up with technology."',
          'Come up with — invent/devise: "Engineers came up with a new solution."',
          'Break down — stop functioning: "The system broke down during the demo."',
          'Catch up — reach the same level: "Developing countries are catching up in tech."',
        ],
      },
      {
        title: "Useful Language for Discussing Future Tech",
        points: [
          "It is predicted that … / Experts predict that …",
          "… is expected to … / … is likely to …",
          "In the near/distant future, …",
          "By 2030 / By the end of this decade, …",
          "This will lead to … / This could result in …",
          "On the one hand, … On the other hand, …",
          "The main advantage is … / The main concern is …",
        ],
      },
    ],
    exercises: [
      {
        id: "int-sp6-q1",
        type: "task",
        question:
          "Pilih SATU teknologi masa depan (AI, Biotech, Quantum Computing, IoT, 5G, atau Robotics) dan presentasikan dalam 2 menit: apa itu, bagaimana cara kerjanya, manfaatnya, dan potensi risikonya. Gunakan minimal 3 phrasal verbs dari daftar.",
      },
      {
        id: "int-sp6-q2",
        type: "task",
        question:
          'Debat mini: "Will AI be more beneficial or more harmful to society?" Satu tim pro, satu tim kontra. Gunakan ekspresi: "It is predicted that…", "On the one hand…", "The main concern is…"',
      },
      {
        id: "int-sp6-q3",
        type: "task",
        question:
          "Gambarkan hidupmu pada tahun 2040: bagaimana teknologi mengubah rumah, pekerjaan, transportasi, dan kesehatan kamu? Bicara 1,5–2 menit menggunakan future tenses dan phrasal verbs teknologi.",
      },
    ],
  },

  // ── Day 7: Describe Place ─────────────────────────────────────────────────────
  {
    id: "int-speaking-7",
    track: "speaking",
    day: 7,
    tutor: "Ms. Aul",
    title: "Describe Place",
    subtitle:
      "Vocabulary, prepositions of location, and expressing feelings about places",
    overview:
      "Materi speaking tentang cara mendeskripsikan suatu tempat: kosakata lokasi, preposisi, adjektiva penampilan dan kualitas, serta ekspresi perasaan.",
    materialSections: [
      {
        title: "Place Vocabulary",
        points: [
          "Natural: mountain, valley, river, waterfall, forest, jungle, beach, cliff, plain, volcano",
          "Urban: skyscraper, alley, intersection, boulevard, square, district, suburb, outskirts",
          "Buildings: cathedral, temple, mosque, museum, gallery, stadium, fortress, monument",
          "Features: fountain, bridge, pathway, courtyard, terrace, rooftop, balcony, harbor",
        ],
      },
      {
        title: "Prepositions of Location",
        points: [
          "IN — enclosed/large areas: in the valley, in the city center, in the forest",
          "ON — surfaces/edges: on the hill, on the coast, on the riverbank",
          "AT — specific point: at the top, at the entrance, at the crossroads",
          "BETWEEN — in the middle of two: between the mountains",
          'SURROUNDED BY — dikelilingi: "The village is surrounded by rice fields."',
          'OVERLOOKING — menghadap/melihat ke: "The hotel overlooks the bay."',
          'NESTLED IN — terletak di: "The town is nestled in a quiet valley."',
          'STRETCHING FROM … TO … — membentang dari: "The beach stretches from north to south."',
        ],
      },
      {
        title: "Adjectives of Appearance",
        points: [
          "Vast / Enormous / Sprawling — sangat luas",
          "Tiny / Compact / Cozy — kecil/nyaman",
          "Vibrant / Bustling / Lively — ramai/hidup",
          "Peaceful / Serene / Tranquil — tenang/damai",
          "Ancient / Historic / Well-preserved — kuno/bersejarah/terawat",
          "Modern / Contemporary / Sleek — modern/elegan",
          "Picturesque / Scenic / Breathtaking — indah/memukau",
          "Deserted / Abandoned / Remote — sepi/terpencil",
        ],
      },
      {
        title: "Expressing Feelings About Places",
        points: [
          "The place made me feel … (calm / excited / nostalgic / overwhelmed)",
          "I was struck by … / I was amazed by … / I was moved by …",
          "There was something magical about …",
          "I couldn't help but feel … when I saw …",
          "It took my breath away.",
          "I've never seen anything like it.",
          "It felt like stepping into another world.",
          "The atmosphere was electric / soothing / mysterious.",
        ],
      },
    ],
    exercises: [
      {
        id: "int-sp7-q1",
        type: "task",
        question:
          "Deskripsikan tempat favoritmu (kota, pantai, pegunungan, rumah nenek, dll) selama 2 menit. Gunakan: minimal 5 place vocabulary, 4 preposisi lokasi, dan 3 ekspresi perasaan.",
      },
      {
        id: "int-sp7-q2",
        type: "task",
        question:
          "Tanpa menyebut nama tempatnya, deskripsikan suatu tempat menggunakan clues (penampilan, lokasi, suasana). Teman menebak tempat apa yang kamu maksud.",
      },
      {
        id: "int-sp7-q3",
        type: "task",
        question:
          "Bayangkan kamu adalah tour guide. Deskripsikan Indonesia (atau kota asalmu) kepada turis asing. Jelaskan lokasinya, penampilan, hal-hal menarik, dan suasananya. Bicara 2 menit.",
      },
    ],
  },

  // ── Day 8: IELTS Speaking Part 2 — Cue Card ──────────────────────────────────
  {
    id: "int-speaking-8",
    track: "speaking",
    day: 8,
    tutor: "Ms. Aul",
    title: "IELTS Speaking Part 2 — Cue Card",
    subtitle:
      "Group 1: Describe a special cake · Group 2: Describe someone who gave you clothes",
    overview:
      "Latihan IELTS Speaking Part 2: siswa mendapat cue card dan harus berbicara selama 1–2 menit. Group 1 mendeskripsikan kue spesial yang pernah diterima, Group 2 mendeskripsikan seseorang yang pernah memberikan pakaian.",
    materialSections: [
      {
        title: "IELTS Speaking Part 2 — Format",
        points: [
          "Kamu diberi CUE CARD berisi topik + 3–4 poin panduan.",
          "⏱ Persiapan: 1 menit (boleh buat catatan singkat).",
          "🗣 Bicara: 1–2 menit TANPA henti.",
          "❓ Follow-up: examiner bertanya 1–2 pertanyaan singkat.",
          "─────────────────────────────",
          "✅ Tips struktur jawaban:",
          "   1. INTRO — sebutkan topik secara umum",
          "   2. WHEN / WHERE — konteks waktu & tempat",
          "   3. WHO — siapa yang terlibat",
          "   4. DETAIL — ceritakan pengalaman secara spesifik",
          "   5. WHY SPECIAL — jelaskan alasan mengapa berkesan",
        ],
      },
      {
        title: "Useful Language — Describing Past Experiences",
        points: [
          "Setting the scene:",
          '   "It happened about ___ years ago / on my ___ birthday."',
          '   "It was during ___ (occasion/event)."',
          "─────────────────────────────",
          "Describing the gift/giver:",
          '   "The ___ was decorated with / made of / designed to …"',
          '   "The person who gave it to me was my ___, who is …"',
          "─────────────────────────────",
          "Expressing feelings:",
          '   "I was absolutely thrilled / touched / overwhelmed."',
          '   "It meant a lot to me because …"',
          '   "I still remember it vividly because …"',
          "─────────────────────────────",
          "Explaining significance:",
          '   "What made it so special was …"',
          '   "It was unlike anything I had ever received before."',
          '   "It reminded me of / represented …"',
        ],
      },
      {
        title: "Vocabulary — Cake & Food Description",
        points: [
          "Appearance: layered, frosted, decorated, elaborately designed, topped with",
          "Flavour: rich, moist, creamy, velvety, indulgent, delicate",
          "Occasion: birthday, anniversary, graduation, celebration, surprise party",
          "Emotion: overwhelmed, touched, grateful, speechless, delighted",
          "Example sentence:",
          '   "It was a three-layered chocolate cake, beautifully frosted with cream',
          '   and decorated with my name written in gold icing."',
        ],
      },
      {
        title: "Vocabulary — Clothes & Fashion Description",
        points: [
          "Type: dress, jacket, hoodie, traditional outfit, formal wear, casual wear",
          "Appearance: elegant, stylish, colourful, patterned, embroidered, fitted",
          "Material: cotton, silk, linen, wool, synthetic, handmade",
          "Emotion: surprised, moved, appreciative, proud, sentimental",
          "Example sentence:",
          '   "She gave me a beautifully embroidered traditional dress that she had',
          '   handpicked especially for me."',
        ],
      },
    ],
    exercises: [
      {
        id: "int-sp8-q1",
        type: "task",
        question:
          "🎂 GROUP 1 — CUE CARD\n\nDescribe a special cake you received from others.\n\nYou should say:\n• When it happened\n• Where it happened\n• Who you got the cake from\n• And explain why it was a special cake\n\n(Preparation: 1 minute | Speaking: 1–2 minutes)",
      },
      {
        id: "int-sp8-q2",
        type: "task",
        question:
          "👗 GROUP 2 — CUE CARD\n\nDescribe someone who gave you clothes.\n\nYou should say:\n• Who this person is\n• What kind of clothes they gave you\n• When they gave you the clothes\n• And explain why you remember this experience\n\n(Preparation: 1 minute | Speaking: 1–2 minutes)",
      },
      {
        id: "int-sp8-q3",
        type: "task",
        question:
          "Follow-up Discussion (setelah presentasi):\n\n• Do you think receiving gifts is important in your culture? Why?\n• Is it better to give someone something practical or something meaningful?\n• How do you usually feel when someone gives you a gift?\n\nJawab setiap pertanyaan dalam 3–5 kalimat.",
      },
    ],
  },

  // ── Day 9: Describe Person ────────────────────────────────────────────────────
  {
    id: "int-speaking-9",
    track: "speaking",
    day: 9,
    tutor: "Ms. Aul",
    title: "Describe an Invention",
    subtitle: "Describing a useful invention in your daily life",
    overview:
      "Materi speaking tentang cara mendeskripsikan sebuah penemuan/alat yang berguna dalam kehidupan sehari-hari: apa itu, fungsinya, popularitasnya, kemudahan penggunaan, dan mengapa bermanfaat.",
    materialSections: [
      {
        title: "Topic Cues — What to Talk About",
        points: [
          "1️⃣ What is the invention?",
          "   → Name it and describe it briefly.",
          "─────────────────────────────",
          "2️⃣ What can it do?",
          "   → Explain its main functions and features.",
          "─────────────────────────────",
          "3️⃣ How popular is it?",
          "   → Talk about how widely used it is (globally / locally).",
          "─────────────────────────────",
          "4️⃣ Whether it is difficult or easy to use",
          "   → Describe the user experience.",
          "─────────────────────────────",
          "5️⃣ Explain why it is useful",
          "   → Give specific reasons and personal examples.",
        ],
      },
      {
        title: "Useful Vocabulary",
        points: [
          "invention (n) — penemuan | innovation (n) — inovasi",
          "device (n) — perangkat | gadget (n) — alat canggih",
          "function (n/v) — fungsi / berfungsi | feature (n) — fitur",
          "convenient (adj) — praktis | efficient (adj) — efisien",
          "user-friendly (adj) — mudah digunakan | complex (adj) — rumit",
          "widely used — digunakan secara luas | essential — sangat penting",
          "transform (v) — mengubah | simplify (v) — menyederhanakan",
          "rely on — bergantung pada | improve (v) — meningkatkan",
        ],
      },
      {
        title: "Useful Expressions",
        points: [
          "Introducing: \"The invention I'd like to talk about is ...\"",
          "Introducing: \"I'm going to describe ... which I use every day.\"",
          "─────────────────────────────",
          "Function: \"It can be used to ...\" / \"It allows you to ...\"",
          "Function: \"One of its main features is that it ...\"",
          "─────────────────────────────",
          "Popularity: \"It is widely used by millions of people around the world.\"",
          "Popularity: \"Almost everyone nowadays has / uses ...\"",
          "─────────────────────────────",
          "Ease of use: \"It is very easy to use because ...\"",
          "Ease of use: \"Even beginners can operate it without any difficulty.\"",
          "Ease of use: \"It might seem complicated at first, but once you learn it ...\"",
          "─────────────────────────────",
          "Why useful: \"I find it extremely useful because ...\"",
          "Why useful: \"Without it, I would struggle to ...\"",
          "Why useful: \"It has completely changed the way I ...\"",
        ],
      },
      {
        title: "Sample Structure (Smartphone)",
        points: [
          "1️⃣ What: \"The invention I want to describe is the smartphone.\"",
          "2️⃣ Function: \"It can do almost everything — call, text, browse the internet, take photos, and even work as a GPS.\"",
          "3️⃣ Popularity: \"Smartphones are used by billions of people worldwide. In Indonesia alone, most people own at least one.\"",
          "4️⃣ Ease of use: \"Smartphones are very user-friendly. The touchscreen makes it easy for anyone to navigate, even children.\"",
          "5️⃣ Why useful: \"I find it incredibly useful because it keeps me connected, helps me study, and organises my daily schedule. Without it, my life would be much harder.\"",
        ],
      },
    ],
    exercises: [
      {
        id: "int-sp9-q1",
        type: "task",
        question:
          "Pilih satu penemuan yang kamu gunakan sehari-hari (smartphone, laptop, motor listrik, mesin cuci, dsb). Deskripsikan menggunakan 5 cues: (1) What is it? (2) What can it do? (3) How popular is it? (4) Is it easy or difficult to use? (5) Why is it useful? Bicara minimal 2 menit.",
      },
      {
        id: "int-sp9-q2",
        type: "task",
        question:
          "Bayangkan kamu mendeskripsikan sebuah penemuan kepada seseorang yang tidak pernah melihatnya. Tanpa menyebut namanya, jelaskan fungsi, cara pakai, dan manfaatnya. Teman sekelas menebak penemuan apa itu.",
      },
      {
        id: "int-sp9-q3",
        type: "task",
        question:
          "Bandingkan dua penemuan: mana yang lebih berguna dalam hidupmu dan mengapa? Gunakan ekspresi perbandingan: 'more useful than', 'easier to use than', 'more widely used than'. Bicara 2 menit.",
      },
    ],
  },

  // ── Day 11: The Presentation ──────────────────────────────────────────────────
  {
    id: "int-speaking-11",
    track: "speaking",
    day: 11,
    tutor: "Ms. Aul",
    title: "The Presentation",
    subtitle: "How to structure and deliver an effective presentation",
    overview:
      "Materi speaking tentang cara menyusun dan menyampaikan presentasi yang efektif dalam bahasa Inggris, mencakup tiga bagian utama: Introduction, Body, dan Conclusion, beserta cara menangani pertanyaan dari audiens.",
    materialSections: [
      {
        title: "Struktur Presentasi (3 Bagian Utama)",
        points: [
          "Golden Rule of Repetition:",
          "1. Say what you are going to say… (Introduction)",
          "2. Say it… (Body)",
          "3. Then say what you have just said. (Conclusion)",
          "─────────────────────────────",
          "Struktur: INTRODUCTION → BODY → CONCLUSION → (Questions)",
        ],
      },
      {
        title: "1. Introduction — Fungsi & Contoh Bahasa",
        points: [
          "① Welcome your audience:",
          '   "Good morning, ladies and gentlemen."',
          '   "Good afternoon, everybody."',
          "② Introduce your subject:",
          '   "I am going to talk today about..."',
          '   "The purpose of my presentation is to introduce our new range of..."',
          "③ Outline the structure:",
          '   "To start with I\'ll describe... Then I\'ll mention... After that I\'ll consider... Finally, I\'ll summarize..."',
          "④ Give instructions about questions:",
          '   "Do feel free to interrupt me if you have any questions."',
          '   "I\'ll try to answer all of your questions after the presentation."',
        ],
      },
      {
        title: "2. Body — Tips Menyampaikan Isi Presentasi",
        points: [
          "✔ Do not hurry — jangan terburu-buru",
          "✔ Be enthusiastic — tunjukkan antusias",
          "✔ Give time on visuals — beri waktu untuk visual",
          "✔ Maintain eye contact — jaga kontak mata dengan audiens",
          "✔ Modulate your voice — variasikan nada suara",
          "✔ Look friendly — tampil ramah dan terbuka",
          "✔ Keep to your structure — ikuti struktur yang sudah direncanakan",
          "✔ Use your notes — gunakan catatan sebagai panduan",
          "✔ Signpost throughout — gunakan penanda arah (first, next, finally)",
          "✔ Remain polite when dealing with difficult questions",
        ],
      },
      {
        title: "3. Conclusion — Fungsi & Contoh Bahasa",
        points: [
          "① Sum up (Merangkum):",
          '   "To conclude,..." / "In conclusion,..." / "Now, to sum up..."',
          '   "So let me summarize/recap what I\'ve said."',
          "② Give recommendations (jika perlu):",
          '   "In conclusion, my recommendations are..."',
          '   "I therefore suggest/propose/recommend the following strategy."',
          "③ Thank your audience:",
          '   "Many thanks for your attention."',
          '   "May I thank you all for being such an attentive audience."',
          "④ Invite questions:",
          '   "Now I\'ll try to answer any questions you may have."',
          '   "Are there any questions?" / "Do you have any questions?"',
        ],
      },
      {
        title: "4. Handling Questions",
        points: [
          "• Try to predict questions in advance so you can prepare responses.",
          "• Be polite with ALL questioners, even if they ask difficult questions.",
          "• You can reformulate a question before answering it.",
          "• You can answer a question with another question.",
          "• You can ask for comments from the rest of the audience.",
          '   Tip: "That\'s a great question. Let me clarify..."',
          '   Tip: "I\'m glad you asked that. In my view..."',
        ],
      },
    ],
    exercises: [
      {
        id: "int-sp11-q1",
        type: "task",
        question:
          "Pilih satu topik yang kamu kuasai (contoh: manfaat olahraga, teknologi di pendidikan, pentingnya membaca). Tulis outline presentasi: Introduction (salam + topik + struktur + aturan Q&A), Body (3 poin utama), Conclusion (rangkuman + rekomendasi + terima kasih). Gunakan template bahasa dari materi.",
      },
      {
        id: "int-sp11-q2",
        type: "task",
        question:
          "Sampaikan presentasi kamu selama 3–5 menit kepada partner atau tutor. Fokus pada: kontak mata, tidak terburu-buru, menggunakan signpost words (first, then, finally), dan menutup dengan mengundang pertanyaan.",
      },
      {
        id: "int-sp11-q3",
        type: "task",
        question:
          "Partner activity: setelah presentasi selesai, audiens mengajukan 2–3 pertanyaan kepada presenter. Presenter harus menjawab dengan sopan dan percaya diri. Gunakan kalimat: 'That's a great question...', 'I'm glad you asked that...', atau 'Let me clarify...'",
      },
    ],
  },

  // ── Day 12: Product Promotion ─────────────────────────────────────────────────
  {
    id: "int-speaking-12",
    track: "speaking",
    day: 12,
    tutor: "Ms. Aul",
    title: "Product Promotion",
    subtitle: "How to persuade customers and negotiate price in English",
    overview:
      "Materi speaking tentang cara mempromosikan produk dalam bahasa Inggris: teknik persuasi pelanggan, negosiasi harga, kosakata penjualan, dan tiga tahap presentasi produk.",
    materialSections: [
      {
        title: "1. How to Persuade a Customer",
        points: [
          "a) Know Your Own Benefits",
          "   → Kamu sulit meyakinkan orang untuk membeli jika kamu tidak tahu manfaat produkmu.",
          "b) Use Positive Language",
          "   → Pelanggan selalu mengingat MANFAAT lebih lama dari pada FITUR produk.",
          "c) Emphasize What's Important",
          "   → Jika ada manfaat spesifik yang kamu banggakan, pastikan kamu membicarakannya.",
          "d) Set the Benefits in Stone",
          "   → Pelanggan mengabaikan manfaat yang samar. Jadilah konkret dan meyakinkan.",
        ],
      },
      {
        title: "Vocabularies & Phrases for Sellers",
        points: [
          "Vocabulary: Time is Running Out | Unbelievable Discounts | Special Offer",
          "Vocabulary: Free shipping | Free gift with purchase | Free trial",
          "Vocabulary: Best value | Money back guarantee | Lowest price | Easy on your wallet!",
          "─────────────────────────────",
          "Phrases: \"I am afraid that we can't match that price.\"",
          "Phrases: \"I don't think that we could go that far.\"",
          "Phrases: \"Let's meet in the middle.\"",
          "Phrases: \"I think we can do that.\"",
          "Phrases: \"Ok, let's shake on it.\" (seal the bargain with a handshake)",
        ],
      },
      {
        title: "Questions & Phrases for Buyers",
        points: [
          "Questions: How much? | What's your best price?",
          "Questions: Do you have any flexibility on the price?",
          "Questions: How much will you reduce the price if I pay cash?",
          "Questions: What are the specifications/features of the product?",
          "─────────────────────────────",
          "Phrases: \"That's too expensive.\"",
          "Phrases: \"I'm sorry but you'll have to do better than that.\"",
          "Phrases: \"I'm on a tight budget so I'm looking for your best price.\"",
          "Phrases: \"I don't have a lot of wriggle room.\" (= saya tidak bisa menambah budget banyak)",
        ],
      },
      {
        title: "3 Tahap Presentasi Produk",
        points: [
          "TAHAP 1 — Introduce Your Product (Function & Benefit):",
          '   "This is our newest product."',
          '   "This particular model is… It is made of… This is equipped with…"',
          '   "It can be used for… It contains…"',
          "─────────────────────────────",
          "TAHAP 2 — Offering a Special Price:",
          "   Buy One Get One Free | Unbelievable Discounts | Special Offer",
          "   Free shipping | Free trial | Best value | Lowest price",
          "─────────────────────────────",
          "TAHAP 3 — Closing (Emphasize Your Statement):",
          '   "You\'d Be Crazy to Miss This!" | "Don\'t Delay!" | "Time is Running Out!"',
        ],
      },
    ],
    exercises: [
      {
        id: "int-sp12-q1",
        type: "task",
        question:
          "Pilih satu produk (bisa nyata atau imajinasi). Lakukan presentasi produk menggunakan 3 tahap: (1) Perkenalkan produk + fungsi + manfaat, (2) Tawarkan harga spesial, (3) Tutup dengan kalimat persuasif. Gunakan minimal 3 vocabulary dan 2 phrases dari daftar. Durasi: 2–3 menit.",
      },
      {
        id: "int-sp12-q2",
        type: "task",
        question:
          "Role play negosiasi harga: satu orang jadi SELLER, satu orang jadi BUYER. Buyer mencoba menawar harga menggunakan questions dan phrases dari daftar. Seller merespons dengan sopan dan meyakinkan. Lakukan selama 5 menit, lalu bergantian peran.",
      },
      {
        id: "int-sp12-q3",
        type: "task",
        question:
          "Group activity: dalam kelompok 3–4 orang, buat simulasi pameran produk (mini expo). Setiap orang membawa satu produk (nyata atau karangan), mempresentasikannya, dan menjawab pertanyaan dari 'calon pembeli'. Gunakan bahasa Inggris sepanjang sesi.",
      },
    ],
  },

  // ── Day 13: The Tutorial / How to Make Something ──────────────────────────────
  {
    id: "int-speaking-13",
    track: "speaking",
    day: 13,
    tutor: "Ms. Aul",
    title: "The Tutorial",
    subtitle: "How to explain step-by-step instructions using sequence words",
    overview:
      "Materi speaking tentang cara menjelaskan tutorial atau langkah-langkah membuat sesuatu dalam bahasa Inggris. Meliputi sequence words (Beginning, Middle, Ending) dan contoh aplikasinya dalam berbagai topik.",
    materialSections: [
      {
        title: "Warming Up Questions",
        points: [
          "• Can you explain what a tutorial is? What kind of tutorial do you like to watch/do? Why?",
          "• Would you like to explain how to make something?",
          "• What beverage or food do you like?",
          "• Are you good at cooking?",
          "• Do you like to learn something new?",
          "• Would you like to be a YouTuber?",
        ],
      },
      {
        title: "Useful Sequence Words & Phrases",
        points: [
          "a) BEGINNING (awal langkah):",
          "   In the beginning | First of all | First | Firstly | To begin | To start",
          "─────────────────────────────",
          "b) MIDDLE (langkah-langkah tengah):",
          "   Meanwhile | Then | After that | Later | Next | Second | Third",
          "   Secondly | Thirdly | Furthermore | Moreover | In addition | Also | After | Before",
          "─────────────────────────────",
          "c) ENDING (langkah terakhir/penutup):",
          "   Finally | At last | At the end | Afterward | In the end | Lastly | After all | Eventually",
        ],
      },
      {
        title: "Example: How to Make Scrambled Eggs",
        points: [
          "Ingredients: 2 eggs | Milk (if desired) | 1 teaspoon of butter | A pinch of salt and pepper",
          "─────────────────────────────",
          "First, crack the eggs into a small bowl, add salt and pepper, then whisk until well blended.",
          "In a frying pan, add butter and let it melt.",
          "Next, pour the eggs and milk, and for around 20 seconds, do not stir it.",
          "After that, fold the eggs to the center and stir with a spatula. Repeat until mostly cooked.",
          "Moreover, remove eggs from heat and keep folding and stirring for around a minute.",
          "Finally, lift the eggs, put them on the serving plate — your scrambled eggs are ready to serve!",
        ],
      },
      {
        title: "Example: How to Insert a SIM Card",
        points: [
          "First of all, press the locking catch and slide the cover, then lift it off the phone.",
          "After that, push two catches in opposite directions and remove the battery.",
          "Next, slide the SIM card carefully into the slot — make sure the golden connectors face the phone connector.",
          "Then, put the battery back and align it until it snaps into place.",
          "Finally, insert the back cover, slide it forward until it locks. Switch on the phone and wait until ready.",
        ],
      },
    ],
    exercises: [
      {
        id: "int-sp13-q1",
        type: "task",
        question:
          "Pilih satu tutorial yang kamu kuasai (cara membuat makanan/minuman, cara menggunakan aplikasi, cara membuat kerajinan tangan, dll). Jelaskan langkah-langkahnya dalam bahasa Inggris menggunakan sequence words dari daftar (Beginning, Middle, Ending). Minimal 5 langkah, durasi 2–3 menit.",
      },
      {
        id: "int-sp13-q2",
        type: "task",
        question:
          "Demonstrasi langsung: sambil menjelaskan langkah-langkahnya dalam bahasa Inggris, lakukan atau tunjukkan prosesnya secara fisik (contoh: jelaskan sambil membuat minuman, atau tunjukkan cara merapikan buku dengan urutan tertentu). Gunakan minimal 8 sequence words.",
      },
      {
        id: "int-sp13-q3",
        type: "task",
        question:
          "Partner activity: Dengarkan tutorial dari temanmu, lalu coba ulangi langkah-langkahnya kembali dengan kalimatmu sendiri. Periksa apakah urutannya benar. Diskusikan sequence words apa yang dipakai dan apakah bisa diganti dengan yang lain.",
      },
    ],
  },

  // ── Day 14: Talk Show ─────────────────────────────────────────────────────────
  {
    id: "int-speaking-14",
    track: "speaking",
    day: 14,
    tutor: "Ms. Aul",
    title: "Talk Show",
    subtitle: "How to host, guest, and participate in a talk show in English",
    overview:
      "Materi speaking tentang talk show: definisi, jenis-jenis, peran (host, guest, audience), frasa-frasa penting, dan cara mempraktikkan talk show dalam kelompok.",
    materialSections: [
      {
        title: "Warming Up Questions",
        points: [
          "• Do you often watch a talk show?",
          "• What is your favorite talk show? Why?",
          "• Do you like comedic or political talk shows? Why?",
          "• What are the advantages and disadvantages of talk shows?",
        ],
      },
      {
        title: "What is a Talk Show & Its Types",
        points: [
          "DEFINITION: A radio or television programme on which famous guests are asked questions about themselves, or members of the public discuss a particular subject.",
          "─────────────────────────────",
          "TYPES OF TALK SHOW:",
          "A. Interview Talk Shows — host interviews a celebrity/expert",
          "B. Political Talk Shows — discuss political issues and policies",
          "C. Issue-Based Talk Shows — explore social or current issues",
          "D. Comedic Talk Shows — entertainment-focused, humorous format",
          "E. Round Table / Panel Discussion — multiple guests debate a topic",
        ],
      },
      {
        title: "The Roles in a Talk Show",
        points: [
          "A. HOST — main presenter; interviews guests; provides stable, identifiable figure for audience",
          "   → conducts the interview, manages time, summarizes key points",
          "B. GUEST — person invited to take part: celebrity, politician, expert, etc.",
          "   → shares opinions, experiences, or expertise on the topic",
          "C. AUDIENCE — watches/observes and interacts",
          "   → cheers, applauds, may ask questions at the end",
        ],
      },
      {
        title: "Key Phrases for Talk Show",
        points: [
          "OPENING:",
          '   "Welcome to [Show Name], the show designed to inspire and educate."',
          '   "Good [morning/afternoon/evening], and thank you for joining us on [Show Name]."',
          "INTRODUCING TOPIC/GUESTS:",
          '   "Today, we have a special episode focusing on..."',
          '   "Joining us in the studio, we have... who will share their insights on..."',
          "ASKING QUESTIONS:",
          '   "Let\'s start by exploring..." | "What are your thoughts on...?"',
          '   "Guest A, what do you think about this?" | "Would you like to add anything?"',
          "SUMMARIZING:",
          '   "So, if I\'m hearing you correctly, the key takeaway is..."',
          '   "To recap, we\'ve discussed the importance of..."',
          "CLOSING:",
          '   "That concludes today\'s episode of [Show Name]. We hope you found it insightful."',
          '   "Thank you to our guests for sharing their expertise, and thank you for tuning in."',
        ],
      },
    ],
    exercises: [
      {
        id: "int-sp14-q1",
        type: "task",
        question:
          "Dalam kelompok 3–5 orang, buat talk show dengan menentukan: (1) Jenis talk show, (2) Topik yang menarik, (3) Pembagian peran: Host dan Guest(s). Tulis outline singkat: Opening, Interview Session, Closing. Durasi: 10–15 menit.",
      },
      {
        id: "int-sp14-q2",
        type: "task",
        question:
          "Tampilkan talk show kelompokmu di depan kelas. Kelompok lain berperan sebagai audience — berikan dukungan dan ajukan pertanyaan kepada guest di akhir sesi. Gunakan frasa-frasa dari materi (opening, asking questions, summarizing, closing).",
      },
      {
        id: "int-sp14-q3",
        type: "task",
        question:
          "Setelah semua kelompok tampil, diskusikan: (1) Talk show mana yang paling menarik dan mengapa? (2) Apa teknik komunikasi host yang paling efektif? (3) Bagaimana cara guest menjawab pertanyaan sulit dengan sopan? Bagikan pendapatmu dalam 3–5 kalimat.",
      },
    ],
  },

  // ── Day 15: News Anchor ───────────────────────────────────────────────────────
  {
    id: "int-speaking-15",
    track: "speaking",
    day: 15,
    tutor: "Ms. Aul",
    title: "News Anchor",
    subtitle: "How to read and speak like a professional news anchor",
    overview:
      "Materi speaking tentang cara membaca dan berbicara seperti news anchor profesional: teknik vokal, enunciation, pace, dan frasa pembuka/penutup berita dalam bahasa Inggris.",
    materialSections: [
      {
        title: "What is a News Anchor?",
        points: [
          "NEWS ANCHOR: Someone who presents the news on local or network television stations, usually on-camera behind a desk.",
          "→ Presents breaking news stories and current event information to the public.",
          "─────────────────────────────",
          "ANCHOR vs REPORTER:",
          "• Reporter: gathers news from the field, investigates events on location.",
          "• Anchor (= anchorman/anchorwoman/news presenter/newsreader): sits in front of camera, delivers the news.",
          "→ Anchors often read from a teleprompter but must also respond to breaking news fed by their team.",
        ],
      },
      {
        title: "How to Read & Speak Like a News Anchor (7 Tips)",
        points: [
          "a) Do verbal exercises to warm up your voice",
          "   → Shake tension, roll neck, scrunch face, yawn widely, draw out vowel sounds.",
          "   → Breathe slowly: in through nose, out through mouth.",
          "b) Enunciate each word carefully",
          "   → Pronounce each word fully. Don't drop endings (say 'fishing' not 'fishin').",
          "c) Slow down your pace",
          "   → Target: 150–170 words per minute. Much slower than everyday speech.",
          "d) Use a neutral accent",
          "   → Most networks prefer newscasters with a neutral, clear accent.",
          "e) Try for an energetic tone",
          "   → Sound upbeat but not hyper. Pretend you're telling the news to a friend.",
          "f) Avoid slang and colloquialisms",
          "   → Stick with the written script. Sound more formal than in everyday conversation.",
          "g) Stay away from filler words",
          '   → Avoid "um," "like," "uh." Take a pause instead of using fillers.',
        ],
      },
      {
        title: "Opening Lines (Contoh)",
        points: [
          '1. "Hello, and good morning. The truth is our priority, we give justice to your curiosity. Latest news spotted only here on ____ News."',
          '2. "Good afternoon Indonesia, it\'s [Day], [Date]. You are watching the news. This is the national communication network bringing you the top stories with no bias."',
          '3. "Good morning from the studio newsroom at ____ News headquarters here in Jakarta. Good to be with you. I am ____."',
          '4. "Good morning/afternoon/evening, happy [Day], and thanks for joining us today. I am ____ here with ____."',
        ],
      },
      {
        title: "Closing Lines & Script Examples",
        points: [
          'CLOSING 1: "That was the news of truth and accuracy. We are hoping everyone is in good condition. This is ____ News."',
          'CLOSING 2: "Those were the top stories for this hour. You can contact us through these numbers on your screen. Good day."',
          'CLOSING 3: "You have just heard the latest news around the globe. News with no bias, news with no exception. This has been ____ and ____ bringing you the latest news. Thank you for being with us."',
          "─────────────────────────────",
          "SCRIPT EXAMPLE — Weather Report:",
          '"Welcome to the weather forecast. In the north, it\'s very windy and cold. There is a chance of some rain — don\'t leave home without your umbrella! The temperature is around 10°C."',
          '"In the west, the weather is dry but cloudy. No rain, but quite windy, temperature just 10°C. The south has the best weather today — cloudy but sunny this afternoon, around 15°C."',
        ],
      },
    ],
    exercises: [
      {
        id: "int-sp15-q1",
        type: "task",
        question:
          "Latihan vokal sebelum membaca berita: (1) Lakukan 5 menit warm-up voice: tarik napas perlahan, ucapkan setiap huruf vokal (a, e, i, o, u) dengan memanjangkan suaranya. (2) Baca teks berikut dengan pace 150–170 kata/menit, enunciate setiap kata, hindari filler words:\n\n\"Good morning. A local teenager who went missing last Tuesday has been found safe. Jessie, fourteen, disappeared after school last week. Witnesses are being questioned. The investigation is still ongoing.\"\n\nRekam dan dengarkan kembali rekaman suaramu.",
      },
      {
        id: "int-sp15-q2",
        type: "task",
        question:
          "Tulis dan sampaikan berita pendek (news report) sendiri dalam bahasa Inggris. Struktur: (1) Opening line (pilih dari template), (2) News report (3–5 kalimat tentang satu topik bebas: cuaca, acara sekolah, berita lokal karangan), (3) Closing line. Durasi: 1–2 menit. Gunakan tone energetik, kontak mata, dan hindari filler words.",
      },
      {
        id: "int-sp15-q3",
        type: "task",
        question:
          "Pair activity: buat siaran berita berdua (2 anchor). Bagi teks menjadi dua bagian — anchor 1 membaca opening + berita 1, anchor 2 membaca berita 2 + closing. Latih transisi antar anchor dengan natural: 'And now, over to my co-anchor...' / 'Thank you, ____. In other news...'",
      },
    ],
  },

  // ── Day 16: Drama ─────────────────────────────────────────────────────────────
  {
    id: "int-speaking-16",
    track: "speaking",
    day: 16,
    tutor: "Ms. Aul",
    title: "Drama",
    subtitle: "Expression, body language, voice techniques, and character types",
    overview:
      "Materi speaking tentang drama: cara mengekspresikan diri melalui bahasa tubuh, gerakan tangan, dan ekspresi wajah; teknik penggunaan suara; serta jenis-jenis karakter dalam cerita (protagonist, antagonist, dll).",
    materialSections: [
      {
        title: "A. Expression — Method 1: Communicating",
        points: [
          "Most of our communication has very little to do with words — much more to do with BODY LANGUAGE and the WAY we say things.",
          "─────────────────────────────",
          "1. Use hand gestures",
          "   → Menggunakan gestur tangan membuat orang lebih mau mendengarkan kamu.",
          "   → Keep gestures 'inside the box': area antara dada atas dan pinggang bawah.",
          "   → Jangan terlalu besar — akan jadi distracting.",
          "2. Use your face to convey emotion",
          "   → Arching an eyebrow: terkejut atau skeptis",
          "   → Frown: tidak setuju atau khawatir",
          "   → Grimace: takut, khawatir, atau kesakitan",
          "3. Be aware of your body language",
          "   → 'Power pose': berdiri dengan kaki agak terbuka, dagu sedikit naik.",
          "   → Duduk: bersandar sedikit ke belakang, tangan di belakang kepala = terlihat percaya diri.",
        ],
      },
      {
        title: "A. Expression — Method 2: Using Your Voice",
        points: [
          "1. Vary the volume",
          "   → Jangan monoton. Mulai pelan, naikkan volume saat mencapai klimaks cerita.",
          "   → Selalu cukup keras agar semua pendengar bisa mendengar.",
          "2. Vary the pitch",
          "   → Menaikkan pitch: suara lebih tinggi (cocok untuk pertanyaan).",
          "   → Menurunkan pitch: suara lebih dalam (cocok untuk pernyataan positif/setuju).",
          "3. Use pauses",
          "   → Jeda menciptakan dramatisasi dan membuat kamu terlihat lebih percaya diri.",
          "   → Jeda juga memberi waktu bagi pendengar untuk menyerap apa yang kamu katakan.",
          "4. Practice speaking",
          "   → Latihan pidato sendiri di depan cermin.",
          "   → Ikuti kelas public speaking atau latihan dengan teman/guru yang dipercaya.",
        ],
      },
      {
        title: "B. Types of Characters (Jenis-Jenis Karakter)",
        points: [
          "1. PROTAGONIST — karakter utama; pusat cerita; yang paling kita pedulikan.",
          "   Contoh: Harry Potter, Katniss Everdeen, Frodo Baggins, Indiana Jones",
          "2. ANTAGONIST — menentang/menghalangi protagonist; sering beroperasi secara rahasia.",
          "   Contoh: Voldemort, Sauron, Maleficent, Regina George",
          "3. DEUTERAGONIST — karakter sekunder; dekat dengan protagonist; seperti sidekick.",
          "   Contoh: Ron & Hermione, Samwise Gamgee, Dr. Watson",
          "4. TERTIARY — karakter minor; hanya muncul 1–2 scene; tidak terlalu penting.",
          "   Contoh: Radagast (Lord of the Rings), Padma & Parvati Patil (Harry Potter)",
          "5. LOVE INTEREST — karakter yang menjadi objek romantis protagonist.",
          "   Contoh: Mr. Darcy, Romeo/Juliet, Edward Cullen",
          "6. CONFIDANT — orang yang dipercaya protagonist untuk berbagi perasaan/pikiran.",
          "   Contoh: Horatio, Friar Laurence, Alfred Pennyworth",
          "7. FOIL — karakter yang kepribadiannya bertentangan dengan protagonist; menyoroti sifat MC.",
          "   Contoh: Draco Malfoy, Effie Trinket, Lydia Bennet",
        ],
      },
      {
        title: "C. Drama Assessment Rubric",
        points: [
          "Kriteria penilaian dalam penampilan drama:",
          "1. Grabbed attention — berhasil menarik perhatian audiens dari awal",
          "2. Easy to understand — penyampaian jelas dan mudah dipahami",
          "3. Body language — penggunaan bahasa tubuh yang tepat dan natural",
          "4. Eye contact — menjaga kontak mata dengan audiens",
          "5. Gestures — penggunaan gerakan tangan yang efektif",
          "6. Blocking — posisi tubuh dan pergerakan di atas panggung/area",
          "7. Vocal quality — kualitas suara: volume, pitch, pace",
          "8. Confident — tampil percaya diri dan tidak ragu",
          "9. Pronunciation — pengucapan kata yang jelas dan benar",
          "10. Entertaining — penampilan menarik dan menghibur audiens",
        ],
      },
    ],
    exercises: [
      {
        id: "int-sp16-q1",
        type: "task",
        question:
          "Latihan ekspresi wajah & bahasa tubuh: berdiri di depan cermin dan praktikkan: (1) Terkejut — arching an eyebrow, (2) Tidak setuju — frown, (3) Takut — grimace, (4) Percaya diri — power pose. Lakukan masing-masing 3x. Lalu ceritakan sebuah pengalaman pendek (1–2 menit) sambil menggunakan minimal 3 ekspresi wajah dan gestur tangan yang sesuai.",
      },
      {
        id: "int-sp16-q2",
        type: "task",
        question:
          "Latihan suara: baca paragraf berikut 3x dengan teknik yang berbeda:\n(1) Variasi volume: mulai pelan, naikkan di tengah, turun di akhir.\n(2) Variasi pitch: naikkan pitch untuk pertanyaan, turunkan untuk pernyataan.\n(3) Gunakan jeda dramatis sebelum kata-kata penting.\n\nParagraf: 'The door creaked open. She stepped inside, heart pounding. Something was different. The room was empty — but the window... the window was open.'",
      },
      {
        id: "int-sp16-q3",
        type: "task",
        question:
          "Drama role play: dalam kelompok 3–5 orang, pilih scene pendek dari film/buku yang kamu kenal atau buat skenario sendiri. Tentukan karakter masing-masing (protagonist, antagonist, deuteragonist, dll). Tampilkan scene selama 5–10 menit. Kelompok lain menilai menggunakan 10 kriteria dari assessment rubric (grabbed attention, body language, eye contact, vocal quality, dll).",
      },
    ],
  },
];

export { intermediateSpeakingLessons };
