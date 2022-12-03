const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = require('../models/user');
const bcrypt = require('bcryptjs')
const session = require('express-session');

router.get('/login', (req,res)=>{
    res.render('login/login')
})

router.post('/login', async(req,res)=>{
    const {password, username} = req.body
    const user = await User.findOne({username})
    if(!user){
        res.render('login/login')
    }else{
        const loginRes = await bcrypt.compare(password, user.password)
        if(loginRes){
            req.session.user_id = user._id;
            res.redirect('/stores/new')
        }else{
            res.redirect('/login')
        }  
    } 
})



module.exports= router;