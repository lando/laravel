Laravel MySQL 8 Example
=======================

This example exists primarily to test the following documentation:

* [Laravel Recipe](https://docs.devwithlando.io/tutorials/laravel.html)

## Start up tests

Run the following commands to get up and running with this example.

```bash
# Should poweroff
lando poweroff

# Should initialize an empty laravel recipe
rm -rf mysql8 && mkdir -p mysql8 && cd mysql8
lando init --source cwd --recipe laravel --webroot app/public --name lando-laravel-mysql8 --option cache=redis --option php='8.1' --option database=mysql:8.0.22

# Should start up successfully
cd mysql8
cp -f ../../.lando.upstream.yml .lando.upstream.yml && cat .lando.upstream.yml
lando start

# Should composer create-project a new laravel app
cd mysql8
lando composer create-project --prefer-dist laravel/laravel app
```

## Verification commands

Run the following commands to validate things are rolling as they should.

```bash
# Should return the laravel default page
cd mysql8
lando exec appserver -- curl -L localhost | grep "Laravel"

# Should install 4.x version of laravel/installer
cd mysql8
lando exec appserver -- "cd /var/www/.composer && composer show laravel/installer" | grep 'v4.'

# Should use 8.1 as the default php version
cd mysql8
lando php -v | grep "PHP 8.1"

# Should be running apache 2.4 by default
cd mysql8
lando exec appserver -- apachectl -V | grep 2.4
lando exec appserver -- curl -IL localhost | grep Server | grep 2.4

# Should be running mysql 8.0.x by default
cd mysql8
lando mysql -V | grep 8.0

# Should not enable xdebug by default
cd mysql8
lando php -m | grep xdebug || echo $? | grep 1

# Should have redis running
cd mysql8
lando exec cache -- redis-cli CONFIG GET databases

# Should use the default database connection info
cd mysql8
lando mysql -ularavel -plaravel laravel -e quit

# Should use the default mysql8 config file
cd mysql8
lando exec database -- cat /opt/bitnami/mysql/conf/my_custom.cnf | grep "LANDOLARAVELMYSQL8CNF"
lando mysql -u root -e "show variables;" | grep innodb_lock_wait_timeout | grep 127

# Should have artisan available
cd mysql8
lando artisan env
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
cd mysql8
lando destroy -y
lando poweroff
```
