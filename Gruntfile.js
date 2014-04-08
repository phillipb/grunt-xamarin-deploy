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
      android: {
        options: {
          os: 'android'
        },
        files: {
          './XamarinAndroid/XamarinAndroid.csproj': 'www/**/*'
        }
      },
      ios: {
        options: {
          os: 'ios'
        },
        files: {
          './XamarinIos/XamarinIOS.csproj': 'www/**/*'
        }
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');
};
