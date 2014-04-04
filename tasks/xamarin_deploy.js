/*
 * grunt-xamarin-deploy
 * https://github.com/phillipb/grunt-xamarin-deploy
 *
 * Copyright (c) 2014 Phillip Burch
 * Licensed under the MIT license.
 */

'use strict';

// Register Dependencies
var xmlhelper = require('xml2js');
var fs = require('fs');
var _ = require('lodash');

module.exports = function (grunt) {
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('xamarin_deploy', 'This plugin will deploy files to the resource directory of your app', function () {
    var done = this.async();
    var self = this;

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });

    xmlhelper.parseString(fs.readFileSync('./XamarinIos/XamarinIOS.csproj'), function(err, resp) {
      _.remove(resp.Project.ItemGroup, function(group, idx) {
        return group.BundleResource;
      });

      var newBundle = [];

      self.files.forEach(function (file) {
        // Concat specified files.
        var sources = file.src.filter(function (filepath) {
          // Warn on and remove invalid source files (if nonull was set).
          if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Source file "' + filepath + '" not found.');
            return false;
          } else {
            return true;
          }
        });

        sources.forEach(function(filepath) {
          newBundle.push({ '$': { Include: 'Resources\\' + filepath.replace(\//g, '\\') } });

        });

        console.dir(newBundle)

        grunt.log.writeln('File "' + file.dest + '" created.');
      });


      resp.Project.ItemGroup.push({})
      //console.dir(resp.Project.ItemGroup.length);

      done();
    });

  });

};
