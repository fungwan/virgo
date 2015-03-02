/**
 * Created by fungwan on 2015/2/4.
 */
var dbService = require("../db"),
    async = require('async');

var index = function(req,res){

    var parentId = req.query.parentId;//category id
    var id = req.query.id;//list id
    if(id === undefined || id === null){
        id = 0;
    }
    //productName
    var productName = '';
    var caption = '';//tab title

    //get init data(products info)
    var product = {};
    var productInfo = [];

    async.auto({
            get_nav: function (callback) {

                var tableName = 'navigation_bar';
                if (req.session.lang === '0') {
                    caption = '伊诺';
                    dbService.selectMulitValue('name',tableName,'',callback);
                }else if(req.session.lang === '1'){
                    caption = 'Inno';
                    dbService.selectMulitValue('en_name as name',tableName,'',callback);
                }
            },
            get_series: function (callback) {

                var tableName = 'product_series';
                if (req.session.lang === '0') {
                    dbService.selectMulitValue('name',tableName,'',callback);
                }else if(req.session.lang === '1'){
                    dbService.selectMulitValue('en_name as name',tableName,'',callback);
                }
            },
            get_category: function (callback) {

                /*
                 * sql data:
                 * select series.`name` as series_name, category.id,category.name as category_name from product_series as series, product_gategory as category
                 WHERE category.parent_id = series.id
                 *
                 * */
                var tableName = 'product_series as series, product_category as category';
                var condition = 'where category.parent_id = series.id';
                if (req.session.lang === '0') {
                    dbService.selectMulitValue('series.`name` as series_name, category.id,category.name as category_name',tableName,condition,callback);
                }else if(req.session.lang === '1'){
                    dbService.selectMulitValue('series.`en_name` as series_name, category.id,category.en_name as category_name',tableName,condition,callback);
                }
            },
            get_selected: function (callback) {
                var condition = '';
                if(id === 0){//0表示子目录默认为0即某系列的第一个产品
                    condition = 'WHERE parent_id = ' + parentId + ' order by id limit 1';
                }else{
                    condition = 'WHERE parent_id = ' + parentId + ' and id = ' + id;
                }

                var tableName = 'product_list';
                if (req.session.lang === '0') {
                    dbService.selectValue('name',tableName,condition,callback);
                }else if(req.session.lang === '1'){
                    //dbService.selectValue('name',tableName,condition,callback);
                    dbService.selectValue('en_name',tableName,condition,callback);
                }
            },
            get_list: function (callback) {

                var condition = 'WHERE parent_id = ' + parentId;
                var tableName = 'product_list';
                if (req.session.lang === '0') {
                    dbService.selectMulitValue('id,parent_id,name,img,thumb,description',tableName,condition,callback);
                }else if(req.session.lang === '1'){
                    dbService.selectMulitValue('id,parent_id,en_name as name,img,thumb,description',tableName,condition,callback);
                }
            }
        },
        function(err, results) {
            if(err !== null){
                console.error('sql error');
            }else{
                //get nav
                var nav = results.get_nav;

                //get root product
                var seriesArray = results.get_series;

                //get grandson product detail
                var categoryArray = results.get_category;

                for(i in seriesArray) {
                    var name = seriesArray[i].name;
                    product[name] = [];

                    var data = {
                        'series' : name,
                        'childArray' : []
                    };

                    for(var x = 0 ; x < categoryArray.length ;) {
                        var seriesName = categoryArray[x].series_name;
                        if(seriesName === name){
                            var detail = {
                                'id'       : categoryArray[x].id,//after parentId
                                'category' : categoryArray[x].category_name
                            };
                            data['childArray'].push(detail);
                            //remove
                            categoryArray.splice(x,1);
                        }else{
                            ++x;
                        }
                    }

                    productInfo.push(data);
                }

                //get grandson product detail
                var productsArray = results.get_list;
                if(productsArray === ''){
                    res.render('error', {
                        title: 'No Found'
                    })
                    return;
                }

                //get productName
                var selectProduct = results.get_selected;

                res.render('products_list', {
                    title        :   selectProduct,
                    navigation_bar : nav,
                    product      :   productInfo,
                    productId    :   id,
                    productsList :   productsArray
                });
            }
        });
};

exports.index = index;