'use strict';

/**
 * Module dependencies.
 */

const fs = require('fs');
const jwt = require('express-jwt');

const memo = require('../app/controllers/api/memo');
/**
 * Read a publickey
 */
const pubJWTKey = fs.readFileSync('public.pem');

/**
 * Expose
 */

module.exports = function(app) {
  app.use(jwt({ secret: pubJWTKey }));
  app.get('/memos', memo.all);
  app.post('/memos', memo.create);
  app.get('/memos/:uuid', memo.get);
  app.put('/memos/:uuid', memo.update);
  app.delete('/memos/:uuid', memo.delete);
  /**
   * Error handling
   */

  app.use(function(err, req, res, next) {
    // treat as 404
    if (
      err.message &&
      (~err.message.indexOf('not found') ||
        ~err.message.indexOf('Cast to ObjectId failed'))
    ) {
      return next();
    }

    if (err.name === 'UnauthorizedError') {
      res.status(401).json({
        url: req.originalUrl,
        error: 'Unauthorized',
        error_code: 401
      });
      return next();
    }
    console.error(err.stack);

    // error page
    res.status(500).json({ error: err.message, error_code: '500' });
  });

  // assume 404 since no middleware responded
  app.use(function(req, res) {
    res.status(404).json({
      url: req.originalUrl,
      error: 'Not found',
      error_code: 404
    });
  });
};
