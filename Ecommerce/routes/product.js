const express = require('express');
const router = express.Router();
const Product = require('../models/product')
const categories=['general','house','electronic'];
const methodOverride= require('method-override');
const Store = require('../models/store');


router.get('/products', async (req,res)=>{
    const products = await Product.find({})
    res.render('products/index', {products}) 
})

router.get('/products/new', (req,res)=>{
    res.render('products/new', {categories});
})

router.post('/products', async(req,res)=>{
    const newProduct=  new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
})

router.get('/products/:id', async (req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id).populate('store', 'name')
    console.log(product)
    res.render('products/details', {product});
})

router.get('/products/:id/edit', async(req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', {product});

}) 

router.put('/products/:id', async(req,res)=>{
    const {id} = req.params;
    const product= await Product.findByIdAndUpdate(id, req.body, {runValidators:true});
    res.redirect(`/products/${product._id}`)
})

module.exports= router;