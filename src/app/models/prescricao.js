const mongoose = require('../../database')

const PrescricaoSchema = new mongoose.Schema({
  crm_medico: {
    type: String,
    require: true,
    unique: true,
  },
  registration_status_medico: {
    type: String,
    require: true,
  },
  cpf_medico: {
    type: String,
    require: true,
    unique: true,
  },
  nome_medico: {
    type: String,
    require: true,
  },
  cpf_paciente: {
    type: String,
    require: true,
    unique: true,
  },
  nome_paciente: {
    type: String,
    require: true,
  },
  data_nascimento_paciente: {
    type: Date,
    require: true,
  },
  medicamentos: {
    type: Array,
    require: true,
  },
  quantidade: {
    type: Number,
    require: true,
  },
  dosagem: {
    type: String,
    require: true,
  },
  frequencia_uso: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Prescricao = mongoose.model('Prescricao', PrescricaoSchema)

module.exports = Prescricao
