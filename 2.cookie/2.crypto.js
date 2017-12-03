//加密 是一个用来加密的内置模块
let crypto = require('crypto');
let str = 'hello';
/**
 * md5是众多的哈希算法中的一个，哈希算法又称为摘要算法。
 * createHash 指定算法
 * update 用来指定要加密的字符串
 * digest 以16进制的格式输出摘要结果
 * 1. 任意长度的输入一定会产生相同长度的输出
 * 2. 不同的输入一定要产生不同的输出
 * 3. 不能从输出内容反推输入的值
 */
let res = crypto.createHash('md5').update('123').digest('hex');
console.log(res);
//c4ca4238a0b923820dcc509a6f75849b
//202cb962ac59075b964b07152d234b70