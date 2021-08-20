const crypto = require('crypto');
const hash = crypto.createHash('sha256');
const fs = require('fs');
const encrypt = require('./encrypt');
const decrypt = require('./decrypt');

const data = {
    first_name: 'Tahmid',
    last_name: 'Tanzim',
    social_security_number: 'Hello World Python'
}

const dataString = JSON.stringify(data);
hash.update(dataString);
const hashedData = hash.digest('hex');

const senderPrivateKey = fs.readFileSync(__dirname + '/id_rsa_private.pem', 'utf8');
const signedMessage = encrypt.encryptWithPrivateKey(senderPrivateKey, hashedData);

module.exports.packageOfDataToSend = {
    algorithm: 'sha256',
    originalData: data,
    signedAndEncryptedData: signedMessage
};