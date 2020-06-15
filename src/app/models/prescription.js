const mongoose = require('../../database')

const PrescriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  cpf: {
    type: String,
    require: true,
    unique: true,
  },
  birth: {
    type: Date,
    require: true,
  },
  medicament: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Medicament',
    },
  ],
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Prescription = mongoose.model('Prescription', PrescriptionSchema)

module.exports = Prescription
