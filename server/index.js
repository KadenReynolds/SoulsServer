require('dotenv').config()

const express = require('express');
const router = require('vite-express');
const app = express();
const cors = require('cors')

const bodyParser = require('body-parser')
app.use(bodyParser.json());

app.use(express.static('public'))
app.use(cors());

const db = require('./database/client')
db.connect()

const apiRouter = require('./API');
app.use('/api', apiRouter);

// app.use("/", (req, res) => {
//   res.send("Server is up")
// })

router.listen(app, 3000, () =>
  console.log('Server is listening on port 3000...')
);

module.exports = router;