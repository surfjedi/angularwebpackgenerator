'use strict';

function <%= moduleName %>Routing($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('<%= uri %>');

    $stateProvider.state('<%= name %>', {
        url: '<%= uri %>',
        template: require('./views/<%= moduleName %>.html'),
        controller: '<%= controllerName %>Controller as vm',
        resolve: {
            loadHomeController: ($q, $ocLazyLoad) => {
                return $q((resolve) => {
                    require.ensure([], () => {
                        let module = require('./controllers/<%= moduleName %>.controller');
                        $ocLazyLoad.load({name: '<%= moduleName %>.controller'});
                        resolve(module.controller);
                    });
                });
            }
        }
    });
}

export default angular.module('<%= moduleName %>.routing', []).config(<%= moduleName %>Routing);
