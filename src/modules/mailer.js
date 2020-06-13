const path = require('path')
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')

const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

const handlebarOptions = {
  viewEngine: {
    extName: '.html',
    partialsDir: path.resolve('./src/app/resources/mail/'),
    layoutsDir: path.resolve('./src/app/resources/mail/'),
    defaultLayout: null,
  },
  viewPath: path.resolve('./src/app/resources/mail/'),
  extName: '.html',
}

transport.use('compile', hbs(handlebarOptions))

module.exports = transport
