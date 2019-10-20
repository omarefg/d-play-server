const SpotifyArtistLib = require('../lib/spotify/SpotifyArtistLib');
const { tokenExpiredHandler } = require('../utils/spotify/error-handlers');

class ArtistService {
    constructor() {
        this.spotifyArtistLib = new SpotifyArtistLib();
    }

    async getMultipleArtists(ids) {
        let artists = null;
        try {
            artists = await this.spotifyArtistLib.getMultipleArtists(ids);
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.spotifyArtistLib.getMultipleArtists(ids);
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
            artist = await this.spotifyArtistLib.getArtistById(id);
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.spotifyArtistLib.getArtistById(id);
                artist = await tokenExpiredHandler(cb);
            } else {
                throw new Error(error);
            }
        }
        return artist;
    }

    async getArtistAlbums(id) {
        let artist = null;
        try {
            artist = await this.spotifyArtistLib.getArtistAlbums(id);
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.spotifyArtistLib.getArtistAlbums(id);
                artist = await tokenExpiredHandler(cb);
            } else {
                throw new Error(error);
            }
        }
        return artist;
    }

    async getArtistTopTracks({ id, market }) {
        let artist = null;
        try {
            artist = await this.spotifyArtistLib.getArtistTopTracks({ id, market });
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.spotifyArtistLib.getArtistTopTracks({ id, market });
                artist = await tokenExpiredHandler(cb);
            } else {
                throw new Error(error);
            }
        }
        return artist;
    }

    async getArtistRelatedArtists(id) {
        let artist = null;
        try {
            artist = await this.spotifyArtistLib.getArtistRelatedArtists(id);
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.spotifyArtistLib.getArtistRelatedArtists(id);
                artist = await tokenExpiredHandler(cb);
            } else {
                throw new Error(error);
            }
        }
        return artist;
    }
}

module.exports = ArtistService;
