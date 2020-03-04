const { runQuery } = require('../config/db')

exports.RegisterUser = (data) => {
  return new Promise((resolve, reject) => {
    const { username, password } = data
    runQuery(`SELECT COUNT(*) AS total FROM users WHERE username = '${username}'`,
      (err, results, fields) => {
        if (err) {
          reject(new Error(err))
        }
        const { total } = results[1][0]
        if (!total) {
          runQuery(`INSERT INTO users(username,password) VALUES('${username}','${password}')`,
            (err, results, fields) => {
              if (err) {
                reject(new Error(err))
                console.log(results[1].solutions)
              } else {
                console.log(results[1])
                resolve(true)
              }
            })
        } else {
          reject(new Error('Username Already Exists'))
        }
      })
  })
}
