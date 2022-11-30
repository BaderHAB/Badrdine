const express = require('express');
const router = express.Router();
const Store = require('../models/store');
const Product = require('../models/product');
const categories=['general','house','electronic'];


router.get('/stores', async (req,res)=>{
    const stores = await Store.find({});
    res.render('stores/index', {stores})
})

router.get('/stores/new', (req,res) =>{
    res.render('stores/new')
})

router.post('/stores', async (req,res)=>{
    const store =  new Store(req.body);
    await store.save();
    res.redirect('/stores')
})

router.delete('/stores/:id', async(req,res)=>{
    const store = await Store.findByIdAndDelete(req.params.id)
    res.redirect('/stores')
}) 

router.get('/stores/:id', async(req, res)=>{
    const {id} = req.params;
    const store = await Store.findById(id).populate('products');
    res.render('stores/show', {store})
})



router.get('/stores/:id/product/new', async(req,res)=>{
    const {id}= req.params
    const store = await Store.findById(id);
    res.render('products/new', {categories, store})
})

router.post('/stores/:id/products', async(req,res)=>{4
    const {id} = req.params;
    const store = await Store.findById(id);
    const {name, price, category}= req.body
    const product = new Product({name, price, category});
    store.products.push(product);
    product.store = store;
    await store.save();
    await product.save();
    res.redirect(`/stores/${id}`)
})

module.exports= router;