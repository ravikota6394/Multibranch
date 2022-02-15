(function () {
    'use strict';

    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.service('PV_TrackingEntriesService', [
    '$http', function ($http) {
        this.getTrackingEntries = function (enqRef) {
            var paramValue = "trenCode = " + enqRef + "";

            var urlBase = '';
            if (paramValue.trim() > "") {
                urlBase = '/api/PV_TrackingEntries?paramValue=' + encodeURIComponent(paramValue);
            }
            return $http.get(urlBase);
        };

        this.getTrackingEmails = function (enqRef) {
            return $http.get("TrackingStatus/GetTrackingEmails?enqRef=" + enqRef);
        }

        this.madeEmailAsUnRead = function (trCode) {
            return $http.get("EmailStatus/MadeEmailAsUnRead?trCode=" + trCode);
        }

        this.getEmailDetails = function (trEmailId, userCode) {
            return $http.get("EmailStatus/GetEmailDetails?trEmailId=" + trEmailId + "&userCode=" + userCode);
        }

        this.getAttachments = function (id) {
            return $http.get("EmailStatus/GetAttachmentsPath?id=" + id);
        }

        this.getTrackingStatusRecords = function (functionalityId) {
            return $http.get('TrackingStatus/GetTrackingStatusRecords?functionalityId=' + functionalityId);
        }

        this.getFunctionalities = function () {
            return $http.get('TrackingStatus/GetFunctionalities');
        }
    }

    ]);

})();