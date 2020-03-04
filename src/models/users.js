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
                runQuery(`INSERT INTO userProfile(id_user) VALUES(${results[1].insertId})`,
                  (err, results, fields) => {
                    if (!err) {
                      resolve(true)
                    }
                    console.log(err)
                  })
              }
            })
        } else {
          reject(new Error('Username Already Exists'))
        }
      })
  })
}
