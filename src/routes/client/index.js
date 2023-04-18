const dashboard = require('./dashboard')

/*
 * This is the client pages route to create the basic and dynamic views
 * and preload client info into the render
*/
const index = require('express').Router()

index.use('/dashboard', dashboard)

module.exports = index