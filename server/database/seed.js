require('dotenv').config()
const db = require('./client');
const { createUser } = require('./users');
const { createGame } = require('./games')
const { createBoss } = require('./bosses')
const { passList } = require('./adminPass')


const users = [
  {
    user_id: 1,
    permissions: 'admin',
    username: process.env.ADMIN_USER,
    password: process.env.ADMIN_PASS
  },
  {
    user_id: 2,
    permissions: 'admin',
    username: process.env.ADMIN_USER2,
    password: process.env.ADMIN_PASS2
  }
]

const games = [
  {
    game_id: 1,
    title: "BloodBorne",
    description: "Bloodborne is an action RPG set in the gothic, nightmarish city of Yharnam, plagued by a mysterious blood-borne disease. Players assume the role of the Hunter, a customizable character tasked with uncovering the city’s dark secrets while battling grotesque creatures and formidable foes. The game features fast-paced combat, a hauntingly atmospheric world, and deep lore inspired by cosmic horror. With its challenging gameplay and intricate level design, Bloodborne immerses players in a relentless, eerie journey of survival and discovery.",
    build_played: "Skill w/ Blades of Mercy, Strength/Arcane w/ HMG",
    game_image: "https://images2.alphacoders.com/916/thumbbig-916448.webp",
    patch: "V1.09"
  },
  {
    game_id: 2,
    title: "Dark Souls Remastered",
    description: "wassup",
    build_played: "dex",
    game_image: "https://wallpaperaccess.com/full/3900272.jpg",
    patch: "V1.03"
  }
]

const bosses = [
  {
    boss_id: 1,
    name: "Father Gascoigne",
    description: "Gascoigne is one of the best tutorial bosses in the entire series. Yes, he may not be the intended first boss but he can be if you proceed that way, couple that with the fact that he teaches you basic mechanics of bloodborne such as parry's, the rally system, boss phases and so much more he is the type of boss that requires you to learn how to play the game as intended and he is amazing at it. His lore is immaculate, his phase transitions show off the effects the blood has on the Yharnhamites and the hunters of the church. He also has a slue of NPC's around his arena that are tied to his lore including his wife (that he killed in a bloody rage) and his daughter that supplies the player with the Music Box that is used to subdue Gascoigne when he is in beast phase by playing his favorite song. The only gripes I have about this boss is the tombstones in his arena that you cannot destroy, leading to many deaths caused by getting cornered against one. Overall Gascoigne is a boss that gets me excited to replay BloodBorne everytime.",
    boss_image: "https://wallpaperaccess.com/full/6343935.jpg",
    game_id: 1,
    game_rank: 0,
    overall_rank: 0,
    lore: 8,
    annoyance: 3,
    difficulty: 4,
    entertainment: 5,
    level: 5,
    appearence: 6,
    ladela: 25
},
{
    boss_id: 3,
    name: "Cleric Beast",
    description: "The Cleric Beast is the first boss in BloodBorne, you walk down this empty bridge looking out at what you find out later is the Cathedral Ward and all of a sudden, this tall hairy beast jumps over the wall in front of you and surprises you with a scream you can only describe as eerie. Not to mention this scream is the same one you hear while climbing the ladder right outside of Iosefka's Clinic at the very start of the game. This boss does a good job of getting you ready to fight the hideous beasts BloodBorne provides so plentily. Cleric Beasts lore is pretty straight forward he is a Cleric that went blood crazy turning him into this beast, however; he becomes indirect foreshadowing of one the most important characters in the game so that's pretty cool. Gameplay wise this boss is super simple, just repeat a cycle of hitting and circling the beast, serrated damage gives a huge beast. Because of the cleric beasts size however, he has the old FromSoftware special of getting staggered every time he takes a step back. His run back allows for easy refilling of blood-vials and quicksilver bullets to keep you stocked up. If you need an extra edge just shoot him in the head twice when first entering the arena, this allows you to repost him for good damage.",
    boss_image: "https://wallpaperaccess.com/full/6343732.png",
    game_id: 1,
    game_rank: 0,
    overall_rank: 0,
    lore: 5,
    annoyance: 1,
    difficulty: 2,
    entertainment: 3,
    level: 7,
    appearence: 4,
    ladela: 20
},
{
    boss_id: 5,
    name: "Blood-Starved Beast",
    description: "extremely weak to fire and serrated weapons but even with this weakness an unprepared hunter would be overwhelmed by its hard-hitting attacks, but this can easily be avoided by the use blood cocktails.",
    boss_image: "https://wallpaperaccess.com/full/4439540.jpg",
    game_id: 1,
    game_rank: 0,
    overall_rank: 0,
    lore: 3,
    annoyance: 3,
    difficulty: 4,
    entertainment: 2,
    level: 3,
    appearence: 4,
    ladela: 13
},
{
    boss_id: 7,
    name: "The Witches of Hemwick",
    description: "The Witches of Hemwick are not a very good boss in any aspect. By far the coolest thing about them is their appearance as they wear the eyes of their victims along their garbs which is just disgustingly cool. That's really all there is good to say about this boss. Their lore is disappointing as taking one look at their appearance, and their grab attack, tells you their purpose. They are super easy compared to everything else you've fought at this point, the only points they get for difficulty is from the Mad Ones they spawn if you at least one Insight and the grab attacks they can use to dig out your eyes if your not paying attention. They are really boring and the run back doesn't add to the fun in any way. However; the only annoyance they have is they are teleport spammers and even then they teleport in a select few locations making it easy to find them again. Also, once you kill one of the witches the other can respawn the dead witch if you don't kill them both quick enough, although; you will almost always kill the last witch quick enough this doesn't happen. They are also the most common boss turned enemy which docs appearance for uniqueness purposes. Just a poor quality boss all around.",
    boss_image: "https://wallpaperaccess.com/full/6343777.jpg",
    game_id: 1,
    game_rank: 0,
    overall_rank: 0,
    lore: 1,
    annoyance: 1,
    difficulty: 2,
    entertainment: 2,
    level: 3,
    appearence: 4,
    ladela: 11
},
{
    boss_id: 10,
    name: "Martyr Logarius",
    description: "You just get done wandering through one of the best areas Bloodbornes main game has to offer, you walk up these snow-filled steps, and see a body laying in a chair on a slanted roof. Inching closer the corpse begins to move shaking off what seems to be a decades amount of ice, his bones crack back into place as he stands up and starts walking towards you, what is at first a limp becomes a full fledge walk by the end, with the sound of bells ringing in your ears while the cold wind blows, this is Martyr Logarius. The leader of the Executioners tasked with killing all of the Vilebloods of Cainhurst Castle. The martyrs first phase is all about magic, he can summon a slashing wave of skeleton heads that you must dodge through, an AOE that can either be immediate or delayed by his second swing, and even a spinning saw of bloody heads with low tracking. Getting him to second phase sees Logarius use his scythe and off-hand sword a lot more, allowing for parry and backstab opportunities, he can shove his sword into the ground creating an seemingly endless barrage of swords flying at your character. This sword summons length, mixed with the slanted roof messing with AI is the only two annoyances about this fight. Once defeated Logarius will drop his Crown of Illusions, dawning it and walking to his chair will reveal what he was hiding, a tower housing the last of the Vilebloods, the immortal Queen Annalise. It's not known whether Logarius was trying to keep her hidden to trap her, allowing for time to present a way to end her life, or if he was protecting the thing he swore so solemnly to destroy. It is all left up to speculation although as we find through Alfred's questline it wouldn't have done much good to kill her as she can be resurrected from the Altar of Despair.",
    boss_image: "https://miro.medium.com/v2/resize:fit:1140/1*Y2gtgqgdRG97dYyE6C3IAw@2x.jpeg",
    game_id: 1,
    game_rank: 0,
    overall_rank: 0,
    lore: 7,
    annoyance: 2,
    difficulty: 5,
    entertainment: 7,
    level: 8,
    appearence: 6,
    ladela: 31
},
{
    boss_id: 6,
    name: "Rom, the Vacuous Spider",
    description: "summons many spiders that try to surround you so that rom can shoot her magic at you",
    boss_image: "https://www.bogleech.com/souls/bb-rombabies.png",
    game_id: 1,
    game_rank: 0,
    overall_rank: 0,
    lore: 5,
    annoyance: 5,
    difficulty: 3,
    entertainment: 1,
    level: 5,
    appearence: 3,
    ladela: 12
},
{
    boss_id: 2,
    name: "Vicar Amelia",
    description: "Vicar Amelia is a large beast boss that has an expansive lore with the healing church. Her boss fight starts with a cutscene in which she changes from the shape of an unassuming woman into a gigantic beast that towers over the player. But even with her intimidating size she, like most beast enemies; is extremely weak to fire and serrated weapons but even with this weakness an unprepared hunter would be overwhelmed by her hard-hitting attacks and her healing aura which can only be stopped by the use of a numbing mist.",
    boss_image: "https://wallpaperaccess.com/full/6343977.jpg",
    game_id: 1,
    game_rank: 0,
    overall_rank: 0,
    lore: 6,
    annoyance: 2,
    difficulty: 4,
    entertainment: 5,
    level: 4,
    appearence: 5,
    ladela: 22
},
{
    boss_id: 8,
    name: "Lady Maria of the Astral Clocktower",
    description: "filler description. fast fire and blood attacks easy to parry",
    boss_image: "https://wallpaperaccess.com/full/7083819.jpg",
    game_id: 1,
    game_rank: 0,
    overall_rank: 0,
    lore: 8,
    annoyance: 1,
    difficulty: 7,
    entertainment: 8,
    level: 6,
    appearence: 7,
    ladela: 35
},
{
    boss_id: 12,
    name: "Laurence, the First Vicar",
    description: "Laurence, the First Vicar, yes that Laurence, is one of the final bosses in Bloodbornes DLC. He is one of, if not the most important character in the story of Bloodborne. He started the healing church and used blood ministration research to fuel his take of the best way to achieve human ascension into Great Ones (and 'may' have poisoned the citizens of Old Yharnam in the process). He is even seen in cutscenes (namely the one where he betrays Willem after beating Vicar Amelia) and spoken about in multiple item descriptions and dialogue. He is so important to the story, making it all the more disappointing that his boss fight is so terrible. He looks exactly like the Cleric Beast (which is lore accurate) with a molten lava core, a curse laid upon him curtesy of Kos. His move set in the first phase is also the exact same, albeit fire AOE's following most moves and a few unique attacks, which is fine but why does every attack seem to one shot a character with an almost egregious levels of HP, and the best fire resistant gear in the game. He is the definition of difficulty done wrong. In second phase he does become unique by falling and breaking his legs off, spewing lava from his molten core while crawling on the ground. This is cool, but then the rest of the fight becomes a battle of sticking to his sides, too far behind him results in getting staggered by his lava pour, and being in front of him results in long swipes, moving combos, and a lava spew that will most likely make you overcorrect your dodge, and either get hit or end up behind him in his lava. The best way to describe Laurence is... great character, terrible boss.",
    boss_image: "https://cogconnected.com/wp-content/uploads/2016/01/laurence-1.jpg",
    game_id: 1,
    game_rank: 0,
    overall_rank: 0,
    lore: 10,
    annoyance: 3,
    difficulty: 4,
    entertainment: 4,
    level: 2,
    appearence: 4,
    ladela: 21
},
{
    boss_id: 18,
    name: "Amygdala",
    description: "Entering the Nightmare Frontier allows you to finally fight one of the tower hanging Amygdala's you've most likely seen getting to this point. This one jumps from a tower (typical) slamming down near you and uses long range swipes and slam attacks that can easily be dodged allowing for punishment on either its head or arms. Eventually, he will gain AOE's at the end of his arms during attacks requiring more precise timing to punish him. In third phase he will gain even more range by ripping off two of his arms, and while this would make fighting him head on a lot more challenging, you can stand in front of his groin triggering his jump attack, which can be easily dodged allowing for punishment on his head with minimal worries. This boss fight is most likely very easy at this point in the game, however; just as a note, the version in the Defiled Chalice is the sole reason I never want to go through the dungeons again.",
    boss_image: "https://i.pinimg.com/736x/fb/a6/24/fba624965ffb33113a24f809d82bdad7.jpg",
    game_id: 1,
    game_rank: 0,
    overall_rank: 0,
    lore: 3,
    annoyance: 1,
    difficulty: 3,
    entertainment: 6,
    level: 4,
    appearence: 5,
    ladela: 20
},
{
    boss_id: 11,
    name: "Ebrietas, Daughter of the Cosmos",
    description: "filler description. physical slam and long-range magic.",
    boss_image: "https://wallpaperaccess.com/full/6343791.jpg",
    game_id: 1,
    game_rank: 0,
    overall_rank: 0,
    lore: 8,
    annoyance: 3,
    difficulty: 7,
    entertainment: 5,
    level: 5,
    appearence: 8,
    ladela: 30
},
{
    boss_id: 14,
    name: "Mergo's Wet Nurse",
    description: "Mergo's Wet Nurse is presumably a Great One tasked with mothering Mergo, it swoops down as you approach the invisible child covering it with it's wings. If you didn't know until now Bloodbornes main task given to the player by Gehrman/Moon Presence is to kill a Great Ones child. The Wet Nurse has multiple arms used for attacks that vary from outward slashes, to jump attacks, to multi hit combos, the fight feels almost like a horrific dance of some kind. Eventually it will release an AOE that if connects, will start a mini phase of clone summoning attacks from Mergo's Wet Nurse. This attack can actually be dodged with precise timing, rendering the phase useless. The main complaints of this fight, is how anti-climatic it can be, being very easy for it's place in the game, however; it can still pose a challenge if your timing isn't correct, Also, this technically can be the final boss of the game and it just doesn't feel like a rewarding boss in that regard, making the game bittersweet if you choose this ending. ",
    boss_image: "https://wallpaperaccess.com/full/6343963.jpg",
    game_id: 1,
    game_rank: 0,
    overall_rank: 0,
    lore: 4,
    annoyance: 3,
    difficulty: 5,
    entertainment: 6,
    level: 4,
    appearence: 8,
    ladela: 24
},
{
    boss_id: 15,
    name: "Micolash, Host of the Nightmare",
    description: "After running through most of the Nightmare of Mensis, you will come across Micolash, spewing something to Kos and saying how 'no one can stop' what he calls a 'dream'. Micolash is an interesting enough character using the hosting abilities of the nightmare, granting him audience with the Great Ones, which he believes will lead to human ascension. His boss fight is not as interesting, first phase he will run around a mini-level requiring you to chase him to move him to the next point, eventually, and I mean eventually; he will run into the first boss area where he is joined by two marionettes, he will spam the Augur of Ebrietas move, which can easily be dodged resulting in major punishment if your stamina/positioning allows for it. After reaching half health he will disappear and start saying how, a hunter is a hunter, even in a dream. Which leads to an even longer chase scene, that will finally result in a one-on-one fight. It is best to stick close to Micolash as at medium or long range he will spam A Call Beyond, which can decimate your health. Altogether Micolash is one of the worst and most annoying bosses in Bloodborne.",
    boss_image: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/06/bloodborne-micolash-1.jpg",
    game_id: 1,
    game_rank: 0,
    overall_rank: 0,
    lore: 7,
    annoyance: 6,
    difficulty: 4,
    entertainment: 3,
    level: 5,
    appearence: 1,
    ladela: 14
},
{
    boss_id: 17,
    name: "Ludwig, the Accursed",
    description: "Ludwig is a boss that needs no introduction. He is so notable that even people that have never played Bloodborne still know of his existence; and it is not hard to see why, with him wielding the poster sword of the franchise, his beautiful transformation, and with the intensity his music leaving you questioning if you could truly overcome such a colossal foe. Making for a boss that even when you are fully prepared you can still be easily defeated by not being careful. Even when you think you have got the hang of him he ends his fight with him regaining what is left of his humanity transforming with new attacks and abilities that are in stark contrast to his previous faze. Just so he could achieve an honorable death not as a beast but as a hunter.",
    boss_image: "https://wallpaperaccess.com/full/3112382.jpg",
    game_id: 1,
    game_rank: 0,
    overall_rank: 0,
    lore: 10,
    annoyance: 1,
    difficulty: 8,
    entertainment: 10,
    level: 8,
    appearence: 10,
    ladela: 45
},
{
    boss_id: 13,
    name: "Orphan of Kos",
    description: "Orphan is the (intended) final boss of the Old Hunters DLC, and he certainly feels as such. You walk onto this desolate beach with nothing but ocean and a cadaver in front of you, the corpse of Kos. All of a sudden, this horrifying creature starts clawing its way out of its mothers decaying carcass, covered in guts and clutching his own placenta with a death grip. He stands up, stares off at the moon with Yarhnam in it's reflection and starts weeping as the screen fades to black. Orphan is probably the most aggressive boss in Bloodborne, not giving you a second to breathe for a lot of the fight, this is combatted by the fact if you can dodge through his hits you have plenty of time to heal, punish, or even go for a backstab opportunity, he is screaming in agony as the fight continues. Eventually he will enter second phase gaining a lighting summon, and holding his placenta weapon more as a axe then a sweeping flail. This fight represents Bloodborne perfectly, undertones of agony and pain swallowed up through pure aggressiveness. Orphan is one of the few bosses I am almost glad to die to, to be able to witness his glory all over again before ending my playthrough.",
    boss_image: "https://steamuserimages-a.akamaihd.net/ugc/921419279565084383/B80714609469DA571ED6F573E912DF88BC8A2362/?imw=1024&imh=576&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
    game_id: 1,
    game_rank: 0,
    overall_rank: 0,
    lore: 7,
    annoyance: 1,
    difficulty: 9,
    entertainment: 10,
    level: 7,
    appearence: 7,
    ladela: 39
},
{
    boss_id: 16,
    name: "Darkbeast Paarl",
    description: "filler description. electric dog that's limbs that you can use to chain breaks to keep him down.",
    boss_image: "https://wallpaperaccess.com/full/3112400.jpg",
    game_id: 1,
    game_rank: 0,
    overall_rank: 0,
    lore: 3,
    annoyance: 0,
    difficulty: 3,
    entertainment: 3,
    level: 5,
    appearence: 6,
    ladela: 20
},
{
    boss_id: 19,
    name: "Living Failures",
    description: "filler description. many failed experiments that hit you for physical slam and long-range magic in which they summon magic meteors from the stars.",
    boss_image: "https://th.bing.com/th/id/OIP.d8th7RPgeKP-KdcQYGTkNgHaEK?w=328&h=184&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    game_id: 1,
    game_rank: 0,
    overall_rank: 0,
    lore: 3,
    annoyance: 1,
    difficulty: 3,
    entertainment: 6,
    level: 5,
    appearence: 3,
    ladela: 19
},
{
    boss_id: 4,
    name: "Shadow(s) of Yharnam",
    description: "The Shadows were followers of Queen Yharnam, who found themselves out of the chalice and walking on the surface of the Forbidden Woods, they were infected with the snake parasite of the woods, however; instead of succumbing to it as all the other enemies in this area have they were able to control it and use it to their benefit. This is good lore so why is their score so low? Well a lot of this lore is represented more by the area they reside in not the Shadows themselves (hence the high level score), the chalices obviously have some connection with the woods, and the area leading up to them makes it more interesting that they were able to use the snake parasite in they way they did. They are a decently fun fight and the difficult completely banks on your ability to parry and crowd control. There's nothing particularly obnoxious about this fight, it just doesn't do anything special. On top of that, they become basic enemies much later in the game which docs points because they aren't really unique.",
    boss_image: "https://wallpaperaccess.com/full/6343907.jpg",
    game_id: 1,
    game_rank: 0,
    overall_rank: 0,
    lore: 3,
    annoyance: 0,
    difficulty: 4,
    entertainment: 4,
    level: 6,
    appearence: 2,
    ladela: 19
},
{
    boss_id: 20,
    name: "Celestial Emissary",
    description: "You have probably seen one of these blue alien-like creatures in your travels before this fight. Just in case you haven't there is, a well placed, one in front of the boss arena allowing you to learn their moves, that is, if you even need to. You will hack away at the Celestials until you notice one hides in the back and doesn't have a health bar when locking on, this is the boss. Getting this Celestial to half health with have it phase transition by getting much bigger, and sprouting tentacles from its head, it can then perform magic attacks as well as long sweeps with it's arms, altogether this boss fight is very mediocre and nothing compared to what follows right after it.",
    boss_image: "https://www.beesmygod.com/wp-content/uploads/2023/09/Bloodborne_E2_84_A2_20150513222725.png",
    game_id: 1,
    game_rank: 0,
    overall_rank: 0,
    lore: 4,
    annoyance: 1,
    difficulty: 2,
    entertainment: 3,
    level: 3,
    appearence: 4,
    ladela: 15
},
  {
    boss_id: 21,
    name: "The One Reborn",
    description: "filler description. he has minions that cast spells at you during the fight but they can by easily delt with if killed first. he has a lot of limbs that you can use to chain breaks to keep him down. he also has a lot of magic attacks that deal massive damage and are hard to avoid. he is also mega resistant to magic/arcane damage.",
    boss_image: "https://wallpaperaccess.com/full/6343755.jpg",
    game_id: 1,
    game_rank: 0,
    overall_rank: 0,
    lore: 4,
    annoyance: 2,
    difficulty: 4,
    entertainment: 4,
    level: 5,
    appearence: 7,
    ladela: 22
  }
]


const dropTables = async () => {
  try {
    console.log("Dropping Tables...")
    await db.query(`
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS bosses;
      DROP TABLE IF EXISTS games;
      DROP TYPE IF EXISTS permission;
      `)
  } catch (err) {
    throw err;
  }
}

const createTables = async () => {
  try {
    console.log("Creating Tables...")
    await db.query(`
      CREATE TYPE permission AS ENUM ('guest', 'admin');

      CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        permissions permission,
        username varchar(255),
        password varchar(255)
      );

      CREATE TABLE games (
        game_id SERIAL PRIMARY KEY,
        title varchar(64),
        description text,
        build_played varchar(64),
        game_image text,
        patch varchar(20)
      );

      CREATE TABLE bosses (
        boss_id SERIAL PRIMARY KEY,
        name varchar(64),
        description text,
        boss_image text,
        game_id integer,
        game_rank integer,
        overall_rank integer,
        lore integer,
        annoyance integer,
        difficulty integer, 
        entertainment integer, 
        level integer,
        appearence integer,
        ladela integer
      );

      ALTER TABLE bosses
      ADD FOREIGN KEY ("game_id")
      REFERENCES games ("game_id");

      `)
  } catch (err) {
    throw err
  }
}

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({
        user_id: user.user_id,
        permissions: user.permissions,
        username: user.username,
        password: user.password
      });
    }
    console.log('Seed User data inserted successfully.');
  } catch (err) {
    console.error('Could not seed User Data', err)
  }
}

const insertGames = async () => {
  try {
    for (const game of games) {
      await createGame({
        game_id: game.game_id,
        title: game.title,
        description: game.description,
        build_played: game.build_played,
        game_image: game.game_image,
        patch: game.patch
      });
    }
    console.log('Seed Game data inserted successfully.');
  } catch (err) {
    console.error('Could not seed Game Data', err)
  }
}

const insertBosses = async () => {
  try {
    for (const boss of bosses) {
      await createBoss({
        boss_id: boss.boss_id,
        name: boss.name,
        description: boss.description,
        boss_image: boss.boss_image,
        game_id: boss.game_id,
        game_rank: boss.game_rank,
        overall_rank: boss.overall_rank, 
        lore: boss.lore, 
        annoyance: boss.annoyance, 
        difficulty: boss.difficulty, 
        entertainment: boss.entertainment, 
        level: boss.level, 
        appearence: boss.appearence, 
        ladela: boss.ladela
      });
    }
    console.log('Seed Boss data inserted successfully.');
  } catch (err) {
    console.error('Could not seed Boss Data', err)
  }
}

const seedDatabase = async() => {
  try {
    db.connect();
    await dropTables();
    await createTables();
    await insertUsers();
    await insertGames();
    await insertBosses();
  } 
  catch (err) {
    throw err
  }
  finally {
    db.end();
  }
}

seedDatabase();