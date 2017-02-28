module.exports = function(grunt) {
  'use strict';
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.config.merge({
    concat: {
      js: {
        src: [ '<%= pkg.buildPath %>/js/config.js',
            '<%= pkg.buildPath %>/js/index.js',
            '<%= pkg.buildPath %>/js/**/*.js' ],
        dest: 'public/js/app.js'
      },
      css: {
        src: [ '<%= pkg.buildPath %>/css/**/*.css' ],
        dest: 'public/css/app.css'
      }
    }
  });
};
