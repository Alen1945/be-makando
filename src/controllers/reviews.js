const qs = require('qs')
const { GetReview } = require('../models/reviews')

exports.GetAllReview = async (req, res, next) => {
  try {
    const params = {
      currentPage: req.query.page || 1,
      perPage: req.query.limit || 5,
      search: req.query.search || '',
      sort: req.query.sort || [{ key: '_id', value: 0 }]
    }
    const column = ['_id', 'rating', 'review']
    if (req.query.search) {
      params.search = Object.keys(params.search).map((v, i) => {
        if (column.includes(v)) {
          return { key: v, value: req.query.search[v] }
        } else {
          return [{ key: '_id', value: 0 }]
        }
      })
    }
    if (req.query.sort) {
      params.sort = Object.keys(params.sort).map((v, i) => {
        if (column.includes(v)) {
          return { key: v, value: req.query.sort[v] }
        } else {
          return { key: '_id', value: 0 }
        }
      })
    }
    const dataReview = await GetReview(false, params)

    const totalPages = Math.ceil(dataReview.total / parseInt(params.perPage))
    const query = req.query
    query.page = parseInt(params.currentPage) + 1
    const nextPage = (parseInt(params.currentPage) < totalPages ? process.env.APP_URL.concat(`${req.baseUrl}?${qs.stringify(query)}`) : null)
    query.page = parseInt(params.currentPage) - 1
    const previousPage = (parseInt(params.currentPage) > 1 ? process.env.APP_URL.concat(`${req.baseUrl}${qs.stringify(query)}`) : null)

    const pagination = {
      currentPage: params.currentPage,
      nextPage,
      previousPage,
      totalPages,
      perPage: params.perPage,
      totalEntries: dataReview.total
    }
    if (dataReview.results.length > 0) {
      res.status(200).send({
        success: true,
        data: dataReview.results,
        pagination
      })
    } else {
      res.status(200).send({
        success: true,
        data: false,
        msg: 'Data is Empty'
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

exports.GetDetailReview = async (req, res, next) => {
  try {
    if (!parseInt(req.params.id)) {
      throw new Error('Params Id Must Number')
    }
    const dataReview = await GetReview(req.params.id)
    if (dataReview) {
      res.status(200).send({
        success: true,
        data: dataReview
      })
    } else {
      res.status(200).send({
        success: true,
        data: false,
        msg: `Review With id ${req.params.id} Not Exists`
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