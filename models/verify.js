/**
 * Created by fungwan on 2015/2/7.
 */
/**
 * Created by Administrator on 2015/2/7.
 */
var dbService = require("../db"),
    async = require('async');

var index = function(req,res){
    var userName = req.body['userName'];
    var password = req.body['password'];

    if(password === 'adminxx'){
        req.session.user = {'name':'fengyun'};
        res.send('success');
    }
    else{
        res.send('failure');
    }
};

exports.index= index;