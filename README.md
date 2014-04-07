# grunt-xamarin-deploy

> This plugin will deploy files to the resource directory of your app

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-xamarin-deploy --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-xamarin-deploy');
```

## The "xamarin_deploy" task

### Overview
In your project's Gruntfile, add a section named `xamarin_deploy`

```js
grunt.initConfig({
  xamarin_deploy: {
    options: {
      os: 'andorid'
    }
    compile: {
      files: {
        './XamarinIos/XamarinIOS.csproj': 'www/**/*'
      }
    }
  },
})
```

### Options

```js
os: "android|ios"
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 Phillip Burch. Licensed under the MIT license.
=======
grunt-xamarin-deploy
====================

Handle deploying files to your project's resource directory and updating references in your project file.

