const SpotifyAuthLib = require('../../lib/spotify/SpotifyAuthLib');

const spotifyAuthLib = new SpotifyAuthLib();


async function tokenExpiredHandler(cb) {
    spotifyAuthLib.restartAccessToken();
    const response = await cb();
    return response;
}

module.exports = {
    tokenExpiredHandler,
};
