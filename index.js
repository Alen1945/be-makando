const express = require('express')
const bodyParser = require('body-parser')
const app = express()

/* Import Controllers */
const { TopUp, Verify, ForgotPassword } = require('./src/controllers/users')
const { CheckOutItem } = require('./src/controllers/carts')
/* Import ROUTES */
const Users = require('./src/routes/users')
const Restaurants = require('./src/routes/restaurants')
const itemCategories = require('./src/routes/itemCategories')
const items = require('./src/routes/items')
const carts = require('./src/routes/carts')
const Reviews = require('./src/routes/reviews')
const { GuestCategories, GuestItems, GuestRestaurants } = require('./src/routes/guests')
/* Middleware */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/* Import Middleware */
const checkAuthToken = require('./src/middleware/authMiddleware')

/* Set ROUTES */
app.post('/topup', checkAuthToken, TopUp)
app.post('/verify', Verify)
app.post('/forgot-password', ForgotPassword)
app.get('/checkout', checkAuthToken, CheckOutItem)
app.use('/reviews', Reviews)
app.use('/users', Users)
app.use('/restaurants', Restaurants)
app.use('/categories', itemCategories)
app.use('/items', items)
app.use('/carts', carts)

app.use('/browse-items', GuestItems)
app.use('/browse-restaurants', GuestRestaurants)
app.use('/browse-categories', GuestCategories)

/* Server Listen */
const PORT = 4000
app.listen(PORT, () => {
  console.log('Server Listen on Port ' + PORT)
})
