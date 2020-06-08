const express = require('express')
const apiRouter = require('./api-router')
const authRouter = require('../auth/auth-router')
const configMiddleWare = require('./config-middleware')

const server = express()

configMiddleWare(server)

server.use('/api', apiRouter)
server.use('/api/auth', authRouter)

module.exports = server
