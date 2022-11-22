const express = require('express');
const app =express();
const path = require('path');
const errorsRoute = require('./routes/Errors')
const headPage =require('./routes/headpage');
const contact =require('./routes/contact');

app.use(express.static(path.join(__dirname,'/public')));
app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, ('/views')));

app.use('/contact', contact);

app.use('/', headPage);

app.use('*',errorsRoute);


app.listen((process.env.PORT || 3000), ()=>{
    console.log('SERVER INITIATED AT PORT 8080')
})


