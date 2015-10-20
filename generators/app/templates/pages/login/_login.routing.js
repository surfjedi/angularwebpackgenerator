'use strict';

function loginRouting($stateProvider) {
    $stateProvider.state('login.home', {
        url: '/login',
        template: require('./views/login.html'),
        controller: 'LoginController as vm',
        resolve: {
            loadHomeController: ($q, $ocLazyLoad) => {
                return $q((resolve) => {
                    require.ensure([], () => {
                        let module = require('./controllers/login.controller');
                        $ocLazyLoad.load({name: 'login.controller'});
                        resolve(module.controller);
                    });
                });
            }
        }
    });

}

export default angular.module('login.routing', []).config(['$stateProvider', loginRouting]);
