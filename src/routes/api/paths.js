/*
 * This is the API router index to create every not view route
 * and implement the customs user paths
*/
const { Router } = require('express')
const { createPath, getPaths, editPath, deletePath } = require('../../data/ActionsPath')

const paths = Router()

let customRouter = null

// Create a new path in the DB
paths.post('/create', (req, res) => {

    const { txtPathname, txtaResponse, sltType, sltMethod } = req.body

    createPath(txtPathname, sltType, sltMethod, txtaResponse)

    res.redirect('/dashboard')

})

// Apply DB changes into runtime
paths.post('/apply', (req, res) => {

    customRouter = new Router()

    const paths = getPaths()

    try {
        paths.forEach(({ route, type, method, response }) => {

            if (method == 'GET')
                custompaths.get(route, (req, res) => {
                    res.status(200).send(response)
                })

            else if (method == 'POST')
                custompaths.post(route, (req, res) => {
                    res.status(200).send(response)
                })

            else throw new Error('Not valid method')

        });

        paths.use('/custom', (req, res, next) => customRouter ? customRouter(req, res, next) :
            ((req, res, next) => {
                res.status(404).json({ error: 'this custom router is disabled' })
            })(req, res, next))

        res.json({ response: "Succesfully applied" })

    } catch (error) {
        res.json({ error })
    }

})


// Disable custom router paths access 
paths.post('/disable', (req, res) => {
    customRouter = null

    res.json({ response: "Succesfully disabled" })
})

// edit an specific path by ID uploading changes
paths.post('/:id', (req, res) => {

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
paths.delete('/:id', (req, res) => {

    deletePath(req.params.id)

    res.status(200).json({ response: 'Succesfully deleted' })

})


module.exports = paths