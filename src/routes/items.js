const items = require('express').Router()
const { GetAllItem, GetDetailItem, CreateItem } = require('../controllers/items')
const checkAuthToken = require('../middleware/authMiddleware')
const permission = require('../middleware/authPermissions')

items.get('/', GetAllItem)
items.get('/:id', GetDetailItem)
items.post('/', checkAuthToken, permission.admin, CreateItem)

module.exports = items
