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

const token = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwidXNlcl9pZCI6ImJmNzg5NjA0LWFiMDEtNGI0MC04ZTZjLWE1NDk0N2ZjMjAzMyIsImlhdCI6MTU1NTIwNTQzNiwiZXhwIjoxNTU3MDA1NDM2LCJpc3MiOiJsZWN0aW8taXNzdWVyIn0.lsfeQsbU7Z9c5V-9yrq7JW3YrSjywaEd2nBysFzVpQKjyZvEdwBKIROV40b8m84NIsTZULqoL07s8XvBuyaxIjnvyBwPFa-2jYwYw6BtV8Ah6ua70J19iI4BU8_6dNp18IauMU-0OTKNJnh9Pq4bAySlfH5oTs5P4mHM7RAW7bnwnFn5-o6oNHD0tkpBHWX5iSGkD4Kvi7ZxeNS6XOb-R5S6kKgp7K2pNVRuGam5v4sDZk_BXHkmQ2yO-tV1w1B8KgqqFqzhAyl3NIT4NmNAsfHCd9QIGngcq_wrT0nWXTCv_RzToAnsa0tzqU1iyqe09pBYWpPOGoRTF-_VJXBbLg`;

describe('Memo Integration Test', () => {
  test('Unauthorize when no token found', done => {
    request(app)
      .get(`/api/memos`)
      .expect(401)
      .end(done);
  });
  test('When database is empty, GET /api/memos must return an empty list', done => {
    request(app)
      .get('/api/memos')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect(response => expect(response.body).toEqual([]))
      .end(done);
  });
  test('POST /api/memos should redirect to resource of newly created Memo', done => {
    request(app)
      .post('/api/memos')
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .expect(201)
      .end(done);
  });
});
