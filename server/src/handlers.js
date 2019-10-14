const { tmdbRp } = require('./tmdbUtils.js');

/*
  Possible additions:
  - add a query formatting method for better results 
  - add a formatting layer before returnin the body to remove unnecessary data
*/


/* sample response from tmdb:
{
  "images": {
    "base_url": "http://image.tmdb.org/t/p/",
    "secure_base_url": "https://image.tmdb.org/t/p/",
    "backdrop_sizes": [
      "w300",
      "w780",
      "w1280",
      "original"
    ],
    "logo_sizes": [
      "w45",
      "w92",
      "w154",
      "w185",
      "w300",
      "w500",
      "original"
    ],
    "poster_sizes": [
      "w92",
      "w154",
      "w185",
      "w342",
      "w500",
      "w780",
      "original"
    ],
    "profile_sizes": [
      "w45",
      "w185",
      "h632",
      "original"
    ],
    "still_sizes": [
      "w92",
      "w185",
      "w300",
      "original"
    ]
  },
  "change_keys": [
    "adult",
    "air_date",
    "also_known_as",
    "alternative_titles",
    "biography",
    "birthday",
    "budget",
    "cast",
    "certifications",
    "character_names",
    "created_by",
    "crew",
    "deathday",
    "episode",
    "episode_number",
    "episode_run_time",
    "freebase_id",
    "freebase_mid",
    "general",
    "genres",
    "guest_stars",
    "homepage",
    "images",
    "imdb_id",
    "languages",
    "name",
    "network",
    "origin_country",
    "original_name",
    "original_title",
    "overview",
    "parts",
    "place_of_birth",
    "plot_keywords",
    "production_code",
    "production_companies",
    "production_countries",
    "releases",
    "revenue",
    "runtime",
    "season",
    "season_number",
    "season_regular",
    "spoken_languages",
    "status",
    "tagline",
    "title",
    "translations",
    "tvdb_id",
    "tvrage_id",
    "type",
    "video",
    "videos"
  ]
}
*/

function formatConfig(configBody) {
  const {
    images: {
      base_url: baseUrl,
      poster_sizes: posterSizes = [],
    } = {},
  } = configBody;
  const [posterThumbnailSize = '',,, posterDetailSize = ''] = posterSizes;


  return {
    baseUrl,
    posterThumbnailSize,
    posterDetailSize,
  };
}

async function config(req, res) {
  let body;
  try {
    body = await tmdbRp({
      url: '/configuration',
    })
  }
  catch (e) {
    console.error(e);
  }
  if (!body) return res.sendStatus(502);
  return res.send(formatConfig(body));
}

async function searchByTitle(req, res) {
  const {
    query: {
      query = '',
    },
  } = req;

  let body;
  try {
    body = await tmdbRp({
      url: '/search/movie',
      qs: {
        query,
      },
    });
  }
  catch (e) {
    console.error('[searchByTitle]', e);
  }
  if (!body) return res.sendStatus(502);
  return res.send(body);
}
  
async function getPopular(req, res) {
  let body;
  try {
    body = await tmdbRp({
      url: '/movie/popular',
    });
  }
  catch (e) {
    console.error('[getPopular]', e);
  }
  if (!body) return res.sendStatus(502);
  return res.send(body);
}

// async function getDetail(req, res) {
//   const {
//     params: {
//       movieId,
//     } = {},
//   } = req;

//   console.log(req.params);

//   let body;
//   try {
//     body = await tmdbRp({
//       url: `/movie/${ movieId }`,
//     });
//   }
//   catch (e) {
//     console.error('[getDetail]', e);
//   }
//   if (!body) return res.sendStatus(502);
//   return res.send(body);
// }

async function getDetail(req, res) {
  const {
    params: {
      movieId,
    } = {},
  } = req;

  console.log(req.params);

  let body;
  try {
    body = await Promise.all([
      tmdbRp({
        url: `/movie/${ movieId }`,
      }),
      tmdbRp({
        url: `/movie/${ movieId }/credits`,
      }),
      tmdbRp({
        url: `/movie/${ movieId }/similar`,
      }),
    ]);
  }
  catch (e) {
    console.error('[getAllDetails]', e);
  }
  if (!body) return res.sendStatus(502);
  return res.send(body);
}


module.exports = {
  config,
  searchByTitle,
  getPopular,
  getDetail,
};
