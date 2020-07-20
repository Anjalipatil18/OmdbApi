const Hapi = require('hapi');
const Routes = require('./route/movies');
const mongoose = require('mongoose');
const config = require('./config/dev');

mongoose.connect(config.DB_URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
console.log("Connection with database succeeded.");
});

const server=Hapi.server({
    host:'localhost',
    port:8000
});

server.route(Routes.endpoints);

// Start the server
async function start() {
    try {
      await server.start();
    }
    catch (err) {
      console.log(err);
      process.exit(1);
    }
    console.log('Server running at:', server.info.uri);
  };
  
start();