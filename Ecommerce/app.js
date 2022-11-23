const express = require('express');
const mongoose = require('mongoose');
const path= require('path');
const morgan = require('morgan');
const { STATUS_CODES } = require('http');
const errors= require('./routes/errorHandler')
const home = require('./routes/home')
const login = require('./routes/login')
const register = require('./routes/register')
const app= express();
const AppError =require('./AppError');
const products = require('./models/products')

mongoose.connect('mongodb://127.0.0.1:27017/products',{useNewUrlParser:true, useUnifiedTopology:true});
const db = mongoose.connection;
db.on('error', error=>console.log(error))
db.once('open', ()=>{console.log('Connected to mongoose')})

app.use(morgan('tiny'))
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.set('views', path.join(__dirname, ('views')));
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.get('/', home)

app.get('/login',login)

app.get('/register', register)

app.use('*',errors);

app.listen((process.env.PORT ||3000) , (req,res)=>{
    console.log('Server opened At Port3000')
})