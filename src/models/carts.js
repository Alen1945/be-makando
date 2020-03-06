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

exports.AddItem = (idUser, dataItem) => {
  return new Promise((resolve, reject) => {
    const { idItem, totalItem, totalPrice } = dataItem
    runQuery(`SELECT COUNT(*) AS total FROM carts WHERE id_user=${idUser} && id_item=${idItem}`,
      (err, results, fields) => {
        if (err) {
          return reject(new Error(err))
        }
        if (!(results[1][0].total)) {
          runQuery(`INSERT INTO carts(id_user,id_item,total_items,total_price) VALUES(${idUser},${idItem},${totalItem},${totalPrice})`,
            (err, results, fields) => {
              if (err) {
                console.log(err)
                return reject(new Error(err))
              }
              return resolve(true)
            })
        }
        reject(new Error('Item Already Added'))
      })
  })
}
