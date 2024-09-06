Laravel Init Example
===============

This example exists primarily to test the following documentation:

* [Laravel Recipe](https://docs.devwithlando.io/tutorials/laravel.html)

## Start up tests

Run the following commands to get up and running with this example.

```bash
# Should poweroff
lando poweroff

# Should initialize an empty laravel recipe
rm -rf laravel && mkdir -p laravel && cd laravel
lando init --source cwd --recipe laravel --webroot app/public --name lando-laravel --option cache=redis

# Should start up successfully
cd laravel
cp -f ../../.lando.upstream.yml .lando.upstream.yml && cat .lando.upstream.yml
lando start

# Should composer create-project a new laravel app
cd laravel
lando composer create-project --prefer-dist laravel/laravel app
```

## Verification commands

Run the following commands to validate things are rolling as they should.

```bash
# Should return the laravel default page
cd laravel
lando exec appserver -- curl -L localhost | grep "Laravel"

# Should install 4.x version of laravel/installer
cd laravel
lando exec appserver -- "cd /var/www/.composer && composer show laravel/installer" | grep 'v4.'

# Should use 8.3 as the default php version
cd laravel
lando php -v | grep "PHP 8.3"

# Should be running apache 2.4 by default
cd laravel
lando exec appserver -- apachectl -V | grep 2.4
lando exec appserver -- curl -IL localhost | grep Server | grep 2.4

# Should be running mysql 5.7 by default
cd laravel
lando mysql -V | grep 5.7

# Should not enable xdebug by default
cd laravel
lando php -m | grep xdebug || echo $? | grep 1

# Should have redis running
cd laravel
lando exec cache -- redis-cli CONFIG GET databases

# Should use the default database connection info
cd laravel
lando mysql -ularavel -plaravel laravel -e quit

# Should have artisan available
cd laravel
lando artisan env
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
cd laravel
lando destroy -y
lando poweroff
```
