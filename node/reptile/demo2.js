var https = require('https') // Node.js提供了http模块，用于搭建HTTP服务端和客户端
var url = 'https://daoge9.taobao.com/shop/view_shop.htm?spm=a211oj.20087502.2458555970.dshop16.787b2a7bnruScg&user_number_id=44597218' //输入任何网址都可以
 
https.get(url,function(res){  //发送get请求
  var html=''
  res.on('data',function(data){
    html += data  //字符串的拼接
  })
  res.on('end',function(){
    console.log(html)
    })
}).on('error',function(){
  console.log('获取资源出错！')
})