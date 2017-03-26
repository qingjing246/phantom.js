/**
 * Created by Administrator on 2017-03-26.
 */
var li = document.getElementsByTagName('li');
var table = document.getElementsByClassName('list')[0];
var data;
var userName = '';

//设置三个文件名字
var pageLg = 'lagoudata';
var pageZL = 'zhiliandata';
var pageBoss = 'bossdata';


//初始化页面
load(pageLg);
load(pageZL);
load(pageBoss);
hide(pageZL);
hide(pageBoss);

//导航栏添加点击事件
for (var i = 0; i < li.length; i++) {

    li[i].index = i;

    li[i].onclick = function () {

        switch (this.index) {

            //根据点击索引，执行隐藏，显示
            case 0:
                hide(pageZL);
                hide(pageBoss);
                show(pageLg);
                break;
            case 1:
                hide(pageLg);
                hide(pageBoss);
                show(pageZL);
                break;
            case 2:
                hide(pageZL);
                hide(pageLg);
                show(pageBoss);
                break;
        }
    }
}

//隐藏
function hide(name) {

    var allTd = document.getElementsByClassName(name);

    for (var i = 0; i < allTd.length; i++) {

        allTd[i].style.display = 'none';
    }
}

//显示
function show(name) {
    var allTd = document.getElementsByClassName(name);

    for (var i = 0; i < allTd.length; i++) {

        allTd[i].style.display = '';
    }
}

//数据加载
function load(name) {
    //ajax获取JSON数据
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.status = 200) {
            if (xhr.readyState = 4) {

                //把字符串转换成json对象
                data = JSON.parse(xhr.responseText);
            }
        }
    };

    //根据传入的参数，加载对应数据
    userName = name;

    xhr.open('get', 'json/' + name + '.json', false);
    xhr.send();

    //执行create函数
    create();
}

//动态创建元素

function create() {

    //遍历json数据
    for (var i = 0; i < data.length; i++) {

        var tr = document.createElement('tr');

        tr.className = userName;

        //给奇数列和偶数列添加不同背景
        if (i % 2 == 0) {
            tr.style.background = '#D9D9D9';
        } else {
            tr.style.background = '#BFBFBF';
        }

        table.append(tr);

        //创建元素
        var tdAdd = document.createElement('td');
        var tdJob = document.createElement('td');
        var tdMoney = document.createElement('td');
        var tdYear = document.createElement('td');
        var tdTime = document.createElement('td');
        var tdCompany = document.createElement('td');
        var a = document.createElement('a');

        //给对应元素添加显示内容
        a.href = data[i].url;
        a.innerText = data[i].company;
        a.target = "view,window";
        tdAdd.innerText = data[i].add;
        tdJob.innerText = data[i].job;
        tdMoney.innerText = data[i].money;
        tdTime.innerHTML = data[i].timer;
        data[i].experience == undefined ? tdYear.innerHTML = '没有信息' : tdYear.innerText = data[i].experience;

        tdAdd.align = 'center';
        tdJob.align = 'center';
        tdMoney.align = 'center';
        tdYear.align = 'center';
        tdTime.align = 'center';
        tdCompany.align = 'center';

        //把生成元素添加到页面
        tr.append(tdAdd, tdJob, tdMoney, tdYear, tdTime, tdCompany);
        tdCompany.append(a);
    }
}