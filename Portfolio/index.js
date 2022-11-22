const express = require('express');
const app =express();
const path = require('path');

app.use(express.static(path.join(__dirname,'/public')));
app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, ('/views')));

app.get('/', (req,res)=>{
    res.render('home');
});

app.get('/getpost', (req,res)=>{

    res.render('getpost');
});

app.post('/getpost', (req,res)=>{
   const{email, phone} = req.body;
   res.send('MESSAGE SEND')
});


app.listen((process.env.PORT || 3000), ()=>{
    console.log('SERVER INITIATED AT PORT 8080')
})


