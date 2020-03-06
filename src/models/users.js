const { runQuery } = require('../config/db')
const uuid = require('uuid').v1
exports.GetUser = (id) => {
  return new Promise((resolve, reject) => {
    runQuery(`SELECT * from users WHERE _id=${id}`,
      (error, results, fields) => {
        if (error) {
          return reject(new Error(error))
        } else {
          return resolve(results[1][0])
        }
      }
    )
  })
}

exports.GetProfile = (id) => {
  return new Promise((resolve, reject) => {
    runQuery(`SELECT u._id,u.username,p.fullname, p.email,p.balance,p.gender,p.address from userProfile p INNER JOIN users u ON p.id_user=u._id WHERE u._id=${id}`,
      (error, results, fields) => {
        if (error) {
          return reject(new Error(error))
        } else {
          return resolve(results[1][0])
        }
      }
    )
  })
}

exports.CreateUser = (data, isAdmin) => {
  return new Promise((resolve, reject) => {
    const { username, password } = data
    runQuery(`SELECT COUNT(*) AS total FROM users WHERE username = '${username}'`,
      (err, results, fields) => {
        if (err) {
          return reject(new Error(err))
        }
        const { total } = results[1][0]
        if (!total) {
          runQuery(`INSERT INTO users(username, password${isAdmin ? ',is_admin' : ''})VALUES('${username}','${password}'${isAdmin ? ',1' : ''})`,
            (err, results, fields) => {
              if (err) {
                console.log(results[1].solutions)
                return reject(new Error(err))
              } else {
                const codeVerify = uuid()
                runQuery(`INSERT INTO userProfile(id_user, code_verify ) VALUES(${results[1].insertId},'${codeVerify}')`,
                  (err, results, fields) => {
                    if (!err) {
                      return resolve({ status: true, codeVerify })
                    }
                    console.log(err)
                  })
              }
            })
        } else {
          return reject(new Error('Username Already Exists'))
        }
      })
  })
}

exports.VerifyUser = (code) => {
  return new Promise((resolve, reject) => {
    runQuery(`SELECT id_user from userProfile WHERE code_verify= '${code}'`,
      (err, results, fields) => {
        if (!err) {
          if (results[1][0] && results[1][0].id_user) {
            const idUser = results[1][0].id_user
            runQuery(`
              UPDATE users SET status=1 WHERE _id = ${idUser};
              UPDATE userProfile SET code_verify = ${null} WHERE id_user =${idUser}
            `, (err, results, fields) => {
              if (err) {
                reject(new Error(err))
              } else {
                resolve(true)
              }
            })
          } else {
            return reject(new Error('Code Verification Wrong'))
          }
        } else {
          return reject(new Error(err))
        }
      }
    )
  })
}

exports.UpdateProfile = (id, params) => {
  return new Promise((resolve, reject) => {
    let query = []
    const paramsUsers = params.slice().filter(v => ['username', 'password', 'status'].includes(v.key))
    const paramsProfile = params.slice().filter((v) => ['fullname', 'email', 'gender', 'balance', 'address', 'picture'].includes(v.key))
    if (paramsUsers.length > 0) {
      query.push(`UPDATE users SET ${paramsUsers.map(v => `${v.key} = '${v.value}'`).join(' , ')} WHERE _id=${id}`)
    }
    if (paramsProfile.length > 0) {
      query.push(`UPDATE userProfile SET ${paramsProfile.map(v => `${v.key} = '${v.value}'`).join(' , ')} WHERE id_user=${id}`)
    }
    runQuery(`${query.map((v) => v).join(';')}`, (err, results, fields) => {
      if (err) {
        return reject(new Error(err))
      }
      console.log(results)
      return resolve(results[1].affectedRows)
    })
  })
}

exports.DeleteUser = (id) => {
  return new Promise((resolve, reject) => {
    runQuery(`DELETE FROM users WHERE _id = ${id}`, (err, results, fields) => {
      if (err) {
        return reject(new Error(err))
      }
      return resolve(results[1].affectedRows)
    })
  })
}
