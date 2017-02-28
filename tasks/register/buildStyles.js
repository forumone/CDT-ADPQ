module.exports = function (grunt) {
    'use strict';
    grunt.config.merge({});
    grunt.registerTask('buildStyles', [
        'sass_globbing:gesso',
        'sass:gesso',
        'postcss:gesso'
    ]);
};