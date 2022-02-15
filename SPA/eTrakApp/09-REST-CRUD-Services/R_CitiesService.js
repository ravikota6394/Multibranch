(function () {
    'use strict';
    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.service('R_CitiesService', [
    '$http', function ($http) {

        var urlBase = '/api/V_Cities';

        this.getCities = function () {

            return $http.get(urlBase);
        };
        //Get Single City

        this.getCity = function (ciCode) {
            console.log("cityservices service" + ciCode);
            var paramValue = ciCode;
            console.log(encodeURIComponent(paramValue));
            var urlBase1 = '/api/R_Cities?paramValue=' + encodeURIComponent(paramValue);
            console.log(urlBase1);
            return $http.get(urlBase1);
        }

        //Get a record
        this.getACity = function (cityCode) {
           // alert("here at the email get enq source service " + cityCode);
            var urlBaseGet1 = '/api/R_Cities/' + cityCode;
            var request = $http({
                method: "get",
                url: urlBaseGet1
            });
            return request;

        };

        //Get City Name
        this.getCityName = function (cityCode) {
            return $http.get("Cities/GetCityName?cityCode=" + cityCode);
        }

        //Get City Name
        this.getCityCode = function (cityName) {
            return $http.get("Cities/GetCityCode?cityName=" + cityName);
        }

    }
    ]);
})();