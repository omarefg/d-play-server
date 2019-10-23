const app = require('express')();
const supertest = require('supertest');

function testServer(route) {
    route(app);
    return supertest(app);
}

module.exports = testServer;
