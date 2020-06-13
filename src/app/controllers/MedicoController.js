const Medico = require('../models/medico')
const bcrypt = require('bcryptjs')
const jwt = require('../middlewares/generateJWT')
const crypto = require('../../lib/tokenGenerate')
const mailer = require('../../modules/mailer')

module.exports = {
  async post(req, res) {
    const { email } = req.body

    try {
      if (await Medico.findOne({ email }))
        return res.status(400).send({ error: 'Doctor already exists' })

      const medico = await Medico.create(req.body)

      medico.senha = undefined

      return res.status(201).send({
        success: 'Doctor register success',
        medico,
        token: jwt({
          id: medico.id,
          name: medico.name,
          cpf: medico.cpf,
          crm: medico.crm,
          registration_state: medico.registration_status,
        }),
      })
    } catch (err) {
      return res.status(400).send({ error: 'Registration Failed' })
    }
  },
  async auth(req, res) {
    const { email, senha } = req.body
    try {
      const medico = await Medico.findOne({ email }).select('+senha')

      if (!medico) return res.status(404).send({ error: 'Doctor Not Found' })

      if (!(await bcrypt.compare(senha, medico.senha)))
        return res.status(400).send({ error: 'Invalid password' })

      medico.senha = undefined

      return res.send({
        medico,
        token: jwt({
          id: medico.id,
          name: medico.name,
          cpf: medico.cpf,
          crm: medico.crm,
          registration_state: medico.registration_status,
        }),
      })
    } catch (err) {
      return res.status(400).send({ error: 'Authentication Failed' })
    }
  },
  async forgot_password(req, res) {
    const { email } = req.body
    try {
      const medico = await Medico.findOne({ email })

      if (!medico) return res.status(404).send({ error: 'Doctor not found' })

      const token = crypto

      const now = new Date()
      now.setHours(now.getHours() + 1)

      await Medico.findByIdAndUpdate(
        medico.id,
        {
          $set: {
            senhaResetToken: token,
            senhaResetExpires: now,
          },
        },
        { new: true, useFindAndModify: false }
      )

      mailer.sendMail(
        {
          to: email,
          from: 'contato@zhealth.com.br',
          subject: 'Forgot Password',
          template: 'auth/forgot_password',
          context: { token },
        },
        (err) => {
          if (err)
            return res
              .status(400)
              .send({ error: 'Cannot send forgot password email' })

          return res.status(200).send({ success: 'Send Email Success!' })
        }
      )
    } catch (err) {
      return res
        .status(400)
        .status({ error: 'Error on forgot password, try again' })
    }
  },

  async reset(req, res) {
    const { email, token, senha, confirmar_senha } = req.body
    try {
      const medico = await Medico.findOne({ email }).select(
        '+senhaResetToken senhaResetExpires'
      )

      if (!medico) return res.status(404).send({ error: 'Medico not Found' })

      if (token !== medico.senhaResetToken)
        return res.status(400).send({ error: 'Token invalid' })

      if (senha !== confirmar_senha)
        return res.status(400).send({ error: 'Password not identic' })

      const now = new Date()

      if (now > medico.senhaResetExpires)
        return res
          .status(400)
          .send({ error: 'Token expired, generate a new one' })

      medico.senha = senha

      medico.save()

      return res.status(200).send({ success: 'Password updated success' })
    } catch (err) {
      return res
        .status(400)
        .send({ error: 'Error on reset password, try again' })
    }
  },
}
