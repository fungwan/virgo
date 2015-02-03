
var index = function(req,res){
    res.render('index', { title: '首页' });
}

exports.index= index;