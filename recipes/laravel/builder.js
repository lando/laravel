'use strict';

// Modules
const _ = require('lodash');

/*
 * Helper to get cache
 */
const getCache = cache => {
  // Return redis
  if (_.includes(cache, 'redis')) {
    return {
      type: cache,
      portforward: true,
      persist: true,
    };
  // Or memcached
  } else if (_.includes(cache, 'memcached')) {
    return {
      type: cache,
      portforward: true,
    };
  }
};

/*
 * Build Laravel
 */
module.exports = {
  name: 'laravel',
  parent: '_lamp',
  config: {
    confSrc: __dirname,
    config: {},
    composer: {},
    database: 'mysql',
    defaultFiles: {
      php: 'php.ini',
    },
    php: '7.4',
    services: {appserver: {overrides: {environment: {
      APP_LOG: 'errorlog',
    }}}},
    tooling: {laravel: {service: 'appserver'}},
    via: 'apache',
    webroot: '.',
    xdebug: false,
  },
  builder: (parent, config) => class LandoLaravel extends parent {
    constructor(id, options = {}) {
      options = _.merge({}, config, options);
      // Add the laravel cli installer command
      if (options.php >= 7.3) {
        options.composer['laravel/installer'] = '^4.0.0';
      } else if (options.php < 7.2) {
        options.composer['laravel/installer'] = '^2.3.0';
      } else {
        options.composer['laravel/installer'] = '^3.2.0';
      }

      // Add in artisan tooling
      // @NOTE: does artisan always live one up of the webroot?
      options.tooling.artisan = {
        service: 'appserver',
        cmd: `php /app/${options.webroot}/../artisan`,
      };
      if (_.has(options, 'cache') && options.cache !== 'none') {
        options.services.cache = getCache(options.cache);
      }
      // Send downstream
      super(id, options);
    };
  },
};
