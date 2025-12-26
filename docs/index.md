---
title: Laravel Lando Plugin
description: Use Laravel on Lando for local development; powered by Docker and Docker Compose, config php version, swap db or caching backends or web server, use composer. laravel CLI and artisan, xdebug and custom config files, oh and also import and export databases.
---

# Laravel

Laravel is The PHP Framework For Web Artisans.

Lando offers a configurable [recipe](https://docs.lando.dev/landofile/recipes.html) for developing [Laravel](https://laravel.com) apps.

#### Features of this plugin:

* Configurable `php` version from `5.3` all the way to `8.5+`
* Configurable `webroot`
* Configurable web server (`apache` or `nginx`)
* Configurable database backend (`mariadb`, `mysql`, or `postgres`)
* [Configurable `composer`](https://docs.lando.dev/plugins/php/config.html#installing-composer)
* Configurable caching backend (`redis` or `memcached`)
* `xdebug`
