const Carts = require('express').Router()
const checkAuthToken = require('../middleware/authMiddleware')
const { GetAllCart, AddItem } = require('../controllers/carts')

Carts.get('/', checkAuthToken, GetAllCart)
Carts.post('/', checkAuthToken, AddItem)

module.exports = Carts
