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
  var platform = grunt.option("os"),
    bundleName = platform === 'ios' ? 'BundleResource' : 'AndroidAsset',
    pathPrefix = platform === 'ios' ? 'Resources\\' : 'Assets\\';

  // Converts XML project file to json
  function jsonify(projectFile, cb) {
    xmlhelper.parseString(fs.readFileSync(projectFile), cb);
  }

  // Convert JSON to xml project file
  function writeProjectFile(fileName, data) {
    var builder = new xmlhelper.Builder();
    var xml = builder.buildObject(data);

    grunt.file.write(fileName, xml);
    grunt.log.write(fileName + " was successfully generated");
  }

  // Add new files specied in the file.src
  function addNewFiles(project, sources) {
    // Remove the old bundled resources
    _.remove(project.Project.ItemGroup, function(group, idx) {
      return group[bundleName];
    });

    // create new bundle
    var files = [];

    sources.forEach(function(filepath) {
      if(fs.lstatSync(filepath).isFile()) {
        files.push({
          '$': {
            Include: pathPrefix + filepath.replace(/\//g, '\\')
          }
        });
      }
    });

    // Add new bundle to array
    var bundle = {};
    bundle[bundleName] = files;
    project.Project.ItemGroup.push(bundle);

    return project;
  }

  grunt.registerMultiTask('xamarin_deploy', 'This plugin will deploy files to the resource directory of your app', function () {
    var done = this.async();

    this.files.forEach(function (file) {
      // Get JSON representation of project file
      jsonify(file.dest, function(err, project) {
        writeProjectFile(file.dest, addNewFiles(project, file.src));
        done();
      });
    });
  });
};


