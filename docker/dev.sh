#!/bin/bash

docker run \
	-it \
	--rm \
	--mount type=bind,source=`pwd`,target=/app \
  --mount type=volume,dst=/app/server/node_modules \
  --mount type=volume,dst=/app/client/node_modules \
	moviesearch \
	/bin/sh