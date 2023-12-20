Laravel PHP 8.1 Example
===============

This example exists primarily to test the following documentation:

* [Laravel Recipe](https://docs.devwithlando.io/tutorials/laravel.html)

Start up tests
--------------

Run the following commands to get up and running with this example.

```bash
# Should poweroff
lando poweroff

# Initialize an empty laravel recipe
rm -rf mysql8 && mkdir -p mysql8 && cd mysql8
lando init --source cwd --recipe laravel --webroot app/public --name lando-laravel-mysql8 --option cache=redis --option php='8.1' --option database=mysql:8.0.22
cp -f ../../.lando.local.yml .lando.local.yml && cat .lando.local.yml

# Should compose create-project a new laravel app
cd mysql8
lando composer create-project --prefer-dist laravel/laravel app

# Should start up successfully
cd mysql8
lando start
```

Verification commands
---------------------

Run the following commands to validate things are rolling as they should.

```bash
# Should return the laravel default page
cd mysql8
lando ssh -s appserver -c "curl -L localhost" | grep "Laravel"

# Should install 4.x version of laravel/installer
cd mysql8
lando ssh -s appserver -c 'cd /var/www/.composer && composer show laravel/installer' | grep 'v4.'

# Should use 7.4 as the default php version
cd mysql8
lando php -v | grep "PHP 8.1"

# Should be running apache 2.4 by default
cd mysql8
lando ssh -s appserver -c "apachectl -V | grep 2.4"
lando ssh -s appserver -c "curl -IL localhost" | grep Server | grep 2.4

# Should be running mysql 8.0.x by default
cd mysql8
lando mysql -V | grep 8.0

# Should not enable xdebug by default
cd mysql8
lando php -m | grep xdebug || echo $? | grep 1

# Should have redis running
cd mysql8
lando ssh -s cache -c "redis-cli CONFIG GET databases"

# Should use the default database connection info
cd mysql8
lando mysql -ularavel -plaravel laravel -e quit

# Should have artisan available
cd mysql8
lando artisan env
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
cd mysql8
lando destroy -y
lando poweroff
```
