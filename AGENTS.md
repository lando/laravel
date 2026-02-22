# AGENTS.md

This file provides guidance to AI coding assistants when working with code in this repository.

## Project Overview

This is the official Lando plugin for Laravel (`@lando/laravel`). It provides a recipe that configures PHP, web server, database, and caching services for Laravel development environments.

## Common Commands

```bash
# Install dependencies
npm install

# Run linting
npm run lint

# Run unit tests
npm run test:unit

# Run both lint and unit tests
npm test

# Run integration tests (Leia)
npm run test:leia

# Run a single integration test
npx leia examples/laravel-defaults/README.md -c 'Destroy tests'

# Documentation development
npm run docs:dev      # Start dev server
npm run docs:build    # Build docs
```

## Architecture

### Plugin Structure

- **builders/** - Service builders that extend Lando's base services
  - `laravel.js` - Main recipe builder, configures all services and tooling
  - `laravel-php.js`, `laravel-nginx.js`, `laravel-mysql.js`, etc. - Service-specific builders that extend `@lando/php`, `@lando/mysql`, etc.

- **config/** - Configuration templates
  - `default.conf.tpl` - Nginx vhost template
  - `php.ini`, `mysql.cnf`, `mysql8.cnf` - Service configs

- **inits/** - Initialization logic for `lando init` command

- **examples/** - Working Lando apps for development and testing. Each example has a `plugins: "@lando/laravel": ../..` directive to use the local source.

- **test/** - Unit tests (Mocha/Chai). Name files as `*.spec.js`.

### Recipe Configuration Flow

The main `builders/laravel.js` exports a recipe that:
1. Accepts user config (php version, database type, cache, via, webroot, xdebug)
2. Merges defaults with user overrides
3. Configures services: appserver (PHP), database, optional cache
4. Sets up tooling: composer, php, artisan, db-import/export, database CLI

### Dependencies

This plugin depends on other Lando service plugins:
- `@lando/php` - PHP/Apache/Nginx services
- `@lando/mysql`, `@lando/mariadb`, `@lando/postgres`, `@lando/mssql` - Databases
- `@lando/redis`, `@lando/memcached` - Caching

## Testing

### Unit Tests
Place in `test/` with `.spec.js` extension. Run with `npm run test:unit`.

### Leia Integration Tests
Integration tests are written as shell commands in markdown (example READMEs). The markdown follows a specific format with "Start up tests", "Verification commands", and "Destroy tests" sections. See `examples/*/README.md` for examples.

**Note:** Integration tests in `examples/` are run by the `pr-laravel-tests.yml` GitHub Actions workflow on pull requests, but only if they are explicitly listed in the workflow's test matrix. New examples must be added to the matrix in `pr-laravel-tests.yml` to be included in CI.

## GitHub Actions

CI/CD workflows are defined in `.github/workflows/`:

### PR Workflows (run on every pull request)

| Workflow | File | Purpose |
|----------|------|---------|
| **Laravel Tests** | `pr-laravel-tests.yml` | Runs Leia integration tests for examples explicitly listed in the workflow matrix. Tests against Lando 3-edge and 3-stable on Ubuntu. |
| **Unit Tests** | `pr-unit-tests.yml` | Runs `npm run test:unit` across Windows, Ubuntu, and macOS. |
| **Lint Code** | `pr-linter.yml` | Runs `npm run lint` to check code style. |
| **Docs Tests** | `pr-docs-tests.yml` | Builds documentation to verify no broken builds. |

### Release Workflow

| Workflow | File | Purpose |
|----------|------|---------|
| **Publish to NPM** | `release.yml` | Triggered on GitHub release creation. Runs lint + unit tests, then publishes to npm. Stable releases go to `latest` tag; prereleases go to `edge` tag. |

### Integration Test Matrix

The `pr-laravel-tests.yml` workflow explicitly lists which examples to test. New examples must be added to this list to run in CI.

Each test runs against the example's `README.md` using the [Leia](https://github.com/lando/leia) test runner.

## Development Workflow

1. Use examples directory - apps there reference the local plugin source
2. To test against an external app, add to its Landofile:
   ```yaml
   plugins:
     "@lando/laravel": /path/to/this/plugin
   ```

## Code Style

- ESLint with Google config, max 140 char lines
- Node.js 20+
- JSDoc required for function declarations
- 2-space indentation
