# Laravel Lando Plugin

This is the _official_ [Lando](https://lando.dev) plugin for [Laravel](https://laravel.com). When installed it...

* Allows users to run `laravel` app
* Allows users to configure `php` version from `5.3` all the way to `8.1`
* Allows users to configure `webroot`
* Allows users to configure web server to (`apache` or `nginx`)
* Allows users to configure database backend to (`mariadb`, `mysql`, or `postgres`)
* Allows users to configure `composer`
* Allows users to configure a caching backend (`redis` or `memcached`)
* Allows users to configure `xdebug`

Of course, once a user is running their Laravel project with Lando they can take advantage of [all the other awesome development features](https://docs.lando.dev) Lando provides.

## Basic Usage

Add a `laravel` recipe to your Landofile

```yaml
name: laravel-app
recipe: laravel
```

For more info you should check out the [docs](https://docs.lando.dev/laravel):

* [Getting Started](https://docs.lando.dev/laravel/)
* [Configuration](https://docs.lando.dev/laravel/config.html)
* [Tooling](https://docs.lando.dev/laravel/tooling.html)
* [Examples](https://github.com/lando/laravel/tree/main/examples)
* [Development](https://docs.lando.dev/laravel/development.html)

## Issues, Questions and Support

If you have a question or would like some community support we recommend you [join us on Slack](https://launchpass.com/devwithlando).

If you'd like to report a bug or submit a feature request then please [use the issue queue](https://github.com/lando/laravel/issues/new/choose) in this repo.

## Changelog

We try to log all changes big and small in both [THE CHANGELOG](https://github.com/lando/laravel/blob/main/CHANGELOG.md) and the [release notes](https://github.com/lando/laravel/releases).


## Maintainers

* [@pirog](https://github.com/pirog)
* [@reynoldsalec](https://github.com/reynoldsalec)

## Contributors

<a href="https://github.com/lando/laravel/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=lando/laravel" />
</a>

Made with [contributors-img](https://contrib.rocks).

## Other Selected Resources

* [LICENSE](/LICENSE)
* [TERMS OF USE](https://docs.lando.dev/terms)
* [PRIVACY POLICY](https://docs.lando.dev/privacy)
* [CODE OF CONDUCT](https://docs.lando.dev/coc)

