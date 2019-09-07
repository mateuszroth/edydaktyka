const crypto = require('crypto');

function randomString(): string {
    return crypto.randomBytes(4).toString('hex');
}

export default function encryptPassword(
    password: string,
    salt: string = randomString(),
): { salt: string; hash: string } {
    const hash = crypto.createHmac('sha512', salt).update(password);

    return {
        salt,
        hash: hash.digest('hex'),
    };
}
