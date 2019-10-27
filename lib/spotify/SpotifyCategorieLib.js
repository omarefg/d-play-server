const axios = require('axios');
const SpotifyAuthLib = require('./SpotifyAuthLib');
const { config } = require('../../config');
const { errorHandler } = require('../../utils/spotify/error-handlers');

class SpotifyCategorieLib {
    constructor() {
        this.spotifyAuthLib = new SpotifyAuthLib();
    }

    async getAllCategories({ limit, offset, country }) {
        const accessToken = await this.spotifyAuthLib.getAccessToken();
        const axiosConfig = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        try {
            const { data } = await axios.get(
                `${config.spotifyApi}/browse/categories?${country ? `country=${country}` : ''}&offset=${offset || 0}&limit=${limit || 20}`,
                axiosConfig,
            );
            return data;
        } catch (error) {
            throw errorHandler(error);
        }
    }

    async getCategorieById(id) {
        const accessToken = await this.spotifyAuthLib.getAccessToken();
        const axiosConfig = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        try {
            const { data } = await axios.get(
                `${config.spotifyApi}/browse/categories/${id}`,
                axiosConfig,
            );
            return data;
        } catch (error) {
            throw errorHandler(error);
        }
    }

    async getACategoryPlaylists({
        limit, offset, country, id,
    }) {
        const accessToken = await this.spotifyAuthLib.getAccessToken();
        const axiosConfig = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        try {
            const { data } = await axios.get(
                `${config.spotifyApi}/browse/categories/${id}/playlists?${country ? `country=${country}` : ''}&offset=${offset || 0}&limit=${limit || 20}`,
                axiosConfig,
            );
            return data;
        } catch (error) {
            throw errorHandler(error);
        }
    }
}

module.exports = SpotifyCategorieLib;
