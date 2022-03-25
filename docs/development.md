---
title: Development
description: Learn how to develop and contribute to the Lando Laravel service
---

# Development

This guide contains information to help onboard developers to work on the [Laravel](https://laravel.com) integration, hereafter referred to as "the plugin".

## Requirements

At the very least you will need to have the following installed:

* [Lando 3.5.0+](https://docs.lando.dev/basics/installation.html), preferably installed [from source](https://docs.lando.dev/basics/installation.html#from-source).
* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

While not a hard requirement it's also probably a good idea to install both `node` 14 and `yarn`

* [Node 14](https://nodejs.org/dist/latest-v14.x/)
* [Yarn](https://classic.yarnpkg.com/lang/en/docs/install)

## Installation

```bash
# Clone this repo
git clone https://github.com/lando/laravel.git && cd laravel

# Install dependencies with lando
lando start

# Or install them with yarn
yarn
```

## Working

This plugin contains various working and tested Lando apps in the [examples](https://github.com/lando/laravel/tree/main/examples) folder. You should use these or create new ones to help with plugin development.

Note that each one of these examples contains the following section in its Landofile.

```yaml
plugins:
  "@lando/laravel": ./../../
```

This tells Lando that _this_ app should use the source version of the `@lando/laravel` plugin you cloned down in the installation. This is useful because it allows you to isolate development within this repo without interferring with any other apps using the stable and global version of the plugin.

This means that you should _almost always_ develop against apps in the `examples` folder and that those apps should _always_ contain the above `plugins` config. If you have an extant Lando application you want to develop against you can temporarily tell it to use the cloned down version of the plugin with the same line.

```yaml
plugins:
  "@lando/laravel": /path/to/plugin
```

Whether you are working off an existing example or a new one you should make sure that you are updating or adding new tests as you go. See [leia testing](#leia-tests) below for more detail.

## Documentation

If you want to help with contributing documentation here are some useful commands once you've cloned and installed the project.

```bash
# launch local docs site
yarn docs:dev

# build docs locally
yarn docs:build
```

If you are more interested in the internals of the docs they use [VuePress2](https://v2.vuepress.vuejs.org/) and our [Special theme](https://vuepress-theme-default-plus.lando.dev).

## Testing

It's best to familiarize yourself with how Lando [does testing](https://docs.lando.dev/contrib/contrib-testing.html) in general before proceeding.

### Unit Tests

Generally, unit testable code should be placed in `lib` and then the associated test in `tests` in the form `FILE-BEING-TESTED.spec.js`. Here is an example:

```bash
./
|-- lib
    |-- stuff.js
|-- test
    |-- stuff.spec.js
```

And then you can run the tests with the below.

```bash
# Run unit tests
yarn test:unit
```

### Leia Tests

We do end to end testing with our made-just-for-Lando testing framework [Leia](https://github.com/lando/leia). Leia allows us to define tests as a series of commented shell commands in human readable markdown files. Here is a simple example:

```md
Start up tests
--------------

# Should start up successfully
lando start

Verification commands
---------------------

# Should be able to connect to all mariadb relationships
lando mariadb main -e "show tables;"

Destroy tests
-------------

# Should be able to destroy our app
lando destroy -y
```

Note that the headers here are important and are defined in our `yarn generate:tests` script. The _Start up tests_ header specifies things that should run before the main series of tests. _Verification commands_ is the main body of tests and is required. _Destroy tests_ specifies any needed clean up commands to run.

If you check out the various READMEs in our [examples](https://github.com/lando/laravel/tree/main/examples) you will notice that they are all Leia tests.

Before running all or some of the tests you will need to generate them.

```bash
# Generate tests
yarn generate:tests

# Run ALL the tests, this will likely take a long time
yarn test:leia

# Run the tests for a single example
yarn leia examples/mariadb-10.2/README.md -c 'Destroy tests'
```

If you've created new testable examples then you will also need to let GitHub Actions know so they can run on pull requests.

To do that you will either want to add the tests to an existing workflow that makes sense or create a new workflow. If you are creating a new workflow you should just copy an existing one and modify the filename and `name` key to something that makes sense.

To add the new tests to the workflow just modify `jobs.leia-tests.strategy.matrix.leia-tests` with the new tests.

```yaml
jobs:
  leia-tests:
    strategy:
      matrix:
        leia-tests:
            # This should be the filename, without .leia.js extension in the test directory
            # NOTE that you will need to run yarn generate:tests to see these
          - test: platform-sh-maria-db-10-1-example
            # This should be the directory that the test was generated from
            source: examples/mariadb-10.2
          - test: platform-sh-maria-db-10-2-example
            source: examples/mariadb-10.2
```

Now open a pull request and the new tests should run!

For a deeper dive on Leia you can go [here](https://github.com/lando/leia).

## Contribution

If you want to contribute code then just follow [this flow](https://guides.github.com/introduction/flow/).
