const request = require('supertest')
const app = require('../../src/app')

describe('Authentication', () => {
  it('should authenticate with valid crendentials', async () => {
    const response = await request(app).post('/auth').send({
      email: 'ph@gmail.com',
      password: 'phmedico',
    })

    expect(response.status).toBe(200)
  })

  it('should not authenticate with invalid crendentials', async () => {
    const response = await request(app).post('/auth').send({
      email: 'ph@gmail.com',
      password: 'phmedico123',
    })

    expect(response.status).toBe(400)
  })

  it('should return jwt token when authenticated', async () => {
    const response = await request(app).post('/auth').send({
      email: 'ph@gmail.com',
      password: 'phmedico',
    })

    expect(response.body).toHaveProperty('token')
  })

  it('should be able to access private routes when authenticated', async () => {
    const response = await request(app).post('/auth').send({
      email: 'ph@gmail.com',
      password: 'phmedico',
    })

    expect(response.body).toHaveProperty('token')
  })

  it('should be able to access private routes when authenticated', async () => {
    const response = await request(app)
      .get('/prescription')
      .set(
        'Authorization',
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTZlYWE3Yjc2NjA0MTZmYzM4MGE2MyIsIm5hbWUiOiJQYXVsbyBIZW5yaXF1ZSIsImNwZiI6IjI0MDExMDA5MTEzIiwiY3JtIjoiMjQwMSIsInN0YXRlX2NybSI6IkRGIiwiaWF0IjoxNTkyMTkxOTY3LCJleHAiOjE1OTIyNzgzNjd9.QKtRPwfHkf7gOhTtuR8qtNj2t_u-FJkPNqZ6Tg3RoCk`
      )

    expect(response.status).toBe(200)
  })

  it('should not be able to access private routes when not authenticated', async () => {
    const response = await request(app).get('/prescription')

    expect(response.status).toBe(401)
  })

  it('should not be able to access private routes with invalid jwt token', async () => {
    const response = await request(app)
      .get('/prescription')
      .set(
        'Authorization',
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTZlYWE3Yjc2NjA0MTZmYzM4MGE2MyIsIm5hbWUiOiJQYXVsbyBIZW5yaXF1ZSIsImNwZiI6IjI0MDExMDA5MTEzIiwiY3JtIjoiMjQwMSIsInN0YXRlX2NybSI6IkRGIiwiaWF0IjoxNTkyMTkxOTY3LCJleHAiOjE1OTIyNzgzNjd9.QKtRPwfHkf7gOhTtuR8qtNj2t_u-FJkPNqZ6Tg3Rode`
      )

    expect(response.status).toBe(401)
  })
})
