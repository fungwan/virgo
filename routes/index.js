var index        = require('../models/index'),
    products     = require('../models/products'),
    productsList = require('../models/products_list'),
    logon = require('../models/logon'),
    verify = require('../models/verify');
    switch_lang = require('../models/switch_lang');

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
  app.post('/reg', function (req, res) {
  });
  app.get('/login', function (req, res) {
    res.render('login', { title: '登录' });
  });
  app.post('/login', function (req, res) {
  });
  app.get('/post', function (req, res) {
    res.render('post', { title: '发表' });
  });
  app.post('/post', function (req, res) {
  });
  app.get('/logout', function (req, res) {
  });
};
