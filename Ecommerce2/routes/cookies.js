const express = require('express');
const router = express.Router();

router.get('/setname', (req,res)=>{
    res.cookie('name', 'Bader');
    res.send('Cookie')
})