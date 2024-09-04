const db = require('./client')

const createGame = async ({name, description, build_played, game_image}) => {
  try {
    const {rows:[game]} = await db.query(`
      INSERT INTO games(
        name,
        description,
        build_played,
        game_image )
      VALUES($1, $2, $3, $4)
      RETURNING *`, [
        name,
        description,
        build_played,
        game_image
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

module.exports = {
  createGame,
  getAllGames,
  getGameByID,
  deleteGameByID
}