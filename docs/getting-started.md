---
description: Learn how to get started with the Lando Laravel recipe.
---

# Getting Started

## Requirements

Before you get started with this recipe, we assume that you have:

1. [Installed Lando](https://docs.lando.dev/basics/installation.html) and gotten familiar with [its basics](https://docs.lando.dev/basics/).
2. [Initialized](https://docs.lando.dev/basics/init.html) a [Landofile](https://docs.lando.dev/config/lando.html) for your codebase for use with this recipe.
3. Read about the various [services](https://docs.lando.dev/config/services.html), [tooling](https://docs.lando.dev/config/tooling.html), [events](https://docs.lando.dev/config/events.html) and [routing](https://docs.lando.dev/config/proxy.html) Lando offers.

## Quick Start

Try out the relevant commands below to spin up a new Landoified vanilla Laravel site.

For the latest version of laravel 9
```bash
# Initialize a laravel recipe
lando init \
  --source cwd \
  --recipe laravel \
  --webroot app/public \
  --name my-first-laravel-app

# Install laravel
lando ssh -c "composer create-project laravel/laravel app"

# Start it up
lando start

# List information about this app.
lando info
```

## Custom Installation

This plugin is included with Lando by default. That means if you have Lando version `3.0.8` or higher then this plugin is already installed!

However if you would like to manually install the plugin, update it to the bleeding edge or install a particular version then use the below. Note that this installation method requires Lando `3.5.0+`.

:::: code-group
::: code-group-item LANDO 3.21+
```bash:no-line-numbers
lando plugin-add @lando/apache
```
:::
::: code-group-item HYPERDRIVE
```bash:no-line-numbers
# @TODO
# @NOTE: This doesn't actaully work yet
hyperdrive install @lando/apache
```
:::
::: code-group-item DOCKER
```bash:no-line-numbers
# Ensure you have a global plugins directory
mkdir -p ~/.lando/plugins

# Install plugin
# NOTE: Modify the "npm install @lando/laravel" line to install a particular version eg
# npm install @lando/laravel@0.5.2
docker run --rm -it -v ${HOME}/.lando/plugins:/plugins -w /tmp node:14-alpine sh -c \
  "npm init -y \
  && npm install @lando/laravel --production --flat --no-default-rc --no-lockfile --link-duplicates \
  && npm install --production --cwd /tmp/node_modules/@lando/laravel \
  && mkdir -p /plugins/@lando \
  && mv --force /tmp/node_modules/@lando/laravel /plugins/@lando/laravel"

# Rebuild the plugin cache
lando --clear
```
:::
::::

You should be able to verify the plugin is installed by running `lando config --path plugins` and checking for `@lando/laravel`. This command will also show you _where_ the plugin is being loaded from.
