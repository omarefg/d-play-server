const SpotifyArtistLib = require('../lib/spotify/SpotifyArtistLib');
const { tokenExpiredHandler } = require('../utils/spotify/error-handlers');

class AlbumService {
    constructor() {
        this.spotifyArtistLib = new SpotifyArtistLib();
    }

    async getMultipleAlbums(ids) {
        let albums = null;
        try {
            albums = await this.spotifyArtistLib.getMultipleAlbums(ids);
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.spotifyArtistLib.getMultipleAlbums(ids);
                albums = await tokenExpiredHandler(cb);
            } else {
                throw new Error(error);
            }
        }
        return albums;
    }

    async getAlbumById(id) {
        let album = null;
        try {
            album = await this.spotifyArtistLib.getAlbumById(id);
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.spotifyArtistLib.getAlbumById(id);
                album = await tokenExpiredHandler(cb);
            } else {
                throw new Error(error);
            }
        }
        return album;
    }

    async getAlbumTracks({ limit, offset, id }) {
        let album = null;
        try {
            album = await this.spotifyArtistLib.getAlbumTracks({ limit, offset, id });
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.spotifyArtistLib.getAlbumTracks({ limit, offset, id });
                album = await tokenExpiredHandler(cb);
            } else {
                throw new Error(error);
            }
        }
        return album;
    }
}

module.exports = AlbumService;
