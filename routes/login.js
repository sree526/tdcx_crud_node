var express = require('express');
var User = require('../models/user');
var router = express.Router();

router.post('/', function(req, res){
    var user = {};
    user.username = req.body.username;
    user.password = req.body.password;
    User.findOne(user, function(err, resuser){
        if(err) {
            res.send('Error while logging in');
        } else {
            console.log(resuser);
            if(resuser) {
                res.send(resuser);
            } else
                res.send('No user found');
        }
    });
});



module.exports = router;
