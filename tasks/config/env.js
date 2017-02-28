module.exports = function(grunt) {
  grunt.config.set('env', {
    dev: {},
  });

  grunt.loadNpmTasks('grunt-env');
};