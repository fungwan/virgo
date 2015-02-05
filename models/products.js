/**
 * Created by fungwan on 2015/2/4.
 */
var dbService = require("../db"),
    async = require('async');

var index = function(req,res){
    //get init data(products info)
    var product = {};
    var productInfo = [];

    async.auto({
            get_series: function (callback) {

                var tableName = 'product_series';
                dbService.selectMulitValue('name',tableName,'',callback);
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
                dbService.selectMulitValue('series.`name` as series_name, category.id,category.name as category_name',tableName,condition,callback);
            },
            get_seriesEx: function (callback) {

                /*
                sql data:
                 SELECT series.`name` as series_name, category.id as child_id from product_series as series,(select * from product_category group by parent_id) as category
                 WHERE series.id = category.parent_id
                 */
                var tableName = 'product_series as series,(select * from product_category group by parent_id) as category';
                var condition = 'WHERE series.id = category.parent_id';
                dbService.selectMulitValue('series.`name` as series_name, series.thumb as thumb,category.id as child_id',tableName,condition,callback);
            }
        },
        function(err, results) {
            if(err !== null){
                console.error('sql error');
            }else{
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

                //get product seriesEx
                var productSeriesEx = results.get_seriesEx;
                res.render('products', { title : '产品中心',
                                        product: productInfo,
                                        productSeries: productSeriesEx});
            }
        });
};

exports.index = index;