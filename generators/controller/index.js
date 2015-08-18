'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var fs = require('fs');


var AngularWebPackAngularJs = yeoman.generators.Base.extend({
    promptUser: function() {
        var done = this.async();
        // have Yeoman greet the user
        console.log(this.yeoman);

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

        if (fs.existsSync(path.join("src", "pages", this.pageName))) {
            var context = {
                controllerName: this.controllerName,
                moduleName: this.moduleName
            };

            this.template("_controller.js", path.join("src", "pages", this.pageName, "controllers", this.moduleName+'.controller.js'), context);
            this.template("_controller.spec.js", path.join("src", "pages", this.pageName, "controllers", this.moduleName+'.controller.spec.js'), context);
            this.template("_index.html", path.join("src", "pages", this.pageName, "views", this.moduleName+'.html'), context);

            console.log("create file sucess, register route for controller in "+this.pageName+".routing.js !");
        } else {
            console.error('Page '+this.pageName+' not exists in src/pages');
        }
    }
});

module.exports = AngularWebPackAngularJs;
