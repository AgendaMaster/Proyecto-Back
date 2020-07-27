const express = require('express')
const app = express()
const { config } = require('./config')
const users = require('./routes/users.js');
const images = require('./routes/images.js');
const authApiRouter = require('./routes/auth');

app.use(express.json())

users(app);
images(app);

app.use("/api/auth", authApiRouter);


app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening http://localhost:${config.port}`)
})