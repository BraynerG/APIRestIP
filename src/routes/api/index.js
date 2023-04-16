const { Router } = require('express')
const { createPath, getPaths, editPath, deletePath } = require('../../helpers/Util')

const router = Router()

let customRouter = null

router.post('/paths/create', (req, res) => {

    const { txtPathname, txtaResponse, sltType, sltMethod } = req.body

    createPath(txtPathname, sltType, sltMethod, txtaResponse)

    /*
    customRouter = new Router()
    customRouter.post(txtPathname, (req,res)=>{
        res.json(txtaResponse)
    })
    
    router.use('/custom', (req,res,next) => customRouter(req,res,next) )
    */

    res.redirect('/dashboard')

})

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

        router.use('/custom', (req, res, next) => customRouter(req, res, next))
        res.json({ response: "Succesfully applied" })

    } catch (error) {
        res.json({ error })
    }

})

router.post('/paths/disable', (req, res) => {
    customRouter = null

    res.json({ response: "Succesfully disabled" })
})

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

router.delete('/paths/:id', (req, res) => {

    deletePath(req.params.id)

    res.status(200).json({ response: 'Succesfully deleted' })

})


module.exports = router