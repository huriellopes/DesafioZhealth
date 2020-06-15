const mongoose = require('../../database')

const MedicamentSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  dosage: {
    type: String,
    require: true,
  },
  frequency_use: {
    type: String,
    require: true,
  },
  prescription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prescription',
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Medicament = mongoose.model('Medicament', MedicamentSchema)

module.exports = Medicament
