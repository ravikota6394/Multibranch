(function() {
    'use strict';

    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.service('R_QAChecksService', [
        '$http', function($http) {

            var urlBase = '/api/R_QAChecks';

            //Get All Checks
            this.getQACheckLists = function () {
                return $http.get(urlBase);
            }

            //Get single QAcheck
            this.getQACheck = function (checkID) {
                var urlBaseGet2 = urlBase + '/' + checkID;
                var request = $http({
                    method: "get",
                    url: urlBaseGet2
                });
                return request;
            };
            //get emailslist
            this.getEmailsCount = function (enqRef) {
                var urlBase1 = 'EmailStatus/GetEmailsCount?enqRef=' + enqRef;
                var request = $http({
                    method: "get",
                    url: urlBase1
                });
                return request;
               
            };
            
            //get SLA met Count
            this.getSlaMetCount = function (enqRef) {
                var urlBase1 = 'QAChecks/GetSlaMetCount?enqRef=' + enqRef;
                var request = $http({
                    method: "get",
                    url: urlBase1
                });
                return request;

            };

            //Get SLA Miss Count
             this.getSlaMissCount = function (enqRef) {
                var urlBase1 = 'QAChecks/GetSlaMissCount?enqRef=' + enqRef;
                var request = $http({
                    method: "get",
                    url: urlBase1
                });
                return request;

            };



            
            //Get All Checks for an Enquiry
            this.getQACheckList = function (enqCode) {
                var urlBase1 = '/api/V_QAChecks';
                var paramValue = "qaenCode="+enqCode;
               // var paramValue = "qaenCode>1";
                console.log(encodeURIComponent(paramValue));
                var urlBase2 = urlBase1+'?paramValue=' + encodeURIComponent(paramValue);
                console.log(urlBase2);
                return $http.get(urlBase2);
            }

            //Create new QACheck
            this.SaveCheck = function (checkRecord) {
                var request = $http({
                    method: "post",
                    url: urlBase,
                    data: checkRecord
                });
                return request;
            }           

            //Delete a QARecord Record
            this.deleteQACheck = function (checkId) {
               // alert("here "+checkId);
                urlBase = '/api/R_QAChecks';
                var request = $http({
                    method: "delete",
                    url: urlBase + "/" + checkId
                });
                return request;
            }
        }
    ]);
})();