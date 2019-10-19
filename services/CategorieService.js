const axios = require('axios');
const SpotifyService = require('./SpotifyService');
const { config } = require('../config');

class CategorieService {
    constructor() {
        this.spotifyService = new SpotifyService();
        this.categories = null;
    }

    async getSpotifyCategories() {
        const accessToken = await this.spotifyService.getAccessToken();
        const axiosConfig = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        try {
            const { data } = await axios.get(
                `${config.spotifyApi}/browse/categories`,
                axiosConfig,
            );
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAllCategories() {
        if (!this.categories) {
            try {
                this.categories = await this.getSpotifyCategories();
            } catch (error) {
                const { status } = error;
                if (status === 401) {
                    this.spotifyService.restartAccessToken();
                    this.categories = await this.getSpotifyCategories();
                } else {
                    throw new Error(error);
                }
            }
        }
        return this.categories;
    }
}

module.exports = CategorieService;
