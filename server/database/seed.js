require('dotenv').config()
const db = require('./client');
const { createUser } = require('./users');
const { createGame } = require('./games')
const { createBoss } = require('./bosses')
const { passList } = require('./adminPass')


const users = [{
  user_id: 1,
  permissions: 'admin',
  username: process.env.ADMIN_USER,
  password: process.env.ADMIN_PASS
}]

const games = [{
  game_id: 1,
  name: "BloodBorne",
  description: "very fun game",
  build_played: "strength",
  game_image: "https://images2.alphacoders.com/916/thumbbig-916448.webp"
}]

const bosses = [{
  boss_id: 1,
  name: "Father Gascoigne",
  description: "This boss is sweet",
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
}]


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