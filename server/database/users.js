const db = require('./client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const createUser = async ({
  permissions,
  username,
  password }) => {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const { rows:[user] } = await db.query(`
      INSERT INTO users(
          permissions,
          username,
          password )
      VALUES($1, $2, $3)
      RETURNING *`, [
        permissions,
        username.toLowerCase(),
        hashedPassword]);
    return user;
  } catch (err) {
    throw err;
  }
}

const getAllUsers = async() => {
  try {
    const {rows} = await db.query(`
      SELECT * FROM users;
    `)
    return rows
  } catch (err) {
    throw err
  }
}

const getUser = async({username, password}) => {
  if(!username || !password){
    return;
  }
  try {
    const user = await getUserByUsername(username);
    if (!user) return;
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword)
    if (!passwordsMatch){
      return;
    } 
    delete user.password
    return user
  } catch (err) {
    throw err;
  }
}

const getUserByUsername = async (username) => {
  const lowerUsername = username.toLowerCase()
  try {
      const { rows: [user] } = await db.query(`
      SELECT * 
      FROM users
      WHERE username=$1;`, [lowerUsername]);

      if (!user) {
          return;
      }
      return user;
  } catch (err) {
      throw err;
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  getUserByUsername
}