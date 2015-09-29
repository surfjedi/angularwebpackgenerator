'use strict';

let appModule = require('../app');
let coreDirectives = require('core.directives');
let coreFactories = require('core.factories');
let coreProviders = require('core.providers');
let coreServices  = require('core.services');

angular.bootstrap(document, [
    appModule.name,
    coreDirectives.name,
    coreFactories.name,
    coreProviders.name,
    coreServices.name
], { strictDi: true });
