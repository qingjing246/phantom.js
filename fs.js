var fs = require("fs") ;
var arr = {
    name:'qingjing',
    age:17
}
var val = JSON.stringify(arr, undefined, 4);

  fs.writeFile("bb.txt",val,function (error){
      if(error) throw error ;
      console.log('Saved.') ;
      fs.readFile('bb.txt','utf-8',function(err,data){
          if(err)throw err;
          console.log(data);
      })
  }) ;

  
