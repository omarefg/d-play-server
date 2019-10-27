const { config } = require('../config');

const { nodeEnv } = config;

function cacheResponse(res, seconds) {
    if (!nodeEnv === 'development') {
        res.set('cache-control', `public, max-age=${seconds}`);
    }
}

module.exports = cacheResponse;
