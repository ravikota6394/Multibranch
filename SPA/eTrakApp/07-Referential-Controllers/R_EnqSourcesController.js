(function () {
    'use strict';
    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.controller('R_EnqSources', [
        '$scope',  'R_EnqSourcesService',
        function ($scope, enqSourcesFactory) {
            function getEnqSources() {
                enqSourcesFactory.getEnqSources()
                        .success(function (enqSources) {
                            $scope.EnqSources = enqSources;
                            console.log("$scope.EnqSources");
                            console.log($scope.EnqSources);                         
                    });
            }

            getEnqSources();
        }
    ]);
})();