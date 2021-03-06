require('dotenv').config();

const config = {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT || '3300',
    cors: process.env.CORS,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    authJwtSecret: process.env.AUTH_JWT_SECRET,
    authJwtRefreshTokenSecret: process.env.AUTH_JWT_REFRESH_TOKEN_SECRET,
    spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    spotifyApi: process.env.SPOTIFY_API,
    apiUrl: process.env.API_URL,
    emailUser: process.env.EMAIL_USER,
    emailPass: process.env.EMAIL_PASS,
    emailSecret: process.env.EMAIL_SECRET,
    clientUrl: process.env.CLIENT_URL,
    apiUrlWithoutPort: process.env.API_URL_WITHOUT_PORT,
    clientUrlWithoutPort: process.env.CLIENT_URL_WITHOUT_PORT,
    acrcloudHost: process.env.ACRCLOUD_HOST,
    acrcloudAccessKey: process.env.ACRCLOUD_ACCESS_KEY,
    acrcloudAccessSecret: process.env.ACRCLOUD_ACCESS_SECRET,
};

module.exports = { config };
