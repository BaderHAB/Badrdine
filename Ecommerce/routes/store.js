const express = require('express');
const router = express.Router();
const Store = require('../models/store');
const Product = require('../models/product');
const categories=['general','house','electronic'];
const flash = require('connect-flash')



router.get('', async (req,res)=>{
    const stores = await Store.find({});
    res.render('stores/index', {stores})
})

router.get('/new', (req,res) =>{
    if(!req.session.user_id){
        return res.render('needTo/needTo');
    }else{
        res.render('stores/new')
    }
})

router.post('', async (req,res)=>{
    const store =  new Store(req.body);
    console.log(req.body)
    await store.save();
    req.flash('success', 'Store created succesfully!')
    res.redirect('/stores')
})

router.delete('/:id', async(req,res)=>{
    const store = await Store.findByIdAndDelete(req.params.id)
    res.redirect('/stores')
}) 

router.get('/:id', async(req, res)=>{
    try{
    const {id} = req.params;
    console.log(req.params)
    const store = await Store.findById(id).populate('products');
    res.render('stores/show', {store})
    }catch{
    res.render('error404')
    }
})



router.get('/:id/product/new', async(req,res)=>{
    const {id}= req.params
    const store = await Store.findById(id);
    res.render('products/new', {categories, store})
})

router.post('/:id/products', async(req,res)=>{ 
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