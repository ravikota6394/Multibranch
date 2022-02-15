(function () {
    'use strict';

    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.service('R_EmailApartmentVerificationsService', [
        '$http', function($http) {

        var urlBase = '/api/R_EmailApartmentVerifications';

        this.getEmailApartmentVerifications = function () {

            return $http.get(urlBase);
        };
        this.getAR_EmailApartmentVerification = function (avCode) {
            //  alert("here at the R_EmailApartmentVerifications service " + languageCode);
            var urlBaseGet1 = '/api/R_EmailApartmentVerifications/' + avCode;
            var request = $http({
                method: "get",
                url: urlBaseGet1
            });
            return request;

        };
        this.createAv = function (avRecord) {
            //alert("Created av "+avRecord);
            var urlBaseCreate = '/api/R_EmailApartmentVerifications';
            var request = $http({
                method: "post",
                url: urlBaseCreate,
                data: avRecord
            });
            return request;
        }


    }
    ]);
})();