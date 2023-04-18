const paths = require('express').Router()
const { getPath, getPaths } = require('../../../data/ActionsPath')


// Admin dashboard to manage every path in a custom router
router.get('/', (req, res)=> {
    
    res.render('dashboard',{paths:getPaths().map((path,i)=>({...path, ID:i}))})
})

// View to create a new route
paths.get('/new', (req, res) => {

    res.render('new')

})

// Edit an specific path by ID
paths.get('/:id', (req,res)=>{

    res.render('edit',{...getPath(req.params.id), ID:req.params.id})

})

module.exports = paths