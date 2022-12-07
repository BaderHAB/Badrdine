const express = require('express');
const mongoose = require('mongoose');
const path= require('path');
const morgan = require('morgan');
const { STATUS_CODES } = require('http');
const app= express();
const methodOverride= require('method-override');
const CookieParser = require('cookie-parser');
const session = require('express-session');
const sessionOption = {secret: 'notsecret', resave:false, saveUninitialized: true}
const flash = require('connect-flash')
const User = require('./models/user');
const passport = require('passport')
const LocalStrategy = require('passport-local')
const catchAsync = require('./utils/catchAsync')



//ROUTER
const errors= require('./routes/errorHandler')
const home = require('./routes/home')
const login = require('./routes/login')
const register = require('./routes/register')
const products = require('./routes/product')
const stores = require('./routes/store')
const cookies = require('./routes/cookies')
const logout = require ('./routes/logout');
const user = require('./models/user');


//DB CONNECTION
mongoose.connect('mongodb+srv://Bader:w1a2t3e4r5@cluster0.eywmrzr.mongodb.net/store?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology:true});
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
app.use(CookieParser('secret'));
app.use(session(sessionOption))
app.use(flash());
app.use((req,res, next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success')
    res.locals.error= req.flash('error')
    next();
})

//PASSPORT
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//ROUTES DEPLOYMENT
app.use('/', home)

app.use('/',login)

app.use('/', register)

app.use('/', logout)

//PRODUCT
app.use('/products',products)

//STORE
app.use('/stores', stores)


//Error Handling
app.use('*',errors);
app.use('stores/*',errors);


//Deploy
app.listen((process.env.PORT ||3000) , (req,res)=>{
    console.log('Server opened At Port 3000')
})