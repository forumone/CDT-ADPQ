module.exports = function(grunt) {
  'use strict';
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.config.merge({
    bower: {
      install: {
        options: {
          targetDir: 'build/vendor',
          layout: 'byComponent',
          install: true,
          verbose: false,
          cleanTargetDir: true,
          cleanBowerDir: false,
          bowerOptions: {},
          packageSpecific: {
            lodash: {
              files: [ 'dist/lodash.js' ]
            }
          }
        }
      },
      gesso: {
        options: {
          targetDir: '<%= pkg.buildPath %>/bower_components',
          layout: 'byComponent',
          install: true,
          verbose: false,
          cleanTargetDir: true,
          cleanBowerDir: false,
          bowerOptions: {}
        }
      }
    }
  });
};
