(function () {
    'use strict';

    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.service('R_UserTimeZonesService', [
        '$http', function ($http) {

            var urlBase = '/api/R_UserTimeZones';

            this.getUserTimeZones = function () {
              //alert('r_usersTimeZones service');


                return $http.get(urlBase);
            };

            //Get TimeZone
            this.getTimeZone = function (timeZoneCode) {
                return $http.get("UserTimeZones/GetTimeZone?timeZoneCode=" + timeZoneCode);
            }

        }
    ]);
})();