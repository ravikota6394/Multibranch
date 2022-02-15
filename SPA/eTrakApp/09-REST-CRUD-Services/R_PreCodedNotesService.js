(function () {
    'use strict';
    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.service('R_PreCodedNotesService', [
    '$http', function ($http) {

        var urlBase = '/api/R_CodedNotes';

        this.getPreCodedNotes = function () {     
            return $http.get(urlBase);
        };

        this.TrackingEntry = function (record) {           
            console.log(record);
            var response = $http(
               {
                   method: "post",
                   url: "PreCoded/SaveTrackingEntry",
                   data: record,
                   contentType: "application/json;charset=utf-8",
                   dataType: "json"

               });
            return response;
        }

        this.TrackingEntries = function (enqRef) {
            console.log(enqRef);        
            return $http.get("PreCoded/GetTrackingEntries?enqRef=" + enqRef);
        }
    }
    ]);
})();