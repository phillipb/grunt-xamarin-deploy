/*
 * grunt-xamarin-deploy
 * https://github.com/phillipb/grunt-xamarin-deploy
 *
 * Copyright (c) 2014 Phillip Burch
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Configuration to be run (and then tested).
    xamarin_deploy: {
      compile: {
        files: {
          './XamarinIos/XamarinIOS.csproj': 'www/**/*'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');
};
