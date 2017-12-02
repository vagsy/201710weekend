let express = require('express');
let session = require('express-session');
let app = express();
//使用session中间件，此中间件会在客户端请求服务器的时候，把客户端对应的会话对象放在req.session属性上
app.use(session({
  resave:true,//每次客户端来请求的时候都要重新保存session
  saveUninitialized:true,//保存未使用过的session
  secret:'zfpx'//用来加密cookie的
}));
app.get('/visit',function(req,res){
  if(req.session.visit){
    req.session.visit++;
  }else{
    req.session.visit = 1;
  }
  res.send(`这是你的第${req.session.visit}次访问`);
});
app.listen(8080);