const { runQuery } = require('../config/db')
exports.GetCart = (idUser) => {
  return new Promise((resolve, reject) => {
    runQuery(`
    SELECT _id,id_item,name_item,total_items,total_price FROM carts WHERE id_user=${idUser} && is_check_out=0;
    SELECT SUM(total_price) AS totalPrice From carts WHERE id_user=${idUser} && is_check_out=0
    `, (err, results, fields) => {
      if (err) {
        return reject(new Error(err))
      }
      if (!(results[1].length > 0)) {
        return resolve(false)
      }
      return resolve({ totalPrice: results[2][0].totalPrice,totalItem: results[1].length, itemInCart: results[1] })
    })
  })
}

exports.AddItem = (idUser, dataItem) => {
  return new Promise((resolve, reject) => {
    const { idItem, nameItem, totalItem, totalPrice } = dataItem
    runQuery(`SELECT COUNT(*) AS total FROM carts WHERE id_user=${idUser} && id_item=${idItem}`,
      (err, results, fields) => {
        if (err || !(results[1][0].total)) {
          return reject(new Error(err || 'Item Already Added, You can Update Or Delete If You Want'))
        }
        runQuery(`INSERT INTO carts(id_user,id_item,name_item,total_items,total_price) VALUES(${idUser},${idItem},'${nameItem}',${totalItem},${totalPrice})`,
          (err, results, fields) => {
            if (err) {
              console.log(err)
              return reject(new Error(err))
            }
            return resolve(true)
          })
      })
  })
}
