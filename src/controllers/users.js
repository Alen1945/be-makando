const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { runQuery } = require('../config/db')
const { GetUser, CreateUser, UpdateProfile, GetProfile, DeleteUser } = require('../models/users')
const { validateUsernamePassword } = require('../utility/validate')

exports.GetProfile = async (req, res, next) => {
  try {
    const profileUser = await GetProfile(req.auth.id)
    if (profileUser) {
      return res.status(200).send({
        success: true,
        data: profileUser
      })
    } else {
      throw new Error('Your Account Has been deleted')
    }
  } catch (e) {
    res.status(202).send({
      success: false,
      msg: e.message
    })
  }
}
exports.RegisterUser = async (req, res, next) => {
  try {
    const { username, password } = req.body
    if (username && password) {
      const validate = validateUsernamePassword(username, password)
      if (validate.val) {
        const hashPassword = bcrypt.hashSync(password)
        const statusRegister = await CreateUser({ username, password: hashPassword }, false)
        if (statusRegister) {
          res.status(201).send({
            success: true,
            msg: 'Register Success, Please Login'
          })
        }
      } else {
        throw new Error(validate.message)
      }
    } else {
      throw new Error('Username and Password is Required')
    }
  } catch (e) {
    console.log(e)
    res.status(202).send({
      success: false,
      msg: e.message
    })
  }
}

exports.LoginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body
    if (username && password) {
      const dataLogin = await new Promise((resolve, reject) => {
        runQuery(`SELECT _id,username,password FROM users WHERE username='${username}'`,
          (err, results) => {
            if (!err && results[1].length > 0 && bcrypt.compareSync(password, results[1][0].password)) {
              const userData = { id: results[1][0]._id, username }
              return resolve(userData)
            } else {
              return reject(new Error(err || 'Username Or Password Wrong'))
            }
          })
      })
      const token = jwt.sign(dataLogin, process.env.APP_KEY, { expiresIn: '1H' })
      res.send({
        success: true,
        msg: 'Login Success',
        data: {
          token
        }
      })
    } else {
      throw new Error('Username and Password is Required')
    }
  } catch (e) {
    console.log(e)
    res.status(401).send({
      success: false,
      msg: e.message
    })
  }
}

exports.UpdateUser = async (req, res, next) => {
  try {
    const { id } = req.auth
    const fillable = ['username', 'fullname', 'email', 'gender', 'address', 'picture']
    const params = Object.keys(req.body).map((v) => {
      if (v && fillable.includes(v) && req.body[v]) {
        return { key: v, value: req.body[v] }
      } else {
        return null
      }
    }).filter(o => o)

    if (req.body.old_password) {
      const user = await GetUser(id)
      const oldPassword = user.password
      if (!(req.body.new_password && req.body.confirm_password)) {
        throw new Error('New Password or Confirm Password Not Defined')
      }
      if (!(req.body.new_password === req.body.confirm_password)) {
        throw new Error('Confirm Password Not Match')
      }
      if (!(bcrypt.compareSync(req.body.old_password, oldPassword))) {
        throw new Error('Old Password Not Match')
      }
      params.push({ key: 'password', value: bcrypt.hashSync(req.body.new_password) })
    }
    const update = await UpdateProfile(id, params)
    if (update) {
      res.send({
        success: true,
        msg: `User ${req.auth.username} has been updated`
      })
    } else {
      throw new Error('Failed to update user!')
    }
  } catch (e) {
    console.log(e)
    res.status(202).send({
      success: false,
      msg: e.message
    })
  }
}

exports.DeleteAccount = async (req, res, next) => {
  try {
    const { id } = req.auth
    if (!(await DeleteUser(id))) {
      throw new Error('Failed to Delete Your Account')
    }
    res.status(200).send({
      success: true,
      msg: 'Success Delete Your Account'
    })
  } catch (e) {
    res.status(202).send({
      success: false,
      msg: e.message
    })
  }
}
exports.DeleteUser = async (req, res, next) => {
  try {
    const { id } = req.params.id
    if (!(await DeleteUser(id))) {
      throw new Error('Failed to Delete User')
    }
    res.status(200).send({
      success: true,
      msg: 'Success to Delete User'
    })
  } catch (e) {
    res.status(202).send({
      success: false,
      msg: e.message
    })
  }
}

exports.TopUp = async (req, res, next) => {
  try {
    if (!req.body.nominal_topup) {
      throw new Error('Please Entry nominal_topup')
    }
    const idUser = req.auth.id
    const updateBalance = await UpdateProfile(idUser, [{ key: 'balance', value: req.body.nominal_topup }])
    if (updateBalance) {
      res.send({
        success: true,
        msg: `Success TopUp for ${req.auth.username}`
      })
    } else {
      throw new Error('Failed to TopUp!')
    }
  } catch (e) {
    console.log(e)
    res.status(202).send({
      success: false,
      msg: e.message
    })
  }
}
