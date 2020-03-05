const { GetCategory, CreateCategory, UpdateCategory, DeleteCategory } = require('../models/itemCategories')

exports.GetAllCategory = async (req, res, next) => {
  try {
    const dataCategory = await GetCategory(false, { p: 'ram' })
    res.status(200).send({
      success: true,
      data: dataCategory
    })
  } catch (e) {
    console.log(e)
    res.status(202).send({
      success: false,
      msg: e.message
    })
  }
}

exports.GetDetailCategory = async (req, res, next) => {
  try {
    const dataCategory = await GetCategory(req.params.id)
    res.status(200).send({
      success: true,
      data: dataCategory
    })
  } catch (e) {
    console.log(e)
    res.status(202).send({
      success: false,
      msg: e.message
    })
  }
}

exports.CreateCategory = async (req, res, next) => {
  try {
    if (!req.body.name) {
      throw new Error('name is required')
    }
    const category = await CreateCategory(req.body.name)
    if (category) {
      res.status(201).send({
        success: true,
        msg: 'Success Create Category',
        data: {
          name: req.body.name,
          id: category
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

exports.UpdateCategory = async (req, res, next) => {
  try {
    if (!(req.body.name)) {
      throw new Error('name is required')
    }
    const { id } = req.params
    const update = await UpdateCategory(id, req.body.name)
    if (update) {
      res.status(201).send({
        success: true,
        msg: `Success Update Category With id ${id}`
      })
    }
  } catch (e) {
    res.status(202).send({
      success: false,
      msg: e.message
    })
  }
}

exports.DeleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!(await DeleteCategory(id))) {
      throw new Error(`Failed To Delete Category With id ${id}`)
    }
    res.status(200).send({
      success: true,
      msg: `Success to Delete Category With id ${id}`
    })
  } catch (e) {
    console.log(e)
    res.status(202).send({
      success: false,
      msg: e.msg
    })
  }
}
