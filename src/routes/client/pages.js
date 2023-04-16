const router = require('express').Router()
const { getPaths, getPath, createPath } = require('../../helpers/Util')

router.get('/dashboard/paths/new', (req, res) => {

    res.render('new')

})

router.get('/dashboard', (req, res)=> {
    
    res.render('dashboard',{paths:getPaths().map((path,i)=>({...path, ID:i}))})
})

router.get('/dashboard/paths/:id', (req,res)=>{

    res.render('edit',{...getPath(req.params.id), ID:req.params.id})

})

module.exports = router