let crypto = require('crypto');
let sid = 's%3AIjP7mR5tvdDia5QJyMAOXqdIDk0z-nZC.NEL0MKkGxw8e81PCqKE2PHlrCpMV5nyvfemboEwJipg';
let card = 'IjP7mR5tvdDia5QJyMAOXqdIDk0z-nZC';
var sign = function(val, secret){
  return val + '.' + crypto
      .createHmac('sha256', secret)
      .update(val)
      .digest('base64')
      .replace(/\=+$/, '');
};

console.log(sign(card,'zfpx'));
//IjP7mR5tvdDia5QJyMAOXqdIDk0z-nZC.NEL0MKkGxw8e81PCqKE2PHlrCpMV5nyvfemboEwJipg


