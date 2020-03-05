const { GetRestaurants, CreateRestaurant, UpdateRestaurant, DeletRestaurant } = require('../models/restaurants')
const { GetUser } = require('../models/users')
exports.GetAllRestaurant = async (req, res, next) => {
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

exports.GetDetailRestaurant = async (req, res, next) => {
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

exports.CreateRestaurant = async (req, res, next) => {
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

exports.UpdateRestaurant = async (req, res, next) => {
  try {
    if (!(Object.keys(req.body).length > 0)) {
      throw new Error('Please Defined What you want to update')
    }
    const { id } = req.params
    const dataRestaurant = await GetRestaurants(id)
    const dataOwner = await GetUser(req.auth.id)
    if (!dataRestaurant) {
      throw new Error('Restaurants Not Exists')
    }
    if (!(dataOwner._id === dataRestaurant.id_owner || dataOwner.is_superadmin)) {
      res.status(403).send({
        success: false,
        msg: 'To Update You Must Superadmin Or Owner of this Restaurant'
      })
    }
    const params = Object.keys(req.body).map((v) => {
      if (v && ['name', 'logo', 'location', 'decription'].includes(v) && req.body[v]) {
        return { key: v, value: req.body[v] }
      } else {
        return null
      }
    }).filter(v => v)
    const update = await UpdateRestaurant(id, params)
    if (update) {
      res.status(201).send({
        success: true,
        msg: `Success Update Restaurant With id ${id}`
      })
    }
  } catch (e) {
    res.status(202).send({
      success: false,
      msg: e.message
    })
  }
}

exports.DeletRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!(await DeletRestaurant(id))) {
      throw new Error(`Failed To Delete Restaurant With id ${id}`)
    }
    res.status(200).send({
      success: true,
      msg: `Success to Delete Restaurants With id ${id}`
    })
  } catch (e) {
    console.log(e)
    res.status(202).send({
      success: false,
      msg: e.message
    })
  }
}
