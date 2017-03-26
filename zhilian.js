/**
 * Created by Administrator on 2017-03-22.
 */
var page = require('webpage').create();
var fs = require('fs');
var mypath = 'json/zhiliandata.json';
var totalPage = 0;
var number = 2;
var t = new Date();
var length = 0;
var data = [];

//设置初始网页地址
var url = 'http://sou.zhaopin.com/jobs/searchresult.ashx?bj=160000&sj=864&jl=%E6%88%90%E9%83%BD&sm=0&p=1&source=0';

phantom.outputEncoding = "utf-8";

//获取总页数
//打开页面
page.open(url, function (status) {

    console.log(status);
    //页面分析
    totalPage = page.evaluate(function () {

        //设置需要加载的页数
        var pageNumber = 5;
        return pageNumber;
    });

    console.log('---------total page :' + totalPage + '---------');
    ptm(url);
});



function ptm(url) {

    page.open(url, function (status) {

        console.log('--------open page ok:'+status+'+++++++++++++');

        var cont = page.evaluate(function () {

            //设置获取内容
            var arr = [];
            var div = document.getElementsByClassName('zwmc');
            var div2 = document.getElementsByClassName('gxsj');
            var div3 = document.getElementsByClassName('gsmc');
            for (var i = 1; i < 61; i++) {
                var h2 = div[i].getElementsByTagName('a')[0].innerHTML;
                var address = document.getElementsByClassName('gzdd')[i].innerText;
                var time = div2[i].querySelector('span').innerHTML;
                var money = document.getElementsByClassName('zwyx')[i].innerText;
                var companyName = div3[i].querySelector('a').innerHTML;
                var url = div[i].getElementsByTagName('a')[0].href;
                arr.push({
                    job: h2,
                    add: address,
                    timer: time,
                    money: money,
                    company: companyName,
                    url: url
                });
            }
            return arr;
        });

        data = data.concat(cont);

        console.log('----------loading next page----------');

        var nextUrl = page.evaluate(function () {
            var url = '';
            var nextPage = document.querySelector('.next-page').href;
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