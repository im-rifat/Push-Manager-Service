module.exports = {
    accessTokenKey: process.env.ACCESS_TOKEN_KEY || 'access_token_key',
    accessTokenLife: process.env.ACCESS_TOKEN_LIFE || 900000,

    refreshTokenKey: process.env.REFRESH_TOKEN_KEY || 'refresh_token_key',
    refreshTokenLife: process.env.REFRESH_TOKEN_LIFE || 6000000
}