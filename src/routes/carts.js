const Carts = require('express').Router()
const checkAuthToken = require('../middleware/authMiddleware')
const { GetAllCart, AddItem, UpdateItemCart } = require('../controllers/carts')

Carts.get('/', checkAuthToken, GetAllCart)
Carts.post('/', checkAuthToken, AddItem)
Carts.put('/:id', checkAuthToken, UpdateItemCart)

module.exports = Carts
