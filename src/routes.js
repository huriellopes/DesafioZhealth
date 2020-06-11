const express = require('express')

const routes = express.Router()

routes.get('/test', (_req, res) =>
  res.status(200).send({ status: 200, success: 'Server is working!' })
)

module.exports = routes
