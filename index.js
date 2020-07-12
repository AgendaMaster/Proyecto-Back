const express = require('express')
const config = require('./config')
const app = express()

const testRoutes = require('./routes/test');
app.use(express.json())
testRoutes(app)

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening hhttp://localhost:${config.port}`)
})