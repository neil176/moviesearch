const { tmdbRp } = require('./tmdbUtils.js');

/*
  Possible additions:
  - add a query formatting method for better results
  - add a formatting layer before returnin the body to remove unnecessary data
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


async function getDetail(req, res) {
  const {
    params: {
      movieId,
    } = {},
  } = req;

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
