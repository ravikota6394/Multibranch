(function () {
    'use strict';
var eTrakApp = angular.module('eTrakApp');

    eTrakApp.service('R_CountriesService', [
        '$http', function ($http) {

            var urlBase = '/api/V_Countries';

            this.getCountries = function () {

               // alert('At Countries service');
                    return $http.get(urlBase);
            };

            this.getAllCountries = function (country) {
                return $http.get('AdvancedSearch/getAllCountries?country=' + country);
            };

            //Get Single Country

            this.getCountry = function(coCode) {
                var paramValue =  coCode;

                var urlBase1 = '/api/R_Countries?paramValue=' + encodeURIComponent(paramValue);
              //  alert(urlBase1);
                return $http.get(urlBase1);
            };

            //Get a record
            this.getACountry = function (countryCode) {
              //  alert("here at the email get enq source service " + countryCode);
                var urlBaseGet1 = '/api/R_Countries/' + countryCode;
                var request = $http({
                    method: "get",
                    url: urlBaseGet1
                });
                return request;

            };

            //Get Country Name
            this.getCountryName = function (countryCode) {
                return $http.get("Countries/GetCountryName?countryCode=" + countryCode);
            }
        }
    ]);
})();