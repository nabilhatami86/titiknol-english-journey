// IELTS Listening Official Sample Tasks — source: IELTS.org 2023
// Audio files: letakkan di /public/audio/listening-ielts/[audioPath]
// Image files: letakkan di /public/image/listening/[imagePath]

export type IeltsQType = 'fill' | 'mc' | 'matching';

export interface IeltsOption { label: string; text: string; }

export interface IeltsQuestion {
  n: number;
  type: IeltsQType;
  prompt?: string;
  options?: IeltsOption[];
  answer: string;
  alts?: string[];
}

export interface IeltsSubsection {
  audioPath: string;
  instruction: string;
  wordLimit?: string;
  sharedOptions?: IeltsOption[];
  questions: IeltsQuestion[];
}

export interface IeltsSample {
  id: string;
  title: string;
  taskType: string;
  part: 1 | 2 | 3 | 4;
  qRange: [number, number];
  imagePaths?: string[];
  tapescript: string;
  // single-section
  audioPath?: string;
  instruction?: string;
  wordLimit?: string;
  sharedOptions?: IeltsOption[];
  questions?: IeltsQuestion[];
  // multi-section (overrides above)
  subsections?: IeltsSubsection[];
}

export const IELTS_SAMPLES: IeltsSample[] = [
  // ─── 1. Part 1 — Shipping Enquiry (Form Completion + Multiple Choice) ──────────
  {
    id: 'p1-shipping',
    title: 'Shipping Enquiry',
    taskType: 'Form Completion + Multiple Choice',
    part: 1,
    qRange: [1, 10],
    imagePaths: ['part1.png'],
    subsections: [
      {
        audioPath: 'ielts-listening-sample-task-1-form-completion.mp3',
        instruction: 'Complete the form below.',
        wordLimit: 'NO MORE THAN THREE WORDS AND/OR A NUMBER',
        questions: [
          { n: 1, type: 'fill', prompt: 'Name: Jacob ___', answer: 'Mkere' },
          { n: 2, type: 'fill', prompt: '___ College, Downlands Rd, Bristol', answer: 'Westall' },
          { n: 3, type: 'fill', prompt: 'Postcode:', answer: 'BS8 9PU' },
          { n: 4, type: 'fill', prompt: 'Width:', answer: '0.75m', alts: ['0.75 m','75cm','75 cm','three quarters of a metre','¾m','¾ m'] },
          { n: 5, type: 'fill', prompt: 'Height:', answer: '0.5m', alts: ['0.5 m','50cm','50 cm','half a metre','½m','½ m'] },
          { n: 6, type: 'fill', prompt: 'Contents (Q6 — besides clothes):', answer: 'books', alts: ['some books'] },
          { n: 7, type: 'fill', prompt: 'Contents (Q7 — besides clothes):', answer: 'toys', alts: ['some toys'] },
          { n: 8, type: 'fill', prompt: 'Total estimated value: £', answer: '1700', alts: ['1,700'] },
        ],
      },
      {
        audioPath: 'ielts-listening-sample-task-2-multiple-choice.mp3',
        instruction: 'Choose the correct letter, A, B or C.',
        questions: [
          {
            n: 9,
            type: 'mc',
            prompt: 'Type of insurance chosen',
            options: [{ label: 'A', text: 'Economy' }, { label: 'B', text: 'Standard' }, { label: 'C', text: 'Premium' }],
            answer: 'C',
          },
          {
            n: 10,
            type: 'mc',
            prompt: 'Customer wants goods delivered to',
            options: [{ label: 'A', text: 'port' }, { label: 'B', text: 'home' }, { label: 'C', text: 'depot' }],
            answer: 'A',
          },
        ],
      },
    ],
    tapescript: `Part 1 — Form Completion (Q1–8)

You will hear a telephone conversation between a customer and an agent at a company which ships large boxes overseas.

A: Good morning. Packham's Shipping Agents. Can I help you?
B: Oh yes, I'm ringing to make enquiries about sending a large box, a container, back home to Kenya from the UK.
A: Yes, of course. Would you like me to try and find some quotations for you?
B: Yes, that'd be great. Thank you.
A: Well first of all, I need a few details from you.
B: Fine.
A: Can I take your name?
B: It's Jacob Mkere.
A: Can you spell your surname, please?
B: Yes, it's M-K-E-R-E.
A: Thank you, and you say that you will be sending the box to Kenya?
B: That's right.
A: And where would you like the box picked up from?
B: From college, if possible.
A: Yes, of course. I'll take down the address now.
B: It's Westall College.
A: Is that W-E-S-T-A-L-L?
B: Yes, ... college.
A: Westall College. And where's that?
B: It's Downlands Road, in Bristol.
A: Oh yes, I know it. And the postcode?
B: It's BS8 9PU.
A: Right ... and I need to know the size.
B: Yes, I've measured it carefully and it's 1.5m long ... 0.75m wide ... And it's 0.5m high or deep.
A: Great. But first can you tell me, very generally, what will be in the box?
B: Yes there's mostly clothes.
A: OK.
B: And there's some books.
A: OK. Good. Um ... Anything else?
B: Yes, there's also some toys.
A: OK and what is the total value, do you think, of the contents?
B: Well the main costs are the clothes and the books – they'll be about £1500 but then the toys are about another two hundred – so I'd put down £1700.

---

Part 1 — Multiple Choice (Q9–10)

(A customer has been arranging with a shipping agent to send a large box overseas. This is the last part of the conversation.)

A: OK right. Now obviously insurance is an important thing to consider and our companies are able to offer very good rates in a number of different all-inclusive packages.
B: Sorry, could you explain a bit more?
A: Yes, sorry, um. There's really three rates according to quality of insurance cover – there's the highest comprehensive cover which is Premium rate, then there's Standard rate and then there's Economy rate. That one will only cover the cost of the contents second hand.
B: Oh I've been stung before with Economy insurance so I'll go for the highest.
A: Mh'hm and can I just check would you want home delivery or to a local depot or would you want to pick it up at the nearest port?
B: The port'd be fine – I've got transport that end.
A: Fine and will you be paying by credit card?
B: Can I pay by cheque?`,
  },

  // ─── 3. Short-answer Questions ────────────────────────────────────────────────
  {
    id: 'p2-short-answer',
    title: 'Short-answer Questions',
    taskType: 'Short-answer Questions',
    part: 2,
    qRange: [11, 16],
    audioPath: 'ielts-listening-sample-task-3-short-answer-questions.mp3',
    instruction: 'Answer the questions below.',
    wordLimit: 'NO MORE THAN THREE WORDS AND/OR A NUMBER',
    questions: [
      { n: 11, type: 'fill', prompt: 'Factor 1 making social contact in a foreign country difficult:', answer: 'language' },
      { n: 12, type: 'fill', prompt: 'Factor 2 making social contact in a foreign country difficult:', answer: 'customs' },
      { n: 13, type: 'fill', prompt: 'Community group type (besides theatre):', answer: 'music', alts: ['music groups'] },
      { n: 14, type: 'fill', prompt: 'Community group type:', answer: 'local history', alts: ['local history groups'] },
      { n: 15, type: 'fill', prompt: 'Place 1 — information about community activities:', answer: 'library', alts: ['public library','the library','the public library','libraries'] },
      { n: 16, type: 'fill', prompt: 'Place 2 — information about community activities:', answer: 'town hall', alts: ['the town hall'] },
    ],
    tapescript: `You will hear an extract from a talk given to a group who are going to stay in the UK.

Good evening, and welcome to the British Council. My name is John Parker and I've been asked to talk to you briefly about certain aspects of life in the UK before you actually go there. So I'm going to talk first about the best ways of making social contacts there. Now you might be wondering why it should be necessary. After all, we meet people all the time. But when you're living in a foreign country it can be more difficult, not just because of the language, but because customs may be different.

If you're going to work in the UK you will probably be living in private accommodation, so it won't be quite so easy to meet people. But there are still things that you can do to help yourself. First of all, you can get involved in activities in your local community, join a group of some kind. For example, you'll probably find that there are theatre groups who might be looking for actors, set designers and so on, or if you play an instrument you could join music groups in your area. Or if you like the idea of finding out about local history there'll be a group for that too. These are just examples. And the best places to get information about things like this are either the town hall or the public library. Libraries in the UK perform quite a broad range of functions nowadays – they're not just confined to lending books, although that's their main role of course.`,
  },

  // ─── 4. Sentence Completion ───────────────────────────────────────────────────
  {
    id: 'p3-sentence-completion',
    title: 'Sentence Completion',
    taskType: 'Sentence Completion',
    part: 3,
    qRange: [27, 30],
    audioPath: 'ielts-listening-sample-task-4-sentence-completion.mp3',
    instruction: 'Complete the sentences below.',
    wordLimit: 'NO MORE THAN TWO WORDS',
    questions: [
      { n: 27, type: 'fill', prompt: 'Studying with the Open University demanded a great deal of ___', answer: 'motivation' },
      { n: 28, type: 'fill', prompt: "Studying and working at the same time improved Rachel's ___ skills.", answer: 'time-management', alts: ['time management'] },
      { n: 29, type: 'fill', prompt: 'It was helpful that the course was structured in ___', answer: 'modules' },
      { n: 30, type: 'fill', prompt: 'She enjoyed meeting other students at ___', answer: 'summer schools', alts: ['summer school'] },
    ],
    tapescript: `Two friends, Rachel and Paul, are discussing studying with the Open University.

Paul: The other thing I wanted to ask you was, did you find it hard, studying with the Open University?
Rachel: You mean, because you're studying on your own, most of the time?
Paul: Mm.
Rachel: Well it took me a while to get used to it. I found I needed to maintain a high level of motivation, because it's so different from school. There's no-one saying, 'Why haven't you written your assignment yet?' and that sort of thing.
Paul: Oh dear.
Rachel: You'll learn it, Paul. Another thing was that I got very good at time-management because I had to fit time for studying round a full-time job.
Paul: Well I'm hoping to change to working part-time, so that'll help.
Rachel: What makes it easier is that the degree is made up of modules, so you can take time off between them if you need to. It isn't like a traditional three- or four-year course, where you've got to do the whole thing of it in one go.
Paul: That's good, because I'd like to spend six months travelling next year.
Rachel: Huh, it's all right for some. Then even though you're mostly studying at home, remember you've got tutors to help you, and from time to time there are summer schools. They usually last a week. They're great, because you meet all the other people struggling with the same things as you. I've made some really good friends that way.
Paul: Sounds good. So how do I apply?`,
  },

  // ─── 5. Matching 1 — Course Options ──────────────────────────────────────────
  {
    id: 'p3-matching-courses',
    title: 'Matching — Course Options',
    taskType: 'Matching',
    part: 3,
    qRange: [21, 25],
    audioPath: 'ielts-listening-sample-task-5-matching.mp3',
    instruction: 'What does Jack tell his tutor about each course option? Write A, B or C. You may use any letter more than once.',
    sharedOptions: [
      { label: 'A', text: "He'll definitely do it." },
      { label: 'B', text: 'He may or may not do it.' },
      { label: 'C', text: "He won't do it." },
    ],
    questions: [
      { n: 21, type: 'matching', prompt: 'Media Studies', answer: 'C' },
      { n: 22, type: 'matching', prompt: 'Women and Power', answer: 'A' },
      { n: 23, type: 'matching', prompt: 'Culture and Society', answer: 'B' },
      { n: 24, type: 'matching', prompt: 'Identity and Popular Culture', answer: 'B' },
      { n: 25, type: 'matching', prompt: 'Introduction to Cultural Theory', answer: 'C' },
    ],
    tapescript: `You will hear a Communication Studies student talking to his tutor about optional courses for the next semester.

Dr Ray: Come in. Oh hello Jack. Have a seat. Right ... you said you wanted to see me to talk about your options next semester?
Jack: That's right. We have to decide by the end of next week. Really, I'd like to do all five options but we have to choose two, don't we.
Dr Ray: Yes, but the choice depends on your major to some extent. You're majoring in Communication Studies, aren't you?
Jack: That's right.
Dr Ray: So for example the Media Studies Option will cover quite a lot of the same area you did in the core module on mass communications this semester.
Jack: Mmm. Well that was interesting, but I've decided I'd rather do something completely new. There's a Women's Studies option, isn't there?
Dr Ray: Yes, 'Women and Power' – again it has a historical focus ... it's taught by Dr Steed.
Jack: Oh, really? I'll sign up for that, then. What about the option on Culture and Society?
Dr Ray: That addresses the historical debate on the place of culture since the Industrial Revolution in Britain.
Jack: So a historical focus again ...
Dr Ray: Do I get the message you're not so keen on history?
Jack: Well, it's just we seem to have done quite a lot this semester … anyway I'll think about that one.
Dr Ray: If you're interested in a course focusing on current issues there's the option on Identity and Popular Culture – that approaches the subject through things like contemporary film, adverts, soap operas and so on.
Jack: Oh? That sounds interesting. Can you tell me who runs it?
Dr Ray: Well, it's normally Dr Stevens but he's on sabbatical next semester, so I'm not sure who'll be running it. It should be decided by next week though.
Jack: Right, well I might wait until then to decide ... And the last option is Introduction to Cultural Theory, isn't it. I'm quite interested in that too – I was talking to one of the second year students, and she said it was really useful.
Dr Ray: Yes, but in fact in your major, you'll have covered a lot of that already in Communications 102, so that might be less useful than some of the others.
Jack: Oh, I'll forget about that one, then.`,
  },

  // ─── 6. Matching 2 — Hotels ───────────────────────────────────────────────────
  {
    id: 'p1-matching-hotels',
    title: 'Matching — Hotels',
    taskType: 'Matching',
    part: 1,
    qRange: [1, 4],
    audioPath: 'ielts-listening-sample-task-6-matching.mp3',
    instruction: 'Which hotel matches each description? Write the correct letter, A–E.',
    sharedOptions: [
      { label: 'A', text: 'The Bridge Hotel' },
      { label: 'B', text: 'Carlton House' },
      { label: 'C', text: 'The Imperial' },
      { label: 'D', text: 'The Majestic' },
      { label: 'E', text: 'The Royal Oak' },
    ],
    questions: [
      { n: 1, type: 'matching', prompt: 'is in a rural area', answer: 'E' },
      { n: 2, type: 'matching', prompt: 'only opened recently', answer: 'B' },
      { n: 3, type: 'matching', prompt: 'offers facilities for business functions', answer: 'C' },
      { n: 4, type: 'matching', prompt: 'has an indoor swimming pool', answer: 'A' },
    ],
    tapescript: `You will hear a man talking to an official at a tourist information office.

Official: Can I help you?
Man: Yes, I was wanting somewhere to stay for a few days - a four- or five-star hotel. Can you tell me something about the possibilities?
Official: OK, right, well there are five hotels that might interest you. Were you wanting a city centre location, or would you be interested in something a bit further out?
Man: Well, I do have a car so I could go for either.
Official: Well, there are two central hotels in the range you're looking for – there's Carlton House and The Imperial, they're both near the main square, but if you've got your own transport you might be interested in the Royal Oak – that's out in the country, about ten kilometres away, very peaceful. Then there's the Bridge hotel and the Majestic – they're both in town but not in the centre, they're out on the airport road.
Man: Mmm that might be a bit far out actually. OK, now the other two you mentioned, in the city centre. Can you tell me a bit about them?
Official: Well, they're both excellent hotels. If you want something with a bit of character, Carlton House is quite unusual – it's a very old building that was originally a large private house. It was bought by the Vannis chain and they completely refurbished it – they took their first guests just a few months ago but it's already got an excellent reputation. That's a five-star hotel. Or there's the Imperial, which is a much more modern building. That also has its own gym and it also has internet connection and meetings rooms – it's used for conferences and corporate events as well as private guests. That's five-star as well.
Man: Does it have a swimming pool as well as a gym?
Official: No – the Royal Oak has an outdoor pool, which is lovely in the summer, but the only hotel with an indoor pool is the Bridge Hotel. It doesn't have a gym though. The Majestic is planning to build a swimming pool and a fitness centre, but it's not finished yet.
Man: I see. Well, I think I'll probably go for one of the city centre hotels.`,
  },

  // ─── 7. Plan/Map/Diagram Labelling ───────────────────────────────────────────
  {
    id: 'p2-diagram-labelling',
    title: 'Plan / Map / Diagram Labelling',
    taskType: 'Diagram Labelling',
    part: 2,
    qRange: [11, 15],
    audioPath: 'ielts-listening-sample-task-7-plan-map-diagram-labelling.mp3',
    imagePaths: ['task7.png'],
    instruction: 'Label the plan below. Choose FIVE answers from the box (A–I) and write the correct letters next to questions 11–15.',
    sharedOptions: [
      { label: 'A', text: 'Art collection' },
      { label: 'B', text: "Children's books" },
      { label: 'C', text: 'Computers' },
      { label: 'D', text: 'Local history collection' },
      { label: 'E', text: 'Meeting room' },
      { label: 'F', text: 'Multimedia' },
      { label: 'G', text: 'Periodicals' },
      { label: 'H', text: 'Reference books' },
      { label: 'I', text: 'Tourist information' },
    ],
    questions: [
      { n: 11, type: 'matching', prompt: 'Room 11', answer: 'H' },
      { n: 12, type: 'matching', prompt: 'Room 12', answer: 'G' },
      { n: 13, type: 'matching', prompt: 'Room 13', answer: 'D' },
      { n: 14, type: 'matching', prompt: 'Room 14', answer: 'B' },
      { n: 15, type: 'matching', prompt: 'Room 15', answer: 'F' },
    ],
    tapescript: `You will hear the librarian of a new town library talking to a group of people who are visiting the library.

OK everyone. So here we are at the entrance to the town library. My name is Ann, and I'm the chief librarian here, and you'll usually find me at the desk just by the main entrance here. So I'd like to tell you a bit about the way the library is organised, and what you'll find where … and you should all have a plan in front of you. Well, as you see my desk is just on your right as you go in, and opposite this the first room on your left has an excellent collection of reference books and is also a place where people can read or study peacefully. Just beyond the librarian's desk on the right is a room where we have up to date periodicals such as newspapers and magazines and this room also has a photocopier in case you want to copy any of the articles. If you carry straight on you'll come into a large room and this is the main library area. There is fiction in the shelves on the left, and non-fiction materials on your right, and on the shelves on the far wall there is an excellent collection of books relating to local history. Through the far door in the library just past the fiction shelves is a seminar room, and that can be booked for meetings or talks, and next door to that is the children's library, which has a good collection of stories and picture books for the under elevens. Then there's a large room to the right of the library area – that's the multimedia collection, where you can borrow videos and DVDs and so on. It was originally the art collection but that's been moved to another building.`,
  },

  // ─── 8. Note Completion ───────────────────────────────────────────────────────
  {
    id: 'p2-note-completion',
    title: 'Note Completion',
    taskType: 'Note Completion',
    part: 2,
    imagePaths: ['task8-1.png', 'task8-2.png'],
    qRange: [11, 20],
    audioPath: 'ielts-listening-sample-task-8-note-completion.mp3',
    instruction: 'Complete the notes below.',
    wordLimit: 'NO MORE THAN THREE WORDS AND/OR A NUMBER',
    questions: [
      { n: 11, type: 'fill', prompt: 'Well known for:', answer: 'classical music', alts: ['classical music concerts','classical concerts'] },
      { n: 12, type: 'fill', prompt: 'Complex also includes (besides concert rooms etc.):', answer: 'bookshop', alts: ['a bookshop','book shop','a book shop','bookstore'] },
      { n: 13, type: 'fill', prompt: '1960s — Centre was ___:', answer: 'planned' },
      { n: 14, type: 'fill', prompt: 'Opened to public in:', answer: '1983', alts: ['the 1980s'] },
      { n: 15, type: 'fill', prompt: 'Managed by:', answer: 'City Council', alts: ['the City Council'] },
      { n: 16, type: 'fill', prompt: 'Open ___ days per year:', answer: '363' },
      { n: 17, type: 'fill', prompt: '"The Magic Flute" venue:', answer: 'Garden Hall', alts: ['the Garden Hall'] },
      { n: 18, type: 'fill', prompt: 'Canadian film title:', answer: 'Three Lives' },
      { n: 19, type: 'fill', prompt: 'Canadian film ticket price:', answer: '£4.50', alts: ['4.50'] },
      { n: 20, type: 'fill', prompt: 'Art exhibition title:', answer: 'Faces of China' },
    ],
    tapescript: `You will hear a man talking on the radio about a National Arts Centre.

Hello, and welcome to "Focus on the Arts". I'm your host - Dave Green - and this is your very own local radio programme. Every Friday evening we put the spotlight on different arts and culture facilities, and look at the shows and events that are on offer in the coming week.

And today the focus is on The National Arts Centre. Now, if you don't already know it yourself, I'm sure you've all heard of it. It's famous throughout the world as one of the major venues for classical music.

But did you know that it's actually much more than just a place to hear concerts? The Centre itself is a huge complex that caters for a great range of arts. Under a single roof it houses concert rooms, theatres, cinemas, art galleries and a wonderful public library, as well as service facilities including 3 restaurants and a book shop. So, at any one time, the choice of entertainment there is simply enormous.

So, how did they manage to build such a big arts complex right in the heart of the city? Well, the area was completely destroyed by bombs during the war in 1940. So, the opportunity was taken to create a cultural centre that would be, what they called: 'the City's gift to the Nation'. Of course, it took a while for such a big project to get started, but it was planned in the 60s, built in the 70s and eventually opened to the public in 1983. Ever since then it has proved to be a great success. It's not privately owned, like many arts centres, but is still in public hands: - it's run by the City Council. Both our National Symphony Orchestra and National Theatre Company were involved in the planning of the project, and they are now based there - giving regular performances every week - and as the Centre is open 363 days of the year, there are plenty of performances to choose from.

So, to give you some idea of what's on, and to help you choose from the many possibilities, we've made a selection of the star attractions.

If you're interested in classical music, then we recommend you go along to the National on either Monday or Tuesday evening at 7.30 for a spectacular production of 'The Magic Flute' - probably the most popular of all Mozart's operas. It's in the Garden Hall and tickets start at only £8.00.

For those more interested in the cinema, you might like to see the new Canadian film which is showing on Wednesday evening at 8pm in Cinema 2. And that's called 'Three Lives.' It's had fantastic reviews and tickets cost just £4.50, which is a reduction on the usual price of £5.50.

But you can see the centre's main attraction at the weekend, because on Saturday and Sunday, 11am to 10pm, they're showing a wonderful new exhibition that hasn't been seen anywhere else in Europe yet. It's a collection of Chinese Art called 'Faces of China' - that's in Gallery 1 - and the good news is that it's completely free, so don't miss it!`,
  },
];
