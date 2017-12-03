let express = require('express');
let session = require('express-session');
let app = express();
//使用session中间件，此中间件会在客户端请求服务器的时候，把客户端对应的会话对象放在req.session属性上
app.use(session({
  resave:true,//每次客户端来请求的时候都要重新保存session
  saveUninitialized:true,//保存未使用过的session
  secret:'zfpx'//用来加密cookie的
}));
app.get('/write',function(req,res){
  //给session赋属性 写入session对象
  //set-cookie:connect.sid=s%3AwLtrFtwD2RjFxbxxbsHblBEorblhj2FA.SBREk7RGvVt6E6Vph8zJNCAZSPDZZRS07G35rN8Yz1s; Path=/; HttpOnly
  req.session.username = 'zfpx';
  res.send('write');
});
app.get('/read',function(req,res){
  console.log(req.session);
  res.send(req.session.username);
});
app.listen(8080);