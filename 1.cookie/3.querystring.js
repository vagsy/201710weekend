//查询字符串 ?后面的字符串 url地址的问号传参
// http://localhost/users?id=1&age=8
let querystring = require('querystring');
let str = 'id&1@age&8';
// parse 用来把字符串转成对象
//1.先按＆把不同的字段分开，再按=把键和值分开
//sep= separator 字段分割标识符
//eq= equals 每个字段的属性和值之间的分隔符
let obj = querystring.parse(str,'@','&');
console.log(obj);
//查询字符串只是一种格式，并不一定要放在URL地址中的问号后面
//如果说用POST方式提交表单的时候，浏览器也会把表单进行序列化成查询字符串格式，然后放在请求体里提交给服务器
console.log(querystring.stringify(obj,'@','&'));

{/*<form action="">
  <input type="text" name="username"/>a
  <input type="text" name="password"/>b
</form>
序列化的意思就是把一个对象类型的数据转成字符串
username=a&password=b*/}
