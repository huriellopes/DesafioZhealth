const Doctor = require('../models/doctor')
const bcrypt = require('bcryptjs')
const jwt = require('../middlewares/generateJWT')
const crypto = require('../../lib/tokenGenerate')
const mailer = require('../../modules/mailer')

module.exports = {
  async post(req, res) {
    const {
      name,
      cpf,
      email,
      birth,
      crm,
      state_crm,
      gender,
      password,
      repeat_password,
    } = req.body

    try {
      if (await Doctor.findOne({ email }))
        return res.status(400).send({ error: 'Doctor already exists' })

      if (password !== repeat_password)
        return res.status(400).send({ error: 'Password Mismatch' })

      const doctor = await Doctor.create({
        name,
        cpf,
        email,
        birth,
        crm,
        state_crm,
        gender,
        password,
      })

      doctor.password = undefined

      return res.status(201).send({
        success: 'Doctor register success',
        doctor,
        token: jwt({
          id: doctor.id,
          name: doctor.name,
          cpf: doctor.cpf,
          crm: doctor.crm,
          state_crm: doctor.state_crm,
        }),
      })
    } catch (err) {
      return res.status(400).send({ error: 'Registration Failed' })
    }
  },
  async auth(req, res) {
    const { email, password } = req.body
    try {
      const doctor = await Doctor.findOne({ email }).select('+password')

      if (!doctor) return res.status(404).send({ error: 'Doctor Not Found' })

      if (!(await bcrypt.compare(password, doctor.password)))
        return res.status(400).send({ error: 'Invalid password' })

      doctor.password = undefined

      return res.send({
        doctor,
        token: jwt({
          id: doctor.id,
          name: doctor.name,
          cpf: doctor.cpf,
          crm: doctor.crm,
          state_crm: doctor.state_crm,
        }),
      })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ error: 'Authentication Failed' })
    }
  },
  async forgot_password(req, res) {
    const { email } = req.body
    try {
      const doctor = await Doctor.findOne({ email })

      if (!doctor) return res.status(404).send({ error: 'Doctor not found' })

      const token = crypto

      const now = new Date()
      now.setHours(now.getHours() + 1)

      await Doctor.findByIdAndUpdate(
        doctor.id,
        {
          $set: {
            passwordResetToken: token,
            passwordResetExpires: now,
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
    const { email, token, password, repeat_password } = req.body
    try {
      const doctor = await Doctor.findOne({ email }).select(
        '+passwordResetToken passwordResetExpires'
      )

      if (!doctor) return res.status(404).send({ error: 'Doctor not Found' })

      if (token !== doctor.passwordResetToken)
        return res.status(400).send({ error: 'Token invalid' })

      if (password !== repeat_password)
        return res.status(400).send({ error: 'Password Mismatch' })

      const now = new Date()

      if (now > doctor.passwordResetExpires)
        return res
          .status(400)
          .send({ error: 'Token expired, generate a new one' })

      doctor.password = password

      doctor.save()

      return res.status(200).send({ success: 'Password updated success' })
    } catch (err) {
      return res
        .status(400)
        .send({ error: 'Error on reset password, try again' })
    }
  },
}
