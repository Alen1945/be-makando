const { GetItem } = require('../models/items')

exports.GetAllItem = async (req, res, next) => {
  try {
    const dataItems = await GetItem(false, { p: 'ram' })
    res.status(200).send({
      success: true,
      data: dataItems
    })
  } catch (e) {
    console.log(e)
    res.status(202).send({
      success: false,
      msg: e.message
    })
  }
}

exports.GetDetailItem = async (req, res, next) => {
  try {
    const dataitem = await GetItem(req.params.id)
    res.status(200).send({
      success: true,
      data: dataitem
    })
  } catch (e) {
    console.log(e)
    res.status(202).send({
      success: false,
      msg: e.message
    })
  }
}
