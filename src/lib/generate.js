const fs = require('fs')
const path = require('path')

const token = require('./tokenGenerate')

fs.readFile(path.resolve(__dirname, '..', '..', '.env'), 'utf8', (err) => {
  if (err) throw new Error(err)

  fs.writeFile(
    path.resolve(__dirname, '..', '..', '.env'),
    `APP_TOKEN=${token}`,
    { encoding: 'utf8', flag: 'a' },
    (err) => {
      if (err) throw new Error(err)
      console.info('Token Generate')
    }
  )
})
