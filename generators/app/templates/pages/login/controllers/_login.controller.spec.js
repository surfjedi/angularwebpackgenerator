'use strict';

describe('LoginController', () => {
    var controller;

    beforeEach(angular.mock.module(require('./login.controller').name));

    beforeEach(inject( ($controller) => {
        controller = $controller('LoginController', {});
    }));

});
