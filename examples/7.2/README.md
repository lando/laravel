Laravel PHP 7.2 Example
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
rm -rf laravel && mkdir -p laravel && cd laravel
lando init --source cwd --recipe laravel --webroot app/public --name lando-laravel --option cache=redis --option php='7.2' --option composer_version='1-latest'

# Should compose create-project a new laravel app
cd laravel
lando composer create-project --prefer-dist laravel/laravel app

# Should start up successfully
cd laravel
echo -e "\nplugins:\n  \"@lando/laravel/\": ./../../" >> .lando.yml
lando start
```

Verification commands
---------------------

Run the following commands to validate things are rolling as they should.

```bash
# Should return the laravel default page
cd laravel
lando ssh -s appserver -c "curl -L localhost" | grep "Laravel"

# Should install 3.x version of laravel/installer
cd laravel
lando ssh -s appserver -c 'cd /var/www/.composer && composer show laravel/installer' | grep 'v3.'

# Should use 7.4 as the default php version
cd laravel
lando php -v | grep "PHP 7.2"

# Should be running apache 2.4 by default
cd laravel
lando ssh -s appserver -c "apachectl -V | grep 2.4"
lando ssh -s appserver -c "curl -IL localhost" | grep Server | grep 2.4

# Should be running mysql 5.7 by default
cd laravel
lando mysql -V | grep 5.7

# Should not enable xdebug by default
cd laravel
lando php -m | grep xdebug || echo $? | grep 1

# Should have redis running
cd laravel
lando ssh -s cache -c "redis-cli CONFIG GET databases"

# Should use the default database connection info
cd laravel
lando mysql -ularavel -plaravel laravel -e quit

# Should have artisan available
cd laravel
lando artisan env
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
cd laravel
lando destroy -y
lando poweroff
```
