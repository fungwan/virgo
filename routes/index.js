var index        = require('../models/index'),
    products     = require('../models/products'),
    productsList = require('../models/products_list'),
    logon = require('../models/logon'),
    verify = require('../models/verify'),
    switch_lang = require('../models/switch_lang'),
    manage_products = require('../models/manage_products');

module.exports = function(app) {
    app.get('/', index.index);
    app.get('/products',products.index);
    app.get('/productsList',productsList.index);
    //background management
    app.get('/logon',logon.index);
    app.get('/logout',logon.logout);
    app.post('/verify',verify.index);
    app.post('/switch_lang',switch_lang.index);
    app.get('/home', function (req, res) {
         if (!req.session.user) {
             res.render('logon', { title : '管理系统'});
        }else{
             res.render('home', { title: '管理系统' });
        }
    });
    app.get('/manage_products',manage_products.index);
    app.get('/select_category',manage_products.category);
    app.get('/select_list',manage_products.list);
    app.get('/select_listByPageId',manage_products.listByPage);
};
