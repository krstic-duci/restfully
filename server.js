const http = require('http');
const express = require('express');
const app = require('./app');

const server = http.createServer(app);
server.listen(process.env.PORT || 4050, () => {
  console.log('Server is UP!');
});
