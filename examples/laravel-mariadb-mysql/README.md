Laravel MariaDB/MySQL Example
=============================

This example exists primarily to test the following documentation:

* [Laravel Recipe](https://docs.devwithlando.io/tutorials/laravel.html)

Versions of MariaDB 10.3.x and lower do not have the mariadb command and must use the mysql executable.

## Start up tests

Run the following commands to get up and running with this example.

```bash
# Should poweroff
lando poweroff

# Initialize an empty laravel recipe
rm -rf mariadb && mkdir -p mariadb && cd mariadb
lando init --source cwd --recipe laravel --webroot app/public --name lando-laravel-mariadb --option cache=redis --option php='8.3' --option database=mariadb:10.3
cp -f ../../.lando.upstream.yml .lando.upstream.yml && cat .lando.upstream.yml

# Should composer create-project a new laravel app
cd mariadb
lando composer create-project --prefer-dist laravel/laravel app

# Should start up successfully
cd mariadb
lando start
```

## Verification commands

Run the following commands to validate things are rolling as they should.

```bash
# Should return the laravel default page
cd mariadb
lando exec appserver -- curl -L localhost | grep "Laravel"

# Should install 4.x version of laravel/installer
cd mariadb
lando exec appserver -c 'cd /var/www/.composer && composer show laravel/installer' | grep 'v4.'

# Should use 8.3 as the default php version
cd mariadb
lando php -v | grep "PHP 8.3"

# Should be running apache 2.4 by default
cd mariadb
lando exec appserver -- apachectl -V | grep 2.4
lando exec appserver -- curl -IL localhost | grep Server | grep 2.4

# Should be running mariadb 10.3.x by default
cd mariadb
lando mysql -V | grep "MariaDB" | grep 10.3.

# Should not enable xdebug by default
cd mariadb
lando php -m | grep xdebug || echo $? | grep 1

# Should have redis running
cd mariadb
lando exec cache -- redis-cli CONFIG GET databases

# Should use the default database connection info
cd mariadb
lando mysql -ularavel -plaravel laravel -e quit

# Should use the default mariadb config file
cd mariadb
lando exec database -- cat /opt/bitnami/mariadb/conf/my_custom.cnf | grep "innodb_lock_wait_timeout = 121"
lando mysql -u root -e "show variables;" | grep innodb_lock_wait_timeout | grep 121

# Should have artisan available
cd mariadb
lando artisan env
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
cd mariadb
lando destroy -y
lando poweroff
```
