const Movies = require('../controller/movies');

// API Server Endpoints
exports.endpoints = [

{ method: 'GET', path: '/movie/{imdbID}', config: Movies.getOne},
{ method: 'GET', path: '/movies', config: Movies.getAll},
{ method: 'GET', path:'/movies/{id}',config:Movies.getByType}

];