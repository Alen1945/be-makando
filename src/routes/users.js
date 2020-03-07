const Users = require('express').Router()
const checkAuthToken = require('../middleware/authMiddleware')
const permission = require('../middleware/authPermissions')
const { UpdateUser, GetProfile, DeleteUser } = require('../controllers/users')

Users.get('/', checkAuthToken, permission.admin, GetProfile)
Users.get('/:id', checkAuthToken, GetProfile)
Users.patch('/update-profile', checkAuthToken, permission.admin, UpdateUser)
Users.delete('/:id', checkAuthToken, permission.superadmin, DeleteUser)

module.exports = Users
