const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = require('../models/user');
const passport = require('passport')
const session = require('express-session');


router.get('/login', (req,res)=>{
    res.render('users/login')
})

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect:'/login'}), async(req,res)=>{
    req.flash('success','Welcome back')
    res.redirect('/stores')

    /* const user = await User.findOne({username})
    if(!user){
        res.render('users/login')
    }else{
        const loginRes = await bcrypt.compare(password, user.password)
        if(loginRes){
            req.session.user_id = user._id;
            res.redirect('/stores/new')
        }else{
            res.redirect('/login')
        }  
    }  */
})



module.exports= router;