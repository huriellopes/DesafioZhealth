const Prescription = require('../models/prescription')
const Medicament = require('../models/medicament')

module.exports = {
  async index(req, res) {
    try {
      const prescriptions = await Prescription.find().populate([
        'doctor',
        'medicament',
      ])

      if (prescriptions < 0)
        return res.status(404).send({ error: 'Prescriptions not found' })

      return res.status(200).send({ prescriptions })
    } catch (err) {
      return res.status(400).send({ error: 'Error loading prescription' })
    }
  },
  async create(req, res) {
    const { name, cpf, birth, medicament } = req.body
    try {
      const prescription = await Prescription.create({
        name,
        cpf,
        birth,
        doctor: req.medicoId,
      })

      await Promise.all(
        medicament.map(async (medicine) => {
          const prescriptionMedic = new Medicament({
            ...medicine,
            prescription: prescription._id,
          })

          await prescriptionMedic.save()

          prescription.medicament.push(prescriptionMedic)
        })
      )

      await prescription.save()

      return res.status(201).send({ prescription })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ error: 'Prescrption failed registration' })
    }
  },
  async show(req, res) {
    try {
      const prescription = await Prescription.findById(
        req.params.prescriptionId
      ).populate(['doctor', 'medicament'])

      if (prescription < 0)
        return res.status(404).send({ error: 'Prescription not found' })

      return res.status(200).send({ prescription })
    } catch (err) {
      return res.status(400).send({ error: 'Error showing prescription' })
    }
  },
  async update(req, res) {
    const { name, cpf, birth, medicament } = req.body
    try {
      const prescription = await Prescription.findByIdAndUpdate(
        req.params.prescriptionId,
        {
          name,
          cpf,
          birth,
        },
        { new: true }
      )

      prescription.medicament = []

      await Medicament.deleteMany({ prescription: prescription._id })

      await Promise.all(
        medicament.map(async (medicine) => {
          const prescriptionMedic = new Medicament({
            ...medicine,
            prescription: prescription._id,
          })

          await prescriptionMedic.save()

          prescription.medicament.push(prescriptionMedic)
        })
      )

      await prescription.save()

      return res.status(201).send({ prescription })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ error: 'Prescrption failed updated' })
    }
  },
  async delete(req, res) {
    try {
      await Prescription.findByIdAndRemove(req.params.prescriptionId)

      return res.status(200).send({ error: 'Deleting prescription success' })
    } catch (err) {
      return res.status(400).send({ error: 'Error deleting prescription' })
    }
  },
}
