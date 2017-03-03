var parseConfig = {
  applicationId: process.env.PARSE_APPLICATION_ID || '',
  javascriptKey: process.env.PARSE_JAVASCRIPT_KEY || '',
  serverUrl: process.env.PARSE_SERVER_URL || ''
}

module.exports = function(grunt) {
  'use strict';
  var config = grunt.file.exists('config/config.json') ? grunt.file.readJSON('config/config.json').parse : parseConfig;
  delete config.masterKey;
  
  grunt.loadNpmTasks('grunt-ng-constant');
  grunt.config.merge({
    'ngconstant': {
      development: {
        options: {
          name: 'config',
          dest: '<%= pkg.buildPath %>/js/config.js',
          constants: config
        }
      },
      staging: {
        options: {
          name: 'config',
          dest: '<%= pkg.buildPath %>/js/config.js',
          constants: {}
        }
      },
      production: {
        options: {
          name: 'config',
          dest: '<%= pkg.buildPath %>/js/config.js',
          constants: {}
        }
      }
    }
  });
};