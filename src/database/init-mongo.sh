#!/bin/bash

# Create and Run a MongoDB Server in a Docker Container
# MongoDB contains the Sakila Template DB
#
# The initialized Sakila DB will always be at the same starting state. 
# You can modify it but these modification will lost when you stop the container.
# The container is used to provide a reliable fix database for applicaiton development.
# So you can focus on the the used technologies and should not concern about the initialization and populating of the database.
#
# See more about the Sakila Template and its Mongo Version:
#	- https://dev.mysql.com/doc/sakila/en/
#	- http://guyharrison.squarespace.com/blog/2015/3/23/sakila-sample-schema-in-mongodb.html
#	- https://medium.com/dbkoda/mongodb-sample-collections-52d6a7745908
#
# Created: 2019-05-01

MONGO_HOST_IP=172.21.0.10
MONGO_NETWORK_MASK=172.21.0.0/16
MONGO_NETWORK_NAME=mongodb-network

docker network create -d bridge --subnet $MONGO_NETWORK_MASK $MONGO_NETWORK_NAME
docker run --detach --network $MONGO_NETWORK_NAME --ip $MONGO_HOST_IP mongo

chmod +r jsons/*.json

mongoimport --host $MONGO_HOST_IP --db webtech_2_assignment --collection shutter_colors --file jsons/shutter_colors.json --jsonArray
mongoimport --host $MONGO_HOST_IP --db webtech_2_assignment --collection shutter_materials --file jsons/shutter_materials.json --jsonArray
mongoimport --host $MONGO_HOST_IP --db webtech_2_assignment --collection shutter_types --file jsons/shutter_types.json --jsonArray
mongoimport --host $MONGO_HOST_IP --db webtech_2_assignment --collection orders --file jsons/orders.json --jsonArray

mongo --host $MONGO_HOST_IP
