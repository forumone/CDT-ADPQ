module.exports = function(grunt) {
  'use strict';
  grunt.loadNpmTasks('grunt-ng-constant');
  grunt.config.merge({
    'ngconstant': {
      development: {
        options: {
          name: 'config',
          dest: '<%= pkg.buildPath %>/js/config.js',
          constants: {}
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