const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = require('../models/user');
/* const bcrypt = require('bcryptjs') */


router.get('/register', (req,res)=>{
    res.render('users/register');
})

router.post('/register', async (req,res)=>{
    try{
    const {password, username, email} =  req.body
    const user = new User({email, username})
    const registerUser = await User.register(user,password);
    req.flash('success','Welcome to Shop2You')
    res.redirect('/')
    }catch(e){
        req.flash('error', e.message)
        res.redirect('/register')
    }
})

module.exports= router;