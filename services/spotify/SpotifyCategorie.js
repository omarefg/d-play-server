const axios = require('axios');
const SpotifyAuth = require('./SpotifyAuth');
const { config } = require('../../config');

class SpotifyCategorie {
    constructor() {
        this.spotifyAuth = new SpotifyAuth();
    }

    async getAllCategories({ limit, offset, country }) {
        const accessToken = await this.spotifyAuth.getAccessToken();
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
            throw new Error(error);
        }
    }

    async getCategorieById(id) {
        const accessToken = await this.spotifyAuth.getAccessToken();
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
            throw new Error(error);
        }
    }

    async getACategoryPlaylists({
        limit, offset, country, id,
    }) {
        const accessToken = await this.spotifyAuth.getAccessToken();
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
            throw new Error(error);
        }
    }
}

module.exports = SpotifyCategorie;
