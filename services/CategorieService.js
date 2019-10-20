const SpotifyCategorieLib = require('../lib/spotify/SpotifyCategorieLib');
const { tokenExpiredHandler } = require('../utils/spotify/error-handlers');

class CategorieService {
    constructor() {
        this.spotifyCategorieLib = new SpotifyCategorieLib();
    }

    async getAllCategories({ limit, offset, country }) {
        const data = { limit, offset, country };
        let categories = null;
        try {
            categories = await this.spotifyCategorieLib.getAllCategories(data);
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.spotifyCategorieLib.getAllCategories(data);
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
            categorie = await this.spotifyCategorieLib.getCategorieById(id);
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.spotifyCategorieLib.getCategorieById(id);
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
            playlists = await this.spotifyCategorieLib.getACategoryPlaylists(data);
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.spotifyCategorieLib.getACategoryPlaylists(data);
                playlists = await tokenExpiredHandler(cb);
            } else {
                throw new Error(error);
            }
        }
        return playlists;
    }
}

module.exports = CategorieService;
