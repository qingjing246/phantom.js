var page =require('webpage').create();
var address='http://product.pconline.com.cn/server/';
var fs = require('fs');
var mypath = 'aa.json';
var count = 2;
var pageSize=0;
phantom.outputEncoding="gbk";
page.settings.userAgent = "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko";

//打开链接
page.open(address,function(status){
	// page.onLoadFinished = loadController;
	//网站截屏
	page.render('computer.jpeg');
	//获取页面数
	pageSize = page.evaluate(function(){
		var cont='';
		var size =document.querySelector('div.pager>em>i').innerText;
		cont += size;
		return cont;
	});
	console.log(pageSize);

	loadComputerList(address);
});


function loadComputerList(url){
	console.log('loading '+url);
	//在page.open前执行,判断链接是否加载成功
	page.onLoadFinished = function loadListsucc(status){
		console.log("loadlistSucc ["+url+"] =======================Status:"+status);
	};
	//打开链接
	page.open(url,function(status){
		//添加定时器
		setTimeout(function(){
			console.log(status);

			var content='';
			//获取打开页面内容
			var json = [];
			content = page.evaluate(function(){
				//var cont='';
				//声明一个空的数组
				//获取所有电脑型号的a标签
				var listComputer = document.querySelectorAll('div.item-title>h3>a');
				//获取多有电脑价格
				var listPrice =document.querySelectorAll('div.price');
				//遍历所有电脑型号
				for(var j=0;j<listComputer.length;j++){
					var computer = listComputer[j].innerText;
					var price = listPrice[j].innerText;
					var url = listComputer[j];

					json += {
						'型号':computer,
						'价格':price,
						'链接':url+'\r\n'

					};
					/*json.push({
						'型号':computer,
						'价格':price,
						'链接':url+'\r\n'

					});*/

					//cont += computer+'\t\t价格:'+price+','+url+'\r\n';
				}
				//return cont;
				//返回json
				return json;
			});

			//console.log(JSON.stringify(content,undefined,4));
			console.log('========== write to file !============');
			//写入文件
			try{
				fs.write(mypath, JSON.stringify(content,undefined,4), 'a');

			}catch(e){//错误发生，输出错误代码
				console.log(e);
			}
			console.log('========== begin loading next page!============');
			//加载下一页

			var nextUrl = page.evaluate(function(){
				var url = '';
				//获取下一个节点
				var next =  document.querySelectorAll('div.pager a[class=page-next]');
				var cont = '';
				url = next[0];
				cont += url;
				return cont;

			});
			//打印下一页链接
			console.log(nextUrl);
			//判断是否继续执行
			if(count <= pageSize){
				console.log(nextUrl);
				count++;
				console.log(count);
				loadComputerList(nextUrl);
			}else{
				console.log(count);
				phantom.exit();
			}
		}, 100);
	});
}