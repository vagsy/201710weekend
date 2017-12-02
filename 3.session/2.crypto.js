let crypto = require('crypto');
/*function setcookie(res, name, val, secret, options) {
  var signed = 's:' + signature.sign(val, secret);
  */

let card = 'jF4D8yHBSpcfOU7S-2RGMzGCbotCszL-';
var sign = function(val, secret){
  return val + '.' + crypto
      .createHmac('sha256', secret)
      .update(val)
      .digest('base64')
      .replace(/\=+$/, '');
};

console.log(sign(card,'zfpx'));

