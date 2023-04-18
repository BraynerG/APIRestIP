const { getUser } = require('../data/ActionsUser')

const isAuth = (req, res, next) => {

    if( !req.session.name ) res.redirect('/login')

    if( !getUser( req.session.name ) ) res.redirect('/login')
    
    next()
    
}

const isNAuth = ( req, res, next ) => {

    if( req.session.name ) res.redirect('/dashboard')

    if( !getUser( req.session.name ) ) res.redirect('/dashboard')
    
    next()

}

module.exports = { isAuth, isNAuth }