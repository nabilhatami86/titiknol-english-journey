export type CommandUSAVocab = {
  id: string;
  insteadOf: string;
  sayLike: string;
  implies: string;
  translation?: string; // Indonesian translation or short gloss
  notes?: string;
};

export const commandUSAvocab: CommandUSAVocab[] = [
  {
    id: "my-bad",
    insteadOf: "I am sorry",
    sayLike: '"My bad" / "My mistake"',
    implies: "A casual way to take ownership of a small mistake.",
    translation: "Maaf, salahku / Maaf (saya yang salah)",
    notes:
      "Informal, use with friends or peers. Not suitable for professional apologies.",
  },
  {
    id: "beats-me",
    insteadOf: "I don't know",
    sayLike: '"Beats me" / "Dunno"',
    implies: "Friendly, relaxed way to say you have no idea.",
    translation: "Entahlah / Gak tahu",
    notes: "Often accompanied by a shoulder shrug.",
  },
  {
    id: "gotcha",
    insteadOf: "I understand",
    sayLike: '"I get it" / "Gotcha"',
    implies:
      "Short, quick acknowledgement that you follow what someone is saying.",
    notes: "Great for quick confirmations in conversation or text.",
  },
  {
    id: "gonna-crash",
    insteadOf: "I'm going to sleep",
    sayLike: '"I\'m gonna crash" / "Hit the sack"',
    implies: "Expressing that you are completely exhausted and heading to bed.",
    notes: "'Crash' implies falling asleep quickly because you are very tired.",
  },
  {
    id: "no-worries",
    insteadOf: "You're welcome",
    sayLike: '"No worries" / "Anytime"',
    implies: "Downplays the favor, making it sound effortless.",
    notes: "Very common for small favors. 'No problem' is also widely used.",
  },
  {
    id: "swamped",
    insteadOf: "I'm very busy",
    sayLike: '"I\'m swamped" / "My hands are full"',
    implies: "Visual ways to describe having a massive amount of work.",
    notes: "Can be used in both casual and professional workplace settings.",
  },
  {
    id: "hang-out",
    insteadOf: "Let's meet up",
    sayLike: '"Let\'s hang out" / "Let\'s link up"',
    implies: "The ultimate casual invitation to spend time together.",
    notes:
      "Usually implies doing something low-pressure, like watching TV or grabbing a coffee.",
  },
  {
    id: "whats-up",
    insteadOf: "How are you?",
    sayLike: '"What\'s up?" / "How\'s it going?"',
    implies:
      "A casual, friendly greeting checking in on someone's current status.",
    notes:
      "When someone says 'What's up?', the standard reply is usually 'Not much' rather than 'I am fine'.",
  },
  {
    id: "catch-you-later",
    insteadOf: "Goodbye",
    sayLike: '"Catch you later" / "Take it easy"',
    implies: "A warm, relaxed way to part ways with someone.",
    notes: "'Take it easy' also doubles as a way to tell someone to relax.",
  },
  {
    id: "chill-out",
    insteadOf: "Calm down",
    sayLike: '"Chill out" / "Take a breather"',
    implies: "Advising someone to relax or not take things too seriously.",
    notes:
      "Can sometimes sound dismissive if the person is very angry, so use with care.",
  },
  {
    id: "whats-up",
    insteadOf: "How are you?",
    sayLike: '"What\'s up?" / "How\'s it going?"',
    implies: "A casual, friendly greeting checking in on someone.",
    notes: "Reply with 'Not much' or 'Same old'.",
  },
  {
    id: "catch-you-later",
    insteadOf: "Goodbye",
    sayLike: '"Catch you later" / "Later!"',
    implies: "A relaxed way to part ways with someone.",
    notes: "Often shortened to just 'Later!' among close friends.",
  },
  {
    id: "take-it-easy",
    insteadOf: "Goodbye / Have a good day",
    sayLike: '"Take it easy"',
    implies: "Wishing someone a relaxed and stress-free day as you leave.",
    notes: "Very common when leaving a store or saying bye to a colleague.",
  },
  {
    id: "howdy",
    insteadOf: "Hello",
    sayLike: '"Howdy!"',
    implies: "A friendly, country-style greeting.",
    notes: "Very common in the Southern and Western United States.",
  },
  {
    id: "whats-good",
    insteadOf: "What is new with you?",
    sayLike: '"What\'s good?" / "What\'s happening?"',
    implies: "Modern, urban way to ask someone what is going on in their life.",
    notes: "Very casual slang.",
  },
  {
    id: "take-care",
    insteadOf: "Goodbye and stay safe",
    sayLike: '"Take care"',
    implies: "A warm, genuine way to say goodbye to someone you care about.",
    notes: "Slightly warmer than just saying 'Bye'.",
  },
  {
    id: "look-who-it-is",
    insteadOf: "I am surprised to see you here",
    sayLike: '"Look who it is!"',
    implies: "An enthusiastic greeting when you run into someone unexpectedly.",
    notes: "Always said with a smile.",
  },
  {
    id: "long-time-no-see",
    insteadOf: "I have not seen you for a long time",
    sayLike: '"Long time no see!" / "It\'s been ages!"',
    implies:
      "Greeting someone you haven't crossed paths with in months or years.",
    notes: "A classic, universally understood expression.",
  },
  {
    id: "peace-out",
    insteadOf: "Goodbye",
    sayLike: '"Peace out!" / "Peace"',
    implies: "A slang greeting used when leaving.",
    notes: "Often accompanied by a peace sign gesture.",
  },
  {
    id: "good-seeing-you",
    insteadOf: "It was nice to meet you",
    sayLike: '"Good seeing you!" / "Great catching up!"',
    implies: "Said at the end of a conversation with someone you already know.",
    notes: "Makes the other person feel valued.",
  },

  // --- 11-20: Apologies & Gratitude ---
  {
    id: "my-bad",
    insteadOf: "I am sorry",
    sayLike: '"My bad" / "My mistake"',
    implies: "A casual way to take ownership of a small mistake.",
    notes: "Use for small things like bumping into someone or making a typo.",
  },
  {
    id: "no-worries",
    insteadOf: "You're welcome",
    sayLike: '"No worries" / "Anytime"',
    implies: "Downplays the favor, making it sound effortless.",
    notes: "Very common response to 'Thank you'.",
  },
  {
    id: "dont-sweat-it",
    insteadOf: "Do not worry about it",
    sayLike: '"Don\'t sweat it"',
    implies: "Telling someone that a mistake they made is not a big deal.",
    notes: "Reassuring tone.",
  },
  {
    id: "thanks-a-bunch",
    insteadOf: "Thank you very much",
    sayLike: '"Thanks a bunch" / "Thanks a million"',
    implies: "An enthusiastic, friendly way to express high gratitude.",
    notes: "Sounds warm and sincere.",
  },
  {
    id: "i-owe-you-one",
    insteadOf: "Thank you for helping me",
    sayLike: '"I owe you one" / "I owe you big time"',
    implies:
      "Acknowledging that someone did you a major favor and you plan to return it.",
    notes: "Great for building good relationships.",
  },
  {
    id: "no-biggie",
    insteadOf: "It is not a big problem",
    sayLike: '"No biggie" / "No big deal"',
    implies:
      "Informing someone that a situation or problem is tiny and easy to fix.",
    notes: "Very casual, youthful slang.",
  },
  {
    id: "much-appreciated",
    insteadOf: "Thank you",
    sayLike: '"Much appreciated!"',
    implies: "A semi-casual, polite way to thank someone for their effort.",
    notes: "Works well in casual work emails too.",
  },
  {
    id: "my-apologies",
    insteadOf: "I am very sorry",
    sayLike: '"My apologies"',
    implies: "A slightly more polite or professional way to say sorry.",
    notes: "Good for text or work settings when 'My bad' is too casual.",
  },
  {
    id: "you-saved-my-life",
    insteadOf: "Thank you for saving me from a difficult situation",
    sayLike: '"You saved my life!" / "You\'re a lifesaver!"',
    implies: "Extreme gratitude when someone helps you out of a tight spot.",
    notes: "Exaggerated for dramatic, friendly effect.",
  },
  {
    id: "forget-about-it",
    insteadOf: "You do not need to thank me",
    sayLike: '"Forget about it!" / "Fuggetaboutit"',
    implies:
      "Telling someone that the favor was so small it doesn't even need a thank you.",
    notes: "Famous in East Coast / New York accents.",
  },

  // --- 21-30: Agreement & Understanding ---
  {
    id: "gotcha",
    insteadOf: "I understand what you mean",
    sayLike: '"Gotcha" / "I get it"',
    implies:
      "Short, quick acknowledgement that you follow what someone is saying.",
    notes: "Perfect for quick texts or fast verbal replies.",
  },
  {
    id: "i-feel-you",
    insteadOf: "I empathize with your situation",
    sayLike: '"I feel you" / "I hear you"',
    implies: "Deeply agreeing with someone's emotional state or complaints.",
    notes: "Shows high empathy.",
  },
  {
    id: "fair-enough",
    insteadOf: "I accept your point or excuse",
    sayLike: '"Fair enough"',
    implies:
      "Acknowledging that the other person's reasoning makes logical sense.",
    notes: "Used even if you don't fully agree, but respect their logic.",
  },
  {
    id: "totally",
    insteadOf: "I completely agree with you",
    sayLike: '"Totally!" / "For real!"',
    implies: "Showing 100% agreement with what someone just said.",
    notes: "Extremely common in casual American dialogue.",
  },
  {
    id: "you-bet",
    insteadOf: "Yes, absolutely",
    sayLike: '"You bet!"',
    implies: "An enthusiastic way to say 'yes' or 'certainly'.",
    notes: "Can also mean 'you're welcome' in the Midwest.",
  },
  {
    id: "i-am-down",
    insteadOf: "I agree to participate in this plan",
    sayLike: '"I\'m down" / "I\'m game"',
    implies: "Confirming that you want to join an activity or event.",
    notes: "Example: 'Want to get pizza?' -> 'I'm down!'",
  },
  {
    id: "same-here",
    insteadOf: "I agree, I have the same opinion/experience",
    sayLike: '"Same here" / "Ditto"',
    implies: "Short way of saying 'Me too' or 'I feel exactly the same way'.",
    notes: "Saves time in conversation.",
  },
  {
    id: "makes-sense",
    insteadOf: "That is a logical conclusion",
    sayLike: '"Makes sense" / "That checks out"',
    implies: "Agreeing that a story, explanation, or fact is logical and true.",
    notes: "'Checks out' sounds like a detective verifying a clue.",
  },
  {
    id: "you-called-it",
    insteadOf: "Your prediction was correct",
    sayLike: '"You called it!"',
    implies:
      "Telling someone that what they predicted earlier actually happened.",
    notes: "Praising their intuition.",
  },
  {
    id: "bet",
    insteadOf: "Okay, I agree to that arrangement",
    sayLike: '"Bet!" / "Alright, bet."',
    implies:
      "Gen-Z / Modern slang meaning 'Okay, let's do it' or 'I accept that challenge'.",
    notes: "Very popular among teenagers and young adults.",
  },

  // --- 31-40: Ignorance & Confusion ---
  {
    id: "beats-me",
    insteadOf: "I do not know the answer",
    sayLike: '"Beats me" / "Dunno"',
    implies: "Friendly, relaxed way to admit you have absolutely no idea.",
    notes: "Often paired with a shrug.",
  },
  {
    id: "clueless",
    insteadOf: "I am completely confused or uninformed",
    sayLike: '"I\'m clueless" / "I have no clue"',
    implies: "Stating that you lack any information to answer a question.",
    notes: "A bit more dramatic than just 'I don't know'.",
  },
  {
    id: "i-am-lost",
    insteadOf: "I do not understand the explanation",
    sayLike: '"I\'m lost" / "You lost me"',
    implies:
      "Admitting that a conversation, lecture, or direction became too complicated to follow.",
    notes: "Signals the other person to slow down.",
  },
  {
    id: "clear-as-mud",
    insteadOf: "That explanation is very confusing",
    sayLike: '"Clear as mud"',
    implies:
      "A sarcastic way to say that an explanation made things more confusing, not clearer.",
    notes: "Sarcastic tone.",
  },
  {
    id: "out-of-the-loop",
    insteadOf: "I do not know the latest news on this topic",
    sayLike: '"I\'m out of the loop"',
    implies:
      "Being unaware of information that a specific group of people already knows.",
    notes: "Opposite of 'in the loop'.",
  },
  {
    id: "search-me",
    insteadOf: "I have no idea why or how",
    sayLike: '"Search me!"',
    implies:
      "An old-school but common slang meaning 'Don't ask me, I don't know either'.",
    notes: "Spoken with hands raised open.",
  },
  {
    id: "draw-a-blank",
    insteadOf: "I forgot the information suddenly",
    sayLike: '"I\'m drawing a blank"',
    implies:
      "When you know you know a word or name, but your brain fails to remember it at that exact second.",
    notes: "Happens a lot during tests or introductions.",
  },
  {
    id: "rings-a-bell",
    insteadOf: "That sounds slightly familiar to me",
    sayLike: '"That rings a bell"',
    implies:
      "Hearing a name or concept that you think you have encountered before, but aren't 100% sure.",
    notes: "Example: 'Do you know John?' -> 'The name rings a bell...'",
  },
  {
    id: "over-my-head",
    insteadOf: "This topic is too difficult for me to understand",
    sayLike: '"It went way over my head"',
    implies:
      "Expressing that a subject (like advanced math or coding) is beyond your current knowledge level.",
    notes: "Visualizes information flying high above your brain.",
  },
  {
    id: "not-that-i-know-of",
    insteadOf: "As far as my information goes, no",
    sayLike: '"Not that I know of"',
    implies:
      "Answering 'no' while leaving a small possibility that you might be wrong.",
    notes: "A safe, cautious response.",
  },

  // --- 41-50: Exhaustion & Sleep ---
  {
    id: "gonna-crash",
    insteadOf: "I am going to sleep immediately",
    sayLike: '"I\'m gonna crash" / "Hit the sack"',
    implies: "Expressing that you are completely exhausted and heading to bed.",
    notes: "'Crash' implies passing out instantly from exhaustion.",
  },
  {
    id: "dead-tired",
    insteadOf: "I am extremely exhausted",
    sayLike: '"I\'m dead tired" / "I\'m wiped out"',
    implies: "Having zero energy left in your body.",
    notes: "Great to use after a long shift or workout.",
  },
  {
    id: "running-on-fumes",
    insteadOf: "I am working despite having no sleep/energy",
    sayLike: '"I\'m running on fumes"',
    implies:
      "Surviving and functioning purely on willpower because you lack sleep or food.",
    notes: "Metaphor of a car running on an empty gas tank's vapor.",
  },
  {
    id: "burnt-out",
    insteadOf: "I am physically and mentally exhausted from long-term stress",
    sayLike: '"I\'m completely burnt out"',
    implies:
      "Long-term exhaustion, usually caused by overworking for months without a break.",
    notes: "A serious state of chronic stress.",
  },
  {
    id: "turn-in",
    insteadOf: "I am going to bed now",
    sayLike: '"I think I\'m going to turn in"',
    implies:
      "A casual, slightly cozy way to announce you are going to sleep for the night.",
    notes: "Often used late at night around family or roommates.",
  },
  {
    id: "sleep-on-it",
    insteadOf: "Delay making a decision until tomorrow",
    sayLike: '"Let me sleep on it"',
    implies:
      "Asking for extra time to think about an important choice overnight.",
    notes: "Helps avoid making impulsive decisions.",
  },
  {
    id: "hit-the-snooze",
    insteadOf: "Delay waking up by pressing the alarm button",
    sayLike: '"I hit snooze three times"',
    implies: "Being too tired to get out of bed when the morning alarm rings.",
    notes: "Relatable daily life situation.",
  },
  {
    id: "out-like-a-light",
    insteadOf: "Fell asleep incredibly fast",
    sayLike: '"He was out like a light"',
    implies:
      "Describing someone who fell asleep within seconds of their head touching the pillow.",
    notes: "Like turning off a light switch.",
  },
  {
    id: "drowsy",
    insteadOf: "Feeling sleepy during the day",
    sayLike: '"This medicine makes me drowsy"',
    implies: "Fighting off sleepiness during active hours.",
    notes: "Often seen on medical warning labels.",
  },
  {
    id: "catch-some-zzzs",
    insteadOf: "Go get some sleep or a nap",
    sayLike: '"I need to catch some zzz\'s"',
    implies: "An old-school cartoon-style phrase for sleeping.",
    notes: "Refers to the 'Z-Z-Z' letters used to represent snoring in comics.",
  },

  // --- 51-60: Being Busy & Work ---
  {
    id: "swamped",
    insteadOf: "I have a massive amount of work to do",
    sayLike: '"I\'m swamped" / "My hands are full"',
    implies:
      "Visual way to describe drowning under a pile of tasks and duties.",
    notes: "Safe for both casual and corporate environments.",
  },
  {
    id: "call-it-a-day",
    insteadOf: "Stop working for the rest of the day",
    sayLike: '"Let\'s call it a day"',
    implies:
      "Deciding that enough work has been done and it's time to go home or relax.",
    notes: "Commonly used by managers to release employees.",
  },
  {
    id: "crunch-time",
    insteadOf: "A period of high pressure where hard work is required",
    sayLike: '"It\'s crunch time before the launch"',
    implies:
      "The critical final days before a major deadline where everyone must work extra hard.",
    notes: "Very popular in tech and project management.",
  },
  {
    id: "cut-corners",
    insteadOf: "Do something cheaply or poorly to save resources",
    sayLike: '"Don\'t cut corners on safety"',
    implies:
      "Skipping important steps or using cheap materials to finish faster.",
    notes: "Usually carries a negative meaning.",
  },
  {
    id: "back-to-the-drawing-board",
    insteadOf: "Start a failed project over from the very beginning",
    sayLike: '"That plan failed, so back to the drawing board"',
    implies: "Accepting failure and preparing to design a brand new strategy.",
    notes: "Encourages resilience.",
  },
  {
    id: "on-the-same-page",
    insteadOf: "Thinking alike or having the same understanding",
    sayLike: '"Are we all on the same page?"',
    implies:
      "Ensuring that everyone in a team has the exact same goals and information.",
    notes: "Crucial corporate phrase.",
  },
  {
    id: "pullweight",
    insteadOf: "Do your fair share of work in a group project",
    sayLike: '"Everyone needs to pull their own weight"',
    implies:
      "Expecting every team member to contribute equally instead of being lazy.",
    notes: "Direct, slightly strict tone.",
  },
  {
    id: "slack-off",
    insteadOf: "Waste time or work lazily when you should be productive",
    sayLike: '"Stop slacking off!"',
    implies:
      "Wasting time on your phone or chatting instead of doing your job.",
    notes: "The person doing this is called a 'slacker'.",
  },
  {
    id: "get-the-ball-rolling",
    insteadOf: "Start an action or project immediately",
    sayLike: '"Let\'s get the ball rolling on this production"',
    implies: "Initiating the first step of a major task so momentum can build.",
    notes: "Motivating phrase.",
  },
  {
    id: "play-catch-up",
    insteadOf: "Work hard to reach the standard after falling behind",
    sayLike: '"I\'m playing catch-up after my vacation"',
    implies:
      "Dealing with a massive backlog of emails or tasks that accumulated while you were gone.",
    notes: "Highly relatable for professionals.",
  },

  // --- 61-70: Socializing & Hanging Out ---
  {
    id: "hang-out",
    insteadOf: "Meet up to spend leisure time together",
    sayLike: '"Let\'s hang out" / "Let\'s link up"',
    implies:
      "The ultimate casual invitation to spend low-pressure time together.",
    notes: "Can mean watching movies, eating, or just sitting around.",
  },
  {
    id: "chill",
    insteadOf: "Relax and do nothing stressful",
    sayLike: '"We\'re just chilling at my house"',
    implies: "Spending time in a calm, peaceful, lazy environment.",
    notes: "Can also be an adjective ('He is a very chill guy').",
  },
  {
    id: "tag-along",
    insteadOf: "Accompany someone who is already going somewhere",
    sayLike: '"Do you mind if I tag along?"',
    implies:
      "Joining someone's plans or errands because you have nothing better to do.",
    notes: "Polite way to ask to join an existing group plan.",
  },
  {
    id: "show-up",
    insteadOf: "Arrive at an event or location",
    sayLike: '"He didn\'t show up to the party"',
    implies: "Physically appearing at a location where people expect you.",
    notes: "Can imply unreliability if someone fails to show up.",
  },
  {
    id: "crash-a-party",
    insteadOf: "Attend a social event without an invite",
    sayLike: '"They crashed a wedding last weekend"',
    implies:
      "Showing up uninvited to a gathering, usually for free food or fun.",
    notes: "Risky but adventurous connotation.",
  },
  {
    id: "flake",
    insteadOf: "Cancel plans at the last minute unexpectedly",
    sayLike: '"She flaked on me again"',
    implies:
      "Being unreliable and letting friends down by canceling right before meeting.",
    notes: "A person who does this constantly is called a 'flake'.",
  },
  {
    id: "catch-up",
    insteadOf: "Talk to an old friend to hear their recent news",
    sayLike: '"Let\'s grab coffee and catch up!"',
    implies:
      "Updating each other on life events after not talking for a while.",
    notes: "A very common social ritual in America.",
  },
  {
    id: "party-animal",
    insteadOf: "Someone who loves going to parties frequently",
    sayLike: '"John is a total party animal"',
    implies:
      "Describing someone with immense social energy who drinks and dances a lot.",
    notes: "Usually complimentary or funny.",
  },
  {
    id: "vibe",
    insteadOf: "The emotional atmosphere of a place or person",
    sayLike: '"This cafe has a great vibe"',
    implies:
      "Sensing the mood, energy, or aesthetic feeling of an environment.",
    notes: "Can also be a verb ('We were just vibing to the music').",
  },
  {
    id: "hit-up",
    insteadOf: "Contact someone via phone or text",
    sayLike: '"Hit me up when you arrive"',
    implies: "A quick text or call to coordinate plans.",
    notes: "Often abbreviated as 'HMU' in texting slang.",
  },

  // --- 71-80: Money & Shopping ---
  {
    id: "broke",
    insteadOf: "I have no money right now",
    sayLike: '"I\'m completely broke"',
    implies:
      "Having a temporary lack of cash, making it impossible to buy luxury items.",
    notes: "Very common phrase among college students.",
  },
  {
    id: "rip-off",
    insteadOf: "Something that is vastly overpriced and unfair",
    sayLike: '"Ten dollars for water? What a rip-off!"',
    implies:
      "Feeling cheated or scammed by a business charging way too much money.",
    notes: "Expresses strong frustration.",
  },
  {
    id: "cough-up",
    insteadOf: "Pay money reluctantly or against your will",
    sayLike: '"I had to cough up $500 for the car repair"',
    implies:
      "Parting with your hard-earned cash for an unexpected or annoying expense.",
    notes: "Evokes the painful image of coughing up something vital.",
  },
  {
    id: "buck",
    insteadOf: "Dollar",
    sayLike: '"It only costs five bucks"',
    implies: "The absolute standard American slang for a single US dollar.",
    notes: "Used 90% of the time in casual face-to-face transactions.",
  },
  {
    id: "grand",
    insteadOf: "One thousand dollars",
    sayLike: '"The rent is two grand a month"',
    implies: "Slang for units of $1,000. 'Two grand' = $2,000.",
    notes: "Never add an 's' to grand. (Not 'two grands').",
  },
  {
    id: "foot-the-bill",
    insteadOf: "Pay for the entire expense of a group",
    sayLike: '"My company is footing the bill for dinner"',
    implies:
      "Taking financial responsibility so that others can enjoy something for free.",
    notes: "Generous or corporate context.",
  },
  {
    id: "cheapskate",
    insteadOf: "A person who hates spending money even when necessary",
    sayLike: '"Don\'t be such a cheapskate, leave a tip!"',
    implies:
      "Insulting someone who hoards money and refuses to pay their fair share.",
    notes: "Highly negative social label in America.",
  },
  {
    id: "loaded",
    insteadOf: "Extremely rich or wealthy",
    sayLike: '"Her family is absolutely loaded"',
    implies:
      "Possessing an immense amount of money, luxury assets, or capital.",
    notes: "Implying heavy pockets full of cash.",
  },
  {
    id: "dip-into-savings",
    insteadOf: "Spend money that was put away for emergencies",
    sayLike: '"I had to dip into my savings to buy a laptop"',
    implies:
      "Breaking your saving habits because you desperately need cash right now.",
    notes: "Indicates a slight financial setback.",
  },
  {
    id: "window-shopping",
    insteadOf: "Looking at items in stores without intending to buy anything",
    sayLike: '"We just went window-shopping at the mall"',
    implies:
      "Strolling through commercial districts purely for entertainment and visual pleasure.",
    notes: "A popular, free weekend activity.",
  },

  // --- 81-90: Food & Eating ---
  {
    id: "starving",
    insteadOf: "I am very hungry",
    sayLike: '"I\'m starving!" / "I\'m famished!"',
    implies: "Exaggerating a normal appetite to demand food immediately.",
    notes: "Rarely means actual literal starvation in casual chats.",
  },
  {
    id: "grab-a-bite",
    insteadOf: "Go get a quick and casual meal together",
    sayLike: '"Want to grab a bite before the movie?"',
    implies: "Inviting someone for fast food, snacks, or a simple diner meal.",
    notes: "Implying a short, non-formal eating session.",
  },
  {
    id: "pig-out",
    insteadOf: "Eat a massive, unhealthy amount of food",
    sayLike: '"We pigged out on pizza and wings last night"',
    implies:
      "Losing control of your diet and indulging heavily in delicious comfort foods.",
    notes: "Fun, guilt-free slang.",
  },
  {
    id: "leftovers",
    insteadOf: "Food remaining from a previous meal preserved for later",
    sayLike: '"I\'m just heating up some leftovers for lunch"',
    implies: "Eating yesterday's home-cooked dinner today.",
    notes: "A staple habit of American domestic life.",
  },
  {
    id: "have-a-sweet-tooth",
    insteadOf: "Love eating sugary foods and desserts",
    sayLike: '"I have a major sweet tooth"',
    implies: "Constantly craving candy, ice cream, chocolate, or cake.",
    notes: "Cute metaphor.",
  },
  {
    id: "hit-the-spot",
    insteadOf: "The food or drink was exactly what I desired",
    sayLike: '"Wow, that iced coffee really hit the spot"',
    implies:
      "Experiencing extreme satisfaction from a refreshing snack when you needed it most.",
    notes: "Can apply to cool drinks on a hot summer day.",
  },
  {
    id: "grub",
    insteadOf: "Food",
    sayLike: '"Let\'s go get some grub"',
    implies: "A very rugged, casual term for hearty meals.",
    notes: "Often associated with pub food, BBQ, or burgers.",
  },
  {
    id: "doggy-bag",
    insteadOf: "A container used to take restaurant leftovers home",
    sayLike: '"Can I get a doggy bag for this steak?"',
    implies:
      "Asking the waiter to pack your unfinished meal so it doesn't go to waste.",
    notes: "Completely standard practice in American restaurants.",
  },
  {
    id: "on-the-house",
    insteadOf: "Free of charge provided by the restaurant",
    sayLike: '"The bartender gave us these drinks on the house"',
    implies:
      "A business gifting a customer an item as a courtesy gesture or apology.",
    notes: "Saves you money.",
  },
  {
    id: "dine-and-dash",
    insteadOf: "Run out of a restaurant without paying the bill",
    sayLike: '"Those teenagers tried to dine and dash"',
    implies: "An illegal, trashy act of stealing food service and fleeing.",
    notes: "Highly illegal and looked down upon.",
  },

  // --- 91-105: Emotions, Reactions & Miscellaneous Slang ---
  {
    id: "hyped",
    insteadOf: "Extremely excited about an upcoming event",
    sayLike: '"I\'m so hyped for the concert!"',
    implies: "Feeling an intense surge of positive anticipation and energy.",
    notes: "Very trendy, high-energy word.",
  },
  {
    id: "bummed",
    insteadOf: "Disappointed or slightly sad",
    sayLike: '"I was so bummed when it started raining"',
    implies: "Feeling a mild sense of sadness due to plans failing.",
    notes: "Often phrased as 'bummed out'.",
  },
  {
    id: "no-way",
    insteadOf: "I am incredibly shocked / That is impossible",
    sayLike: '"No way! Are you serious?"',
    implies:
      "Expressing pure disbelief or amazement at some wild gossip or news.",
    notes:
      "Can mean 'absolutely not' or 'wow, incredible!' depending on pitch.",
  },
  {
    id: "shady",
    insteadOf: "Suspicious, dishonest, or untrustworthy",
    sayLike: '"That website looks a little shady"',
    implies:
      "Sensing that a person or business is hiding bad intentions in the shadows.",
    notes: "Great for describing sketchy areas or scam deals.",
  },
  {
    id: "cool",
    insteadOf: "Excellent, fashionable, or acceptable",
    sayLike: '"That\'s a cool jacket" / "Yeah, that\'s cool with me"',
    implies: "The ultimate, timeless American word for approval or style.",
    notes: "Has been popular for over 70 years and never goes out of style.",
  },
  {
    id: "lame",
    insteadOf: "Boring, uncool, or pathetic",
    sayLike: '"The party was so lame, we left early"',
    implies:
      "Expressing total lack of interest or disappointment in an activity.",
    notes: "Slightly critical slang.",
  },
  {
    id: "sketchy",
    insteadOf: "Unsafe or dangerous looking",
    sayLike: '"Don\'t walk down that sketchy alley at night"',
    implies:
      "Feeling a gut instinct that a place or situation could lead to crime or harm.",
    notes: "Very common safety adjective.",
  },
  {
    id: "props",
    insteadOf: "Respect or credit given to someone for an achievement",
    sayLike: '"Props to you for passing that brutal exam"',
    implies: "Publicly recognizing someone's hard work and talent.",
    notes: "Short for 'proper respect'.",
  },
  {
    id: "chill-out",
    insteadOf: "Calm down and stop panicking/being angry",
    sayLike: '"Dude, chill out! It\'s not a big deal."',
    implies: "Telling an over-emotional person to relax their mind.",
    notes:
      "Be careful: telling an angry person to 'chill out' can sometimes make them angrier.",
  },
  {
    id: "bomb",
    insteadOf: "Excellent, amazing, or high quality",
    sayLike: '"Those tacos were the bomb!"',
    implies:
      "Describing something (usually food or music) that blew your mind with how good it was.",
    notes:
      "Always use 'the bomb' for positive meaning. (Saying something 'bombed' means it failed).",
  },
  {
    id: "screw-up",
    insteadOf: "Make a massive mess or mistake",
    sayLike: '"I really screwed up my job interview"',
    implies: "Ruining a good opportunity due to personal error.",
    notes: "Slightly softer than vulgar alternatives.",
  },
  {
    id: "for-real",
    insteadOf: "Are you telling the truth? / I am serious",
    sayLike: '"I\'m for real, it actually happened!"',
    implies: "Asserting that you are not joking or exaggerating a crazy story.",
    notes: "Can be asked as a question: 'For real?'",
  },
  {
    id: "rip",
    insteadOf: "That is a highly unfortunate situation",
    sayLike: '"You lost your wallet? RIP."',
    implies:
      "Gamer/Internet slang used casually to express sympathy for a small tragedy.",
    notes:
      "Derived from 'Rest In Peace' but used humorously for minor bad luck.",
  },
  {
    id: "go-with-the-flow",
    insteadOf: "Be flexible and adapt to changing situations easily",
    sayLike: "\"I don't have a strict plan, let's just go with the flow\"",
    implies:
      "Being relaxed and letting circumstances guide your day instead of controlling everything.",
    notes: "Highly praised personality trait in casual social circles.",
  },
  {
    id: "period",
    insteadOf: "And that is final, there is no more discussion",
    sayLike: '"I am not going, period."',
    implies:
      "Placing an absolute, unmovable boundary at the end of your statement.",
    notes: "Refers to the punctuation mark (.) that ends a sentence.",
  },
];

export default commandUSAvocab;
