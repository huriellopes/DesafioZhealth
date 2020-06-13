const Prescricao = require('../models/prescricao')

module.exports = {
  async index(req, res) {
    return res.send({ msg: 'ok', medico: req.medicoName })
  },
  async post(req, res) {},
}
