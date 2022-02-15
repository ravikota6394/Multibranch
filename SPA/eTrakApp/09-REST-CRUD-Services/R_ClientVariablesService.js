(function () {

    'use strict';

    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.service('R_ClientVariablesService', [
        '$http', function ($http) {

            var urlBase = '/api/R_ClientVariable';

            this.getClientVariableDetails = function () {
                return $http.get(urlBase);
            };

            //Get a record
            this.getAClientVariable = function (clientVariableCode) {
                var urlBaseGet1 = '/api/R_ClientVariable/' + clientVariableCode;
                var request = $http({
                    method: "get",
                    url: urlBaseGet1
                });
                return request;

            };
        }
    ]);
})();