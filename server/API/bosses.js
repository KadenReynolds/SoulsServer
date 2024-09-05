const express = require('express')
const bossesRouter = express.Router();

const {
  createBoss,
  getAllBosses,
  getBossesByGameID,
  deleteBossByID,
  getBossesByGameIDInOrderOfLadela
} = require('../database')

const {requireAdmin} = require('./utils')

bossesRouter.get('/', async (req, res, next) => {
  try {
      const bosses = await getAllBosses();

      res.send({
          bosses
      });
  } catch ({ name, message }) {
      next({ name, message })
  }
});

bossesRouter.post('/', requireAdmin, async (req, res, next) => {
  const {name,
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
    appearence} = req.body
  const bossData = {}
  try {
    bossData.name = name
    bossData.description = description
    bossData.boss_image = boss_image
    bossData.game_id = game_id
    bossData.game_rank = game_rank
    bossData.overall_rank = overall_rank
    bossData.lore = lore
    bossData.annoyance = annoyance
    bossData.difficulty = difficulty
    bossData.entertainment = entertainment
    bossData.level = level
    bossData.appearence = appearence

    const newBoss = await createBoss({
      name: bossData.name,
      description: bossData.description,
      boss_image: bossData.boss_image,
      game_id: bossData.game_id,
      game_rank: bossData.game_rank,
      overall_rank: bossData.overall_rank,
      lore: bossData.lore,
      annoyance: bossData.annoyance,
      difficulty: bossData.difficulty, 
      entertainment: bossData.entertainment, 
      level: bossData.level,
      appearence: bossData.appearence
    })
    res.send(newBoss)
  } catch ({name, message}) {
    next({name, message})
  }
})

bossesRouter.delete('/:bossID', requireAdmin, async (req, res, next) => {

  try {
    const boss = await deleteBossByID(req.params.bossID)
    res.send(boss)
  } catch ({name, message}) {
    next({name, message})
  }

})

bossesRouter.get('/:gameID', async (req, res, next) => {
  try {
    const bosses = await getBossesByGameID(req.params.gameID)
    res.send({
      bosses
    })
  } catch ({name, message}) {
    next({name, message})
  }
})

bossesRouter.get('/:gameID/ladela', async (req, res, next) => {
  try {
    const bosses = await getBossesByGameIDInOrderOfLadela(req.params.gameID)
    res.send({
      bosses
    })
  } catch ({name, message}) {
    next({name, message})
  }
})

module.exports = bossesRouter