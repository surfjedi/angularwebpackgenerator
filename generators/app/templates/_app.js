'use strict';

function appRouting($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/login');

	$stateProvider.state('app', {
        abstract: true,
        views: {
            'app': {
                template: require('./views/app.html')                     
            },
            'login': {}
        }
    })
    .state('login', {
    	abstract: true,
    	views: {
    		'app': {},
    		'login': {
    			template: require('./views/login.html')
    		}
    	}
    });
}

export default require('angular')
    .module('<%= app_name %>', [
        require('angular-animate'),
        require('angular-aria'),
        require('angular-material'),
        require('angular-material-icons'),
        require('angular-ui-router'),
        // @SEE: It's a hack! https://github.com/ocombe/ocLazyLoad/issues/179
        (() => { require('oclazyload'); return 'oc.lazyLoad' })(),
        require('core/core.directives').name,
        require('core/core.factories').name,
        require('core/core.providers').name,
        require('core/core.services').name,
        require('./pages/home/home.routing').name,
        require('./pages/login/login.routing').name
    ])
     .config(['$urlRouterProvider', '$stateProvider', appRouting]);
