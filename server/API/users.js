const express = require('express')
const usersRouter = express.Router();

const {
  createUser,
  getUser,
  getAllUsers,
} = require('../database');

const jwt = require('jsonwebtoken')

usersRouter.get('/', async (req, res, next) => {
  try {
      const users = await getAllUsers();

      res.send({
          users
      });
  } catch ({ name, message }) {
      next({ name, message })
  }
});

usersRouter.post('/', async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
      next({
          name: 'MissingCredentialsError',
          message: 'Please supply both an username and password'
      });
  
  }
  
      try {
          const user = await getUser({ username, password });
              if (user) {
                  const token = jwt.sign({
                      id: user.user_id,
                      username
                  }, process.env.JWT_SECRET);
      
                  res.send({
                      message: 'Login successful!',
                      token
                  });
              }
      
              else {
                  next({
                      name: 'IncorrectCredentialsError',
                      message: 'Username or password is incorrect'
                  });
              }
          } catch (err) {
              next(err);
          }
});

module.exports = usersRouter