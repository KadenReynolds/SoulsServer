const db = require('./client')

const createGame = async ({title, description, build_played, game_image, patch}) => {
  try {
    const {rows:[game]} = await db.query(`
      INSERT INTO games(
        title,
        description,
        build_played,
        game_image,
        patch )
      VALUES($1, $2, $3, $4, $5)
      RETURNING *`, [
        title,
        description,
        build_played,
        game_image,
        patch
      ]);
    return game;
  } catch (err) {
    throw err;
  }
}

const getAllGames = async() => {
  try {
    const {rows} = await db.query(`
      SELECT * FROM games;
    `)
    return rows
  } catch (err) {
    throw err
  }
}

const getGameByID = async(gameID) => {
  try {
    const {rows:game} = await db.query(`
      SELECT * FROM games
      WHERE game_id=$1;
    `, [gameID])
    return game
  } catch (err) {
    throw err
  }
}

const deleteGameByID = async(gameID) => {
  try {
    const {rows:game} = await db.query(`
      DELETE FROM games
      WHERE game_id = $1
      RETURNING *;
    `, [gameID])
    return game
  } catch (err) {
    throw err
  }
}

async function updateGames({gameID, ...fields}){
  try {
    let game;
      const {rows} = await db.query(`
        UPDATE games
        SET  
          title = $1, 
          description = $2, 
          build_played = $3, 
          game_image = $4,
          patch = $5
        WHERE game_id = $6
        RETURNING *;
      `, [fields.title, fields.description, fields.build_played, fields.game_image, fields.patch, gameID]);
      game = rows[0];
      return game;

  } catch (error) {
    throw error
  }
}

module.exports = {
  createGame,
  getAllGames,
  getGameByID,
  deleteGameByID,
  updateGames
}