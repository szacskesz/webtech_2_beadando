## Webtech 2 assignment
Create by Szacsuri Norbert (G0XXTC)

# Prerequisites
* Docker
* Git
* Npm
* MongoDB
* Web-browser

# Usage
Open 2 terminal and follow the instructions.
* 1st terminal:
	* sudo service docker restart
	* sudo docker network rm mongodb-network
	* mkdir final2
	* cd final2
	* git clone https://github.com/szacskesz/webtech_2_beadando.git
	* cd webtech_2_beadando
	* git status
	* cd src
	* cd database
	* chmod u+x ./init-mongo.sh
	* sudo ./init-mongo.sh
* 2nd terminal:
	* cd final2
	* cd webtech_2_beadando
	* npm install
	* npm test
	* npm start
	

# Developer notes:
* Command to export collections:
	* mongoexport -d <database> -c <collection_name> -o <output-filename> --jsonArray --pretty