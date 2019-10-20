const SpotifySearchLib = require('../lib/spotify/SpotifySearchLib');
const { tokenExpiredHandler } = require('../utils/spotify/error-handlers');

class SearchService {
    constructor() {
        this.spotifySearchLib = new SpotifySearchLib();
    }

    async search({
        q, type, limit, offset,
    }) {
        let results = null;
        try {
            results = await this.spotifySearchLib.search({
                q, type, limit, offset,
            });
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.spotifySearchLib.search({
                    q, type, limit, offset,
                });
                results = await tokenExpiredHandler(cb);
            } else {
                throw new Error(error);
            }
        }
        return results;
    }
}

module.exports = SearchService;
