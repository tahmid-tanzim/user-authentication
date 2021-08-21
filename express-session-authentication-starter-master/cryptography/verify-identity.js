const crypto = require('crypto');
const fs = require('fs');
const decrypt = require('./decrypt');

const { packageOfDataToSend: received_data } = require('./sign-message');

const hash = crypto.createHash(received_data.algorithm);
const publicKey = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf8');

const decryptedMessage = decrypt.decryptWithPublicKey(publicKey, received_data.signedAndEncryptedData);
const decryptedMessageHex = decryptedMessage.toString();

const hashOfOriginal = hash.update(JSON.stringify(received_data.originalData));
const hashOfOriginalHex = hash.digest('hex');

if(hashOfOriginalHex === decryptedMessageHex) {
    console.log('Success! this data is not tempred');
} else {
    console.log('Uh oh! data is corrupted');
}