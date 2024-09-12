const express = require('express')
const gamesRouter = express.Router();

const {
  createGame,
  getAllGames,
  getGameByID,
  deleteGameByID,
  updateGames
} = require('../database')

const {requireAdmin} = require('./utils')

gamesRouter.get('/', async (req, res, next) => {
  try {
      const games = await getAllGames();

      res.send({
          games
      });
  } catch ({ name, message }) {
      next({ name, message })
  }
});

gamesRouter.post('/', requireAdmin, async (req, res, next) => {
  const {title, description, build_played, game_image} = req.body
  const gameData = {}
  try {
    gameData.title = title
    gameData.description = description
    gameData.build_played = build_played
    gameData.game_image = game_image

    const newGame = await createGame({
      title: gameData.title,
      description: gameData.description,
      build_played: gameData.build_played,
      game_image: gameData.game_image
    })
    res.send(newGame)
  } catch ({name, message}) {
    next({name, message})
  }
})

gamesRouter.delete('/:gameID',requireAdmin, async (req, res, next) => {

  try {
    const game = await deleteGameByID(req.params.gameID)
    res.send(game)
  } catch ({name, message}) {
    next({name, message})
  }

})

gamesRouter.get('/:gameID', async (req, res, next) => {
  try {
    const game = await getGameByID(req.params.gameID)
    res.send({
      game
    })
  } catch ({name, message}) {
    next({name, message})
  }
})

gamesRouter.put('/:gameID', async (req, res, next) => {

  try { 
  const { title, description, build_played, game_image } = req.body

 const game = await updateGames({gameID:req.params.gameID,
    title,
    description,
    build_played,
    game_image,
  })


 res.send(game)
    
  } catch ({name, message}) {
    next({name, message})
  }

})

module.exports = gamesRouter