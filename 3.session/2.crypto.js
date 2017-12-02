let crypto = require('crypto');
let card = 's%3AVaDhaJILAIcrsQayyTGUxvrLwzcl0hE4';
var sign = function(val, secret){
  return val + '.' + crypto
      .createHmac('sha256', secret)
      .update(val)
      .digest('base64')
      .replace(/\=+$/, '');
};

console.log(sign(card,'zfpx'));
// H7Vv7cMtftcO+GPX23v+gNiWudQthjkAny6fIRtXAFU
// SBREk7RGvVt6E6Vph8zJNCAZSPDZZRS07G35rN8Yz1s
