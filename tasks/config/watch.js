module.exports = function(grunt) {
  'use strict';
  grunt.config.merge({
    watch: {
      js: {
        options: {
          livereload: true
        },
        files: [ 'src/js/**/*' ],
        tasks: [ 'sync:source', 'appBuild', 'sync:build', 'sync:vendor',
            'htmlbuild', ]
      },
      gesso: {
        files: [ 'src/sass/**/*.scss' ],
        tasks: [ 'sync:source', 'gessoBuildStyles', 'appBuild', 'sync:build', 'sync:vendor',
            'htmlbuild' ],
        options: {
          livereload: true
        }
      },
      svgs: {
        files: [ 'src/images/bg/*.svg' ],
        tasks: [ 'sync:source', 'gessoBuildImages', 'gessoBuildStyles',
            'sync:build' ],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
};
