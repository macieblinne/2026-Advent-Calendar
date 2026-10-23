// All the content for the 24 cards lives in this file.
// Anything in [square brackets] is a placeholder for Macie to replace.
// {name} is swapped for the friend's first name.

export const NUMERALS = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX','XXI','XXII','XXIII','XXIV'];

// Card art that exists so far (day number -> file in /art). Cards without art show the gradient card.
export const ART = { 1: 'art/01.jpg', 2: 'art/02.jpg', 3: 'art/03.jpg', 4: 'art/04.jpg', 5: 'art/05.jpg', 6: 'art/06.jpg', 7: 'art/07.jpg', 8: 'art/08.jpg', 9: 'art/09.jpg', 10: 'art/10.jpg', 11: 'art/11.jpg', 12: 'art/12.jpg', 13: 'art/13.jpg', 14: 'art/14.jpg', 15: 'art/15.jpg', 16: 'art/16.jpg', 17: 'art/17.jpg', 18: 'art/18.jpg', 19: 'art/19.jpg', 20: 'art/20.jpg', 21: 'art/21.jpg', 22: 'art/22.jpg', 23: 'art/23.jpg', 24: 'art/24.jpg' };

export const DAYS = [
  { name: 'The Fool', keys: ['Wanderlust', 'Letters'], type: 'letter',
    blurb: "They say every journey begins with The Fool. He steps off the edge of the world with a white dog at his heels and the whole sky in front of him. He knows the secret the rest of us forget: you don't have to be ready, you only have to begin. Tonight the first card of our deck turns over and twenty-three more wait behind it. Inside this one is a letter I wrote just for you.",
    cta: 'Open your letter',
    letter: ["Dear {name},", "Welcome to the Winter Oracle!", "Here’s how it works. Every night at midnight, while you’re asleep, a new card turns over. Some will ask you a question, some will slip you a small gift, and some will simply send you out into the cold to look at something magical. None of them will take more than a few minutes.", "You’ll meet the others in the Circle (the second tab up top), where everyone’s answers and photos gather. Some of you know each other, some of you don’t yet. By Christmas Eve, I hope that changes and you’re all inspired by each other. The best part of this won’t be the cards, it’ll be what you share with each other: the small traditions, the bright moments, the year you’ve each had.", "There is no way to fall behind. Miss a day and the cards will wait for you.", "I’m so glad you’re here. Now go to sleep, and see what tomorrow brings.", "Love, Macie"] },

  { name: 'The Lovers', keys: ['Devotion', 'Keepsakes'], type: 'photo', view: 'mood', max: 4,
    blurb: "The Lovers is the card of the heart's quiet yes. It isn't only about romance. It's about the small things you'd choose again and again without a second thought, the ones that make up the map of who you are. Today, draw your map in pictures. Add four photos: your favorite food, your favorite activity, your favorite Christmas decoration and your winter aesthetic. Then watch them join everyone else's on a shared mood board.",
    cats: ['Favorite food', 'Favorite activity', 'Favorite Christmas decoration', 'Your winter aesthetic'],
    short: ['Food', 'Activity', 'Decoration', 'Aesthetic', 'More'], extraLabel: 'Anything else you love', extraMax: 4,
    cta: 'Pin your favorites', circle: 'The winter mood board', noun: 'photo', all: 'See the mood board' },

  { name: 'Wheel of Fortune', keys: ['Fortune', 'Snowdays'], type: 'pick',
    blurb: "High above the clouds the Wheel of Fortune turns slowly, carrying everyone up and round and back again. Its lesson is a gentle one. You can't hold the wheel still, so you may as well enjoy the ride. Today the wheel stops on a free Saturday in December and asks what you'd do with it. Make your pick and see which way the rest of the Circle leaned.",
    cta: 'Spin the wheel', circle: 'Powder day or pajama day', noun: 'pick',
    question: 'Fortune hands you a free Saturday in December. Powder day, or pajama day?',
    options: ['Powder day', 'Pajama day'],
    crowd: ['the powder-day crowd', 'the pajama-day crowd'] },

  { name: 'Temperance', keys: ['Harmony', 'Melodies'], type: 'playlist',
    blurb: "Temperance is an angel with one foot on the earth and one in the water, pouring starlight from cup to cup without losing a drop. She knows that the loveliest things are blends. Never a single note, but all of them together. Today we make a little of that magic ourselves. Search for the songs that sound like winter to you and add them to our shared playlist.",
    cta: 'Add your songs', circle: 'Our winter playlist', noun: 'song',
    link: 'https://open.spotify.com/playlist/4H8m9gcJdmqngQCWk92GL6', linkLabel: 'Listen to our playlist',
    question: 'Which songs sound like winter to you? ❄️' },

  { name: 'The Hierophant', keys: ['Ritual', 'Traditions'], type: 'question',
    blurb: "The Hierophant keeps the old keys. He is the guardian of ritual, of all the small ceremonies we repeat each year until they begin to glow. A tradition is just love that has learned to return on time. Today, tell us one winter tradition you never skip and read the ones your friends are keeping too.",
    cta: 'Share your tradition', circle: 'Winter traditions', noun: 'answer',
    question: 'What winter tradition would it not be December without?', placeholder: 'Every year, without fail…' },

  { name: 'The High Priestess', keys: ['Mystery', 'Stories'], type: 'yourpick',
    blurb: "The High Priestess sits at the doorway between what is known and what is only felt, a crescent moon at her feet and a book half hidden in her robes. She reminds us that some stories find us exactly when we need them. Today she opens her library. You'll find the book I'm pressing into your hands this winter. Then search for your own favorites and add them to our shelf.",
    cta: 'Step into the library', circle: 'The enchanted bookshelf', noun: 'book',
    pickTitle: 'The Alchemist', pickBy: 'Paulo Coelho', pickCover: '', pickWhy: 'A shepherd boy chases a dream across the desert and learns that the journey was the treasure all along. It\u2019s one of my most treasured reads and one I come back to every few years. I hope you\u2019ll add it to your TBR!',
    question: "Which book would you press into a friend's hands?", fieldA: 'Book title', fieldB: 'Author, if you remember' },

  { name: 'The Sun', keys: ['Radiance', 'Gratitude'], type: 'private',
    blurb: "Even in the deep of winter The Sun is still up there, golden and unbothered, waiting behind the clouds. This card is pure joy, the kind you felt waking up to the first snow day as a kid. Its wisdom is simple: what you notice grows. So today, write down three good things from your year, however small. They're for your eyes only.",
    cta: 'Gather your three',
    question: 'Write down three good things from your year, however small. ✨',
    count: 3, save: 'Save my three' },

  { name: 'Justice', keys: ['Balance', 'Generosity'], type: 'charity',
    blurb: "Justice sits very still, a sword in one hand and golden scales in the other, weighing the world until it balances. She teaches that what we give comes back around, though rarely the way we expect. Today we tip the scales toward kindness together. Add up to three causes you care about to the pot. Each entry adds $5 and tonight one cause is drawn at random to receive it all.",
    cta: 'Add to the pot', circle: 'The giving pot', noun: 'cause' },

  { name: 'The Magician', keys: ['Alchemy', 'Handmade'], type: 'tutorial',
    blurb: "The Magician lifts his wand to the sky and points to the earth, and whatever he imagines begins to take shape on the table before him. His secret is that making something with your own hands is the oldest magic there is. Tonight we're sewing a felt ornament, and everything you need has already arrived by post. Open the envelope I mailed you, follow along step by step, and hang it where you'll see it every morning. At the end, give your creation a rating.",
    cta: 'Begin the craft',
    steps: ['[Step 1 of the craft]', '[Step 2 of the craft]', '[Step 3 of the craft]', '[Step 4 of the craft]', '[Step 5 of the craft]', '[Step 6 of the craft]'] },

  { name: 'The Chariot', keys: ['Momentum', 'Snowdrifts'], type: 'photo',
    blurb: "The Chariot races beneath a canopy of stars, drawn by two sphinxes and steered by nothing but will. It is the card of motion, of wind on your face and the feeling of being exactly where your feet are. The world looks different when you're moving through it. So go out into the cold today to ski, sled, skate or simply walk, and bring back one photo of something you saw.",
    cta: 'Share what you saw', circle: 'Out in the cold', noun: 'photo' },

  { name: 'The Empress', keys: ['Abundance', 'Sweets'], type: 'recipe',
    blurb: "The Empress rests in a garden where everything blooms at once, a crown of twelve stars in her hair. She is the mother of abundance. Her magic is the warmth of a full kitchen and a table with room for one more. To feed someone is to tell them they belong. Today I'm sharing the cookies I grew up on. Biscochitos were on every holiday table of my childhood, and one bite still turns any kitchen into my grandmother's.",
    cta: 'Open the recipe',
    recipe: { title: 'New Mexico Biscochitos', makes: 'Makes about 3 dozen', time: 'About 1 hour',
      intro: "New Mexico's state cookie, and the taste of every Christmas I can remember. Crisp, buttery and scented with anise and orange, then rolled in cinnamon sugar. One bite and the kitchen fills up with people you love. Adapted from Some the Wiser.",
      need: ['3 cups all-purpose flour 🌾', '1½ teaspoons baking powder 🥄', '½ teaspoon salt 🧂', '3 teaspoons anise seed, crushed 🌿', 'Zest of 1 orange 🍊', '1¼ cups lard 🧈', '¾ cup sugar 🍬', '1 large egg 🥚', '1 teaspoon vanilla extract 🍦', 'For rolling: 1 cup sugar + 2 teaspoons cinnamon ✨'],
      steps: ['Sift **3 cups flour**, **1½ teaspoons baking powder** and **½ teaspoon salt** into a medium bowl. Whisk in **3 teaspoons crushed anise seed** and the **zest of 1 orange**.', 'In a large bowl, beat **1¼ cups lard** and **¾ cup sugar** until light and fluffy, about 3 minutes. Beat in **1 egg** and **1 teaspoon vanilla**, then mix in the flour mixture just until combined. The dough will be crumbly, more like pie crust than cookie dough.', 'Gather the dough into a ball with your hands, wrap it and chill for 30 minutes.', 'Heat the oven to 350°F and line a baking sheet. Mix **1 cup sugar** and **2 teaspoons cinnamon** in a small bowl for rolling.', 'Divide the chilled dough into three roughly equal balls. It will feel crumbly and stiff at first, so knead each ball with your hands until the lard softens and the dough turns smooth and pliable. On a lightly floured surface, roll one ball at a time to ¼ inch thick and cut out stars or the traditional fleur-de-lis. Gather the scraps, knead briefly and roll again.', 'Bake 10 to 12 minutes, until just barely golden. Don\'t overbake.', 'Let them rest on the pan for 10 minutes, dusting with the cinnamon sugar as they cool. They are fragile while warm. Then dip each one in the cinnamon sugar and move to a rack.'],
      tip: 'Lard is what really makes this recipe special, but if you can\'t find it, substitute vegetable shortening.' } },

  { name: 'Ace of Cups', keys: ['Overflow', 'Coffee'], type: 'gift',
    blurb: "From a hand in the clouds comes a single golden cup, spilling over in five bright streams. The Ace of Cups is the card of the unexpected gift, the small kindness that arrives exactly when the day needed it. A full cup is meant to be enjoyed slowly. Today, yours is on me.",
    cta: 'Open your gift',
    gift: 'Check your Venmo, {name}. ☕ Today\'s coffee is on me. Treat yourself to the good stuff, take a seat somewhere cozy, and enjoy every sip.' },

  { name: 'Ace of Pentacles', keys: ['Treasure', 'Trinkets'], type: 'favorites',
    blurb: "A single gold coin rests in an open palm, above a garden gate wound with roses. The Ace of Pentacles is the magic of everyday things, the humble object that turns out to be a small treasure. Not all wonders are grand. Today, tell us the best thing you bought this year for under $25 and the best thing you bought for more.",
    cta: 'Share your treasures', circle: 'Treasures of the year', noun: 'treasures', label: 'Your treasures', all: "See everyone's treasures",
    question: 'Which small treasures earned their keep this year?',
    fields: ['Best thing under $25', 'Best thing over $25'] },

  { name: 'The Devil', keys: ['Mischief', 'Carols'], type: 'carol',
    blurb: "Every deck needs its mischief-maker, and ours has horns. The Devil isn't here to frighten anyone. He is the spirit of play, the wink that reminds us not to take ourselves too seriously. Laughter is its own kind of spell. So lend him five words, starting with a friend's name, and he will weave them into a Christmas carol the world has never heard before.",
    cta: 'Lend five words', circle: 'Carols never heard before', noun: 'carol',
    fields: ["A friend's name", 'A food', 'An adjective (sparkly, grumpy…)', 'A plural noun (mittens, reindeer…)', 'A verb (dance, nap…)'],
    // {0} friend's name, {1} food, {2} adjective, {3} plural noun, {4} verb
    carol: 'We wish {0} a Merry Christmas,\nWe wish {0} a Merry Christmas,\nWe wish {0} a Merry Christmas,\nAnd a {2} New Year!\nNow bring us some {1},\nAnd a pile of {3},\nThen {4} by the tree,\nWith a cup full of cheer! 🎄' },

  { name: 'Judgement', keys: ['Awakening', 'Riddles'], type: 'quiz',
    blurb: "An angel leans out of the clouds and sounds a golden trumpet, and far below everyone rises to answer. Judgement is the card of awakening, the moment you discover what you have known all along. Today the trumpet calls for you. Answer six questions of Christmas trivia and see your name take its place on the scoreboard.",
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
    blurb: "The Moon hangs low between two towers and silvers a winding path, and everything beneath it turns a little dreamlike. This is the card of imagination and stories told after dark. Some nights are made for staying in and letting one unfold. Tonight I've chosen a holiday film for us, with a snack and a warm drink to go with it. Find your coziest blanket and snuggle up.",
    cta: "See tonight's plan",
    movie: 'Elf', movieYear: '2003', movieLen: '1h 37m', movieWhy: "Buddy the Elf, a sea of syrup, and the single most sincere performance ever put on film. It's the one I put on every year and laugh at every time.",
    treats: [
      { title: 'Hot cocoa rice krispie treats', makes: 'Makes 16 squares', time: '20 minutes',
        need: ['6 tablespoons butter 🧈', '1 bag (10 oz) mini marshmallows, plus 1 cup more for folding in ☁️', '¼ cup unsweetened cocoa powder 🍫', '¼ teaspoon salt 🧂', '1 teaspoon vanilla extract 🍦', '6 cups crispy rice cereal 🥣'],
        steps: ['Butter a 9×9 pan. Melt **6 tablespoons butter** in a large pot over medium-low heat and let it cook until it smells nutty and turns golden, 3 to 4 minutes.', 'Add **1 bag mini marshmallows** and stir until melted and smooth. Stir in **¼ cup cocoa**, **¼ teaspoon salt** and **1 teaspoon vanilla**.', 'Take the pot off the heat. Fold in **6 cups rice cereal** until coated, then fold in the **extra cup of marshmallows** so a few stay whole.', 'Press gently into the pan with buttered hands. Let set 30 minutes, then cut into squares.'] },
      { title: 'Hot negroni', makes: 'Makes 1 mug', time: '5 minutes',
        need: ['1 oz gin 🍸', '1 oz Campari 🍊', '1 oz sweet vermouth 🍷', '½ oz fresh lemon juice 🍋', '4 oz hot chamomile tea 🍵', 'A strip of orange peel 🍊'],
        steps: ['Brew **4 oz chamomile tea**, strong, and keep it hot.', 'In a small pot over low heat, warm **1 oz gin**, **1 oz Campari** and **1 oz sweet vermouth** until steaming. Don\'t let it boil.', 'Pour into a mug, add the tea and **½ oz lemon juice**, and stir.', 'Twist a **strip of orange peel** over the top and drop it in.'] },
      { title: 'Spiced cranberry shrub', makes: 'Makes 1 glass', time: '5 minutes', zero: true,
        need: ['[Shrub ingredients to come]'],
        steps: ['[Steps to come]'] }
    ] },

  { name: 'Strength', keys: ['Courage', 'Creatures'], type: 'creature',
    blurb: "On the Strength card a woman rests her hands on a lion, and the lion, quite willingly, grows calm. Hers is not the loud kind of power. It is the gentle kind, the courage that looks like patience. Everyone carries a creature of their own inside. Answer six questions to discover which winter animal is yours.",
    cta: 'Meet your creature', circle: 'Winter creatures', noun: 'result',
    title: 'Which winter creature walks beside you?',
    // Add art for a creature as art: 'art/c-owl.jpg' and it becomes the wallpaper.
    results: [
      { name: 'A snowy owl', line: 'Quiet and watchful, with a secret laugh only the lucky get to hear.', art: 'art/c-owl.jpg' },
      { name: 'A polar bear', line: 'Calm and strong, happiest when everyone you love is close by.', art: 'art/c-bear.jpg' },
      { name: 'A red fox', line: 'Quick and curious, always halfway into the next adventure.', art: 'art/c-fox.jpg' },
      { name: 'A reindeer', line: 'Steady and loyal, the one everybody follows home.', art: 'art/c-reindeer.jpg' },
      { name: 'A St. Bernard', line: 'Big-hearted, and first through the snow when someone needs you.', art: 'art/c-bernard.jpg' },
      { name: 'A snow hare', line: 'Light on your feet, and always wherever the fun is.', art: 'art/c-hare.jpg' }
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
    blurb: "High on a snowy peak The Hermit lifts a lantern with a star caught inside it. He has learned that one small light, held steady, can guide a whole valley home. In New Mexico on winter nights, people set candles glowing in paper bags along every wall and rooftop for the same reason. Tonight, light your own luminaria and watch our wall grow brighter as each friend adds hers.",
    cta: 'Light your luminaria', circle: 'Our wall of luminarias', noun: 'luminaria' },

  { name: 'The Hanged Man', keys: ['Stillness', 'Memories'], type: 'question',
    blurb: "The Hanged Man hangs by one foot from a living tree, a halo of light around his head and the most peaceful look on his face. He has discovered that when you turn the world upside down, hidden things fall out of its pockets. Look back on your year that way. Find the best moment of it and write it down. It will become a star in the sky we are filling together.",
    cta: 'Add your star', circle: 'A sky of best moments', noun: 'answer', view: 'sky',
    question: 'What was the brightest moment of your year? ✨', placeholder: 'The one I keep returning to…' },

  { name: 'The Emperor', keys: ['Order', 'Secrets'], type: 'lies',
    blurb: "The Emperor sits upon a throne of stone, and the mountains themselves seem to stand in line behind him. Nothing gets past him. He can tell a true thing from a tall tale at a hundred paces, and he knows that the best stories are the ones that might just be true. Today, tell us three things about yourself, two of them true and one invented. Then see who in the Circle can spot the lie.",
    cta: 'Tell your three', circle: 'Two truths and a lie', noun: 'three', countAs: 'friend',
    question: 'Three things about you. Two are true, and one is not. 🤫',
    placeholders: ['I once…', 'Every December I…', 'I have never…'] },

  { name: 'The Star', keys: ['Hope', 'Wishes'], type: 'word', view: 'stamps',
    blurb: "When the long night is at its darkest The Star appears: one great light and seven small ones, and a woman pouring water back to the earth beneath them. She is hope itself, the quiet certainty that good things are on their way. Tonight is the longest night of the year and so the best one for wishing. Choose one word for the year ahead, set it on a stamp of your own design and send it into the future.",
    cta: 'Make your stamp', circle: 'Stamps for next year', noun: 'stamp',
    question: 'One word to carry into next year', placeholder: 'One word',
    // Stamp backgrounds friends can pick. The six names are built-in finishes.
    // To add a picture, put the file in art/stamps/ and list it here, e.g. 'art/stamps/pine.jpg'.
    stamps: ['art/stamps/husky.jpg', 'art/stamps/retriever.jpg', 'art/stamps/bernard.jpg', 'art/stamps/poodle.jpg', 'art/stamps/corgi.jpg', 'art/stamps/aussie.jpg'] },

  { name: 'Three of Cups', keys: ['Friendship', 'Feasts'], type: 'recipe',
    blurb: "Three friends lift their cups in a garden heavy with harvest, and for a moment nothing else in the world is needed. The Three of Cups is the card of friendship and of joy that grows when it is shared. A meal made with love is a small celebration. Tonight I'm sharing the soup I make from the ham bone after a big dinner. It looks underwhelming in the pot, and then it revives you from a hangover, a sugar overload, or a week of too much everything. Save the bone from your Christmas ham and make it the day after.",
    cta: 'Open the recipe',
    recipe: { title: 'Ham Bone Soup', makes: 'Serves 6 to 8', time: 'About 1¾ hours',
      intro: "The humble pot that fixes the day after. Smoky, brothy and full of greens and beans, it tastes like far more than it looks. Make it with the bone from your Christmas ham. From Melissa Clark at NYT Cooking.",
      need: ['4 strips thick-cut bacon, sliced into ½-inch pieces 🥓', '3 large carrots, peeled and sliced 🥕', '2 celery stalks, trimmed and sliced 🌱', '1 large onion, peeled and diced 🧅', '3 garlic cloves, finely chopped 🧄', '1 ham bone (about 1¼ pounds), cut in half or thirds 🍖', '1 bay leaf 🍃', '2½ teaspoons salt, plus more to taste 🧂', '½ head green cabbage, shredded (about 8 cups) 🥬', '3 cups cooked beans (cannellini, navy or pinto), rinsed if canned 🫘', '1 small bunch kale, ribs removed, leaves chopped (about 6 cups) 🥗', 'Black pepper, to taste 🌶️', 'Hot sauce or apple cider vinegar, to finish 🍶'],
      steps: ['Heat a large pot over medium-high heat. Add **4 strips thick-cut bacon**, sliced, and cook until crisp, 5 to 7 minutes. Remove with a slotted spoon to a paper towel-lined plate.', 'Add **3 carrots**, **2 celery stalks** and **1 onion** to the pot and stir until softened, about 5 minutes. Add **3 garlic cloves** and cook 1 minute.', 'Drop in the **ham bone** and **1 bay leaf**. Cover with **8 cups water** and **2 teaspoons salt**. Bring to a boil over high heat, then reduce to medium-low and simmer for 20 minutes.', 'Stir in **½ head cabbage**, shredded, and simmer 30 minutes. Add **3 cups beans** and simmer 15 minutes more.', 'Stir in **1 bunch kale** and simmer until soft but still vibrantly green, about 15 minutes.', 'Season with the remaining **½ teaspoon salt**, or more to taste. Add lots of **black pepper** and a dash of **hot sauce or vinegar**. Serve with the crumbled bacon on top.'],
      tip: "Ask the butcher to cut the bone for you, and don't skip the splash of vinegar or hot sauce at the end. It wakes the whole pot up." } },

  { name: 'Page of Cups', keys: ['Tenderness', 'Whispers'], type: 'kind',
    blurb: "The Page of Cups stands by the sea, and to his great delight a little fish has popped out of his cup to say hello. He is the messenger of the heart, bringing tender news and unexpected sweetness. Kind words are a spell anyone can cast. Think of someone you love and write one true and kind sentence about them. Then send it to them. This one stays between the two of you.",
    cta: 'Write your sentence',
    question: 'Think of someone you love. Write one kind, true sentence about them, and then send it to them yourself. 💛' },

  { name: 'The World', keys: ['Wholeness', 'Homecoming'], type: 'finale',
    blurb: "And so we come to The World: a dancer in a wreath of evergreen, turning at the center of everything, the journey complete. The Fool who set out on the first of December has arrived, and so have you. Every ending holds its own beginning. Inside this last card is a letter from me, the three good things you wrote down on the seventh, and a card for all of us to sign together.",
    cta: 'Open the last card', circle: 'Our group card', noun: 'line',
    letter: ["Dear {name},", "The last card has turned, and I have a confession: I never expected it to be this much fun. You showed up, you answered, you lit your luminaria and added your star, and you made this little corner of December feel like a room full of friends.", "I started this because I wanted a way to tell the people I love that I was thinking of them, every day, for a whole month. What I didn’t expect was how much you would give back. I have read every answer, and I’ve saved more of them than you know.", "Below are the three good things you wrote down on the seventh. I hope they make you smile, and I hope next year hands you thirty more.", "Sign our card before you go. Then put your phone down, find your people, and have the merriest Christmas.", "With all my love, Macie"],
    question: 'Sign our group card ✍️', placeholder: 'Merry Christmas, with love from…' }
];
