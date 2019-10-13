#!/bin/bash

docker run \
	-it \
	--rm \
	--env TMDB_API_KEY \
	-p 3176:3176 \
	--name moviesearch \
	moviesearch