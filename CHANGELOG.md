## {{ UNRELEASED_VERSION }} - [{{ UNRELEASED_DATE }}]({{ UNRELEASED_LINK }})

## Bug Fixes

* Fixed bug causing default `proxy` settings to be clobbered by user specified ones

## Internal

* Updated DevOps to use new `lando exec`
* Updated `ubuntu` test runners to `24.04`

## v1.5.0 - [May 27, 2024](https://github.com/lando/laravel/releases/tag/v1.5.0)

* Updated mariadb plugin [#51](https://github.com/lando/mariadb/issues/51)
* Use mysql command for MariaDB 10.3.x and below
* Cleaned up test comments

## v1.4.0 - [March 8, 2024](https://github.com/lando/laravel/releases/tag/v1.4.0)

* Updated to latest database services.

## v1.3.1 - [February 29, 2024](https://github.com/lando/laravel/releases/tag/v1.3.1)

### Fixes

* Improved `database` selection for purposes of `config` loading, fixes some `database` bootup issues when the `database` type is overridden downstream

## v1.3.0 - [February 27, 2024](https://github.com/lando/laravel/releases/tag/v1.3.0)

### New Features

* Makes `php:8.3` the default version. [#45](https://github.com/lando/laravel/issues/45)
* Added support for `php:8.3`
* Added support for `php:8.2` [#23](https://github.com/lando/laravel/issues/23)
* Make sure path to mysql.cnf is correct.

### Internal

* Updated to `@lando/php@1.2.0`

## v1.2.0 - [February 21, 2024](https://github.com/lando/laravel/releases/tag/v1.2.0)

* Updated memcached plugin to [v1.1.0](https://github.com/lando/memcached/releases/tag/v1.1.0).
* Added testing of memcached.

## v1.1.0 - [February 20, 2024](https://github.com/lando/laravel/releases/tag/v1.1.0)

* Included ability to specify `database: mssql` in the `config` section to maintain backwards compatibility. [@lando/mssql#31](https://github.com/lando/mssql/issues/31)

## v1.0.1 - [January 3, 2024](https://github.com/lando/laravel/releases/tag/v1.0.1)

* Fixed issue with missing proxy URLs.

## v1.0.0 - [December 7, 2023](https://github.com/lando/laravel/releases/tag/v1.0.0)

* Dialed fully for `lando update`

## v0.9.0 - [July 3, 2023](https://github.com/lando/laravel/releases/tag/v0.9.0)

* Removed bundle-dependencies and version-bump-prompt from plugin.
* Updated package to use prepare-release-action.
* Updated documentation to reflect new release process.

## v0.8.0 - [February 24, 2022](https://github.com/lando/laravel/releases/tag/v0.8.0)

* Add compatibility for MySQL 8.x [lando/lando#1426](https://github.com/lando/lando/issues/1462)

## v0.7.0 - [December 12, 2022](https://github.com/lando/laravel/releases/tag/v0.7.0)

* Added bundle-dependencies to release process.
* Fixed bug in plugin dogfooding test.

## v0.6.0 - [September 8, 2022](https://github.com/lando/laravel/releases/tag/v0.6.0)

* HYPERDRIVED

## v0.5.2 - [March 30, 2022](https://github.com/lando/laravel/releases/tag/v0.5.2)

Lando is **free** and **open source** software that relies on contributions from developers like you! If you like Lando then help us spend more time making, updating and supporting it by [contributing](https://github.com/sponsors/lando).

* Adjusted the `laravel/installer` version to the corresponding PHP version [#9](https://github.com/lando/laravel/issues/9)

## v0.5.1 - [January 10, 2022](https://github.com/lando/laravel/releases/tag/v0.5.1)

Lando is **free** and **open source** software that relies on contributions from developers like you! If you like Lando then help us spend more time making, updating and supporting it by [contributing](https://github.com/sponsors/lando).

* Update default php to 7.4

## v0.5.0 - [January 10, 2022](https://github.com/lando/laravel/releases/tag/v0.5.0)

Lando is **free** and **open source** software that relies on contributions from developers like you! If you like Lando then help us spend more time making, updating and supporting it by [contributing](https://github.com/sponsors/lando).

* Inital Release
