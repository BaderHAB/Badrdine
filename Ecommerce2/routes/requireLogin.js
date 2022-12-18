const requireLogin = (req,res,next)=>{
    console.log(req.user)
    if(!req.isAuthenticated()){
        return res.render('needTo/needTo')
    }else{
        return res.render('stores/new')
    }
    next();
}

module.exports = requireLogin;