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
let cookieParser = require('cookie-parser');
let crypto = require('crypto');
let app = express();
app.use(cookieParser());
//此中间件是专门用来处理请求体的，会把查询字符串格式的请求体转成一个对象并赋给req.body
//把查询字符串变成对象 querystring.parse() qs.parse();
/**
 *
 The `extended` option allows to choose between parsing the URL-encoded data
 with the `querystring` library (when `false`) or the `qs` library (when
 `true`).
 */
app.use(bodyParser.urlencoded({extended:false}));
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
  //把cookie中的error属性取出
  let error = req.cookies.error||'';
  //清除cookie中的error
  res.clearCookie('error');
  res.render('reg',{title:'用户注册',error});
});
app.post('/reg',function(req,res){
   let user = req.body;
   //找一下用户数组中有没有跟当前传过来的用户用户名相同的用户
   let oldUser = users.find(item=>item.username == user.username);
   if(oldUser){//如果找到了同名用户，则重定向到注册页
     //back是一个关键字，表示上一个页面，从哪来回滚哪里去
     //向客户端写入cookie
     res.cookie('error','此用户名已经被占用，请换一个试试');
     res.redirect('back');//让客户端重新向另外一个路径发起请求
   }else{//如果没有找到同名的用户，则重定向到登录页
     //先对密码进行md5加密后才保存
     user.password = crypto.createHash('md5').update(user.password).digest('hex');
     users.push(user);
     res.redirect('/login');
   }
});
//当客户端通过GET方式访问/login的时候，返回登录表单
app.get('/login',function(req,res){
  let error = req.cookies.error||'';
  res.clearCookie('error');
  res.render('login',{title:'用户登录',error});
});
//当客户端提交登录表单之后
app.post('/login',function(req,res){
 let user = req.body;//{username,password}
  //查找一下看看用户数组中有没有符合条件的用户
 let oldUser = users.find(item=>item.username==user.username && item.password == crypto.createHash('md5').update(user.password).digest('hex'));
 if(oldUser){//如果找到了说了登录是成功的
    res.cookie('success','登录成功');
    res.cookie('username',oldUser.username);
    res.redirect('/user');
 }else{//如果没有找到，说明登录是失败的
   res.cookie('error','用户名或密码输入错误');
   res.redirect('back');
 }
});
//用户主页
app.get('/user',function(req,res){
 let success = req.cookies.success||'';
 let error = req.cookies.error||'';
 let username = req.cookies.username||'';
 res.clearCookie('success');
 res.clearCookie('error');
 res.render('user',{title:'用户主页',success,error,username});
});