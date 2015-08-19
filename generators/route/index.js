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
        //console.log(this.yeoman);

        var prompts = [
            {
                name: 'controllerName',
                message: 'Enter your controller name',
                default: 'home'
            },
            {
                name: 'nameRoute',
                message: 'Enter your name route',
                default: 'home'
            },
            {
                name: 'pageName',
                message: 'Enter your page source',
                default: 'home'
            },
            {
                name: 'uri',
                message: 'Enter your uri path',
                default: '/home'
            }
        ];

        this.prompt(prompts, function(props) {
            this.controllerName = _.capitalize(props.controllerName);
            this.pageName       = props.pageName.toLowerCase();
            this.nameRoute           = props.nameRoute;
            this.moduleName     = props.controllerName.toLowerCase();
            this.uri            = props.uri.toLowerCase();
            done();
        }.bind(this));
    },

    createFiles: function() {

        if (! fs.existsSync(path.join("src", "pages", this.pageName))) {
            mkdirp.sync(path.join("src"));
            mkdirp.sync(path.join("src", "pages"));
            mkdirp.sync(path.join("src", "pages", this.pageName));
        }

        if(! fs.existsSync(path.join("src", "pages", this.pageName, this.pageName +".routing.js"))) {
            var context = {
                controllerName: this.controllerName,
                moduleName: this.moduleName,
                uri: this.uri,
                name: this.nameRoute
            };

            this.template("_routing.js", path.join("src", "pages", this.pageName, this.pageName+'.routing.js'), context);
        } else if (this.nameRoute.toString().) {
            var newRoute = [
                "    .state('"+this.nameRoute+"', {",
                "        url: '"+this.uri+"',",
                "        template: require('./views/"+this.moduleName+".html'),",
                "        controller: '"+this.controllerName+"Controller as vm',",
                "        resolve: {",
                "            loadHomeController: ($q, $ocLazyLoad) => {",
                "                return $q((resolve) => {",
                "                    require.ensure([], () => {",
                "                        let module = require('./controllers/"+this.moduleName+".controller');",
                "                        $ocLazyLoad.load({name: '"+this.moduleName+".controller'});",
                "                        resolve(module.controller);",
                "                    });",
                "                });",
                "            }",
                "        }",
                "   });"
            ];

            util.rewriteRouteFile(newRoute, path.join("src", "pages", this.pageName, this.pageName+".routing.js"));
        }

        console.log("register route for controller in "+this.pageName+".routing.js !");

    }
});

module.exports = AngularWebPackAngularJs;
