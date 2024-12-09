'use strict';

const _ = require('lodash');
const LandoMemcached = require('@lando/memcached/builders/memcached.js');

// Builder
module.exports = {
  name: 'laravel-memcached',
  parent: '_service',
  builder: parent => class LaravelMemcached extends LandoMemcached.builder(parent, LandoMemcached.config) {
    constructor(id, options = {}) {
      super(id, options, {services: _.set({}, options.name)});
    }
  },
};
