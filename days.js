// All the content for the 24 cards lives in this file.
// Anything in [square brackets] is a placeholder for Macie to replace.
// {name} is swapped for the friend's first name.

export const NUMERALS = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX','XXI','XXII','XXIII','XXIV'];

// Card art that exists so far (day number -> file in /art). Cards without art show the gradient card.
export const ART = { 1: 'art/01.jpg', 2: 'art/02.jpg', 3: 'art/03.jpg', 4: 'art/04.jpg', 5: 'art/05.jpg', 6: 'art/06.jpg', 17: 'art/17.jpg' };

export const DAYS = [
  { name: 'The Fool', keys: ['Wanderlust', 'Letters'], type: 'letter',
    blurb: "They say every journey begins with The Fool, who steps off the edge of the world with a white dog at his heels and the whole sky in front of him. He knows the secret the rest of us forget: you don't have to be ready, you only have to begin. Tonight the first card of our deck turns over, and twenty-three more are waiting behind it. Inside this one is a letter I wrote just for you.",
    cta: 'Open your letter',
    letter: ["Dear {name},", "Welcome to the December Deck. I made this for the people who make my year, and you are one of them.", "Here is how it works. Every night at midnight a new card unwraps. Some will ask you a question, some will hand you a small gift, and some will simply send you outside to look at something. None of them will take more than a few minutes.", "You'll meet the others in the Circle. Not everyone here knows each other yet, but you all have one thing in common, which is me, and by Christmas Eve I hope you have a few more.", "There is no way to fall behind. Miss a day and the cards will wait for you.", "I'm so glad you're here. Now go and see what tomorrow brings.", "Love, Macie"] },

  { name: 'The Lovers', keys: ['Devotion', 'Keepsakes'], type: 'photo', view: 'mood', max: 4,
    blurb: "The Lovers is the card of the heart's quiet yes. It isn't only about romance. It's about every small thing you would choose again and again without thinking, because the things we love are a kind of map of who we are. Today, add four photos, one each for your favorite food, favorite activity, favorite Christmas decoration and your winter aesthetic, and watch them join everyone else's on one shared mood board.",
    cats: ['Favorite food', 'Favorite activity', 'Favorite Christmas decoration', 'Your winter aesthetic'],
    short: ['Food', 'Activity', 'Decoration', 'Aesthetic', 'More'], extraLabel: 'Anything else you love', extraMax: 4,
    cta: 'Pin your favorites', circle: 'The winter mood board', noun: 'photo', all: 'See the mood board' },

  { name: 'Wheel of Fortune', keys: ['Fortune', 'Chairlifts'], type: 'pick',
    blurb: "High above the clouds the Wheel of Fortune turns slowly, carrying everyone up and round and back again, like a chairlift that never stops. Its lesson is a gentle one: you can't hold the wheel still, so you may as well enjoy the ride. Today's card asks one quick question about a perfect ski day. Make your pick, and you'll see which way the rest of the Circle leaned.",
    cta: 'Take your seat', circle: 'First chair or après-ski', noun: 'pick',
    question: 'On a perfect ski day, where would we find you? ⛷️',
    options: ['On the very first chair up', 'First in line for après-ski'],
    crowd: ['the first-chair crowd', 'the après-ski crowd'] },

  { name: 'Temperance', keys: ['Harmony', 'Melodies'], type: 'playlist',
    blurb: "Temperance is an angel with one foot on the earth and one in the water, pouring starlight from cup to cup without losing a drop. She knows that the loveliest things are blends: never a single note, but all of them together. Today we make a little of that magic ourselves. Search for the songs that sound like winter to you and add them to our shared playlist, as many as you like.",
    cta: 'Add your songs', circle: 'Our winter playlist', noun: 'song',
    link: '', linkLabel: 'Listen to our playlist',
    question: 'Which songs sound like winter to you? ❄️' },

  { name: 'The Hierophant', keys: ['Ritual', 'Traditions'], type: 'question',
    blurb: "The Hierophant keeps the old keys. He is the guardian of ritual, of all the small ceremonies we repeat each year until they begin to glow. A tradition is just love that has learned to return on time. Today, tell us one winter tradition you never skip, and read the ones your friends are keeping too.",
    cta: 'Share your tradition', circle: 'Winter traditions', noun: 'answer',
    question: 'What winter tradition would it not be December without?', placeholder: 'Every year, without fail…' },

  { name: 'The High Priestess', keys: ['Mystery', 'Stories'], type: 'yourpick',
    blurb: "The High Priestess sits at the doorway between what is known and what is only felt, a crescent moon at her feet and a book half hidden in her robes. She reminds us that some stories find us exactly when we need them. Today she opens her library. You'll find the book I'm pressing into your hands this winter, and then you can search for your own favorites and add them to our shelf.",
    cta: 'Step into the library', circle: 'The enchanted bookshelf', noun: 'book',
    pickTitle: 'The Alchemist', pickBy: 'Paulo Coelho', pickCover: '', pickWhy: 'A shepherd, a dream and a long road through the desert. I come back to it whenever I need reminding that the treasure is usually closer than we think.',
    question: "Which book would you press into a friend's hands?", fieldA: 'Book title', fieldB: 'Author, if you remember' },

  { name: 'The Sun', keys: ['Radiance', 'Gratitude'], type: 'private',
    blurb: "Even in the deep of winter The Sun is still up there, golden and unbothered, waiting behind the clouds. This card is pure joy, the kind a child feels riding out into a bright morning, and its wisdom is simple: what you notice grows. So today, write down three good things from your year, however small. They're for your eyes only, and they'll be returned to you on Christmas Eve.",
    cta: 'Gather your three',
    question: 'Write down three good things from your year, however small. ✨',
    count: 3, save: 'Save my three' },

  { name: 'Justice', keys: ['Balance', 'Generosity'], type: 'charity',
    blurb: "Justice sits very still, a sword in one hand and golden scales in the other, weighing the world until it balances. She teaches that what we give comes back around, though rarely the way we expect. Today we tip the scales toward kindness together. Add up to three causes you care about to the pot. Each entry adds $5, and tonight one cause is drawn at random to receive it all.",
    cta: 'Add to the pot', circle: 'The giving pot', noun: 'cause' },

  { name: 'The Magician', keys: ['Alchemy', 'Handmade'], type: 'tutorial',
    blurb: "The Magician lifts his wand to the sky and points to the earth, and whatever he imagines begins to take shape on the table before him. His secret is that making something with your own hands is the oldest magic there is. Your ingredients have already arrived by post. Open the envelope I mailed you and follow along, step by step, and at the end, give your handiwork a private rating.",
    cta: 'Begin the craft',
    steps: ['[Step 1 of the craft]', '[Step 2 of the craft]', '[Step 3 of the craft]', '[Step 4 of the craft]', '[Step 5 of the craft]', '[Step 6 of the craft]'] },

  { name: 'The Chariot', keys: ['Momentum', 'Snowdrifts'], type: 'photo',
    blurb: "The Chariot races beneath a canopy of stars, drawn by two sphinxes and steered by nothing but will. It is the card of motion, of wind on your face and the feeling of being exactly where your feet are. The world looks different when you're moving through it. So go out into the cold today, to ski, sled, skate or simply walk, and bring back one photo of something you saw.",
    cta: 'Share what you saw', circle: 'Out in the cold', noun: 'photo' },

  { name: 'The Empress', keys: ['Abundance', 'Sweets'], type: 'recipe',
    blurb: "The Empress rests in a garden where everything blooms at once, a crown of twelve stars in her hair. She is the mother of abundance, and her magic is the warmth of a full kitchen and a table with room for one more. To feed someone is to tell them they belong. Today I'm sharing a recipe from my kitchen. Tick off the ingredients as you gather them, follow the steps, and save a copy to keep.",
    cta: 'Open the recipe',
    recipe: { title: '[Your recipe name]', makes: 'Makes 12', time: '25 minutes',
      need: ['[Ingredient one]', '[Ingredient two]', '[Ingredient three]', '[Ingredient four]'],
      steps: ['[First step]', '[Second step]', '[Third step]'] } },

  { name: 'Ace of Cups', keys: ['Overflow', 'Coffee'], type: 'gift',
    blurb: "From a hand in the clouds comes a single golden cup, spilling over in five bright streams. The Ace of Cups is the card of the unexpected gift, the small kindness that arrives exactly when the day needed it. A full cup is meant to be enjoyed slowly. Today, yours is on me. Check your texts for a coffee gift card, and take a quiet moment that is only for you.",
    cta: 'Open your gift',
    gift: 'Check your texts, {name}. ☕ A little coffee is on its way from me today. Find a seat by a good window, wrap both hands around the cup, and let the day wait for twenty minutes.' },

  { name: 'Ace of Pentacles', keys: ['Treasure', 'Trinkets'], type: 'favorites',
    blurb: "A single gold coin rests in an open palm, above a garden gate wound with roses. The Ace of Pentacles is the magic of everyday things, the humble object that turns out to be a small treasure. Not all wonders are grand, and some of them cost four dollars. Today, tell us the best thing you bought this year for under $25, and the best thing you bought for more.",
    cta: 'Share your treasures', circle: 'Treasures of the year', noun: 'treasures', label: 'Your treasures', all: "See everyone's treasures",
    question: 'Which small treasures earned their keep this year?',
    fields: ['Best thing under $25', 'Best thing over $25'] },

  { name: 'The Devil', keys: ['Mischief', 'Carols'], type: 'carol',
    blurb: "Every deck needs its mischief-maker, and ours has horns. The Devil isn't here to frighten anyone. He is the spirit of play, the wink that reminds us not to take ourselves too seriously, and laughter is its own kind of spell. So lend him five words, starting with a friend's name, and he will weave them into a Christmas carol the world has never heard before.",
    cta: 'Lend five words', circle: 'Carols never heard before', noun: 'carol',
    fields: ["A friend's name", 'A food', 'An adjective (sparkly, grumpy…)', 'A plural noun (mittens, reindeer…)', 'A verb (dance, nap…)'],
    // {0} friend's name, {1} food, {2} adjective, {3} plural noun, {4} verb
    carol: 'We wish {0} a Merry Christmas,\nWe wish {0} a Merry Christmas,\nWe wish {0} a Merry Christmas,\nAnd a {2} New Year!\nNow bring us some {1},\nAnd a pile of {3},\nThen {4} by the tree,\nWith a cup full of cheer! 🎄' },

  { name: 'Judgement', keys: ['Awakening', 'Riddles'], type: 'quiz',
    blurb: "An angel leans out of the clouds and sounds a golden trumpet, and far below, everyone rises to answer. Judgement is the card of awakening, the moment you discover what you have known all along. Today the trumpet calls for you. Answer six questions of Christmas trivia, and see your name take its place on the scoreboard.",
    cta: 'Answer the trumpet', circle: 'The trivia scoreboard', noun: 'score',
    questions: [
      { q: 'In "Mean Girls", which holiday song do The Plastics dance to at the school talent show?', a: ['Santa Baby', 'Jingle Bell Rock', "Rockin' Around the Christmas Tree"], right: 1,
        note: 'Boombox mishap and all, until the whole school sings them through it.' },
      { q: 'Who holds the record for the best-selling Christmas single by a female artist?', a: ['Mariah Carey', 'Ariana Grande', 'Kelly Clarkson'], right: 0,
        note: '"All I Want for Christmas Is You" came out in 1994 and has climbed back up the charts every December since.' },
      { q: 'What is the highest-grossing live-action Christmas movie of all time?', a: ['Elf', 'Love Actually', 'Home Alone'], right: 2,
        note: 'It has earned more than $475 million around the world since 1990.' },
      { q: 'According to legend, why were candy canes first handed out in Germany?', a: ['To decorate the first Christmas trees', 'To keep noisy children quiet in church', 'To soothe sore throats in winter'], right: 1,
        note: 'The story goes that a choirmaster in Cologne gave them out during long services in 1670.' },
      { q: 'Buddy the Elf is named after the brand printed on the diaper he wore as a baby. What was it?', a: ['Little Buddy Diapers', 'Buddy Boy Diapers', 'Best Buddy Diapers'], right: 0,
        note: 'Papa Elf reads it off the label when Buddy crawls out of Santa\'s sack.' },
      { q: 'In 19th-century Germany, the very first artificial Christmas trees were made from which dyed material?', a: ['Horse hair', 'Sheep wool', 'Goose feathers'], right: 2,
        note: 'The feathers were dyed green and wired onto branches to look like pine needles.' }
    ] },

  { name: 'The Moon', keys: ['Dreams', 'Cinema'], type: 'movie',
    blurb: "The Moon hangs low between two towers, silvering a winding path, and everything beneath it turns a little dreamlike. This is the card of imagination, of stories told after dark. Some nights are made for staying in and letting one unfold. Tonight I've chosen a holiday film for us and a snack to go with it. Find your softest blanket and settle in.",
    cta: "See tonight's plan",
    movie: '[Holiday movie title]', movieWhy: '[Macie, a line about why this one.]',
    snack: '[The snack pairing]', snackWhy: '[How to make or where to get it.]' },

  { name: 'Strength', keys: ['Courage', 'Creatures'], type: 'creature',
    blurb: "On the Strength card a woman rests her hands on a lion, and the lion, quite willingly, grows calm. Hers is not the loud kind of power. It is the gentle kind, the courage that looks like patience, and everyone carries a creature of their own inside. Answer six questions to discover which winter animal is yours, and keep its portrait as a wallpaper.",
    cta: 'Meet your creature', circle: 'Winter creatures', noun: 'result',
    title: 'Which winter creature walks beside you?',
    // Add art for a creature as art: 'art/c-owl.jpg' and it becomes the wallpaper.
    results: [
      { name: 'A snowy owl', line: 'Quiet and watchful, with a secret laugh only the lucky get to hear.', art: '' },
      { name: 'A polar bear', line: 'Calm and strong, happiest when everyone you love is close by.', art: 'art/c-bear.jpg' },
      { name: 'A red fox', line: 'Quick and curious, always halfway into the next adventure.', art: '' },
      { name: 'A reindeer', line: 'Steady and loyal, the one everybody follows home.', art: '' },
      { name: 'A St. Bernard', line: 'Big-hearted, and first through the snow when someone needs you.', art: '' },
      { name: 'A snow hare', line: 'Light on your feet, and always wherever the fun is.', art: '' }
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

  { name: 'The Hermit', keys: ['Solitude', 'Lanterns'], type: 'candle',
    blurb: "High on a snowy peak The Hermit lifts a lantern with a star caught inside it. He has learned that one small light, held steady, can guide a whole valley home. In New Mexico, on winter nights, people set candles glowing in paper bags along every wall and rooftop for the same reason. Tonight, light your own luminaria and watch our wall grow brighter as each friend adds hers.",
    cta: 'Light your luminaria', circle: 'Our wall of luminarias', noun: 'luminaria' },

  { name: 'The Hanged Man', keys: ['Stillness', 'Memories'], type: 'question',
    blurb: "The Hanged Man hangs by one foot from a living tree, a halo of light around his head and the most peaceful look on his face. He has discovered that when you turn the world upside down, hidden things fall out of its pockets. Look back on your year that way. Find the best moment of it and write it down, and it will become a star in the sky we are filling together.",
    cta: 'Add your star', circle: 'A sky of best moments', noun: 'answer', view: 'sky',
    question: 'What was the brightest moment of your year? ✨', placeholder: 'The one I keep returning to…' },

  { name: 'The Emperor', keys: ['Order', 'Secrets'], type: 'lies',
    blurb: "The Emperor sits upon a throne of stone, and the mountains themselves seem to stand in line behind him. Nothing gets past him. He can tell a true thing from a tall tale at a hundred paces, and he knows that the best stories are the ones that might just be true. Today, tell us three things about yourself, two of them true and one invented, and see who in the Circle can spot the lie.",
    cta: 'Tell your three', circle: 'Two truths and a lie', noun: 'three', countAs: 'friend',
    question: 'Three things about you. Two are true, and one is not. 🤫',
    placeholders: ['I once…', 'Every December I…', 'I have never…'] },

  { name: 'The Star', keys: ['Hope', 'Wishes'], type: 'word', view: 'stamps',
    blurb: "When the long night is at its darkest The Star appears: one great light and seven small ones, and a woman pouring water back to the earth beneath them. She is hope itself, the quiet certainty that good things are on their way. Tonight is the longest night of the year, and so the best one for wishing. Choose one word for the year ahead, set it on a stamp of your own design, and send it into the future.",
    cta: 'Make your stamp', circle: 'Stamps for next year', noun: 'stamp',
    question: 'One word to carry into next year', placeholder: 'One word',
    // Stamp backgrounds friends can pick. The six names are built-in finishes.
    // To add a picture, put the file in art/stamps/ and list it here, e.g. 'art/stamps/pine.jpg'.
    stamps: ['glow', 'navy', 'pale', 'deep', 'dusk', 'frost'] },

  { name: 'Three of Cups', keys: ['Friendship', 'Feasts'], type: 'recipe',
    blurb: "Three friends lift their cups in a garden heavy with harvest, and for a moment nothing else in the world is needed. The Three of Cups is the card of friendship, and of joy that grows when it is shared. A meal made with love is a small celebration. Tonight I'm sharing a dinner recipe I would make for all of you. Gather the ingredients, follow the steps, and save a copy for your own table.",
    cta: 'Open the recipe',
    recipe: { title: '[Your dinner recipe name]', makes: 'Serves 4', time: '45 minutes',
      need: ['[Ingredient one]', '[Ingredient two]', '[Ingredient three]', '[Ingredient four]'],
      steps: ['[First step]', '[Second step]', '[Third step]'] } },

  { name: 'Page of Cups', keys: ['Tenderness', 'Whispers'], type: 'kind',
    blurb: "The Page of Cups stands by the sea, and to his great delight a little fish has popped out of his cup to say hello. He is the messenger of the heart, bringing tender news and unexpected sweetness. Kind words are a spell anyone can cast. Think of someone you love, write one true and kind sentence about them, and then send it to them yourself. This one stays between the two of you.",
    cta: 'Write your sentence',
    question: 'Think of someone you love. Write one kind, true sentence about them, and then send it to them yourself. 💛' },

  { name: 'The World', keys: ['Wholeness', 'Homecoming'], type: 'finale',
    blurb: "And so we come to The World: a dancer in a wreath of evergreen, turning at the center of everything, the journey complete. The Fool who set out on the first of December has arrived, and so have you. Every ending holds its own beginning. Inside this last card is a letter from me, the three good things you wrote down on the seventh, and a card for all of us to sign together.",
    cta: 'Open the last card', circle: 'Our group card', noun: 'line',
    letter: ["Dear {name},", "Twenty-four cards ago I asked you to begin before you felt ready, and you did. You showed up, you answered, you lit your luminaria and added your star, and you made this little corner of December feel like a room full of friends.", "I started this because I wanted a way to tell the people I love that I was thinking of them, every day, for a whole month. What I didn't expect was how much you would give back. I have read every answer, and I've saved more of them than you know.", "Below are the three good things you wrote down on the seventh. I hope they make you smile, and I hope next year hands you thirty more.", "Sign our card before you go. Then put your phone down, find your people, and have the merriest Christmas.", "With all my love, Macie"],
    question: 'Sign our group card ✍️', placeholder: 'Merry Christmas, with love from…' }
];
