'use strict'
const Code = require('code')
const expect = Code.expect
const EmailRepository = require('../../app/repositories/email')
const BaseRepository = require('qute-bookshelf-repository')
const Exceptions = require('../../app/exceptions')
const sinon = require('sinon')
const sinonStubPromise = require('sinon-stub-promise')
//const Initalizer = new require('../../app/initializer')()

const Initializer = require('../../app/initializer')

sinonStubPromise(sinon)
let emailRepo = null
let emailRepoFindWhereStub
const templateDbInfo = {
  name: 'test-template',
  from: 'test@quantal.com',
  subject: 'test subject'
}
describe('Email Repository Tests', () => {
  beforeEach(() => {
    Initializer.getLoggerAspect().disable()
    emailRepo = new EmailRepository()
    emailRepoFindWhereStub = sinon.stub(emailRepo, 'findWhere').returnsPromise().resolves([templateDbInfo])
  })

  afterEach(() => {
    emailRepoFindWhereStub.restore()
  })

  it('should return a template given the template name', () => {
    return emailRepo.findByTemplateName('test')
          .then(result => {
            expect(result).to.include(templateDbInfo)
            expect(result.text).to.exist()
          })
  })
  it('should throw a NotFoundException  given template name that does not exist', () => {
    return emailRepo.findByTemplateName('notfound')
            .catch(error => expect(error).to.be.an.instanceof(Exceptions.NotFoundError))
  })
})
