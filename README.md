# where-is-my-driver
A nodejs project to maintain spatial geometry of drivers and search nearby drivers.

## Tech Stack
 - Nodejs -> Express -> Postgres with postGIS

    Nodejs is known for efficient handling of concurrent requests. PostGIS extension is fantastic to work with GIS data. Entry point for the application is index.js. Application can be launched with a mode (development/production). Development mode is configured with debug logs. All the configurations present in the config.js file. All the database interactions happen from helpers/database.js and the template sqls present in helpers/query.js. Error codes and messages are separated out in errors.js file. package.json is configured to handle project dependencies.

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
    - update to host    all     all     172.0.0.1/31   password // So that the app can connect with password
 - sudo /etc/init.d/postgresql restart

## Project Configuration

### Configure database
    Postgres user is used to connect from app. Password needs to be set in order to use it. A DB needs to be created and postgis extension needs to enabled on that. Then the table and index need to be created.

 - sudo -u postgres psql
 - \password // Change the password  for the user postgres and add the same in the config.js (-currrently has postgres123) under the project folder.
 - \q // Exit the psql app
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
