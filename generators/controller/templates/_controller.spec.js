'use strict';

describe('<%= controllerName %>Controller', () => {
    var controller;

    beforeEach(angular.mock.module(require('./<%= moduleName %>.controller').name));

    beforeEach(inject( ($controller) => {
        controller = $controller('<%= controllerName %>Controller', {});
    }));

});
