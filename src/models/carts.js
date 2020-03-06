const { runQuery } = require('../config/db')
exports.GetUserCart = (idCart, idUser) => {
  return new Promise((resolve, reject) => {
    if (idCart) {
      runQuery(`SELECT * FROM carts WHERE _id=${idCart} && id_user=${idUser} && is_check_out=0`, (err, results, fields) => {
        if (err) {
          return reject(new Error(err))
        }
        return resolve(results[1][0])
      })
    } else {
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
    }   
  })
}

exports.AddItem = (idUser, dataItem) => {
  return new Promise((resolve, reject) => {
    const { idItem, nameItem, totalItem, totalPrice } = dataItem
    runQuery(`SELECT COUNT(*) AS total FROM carts WHERE id_user=${idUser} && id_item=${idItem}`,
      (err, results, fields) => {
        if (err || results[1][0].total) {
          return reject(new Error(err || "Item Already Added, Check You Cart's for Update Or Delete Item"))
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

exports.UpdateItemCart = (idCart, idUser, dataItem) => {
  return new Promise((resolve, reject) => {
    const { totalItem, totalPrice } = dataItem
    runQuery(`UPDATE carts SET total_items=${totalItem},total_price=${totalPrice} WHERE _id=${idCart} && id_user=${idUser} && is_check_out=0`,
      (err, results, fields) => {
        if (err) {
          return reject(new Error(err))
        }
        console.log(results[1].affectedRows)
        return resolve(results[1].affectedRows)
      })
  })
}

exports.RemoveItemCart = (idCart, idUser) => {
  return new Promise((resolve, reject) => {
    runQuery(`DELETE FROM carts WHERE _id=${idCart} && id_user=${idUser} && is_check_out=0`, (err, results, fields) => {
      if (err) {
        console.log(err)
        return reject(new Error(err))
      }
      console.log(results[1].affectedRows)
      return resolve(results[1].affectedRows)
    })
  })
}