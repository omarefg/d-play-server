const SpotifyAuth = require('./spotify/SpotifyAuth');
const SpotifyArtist = require('./spotify/SpotifyArtist');
const { tokenExpiredHandler } = require('../utils/spotify/error-handlers');

class ArtistService {
    constructor() {
        this.spotifyAuth = new SpotifyAuth();
        this.spotifyArtist = new SpotifyArtist();
    }

    async getMultipleArtists(ids) {
        let artists = null;
        try {
            artists = await this.spotifyArtist.getMultipleArtists(ids);
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.spotifyArtist.getMultipleArtists(ids);
                artists = await tokenExpiredHandler(cb);
            } else {
                throw new Error(error);
            }
        }
        return artists;
    }

    async getArtistById(id) {
        let artist = null;
        try {
            artist = await this.spotifyArtist.getArtistById(id);
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.spotifyArtist.getArtistById(id);
                artist = await tokenExpiredHandler(cb);
            } else {
                throw new Error(error);
            }
        }
        return artist;
    }
}

module.exports = ArtistService;
