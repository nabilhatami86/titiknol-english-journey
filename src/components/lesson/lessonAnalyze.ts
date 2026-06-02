// Pure functions for POS analysis and suffix detection — no React deps

export type SuffixHint = { stem: string; suffix: string; deco: string };

export function getSuffixHint(token: string): SuffixHint | null {
  const w = token.toLowerCase();
  const checks: Array<[string, string]> = [
    ['tion',  'decoration-primary dark:decoration-primary'],
    ['sion',  'decoration-primary dark:decoration-primary'],
    ['ness',  'decoration-primary dark:decoration-primary'],
    ['ment',  'decoration-primary dark:decoration-primary'],
    ['ance',  'decoration-primary dark:decoration-primary'],
    ['ence',  'decoration-primary dark:decoration-primary'],
    ['ity',   'decoration-primary dark:decoration-primary'],
    ['ety',   'decoration-primary dark:decoration-primary'],
    ['ism',   'decoration-primary dark:decoration-primary'],
    ['ist',   'decoration-primary dark:decoration-primary'],
    ['ship',  'decoration-primary dark:decoration-primary'],
    ['hood',  'decoration-primary dark:decoration-primary'],
    ['dom',   'decoration-primary dark:decoration-primary'],
    ['ible',  'decoration-primary dark:decoration-primary'],
    ['able',  'decoration-primary dark:decoration-primary'],
    ['ful',   'decoration-primary dark:decoration-primary'],
    ['less',  'decoration-primary dark:decoration-primary'],
    ['ous',   'decoration-primary dark:decoration-primary'],
    ['ive',   'decoration-primary dark:decoration-primary'],
    ['ish',   'decoration-primary dark:decoration-primary'],
    ['ent',   'decoration-primary dark:decoration-primary'],
    ['ant',   'decoration-primary dark:decoration-primary'],
    ['ary',   'decoration-primary dark:decoration-primary'],
    ['ory',   'decoration-primary dark:decoration-primary'],
    ['ic',    'decoration-primary dark:decoration-primary'],
    ['al',    'decoration-primary dark:decoration-primary'],
    ['ar',    'decoration-primary dark:decoration-primary'],
    ['ly',    'decoration-primary dark:decoration-primary'],
    ['ing',   'decoration-primary/70'],
    ['ed',    'decoration-primary/70'],
    ['er',    'decoration-primary dark:decoration-primary'],
    ['es',    'decoration-primary/50'],
    ['s',     'decoration-primary/50'],
  ];
  for (const [sfx, deco] of checks) {
    const minStem = sfx.length === 1 ? 3 : 2;
    if (w.endsWith(sfx) && token.length - sfx.length >= minStem) {
      return { stem: token.slice(0, token.length - sfx.length), suffix: token.slice(token.length - sfx.length), deco };
    }
  }
  return null;
}

export type POSInfo = { label: string; reason: string; color: string; bg: string };

export function analyzePOS(word: string, prevWord: string, nextWord: string): POSInfo {
  const w = word.toLowerCase();
  const prev = prevWord.toLowerCase();
  const next = nextWord.toLowerCase();

  const DETS     = new Set(['the','a','an','this','that','these','those','my','your','his','her','its','our','their','some','any','each','every','no','both','all','many','much','few','little','several','another','other','what','which','whose']);
  const PREPS    = new Set(['in','on','at','by','for','with','about','of','from','into','through','during','before','after','above','below','between','among','without','within','under','over','against','along','around','behind','beside','beyond','despite','except','inside','near','off','outside','past','since','than','toward','towards','up','upon','via','throughout','including','following','across','regarding','unlike','per','plus']);
  const COORDS   = new Set(['and','or','but','so','yet','nor','for']);
  const SUBS     = new Set(['although','because','since','while','when','if','though','unless','until','as','whereas','whether','wherever','whenever','once','after','before','provided','supposing']);
  const ADVCONJS = new Set(['however','therefore','furthermore','moreover','nevertheless','consequently','otherwise','meanwhile','instead','besides','thus','hence','accordingly','additionally','subsequently','nonetheless']);
  const PRONOUNS = new Set(['i','me','we','us','you','he','him','she','her','they','them','it','who','whom','whose','which','what','myself','yourself','himself','herself','itself','ourselves','yourselves','themselves','one','someone','anyone','everyone','nobody','somebody','anybody','everybody','nothing','something','anything','everything']);
  const SUBJ_PRN = new Set(['i','we','you','he','she','they','it','one']);
  const BES      = new Set(['is','am','are','was','were','be','been','being']);
  const HAVES    = new Set(['have','has','had']);
  const MODALS   = new Set(['will','would','can','could','shall','should','may','might','must','ought']);
  const DOAUX    = new Set(['do','does','did']);
  const ALLAUX   = new Set([...BES,...HAVES,...MODALS,...DOAUX]);

  const IRREG_V3 = new Set([
    'written','taken','given','known','shown','grown','thrown','blown','flown','drawn',
    'driven','ridden','risen','fallen','stolen','frozen','spoken','broken','chosen','woken',
    'eaten','beaten','forgotten','gotten','hidden','forbidden','bitten','torn','worn','sworn',
    'built','bought','brought','caught','taught','thought','fought','sought','found','bound',
    'made','paid','said','laid','led','held','sold','told','felt','kept','left','met',
    'sent','spent','meant','dealt','heard','seen','been','done','gone','come','run',
    'won','sung','rung','swum','begun','drunk','shrunk','stung','stood','understood',
    'become','overcome','undergone','undertaken','withdrawn','gone','set','put','cut','let',
    'read','spread','shed','bid','cast','hit','hurt','burst','cost','quit','split',
  ]);

  const PRED_ADJS = new Set([
    'important','large','small','big','great','good','bad','high','low','long','short',
    'old','new','young','first','last','next','early','late','right','left','far','near',
    'hard','easy','free','full','true','false','real','wrong','clear','dark','light',
    'cold','hot','warm','cool','wet','dry','fast','slow','strong','weak','heavy','rich',
    'poor','deep','wide','thick','thin','round','flat','sharp','soft','loud','quiet',
    'happy','sad','angry','afraid','sorry','sure','ready','able','available','possible',
    'necessary','difficult','different','similar','common','special','natural','normal',
    'human','physical','mental','social','economic','political','cultural','scientific',
    'complex','simple','main','basic','central','local','national','international','global',
    'modern','ancient','original','final','general','specific','various','certain','entire',
    'major','minor','significant','interesting','useful','harmful','dangerous','healthy',
    'sick','alive','dead','open','closed','empty','present','absent','active','passive',
    'positive','negative','direct','indirect','formal','informal','private','public',
    'responsible','capable','aware','conscious','unconscious','effective','efficient',
    'dependent','independent','relevant','necessary','sufficient','appropriate','unique',
  ]);

  const MAIN_VERBS = new Set([
    'get','make','take','come','go','see','know','think','look','want','give','use',
    'find','tell','ask','work','seem','feel','try','leave','call','keep','let','begin',
    'show','hear','play','run','move','live','believe','hold','bring','happen','write',
    'provide','require','include','continue','set','learn','change','lead','understand',
    'follow','create','open','walk','win','offer','remember','consider','appear','buy',
    'wait','serve','die','send','expect','build','stay','fall','cut','reach','kill',
    'remain','suggest','raise','pass','sell','decide','return','explain','hope','carry',
    'develop','grow','control','break','receive','add','spend','produce','study','contain',
    'maintain','describe','protect','prevent','increase','decrease','improve','reduce',
    'affect','involve','allow','enable','cause','support','determine','represent','define',
    'measure','compare','analyze','observe','detect','connect','respond','depend','help',
    'contribute','operate','function','communicate','process','identify','indicate','form',
    'consist','result','occur','exist','vary','extend','apply','focus','refer','relate',
    'differ','divide','combine','replace','release','perform','achieve','obtain',
    'promote','generate','distribute','transfer','convert','regulate',
    'absorb','adapt','adjust','attach','attract','balance','block',
    'circulate','classify','collect','compete','complete','conduct',
    'confirm','consume','coordinate','cover','damage','deliver','demonstrate',
    'design','direct','discover','display','eliminate','establish','evaluate',
    'expand','expose','express','extract','fail','filter','flow','force',
    'handle','impact','initiate','interact','interpret','introduce','invest',
    'monitor','motivate','organize','overcome','participate','plan','predict',
    'present','react','realize','recognize','record','reflect','remove',
    'resist','reveal','select','separate','signal','store','strengthen',
    'structure','sustain','test','transform','transmit','trigger','update','validate',
  ]);

  const C = {
    verb: { text: 'text-primary',            badge: 'bg-primary/10 text-primary' },
    noun: { text: 'text-(--text-secondary)', badge: 'bg-primary/10 text-primary dark:text-primary' },
    mod:  { text: 'text-primary dark:text-primary', badge: 'bg-primary/10 text-primary dark:text-primary' },
    func: { text: 'text-(--text-muted)',     badge: 'bg-(--bg-secondary) text-(--text-muted)' },
    inf:  { text: 'text-primary/80',         badge: 'bg-primary/10 text-primary/80' },
  };

  const noun  = (reason: string): POSInfo => ({ label: 'Noun',    reason, color: C.noun.text, bg: C.noun.badge });
  const vrb   = (label: string, reason: string): POSInfo => ({ label, reason, color: C.verb.text, bg: C.verb.badge });
  const adj   = (reason: string): POSInfo => ({ label: 'Adj',     reason, color: C.mod.text,  bg: C.mod.badge  });
  const adv   = (reason: string): POSInfo => ({ label: 'Adv',     reason, color: C.mod.text,  bg: C.mod.badge  });
  const pron  = (label: string, reason: string): POSInfo => ({ label, reason, color: C.noun.text, bg: C.noun.badge });
  const prep  = (reason: string): POSInfo => ({ label: 'Prep',    reason, color: C.func.text, bg: C.func.badge });
  const det   = (reason: string): POSInfo => ({ label: 'Det',     reason, color: C.func.text, bg: C.func.badge });
  const conj  = (label: string, reason: string): POSInfo => ({ label, reason, color: C.func.text, bg: C.func.badge });
  const aux   = (label: string, reason: string): POSInfo => ({ label, reason, color: C.verb.text, bg: C.verb.badge });
  const toinf = (reason: string): POSInfo => ({ label: 'to-inf',  reason, color: C.inf.text,  bg: C.inf.badge  });

  const ADJ_SUFFIXES = ['ful','less','ous','ive','al','ible','able','ic','ish','ent','ant','ar','ular','ary','ory'];
  const hasAdjSuffix = (s: string) => ADJ_SUFFIXES.some(sx => s.endsWith(sx));

  // STEP 1: Function/closed-class words
  if (DETS.has(w)) return det(
    w === 'the'
      ? `"the" = definite article. Dipakai saat noun sudah dikenal atau spesifik. Contoh: "the brain" = otak tertentu yang kita bicarakan.`
      : (w === 'a' || w === 'an')
      ? `"${word}" = indefinite article. Dipakai saat noun disebutkan pertama kali. "a" → konsonan, "an" → vokal. Hanya untuk singular countable noun.`
      : `"${word}" = determiner. Menunjukkan kepemilikan, jumlah, atau referensi.`
  );

  if (MODALS.has(w)) return aux('Modal',
    `"${word}" = modal auxiliary. Wajib diikuti bare infinitive (V1). Makna: kemungkinan (may/might), kemampuan (can), saran (should), keharusan (must), masa depan (will), kondisional (would).`
  );

  if (BES.has(w)) return aux('BE',
    `"${word}" = BE verb. Fungsi: (1) S + BE + Adj/Noun, (2) Passive: S + BE + V3, (3) Progressive: S + BE + V-ing. Penyesuaian: am→I, is→he/she/it, are→we/you/they.`
  );

  if (HAVES.has(w)) return aux('Have',
    `"${word}" = auxiliary HAVE untuk Perfect Tense (have/has/had + V3). Present Perfect: aksi relevan sekarang. Past Perfect: selesai sebelum peristiwa past lain.`
  );

  if (DOAUX.has(w)) return aux('Do/Does/Did',
    `"${word}" = auxiliary DO. Fungsi: negatif (don't/doesn't), tanya (Do/Does?), emphasis. Setelah do/does/did, verb SELALU V1.`
  );

  if (w === 'not') return adv(
    `"not" = adverb of negation. Selalu setelah auxiliary: is not, do not, will not, cannot. Tanpa auxiliary, gunakan "do/does + not + V1".`
  );

  if (PRONOUNS.has(w)) {
    if (['myself','yourself','himself','herself','itself','ourselves','yourselves','themselves'].includes(w))
      return pron('Refl. Pron', `"${word}" = reflexive pronoun. Subjek dan objek merujuk orang yang sama (He hurt himself). Singular: -self, Plural: -selves.`);
    if (['who','whom','which','what','that'].includes(w))
      return pron('Rel. Pron', `"${word}" = relative pronoun. Memperkenalkan relative clause. Who/whom = orang, which = benda, that = orang/benda (informal).`);
    if (['someone','anyone','everyone','nobody','somebody','anybody','everybody','nothing','something','anything','everything'].includes(w))
      return pron('Indef. Pron', `"${word}" = indefinite pronoun. SELALU singular → is/has/V-s (Everyone IS ready).`);
    return pron('Pronoun', `"${word}" = pronoun. Subject: I/he/she/they. Object: me/him/her/them. Gantikan noun agar tidak berulang.`);
  }

  if (w === 'to') {
    const nextLooksVerb = !!next && !DETS.has(next) && !PRONOUNS.has(next) && !PREPS.has(next) && !ALLAUX.has(next) && !COORDS.has(next) && !SUBS.has(next) && /^[a-z]/.test(next);
    if (nextLooksVerb) return toinf(`"to" = infinitive marker. Diikuti V1 (bare infinitive). Fungsi: noun/objek, adjective (setelah noun), adverb tujuan.`);
    return prep(`"to" = preposition arah/tujuan, diikuti NOUN phrase. Bedakan: "to + verb" = infinitive, "to + noun" = preposition.`);
  }

  if (PREPS.has(w)) return prep(
    `"${word}" = preposition. Membentuk prepositional phrase dengan noun di belakangnya. Fungsi: adverb (menerangkan verb) atau adjective (menerangkan noun).`
  );

  if (COORDS.has(w)) return conj('Coord. Conj',
    `"${word}" = coordinating conjunction (FANBOYS). Menghubungkan dua elemen setara: noun+noun, verb+verb, atau independent clause+independent clause.`
  );

  if (SUBS.has(w)) return conj('Sub. Conj',
    `"${word}" = subordinating conjunction. Memperkenalkan dependent clause. Makna: waktu (when/while), syarat (if/unless), alasan (because/since), pertentangan (although/whereas).`
  );

  if (ADVCONJS.has(w)) return conj('Adv. Conj',
    `"${word}" = conjunctive adverb. Menghubungkan dua kalimat mandiri. Pertentangan (however), sebab-akibat (therefore), penambahan (furthermore). Format: Kalimat 1; HOWEVER, Kalimat 2.`
  );

  // STEP 2: Context/position rules
  if (PREPS.has(prev) && prev !== 'to') {
    if (w.endsWith('ing'))
      return vrb('Gerund', `"${word}" = GERUND (V-ing sebagai noun) setelah preposition "${prev}". Gerund satu-satunya verb form yang bisa setelah preposition.`);
    return noun(`"${word}" = noun dalam posisi object of preposition (setelah "${prev}"). Preposition HARUS diikuti noun phrase.`);
  }

  if (prev === 'to')
    return { label: 'V1 (inf)', reason: `"${word}" = verb dasar (V1) dalam to-infinitive. Setelah "to", verb WAJIB bentuk dasar — tanpa -s, -ed, -ing.`, color: C.inf.text, bg: C.inf.badge };

  if (BES.has(prev)) {
    if (w.endsWith('ing')) return vrb('V-ing (Prog)', `"${word}" = present participle setelah BE "${prev}" = PROGRESSIVE. Aksi sedang berlangsung pada titik waktu tertentu.`);
    if (w.endsWith('ed') || IRREG_V3.has(w)) return vrb('V3 (Passive)', `"${word}" = past participle setelah BE "${prev}" = PASSIVE VOICE. Subjek menerima aksi. Rumus: S + is/was + V3 (+ by + agent).`);
    if (PRED_ADJS.has(w) || hasAdjSuffix(w)) return adj(`"${word}" = PREDICATIVE ADJECTIVE setelah BE "${prev}". Menerangkan SUBJEK kalimat. Contoh: "The brain IS COMPLEX".`);
    return noun(`"${word}" = PREDICATE NOMINATIVE setelah BE "${prev}". Menyatakan identitas/klasifikasi subjek.`);
  }

  if (HAVES.has(prev)) {
    if (w.endsWith('ed') || IRREG_V3.has(w) || w.endsWith('en'))
      return vrb('V3 (Perfect)', `"${word}" = past participle setelah "${prev}" = PERFECT TENSE. Present Perfect (have/has + V3) atau Past Perfect (had + V3).`);
    return vrb('V3 (Perfect)', `"${word}" = past participle setelah "${prev}" = Perfect Tense. Gunakan V3 (bukan V1/V2) setelah have/has/had.`);
  }

  if (DOAUX.has(prev) || MODALS.has(prev))
    return vrb('V1 (bare)', `"${word}" = BARE infinitive setelah auxiliary "${prev}". Setelah semua modal dan do/does/did, verb WAJIB bentuk dasar.`);

  // STEP 3: After determiner
  if (DETS.has(prev)) {
    const nextIsFuncWord = !next || DETS.has(next) || ALLAUX.has(next) || COORDS.has(next) || PREPS.has(next);
    const looksAdj = hasAdjSuffix(w) || w.endsWith('ing') || w.endsWith('ed') || PRED_ADJS.has(w);
    if (looksAdj && !nextIsFuncWord) return adj(`"${word}" = ATTRIBUTIVE ADJECTIVE setelah determiner "${prev}". Menerangkan noun di kanannya.`);
    return noun(`"${word}" = HEAD NOUN dari noun phrase setelah determiner "${prev}". Inti dari noun phrase.`);
  }

  // STEP 4: After subject pronoun
  if (SUBJ_PRN.has(prev) && !ALLAUX.has(w)) {
    if (MAIN_VERBS.has(w)) return vrb('V1', `"${word}" = main verb (V1) Simple Present setelah "${prev}". I/We/You/They + V1.`);
    if ((w.endsWith('s') || w.endsWith('es')) && (prev === 'he' || prev === 'she' || prev === 'it'))
      return vrb('V1 (s/es)', `"${word}" = main verb (V1+s/es) Simple Present setelah "${prev}". He/She/It/Singular + V1+s/es.`);
  }

  // STEP 5: Suffix-based morphological analysis
  if (w.endsWith('ly') && w.length > 4 && !['early','only','family','likely','lonely','friendly','lovely','holy','lively','daily','weekly','monthly','yearly','manly','orderly','worldly','elderly','timely','deadly','cowardly','beastly'].includes(w))
    return adv(`"${word}" berakhiran -ly = ADVERB. Dibentuk dari Adj + -ly. Menerangkan: verb, adjective, adverb, atau seluruh kalimat.`);

  if (['tion','sion','ssion'].some(s => w.endsWith(s))) return noun(`"${word}" berakhiran -tion/-sion = NOUN abstrak. Dibentuk dari verb: inform→information, discuss→discussion.`);
  if (w.endsWith('ment')) return noun(`"${word}" berakhiran -ment = NOUN. Dibentuk dari verb: develop→development, achieve→achievement.`);
  if (w.endsWith('ness')) return noun(`"${word}" berakhiran -ness = NOUN abstrak. Dibentuk dari adjective: dark→darkness, aware→awareness.`);
  if (w.endsWith('ity') || w.endsWith('ety')) return noun(`"${word}" berakhiran -ity/-ety = NOUN abstrak. Dibentuk dari adjective: complex→complexity, active→activity.`);
  if (w.endsWith('ance') || w.endsWith('ence')) return noun(`"${word}" berakhiran -ance/-ence = NOUN. Contoh: import→importance, differ→difference, exist→existence.`);
  if (w.endsWith('ism') || w.endsWith('ist')) return noun(`"${word}" berakhiran -ism/-ist = NOUN. -ism: paham/ideologi, -ist: pelaku. Contoh: organism, scientist.`);
  if (w.endsWith('ship') || w.endsWith('hood') || w.endsWith('dom')) return noun(`"${word}" berakhiran -ship/-hood/-dom = NOUN. Status, kondisi, wilayah. Contoh: friendship, childhood, freedom.`);
  if (w.endsWith('er') && w.length > 4 && !hasAdjSuffix(w.slice(0,-2))) return noun(`"${word}" berakhiran -er = NOUN (agent noun). Dibentuk dari verb: teach→teacher, work→worker.`);

  if (hasAdjSuffix(w)) return adj(`"${word}" memiliki ADJECTIVE SUFFIX. Contoh: -ful, -less, -ous, -ive, -al, -able/-ible, -ent/-ant, -ic. Fungsi: menerangkan noun.`);
  if (PRED_ADJS.has(w)) return adj(`"${word}" = ADJECTIVE. Dua posisi: attributive (sebelum noun: "a LARGE brain") atau predicative (setelah BE: "The brain IS LARGE").`);

  if (w.endsWith('ing') && w.length > 4)
    return vrb('V-ing/Gerund', `"${word}" berakhiran -ing. Tiga kemungkinan: (1) Gerund (V sebagai noun): "LEARNING is important", (2) Participial Adj (sebelum noun), (3) Progressive (setelah BE).`);

  if (w.endsWith('ed') && w.length > 3) {
    if (DETS.has(prev) || hasAdjSuffix(prev) || PRED_ADJS.has(prev))
      return adj(`"${word}" = PARTICIPIAL ADJECTIVE (V3/-ed sebagai adjective). Menyatakan keadaan/sifat. Contoh: "a COMPLICATED problem", "a DEVELOPED country".`);
    return vrb('V2/V3', `"${word}" berakhiran -ed. Kemungkinan: V2 (Simple Past) atau V3 (Passive/Perfect). Lihat kata sebelumnya untuk memastikan.`);
  }

  if ((w.endsWith('s') || w.endsWith('es')) && w.length > 3 && !w.endsWith('ss')) {
    const prevIsNounLike = prev.length > 1 && !ALLAUX.has(prev) && !DETS.has(prev) && !PREPS.has(prev) && !COORDS.has(prev);
    if (prevIsNounLike) return vrb('V1 (s/es)', `"${word}" kemungkinan MAIN VERB (V1+s/es) Simple Present. Subjek he/she/it/singular noun. Contoh: "The brain CONTROLS", "Blood CARRIES".`);
  }

  if (MAIN_VERBS.has(w)) return vrb('V1', `"${word}" = main verb (V1, bentuk dasar). Predikat utama dalam Simple Present (I/We/You/They + V1) atau Imperative.`);

  // STEP 6: Default fallback
  return noun(`"${word}" kemungkinan NOUN. Verifikasi: (1) Bisa didahului "the"? (2) Bisa jadi subjek/objek? (3) Bisa dibuat plural? (4) Bisa didahului adjective?`);
}
