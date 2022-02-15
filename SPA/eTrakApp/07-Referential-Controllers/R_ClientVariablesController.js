(function () {
    'use strict';

    var eTrakApp = angular.module('eTrakApp');

    //// Budget Categories list
    eTrakApp.controller('R_ClientVariable', [
        '$scope', 'R_ClientVariablesService',
        function ($scope, clientVariablesFactory) {

            function getClientVariables() {
                clientVariablesFactory.getClientVariableDetails()
                    .success(function (clientVariables) {
                        $scope.ClientVariablesList = clientVariables;
                    });

            }

            getClientVariables();

        }
    ]);
})();