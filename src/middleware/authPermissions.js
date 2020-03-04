const { runQuery } = require('../config/db')

exports.permission = {
  admin: async (req, res, next) => {
    try {
      if (await checkPermission(req.auth, 'admin')) {
        console.log('next')
        next()
      } else {
        throw new Error("You Don't Have Permission Only Admin")
      }
    } catch (e) {
      res.status(403).send({
        success: false,
        msg: e.message
      })
    }
  },
  superadmin: async (req, res, next) => {
    try {
      if (await checkPermission(req.auth, 'superadmin')) {
        console.log('next')
        next()
      } else {
        throw new Error("You Don't Have Permission Only SuperAdmin")
      }
    } catch (e) {
      res.status(403).send({
        success: false,
        msg: e.message
      })
    }
  }
}

const checkPermission = (auth, role) => {
  return new Promise((resolve, reject) => {
    if (auth) {
      runQuery(`SELECT is_${role} FROM users WHERE username='${auth.username}'`,
        (err, results, fields) => {
          if (err) {
            console.log(err)
            reject(new Error(err))
          } else {
            resolve(results[1][0][`is_${role}`])
          }
        })
    } else {
      resolve(false)
    }
  })
}