const express = require('express')
const bodyParser = require('body-parser')
const app = express()

/* Import ROUTES */
const Users = require('./src/routes/users')

/* Middleware */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/* Set ROUTES */
app.use('/users', Users)

/* Server Listen */
const PORT = 4000
app.listen(PORT, () => {
  console.log('Server Listen on Port ' + PORT)
})
