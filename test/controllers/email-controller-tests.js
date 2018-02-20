'use strict'
process.env.MAILGUN_API_KEY = 'MAILGUN_API_KEY'
const expect = require('code').expect
const sinon = require('sinon')
const sinonStubPromise = require('sinon-stub-promise')
sinonStubPromise(sinon)
const EmailService = require('../../app/services/email')
const controller = (new (require('../../app/initializer'))())
const supertest = require('supertest-promised')(controller.getApp())
let emailServiceStub

describe('Email Controller Tests', () => {
  afterEach(() => {
    emailServiceStub.restore()
  })
  it('should send send an email given the template name', () => {
    emailServiceStub = sinon.stub(EmailService.prototype, 'sendEmailByTemplate').returnsPromise().resolves({status: true})
    return supertest.post(`/email/template/test-template`)
      .send({to: 'test@yahoo.com'})
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an.object()
        expect(res.body.status).to.be.an.true()
      })
  })

  it('should send send an email given the template name', () => {
    emailServiceStub = sinon.stub(EmailService.prototype, 'sendEmail').returnsPromise().resolves({status: true})
    return supertest.post(`/email/`)
      .send({to: 'test@yahoo.com', from: 'from@yahoo.com', body: 'the body'})
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an.object()
        expect(res.body.status).to.be.an.true()
      })
  })
})
