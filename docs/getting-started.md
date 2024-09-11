---
description: Learn how to get started with the Lando Laravel recipe.
---

# Getting Started

## Requirements

Before you get started with this recipe, we assume that you have:

1. [Installed Lando](https://docs.lando.dev/getting-started/installation.html) and gotten familiar with [its basics](https://docs.lando.dev/cli/).
2. [Initialized](https://docs.lando.dev/cli/init.html) a [Landofile](https://docs.lando.dev/core/v3) for your codebase for use with this recipe.
3. Read about the various [services](https://docs.lando.dev/core/v3/services/lando.html), [tooling](https://docs.lando.dev/core/v3/tooling.html), [events](https://docs.lando.dev/core/v3/events.html) and [routing](https://docs.lando.dev/core/v3/proxy.html) Lando offers.

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
lando composer create-project laravel/laravel app

# Optional: install any additional packages
cd app
lando composer require laravel/breeze --dev
lando artisan breeze:install

# Start it up
lando start

# List information about this app.
lando info
```

