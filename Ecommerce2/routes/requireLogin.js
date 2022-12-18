const requireLogin = (req,res,next)=>{
    if(!req.isAuthenticated()){
        return res.redirect('/needto')
    }else{
        return res.render('stores/new')
    }
    next();
}

module.exports = requireLogin;