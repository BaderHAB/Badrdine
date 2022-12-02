const express = require('express');
const router = express.Router();
const session = require('express-session');


router.post('/logout',(req,res)=>{
    req.session.user_id=null;
    res.redirect('/login');
})



module.exports= router;