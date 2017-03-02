#!/bin/sh -e

export DEBIAN_FRONTEND=noninteractive

# Update apt-get
apt-get update
apt-get -y upgrade

# Install Curl
apt-get install -y curl

# Git
apt-get install -y git

################################################
############## Redis section ##############
################################################

apt-get install -y redis-server

REDIS_CONF="/etc/redis/redis.conf"

# Edit redis.conf to change daemonize to 'yes':
sed -i "s/daemonize no/daemonize yes/" "$REDIS_CONF"

# Restart so that all new config is loaded:
service redis-server restart

################################################
############## PostgreSQL section ##############
################################################

# Edit the following to change the name of the database user that will be created:
APP_DB_USER=seubiu
APP_DB_PASS=pass123@

# Edit the following to change the name of the database that is created (defaults to the user name)
APP_DB_NAME=$APP_DB_USER

# Edit the following to change the version of PostgreSQL that is installed
PG_VERSION=9.4

PG_REPO_APT_SOURCE=/etc/apt/sources.list.d/pgdg.list
if [ ! -f "$PG_REPO_APT_SOURCE" ]
then
  # Add PG apt repo:
  echo "deb http://apt.postgresql.org/pub/repos/apt/ trusty-pgdg main" > "$PG_REPO_APT_SOURCE"

  # Add PGDG repo key:
  wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -

  apt-get update

fi

# Update package list and upgrade all packages

apt-get -y install "postgresql-$PG_VERSION" "postgresql-contrib-$PG_VERSION"

PG_CONF="/etc/postgresql/$PG_VERSION/main/postgresql.conf"
PG_HBA="/etc/postgresql/$PG_VERSION/main/pg_hba.conf"
PG_DIR="/var/lib/postgresql/$PG_VERSION/main"

# Edit postgresql.conf to change listen address to '*':
sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/" "$PG_CONF"

# Append to pg_hba.conf to add password auth:
echo "host    all             all             all                     md5" >> "$PG_HBA"

# Explicitly set default client_encoding
echo "client_encoding = utf8" >> "$PG_CONF"

# Restart so that all new config is loaded:
service postgresql restart

cat << EOF | su - postgres -c psql
-- Drop the database:
DROP DATABASE IF EXISTS $APP_DB_NAME;

-- Create the database user:
CREATE USER $APP_DB_USER WITH PASSWORD '$APP_DB_PASS';

-- Create the database:
CREATE DATABASE $APP_DB_NAME WITH OWNER=$APP_DB_USER
                                  LC_COLLATE='en_US.utf8'
                                  LC_CTYPE='en_US.utf8'
                                  ENCODING='UTF8'
                                  TEMPLATE=template0;
EOF

echo "Successfully created PostgreSQL dev virtual machine."
echo ""
echo "Your PostgreSQL database has been setup and can be accessed on your local machine on the forwarded port (default: 15432)"
echo "  Host: localhost"
echo "  Port: 15432"
echo "  Database: $APP_DB_NAME"
echo "  Username: $APP_DB_USER"
echo "  Password: $APP_DB_PASS"
echo ""
echo "Admin access to postgres user via VM:"
echo "  vagrant ssh"
echo "  sudo su - postgres"
echo ""
echo "psql access to app database user via VM:"
echo "  vagrant ssh"
echo "  sudo su - postgres"
echo "  PGUSER=$APP_DB_USER PGPASSWORD=$APP_DB_PASS psql -h localhost $APP_DB_NAME"
echo ""
echo "Env variable for application development:"
echo "  DATABASE_URL=jdbc:postgresql://$APP_DB_USER:$APP_DB_PASS@localhost:15432/$APP_DB_NAME"
echo ""
echo "Local command to access the database via psql:"
echo "  PGUSER=$APP_DB_USER PGPASSWORD=$APP_DB_PASS psql -h localhost -p 15432 $APP_DB_NAME"
echo ""

# Install Node.js and NPM
apt-get remove -y nodejs
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
apt-get install -y nodejs

# Install Grunt
npm install -g grunt-cli

# Install db-migrate
npm install -g db-migrate

# Install db-migrate-pg
npm install -g db-migrate-pg

# Install supervisor
npm install -g supervisor

# Install Jasmine
npm install -g jasmine

# Install Mocha
npm install -g mocha

# App dir
APP_DIR=/seubiu

# Create .env
ENV_FILE=$APP_DIR/.env
if [ ! -f $ENV_FILE ]
then
    echo "DB_NAME=$APP_DB_NAME" >> $ENV_FILE
    echo "DB_PROTOCOL=postgres" >> $ENV_FILE
    echo "DB_USERNAME=$APP_DB_USER" >> $ENV_FILE
    echo "DB_PASSWORD=$APP_DB_PASS" >> $ENV_FILE
    echo "DB_HOST=localhost" >> $ENV_FILE
    echo "DB_PORT=5432" >> $ENV_FILE
    echo "DB_DEBUG=true" >> $ENV_FILE
    echo "DB_POOL_MAX=50" >> $ENV_FILE
    echo "REDIS_HOST=localhost" >> $ENV_FILE
    echo "REDIS_PORT=6379" >> $ENV_FILE
    echo "REDIS_POOL_MAX=50" >> $ENV_FILE
    echo "SESSION_SECRET=7Cr02c0Q00281fxDAr1OuC25nBK6E8j7" >> $ENV_FILE
fi

cd $APP_DIR

# Install the NPM dependencies
npm install

# Run db-migrate
# NODE_ENV=development db-migrate up

# Sync database
#NODE_ENV=development && node utils/sync-db.js

# Bootstrap database
#NODE_ENV=development && node utils/bootstrap-db.js

grunt initdb

echo ""
echo "The environment was created successfully."
