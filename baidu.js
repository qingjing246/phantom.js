var page = require('webpage').create(),
system = require('system'),url,time;

phantom.outputEncoding="gb2312";
time = Date.now();
url = 'https://www.baidu.com/s?wd='+ system.args[1];
page.open(url,function(status){
    var all = page.evaluate(function(){
        var arr = [];
        var a;
        var t = document.getElementsByClassName('t');
        var d = document.getElementsByClassName('c-abstract');
      
       
        for(var i=0;i<d.length;i++){
            var b = t[i].getElementsByTagName('a')[0].innerText;
            var u = t[i].getElementsByTagName('a')[0].href;
            var info = d[i].innerText;
            arr[i] ={
                title: b,
                url:u,
               info:info
            } 
           //a = t[0].getElementsByTagName('a')[0].innerText;
            
        }
        
        return arr;
    });
     time = Date.now() -time;
    console.log(JSON.stringify(all,undefined,4));
    console.log(time);
    phantom.exit();
});


//phantomjs baidu.js

