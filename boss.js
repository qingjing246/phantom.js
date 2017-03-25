var page = require('webpage').create();
var fs = require('fs');
var mypath = 'bossdata.json';
var totalPage = 0;
var number = 2;
var t = new Date();
var arr1 = [];
//var url = 'http://www.zhipin.com/c101270100-p100205/?page=1&ka=page-1';
var url = 'https://www.lagou.com/zhaopin/qianduankaifa/1/?filterOption=3';
phantom.outputEncoding = "gb2312";

//获取总页数
//打开页面
page.open(url, function (status) {

    console.log(status);
    //页面分析
    totalPage = page.evaluate(function () {
        //找到总页数节点
        var m = '';
        //var n = document.getElementsByClassName('page_no').length;
        //var a = document.getElementsByClassName('page_no')[n - 2].innerHTML;
        m = 5;

        return m;
    });

    console.log(totalPage);
    //执行爬取数据
    ptm(url);
});


function ptm(url) {

    page.open(url, function (status) {
        console.log(status);

        var cont = '';
        cont = page.evaluate(function () {
            /*
            var arr = [];
            var div = document.getElementsByClassName('job-primary');
            for (var i = 0; i < div.length; i++) {
                var job = info[i].getElementsByClassName('name')[i].firstChild.nodeValue
                var info = document.getElementsByClassName('info-primary');
                var address = info[i].getElementsByTagName('p')[0].firstChild.nodeValue;
                var time = document.getElementsByClassName('time')[i].innerText;
                var experience = info[i].getElementsByTagName('p')[0].childNodes[2];
                var money = document.getElementsByClassName('red')[i].innerText;
                var company-text = document.getElementsByClassName('company-text');
                var companyName = company-text[i].getElementsByClassName('name')[i].innerText;
                var url = div[i].parentNode.href;
                arr.push({
                    job: job,
                    add: address,
                    timer: time,
                    money: money,
                    experience: experience,
                    company: companyName,
                    url: url
                });

            }
            return arr;
            */
        });
       // arr1 = arr1.concat(cont);
       // console.log(JSON.stringify(arr1, undefined, 4));

        /*
        // console.log(arr1.concat(cont));
        //fs.write(mypath, JSON.stringify(cont, undefined, 4), 'a');

        console.log('----------loading next page url----------');

        var nextUrl = page.evaluate(function () {
            var url = '';
            var n = document.getElementsByClassName('page')[0];
            var nextPage = n.getElementsByTagName('a')[4].href;
            url += nextPage;
            return url;
        });
        console.log(nextUrl);

        if (number <= totalPage) {
            console.log(nextUrl);
            number++;
            console.log('第' + number + '页');
            ptm(nextUrl);
        } else if (number > totalPage) {
            console.log('第' + number + '页');
            console.log(JSON.stringify(arr1, undefined, 4));
            fs.write(mypath, JSON.stringify(arr1, undefined, 4), 'a');
            t = new Date() - t;
            console.log('使用时间:' + t * 0.001 + '秒');
            phantom.exit();
        }

        */
    });
}


