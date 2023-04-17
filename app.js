// Libs imports
const express = require('express')
const { engine } = require('express-handlebars')

// Env declaration
require('dotenv').config()
const args = process.argv.slice(2)
const PORT = args[0] == 'dev' ? process.env.DEVPORT : process.env.PORT

// Modules import
const pages = require('./src/routes/client/pages')
const api = require('./src/routes/api/index')

// express declaration
const app = express()

// views setup
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './src/views')

// express config
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routers implementation
app.use('/', pages)
app.use('/api', api)

// app init
app.listen(PORT, () => {
    console.log('Listening on PORT:', PORT)
})