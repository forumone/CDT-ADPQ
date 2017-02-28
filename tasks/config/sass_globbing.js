module.exports = function(grunt) {
  grunt.config.merge({
    sass_globbing: {
      gesso: {
        files: (function(grunt) {
          var opts = grunt.file.exists(grunt.config.get('pkg').buildPath
              + '/sass/sass-globbing.json') ? grunt.file.readJSON(grunt.config
              .get('pkg').buildPath
              + '/sass/sass-globbing.json') : {};

          return Object.keys(opts)
              .reduce(
                  function(previous, current) {
                    previous[grunt.config.get('pkg').buildPath + '/sass/'
                        + current] = grunt.config.get('pkg').themePath
                        + '/sass/' + opts[current];
                    return previous;
                  }, {});
        })(grunt)
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass-globbing');
}
