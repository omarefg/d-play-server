const SpotifyAuth = require('../../services/spotify/SpotifyAuth');

const spotifyAuth = new SpotifyAuth();


async function tokenExpiredHandler(cb) {
    spotifyAuth.restartAccessToken();
    const response = await cb();
    return response;
}

module.exports = {
    tokenExpiredHandler,
};
