const assert = require('assert');
const proxyquire = require('proxyquire');

const testServer = require('../utils/test-server');

const {
    albumsMock,
    albumMock,
    albumTracksMock,
    AlbumServiceMock,
} = require('../utils/mocks/albums');


describe('route - albums', () => {
    const route = proxyquire('../routes/albums.js', {
        '../services/AlbumService': AlbumServiceMock,
    });

    const request = testServer(route);

    describe('GET /albums', () => {
        it('sould response with status 200', (done) => {
            request.get('/api/albums').expect(200, done);
        });

        it('should response with the list of albums', (done) => {
            request.get('/api/albums').end((_err, res) => {
                assert.deepStrictEqual(res.body, {
                    data: albumsMock,
                    message: 'albums',
                });

                done();
            });
        });
    });

    describe('GET /albums/:id', () => {
        it('sould response with status 200', (done) => {
            request.get('/api/albums/382ObEPsp2rxGrnsizN5TX').expect(200, done);
        });

        it('should response with the album', (done) => {
            request.get('/api/albums/382ObEPsp2rxGrnsizN5TX').end((_err, res) => {
                assert.deepStrictEqual(res.body, {
                    data: albumMock,
                    message: 'album',
                });

                done();
            });
        });
    });

    describe('GET /albums/:id/tracks', () => {
        it('sould response with status 200', (done) => {
            request.get('/api/albums/382ObEPsp2rxGrnsizN5TX/tracks').expect(200, done);
        });

        it('should response with the album tracks', (done) => {
            request.get('/api/albums/382ObEPsp2rxGrnsizN5TX/tracks').end((_err, res) => {
                assert.deepStrictEqual(res.body, {
                    data: albumTracksMock,
                    message: 'album tracks',
                });

                done();
            });
        });
    });
});
