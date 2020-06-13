const { randomBytes } = require('crypto')

module.exports = randomBytes(20).toString('hex')
