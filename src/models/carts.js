const { runQuery } = require('../config/db')

exports.GetCart = (idUser) => {
  return new Promise((resolve, reject) => {
    runQuery(`SELECT * FROM carts WHERE id_user=${idUser} && is_check_out=0`, (err, results, fields) => {
      if (err) {
        return reject(new Error(err))
      }
      return resolve(results[1])
    })
  })
}
