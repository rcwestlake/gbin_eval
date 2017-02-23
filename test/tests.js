const expect = require('chai').expect;
const should = require('chai').should;
const request = require('supertest');
const app = require('../server/server.js');

describe('Server Tests', () => {
  it('/ - should have 200 status', () => {
    request(app)
      .get('/')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  })

  it('/grudges - should have 200 status', () => {
    request(app)
      .get('/grudges')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  })

  it('/api/grudges - should have 200 status', () => {
    request(app)
      .get('/api/grudges')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  })

  it('/grudge/* - should have 200 status', () => {
    request(app)
      .get('/grudge/1')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  })

  it('/grudge/* - should respond with 200 with different param', () => {
    request(app)
      .get('/grudge/2')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  })
})
