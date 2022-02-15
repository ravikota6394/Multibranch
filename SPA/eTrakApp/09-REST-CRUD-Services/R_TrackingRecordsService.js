(function () {
    'use strict';

    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.service('R_TrackingRecordsService', [
        '$http', function ($http) {

            var urlBase = '/api/R_TrackingRecords';


            //Create new record
            this.createTrackingRecord = function (trackingRecord) {
                var urlBaseNew = '/api/R_TrackingRecords';
                var request = $http({
                    method: "post",
                    url: urlBaseNew,
                    data: trackingRecord
                });
                return request;
            }

            //Get Single TrackingRecord
            this.getTrackingRecord = function (trCode) {
                return $http.get(urlBase + "/" + trCode);
            }

            //Get Single TrackingRecord for email display
            this.getRepliedEmailFromTrakingRecord = function (enCode) {                              
                return $http.get("/Enquiries/GetRepliedEmail?enCode=" + enCode);
            }

            this.getAttachments = function (id) {
                return $http.get("EmailStatus/GetAttachmentsPath?id=" + id);
            }

            //Update the Tracking Record
            this.saveChanges = function (trCode, trackingRecord) {
                var request = $http({
                    method: "put",
                    url: urlBase + "/" + trCode,
                    data: trackingRecord
                });

                return request;
            }

            //Enter record when user changed
            this.trackRecordWhenUserChanged = function (enCode, user, userCode) {              
                return $http.get('/Clients/TrackRecordWhenUserChanged?enCode=' + enCode + '&user=' + user + '&userCode=' + userCode);
            }

            //Delete the Tracking Record
            this.deleteTrackingRecord = function (trCode) {
                var request = $http({
                    method: "delete",
                    url: urlBase + "/" + trCode
                });
                return request;
            }

            //Executing scripts from actions tab
            this.runScript = function (encode, programId, propertyId) {
                return $http.get('/Programs/RunScriptFromActionsTab?encode=' + encode + '&programId=' + programId + '&propertyId=' + propertyId);
            }

            //creating duplicate enquiries from actions tab
            this.duplicateEnquiries = function (enqRef, count, pgId, userName) {
                return $http.get('/Programs/CreateDuplicateEnquiries?encode=' + enqRef + '&count=' + count + '&programId=' + pgId + '&userName=' + userName);
            }
        }
    ]);
})();