module.exports = function(grunt) {
  'use strict';
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.config.merge({
    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      app: {
        files: [ {
          expand: true,
          src: [ '<%= pkg.buildPath %>/js/**/*.js' ]
        } ]
      }
    }
  });
};