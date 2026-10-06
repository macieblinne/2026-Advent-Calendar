// All the content for the 24 cards lives in this file.
// Anything in [square brackets] is a placeholder for Macie to replace.
// {name} is swapped for the friend's first name.

export const NUMERALS = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX','XXI','XXII','XXIII','XXIV'];

// Card art that exists so far (day number -> file in /art). Cards without art show the gradient card.
export const ART = { 1: 'art/01.jpg', 2: 'art/02.jpg', 3: 'art/03.jpg', 4: 'art/04.jpg', 5: 'art/05.jpg', 6: 'art/06.jpg', 17: 'art/17.jpg' };

export const DAYS = [
  { name: 'The Fool', keys: ['Beginnings', 'Setting out'], type: 'letter',
    blurb: "Every deck begins with The Fool: a traveler stepping off a cliff edge with a small dog, a light bag and no plan whatsoever. It isn't a card about foolishness. It's about beginning before you feel ready, which is the only way anything good ever starts. So here we go, twenty-four days of it. Before anything else, there's a note waiting for you.",
    cta: 'Read your note',
    letter: ['Dear {name},', '[Macie, your first letter goes here. Each friend sees her own name at the top.]', 'Love, Macie'] },

  { name: 'The Lovers', keys: ['Affection', 'Favorite things'], type: 'photo', view: 'mood', max: 4,
    blurb: "Despite the name, The Lovers isn't only about romance. It's the card of choosing: the people, places and small things you'd pick again every time. Today we're collecting those. Show us four of your winter favorites and we'll pin them all onto one board, so we can see what December looks like through everyone's eyes.",
    cats: ['Favorite food', 'Favorite activity', 'Favorite Christmas decoration', 'Your winter aesthetic'],
    short: ['Food', 'Activity', 'Decoration', 'Aesthetic', 'More'], extraLabel: 'Anything else', extraMax: 4,
    cta: 'Add your favorites', circle: 'The winter mood board', noun: 'photo', all: 'See the mood board' },

  { name: 'Wheel of Fortune', keys: ['Chance', 'Either, or'], type: 'pick',
    blurb: "The Wheel of Fortune turns whether you're ready or not. What goes up comes down, and on a good day there's a chairlift to take you back up again. It's the card of luck, timing and making a call without overthinking it. So don't overthink this one. There are two kinds of people on a ski day, and it's time to declare yourself.",
    cta: 'Make your pick', circle: 'First chair or après-ski', noun: 'pick',
    question: 'On a perfect ski day, you are…',
    options: ['On the first chair up', 'First in line for après-ski'],
    crowd: ['the first-chair crowd', 'the après-ski crowd'] },

  { name: 'Temperance', keys: ['Harmony', 'A good mix'], type: 'playlist',
    blurb: "Temperance is usually drawn as an angel pouring water between two cups without spilling a drop. She's the patron saint of the perfect blend: a little of this, a little of that, nothing too much. Which is exactly how a good playlist works. Today we're mixing one together, so add the songs that sound like winter to you, even the embarrassing ones. Especially the embarrassing ones.",
    cta: 'Open the playlist', circle: 'The playlist', noun: 'song',
    link: '', linkLabel: 'Listen to the playlist',
    question: 'Add a song to the playlist' },

  { name: 'The Hierophant', keys: ['Tradition', 'Ritual', 'Belonging'], type: 'question',
    blurb: "The Hierophant is the keeper of rituals, the one who knows why we do things the way we've always done them, or at least insists that we keep doing them. Every family and friend group has a few: the film that must be watched, the dish nobody likes but everyone makes, the walk that happens whatever the weather. Today, tell us one of yours.",
    cta: "Open today's question", circle: 'Winter traditions', noun: 'answer',
    question: 'What winter tradition do you never skip?', placeholder: 'Every year, without fail…' },

  { name: 'The High Priestess', keys: ['Hidden knowledge', 'Books'], type: 'yourpick',
    blurb: "The High Priestess sits between two pillars with a scroll in her lap, and she is not telling you what's on it. She's the card of quiet knowing, of the thing you read once that never left you. She would also have excellent taste in novels. Today she's making an exception and sharing. Here's a book I love, and then it's your turn to add to the shelf.",
    cta: "See Macie's pick", circle: 'The bookshelf', noun: 'book',
    pickTitle: '[Book title]', pickBy: '[Author]', pickCover: '', pickWhy: '[Macie, a line about why you love it.]',
    question: 'Now add one to the shelf', fieldA: 'Book title', fieldB: 'Author, if you remember' },

  { name: 'The Sun', keys: ['Joy', 'Gratitude'], type: 'private',
    blurb: "The Sun is the happiest card in the deck: a child on a white horse, sunflowers, not a cloud anywhere. It turns up to remind you that things are, on the whole, better than you've been giving them credit for. In the darkest month of the year, that's worth a minute of your time. Write down three good things from this year. Nobody sees them but you, and they'll come back to you on Christmas Eve.",
    cta: 'Write your three',
    question: 'Three good things from this year. Small ones count. They come back to you on Christmas Eve.',
    count: 3, save: 'Save my three' },

  { name: 'Justice', keys: ['Giving', 'Fairness'], type: 'charity',
    blurb: "Justice holds a pair of scales and a sword, and she is scrupulously fair. She's the card of giving things their due, and in December that means the causes doing the real work while the rest of us eat cookies. Here's how today works: name a cause you love and it goes into the pot. Every entry adds $5. Tonight one is drawn at random, and I'll send it the whole pot.",
    cta: 'Add a cause', circle: 'The giving pot', noun: 'cause' },

  { name: 'The Magician', keys: ['Making', 'With your hands'], type: 'tutorial',
    blurb: "The Magician stands at a table with everything he needs laid out in front of him, one hand pointing up and one pointing down. His whole message is that you already have the tools; you just have to start. In your case that's literally true, because an envelope from me should have landed in your mailbox. Open it, clear a bit of table, and let's make something.",
    cta: "Start today's craft",
    steps: ['[Step 1 of the craft]', '[Step 2 of the craft]', '[Step 3 of the craft]', '[Step 4 of the craft]', '[Step 5 of the craft]', '[Step 6 of the craft]'] },

  { name: 'The Chariot', keys: ['Motion', 'Fresh air'], type: 'photo',
    blurb: "The Chariot is the card of getting up and going. It's willpower with wheels on: pointed somewhere, moving fast, slightly windswept. Today it's telling you to put your coat on. Ski, sled, skate, or just walk around the block and back. Whatever you do out there, take one photo of something you saw and bring it back to show us.",
    cta: 'Share your photo', circle: 'Out in the cold', noun: 'photo' },

  { name: 'The Empress', keys: ['Abundance', 'Comfort'], type: 'recipe',
    blurb: "The Empress lounges on cushions in a field of wheat, surrounded by more good things than one person could need. She's abundance, comfort and second helpings, and she has never once said \"oh, I shouldn't.\" She also feeds everyone who walks through her door. In her honor, here's something from my kitchen to yours. Make it this week and think of me.",
    cta: 'See the recipe',
    recipe: { title: '[Your recipe name]', makes: 'Makes 12', time: '25 minutes',
      need: ['[Ingredient one]', '[Ingredient two]', '[Ingredient three]', '[Ingredient four]'],
      steps: ['[First step]', '[Second step]', '[Third step]'] } },

  { name: 'Ace of Cups', keys: ['A full cup', 'A small treat'], type: 'gift',
    blurb: "The Ace of Cups shows a single cup, overflowing, held out by a hand from the clouds. It's the card of a small kindness arriving out of nowhere, a full heart, a treat you didn't have to earn. Today that's quite literal. Check your texts: there's a coffee on me. Take twenty minutes, go somewhere with a good window, and drink it slowly.",
    cta: 'Open your gift',
    gift: 'Check your texts, {name}. A coffee gift card is on its way from Macie today. Take twenty minutes for yourself and drink it somewhere nice.' },

  { name: 'Ace of Pentacles', keys: ['Small treasures', 'Good finds'], type: 'favorites',
    blurb: "The Ace of Pentacles is a single gold coin offered in an open hand. It's the card of good, solid, real-world things: the purchase you never regretted, the thing that quietly made every day a bit better. We all found a few of those this year, and it would be selfish to keep them to ourselves. Tell us one bargain and one splurge that earned their keep.",
    cta: 'Share your best buys', circle: 'Best buys of the year', noun: 'best buys', label: 'Your best buys', all: "See everyone's best buys",
    question: 'What were your best buys this year?',
    fields: ['Best thing under $25', 'Best thing over $25'] },

  { name: 'The Devil', keys: ['Mischief', 'Nonsense'], type: 'carol',
    blurb: "Don't panic. The Devil isn't as bad as he looks. In tarot he's the card of mischief, indulgence and not taking things so seriously, which makes him the patron of exactly the kind of nonsense we're about to commit. Give me four words, no questions asked. I'll hand you back a Christmas carol that has been improved beyond recognition.",
    cta: 'Write a silly carol', circle: 'Silly carols', noun: 'carol',
    fields: ['An adjective', 'An animal', 'A food', 'A verb ending in -ing'],
    carol: 'Dashing through the {0} snow, on a one-{1} open sleigh, o\'er the fields of {2} we go, {3} all the way!' },

  { name: 'Judgement', keys: ['The verdict', 'Trivia'], type: 'quiz',
    blurb: "On the Judgement card an angel blows a trumpet and everyone stands up to be counted. It's the moment of reckoning, the final tally, the truth coming out at last. In our case, the truth about how much you actually know about Christmas. Five questions. No studying, no searching, and the scoreboard is very much public.",
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
    blurb: "The Moon is the card of dreams, strange light and nights that feel a little enchanted. Under it a dog and a wolf howl at the sky and a small lobster climbs out of a pond, for reasons nobody has ever fully explained. It's telling you to stay in tonight. I've picked the film and the snack to go with it. All you have to do is find the good blanket.",
    cta: "See tonight's plan",
    movie: '[Holiday movie title]', movieWhy: '[Macie, a line about why this one.]',
    snack: '[The snack pairing]', snackWhy: '[How to make or where to get it.]' },

  { name: 'Strength', keys: ['Courage', 'Gentleness'], type: 'creature',
    blurb: "The Strength card shows a woman calmly closing a lion's jaws with her bare hands. Not by force. She's simply so steady that the lion goes along with it. It's a card about the quiet kind of strength, and everyone's comes in a different shape. Six quick questions will tell you which winter creature yours looks like, and you'll get a wallpaper to prove it.",
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
    blurb: "The Hermit stands alone on a mountaintop holding up a single lantern. He isn't lonely. He's the one who goes ahead in the dark and holds a light so the rest of us can find the way. In New Mexico they do the same thing with paper bags and candles, lining walls and rooftops until the whole town glows. Tonight we each light one, and watch our wall fill up.",
    cta: 'Light your luminaria', circle: 'Luminarias on the wall', noun: 'luminaria' },

  { name: 'The Hanged Man', keys: ['Pause', 'Looking back'], type: 'question',
    blurb: "The Hanged Man dangles upside down by one foot, perfectly calm, with a halo round his head. He's not in trouble. He's just looking at everything from a different angle, and it turns out the view is rather good. So turn your year over for a minute. Skip the big headlines and find the best moment, the one you keep going back to. Then put it in our sky.",
    cta: "Open today's question", circle: 'Best moment of the year', noun: 'answer', view: 'sky',
    question: 'What was your best moment of this year?', placeholder: 'The one I keep coming back to…' },

  { name: 'The Emperor', keys: ['Order', 'Cozy'], type: 'checklist',
    blurb: "The Emperor sits on a stone throne with a very firm grip on things. He's the card of order, structure and a plan that actually gets followed. Five days out from Christmas, we could all use a little of that. So here's a list, but a gentle one: six small, cozy things for the home stretch. Tick them off as you go. Nobody is checking but you.",
    cta: 'Open your checklist',
    items: ['Bake something', 'Call a friend you miss', 'Go and see the lights', 'Watch a holiday film in pajamas', 'Wrap one gift early', 'Light a candle at dinner'] },

  { name: 'The Star', keys: ['Hope', 'Wishes'], type: 'word', view: 'stamps',
    blurb: "After the storm in the deck comes The Star: a woman kneeling by a pool under a sky full of light, pouring water back into the earth. It's the card of hope, of quietly believing that next year can be good. Tonight is the longest night of the year, which makes it the right night for wishing. Choose one word to carry into next year and put it on a stamp, ready to send.",
    cta: 'Make your stamp', circle: 'Stamps for next year', noun: 'stamp',
    question: 'One word for next year', placeholder: 'One word',
    // Stamp backgrounds friends can pick. The six names are built-in finishes.
    // To add a picture, put the file in art/stamps/ and list it here, e.g. 'art/stamps/pine.jpg'.
    stamps: ['glow', 'navy', 'pale', 'deep', 'dusk', 'frost'] },

  { name: 'Three of Cups', keys: ['Gathering', 'A full table'], type: 'recipe',
    blurb: "Three friends, three raised glasses, one very good evening: the Three of Cups is the card of celebrating with the people who know you best. It tends to show up when there's a table to gather round. This is the dinner I'd make if you were all coming over. Since you can't all fit in my kitchen, here's the recipe.",
    cta: 'See the recipe',
    recipe: { title: '[Your dinner recipe name]', makes: 'Serves 4', time: '45 minutes',
      need: ['[Ingredient one]', '[Ingredient two]', '[Ingredient three]', '[Ingredient four]'],
      steps: ['[First step]', '[Second step]', '[Third step]'] } },

  { name: 'Page of Cups', keys: ['Kindness', 'A message'], type: 'kind',
    blurb: "The Page of Cups is a young messenger gazing into a cup with a fish poking out of it. Odd, yes, but he's the card of tender surprises and of saying the sweet thing out loud instead of just thinking it. We all have someone we've been meaning to say something kind to. Today's the day. Write one true sentence about them, and then go and send it yourself.",
    cta: 'Write your sentence',
    question: 'Write one kind, true sentence about someone. Then send it to them yourself, today.' },

  { name: 'The World', keys: ['Completion', 'Christmas Eve'], type: 'finale',
    blurb: "The last card in the deck is The World: a dancer inside a wreath, the whole journey complete. The Fool who stepped off the cliff on December 1 has made it all the way round, which means you have too. Thank you for showing up every day and making this what it was. There's one more note from me, three good things you wrote down weeks ago, and a card for all of us to sign.",
    cta: 'Open the last card', circle: 'The group card', noun: 'line',
    letter: ['Dear {name},', '[Macie, your closing letter goes here.]', 'Love, Macie'],
    question: 'Sign the group card', placeholder: 'Merry Christmas, from…' }
];
