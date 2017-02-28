module.exports = function (grunt) {
  var environment = grunt.option('env') || 'dev';
  
  grunt.registerTask('updateSchema', [
    'env:' + environment,
    'shell:updateSchema'
  ]);
};