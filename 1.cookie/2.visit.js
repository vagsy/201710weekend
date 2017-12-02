/**
 * 当客户端访问服务器的时候，服务器会显示 此客户端访问服务器的次数
 */
let http = require('http');
let url = require('url');
let querystring = require('querystring');
http.createServer(function (req, res) {
  let {pathname} = url.parse(req.url, true);
  res.setHeader('Content-Type','text/html;charset=utf-8');
  if (pathname == '/visit') {
    // visit=10
    let cookie = req.headers.cookie;//visit=1
    let visit = 1;//visit的默认值是1
    if(cookie){
      //cookie并不是真正的查询字符串，所以不同字段的分割符是; ,而非&.所以在解析的时候要注意传入字段分割符
      console.log(cookie);
      let cookieObj = querystring.parse(cookie,"; ");
      console.log(cookieObj);
      if(cookieObj.visit){
        visit = (isNaN(cookieObj.visit)?0:parseInt(cookieObj.visit))+1;//在字符串前加1，会返回一个数字
      }
    }
    res.setHeader('Set-Cookie',`visit=${visit}`);
    res.end(`亲，欢迎你第${visit}次光临`);
  } else {
    res.end('404');
  }
}).listen(8080);