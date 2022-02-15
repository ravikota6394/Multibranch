(function () {
    'use strict';
    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.service('R_EmailTemplatesService', [
        '$http', function ($http) {

            var urlBase = '/api/V_EmailTemplates';

            // return all templates
            this.getEmailTemplates = function () {
                return $http.get(urlBase);
            }

            // return templates based on type
            this.getEmailTemplatesByTypeOfTemplate = function (enqref) {
                return $http.get('/Properties/GetTemplatesByTemplateType?enqref=' + enqref);
            }

            this.getBookingConfirmation = function (enqref) {
                return $http.get('/Properties/BookingConfirmation?enqref=' + enqref);
            }

            //Get Reduced Url for Email Tags
            this.replaceClientVariables = function (emailTemplate, enqRef) {
                var request = $http({
                    method: "POST",
                    url: '/Properties/ReplaceClientVariables',
                    data: { emailTemplate: emailTemplate.toString(), enqRef: enqRef },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                return request;
            };

            //Get Email Templates by Id
            this.getTemplatesBySource = function (enqref) {
                return $http.get('/Properties/GetTemplatesBySource?enqref=' + enqref);
            }

            //Get Book Now templates
            this.getListOfBookNowTemplates = function (enqRef) {
                return $http.get('/Properties/GetListOfBookNowTemplates?enqRef=' + enqRef);
            }

            //get replied templates
            this.getTemplatesForReply = function (enqRef) {
                return $http.get('/Properties/GetTemplatesForReply?enqRef=' + enqRef);
            }

            //Get Email Templates by type SecureBooking
            this.getTemplatesBySecureBookingFormTemplateType = function (enqRef) {
                console.log("getTemplatesBySecureBookingFormTemplateType");
                return $http.get('/Properties/GetTemplatesBySecureBookingFormTemplateType?enqRef=' + enqRef);
            }

            //Get Email Templates by type booknow
            this.getBookNowAcknowledgementTemplates = function (enqRef) {
                console.log("getBookNowAcknowledgementTemplates");
                return $http.get('/Properties/GetBookNowAcknowledgementTemplates?enqRef=' + enqRef);
            }

            
            //Get Email Templates by type confirmBooking
            this.getTemplatesByBookingconfirmationTemplateType = function (enqRef) {
                console.log("getTemplatesByBookingconfirmationTemplateType");
                return $http.get('/Properties/GetTemplatesByBookingconfirmationTemplateType?enqRef=' + enqRef);
            }

            //Get Email Templates by Id
            this.getTemplatesBySourceForCheckAvailability = function (enqRef) {
                return $http.get('/Properties/GetTemplatesBySourceForCheckAvailability?enqRef=' + enqRef);
            }

            //Get  get Templates File path
            this.getTemplatesFilepathbyTemplateId = function (templateId) {
                return $http.get('/Properties/GetTemplatesFilepathbyTemplateId?templateId=' + templateId);
            }

            //Get Email Templates Type by Id
            this.getTemplateTypeById = function (templateId) {
                return $http.get('/Properties/GetTemplateTypeById?templateId=' + templateId);
            }


            //Get a record
            this.getATemplate = function (templateID) {
                console.log("Import Template service" + templateID);
                var urlBaseGet1 = '/api/V_EmailTemplates/' + templateID;
                var request = $http({
                    method: "get",
                    url: urlBaseGet1
                });
                return request;

            };
            //Get Template with Replaced Generic Tags
            this.getGenericTemplate = function (template) {
                console.log("Import Template service" + template);
                var urlBaseGet1 = '/Enquiries/GenericTemplate';
                //var temp = JSON.stringify({ template: template })
               
                var request = $http({
                    method: 'POST',
                    url: urlBaseGet1,
                    dataType: 'json',
                    data: { template: template },
                    headers: { "Content-Type": "application/json" }
                    
                });
                return request;

            };

            this.getImagesByPropertyId = function (template, url) {

                var urlBaseGet1 = '/Enquiries/GenericTemplate';
                //var temp = JSON.stringify({ template: template })

                var request = $http({
                    method: 'POST',
                    url: url + "/api/UserAppApi/getPropertyImagesByPropertyId",
                    dataType: 'json',
                    data: template,
                    headers: { "Content-Type": "application/json" }

                });
                return request;

            };




            //Create email
            this.createEmail = function (emailRecord, userCode, priority, isLinkSent, templateType, parentMailAttachmentBlobPaths) {
                console.log(priority);
                console.log(userCode);
                console.log(emailRecord);
                var urlBaseCreate = '/api/R_EmailSends?userCode=' + userCode + '&&priority=' + priority + '&&isLinkSent=' + isLinkSent + '&&templateType=' + templateType;

                var request = $http({
                    method: "post",
                    url: urlBaseCreate,
                    data: {
                        "emailRecord": emailRecord, "parentMailAttachmentBlobPaths": parentMailAttachmentBlobPaths
                    }
                });
                return request;
            }

            this.createAutoAcknowledgementEmail = function (emailRecord, userCode) {
                console.log(emailRecord);
                var urlBaseCreate = '/EmailStatus/CreateAutoAcknowledgementEmail?userCode=' + userCode;
                var request = $http({
                    method: "post",
                    url: urlBaseCreate,
                    data: emailRecord
                });
                return request;
            }

            this.TrackingEmailSending = function (user, propertyName, templateType) {
                return $http.get('/Properties/TrackingEmailSending?user=' + user + "&propertyName=" + propertyName + "&templateType=" + templateType);
            }

        }
    ]);
})();