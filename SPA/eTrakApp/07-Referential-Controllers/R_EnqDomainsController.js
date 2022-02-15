(function () {
    'use strict';
    var eTrakApp = angular.module('eTrakApp');

    // Domains list
    eTrakApp.controller('R_EnqDomains', [
        '$scope',  'R_EnqDomainsService',
        function ($scope, enqDomainsFactory) {         
            function getEnqDomains() {               
                enqDomainsFactory.getEnqDomains()
                        .success(function (enqDomains) {
                            $scope.EnqDomains = enqDomains;                            
                            console.log($scope.EnqDomains);                            
                    });
            }
            getEnqDomains();
        }
    ]);
})();
