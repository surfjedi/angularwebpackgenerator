'use strict';

let coreDirectives = require('core/core.directives');
let coreFactories = require('core/core.factories');
let coreProviders = require('core/core.providers');
let coreServices  = require('core/core.services');

export default require('angular')
    .module('<%= app_name %>', [
        require('angular-ui-router'),
        // @SEE: It's a hack! https://github.com/ocombe/ocLazyLoad/issues/179
        (() => { require('oclazyload'); return 'oc.lazyLoad' })(),
        require('./pages/home/home.routing').name,
        coreDirectives.name,
        coreFactories.name,
        coreProviders.name,
        coreServices.name
    ]);
