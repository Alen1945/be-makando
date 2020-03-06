const { GetUserCart, GetDetailItemCart, UpdateItemCart , AddItem } = require('../models/carts')
const { GetItem } = require('../models/items')
exports.GetAllCart = async (req, res, next) => {
  try {
    const { id } = req.auth
    const carts = await GetUserCart(id)
    if (carts.itemInCart.length > 0) {
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
      nameItem: item.name,
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

exports.UpdateItemCart = async (req, res, next) => {
  try {
    if(!req.body.total_items) {
      throw new Error('total_items is required')
    }
    const idUser = req.auth.id
    const idItemCart = req.params.id
    const itemCart = await GetDetailItemCart(idItemCart)
    if (!itemCart) {
      throw new Error(`Cart With id ${idItemCart} Is Not Exists`)
    }
    const item = await GetItem(itemCart.id_item)
    if (!item) {
      throw new Error('This Item Has been Removed From Restaurant')
    }
    if (parseInt(itemCart.id_user) !== parseInt(idUser)) {
      return res.status(403).send({
        success: false,
        msg: "This Item Not In Your Cart's"
      })
    }
    const updateItemCart = await UpdateItemCart(idItemCart, {
      totalItem: req.body.total_items,
      totalPrice: parseFloat(req.body.total_items) * parseFloat(item.price) 
    })
    if (updateItemCart) {
      res.status(200).send({
        success: true,
        msg: 'Total Items in Cart Has been Update'
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
