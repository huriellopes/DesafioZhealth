const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')
const authMiddleware = require('./app/middlewares/auth')

const routes = express.Router()

const MedicoController = require('./app/controllers/MedicoController')
const PrescricaoController = require('./app/controllers/PrescricaoController')

// EndPoint para testar o funcionamento da api!
routes.get('/test', (_req, res) =>
  res.status(200).send({ status: 200, success: 'Server is working!' })
)

routes.post(
  '/auth',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      senha: Joi.string().required(),
    }),
  }),
  MedicoController.auth
)

routes.post(
  '/auth/register',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      cpf: Joi.string().required(),
      email: Joi.string().required().email(),
      name: Joi.string().required(),
      date_of_birth: Joi.date().required(),
      crm: Joi.string().required(),
      registration_status: Joi.string().required(),
      sexo: Joi.string().required(),
      senha: Joi.string().required(),
    }),
  }),
  MedicoController.post
)

routes.post(
  '/auth/forgot_password',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
    }),
  }),
  MedicoController.forgot_password
)

routes.post(
  '/auth/reset_password',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      token: Joi.string().required(),
      senha: Joi.string().required(),
      confirmar_senha: Joi.string().required(),
    }),
  }),
  MedicoController.reset
)

routes.get('/prescricao', authMiddleware, PrescricaoController.index)

module.exports = routes
