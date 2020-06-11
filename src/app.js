require('dotenv').config()
const express = require('express')
const cors = require('cors')
const compression = require('compression')
const bodyParser = require('body-parser')
const routes = require('./routes')

const app = express()

// Desativa o X-Powered-By: Express
app.disable('x-poewred-by')

app.use(cors()) // Permite acesso externo
app.use(compression()) // Compressão
app.use(bodyParser.json()) // Trata os dados em json
app.use(routes)
app.use(bodyParser.urlencoded({ extended: false }))

module.exports = app
