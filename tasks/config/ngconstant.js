var parseApplicationId = process.env.PARSE_APPLICATION_ID || '';
var parseJavascriptKey = process.env.PARSE_JAVASCRIPT_KEY || '';
var serverUrl = process.env.PARSE_SERVER_URL || '';

module.exports = function(grunt) {
  'use strict';
  grunt.loadNpmTasks('grunt-ng-constant');
  grunt.config.merge({
    'ngconstant': {
      development: {
        options: {
          name: 'config',
          dest: '<%= pkg.buildPath %>/js/config.js',
          constants: grunt.file.exists('keys.json') ? grunt.file.readJSON('keys.json') : {
            parseApplicationId: parseApplicationId,
            parseJavascriptKey: parseJavascriptKey,
            serverUrl: serverUrl
          }
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