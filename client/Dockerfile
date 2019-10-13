FROM node:12 AS builder
# Copy client source
COPY . /app/client
WORKDIR /app/client
# Install dependencies
RUN npm install
# Build client bundle
RUN npm run build

FROM nginx as prodproxy
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/client/build /www/build
