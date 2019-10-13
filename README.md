## Moviesearch

### Description

A server proxying requests to the movie db api and serving static files
A frontend that allows users to view current popular movies, search for movies, and see detailed info about any individual movie


### To Run

With docker

- `docker/build.sh`
- `TMDB_API_KEY="your_api_key_here" docker/run.sh`
- Visit [localhost:3176](localhost:3176)



Without docker (Tested with node v12.9.0 on ubuntu 18.04, but expect compatibility with any system running node ^12)

- `cd client`
- `npm install`
- `npm run build`
- `cd server`
- `npm install`
- `node src/app.js`
- Visit localhost:3176

**Note:** To run for development, instead of `npm run build`, use `npm run start` and instead visit localhost:3000
This pattern of development does not appropriately match the production environment but is useful for the hot-rebuild of client-side code

### Features that should come next

- A cache to reduce requests to TMDB api
  - A redis cache storing the response body of each request
  - The request endpoint (stripped of the api_key param and perhaps stripped of the base url) would make for an appropriate key
  - This cache might reasonably be emptied daily to simplify keeping data up to date without becoming imposing on application logic
  - It may also be reasonable to simply store this cached data in a dictionary in the application as this server will use minimal memory otherwise and will instead mostly be limited by network throughput, making the use of application memory more cost effective
- A redux store for the client
  - I decided this wasn't necessary as the current levle of complexity is quite managable, but with some additions that could change
- More detailed routing to support semantic links to search results
- PropType validation
- Testing

