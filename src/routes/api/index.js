/*
 * This is the API router index to create every not view route
 * and implement the customs user paths
*/
const { Router } = require('express')
const paths = require('./paths')

const router = Router()

router.use('/paths',paths)

module.exports = router