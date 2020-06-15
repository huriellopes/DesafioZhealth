const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')
const authMiddleware = require('./app/middlewares/auth')

const routes = express.Router()

const DoctorController = require('./app/controllers/DoctorController')
const PrescriptionController = require('./app/controllers/PrescriptionController')

// EndPoint para testar o funcionamento da api!
routes.get('/test', (_req, res) =>
  res.status(200).send({ status: 200, success: 'Server is working!' })
)

routes.post(
  '/auth',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  DoctorController.auth
)

routes.post(
  '/auth/register',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      cpf: Joi.string().required(),
      email: Joi.string().required().email(),
      birth: Joi.date().required(),
      crm: Joi.string().required(),
      state_crm: Joi.string().required(),
      gender: Joi.string().required(),
      password: Joi.string().required(),
      repeat_password: Joi.string().required(),
    }),
  }),
  DoctorController.post
)

routes.post(
  '/auth/forgot_password',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
    }),
  }),
  DoctorController.forgot_password
)

routes.post(
  '/auth/reset_password',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      token: Joi.string().required(),
      password: Joi.string().required(),
      repeat_password: Joi.string().required(),
    }),
  }),
  DoctorController.reset
)

routes.get('/prescription', authMiddleware, PrescriptionController.index)

routes.get(
  '/prescription/:prescriptionId',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      prescriptionId: Joi.string().required(),
    }),
  }),
  authMiddleware,
  PrescriptionController.show
)

routes.post(
  '/prescription/create',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      cpf: Joi.string().required(),
      medicament: Joi.array().required(),
    }),
  }),
  authMiddleware,
  PrescriptionController.create
)

routes.put(
  '/prescription/:prescriptionId',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      cpf: Joi.string().required(),
      medicament: Joi.array().required(),
    }),
  }),
  authMiddleware,
  PrescriptionController.update
)

routes.delete(
  '/prescription/:prescriptionId',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      prescriptionId: Joi.string().required(),
    }),
  }),
  authMiddleware,
  PrescriptionController.delete
)

module.exports = routes
