/**
 * Created by Administrator on 2015/2/7.
 */
var dbService = require("../db"),
    async = require('async');

var index = function(req,res){
    res.render('logon', { title : '管理系统'});
};

exports.index= index;