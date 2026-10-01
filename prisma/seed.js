/**
 * CurioQuest seed — Class 1-7 curriculum across three tracks:
 *   MIND   — school subjects
 *   TOOLS  — how tools & technology work (the unique angle)
 *   CREATE — curriculum activities & life skills
 *
 * Every lesson carries:
 *   story   — animated storybook scenes (emoji + text) read aloud by narrator
 *   mission — a real-world offline activity parents confirm
 *
 * Run:  npm run db:seed
 * Idempotent: safe to run repeatedly (upserts on natural keys).
 */

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// ─── Classes ─────────────────────────────────────────────────────────────────

const CLASSES = [
  { grade: 1, name: "Class 1", description: "Foundations: letters, numbers, and the world around you." },
  { grade: 2, name: "Class 2", description: "Building fluency in reading, writing, and arithmetic." },
  { grade: 3, name: "Class 3", description: "Multiplication, fractions, and curious science." },
  { grade: 4, name: "Class 4", description: "Long division, ecosystems, and map skills." },
  { grade: 5, name: "Class 5", description: "Decimals, percentages, and ancient history." },
  { grade: 6, name: "Class 6", description: "Ratios, algebra basics, and earth science." },
  { grade: 7, name: "Class 7", description: "Pre-algebra to algebra, physics, and civics." },
];

// ─── Question helpers ────────────────────────────────────────────────────────

/** Multiple choice: one correct answer. options: string[] in display order. */
const mcq = (prompt, correct, wrong, opts = {}) => ({
  type: "MULTIPLE_CHOICE",
  prompt,
  emoji: opts.emoji ?? null,
  options: [correct, ...wrong].map((text, i) => ({
    order: i,
    text,
    emoji: null,
    isCorrect: i === 0,
  })),
});

/** Tap-the-picture: options are emoji; the kid taps the right one. */
const tap = (prompt, correctEmoji, wrongEmojis, opts = {}) => ({
  type: "MULTIPLE_CHOICE",
  prompt,
  emoji: opts.emoji ?? null,
  speak: opts.speak ?? true,
  options: [correctEmoji, ...wrongEmojis].map((emoji, i) => ({
    order: i,
    text: opts.names?.[i] ?? "",
    emoji,
    isCorrect: i === 0,
  })),
});

/** Word tiles: build the answer from shuffled tiles. */
const tiles = (prompt, answerParts, decoys = [], opts = {}) => {
  const all = [...answerParts, ...decoys];
  // deterministic shuffle so seeds are stable
  for (let i = all.length - 1; i > 0; i--) {
    const j = (i * 7 + 3) % (i + 1);
    [all[i], all[j]] = [all[j], all[i]];
  }
  return {
    type: "WORD_TILES",
    prompt,
    emoji: opts.emoji ?? null,
    speak: opts.speak ?? false,
    options: all.map((text, i) => ({
      order: i,
      text,
      emoji: null,
      isCorrect: answerParts.includes(text),
      answerPos: answerParts.indexOf(text) === -1 ? null : answerParts.indexOf(text),
    })),
  };
};

// ─── Curriculum ──────────────────────────────────────────────────────────────
// story.scenes: [{ emoji, text }] — the narrator reads each scene aloud.

const LESSON = (def) => def;

// Shared class-1 lessons used by seed (kept compact but real).
const C1_MATH_UNITS = [
  {
    title: "Counting Land",
    description: "Meet numbers 1 to 10 and learn to count anything!",
    lessons: [
      LESSON({
        title: "Numbers 1 to 5",
        story: {
          title: "Nia Counts the Stars",
          scenes: [
            { emoji: "🌙", text: "One quiet night, Nia looked up at the sky." },
            { emoji: "⭐", text: "She saw one star. Just one!" },
            { emoji: "⭐⭐", text: "Then two stars twinkled beside it." },
            { emoji: "✨", text: "Let's help Nia count all the stars!" },
          ],
        },
        mission: "Count 5 things in your room and tell a grown-up the numbers.",
        questions: [
          tap("Tap the number 3", "3️⃣", ["1️⃣", "5️⃣", "2️⃣"], { emoji: "🔢" }),
          tap("Tap 4 stars", "⭐⭐⭐⭐", ["⭐⭐", "⭐⭐⭐⭐⭐", "⭐"], { emoji: "🌟" }),
          mcq("What comes after 4?", "5", ["3", "6", "2"], { emoji: "🔢" }),
          tiles("Build: two plus one", ["two", "plus", "one"], ["four", "minus"], { emoji: "➕" }),
        ],
      }),
      LESSON({
        title: "Numbers 6 to 10",
        story: {
          title: "Ten Apples Up High",
          scenes: [
            { emoji: "🍎", text: "Milo the monkey found an apple tree." },
            { emoji: "🍎🍎🍎", text: "He picked six, seven, eight... apples!" },
            { emoji: "🐵", text: "Can you help Milo count to ten?" },
          ],
        },
        mission: "Count 10 steps from your door. Was it more or less than 10?",
        questions: [
          tap("Tap the number 7", "7️⃣", ["6️⃣", "9️⃣", "4️⃣"], { emoji: "🔢" }),
          mcq("Which is the biggest number?", "10", ["7", "8", "6"], { emoji: "📈" }),
          mcq("What comes before 9?", "8", ["10", "7", "6"], { emoji: "🔢" }),
        ],
      }),
      LESSON({
        title: "Shapes All Around",
        story: {
          title: "The Shape Parade",
          scenes: [
            { emoji: "🔴", text: "Circle rolled by, round and round." },
            { emoji: "🟥", text: "Square marched with four equal sides." },
            { emoji: "🔺", text: "Triangle jumped with three pointy corners!" },
            { emoji: "🎉", text: "Shapes are hiding everywhere. Let's find them!" },
          ],
        },
        mission: "Find one circle, one square and one triangle at home. Draw them!",
        questions: [
          tap("Tap the circle", "🔴", ["🟥", "🔺", "⬛"], { emoji: "⭕" }),
          tap("Tap the triangle", "🔺", ["🟦", "⚪", "🟨"], { emoji: "📐" }),
          mcq("How many sides does a square have?", "4", ["3", "5", "6"], { emoji: "🟥" }),
          tap("A pizza is usually a...", "🍕", ["🧊", "📚", "⚽"], { emoji: "🍽️" }),
        ],
      }),
      LESSON({
        title: "Counting Review",
        type: "TEST",
        story: {
          title: "The Counting Carnival",
          scenes: [
            { emoji: "🎡", text: "The carnival only opens for great counters!" },
            { emoji: "🎟️", text: "Answer the questions to earn your ticket." },
          ],
        },
        mission: "Teach someone younger how to count to 10.",
        questions: [
          tap("Tap 5 balloons", "🎈🎈🎈🎈🎈", ["🎈🎈🎈", "🎈🎈", "🎈🎈🎈🎈🎈🎈"], { emoji: "🎉" }),
          mcq("What comes after 6?", "7", ["5", "8", "9"], { emoji: "🔢" }),
          mcq("Which number is smallest?", "2", ["9", "5", "7"], { emoji: "📉" }),
          tap("Tap the star shape", "⭐", ["❤️", "🔶", "⚫"], { emoji: "✨" }),
        ],
      }),
    ],
  },
];

const C1_SCI_UNITS = [
  {
    title: "My Amazing Body",
    description: "Discover your senses and what your body can do.",
    lessons: [
      LESSON({
        title: "My Five Senses",
        story: {
          title: "The Senses Song",
          scenes: [
            { emoji: "👀", text: "Eyes help us see colours and light." },
            { emoji: "👂", text: "Ears catch whispers and songs." },
            { emoji: "👃", text: "Noses smell cookies baking!" },
            { emoji: "🙌", text: "Skin feels soft and rough. Tongues taste!" },
          ],
        },
        mission: "Close your eyes and ask a grown-up for 3 things to smell. Guess them!",
        questions: [
          tap("Which body part do you hear with?", "👂", ["👀", "👃", "🙌"], { emoji: "🧒" }),
          tap("Which one helps you taste?", "👅", ["👂", "👃", "🦶"], { emoji: "😋" }),
          mcq("How many senses do you have?", "5", ["2", "3", "10"], { emoji: "🖐️" }),
        ],
      }),
      LESSON({
        title: "Animal Friends",
        story: {
          title: "Who Says Moo?",
          scenes: [
            { emoji: "🐄", text: "The cow says moo and gives us milk." },
            { emoji: "🐑", text: "The sheep says baa and gives us wool." },
            { emoji: "🐔", text: "The hen lays eggs for breakfast!" },
          ],
        },
        mission: "Draw your favourite animal and tell someone 2 things it can do.",
        questions: [
          tap("Who gives us milk?", "🐄", ["🐔", "🐑", "🐈"], { emoji: "🥛" }),
          tap("Who says baa?", "🐑", ["🐄", "🐶", "🐔"], { emoji: "🐐" }),
          tap("Tap the baby chicken", "🐣", ["🐔", "🦆", "🦉"], { emoji: "🥚" }),
        ],
      }),
      LESSON({
        title: "Body Review",
        type: "TEST",
        story: {
          title: "Body Heroes",
          scenes: [
            { emoji: "🦸", text: "Your body is your first superhero suit!" },
            { emoji: "💪", text: "Show what you know, hero." },
          ],
        },
        mission: "Do 10 jumping jacks and count them out loud!",
        questions: [
          tap("Tap the sense for seeing", "👀", ["👂", "👅", "👃"], { emoji: "🌈" }),
          mcq("Which animal gives wool?", "Sheep", ["Cow", "Hen", "Cat"], { emoji: "🧶" }),
          tap("Tap the biggest animal", "🐘", ["🐭", "🐱", "🐰"], { emoji: "🔍" }),
        ],
      }),
    ],
  },
];

const C1_EN_UNITS = [
  {
    title: "Letter Party",
    description: "Meet the alphabet and first words.",
    lessons: [
      LESSON({
        title: "A B C D",
        story: {
          title: "A Makes Apple",
          scenes: [
            { emoji: "🍎", text: "A is for apple, crunchy and sweet." },
            { emoji: "🐻", text: "B is for bear, with big furry feet." },
            { emoji: "🐱", text: "C is for cat, who naps in the sun." },
            { emoji: "🎉", text: "Letters are everywhere. Let's find some!" },
          ],
        },
        mission: "Find 3 things at home that start with the letter A.",
        questions: [
          tap("A is for...", "🍎", ["🐻", "🐱", "🚗"], { emoji: "🅰️" }),
          tap("B is for...", "🐻", ["🍎", "🐱", "🎈"], { emoji: "🅱️" }),
          tap("Tap the letter C", "🅲", ["🅰️", "🅱️", "🅳"], { emoji: "🔤" }),
          tiles("Build the word: cat", ["c", "a", "t"], ["b", "s", "p"], { emoji: "🐱" }),
        ],
      }),
      LESSON({
        title: "First Words",
        story: {
          title: "The Word Bakery",
          scenes: [
            { emoji: "🥖", text: "Words are baked letter by letter." },
            { emoji: "📖", text: "Mix letters and you get new words!" },
            { emoji: "🧁", text: "Let's bake some words together." },
          ],
        },
        mission: "Read one small book page with a grown-up. Point at each word.",
        questions: [
          tiles("Build: sun", ["s", "u", "n"], ["m", "b", "p"], { emoji: "☀️" }),
          tap("Which picture is a hat?", "🎩", ["👟", "🧦", "🧤"], { emoji: "👒" }),
          mcq("Which word starts with S?", "Sun", ["Moon", "Tree", "Car"], { emoji: "☀️" }),
        ],
      }),
      LESSON({
        title: "Letter Review",
        type: "TEST",
        story: {
          title: "Alphabet Graduation",
          scenes: [
            { emoji: "🎓", text: "You know your letters. Time to celebrate!" },
            { emoji: "🏆", text: "Show off what you know!" },
          ],
        },
        mission: "Sing the alphabet song to someone you love.",
        questions: [
          tap("Tap the letter A", "🅰️", ["🅱️", "🅲", "🅳"], { emoji: "🔤" }),
          tap("M is for...", "🌙", ["🍎", "🐻", "🐱"], { emoji: "Ⓜ️" }),
          tiles("Build: dog", ["d", "o", "g"], ["c", "a", "t"], { emoji: "🐶" }),
        ],
      }),
    ],
  },
];

// ─── TOOLS track (the unique angle: how technology works) ───────────────────

const C1_TOOLS_UNITS = [
  {
    title: "Meet the Machines",
    description: "What computers, phones and robots really are.",
    lessons: [
      LESSON({
        title: "What Is a Computer?",
        story: {
          title: "Bolt the Computer",
          scenes: [
            { emoji: "💻", text: "This is Bolt. Bolt is a computer." },
            { emoji: "🧠", text: "A computer has a brain that follows your ideas." },
            { emoji: "⌨️", text: "You tell it what to do by pressing keys and tapping." },
            { emoji: "🤖", text: "Computers never get tired of trying again!" },
          ],
        },
        mission: "Ask a grown-up to show you 3 devices at home that have a screen.",
        questions: [
          tap("Tap the computer", "💻", ["🍌", "🧸", "🚲"], { emoji: "🖥️" }),
          mcq("What does a computer follow?", "Your instructions", ["The weather", "Birds", "Music only"], { emoji: "🧠" }),
          tap("Which one is NOT a computer?", "🍌", ["📱", "💻", "🖥️"], { emoji: "🤔" }),
        ],
      }),
      LESSON({
        title: "Mouse, Keys and Taps",
        story: {
          title: "How We Talk to Machines",
          scenes: [
            { emoji: "🖱️", text: "The mouse points at things on the screen." },
            { emoji: "⌨️", text: "The keyboard types letters and numbers." },
            { emoji: "👆", text: "On tablets, your finger IS the mouse!" },
          ],
        },
        mission: "Practice dragging your finger to draw a circle on a tablet or paper.",
        questions: [
          tap("Which one points at the screen?", "🖱️", ["⌨️", "🖨️", "🔊"], { emoji: "🎯" }),
          tap("Which one types letters?", "⌨️", ["🖱️", "📺", "🎧"], { emoji: "🔠" }),
          mcq("On a tablet, what works like a mouse?", "Your finger", ["A banana", "The wind", "A shoe"], { emoji: "👆" }),
        ],
      }),
      LESSON({
        title: "Machines Review",
        type: "TEST",
        story: {
          title: "Machine Helper Badge",
          scenes: [
            { emoji: "🏅", text: "Earn your Machine Helper badge!" },
            { emoji: "🤖", text: "Bolt believes in you." },
          ],
        },
        mission: "Turn a device on and off by yourself. Ask permission first!",
        questions: [
          tap("Tap the tablet", "📱", ["💻", "⌚", "🔌"], { emoji: "📲" }),
          mcq("A robot is a machine that can...", "Follow instructions", ["Grow leaves", "Bark", "Fly north"], { emoji: "🤖" }),
          tap("Tap the keyboard", "⌨️", ["🖱️", "📺", "📷"], { emoji: "🔍" }),
        ],
      }),
    ],
  },
];

// ─── CREATE track (curriculum activities & life skills) ──────────────────────

const C1_CREATE_UNITS = [
  {
    title: "Colour and Make",
    description: "Art, music, movement and making things.",
    lessons: [
      LESSON({
        title: "Colours Everywhere",
        story: {
          title: "The Colour Mixer",
          scenes: [
            { emoji: "🔴", text: "Red and yellow make..." },
            { emoji: "🟠", text: "ORANGE! Like a juicy mango." },
            { emoji: "🔵", text: "Blue and yellow mix into green, like leaves." },
            { emoji: "🌈", text: "Mix all the colours and paint your world!" },
          ],
        },
        mission: "Mix two colours with crayons or paints. What new colour did you make?",
        questions: [
          tap("Red + yellow makes...", "🟠", ["🟢", "🟣", "🟤"], { emoji: "🎨" }),
          tap("Tap something green", "🥦", ["🍓", "🍌", "🍇"], { emoji: "🌿" }),
          mcq("What colour is a banana?", "Yellow", ["Blue", "Purple", "Black"], { emoji: "🍌" }),
        ],
      }),
      LESSON({
        title: "Clap the Beat",
        story: {
          title: "The Rhythm Train",
          scenes: [
            { emoji: "🥁", text: "Boom boom clap! The rhythm train is here." },
            { emoji: "🎵", text: "Fast beats make us dance quickly." },
            { emoji: "🐢", text: "Slow beats make us move like a turtle." },
          ],
        },
        mission: "Clap along to your favourite song. Try fast, then slow!",
        questions: [
          tap("Which one do you hit to make music?", "🥁", ["🍞", "🧦", "🪑"], { emoji: "🎵" }),
          mcq("A slow beat sounds like a...", "Turtle", ["Cheetah", "Rocket", "Alarm"], { emoji: "🐢" }),
        ],
      }),
      LESSON({
        title: "Create Review",
        type: "TEST",
        story: {
          title: "Little Creator Badge",
          scenes: [
            { emoji: "🎨", text: "You made colours and rhythm today!" },
            { emoji: "🌟", text: "Creators keep trying. Show what you know!" },
          ],
        },
        mission: "Draw a picture using only 3 colours. Give it a name.",
        questions: [
          tap("Blue + yellow makes...", "🟢", ["🟠", "🟣", "🟤"], { emoji: "🌈" }),
          tap("Tap the drum", "🥁", ["🎺", "🎸", "🎻"], { emoji: "🎼" }),
          mcq("Which one is a colour?", "Purple", ["Pizza", "Chair", "Cloud only"], { emoji: "🟣" }),
        ],
      }),
    ],
  },
];

// ─── Class 1 History ─────────────────────────────────────────────────────────

const C1_HIST_UNITS = [
  {
    title: "Long Ago and Today",
    description: "How life was different when grandparents were kids.",
    lessons: [
      LESSON({
        title: "Life Long Ago",
        story: {
          title: "Grandma's Story Time",
          scenes: [
            { emoji: "👵", text: "Grandma tells stories about when she was small." },
            { emoji: "📻", text: "There were no tablets — families listened to the radio!" },
            { emoji: "✉️", text: "Letters took days to arrive. Today messages fly in seconds." },
            { emoji: "🕰️", text: "Things change as time moves forward. That's history!" },
          ],
        },
        mission: "Ask a grandparent or elder about their favourite toy. Draw it!",
        questions: [
          tap("How did families hear news long ago?", "📻", ["📱", "💻", "📺"], { emoji: "🕰️" }),
          mcq("Long ago, people sent messages by...", "Letter", ["Video call", "Text message", "Email"], { emoji: "✉️" }),
          tap("Tap something NEW", "📱", ["📻", "✉️", "🕯️"], { emoji: "✨" }),
        ],
      }),
      LESSON({
        title: "Community Heroes",
        story: {
          title: "Heroes in Our Town",
          scenes: [
            { emoji: "🚒", text: "When there's a fire, brave firefighters hurry to help." },
            { emoji: "🩺", text: "When we feel sick, doctors and nurses care for us." },
            { emoji: "👮", text: "Police officers keep our streets safe." },
            { emoji: "🌟", text: "Heroes have always been there — long ago and today!" },
          ],
        },
        mission: "Thank a helper you meet this week (a teacher, doctor or police officer).",
        questions: [
          tap("Who puts out fires?", "🚒", ["🚑", "🚓", "🚜"], { emoji: "🔥" }),
          mcq("Who helps you when you feel sick?", "Doctor", ["Pilot", "Chef", "Farmer"], { emoji: "🩺" }),
          tap("Tap the police car", "🚓", ["🚒", "🚌", "🚲"], { emoji: "👮" }),
        ],
      }),
      LESSON({
        title: "Long Ago Review",
        type: "TEST",
        story: {
          title: "Time Machine Badge",
          scenes: [
            { emoji: "⏳", text: "Your time machine is ready for a check-up!" },
            { emoji: "🏅", text: "Answer the questions to earn your badge." },
          ],
        },
        mission: "Look at an old family photo. Ask who is in it and when it was taken.",
        questions: [
          mcq("History is the story of...", "The past", ["Tomorrow", "Cartoons", "Numbers"], { emoji: "📜" }),
          tap("Tap the OLD phone", "☎️", ["📱", "⌚", "💻"], { emoji: "📞" }),
        ],
      }),
    ],
  },
];

// ─── Class 1 Geography ───────────────────────────────────────────────────────

const C1_GEO_UNITS = [
  {
    title: "My Big World",
    description: "From your home to the whole wide world.",
    lessons: [
      LESSON({
        title: "Where I Live",
        story: {
          title: "Zoom, Zoom, Zoom!",
          scenes: [
            { emoji: "🏠", text: "This is your home, warm and cosy." },
            { emoji: "🛣️", text: "Your home is on a street, in a town or city." },
            { emoji: "🗺️", text: "Cities together make a country." },
            { emoji: "🌍", text: "And all the countries together make... the whole world!" },
          ],
        },
        mission: "Draw your home, your street and one place you love in your town.",
        questions: [
          tap("Tap your home", "🏠", ["🏫", "🏭", "🏰"], { emoji: "🏡" }),
          mcq("Which one is the BIGGEST?", "The world", ["Your street", "Your city", "Your house"], { emoji: "🌍" }),
          mcq("Your home is on a...", "Street", ["Cloud", "Star", "Boat"], { emoji: "🛣️" }),
        ],
      }),
      LESSON({
        title: "Land, Water and Sky",
        story: {
          title: "The Great Outdoors",
          scenes: [
            { emoji: "⛰️", text: "Mountains stand tall and touch the clouds." },
            { emoji: "🏞️", text: "Rivers run through the land, splash splash!" },
            { emoji: "🌊", text: "The sea is so big you cannot see across it." },
            { emoji: "☀️", text: "And above it all, the sky with the sun!" },
          ],
        },
        mission: "Look outside: can you see land, water and sky? Say each one out loud!",
        questions: [
          tap("Tap the mountain", "⛰️", ["🌊", "🏕️", "🌞"], { emoji: "🗻" }),
          mcq("Where do fish live?", "In water", ["In trees", "In clouds", "In sand"], { emoji: "🐟" }),
          tap("Tap something in the SKY", "☀️", ["⛰️", "🐟", "🌳"], { emoji: "☁️" }),
        ],
      }),
      LESSON({
        title: "My World Review",
        type: "TEST",
        story: {
          title: "Little Explorer Badge",
          scenes: [
            { emoji: "🧭", text: "Explorers know their world!" },
            { emoji: "🎖️", text: "Show what you know and win your badge." },
          ],
        },
        mission: "Point north, south, east and west with a grown-up. Can you find the sunset?",
        questions: [
          tap("Tap the whole world", "🌍", ["🏠", "🚗", "🎒"], { emoji: "🗺️" }),
          mcq("A map helps us find...", "Places", ["Snacks", "Songs", "Colours"], { emoji: "🧭" }),
          tap("Tap the river", "🏞️", ["⛰️", "🏠", "⭐"], { emoji: "💦" }),
        ],
      }),
    ],
  },
];

// ─── Class 1 Environmental Studies ──────────────────────────────────────────

const C1_EVS_UNITS = [
  {
    title: "Green Friends",
    description: "Plants, trees and keeping our world clean.",
    lessons: [
      LESSON({
        title: "Plants Around Us",
        story: {
          title: "The Wise Old Tree",
          scenes: [
            { emoji: "🌳", text: "The wise old tree gives shade on hot days." },
            { emoji: "🍎", text: "It grows apples for hungry kids." },
            { emoji: "🐦", text: "Birds build nests in its branches." },
            { emoji: "💧", text: "Give a plant water and it will thank you with leaves!" },
          ],
        },
        mission: "Water one plant today. Say thank you to a tree for its shade!",
        questions: [
          tap("What do trees give us?", "🍎", ["🪨", "🧦", "🚗"], { emoji: "🌳" }),
          mcq("What does a plant need to grow?", "Water and sunlight", ["Candy and toys", "Pillows", "Music only"], { emoji: "💧" }),
          tap("Tap the leaf", "🍃", ["🪙", "🔑", "🧊"], { emoji: "🌿" }),
        ],
      }),
      LESSON({
        title: "Keep It Clean",
        story: {
          title: "The Clean Park Squad",
          scenes: [
            { emoji: "🧹", text: "The Clean Park Squad keeps the park tidy." },
            { emoji: "🍌", text: "Banana peel on the path? Into the bin it goes!" },
            { emoji: "🗑️", text: "Rubbish belongs in the bin, never on the grass." },
            { emoji: "🌈", text: "A clean park is happy for everyone — even the ducks!" },
          ],
        },
        mission: "Pick up 3 pieces of litter near your home (wear gloves or ask a grown-up).",
        questions: [
          tap("Where does rubbish go?", "🗑️", ["🌊", "🌳", "🛏️"], { emoji: "🧹" }),
          mcq("We keep parks clean by...", "Putting rubbish in bins", ["Throwing wrappers", "Feeding lions", "Digging holes"], { emoji: "✨" }),
          tap("Tap the broom", "🧹", ["🎸", "⚽", "🍕"], { emoji: "🧼" }),
        ],
      }),
      LESSON({
        title: "Green Friends Review",
        type: "TEST",
        story: {
          title: "Earth Hero Badge",
          scenes: [
            { emoji: "🦸", text: "Earth heroes care for plants and keep places clean." },
            { emoji: "🌟", text: "Show your Earth hero powers!" },
          ],
        },
        mission: "Teach someone in your family one way to keep the Earth happy.",
        questions: [
          mcq("Trees give us...", "Fruit and shade", ["Pancakes", "WiFi", "Shoes"], { emoji: "🌳" }),
          tap("Tap the recycling bin", "♻️", ["🏀", "🎹", "🪁"], { emoji: "🌍" }),
          mcq("A plant grows when we give it...", "Water", ["Chocolates", "Stickers", "Balloons"], { emoji: "🌱" }),
        ],
      }),
    ],
  },
];

// ─── Class 2+ generation: progressively harder versions ──────────────────────
// We keep the seed script focused: classes 2-7 get real, levelled questions for
// Math, Science, English, History, Geography, EVS, TOOLS and CREATE tracks.

const gradeLesson = (grade, topic, opts) => {
  const n = grade + 2; // numbers scale with grade: class 2 -> 4, class 7 -> 9
  const mathUnits = [
    {
      title: `Numbers to ${n * 100}`,
      description: `Place value and big numbers for Class ${grade}.`,
      lessons: [
        LESSON({
          title: `Place value to ${n * 100}`,
          story: {
            title: `The ${n * 100} Club`,
            scenes: [
              { emoji: "🏗️", text: `Numbers are built from blocks of ones, tens and hundreds.` },
              { emoji: "🔢", text: `In Class ${grade}, we build numbers up to ${n * 100}!` },
              { emoji: "🧩", text: "Each digit has its own special place." },
            ],
          },
          mission: `Write your age, your house number and the year. Circle the tens digit in each.`,
          questions: [
            mcq(`What is the tens digit in ${n * 42}?`, "4", ["2", `${grade}`, "9"], { emoji: "🔢" }),
            mcq(`What is ${n} tens + 3 ones?`, `${n * 10 + 3}`, [`${n + 3}`, `${n * 100 + 3}`, `${n * 10}`], { emoji: "🧱" }),
            mcq(`Which number is bigger: ${n * 10} or ${n * 10 - 1}?`, `${n * 10}`, [`${n * 10 - 1}`, "They are equal", "Cannot tell"], { emoji: "⚖️" }),
          ],
        }),
        LESSON({
          title: `Adding big numbers`,
          story: {
            title: "The Addition Elevator",
            scenes: [
              { emoji: "🛗", text: "Adding is like an elevator going up!" },
              { emoji: "➕", text: "Stack the numbers and climb floor by floor." },
              { emoji: "🎉", text: "Carry over when a floor is full!" },
            ],
          },
          mission: "Add the prices of 3 snacks at home. Were you close to the real total?",
          questions: [
            mcq(`${n * 10 + 5} + ${n * 10 + 2} = ?`, `${n * 20 + 7}`, [`${n * 20 + 3}`, `${n * 10 + 7}`, `${n * 30 + 7}`], { emoji: "➕" }),
            mcq(`What is 100 + ${n * 10}?`, `${100 + n * 10}`, [`${n * 10}`, `${n * 11}`, `${n * 100}`], { emoji: "💯" }),
            mcq(`Double ${n * 15} is...`, `${n * 30}`, [`${n * 15}`, `${n * 20}`, `${n * 45}`], { emoji: "✖️" }),
          ],
        }),
      ],
    },
  ];

  const sciUnits = [
    {
      title: grade <= 3 ? "How Things Grow" : "How the World Works",
      description: grade <= 3 ? "Plants, animals and life cycles." : "Energy, matter and earth.",
      lessons: [
        LESSON({
          title: grade <= 3 ? "Plant Life Cycle" : "Energy Everywhere",
          story: {
            title: grade <= 3 ? "The Seed's Big Day" : "The Energy Adventure",
            scenes:
              grade <= 3
                ? [
                    { emoji: "🌱", text: "A tiny seed sleeps under the soil." },
                    { emoji: "🌧️", text: "Rain wakes it up. A root reaches down." },
                    { emoji: "🌻", text: "Up grows a sprout, then leaves, then a flower!" },
                  ]
                : [
                    { emoji: "⚡", text: "Energy makes everything happen." },
                    { emoji: "☀️", text: "The sun gives energy to plants." },
                    { emoji: "🍔", text: "Plants give energy to you when you eat!" },
                  ],
          },
          mission: grade <= 3 ? "Plant a seed in a cup and water it daily. Watch it for a week!" : "Find 3 things at home that use electricity. What do they turn energy into?",
          questions:
            grade <= 3
              ? [
                  tap("What does a seed need to grow?", "🌧️", ["🌑", "🧊", "🔊"], { emoji: "🌱" }),
                  mcq("Plants make food using...", "Sunlight", ["Moonlight", "Fridge light", "TV light"], { emoji: "🌻" }),
                  tap("Tap the sprout", "🌱", ["🌳", "🍂", "🌸"], { emoji: "🔍" }),
                ]
              : [
                  mcq("The sun's energy reaches us as...", "Light and heat", ["Sound only", "Wind only", "Magnetism"], { emoji: "☀️" }),
                  mcq("A bulb turns electricity into...", "Light", ["Sound", "Food", "Water"], { emoji: "💡" }),
                  mcq("Which is a source of energy?", "The sun", ["A book", "A shoe", "A pencil"], { emoji: "🔌" }),
                ],
        }),
      ],
    },
  ];

  const enUnits = [
    {
      title: grade <= 3 ? "Sentences and Stories" : "Reading Detectives",
      description: grade <= 3 ? "Make clear sentences and tell stories." : "Find meaning, main ideas and clues.",
      lessons: [
        LESSON({
          title: grade <= 3 ? "Naming and Action Words" : "Main Idea Detective",
          story: {
            title: grade <= 3 ? "Who Did What?" : "The Case of the Hidden Idea",
            scenes:
              grade <= 3
                ? [
                    { emoji: "🏃", text: "Every sentence has a doer and an action." },
                    { emoji: "🐕", text: "\"The dog runs.\" Dog is the doer, runs is the action!" },
                    { emoji: "✍️", text: "Let's build sentences like word chefs." },
                  ]
                : [
                    { emoji: "🕵️", text: "Every story hides one big idea." },
                    { emoji: "🔍", text: "Detectives read carefully to find it." },
                    { emoji: "🧠", text: "Clues hide in the first and last lines!" },
                  ],
          },
          mission: grade <= 3 ? "Write 2 sentences about your day. Underline the action words." : "Read any story and tell a grown-up the big idea in one sentence.",
          questions:
            grade <= 3
              ? [
                  tiles("Build: The cat naps", ["The", "cat", "naps"], ["dog", "runs", "jumps"], { emoji: "🐱" }),
                  mcq("Which word is an action?", "Jump", ["Table", "Blue", "Chair"], { emoji: "🤸" }),
                  tiles("Build: Birds fly high", ["Birds", "fly", "high"], ["Fish", "swim", "low"], { emoji: "🐦" }),
                ]
              : [
                  mcq("The main idea of a story is...", "What it is mostly about", ["The longest word", "The last letter", "A picture"], { emoji: "🧠" }),
                  mcq("Which sentence gives an opinion?", "Ice cream is tasty.", ["Ice cream is frozen.", "Ice cream melts.", "Ice cream is a food."], { emoji: "🍦" }),
                ],
        }),
      ],
    },
  ];

  const toolsUnits = [
    {
      title: grade <= 3 ? "Digital Helpers" : "How Technology Works",
      description: grade <= 3 ? "Phones, cameras and safe sharing." : "The internet, apps and how they think.",
      lessons: [
        LESSON({
          title: grade <= 3 ? "Safe Sharing" : "How the Internet Works",
          story: {
            title: grade <= 3 ? "The Photo Decision" : "The Message Journey",
            scenes:
              grade <= 3
                ? [
                    { emoji: "📸", text: "Photos are fun to take!" },
                    { emoji: "🤔", text: "But once shared, they travel far and stay." },
                    { emoji: "🛡️", text: "Smart kids ask a grown-up before sharing." },
                  ]
                : [
                    { emoji: "💬", text: "You send a message. Where does it go?" },
                    { emoji: "📡", text: "It flies through wires and air to a server." },
                    { emoji: "💌", text: "The server passes it to your friend's device!" },
                    { emoji: "🔒", text: "Locks called passwords keep messages private." },
                  ],
          },
          mission: grade <= 3 ? "Ask a grown-up: what is a 'private' photo? Talk about when to ask before sharing." : "Ask a grown-up to show you your Wi-Fi router. Draw its journey of a message.",
          questions:
            grade <= 3
              ? [
                  tap("Before sharing a photo, you should...", "🙋", ["🏃", "🙈", "😭"], { emoji: "🛡️" }),
                  mcq("Who helps you decide safe sharing?", "A grown-up you trust", ["Strangers", "TV", "Nobody"], { emoji: "👨‍👩‍👧" }),
                ]
              : [
                  mcq("A server is...", "A computer that serves information", ["A robot waiter", "A kind of cable", "A sport"], { emoji: "🖥️" }),
                  mcq("What protects private messages?", "Passwords and encryption", ["Loud music", "Bright colours", "Emojis"], { emoji: "🔒" }),
                  mcq("Wi-Fi connects devices using...", "Radio waves", ["String", "Water pipes", "Smoke signals"], { emoji: "📶" }),
                ],
        }),
      ],
    },
  ];

  const createUnits = [
    {
      title: grade <= 3 ? "Makers and Movers" : "Projects and Life Skills",
      description: grade <= 3 ? "Build, dance, help and create." : "Plan, build and present like a pro.",
      lessons: [
        LESSON({
          title: grade <= 3 ? "Paper Magic" : "The Project Plan",
          story: {
            title: grade <= 3 ? "The Paper Boat" : "Idea to Finished Project",
            scenes:
              grade <= 3
                ? [
                    { emoji: "📄", text: "A flat sheet of paper is full of possibilities." },
                    { emoji: "⛵", text: "Fold here, fold there... a boat appears!" },
                    { emoji: "💧", text: "Will it float? Test it in a bowl of water." },
                  ]
                : [
                    { emoji: "💡", text: "Big projects start as tiny ideas." },
                    { emoji: "📋", text: "Makers write steps: plan, build, test, improve." },
                    { emoji: "🏆", text: "Presenting your work makes ideas shine." },
                  ],
          },
          mission: grade <= 3 ? "Fold a paper boat with a grown-up and float it in a bowl." : "Plan a small project (poster, model or story). Do step 1 today.",
          questions:
            grade <= 3
              ? [
                  tap("What do you need to fold a boat?", "📄", ["🪓", "🔨", "🍳"], { emoji: "⛵" }),
                  mcq("If the boat sinks, you should...", "Try folding again", ["Give up", "Hide it", "Tear it"], { emoji: "🔁" }),
                ]
              : [
                  mcq("What comes first in a project?", "The plan", ["The party", "The nap", "The prize"], { emoji: "📋" }),
                  mcq("Testing your project helps you...", "Find what to improve", ["Brag", "Skip steps", "Finish faster without checking"], { emoji: "🧪" }),
                ],
        }),
      ],
    },
  ];

  // History — from "then and now" (young grades) to ancient worlds and freedom
  // movements (older grades), always ending with a review test.
  const histUnits = [
    {
      title: grade <= 3 ? "Stories from Long Ago" : "Journeys Through Time",
      description: grade <= 3 ? "How people lived before us." : "Ancient worlds, kingdoms and great changes.",
      lessons: [
        LESSON({
          title:
            grade <= 3
              ? "Then and Now"
              : grade <= 5
                ? "Ancient Egypt"
                : "Ancient Civilizations",
          story: {
            title: grade <= 3 ? "The Magic Photo Album" : "A Trip Back in Time",
            scenes:
              grade <= 3
                ? [
                    { emoji: "📸", text: `A Class ${grade} explorer found a magic photo album!` },
                    { emoji: "🐎", text: "Flip! Here are people riding horses instead of cars." },
                    { emoji: "🕯️", text: "Flip! Here are families reading by candlelight." },
                    { emoji: "🕰️", text: "Life was different long ago — and it kept changing!" },
                  ]
                : [
                    { emoji: "△", text: `In Class ${grade}, we travel to the ancient world.` },
                    { emoji: "🐍", text: "Along a great river, people built farms and cities." },
                    { emoji: "📜", text: "They wrote, built and invented things we still use!" },
                  ],
          },
          mission:
            grade <= 3
              ? "Sort 5 things at home into 'old' and 'new'. Which pile is bigger?"
              : "Draw one thing ancient people invented that we still use today.",
          questions:
            grade <= 3
              ? [
                  tap("Long ago, people travelled by...", "🐎", ["✈️", "🚗", "🚀"], { emoji: "🕰️" }),
                  mcq("Long ago, kids played with...", "Wooden toys", ["Tablets", "Video games", "Drones"], { emoji: "🪀" }),
                  tap("Tap the OLD light", "🕯️", ["💡", "🔦", "📺"], { emoji: "🌙" }),
                ]
              : grade <= 5
                ? [
                    mcq("The pyramids were built in...", "Egypt", ["Japan", "Brazil", "Iceland"], { emoji: "△" }),
                    mcq("The ruler of ancient Egypt was called...", "Pharaoh", ["President", "Captain", "Wizard"], { emoji: "👑" }),
                    mcq("The Nile is a long...", "River", ["Desert", "Mountain", "Wall"], { emoji: "🏞️" }),
                  ]
                : [
                    mcq("The first writing began in...", "Mesopotamia", ["Antarctica", "Hawaii", "Space"], { emoji: "✍️" }),
                    mcq("Ancient Romans were famous for building...", "Roads and aqueducts", ["Skyscrapers", "Subways", "Airports"], { emoji: "🏛️" }),
                    mcq("Indus Valley cities were known for...", "Planned streets and drains", ["Roller coasters", "Movie theatres", "Cars"], { emoji: "🧱" }),
                  ],
        }),
        LESSON({
          title:
            grade <= 3
              ? "Brave Helpers of the Past"
              : grade <= 5
                ? "Kings and Kingdoms"
                : "Fighters for Freedom",
          story: {
            title: grade <= 3 ? "The Brave Helpers" : "Stories of Courage",
            scenes:
              grade <= 3
                ? [
                    { emoji: "🧑‍🚒", text: "Long ago and today, brave helpers protect us." },
                    { emoji: "🩺", text: "Some helpers heal. Some helpers teach. Some rescue." },
                    { emoji: "🌟", text: "Their stories are part of history too!" },
                  ]
                : [
                    { emoji: "🏰", text: "Kings ruled lands from mighty castles." },
                    { emoji: "⚔️", text: "Some rulers were kind. Some were not." },
                    { emoji: "🕊️", text: "The bravest heroes fought for freedom, not thrones." },
                  ],
          },
          mission:
            grade <= 3
              ? "Ask a grown-up about a hero from their childhood. Share the story!"
              : "Learn one fact about a freedom fighter and tell your family at dinner.",
          questions:
            grade <= 3
              ? [
                  tap("Who helps when you are sick?", "🩺", ["👨‍🚀", "🧑‍🎨", "👨‍🍳"], { emoji: "🌟" }),
                  mcq("A firefighter's job is to...", "Put out fires", ["Bake bread", "Drive trains", "Paint houses"], { emoji: "🚒" }),
                  mcq("Helpers are...", "Brave and kind", ["Scary", "Sleepy", "Silly"], { emoji: "🏅" }),
                ]
              : grade <= 5
                ? [
                    mcq("Knights protected themselves with...", "Armour", ["Swimsuits", "Pyjamas", "Raincoats"], { emoji: "🛡️" }),
                    mcq("Kings and queens lived in...", "Castles", ["Tents", "Igloos", "Treehouses"], { emoji: "🏰" }),
                    tap("Tap the crown", "👑", ["🎩", "🧢", "⛑️"], { emoji: "⚔️" }),
                  ]
                : [
                    mcq("Freedom fighters wanted...", "Independence for their people", ["More homework", "Bigger castles", "Faster horses"], { emoji: "🕊️" }),
                    mcq("Mahatma Gandhi taught the power of...", "Non-violence", ["Swords", "Shouting", "Running away"], { emoji: "🕊️" }),
                    mcq("History teaches us to...", "Learn from the past", ["Forget everything", "Copy mistakes", "Avoid people"], { emoji: "📜" }),
                  ],
        }),
        LESSON({
          title: "History Review",
          type: "TEST",
          story: {
            title: "Time Traveller Badge",
            scenes: [
              { emoji: "⏳", text: "Your time machine needs a final check!" },
              { emoji: "🏅", text: `Class ${grade} historians, ready? Go!` },
            ],
          },
          mission: "Tell your family one thing you learned about the past this week.",
          questions:
            grade <= 3
              ? [
                  mcq("History is the story of...", "The past", ["Tomorrow", "Cartoons", "Numbers"], { emoji: "📜" }),
                  tap("Tap the OLD phone", "☎️", ["📱", "⌚", "💻"], { emoji: "📞" }),
                  mcq("We learn about the past from...", "Stories and things left behind", ["The future", "Rainbows", "Clouds"], { emoji: "🔍" }),
                ]
              : [
                  mcq("People who dig up ancient cities are...", "Archaeologists", ["Astronauts", "Chefs", "Pilots"], { emoji: "⛏️" }),
                  mcq("Pharaohs ruled in...", "Egypt", ["Greece", "China", "Peru"], { emoji: "△" }),
                  mcq("The safest way to change the world is...", "Peacefully", ["Loudly", "Rudely", "Not at all"], { emoji: "🕊️" }),
                ],
        }),
      ],
    },
  ];

  // Geography — maps and places for young grades; continents, climate and
  // coordinates for older ones.
  const geoUnits = [
    {
      title: grade <= 3 ? "Maps and Places" : "Our Planet",
      description: grade <= 3 ? "Find your way around the world." : "Continents, oceans, weather and climate.",
      lessons: [
        LESSON({
          title:
            grade <= 3
              ? "Maps and Directions"
              : grade <= 5
                ? "Continents and Oceans"
                : "Reading the World",
          story: {
            title: "The Treasure Map",
            scenes: [
              { emoji: "🧭", text: "Explorers use maps to know where they are." },
              { emoji: "🧭", text: "A compass needle always points north!" },
              { emoji: "🗺️", text: "Up on a map is north, down is south, right is east, left is west." },
            ],
          },
          mission:
            grade <= 3
              ? "Hide a toy and draw a treasure map to it. Can someone find it?"
              : "Find your city on a world map or globe. Which continent is it on?",
          questions:
            grade <= 3
              ? [
                  tap("What shows us the way north?", "🧭", ["⚽", "🍕", "🧸"], { emoji: "🗺️" }),
                  mcq("The sun rises in the...", "East", ["West", "North", "Under the bed"], { emoji: "🌅" }),
                  mcq("A map shows us...", "Places", ["Songs", "Recipes", "Dreams"], { emoji: "📍" }),
                ]
              : grade <= 5
                ? [
                    mcq("How many continents are there?", "7", ["3", "5", "12"], { emoji: "🌍" }),
                    mcq("The biggest ocean is the...", "Pacific", ["Arctic", "Indian", "Atlantic"], { emoji: "🌊" }),
                    mcq("The Sahara is the world's largest hot...", "Desert", ["Forest", "Lake", "Island"], { emoji: "🐪" }),
                  ]
                : [
                    mcq("The equator is...", "A line around Earth's middle", ["A kind of cloud", "A mountain range", "A season"], { emoji: "🌍" }),
                    mcq("A globe is a model of...", "The Earth", ["The Moon", "The Sun", "A city"], { emoji: "🪐" }),
                    mcq("The map key (legend) explains...", "What map symbols mean", ["The map's price", "The weather", "The paper size"], { emoji: "🗝️" }),
                  ],
        }),
        LESSON({
          title:
            grade <= 3
              ? "Water and Land"
              : grade <= 5
                ? "Weather and Climate"
                : "Climate Zones",
          story: {
            title: grade <= 3 ? "Land Meets Sea" : "The Weather Machine",
            scenes:
              grade <= 3
                ? [
                    { emoji: "🏝️", text: "Land is where we walk and build." },
                    { emoji: "🌊", text: "Water fills the oceans, rivers and lakes." },
                    { emoji: "🌧️", text: "Water floats up to the sky and falls back as rain!" },
                  ]
                : [
                    { emoji: "☀️", text: "The sun heats the Earth unevenly." },
                    { emoji: "💨", text: "Warm air rises, cool air rushes in — that's wind!" },
                    { emoji: "🌦️", text: "Wind and water make all our weather." },
                  ],
          },
          mission:
            grade <= 3
              ? "Next rainy day, watch the puddles. Where does the water go after?"
              : "Track today's weather: temperature, clouds and wind. Do it again tomorrow!",
          questions:
            grade <= 3
              ? [
                  tap("Tap the ocean", "🌊", ["🏜️", "🏔️", "🌳"], { emoji: "⚓" }),
                  mcq("Rain comes from...", "Clouds", ["Cups", "Caves", "Cars"], { emoji: "🌧️" }),
                  tap("Tap the island", "🏝️", ["🐟", "🚲", "🏠"], { emoji: "🗺️" }),
                ]
              : grade <= 5
                ? [
                    mcq("Weather is what the air is like...", "Today", ["Always, forever", "Only in summer", "Underground"], { emoji: "⛅" }),
                    mcq("A thermometer measures...", "Temperature", ["Speed", "Height", "Weight"], { emoji: "🌡️" }),
                    mcq("Climate is the weather a place usually has...", "Over many years", ["For one hour", "Only at night", "Only underground"], { emoji: "📊" }),
                  ]
                : [
                    mcq("The coldest climate zone is at the...", "Poles", ["Equator", "Beach", "Valley"], { emoji: "🐧" }),
                    mcq("Rainforests are...", "Hot and wet", ["Cold and dry", "Always snowy", "Full of sand"], { emoji: "🌴" }),
                    mcq("Deserts get...", "Very little rain", ["Rain every hour", "Only snow", "Floods daily"], { emoji: "🌵" }),
                  ],
        }),
        LESSON({
          title: "Geography Review",
          type: "TEST",
          story: {
            title: "World Explorer Badge",
            scenes: [
              { emoji: "🌍", text: "World explorers know maps, land and weather!" },
              { emoji: "🎖️", text: `Final challenge for Class ${grade}!` },
            ],
          },
          mission: "Teach someone at home one new thing you learned about our planet.",
          questions:
            grade <= 3
              ? [
                  tap("Tap the compass", "🧭", ["⏰", "📞", "🔔"], { emoji: "🗺️" }),
                  mcq("Mountains are...", "Very tall land", ["Big clouds", "Deep holes", "Kind of wet"], { emoji: "⛰️" }),
                  tap("Tap the rain cloud", "🌧️", ["☀️", "🌙", "⭐"], { emoji: "🌦️" }),
                ]
              : [
                  mcq("The largest ocean on Earth is the...", "Pacific", ["Arctic", "Indian", "Southern"], { emoji: "🌊" }),
                  mcq("The sun rises in the east and sets in the...", "West", ["North", "South", "Same place"], { emoji: "🌇" }),
                  mcq("Weather near the equator is usually...", "Hot", ["Freezing", "Windy only", "Always foggy"], { emoji: "🏖️" }),
                ],
        }),
      ],
    },
  ];

  // Environmental Studies — caring for nature: recycling and water for young
  // grades; food chains, pollution and climate for older ones.
  const evsUnits = [
    {
      title: grade <= 3 ? "Caring for Nature" : "Environment and Us",
      description: grade <= 3 ? "Keep our world clean and green." : "How living things and the environment connect.",
      lessons: [
        LESSON({
          title:
            grade <= 3
              ? "Reduce, Reuse, Recycle"
              : grade <= 5
                ? "Food Chains"
                : "Ecosystems in Balance",
          story: {
            title: grade <= 3 ? "The Three R Squad" : "The Circle of Life",
            scenes:
              grade <= 3
                ? [
                    { emoji: "♻️", text: "Meet the Three R Squad: Reduce, Reuse, Recycle!" },
                    { emoji: "🛍️", text: "Reduce means use less stuff." },
                    { emoji: "🎁", text: "Reuse means use things again." },
                    { emoji: "🗑️", text: "Recycle means turn old things into new things!" },
                  ]
                : [
                    { emoji: "☀️", text: "Every food chain starts with the sun." },
                    { emoji: "🌿", text: "Plants use sunlight to make food. They are producers." },
                    { emoji: "🐇", text: "Animals eat plants. Bigger animals eat them too!" },
                    { emoji: "🔁", text: "It's a circle that keeps nature in balance." },
                  ],
          },
          mission:
            grade <= 3
              ? "Find one thing at home to reuse (a jar or box) and make it into something new."
              : "Draw a food chain from your area with at least 3 living things.",
          questions:
            grade <= 3
              ? [
                  tap("Tap the recycling symbol", "♻️", ["🎁", "🚫", "💤"], { emoji: "🌍" }),
                  mcq("'Reuse' means...", "Use something again", ["Throw it away", "Hide it", "Break it"], { emoji: "🔁" }),
                  mcq("'Reduce' means...", "Use less", ["Use more", "Buy double", "Lose things"], { emoji: "📉" }),
                ]
              : grade <= 5
                ? [
                    mcq("Every food chain starts with...", "The sun", ["A lion", "A mushroom", "A river"], { emoji: "☀️" }),
                    mcq("Animals that only eat plants are...", "Herbivores", ["Carnivores", "Cyclists", "Robots"], { emoji: "🐇" }),
                    mcq("Lions and tigers are...", "Carnivores", ["Producers", "Plants", "Minerals"], { emoji: "🦁" }),
                  ]
                : [
                    mcq("An ecosystem is...", "Living and non-living things together", ["Only animals", "Only water", "A sports team"], { emoji: "🌿" }),
                    mcq("If one species disappears, other species...", "Are affected too", ["Are never affected", "Move to space", "Turn into plants"], { emoji: "⚠️" }),
                    mcq("Cutting down forests destroys...", "Homes for wildlife", ["The Moon", "Mountains", "The weather station"], { emoji: "🪓" }),
                  ],
        }),
        LESSON({
          title:
            grade <= 3
              ? "Water Is Precious"
              : grade <= 5
                ? "Pollution and Solutions"
                : "Our Carbon Footprint",
          story: {
            title: grade <= 3 ? "The Last Drop" : "Cleaning Up Our Act",
            scenes:
              grade <= 3
                ? [
                    { emoji: "💧", text: "Every drop of water is precious." },
                    { emoji: "🦷", text: "Turn the tap off while you brush your teeth!" },
                    { emoji: "🌍", text: "Saving water helps every animal and plant on Earth." },
                  ]
                : [
                    { emoji: "🏭", text: "Smoke, trash and chemicals can pollute air, land and water." },
                    { emoji: "😔", text: "Pollution makes animals, plants and people sick." },
                    { emoji: "🌳", text: "Trees clean our air. Recycling keeps trash out of rivers." },
                    { emoji: "💪", text: "Small actions by many people make a big difference!" },
                  ],
          },
          mission:
            grade <= 3
              ? "Count how many seconds it takes to wet your hands and turn the tap off. Save water!"
              : "Walk or cycle somewhere you'd usually go by car. How did it feel?",
          questions:
            grade <= 3
              ? [
                  mcq("While brushing your teeth, the tap should be...", "Off", ["Wide open", "Sprinkling", "Singing"], { emoji: "🦷" }),
                  tap("Tap what we should save", "💧", ["🎈", "🧦", "🍭"], { emoji: "🚰" }),
                  mcq("Water for drinking should be...", "Clean", ["Colourful", "Sticky", "Fizzy with mud"], { emoji: "🥛" }),
                ]
              : grade <= 5
                ? [
                    mcq("Smoke from cars and factories causes...", "Air pollution", ["Rainbows", "Snowfall", "Tides"], { emoji: "🌫️" }),
                    mcq("Planting trees helps because they...", "Clean the air", ["Eat trash", "Make noise", "Block the sun forever"], { emoji: "🌳" }),
                    tap("Tap a clean way to travel", "🚲", ["🚗", "✈️", "🚛"], { emoji: "🌤️" }),
                  ]
                : [
                    mcq("A carbon footprint is...", "Greenhouse gases from our activities", ["A shoe size", "A kind of map", "A footprint in sand"], { emoji: "👣" }),
                    mcq("Which travel choice pollutes least?", "Bicycle", ["Plane", "Big truck", "Rocket"], { emoji: "🚲" }),
                    mcq("Switching off unused lights...", "Reduces pollution", ["Wastes energy", "Is against the rules", "Breaks the lights"], { emoji: "💡" }),
                  ],
        }),
        LESSON({
          title: "Green World Review",
          type: "TEST",
          story: {
            title: "Earth Guardian Badge",
            scenes: [
              { emoji: "🦸", text: "Earth guardians protect nature every day!" },
              { emoji: "🌟", text: `Class ${grade}, final green challenge!` },
            ],
          },
          mission: "Start one Earth-friendly habit this week and tell your Family HQ about it.",
          questions:
            grade <= 3
              ? [
                  mcq("Plants make food using...", "Sunlight", ["Moonlight", "Fridge light", "Torch light"], { emoji: "🌻" }),
                  tap("Tap where rubbish belongs", "🗑️", ["🌊", "🏞️", "🛋️"], { emoji: "♻️" }),
                  mcq("Saving water helps...", "Everyone on Earth", ["Nobody", "Only fish", "Only teachers"], { emoji: "💧" }),
                ]
              : [
                  mcq("Producers make food using...", "Sunlight", ["Batteries", "Moonlight", "Sugar packets"], { emoji: "🌱" }),
                  mcq("The 3 Rs are Reduce, Reuse and...", "Recycle", ["Rewind", "Return", "Repair shops"], { emoji: "♻️" }),
                  mcq("The best way to help the planet is...", "Small actions every day", ["Waiting for magic", "Complaining only", "Doing nothing"], { emoji: "🌍" }),
                ],
        }),
      ],
    },
  ];

  return { mathUnits, sciUnits, enUnits, histUnits, geoUnits, evsUnits, toolsUnits, createUnits };
};

// ─── Seeding ─────────────────────────────────────────────────────────────────

const sliceQuestions = (defs) =>
  defs.map((question, index) => ({
    order: index,
    type: question.type,
    prompt: question.prompt,
    emoji: question.emoji ?? null,
    speak: question.speak ?? false,
    options: question.options,
  }));

async function seedClassesAndSubjects() {
  const subjectDefs = [
    { code: "en", name: "English", order: 1, track: "MIND", emoji: "📖", color: "brand" },
    { code: "math", name: "Mathematics", order: 2, track: "MIND", emoji: "🔢", color: "sky" },
    { code: "sci", name: "Science", order: 3, track: "MIND", emoji: "🔬", color: "emerald" },
    { code: "hist", name: "History", order: 4, track: "MIND", emoji: "🏛️", color: "amber" },
    { code: "geo", name: "Geography", order: 5, track: "MIND", emoji: "🌍", color: "violet" },
    { code: "evs", name: "Environmental Studies", order: 6, track: "MIND", emoji: "🌱", color: "emerald" },
    { code: "tools", name: "Toolbox", order: 7, track: "TOOLS", emoji: "🧰", color: "coral" },
    { code: "create", name: "Create", order: 8, track: "CREATE", emoji: "🎨", color: "amber" },
  ];

  for (const classDef of CLASSES) {
    const klass = await prisma.class.upsert({
      where: { grade: classDef.grade },
      update: { name: classDef.name, description: classDef.description },
      create: classDef,
    });

    for (const subjectDef of subjectDefs) {
      await prisma.subject.upsert({
        where: { classId_code: { classId: klass.id, code: subjectDef.code } },
        update: {
          name: subjectDef.name,
          order: subjectDef.order,
          track: subjectDef.track,
          emoji: subjectDef.emoji,
          color: subjectDef.color,
        },
        create: {
          classId: klass.id,
          code: subjectDef.code,
          name: subjectDef.name,
          order: subjectDef.order,
          track: subjectDef.track,
          emoji: subjectDef.emoji,
          color: subjectDef.color,
        },
      });
    }
  }
  console.log(`Seeded ${CLASSES.length} classes with ${subjectDefs.length} subjects each.`);
}

// Build lesson data for a subject in a class. Class 1 has bespoke content;
// classes 2-7 get levelled generated content. Others stay empty (admins add).
const lessonDataFor = (grade, code) => {
  if (grade === 1) {
    switch (code) {
      case "math":
        return C1_MATH_UNITS;
      case "sci":
        return C1_SCI_UNITS;
      case "en":
        return C1_EN_UNITS;
      case "hist":
        return C1_HIST_UNITS;
      case "geo":
        return C1_GEO_UNITS;
      case "evs":
        return C1_EVS_UNITS;
      case "tools":
        return C1_TOOLS_UNITS;
      case "create":
        return C1_CREATE_UNITS;
      default:
        return [];
    }
  }
  if (grade >= 2 && grade <= 7) {
    const g = gradeLesson(grade, code);
    switch (code) {
      case "math":
        return g.mathUnits;
      case "sci":
        return g.sciUnits;
      case "en":
        return g.enUnits;
      case "hist":
        return g.histUnits;
      case "geo":
        return g.geoUnits;
      case "evs":
        return g.evsUnits;
      case "tools":
        return g.toolsUnits;
      case "create":
        return g.createUnits;
      default:
        return [];
    }
  }
  return [];
};

async function seedCurriculum() {
  for (let grade = 1; grade <= 7; grade++) {
    const klass = await prisma.class.findUnique({ where: { grade } });
    if (!klass) continue;

    for (const code of ["math", "sci", "en", "hist", "geo", "evs", "tools", "create"]) {
      const subject = await prisma.subject.findUnique({
        where: { classId_code: { classId: klass.id, code } },
      });
      if (!subject) continue;

      const units = lessonDataFor(grade, code);
      for (let unitIndex = 0; unitIndex < units.length; unitIndex++) {
        const unitDef = units[unitIndex];
        const unit = await prisma.unit.upsert({
          where: { subjectId_order: { subjectId: subject.id, order: unitIndex + 1 } },
          update: { title: unitDef.title, description: unitDef.description },
          create: {
            subjectId: subject.id,
            order: unitIndex + 1,
            title: unitDef.title,
            description: unitDef.description,
          },
        });

        for (let lessonIndex = 0; lessonIndex < unitDef.lessons.length; lessonIndex++) {
          const lessonDef = unitDef.lessons[lessonIndex];
          const lesson = await prisma.lesson.upsert({
            where: { unitId_order: { unitId: unit.id, order: lessonIndex + 1 } },
            update: {
              title: lessonDef.title,
              type: lessonDef.type ?? "LESSON",
              xpReward: lessonDef.type === "TEST" ? 15 : 10,
              story: lessonDef.story ?? undefined,
              mission: lessonDef.mission ?? undefined,
              missionXp: 5,
            },
            create: {
              unitId: unit.id,
              order: lessonIndex + 1,
              title: lessonDef.title,
              type: lessonDef.type ?? "LESSON",
              xpReward: lessonDef.type === "TEST" ? 15 : 10,
              story: lessonDef.story ?? undefined,
              mission: lessonDef.mission ?? undefined,
              missionXp: 5,
            },
          });

          const existingQuestions = await prisma.question.count({
            where: { lessonId: lesson.id },
          });
          if (existingQuestions > 0) continue;

          for (const questionDef of sliceQuestions(lessonDef.questions)) {
            await prisma.question.create({
              data: {
                lessonId: lesson.id,
                order: questionDef.order,
                type: questionDef.type,
                prompt: questionDef.prompt,
                emoji: questionDef.emoji,
                speak: questionDef.speak,
                options: { create: questionDef.options },
              },
            });
          }
        }
      }
    }
  }
  console.log("Seeded Mind / Tools / Create curriculum for classes 1-7.");
}

async function main() {
  console.log("Seeding CurioQuest content...");
  await seedClassesAndSubjects();
  await seedCurriculum();
  console.log("Done.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
