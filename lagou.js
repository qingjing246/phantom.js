var page = require('webpage').create();
var fs = require('fs');
var mypath = 'json/lagoudata.json';
var totalPage = 0;
var number = 2;
var t = new Date();
var data = [];

//设置初始网页地址
var url = 'https://www.lagou.com/zhaopin/qianduankaifa/1/?filterOption=3';

phantom.outputEncoding = "utf-8";

//获取总页数
//打开页面
page.open(url, function (status) {

    console.log(status);
    //页面分析
    totalPage = page.evaluate(function () {
        //找到总页数节点

        var n = document.getElementsByClassName('page_no').length;

        var a = document.getElementsByClassName('page_no')[n - 2].innerHTML;

        return 5;
    });

    console.log('---------total page :'+totalPage+'---------');

    ptm(url);
});


function ptm(url) {

    page.open(url, function (status) {

        console.log('--------open page ok:'+status+'+++++++++++++');

        var cont = page.evaluate(function () {

            //设置获取内容
            var arr = [];
            var div = document.getElementsByClassName('p_top');
            for (var i = 0; i < div.length; i++) {
                var h2 = div[i].getElementsByTagName('h2')[0].innerHTML;
                var address = document.getElementsByClassName('add')[i].innerText;
                var time = document.getElementsByClassName('format-time')[i].innerText;
                var experience = document.getElementsByClassName('p_bot')[i].getElementsByClassName('li_b_l')[0].lastChild.nodeValue;
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
        data = data.concat(cont);

        console.log('----------loading next page----------');

        var nextUrl = page.evaluate(function () {
            var url = '';
            var n = document.getElementsByClassName('page_no').length;
            var nextPage = document.getElementsByClassName('page_no')[n - 1];
            url += nextPage;
            return url;
        });


        if (number <= totalPage) {
            console.log('next page url：' + nextUrl);

            number++;

            console.log('------------page' + number + '----------');

            ptm(nextUrl);

        } else if (number > totalPage) {

            console.log('-------------data load over--------------');

            console.log(JSON.stringify(data, undefined, 4));

            //设置存入的文件
            fs.write(mypath, JSON.stringify(data, undefined, 4), 'a');

            t = new Date() - t;

            console.log('------------use time:' + t * 0.001 + 's----------');

            phantom.exit();
        }
    });
}


