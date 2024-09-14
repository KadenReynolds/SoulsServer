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

const games = [{
  game_id: 1,
  title: "BloodBorne",
  description: "very fun game",
  build_played: "strength",
  game_image: "https://images2.alphacoders.com/916/thumbbig-916448.webp",
  patch: "V1.09"
}]

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
    description: "",
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
    description: "",
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
    description: "Magic Potato",
    boss_image: "data:image/jpeg;base64,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",
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
    description: "",
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
    description: "",
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
    description: "",
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
    description: "",
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
    description: "",
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
    description: "",
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
    description: "",
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
    description: "",
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
    description: "",
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
    description: "",
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
    description: "",
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
    description: "",
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