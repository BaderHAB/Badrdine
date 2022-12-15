const requireLogin = (req,res,next)=>{
    console.log(req.user)
    if(!req.isAuthenticated()){
        return res.render('needTo/needTo')
    }
    next();
}

module.exports = requireLogin;