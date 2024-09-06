Laravel MariaDB Example
=======================

This example exists primarily to test the following documentation:

* [Laravel Recipe](https://docs.devwithlando.io/tutorials/laravel.html)

## Start up tests

Run the following commands to get up and running with this example.

```bash
# Should poweroff
lando poweroff

# Should initialize an empty laravel recipe
rm -rf mariadb && mkdir -p mariadb && cd mariadb
lando init --source cwd --recipe laravel --webroot app/public --name lando-laravel-mariadb --option cache=redis --option php='8.3' --option database=mariadb:11.3

# Should start up successfully
cd mariadb
cp -f ../../.lando.upstream.yml .lando.upstream.yml && cat .lando.upstream.yml
lando start

# Should composer create-project a new laravel app
cd mariadb
lando composer create-project --prefer-dist laravel/laravel app
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

# Should be running mariadb 11.3.x by default
cd mariadb
lando mariadb -V | grep 11.3.

# Should not enable xdebug by default
cd mariadb
lando php -m | grep xdebug || echo $? | grep 1

# Should have redis running
cd mariadb
lando exec cache -- redis-cli CONFIG GET databases

# Should use the default database connection info
cd mariadb
lando mariadb -ularavel -plaravel laravel -e quit

# Should use the default mariadb config file
cd mariadb
lando exec database -- cat /opt/bitnami/mariadb/conf/my_custom.cnf | grep "innodb_lock_wait_timeout = 121"
lando mariadb -u root -e "show variables;" | grep innodb_lock_wait_timeout | grep 121

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
