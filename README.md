# where-is-my-driver
A nodejs project to maintain spatial geometry of drivers and search nearby drivers.
Driver details can be added and search within perticular radius.

## Tech Stack
 - Nodejs -> Express -> Postgress with postGIS

## Installation for Ubuntu
 - sudo apt-get install build-essential
 - curl -sL https://deb.nodesource.com/setup_6.x | sudo bash -
 - sudo apt-get install nodejs
 - sudo npm update npm -g
 - sudo npm update npm -g (again)
 - sudo vim /etc/apt/sources.list.d/postgresql.list
  - add deb http://apt.postgresql.org/pub/repos/apt/ trusty-pgdg main 9.5
 - sudo apt-get update
 - sudo apt-get install postgresql-9.5

