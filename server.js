const http = require('http');
const app = require('./app');

const server = http.createServer(app);
server.listen(process.env.PORT || 4050, () => {
  console.log('Server is UP!');
});
