const jwt = require('jsonwebtoken');
const { config } = require('../config');

class AuthService {
    static async refreshUserToken(bearer) {
        try {
            const refreshToken = bearer.replace('Bearer ', '');
            const { authJwtSecret, authJwtRefreshTokenSecret } = config;
            const payload = jwt.verify(refreshToken, authJwtRefreshTokenSecret);
            delete payload.iat;
            delete payload.exp;
            const token = jwt.sign(payload, authJwtSecret, { expiresIn: '15m' });
            return token;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = AuthService;
