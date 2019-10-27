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

    async getRecommendationPageData({ country }) {
        const data = { limit: 50, offset: 0, country };
        let recommendations = null;
        try {
            const { playlists } = await this.getFeaturedPlaylists(data);
            const { albums } = await this.getNewReleases(data);
            recommendations = { playlists, recommendations: albums };
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.getFeaturedPlaylists(data);
                const cb2 = () => this.getNewReleases(data);
                const setRecomendations = async () => ({
                    playlists: await tokenExpiredHandler(cb),
                    recommendations: await tokenExpiredHandler(cb2),
                });
                recommendations = await setRecomendations();
                console.log(recommendations);
            } else {
                throw new Error(error);
            }
        }
        return recommendations;
    }

    async getPlaylistTracks({ limit, offset, id }) {
        let playlist = null;
        try {
            playlist = await this.spotifyRecommendationLib.getPlaylistTracks({ limit, offset, id });
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.spotifyRecommendationLib
                    .getPlaylistTracks({ limit, offset, id });
                playlist = await tokenExpiredHandler(cb);
                console.log(playlist);
            } else {
                throw new Error(error);
            }
        }
        return playlist;
    }
}

module.exports = RecommendationService;
