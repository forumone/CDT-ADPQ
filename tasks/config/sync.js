module.exports = function(grunt) {
  'use strict';
  grunt.loadNpmTasks('grunt-sync');
  grunt.config.merge({
    sync: {
      build: {
        files: [ {
          cwd: 'build/css',
          src: '**/*.css',
          dest: 'public/css',
          expand: true
        }, {
          cwd: 'build/images',
          src: '**/*',
          dest: 'public/images',
          expand: true
        }, {
          cwd: 'build/fonts',
          src: '**/*',
          dest: 'public/fonts',
          expand: true
        }, {
          cwd: 'build/vendor',
          src: [ '**/*.js', '**/*.js.map' ],
          dest: 'public/vendor/js',
          expand: true
        }, {
          cwd: 'build/js',
          src: [ '**/*.js', '**/*.js.map' ],
          dest: 'public/js',
          expand: true
        } ],
        updateAndDelete: true
      },
      vendor: {
        files: [ {
          cwd: 'build/vendor',
          src: [ '**/*.css' ],
          dest: 'public/vendor/css',
          expand: true
        } ]
      },
      source: {
        files: [ {
          cwd: 'src/images',
          src: '**/*',
          dest: 'build/images',
          expand: true
        }, {
          cwd: 'src/js',
          src: '**/*',
          dest: 'build/js',
          expand: true
        }, {
          cwd: 'src/polyfills',
          src: '**/*',
          dest: 'build/polyfills',
          expand: true
        }, {
          cwd: 'src/sass',
          src: '**/*',
          dest: 'build/sass',
          expand: true
        }, {
          cwd: 'src/fonts',
          src: '**/*',
          dest: 'build/fonts',
          expand: true
        } ],
        updateAndDelete: true
      }
    }
  });
};
