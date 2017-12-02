/**
 * 如何在express中使用cookie
 */
let express = require('express');
let cookieParser = require('cookie-parser');
let app = express();
//基本上所有的中间件模块都是一个函数，执行的结果才是真正的中间件函数,这个中间件会把cookie解析成对象赋给req.cookies
app.use(cookieParser());
/**
 * 写cookie
 * res.cookie 并不是http原生提供的，express提供的
 * 配置域名和IP的对应关系
 * Domain 域名 指定向哪些域名发请求的时候要发送cookie,默认是当前域名
 *   先找系统缓存->找hosts文件->DNS服务器
 *   C:\Windows\System32\drivers\etc\hosts
 *   a.zfpx.cn 指向 127.0.0.1
 *   b.zfpx.cn 指向 127.0.0.1
 */
app.get('/write',function(req,res){
  /*res.cookie('name','zfpx',{
    domain:'a.zfpx.cn'//只有向a.zfpx.cn发请求的时候才会带上此cookie
  });*/
 /* res.cookie('name','zfpx',{
    //如果客户端一直访问，那么每次访问都会从当有时间重新计算有效期
    maxAge:10*1000 //设置cookie的最大存活时间，过期删除
  });*/
  /*res.cookie('name','zfpx',{
    //cookie的有效期默认是session,存放在浏览器内存里，浏览器关闭则删除
    //如果设置了最大存活时间或绝对过期时间，则会把此cookie会放在硬盘上持久 化保存。
    expires:new Date(Date.now()+10*1000) //设置cookie的绝对失效时间，过期删除
  });*/
  //path 表示向哪些路径发请求的时候带上此cookie,默认是/
  res.cookie('name','zfpx',{
    path:'/read1'//表示只有向/read1路径及其子路径发请求的时候才会带上cookie
  });
  res.send('写入完毕');
});
/**
 * 读cookie
 *
 *
 */
app.get('/read',function(req,res){
  res.send(req.cookies);
});
app.get('/read1',function(req,res){
  res.send(req.cookies);
});
app.listen(8080);
