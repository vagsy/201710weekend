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
let app = express();
//设置模板引擎
app.set('view engine','html');
//设置模板存放的根目录
app.set('views',path.resolve('views'));
//如果模板是html的话，用ejs来进行渲染
app.engine('html',require('ejs').__express);
app.listen(8080);
//当客户端通过GET方式访问/reg的时候，服务器返回一个空白的注册表单
app.get('/reg',function(req,res){
  res.render('reg',{title:'用户注册'});
});