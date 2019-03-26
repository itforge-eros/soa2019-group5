'use strict';

/**
 * Module dependencies.
 */

const home = require('../app/controllers/home');
const memo = require('../app/controllers/api/memo');

/**
 * Expose
 */

module.exports = function(app) {
  app.get('/', home.index);
  app.get('/api/memos', memo.all);
  app.post('/api/memos', memo.create);
  app.get('/api/memos/:uuid', memo.get);
  app.put('/api/memos/:uuid', memo.update);
  app.delete('/api/memos/:uuid', memo.delete);
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
    console.error(err.stack);
    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function(req, res) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });
};
