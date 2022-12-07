const express = require('express');
const router = express.Router();
const passport = require('passport')


router.get('/',  (req,res)=>{
    console.log(req.user)
    res.render('home/home')
})



module.exports= router;
