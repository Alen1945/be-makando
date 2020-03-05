const items = require('express').Router()
const { GetAllItem, GetDetailItem } = require('../controllers/items')
const checkAuthToken = require('../middleware/authMiddleware')
const permission = require('../middleware/authPermissions')

items.get('/', GetAllItem)
items.get('/:id', GetDetailItem)
module.exports = items
