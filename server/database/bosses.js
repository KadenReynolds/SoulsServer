const db = require('./client')

const createBoss = async ({name, description, boss_image, game_id, game_rank, overall_rank, lore, annoyance, difficulty, entertainment, level, appearence}) => {
  const ladela = await (lore + difficulty + entertainment + level + appearence) - annoyance
  try {
    const {rows:[boss]} = await db.query(`
      INSERT INTO bosses(
        name,
        description,
        boss_image,
        game_id,
        game_rank,
        overall_rank, 
        lore, 
        annoyance, 
        difficulty, 
        entertainment, 
        level, 
        appearence, 
        ladela )
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *`, [
        name,
        description,
        boss_image,
        game_id,
        game_rank,
        overall_rank, 
        lore, 
        annoyance, 
        difficulty, 
        entertainment, 
        level, 
        appearence, 
        ladela
      ]);
    return boss;
  } catch (err) {
    throw err;
  }
}

const getAllBosses = async() => {
  try {
    const {rows} = await db.query(`
      SELECT * FROM bosses
    `)
    return rows
  } catch (err) {
    throw err
  }
}

const getBossByBossID = async(bossID) => {
  try {
    const {rows : boss} = await db.query(`
      SELECT * FROM bosses
      WHERE boss_id=$1
    `,[bossID]) 
    return boss
  } catch (err) {
    throw err
  }
}

const getBossesByGameID = async(gameID) => {
  try {
    const {rows : boss} = await db.query(`
      SELECT * FROM bosses
      WHERE game_id=$1
    `,[gameID]) 
    return boss
  } catch (err) {
    throw err
  }
}

const getBossesAndGameNameByGameID = async(gameID) => {
  try {
    const {rows:[bossDesc]} = await db.query(`
      SELECT bosses.*, games.title
      FROM bosses, games
      WHERE bosses.game_id = $1 AND games.game_id = $1
      ORDER BY ladela DESC LIMIT 1;
    `,[gameID])
    const {rows:[bossAsc]} = await db.query(`
      SELECT bosses.*, games.title
      FROM bosses, games
      WHERE bosses.game_id = $1 AND games.game_id = $1
      ORDER BY ladela ASC LIMIT 1;
    `,[gameID])
    let boss = [bossAsc, bossDesc]  
    return boss
  } catch (err) {
    throw err
  }
}

const getBossesByGameIDInOrderOfLadela = async(gameID) => {
  try {
    const {rows : boss} = await db.query(`
      SELECT * FROM bosses
      WHERE game_id=$1
      ORDER BY ladela DESC
    `,[gameID]) 
    return boss
  } catch (err) {
    throw err
  }
}

const deleteBossByID = async(bossID) => {
  try {
    const {rows:boss} = await db.query(`
      DELETE FROM bosses
      WHERE boss_id = $1
      RETURNING *;
    `, [bossID])
    return boss
  } catch (err) {
    throw err
  }
}

async function updateBoss({bossID, ...fields}){
  try {
    const ladela = await (fields.lore + fields.difficulty + fields.entertainment + fields.level + fields.appearence) - fields.annoyance
    let boss;
      const {rows} = await db.query(`
        UPDATE bosses
        SET  
          name= $1, 
          description = $2, 
          boss_image = $3, 
          game_id = $4, 
          game_rank = $5, 
          overall_rank = $6,
          lore = $7,
          annoyance = $8,
          difficulty = $9,
          entertainment = $10,
          level = $11,
          appearence = $12,
          ladela = $13
        WHERE boss_id = $14
        RETURNING *;
      `, [fields.name, fields.description, fields.boss_image, fields.game_id, fields.game_rank, fields.overall_rank, fields.lore, fields.annoyance, fields.difficulty, fields.entertainment, fields.level, fields.appearence, ladela, bossID]);
      boss = rows[0];
      return boss;

  } catch (error) {
    throw error
  }
}

module.exports = {
  createBoss,
  getAllBosses,
  getBossesByGameID,
  deleteBossByID,
  getBossesByGameIDInOrderOfLadela,
  updateBoss,
  getBossByBossID,
  getBossesAndGameNameByGameID
}