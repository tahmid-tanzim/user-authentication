const crypto = require('crypto');

module.exports.isValidPassword = (password, hash, salt) => {
    const verifyHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return verifyHash === hash;
};

module.exports.generatePassword = (password) => {
    const salt = crypto.randomBytes(32).toString('hex');
    const generatedHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return { salt, hash: generatedHash };
};
