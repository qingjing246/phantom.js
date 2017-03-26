var page = require('webpage').create();
var fs = require('fs');
var mypath = 'json/bossdata.json';
var totalPage = 0;
var number = 2;
var t = new Date();
var data = [];

//设置初始网页地址
var url = 'http://www.zhipin.com/c101270100-p100205/?page=1&ka=page-1';

phantom.outputEncoding = "utf-8";

//获取总页数
//打开页面
page.open(url, function (status) {

    console.log(status);
    //页面分析
    totalPage = page.evaluate(function () {

        //设置需要获取的页数
        var pageNumber = 5;
        return pageNumber;
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
            var div = document.getElementsByClassName('job-primary');
            for (var i = 0; i < div.length; i++) {
                var info = document.getElementsByClassName('info-primary');
                var job = info[i].getElementsByClassName('name')[0].firstChild.nodeValue;
                var address = info[i].getElementsByTagName('p')[0].firstChild.nodeValue;
                var time = document.getElementsByClassName('time')[0].innerText;
                var experience = info[i].getElementsByTagName('p')[0].childNodes[2].textContent;
                var money = document.getElementsByClassName('red')[0].innerText;
                var company = document.getElementsByClassName('company-text');
                var companyName = company[i].getElementsByClassName('name')[0].innerText;
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

        });
        data = data.concat(cont);

        console.log('----------loading next page----------');

        var nextUrl = page.evaluate(function () {
            var url = '';
            var n = document.getElementsByClassName('page')[0].getElementsByTagName('a');
            var nextPage = n[n.length-1].href;
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


