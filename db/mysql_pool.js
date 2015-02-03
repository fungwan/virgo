/**
 * Created by fengyun on 14-7-8.
 */

var mysql       = require('mysql'),
    conf        = require('../conf');

var poolCluster = mysql.createPoolCluster();  
  
poolCluster.add('SLAVE1', conf.slave1Config);  
poolCluster.add('SLAVE2', conf.slave2Config);  
	
//var pool  = mysql.createPool(conf.mysqlOption);

module.exports = poolCluster;

