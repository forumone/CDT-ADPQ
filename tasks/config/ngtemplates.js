module.exports = function(grunt) {
  'use strict';
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.config.merge({
    ngtemplates: {
      f1CdtAdpq: {
        cwd: 'src/js',
        src: '**/**.html',
        dest: '<%= pkg.buildPath %>/js/templates.js',
        options: {
          htmlmin: '<%= htmlmin.f1CdtAdpq %>'
        }
      }
    }
  });
};