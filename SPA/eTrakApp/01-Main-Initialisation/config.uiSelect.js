(function () {
    'use strict';
    
    var eTrakApp = angular.module('eTrakApp');
    eTrakApp.config(function(uiSelectConfig) {
    	uiSelectConfig.theme = 'select2';
        uiSelectConfig.resetSearchInput = false;
    });


})();