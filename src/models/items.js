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

exports.CreateItem = (data) => {
  return new Promise((resolve, reject) => {
    runQuery(`INSERT INTO items(${data.columns.map(v => v).join(',')}) VALUES(${data.values.map(v => `'${v}'`).join(',')})
    `, (err, results, fields) => {
      if (err) {
        return reject(new Error(err))
      }
      console.log(results[1])
      return resolve(results[1].insertId)
    })
  })
}

exports.UpdateItem = (id, params) => {
  return new Promise((resolve, reject) => {
    runQuery(`UPDATE items SET ${params.map(v => `${v.key} = '${v.value}'`).join(',')} WHERE _id = ${id}`, (err, results, fields) => {
      if (err) {
        console.log(err)
        return reject(new Error(err))
      }
      console.log(results[1])
      return resolve(true)
    })
  })
}

exports.DeleteItem = (id) => {
  return new Promise((resolve, reject) => {
    runQuery(`DELETE FROM items WHERE _id=${id}`, (err, results, fields) => {
      if (err) {
        console.log(err)
        return reject(new Error(err))
      }
      console.log(results[1])
      return resolve(true)
    })
  })
}