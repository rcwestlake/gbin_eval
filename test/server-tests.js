const expect = require('chai').expect;
const should = require('chai').should;
const request = require('supertest');
const app = require('../server/server.js');

describe('Server Tests', () => {
  it('/ - should have 200 status', (done) => {
    request(app)
      .get('/')
      .expect(200, done)
  })

  it('/api/grudges - should have 200 status', (done) => {
    request(app)
      .get('/api/grudges')
      .expect(200, done)
  })

  it('/grudge/* - should have 200 status', (done) => {
    request(app)
      .get('/grudge/1')
      .expect(200, done)
  })

  it('/grudge/* - should respond with 200 with different param', (done) => {
    request(app)
      .get('/grudge/2')
      .expect(200, done)
  })

  it('/grudge/* - should post and 200', (done) => {
    request(app)
      .post('/api/grudges')
      .expect(200, done)
  })

  it('/grudge/* - should respond with 200 with different param', (done) => {
    request(app)
      .patch('/api/grudges/2')
      .expect(200, done)
  })

  it('should respond with 404 for no route', (done) => {
    request(app)
      .get('/asfdjkl')
      .expect(404, done)
  })

  it('should respond with 404 for no route', (done) => {
    request(app)
      .get('/grdges/2')
      .expect(404, done)
  })

  it('should respond with 404 for no route', (done) => {
    request(app)
      .get('/1')
      .expect(404, done)
  })
})
