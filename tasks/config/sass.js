module.exports = function(grunt) {
  'use strict';
  grunt.loadNpmTasks('grunt-sass');
  grunt.config.merge({
    sass: {
      gesso: {
        files: [ {
          expand: true,
          cwd: '<%= pkg.buildPath %>/sass/',
          src: [ '**/*.scss' ],
          dest: '<%= pkg.buildPath %>/css',
          ext: '.css'
        } ],
        options: {
          sourceMap: true,
          outputStyle: 'nested',
          includePaths: [ 'bower_components' ],
          quiet: true
        }
      }
    }
  });
};
