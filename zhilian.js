/**
 * Created by Administrator on 2017-03-22.
 */
var page = require('webpage').create();
var fs = require('fs');
var mypath = 'zhiliandata.json';
var totalPage = 0;
var number = 2;
var t = new Date();
var length = 0;
var arr1 = [];
var url = 'http://sou.zhaopin.com/jobs/searchresult.ashx?bj=160000&sj=864&jl=%E6%88%90%E9%83%BD&sm=0&p=1&source=0';
phantom.outputEncoding = "gb2312";

//获取总页数
//打开页面
page.open(url, function (status) {

    console.log(status);
    //页面分析
    totalPage = page.evaluate(function () {
        //找到总页数节点
        var m = 20;


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
            var div = document.getElementsByClassName('zwmc');
            var div2=document.getElementsByClassName('gxsj');
            for (var i = 1; i < 61; i++) {
                var h2 = div[i].getElementsByTagName('a')[0].innerHTML;
                var address = document.getElementsByClassName('gzdd')[i].innerText;
                var time = div2[i].querySelector('span').innerHTML;
                //var experience = document.getElementsByClassName('li_b_l')[i].lastChild.nodeValue;
                var money = document.getElementsByClassName('zwyx')[i].innerText;
                var companyName = div[i].querySelector('a').innerText;
                var url = div[i].getElementsByTagName('a')[0].href;
                arr.push({
                    job: h2,
                    add: address,
                    timer: time,
                    money: money,
                    // experience: experience.replace(/\s/g, ""),
                    company: companyName.replace(/[\[]|[\]]/g, ""),
                    url: url

                });

            }
            return arr;
        });
        arr1 = arr1.concat(cont);
        //console.log(JSON.stringify(cont, undefined, 4));
        // console.log(arr1.concat(cont));
        //fs.write(mypath, JSON.stringify(cont, undefined, 4), 'a');

        console.log('----------loading next page url----------');

        var nextUrl = page.evaluate(function () {
            var url = '';
            //var n = document.getElementsByClassName('pagesDown-pos').length;
            var nextPage = document.querySelector('.next-page').href;
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

            //console.log(JSON.stringify(arr1, undefined, 4));
            fs.write(mypath, JSON.stringify(arr1, undefined, 4), 'a');
            t = new Date() - t;
            console.log('使用时间:' + t * 0.001 + '秒');
            phantom.exit();
        }
    });
}