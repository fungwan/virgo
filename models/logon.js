/**
 * Created by Administrator on 2015/2/7.
 */
var dbService = require("../db"),
    async = require('async');

var index = function(req,res){
    res.render('logon', { title : '管理系统'});
};

var logout = function(req, res) {

//    req.session.destroy(function(err) {
//        /*res.clearCookie('accounts', {
//            path:'/',
//            domain:config.cookiepath
//        });
//        res.clearCookie('pwd', {
//            path:'/',
//            domain: config.cookiepath
//        });
//        res.clearCookie('remember', {
//            path:'/',
//            domain: config.cookiepath
//        });*/
//        res.redirect('/logon');
//    });
    req.session = null; // Deletes the cookie.
    res.redirect('/logon');
};

exports.index= index;
exports.logout = logout;