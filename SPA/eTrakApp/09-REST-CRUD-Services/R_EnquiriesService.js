(function () {
    'use strict';

    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.service('R_EnquiriesService', [
        '$http', function ($http) {
            //alert('At R_EnquiriesService');

            var urlBase = '/api/R_Enquiries';


            //Create new record
            this.createEnquiry = function (enquiryRecord) {
                var urlBaseNew = '/api/R_Enquiries';
                var request = $http({
                    method: "post",
                    url: urlBaseNew,
                    data: enquiryRecord
                });
                return request;
            }

            //Calculate nights
            this.CalculateNights = function (enquiryRecord) {
                var urlBaseNew = '/Enquiries/CalculateNights';
                var request = $http({
                    method: "post",
                    url: urlBaseNew,
                    data: enquiryRecord
                });
                return request;
            }

            //Calculate Arrival - Departure
            this.CalculateArrivalAndDepartureDates = function (enquiryRecord) {
                var urlBaseNew = '/Enquiries/CalculateArrivalAndDepartureDates';
                var request = $http({
                    method: "post",
                    url: urlBaseNew,
                    data: enquiryRecord
                });
                return request;
            }

            //Add Guests
            this.AddGuests = function (enqRef, otherGuests) {
                console.log(otherGuests);
                var urlBaseNew = '/api/R_Enquiries?enqRef=' + enqRef;
                var request = $http({
                    method: "post",
                    url: urlBaseNew,
                    data: otherGuests
                });
                return request;
            }

            //Get Single Enquiry
            this.getEnquiry = function (enCode) {
                return $http.get(urlBase + "/" + enCode);
            }

            //Get Reduced Url for Email Tags
            this.getReducedUrl = function (strTemplate, templateFullUrl) {
                var fullUrl = {
                    StrTemplate: strTemplate,
                    OriginalUrl: templateFullUrl
                }
                return $http({
                    method: "POST",
                    url: '/Enquiries/GetReducedUrl/',
                    data: fullUrl,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            };


            //Get Whole Enquiry
            this.getAllEnquiryDetails = function (enCode) {                
                return $http.get('/Enquiries/GetEnquiryDetails?enCode=' + enCode);
            }

            //Get Other Guests By Enquiry
            this.GetOtherGuests = function (enCode) {
                return $http.get('/api/R_Enquiries?temp=0&enCode=' + enCode);
            }

            //Get Status Reason
            this.ShowStatusReason = function (enCode) {
                return $http.get('/Enquiries/ShowStatusReason?enCode=' + enCode);
            }

            //Save Availability Reason
            this.saveAvailabilityReason = function (enCode, propertyId, reasonId) {
                return $http.get('/Enquiries/SaveAvailabilityReason?enCode=' + enCode + "&propertyId=" + propertyId + "&reasonId=" + reasonId);
            }

            //Get Properties With Availability Reasons
            this.getAvailabilityReasons = function (enCode) {
                return $http.get('/Enquiries/GetAvailabilityReasons?enCode=' + enCode);
            }

            // Get the Unique Code for finding out what the new enCode value is

            this.getEnquiryBasedOnUniqueGuid = function (uniqueGuidValue) {
                var paramValue = "enDuplicateCheckKey = '" + uniqueGuidValue + "' ";

                var urlBaseUnique = '/api/R_Enquiries?paramValue=' + encodeURIComponent(paramValue);

                return $http.get(urlBaseUnique);
            }

            //Get All Enquiries
            this.getEnquiries = function () {
                return $http.get(urlBase);
            }


            //Update the Enquiry Record
            this.saveChanges = function (enCode, enquiry) {
                //alert(urlBase + "/" + enCode);
                console.log(enquiry.enEDDateLastActioned);
                console.log(enquiry.enEDDateNextAction);
                console.log("This is the enquiry blob:");
                console.log(enquiry);
                var request = $http({
                    method: "put",
                    url: urlBase + "/" + enCode,
                    data: enquiry
                });

                return request;
            }

            //Send Notification For Manual Enquiry
            this.SendNotificationEmailForManualEnquiry = function (enCode, userCode) {
                console.log(userCode);
                var request = $http({
                    method: "post",
                    url: 'Enquiries/SendNotificationEmailForManualEnquiry?enCode=' + enCode + '&userCode=' + userCode
                });
                return request;
            }

            //Delete the OtherGuests Record
            this.RemoveGuests = function (enqRef) {
                var request = $http({
                    method: "delete",
                    url: '/api/R_Enquiries?temp=0&enqRef=' + enqRef
                });
                return request;
            }

            //Delete Image Uploaded
            this.DeleteImage = function (enqRefNo) {
                console.log(enqRefNo);
                var response = $http(
                   {
                       method: "post",
                       url: "/EnquiryFileUpload/DeleteImagePath?enqRefNo=" + enqRefNo,
                       contentType: "application/json;charset=utf-8"
                   });
                return response;
            }

            //Delete Image2 Uploaded
            this.DeleteImagePath = function (enqRefNo) {
                console.log(enqRefNo);
                var response = $http(
                   {
                       method: "post",
                       url: "/EnquiryFileUpload/DeleteImage?enqRefNo=" + enqRefNo,
                       contentType: "application/json;charset=utf-8"
                   });
                return response;
            }

            this.GetClientDetails = function (clientGroup) {
                return $http.get('/Enquiries/DisplayClientDetails?clientGroup=' + clientGroup);
            };

            //Edit Image
            this.EditImage = function (enqRefNo) {
                console.log(enqRefNo);
                return $http.get("/EnquiryFileUpload/EditImage?enqRefNo=" + enqRefNo);
            }

            //Edit Image2
            this.EditImagePath = function (enqRefNo) {
                console.log(enqRefNo);
                return $http.get("/EnquiryFileUpload/EditImagePath?enqRefNo=" + enqRefNo);
            }

            this.SourcesList = function (SourceCode) {
                return $http.get('/api/R_Enquiries?temp=0&SourceCode=' + SourceCode);
            }

            this.TrackingNewEnquiryCreation = function (user, enqRef) {
                return $http.get('Enquiries/TrackingNewEnquiryCreation?user=' + user + "&enqRef=" + enqRef);
            }

            this.TrackingVisitingTabs = function (user, enqRef, functionality) {
                return $http.get('Enquiries/TrackingVisitingTabs?user=' + user + "&enqRef=" + enqRef + "&functionality=" + functionality);
            }

            this.createTrackingRecordForAmendEnquiry = function (cneEnqRef, userCode) {
                return $http.get("/Enquiries/CreateTrackingRecordForAmendEnquiry?cneEnqRef=" + cneEnqRef + '&userCode=' + userCode);
            }

            this.createTrackingEntryWhenReopen = function (user, enqRef) {
                return $http.get("/Enquiries/CreateTrackingEntryWhenReopen?user=" + user + '&enqRef=' + enqRef);
            }

            this.trackingCopyToTraveller = function (user, enqRef) {
                return $http.get("/Enquiries/CreateTrackingEntryWhenCopyToTraveller?user=" + user + '&enqRef=' + enqRef);
            }

            this.trackingCopyToLeadGuest = function (user, enqRef) {
                return $http.get("/Enquiries/CreateTrackingEntryWhenCopyToLeadGuest?user=" + user + '&enqRef=' + enqRef);
            }

            this.trackingClearTraveller = function (user, enqRef) {
                return $http.get("/Enquiries/CreateTrackingEntryWhenClearTraveller?user=" + user + '&enqRef=' + enqRef);
            }

            this.trackingCancelSaveEnquiry = function (user, enqRef) {
                return $http.get("/Enquiries/CreateTrackingEntryWhenCancelSaveEnquiry?user=" + user + '&enqRef=' + enqRef);
            }

            //Save Enquiry details into fivewin database
            this.saveEnquiryDetails = function (enquiryDetails, propertyId) {
                console.log("enquiryDetails");
                console.log(enquiryDetails);
                var response = $http(
                    {
                        method: "post",
                        url: '/Enquiries/SaveEnquiryDetails?propertyId=' + propertyId,
                        data: enquiryDetails,
                        contentType: "application/json;charset=utf-8",
                        dataType: "json"
                    });
                return response;
            }

            this.dontSaveEnquiryDetails = function (enquiry) {
                var response = $http(
                    {
                        method: "post",
                        url: '/Enquiries/DontSaveEnquiryDetails',
                        data: enquiry,
                        contentType: "application/json;charset=utf-8",
                        dataType: "json"
                    });
                return response;
            }
        }
    ]);
})();