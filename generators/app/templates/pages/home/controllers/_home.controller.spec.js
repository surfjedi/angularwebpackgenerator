'use strict';

describe('HomeController', () => {
    var controller,
    msgStoreMock;

    beforeEach(angular.mock.module(require('./home.controller').name));

    beforeEach(inject( ($controller) => {
        controller = $controller('HomeController', {});
    }));

    it('set title', () => {
        expect(controller.title).toBeDefined();
        expect(controller.title).toEqual("");
    });

    it('set values', () => {
        expect(controller.values).toBeDefined();
        expect(controller.values).toEqual(jasmine.any(Array));
    });

    it('has create() method', () => {
        expect(controller.create).toBeDefined();
        expect(controller.create).toEqual(jasmine.any(Function));
    });

    describe('Called create() method', () => {

        it('call create() with title empty', () => {
            controller.title = '';
            controller.create();

            expect(controller.values).not.toContain('');
        });

        it('call create with title valid', () => {
            controller.title = 'Home';
            controller.create();

            expect(controller.values).toContain('Home');
        });
    });
});
