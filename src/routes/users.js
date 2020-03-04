const Users = require('express').Router()
const { RegisterUser } = require('../controllers/users')

Users.post('/register', RegisterUser)

module.exports = Users
