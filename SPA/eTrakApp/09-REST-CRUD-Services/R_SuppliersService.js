(function () {
    'use strict';
    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.service('R_SuppliersService', [
        '$http', function ($http) {

            var urlBase = 'api/R_Suppliers';

            this.getSuppliers = function () {

                return $http.get(urlBase);
            };

        }
    ]);
})();