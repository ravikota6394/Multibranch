(function () {
    'use strict';
    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.service('R_V_EmailAddressesService', [
    '$http', function ($http) {


        //Get List for an Enquiry REf

        this.getEmailAddresses = function (enquiryRef) {
            var paramValue = enquiryRef;

            var urlBase = '/api/V_EmailAddresses?paramValue=' + encodeURIComponent(paramValue);
           // alert(urlBase);
            return $http.get(urlBase);
        }


    }
    ]);
})();