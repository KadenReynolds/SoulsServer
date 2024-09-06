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
  name: "BloodBorne",
  description: "very fun game",
  build_played: "strength",
  game_image: "https://images2.alphacoders.com/916/thumbbig-916448.webp"
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
  },
  {
    boss_id: 2,
    name: "Vicar Amelia",
    description: "",
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
  },
  {
    boss_id: 6,
    name: "Rom, the Vacuous Spider",
    description: "",
    boss_image: "https://static.wikia.nocookie.net/bloodborne/images/6/6e/Bloodborne%E2%84%A2_20150607233042_-_1.jpg/revision/latest?cb=20151013161836",
    game_id: 1,
    game_rank: 0,
    overall_rank: 0,
    lore: 5,
    annoyance: 5,
    difficulty: 3, 
    entertainment: 1, 
    level: 5,
    appearence: 3,
  },
  {
    boss_id: 7,
    name: "The Witches of Hemwick",
    description: "The Witches of Hemwick are not a very good boss in any aspect. By far the coolest thing about them is their appearance as they wear the eyes of their victims along their garbs which is just disgustingly cool. That's really all there is good to say about this boss. Their lore is disappointing as taking one look at their appearance, and their grab attack, tells you their purpose. They are super easy compared to everything else you've fought at this point, the only points they get for difficulty is from the Mad Ones they spawn if you at least one Insight and the grab attacks they can use to dig out your eyes if your not paying attention. They are really boring and the run back doesn't add to the fun in any way. However; the only annoyance they have is they are teleport spammers and even then they teleport in a select few locations making it easy to find them again. Also, once you kill one of the witches the other can respawn the dead witch if you don't kill them both quick enough, although; you will almost always kill the last witch quick enough this doesn't happen. Just a poor quality boss all around.",
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
  },
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
        name varchar(64),
        description text,
        build_played varchar(64),
        game_image text
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
        name: game.name,
        description: game.description,
        build_played: game.build_played,
        game_image: game.game_image
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