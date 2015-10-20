'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var mkdirp = require('mkdirp');


var AngularWebPackAngularJs = yeoman.generators.Base.extend({
    promptUser: function() {
        var done = this.async();
        // have Yeoman greet the user

        var prompts = [{
          name: 'appName',
          message: 'Enter your project name?'
        }];

        this.prompt(prompts, function(props) {
          this.appName = props.appName;
          done();
        }.bind(this));
    },

    createFolders: function() {
        mkdirp.sync(path.join("build"), function (err) {
            if (err) console.error(err);
        });

        mkdirp.sync(path.join( "test"), function (err) {
            if (err) console.error(err);
        });

        mkdirp.sync(path.join("src"), function (err) {
            if (err) console.error(err);
        });

        mkdirp.sync(path.join("src", "core"), function (err) {
            if (err) console.error(err);
        });

        mkdirp.sync(path.join("src", "pages"), function (err) {
            if (err) console.error(err);
        });
        
        mkdirp.sync(path.join("src", "views"), function (err) {
            if (err) console.error(err);
        });
    },

    copyFiles: function() {
        this.copy('editorconfig', '.editorconfig');
        this.copy('jshintrc', '.jshintrc');
        this.copy('travis.yml', '.travis.yml');
        this.copy('bowerrc', '.bowerrc');
        this.copy('gitignore', '.gitignore');
        this.copy('_webpack.config.js', "webpack.config.js");
        this.copy('_package.json', "package.json");
        this.copy('_bower.json', "bower.json");
        this.copy('test/_karma.config.js', path.join("test", "karma.config.js"));
        this.copy('test/_test-context.js', path.join("test", "test-context.js"));
        this.copy('test/_karma.config.js', path.join("test", "karma.config.js"));
        this.copy('core/_bootstrap.js', path.join("src", "core", "bootstrap.js"));
        this.copy('core/_core.directives.js', path.join("src", "core", "core.directives.js"));
        this.copy('core/_core.factories.js', path.join("src", "core", "core.factories.js"));
        this.copy('core/_core.providers.js', path.join("src", "core", "core.providers.js"));
        this.copy('core/_core.services.js', path.join("src", "core", "core.services.js"));
        
        this.copy('views/app.html', path.join("src", "views", "app.html"));
        this.copy('views/login.html', path.join("src", "views", "login.html"));
        
        this.copy('pages/home/_home.routing.js', path.join("src", "pages", "home", "home.routing.js"));
        this.copy('pages/home/controllers/_home.controller.js', path.join("src", "pages", "home", "controllers", "home.controller.js"));
        this.copy('pages/home/controllers/_home.controller.spec.js', path.join("src", "pages", "home", "controllers", "home.controller.spec.js"));
         this.copy('pages/home/views/_home.html', path.join("src", "pages", "home", "views", "home.html"));
        
        this.copy('pages/login/views/_login.html', path.join("src", "pages", "login", "views", "login.html"));
        this.copy('pages/login/_login.routing.js', path.join("src", "pages", "login", "login.routing.js"));
        this.copy('pages/login/controllers/_login.controller.js', path.join("src", "pages", "login", "controllers", "login.controller.js"));
        this.copy('pages/login/controllers/_login.controller.spec.js', path.join("src", "pages", "login", "controllers", "login.controller.spec.js"));

        var context = {
            app_name: this.appName
        };

        this.template("build/_index.html", path.join("build", "index.html"), context);
        this.template('_app.js', path.join( "src", "app.js") , context);
    },

    runNpm: function() {
        console.log("\n Done loading files! \nInstalling Node modules and Bower packages...\n");
        this.npmInstall("", function() {
            console.log("\n Done installing node modules!\n Run 'npm start' to build and serve the project");
        });
        this.bowerInstall("", function() {
            console.log("\n  Done installing bower Packages\n");
        });
    }
});

module.exports = AngularWebPackAngularJs;
