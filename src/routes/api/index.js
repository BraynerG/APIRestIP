/*
 * This is the API router index to create every not view route
 * and implement the customs user paths
*/
const { Router } = require('express')
const { createPath, getPaths, editPath, deletePath } = require('../../helpers/Util')

const router = Router()

let customRouter = null

// Create a new path in the DB
router.post('/paths/create', (req, res) => {

    const { txtPathname, txtaResponse, sltType, sltMethod } = req.body

    createPath(txtPathname, sltType, sltMethod, txtaResponse)

    res.redirect('/dashboard')

})

// Apply DB changes into runtime
router.post('/paths/apply', (req, res) => {

    customRouter = new Router()

    const paths = getPaths()

    try {
        paths.forEach(({ route, type, method, response }) => {

            if (method == 'GET')
                customRouter.get(route, (req, res) => {
                    res.status(200).send(response)
                })

            else if (method == 'POST')
                customRouter.post(route, (req, res) => {
                    res.status(200).send(response)
                })

            else throw new Error('Not valid method')

        });

        router.use('/custom', (req, res, next) => customRouter ? customRouter(req, res, next) :
            ((req, res, next) => {
                res.status(404).json({ error: 'this custom router is disabled' })
            })(req, res, next))

        res.json({ response: "Succesfully applied" })

    } catch (error) {
        res.json({ error })
    }

})


// Disable custom router paths access 
router.post('/paths/disable', (req, res) => {
    customRouter = null

    res.json({ response: "Succesfully disabled" })
})

// edit an specific path by ID uploading changes
router.post('/paths/:id', (req, res) => {

    const {
        txtPathname,
        sltType,
        sltMethod,
        txtaResponse
    } = req.body

    const changes = {
        route: txtPathname,
        type: sltType,
        method: sltMethod,
        response: txtaResponse
    }

    editPath(req.params.id, changes)

    res.redirect('/dashboard')
})

// delete an specific path by ID
router.delete('/paths/:id', (req, res) => {

    deletePath(req.params.id)

    res.status(200).json({ response: 'Succesfully deleted' })

})


module.exports = router