/**
 * Created by fengyun on 2014/8/13.
 */

var log4js = require('log4js');
log4js.configure({
    appenders: [
        {
            type: 'console'
            //category: "console"
        },
        {
            type: "dateFile",
            filename: 'logs/log.log',
            pattern: "_yyyy-MM-dd",
            alwaysIncludePattern: false,
            category: 'dateFileLog'
        }
    ],
    replaceConsole: true,
    levels:{
        dateFileLog: 'INFO'
    }
});

var dateFileLog = log4js.getLogger('dateFileLog');

exports.logger = dateFileLog;

exports.use = function(app) {
    app.use(log4js.connectLogger(dateFileLog, {level:'auto', format:':method :url'}));
}
