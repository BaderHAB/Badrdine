const express = require('express');
const mongoose = require('mongoose');
const path= require('path');
const morgan = require('morgan');
const { STATUS_CODES } = require('http');
const app= express();
const methodOverride= require('method-override');

//ROUTER
const errors= require('./routes/errorHandler')
const home = require('./routes/home')
const login = require('./routes/login')
const register = require('./routes/register')
const products = require('./routes/product')
const stores = require('./routes/store')

//MODELS
const Store = require('./models/store');
const Product = require('./models/product');
const categories=['general','house','electronic'];

//DB CONNECTION
mongoose.connect('mongodb://127.0.0.1:27017/storetest3',{useNewUrlParser:true, useUnifiedTopology:true});
const db = mongoose.connection;
db.on('error', error=>console.log(error))
db.once('open', ()=>{console.log('Connected to mongoose')})


//SETTINGS
app.use(morgan('tiny'))
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.set('views', path.join(__dirname, ('views')));
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));



//ROUTES DEPLOYMENT
app.use('/', home)

app.use('/',login)

app.use('/', register)

//PRODUCT
app.use('/',products)

//STORE
app.use('/', stores)

//Error Handling
app.use('*',errors);

//Deploy
app.listen((process.env.PORT ||3000) , (req,res)=>{
    console.log('Server opened At Port 3000')
})