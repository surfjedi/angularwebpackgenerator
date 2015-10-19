'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var fs = require('fs');
var mkdirp = require('mkdirp');
var util   = require('../util');

var AngularWebPackAngularJs = yeoman.generators.Base.extend({
    promptUser: function() {
        var done = this.async();
        // have Yeoman greet the user

        var prompts = [
            {
                name: 'controllerName',
                message: 'Enter your controller name',
                default: 'index'
            },
            {
                name: 'pageName',
                message: 'Enter your page name',
                default: 'home'
            }
        ];

        this.prompt(prompts, function(props) {
            this.controllerName = _.capitalize(props.controllerName);
            this.pageName       = props.pageName.toLowerCase();
            this.moduleName     = props.controllerName.toLowerCase();
            done();
        }.bind(this));
    },

    createFiles: function() {

        if (! fs.existsSync(path.join("src", "pages", this.pageName))) {
            mkdirp.sync(path.join("src"));
            mkdirp.sync(path.join("src", "pages"));
        }

        if (! fs.existsSync(path.join("src", 'app.js')))  {
            console.log('creating app.js');
            this.copy('_app.js', path.join("src", 'app.js'));
        }

        var context = {
            controllerName: this.controllerName,
            moduleName: this.moduleName
        };

        this.template("_controller.js", path.join("src", "pages", this.pageName, "controllers", this.moduleName+'.controller.js'), context);
        this.template("_controller.spec.js", path.join("src", "pages", this.pageName, "controllers", this.moduleName+'.controller.spec.js'), context);
        this.template("_index.html", path.join("src", "pages", this.pageName, "views", this.moduleName+'.html'), context);

        if(! fs.existsSync(path.join("src", "pages", this.pageName, this.pageName+'.routing.js'))) {
            console.log('creating routing file of page ');
            this.template("_routing.js", path.join("src", "pages", this.pageName, this.pageName+'.routing.js'), context);
        }

        var template = "require('./pages/"+this.pageName+"/"+this.moduleName+".routing').name,";

        if(fs.existsSync(path.join("src", 'app.js'))) {
            console.log("alterando app.js");
            util.rewriteAppFile(template, path.join("src", "app.js"));
        }

        console.log("create file sucess, register route for controller in "+this.pageName+".routing.js !");

    }
});

module.exports = AngularWebPackAngularJs;
