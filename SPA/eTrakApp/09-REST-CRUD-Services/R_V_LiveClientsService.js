(function () {
    'use strict';
var eTrakApp = angular.module('eTrakApp');

    eTrakApp.service('R_V_LiveClientsService', [
        '$http', function ($http) {

            var urlBase = '/api/R_V_LiveClients';

            this.getLiveClients = function () {

                return $http.get(urlBase);
            };

        }
    ]);
})();