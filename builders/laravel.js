'use strict';

// Modules
const fs = require('fs');
const _ = require('lodash');
const path = require('path');

/*
 * Helper to get cache
 */
const getCache = cache => {
  const version = _.includes(cache, ':') ? _.last(cache.split(':')) : false;
  // Return redis
  if (_.includes(cache, 'redis')) {
    return {
      type: version ? `laravel-redis:${version}` : 'laravel-redis',
      portforward: true,
      persist: true,
    };
  // Or memcached
  } else if (_.includes(cache, 'memcached')) {
    return {
      type: version ? `laravel-memcached:${version}` : 'laravel-memcached',
      portforward: true,
    };
  }
};

/*
 * Helper to get database type
 */
const getDatabaseType = options => {
  return _.get(options, '_app.config.services.database.type', options.database) ?? 'mysql';
};

// Tooling defaults
const toolingDefaults = {
  'composer': {
    service: 'appserver',
    cmd: 'composer --ansi',
  },
  'db-import <file>': {
    service: ':host',
    description: 'Imports a dump file into a database service',
    cmd: '/helpers/sql-import.sh',
    user: 'root',
    options: {
      'host': {
        description: 'The database service to use',
        default: 'database',
        alias: ['h'],
      },
      'no-wipe': {
        description: 'Do not destroy the existing database before an import',
        boolean: true,
      },
    },
  },
  'db-export [file]': {
    service: ':host',
    description: 'Exports database from a database service to a file',
    cmd: '/helpers/sql-export.sh',
    user: 'root',
    options: {
      host: {
        description: 'The database service to use',
        default: 'database',
        alias: ['h'],
      },
      stdout: {
        description: 'Dump database to stdout',
      },
    },
  },
  'php': {
    service: 'appserver',
    cmd: 'php',
  },
};

// MariaDB cli commands
const mariadbCli = {
  service: ':host',
  description: 'Drops into a MariaDB shell on a database service',
  cmd: 'mariadb -uroot',
  options: {
    host: {
      description: 'The database service to use',
      default: 'database',
      alias: ['h'],
    },
  },
};
// MySQL cli commands
const mysqlCli = {
  service: ':host',
  description: 'Drops into a MySQL shell on a database service',
  cmd: 'mysql -uroot',
  options: {
    host: {
      description: 'The database service to use',
      default: 'database',
      alias: ['h'],
    },
  },
};
// Postgres cli commands
const postgresCli = {
  service: ':host',
  description: 'Drops into a psql shell on a database service',
  cmd: 'psql -Upostgres',
  user: 'root',
  options: {
    host: {
      description: 'The database service to use',
      default: 'database',
      alias: ['h'],
    },
  },
};

/*
 * Helper to get config defaults
 */
const getConfigDefaults = options => {
  // Get the viaconf
  if (_.startsWith(options.via, 'nginx')) options.defaultFiles.vhosts = 'default.conf.tpl';

  // attempt to discover the database that is actually being used
  // @NOTE: this will look to see if database is overridden
  const dbConfig = getDatabaseType(options);
  const database = _.first(dbConfig.split(':'));
  const version = _.last(dbConfig.split(':')).substring(0, 2);
  if (database === 'laravel-mysql' || database === 'mysql' || database === 'mariadb') {
    if (version === '8.') {
      options.defaultFiles.database = 'mysql8.cnf';
    } else {
      options.defaultFiles.database = 'mysql.cnf';
    }
  }

  // Verify files exist and remove if it doesn't
  _.forEach(options.defaultFiles, (file, type) => {
    if (!fs.existsSync(`${options.confDest}/${file}`)) {
      delete options.defaultFiles[type];
    }
  });

  // Return
  return options.defaultFiles;
};

/*
 * Helper to get services
 */
const getServices = options => ({
  appserver: {
    build_as_root_internal: options.build_root,
    build_internal: options.build,
    composer: options.composer,
    composer_version: options.composer_version,
    config: getServiceConfig(options),
    run_as_root_internal: options.run_root,
    ssl: true,
    type: `laravel-php:${options.php}`,
    via: options.via,
    xdebug: options.xdebug,
    webroot: options.webroot,
  },
  database: {
    config: getServiceConfig(options, ['database']),
    authentication: 'mysql_native_password',
    type: `laravel-${options.database}`,
    portforward: true,
    creds: {
      user: options.recipe,
      password: options.recipe,
      database: options.recipe,
    },
  },
});

/*
 * Helper to get the phar build command
 */
const getDbTooling = database => {
  // Make sure we strip out any version number
  const db = database.split(':')[0];
  const ver = database.split(':')[1];
  // Choose wisely
  if (db === 'mysql') {
    return {mysql: mysqlCli};
  } else if (db === 'mariadb' && ver < 10.4) {
    // Use mysql command for MariaDB 10.3.x and below
    return {mysql: mysqlCli};
  } else if (db === 'mariadb') {
    return {mariadb: mariadbCli};
  } else if (db === 'postgres') {
    return {psql: postgresCli};
  } else if (db === 'mongo') {
    return {mongo: {
      service: 'database',
      description: 'Drop into the mongo shell',
    }};
  }
};

/*
 * Helper to get proxy config
 */
const getProxy = (options, proxyService = 'appserver') => {
  // get any intial proxy stuff for proxyService
  const urls = _.get(options, `_app.config.proxy.${proxyService}`, []);
  // add
  urls.push(`${options.app}.${options._app._config.domain}`);
  // return
  return {[proxyService]: _.uniq(_.compact(urls))};
};

/*
 * Helper to get service config
 */
const getServiceConfig = (options, types = ['php', 'server', 'vhosts']) => {
  const config = {};
  _.forEach(types, type => {
    if (_.has(options, `config.${type}`)) {
      config[type] = options.config[type];
    } else if (!_.has(options, `config.${type}`) && _.has(options, `defaultFiles.${type}`)) {
      if (_.has(options, 'confDest')) {
        config[type] = path.join(options.confDest, options.defaultFiles[type]);
      }
    }
  });
  return config;
};

/*
 * Helper to get tooling
 */
const getTooling = options => _.merge({}, toolingDefaults, getDbTooling(options.database));

/*
 * Build Laravel
 */
module.exports = {
  name: 'laravel',
  parent: '_recipe',
  config: {
    confSrc: path.resolve(__dirname, '..', 'config'),
    config: {},
    composer: {},
    database: 'mysql',
    defaultFiles: {
      php: 'php.ini',
    },
    php: '8.3',
    services: {appserver: {overrides: {environment: {
      APP_LOG: 'errorlog',
    }}}},
    tooling: {laravel: {service: 'appserver'}},
    via: 'apache',
    webroot: '.',
    xdebug: false,
    proxy: {},
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

      if (_.has(options, 'cache') && options.cache !== 'none') {
        options.services.cache = getCache(options.cache);
      }

      // Switch the proxy if needed
      if (!_.has(options, 'proxyService')) {
        if (_.startsWith(options.via, 'nginx')) options.proxyService = 'appserver_nginx';
        else if (_.startsWith(options.via, 'apache')) options.proxyService = 'appserver';
      }

      // Rebase on top of any default config we might already have
      options.defaultFiles = _.merge({}, getConfigDefaults(_.cloneDeep(options)), options.defaultFiles);
      options.proxy = _.merge({}, getProxy(options, options.proxyService), options.proxy);
      options.services = _.merge({}, getServices(options), options.services);
      options.tooling = _.merge({}, getTooling(options), options.tooling);

      // Add in artisan tooling
      // @NOTE: does artisan always live one up of the webroot?
      options.tooling.artisan = {
        service: 'appserver',
        cmd: `php /app/${options.webroot}/../artisan`,
      };

      // Send downstream
      super(id, _.merge({}, config, options));
    }
  },
};
