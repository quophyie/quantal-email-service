'use strict'
process.env.MAILGUN_API_KEY = 'MAILGUN_API_KEY'
const Code = require('code')
const expect = Code.expect
const sinon = require('sinon')
const sinonStubPromise = require('sinon-stub-promise')
sinonStubPromise(sinon)
const emailFacade = require('../../app/facades/email')
const EmailService = require('../../app/services/email')
const Initializer = require('../../app/initializer')
let serviceStub

describe('Email Facade Tests', () => {
  beforeEach(() => {
    Initializer.getLoggerAspect().disable()
  })

  afterEach(() => {
    serviceStub.restore()
  })

  it('Should send email given email template name on sendEmailByTemplate', () => {
    serviceStub = sinon.stub(EmailService.prototype, 'sendEmailByTemplate').returnsPromise().resolves({status: true})
    const prom = emailFacade.sendEmailByTemplate('template', {to: 'test@testcompany.com'})
      .then((res) => {
        expect(res.status).to.be.true()
      })
        .catch((err) => Promise.reject(err))

    return prom
  })

  it('Should send email given email template name', () => {
    serviceStub = sinon.stub(EmailService.prototype, 'sendEmail').returnsPromise().resolves({status: true})
    const prom = emailFacade.sendEmail('template', {to: 'test@testcompany.com', from: 'from@test.com'})
      .then((res) => {
        expect(res.status).to.be.true()
      })
      .catch((err) => Promise.reject(err))
    return prom
  })
})
