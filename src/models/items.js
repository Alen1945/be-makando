const { runQuery } = require('../config/db')

exports.GetItem = (id, params) => {
  return new Promise((resolve, reject) => {
    if (id) {
      runQuery(`SELECT * FROM items WHERE _id =${id}`, (err, results, fields) => {
        if (err) {
          return reject(new Error(err))
        }
        return resolve(results[1][0])
      })
    } else {
      runQuery('SELECT * from items', (err, results, fields) => {
        if (err) {
          return reject(new Error(err))
        }
        return resolve(results[1])
      })
    }
  })
}