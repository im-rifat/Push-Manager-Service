module.exports = {
    secretKey: process.env.ACCESS_TOKEN_SECRET || 'app_secret_key',
    accessTokenLife: process.env.ACCESS_TOKEN_LIFE || 600
}