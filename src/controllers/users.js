const bcrypt = require('bcryptjs')
const { RegisterUser } = require('../models/users')
const { validateUsernamePassword } = require('../utility/validate')
exports.RegisterUser = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const validate = validateUsernamePassword(username, password)
    if (validate.val) {
      const hashPassword = bcrypt.hashSync(password)
      const statusRegister = await RegisterUser({ username, password: hashPassword })
      if (statusRegister) {
        res.status(201).send({
          success: true,
          msg: 'Register Success, Please Login'
        })
      }
    } else {
      throw new Error(validate.message)
    }
  } catch (e) {
    console.log(e)
    res.status(202).send({
      success: false,
      msg: e.message || 'Internal Server Error'
    })
  }
}
