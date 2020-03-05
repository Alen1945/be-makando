const Restaurant = require('express').Router()
const { GetAllRestaurant, GetDetailRestaurant, CreateRestaurant, UpdateRestaurant } = require('../controllers/restaurants')
const checkAuthToken = require('../middleware/authMiddleware')
const permission = require('../middleware/authPermissions')

Restaurant.get('/', GetAllRestaurant)
Restaurant.get('/:id', GetDetailRestaurant)
Restaurant.post('/', checkAuthToken, permission.superadmin, CreateRestaurant)
Restaurant.patch('/:id', checkAuthToken, permission.admin, UpdateRestaurant)
module.exports = Restaurant
