(function () {
    'use strict';

    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.service('R_PropertiesService', [
        '$http', function ($http) {
            var urlBase = '/api/R_Properties';            
           

            //Create new record
            this.createPropertyChoice = function (propertyRecord) {
                var urlBaseNew = '/api/R_Properties';
                var request = $http({
                    method: "post",
                    url: urlBaseNew,
                    data: propertyRecord
                });
                return request;
            }          


            //Get all Chosen Properties for an enquiry code - uses SQL controller
            this.getChosenProperties = function (enCode) {
                var paramValue = "prEnCode = " + enCode;
                var urlBaseUnique = '/api/R_Properties?paramValue=' + encodeURIComponent(paramValue);
                return $http.get(urlBaseUnique);
            }
            //Get all Properties for the proposals - uses SQL controller
            this.getProposalProperties = function (enCode, proposalType) {
                console.log('getProposalProperties');
                var paramValue = "prEnCode = " + enCode + " AND prCurrentProposal = "+ proposalType ;
                var urlBaseUnique = '/api/R_Properties?paramValue=' + encodeURIComponent(paramValue);

                return $http.get(urlBaseUnique);
            }
            //Update Offerfields in Properties Table 
            this.ShortlistedPropertiesDetails = function (offerFields) {            
                console.log('Save offer Details');
                   var response = $http(
                   {
                       method: "post",
                       url: '/api/R_Properties?id=dummy',
                       data: offerFields,
                       contentType: "application/json;charset=utf-8",
                       dataType: "json"
                   });
                return response;
            }

            //Get all Chosen Properties for an enquiry code - uses SQL controller
            this.getChosenPropertiesCurrentProposals = function (enCode, currentProposal) {
                var paramValue = "prEnCode = " + enCode + " and prCurrentProposal = " + currentProposal;

                var urlBaseUnique = '/api/R_Properties?paramValue=' + encodeURIComponent(paramValue);

                return $http.get(urlBaseUnique);
            }
            //Get a specific property using  property description
            this.getPropertyInformation = function (enEDSpecificApartment) {               
                var urlBaseGet2 = '/api/R_Properties?temp=0&enEDSpecificApartment=' + enEDSpecificApartment;
                var request = $http({
                    method: "get",
                    url: urlBaseGet2
                });
                return request;

            };

            //Get a Choosen property using  property description/property Id
            this.getChosenPropertyInformation = function (propertyDetails) {
                console.log('Get Choosen Property Information');
                var urlBaseGet2 = '/Properties/GetChosenPropertyInformation?propertyDetails=' + propertyDetails;
                var request = $http({
                    method: "get",
                    url: urlBaseGet2
                });
                return request;

            };

            //Save Property selected by specific apartment
            this.saveSpecificApartmentdetails = function (enqRef,propertyId) {
                console.log(enqRef +','+ propertyId);               
                var response = $http(
                {
                    method: "post",
                    url: '/Properties/AddSpecificApartment?enqRef=' + enqRef + '&propertyId=' + propertyId,                  
                    contentType: "application/json;charset=utf-8",
                    dataType: "json"
                });
                return response;
            }

            //Save shortlisted Properties Prices
            this.SavePrices = function (pricesList) {
                console.log(pricesList);
                var response = $http(
                {
                    method: "post",
                    url: '/Properties/SavePrices/',
                    data: pricesList,
                    contentType: "application/json;charset=utf-8",
                    dataType: "json"
                });
                return response;
            }

            //Get a specific property using recID 
            this.getAPropertyWithID = function (recID) {
                var urlBaseGet2 = '/api/R_Properties/' + recID;
                var request = $http({
                    method: "get",
                    url: urlBaseGet2
                });
                return request;

            };

            // get checkavailability datetimereceived
            this.checkAvailabilitiesNotYetResponded = function (enqRef) {
                return $http.get('/Properties/CheckAvailabilitiesNotYetResponded?enqRef=' + enqRef)
            }
            
            
            //Get a Chosen Property Code - uses SQL controller
            this.getaChosenProperty = function (enCode, propertyCode) {              
                var paramValue = "prEnCode = " + enCode + " and prPropertyCode = " + propertyCode;
                var urlBaseUnique = '/api/R_Properties?paramValue=' + encodeURIComponent(paramValue);
                return $http.get(urlBaseUnique);
            }

            // Update the Property Search Records
            this.savePropertySearchChanges = function (enCode, searchRecords) {
                //alert(urlBase + "/" + enCode);
                //alert("This is the enquiry blob"+ enquiry);
                // This will need a clever find / insert / delete
                var request = $http({
                    method: "put",
                    url: urlBase + "/" + enCode,
                    data: enquiry
                });

                return request;
            }

            // Update the Property Search Records
            this.savePropertyWithID = function (recID, propertyRecord) {
                console.log("ID=" + recID + "propertyrecord" + propertyRecord);
                //alert(urlBase + "/" + enCode);
                //alert("This is the enquiry blob"+ enquiry);
                // This will need a clever find / insert / delete
                var request = $http({
                    method: "put",
                    url: urlBase + "/" + recID,
                    data: propertyRecord
                });

                return request;
            }
            //Delete a PropertySearch Record
            this.deleteChosenPropertyId = function (propertyId) {
                var request = $http({
                    method: "delete",
                    url: urlBase + "/" + propertyId
                });
                return request;
            }

            this.createTrackingEntryForShortListedProperty = function (user, prName,prEncode) {
                return $http.get('/Properties/CreateTrackingEntryForShortListedProperty?user=' +user +'&prName=' +prName +'&prEncode=' +prEncode);
            }

            this.createTrackingEntryForDeletingProperty = function (user, prCode) {
                return $http.get('/Properties/CreateTrackingEntryForDeletingProperty?user=' + user + '&prCode=' + prCode);
            }

            this.createTrackingEntryForViewingProperty = function (user, prName) {
                return $http.get('/Properties/CreateTrackingEntryForViewingProperty?user=' + user + '&prName=' + prName);
            }

            this.TrackingSpecficApartment = function (user, enqRef, specificApartment) {
                return $http.get('/Properties/CreateTrackingEntryForSpecficApartment?user=' + user + '&enqRef=' + enqRef + '&specificApartment=' + specificApartment);
            }

            this.TrackingCheckAvailability = function (user, enqRef, propertyName) {
                return $http.get('/Properties/CreateTrackingEntryForCheckAvailability?user=' + user + '&enqRef=' + enqRef + '&propertyName=' + propertyName);
            }

            this.TrackingGenerateProposal = function (user, enqRef) {
                return $http.get('/Properties/CreateTrackingEntryForGenerateProposal?user=' + user + '&enqRef=' + enqRef);
            }

            this.TrackingBookNowAcknowledgement = function (user, enqRef) {
                return $http.get('/Properties/CreateTrackingEntryForBookNowAcknowledgement?user=' + user + '&enqRef=' + enqRef);
            }
            this.getCreditCardDetails = function (cardDetails) {
                console.log(cardDetails);
                var response = $http(
                    {
                        method: "post",
                        url: '/Booking/GetCreditCardDetails/',
                        data: cardDetails,
                        contentType: "application/json;charset=utf-8",
                        dataType: "json"
                    });
                return response;
            }
        }
    ]);
})();