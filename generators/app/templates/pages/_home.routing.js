'use strict';

function homeRouting($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider.state('home', {
        url: '/home',
        template: require('./views/home.html'),
        controller: 'HomeController as vm',
        resolve: {
            loadHomeController: ($q, $ocLazyLoad) => {
                return $q((resolve) => {
                    require.ensure([], () => {
                        let module = require('./controllers/home.controller');
                        $ocLazyLoad.load({name: 'home.controller'});
                        resolve(module.controller);
                    });
                });
            }
        }
    });

}

export default angular.module('home.routing', []).config(homeRouting);
