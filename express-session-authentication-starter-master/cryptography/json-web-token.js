const jwt = require('jsonwebtoken');
const fs = require('fs');

const publicKey = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf8');
const privateKey = fs.readFileSync(__dirname + '/id_rsa_private.pem', 'utf8');

const payloadObject = {
    sub: '3245967924',
    name: 'Tahmid Tanzim',
    admin: false,
    iat: 1629516904787,
    exp: 1629516899907
};

const signedJWT = jwt.sign(payloadObject, privateKey, { algorithm: 'RS256' });
jwt.verify(signedJWT, publicKey, { algorithms: ['RS256'] }, (err, payload) => {
    if(err) {
        console.log('Error - ', err);
    } else {
        console.log('Payload - ', payload);
    }
});