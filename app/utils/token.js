const jwt = require('jsonwebtoken');

create = (payload, key, expireTime) => {
    let token = jwt.sign(payload, key, {
        expiresIn: expireTime,
    });

    return token;
}

verify = async (token, key) => {
    return await jwt.verify(token, key);
}

module.exports = {
    create,
    verify
};