const jwt = require('jsonwebtoken')

module.exports = (params = {}) =>
  jwt.sign(params, process.env.APP_TOKEN, {
    expiresIn: 86400,
  })
