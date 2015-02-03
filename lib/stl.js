/**
 * Created by fengyun on 2014/10/16.
 */

function SimpleMap() {
    this.map = {};
    this.mapSize = 0;
};

SimpleMap.prototype.put = function(key, value) {
    var oldValue = this.map[key];
    this.map[key] = value;
    if(!oldValue) {
        this.mapSize++;
    }
    return(oldValue || value);
};

SimpleMap.prototype.get = function(key) {
    return this.map[key];
};

SimpleMap.prototype.remove = function(key) {
    var v = this.map[key];
    if(v) {
        delete this.map[key];
        this.mapSize--;
    };
    return v;
};

SimpleMap.prototype.size = function() {
    return this.mapSize;
};

SimpleMap.prototype.clear = function() {
    this.map = {};
    this.mapSize = 0;
};

SimpleMap.prototype.keySet = function() {
    var theKeySet = [];
    for(var i in this.map) {
        theKeySet.push(i);
    }
    return theKeySet;
};

SimpleMap.prototype.values = function() {
    var theValue = [];
    for(var i in this.map) {
        theValue.push(this.map[i]);
    }
    return theValue;
};

SimpleMap.prototype.clone = function(clonemap) {
    this.map = clonemap.map;
    this.mapSize = clonemap.mapSize;
};

exports.SimpleMap = SimpleMap;