#!/bin/bash

#The variables that need to be changed for every new microservice
# Change the variables below to match the service for the MS BEING DEPLOYED

#The db container name
DB_CONTAINER_NAME=quantal_email_service_db

# the db server port that is exposed to the host / outside world
DB_PORT_EXPOSED_ON_HOST=5437

# the db server port that is exposed on the container network i.e. (the default host:port on the container side)
DB_PORT_EXPOSED_ON_DB_CONTAINER=5432

# the web app server port that is exposed to the host / outside world
WEB_APP_PORT=9100

MS_NAME=$(echo $(pwd) | rev | cut -d'/' -f 2 | rev)


# for node apps only
NODE_ENV=development