const Users = require('express').Router()
const { RegisterUser, LoginUser } = require('../controllers/users')

Users.post('/register', RegisterUser)
Users.post('/login', LoginUser)

module.exports = Users
