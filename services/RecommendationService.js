const SpotifyRecommendationLib = require('../lib/spotify/SpotifyRecommendationLib');
const { tokenExpiredHandler } = require('../utils/spotify/error-handlers');

class RecommendationService {
    constructor() {
        this.spotifyRecommendationLib = new SpotifyRecommendationLib();
    }

    async getRecommendations({
        artists, genres, tracks, limit,
    }) {
        const data = {
            artists, genres, tracks, limit,
        };
        let recommendations = null;
        try {
            recommendations = await this.spotifyRecommendationLib.getRecommendations(data);
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.spotifyRecommendationLib.getRecommendations(data);
                recommendations = await tokenExpiredHandler(cb);
            } else {
                throw new Error(error);
            }
        }
        return recommendations;
    }

    async getRecommendationGenres() {
        let recommendations = null;
        try {
            recommendations = await this.spotifyRecommendationLib.getRecommendationGenres();
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.spotifyRecommendationLib.getRecommendationGenres();
                recommendations = await tokenExpiredHandler(cb);
            } else {
                throw new Error(error);
            }
        }
        return recommendations;
    }

    async getNewReleases({ limit, offset, country }) {
        const data = { limit, offset, country };
        let recommendations = null;
        try {
            recommendations = await this.spotifyRecommendationLib.getNewReleases(data);
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.spotifyRecommendationLib.getNewReleases(data);
                recommendations = await tokenExpiredHandler(cb);
            } else {
                throw new Error(error);
            }
        }
        return recommendations;
    }

    async getFeaturedPlaylists({ limit, offset, country }) {
        const data = { limit, offset, country };
        let recommendations = null;
        try {
            recommendations = await this.spotifyRecommendationLib.getFeaturedPlaylists(data);
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.spotifyRecommendationLib.getFeaturedPlaylists(data);
                recommendations = await tokenExpiredHandler(cb);
            } else {
                throw new Error(error);
            }
        }
        return recommendations;
    }
}

module.exports = RecommendationService;
