/*
 * This is the client pages route to create the basic and dynamic views
 * and preload client info into the render
*/
const router = require('express').Router()
const { getPaths, getPath, createPath } = require('../../helpers/Util')

// View to create a new route
router.get('/dashboard/paths/new', (req, res) => {

    res.render('new')

})

// Admin dashboard to manage every path in a custom router
router.get('/dashboard', (req, res)=> {
    
    res.render('dashboard',{paths:getPaths().map((path,i)=>({...path, ID:i}))})
})

// Edit an specific path by ID
router.get('/dashboard/paths/:id', (req,res)=>{

    res.render('edit',{...getPath(req.params.id), ID:req.params.id})

})

module.exports = router