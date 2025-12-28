Laravel PHP 8.5 Example
=======================

This example exists primarily to test the following documentation:

* [Laravel Recipe](https://docs.devwithlando.io/tutorials/laravel.html)

## Start up tests

Run the following commands to get up and running with this example.

```bash
# Should poweroff
lando poweroff

# Should initialize an empty laravel recipe
rm -rf php85 && mkdir -p php85 && cd php85
lando init --source cwd --recipe laravel --webroot app/public --name lando-laravel-php85 --option cache=redis --option php='8.5' --option database=mariadb:11.8

# Should start up successfully
cd php85
cp -f ../../.lando.upstream.yml .lando.upstream.yml && cat .lando.upstream.yml
lando start

# Should composer create-project a new laravel app
cd php85
lando composer create-project --prefer-dist laravel/laravel app
```

## Verification commands

Run the following commands to validate things are rolling as they should.

```bash
# Should return the laravel default page
cd php85
lando exec appserver -- curl -L localhost | grep "Laravel"

# Should install 4.x version of laravel/installer
cd php85
lando exec appserver -- "cd /var/www/.composer && composer show laravel/installer" | grep 'v4.'

# Should use 8.5 as the default php version
cd php85
lando php -v | grep "PHP 8.5"

# Should be running apache 2.4 by default
cd php85
lando exec appserver -- apachectl -V | grep 2.4
lando exec appserver -- curl -IL localhost | grep Server | grep 2.4

# Should be running mariadb 11.8.x by default
cd php85
lando mariadb -V | grep 11.8.

# Should not enable xdebug by default
cd php85
lando php -m | grep xdebug || echo $? | grep 1

# Should have redis running
cd php85
lando exec cache -- redis-cli CONFIG GET databases

# Should use the default database connection info
cd php85
lando mariadb -ularavel -plaravel laravel -e quit

# Should use the default mariadb config file
cd php85
lando exec database -- cat /opt/bitnami/mariadb/conf/my_custom.cnf | grep "innodb_lock_wait_timeout = 121"
lando mariadb -u root -e "show variables;" | grep innodb_lock_wait_timeout | grep 121

# Should have artisan available
cd php85
lando artisan env
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
cd php85
lando destroy -y
lando poweroff
cd .. && rm -rf php85
```
