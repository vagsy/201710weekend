let http = require('http');
let url = require('url');
let server = http.createServer(function (req, res) {
   let {pathname} = url.parse(req.url,true);

   //当客户端访问的路径是/write的话就表示写cookie
   if(pathname == '/write'){
     //通过响应头写cookie 格式固定
     //Set-Cookie:name=zfpx
     res.setHeader('Set-Cookie','name=zfpx');
     res.end('write ok');
   }else if(pathname == '/read'){
     //当客户端第二次访问服务器的时候会通过请求头中cookie字段向服务器发请求
     //Cookie:name=zfpx
     let cookie = req.headers.cookie;
     console.log(cookie);
     res.end(cookie);
   }else{
     res.end("404");
   }
}).listen(8080);