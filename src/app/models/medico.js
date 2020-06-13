const mongoose = require('../../database')
const bcryptjs = require('bcryptjs')

const MedicoSchema = new mongoose.Schema({
  cpf: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  crm: {
    type: String,
    required: true,
    unique: true,
  },
  registration_status: {
    type: String,
    required: true,
  },
  sexo: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
    select: false,
  },
  senhaResetToken: {
    type: String,
    select: false,
  },
  senhaResetExpires: {
    type: Date,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

MedicoSchema.pre('save', async function (next) {
  const hash = await bcryptjs.hash(this.senha, 10)

  this.senha = hash

  next()
})

const Medico = mongoose.model('Medico', MedicoSchema)

module.exports = Medico
