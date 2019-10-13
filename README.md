### Moviesearch

#### Description

A server proxying requests to the movie db api and serving static files


#### To Run

With docker

- `docker/build.sh`
- `TMDB_API_KEY="your_api_key_here" docker/run.sh`
- Visit localhost:3176



Without docker (Tested with node v12.9.0 on ubuntu 18.04, but expect compatibility with any system running node ^12)

- `cd client`
- `npm install`
- `npm run build`
- `cd server`
- `npm install`
- `node src/app.js`
- Visit localhost:3176


#### Note

To run for development, instead of `npm run build`, use `npm run start` and instead visit localhost:3000
This pattern of development does not appropriately match the production environment but is useful for the hot-rebuild of client-side code