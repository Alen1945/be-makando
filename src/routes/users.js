const Users = require('express').Router()
const checkAuthToken = require('../middleware/authMiddleware')
const { RegisterUser, LoginUser, UpdateUser } = require('../controllers/users')

Users.post('/register', RegisterUser)
Users.post('/login', LoginUser)
Users.patch('/update', checkAuthToken, UpdateUser)

module.exports = Users
