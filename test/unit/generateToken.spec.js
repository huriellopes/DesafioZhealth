const generateToken = require('../../src/lib/tokenGenerate')

describe('Generate Token API', () => {
  it('should generate token', () => {
    const token = generateToken()

    expect(token).toHaveLength(8)
  })
})
