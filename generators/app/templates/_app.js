'use strict';

export default require('angular')
    .module('<%= app_name %>', [
        require('angular-ui-router'),
        // @SEE: It's a hack! https://github.com/ocombe/ocLazyLoad/issues/179
        (() => { require('oclazyload'); return 'oc.lazyLoad' })(),
        require('./pages/home/home.routing').name
    ]);
