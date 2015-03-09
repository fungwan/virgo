/**
 * Created by fungwan on 2015/2/9.
 */


var dbService = require("../db"),
    async = require('async');

var index = function(req,res){
    /*var kind = req.body['language'];
    req.session.lang = kind;
    res.send('success');*/
    var kind = req.query.lang;//category id
    req.session.lang = kind;
    res.redirect("/");
};

exports.index= index;