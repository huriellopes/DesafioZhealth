const mongoose = require('../../database')
const bcryptjs = require('bcryptjs')

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
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
  birth: {
    type: Date,
    required: true,
  },
  crm: {
    type: String,
    required: true,
    unique: true,
  },
  state_crm: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetExpires: {
    type: Date,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

DoctorSchema.pre('save', async function (next) {
  const hash = await bcryptjs.hash(this.password, 10)

  this.password = hash

  next()
})

const Doctor = mongoose.model('Doctor', DoctorSchema)

module.exports = Doctor
