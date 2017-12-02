/**
 * 写一个权限管理系统
 * /reg
 * 有注册(get post)页面 登录(get post)页面 用户主页(get) /user
 * 1. 先GET访问注册页面，返回空白的注册表单
 * 2. 填写此注册表单，如果注册成功跳到登录页，如果注册失败返回注册表单。
 * /login
 * 3. 填写登录表单，然后发起POST登录请求，如果登录成功，跳到用户主页,如果登录失败，则跳回登录页
 */
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let app = express();
//此中间件是专门用来处理请求体的，会把查询字符串格式的请求体转成一个对象并赋给req.body
app.use(bodyParser.urlencoded());
//设置模板引擎
app.set('view engine','html');
//设置模板存放的根目录
app.set('views',path.resolve('views'));
//如果模板是html的话，用ejs来进行渲染
app.engine('html',require('ejs').__express);
let users = [];
app.listen(8080);
//当客户端通过GET方式访问/reg的时候，服务器返回一个空白的注册表单
app.get('/reg',function(req,res){
  res.render('reg',{title:'用户注册'});
});
app.post('/reg',function(req,res){
   let user = req.body;
   //找一下用户数组中有没有跟当前传过来的用户用户名相同的用户
   let oldUser = users.find(item=>item.username == user.username);
   if(oldUser){//如果找到了同名用户，则重定向到注册页
     //back是一个关键字，表示上一个页面，从哪来回滚哪里去
     res.redirect('back');
   }else{//如果没有找到同名的用户，则重定向到登录页
     users.push(user);
     res.redirect('/login');
   }
});
//当客户端通过GET方式访问/login的时候，返回登录表单
app.get('/login',function(req,res){
 res.render('login',{title:'用户登录'});
});
app.post('/login',function(req,res){});
app.get('/user',function(req,res){

});