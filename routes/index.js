var index        = require('../models/index'),
    products     = require('../models/products'),
    productsList = require('../models/products_list');

module.exports = function(app) {
  app.get('/', index.index);
  
  app.get('/products',products.index);

  app.get('/productsList',productsList.index);

  app.get('/usharp', function (req, res) {
        res.render('usharp', { title: 'U型节能灯' });
  });
  app.get('/reg', function (req, res) {
    res.render('reg', { title: '注册' });
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
