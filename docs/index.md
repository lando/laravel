---
title: Laravel Lando Plugin
description: Use Laravel on Lando for local development; powered by Docker and Docker Compose, config php version, swap db or caching backends or web server, use composer. laravel CLI and artisan, xdebug and custom config files, oh and also import and export databases.
next: ./getting-started.html
---

# Laravel

Laravel is The PHP Framework For Web Artisans.

Lando offers a configurable [recipe](https://docs.lando.dev/config/recipes.html) for developing [Laravel](https://laravel.com) apps.

#### Features of this plugin:

* Configurable `php` version from `5.3` all the way to `8.1`
* Configurable `webroot`
* Configurable web server (`apache` or `nginx`)
* Configurable database backend (`mariadb`, `mysql`, or `postgres`)
* Configurable `composer`
* Configurable caching backend (`redis` or `memcached`)
* `xdebug`

```
name: laravel
recipe: laravel
config:
  php: "8.0"
  xdebug: debug
  database: mysql
  config:
    php: .lando.php.ini
services:
  appserver:
    config:
      php: .lando.php.ini
      type: php:8.0
      overrides:
        environment:
          PHP_IDE_CONFIG: "serverName=appserver"
    xdebug: debug

  pma:
    type: phpmyadmin
    hosts:
      - database
  mailhog:
    type: mailhog
    hogfrom:
      - appserver
  redis:
    type: redis
    portforward: true
proxy:
  pma:
    - pma-main.lndo.site
  mailhog:
    - mailhog-main.lndo.site

```
