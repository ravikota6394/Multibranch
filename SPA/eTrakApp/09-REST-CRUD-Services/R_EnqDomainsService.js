(function () {
    'use strict';
    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.service('R_EnqDomainsService', [
        '$http', function ($http) {

            var urlBase = 'api/V_Domains';

            this.getEnqDomains = function () {              
                return $http.get("Domain/GetDomains");
            };

            this.getEnqDomain = function (sdCode) {
                var paramValue =  "WHERE sdCode = " + sdCode;
                var urlBase1 = '/api/R_EnqDomains?paramValue=' + encodeURIComponent(paramValue);
                return $http.get(urlBase1);
            }


            //Get a record getEnqManualDomains
            this.getAnEnqDomain = function (enqDomain) {
                var urlBaseGet2 = '/api/V_Domains/' + enqDomain;
                var request = $http({
                    method: "get",
                    url: urlBaseGet2
                });
                return request;

            };

        }
    ]);
})();