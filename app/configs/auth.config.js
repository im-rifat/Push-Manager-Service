module.exports = {
    accessTokenKey: process.env.ACCESS_TOKEN_KEY || 'access_token_key',
    accessTokenLife: process.env.ACCESS_TOKEN_LIFE || 60000,

    refreshTokenKey: process.env.REFRESH_TOKEN_KEY || 'refresh_token_key',
    refreshTokenLife: process.env.REFRESH_TOKEN_LIFE || 600000
}