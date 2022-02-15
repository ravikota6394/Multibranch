(function () {
   'use strict';

   var eTrakApp = angular.module('eTrakApp');

    // Client Groups list
    eTrakApp.controller('R_Clients', [
        '$scope', 'R_ClientsService',
        function ($scope, clientsFactory) {

            function getClients() {
                clientsFactory.getClients()
                    .success(function (clients) {
                        $scope.Clients = clients;                        
                    });

            }

            //getClients();

        }
    ]);
})();
