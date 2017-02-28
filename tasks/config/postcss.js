module.exports = function(grunt) {
  'use strict';
  var assets = require('postcss-assets');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.config.merge({
    postcss: {
      options: {
        processors: [ require('postcss-assets')(), require('autoprefixer')({
          browsers: '> 1%, last 3 versions',
          remove: false
        // don't remove outdated prefixes (there shouldn't be any, and this
        // saves compile time)
        }) ]
      },
      gesso: {
        src: '<%= pkg.buildPath %>/css/*.css'
      }
    }
  });
};
