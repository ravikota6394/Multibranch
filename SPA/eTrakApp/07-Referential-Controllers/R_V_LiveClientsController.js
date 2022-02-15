(function () {
    'use strict';

    var eTrakApp = angular.module('eTrakApp');

    //// V_LiveClients list
    // Note this is a GET only service
// Client Groups list
eTrakApp.controller('R_V_LiveClients', [
    '$scope', 'R_V_LiveClientsService',
    function ($scope, liveClientsFactory) {

        function getLiveClients() {
            liveClientsFactory.getLiveClients()
                .success(function (liveClients) {
                    $scope.LiveClients = liveClients;
                });

        }

        getLiveClients();

    }
]);
})();
