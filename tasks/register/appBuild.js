var env = process.env.NODE_ENV || 'development';

module.exports = function (grunt) {
  grunt.registerTask('appBuild', [
      'ngconstant:' + env,
      'ngtemplates',
      'ngAnnotate',
  ]);
};