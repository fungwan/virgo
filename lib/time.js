/**
 * Created by fengyun on 14-6-20.
 */
exports.getCurrentTime = function(flag){

    var currentTime = "";
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = parseInt(myDate.getMonth().toString()) + 1; //month是从0开始计数的，因此要 + 1
    if (month < 10) {
        month = "0" + month.toString();
    }
    var date = myDate.getDate();
    if (date < 10) {
        date = "0" + date.toString();
    }
    var hour = myDate.getHours();
    if (hour < 10) {
        hour = "0" + hour.toString();
    }
    var minute = myDate.getMinutes();
    if (minute < 10) {
        minute = "0" + minute.toString();
    }
    var second = myDate.getSeconds();
    if (second < 10) {
        second = "0" + second.toString();
    }
    if(flag == "0")
    {
        currentTime = year.toString() + month.toString() + date.toString() + hour.toString() + minute.toString() + second.toString(); //返回时间的数字组合
    }
    else if(flag == "1")
    {
        currentTime = year.toString() + "/" + month.toString() + "/" + date.toString() + " " + hour.toString() + ":" + minute.toString() + ":" + second.toString(); //以时间格式返回
    }
    return currentTime;
};

exports.isFromBiggerThanTo = function(dtmfrom, dtmto){
    var from = new Date(dtmfrom).getTime();
    var to = new Date(dtmto).getTime() ;
    return from >= to ;
};