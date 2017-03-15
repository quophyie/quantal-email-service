'use strict'

const sharedGlobals = require('./lib/shared-globals')
if (process.env.NODE_ENV !== 'test') {
    sharedGlobals.DB = Object.freeze(require('./lib/schemas')({
        DATABASE_URL: process.env.DATABASE_URL
    }))
}
const express = require('express'),
    bodyParser = require('body-parser').json(),
    cookieParser = require('cookie-parser'),
    app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app
.use(bodyParser)
.listen(process.env.PORT, function () {
    console.log(`Listening on port ${process.env.PORT}`)
})

module.exports = app
