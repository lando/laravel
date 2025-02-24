'use strict';

const path = require('path');
const landoPhpPath = path.join(__dirname, '../node_modules/@lando/php');
const LandoPhp = require(`${landoPhpPath}/builders/php.js`);

/**
 * Laravel PHP builder class that extends Lando PHP builder.
 * Uses the bundled version of @lando/php plugin instead of user's version.
 *
 * @module laravel-php
 */
module.exports = {
  name: 'laravel-php',
  parent: '_appserver',
  /**
   * Builder function that returns the LaravelPhp class
   * @param {Object} parent - Parent builder class
   * @return {Class} LaravelPhp class extending LandoPhp builder
   */
  builder: parent => class LaravelPhp extends LandoPhp.builder(parent, LandoPhp.config) {
    /**
     * Create a new LaravelPhp instance
     * @param {string} id - Service id
     * @param {Object} options - Service options
     * @param {Object} factory - App factory instance
     */
    constructor(id, options = {}, factory) {
      options.nginxServiceType = 'laravel-nginx';
      super(id, options, factory);
    }
  },
};
