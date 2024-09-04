module.exports = {
  ...require('./client'), // adds key/values from client.js
  ...require('./users'), // adds key/values from users.js
  ...require('./games'), // adds key/values from games.js
  ...require('./bosses'), //adds key/values from bosses/js
}