'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var fs = require('fs');
var mkdirp = require('mkdirp');


describe('angularwebpackgenerator:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '..','generators','app'))
      .withOptions({ skipInstall: true })
      .withPrompts({ appName: 'testApp' })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
        'bower.json',
        'package.json',
        'webpack.config.js',
        path.join("test", "karma.config.js"),
        path.join("test", "test-context.js"),
        path.join("test", "karma.config.js"),
        path.join("src", "core", "bootstrap.js"),
        path.join("src", "core", "core.directives.js"),
        path.join("src", "core", "core.factories.js"),
        path.join("src", "core", "core.providers.js"),
        path.join("src", "core", "core.services.js"),
        path.join("src", "pages", "home", "home.routing.js"),
        path.join("src", "pages", "home", "controllers", "home.controller.js"),
        path.join("src", "pages", "home", "controllers", "home.controller.spec.js"),
        path.join("src", "pages", "home", "views", "home.html")
    ]);
  });
});


describe('angularwebpackgenerator:controller', function() {
    before(function (done) {
        helpers.run(path.join(__dirname, '..', 'generators', 'controller'))
            .withOptions({ skipInstall: true })
            .withPrompts({})
            .on('end', done);
    });

    it('creates files', function() {
        assert.file([
            path.join('src', 'pages', 'home', 'controllers', 'index.controller.js'),
            path.join('src', 'pages', 'home', 'controllers', 'index.controller.spec.js'),
            path.join('src', 'pages', 'home', 'views', 'index.html')
        ]);
    });


});

describe('angularwebpackgenerator:route', function() {

    before(function(done) {
        helpers.run(path.join(__dirname, '..', 'generators', 'route'))
            .withOptions({ skipInstall: true })
            .withPrompts({})
            .on('end', done);
    });

    it('create file route', function() {
        assert.file([
            path.join('src', 'pages', 'home', 'home.routing.js')
        ]);
    });
});


