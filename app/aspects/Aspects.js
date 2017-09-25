/**
 * Created by dman on 25/09/2017.
 */

// import {beforeMethod} from 'aspect.js'
const beforeMethod = require('aspect.js').beforeMethod
class Aspects {
  @beforeMethod({
    classNamePattern: /GiphyService/,
    methodNamePattern: /findOrCreate/
  })
  invokeBeforeMethod (meta) {
    if (!meta) {
      console.log(`Inside of the logger. Called ${meta.className}.${meta.method.name} with args: ${meta.method.args.join(', ')}.`)
    } else {
      console.log(`Inside of the logger. Called blah.`)
    }
  }
}

module.exports = Aspects
