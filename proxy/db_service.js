/**
 * Created by fengyun on 14-6-18.
 * Modified by andy.feng on 14-8-28
 */
var async = require('async'),
    sessionPool = require('./mysql_pool.js'),
    //logger = require('../../lib/log.js').logger,
	conf        = require('../../conf'),
    global = require('../common/errorCode.js').global;


//==================================================================
//函数名：  _query
//作者：    andy.feng
//日期：    2014-08-26
//功能：    负责发送sql查询
//输入参数：无
//返回值：  无
//修改记录：
//==================================================================
var _query = function(sqlData,callback){

    if(sessionPool != null){
        sessionPool.getConnection('SLAVE*', 'ORDER',function(err, connection) {
            if(err){
				sessionPool.add('SLAVE1', conf.slave1Config);  
				sessionPool.add('SLAVE2', conf.slave2Config);  
				
                console.error(new Date() + "POOL ==> " + err);
                callback(err, global.ERROR_CRASHMYSQL);
                return ;
            }
            
            connection.query( sqlData, function(error, results) {
                if (error) {
                    console.error('QueryError:' +  sqlData + '--' +error.message);
                    callback(err,global.ERROR_QUERYMYSQL);
                    connection.release();
                    return;
                }
                if (results.length > 0) {
                    callback(null, results);//有值，返回含有1个或多个对象的数组
                }else{
                    callback(null,'');
                }

                connection.release();
            });
        });
    }
}

var service = {

    //==================================================================
    //函数名：  _getOne
    //作者：    andy.feng
    //日期：    2014-08-26
    //功能：    查询一个单个的值，例如- sql = 'select count(*) from stu';
    //输入参数：无
    //返回值：  无
    //修改记录：
    //==================================================================

    _getOne : function(queryValue,tableName,condition,callback){

        async.auto({
            query_db: function(_callback){
                var sqlData = 'SELECT ' + queryValue + ' FROM ' + tableName + ' ' +condition;
                _query(sqlData,_callback);
            },
            get_data: ['query_db',function(_callback ,results) {
                var rs = results.query_db;
                if(rs != ''){
                    var signal = rs[0][queryValue];
                    _callback(null,signal);
                }else{
                    _callback(null,rs);
                }
            }]
        },function(err, results) {
            if(err === null){
                var rsData = results.get_data;
                callback(null,rsData);
            }else{
                callback(err,results.query_db);
            }
        });
    },

    //==================================================================
    //函数名：  _getRow
    //作者：    andy.feng
    //日期：    2014-08-26
    //功能：    查询一行记录多个列，例如- sql = 'select * from stu where id=16';
    //输入参数：无
    //返回值：  无
    //修改记录：
    //==================================================================

    _getRow: function(queryValue,tableName,condition,callback){
        async.auto({
            query_db: function(_callback){
                var sqlData = 'SELECT ' + queryValue + ' FROM ' + tableName + ' ' +condition;
                _query(sqlData,_callback);
            },
            get_data: ['query_db',function(_callback ,results) {
                var rs = results.query_db;
                if(rs != ''){
                    var signalRow = rs[0];
                    _callback(null,signalRow);
                }else{
                    _callback(null,rs);
                }
            }]
        },function(err, results) {
            if(err === null){
                var rsData = results.get_data;
                callback(null,rsData);
            }else{
                callback(err,results.query_db);
            }
        });
    },

    //==================================================================
    //函数名：  _getAll
    //作者：    andy.feng
    //日期：    2014-08-26
    //功能：    查询多行记录，例如- sql = 'select * from stu ';
    //输入参数：无
    //返回值：  无
    //修改记录：
    //==================================================================

    _getAll: function(queryValue,tableName,condition,callback){
        async.auto({
            query_db: function(_callback){
                var sqlData = 'SELECT ' + queryValue + ' FROM ' + tableName + ' ' +condition;
                _query(sqlData,_callback);
            },
            get_data: ['query_db',function(_callback ,results) {
                var rs = results.query_db;
                _callback(null,rs);
            }]
        },function(err, results) {
            if(err === null){
                var rsData = results.get_data;
                callback(null,rsData);
            }
            else{
                callback(err,results.query_db);
            }
        });
    },

    //==================================================================
    //函数名：  _getUnion
    //作者：    andy.feng
    //日期：    2014-11-05
    //功能：    查询更为复杂的查询，这里指联合查询;
    //输入参数：无
    //返回值：  无
    //修改记录：
    //==================================================================

    _getUnion: function(queryValue,callback){
        async.auto({
            query_db: function(_callback){
                var sqlData = queryValue;
                _query(sqlData,_callback);
            },
            get_data: ['query_db',function(_callback ,results) {
                var rs = results.query_db;
                _callback(null,rs);
            }]
        },function(err, results) {
            if(err === null){
                var rsData = results.get_data;
                callback(null,rsData);
            }
            else{
                callback(err,results.query_db);
            }
        });
    },

    //==================================================================
    //函数名：  _updateValue
    //作者：    andy.feng
    //日期：    2014-08-26
    //功能：    更新记录;
    //输入参数：无
    //返回值：  无
    //修改记录：
    //==================================================================
    _updateValue : function(tableName,updateValue,condition){

        async.auto({
            query_db: function(_callback){
                //update area set Name='SheHong' where ID=1
                var updateSQLString = 'update ' + tableName + ' set ' +  updateValue  + condition;
                _query(updateSQLString,_callback);
            }
        },function(err) {
            if(err !== null){
                console.error('update error: ' + err);
            }
        });
    },

    //==================================================================
    //函数名：  _insertValues
    //作者：    andy.feng
    //日期：    2014-08-26
    //功能：    插入数据;
    //输入参数：无
    //返回值：  无
    //修改记录：
    //==================================================================

    _insertValues : function(tableName,columnName,insertValue){

        async.auto({
            query_db: function(_callback){
                //update area set Name='SheHong' where ID=1
                var insertData = 'insert into ' + tableName + ' (' + columnName + ' ) VALUES ( ' +insertValue + ' )';
                _query(insertData,_callback);
            }
        },function(err) {
            if(err !== null){
                console.error('insert error: ' + err);
            }
        });
    },

    //==================================================================
    //函数名：  _replaceValues
    //作者：    andy.feng
    //日期：    2014-08-26
    //功能：    插入数据时判断某列数据是否存在，不存在就插入;
    //输入参数：replaceColumn 需要检查的列 ,pos 查询字段的下标
    //返回值：  无
    //修改记录：
    //==================================================================

    _replaceValues : function(tableName,columnName,insertValue,replaceColumn,pos){
        var checkDateValue = insertValue.split(',')[pos];
        //+----+----------+-------+
        //| ID | Name     | Value |
        //+----+----------+-------+
        //|  1 | testName |     1 |
        //+----+----------+-------+
        //INSERT INTO t_test(Name, Value) SELECT 'testName', 'testValue' FROM DUAL WHERE 'testName' NOT IN (SELECT Name FROM t_test);
        var replaceData = 'INSERT INTO ' + tableName + '(' + columnName + ') SELECT ' +insertValue + ' FROM DUAL WHERE ' + checkDateValue + 'NOT IN (SELECT ' + replaceColumn + ' FROM ' + tableName + ')';

        async.auto({
            query_db: function(_callback){
                _query(replaceData,_callback);
            }
        });
    },

    //==================================================================
    //函数名：  _clearTable
    //作者：    andy.feng
    //日期：    2014-08-26
    //功能：    清空表中的数据;
    //输入参数：无
    //返回值：  无
    //修改记录：
    //==================================================================

    _clearTable : function(tableName){
        var removeData = 'TRUNCATE TABLE  ' + tableName ;
        async.auto({
            query_db: function(_callback){
                _query(removeData,_callback);
            }
        },function(err) {
            if(err !== null){
                console.error('clear error: ' + err);
            }
        });
    }
};

exports.selectValue = service._getOne;//查询一行一列
exports.selectValueEx = service._getRow;//查询一行，单列/多个列
exports.selectMulitValue = service._getAll;//查询多行,单列/多个列
exports.selectMoreValue = service._getUnion;//查询多行,单列/多个列

exports.insertValue = service._insertValues;
exports.replaceValue = service._replaceValues;
exports.updateValue = service._updateValue;

exports.clearTable = service._clearTable;