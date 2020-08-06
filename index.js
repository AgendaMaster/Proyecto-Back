const express = require('express')
const app = express()
const { config } = require('./config')
const cors = require("cors")
const users = require('./routes/users.js');
const images = require('./routes/images.js');
const events = require('./routes/events');
const roles = require('./routes/roles');
const authApiRouter = require('./routes/auth');

app.use(express.json())
app.use(cors())

users(app);
images(app);
events(app);

roles(app);
app.use("/api/auth", authApiRouter);


app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening http://localhost:${config.port}`)
})