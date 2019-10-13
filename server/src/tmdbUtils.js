const rp = require('request-promise');


module.exports.tmdbRp = rp.defaults({
  baseUrl: 'https://api.themoviedb.org/3',
  json: true,
  qs: {
    api_key: process.env.TMDB_API_KEY,
  },
});
