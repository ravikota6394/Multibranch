(function () {
    'use strict';
    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.service('R_WhiteLabelsService', [
        '$http', function ($http) {

            var urlBase = 'api/V_WhiteLabels';

            this.getWhiteLabels = function () {

                return $http.get(urlBase);
            };

        }
    ]);
})();