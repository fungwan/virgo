/**
 * Created by fungwan on 2015/2/11.
 */

var dbService = require("../db"),
    async = require('async');

var index = function(req,res){
    async.auto({
            get_series: function (callback) {

                var tableName = 'product_series';
                dbService.selectMulitValue('name',tableName,'',callback);
            }
        },
        function(err, results) {
            if(err !== null){
                console.error('sql error');
            }else{
                //get root product
                var seriesArray = results.get_series;
                //var name = seriesArray[i].name;

                res.render('manage_products', { title : '产品管理',
                    productSeries: seriesArray });
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
//功能：    通过系列id查询对应型号列表
//修改记录：
//==================================================================

var list = function(req,res){
    var parentId = req.query.parentId;

    async.auto({
            get_productsList: function (callback) {

                //SELECT name from product_category WHERE parent_id = 2;
                var tableName = 'product_list';
                var condition = 'WHERE parent_id = ' + parentId;
                dbService.selectMulitValue('id,name',tableName,condition,callback);
            }
        },
        function(err, results) {
            if(err !== null){
                console.error('sql error');
            }else{
                //get product list
                var productArray = results.get_productsList;
                res.send(productArray);
            }
        });
};

exports.index= index;
exports.category= category;
exports.list= list;