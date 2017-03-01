var serveStatic = require('serve-static');

module.exports = function(grunt) {
  'use strict';
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.config.merge({
    connect: {
      server: {
        options: {
          port: 3333,
          livereload: true,
          base: 'public',
          keepalive: false,
          open: true,
          debug: false,
          middleware: function(connect, options) {
            var middlewares = [];
            if (!Array.isArray(options.base)) {
              options.base = [ options.base ];
            }
            var directory = options.directory
                || options.base[options.base.length - 1];
            options.base.forEach(function(base) {
              // Serve static files. (use serve-static instead)
              middlewares.push(serveStatic(base));
            });
            // Make directory browse-able. (not available on latest connect)
            // middlewares.push(connect.directory(directory));

            // ***
            // Not found - just serve index.html
            // ***
            middlewares.push(function(req, res) {
              for (var file, i = 0; i < options.base.length; i++) {
                // fixed missing index
                file = options.base[i] + "/index.html";
                if (grunt.file.exists(file)) {
                  require('fs').createReadStream(file).pipe(res);
                  return; // we're done
                }
              }
              res.statusCode(404); // where's index.html?
              res.end();
            });
            return middlewares;
          },
        }
      }
    }
  });
};
