const SpotifyAuth = require('./spotify/SpotifyAuth');
const SpotifyCategorie = require('./spotify/SpotifyCategorie');
const { tokenExpiredHandler } = require('../utils/spotify/error-handlers');

class CategorieService {
    constructor() {
        this.spotifyAuth = new SpotifyAuth();
        this.spotifyCategorie = new SpotifyCategorie();
    }

    async getAllCategories({ limit, offset, country }) {
        const data = { limit, offset, country };
        let categories = null;
        try {
            categories = await this.spotifyCategorie.getAllCategories(data);
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.spotifyCategorie.getAllCategories(data);
                categories = await tokenExpiredHandler(cb);
            } else {
                throw new Error(error);
            }
        }
        return categories;
    }

    async getCategorieById(id) {
        let categorie = null;
        try {
            categorie = await this.spotifyCategorie.getCategorieById(id);
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.spotifyCategorie.getCategorieById(id);
                categorie = await tokenExpiredHandler(cb);
            } else {
                throw new Error(error);
            }
        }
        return categorie;
    }

    async getACategoryPlaylists({
        limit, offset, country, id,
    }) {
        const data = {
            limit, offset, country, id,
        };
        let playlists = null;
        try {
            playlists = await this.spotifyCategorie.getACategoryPlaylists(data);
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.spotifyCategorie.getACategoryPlaylists(data);
                playlists = await tokenExpiredHandler(cb);
            } else {
                throw new Error(error);
            }
        }
        return playlists;
    }
}

module.exports = CategorieService;
