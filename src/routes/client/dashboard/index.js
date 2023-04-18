const dashboard = require('express').Router()
const { isAuth } = require('../../middlewares/authMiddlewares')
const paths = require('./paths')

dashboard.use(isAuth)
dashboard.use('/paths',paths)

module.exports = dashboard