/**
 * Created by fungwan on 2015/2/11.
 */

var dbService = require("../db"),
    async = require('async');

var Base = function() {

};

Base.prototype.getNavigationbar = function(collection, callback) {
    async.auto({
        get_nav: function (callback) {

            var tableName = 'navigation_bar';
            dbService.selectMulitValue('name', tableName, '', callback);

        }
    },function(err, results){
        var data = results.get_nav;
        if (err)
            callback(err);
        else {
            if (data)
                callback(null, data);
            else
                callback('找不到相关数据');
        }
    });
};

module.exports = new Base();