const { GetCart } = require('../models/carts')
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
