const requireLogin = (req,res,next)=>{
    if(!req.isAuthenticated()){
        return res.render('needTo/needTo')
    }
    next();
}

module.exports = requireLogin;