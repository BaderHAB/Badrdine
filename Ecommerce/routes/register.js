const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = require('../models/user');
const bcrypt = require('bcryptjs')




router.get('/register', (req,res)=>{
    res.render('register/register');
})

router.post('/register', async (req,res)=>{
    const {password, username, email} =  req.body
    const usedEmail = await User.findOne({email:email})
    if(!usedEmail){
        const hash = await bcrypt.hashSync(password, 12);
        const user = new User({
            username,
            password:hash,
            email
        })
        await user.save();
        req.session.user_id = user._id;
        res.redirect('/') 
    }else{
        res.redirect('/register')
    }
})

module.exports= router;