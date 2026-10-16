Laravel MySQL 8.4 Example
=========================

This example exists primarily to test the following documentation:

* [Laravel Recipe](https://docs.devwithlando.io/tutorials/laravel.html)

## Start up tests

Run the following commands to get up and running with this example.

```bash
# Should poweroff
lando poweroff

# Should initialize an empty laravel recipe
rm -rf mysql84 && mkdir -p mysql84 && cd mysql84
lando init --source cwd --recipe laravel --webroot app/public --name lando-laravel-mysql84 --option cache=redis --option php='8.3' --option database=mysql:8

# Should start up successfully
cd mysql84
cp -f ../../.lando.upstream.yml .lando.upstream.yml && cat .lando.upstream.yml
lando start

# Should composer create-project a new laravel app
cd mysql84
lando composer create-project --prefer-dist laravel/laravel app
```

## Verification commands

Run the following commands to validate things are rolling as they should.

```bash
# Should return the laravel default page
cd mysql84
lando exec appserver -- curl -L localhost | grep "Laravel"

# Should install 4.x version of laravel/installer
cd mysql84
lando exec appserver -- "cd /var/www/.composer && composer show laravel/installer" | grep 'v4.'

# Should use 8.3 as the default php version
cd mysql84
lando php -v | grep "PHP 8.3"

# Should be running apache 2.4 by default
cd mysql84
lando exec appserver -- apachectl -V | grep 2.4
lando exec appserver -- curl -IL localhost | grep Server | grep 2.4

# Should be running mysql 8.4.x via the mysql:8 alias
cd mysql84
lando mysql -V | grep '8.4.'

# Should not enable xdebug by default
cd mysql84
lando php -m | grep xdebug || echo $? | grep 1

# Should have redis running
cd mysql84
lando exec cache -- redis-cli CONFIG GET databases

# Should use the default database connection info
cd mysql84
lando mysql -ularavel -plaravel laravel -e quit

# Should use the default mysql8 config file
cd mysql84
lando exec database -- cat /opt/bitnami/mysql/conf/my_custom.cnf | grep "LANDOLARAVELMYSQL8CNF"
lando mysql -u root -e "show variables;" | grep innodb_lock_wait_timeout | grep 127

# Should use binlog_expire_logs_seconds instead of the removed expire_logs_days
cd mysql84
lando mysql -u root -e "show variables;" | grep binlog_expire_logs_seconds | grep 864000

# Should have artisan available
cd mysql84
lando artisan env
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
cd mysql84
lando destroy -y
lando poweroff
```
