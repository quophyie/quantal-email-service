'use strict'

const Code = require('code')
const expect = Code.expect
const EmailService = require('../../../app/services/email')
const EmailRepository = require('../../../app/repositories/email')
const Exceptions = require('../../../app/exceptions')
const sinon = require('sinon')
const sinonStubPromise = require('sinon-stub-promise')
const mailgun = require('mailgun-js')({apiKey: 'key-test', domain: 'www.quantalinc.com'})
sinonStubPromise(sinon)
let emailService, emailRepo
let messagesStub, mailgunSendStub, emailRepoStub

describe('Email Service Test', () => {
  beforeEach(() => {
    emailRepo = new EmailRepository()
    emailService = new EmailService(emailRepo, mailgun, 'TOKEN', 'www.domain.com')
    messagesStub = sinon.stub()
    emailRepoStub = sinon.stub()
    mailgunSendStub = sinon.stub()
  })

  afterEach(() => {
    if (messagesStub.restore) { messagesStub.restore() }
    if (emailRepoStub.restore) { emailRepoStub.restore() }
    if (mailgunSendStub.restore) { mailgunSendStub.restore() }
  })

  it('should throw illegal argument exception given null email repo', () => {
    const thrown = () => {
      emailService = new EmailService(null, mailgun, null, 'www.domain.com')
    }

    expect(thrown).to.throw(Exceptions.IllegalArgumentError)
  })

  it('should throw invalid domain exception given null mailgun variable ', () => {
    const thrown = () => {
      emailService = new EmailService(emailRepo, null)
    }

    expect(thrown).to.throw(Exceptions.IllegalArgumentError)
  })

  it('should send email given template name  on sendEmailByTemplate', () => {
    mailgunSendStub = {send: sinon.stub().returnsPromise().resolves({status: true})}
    messagesStub = sinon.stub(mailgun, 'messages').callsFake(() => mailgunSendStub)
    sinon.stub(emailRepo, 'findByTemplateName').returnsPromise().resolves({
      from: 'from@test.com',
      to: 'to@test.com',
      subject: 'subject',
      text: 'text'
    })
    emailService = new EmailService(emailRepo, mailgun, 'TOKEN', 'www.domain.com')
    const prom = emailService.sendEmailByTemplate('test-template', {})
            .then(res => {
              expect(res.status).to.be.an.true()
            })
    return prom
  })

  it('should throw IllegalArgumentError given temlate tokens that do not contain a `to` variable on sendEmailByTemplate', () => {
    mailgunSendStub = {send: sinon.stub().returnsPromise().resolves({status: true})}
    messagesStub = sinon.stub(mailgun, 'messages').callsFake(() => mailgunSendStub)
    emailRepoStub = sinon.stub(emailRepo, 'findByTemplateName').returnsPromise().resolves({
      from: 'from@test.com',
      to: null,
      subject: 'subject',
      text: 'text'
    })
    emailService = new EmailService(emailRepo, mailgun, 'TOKEN', 'www.domain.com')
    const prom = emailService.sendEmailByTemplate('test-template', {})
            .then(null, (thrown) => expect(thrown).to.be.instanceof(Exceptions.IllegalArgumentError))

    return prom
  })

  it('should send email given email details  on sendEmail', () => {
    mailgunSendStub = {send: sinon.stub().returnsPromise().resolves({status: true})}
    messagesStub = sinon.stub(mailgun, 'messages').callsFake(() => mailgunSendStub)
    const emailData = {
      from: 'from@test.com',
      to: 'to@test.com',
      subject: 'subject',
      text: 'text'
    }
    emailService = new EmailService(emailRepo, mailgun, 'TOKEN', 'www.domain.com')
    const prom = emailService.sendEmail(emailData)
      .then(res => {
        expect(res.status).to.be.an.true()
      })

    return prom
  })

  it('should throw IllegalArgumentError given email info that does not contain a `to` variable on sendEmail', () => {
    mailgunSendStub = {send: sinon.stub().returnsPromise().resolves({status: true})}
    messagesStub = sinon.stub(mailgun, 'messages').callsFake(() => mailgunSendStub)
    const emailData = {
      from: 'from@test.com',
      to: null,
      subject: 'subject',
      text: 'text'
    }
    emailService = new EmailService(emailRepo, mailgun, 'TOKEN', 'www.domain.com')
    const prom = emailService.sendEmail(emailData)
      .then(null, (thrown) => expect(thrown).to.be.instanceof(Exceptions.IllegalArgumentError))

    return prom
  })

  it('should throw IllegalArgumentError given email info that does not contain a `from` variable on sendEmail', () => {
    mailgunSendStub = {send: sinon.stub().returnsPromise().resolves({status: true})}
    messagesStub = sinon.stub(mailgun, 'messages').callsFake(() => mailgunSendStub)
    const emailData = {
      from: null,
      to: 'to@test.com',
      subject: 'subject',
      text: 'text'
    }
    emailService = new EmailService(emailRepo, mailgun, 'TOKEN', 'www.domain.com')
    const prom = emailService.sendEmail(emailData)
      .then(null, (thrown) => expect(thrown).to.be.instanceof(Exceptions.IllegalArgumentError))

    return prom
  })
})
