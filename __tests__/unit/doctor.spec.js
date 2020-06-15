const bcrypt = require('bcryptjs')
const request = require('supertest')
const app = require('../../src/app')
const DoctorModel = require('../../src/app/models/doctor')

describe('Doctor', () => {
  it('should encrypt doctor password', async () => {
    const doctor = await DoctorModel.create({
      name: 'Paulo Henrique',
      cpf: '24011009113',
      email: 'ph@gmail.com',
      birth: '1996-10-29',
      crm: '24013',
      state_crm: 'DF',
      gender: 'M',
      password: 'phmedico',
    })

    const comparePassword = await bcrypt.compare('phmedico', doctor.password)

    expect(comparePassword).toBe(true)
  })

  it('should not exist doctor', async () => {
    const response = await request(app).post('/auth').send({
      email: 'ph3@gmail.com',
      password: 'phmedico',
    })

    expect(response.status).toBe(404)
  })
})
