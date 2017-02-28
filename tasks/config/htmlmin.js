module.exports = function(grunt) {
  'use strict';
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.config.merge({
    htmlmin: {
      f1CdtAdpq: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
        // Only if you don't use comment directives!
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    }
  });
};
