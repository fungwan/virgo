/**
 * Created by fungwan on 2015/2/11.
 */

var dbService = require("../db"),
    async = require('async');

//==================================================================
//作者：    andy.feng
//日期：    2015-02-11
//功能：    初始management页面，获取产品系列表和所有产品列表
//修改记录：
//==================================================================

var index = function(req,res){
    async.auto({
            get_series: function (callback) {

                var tableName = 'product_series';
                dbService.selectMulitValue('name',tableName,'',callback);
            },
            get_all: function (callback) {

                var tableName = 'product_list';
                dbService.selectMulitValue('id,name',tableName,'',callback);
            },
            get_firstPage: function (callback) {

                var tableName = 'product_list';
                var condition = ' limit 0,10'
                dbService.selectMulitValue('id,name',tableName,condition,callback);
            }
        },
        function(err, results) {
            if(err !== null){
                console.error('sql error');
            }else{
                //get root product
                var seriesArray = results.get_series;

                //get product list
                var pageCounts = 1;

                var productArray = results.get_all;
                if(productArray.length > 0){
                    var over = (productArray.length) % 10;
                    over > 0 ? pageCounts = parseInt((productArray.length) / 10) + 1 :  pageCounts = parseInt((productArray.length) / 10) ;
                }

                var firstPageProduct = results.get_firstPage;
                res.render('manage_products', { title : '产品管理',
                                                admin:'fengyun',
                                                productSeries: seriesArray,
                                                page  : pageCounts,
                                                productsList :   firstPageProduct});
            }
        });
};

//==================================================================
//作者：    andy.feng
//日期：    2015-02-11
//功能：    通过系列id查询对应型号列表
//修改记录：
//==================================================================

var category = function(req,res){
    var parentId = req.query.parentId;

    async.auto({
            get_category: function (callback) {

                //SELECT name from product_category WHERE parent_id = 2;
                var tableName = 'product_category';
                var condition = 'WHERE parent_id = ' + parentId;
                dbService.selectMulitValue('id,name',tableName,condition,callback);
            }
        },
        function(err, results) {
            if(err !== null){
                console.error('sql error');
            }else{
                var categoryArray = results.get_category;
                res.send(categoryArray);
            }
        });
};

//==================================================================
//作者：    andy.feng
//日期：    2015-02-11
//功能：    通过系列id查询对应产品列表
//修改记录：
//==================================================================

var _listById = function(req,res){
    var parentId = req.query.parentId;

    async.auto({
            get_productsList: function (callback) {

                //SELECT name from product_category WHERE parent_id = 2;
                var tableName = 'product_list';
                var condition = 'WHERE parent_id = ' + parentId;
                dbService.selectMulitValue('id,name',tableName,condition,callback);
            },
            get_firstPage: function (callback) {

                var tableName = 'product_list';
                var condition = ' WHERE parent_id = ' + parentId + ' limit 0,10'
                dbService.selectMulitValue('id,name',tableName,condition,callback);
            }
        },
        function(err, results) {
            if(err !== null){
                console.error('sql error');
            }else{
                var pageCounts = 1;

                //get product list
                var productArray = results.get_productsList;
                if(productArray.length > 0){
                    var over = (productArray.length) % 10;
                    over > 0 ? pageCounts = parseInt((productArray.length) / 10) + 1 :  pageCounts = parseInt((productArray.length) / 10) ;
                }
                var firstPageProduct = results.get_firstPage;
                res.send({
                    'productsList':firstPageProduct,
                    'page':pageCounts
                });
            }
        });
};


//==================================================================
//作者：    andy.feng
//日期：    2015-02-11
//功能：    通过系列id查询对应产品列表,而且是按照页数翻页
//修改记录：
//==================================================================

var _listByIdFromPage = function(req,res){
    var parentId = req.query.parentId;

    var pageId = req.query.pageId;
    pageId = (parseInt(pageId) - 1)*10;

    async.auto({
            get_productsList: function (callback) {

                //SELECT name from product_category WHERE parent_id = 2;
                var tableName = 'product_list';
                var condition = 'WHERE parent_id = ' + parentId;
                dbService.selectMulitValue('id,name',tableName,condition,callback);
            },

            get_productsListByPage: function (callback) {

                //SELECT name from product_category WHERE parent_id = 2;
                var tableName = 'product_list';
                var condition = '';
                if(parentId === undefined)
                    condition = 'limit ' + pageId + ',10';
                else
                    condition = 'WHERE parent_id = ' + parentId + ' limit ' + pageId + ',10';;

                dbService.selectMulitValue('id,name',tableName,condition,callback);
            }
        },
        function(err, results) {
            if(err !== null){
                console.error('sql error');
            }else{
                var pageCounts = 1;

                //get product list
                var productArray = results.get_productsList;
                if(productArray.length > 0){
                    var over = (productArray.length) % 10;
                    over > 0 ? pageCounts = parseInt((productArray.length) / 10) + 1 :  pageCounts = parseInt((productArray.length) / 10) ;
                }

                var productArray = results.get_productsListByPage;
                res.send({
                    'productsList':productArray,
                    'page':pageCounts
                });
            }
        });
};

exports.index= index;
exports.category= category;
exports.list= _listById;
exports.listByPage= _listByIdFromPage;