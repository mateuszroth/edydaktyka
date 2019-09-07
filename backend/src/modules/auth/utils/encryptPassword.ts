const crypto = require('crypto');

function randomString () {
    return crypto.randomBytes(4).toString('hex');
};

export default function encryptPassword (password) {
    const salt = randomString();
    const hash = crypto.createHmac('sha512', salt).update(password);

    return {
      salt,
      hash: hash.digest('hex')
    }
};