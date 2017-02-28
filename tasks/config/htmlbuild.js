module.exports = function(grunt) {
  'use strict';
  grunt.loadNpmTasks('grunt-html-build');
  grunt.config.merge({
    htmlbuild: {
      dev: {
        src: 'templates/index.html',
        dest: 'public',
        options: {
          prefix: '/',
          beautify: true,
          relative: false,
          scripts: {
            bundle: {
              cwd: 'public',
              files: require('../pipeline.js').jsFilesToInject
            }
          },
          styles: {
            bundle: {
              cwd: 'public',
              files: [ 'vendor/**/*.css' ]
            }
          }
        }
      }
    }
  });
};
