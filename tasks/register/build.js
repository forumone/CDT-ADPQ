module.exports = function (grunt) {
    'use strict';
    grunt.config.merge({});
    grunt.registerTask('build', [
        'sync:source',
        'bower',
        'gessoBuild',
        'appBuild',
        'sync:build',
        'sync:vendor',
        'htmlbuild'
    ]);
};