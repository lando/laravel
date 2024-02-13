---
title: Configuration
description: Learn how to configure the Lando Laravel recipe.
---

# Configuration

While Lando [recipes](https://docs.lando.dev/core/v3/recipes.html) set sane defaults so they work out of the box, they are also [configurable](https://docs.lando.dev/core/v3/recipes.html#config).

Here are the configuration options, set to the default values, for this recipe's [Landofile](https://docs.lando.dev/core/v3). If you are unsure about where this goes or what this means, we *highly recommend* scanning the [recipes documentation](https://docs.lando.dev/core/v3/recipes.html) to get a good handle on how the magicks work.

```yaml
recipe: laravel
config:
  php: '7.4'
  composer_version: '2.2.12'
  via: apache:2.4
  webroot: .
  database: mysql:5.7
  cache: none
  xdebug: false
  config:
    database: SEE BELOW
    php: SEE BELOW
    server: SEE BELOW
    vhosts: SEE BELOW
```

Note that if the above config options are not enough, all Lando recipes can be further [extended and overriden](https://docs.lando.dev/core/v3/recipes.html#extending-and-overriding-recipes).

## Choosing a php version

You can set `php` to any version that is available in our [php service](https://docs.lando.dev/php). However, you should consult the [Laravel requirements](https://laravel.com/docs/5.7/installation#web-server-configuration) to make sure that version is actually supported by Laravel itself.

The [recipe config](https://docs.lando.dev/core/v3/recipes.html#config) to set the Laravel recipe to use `php` version `7.1` is shown below:

```yaml
recipe: laravel
config:
  php: '7.1'
```

## Choosing a composer version

You can set `composer_version` to any version that is available in our [php service](https://docs.lando.dev/plugins/php/config.html#installing-composer).

```yaml
recipe: laravel
config:
  composer_version: '1.10.1'
```

## Choosing a web server

By default, this recipe will be served by the default version of our [apache](https://docs.lando.dev/apache) service but you can also switch this to use [`nginx`](https://docs.lando.dev/nginx). We *highly recommend* you check out both the [apache](https://docs.lando.dev/apache) and [nginx](https://docs.lando.dev/nginx) services before you change the default `via`.

#### With Apache (default)

```yaml
recipe: laravel
config:
  via: apache
```

#### With nginx

```yaml
recipe: laravel
config:
  via: nginx
```

## Choosing a database backend

By default, this recipe will use the default version of our [mysql](https://docs.lando.dev/mysql) service as the database backend but you can also switch this to use [`mariadb`](https://docs.lando.dev/mariadb) or ['postgres'](https://docs.lando.dev/postgres) instead. Note that you can also specify a version *as long as it is a version available for use with lando* for either `mysql`, `mariadb` or `postgres`.

If you are unsure about how to configure the `database`, we *highly recommend* you check out the [mysql](https://docs.lando.dev/mysql), [mariadb](https://docs.lando.dev/mariadb) and ['postgres'](https://docs.lando.dev/postgres) services before you change the default.

Also note that like the configuration of the `php` version, you should consult the [Laravel requirements](https://laravel.com/docs/5.7/database#configuration) to make sure the `database` and `version` you select is actually supported by Laravel itself.

#### Using MySQL (default)

```yaml
recipe: laravel
config:
  database: mysql
```

#### Using MariaDB

```yaml
recipe: laravel
config:
  database: mariadb
```

#### Using Postgres

```yaml
recipe: laravel
config:
  database: postgres
```

#### Using a custom version

```yaml
recipe: laravel
config:
  database: postgres:9.6
```

## Choosing a caching backend

By default, this recipe will not spin up a caching backend.

However, you can specify one using the `cache` recipe config and setting it to use either our use [`redis`](https://docs.lando.dev/redis) or [`memcached`](https://docs.lando.dev/memcached) service. Note that you can optionally/additionally specify a particular version for either *as long as it is a version documented as available for use with lando* for either service.

If you are unsure about how to configure the `cache`, we *highly recommend* you check out our [redis](https://docs.lando.dev/redis) and [memcached](https://docs.lando.dev/memcached) docs as well as the [Laravel ones](https://laravel.com/docs/5.7/cache#configuration).

#### Using redis (recommended)

```yaml
recipe: laravel
config:
  cache: redis
```

#### Using Memcached

```yaml
recipe: laravel
config:
  cache: memcached
```

#### Using a custom version

```yaml
recipe: laravel
config:
  cache: redis:2.8
```

## Environment File

By default, Laravel comes with a `.env` configuration file set to use `homestead`. You will want to modify the following `.env` key so that it makes sense for use with Lando.

What that file would look like if you installed laravel [as above](https://docs.lando.dev/laravel/getting-started.html) is shown below:

Note that your file might be slightly different depending on your configuration.

```bash
APP_NAME=Laravel
APP_ENV=local
APP_DEBUG=true
APP_URL=http://my-first-laravel-app.lndo.site

LOG_CHANNEL=stack

# If you set `database: mysql|mariadb` in this recipes config
DB_CONNECTION=mysql
DB_HOST=database
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=laravel
DB_PASSWORD=laravel

# If you set `database: postgres` in this recipes config
# DB_CONNECTION=pgsql
# DB_HOST=database
# DB_PORT=5432
# DB_DATABASE=laravel
# DB_USERNAME=postgres
# DB_PASSWORD=null

BROADCAST_DRIVER=log
CACHE_DRIVER=file
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

# If you have `cache: redis` in this recipes config
# REDIS_HOST=cache
# REDIS_PASSWORD=null
# REDIS_PORT=6379

# If you added a mailhog service to this recipe
# MAIL_DRIVER=smtp
# MAIL_HOST=sendmailhog
# MAIL_PORT=1025
# MAIL_USERNAME=null
# MAIL_PASSWORD=null
# MAIL_ENCRYPTION=null
```

## Connecting to your database and/or cache

Lando will automatically set up a database with a user and password and also set an environment variable called [`LANDO INFO`](https://docs.lando.dev/guides/lando-info.html) that contains useful information about how your application can access other Lando services.

The default database connection information for a Laravel site is shown below:

Note that the `host` is not `localhost` but `database`.

```yaml
database: laravel
username: laravel
password: laravel
host: database
# for mysql
port: 3306
# for postgres
# port: 5432
```

If you've also specified a caching backend, the default connection settings are shown below:

```yaml
host: cache
# Redis
port: 6379
# Memcache
port: 11211
```

You can also get the above information, and more, by using the [`lando info`](https://docs.lando.dev/cli/info.html) command.

## Using custom config files

You may need to override our [default Laravel config](https://github.com/lando/laravel/tree/main/builders) with your own.

If you do this, you must use files that exist inside your application and express them relative to your project root as shown below:

Note that the default files may change based on how you set both `ssl` and `via`. Also note that the `vhosts` and `server` config will be either for `apache` or `nginx` depending on how you set `via`. We *highly recommend* you check out both the [apache](https://docs.lando.dev/apache/config.html) and [nginx](https://docs.lando.dev/nginx/config.html) if you plan to use a custom `vhosts` or `server` config.

#### A hypothetical project

Note that you can put your configuration files anywhere inside your application directory. We use a `config` directory but you can call it whatever you want such as `.lando` in the example below:

```bash
./
|-- config
   |-- default.conf
   |-- my-custom.cnf
   |-- php.ini
   |-- server.conf
|-- index.php
|-- .lando.yml
```

#### Landofile using custom laravel config

```yaml
recipe: laravel
config:
  config:
    database: config/my-custom.cnf
    php: config/php.ini
    server: config/server.conf
    vhosts: config/default.conf
```
