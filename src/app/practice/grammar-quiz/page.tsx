'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Trophy, RotateCcw, CheckCircle2, XCircle, Lightbulb, ChevronDown, ChevronUp, Shuffle, Box, Zap, Palette, Wind, User, MapPin, Link2, FileText } from 'lucide-react';
import { shuffleArray, cn } from '@/lib/utils';
import { useVocabStore } from '@/store/useVocabStore';

// ════════════════════════════════════════════════════════════════
//  25 Grammar Quiz Questions — All 8 Parts of Speech + Mixed
// ════════════════════════════════════════════════════════════════

interface GrammarQuestion {
  id: string;
  topic: string; // e.g. "Nouns", "Verbs", "Mixed"
  question: string;
  options: [string, string, string, string]; // A B C D
  correctIndex: number; // 0-3
  reason: string; // Indonesian explanation
}

const allQuestions: GrammarQuestion[] = [
  // ══════════════════════════════════════════
  //  NOUNS (15 questions)
  // ══════════════════════════════════════════
  { id: 'n1', topic: 'Nouns', question: 'Which one is an UNCOUNTABLE noun?', options: ['Apple', 'Chair', 'Information', 'Student'], correctIndex: 2, reason: '"Information" tidak bisa dihitung — tidak bilang "two informations". Apple, Chair, Student bisa dihitung.' },
  { id: 'n2', topic: 'Nouns', question: 'What is the correct plural of "child"?', options: ['Childs', 'Childes', 'Children', 'Childrens'], correctIndex: 2, reason: '"Child" irregular noun → "children". Contoh lain: man → men, woman → women, tooth → teeth.' },
  { id: 'n3', topic: 'Nouns', question: '"Happiness" is a ___ noun.', options: ['Concrete', 'Collective', 'Proper', 'Abstract'], correctIndex: 3, reason: '"Happiness" abstract noun — tidak bisa dilihat/disentuh, hanya dirasakan. Contoh lain: love, freedom, anger.' },
  { id: 'n4', topic: 'Nouns', question: 'Which is a PROPER noun?', options: ['city', 'dog', 'Jakarta', 'school'], correctIndex: 2, reason: 'Proper noun = nama spesifik, huruf kapital. "Jakarta" nama kota. "city/dog/school" = common noun (umum).' },
  { id: 'n5', topic: 'Nouns', question: 'What is the plural of "knife"?', options: ['Knifes', 'Knifes', 'Knives', 'Knivees'], correctIndex: 2, reason: 'Kata yang berakhir -fe/-f → ubah jadi -ves. knife → knives, wife → wives, life → lives, leaf → leaves.' },
  { id: 'n6', topic: 'Nouns', question: '"A flock of birds" — "flock" is a ___ noun.', options: ['Abstract', 'Proper', 'Collective', 'Countable'], correctIndex: 2, reason: '"Flock" = collective noun (kata benda kelompok). Contoh lain: a team of players, a pack of wolves, a bunch of flowers.' },
  { id: 'n7', topic: 'Nouns', question: 'Which is UNCOUNTABLE?', options: ['Book', 'Water', 'Pen', 'Bottle'], correctIndex: 1, reason: '"Water" uncountable — tidak bilang "two waters". Pakai "a glass of water". Book, Pen, Bottle = countable.' },
  { id: 'n8', topic: 'Nouns', question: 'What is the plural of "mouse"?', options: ['Mouses', 'Mousies', 'Mice', 'Mices'], correctIndex: 2, reason: '"Mouse" irregular → "mice". Tidak pakai -s/-es. Contoh: goose → geese, foot → feet, ox → oxen.' },
  { id: 'n9', topic: 'Nouns', question: '"The table is made of wood." — "table" is a ___ noun.', options: ['Abstract', 'Concrete', 'Proper', 'Collective'], correctIndex: 1, reason: '"Table" = concrete noun — bisa dilihat, disentuh, diraba. Kebalikan dari abstract noun.' },
  { id: 'n10', topic: 'Nouns', question: 'Which word is a COMPOUND noun?', options: ['Beautiful', 'Quickly', 'Toothpaste', 'Running'], correctIndex: 2, reason: '"Toothpaste" = compound noun (gabungan 2 kata: tooth + paste). Contoh lain: basketball, bedroom, sunflower.' },
  { id: 'n11q', topic: 'Nouns', question: '"___ is the best policy." Choose the correct noun:', options: ['Honest', 'Honestly', 'Honesty', 'Honesting'], correctIndex: 2, reason: '"Honesty" = abstract noun (kejujuran). "Honest" = adjective, "Honestly" = adverb. Butuh noun sebagai subjek.' },
  { id: 'n12q', topic: 'Nouns', question: 'What is the plural of "person"?', options: ['Persons', 'Peoples', 'People', 'Persones'], correctIndex: 2, reason: '"Person" → "people" (irregular). "Persons" kadang dipakai di konteks hukum tapi "people" lebih umum.' },
  { id: 'n13', topic: 'Nouns', question: 'Which is NOT uncountable?', options: ['Rice', 'Furniture', 'Luggage', 'Coin'], correctIndex: 3, reason: '"Coin" bisa dihitung (one coin, two coins). Rice, Furniture, Luggage = uncountable — tidak pakai -s.' },
  { id: 'n14', topic: 'Nouns', question: '"She has a lot of ___." (advice)', options: ['advices', 'advice', 'advise', 'advicees'], correctIndex: 1, reason: '"Advice" = uncountable noun, tidak ada bentuk plural. "Advise" = verb (menyarankan). Pakai "a lot of advice".' },
  { id: 'n15', topic: 'Nouns', question: 'What is the plural of "fish"?', options: ['Fishes', 'Fish', 'Fishs', 'Fishies'], correctIndex: 1, reason: '"Fish" tetap "fish" untuk plural (1 fish, 5 fish). "Fishes" hanya dipakai kalau bicara tentang jenis/spesies berbeda.' },

  // ══════════════════════════════════════════
  //  VERBS (15 questions)
  // ══════════════════════════════════════════
  { id: 'v1', topic: 'Verbs', question: 'Which is the past tense (V2) of "go"?', options: ['Goed', 'Goes', 'Went', 'Gone'], correctIndex: 2, reason: '"Go" irregular: go → went → gone. "Gone" = V3 (past participle).' },
  { id: 'v2', topic: 'Verbs', question: '"She ___ to school every day."', options: ['go', 'goes', 'going', 'gone'], correctIndex: 1, reason: 'She = orang ketiga tunggal → verb + -s/-es → "goes". Aturan Simple Present Tense.' },
  { id: 'v3', topic: 'Verbs', question: 'Which is a LINKING verb?', options: ['Run', 'Eat', 'Seem', 'Write'], correctIndex: 2, reason: '"Seem" linking verb — menghubungkan subjek dengan deskripsi. Lainnya: be, appear, become, feel, look, sound.' },
  { id: 'v4', topic: 'Verbs', question: '"I ___ studying when she called." (be)', options: ['am', 'is', 'was', 'were'], correctIndex: 2, reason: '"I" + past → "was". Past Continuous: was/were + V-ing. "I was studying when she called."' },
  { id: 'v5', topic: 'Verbs', question: 'V2 of "buy" is ___?', options: ['Buyed', 'Bought', 'Buied', 'Buying'], correctIndex: 1, reason: '"Buy" irregular: buy → bought → bought. Tidak pakai -ed.' },
  { id: 'v6', topic: 'Verbs', question: '"They ___ already finished the project."', options: ['has', 'have', 'had', 'having'], correctIndex: 1, reason: '"They" = plural → pakai "have". Present Perfect: have/has + V3. "They have already finished."' },
  { id: 'v7', topic: 'Verbs', question: 'Which is a MODAL verb?', options: ['Eat', 'Run', 'Can', 'Play'], correctIndex: 2, reason: '"Can" = modal verb (kata kerja bantu). Modal lain: could, will, would, shall, should, may, might, must.' },
  { id: 'v8', topic: 'Verbs', question: '"She ___ dinner right now."', options: ['cook', 'cooks', 'is cooking', 'cooked'], correctIndex: 2, reason: '"Right now" = sedang terjadi → Present Continuous: is/am/are + V-ing. "She is cooking dinner right now."' },
  { id: 'v9', topic: 'Verbs', question: 'V3 of "write" is ___?', options: ['Writed', 'Wrote', 'Written', 'Writing'], correctIndex: 2, reason: '"Write" irregular: write → wrote (V2) → written (V3). "I have written a letter."' },
  { id: 'v10', topic: 'Verbs', question: '"He ___ to Jakarta yesterday."', options: ['fly', 'flies', 'flew', 'flown'], correctIndex: 2, reason: '"Yesterday" = past → Simple Past. "Fly" irregular: fly → flew → flown. "He flew to Jakarta."' },
  { id: 'v11', topic: 'Verbs', question: '"She ___ English since 2020."', options: ['study', 'studies', 'has studied', 'studied'], correctIndex: 2, reason: '"Since 2020" = Present Perfect. has/have + V3. "She has studied English since 2020." Menunjukkan dari dulu sampai sekarang.' },
  { id: 'v12', topic: 'Verbs', question: '"You ___ bring your own pen." (harus)', options: ['can', 'may', 'must', 'will'], correctIndex: 2, reason: '"Must" = harus (kewajiban). "Can" = bisa, "May" = boleh, "Will" = akan. "You must bring your own pen."' },
  { id: 'v13', topic: 'Verbs', question: 'V2 of "teach" is ___?', options: ['Teached', 'Taught', 'Tought', 'Teaching'], correctIndex: 1, reason: '"Teach" irregular: teach → taught → taught. Bukan "teached".' },
  { id: 'v14', topic: 'Verbs', question: '"Don\'t forget ___ your homework."', options: ['do', 'to do', 'doing', 'did'], correctIndex: 1, reason: '"Forget + to + V1" = lupa untuk melakukan. "Don\'t forget to do your homework."' },
  { id: 'v15', topic: 'Verbs', question: '"If it rains, I ___ stay home."', options: ['will', 'would', 'am', 'do'], correctIndex: 0, reason: 'Conditional Type 1: If + present, will + V1. "If it rains, I will stay home." Kemungkinan nyata di masa depan.' },

  // ══════════════════════════════════════════
  //  ADJECTIVES (15 questions)
  // ══════════════════════════════════════════
  { id: 'a1', topic: 'Adjectives', question: '"She is ___ than her sister." (tall)', options: ['more tall', 'tallest', 'taller', 'most tall'], correctIndex: 2, reason: '"Tall" 1 syllable → tambah -er → "taller". Jangan "more tall" — itu untuk 2+ suku kata.' },
  { id: 'a2', topic: 'Adjectives', question: 'Which suffix turns "beauty" into adjective?', options: ['-ness', '-ful', '-ment', '-tion'], correctIndex: 1, reason: 'beauty + "-ful" = beautiful. "-ful" = penuh dengan. "-ness/-ment/-tion" membuat noun.' },
  { id: 'a3', topic: 'Adjectives', question: 'Correct adjective order: "a ___ dress"', options: ['silk beautiful red', 'beautiful red silk', 'red beautiful silk', 'red silk beautiful'], correctIndex: 1, reason: 'OSASCOMP: Opinion (beautiful) → Color (red) → Material (silk).' },
  { id: 'a4', topic: 'Adjectives', question: 'Superlative of "good" is ___?', options: ['Goodest', 'Most good', 'Better', 'Best'], correctIndex: 3, reason: '"Good" irregular: good → better (comparative) → best (superlative). Bukan "goodest".' },
  { id: 'a5', topic: 'Adjectives', question: '"danger" + suffix = adjective?', options: ['Dangerful', 'Dangerous', 'Dangerless', 'Dangerly'], correctIndex: 1, reason: 'danger + "-ous" = dangerous (berbahaya). Suffix "-ous" = memiliki sifat.' },
  { id: 'a6', topic: 'Adjectives', question: '"This is the ___ movie I\'ve ever seen."', options: ['most boring', 'more boring', 'boringer', 'boringest'], correctIndex: 0, reason: '"Boring" 2 syllables → superlative pakai "most". "The most boring." Bukan "boringest".' },
  { id: 'a7', topic: 'Adjectives', question: 'Comparative of "bad" is ___?', options: ['Badder', 'More bad', 'Worse', 'Worst'], correctIndex: 2, reason: '"Bad" irregular: bad → worse → worst. Bukan "badder" atau "more bad".' },
  { id: 'a8', topic: 'Adjectives', question: '"care" + "-less" = ?', options: ['Careful', 'Caring', 'Careless', 'Cared'], correctIndex: 2, reason: '"Careless" = tidak hati-hati (tanpa perhatian). "-less" = tanpa. Kebalikan: careful (-ful = penuh dengan).' },
  { id: 'a9', topic: 'Adjectives', question: '"The food is ___." (after linking verb)', options: ['deliciously', 'delicious', 'deliciousness', 'deliciousing'], correctIndex: 1, reason: 'Setelah linking verb "is" → pakai ADJECTIVE. "The food is delicious." Bukan adverb "deliciously".' },
  { id: 'a10', topic: 'Adjectives', question: '"comfort" + suffix = adjective?', options: ['Comfortness', 'Comfortable', 'Comfortly', 'Comforting'], correctIndex: 1, reason: 'comfort + "-able" = comfortable (nyaman). "-able" = bisa/dapat di-.' },
  { id: 'a11', topic: 'Adjectives', question: '"He is ___ than me." (smart)', options: ['More smart', 'Smartter', 'Smarter', 'Most smart'], correctIndex: 2, reason: '"Smart" 1 syllable → tambah -er → "smarter". Bukan "more smart".' },
  { id: 'a12', topic: 'Adjectives', question: 'Which is NOT an adjective suffix?', options: ['-ful', '-ous', '-ive', '-ment'], correctIndex: 3, reason: '"-ment" membentuk NOUN (movement, government). "-ful/-ous/-ive" membentuk adjective.' },
  { id: 'a13', topic: 'Adjectives', question: '"act" + "-ive" = ?', options: ['Action', 'Active', 'Activity', 'Acting'], correctIndex: 1, reason: 'act + "-ive" = active (aktif). "-ive" = cenderung/bersifat. "Action/Activity" = noun.' },
  { id: 'a14', topic: 'Adjectives', question: '"She wore a ___ jacket." (big, black, leather)', options: ['black big leather', 'big black leather', 'leather big black', 'big leather black'], correctIndex: 1, reason: 'OSASCOMP: Size (big) → Color (black) → Material (leather). "A big black leather jacket."' },
  { id: 'a15', topic: 'Adjectives', question: '"far" → comparative = ?', options: ['Farer', 'More far', 'Farther', 'Farest'], correctIndex: 2, reason: '"Far" irregular: far → farther/further → farthest/furthest. Bukan "farer".' },

  // ══════════════════════════════════════════
  //  ADVERBS (15 questions)
  // ══════════════════════════════════════════
  { id: 'ad1', topic: 'Adverbs', question: '"She sings ___." Choose the adverb:', options: ['beautiful', 'beauty', 'beautifully', 'beauteous'], correctIndex: 2, reason: 'Setelah verb "sings" butuh adverb → "beautifully". Adjective + "-ly" = adverb.' },
  { id: 'ad2', topic: 'Adverbs', question: 'Which is a FREQUENCY adverb?', options: ['Quickly', 'Yesterday', 'Always', 'Here'], correctIndex: 2, reason: '"Always" = frequency (seberapa sering). Lainnya: never, sometimes, often, usually, rarely.' },
  { id: 'ad3', topic: 'Adverbs', question: '"He drives very ___."', options: ['careful', 'carefully', 'careless', 'caring'], correctIndex: 1, reason: '"Drives" = verb → butuh adverb "carefully". "Careful" = adjective, tidak bisa modifikasi verb.' },
  { id: 'ad4', topic: 'Adverbs', question: 'Where does frequency adverb go? "She ___ late."', options: ['is always', 'always is', 'is never always', 'always late is'], correctIndex: 0, reason: 'Frequency adverb SETELAH "be": "She is always late." Tapi SEBELUM verb biasa: "She always comes late."' },
  { id: 'ad5', topic: 'Adverbs', question: '"He runs ___." (fast)', options: ['fastly', 'fast', 'faster', 'fastest'], correctIndex: 1, reason: '"Fast" = adjective DAN adverb (bentuknya sama). Tidak ada "fastly"! "He runs fast."' },
  { id: 'ad6', topic: 'Adverbs', question: 'Which is an adverb of PLACE?', options: ['Often', 'Slowly', 'Tomorrow', 'Everywhere'], correctIndex: 3, reason: '"Everywhere" = adverb of place (tempat). "Often" = frequency, "Slowly" = manner, "Tomorrow" = time.' },
  { id: 'ad7', topic: 'Adverbs', question: '"She speaks English very ___."', options: ['good', 'well', 'goodly', 'better'], correctIndex: 1, reason: '"Good" = adjective. "Well" = adverb dari "good". "She speaks English well." Bukan "good"!' },
  { id: 'ad8', topic: 'Adverbs', question: 'Which is an adverb of DEGREE?', options: ['Here', 'Never', 'Very', 'Slowly'], correctIndex: 2, reason: '"Very" = adverb of degree (tingkatan). Lainnya: quite, extremely, rather, too, enough, almost.' },
  { id: 'ad9', topic: 'Adverbs', question: '"He ___ goes to the gym." (jarang)', options: ['rarely', 'rare', 'raring', 'rared'], correctIndex: 0, reason: '"Rarely" = jarang (frequency adverb). "Rare" = adjective. Adverb menunjukkan seberapa sering.' },
  { id: 'ad10', topic: 'Adverbs', question: '"hard" sebagai adverb artinya ___?', options: ['Dengan keras/giat', 'Hampir tidak', 'Dengan sulit', 'Dengan kasar'], correctIndex: 0, reason: '"Hard" sebagai adverb = dengan keras/giat: "She works hard." HATI-HATI: "Hardly" = hampir tidak (beda arti!).' },
  { id: 'ad11', topic: 'Adverbs', question: '"She finished the test ___." (cepat)', options: ['quick', 'quickly', 'quicker', 'quickest'], correctIndex: 1, reason: '"Quick" adjective → "quickly" adverb. Setelah verb "finished" butuh adverb.' },
  { id: 'ad12', topic: 'Adverbs', question: '"I ___ eat breakfast." (tidak pernah)', options: ['never', 'ever', 'always', 'sometimes'], correctIndex: 0, reason: '"Never" = tidak pernah. Letaknya sebelum verb biasa: "I never eat breakfast."' },
  { id: 'ad13', topic: 'Adverbs', question: '"She dances ___." (graceful)', options: ['graceful', 'gracefully', 'gracefulness', 'gracing'], correctIndex: 1, reason: '"Graceful" (adj) + "-ly" = "gracefully" (adv). Setelah verb "dances" → butuh adverb.' },
  { id: 'ad14', topic: 'Adverbs', question: '"He arrived ___." (terlambat)', options: ['late', 'lately', 'latest', 'later'], correctIndex: 0, reason: '"Late" = adverb of time (terlambat). "Lately" = akhir-akhir ini (beda arti!). "He arrived late."' },
  { id: 'ad15', topic: 'Adverbs', question: '"The test was ___ difficult."', options: ['extreme', 'extremely', 'extremeness', 'extreming'], correctIndex: 1, reason: '"Extremely" = adverb of degree memodifikasi adjective "difficult". "Extremely difficult" = sangat sulit.' },

  // ══════════════════════════════════════════
  //  PRONOUNS (15 questions)
  // ══════════════════════════════════════════
  { id: 'pr1', topic: 'Pronouns', question: '"This book is ___." (milik dia perempuan)', options: ['her', 'she', 'hers', 'herself'], correctIndex: 2, reason: '"Hers" = possessive pronoun (berdiri sendiri). "Her" = possessive adjective (perlu noun: "her book").' },
  { id: 'pr2', topic: 'Pronouns', question: '"She made the cake by ___."', options: ['her', 'she', 'hers', 'herself'], correctIndex: 3, reason: '"Herself" = reflexive pronoun. "By herself" = sendirian. Reflexive: myself, yourself, himself, herself.' },
  { id: 'pr3', topic: 'Pronouns', question: '"The boy ___ won the race is my brother."', options: ['which', 'who', 'whom', 'whose'], correctIndex: 1, reason: '"Who" = relative pronoun untuk ORANG sebagai subjek. "Which" untuk benda. "Whose" untuk kepemilikan.' },
  { id: 'pr4', topic: 'Pronouns', question: '"I gave ___ a present." (dia laki-laki)', options: ['he', 'his', 'him', 'himself'], correctIndex: 2, reason: '"Him" = object pronoun. Setelah verb "gave" butuh object. "He" = subject, "His" = possessive.' },
  { id: 'pr5', topic: 'Pronouns', question: '"___ is your favorite color?"', options: ['Who', 'Which', 'What', 'Whom'], correctIndex: 2, reason: '"What" = interrogative pronoun untuk menanyakan benda/hal. "What is your favorite color?"' },
  { id: 'pr6', topic: 'Pronouns', question: '"The car ___ is parked outside is mine."', options: ['who', 'which', 'whom', 'whose'], correctIndex: 1, reason: '"Which" = relative pronoun untuk BENDA. "The car which is parked outside." "Who" untuk orang.' },
  { id: 'pr7', topic: 'Pronouns', question: '"___ bag is this?" (milik siapa)', options: ['Who', 'Which', 'What', 'Whose'], correctIndex: 3, reason: '"Whose" = interrogative pronoun untuk kepemilikan. "Whose bag is this?" = Tas milik siapa ini?' },
  { id: 'pr8', topic: 'Pronouns', question: '"Tom and ___ went to school."', options: ['me', 'I', 'my', 'mine'], correctIndex: 1, reason: '"I" = subject pronoun. "Tom and I" = subjek kalimat. Bukan "Tom and me" (me = object).' },
  { id: 'pr9', topic: 'Pronouns', question: '"___ wants ice cream?" (siapa)', options: ['What', 'Which', 'Who', 'Whom'], correctIndex: 2, reason: '"Who" = untuk menanyakan orang (subjek). "Who wants ice cream?" "Whom" untuk objek.' },
  { id: 'pr10', topic: 'Pronouns', question: '"We enjoyed ___ at the party."', options: ['us', 'our', 'ours', 'ourselves'], correctIndex: 3, reason: '"Ourselves" = reflexive. Subjek "we" dan objek sama → "We enjoyed ourselves." Bukan "us".' },
  { id: 'pr11', topic: 'Pronouns', question: '"Is this your pen?" — "No, it\'s ___."', options: ['her', 'she', 'hers', 'herself'], correctIndex: 2, reason: '"Hers" = possessive pronoun (berdiri sendiri tanpa noun). "It\'s hers" = itu miliknya. "Her" butuh noun.' },
  { id: 'pr12', topic: 'Pronouns', question: '"___ of the students passed the exam." (semua)', options: ['Every', 'All', 'Each', 'Either'], correctIndex: 1, reason: '"All" = semua (indefinite pronoun). "All of the students passed." "Every/Each" diikuti singular noun.' },
  { id: 'pr13', topic: 'Pronouns', question: '"The teacher ___ helped me was very kind."', options: ['which', 'who', 'whom', 'what'], correctIndex: 1, reason: '"Who" = relative pronoun untuk orang sebagai subjek. "The teacher who helped me." Teacher = orang.' },
  { id: 'pr14', topic: 'Pronouns', question: '"___ is wrong in this room." (ada sesuatu)', options: ['Something', 'Anything', 'Nothing', 'Everything'], correctIndex: 0, reason: '"Something" = sesuatu (kalimat positif). "Something is wrong." "Anything" untuk pertanyaan/negatif.' },
  { id: 'pr15', topic: 'Pronouns', question: '"They painted the house by ___."', options: ['them', 'their', 'theirs', 'themselves'], correctIndex: 3, reason: '"Themselves" = reflexive pronoun. "By themselves" = sendiri. Subjek "they" → reflexive "themselves".' },

  // ══════════════════════════════════════════
  //  PREPOSITIONS (15 questions)
  // ══════════════════════════════════════════
  { id: 'pp1', topic: 'Prepositions', question: '"I was born ___ 1999."', options: ['in', 'on', 'at', 'by'], correctIndex: 0, reason: '"In" untuk tahun/bulan/musim: in 1999, in January, in the morning. "On" untuk tanggal/hari. "At" untuk waktu spesifik.' },
  { id: 'pp2', topic: 'Prepositions', question: '"The cat is ___ the table." (di bawah)', options: ['on', 'above', 'under', 'beside'], correctIndex: 2, reason: '"Under" = di bawah. "On" = di atas (menyentuh). "Above" = di atas (tidak menyentuh). "Beside" = di samping.' },
  { id: 'pp3', topic: 'Prepositions', question: '"She is good ___ English."', options: ['in', 'at', 'on', 'with'], correctIndex: 1, reason: '"Good at" = collocation yang benar. "She is good at English." Harus dihafalkan.' },
  { id: 'pp4', topic: 'Prepositions', question: '"The meeting is ___ Monday."', options: ['in', 'on', 'at', 'for'], correctIndex: 1, reason: '"On" untuk hari: on Monday, on Friday, on my birthday. "In" untuk bulan/tahun. "At" untuk jam.' },
  { id: 'pp5', topic: 'Prepositions', question: '"I\'ll see you ___ 7 o\'clock."', options: ['in', 'on', 'at', 'by'], correctIndex: 2, reason: '"At" untuk waktu spesifik: at 7 o\'clock, at noon, at midnight, at sunset.' },
  { id: 'pp6', topic: 'Prepositions', question: '"She is interested ___ music."', options: ['in', 'at', 'on', 'of'], correctIndex: 0, reason: '"Interested in" = collocation. "She is interested in music." Bukan "interested at/on".' },
  { id: 'pp7', topic: 'Prepositions', question: '"The book is ___ the shelf." (di atas)', options: ['in', 'on', 'under', 'behind'], correctIndex: 1, reason: '"On" = di atas (menyentuh permukaan). "The book is on the shelf." "In" = di dalam.' },
  { id: 'pp8', topic: 'Prepositions', question: '"She is afraid ___ spiders."', options: ['at', 'on', 'of', 'with'], correctIndex: 2, reason: '"Afraid of" = takut terhadap. "She is afraid of spiders." Collocation yang harus dihafalkan.' },
  { id: 'pp9', topic: 'Prepositions', question: '"I go to school ___ bus."', options: ['in', 'on', 'by', 'with'], correctIndex: 2, reason: '"By" untuk transportasi: by bus, by car, by train, by plane. "I go to school by bus."' },
  { id: 'pp10', topic: 'Prepositions', question: '"He\'s been waiting ___ 3 hours."', options: ['since', 'for', 'in', 'at'], correctIndex: 1, reason: '"For" + durasi waktu: for 3 hours, for 2 days. "Since" + titik waktu: since 2020, since Monday.' },
  { id: 'pp11', topic: 'Prepositions', question: '"She\'s been here ___ 9 a.m."', options: ['since', 'for', 'in', 'at'], correctIndex: 0, reason: '"Since" + titik waktu spesifik: since 9 a.m., since yesterday, since 2020. "For" + durasi.' },
  { id: 'pp12', topic: 'Prepositions', question: '"The store is ___ the bank and the cafe."', options: ['among', 'between', 'beside', 'behind'], correctIndex: 1, reason: '"Between" = di antara DUA hal. "Among" = di antara BANYAK hal. "Between the bank and the cafe."' },
  { id: 'pp13', topic: 'Prepositions', question: '"I depend ___ my parents."', options: ['in', 'on', 'at', 'for'], correctIndex: 1, reason: '"Depend on" = bergantung pada. "I depend on my parents." Collocation yang harus dihafalkan.' },
  { id: 'pp14', topic: 'Prepositions', question: '"She arrived ___ the airport."', options: ['in', 'on', 'at', 'to'], correctIndex: 2, reason: '"At" untuk tempat spesifik: at the airport, at school, at home. "In" untuk area/kota: in Jakarta.' },
  { id: 'pp15', topic: 'Prepositions', question: '"We arrived ___ Jakarta yesterday."', options: ['at', 'on', 'in', 'to'], correctIndex: 2, reason: '"In" untuk kota/negara: in Jakarta, in Indonesia. "At" untuk tempat kecil. "Arrived in Jakarta."' },

  // ══════════════════════════════════════════
  //  CONJUNCTIONS (15 questions)
  // ══════════════════════════════════════════
  { id: 'c1', topic: 'Conjunctions', question: '"I want to go, ___ I have no money."', options: ['so', 'but', 'and', 'or'], correctIndex: 1, reason: '"But" = tetapi (kontras). Ingin pergi ↔ tidak punya uang. FANBOYS: For, And, Nor, But, Or, Yet, So.' },
  { id: 'c2', topic: 'Conjunctions', question: '"___ it was raining, she still went."', options: ['Although', 'Because', 'So', 'And'], correctIndex: 0, reason: '"Although" = meskipun. Sesuatu terjadi walaupun ada hambatan. "Although it was raining, she went."' },
  { id: 'c3', topic: 'Conjunctions', question: '"She studied hard, ___ she passed the exam."', options: ['but', 'or', 'so', 'yet'], correctIndex: 2, reason: '"So" = jadi/maka (akibat). Belajar keras → lulus. "She studied hard, so she passed."' },
  { id: 'c4', topic: 'Conjunctions', question: '"Do you want tea ___ coffee?"', options: ['and', 'but', 'or', 'so'], correctIndex: 2, reason: '"Or" = atau (pilihan). Memilih salah satu. "Do you want tea or coffee?"' },
  { id: 'c5', topic: 'Conjunctions', question: '"I\'ll wait ___ you come back."', options: ['until', 'although', 'or', 'but'], correctIndex: 0, reason: '"Until" = sampai. "I\'ll wait until you come back." = Saya akan menunggu sampai kamu kembali.' },
  { id: 'c6', topic: 'Conjunctions', question: '"___ he was tired, he kept working."', options: ['Because', 'Even though', 'So', 'And'], correctIndex: 1, reason: '"Even though" = meskipun (sama seperti although, tapi lebih kuat). Kontras: capek tapi tetap kerja.' },
  { id: 'c7', topic: 'Conjunctions', question: '"She is ___ smart ___ beautiful."', options: ['both...and', 'either...or', 'neither...nor', 'not only...and'], correctIndex: 0, reason: '"Both...and" = keduanya. "She is both smart and beautiful." = Dia pintar DAN cantik (dua-duanya).' },
  { id: 'c8', topic: 'Conjunctions', question: '"I left early ___ I had a meeting."', options: ['but', 'because', 'although', 'or'], correctIndex: 1, reason: '"Because" = karena (alasan). "I left early because I had a meeting." Menjelaskan kenapa.' },
  { id: 'c9', topic: 'Conjunctions', question: '"___ you finish, ___ can you leave."', options: ['Both...and', 'Either...or', 'Neither...nor', 'Only after...only then'], correctIndex: 3, reason: 'Penekanan urutan: "Only after you finish, only then can you leave." Baru boleh pergi setelah selesai.' },
  { id: 'c10', topic: 'Conjunctions', question: '"He ___ sings ___ dances." (tidak keduanya)', options: ['both...and', 'either...or', 'neither...nor', 'not...but'], correctIndex: 2, reason: '"Neither...nor" = tidak...maupun (keduanya tidak). "He neither sings nor dances." Kebalikan "both...and".' },
  { id: 'c11', topic: 'Conjunctions', question: '"I\'ll go ___ you go too."', options: ['unless', 'if', 'although', 'but'], correctIndex: 1, reason: '"If" = jika/kalau (syarat). "I\'ll go if you go too." = Saya pergi kalau kamu juga ikut.' },
  { id: 'c12', topic: 'Conjunctions', question: '"She was sick, ___ she still came."', options: ['so', 'and', 'yet', 'because'], correctIndex: 2, reason: '"Yet" = namun/tetapi (mirip "but", lebih formal). "She was sick, yet she still came." Menunjukkan kontras.' },
  { id: 'c13', topic: 'Conjunctions', question: '"Finish your food ___ you go out."', options: ['after', 'before', 'until', 'while'], correctIndex: 1, reason: '"Before" = sebelum. "Finish your food before you go out." Makanan dulu, baru keluar.' },
  { id: 'c14', topic: 'Conjunctions', question: '"___ you study or not, the exam is tomorrow."', options: ['If', 'Whether', 'Unless', 'Although'], correctIndex: 1, reason: '"Whether...or" = entah...atau. "Whether you study or not, the exam is tomorrow." Tidak peduli pilihannya.' },
  { id: 'c15', topic: 'Conjunctions', question: '"I won\'t go ___ you apologize."', options: ['if', 'unless', 'because', 'although'], correctIndex: 1, reason: '"Unless" = kecuali kalau. "I won\'t go unless you apologize." = Tidak pergi kecuali kamu minta maaf.' },

  // ══════════════════════════════════════════
  //  ARTICLES (15 questions)
  // ══════════════════════════════════════════
  { id: 'ar1', topic: 'Articles', question: '"I saw ___ elephant at the zoo."', options: ['a', 'an', 'the', '-'], correctIndex: 1, reason: '"An" sebelum suara vokal (a,i,u,e,o). "Elephant" diawali "e" → "an elephant".' },
  { id: 'ar2', topic: 'Articles', question: '"___ sun rises in the east."', options: ['A', 'An', 'The', '-'], correctIndex: 2, reason: '"The" untuk benda unik/satu-satunya: the sun, the moon, the earth. Semua orang tau yang mana.' },
  { id: 'ar3', topic: 'Articles', question: '"She is ___ honest person."', options: ['a', 'an', 'the', '-'], correctIndex: 1, reason: '"Honest" diawali suara vokal /ɒ/ (huruf h-nya silent). Jadi "an honest person", bukan "a honest".' },
  { id: 'ar4', topic: 'Articles', question: '"He goes to ___ university."', options: ['a', 'an', 'the', '-'], correctIndex: 0, reason: '"University" diawali suara konsonan /juː/ (seperti "you"). Jadi "a university", bukan "an university".' },
  { id: 'ar5', topic: 'Articles', question: '"I like ___ music." (umum)', options: ['a', 'an', 'the', '-'], correctIndex: 3, reason: 'Tidak pakai article untuk hal UMUM/abstrak: "I like music" (musik secara umum). Bukan musik spesifik.' },
  { id: 'ar6', topic: 'Articles', question: '"She plays ___ piano very well."', options: ['a', 'an', 'the', '-'], correctIndex: 2, reason: '"The" untuk alat musik: play the piano, play the guitar, play the violin. Ini aturan khusus.' },
  { id: 'ar7', topic: 'Articles', question: '"I need ___ water." (sedikit)', options: ['a', 'an', 'some', 'many'], correctIndex: 2, reason: '"Some" untuk uncountable noun (kalimat positif). "I need some water." "Many" untuk countable.' },
  { id: 'ar8', topic: 'Articles', question: '"Do you have ___ questions?"', options: ['some', 'any', 'a', 'much'], correctIndex: 1, reason: '"Any" untuk pertanyaan dan kalimat negatif. "Do you have any questions?" "Some" untuk kalimat positif.' },
  { id: 'ar9', topic: 'Articles', question: '"___ Mount Everest is the highest mountain."', options: ['A', 'An', 'The', '-'], correctIndex: 3, reason: 'Nama gunung TIDAK pakai article: Mount Everest, Mount Fuji. Tapi "the Himalayas" (pegunungan pakai "the").' },
  { id: 'ar10', topic: 'Articles', question: '"She is ___ best student in class."', options: ['a', 'an', 'the', '-'], correctIndex: 2, reason: '"The" + superlative: "the best", "the tallest", "the most beautiful". Selalu pakai "the" sebelum superlative.' },
  { id: 'ar11', topic: 'Articles', question: '"I don\'t have ___ money."', options: ['some', 'any', 'much', 'many'], correctIndex: 2, reason: '"Much" untuk uncountable noun di kalimat negatif/pertanyaan. "I don\'t have much money." "Many" untuk countable.' },
  { id: 'ar12', topic: 'Articles', question: '"There are ___ books on the table."', options: ['much', 'a', 'many', 'an'], correctIndex: 2, reason: '"Many" untuk countable noun plural. "There are many books." "Much" untuk uncountable.' },
  { id: 'ar13', topic: 'Articles', question: '"She went to ___ bed early." (tidur)', options: ['a', 'an', 'the', '-'], correctIndex: 3, reason: '"Go to bed" (tidur) tanpa article — ini ekspresi tetap. Tapi "sit on the bed" (benda fisik) pakai "the".' },
  { id: 'ar14', topic: 'Articles', question: '"I had ___ egg for breakfast."', options: ['a', 'an', 'the', '-'], correctIndex: 1, reason: '"Egg" diawali suara vokal "e" → "an egg". "A" untuk suara konsonan.' },
  { id: 'ar15', topic: 'Articles', question: '"___ Philippines is in Southeast Asia."', options: ['A', 'An', 'The', '-'], correctIndex: 2, reason: '"The" untuk nama negara berbentuk plural/kepulauan: the Philippines, the Netherlands, the United States.' },

  // ══════════════════════════════════════════
  //  MIXED (15 questions)
  // ══════════════════════════════════════════
  { id: 'm1', topic: 'Mixed', question: '"She speaks English ___." Which part of speech?', options: ['Adjective (fluent)', 'Adverb (fluently)', 'Noun (fluency)', 'Verb'], correctIndex: 1, reason: 'Setelah verb "speaks" → butuh ADVERB "fluently". Adjective tidak bisa modifikasi verb.' },
  { id: 'm2', topic: 'Mixed', question: 'Identify the ADJECTIVE: "The tall man walks quickly."', options: ['The', 'tall', 'walks', 'quickly'], correctIndex: 1, reason: '"Tall" = adjective, mendeskripsikan noun "man". "The" = article, "walks" = verb, "quickly" = adverb.' },
  { id: 'm3', topic: 'Mixed', question: 'Which sentence is grammatically correct?', options: ['She don\'t like coffee.', 'He have two brothers.', 'They goes to school.', 'I am a student.'], correctIndex: 3, reason: '"I am a student" benar. Lainnya: "She doesn\'t", "He has", "They go". Subject-verb agreement!' },
  { id: 'm4', topic: 'Mixed', question: 'Identify the NOUN: "The clever student answered quickly."', options: ['clever', 'student', 'answered', 'quickly'], correctIndex: 1, reason: '"Student" = noun (orang). "Clever" = adjective, "answered" = verb, "quickly" = adverb.' },
  { id: 'm5', topic: 'Mixed', question: 'Identify the VERB: "She usually drinks coffee."', options: ['She', 'usually', 'drinks', 'coffee'], correctIndex: 2, reason: '"Drinks" = verb (kata kerja). "She" = pronoun, "usually" = adverb, "coffee" = noun.' },
  { id: 'm6', topic: 'Mixed', question: 'Identify the PREPOSITION: "The book is on the table."', options: ['The', 'book', 'on', 'table'], correctIndex: 2, reason: '"On" = preposition (kata depan, menunjukkan posisi). Preposition menghubungkan noun dengan kalimat.' },
  { id: 'm7', topic: 'Mixed', question: '"She is a ___ worker." (hard → adjective atau adverb?)', options: ['hard (adj)', 'hardly (adv)', 'hard (adv)', 'hardness (noun)'], correctIndex: 0, reason: 'Sebelum noun "worker" → butuh ADJECTIVE. "A hard worker" = pekerja keras. "Hardly" = hampir tidak (beda arti!).' },
  { id: 'm8', topic: 'Mixed', question: '"___ raining outside." Choose the correct:', options: ['It\'s', 'Its', 'It', 'They\'re'], correctIndex: 0, reason: '"It\'s" = "it is". "It\'s raining" = sedang hujan. "Its" = possessive (miliknya). Jangan ketukar!' },
  { id: 'm9', topic: 'Mixed', question: '"They\'re going to ___ house." (milik mereka)', options: ['they\'re', 'there', 'their', 'theirs'], correctIndex: 2, reason: '"Their" = possessive adjective (diikuti noun). "Their house." "They\'re" = they are. "There" = di sana.' },
  { id: 'm10', topic: 'Mixed', question: '"I have ___ homework." (banyak)', options: ['many', 'a lot of', 'a few', 'several'], correctIndex: 1, reason: '"A lot of" bisa untuk countable DAN uncountable. "Homework" uncountable → "a lot of homework". "Many" hanya countable.' },
  { id: 'm11', topic: 'Mixed', question: 'Which is a CONJUNCTION?', options: ['Beautiful', 'Quickly', 'Because', 'Under'], correctIndex: 2, reason: '"Because" = conjunction (kata hubung). "Beautiful" = adj, "Quickly" = adv, "Under" = preposition.' },
  { id: 'm12', topic: 'Mixed', question: '"She ___ to school yesterday." (walk)', options: ['walk', 'walks', 'walked', 'walking'], correctIndex: 2, reason: '"Yesterday" = past tense → V2. "Walk" regular → "walked". Simple Past: V2 atau did + V1.' },
  { id: 'm13', topic: 'Mixed', question: 'Identify the ADVERB: "He always eats slowly."', options: ['He', 'always', 'eats', 'slowly'], correctIndex: 3, reason: '"Slowly" = adverb of manner (cara). "Always" juga adverb (frequency). Tapi "slowly" paling jelas karena memodifikasi "eats".' },
  { id: 'm14', topic: 'Mixed', question: '"She is ___ intelligent ___ her brother."', options: ['more...than', 'most...than', 'more...then', 'most...then'], correctIndex: 0, reason: '"More...than" untuk comparative (2+ syllables). "She is more intelligent than her brother." "Then" = lalu (beda!).' },
  { id: 'm15', topic: 'Mixed', question: '"___ you ever been to Bali?"', options: ['Do', 'Did', 'Have', 'Are'], correctIndex: 2, reason: '"Have you ever...?" = Present Perfect untuk pengalaman. "Have you ever been to Bali?" = Pernah ke Bali?' },
];

// ════════════════════════════════════════════════════════════════

const topics: { key: string; label: string; Icon: React.ElementType; desc: string }[] = [
  { key: 'all',          label: 'Semua (Campur)', Icon: Shuffle,  desc: 'Semua 25 soal dari 8 topik + mixed' },
  { key: 'Nouns',        label: 'Nouns',          Icon: Box,      desc: 'Kata benda — countable, uncountable, plural' },
  { key: 'Verbs',        label: 'Verbs',          Icon: Zap,      desc: 'Kata kerja — tenses, irregular, linking' },
  { key: 'Adjectives',   label: 'Adjectives',     Icon: Palette,  desc: 'Kata sifat — comparative, suffix, order' },
  { key: 'Adverbs',      label: 'Adverbs',        Icon: Wind,     desc: 'Kata keterangan — manner, frequency' },
  { key: 'Pronouns',     label: 'Pronouns',       Icon: User,     desc: 'Kata ganti — possessive, reflexive, relative' },
  { key: 'Prepositions', label: 'Prepositions',   Icon: MapPin,   desc: 'Kata depan — in/on/at, place, collocation' },
  { key: 'Conjunctions', label: 'Conjunctions',   Icon: Link2,    desc: 'Kata hubung — coordinating, subordinating' },
  { key: 'Articles',     label: 'Articles',       Icon: FileText, desc: 'Kata sandang — a, an, the' },
];

export default function GrammarQuizPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [questions, setQuestions] = useState<GrammarQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const addGrammarScore = useVocabStore((s) => s.addGrammarScore);

  const startQuiz = (topicKey: string) => {
    const filtered = topicKey === 'all'
      ? shuffleArray([...allQuestions])
      : shuffleArray(allQuestions.filter((q) => q.topic === topicKey));
    setQuestions(filtered);
    setSelectedTopic(topicKey);
    setAnswers({});
    setIsSubmitted(false);
    setShowDetails(false);
  };

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = questions.length;

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = () => {
    if (answeredCount < totalQuestions) return;
    // Save per-topic scores to store
    const topicMap: Record<string, { score: number; total: number }> = {};
    questions.forEach((q) => {
      if (!topicMap[q.topic]) topicMap[q.topic] = { score: 0, total: 0 };
      topicMap[q.topic].total++;
      if (answers[q.id] === q.correctIndex) topicMap[q.topic].score++;
    });
    Object.entries(topicMap).forEach(([topic, { score, total }]) => {
      addGrammarScore(topic, score, total);
    });
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setAnswers({});
    setIsSubmitted(false);
    setShowDetails(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
    setQuestions([]);
    setAnswers({});
    setIsSubmitted(false);
    setShowDetails(false);
  };

  const score = useMemo(() => {
    if (!isSubmitted) return 0;
    return questions.reduce((acc, q) => acc + (answers[q.id] === q.correctIndex ? 1 : 0), 0);
  }, [isSubmitted, questions, answers]);

  const wrongQuestions = useMemo(() => {
    if (!isSubmitted) return [];
    return questions.filter((q) => answers[q.id] !== q.correctIndex);
  }, [isSubmitted, questions, answers]);

  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  const topicLabels: Record<string, string> = {
    Nouns: 'Nouns',
    Verbs: 'Verbs',
    Adjectives: 'Adjectives',
    Adverbs: 'Adverbs',
    Pronouns: 'Pronouns',
    Prepositions: 'Prepositions',
    Conjunctions: 'Conjunctions',
    Articles: 'Articles',
    Mixed: 'Mixed',
  };

  const topicColors: Record<string, string> = {
    Nouns:        'bg-primary/10 text-primary',
    Verbs:        'bg-primary/10 text-primary',
    Adjectives:   'bg-primary/10 text-primary',
    Adverbs:      'bg-primary/10 text-primary',
    Pronouns:     'bg-primary/10 text-primary',
    Prepositions: 'bg-primary/10 text-primary',
    Conjunctions: 'bg-primary/10 text-primary',
    Articles:     'bg-primary/10 text-primary',
    Mixed:        'bg-primary/10 text-primary',
  };

  // ── RESULTS VIEW ──
  if (isSubmitted) {
    return (
      <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-6 animate-fade-in">
        <Link href="/practice" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Practice
        </Link>

        {/* Score Card */}
        <div className="bg-(--bg-card) border border-(--border) rounded-2xl p-8 text-center">
          <Trophy className={cn('w-16 h-16 mx-auto mb-4', percentage >= 70 ? 'text-primary' : 'text-(--text-muted)')} />
          <h1 className="text-2xl font-bold text-(--text) mb-2">Grammar Quiz Selesai!</h1>
          <p className="text-5xl font-bold text-primary mb-1">{score} / {totalQuestions}</p>
          <p className="text-sm text-(--text-secondary) mb-4">{percentage}% benar</p>

          {/* Score bar */}
          <div className="h-3 rounded-full bg-(--bg-secondary) overflow-hidden max-w-xs mx-auto mb-6">
            <div
              className={cn('h-full rounded-full transition-all duration-500', percentage >= 70 ? 'bg-primary' : percentage >= 40 ? 'bg-primary/10' : 'bg-primary')}
              style={{ width: `${percentage}%` }}
            />
          </div>

          {/* Grid of answers */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {questions.map((q, i) => {
              const isCorrect = answers[q.id] === q.correctIndex;
              return (
                <div
                  key={q.id}
                  className={cn(
                    'w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold',
                    isCorrect
                      ? 'bg-primary/10 text-primary dark:bg-primary dark:text-primary'
                      : 'bg-primary/10 text-primary dark:bg-primary dark:text-primary'
                  )}
                >
                  {i + 1}
                </div>
              );
            })}
          </div>

          <p className="text-sm text-(--text-secondary) mb-2">
            {percentage >= 80 ? 'Luar biasa! Kamu sudah menguasai grammar dasar!' :
             percentage >= 60 ? 'Bagus! Tapi masih ada yang perlu dipelajari lagi.' :
             percentage >= 40 ? 'Lumayan, tapi perlu banyak latihan lagi ya!' :
             'Jangan menyerah! Pelajari kembali materinya dan coba lagi.'}
          </p>

          <div className="flex gap-3 justify-center flex-wrap mt-6">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary-dark transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Coba Lagi
            </button>
            <button
              onClick={handleBackToTopics}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-(--border) text-(--text-secondary) rounded-lg font-medium text-sm hover:bg-(--hover) transition-colors"
            >
              Ganti Topik
            </button>
            <Link
              href="/practice"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-(--border) text-(--text-secondary) rounded-lg font-medium text-sm hover:bg-(--hover) transition-colors"
            >
              Kembali
            </Link>
          </div>
        </div>

        {/* Wrong answers detail */}
        {wrongQuestions.length > 0 && (
          <div className="bg-(--bg-card) border border-(--border) rounded-2xl overflow-hidden">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-(--hover) transition-colors"
            >
              <span className="font-semibold text-(--text) flex items-center gap-2">
                <XCircle className="w-5 h-5 text-primary" />
                Jawaban Salah ({wrongQuestions.length} soal)
              </span>
              {showDetails ? <ChevronUp className="w-5 h-5 text-(--text-muted)" /> : <ChevronDown className="w-5 h-5 text-(--text-muted)" />}
            </button>

            {showDetails && (
              <div className="border-t border-(--border) divide-y divide-(--border)">
                {wrongQuestions.map((q, i) => {
                  const yourAnswer = answers[q.id];
                  return (
                    <div key={q.id} className="px-6 py-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="bg-primary/10 dark:bg-primary text-primary dark:text-primary text-xs font-bold w-7 h-7 rounded-lg flex items-center justify-center shrink-0">
                          {questions.indexOf(q) + 1}
                        </span>
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-medium', topicColors[q.topic])}>
                              {topicLabels[q.topic]}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-(--text)">{q.question}</p>

                          <div className="grid grid-cols-1 gap-1.5">
                            {q.options.map((opt, optIdx) => {
                              const isCorrectOpt = optIdx === q.correctIndex;
                              const isYourAnswer = optIdx === yourAnswer;
                              const letter = String.fromCharCode(65 + optIdx);
                              return (
                                <div
                                  key={optIdx}
                                  className={cn(
                                    'flex items-center gap-2 px-3 py-2 rounded-lg text-sm',
                                    isCorrectOpt && 'bg-primary/10 dark:bg-primary/50 border border-primary/30 dark:border-primary/50',
                                    isYourAnswer && !isCorrectOpt && 'bg-primary/10 dark:bg-primary/50 border border-primary/30 dark:border-primary/50 line-through opacity-70',
                                    !isCorrectOpt && !isYourAnswer && 'opacity-40',
                                  )}
                                >
                                  <span className="font-mono text-xs font-bold w-5">{letter}.</span>
                                  <span className={cn(isCorrectOpt && 'font-semibold text-primary dark:text-primary')}>
                                    {opt}
                                  </span>
                                  {isCorrectOpt && <CheckCircle2 className="w-4 h-4 text-primary ml-auto shrink-0" />}
                                  {isYourAnswer && !isCorrectOpt && <XCircle className="w-4 h-4 text-primary ml-auto shrink-0" />}
                                </div>
                              );
                            })}
                          </div>

                          <div className="flex items-start gap-2 bg-primary/5 border border-primary/20 rounded-lg px-3 py-2">
                            <Lightbulb className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            <p className="text-xs text-(--text-secondary) leading-relaxed">{q.reason}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // ── TOPIC SELECTOR VIEW ──
  if (!selectedTopic) {
    return (
      <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-6 animate-fade-in">
        <Link href="/practice" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Practice
        </Link>

        <div>
          <h1 className="text-xl font-bold text-(--text)">Grammar Quiz</h1>
          <p className="text-sm text-(--text-secondary) mt-1">
            Pilih topik yang mau di-quiz, atau pilih Semua untuk campuran dari semua part of speech.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {topics.map((t) => {
            const count = t.key === 'all' ? allQuestions.length : allQuestions.filter((q) => q.topic === t.key).length;
            return (
              <button
                key={t.key}
                onClick={() => startQuiz(t.key)}
                className={cn(
                  'text-left bg-(--bg-card) border border-(--border) rounded-xl p-4 hover:border-primary/50 hover:shadow-md transition-all group',
                  t.key === 'all' && 'sm:col-span-2 border-primary/30 bg-primary/5',
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <t.Icon className="w-5 h-5 text-primary" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-(--text) group-hover:text-primary transition-colors">{t.label}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-(--bg-secondary) text-(--text-muted)">{count} soal</span>
                    </div>
                    <p className="text-xs text-(--text-secondary) mt-0.5">{t.desc}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ── QUIZ VIEW ──
  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={handleBackToTopics} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> Ganti Topik
        </button>
        <span className="text-sm text-(--text-secondary) font-medium">
          {answeredCount} / {totalQuestions} dijawab
        </span>
      </div>

      <div>
        <h1 className="text-xl font-bold text-(--text)">
          Grammar Quiz — {selectedTopic === 'all' ? 'Semua Topik' : selectedTopic}
        </h1>
        <p className="text-sm text-(--text-secondary) mt-1">
          Jawab semua {totalQuestions} soal, lalu klik Submit untuk lihat hasilnya.
        </p>
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-(--bg-secondary) overflow-hidden sticky top-0 z-10">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Questions */}
      <div className="space-y-5">
        {questions.map((q, qIdx) => {
          const selected = answers[q.id];
          return (
            <div
              key={q.id}
              className={cn(
                'bg-(--bg-card) border rounded-xl p-5 transition-all',
                selected !== undefined ? 'border-primary/30' : 'border-(--border)',
              )}
            >
              <div className="flex items-start gap-3 mb-3">
                <span className={cn(
                  'text-xs font-bold w-7 h-7 rounded-lg flex items-center justify-center shrink-0',
                  selected !== undefined
                    ? 'bg-primary/10 text-primary'
                    : 'bg-(--bg-secondary) text-(--text-muted)',
                )}>
                  {qIdx + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-medium', topicColors[q.topic])}>
                      {topicLabels[q.topic]}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-(--text)">{q.question}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-10">
                {q.options.map((opt, optIdx) => {
                  const letter = String.fromCharCode(65 + optIdx);
                  const isSelected = selected === optIdx;
                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={cn(
                        'flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm text-left transition-all',
                        isSelected
                          ? 'border-primary bg-primary/5 text-primary font-medium'
                          : 'border-(--border) hover:border-primary/40 hover:bg-(--hover) text-(--text)',
                      )}
                    >
                      <span className={cn(
                        'font-mono text-xs font-bold w-6 h-6 rounded-md flex items-center justify-center shrink-0',
                        isSelected ? 'bg-primary text-white' : 'bg-(--bg-secondary) text-(--text-muted)',
                      )}>
                        {letter}
                      </span>
                      <span className="flex-1">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit button */}
      <div className="sticky bottom-4 z-10">
        <button
          onClick={handleSubmit}
          disabled={answeredCount < totalQuestions}
          className={cn(
            'w-full py-3.5 rounded-xl font-semibold text-sm transition-all shadow-lg',
            answeredCount >= totalQuestions
              ? 'bg-primary text-white hover:bg-primary-dark'
              : 'bg-(--bg-secondary) text-(--text-muted) cursor-not-allowed',
          )}
        >
          {answeredCount >= totalQuestions
            ? `Submit Quiz (${totalQuestions} soal)`
            : `Jawab semua soal dulu (${answeredCount}/${totalQuestions})`}
        </button>
      </div>
    </div>
  );
}
