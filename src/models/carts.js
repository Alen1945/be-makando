const { runQuery } = require('../config/db')
exports.GetUserCart = (idCart, idUser, includeItem) => {
  return new Promise((resolve, reject) => {
    if (idCart) {
      runQuery(`SELECT * FROM carts WHERE _id=${idCart} AND id_user=${idUser} AND is_check_out=0`, (err, results, fields) => {
        if (err) {
          return reject(new Error(err))
        }
        return resolve(results[1][0])
      })
    } else {
      runQuery(`
      SELECT _id,id_item,name_item,total_items,total_price FROM carts WHERE id_user=${idUser} AND is_check_out=0;
      SELECT SUM(total_price) AS totalPrice From carts WHERE id_user=${idUser} AND is_check_out=0
      `, (err, results, fields) => {
        if (err) {
          return reject(new Error(err))
        }
        if (!(results[1].length > 0)) {
          return resolve(false)
        }
        let dataCart = {
          totalPrice: results[2][0].totalPrice,
          totalTypeItems: results[1].length
        }
        if (includeItem) {
          dataCart.itemInCart = results[1]
        }
        return resolve(dataCart)
      })
    }
  })
}

exports.AddItem = (idUser, dataItem) => {
  return new Promise((resolve, reject) => {
    const { idItem, nameItem, totalItem, totalPrice } = dataItem
    runQuery(`SELECT COUNT(*) AS total FROM carts WHERE id_user=${idUser} AND id_item=${idItem} AND is_check_out=0`,
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
    runQuery(`UPDATE carts SET total_items=${totalItem},total_price=${totalPrice} WHERE _id=${idCart} AND id_user=${idUser} AND is_check_out=0`,
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
    runQuery(`DELETE FROM carts WHERE _id=${idCart} AND id_user=${idUser} AND is_check_out=0`, (err, results, fields) => {
      if (err) {
        console.log(err)
        return reject(new Error(err))
      }
      console.log(results[1].affectedRows)
      return resolve(results[1].affectedRows)
    })
  })
}

exports.CheckOutItem = (idUser, price) => {
  return new Promise((resolve, reject) => {
    runQuery(` SELECT id_item FROM carts WHERE id_user=${idUser} AND is_check_out=0`, (err, results, fields) => {
      if (err) {
        console.log(err)
        return reject(new Error(err))
      } else {
        const itemId = results[1].map(v => v.id_item)
        runQuery(`
        UPDATE userProfile SET balance=balance-${parseFloat(price)} WHERE id_user = ${idUser};
        UPDATE carts SET is_check_out=1 WHERE id_user=${idUser} AND is_check_out=0;
        INSERT INTO transcations(id_user,list_item,total_price) VALUES(${idUser},'${itemId.join(',')}',${price})
        `, (err, results, fields) => {
          if (err) {
            console.log(err)
            return reject(new Error(err))
          } else {
            return resolve(results[3].affectedRows)
          }
        })
      }
    })
  })
}
