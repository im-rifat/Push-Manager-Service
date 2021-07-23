const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const secretKey = process.env.CRYPTO_SECRET_KEY;
const key_in_bytes = crypto.scryptSync(secretKey, 'salt', 32);
const iv = crypto.scryptSync('you-see_not_4-mind', 'salt', 16);

const encrypt = (text) => {

    const cipher = crypto.createCipheriv(algorithm, key_in_bytes, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return encrypted.toString('hex');
};

const decrypt = (hash) => {

    const decipher = crypto.createDecipheriv(algorithm, key_in_bytes, Buffer.from(iv, 'hex'));

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]);

    return decrpyted.toString();
};

module.exports = {
    encrypt,
    decrypt
};