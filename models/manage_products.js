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

exports.index= index;