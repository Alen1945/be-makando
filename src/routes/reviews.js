const Reviews = require('express').Router()
const { GetAllReview, GetDetailReview } = require('../controllers/reviews')
const checkAuthToken = require('../middleware/authMiddleware')

Reviews.get('/', checkAuthToken, GetAllReview)
Reviews.get('/:id', checkAuthToken, GetDetailReview)

module.exports = Reviews
