(function () {

    'use strict';

    var eTrakApp = angular.module('eTrakApp');

eTrakApp.service('R_ApartmentTypesService', [
    '$http', function ($http) {

        var urlBase = '/api/R_ApartmentTypes';

        this.getApartmentTypes = function () {           
            return $http.get(urlBase);
        };

        //Get a record
        this.getAnApartmentType = function (apartmentTypeCode) {
            //alert("here at the email get enq source service " + apartmentTypeCode);
            var urlBaseGet1 = '/api/R_ApartmentTypes/' + apartmentTypeCode;
            var request = $http({
                method: "get",
                url: urlBaseGet1
            });
            return request;

        };

        //Get Apartment Type Name
        this.getApartmentTypeName = function (apartmentTypeCode) {
            return $http.get("ApartmentTypes/GetApartmentTypeName?apartmentTypeCode=" + apartmentTypeCode);
        }

        this.createViewPropertyTrackingEntry = function (userCode,propertyName) {
            return $http.get("ApartmentTypes/createViewPropertyTrackingEntry?userCode=" + userCode + '&propertyName=' + propertyName);
        }
    }
]);
})();