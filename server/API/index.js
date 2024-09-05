const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const { getUserByUsername } = require('../database');
const { JWT_SECRET } = process.env;

const volleyball = require('volleyball')
apiRouter.use(volleyball)

apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) { // nothing to see here
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const parsedToken = jwt.verify(token, JWT_SECRET);
      const username = parsedToken && parsedToken.username

      if (username) {
        req.user = await getUserByUsername(username);
        next();
      }
    } catch (error) {
      next(error);
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`
    });
  }
});

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }
  next();
});

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const gamesRouter = require('./games');
apiRouter.use('/games', gamesRouter);

const bossesRouter = require('./bosses');
apiRouter.use('/bosses', bossesRouter);

apiRouter.use((err, req, res, next) => {
  res.status(500).send(err.message)
})

module.exports = apiRouter;