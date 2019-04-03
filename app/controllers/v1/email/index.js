'use strict'
const celebrate = require('celebrate').celebrate
const Joi = require('celebrate').Joi
const emailFacade = require('../../../facades/email/index')
const templateSchema = {
  body: {
    to: Joi.alternatives().try(Joi.string().email(), Joi.array().items(Joi.string().email())),
    from: Joi.string().email().optional()
  },
  params: {
    templateName: Joi.string()
  }
}

const emailTemplateSchema = {
  body: {
    to: Joi.alternatives().try(Joi.string().email(), Joi.array().items(Joi.string().email())),
    from: Joi.string().email().required(),
    body: Joi.string(),
    subject: Joi.string().optional(),
    asHtml: Joi.boolean().optional()
  }
}

module.exports = (router) => {
  router.post('/template/:templateName', celebrate(templateSchema), (req, res, next) => {
    emailFacade.sendEmailByTemplate(req.params.templateName, req.body)
      .then((result) => res.send(result))
      .catch(next)
  })

  router.post('/', celebrate(emailTemplateSchema), (req, res, next) => {
    emailFacade.sendEmail(req.body)
      .then((result) => res.send(result))
      .catch(next)
  })
}
