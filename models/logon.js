/**
 * Created by Administrator on 2015/2/7.
 */
var dbService = require("../db"),
    tuerBase = require('./base'),
    async = require('async');

var uid = 1;

var index = function(req,res){

    /*
    不要删除，将来作回调函数的示例代码
    tuerBase.getNavigationbar(uid, function(err, nav) {
        if (err) {
            res.redirect('404');
        } else {
            console.log(nav[0].name);
        }
    });*/

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