(function() {
    'use strict';

    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.service('R_SearchFiltersService', [
        '$http', function($http) {

            var urlBase = '/api/R_SearchFilters';


            //Create new record
            this.createSearchFilter = function (searchRecord) {
                var urlBaseNew = '/api/R_SearchFilters';
                var request = $http({
                    method: "post",
                    url: urlBaseNew,
                    data: searchRecord
                });
                return request;
            }

            //Get Single Search
            this.getSearchFilter = function (sfID) {

                return $http.get(urlBase + "/" + sfID);
            }

            //Get All SearchFilters for Enquiry
            // This will have to be using the SQL controller
            this.getSearchFilter = function (enCode) {

                return $http.get(urlBase);
            }


            //Update the Search Filters for the Enquiry
            this.saveSearchFilterChanges = function (enCode, enquiry) {
                //alert(urlBase + "/" + enCode);
                //alert("This is the enquiry blob"+ enquiry);
                var request = $http({
                    method: "put",
                    url: urlBase + "/" + enCode,
                    data: enquiry
                });

                return request;
            }
            //Delete the Search Filter Record
            this.deleteSearchFilter = function(sfID) {
                var request = $http({
                    method: "delete",
                    url: urlBase + "/" + sfID
                });
                return request;
            }
        }
    ]);
})();