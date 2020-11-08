const { PORT } = require('./config');
const http = require('http');
const app = require('./app');

const port = PORT;

const server = http.createServer(app);

server.listen(port, () => console.log('Server is listening on port: ', port));
