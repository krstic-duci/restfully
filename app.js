require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const referrerPolicy = require('referrer-policy');
const mongoose = require('mongoose');
const format = require('date-fns/format');
const app = express();

// findAndModify method is deprecated in mongodb native driver
// replace it with findOne*
mongoose.set('useFindAndModify', false);

// Removed deprecation warning for collection.ensureIndex
mongoose.set('useCreateIndex', true);

// Set Mongoose
mongoose.connect(process.env.DB, {
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;
mongoose.connection.on('err', err => {
  console.log(`MongoDB died ${err.message}`);
});
console.log('Connected to MongoDB');

// Set Middleware
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
app.use(helmet());
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('env', process.env.NODE_ENV);

// Set locals for date-fns/format
app.locals.format = format;

// Use Routes
app.use('/api', require('./api/routes/index'));
app.use('/api/users', require('./api/routes/users'));
app.use('/api/products', require('./api/routes/products'));
app.use('/api/orders', require('./api/routes/orders'));

// Set error handler for 404
app.use((req, res, next) => {
  const error = new Error('Sorry, the page doesn\'t exists. Please try something else...');
  error.status = 404;
  next(error);
});

// Log error message in dev
app.use((err, req, res, next) => {
  const getErr = app.get('env') === 'dev' ? err.message : {};
  res.status(err.status || 500);
  res.json({
    error: getErr
  });
});

module.exports = app;

// Uncaught promise rejections
process.on('unhandledRejection', error => {
  console.error('Uncaught Error', error);
});
