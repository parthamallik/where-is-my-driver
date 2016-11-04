# where-is-my-driver
A nodejs project to maintain spatial geometry of drivers and search nearby drivers.
Driver details can be added and search within perticular radius.

## Tech Stack
 - Nodejs -> Express -> Postgress with postGIS

## Installation for Ubuntu
### Nodejs
 - sudo apt-get install build-essential
 - curl -sL https://deb.nodesource.com/setup_6.x | sudo bash -
 - sudo apt-get install nodejs
 - sudo npm update npm -g
 - sudo npm update npm -g (again)
### Postgres
 - sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt xenial-pgdg main" >> /etc/apt/sources.list'
 - wget --quiet -O - http://apt.postgresql.org/pub/repos/apt/ACCC4CF8.asc | sudo apt-key add -
 - sudo apt-get update
 - sudo apt-get install postgresql-9.5-postgis-2.2 postgresql-contrib-9.5
 - sudo vim /etc/postgresql/9.5/main/pg_hba.conf
    - update to host    all     all     172.31.0.0/16   password // So that the app can connect with password
 - sudo /etc/init.d/postgresql restart


## Project Configuration
 ### Configure database
 - sudo -u postgres createdb mytaxi // Create the database
 - sudo -u postgres psql mytaxi // Login to the DB
 - CREATE EXTENSION postgis; // Enable GIS EXTENSION
 - CREATE TABLE driver_loc ( ID integer PRIMARY KEY, location GEOGRAPHY(POINT,4326), ACCURACY real ); // Create the table
 - CREATE INDEX driver_loc_gix ON driver_loc USING GIST ( location ); // Create an index
 ### install node dependencies
 - npm install

 ### Launch application
 - npm start // to run in development mode
 - NODE_ENV=production npm start // to run in production mode

 ### Logs
  - tail -f ./logs/app.log

## Auto test
- npm test // functionality test
- Change the 17th line of test/testcases/driver.js to LOAD=50000 and run npm test again to test the load for driver API









 - sudo vim /etc/apt/sources.list.d/postgresql.list
  - add deb http://apt.postgresql.org/pub/repos/apt/ trusty-pgdg main 9.5
 - sudo apt-get update
 - sudo apt-get install postgresql-9.5 postgresql-contrib
 - sudo /etc/init.d/postgresql restart ( To start postgres server )
 - sudo -u postgres createdb mytaxi ( Create the database )
 -
