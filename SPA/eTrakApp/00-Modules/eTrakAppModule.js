var eTrakApp = {};

(function () {
    'use strict';

    console.log('module initialization');

    eTrakApp = angular.module('eTrakApp', [
                             'ui.router',
                             'ui.select',
                             'ui.bootstrap',
                             'ngSanitize',
                             'angular-confirm',
                             'datatables',
                             'isteven-multi-select',
                             'unsavedChanges',
                             'ngIdle'
    ]);
    eTrakApp.run(['Idle', function (Idle) {
        Idle.watch();
    }]);

})();




