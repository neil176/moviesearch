const path = require('path');
const express = require('express');
const cors = require('cors');

const handlers = require('./handlers.js');

function main() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  
  // Server the client bundle and public files

  
  // Support healthchecking
  app.get('/api/healthcheck', (req, res) => res.send({ status: 'OK' }));
  
  // Route to handlers
  app.get('/api/config', handlers.config);
  app.get('/api/searchByTitle', handlers.searchByTitle);
  app.get('/api/getPopular', handlers.getPopular);
  app.get('/api/movies/:movieId', handlers.getDetail);
  
  app.use('*', express.static(path.join(__dirname, '..', '..', 'client', 'build')));
  // reroute any unspecified route
  // app.get('*', (req, res) => {
  //   return res.redirect('/');
  // })

  // Run the app
  app.listen(3176, () => console.log('App listening on port 3176'));
}

main();
