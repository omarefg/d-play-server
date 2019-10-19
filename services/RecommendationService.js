const SpotifyAuth = require('./spotify/SpotifyAuth');
const SpotifyRecommendation = require('./spotify/SpotifyRecommendation');
const { tokenExpiredHandler } = require('../utils/spotify/error-handlers');

class RecommendationService {
    constructor() {
        this.spotifyAuth = new SpotifyAuth();
        this.spotifyRecommendation = new SpotifyRecommendation();
    }

    async getRecommendations({
        artists, genres, tracks, limit,
    }) {
        const data = {
            artists, genres, tracks, limit,
        };
        let recommendations = null;
        try {
            recommendations = await this.spotifyRecommendation.getRecommendations(data);
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.spotifyRecommendation.getRecommendations(data);
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
            recommendations = await this.spotifyRecommendation.getRecommendationGenres();
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.spotifyRecommendation.getRecommendationGenres();
                recommendations = await tokenExpiredHandler(cb);
            } else {
                throw new Error(error);
            }
        }
        return recommendations;
    }
}

module.exports = RecommendationService;
