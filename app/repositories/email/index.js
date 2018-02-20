'use strict'
const {promisify} = require('util')
const fs = require('fs')
const readFileAsync = promisify(fs.readFile)
const Path = require('path')
const BaseRepository = require('qute-bookshelf-repository')
const TemplateInfo = require('../../models/template-info')
const Exceptions = require('../../exceptions')
const appRoot = require('app-root-path')
const TEMPLATES_DIR_PATH = '/app/templates/email'

class EmailRepository extends BaseRepository {
  constructor () {
    super(TemplateInfo)
  }

  findByTemplateName (template) {
    const filepath = `${Path.join(appRoot.path, TEMPLATES_DIR_PATH, template)}.html`
    let templateInfo

    return this.findWhere({name: template})
          .then(tplInfoDb => {
            templateInfo = tplInfoDb
            return templateInfo
          })
          .then(tplInfo => readFileAsync(filepath, {encoding: 'utf8'}))
          .then(templ => {
            return Object.assign({}, templateInfo, {text: templ})
          })
          .catch(err => {
            const ex = new Exceptions.NotFoundError(err.message)
            //throw ex
            return Promise.reject(ex)
          })
  }
}
module.exports = EmailRepository
