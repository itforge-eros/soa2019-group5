'use strict';

/*
 * Module dependencies.
 */

const request = require('supertest');
const { app } = require('../server');
const mongoose = require('mongoose');
const Memo = mongoose.model('Memo');

beforeAll(() => {
  Memo.collection.drop();
});

const token = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwidXNlcl9pZCI6ImJmNzg5NjA0LWFiMDEtNGI0MC04ZTZjLWE1NDk0N2ZjMjAzMyIsImlhdCI6MTU1Njg3ODM0NywiZXhwIjoxNTU4Njc4MzQ3LCJpc3MiOiJsZWN0aW8taXNzdWVyIn0.fYI4hbxrX4BL8YYjkslbWxlA6PQRVkGHt-vwbNLAtHpxeLnuYNREf_2gkqtM3wgsDYnJ1aGtoiK5CsXvmWVpaMb6vweZKlD0-Eq-1XTa5UhYBHjyqqr1BjrIhk_iaa3VGephvDRvoXg1KbyZADgbInQI80818Vw82saKxSPPyexvr9RMSut3OyJ2F0QgZXd4pKQ2bkz54ItGuCi_WFQBJrsWlqr1_qtUSZtsXbfuZfFrVxpsZR8xaOKKRQQ2mihxepv0vVhFu_OUfYRG7yzp2X4SkFbG2G4iNMNIIRfac5t_8etoTT1PUAKAS5HQvgDHGX5-_D1S1viXL9H6cpuEfw`;

describe('Memo Integration Test', () => {
  test('Unauthorize when no token found', done => {
    request(app)
      .get(`/memos`)
      .expect(401)
      .end(done);
  });
  test('When database is empty, GET /memos must return an empty list', done => {
    request(app)
      .get('/memos')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect(response => expect(response.body).toEqual([]))
      .end(done);
  });
  test('POST /memos should redirect to resource of newly created Memo', done => {
    request(app)
      .post('/memos')
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .expect(201)
      .end(done);
  });
});
