// All the content for the 24 cards lives in this file.
// Anything in [square brackets] is a placeholder for Macie to replace.
// {name} is swapped for the friend's first name.

export const NUMERALS = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX','XXI','XXII','XXIII','XXIV'];

// Card art that exists so far (day number -> file in /art). Cards without art show the gradient card.
export const ART = { 1: 'art/01.jpg', 2: 'art/02.jpg', 3: 'art/03.jpg', 4: 'art/04.jpg', 5: 'art/05.jpg', 6: 'art/06.jpg', 17: 'art/17.jpg' };

export const DAYS = [
  { name: 'The Fool', keys: ['Beginnings', 'Setting out'], type: 'letter',
    blurb: "They say every journey begins with The Fool, who steps off the edge of the world with a white dog at his heels and the whole sky in front of him. He knows the secret the rest of us forget: you don't have to be ready, you only have to begin. Tonight the first card of our deck turns over, and twenty-three more are waiting behind it. Inside this one is a letter I wrote just for you.",
    cta: 'Read your note',
    letter: ['Dear {name},', '[Macie, your first letter goes here. Each friend sees her own name at the top.]', 'Love, Macie'] },

  { name: 'The Lovers', keys: ['Affection', 'Favorite things'], type: 'photo', view: 'mood', max: 4,
    blurb: "The Lovers is the card of the heart's quiet yes. It isn't only about romance. It's about every small thing you would choose again and again without thinking, because the things we love are a kind of map of who we are. Today, add four photos, one each for your favorite food, favorite activity, favorite Christmas decoration and your winter aesthetic, and watch them join everyone else's on one shared mood board.",
    cats: ['Favorite food', 'Favorite activity', 'Favorite Christmas decoration', 'Your winter aesthetic'],
    short: ['Food', 'Activity', 'Decoration', 'Aesthetic', 'More'], extraLabel: 'Anything else', extraMax: 4,
    cta: 'Add your favorites', circle: 'The winter mood board', noun: 'photo', all: 'See the mood board' },

  { name: 'Wheel of Fortune', keys: ['Chance', 'Either, or'], type: 'pick',
    blurb: "High above the clouds the Wheel of Fortune turns slowly, carrying everyone up and round and back again, like a chairlift that never stops. Its lesson is a gentle one: you can't hold the wheel still, so you may as well enjoy the ride. Today's card asks one quick question about a perfect ski day. Make your pick, and you'll see which way the rest of the Circle leaned.",
    cta: 'Make your pick', circle: 'First chair or après-ski', noun: 'pick',
    question: 'On a perfect ski day, you are…',
    options: ['On the first chair up', 'First in line for après-ski'],
    crowd: ['the first-chair crowd', 'the après-ski crowd'] },

  { name: 'Temperance', keys: ['Harmony', 'A good mix'], type: 'playlist',
    blurb: "Temperance is an angel with one foot on the earth and one in the water, pouring starlight from cup to cup without losing a drop. She knows that the loveliest things are blends: never a single note, but all of them together. Today we make a little of that magic ourselves. Search for the songs that sound like winter to you and add them to our shared playlist, as many as you like.",
    cta: 'Open the playlist', circle: 'The playlist', noun: 'song',
    link: '', linkLabel: 'Listen to the playlist',
    question: 'Add a song to the playlist' },

  { name: 'The Hierophant', keys: ['Tradition', 'Ritual', 'Belonging'], type: 'question',
    blurb: "The Hierophant keeps the old keys. He is the guardian of ritual, of all the small ceremonies we repeat each year until they begin to glow. A tradition is just love that has learned to return on time. Today, tell us one winter tradition you never skip, and read the ones your friends are keeping too.",
    cta: "Open today's question", circle: 'Winter traditions', noun: 'answer',
    question: 'What winter tradition do you never skip?', placeholder: 'Every year, without fail…' },

  { name: 'The High Priestess', keys: ['Hidden knowledge', 'Books'], type: 'yourpick',
    blurb: "The High Priestess sits at the doorway between what is known and what is only felt, a crescent moon at her feet and a book half hidden in her robes. She reminds us that some stories find us exactly when we need them. Today she opens her library. You'll find the book I'm pressing into your hands this winter, and then you can search for your own favorites and add them to our shelf.",
    cta: "See Macie's pick", circle: 'The bookshelf', noun: 'book',
    pickTitle: '[Book title]', pickBy: '[Author]', pickCover: '', pickWhy: '[Macie, a line about why you love it.]',
    question: 'Now add one to the shelf', fieldA: 'Book title', fieldB: 'Author, if you remember' },

  { name: 'The Sun', keys: ['Joy', 'Gratitude'], type: 'private',
    blurb: "Even in the deep of winter The Sun is still up there, golden and unbothered, waiting behind the clouds. This card is pure joy, the kind a child feels riding out into a bright morning, and its wisdom is simple: what you notice grows. So today, write down three good things from your year, however small. They're for your eyes only, and they'll be returned to you on Christmas Eve.",
    cta: 'Write your three',
    question: 'Three good things from this year. Small ones count. They come back to you on Christmas Eve.',
    count: 3, save: 'Save my three' },

  { name: 'Justice', keys: ['Giving', 'Fairness'], type: 'charity',
    blurb: "Justice sits very still, a sword in one hand and golden scales in the other, weighing the world until it balances. She teaches that what we give comes back around, though rarely the way we expect. Today we tip the scales toward kindness together. Add up to three causes you care about to the pot. Each entry adds $5, and tonight one cause is drawn at random to receive it all.",
    cta: 'Add a cause', circle: 'The giving pot', noun: 'cause' },

  { name: 'The Magician', keys: ['Making', 'With your hands'], type: 'tutorial',
    blurb: "The Magician lifts his wand to the sky and points to the earth, and whatever he imagines begins to take shape on the table before him. His secret is that making something with your own hands is the oldest magic there is. Your ingredients have already arrived by post. Open the envelope I mailed you and follow along, step by step, as we make something together.",
    cta: "Start today's craft",
    steps: ['[Step 1 of the craft]', '[Step 2 of the craft]', '[Step 3 of the craft]', '[Step 4 of the craft]', '[Step 5 of the craft]', '[Step 6 of the craft]'] },

  { name: 'The Chariot', keys: ['Motion', 'Fresh air'], type: 'photo',
    blurb: "The Chariot races beneath a canopy of stars, drawn by two sphinxes and steered by nothing but will. It is the card of motion, of wind on your face and the feeling of being exactly where your feet are. The world looks different when you're moving through it. So go out into the cold today, to ski, sled, skate or simply walk, and bring back one photo of something you saw.",
    cta: 'Share your photo', circle: 'Out in the cold', noun: 'photo' },

  { name: 'The Empress', keys: ['Abundance', 'Comfort'], type: 'recipe',
    blurb: "The Empress rests in a garden where everything blooms at once, a crown of twelve stars in her hair. She is the mother of abundance, and her magic is the warmth of a full kitchen and a table with room for one more. To feed someone is to tell them they belong. Today I'm sharing a recipe from my kitchen. Tick off the ingredients as you gather them, follow the steps, and save a copy to keep.",
    cta: 'See the recipe',
    recipe: { title: '[Your recipe name]', makes: 'Makes 12', time: '25 minutes',
      need: ['[Ingredient one]', '[Ingredient two]', '[Ingredient three]', '[Ingredient four]'],
      steps: ['[First step]', '[Second step]', '[Third step]'] } },

  { name: 'Ace of Cups', keys: ['A full cup', 'A small treat'], type: 'gift',
    blurb: "From a hand in the clouds comes a single golden cup, spilling over in five bright streams. The Ace of Cups is the card of the unexpected gift, the small kindness that arrives exactly when the day needed it. A full cup is meant to be enjoyed slowly. Today, yours is on me. Check your texts for a coffee gift card, and take a quiet moment that is only for you.",
    cta: 'Open your gift',
    gift: 'Check your texts, {name}. A coffee gift card is on its way from Macie today. Take twenty minutes for yourself and drink it somewhere nice.' },

  { name: 'Ace of Pentacles', keys: ['Small treasures', 'Good finds'], type: 'favorites',
    blurb: "A single gold coin rests in an open palm, above a garden gate wound with roses. The Ace of Pentacles is the magic of everyday things, the humble object that turns out to be a small treasure. Not all wonders are grand, and some of them cost four dollars. Today, tell us the best thing you bought this year for under $25, and the best thing you bought for more.",
    cta: 'Share your best buys', circle: 'Best buys of the year', noun: 'best buys', label: 'Your best buys', all: "See everyone's best buys",
    question: 'What were your best buys this year?',
    fields: ['Best thing under $25', 'Best thing over $25'] },

  { name: 'The Devil', keys: ['Mischief', 'Nonsense'], type: 'carol',
    blurb: "Every deck needs its mischief-maker, and ours has horns. The Devil isn't here to frighten anyone. He is the spirit of play, the wink that reminds us not to take ourselves too seriously, and laughter is its own kind of spell. So lend him four words, any four you like, and he will weave them into a Christmas carol the world has never heard before.",
    cta: 'Write a silly carol', circle: 'Silly carols', noun: 'carol',
    fields: ['An adjective', 'An animal', 'A food', 'A verb ending in -ing'],
    carol: 'Dashing through the {0} snow, on a one-{1} open sleigh, o\'er the fields of {2} we go, {3} all the way!' },

  { name: 'Judgement', keys: ['The verdict', 'Trivia'], type: 'quiz',
    blurb: "An angel leans out of the clouds and sounds a golden trumpet, and far below, everyone rises to answer. Judgement is the card of awakening, the moment you discover what you have known all along. Today the trumpet calls for you. Answer five questions of Christmas trivia, and see your name take its place on the scoreboard.",
    cta: "Take today's quiz", circle: 'Trivia scoreboard', noun: 'score',
    questions: [
      { q: 'Which country gave us the advent calendar?', a: ['Sweden', 'Germany', 'England'], right: 1,
        note: 'German families were counting down with chalk marks and candles in the 1800s.' },
      { q: '[Trivia question 2]', a: ['[Answer A]', '[Answer B]', '[Answer C]'], right: 0, note: '[A fun fact about the answer.]' },
      { q: '[Trivia question 3]', a: ['[Answer A]', '[Answer B]', '[Answer C]'], right: 0, note: '[A fun fact about the answer.]' },
      { q: '[Trivia question 4]', a: ['[Answer A]', '[Answer B]', '[Answer C]'], right: 0, note: '[A fun fact about the answer.]' },
      { q: '[Trivia question 5]', a: ['[Answer A]', '[Answer B]', '[Answer C]'], right: 0, note: '[A fun fact about the answer.]' }
    ] },

  { name: 'The Moon', keys: ['Dreams', 'A night in'], type: 'movie',
    blurb: "The Moon hangs low between two towers, silvering a winding path, and everything beneath it turns a little dreamlike. This is the card of imagination, of stories told after dark. Some nights are made for staying in and letting one unfold. Tonight I've chosen a holiday film for us and a snack to go with it. Find your softest blanket and settle in.",
    cta: "See tonight's plan",
    movie: '[Holiday movie title]', movieWhy: '[Macie, a line about why this one.]',
    snack: '[The snack pairing]', snackWhy: '[How to make or where to get it.]' },

  { name: 'Strength', keys: ['Courage', 'Gentleness'], type: 'creature',
    blurb: "On the Strength card a woman rests her hands on a lion, and the lion, quite willingly, grows calm. Hers is not the loud kind of power. It is the gentle kind, the courage that looks like patience, and everyone carries a creature of their own inside. Answer six questions to discover which winter animal is yours, and keep its portrait as a wallpaper.",
    cta: 'Find your creature', circle: 'Winter creatures', noun: 'result',
    title: 'Which winter creature are you?',
    // Add art for a creature as art: 'art/c-owl.jpg' and it becomes the wallpaper.
    results: [
      { name: 'A snowy owl', line: 'Quiet, watchful, secretly the funny one.', art: '' },
      { name: 'A polar bear', line: 'Calm, strong, happiest with your people close.', art: 'art/c-bear.jpg' },
      { name: 'A red fox', line: 'Quick, curious, always up to something.', art: '' },
      { name: 'A reindeer', line: 'Steady, loyal, the one everyone follows home.', art: '' },
      { name: 'A St. Bernard', line: 'Big-hearted, and first through the snow when someone needs you.', art: '' },
      { name: 'A snow hare', line: 'Light on your feet, and always where the fun is.', art: '' }
    ],
    // "to" says which creature each answer points to: [main, runner-up], counting from 0 in the list above.
    questions: [
      { q: 'A free winter evening. You…', a: ['Finally finish that book', 'Cook something slow for whoever turns up', 'Say yes to the last-minute plan', 'Host the game night'], to: [[0, 1], [4, 1], [2, 5], [3, 5]] },
      { q: 'Friends come to you for…', a: ['The honest truth', 'A calm head', 'A hug and a hot meal', 'A good time'], to: [[0, 3], [1, 0], [4, 1], [5, 2]] },
      { q: 'On a group trip you are…', a: ['Holding the map and the plan', 'Finding the place nobody else knows', 'Carrying snacks for everyone', 'First out the door every morning'], to: [[3, 0], [2, 0], [4, 3], [5, 2]] },
      { q: 'Pick a winter scene.', a: ['A clear, cold, starry sky', 'A fire, a blanket, nowhere to be', 'Fresh tracks in new snow', 'A full table and everyone talking'], to: [[0, 2], [1, 4], [2, 5], [3, 4]] },
      { q: 'Your gift-giving style?', a: ['Exactly what they mentioned in March', 'Something cozy and built to last', 'Handmade, with a long note', 'A surprise day out'], to: [[0, 3], [1, 4], [4, 0], [5, 2]] },
      { q: 'In the new year you want more…', a: ['Stillness', 'Adventure', 'Laughing until it hurts', 'Time with my people'], to: [[1, 0], [2, 5], [5, 2], [3, 4]] }
    ] },

  { name: 'The Hermit', keys: ['Stillness', 'A light in the dark'], type: 'candle',
    blurb: "High on a snowy peak The Hermit lifts a lantern with a star caught inside it. He has learned that one small light, held steady, can guide a whole valley home. In New Mexico, on winter nights, people set candles glowing in paper bags along every wall and rooftop for the same reason. Tonight, light your own luminaria and watch our wall grow brighter as each friend adds hers.",
    cta: 'Light your luminaria', circle: 'Luminarias on the wall', noun: 'luminaria' },

  { name: 'The Hanged Man', keys: ['Pause', 'Looking back'], type: 'question',
    blurb: "The Hanged Man hangs by one foot from a living tree, a halo of light around his head and the most peaceful look on his face. He has discovered that when you turn the world upside down, hidden things fall out of its pockets. Look back on your year that way. Find the best moment of it and write it down, and it will become a star in the sky we are filling together.",
    cta: "Open today's question", circle: 'Best moment of the year', noun: 'answer', view: 'sky',
    question: 'What was your best moment of this year?', placeholder: 'The one I keep coming back to…' },

  { name: 'The Emperor', keys: ['Order', 'Cozy'], type: 'checklist',
    blurb: "The Emperor sits upon a throne of stone, and the mountains themselves seem to stand in line behind him. He brings order, and with it a certain peace: the calm of knowing what comes next. Even magic likes a little structure. Here is a list of six small, cozy things to do before Christmas. Tick them off as you go, and save the list as a picture if you like.",
    cta: 'Open your checklist',
    items: ['Bake something', 'Call a friend you miss', 'Go and see the lights', 'Watch a holiday film in pajamas', 'Wrap one gift early', 'Light a candle at dinner'] },

  { name: 'The Star', keys: ['Hope', 'Wishes'], type: 'word', view: 'stamps',
    blurb: "When the long night is at its darkest The Star appears: one great light and seven small ones, and a woman pouring water back to the earth beneath them. She is hope itself, the quiet certainty that good things are on their way. Tonight is the longest night of the year, and so the best one for wishing. Choose one word for the year ahead, set it on a stamp of your own design, and send it into the future.",
    cta: 'Make your stamp', circle: 'Stamps for next year', noun: 'stamp',
    question: 'One word for next year', placeholder: 'One word',
    // Stamp backgrounds friends can pick. The six names are built-in finishes.
    // To add a picture, put the file in art/stamps/ and list it here, e.g. 'art/stamps/pine.jpg'.
    stamps: ['glow', 'navy', 'pale', 'deep', 'dusk', 'frost'] },

  { name: 'Three of Cups', keys: ['Gathering', 'A full table'], type: 'recipe',
    blurb: "Three friends lift their cups in a garden heavy with harvest, and for a moment nothing else in the world is needed. The Three of Cups is the card of friendship, and of joy that grows when it is shared. A meal made with love is a small celebration. Tonight I'm sharing a dinner recipe I would make for all of you. Gather the ingredients, follow the steps, and save a copy for your own table.",
    cta: 'See the recipe',
    recipe: { title: '[Your dinner recipe name]', makes: 'Serves 4', time: '45 minutes',
      need: ['[Ingredient one]', '[Ingredient two]', '[Ingredient three]', '[Ingredient four]'],
      steps: ['[First step]', '[Second step]', '[Third step]'] } },

  { name: 'Page of Cups', keys: ['Kindness', 'A message'], type: 'kind',
    blurb: "The Page of Cups stands by the sea, and to his great delight a little fish has popped out of his cup to say hello. He is the messenger of the heart, bringing tender news and unexpected sweetness. Kind words are a spell anyone can cast. Think of someone you love, write one true and kind sentence about them, and then send it to them yourself. This one stays between the two of you.",
    cta: 'Write your sentence',
    question: 'Write one kind, true sentence about someone. Then send it to them yourself, today.' },

  { name: 'The World', keys: ['Completion', 'Christmas Eve'], type: 'finale',
    blurb: "And so we come to The World: a dancer in a wreath of evergreen, turning at the center of everything, the journey complete. The Fool who set out on the first of December has arrived, and so have you. Every ending holds its own beginning. Inside this last card is a letter from me, the three good things you wrote down on the seventh, and a card for all of us to sign together.",
    cta: 'Open the last card', circle: 'The group card', noun: 'line',
    letter: ['Dear {name},', '[Macie, your closing letter goes here.]', 'Love, Macie'],
    question: 'Sign the group card', placeholder: 'Merry Christmas, from…' }
];
