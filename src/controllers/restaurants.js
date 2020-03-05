const { GetRestaurants, CreateRestaurant } = require('../models/restaurants')

module.exports.GetAllRestaurant = async (req, res, next) => {
  try {
    const dataRestaurants = await GetRestaurants(false, { p: 'ram' })
    res.status(200).send({
      success: true,
      data: dataRestaurants
    })
  } catch (e) {
    console.log(e)
    res.status(202).send({
      success: false,
      msg: e.message
    })
  }
}

module.exports.GetDetailRestaurant = async (req, res, next) => {
  try {
    const dataRestaurant = await GetRestaurants(req.params.id)
    res.status(200).send({
      success: true,
      data: dataRestaurant
    })
  } catch (e) {
    console.log(e)
    res.status(202).send({
      success: false,
      msg: e.message
    })
  }
}

module.exports.CreateRestaurant = async (req, res, next) => {
  try {
    if (!req.body.id_owner || !req.body.name) {
      throw new Error('id owner and name is required')
    }
    const restaurant = await CreateRestaurant(req.body)
    if (restaurant) {
      res.status(201).send({
        success: true,
        msg: 'Success Create Restaurant',
        data: {
          name: req.body.name,
          id: restaurant
        }
      })
    }
  } catch (e) {
    console.log(e)
    res.status(202).send({
      success: false,
      msg: e.message
    })
  }
}
