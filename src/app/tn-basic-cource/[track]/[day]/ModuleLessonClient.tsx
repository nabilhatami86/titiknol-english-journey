'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Circle, BookText, Languages, X, XCircle, Lightbulb, Volume2, MessageCircle, Headphones, Eye, EyeOff, Braces } from 'lucide-react';
import type { ModuleLesson } from '@/types/module';
import { cn } from '@/lib/utils';
import TTSPlayer from '@/components/tts/TTSPlayer';
import AnnotatedText from '@/components/grammar/AnnotatedText';
import DayNavigation from '@/components/DayNavigation';
import ListeningAudioSection from '@/components/listening/ListeningAudioSection';
import { LessonVocabCard } from '@/components/LessonVocabCard';
import { GrammarPassageCard } from '@/components/GrammarPassageCard';
import { GrammarIntroCard } from '@/components/GrammarIntroCard';
import { ComparisonAltsCard } from '@/components/ComparisonAltsCard';

interface TranslationResult {
  translated: string;
  alternatives?: string[];
  context?: string;
  partOfSpeech?: string;
  ipa?: string;
  definition?: string;
  example?: string;
}

interface Props {
  lesson: ModuleLesson;
  backHref?: string;
  backLabel?: string;
  prevHref?: string;
  prevLabel?: string;
  prevTitle?: string;
  nextHref?: string;
  nextLabel?: string;
  nextTitle?: string;
}

// ── Suffix morphology hint (module-level pure function) ───────────────────────
type SuffixHint = { stem: string; suffix: string; deco: string };
function getSuffixHint(token: string): SuffixHint | null {
  const w = token.toLowerCase();
  // [suffix, tailwind decoration-color class]  — urutan penting: cek suffix panjang dulu
  const checks: Array<[string, string]> = [
    // Noun suffixes → slate
    ['tion',  'decoration-slate-400 dark:decoration-slate-500'],
    ['sion',  'decoration-slate-400 dark:decoration-slate-500'],
    ['ness',  'decoration-slate-400 dark:decoration-slate-500'],
    ['ment',  'decoration-slate-400 dark:decoration-slate-500'],
    ['ance',  'decoration-slate-400 dark:decoration-slate-500'],
    ['ence',  'decoration-slate-400 dark:decoration-slate-500'],
    ['ity',   'decoration-slate-400 dark:decoration-slate-500'],
    ['ety',   'decoration-slate-400 dark:decoration-slate-500'],
    ['ism',   'decoration-slate-400 dark:decoration-slate-500'],
    ['ist',   'decoration-slate-400 dark:decoration-slate-500'],
    ['ship',  'decoration-slate-400 dark:decoration-slate-500'],
    ['hood',  'decoration-slate-400 dark:decoration-slate-500'],
    ['dom',   'decoration-slate-400 dark:decoration-slate-500'],
    // Adjective suffixes → indigo
    ['ible',  'decoration-indigo-400 dark:decoration-indigo-500'],
    ['able',  'decoration-indigo-400 dark:decoration-indigo-500'],
    ['ful',   'decoration-indigo-400 dark:decoration-indigo-500'],
    ['less',  'decoration-indigo-400 dark:decoration-indigo-500'],
    ['ous',   'decoration-indigo-400 dark:decoration-indigo-500'],
    ['ive',   'decoration-indigo-400 dark:decoration-indigo-500'],
    ['ish',   'decoration-indigo-400 dark:decoration-indigo-500'],
    ['ent',   'decoration-indigo-400 dark:decoration-indigo-500'],
    ['ant',   'decoration-indigo-400 dark:decoration-indigo-500'],
    ['ary',   'decoration-indigo-400 dark:decoration-indigo-500'],
    ['ory',   'decoration-indigo-400 dark:decoration-indigo-500'],
    ['ic',    'decoration-indigo-400 dark:decoration-indigo-500'],
    ['al',    'decoration-indigo-400 dark:decoration-indigo-500'],
    ['ar',    'decoration-indigo-400 dark:decoration-indigo-500'],
    // Adverb suffix → indigo muda (beda kelompok tapi sesama modifier)
    ['ly',    'decoration-indigo-300 dark:decoration-indigo-400'],
    // Verb suffixes → primary
    ['ing',   'decoration-primary/70'],
    ['ed',    'decoration-primary/70'],
    // Agent noun -er → slate
    ['er',    'decoration-slate-400 dark:decoration-slate-500'],
    // Plural / V1 s/es → primary muted
    ['es',    'decoration-primary/50'],
    ['s',     'decoration-primary/50'],
  ];
  for (const [sfx, deco] of checks) {
    const minStem = sfx.length === 1 ? 3 : 2; // stem minimal agar tidak underline kata pendek
    if (w.endsWith(sfx) && token.length - sfx.length >= minStem) {
      return {
        stem:   token.slice(0, token.length - sfx.length),
        suffix: token.slice(token.length - sfx.length),
        deco,
      };
    }
  }
  return null;
}

export default function ModuleLessonClient({ lesson, backHref = '/tn-basic-cource', backLabel = 'Back to TN Basic Cource', prevHref, prevLabel, prevTitle, nextHref, nextLabel, nextTitle }: Props) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(new Set());
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [translation, setTranslation] = useState<TranslationResult | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState<string>('');
  const [translationCache, setTranslationCache] = useState<Record<string, TranslationResult>>({});
  const [blockText, setBlockText] = useState<string>('');
  const [blankAnswers, setBlankAnswers] = useState<Record<string, string>>({});
  const [blankChecked, setBlankChecked] = useState<Record<string, boolean>>({});
  const [showTranslation, setShowTranslation] = useState(false);
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, boolean>>({});
  const [showGrammarMode, setShowGrammarMode] = useState(false);
  const [grammarPopup, setGrammarPopup] = useState<{ word: string; label: string; reason: string; color: string; bg: string } | null>(null);
  const [showQuizGame, setShowQuizGame] = useState(false);
  const quizGameRef = useRef<HTMLDivElement>(null);

  const completedCount = useMemo(
    () =>
      lesson.exercises.filter((exercise) => {
        if (exercise.type === 'multiple-choice') return Boolean(selectedOptions[exercise.id]);
        return Boolean(notes[exercise.id]?.trim());
      }).length,
    [lesson.exercises, notes, selectedOptions]
  );

  const tokenize = useCallback((text: string) => text.split(/(\s+|[^A-Za-z'-]+)/g).filter((p) => p !== ''), []);

  // Contextual glossary for education/lesson terms that get mistranslated without context

  const speakWord = useCallback((word: string) => {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(word);
    u.lang = 'en-US';
    u.rate = 0.85;
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Samantha') || v.name.includes('Google') || v.name.includes('Natural')));
    if (preferred) u.voice = preferred;
    window.speechSynthesis.speak(u);
  }, []);

  const handlePassageMouseUp = useCallback(async () => {
    const sel = window.getSelection();
    const text = sel?.toString().trim().replace(/\s+/g, ' ');
    if (!text || text.split(/\s+/).length < 2) return;

    const displayText = text.length > 50 ? text.slice(0, 50) + '…' : text;
    setSelectedWord(displayText);
    setBlockText(text);
    setTranslationError('');

    if (translationCache[text]) {
      setTranslation(translationCache[text]);
      return;
    }

    setIsTranslating(true);
    setTranslation(null);

    try {
      const res = await fetch(`/api/translate?text=${encodeURIComponent(text)}`);
      const data = await res.json();
      if (!data.translated) throw new Error('no translation');
      const result: TranslationResult = { translated: data.translated };
      setTranslation(result);
      setTranslationCache((prev) => ({ ...prev, [text]: result }));
    } catch {
      setTranslationError('Terjemahan gagal dimuat.');
    } finally {
      setIsTranslating(false);
    }
  }, [translationCache]);

  const translateWord = useCallback(async (word: string) => {
    const cleaned = word.toLowerCase().replace(/^'+|'+$/g, '');
    if (!cleaned) return;

    setBlockText('');
    setSelectedWord(cleaned);
    setTranslationError('');

    if (translationCache[cleaned]) {
      setTranslation(translationCache[cleaned]);
      return;
    }

    setIsTranslating(true);
    setTranslation(null);

    try {
      const res = await fetch(`/api/translate?word=${encodeURIComponent(cleaned)}`);
      const data = await res.json();

      if (res.status === 404 || data.error === 'not_found') {
        const result: TranslationResult = { translated: 'Tidak ditemukan' };
        setTranslation(result);
        setTranslationCache((prev) => ({ ...prev, [cleaned]: result }));
        return;
      }

      if (!res.ok || data.error) throw new Error(data.message || 'translate api failed');

      const result: TranslationResult = {
        translated: data.translated,
        partOfSpeech: data.partOfSpeech || '',
        ipa: data.ipa || '',
        definition: data.definition || '',
        example: data.example || '',
        alternatives: data.alternatives || [],
      };
      setTranslation(result);
      setTranslationCache((prev) => ({ ...prev, [cleaned]: result }));
    } catch {
      setTranslationError('Terjemahan gagal dimuat. Coba klik ulang.');
    } finally {
      setIsTranslating(false);
    }
  }, [translationCache]);

  const renderClickableText = useCallback((text: string, showSuffixHints = false) => {
    const parts = tokenize(text);
    return parts.map((part, idx) => {
      const isWord = /^[A-Za-z][A-Za-z'-]*$/.test(part);
      if (!isWord) return <span key={`t-${idx}`}>{part}</span>;

      const cleaned = part.toLowerCase().replace(/^'+|'+$/g, '');
      const isActive = selectedWord === cleaned;
      const hint = showSuffixHints ? getSuffixHint(part) : null;

      return (
        <button
          key={`w-${idx}`}
          type="button"
          onClick={() => translateWord(part)}
          className={cn(
            'rounded px-0.5 transition-colors',
            isActive
              ? 'bg-primary/15 text-primary'
              : 'hover:bg-primary/10 hover:text-primary'
          )}
        >
          {hint ? (
            <>
              {hint.stem}
              <span className={cn('underline underline-offset-[3px] decoration-2', hint.deco)}>
                {hint.suffix}
              </span>
            </>
          ) : part}
        </button>
      );
    });
  }, [selectedWord, tokenize, translateWord]);

  // Render text with {{annotation:word|label}} markers showing label underneath

  // ── Grammar Mode: Part-of-Speech detection ────────────────────────────────────
  type POSInfo = { label: string; reason: string; color: string; bg: string };

  const analyzePOS = useCallback((word: string, prevWord: string, nextWord: string): POSInfo => {
    const w = word.toLowerCase();
    const prev = prevWord.toLowerCase();
    const next = nextWord.toLowerCase();

    // ── Closed-class word sets ─────────────────────────────────────────────
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

    // Common irregular past participles (V3) — untuk deteksi passive setelah BE
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

    // Common predicative adjectives — sering muncul setelah BE (is/are/was/were)
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

    // Common main verbs (V1 base) — untuk deteksi verb dalam pola S + V
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
      'differ','divide','combine','replace','release','receive','perform','achieve','obtain',
      'promote','generate','produce','distribute','transfer','convert','regulate','control',
      'absorb','adapt','adjust','affect','attach','attract','balance','block','carry',
      'circulate','classify','collect','communicate','compare','compete','complete','conduct',
      'confirm','consume','coordinate','cover','damage','deliver','demonstrate','depend',
      'design','develop','direct','discover','display','distribute','eliminate','enable',
      'establish','evaluate','expand','explain','expose','express','extend','extract','fail',
      'filter','flow','focus','force','form','generate','handle','identify','impact','improve',
      'initiate','interact','interpret','introduce','invest','involve','maintain','manage',
      'monitor','motivate','obtain','organize','overcome','participate','plan','predict',
      'present','prevent','process','protect','provide','react','realize','recognize','record',
      'reduce','reflect','relate','release','remove','replace','require','resist','respond',
      'reveal','select','separate','serve','signal','store','strengthen','structure','support',
      'sustain','test','transfer','transform','transmit','trigger','update','validate',
    ]);

    // ── Color palette ──────────────────────────────────────────────────────
    const C = {
      verb: { text: 'text-primary',                              badge: 'bg-primary/10 text-primary' },
      noun: { text: 'text-(--text-secondary)',                   badge: 'bg-slate-500/10 text-slate-500 dark:text-slate-400' },
      mod:  { text: 'text-indigo-500 dark:text-indigo-400',      badge: 'bg-indigo-500/10 text-indigo-500 dark:text-indigo-400' },
      func: { text: 'text-(--text-muted)',                       badge: 'bg-(--bg-secondary) text-(--text-muted)' },
      inf:  { text: 'text-primary/80',                           badge: 'bg-primary/8 text-primary/80' },
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

    // ══════════════════════════════════════════════════════════════════════
    // STEP 1 — Function / closed-class words (urutan ini kritis!)
    // ══════════════════════════════════════════════════════════════════════

    // Articles & Determiners
    if (DETS.has(w)) return det(
      w === 'the'
        ? `"the" = definite article (kata sandang tertentu). Dipakai saat noun sudah dikenal atau spesifik bagi pembicara & pendengar. Contoh: "the brain" = otak tertentu yang kita bicarakan. Selalu menunjuk sesuatu yang SUDAH DIKETAHUI.`
        : (w === 'a' || w === 'an')
        ? `"${word}" = indefinite article (kata sandang tak tentu). Dipakai saat noun disebutkan pertama kali atau belum spesifik. "a" → sebelum bunyi konsonan (a book), "an" → sebelum bunyi vokal (an apple). Hanya untuk singular countable noun.`
        : `"${word}" = determiner. Mendahului noun untuk menunjukkan: kepemilikan (my/your/his/her/its/our/their), jumlah (some/any/many/few/both/several), atau referensi (this/that/these/those = deiktik — menunjuk sesuatu).`
    );

    // Modal auxiliaries — cek sebelum MAIN_VERBS karena "will/can/may" bukan verb utama
    if (MODALS.has(w)) return aux('Modal',
      `"${word}" = modal auxiliary verb. ATURAN KUNCI: Modal WAJIB diikuti BARE infinitive (V1 tanpa -s/-ed/-ing). Makna: kemungkinan objektif (may/might), kemampuan (can/could), anjuran/saran (should/ought to), keharusan (must), kepastian masa depan (will), atau kondisional (would).`
    );

    // BE verbs
    if (BES.has(w)) return aux('BE',
      `"${word}" = BE verb. Tiga fungsi: (1) NON-VERBAL predicate → S + BE + Adj/Noun (The body IS complex), (2) PASSIVE voice → S + BE + V3 (Oxygen IS carried by blood), (3) PROGRESSIVE → S + BE + V-ing (She IS learning). Penyesuaian: am→I, is→he/she/it/singular, are→we/you/they/plural.`
    );

    // HAVE verbs
    if (HAVES.has(w)) return aux('Have',
      `"${word}" = auxiliary HAVE untuk Perfect Tense (have/has/had + V3). Present Perfect: aksi sudah selesai tapi masih relevan sekarang ("She has studied"). Past Perfect: aksi selesai sebelum peristiwa past lain ("He had eaten before she arrived"). Juga bisa main verb = "memiliki" (I have a car).`
    );

    // DO auxiliaries
    if (DOAUX.has(w)) return aux('Do/Does/Did',
      `"${word}" = auxiliary DO (do-support). Fungsi: (1) Negatif: S + don't/doesn't + V1, (2) Tanya: Do/Does + S + V1?, (3) Emphasis: "I DO understand!" Do → I/we/you/they, Does → he/she/it (present), Did → semua subjek (past). Setelah do/does/did, verb SELALU V1.`
    );

    // "not" / negation adverb
    if (w === 'not') return adv(
      `"not" = adverb of negation (penyangkal). Selalu diletakkan setelah auxiliary verb untuk membuat kalimat negatif: is not, are not, do not, does not, will not (won't), cannot (can't), dll. Tanpa auxiliary, gunakan "do/does + not + V1".`
    );

    // Pronouns
    if (PRONOUNS.has(w)) {
      if (['myself','yourself','himself','herself','itself','ourselves','yourselves','themselves'].includes(w))
        return pron('Refl. Pron',
          `"${word}" = reflexive pronoun. Dipakai saat subjek dan objek merujuk ORANG YANG SAMA (He hurt himself). Juga untuk emphasis — menegaskan bahwa subjek melakukannya sendiri (I fixed it myself). Singular: -self, Plural: -selves.`
        );
      if (['who','whom','which','what','that'].includes(w))
        return pron('Rel. Pron',
          `"${word}" = relative pronoun yang memperkenalkan RELATIVE CLAUSE (adjective clause). Fungsi: menerangkan noun sebelumnya. Who/whom = orang (The teacher WHO explains), which = benda (the book WHICH I read), that = orang/benda (informal). Relative clause = klausa yang berfungsi sebagai adjective.`
        );
      if (['someone','anyone','everyone','nobody','somebody','anybody','everybody','nothing','something','anything','everything'].includes(w))
        return pron('Indef. Pron',
          `"${word}" = indefinite pronoun — merujuk orang/benda yang tidak spesifik atau tidak dikenal. SELALU dianggap SINGULAR → diikuti is/has/V-s (Everyone IS ready, Nothing HAS changed). Jangan gunakan are/have setelah kata ini.`
        );
      return pron('Pronoun',
        `"${word}" = pronoun (kata ganti noun). Kasus: SUBJECT (I/he/she/they/we/you/it) = posisi sebelum verb, OBJECT (me/him/her/them/us/you/it) = posisi setelah verb/preposition. Gantikan noun agar kalimat tidak berulang.`
      );
    }

    // "to" — infinitive marker vs. preposition
    if (w === 'to') {
      const nextLooksVerb = !!next && !DETS.has(next) && !PRONOUNS.has(next) && !PREPS.has(next) && !ALLAUX.has(next) && !COORDS.has(next) && !SUBS.has(next) && /^[a-z]/.test(next);
      if (nextLooksVerb) return toinf(
        `"to" = infinitive marker (penanda to-infinitive). Diikuti V1 (bare infinitive — TIDAK boleh -s/-ed/-ing). Fungsi to-infinitive: (1) Noun/Objek: "I want TO LEARN", (2) Adjective (menerangkan noun): "a book TO READ", (3) Adverb tujuan: "She studies TO PASS". BUKAN preposition!`
      );
      return prep(
        `"to" = preposition arah/tujuan, diikuti NOUN phrase. Contoh: "She goes TO school" (to + noun). Bedakan: "to + verb" = infinitive marker, "to + noun" = preposition. Cara cepat: coba ganti dengan "toward/towards" — kalau masuk arti, ini preposition.`
      );
    }

    // Other prepositions
    if (PREPS.has(w)) return prep(
      `"${word}" = preposition (kata depan). Selalu membentuk PREPOSITIONAL PHRASE bersama noun phrase di belakangnya (object of preposition). Fungsi prepositional phrase: (1) Adverb — menerangkan verb (She works IN the morning), (2) Adjective — menerangkan noun (the door OF the room). Ingat: preposition TIDAK boleh diikuti langsung verb bentuk dasar.`
    );

    // Coordinating conjunctions
    if (COORDS.has(w)) return conj('Coord. Conj',
      `"${word}" = coordinating conjunction (FANBOYS: For, And, Nor, But, Or, Yet, So). Menghubungkan dua elemen SETARA/PARALEL: noun + noun, verb + verb, adj + adj, atau independent clause + independent clause. Selalu di tengah, tidak di awal kalimat (kecuali informal).`
    );
    // Subordinating conjunctions
    if (SUBS.has(w)) return conj('Sub. Conj',
      `"${word}" = subordinating conjunction. Memperkenalkan DEPENDENT CLAUSE (anak kalimat) yang tidak bisa berdiri sendiri. Pola: [Sub.Conj + S + V], Main S + V — atau — Main S + V [Sub.Conj + S + V]. Makna beragam: waktu (when/while/after), syarat (if/unless), alasan (because/since), pertentangan (although/though/whereas).`
    );
    // Conjunctive adverbs
    if (ADVCONJS.has(w)) return conj('Adv. Conj',
      `"${word}" = conjunctive adverb. Menghubungkan dua KALIMAT MANDIRI (independent clauses) dengan makna logis: pertentangan (however/nevertheless), sebab-akibat (therefore/consequently/thus/hence), penambahan (furthermore/moreover/besides), urutan (subsequently/meanwhile). Format: Kalimat 1; HOWEVER, Kalimat 2.`
    );

    // ══════════════════════════════════════════════════════════════════════
    // STEP 2 — Context/position rules (sangat akurat karena lihat sekitar)
    // ══════════════════════════════════════════════════════════════════════

    // Setelah preposition (bukan "to") → Noun atau Gerund
    if (PREPS.has(prev) && prev !== 'to') {
      if (w.endsWith('ing'))
        return vrb('Gerund',
          `"${word}" = GERUND (verb + -ing yang berfungsi sebagai noun) sebagai object of preposition "${prev}". Gerund adalah satu-satunya verb form yang bisa mengisi posisi noun setelah preposition. Contoh: "by LEARNING", "in DEVELOPING", "for UNDERSTANDING". BUKAN progressive karena tidak ada BE sebelumnya.`
        );
      return noun(
        `"${word}" = noun dalam posisi OBJECT OF PREPOSITION (setelah "${prev}"). Aturan wajib bahasa Inggris: preposition HARUS diikuti noun phrase. Prepositional phrase ini berfungsi sebagai adverb (menerangkan verb) atau adjective (menerangkan noun).`
      );
    }

    // Setelah "to" → V1 (bare infinitive)
    if (prev === 'to')
      return { label: 'V1 (inf)', reason: `"${word}" = verb dasar (V1/bare infinitive) dalam to-infinitive. Setelah "to", verb WAJIB dalam bentuk dasar — tanpa -s, -ed, maupun -ing. Fungsi to-infinitive ditentukan posisinya dalam kalimat: sebelum verb = subjek, setelah verb/modal = objek, setelah noun = adjective, setelah adjective/adverb = adverb tujuan.`, color: C.inf.text, bg: C.inf.badge };

    // Setelah BE → Progressive / Passive / Predicative Adj / Predicate Nominative
    if (BES.has(prev)) {
      if (w.endsWith('ing'))
        return vrb('V-ing (Prog)',
          `"${word}" = present participle (V-ing) setelah BE "${prev}" = PROGRESSIVE tense. Menyatakan aksi yang SEDANG berlangsung pada titik waktu tertentu. Present Progressive (is/am/are + V-ing): aksi sedang terjadi sekarang. Past Progressive (was/were + V-ing): aksi sedang berlangsung di masa lalu.`
        );
      if (w.endsWith('ed') || IRREG_V3.has(w))
        return vrb('V3 (Passive)',
          `"${word}" = past participle (V3) setelah BE "${prev}" = PASSIVE VOICE. Passive: subjek MENERIMA/DIKENAI aksi, bukan melakukan. Rumus: S + is/am/are/was/were + V3 (+ by + agent). Contoh aktif→pasif: "Blood carries oxygen" → "Oxygen IS CARRIED by blood."`
        );
      // Predicative adjective (setelah BE, bukan V3)
      if (PRED_ADJS.has(w) || hasAdjSuffix(w))
        return adj(
          `"${word}" = PREDICATIVE ADJECTIVE setelah BE "${prev}". Berbeda dengan attributive adjective (sebelum noun), predicative adjective berada SETELAH BE dan menerangkan SUBJEK kalimat. Contoh: "The brain IS COMPLEX" — complex menerangkan "brain". Pola: S + BE + Pred.Adj.`
        );
      // Predicate nominative (noun setelah BE)
      return noun(
        `"${word}" = PREDICATE NOMINATIVE (noun setelah BE "${prev}"). Menyatakan identitas atau klasifikasi subjek. Contoh: "She IS a doctor" — doctor menjelaskan identitas "she". Bedakan: jika kata ini bisa jadi adjective, lihat apakah ada noun setelahnya atau tidak.`
      );
    }

    // Setelah HAVE → V3 (Perfect)
    if (HAVES.has(prev)) {
      if (w.endsWith('ed') || IRREG_V3.has(w) || w.endsWith('en'))
        return vrb('V3 (Perfect)',
          `"${word}" = past participle (V3) setelah "${prev}" = PERFECT TENSE. Present Perfect (have/has + V3): aksi sudah selesai namun masih relevan dengan masa kini. Past Perfect (had + V3): aksi selesai SEBELUM peristiwa past lain. V3 regular: + -ed. V3 irregular: berubah bentuk (see→seen, write→written, take→taken).`
        );
      return vrb('V3 (Perfect)',
        `"${word}" = past participle (V3) setelah "${prev}" = Perfect Tense. Selalu gunakan V3 (bukan V1/V2) setelah have/has/had.`
      );
    }

    // Setelah DO-auxiliary atau Modal → V1 (bare)
    if (DOAUX.has(prev) || MODALS.has(prev))
      return vrb('V1 (bare)',
        `"${word}" = BARE infinitive (V1 tanpa -s/-ed/-ing) setelah auxiliary "${prev}". Aturan ketat: setelah SEMUA modal (will/can/should/must/would/may/might) dan do/does/did, verb WAJIB dalam bentuk dasar. Kesalahan umum: *"he can goes" (salah) → "he can GO" (benar).`
      );

    // ══════════════════════════════════════════════════════════════════════
    // STEP 3 — After determiner: Adj (attributive) atau Noun (head)
    // ══════════════════════════════════════════════════════════════════════
    if (DETS.has(prev)) {
      // Jika ada next word yang bukan function word → kemungkinan ini attributive adjective
      const nextIsFuncWord = !next || DETS.has(next) || ALLAUX.has(next) || COORDS.has(next) || PREPS.has(next);
      const looksAdj = hasAdjSuffix(w) || w.endsWith('ing') || w.endsWith('ed') || PRED_ADJS.has(w);
      if (looksAdj && !nextIsFuncWord)
        return adj(
          `"${word}" = ATTRIBUTIVE ADJECTIVE (setelah determiner "${prev}", sebelum noun yang mengikutinya). Posisi pre-nominal: adjective menerangkan noun di kanannya. Contoh: "the LARGE brain", "a NATURAL process", "the IMPORTANT function". Bedakan dengan predicate adjective yang berada setelah BE.`
        );
      return noun(
        `"${word}" = HEAD NOUN dari noun phrase (setelah determiner/article "${prev}"). Determiner selalu mendahului noun — atau adj + noun. Kata ini adalah inti (head) dari noun phrase dan berfungsi sebagai subjek, objek, atau object of preposition.`
      );
    }

    // ══════════════════════════════════════════════════════════════════════
    // STEP 4 — After subject pronoun → main verb detection
    // ══════════════════════════════════════════════════════════════════════
    if (SUBJ_PRN.has(prev) && !ALLAUX.has(w)) {
      if (MAIN_VERBS.has(w))
        return vrb('V1',
          `"${word}" = main verb (V1) dalam Simple Present Tense setelah subjek "${prev}". I/We/You/They + V1 (tanpa -s). Menyatakan fakta, kebiasaan, atau keadaan yang bersifat umum/tetap.`
        );
      if ((w.endsWith('s') || w.endsWith('es')) && (prev === 'he' || prev === 'she' || prev === 'it'))
        return vrb('V1 (s/es)',
          `"${word}" = main verb (V1 + s/es) dalam Simple Present Tense setelah "${prev}". Aturan WAJIB: He/She/It/Singular noun + V1+s/es. Contoh: he RUNS, she TEACHES, it CONTAINS. Lupa -s adalah kesalahan paling umum di Simple Present.`
        );
    }

    // ══════════════════════════════════════════════════════════════════════
    // STEP 5 — Suffix-based morphological analysis
    // ══════════════════════════════════════════════════════════════════════

    // Adverb — akhiran -ly
    if (w.endsWith('ly') && w.length > 4 && !['early','only','family','likely','lonely','friendly','lovely','holy','lively','daily','weekly','monthly','yearly','manly','orderly','worldly','elderly','timely','deadly','cowardly','beastly'].includes(w))
      return adv(
        `"${word}" berakhiran -ly = ADVERB (kata keterangan). Dibentuk dari Adj + -ly: slow→slowly, careful→carefully, gradual→gradually, rapid→rapidly. Fungsi: menerangkan (1) verb: "runs QUICKLY", (2) adjective: "EXTREMELY important", (3) adverb lain: "VERY rapidly", (4) seluruh kalimat: "GENERALLY, the body...".`
      );

    // Noun suffixes
    if (['tion','sion','ssion'].some(s => w.endsWith(s)))
      return noun(`"${word}" berakhiran -tion/-sion = NOUN abstrak. Dibentuk dari verb + -tion/-sion: inform→information, tense→tension, discuss→discussion. Selalu singular kecuali ada -s di ujung. Bisa jadi objek, subjek, atau object of preposition.`);
    if (w.endsWith('ment'))
      return noun(`"${word}" berakhiran -ment = NOUN. Dibentuk dari verb + -ment: develop→development, move→movement, achieve→achievement. Menyatakan proses atau hasil dari suatu tindakan.`);
    if (w.endsWith('ness'))
      return noun(`"${word}" berakhiran -ness = NOUN abstrak. Dibentuk dari adjective + -ness: dark→darkness, happy→happiness, aware→awareness. Menyatakan kualitas atau keadaan.`);
    if (w.endsWith('ity') || w.endsWith('ety'))
      return noun(`"${word}" berakhiran -ity/-ety = NOUN abstrak. Dibentuk dari adjective + -ity: complex→complexity, active→activity, various→variety. Menyatakan kualitas dalam bentuk noun.`);
    if (w.endsWith('ance') || w.endsWith('ence'))
      return noun(`"${word}" berakhiran -ance/-ence = NOUN. Contoh: import→importance, differ→difference, exist→existence, perform→performance. Menyatakan kualitas, keadaan, atau proses.`);
    if (w.endsWith('ism') || w.endsWith('ist'))
      return noun(`"${word}" berakhiran -ism/-ist = NOUN. -ism menyatakan paham/ideologi, -ist menyatakan pelaku atau penganut paham. Contoh: organism, scientist, specialist.`);
    if (w.endsWith('ship') || w.endsWith('hood') || w.endsWith('dom'))
      return noun(`"${word}" berakhiran -ship/-hood/-dom = NOUN. Menyatakan status, kondisi, atau wilayah. Contoh: friendship, childhood, freedom.`);
    if (w.endsWith('er') && w.length > 4 && !hasAdjSuffix(w.slice(0,-2)))
      return noun(`"${word}" berakhiran -er = NOUN (agent noun — orang/alat yang melakukan aksi). Dibentuk dari verb + -er: teach→teacher, work→worker, receive→receiver. Contoh: "The teacher explains" — teacher adalah pelaku mengajar.`);

    // Adjective suffixes
    if (hasAdjSuffix(w))
      return adj(
        `"${word}" memiliki ADJECTIVE SUFFIX — ciri morfologis adjective. Contoh: -ful (powerful, useful), -less (harmless, endless), -ous (dangerous, nervous), -ive (active, effective), -al (natural, central), -able/-ible (available, possible), -ent/-ant (important, significant), -ic (scientific, economic). Fungsi: menerangkan noun.`
      );

    // Common adjectives tanpa suffix khas — seperti large, small, big, old, new, human, dll.
    if (PRED_ADJS.has(w))
      return adj(
        `"${word}" = ADJECTIVE (kata sifat). Kata ini termasuk adjective umum bahasa Inggris meskipun tidak memiliki suffix khas adjective. Dua posisi adjective: (1) ATTRIBUTIVE — sebelum noun: "a LARGE brain", (2) PREDICATIVE — setelah BE: "The brain IS LARGE". Fungsi: menerangkan atau menggambarkan noun.`
      );

    // -ing (standalone, tanpa konteks aux sebelumnya)
    if (w.endsWith('ing') && w.length > 4)
      return vrb('V-ing/Gerund',
        `"${word}" berakhiran -ing tanpa auxiliary sebelumnya. Tiga kemungkinan — tentukan dari posisi: (1) GERUND (V sebagai noun): "LEARNING is important" / "by LEARNING", (2) PARTICIPIAL ADJECTIVE (sebelum noun): "an INTERESTING topic", (3) PROGRESSIVE (setelah BE, sudah dicek sebelumnya). Tips: kalau bisa diganti noun lain → gerund; kalau menerangkan noun → participial adj.`
      );

    // -ed (standalone)
    if (w.endsWith('ed') && w.length > 3) {
      if (DETS.has(prev) || hasAdjSuffix(prev) || PRED_ADJS.has(prev))
        return adj(
          `"${word}" = PARTICIPIAL ADJECTIVE (V3/-ed yang berfungsi sebagai adjective). Setelah determiner atau sebelum noun, V3-ed kehilangan makna aksi dan berubah jadi penggambaran KEADAAN/SIFAT. Contoh: "a COMPLICATED problem", "the DAMAGED tissue", "a DEVELOPED country". Tidak menyatakan aksi, melainkan keadaan permanen.`
        );
      return vrb('V2/V3',
        `"${word}" berakhiran -ed. Kemungkinan: (1) V2 (Simple Past, tanpa auxiliary): "She WORKED hard", (2) V3 dalam Passive (setelah BE: is/was + V3), (3) V3 dalam Perfect (setelah have/has/had + V3). Lihat kata SEBELUMNYA untuk memastikan: ada auxiliary? Jika tidak → V2 Simple Past.`
      );
    }

    // V1+s/es setelah singular noun/subject
    if ((w.endsWith('s') || w.endsWith('es')) && w.length > 3 && !w.endsWith('ss')) {
      const prevIsNounLike = prev.length > 1 && !ALLAUX.has(prev) && !DETS.has(prev) && !PREPS.has(prev) && !COORDS.has(prev);
      if (prevIsNounLike)
        return vrb('V1 (s/es)',
          `"${word}" kemungkinan MAIN VERB (V1+s/es) Simple Present — subjek he/she/it/singular noun. Aturan: singular subject (orang ketiga tunggal) + V1+s/es. Contoh: "The brain CONTROLS", "Blood CARRIES", "The system PROCESSES". Ini adalah tanda PALING KENTARA Simple Present untuk he/she/it.`
        );
    }

    // Known main verbs base form
    if (MAIN_VERBS.has(w))
      return vrb('V1',
        `"${word}" = main verb (V1, bentuk dasar). Sebagai predikat utama kalimat dalam Simple Present (I/We/You/They + V1) atau Imperative (perintah). Menyatakan aksi, proses, atau keadaan.`
      );

    // ══════════════════════════════════════════════════════════════════════
    // STEP 6 — Default fallback
    // ══════════════════════════════════════════════════════════════════════
    return noun(
      `"${word}" kemungkinan NOUN berdasarkan posisi dan bentuk. Cara memverifikasi: (1) Bisa didahului "the"? (2) Bisa jadi subjek/objek kalimat? (3) Bisa dibuat plural dengan -s? (4) Bisa didahului adjective? Jika ya untuk beberapa → noun. Jika tampak seperti verb dalam konteks → mungkin V1 yang belum terdeteksi.`
    );
  }, []);

  const renderGrammarPassage = useCallback((text: string) => {
    const allTokens = text.split(/(\s+|[^A-Za-z'-]+)/g).filter(t => t !== '');
    const wordTokens = allTokens.filter(t => /^[A-Za-z][A-Za-z'-]*$/.test(t));
    // Closed-class labels yang murni dari daftar kata, bukan suffix → tidak perlu suffix hint
    const FUNC_LABELS = new Set(['Det','Prep','Pronoun','Refl. Pron','Rel. Pron','Indef. Pron','Modal','BE','Have','Do/Does/Did','Coord. Conj','Sub. Conj','Adv. Conj','to-inf']);
    let wordIdx = 0;

    return allTokens.map((token, i) => {
      const isWord = /^[A-Za-z][A-Za-z'-]*$/.test(token);
      if (!isWord) return <span key={`gp-${i}`}>{token}</span>;

      const currentIdx = wordIdx++;
      const prevWord = wordTokens[currentIdx - 1] ?? '';
      const nextWord = wordTokens[currentIdx + 1] ?? '';
      const posInfo = analyzePOS(token, prevWord, nextWord);

      // Suffix underline hanya untuk open-class words
      const hint = FUNC_LABELS.has(posInfo.label) ? null : getSuffixHint(token);

      return (
        <button
          key={`gp-${i}`}
          type="button"
          onClick={() => setGrammarPopup({ word: token, ...posInfo })}
          className="inline-flex flex-col items-center mx-0.5 align-bottom cursor-pointer group"
        >
          <span className={cn('text-sm font-medium px-0.5 rounded group-hover:opacity-80', posInfo.color)}>
            {hint ? (
              <>
                {hint.stem}
                <span className={cn('underline underline-offset-[3px] decoration-2', hint.deco)}>
                  {hint.suffix}
                </span>
              </>
            ) : token}
          </span>
          <span className={cn('text-[8px] font-bold px-1 rounded leading-tight', posInfo.bg)}>
            {posInfo.label}
          </span>
        </button>
      );
    });
  }, [analyzePOS]);

  return (
    <div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-6 animate-fade-in" onMouseUp={handlePassageMouseUp} onTouchEnd={handlePassageMouseUp}>
      <div className="flex items-center justify-between">
        <Link href={backHref} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> {backLabel}
        </Link>
        <p className="text-sm text-(--text-secondary)">
          Progress: <span className="font-semibold text-(--text)">{completedCount}/{lesson.exercises.length}</span>
        </p>
      </div>

      <div className={cn(
        'border rounded-2xl p-6',
        lesson.day === 10
          ? 'bg-primary/5 border-primary/30'
          : 'bg-(--bg-card) border-(--border)'
      )}>
        <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">
          {lesson.day === 10 ? 'MIDDLE TEST' : `${lesson.track.toUpperCase()} • Day ${lesson.day}`}{lesson.tutor ? ` • ${lesson.tutor}` : ""}
        </p>
        <h1 className="text-2xl font-bold text-(--text)">{lesson.title}</h1>
        <p className="text-sm text-(--text-secondary) mt-1">{renderClickableText(lesson.subtitle)}</p>
        <p className="text-sm text-(--text-secondary) mt-4 leading-relaxed">{renderClickableText(lesson.overview)}</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-(--text) flex items-center gap-2">
          <BookText className="w-5 h-5 text-primary" /> Material
        </h2>
        {lesson.track === 'grammar' ? (
          <div className="space-y-5">
            {lesson.materialSections.map((section) => (
              <div key={section.title} className="bg-(--bg-card) border border-(--border) rounded-xl overflow-hidden">
                {/* Section header */}
                <div className="px-5 py-3 bg-primary/5 border-b border-(--border)">
                  <h3 className="font-semibold text-(--text) flex items-center gap-2">
                    {section.title}
                  </h3>
                </div>
                {/* Section content */}
                <div className="p-5">
                  {/grammar in the passage/i.test(section.title) || section.points.some(p => /^──.*──$/.test(p.trim())) ? (
                    <GrammarPassageCard points={section.points} />
                  ) : /pengertian|ketentuan|jenis/i.test(section.title) && lesson.track === 'grammar' ? (
                    <GrammarIntroCard points={section.points} />
                  ) : section.points.map((point, pIdx) => {
                    // Empty string = spacer between groups
                    if (!point.trim()) return <div key={`${section.title}-${pIdx}`} className="h-3" />;

                    // Comparison alternatives card  {{alts: main | alt1 | alt2 | alt3}}
                    const altsMatch = point.match(/^\{\{alts:\s*([\s\S]+?)\}\}$/);
                    if (altsMatch) {
                      const parts = altsMatch[1].split(/\s*\|\s*/);
                      const [main, ...alts] = parts;
                      return <ComparisonAltsCard key={`${section.title}-${pIdx}`} main={main} alts={alts} />;
                    }

                    // Tenses comparison table
                    if (point.trim() === '{{tenses-table}}') {
                      const rows = [
                        {
                          label: 'PRESENT',
                          sub: 'habit / fact',
                          color: 'blue',
                          active: 'S + V1',
                          passive: 'S + is/am/are + V3',
                          nonVerbal: 'S + is/am/are + ANA',
                        },
                        {
                          label: 'PAST',
                          sub: 'past event',
                          color: 'orange',
                          active: 'S + V2',
                          passive: 'S + was/were + V3',
                          nonVerbal: 'S + was/were + ANA',
                        },
                        {
                          label: 'PRESENT CONT.',
                          sub: 'right now',
                          color: 'green',
                          active: 'S + is/am/are + V1-ing',
                          passive: 'S + is/am/are + being + V3',
                          nonVerbal: 'S + is/am/are + being + ANA',
                        },
                      ] as const;
                      const colorMap = {
                        blue:   { badge: 'bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800', row: 'bg-blue-50/40 dark:bg-blue-950/20' },
                        orange: { badge: 'bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800', row: 'bg-orange-50/40 dark:bg-orange-950/20' },
                        green:  { badge: 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800', row: 'bg-green-50/40 dark:bg-green-950/20' },
                      };
                      return (
                        <div key={`${section.title}-${pIdx}`} className="mt-3 rounded-xl border border-(--border) overflow-x-auto text-xs">
                          {/* Header */}
                          <div className="grid grid-cols-4 min-w-[480px] bg-(--bg-secondary) border-b border-(--border)">
                            {['Tense', 'Active', 'Passive', 'Non-Verbal'].map((h) => (
                              <div key={h} className="px-3 py-2 font-bold text-(--text-muted) uppercase tracking-wider text-[10px] text-center">{h}</div>
                            ))}
                          </div>
                          {/* Rows */}
                          {rows.map((row) => {
                            const c = colorMap[row.color];
                            return (
                              <div key={row.label} className={`grid grid-cols-4 min-w-[480px] border-b last:border-b-0 border-(--border) ${c.row}`}>
                                <div className="px-3 py-3 flex flex-col items-center justify-center gap-1 border-r border-(--border)">
                                  <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${c.badge}`}>{row.label}</span>
                                  <span className="text-(--text-muted) text-[10px] italic">{row.sub}</span>
                                </div>
                                <div className="px-3 py-3 flex items-center justify-center text-center font-mono text-(--text) border-r border-(--border)">{row.active}</div>
                                <div className="px-3 py-3 flex items-center justify-center text-center font-mono text-(--text) border-r border-(--border)">{row.passive}</div>
                                <div className="px-3 py-3 flex items-center justify-center text-center font-mono text-(--text)">{row.nonVerbal}</div>
                              </div>
                            );
                          })}
                          {/* Footer note */}
                          <div className="px-3 py-2 bg-(--bg-secondary) border-t border-(--border) text-(--text-muted) text-[10px] italic">
                            💡 ANA = Adjective / Noun / Adverb
                          </div>
                        </div>
                      );
                    }

                    // Causative verbs table
                    if (point.trim() === '{{causative-table}}') {
                      const rows = [
                        { verb: 'get',  aktif: '+ to inf',      pasif: '+ V3',      color: 'blue' },
                        { verb: 'have', aktif: '+ V1',          pasif: '+ V3',      color: 'green' },
                        { verb: 'make', aktif: '+ V1',          pasif: '+ be + V3', color: 'orange' },
                        { verb: 'let',  aktif: '+ V1',          pasif: '—',         color: 'violet' },
                        { verb: 'help', aktif: '+ (to) inf/V1', pasif: '—',         color: 'rose' },
                      ] as const;
                      const colorMap = {
                        blue:   { badge: 'bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300', row: '' },
                        green:  { badge: 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-300', row: '' },
                        orange: { badge: 'bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300', row: '' },
                        violet: { badge: 'bg-violet-100 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300', row: '' },
                        rose:   { badge: 'bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300', row: '' },
                      };
                      return (
                        <div key={`${section.title}-${pIdx}`} className="mt-3 rounded-xl border border-(--border) overflow-x-auto text-xs">
                          <div className="grid grid-cols-3 min-w-[340px] bg-(--bg-secondary) border-b border-(--border)">
                            {['Verb', 'Aktif', 'Pasif'].map((h) => (
                              <div key={h} className="px-3 py-2 font-bold text-(--text-muted) uppercase tracking-wider text-[10px] text-center">{h}</div>
                            ))}
                          </div>
                          {rows.map((row) => {
                            const c = colorMap[row.color];
                            return (
                              <div key={row.verb} className="grid grid-cols-3 min-w-[340px] border-b last:border-b-0 border-(--border) hover:bg-(--hover)">
                                <div className="px-3 py-2.5 flex items-center justify-center border-r border-(--border)">
                                  <span className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold ${c.badge}`}>{row.verb}</span>
                                </div>
                                <div className="px-3 py-2.5 flex items-center justify-center font-mono text-(--text) border-r border-(--border) text-center text-[11px]">{row.aktif}</div>
                                <div className="px-3 py-2.5 flex items-center justify-center font-mono text-(--text) text-center text-[11px]">{row.pasif}</div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }

                    // Quiz game card
                    const quizGameMatch = point.match(/^\{\{quiz-game:([^|]+)\|([^}]+)\}\}$/);
                    if (quizGameMatch) {
                      const [, qTitle, qDesc] = quizGameMatch;
                      return (
                        <button
                          key={`${section.title}-${pIdx}`}
                          type="button"
                          onClick={() => {
                            setShowQuizGame(true);
                            setTimeout(() => quizGameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
                          }}
                          className="w-full mt-3 group"
                        >
                          <div className="flex items-center gap-4 rounded-xl border-2 border-primary/25 bg-primary/[0.04] px-5 py-4 transition-all group-hover:border-primary/50 group-hover:bg-primary/[0.08]">
                            <span className="text-3xl select-none">🎮</span>
                            <div className="flex-1 text-left">
                              <p className="font-bold text-(--text) text-sm">{qTitle}</p>
                              <p className="text-xs text-(--text-muted) mt-0.5">{qDesc}</p>
                            </div>
                            <span className="text-xs font-semibold text-primary border border-primary/30 rounded-full px-3 py-1 group-hover:bg-primary/10 transition-colors">
                              Mulai →
                            </span>
                          </div>
                        </button>
                      );
                    }

                    // Annotation lines: render with label badges underneath words
                    if (point.includes('{{annotation:')) {
                      return (
                        <div key={`${section.title}-${pIdx}`} className="flex items-start gap-2 py-1.5 flex-wrap">
                          <span className="text-primary mt-1.5 shrink-0 text-xs">●</span>
                          <AnnotatedText
                            text={point}
                            renderText={(t, i) => <span key={i} className="text-sm text-(--text-secondary)">{renderClickableText(t)}</span>}
                            className="text-sm leading-relaxed"
                          />
                        </div>
                      );
                    }

                    // Suffix header: starts with - and ends with :
                    const suffixHeaderMatch = point.match(/^(-\w+(?:\s*\/\s*-\w+)*)\s+\(([^)]+)\)\s*:?\s*$/);
                    if (suffixHeaderMatch) {
                      return (
                        <div key={`${section.title}-${pIdx}`} className="pt-2 pb-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-primary/15 text-primary font-bold text-sm tracking-wide">
                              {suffixHeaderMatch[1]}
                            </span>
                            <span className="text-sm text-(--text-secondary) italic">{suffixHeaderMatch[2]}</span>
                          </div>
                        </div>
                      );
                    }

                    // Indented suffix examples: starts with spaces and contains →
                    if (point.startsWith('  ') && point.includes('→')) {
                      const pairs = point.trim().split(',').map(p => p.trim()).filter(Boolean);
                      return (
                        <div key={`${section.title}-${pIdx}`} className="pl-4 pb-2">
                          <div className="flex flex-wrap gap-1.5">
                            {pairs.map((pair, i) => {
                              const parts = pair.split('→').map(s => s.trim());
                              if (parts.length === 2) {
                                return (
                                  <span key={i} className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-(--bg-secondary) border border-(--border)">
                                    <span className="text-(--text-secondary)">{parts[0]}</span>
                                    <span className="text-primary">→</span>
                                    <span className="font-semibold text-(--text)">{parts[1]}</span>
                                  </span>
                                );
                              }
                              return <span key={i} className="text-sm text-(--text-secondary)">{pair}</span>;
                            })}
                          </div>
                        </div>
                      );
                    }

                    // Suffix explanation line (not indented, has →)
                    if (point.includes('→') && !point.startsWith('Wrong') && !point.startsWith('Correct')) {
                      const colonIdx = point.indexOf(':');
                      // Has a rule label before colon
                      if (colonIdx > 0 && colonIdx < 80) {
                        const label = point.slice(0, colonIdx).trim();
                        const rest = point.slice(colonIdx + 1).trim();

                        // Check if it contains transformation pairs
                        const transformParts = rest.split(',').map(s => s.trim()).filter(s => s.includes('→'));
                        if (transformParts.length > 0) {
                          const nonTransformParts = rest.split(',').map(s => s.trim()).filter(s => !s.includes('→'));
                          return (
                            <div key={`${section.title}-${pIdx}`} className="py-1.5">
                              <p className="text-sm font-medium text-(--text) mb-1.5">{renderClickableText(label)}</p>
                              {nonTransformParts.length > 0 && nonTransformParts[0] && (
                                <p className="text-xs text-(--text-muted) mb-1.5 pl-3">{renderClickableText(nonTransformParts.join(', '))}</p>
                              )}
                              <div className="flex flex-wrap gap-1.5 pl-3">
                                {transformParts.map((pair, i) => {
                                  const parts = pair.split('→').map(s => s.trim());
                                  if (parts.length === 2) {
                                    return (
                                      <span key={i} className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-(--bg-secondary) border border-(--border)">
                                        <span className="text-(--text-secondary)">{parts[0]}</span>
                                        <span className="text-primary">→</span>
                                        <span className="font-semibold text-(--text)">{parts[1]}</span>
                                      </span>
                                    );
                                  }
                                  return <span key={i} className="text-sm text-(--text-secondary)">{pair}</span>;
                                })}
                              </div>
                            </div>
                          );
                        }
                      }

                      // Simple arrow line (like irregular verb tables)
                      const items = point.split('|').map(s => s.trim()).filter(Boolean);
                      if (items.length > 1) {
                        return (
                          <div key={`${section.title}-${pIdx}`} className="py-1">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                              {items.map((item, i) => {
                                const parts = item.split('→').map(s => s.trim());
                                return (
                                  <div key={i} className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-(--bg-secondary) border border-(--border)">
                                    {parts.map((p, j) => (
                                      <span key={j} className={cn(j === 0 ? 'text-(--text-secondary)' : 'font-semibold text-(--text)')}>
                                        {j > 0 && <span className="text-primary mr-1.5">→</span>}
                                        {p}
                                      </span>
                                    ))}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      }
                    }

                    // Wrong/Correct pattern
                    if (point.startsWith('Wrong:') || point.startsWith('Wrong ')) {
                      const correctMatch = point.match(/Correct:\s*(.+)/);
                      const wrongMatch = point.match(/Wrong:\s*"([^"]+)"/);
                      return (
                        <div key={`${section.title}-${pIdx}`} className="py-1 flex flex-col sm:flex-row gap-1.5">
                          {wrongMatch && (
                            <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400">
                              <XCircle className="w-3.5 h-3.5 shrink-0" />
                              <span className="line-through">{wrongMatch[1]}</span>
                            </span>
                          )}
                          {correctMatch && (
                            <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400">
                              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                              <span>{correctMatch[1]}</span>
                            </span>
                          )}
                        </div>
                      );
                    }

                    // Example sentences: starts with "Example" or contains quoted text
                    if (point.match(/^(Examples?|Practical):/) || point.match(/^"[^"]+"/)) {
                      const label = point.match(/^(Examples?|Practical):\s*/)?.[0] || '';
                      const exampleText = point.slice(label.length);
                      return (
                        <div key={`${section.title}-${pIdx}`} className="py-1.5 pl-3 border-l-2 border-primary/30 ml-1">
                          {label && <span className="text-xs text-primary font-semibold uppercase tracking-wider">{label.replace(':', '').trim()}</span>}
                          <p className="text-sm text-(--text-secondary) italic">{renderClickableText(exampleText)}</p>
                        </div>
                      );
                    }

                    // Numbered items (OSASCOMP-style)
                    const numberedMatch = point.match(/^(\d+)\.\s+(\w+):\s*(.+)$/);
                    if (numberedMatch) {
                      return (
                        <div key={`${section.title}-${pIdx}`} className="flex items-start gap-2.5 py-1">
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/15 text-primary text-xs font-bold shrink-0 mt-0.5">
                            {numberedMatch[1]}
                          </span>
                          <div className="text-sm">
                            <span className="font-semibold text-(--text)">{numberedMatch[2]}: </span>
                            <span className="text-(--text-secondary)">{renderClickableText(numberedMatch[3])}</span>
                          </div>
                        </div>
                      );
                    }

                    // Rule with description: "Label: description — examples" or "Label: description"
                    const ruleMatch = point.match(/^([^:]{3,60}):\s+(.+)$/);
                    if (ruleMatch && !point.startsWith('http') && !point.startsWith('Position')) {
                      const ruleLabel = ruleMatch[1];
                      const ruleDesc = ruleMatch[2];
                      // Check if description has "—" separating rule from examples
                      const dashIdx = ruleDesc.indexOf(' — ');
                      if (dashIdx > 0) {
                        const desc = ruleDesc.slice(0, dashIdx);
                        const examples = ruleDesc.slice(dashIdx + 3);
                        return (
                          <div key={`${section.title}-${pIdx}`} className="py-1.5">
                            <div className="flex items-start gap-2">
                              <span className="text-primary mt-1 shrink-0">▸</span>
                              <div>
                                <span className="text-sm font-semibold text-(--text)">{renderClickableText(ruleLabel)}: </span>
                                <span className="text-sm text-(--text-secondary)">{renderClickableText(desc)}</span>
                                <p className="text-xs text-(--text-muted) mt-1 pl-2 italic">{renderClickableText(examples)}</p>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div key={`${section.title}-${pIdx}`} className="py-1 flex items-start gap-2">
                          <span className="text-primary mt-1 shrink-0">▸</span>
                          <div className="text-sm">
                            <span className="font-semibold text-(--text)">{renderClickableText(ruleLabel)}: </span>
                            <span className="text-(--text-secondary)">{renderClickableText(ruleDesc)}</span>
                          </div>
                        </div>
                      );
                    }

                    // Position rules
                    if (point.startsWith('Position:')) {
                      return (
                        <div key={`${section.title}-${pIdx}`} className="py-1.5 pl-3 border-l-2 border-amber-500/40 ml-1">
                          <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider mb-0.5">Position</p>
                          <p className="text-sm text-(--text-secondary)">{renderClickableText(point.replace('Position: ', '').replace('Position:', ''))}</p>
                        </div>
                      );
                    }

                    // Default: regular bullet point
                    return (
                      <div key={`${section.title}-${pIdx}`} className="flex items-start gap-2 py-0.5">
                        <span className="text-primary mt-1.5 shrink-0 text-xs">●</span>
                        <span className="text-sm text-(--text-secondary) leading-relaxed">
                          {renderClickableText(point)}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {section.imageUrl && (
                  <div className="px-5 pb-5">
                    <img src={section.imageUrl} alt={section.title} className="w-full rounded-lg border border-(--border)" />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className={cn(
            lesson.track === 'listening' ? 'grid md:grid-cols-2 gap-4' : 'space-y-5'
          )}>
            {lesson.materialSections.map((section) => (
              <div key={section.title} className="bg-(--bg-card) border border-(--border) rounded-xl overflow-hidden">
                <div className={cn(
                  'px-5 py-3 border-b border-(--border)',
                  lesson.track === 'reading' ? 'bg-blue-500/5' : lesson.track === 'speaking' ? 'bg-green-500/5' : 'bg-primary/5'
                )}>
                  <h3 className="font-semibold text-(--text)">{section.title}</h3>
                </div>
                <div className="p-5">
                  {/grammar in the passage/i.test(section.title) || section.points.some(p => /^──.*──$/.test(p.trim())) ? (
                    <GrammarPassageCard points={section.points} />
                  ) : /pengertian|ketentuan|jenis/i.test(section.title) && lesson.track === 'grammar' ? (
                    <GrammarIntroCard points={section.points} />
                  ) : section.points.map((point, pIdx) => {
                    if (!point.trim()) return <div key={`${section.title}-${pIdx}`} className="h-3" />;

                    // Comparison alternatives card  {{alts: main | alt1 | alt2}}
                    const altsMatch2 = point.match(/^\{\{alts:\s*([\s\S]+?)\}\}$/);
                    if (altsMatch2) {
                      const [main2, ...alts2] = altsMatch2[1].split(/\s*\|\s*/);
                      return <ComparisonAltsCard key={`${section.title}-${pIdx}`} main={main2} alts={alts2} />;
                    }

                    // Annotation lines
                    if (point.includes('{{annotation:')) {
                      return (
                        <div key={`${section.title}-${pIdx}`} className="flex items-start gap-2 py-1.5 flex-wrap">
                          <span className="text-primary mt-1.5 shrink-0 text-xs">●</span>
                          <AnnotatedText
                            text={point}
                            renderText={(t, i) => <span key={i} className="text-sm text-(--text-secondary)">{renderClickableText(t)}</span>}
                            className="text-sm leading-relaxed"
                          />
                        </div>
                      );
                    }

                    // Wrong/Correct pattern (speaking common mistakes)
                    if (point.startsWith('Wrong:') || point.startsWith('❌')) {
                      return (
                        <div key={`${section.title}-${pIdx}`} className="py-1">
                          <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400">
                            <XCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{point.replace(/^(Wrong:\s*|❌\s*)/, '')}</span>
                          </span>
                        </div>
                      );
                    }

                    // Correct pattern
                    if (point.startsWith('✅')) {
                      return (
                        <div key={`${section.title}-${pIdx}`} className="py-1">
                          <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                            <span>{renderClickableText(point.replace(/^✅\s*/, ''))}</span>
                          </span>
                        </div>
                      );
                    }

                    // Warning/Important rule
                    if (point.startsWith('⚠️')) {
                      return (
                        <div key={`${section.title}-${pIdx}`} className="py-1.5 px-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                          <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">{renderClickableText(point)}</p>
                        </div>
                      );
                    }

                    // Template patterns (contains "→" with Q&A) — click to reveal answer
                    // Only match lines that don't start with emoji/special indicators
                    if (point.includes('→') && !point.startsWith('  ') && !/^[⚡❌✅❓🔵🔴🟡🟢🔶🔷💡⚠️📍📅🍽️👥🗓️👨🌽🔥🎯💬🧠📖]/.test(point)) {
                      const arrowIdx = point.indexOf('→');
                      const question = point.slice(0, arrowIdx).trim();
                      const answer = point.slice(arrowIdx + 1).trim();
                      const revealKey = `${section.title}-${pIdx}`;
                      const isRevealed = revealedAnswers.has(revealKey);
                      const toggleReveal = () =>
                        setRevealedAnswers((prev) => {
                          const next = new Set(prev);
                          if (next.has(revealKey)) next.delete(revealKey);
                          else next.add(revealKey);
                          return next;
                        });
                      return (
                        <div key={revealKey} className="py-1.5 flex items-start gap-2 w-full">
                          <button
                            type="button"
                            className="text-primary mt-1 shrink-0 hover:text-primary/70 transition-colors"
                            onClick={toggleReveal}
                          >▸</button>
                          <div className="text-sm">
                            <span className="font-medium text-(--text)">{renderClickableText(question)}</span>
                            {isRevealed ? (
                              <>
                                <span className="text-primary mx-1">→</span>
                                <span className="text-green-600 dark:text-green-400 italic font-medium">{renderClickableText(answer)}</span>
                              </>
                            ) : (
                              <button
                                type="button"
                                className="ml-2 text-xs text-(--text-muted) hover:text-primary transition-colors"
                                onClick={toggleReveal}
                              >(klik untuk lihat jawaban)</button>
                            )}
                          </div>
                        </div>
                      );
                    }

                    // Indented content (sub-items)
                    if (point.startsWith('   ') || point.startsWith('  ')) {
                      // Check for quoted example patterns
                      if (point.trim().startsWith('"') || point.trim().startsWith('\'')) {
                        return (
                          <div key={`${section.title}-${pIdx}`} className="pl-6 py-0.5">
                            <p className="text-sm text-(--text-secondary) italic border-l-2 border-primary/20 pl-3">{renderClickableText(point.trim())}</p>
                          </div>
                        );
                      }
                      return (
                        <div key={`${section.title}-${pIdx}`} className="pl-6 py-0.5">
                          <div className="flex items-start gap-2">
                            <span className="text-(--text-muted) mt-1 shrink-0 text-[10px]">○</span>
                            <span className="text-sm text-(--text-secondary)">{renderClickableText(point.trim())}</span>
                          </div>
                        </div>
                      );
                    }

                    // Rule with description: "Label: description"
                    const ruleMatch = point.match(/^([^:]{3,60}):\s+(.+)$/);
                    if (ruleMatch && !point.startsWith('http') && !point.startsWith('Ex:')) {
                      return (
                        <div key={`${section.title}-${pIdx}`} className="py-1 flex items-start gap-2">
                          <span className="text-primary mt-1 shrink-0">▸</span>
                          <div className="text-sm">
                            <span className="font-semibold text-(--text)">{renderClickableText(ruleMatch[1])}: </span>
                            <span className="text-(--text-secondary)">{renderClickableText(ruleMatch[2])}</span>
                          </div>
                        </div>
                      );
                    }

                    // Example sentences with "Ex:"
                    if (point.startsWith('Ex:')) {
                      return (
                        <div key={`${section.title}-${pIdx}`} className="py-1 pl-3 border-l-2 border-primary/30 ml-1">
                          <p className="text-sm text-(--text-secondary) italic">{renderClickableText(point.replace('Ex: ', ''))}</p>
                        </div>
                      );
                    }

                    // Vocabulary card — section title contains "vocabulary"
                    if (/vocabulary/i.test(section.title)) {
                      const parsed = point.match(
                        /^(?:\d+\.\s+)?(.+?)\s*\(([^)]+)\)\s*[\|—–-]/,
                      );
                      if (parsed) {
                        return (
                          <LessonVocabCard
                            key={`vocab-${section.title}-${pIdx}`}
                            point={point}
                            onSpeak={translateWord}
                          />
                        );
                      }
                    }

                    // Default bullet
                    return (
                      <div key={`${section.title}-${pIdx}`} className="flex items-start gap-2 py-0.5">
                        <span className="text-primary mt-1.5 shrink-0 text-xs">●</span>
                        <span className="text-sm text-(--text-secondary) leading-relaxed">{renderClickableText(point)}</span>
                      </div>
                    );
                  })}
                </div>
                {section.imageUrl && (

                  <div className="px-5 pb-5">
                    <img src={section.imageUrl} alt={section.title} className="w-full rounded-lg border border-(--border)" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {lesson.track === 'listening' && lesson.passage && lesson.passage.length > 0 && (
        <TTSPlayer
          text={lesson.passage.join('\n')}
          label="Listen to Audio"
        />
      )}

      {lesson.passage && lesson.passage.length > 0 && (
        <section className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold text-(--text) flex items-center gap-2 flex-1 min-w-0">
              {lesson.track === 'reading' && <BookText className="w-5 h-5 text-blue-500 shrink-0" />}
              {lesson.track === 'listening' && <Volume2 className="w-5 h-5 text-primary shrink-0" />}
              {lesson.track === 'speaking' && <MessageCircle className="w-5 h-5 text-green-500 shrink-0" />}
              <span className="truncate">{{ reading: 'Full Reading Passage', speaking: 'Sample Script', grammar: 'Grammar Examples', listening: 'Listening Script', writing: 'Writing Examples' }[lesson.track]}</span>
            </h2>
            <div className="flex items-center gap-2 shrink-0 flex-wrap">
              {lesson.track === 'reading' && (
                <button
                  type="button"
                  onClick={() => { setShowGrammarMode(v => !v); setGrammarPopup(null); }}
                  className={cn(
                    'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors whitespace-nowrap',
                    showGrammarMode
                      ? 'bg-violet-500/10 border-violet-500/30 text-violet-600 dark:text-violet-400'
                      : 'bg-(--bg-secondary) border-(--border) text-(--text-muted) hover:text-(--text-secondary)'
                  )}
                >
                  <Braces className="w-3.5 h-3.5" />
                  {showGrammarMode ? 'Kelas Kata ON' : 'Kelas Kata'}
                </button>
              )}
              {lesson.track === 'reading' && lesson.passage.some(p => p.startsWith('(') && p.endsWith(')')) && (
                <button
                  type="button"
                  onClick={() => setShowTranslation(v => !v)}
                  className={cn(
                    'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors whitespace-nowrap',
                    showTranslation
                      ? 'bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400'
                      : 'bg-(--bg-secondary) border-(--border) text-(--text-muted) hover:text-(--text-secondary)'
                  )}
                >
                  {showTranslation ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  {showTranslation ? 'Sembunyikan' : 'Terjemahan'}
                </button>
              )}
            </div>
          </div>
          <div className={cn(
            'bg-(--bg-card) border border-(--border) rounded-xl p-3 sm:p-5',
            lesson.track === 'reading' ? 'space-y-5' : 'space-y-4'
          )}>
            {lesson.passage.map((paragraph, idx) => {
              // Section headers (--- Title ---)
              if (paragraph.startsWith('---') && paragraph.endsWith('---')) {
                const headerText = paragraph.replace(/^-+\s*/, '').replace(/\s*-+$/, '');
                const sectionNum = headerText.match(/^(\d+)\.\s*/)?.[1];
                const normalizedHeader = headerText.toLowerCase();
                const matchedAudioTrack =
                  lesson.track === 'listening' && lesson.audioTracks?.length
                    ? lesson.audioTracks.find((track) => {
                        const title = track.title.toLowerCase();
                        if (normalizedHeader.includes('recreation') && title.includes('recreation')) return true;
                        if (normalizedHeader.includes('looking for a place to eat') && title.includes('looking for place to eat')) return true;
                        if (normalizedHeader.includes('the weather') && title.includes('weather')) return true;
                        return false;
                      })
                    : null;
                return (
                  <div key={`${lesson.id}-p-${idx}`} className="pt-4 pb-2 border-b border-(--border) first:pt-0 space-y-3">
                    <div className="flex items-center gap-2">
                      {sectionNum && (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold shrink-0">
                          {sectionNum}
                        </span>
                      )}
                      <p className="text-sm font-bold text-primary uppercase tracking-wider">{sectionNum ? headerText.replace(/^\d+\.\s*/, '') : headerText}</p>
                    </div>
                    {matchedAudioTrack && (
                      <div className="bg-(--bg-secondary) border border-(--border) rounded-lg p-3">
                        <audio controls preload="none" className="w-full">
                          <source src={matchedAudioTrack.url} type="audio/mpeg" />
                          Browser kamu tidak mendukung pemutar audio.
                        </audio>
                      </div>
                    )}
                  </div>
                );
              }
              // Indonesian translation lines — always null, handled inside the English paragraph below
              if (paragraph.startsWith('(') && paragraph.endsWith(')')) {
                return null;
              }
              // Empty spacer
              if (!paragraph.trim()) return <div key={`${lesson.id}-p-${idx}`} className="h-2" />;

              // Listening: speaker lines (Sam: / Jane:)
              if (lesson.track === 'listening' && !paragraph.includes('{{blank:')) {
                const speakerMatch = paragraph.match(/^(Sam|Jane):\s*(.*)/);
                if (speakerMatch) {
                  const speaker = speakerMatch[1];
                  const text = speakerMatch[2];
                  const isSam = speaker === 'Sam';
                  return (
                    <div key={`${lesson.id}-p-${idx}`} className="flex items-start gap-2 py-0.5">
                      <span className={cn(
                        'inline-flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-bold shrink-0 mt-0.5',
                        isSam ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400' : 'bg-pink-500/15 text-pink-600 dark:text-pink-400'
                      )}>
                        {speaker[0]}
                      </span>
                      <div className="text-sm leading-7 text-(--text-secondary)">
                        <span className={cn('font-semibold', isSam ? 'text-blue-600 dark:text-blue-400' : 'text-pink-600 dark:text-pink-400')}>{speaker}: </span>
                        {renderClickableText(text)}
                      </div>
                    </div>
                  );
                }
              }

              // Listening: speaker lines with blanks
              if (lesson.track === 'listening' && paragraph.includes('{{blank:')) {
                const speakerMatch = paragraph.match(/^(Sam|Jane):\s*/);
                const speaker = speakerMatch?.[1];
                const isSam = speaker === 'Sam';

                const blankRegex = /\{\{blank:([^}]+)\}\}/g;
                const segments: Array<{ type: 'text'; value: string } | { type: 'blank'; answer: string; id: string }> = [];
                let lastIndex = 0;
                let blankCount = 0;
                let match;
                while ((match = blankRegex.exec(paragraph)) !== null) {
                  if (match.index > lastIndex) {
                    segments.push({ type: 'text', value: paragraph.slice(lastIndex, match.index) });
                  }
                  const blankId = `${idx}-${blankCount}`;
                  segments.push({ type: 'blank', answer: match[1], id: blankId });
                  blankCount++;
                  lastIndex = match.index + match[0].length;
                }
                if (lastIndex < paragraph.length) {
                  segments.push({ type: 'text', value: paragraph.slice(lastIndex) });
                }
                const isFullBlank = segments.filter(s => s.type === 'blank').length === 1 &&
                  segments.filter(s => s.type === 'text').every(s => /^[A-Za-z]+:\s*$/.test(s.value) || !s.value.trim());
                return (
                  <div key={`${lesson.id}-p-${idx}`} className="flex items-start gap-2 py-0.5">
                    {speaker && (
                      <span className={cn(
                        'inline-flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-bold shrink-0 mt-0.5',
                        isSam ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400' : 'bg-pink-500/15 text-pink-600 dark:text-pink-400'
                      )}>
                        {speaker[0]}
                      </span>
                    )}
                    <div className="flex flex-wrap items-end gap-x-1 gap-y-2 text-sm leading-7 text-(--text-secondary) flex-1">
                      {segments.map((seg, sIdx) => {
                        if (seg.type === 'text') {
                          // Color the speaker name in text
                          if (speaker && sIdx === 0 && seg.value.startsWith(speaker)) {
                            const rest = seg.value.slice(speaker.length + 2);
                            return (
                              <span key={sIdx}>
                                <span className={cn('font-semibold', isSam ? 'text-blue-600 dark:text-blue-400' : 'text-pink-600 dark:text-pink-400')}>{speaker}: </span>
                                {renderClickableText(rest)}
                              </span>
                            );
                          }
                          return <span key={sIdx}>{renderClickableText(seg.value)}</span>;
                        }
                        const bId = seg.id;
                        const userAnswer = blankAnswers[bId] || '';
                        const isChecked = blankChecked[bId] === true;
                        const correctAnswer = seg.answer;
                        const isCorrect = isChecked && userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase();
                        const isWrong = isChecked && !isCorrect;
                        return (
                          <span key={sIdx} className="inline-flex flex-col items-center">
                            <input
                              type="text"
                              value={userAnswer}
                              onChange={(e) => {
                                setBlankAnswers(prev => ({ ...prev, [bId]: e.target.value }));
                                if (blankChecked[bId]) setBlankChecked(prev => ({ ...prev, [bId]: false }));
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') setBlankChecked(prev => ({ ...prev, [bId]: true }));
                              }}
                              placeholder={isFullBlank ? 'Tulis kalimat lengkap...' : '...'}
                              className={cn(
                                'border-b-2 bg-transparent outline-none text-center text-sm px-1 py-0.5 transition-colors',
                                isFullBlank ? 'min-w-48 w-full' : 'min-w-16',
                                !isChecked && 'border-primary/40 focus:border-primary',
                                isCorrect && 'border-green-500 text-green-600',
                                isWrong && 'border-red-500 text-red-600',
                              )}
                              style={isFullBlank ? {} : { width: `${Math.max(correctAnswer.length * 9, 60)}px` }}
                            />
                            {isCorrect && (
                              <span className="text-[10px] text-green-600 font-medium mt-0.5">Benar!</span>
                            )}
                            {isWrong && (
                              <span className="text-[10px] text-red-500 mt-0.5">{correctAnswer}</span>
                            )}
                          </span>
                        );
                      })}
                      {segments.some(s => s.type === 'blank') && (
                        <button
                          onClick={() => {
                            const blankIds = segments.filter(s => s.type === 'blank').map(s => (s as { id: string }).id);
                            setBlankChecked(prev => {
                              const next = { ...prev };
                              blankIds.forEach(id => { next[id] = true; });
                              return next;
                            });
                          }}
                          className="ml-1 text-xs px-2 py-0.5 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors shrink-0"
                        >
                          Cek
                        </button>
                      )}
                    </div>
                  </div>
                );
              }

              // Non-listening blanks (grammar/speaking/reading if any)
              if (paragraph.includes('{{blank:')) {
                const blankRegex = /\{\{blank:([^}]+)\}\}/g;
                const segments: Array<{ type: 'text'; value: string } | { type: 'blank'; answer: string; id: string }> = [];
                let lastIndex = 0;
                let blankCount = 0;
                let match;
                while ((match = blankRegex.exec(paragraph)) !== null) {
                  if (match.index > lastIndex) {
                    segments.push({ type: 'text', value: paragraph.slice(lastIndex, match.index) });
                  }
                  const blankId = `${idx}-${blankCount}`;
                  segments.push({ type: 'blank', answer: match[1], id: blankId });
                  blankCount++;
                  lastIndex = match.index + match[0].length;
                }
                if (lastIndex < paragraph.length) {
                  segments.push({ type: 'text', value: paragraph.slice(lastIndex) });
                }
                const isFullBlank = segments.filter(s => s.type === 'blank').length === 1 &&
                  segments.filter(s => s.type === 'text').every(s => /^[A-Za-z]+:\s*$/.test(s.value) || !s.value.trim());
                return (
                  <div key={`${lesson.id}-p-${idx}`} className="flex flex-wrap items-end gap-x-1 gap-y-2 text-sm leading-7 text-(--text-secondary) py-0.5">
                    {segments.map((seg, sIdx) => {
                      if (seg.type === 'text') {
                        return <span key={sIdx}>{renderClickableText(seg.value)}</span>;
                      }
                      const bId = seg.id;
                      const userAnswer = blankAnswers[bId] || '';
                      const isChecked = blankChecked[bId] === true;
                      const correctAnswer = seg.answer;
                      const isCorrect = isChecked && userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase();
                      const isWrong = isChecked && !isCorrect;
                      return (
                        <span key={sIdx} className="inline-flex flex-col items-center">
                          <input
                            type="text"
                            value={userAnswer}
                            onChange={(e) => {
                              setBlankAnswers(prev => ({ ...prev, [bId]: e.target.value }));
                              if (blankChecked[bId]) setBlankChecked(prev => ({ ...prev, [bId]: false }));
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') setBlankChecked(prev => ({ ...prev, [bId]: true }));
                            }}
                            placeholder={isFullBlank ? 'Tulis kalimat lengkap...' : '...'}
                            className={cn(
                              'border-b-2 bg-transparent outline-none text-center text-sm px-1 py-0.5 transition-colors',
                              isFullBlank ? 'min-w-48 w-full' : 'min-w-16',
                              !isChecked && 'border-primary/40 focus:border-primary',
                              isCorrect && 'border-green-500 text-green-600',
                              isWrong && 'border-red-500 text-red-600',
                            )}
                            style={isFullBlank ? {} : { width: `${Math.max(correctAnswer.length * 9, 60)}px` }}
                          />
                          {isCorrect && (
                            <span className="text-[10px] text-green-600 font-medium mt-0.5">Benar!</span>
                          )}
                          {isWrong && (
                            <span className="text-[10px] text-red-500 mt-0.5">{correctAnswer}</span>
                          )}
                        </span>
                      );
                    })}
                    {segments.some(s => s.type === 'blank') && (
                      <button
                        onClick={() => {
                          const blankIds = segments.filter(s => s.type === 'blank').map(s => (s as { id: string }).id);
                          setBlankChecked(prev => {
                            const next = { ...prev };
                            blankIds.forEach(id => { next[id] = true; });
                            return next;
                          });
                        }}
                        className="ml-1 text-xs px-2 py-0.5 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors shrink-0"
                      >
                        Cek
                      </button>
                    )}
                  </div>
                );
              }

              // Reading: paragraph with number indicator
              if (lesson.track === 'reading') {
                const readingParaIdx = lesson.passage!.slice(0, idx).filter(p =>
                  p.trim() && !p.startsWith('---') && !p.startsWith('(') && !p.includes('{{blank:')
                ).length + 1;

                const nextParagraph = lesson.passage?.[idx + 1];
                const hasTranslation = nextParagraph?.startsWith('(') && nextParagraph?.endsWith(')');

                if (showTranslation && hasTranslation) {
                  const translationText = nextParagraph!.slice(1, -1);
                  const splitSentences = (text: string): string[] =>
                    text.match(/[^.!?]*[.!?]+(?=\s|$)/g)?.map(s => s.trim()).filter(Boolean) ?? [text];
                  const engSentences = splitSentences(paragraph);
                  const idSentences = splitSentences(translationText);
                  return (
                    <div key={`${lesson.id}-p-${idx}`} className="flex gap-3">
                      <span className="text-xs text-primary/40 font-mono mt-1.5 shrink-0 select-none w-4 text-right">{readingParaIdx}</span>
                      <div className="flex-1 space-y-3">
                        {engSentences.map((sentence, sIdx) => (
                          <div key={sIdx} className="space-y-0.5">
                            <p className="text-sm leading-7 text-(--text-secondary) text-justify">
                              {renderClickableText(sentence)}
                            </p>
                            {idSentences[sIdx] && (
                              <p className="text-[13px] leading-[1.65] text-primary/60 italic pl-3 border-l-2 border-primary/20">
                                {idSentences[sIdx]}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={`${lesson.id}-p-${idx}`} className="flex gap-3">
                    <span className={cn('font-mono shrink-0 select-none w-4 text-right', showGrammarMode ? 'text-xs text-violet-400/60 mt-3' : 'text-xs text-primary/40 mt-1.5')}>{readingParaIdx}</span>
                    {showGrammarMode ? (
                      <div className="text-sm leading-10 text-(--text-secondary) text-justify flex flex-wrap items-end gap-x-0">
                        {renderGrammarPassage(paragraph)}
                      </div>
                    ) : (
                      <p className="text-sm leading-7 text-(--text-secondary) text-justify first-letter:text-lg first-letter:font-semibold first-letter:text-(--text)">
                        {renderClickableText(paragraph, true)}
                      </p>
                    )}
                  </div>
                );
              }

              // Speaking: structured lines
              if (lesson.track === 'speaking') {
                // Numbered steps
                const stepMatch = paragraph.match(/^(\d+)\.\s+(.+)/);
                if (stepMatch) {
                  return (
                    <div key={`${lesson.id}-p-${idx}`} className="flex items-start gap-2.5 py-1">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500/15 text-green-600 dark:text-green-400 text-xs font-bold shrink-0 mt-0.5">
                        {stepMatch[1]}
                      </span>
                      <p className="text-sm leading-7 text-(--text-secondary) font-medium">{renderClickableText(stepMatch[2])}</p>
                    </div>
                  );
                }
                // Bullet sub-items
                if (paragraph.startsWith('   ')) {
                  return (
                    <div key={`${lesson.id}-p-${idx}`} className="pl-8 py-0.5">
                      <div className="flex items-start gap-2">
                        <span className="text-(--text-muted) mt-1 shrink-0 text-[10px]">○</span>
                        <p className="text-sm leading-7 text-(--text-secondary)">{renderClickableText(paragraph.trim())}</p>
                      </div>
                    </div>
                  );
                }
                // Quoted example
                if (paragraph.startsWith('"') && paragraph.endsWith('"')) {
                  return (
                    <div key={`${lesson.id}-p-${idx}`} className="py-1.5 pl-3 border-l-2 border-green-500/30 ml-1 bg-green-500/5 rounded-r-lg pr-3">
                      <p className="text-sm leading-7 text-(--text-secondary) italic">{renderClickableText(paragraph)}</p>
                    </div>
                  );
                }
                // Label lines (like "Structure of Self-Introduction:" or "Example Self-Introduction:")
                if (paragraph.endsWith(':')) {
                  return (
                    <div key={`${lesson.id}-p-${idx}`} className="pt-2 pb-1">
                      <p className="text-sm font-semibold text-(--text)">{renderClickableText(paragraph)}</p>
                    </div>
                  );
                }
              }

              // Regular paragraph (fallback)
              return (
                <p key={`${lesson.id}-p-${idx}`} className="text-sm leading-7 text-(--text-secondary)">
                  {renderClickableText(paragraph)}
                </p>
              );
            })}
          </div>
        </section>
      )}

      {lesson.track === 'listening' && (!lesson.audioTracks || lesson.audioTracks.length === 0) && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-(--text) flex items-center gap-2">
            <Headphones className="w-5 h-5 text-primary" /> Audio Lesson
          </h2>

          {lesson.audioUrl ? (
            <div className="bg-(--bg-card) border border-(--border) rounded-xl p-4">
              <audio controls preload="none" className="w-full">
                <source src={lesson.audioUrl} type="audio/mpeg" />
                Browser kamu tidak mendukung pemutar audio.
              </audio>
            </div>
          ) : null}
        </section>
      )}

      {(() => {
        const middleExercises = lesson.exercises.filter((e) => e.section === 'middle');
        const finalExercises = lesson.exercises.filter((e) => e.section === 'final');
        const quizExercises = lesson.exercises.filter((e) => e.section === 'quiz');
        const part1Exercises = lesson.exercises.filter((e) => e.section === 'part1');
        const part2Exercises = lesson.exercises.filter((e) => e.section === 'part2');
        const regularExercises = lesson.exercises.filter((e) => !e.section);
        const hasTestSections = middleExercises.length > 0 || finalExercises.length > 0;
        const hasPartSections = part1Exercises.length > 0 || part2Exercises.length > 0;

        const renderExerciseList = (exercises: typeof lesson.exercises, startNum: number) => (
          <div className="space-y-4">
            {exercises.map((exercise, index) => {
              const isDone =
                exercise.type === 'multiple-choice' || exercise.type === 'fill-the-gap' || exercise.type === 'true-false-not-given'
                  ? Boolean(selectedOptions[exercise.id])
                  : Boolean(notes[exercise.id]?.trim());

              return (
                <div key={exercise.id} className="bg-(--bg-card) border border-(--border) rounded-xl p-5 space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-(--text-muted)">{startNum + index}.</span>
                        {exercise.type === 'fill-the-gap' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-violet-500/15 text-violet-600 dark:text-violet-400 border border-violet-500/25">
                            Fill the Gap
                          </span>
                        )}
                        {exercise.type === 'true-false-not-given' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25">
                            T / F / NG
                          </span>
                        )}
                        {exercise.question.startsWith('Terjemahkan: ') && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/25">
                            Terjemahkan
                          </span>
                        )}
                      </div>
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-(--text-muted) shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-(--text) font-medium leading-relaxed">
                      {exercise.type === 'fill-the-gap'
                        ? renderClickableText(exercise.question.replace('Fill the gap — ', ''))
                        : exercise.question.startsWith('Terjemahkan: ')
                          ? renderClickableText(exercise.question.replace('Terjemahkan: ', ''))
                          : renderClickableText(exercise.question)}
                    </p>
                  </div>

                  {exercise.type === 'multiple-choice' && exercise.options && (() => {
                    const selected = selectedOptions[exercise.id];
                    const hasAnswered = Boolean(selected);
                    const isCorrect = hasAnswered && selected === exercise.correctAnswer;
                    const letters = ['A', 'B', 'C', 'D', 'E'];

                    // Image-grid MCQ (worksheet style: photo grid + A/B/C buttons)
                    if (exercise.imageUrl) {
                      const correctLetter = letters[exercise.options.indexOf(exercise.correctAnswer ?? '')];
                      const selectedLetter = selected ? letters[exercise.options.indexOf(selected)] : null;
                      return (
                        <div className="space-y-3">
                          <img
                            src={exercise.imageUrl}
                            alt="Exercise options"
                            className="w-full rounded-lg border border-(--border) object-contain"
                          />
                          <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${exercise.options.length}, 1fr)` }}>
                            {exercise.options.map((option, oi) => {
                              const letter = letters[oi];
                              const isSelected = selected === option;
                              const isAnswer = option === exercise.correctAnswer;
                              const showResult = hasAnswered && exercise.correctAnswer;
                              return (
                                <button
                                  key={option}
                                  onClick={() => setSelectedOptions((prev) => ({ ...prev, [exercise.id]: option }))}
                                  className={cn(
                                    'py-2 rounded-lg border text-sm font-bold transition-colors',
                                    showResult
                                      ? isAnswer
                                        ? 'border-green-500 bg-green-500/15 text-green-700 dark:text-green-400'
                                        : isSelected
                                          ? 'border-red-500 bg-red-500/10 text-red-600'
                                          : 'border-(--border) text-(--text-muted)'
                                      : isSelected
                                        ? 'border-primary bg-primary/10 text-primary'
                                        : 'border-(--border) hover:border-primary/50 text-(--text-secondary)'
                                  )}
                                >
                                  {letter}
                                </button>
                              );
                            })}
                          </div>
                          {hasAnswered && exercise.correctAnswer && (
                            <div className={cn(
                              'rounded-lg px-4 py-3 text-sm flex items-start gap-2',
                              isCorrect ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'
                            )}>
                              {isCorrect
                                ? <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-green-500" />
                                : <XCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-500" />}
                              <div>
                                <p className={cn('font-medium', isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400')}>
                                  {isCorrect ? `Benar! Jawaban: ${correctLetter}` : `Salah! Jawaban yang benar: ${correctLetter} — ${exercise.correctAnswer}`}
                                </p>
                                {exercise.reason && (
                                  <p className="mt-1 text-(--text-secondary) flex items-start gap-1.5">
                                    <Lightbulb className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-500" />
                                    {exercise.reason}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    }

                    // Standard text MCQ
                    return (
                      <div className="space-y-3">
                        <div className="grid sm:grid-cols-2 gap-2">
                          {exercise.options.map((option, oi) => {
                            const letter = letters[oi];
                            const isSelected = selected === option;
                            const isAnswer = option === exercise.correctAnswer;
                            const showResult = hasAnswered && exercise.correctAnswer;

                            return (
                              <button
                                key={option}
                                onClick={() => setSelectedOptions((prev) => ({ ...prev, [exercise.id]: option }))}
                                className={cn(
                                  'text-left text-sm px-3 py-2.5 rounded-lg border transition-colors',
                                  showResult
                                    ? isAnswer
                                      ? 'border-green-500 bg-green-500/10 text-green-700 dark:text-green-400 font-medium'
                                      : isSelected
                                        ? 'border-red-500 bg-red-500/10 text-red-700 dark:text-red-400'
                                        : 'border-(--border) text-(--text-muted)'
                                    : isSelected
                                      ? 'border-primary bg-primary/10 text-primary'
                                      : 'border-(--border) hover:border-primary/50 text-(--text-secondary)'
                                )}
                              >
                                <span className="flex items-center gap-2">
                                  <span className={cn(
                                    'shrink-0 w-5 h-5 rounded-full border text-[10px] font-bold flex items-center justify-center',
                                    showResult
                                      ? isAnswer
                                        ? 'border-green-500 text-green-600'
                                        : isSelected
                                          ? 'border-red-500 text-red-600'
                                          : 'border-(--border) text-(--text-muted)'
                                      : isSelected
                                        ? 'border-primary text-primary'
                                        : 'border-(--border) text-(--text-muted)'
                                  )}>{letter}</span>
                                  {showResult && isAnswer && <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-green-500" />}
                                  {showResult && isSelected && !isAnswer && <XCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />}
                                  {option}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        {hasAnswered && exercise.correctAnswer && (
                          <div className={cn(
                            'rounded-lg px-4 py-3 text-sm flex items-start gap-2',
                            isCorrect
                              ? 'bg-green-500/10 border border-green-500/30'
                              : 'bg-red-500/10 border border-red-500/30'
                          )}>
                            {isCorrect ? (
                              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-green-500" />
                            ) : (
                              <XCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-500" />
                            )}
                            <div>
                              <p className={cn('font-medium', isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400')}>
                                {isCorrect ? 'Benar!' : 'Salah!'}
                                {!isCorrect && <span className="font-normal text-(--text-secondary)"> Jawaban yang benar: <span className="font-semibold text-green-700 dark:text-green-400">{exercise.correctAnswer}</span></span>}
                              </p>
                              {exercise.reason && (
                                <p className="mt-1 text-(--text-secondary) flex items-start gap-1.5">
                                  <Lightbulb className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-500" />
                                  {exercise.reason}
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {exercise.type === 'fill-the-gap' && exercise.options && (() => {
                    // ── Shared word bank: union of ALL fill-the-gap options in this list ──
                    const ftgAll = exercises.filter(e => e.type === 'fill-the-gap');
                    const allWords = [...new Set(ftgAll.flatMap(e => e.options ?? []))].sort();
                    // Words locked by OTHER blanks
                    const usedElsewhere = new Set(
                      ftgAll
                        .filter(e => e.id !== exercise.id)
                        .map(e => selectedOptions[e.id])
                        .filter((w): w is string => Boolean(w))
                    );

                    const selected = selectedOptions[exercise.id];
                    const hasAnswered = Boolean(selected);
                    const isCorrect = hasAnswered && selected === exercise.correctAnswer;

                    // Before answering: show shared pool minus words used by other blanks
                    // After answering: show original options (to display correct/wrong clearly)
                    const displayOptions = hasAnswered
                      ? exercise.options
                      : allWords.filter(w => !usedElsewhere.has(w));

                    // Split question into parts around ______
                    const parts = exercise.question.replace('Fill the gap — ', '').split('______');
                    const before = parts[0] ?? '';
                    const after = parts[1] ?? '';

                    return (
                      <div className="space-y-3">
                        {/* Sentence with blank */}
                        <div className="bg-(--bg) border border-(--border) rounded-lg px-4 py-3 text-sm text-(--text) leading-relaxed">
                          <span>{before}</span>
                          <span className={cn(
                            'inline-block min-w-[80px] mx-1 px-2 py-0.5 rounded border-b-2 text-center font-semibold transition-colors',
                            hasAnswered
                              ? isCorrect
                                ? 'border-green-500 text-green-700 dark:text-green-400 bg-green-500/10'
                                : 'border-red-500 text-red-700 dark:text-red-400 bg-red-500/10'
                              : selected
                                ? 'border-primary text-primary bg-primary/10'
                                : 'border-dashed border-(--text-muted) text-(--text-muted)'
                          )}>
                            {selected ?? '______'}
                          </span>
                          <span>{after}</span>
                        </div>

                        {/* Word bank chips — shared pool */}
                        <div className="flex flex-wrap gap-2">
                          {displayOptions.map((option) => {
                            const isSelected = selected === option;
                            const isAnswer = option === exercise.correctAnswer;
                            const showResult = hasAnswered && exercise.correctAnswer;

                            return (
                              <button
                                key={option}
                                disabled={hasAnswered}
                                onClick={() => { if (!hasAnswered) setSelectedOptions((prev) => ({ ...prev, [exercise.id]: option })); }}
                                className={cn(
                                  'px-3 py-1.5 rounded-full text-sm font-medium border transition-all',
                                  showResult
                                    ? isAnswer
                                      ? 'border-green-500 bg-green-500/15 text-green-700 dark:text-green-400'
                                      : isSelected
                                        ? 'border-red-500 bg-red-500/15 text-red-700 dark:text-red-400 line-through opacity-70'
                                        : 'border-(--border) text-(--text-muted) opacity-40'
                                    : isSelected
                                      ? 'border-primary bg-primary/15 text-primary scale-105'
                                      : 'border-(--border) hover:border-primary/60 hover:bg-primary/5 text-(--text-secondary) cursor-pointer'
                                )}
                              >
                                {showResult && isAnswer && <CheckCircle2 className="w-3.5 h-3.5 inline mr-1 text-green-500" />}
                                {showResult && isSelected && !isAnswer && <XCircle className="w-3.5 h-3.5 inline mr-1 text-red-500" />}
                                {option}
                              </button>
                            );
                          })}
                        </div>

                        {hasAnswered && exercise.correctAnswer && (
                          <div className={cn(
                            'rounded-lg px-4 py-3 text-sm flex items-start gap-2',
                            isCorrect
                              ? 'bg-green-500/10 border border-green-500/30'
                              : 'bg-red-500/10 border border-red-500/30'
                          )}>
                            {isCorrect ? (
                              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-green-500" />
                            ) : (
                              <XCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-500" />
                            )}
                            <div>
                              <p className={cn('font-medium', isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400')}>
                                {isCorrect ? 'Benar!' : 'Salah!'}
                                {!isCorrect && <span className="font-normal text-(--text-secondary)"> Jawaban yang benar: <span className="font-semibold text-green-700 dark:text-green-400">{exercise.correctAnswer}</span></span>}
                              </p>
                              {exercise.reason && (
                                <p className="mt-1 text-(--text-secondary) flex items-start gap-1.5">
                                  <Lightbulb className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-500" />
                                  {exercise.reason}
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {exercise.type === 'true-false-not-given' && exercise.options && (() => {
                    const selected = selectedOptions[exercise.id];
                    const hasAnswered = Boolean(selected);
                    const isCorrect = hasAnswered && selected === exercise.correctAnswer;

                    const btnStyle = (option: string) => {
                      const isSelected = selected === option;
                      const isAnswer = option === exercise.correctAnswer;
                      const showResult = hasAnswered && exercise.correctAnswer;
                      if (showResult) {
                        if (isAnswer) return 'border-2 font-semibold ' + (
                          option === 'True' ? 'border-green-500 bg-green-500/15 text-green-700 dark:text-green-400' :
                          option === 'False' ? 'border-red-500 bg-red-500/15 text-red-700 dark:text-red-400' :
                          'border-amber-500 bg-amber-500/15 text-amber-700 dark:text-amber-400'
                        );
                        if (isSelected && !isAnswer) return 'border-2 border-red-400 bg-red-500/10 text-red-600 dark:text-red-400 line-through opacity-70';
                        return 'border border-(--border) text-(--text-muted) opacity-40';
                      }
                      if (isSelected) return 'border-2 font-semibold ' + (
                        option === 'True' ? 'border-green-400 bg-green-500/10 text-green-700 dark:text-green-400' :
                        option === 'False' ? 'border-red-400 bg-red-500/10 text-red-700 dark:text-red-400' :
                        'border-amber-400 bg-amber-500/10 text-amber-700 dark:text-amber-400'
                      );
                      return 'border border-(--border) hover:border-primary/50 text-(--text-secondary) cursor-pointer';
                    };

                    return (
                      <div className="space-y-3">
                        {/* TRUE / FALSE / NOT GIVEN buttons */}
                        <div className="flex gap-2 flex-wrap">
                          {exercise.options.map((option) => (
                            <button
                              key={option}
                              disabled={hasAnswered}
                              onClick={() => { if (!hasAnswered) setSelectedOptions((prev) => ({ ...prev, [exercise.id]: option })); }}
                              className={cn('px-4 py-2 rounded-lg text-sm transition-all', btnStyle(option))}
                            >
                              {option === 'True' && <CheckCircle2 className="w-3.5 h-3.5 inline mr-1.5" />}
                              {option === 'False' && <XCircle className="w-3.5 h-3.5 inline mr-1.5" />}
                              {option === 'Not Given' && <span className="mr-1.5 font-bold">?</span>}
                              {option}
                            </button>
                          ))}
                        </div>

                        {hasAnswered && exercise.correctAnswer && (
                          <div className={cn(
                            'rounded-lg px-4 py-3 text-sm flex items-start gap-2',
                            isCorrect ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'
                          )}>
                            {isCorrect
                              ? <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-green-500" />
                              : <XCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-500" />}
                            <div>
                              <p className={cn('font-medium', isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400')}>
                                {isCorrect ? 'Benar!' : 'Salah!'}
                                {!isCorrect && (
                                  <span className="font-normal text-(--text-secondary)"> Jawaban yang benar: <span className="font-semibold text-green-700 dark:text-green-400">{exercise.correctAnswer}</span></span>
                                )}
                              </p>
                              {exercise.reason && (
                                <p className="mt-1 text-(--text-secondary) flex items-start gap-1.5">
                                  <Lightbulb className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-500" />
                                  {exercise.reason}
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {exercise.type !== 'multiple-choice' && exercise.type !== 'fill-the-gap' && exercise.type !== 'true-false-not-given' && (() => {
                    // Fill-in-the-blank / Translate: short-answer with correctAnswer
                    if (exercise.type === 'short-answer' && exercise.correctAnswer) {
                      const isTranslate = exercise.question.startsWith('Terjemahkan: ');
                      const userInput = notes[exercise.id] ?? '';
                      const isSubmitted = submittedAnswers[exercise.id] === true;

                      const normalize = (s: string) =>
                        s.toLowerCase().trim().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
                      const isCorrect = isSubmitted && (() => {
                        const n = normalize(userInput);
                        const base = exercise.correctAnswer ?? '';
                        const variants = [
                          base,
                          base.replace(/\bhe\b/g, 'she').replace(/\bhim\b/g, 'her').replace(/\bhis\b/g, 'her'),
                          base.replace(/\bshe\b/g, 'he').replace(/\bher\b/g, 'him'),
                        ].map(normalize);
                        return variants.some((v) => n === v);
                      })();

                      return (
                        <div className="space-y-2">
                          <div className="flex gap-2 items-end">
                            {isTranslate ? (
                              <textarea
                                value={userInput}
                                onChange={(e) => {
                                  setNotes((prev) => ({ ...prev, [exercise.id]: e.target.value }));
                                  if (submittedAnswers[exercise.id]) setSubmittedAnswers((prev) => ({ ...prev, [exercise.id]: false }));
                                }}
                                placeholder="Tulis terjemahan kamu..."
                                rows={2}
                                className="flex-1 rounded-lg border border-(--border) bg-(--bg-secondary) px-3 py-2 text-sm text-(--text) focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                              />
                            ) : (
                              <input
                                type="text"
                                value={userInput}
                                onChange={(e) => {
                                  setNotes((prev) => ({ ...prev, [exercise.id]: e.target.value }));
                                  if (submittedAnswers[exercise.id]) setSubmittedAnswers((prev) => ({ ...prev, [exercise.id]: false }));
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') setSubmittedAnswers((prev) => ({ ...prev, [exercise.id]: true }));
                                }}
                                placeholder="Tulis jawaban..."
                                className="flex-1 rounded-lg border border-(--border) bg-(--bg-secondary) px-3 py-2 text-sm text-(--text) focus:outline-none focus:ring-2 focus:ring-primary/40"
                              />
                            )}
                            <button
                              onClick={() => setSubmittedAnswers((prev) => ({ ...prev, [exercise.id]: true }))}
                              className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors shrink-0"
                            >
                              Cek
                            </button>
                          </div>
                          {isSubmitted && (
                            <div className={cn(
                              'rounded-lg px-4 py-3 text-sm flex items-start gap-2',
                              isCorrect ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'
                            )}>
                              {isCorrect ? (
                                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-green-500" />
                              ) : (
                                <XCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-500" />
                              )}
                              <div>
                                <p className={cn('font-medium', isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400')}>
                                  {isCorrect ? 'Benar!' : 'Salah!'}
                                  {!isCorrect && (
                                    <span className="font-normal text-(--text-secondary)"> Jawaban yang benar: <span className="font-semibold text-green-700 dark:text-green-400">{exercise.correctAnswer}</span></span>
                                  )}
                                </p>
                                {exercise.reason && (
                                  <p className="mt-1 text-(--text-secondary) flex items-start gap-1.5">
                                    <Lightbulb className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-500" />
                                    {exercise.reason}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    }

                    // Translate: short-answer with sampleAnswer
                    if (exercise.type === 'short-answer' && exercise.sampleAnswer) {
                      const isSubmitted = submittedAnswers[exercise.id] === true;
                      return (
                        <div className="space-y-2">
                          <textarea
                            value={notes[exercise.id] ?? ''}
                            onChange={(e) => setNotes((prev) => ({ ...prev, [exercise.id]: e.target.value }))}
                            placeholder="Tulis terjemahan kamu..."
                            className="w-full min-h-[80px] rounded-lg border border-(--border) bg-(--bg-secondary) px-3 py-2 text-sm text-(--text) focus:outline-none focus:ring-2 focus:ring-primary/40"
                          />
                          <button
                            onClick={() => setSubmittedAnswers((prev) => ({ ...prev, [exercise.id]: true }))}
                            className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                          >
                            Lihat Contoh Jawaban
                          </button>
                          {isSubmitted && (
                            <div className="rounded-lg px-4 py-3 text-sm bg-blue-500/10 border border-blue-500/30 flex items-start gap-2">
                              <Lightbulb className="w-4 h-4 mt-0.5 shrink-0 text-blue-500" />
                              <div>
                                <p className="font-medium text-blue-700 dark:text-blue-400">Contoh jawaban:</p>
                                <p className="mt-0.5 text-(--text-secondary)">{exercise.sampleAnswer}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    }

                    // Task / plain short-answer: just a textarea
                    return (
                      <textarea
                        value={notes[exercise.id] ?? ''}
                        onChange={(e) => setNotes((prev) => ({ ...prev, [exercise.id]: e.target.value }))}
                        placeholder="Write your answer here..."
                        className="w-full min-h-[90px] rounded-lg border border-(--border) bg-(--bg-secondary) px-3 py-2 text-sm text-(--text) focus:outline-none focus:ring-2 focus:ring-primary/40"
                      />
                    );
                  })()}
                </div>
              );
            })}
          </div>
        );

        // Apakah ini mode 3-grup (regular + middle + final semua ada)?
        const isThreeGroup = regularExercises.length > 0 && hasTestSections;

        // Listening audios: quiz exercises (Section A) first, audios middle, regular exercises (Section E) last
        if (lesson.listeningAudios && lesson.listeningAudios.length > 0) {
          const preExercises = lesson.exercises.filter((e) => e.section === 'quiz');
          const postExercises = lesson.exercises.filter((e) => !e.section);
          return (
            <section className="space-y-6">
              {preExercises.length > 0 && renderExerciseList(preExercises, 1)}
              {lesson.listeningAudios.map((audio, idx) => (
                <ListeningAudioSection key={audio.title} audio={audio} audioIndex={idx + 1} />
              ))}
              {postExercises.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-(--text-muted) uppercase tracking-wide px-1">E. Listen to Jack asking Alice about her birthday</h3>
                  {renderExerciseList(postExercises, preExercises.length + 1)}
                </div>
              )}
            </section>
          );
        }

        if (hasPartSections) {
          return (
            <div className="space-y-8">
              {regularExercises.length > 0 && (
                <section className="space-y-4">
                  <h2 className="text-lg font-semibold text-(--text)">Exercises</h2>
                  {renderExerciseList(regularExercises, 1)}
                </section>
              )}
              {part1Exercises.length > 0 && (
                <section className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-(--border)" />
                    <h2 className="text-sm font-semibold text-(--text-secondary) uppercase tracking-wider whitespace-nowrap px-2">
                      Part 1
                    </h2>
                    <div className="h-px flex-1 bg-(--border)" />
                  </div>
                  {renderExerciseList(part1Exercises, regularExercises.length + 1)}
                </section>
              )}
              {part2Exercises.length > 0 && (
                <section className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-primary/30" />
                    <h2 className="text-sm font-semibold text-primary uppercase tracking-wider whitespace-nowrap px-2">
                      Part 2
                    </h2>
                    <div className="h-px flex-1 bg-primary/30" />
                  </div>
                  {renderExerciseList(part2Exercises, regularExercises.length + part1Exercises.length + 1)}
                </section>
              )}
            </div>
          );
        }

        if (!hasTestSections) {
          return (
            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-(--text)">Exercises</h2>
              {renderExerciseList(regularExercises, 1)}
            </section>
          );
        }

        // Part A / Part B — when only final + middle exist (no regular exercises)
        if (regularExercises.length === 0 && finalExercises.length > 0 && middleExercises.length > 0) {
          return (
            <div className="space-y-8">
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-(--border)" />
                  <h2 className="text-sm font-semibold text-(--text-secondary) uppercase tracking-wider whitespace-nowrap px-2">
                    Part A
                  </h2>
                  <div className="h-px flex-1 bg-(--border)" />
                </div>
                {renderExerciseList(finalExercises, 1)}
              </section>
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-primary/30" />
                  <h2 className="text-sm font-semibold text-primary uppercase tracking-wider whitespace-nowrap px-2">
                    Part B
                  </h2>
                  <div className="h-px flex-1 bg-primary/30" />
                </div>
                {renderExerciseList(middleExercises, 1)}
              </section>
            </div>
          );
        }

        return (
          <div className="space-y-8">
            {/* finalExercises (section:'final') — tampil pertama di 3-grup */}
            {isThreeGroup && finalExercises.length > 0 && (
              <section className="space-y-4">
                {renderExerciseList(finalExercises, 1)}
              </section>
            )}

            {/* regularExercises (no section) */}
            {isThreeGroup && regularExercises.length > 0 && (
              <section className="space-y-4">
                {renderExerciseList(regularExercises, 1)}
              </section>
            )}

            {/* Set 3 = middleExercises (section:'middle') — tampil terakhir di 3-grup */}
            {middleExercises.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-amber-500/30" />
                  <h2 className="text-lg font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-2 whitespace-nowrap">
                    <BookText className="w-5 h-5" /> Middle Test
                  </h2>
                  <div className="h-px flex-1 bg-amber-500/30" />
                </div>
                {!isThreeGroup && <p className="text-xs text-(--text-muted) text-center">Tes tengah materi — cek pemahaman kamu sejauh ini!</p>}
                {renderExerciseList(middleExercises, 1)}
              </section>
            )}

            {/* Final Test — hanya tampil bila bukan 3-grup */}
            {!isThreeGroup && finalExercises.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-primary/30" />
                  <h2 className="text-lg font-semibold text-primary flex items-center gap-2 whitespace-nowrap">
                    <CheckCircle2 className="w-5 h-5" /> Final Test
                  </h2>
                  <div className="h-px flex-1 bg-primary/30" />
                </div>
                <p className="text-xs text-(--text-muted) text-center">Tes akhir — uji semua materi yang sudah dipelajari!</p>
                {renderExerciseList(finalExercises, 1)}
              </section>
            )}
          </div>
        );
      })()}

      {/* Quiz Game Panel */}
      {(() => {
        const quizExercises = lesson.exercises.filter((e) => e.section === 'quiz');
        if (quizExercises.length === 0) return null;
        return (
          <div ref={quizGameRef} className="mt-10 scroll-mt-6">
            {!showQuizGame ? (
              <button
                type="button"
                onClick={() => setShowQuizGame(true)}
                className="w-full group"
              >
                <div className="flex items-center gap-4 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/[0.03] px-6 py-5 transition-all group-hover:border-primary/50 group-hover:bg-primary/[0.07]">
                  <span className="text-4xl select-none">🎮</span>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-(--text)">Review Quiz</p>
                    <p className="text-xs text-(--text-muted) mt-0.5">{quizExercises.length} soal pilihan ganda — uji pemahamanmu!</p>
                  </div>
                  <span className="text-sm font-semibold text-primary border border-primary/30 rounded-full px-4 py-1.5 group-hover:bg-primary/10 transition-colors whitespace-nowrap">
                    Mulai →
                  </span>
                </div>
              </button>
            ) : (
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-primary/20" />
                  <h2 className="flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wider whitespace-nowrap">
                    🎮 Review Quiz
                  </h2>
                  <div className="h-px flex-1 bg-primary/20" />
                </div>
                <p className="text-xs text-(--text-muted) text-center">{quizExercises.length} soal — pilih jawaban yang paling tepat!</p>
                {(() => {
                  const renderExerciseList = (exercises: typeof lesson.exercises, startNum: number) => (
                    <div className="space-y-4">
                      {exercises.map((exercise, index) => {
                        const isDone = Boolean(selectedOptions[exercise.id]);
                        const isSubmitted = submittedAnswers[exercise.id];
                        const chosen = selectedOptions[exercise.id];
                        const isCorrect = chosen === exercise.correctAnswer;
                        return (
                          <div key={exercise.id} className="bg-(--bg-card) border border-(--border) rounded-xl p-5 space-y-3">
                            <p className="text-sm text-(--text) font-medium">{startNum + index}. {exercise.question}</p>
                            <div className="space-y-2">
                              {exercise.options?.map((opt) => {
                                const sel = chosen === opt;
                                const showResult = isSubmitted;
                                const correct = opt === exercise.correctAnswer;
                                return (
                                  <button
                                    key={opt}
                                    type="button"
                                    disabled={isSubmitted}
                                    onClick={() => setSelectedOptions((p) => ({ ...p, [exercise.id]: opt }))}
                                    className={cn(
                                      'w-full text-left text-sm px-4 py-2.5 rounded-lg border transition-colors',
                                      showResult && correct ? 'bg-green-500/10 border-green-500/40 text-green-700 dark:text-green-400' :
                                      showResult && sel && !correct ? 'bg-red-500/10 border-red-500/40 text-red-700 dark:text-red-400' :
                                      sel ? 'bg-primary/10 border-primary/40 text-primary' :
                                      'bg-(--bg-secondary) border-(--border) text-(--text-secondary) hover:border-primary/30'
                                    )}
                                  >{opt}</button>
                                );
                              })}
                            </div>
                            {!isSubmitted && isDone && (
                              <button
                                type="button"
                                onClick={() => setSubmittedAnswers((p) => ({ ...p, [exercise.id]: true }))}
                                className="text-xs font-semibold text-primary border border-primary/30 rounded-full px-4 py-1.5 hover:bg-primary/10 transition-colors"
                              >Cek Jawaban</button>
                            )}
                            {isSubmitted && (
                              <div className={cn('text-xs rounded-lg px-3 py-2 border', isCorrect ? 'bg-green-500/8 border-green-500/20 text-green-700 dark:text-green-400' : 'bg-red-500/8 border-red-500/20 text-red-700 dark:text-red-400')}>
                                <span className="font-bold">{isCorrect ? '✓ Benar!' : '✗ Salah.'}</span>
                                {!isCorrect && <span className="ml-1">Jawaban: <strong>{exercise.correctAnswer}</strong></span>}
                                {exercise.reason && <p className="mt-1 opacity-80">{exercise.reason}</p>}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                  return renderExerciseList(quizExercises, 1);
                })()}
              </section>
            )}
          </div>
        );
      })()}

      {/* Day Navigation */}
      <DayNavigation
        prevHref={prevHref}
        prevLabel={prevLabel}
        prevTitle={prevTitle}
        nextHref={nextHref}
        nextLabel={nextLabel}
        nextTitle={nextTitle}
      />

      {/* Grammar Mode Popup */}
      {grammarPopup && (
        <div className="fixed left-4 right-4 bottom-4 lg:left-auto lg:right-4 lg:w-[min(92vw,420px)] z-50 bg-(--bg-card) border border-violet-500/30 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
          <div className="flex items-start justify-between gap-2 px-4 pt-3 pb-2 bg-violet-500/5 border-b border-violet-500/20">
            <div className="flex items-center gap-2 flex-wrap min-w-0">
              <Braces className="w-4 h-4 text-violet-500 shrink-0" />
              <span className="text-base font-bold text-(--text)">{grammarPopup.word}</span>
              <span className={cn('text-xs font-bold px-2 py-0.5 rounded-full', grammarPopup.bg)}>
                {grammarPopup.label}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setGrammarPopup(null)}
              className="p-1 rounded hover:bg-(--hover) shrink-0"
            >
              <X className="w-4 h-4 text-(--text-muted)" />
            </button>
          </div>
          <div className="px-4 py-3">
            <p className="text-sm text-(--text-secondary) leading-relaxed">{grammarPopup.reason}</p>
          </div>
        </div>
      )}

      {selectedWord && (
        <div className="fixed right-4 bottom-4 z-40 w-[min(92vw,380px)] bg-(--bg-card) border border-(--border) rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 px-4 pt-3 pb-2">
            <div className="flex items-center gap-2 min-w-0">
              <Languages className="w-4 h-4 text-primary shrink-0" />
              <p className="text-base font-bold text-(--text) truncate">{selectedWord}</p>
              {!blockText && (
                <button
                  type="button"
                  onClick={() => speakWord(selectedWord)}
                  className="p-1 rounded-full hover:bg-primary/10 transition-colors shrink-0"
                  aria-label="Pronounce word"
                >
                  <Volume2 className="w-4 h-4 text-primary" />
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedWord(null);
                setTranslation(null);
                setTranslationError('');
                setBlockText('');
              }}
              className="p-1 rounded hover:bg-(--hover) shrink-0"
              aria-label="Close translation"
            >
              <X className="w-4 h-4 text-(--text-muted)" />
            </button>
          </div>

          {/* Content */}
          <div className="px-4 pb-3 space-y-2">
            {isTranslating && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <p className="text-sm text-(--text-secondary)">Menerjemahkan...</p>
              </div>
            )}

            {!isTranslating && translation && (
              <>
                {/* Part of speech & IPA */}
                {(translation.partOfSpeech || translation.ipa) && (
                  <div className="flex items-center gap-2 flex-wrap">
                    {translation.partOfSpeech && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium italic">
                        {translation.partOfSpeech}
                      </span>
                    )}
                    {translation.ipa && (
                      <span className="text-xs text-(--text-muted) font-mono">{translation.ipa}</span>
                    )}
                  </div>
                )}

                {/* English definition */}
                {translation.definition && (
                  <div>
                    <p className="text-xs text-(--text-muted) uppercase tracking-wider">Definition</p>
                    <p className="text-sm text-(--text-secondary) mt-0.5 leading-relaxed">{translation.definition}</p>
                  </div>
                )}

                {/* Indonesian translation */}
                <div>
                  <p className="text-xs text-(--text-muted) uppercase tracking-wider">Terjemahan</p>
                  <p className="text-sm font-semibold text-primary mt-0.5">{translation.translated}</p>
                </div>

                {/* Example sentence */}
                {translation.example && (
                  <div>
                    <p className="text-xs text-(--text-muted) uppercase tracking-wider">Example</p>
                    <p className="text-xs text-(--text-secondary) mt-0.5 italic leading-relaxed">&quot;{translation.example}&quot;</p>
                  </div>
                )}

                {/* Alternative translations */}
                {translation.alternatives && translation.alternatives.length > 0 && (
                  <div>
                    <p className="text-xs text-(--text-muted) uppercase tracking-wider">Arti lain</p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {translation.alternatives.map((alt) => (
                        <span key={alt} className="text-xs px-2 py-0.5 rounded-full bg-(--bg-secondary) text-(--text-secondary) border border-(--border)">
                          {alt}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {!isTranslating && translationError && (
              <p className="text-sm text-red-600 dark:text-red-400">{translationError}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
