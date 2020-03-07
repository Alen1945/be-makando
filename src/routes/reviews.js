const Reviews = require('express').Router()
const { GetAllReview, GetDetailReview, CreateReview } = require('../controllers/reviews')
const checkAuthToken = require('../middleware/authMiddleware')

Reviews.get('/', checkAuthToken, GetAllReview)
Reviews.post('/', checkAuthToken, CreateReview)
Reviews.get('/:id', checkAuthToken, GetDetailReview)

module.exports = Reviews
