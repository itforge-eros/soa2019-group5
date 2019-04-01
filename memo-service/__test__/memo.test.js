'use strict';

/*
 * Module dependencies.
 */

const request = require('supertest');
const { app, connection } = require('../server');
const mongoose = require('mongoose');
const Memo = mongoose.model('Memo');
const uuid = require('uuid4');

afterAll(() => {
  connection.db.dropCollection('memos');
});

describe('Memo Integration Test', () => {
  test('When database is empty, GET /api/memos must return an empty list', done => {
    request(app)
      .get('/api/memos')
      .expect(200)
      .expect(response => expect(response.body).toEqual([]))
      .end(done);
  });
  test('POST /api/memos should redirect to resource of newly created Memo', done => {
    request(app)
      .post('/api/memos')
      .send({})
      .expect(201)
      .end(done);
  });
  test('PUT /api/memos/:uuid should update memo', done => {
    const memo = new Memo({ uuid: uuid() });
    memo.save();
    request(app)
      .put(`/api/memos/${memo.uuid}`)
      .send({ title: 'title', content: 'content' })
      .expect(200)
      .end(done);
  });
});
