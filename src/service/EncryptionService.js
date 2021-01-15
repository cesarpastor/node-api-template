
const appConfig = require("../../config/AppConfig");
const crypto = require('crypto');

const algo = 'aes256';
const secretKey = appConfig.encSecretKey;

exports.encrypt = function encrypt(val){
    
    const cipher = crypto.createCipher(algo, secretKey);
    const encrypted = cipher.update(val, 'utf8', 'hex') + cipher.final('hex');
    return encrypted;
  };
  
  exports.decrypt = function decrypt(val){
    const decipher = crypto.createDecipher(algo, secretKey);
    const decrypted = decipher.update(val, 'hex', 'utf8') + decipher.final('utf8');
    return decrypted;
  };