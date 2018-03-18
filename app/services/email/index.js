'use strict'
const _ = require('lodash')
const Exceptions = require('../../../app/exceptions')
const EmailRepository = require('../../../app/repositories/email')
const Hoek = require('hoek')
const logger = require('../../logger').logger
const Events = require('../../events')

class EmailService {
  constructor (emailRepository, mailgun) {
    Hoek.assert((!_.isEmpty(mailgun)), new Exceptions.IllegalArgumentError('mailgun cannot be null  and must be an instance of Mailgun'))
    Hoek.assert((emailRepository !== null && emailRepository !== undefined && (emailRepository instanceof EmailRepository)), new Exceptions.IllegalArgumentError('emailRepository cannot be null  and must be an instance of EmailRepository'))
    this.mailgun = mailgun
    this.emailRepository = emailRepository
  }

  sendEmailByTemplate (templateName, templateTokens) {
    return this.emailRepository.findByTemplateName(templateName)
          .then(template => {
            let to = !_.isEmpty(templateTokens.to) ? templateTokens.to : template.to
            // TODO REMOVE when we have verified domain on mailgun
            if (!_.isEmpty(process.env.USE_MAILGUN_IN_TEST_MODE) && process.env.USE_MAILGUN_IN_TEST_MODE.toLowerCase() === 'true') {
              to = 'quophyie@yahoo.com'
            }
            let from = !_.isEmpty(templateTokens.from) ? templateTokens.from : template.from
            if (!to) {
              const ex = new Exceptions.IllegalArgumentError(`the 'to' variable was mot found in the supplied templateTokens param or template info in db. please supply the 'to' value`)
              logger.error({subEvent: Events.EMAIL_TEMPLATE_RETRIEVE}, ex)

              return Promise.reject(ex)
            }
            const emailDetails = {
              from: from,
              to: to,
              subject: template.subject,
              text: template.text
            }
            logger.info(Object.assign({}, {templateName}, emailDetails, {subEvent: Events.EMAIL_TEMPLATE_RETRIEVE}), 'sending email to %s', to)
            return this.mailgun.messages().send(emailDetails)
          })
  }

  sendEmail (template) {
    if (!template.to) {
      const ex = new Exceptions.IllegalArgumentError(`the 'to' variable was mot found in the supplied templateTokens param or template info in db. please supply the 'to' value`)
      logger.error({subEvent: Events.EMAIL_TEMPLATE_RETRIEVE}, ex)

      return Promise.reject(ex)
    }

    if (!template.from) {
      const ex = new Exceptions.IllegalArgumentError(`the 'from' variable was mot found in the supplied templateTokens param or template info in db. please supply the 'from' value`)
      logger.error({subEvent: Events.EMAIL_TEMPLATE_RETRIEVE}, ex)

      return Promise.reject(ex)
    }

    const emailDetails = {
      from: template.from,
      to: template.to,
      subject: template.subject
    }
    if (!_.isEmpty(template.asHtml) && template.asHtml === true){
      emailDetails.html = template.body
    } else {
      emailDetails.text = template.body
    }
    logger.info(Object.assign({}, emailDetails, {subEvent: Events.EMAIL_TEMPLATE_RETRIEVE}), 'sending email to %s', template.to)
    return this.mailgun.messages().send(emailDetails)
  }
}

module.exports = EmailService
