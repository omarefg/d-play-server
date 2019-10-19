const express = require('express')
const helmet = require('helmet')
const debug = require('debug')('app:server')

const app = express()
const { config } = require('./config')

// Body Parser
app.use(express.json())
app.use(helmet())

// Routes

app.listen(config.port, () => {
    debug(`Listening http://localhost:${config.port}`)
})
