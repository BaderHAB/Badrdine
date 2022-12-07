const express = require('express');
const router = express.Router();
const session = require('express-session');


router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      else{
        res.redirect('/');
      }
    });
  });




module.exports= router;