const { GetCart, AddItem } = require('../models/carts')
const { GetItem } = require('../models/items')
exports.GetAllCart = async (req, res, next) => {
  try {
    const { id } = req.auth
    const carts = await GetCart(id)
    if (carts.length > 0) {
      return res.status(200).send({
        succces: true,
        data: carts
      })
    } else {
      return res.status(200).send({
        succces: true,
        data: false,
        msg: 'Data Cart Is Empty'
      })
    }
  } catch (e) {
    console.log(e)
    res.status(202).send({
      succces: false,
      msg: e.message
    })
  }
}

exports.AddItem = async (req, res, next) => {
  try {
    if (!req.body.id_item || !req.body.total_items) {
      throw new Error('id_item and total_items is required')
    }
    const idUser = req.auth.id
    const item = await GetItem(req.body.id_item)
    if (!item) {
      throw new Error(`Items With Id ${req.body.id_item} Not Exists`)
    }
    const dataItem = {
      idItem: item._id,
      totalItem: req.body.total_items,
      totalPrice: parseFloat(req.body.total_items) * parseFloat(item.price)
    }
    const addedItem = await AddItem(idUser, dataItem)
    if (addedItem) {
      return res.status(201).send({
        success: true,
        msg: 'Success Added Item to Cart'
      })
    }
    throw new Error('Failed to Added Item')
  } catch (e) {
    console.log(e)
    res.status(202).send({
      succces: false,
      msg: e.message
    })
  }
}