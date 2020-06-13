require('dotenv').config() // Configuração para o env
const express = require('express')
const cors = require('cors')
const compression = require('compression')
const bodyParser = require('body-parser')
const { errors } = require('celebrate')
const morgan = require('morgan')
const routes = require('./routes')

const app = express()

// Desativa o X-Powered-By: Express
app.disable('x-poewred-by')

app.use(cors()) // Permite acesso externo
app.use(morgan('combined')) // log de requisições http
app.use(compression()) // Compressão
app.use(bodyParser.json()) // Trata os dados em json
app.use(bodyParser.urlencoded({ extended: false })) // decode de parâmetro!
app.use(routes) // Rotas
app.use(errors()) // Formata o retorno da validação

module.exports = app
