const { application, query } = require('express');
const express = require('express');
const router = express.Router();
const Product = require('../models/product')
const categories=['general','house','electronic'];
const Store = require('../models/store');


router.get('',  (req,res)=>{
    console.log(req.user)
    res.render('home/home')
})
router.get('/search', (req,res)=>{
    res.send('heyyy');
})
router.post("/search", async (req,res) => {
    const allProduct = await Product.find({ name: { $regex: req.body.q, $options: 'i'}})
    res.render('products/searchResult', {allProduct})
})




module.exports= router;
