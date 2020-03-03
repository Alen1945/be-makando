const express = require('express')
const bodyParser = require('body-parser')
const app = express()

/* Middleware */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/* Server Listen */
const PORT = 4000
app.listen(PORT, () => {
  console.log('Server Listen on Port ' + PORT)
})
