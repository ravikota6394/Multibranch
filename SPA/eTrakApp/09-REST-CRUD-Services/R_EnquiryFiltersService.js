( function(){
    'use strict';
    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.service('R_EnquiryFiltersService', [
    '$http', function ($http) {

        //var urlBase = 'api/R_EnquiryFilters';

        // return all templates
        this.getEnquiryFilters = function (enqRef) {
            var paramValue = "efEnCode = " + enqRef + " ";
            var urlBaseUnique = '/api/R_EnquiryFilters?paramValue=' + encodeURIComponent(paramValue);
                return $http.get(urlBaseUnique);
            };

        //Get a specific Enquiry Filter using recID
        this.getAnEnquiryFilterWithID = function (recID) {
            var urlBaseGet2 = '/api/R_EnquiryFilters/' + recID;
            var request = $http({
                method: "get",
                url: urlBaseGet2
            });
            return request;

        };

        //Get a specific Enquiry Filter record using SQL
            this.getSpecificEnquiryFilter = function(enqRef, filterName) {
                var paramValue = "efEnCode = " + enqRef + " AND  efFilterName = '" + filterName + "' ";
                var urlBaseUnique1 = '/api/R_EnquiryFilters?paramValue=' + encodeURIComponent(paramValue);
                return $http.get(urlBaseUnique1);
            };


        //Delete an Enquiry Filter Record
        this.deleteAnEnquiryFilter = function (recID) {

            var urlBaseGet1 = 'api/R_EnquiryFilters/' + recID;
            var request = $http({
                method: "delete",
                url: urlBaseGet1
            });
            return request;

        };

        //Amend an Enquiry Filter Record
        this.amendAnEnquiryFilter = function (ID,filterRecord) {

            var request = $http({
                method: "put",
                url: 'api/R_EnquiryFilters/' + ID,
                data: filterRecord
            });
            return request;

        };
        //Create Enquiry Filter Record
        this.createFilterRecord = function (enquiryFilterRecord) {

                var urlBaseCreate = 'api/R_EnquiryFilters';
                var request = $http({
                    method: "post",
                    url: urlBaseCreate,
                    data: enquiryFilterRecord
                });
                return request;
            };

    }

    ]);
})();