// All the content for the 24 cards lives in this file.
// Anything in [square brackets] is a placeholder for Macie to replace.
// {name} is swapped for the friend's first name.

export const NUMERALS = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX','XXI','XXII','XXIII','XXIV'];

// Card art that exists so far (day number -> file in /art). Cards without art show the gradient card.
export const ART = { 1: 'art/01.jpg', 2: 'art/02.jpg', 3: 'art/03.jpg', 4: 'art/04.jpg', 5: 'art/05.jpg', 6: 'art/06.jpg', 17: 'art/17.jpg' };

export const DAYS = [
  { name: 'The Fool', keys: ['Beginnings', 'Setting out'], type: 'letter',
    blurb: 'The first step of the journey, taken lightly. Before anything else, there is a note waiting for you.',
    cta: 'Read your note',
    letter: ['Dear {name},', '[Macie, your first letter goes here. Each friend sees her own name at the top.]', 'Love, Macie'] },

  { name: 'The Lovers', keys: ['Affection', 'Favorite things'], type: 'photo', view: 'mood', max: 4,
    blurb: 'A card for the things we love. Add four photos, one for each favorite, and we will build one mood board together.',
    cats: ['Favorite food', 'Favorite activity', 'Favorite Christmas decoration', 'Your winter aesthetic'],
    short: ['Food', 'Activity', 'Decoration', 'Aesthetic', 'More'], extraLabel: 'Anything else', extraMax: 4,
    cta: 'Add your favorites', circle: 'The winter mood board', noun: 'photo', all: 'See the mood board' },

  { name: 'Wheel of Fortune', keys: ['Chance', 'Either, or'], type: 'pick',
    blurb: 'The wheel turns and you only get one. Choose quickly.',
    cta: 'Make your pick', circle: 'Would you rather', noun: 'pick',
    question: 'Would you rather spend Christmas…',
    options: ['Snowed in at a cabin', 'Barefoot on a sunny beach'],
    crowd: ['the cabin crowd', 'the beach crowd'] },

  { name: 'Temperance', keys: ['Harmony', 'A good mix'], type: 'playlist',
    blurb: 'A little of this, a little of that. Today we blend one playlist between all of us.',
    cta: 'Open the playlist', circle: 'The playlist', noun: 'song',
    link: '', linkLabel: 'Listen to the playlist',
    question: 'Add a song to the playlist' },

  { name: 'The Hierophant', keys: ['Tradition', 'Ritual', 'Belonging'], type: 'question',
    blurb: 'The keeper of rituals, and of the small things we do every year without asking why. Today, share one of yours.',
    cta: "Open today's question", circle: 'Winter traditions', noun: 'answer',
    question: 'What winter tradition do you never skip?', placeholder: 'Every year, without fail…' },

  { name: 'The High Priestess', keys: ['Hidden knowledge', 'Books'], type: 'yourpick',
    blurb: 'She keeps the good books to herself. Not today.',
    cta: "See Macie's pick", circle: 'The bookshelf', noun: 'book',
    pickTitle: '[Book title]', pickBy: '[Author]', pickCover: '', pickWhy: '[Macie, a line about why you love it.]',
    question: 'Now add one to the shelf', fieldA: 'Book title', fieldB: 'Author, if you remember' },

  { name: 'The Sun', keys: ['Joy', 'Gratitude'], type: 'private',
    blurb: 'Warmth in the middle of winter. A quiet card, just for you.',
    cta: 'Write your three',
    question: 'Three good things from this year. Small ones count. They come back to you on Christmas Eve.',
    count: 3, save: 'Save my three' },

  { name: 'Justice', keys: ['Giving', 'Fairness'], type: 'charity',
    blurb: 'Name a cause you love. Every entry adds $5 to the pot. Tonight one is drawn, and Macie sends it the whole pot.',
    cta: 'Add a cause', circle: 'The giving pot', noun: 'cause' },

  { name: 'The Magician', keys: ['Making', 'With your hands'], type: 'tutorial',
    blurb: 'Open the envelope Macie mailed you. Everything you need is inside.',
    cta: "Start today's craft",
    steps: ['[Step 1 of the craft]', '[Step 2 of the craft]', '[Step 3 of the craft]', '[Step 4 of the craft]', '[Step 5 of the craft]', '[Step 6 of the craft]'] },

  { name: 'The Chariot', keys: ['Action', 'Fresh air'], type: 'photo',
    blurb: 'Take a ten-minute walk today and show us one thing you saw.',
    cta: 'Share your photo', circle: 'Photos from the walk', noun: 'photo' },

  { name: 'The Empress', keys: ['Abundance', 'Comfort'], type: 'recipe',
    blurb: 'She feeds everyone who walks in. Today, something sweet from my kitchen to yours.',
    cta: 'See the recipe',
    recipe: { title: '[Your recipe name]', makes: 'Makes 12', time: '25 minutes',
      need: ['[Ingredient one]', '[Ingredient two]', '[Ingredient three]', '[Ingredient four]'],
      steps: ['[First step]', '[Second step]', '[Third step]'] } },

  { name: 'Ace of Cups', keys: ['A full cup', 'A small treat'], type: 'gift',
    blurb: 'Coffee on me.',
    cta: 'Open your gift',
    gift: 'Check your texts, {name}. A coffee gift card is on its way from Macie today. Take twenty minutes for yourself and drink it somewhere nice.' },

  { name: 'Ace of Pentacles', keys: ['Small treasures', 'Good finds'], type: 'favorites',
    blurb: 'The card of small, solid, lovely things. Tell us one bargain and one splurge that earned their keep this year.',
    cta: 'Share your best buys', circle: 'Best buys of the year', noun: 'best buys', label: 'Your best buys', all: "See everyone's best buys",
    question: 'What were your best buys this year?',
    fields: ['Best thing under $25', 'Best thing over $25'] },

  { name: 'The Devil', keys: ['Mischief', 'Nonsense'], type: 'carol',
    blurb: 'Four words in, one very silly carol out.',
    cta: 'Write a silly carol', circle: 'Silly carols', noun: 'carol',
    fields: ['An adjective', 'An animal', 'A food', 'A verb ending in -ing'],
    carol: 'Dashing through the {0} snow, on a one-{1} open sleigh, o\'er the fields of {2} we go, {3} all the way!' },

  { name: 'Judgement', keys: ['The verdict', 'Trivia'], type: 'quiz',
    blurb: 'Five questions. No studying. The scoreboard is public.',
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
    blurb: 'A card for staying in while the moon does the work. Tonight has a plan.',
    cta: "See tonight's plan",
    movie: '[Holiday movie title]', movieWhy: '[Macie, a line about why this one.]',
    snack: '[The snack pairing]', snackWhy: '[How to make or where to get it.]' },

  { name: 'Strength', keys: ['Courage', 'Gentleness'], type: 'creature',
    blurb: 'Quiet strength comes in many shapes. Which one is yours?',
    cta: "Take today's quiz", circle: 'Winter creatures', noun: 'result',
    title: 'Which winter creature are you?',
    results: [
      { name: 'A snowy owl', line: 'Quiet, watchful, secretly the funny one.' },
      { name: 'A polar bear', line: 'Calm, strong, happiest with your people close.' },
      { name: 'A red fox', line: 'Quick, curious, always up to something.' },
      { name: 'A reindeer', line: 'Steady, loyal, the one everyone follows home.' }
    ],
    questions: [
      { q: 'A snow day is declared. You…', a: ['Read by the window', 'Cook for everyone', 'Go exploring', 'Organize the sledding'] },
      { q: 'Your winter drink?', a: ['Tea, quietly', 'Hot chocolate, extra everything', 'Something new each time', 'Coffee, on the move'] },
      { q: 'At the holiday party you are…', a: ['Watching from the good chair', 'Hugging everyone', 'Starting the game', 'Making sure people get home'] }
    ] },

  { name: 'The Hermit', keys: ['Stillness', 'A light in the dark'], type: 'candle',
    blurb: 'The Hermit carries one small lamp and needs nothing else. Tonight we each light a luminaria, the New Mexico way, and the wall fills up.',
    cta: 'Light your luminaria', circle: 'Luminarias on the wall', noun: 'luminaria' },

  { name: 'The Hanged Man', keys: ['Pause', 'Looking back'], type: 'question',
    blurb: 'He sees the year from a different angle. Turn yours over and look at the best part.',
    cta: "Open today's question", circle: 'Best moment of the year', noun: 'answer', view: 'sky',
    question: 'What was your best moment of this year?', placeholder: 'The one I keep coming back to…' },

  { name: 'The Emperor', keys: ['Order', 'Cozy'], type: 'checklist',
    blurb: 'Six small things for the home stretch. Tick them off any time before Christmas Eve.',
    cta: 'Open your checklist',
    items: ['Bake something', 'Call a friend you miss', 'Go and see the lights', 'Watch a holiday film in pajamas', 'Wrap one gift early', 'Light a candle at dinner'] },

  { name: 'The Star', keys: ['Hope', 'Wishes'], type: 'word', view: 'tree',
    blurb: 'The longest night of the year, and the card of hope. Choose one word to carry into next year and hang it on our tree.',
    cta: 'Choose your word', circle: 'The tree of words', noun: 'word',
    question: 'One word for next year', placeholder: 'One word' },

  { name: 'Three of Cups', keys: ['Gathering', 'A full table'], type: 'recipe',
    blurb: 'Three friends, three raised glasses. A dinner worth gathering around.',
    cta: 'See the recipe',
    recipe: { title: '[Your dinner recipe name]', makes: 'Serves 4', time: '45 minutes',
      need: ['[Ingredient one]', '[Ingredient two]', '[Ingredient three]', '[Ingredient four]'],
      steps: ['[First step]', '[Second step]', '[Third step]'] } },

  { name: 'Page of Cups', keys: ['Kindness', 'A message'], type: 'kind',
    blurb: 'The messenger with good news. Today the message comes from you.',
    cta: 'Write your sentence',
    question: 'Write one kind, true sentence about someone. Then send it to them yourself, today.' },

  { name: 'The World', keys: ['Completion', 'Christmas Eve'], type: 'finale',
    blurb: 'The last card. The whole deck is yours now.',
    cta: 'Open the last card', circle: 'The group card', noun: 'line',
    letter: ['Dear {name},', '[Macie, your closing letter goes here.]', 'Love, Macie'],
    question: 'Sign the group card', placeholder: 'Merry Christmas, from…' }
];
