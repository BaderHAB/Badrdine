const { application, query } = require('express');
const express = require('express');
const router = express.Router();
const Product = require('../models/product')
const categories=['general','house','electronic'];
const Store = require('../models/store');


router.get('',  (req,res)=>{
    console.log(req.user)
    res.render('home/homeTest')
})
router.get('/search', (req,res)=>{
    res.send('No results found!');
})
router.post("/search", async (req,res) => {
    const allProduct = await Product.find({ name: { $regex: req.body.q, $options: 'i'}})
    res.render('products/searchResult', {allProduct})
})
router.get('/search/page2', async(req,res)=>{
    const allProduct = await Product.find({ name: { $regex: String(req.body.q), $options: 'i'}})
    res.render('products/nextPage' , {allProduct})
})

router.get('/needto', (req,res)=>{
    res.render('needTo/needTo')
})




module.exports= router;
