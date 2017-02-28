module.exports = function(grunt) {
  'use strict';
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.config.merge({
    js: {
      options: {
        sourceMap: true,
        sourceMapIncludeSources: true,
        sourceMapRoot: '../src'
      },
      files: [ {
        cwd: 'build',
        expand: true,
         src: require('../pipeline.js').jsFilesToInject,
        dest: 'build'
      } ]
    }
  });
};
