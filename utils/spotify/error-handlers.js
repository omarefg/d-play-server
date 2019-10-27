const SpotifyAuthLib = require('../../lib/spotify/SpotifyAuthLib');

const spotifyAuthLib = new SpotifyAuthLib();


async function tokenExpiredHandler(cb) {
    spotifyAuthLib.restartAccessToken();
    const response = await cb();
    return response;
}

function errorHandler(error) {
    if (error.response) {
        return error.response;
    } if (error.request) {
        return error.request;
    }
    return error;
}

module.exports = {
    tokenExpiredHandler,
    errorHandler,
};
