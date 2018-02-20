
'use strict'
const mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_API_KEY, domain: 'www.quantalinc.com'})
const emailRepository = new (require('../../repositories/email'))()
const emailService = new (require('../../services/email'))(emailRepository, mailgun)

module.exports = Object.freeze({
  sendEmailByTemplate (templateName, templateTokens) {
    return emailService.sendEmailByTemplate(templateName, templateTokens)
  },
  sendEmail (emailInfo) {
    return emailService.sendEmail(emailInfo)
  }
})
