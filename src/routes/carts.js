const Carts = require('express').Router()
const checkAuthToken = require('../middleware/authMiddleware')
const { GetAllCart } = require('../controllers/carts')

Carts.get('/', checkAuthToken, GetAllCart)

module.exports = Carts
