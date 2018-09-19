require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const referrerPolicy = require('referrer-policy');
const mongoose = require('mongoose');
const app = express();

// findAndModify method is deprecated in mongodb native driver
// replace it with findOne*
mongoose.set('useFindAndModify', false);

// Set Mongoose
mongoose.connect(process.env.DB, {
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;
mongoose.connection.on('err', err => {
  console.log(`MongoDB died ${err.message}`);
});
console.log('Connected to DB');

// Set Middleware
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('env', process.env.NODE_ENV);

// Use Routes
app.use('/api', require('./api/routes/index'));
app.use('/api/products', require('./api/routes/products'));
app.use('/api/orders', require('./api/routes/orders'));

app.use((req, res, next) => {
  const error = new Error('Sorry, the page doesn\'t exists');
  error.status = 404;
  next(error);
});

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
