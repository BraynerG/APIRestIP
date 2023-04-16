const express = require('express')
const { engine } = require('express-handlebars')

const pages = require('./src/routes/client/pages')
const api = require('./src/routes/api/index')

const app = express()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './src/views')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', pages)
app.use('/api', api)

app.get('/', async (req, res) => {
    res.render('index')
})

app.listen(3000)