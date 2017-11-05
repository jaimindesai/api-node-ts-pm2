let crypto;
try {
    crypto = require('crypto');
} catch (err) {
    console.log('crypto support is disabled!');
}


export function sha256(txt, salt) {
    let hash = crypto.createHash('sha256', salt);
    hash.update(txt);
    return {
        salt: salt,
        txtHash: hash.digest('hex')
    }
}
export function generateSalt(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
};
export function generateHash(txt: string, randomSalt: boolean, presalt?: string) {
    let salt = randomSalt ? generateSalt(16) : presalt || "AbcDef#A!"//TODO: update => settings.SALT;
    let hashData = sha256(txt, salt);
    return hashData;
}



