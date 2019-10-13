FROM node:12 AS builder
# Copy client source
COPY ./client /app/client
WORKDIR /app/client
# Install dependencies
RUN npm install
# Build client bundle
RUN npm run build

# Build production image (copying in client bundle)
FROM node:12-alpine AS production
# Switch to a non-root user
RUN adduser -D apprunner
USER apprunner
# Copy build and public folders from our intermediate container
COPY --from=builder /app/client/build /home/apprunner/app/client/build 
# Copy in the server source 
COPY ./server /home/apprunner/app/server
WORKDIR /home/apprunner/app/server
# Install dependencies
RUN npm install
# Set to production to avoid exposing server-side stack traces
ENV NODE_ENV=production
# Run
CMD [ "node", "src/app.js" ]
