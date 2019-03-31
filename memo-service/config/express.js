/**
 * Module dependencies.
 */

const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');

const env = process.env.NODE_ENV || 'development';

/**
 * Expose
 */

module.exports = function(app) {
  app.use(helmet());
  app.use(cors());

  // Don't log during tests
  // Logging middleware
  if (env !== 'test') app.use(morgan('dev'));

  // bodyParser should be above methodOverride
  app.use(bodyParser.json());
  app.use(
    methodOverride(function(req) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        const method = req.body._method;
        delete req.body._method;
        return method;
      }
    })
  );
};
