var page = require('webpage').create();
var fs = require('fs');
var mypath = 'aa.json';
var totalPage = 0;
var number = 2;
var t = new Date();
var arr1 = [];
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
        var n = document.getElementsByClassName('page_no').length;
        var a = document.getElementsByClassName('page_no')[n - 2].innerHTML;
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
            var arr = [];
            var div = document.getElementsByClassName('p_top');
            for (var i = 0; i < div.length; i++) {
                var h2 = div[i].getElementsByTagName('h2')[0].innerHTML;
                var address = document.getElementsByClassName('add')[i].innerText;
                var time = document.getElementsByClassName('format-time')[i].innerText;
                var experience = document.getElementsByClassName('li_b_l')[i].lastChild.nodeValue;
                var money = document.getElementsByClassName('money')[i].innerText;
                var companyName = document.getElementsByClassName('company_name')[i].innerText;
                var url = document.getElementsByClassName('position_link')[i].href;
                arr.push({
                    job: h2,
                    add: address,
                    timer: time,
                    money: money,
                    experience: experience.replace(/\s/g, ""),
                    company: companyName.replace(/[\[]|[\]]/g, ""),
                    url: url
                });

            }
            return arr;
        });
        arr1 = arr1.concat(cont);
        //console.log(JSON.stringify(arr1, undefined, 4));
        // console.log(arr1.concat(cont));
        //fs.write(mypath, JSON.stringify(cont, undefined, 4), 'a');

        console.log('----------loading next page url----------');

        var nextUrl = page.evaluate(function () {
            var url = '';
            var n = document.getElementsByClassName('page_no').length;
            var nextPage = document.getElementsByClassName('page_no')[n - 1];
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
    });
}


