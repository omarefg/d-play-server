const SpotifyAlbumLib = require('../lib/spotify/SpotifyAlbumLib');
const { tokenExpiredHandler } = require('../utils/spotify/error-handlers');

class AlbumService {
    constructor() {
        this.spotifyAlbumLib = new SpotifyAlbumLib();
    }

    async getMultipleAlbums(ids) {
        let albums = null;
        try {
            albums = await this.spotifyAlbumLib.getMultipleAlbums(ids);
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.spotifyAlbumLib.getMultipleAlbums(ids);
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
            album = await this.spotifyAlbumLib.getAlbumById(id);
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.spotifyAlbumLib.getAlbumById(id);
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
            album = await this.spotifyAlbumLib.getAlbumTracks({ limit, offset, id });
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.spotifyAlbumLib.getAlbumTracks({ limit, offset, id });
                album = await tokenExpiredHandler(cb);
                console.log(album);
            } else {
                throw new Error(error);
            }
        }
        return album;
    }
}

module.exports = AlbumService;
