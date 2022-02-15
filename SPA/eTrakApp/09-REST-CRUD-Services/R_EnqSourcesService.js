(function () {
    'use strict';
    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.service('R_EnqSourcesService', [
        '$http', function ($http) {

            var urlBase = 'api/V_Sources';
            this.getEnqSources = function () {

                return $http.get(urlBase);
            };

            this.getEnqSource = function (soCode) {
                var paramValue =  "WHERE soCode = " + soCode;
                var urlBase1 = '/api/R_EnqSources?paramValue=' + encodeURIComponent(paramValue);
                return $http.get(urlBase1);
            }

            this.getAnEnqSource = function (enqSource) {
                var urlBaseGet2 = '/api/V_Sources/' + enqSource;
                var request = $http({
                    method: "get",
                    url: urlBaseGet2
                });
                return request;
            };

            this.getAllSources = function (source) {
                console.log(source);
                return $http.get('AdvancedSearch/GetAllSources?source=' + source);
            };

            this.getEnquirySources = function () {
                return $http.get('Sources/GetEnquirySources');
            };

            this.changeEnquirySourceCode = function (enquiryCode) {
               return $http.get('Enquiries/ChangeSource?enquiryCode=' + enquiryCode);
            };
        }
    ]);
})();