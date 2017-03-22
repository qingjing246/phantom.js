var page = require('webpage').create();

page.open('https://www.lagou.com/zhaopin/qianduankaifa/?labelWords=label',function(){
    page.render('lagou.png');
    phantom.exit();
});