const { Router } = require('express')
const { authUser, getUser } = require('../../data/ActionsUser')

const auth = Router()

auth.post('/login', (req, res) => {

    if (!authUser({ ...req.body })) {
        res.status(401).redirect('/login')
        return
    }

    // send client token (Replace!!!)
    req.session.username = getUser(req.body.username).username

    res.redirect('/dashboard')

})