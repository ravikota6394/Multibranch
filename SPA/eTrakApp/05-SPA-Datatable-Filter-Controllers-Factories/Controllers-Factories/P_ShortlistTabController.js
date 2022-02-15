(function () {
    'use strict';

    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.controller('P_ShortlistTab', ['$q', '$scope', '$rootScope', '$stateParams', '$timeout', '$filter', 'logger',
        'R_EnquiriesService',
        'R_PropertiesService',
        'R_EmailTemplatesService',
        'R_EnqSourcesService',
        'R_LanguageCodesService',
        'R_CitiesService',
        'R_CountriesService',
        'R_BudgetCategoriesService',
        'R_ApartmentTypesService',
        'R_ClientGroupsService',
        'R_DeadReasonsService',
        'R_UserTimeZonesService',
        controller]);

    function controller($q, $scope, $rootScope, $stateParams, $timeout, $filter, logger,
        enquiryDataService,
        chosenPropertiesFactory,
        emailTemplatesService,
        enqSourcesService,
        languageCodesService,
        citiesService,
        countriesService,
        budgetCategoriesService,
        apartmentTypesService,
        clientGroupsFactory,
        deadReasonsFactory,
        userTimeZonesFactory) {
        console.log(new Date());
        $rootScope.TemplatesPresent = "No";

        var cookieName = "EnCode";

        if ($rootScope.body != undefined) {
            if ($rootScope.body != "") {
                $rootScope.globalEmailBody = $rootScope.body;
                $(".ideMailOutput").code('<span style="font-family: Verdana;font-size: 14px;background-color: rgb(255, 255, 255);">' + $rootScope.body + '</scan>');
                $scope.$apply();
                $rootScope.globalEmailBody = "";
                $rootScope.body = "";
            }
        }
        var enqRef = $rootScope.globalEnCode;
        if (enqRef > "0") {
            $('#idglbCurrentEnquiryRef').val(enqRef);
            $scope.glbCurrentEnquiryRef = enqRef;
        } else {
            enqRef = document.getElementById('idglbCurrentEnquiryRef').value;
        }
        var cookie = getCookie(cookieName);

        console.log("The cookie is" + cookie);

        if (cookie != enqRef.toString() && $rootScope.APSProperties != null)
            $rootScope.APSProperties = [];

        document.cookie = cookieName + "=" + enqRef.toString();
        var userCode = document.getElementById("userCode").value;
        doBreadcrumbsShortlist();
        $rootScope.displayPV_CurrentEnquiry = false;

        getListOfTemplateNames();

        getListOfBookNowTemplates();

        getTemplatesBySecureBookingFormTemplateType();

        getBookNowAcknowledgementTemplates();

        getTemplatesBySourceForCheckAvailability();

        function doBreadcrumbsShortlist() {
            $rootScope.breadcrumbsValueGoTo = '> User Area > Enquiry # ' + enqRef;
            $rootScope.breadcrumbsValueAreHere = '> Shortlist';
            $rootScope.breadcrumbsValueUiSref = "detailsTab({enqRef: '" + $rootScope.glbCurrentEnquiryRef + "'})";
        }

        var commissionIncluded;
        $scope.saveCommissionIncluded = function (prCommissionIncluded, prPropertyId, property) {
            console.log(prCommissionIncluded);
            var dataAttributeQuery = 'data-commissionpropertyid="' + prPropertyId + '"';
            console.log(dataAttributeQuery);
            if (prCommissionIncluded == "Other") {
                console.log("property.showOtherField = " + property.showOtherField);
                property.showOtherField = true;
            }
            else {
                console.log("property.showOtherField = " + property.showOtherField);
                property.showOtherField = false;
                commissionIncluded = prCommissionIncluded;
            }
        }

        $scope.ValidateTaxRate = function (event) {
            console.log(event);
            if (event.which != 8 && event.which != 0 && (event.which < 48 || event.which > 57)) {
                $("#validate_TaxRate").html("Enter only digits").show().fadeOut(3000);
                return event.preventDefault();
            }
        }

        $scope.OnPropertyChange = function (apartmentType, prPropertyId, property) {
            console.log("Apartment type:" + apartmentType);
            var dataAttributeQuery = 'data-apartmentTypeid="' + prPropertyId + '"';
            console.log(dataAttributeQuery);
            console.log(apartmentType);
            if (apartmentType == "Other") {
                console.log("property.showApartmentOtherField = " + property.showApartmentOtherField);
                property.showApartmentOtherField = true;
            }
            else {
                console.log("property.showApartmentOtherField = " + property.showApartmentOtherField);
                property.showApartmentOtherField = false;
                $scope.SavePropertyDetails(property);
            }
        }

        //Google Analytics 
        ga('send', 'event', 'Shortlist Tab', 'Entered The Shortlist Tab', 'by ' + userCode + ' in enquiry number ' + enqRef);

        function getListOfTemplateNames() {
            emailTemplatesService.getTemplatesBySource(enqRef)
                .success(function (templates) {
                    $scope.templatesList = angular.fromJson(templates);
                    console.log($scope.templatesList);
                });
        }

        function getListOfBookNowTemplates() {
            emailTemplatesService.getListOfBookNowTemplates(enqRef)
                .success(function (bookNowTemplateTypeTemplates) {
                    $scope.bookNowTemplateTypeTemplates = angular.fromJson(bookNowTemplateTypeTemplates);
                    console.log($scope.bookNowTemplateTypeTemplates);
                });
        }

        $scope.includeFooterSignature = true;

        $scope.showhidedropdown = false;
        $scope.showhideBookNowdropdown = false;
        $scope.showhideCurrency = false;
        $scope.validationForBookNow = true;

        $scope.showHideDropDown = function (secureBookingStatus) {
            console.log("secureBookingStatus: " + secureBookingStatus);
            if (secureBookingStatus) {
                $scope.showhidedropdown = true;
                $scope.showhideBookNowdropdown = false;
                $scope.showhideCurrency = true;
                $scope.payNowStatus = false;
                $scope.bookNowStatus = false;
                $scope.validationForBookNow = true;
            }
        }


        $scope.HideSecureBookingDropdown = function (payNowStatus) {
            console.log("payNowStatus: " + payNowStatus);
            if (payNowStatus) {
                $scope.showhidedropdown = false;
                $scope.showhideBookNowdropdown = false;
                $scope.showhideCurrency = true;
                $scope.secureBookingStatus = false;
                $scope.bookNowStatus = false;
                $scope.validationForBookNow = true;
            }
        }

        $scope.showHideAcknowledgementDropDown = function (bookNowStatus) {
            console.log("bookNowStatus: " + bookNowStatus);
            if (bookNowStatus) {
                $scope.includeFooterSignatureForBookNow = true;
                $scope.showhidedropdown = false;
                $scope.showhideBookNowdropdown = true;
                $scope.showhideCurrency = true;
                $scope.secureBookingStatus = false;
                $scope.payNowStatus = false;
                $scope.validationForBookNow = true;
            }
        }

        function getTemplatesBySecureBookingFormTemplateType() {
            console.log("getTemplatesBySecureBookingFormTemplateType");
            emailTemplatesService.getTemplatesBySecureBookingFormTemplateType(enqRef)
                .success(function (templates) {
                    $scope.secureBookingTypeTemplates = angular.fromJson(templates);
                    console.log($scope.secureBookingTypeTemplates);
                });
        }

        function getBookNowAcknowledgementTemplates() {
            console.log("getBookNowAcknowledgementTemplates");
            emailTemplatesService.getBookNowAcknowledgementTemplates(enqRef)
                .success(function (templates) {
                    $scope.bookNowTemplateTypes = angular.fromJson(templates);
                    console.log($scope.bookNowTemplateTypes);
                });
        }

        function getTemplatesBySourceForCheckAvailability() {
            emailTemplatesService.getTemplatesBySourceForCheckAvailability(enqRef)
                .success(function (templates) {
                    $scope.checkAvailabilityTypeTemplates = angular.fromJson(templates);
                    console.log($scope.checkAvailabilityTypeTemplates);
                });
        }

        $rootScope.GetTemplateId = function (templateValue) {
            console.log(templateValue);
            var template = [];
            templateValue = templateValue.split('-');
            template.push(templateValue.shift().trim());
            template.push(templateValue.join('-').trim());
            console.log(template);
            $rootScope.templateId = template[0];
            console.log($rootScope.templateId);
            $rootScope.generateProposalTemplateSubject = template[1];
            console.log($rootScope.generateProposalTemplateSubject);

            emailTemplatesService.getTemplateTypeById($rootScope.templateId)
                .success(function (templateType) {
                    $rootScope.templateType = angular.fromJson(templateType);
                    $rootScope.templateTypeCopy = $rootScope.templateType;
                    console.log($rootScope.templateType);
                    if ($rootScope.templateType == null) {
                        $rootScope.templateType = "";
                    }
                });
            console.log($rootScope.templateId);
        }

        $scope.SelectedTemplateType = function (templateValue) {
            console.log(templateValue);
            var template = [];
            templateValue = templateValue.split('-');
            template.push(templateValue.shift().trim());
            template.push(templateValue.join('-').trim());
            console.log(template);
            $rootScope.selectedTemplateID = template[0];
            console.log($rootScope.selectedTemplateID);
            $rootScope.bookNowTemplateSubject = template[1];
            console.log($rootScope.bookNowTemplateSubject);

            console.log("selectedTemplateID: " + $rootScope.selectedTemplateID);
            emailTemplatesService.getTemplateTypeById($rootScope.selectedTemplateID)
                .success(function (templateType) {
                    $rootScope.IsBookNowTemplateType = MakeEmptyStringWhenNull(angular.fromJson(templateType));
                    console.log("IsBookNowTemplateType: " + $rootScope.IsBookNowTemplateType);
                    $rootScope.bookNowTemplateTypeCopy = $rootScope.IsBookNowTemplateType;
                });
        }

        $scope.SavePropertyDetails =
            function (property) {
                console.log('Save properties');

                var prCommissionIncluded = property.CommissionIncluded;
                if (prCommissionIncluded == undefined || prCommissionIncluded == " " || prCommissionIncluded == "Other") {
                    prCommissionIncluded = property.prCommissionIncludedInRate;
                }
                var prApartmentType = property.prApartmentType;
                if (prApartmentType == undefined || prApartmentType == " " || prApartmentType == "Other") {
                    prApartmentType = property.prApartmentTypeWhenOther;
                }
                var offerFields = {
                    ID: property.ID,
                    prOfferDetails: property.prOfferDetails,
                    prCancellationPolicy: property.prCancellationPolicy,
                    prTaxIncluded: property.prTaxIncluded,
                    prTaxRate: property.prTaxRate,
                    prHeldUntilDay: property.prHeldUntilDay,
                    prHeldUntilMonth: property.prHeldUntilMonth,
                    prHeldUntilYear: property.prHeldUntilYear,
                    prHeldUntilTime: property.prHeldUntilTime,
                    prHeldUntilUTC: property.prHeldUntilUTC,
                    prApartmentType: prApartmentType,
                    prRatePerNight: property.prRatePerNight,
                    prTaxNotes: property.prTaxNotes,
                    prTaxAppliedAllNights: property.prTaxAppliedAllNights,
                    prCommissionIncluded: prCommissionIncluded,
                    prHolderName: property.prHolderName,
                    prInternalReference: property.prInternalReference,
                    prTelephoneNumber: property.prTelephoneNumber,
                    prPrivateNotes: property.prPrivateNotes,
                    userCode: userCode,
                    prNotes: property.prNotes,
                    prDepositPolicy: property.prDepositPolicy,
                    prEarlyTerminationPolicy: property.prEarlyTerminationPolicy,
                    prSecurityDeposit: property.prSecurityDeposit,
                    prParking: property.prParking,
                    prPaymentTerms: property.prPaymentTerms,
                    prTomsTaxIncluded: property.prTomsTaxIncluded,
                    prKeyServices: property.prKeyServices,
                    prImportantPoints: property.prImportantPoints
                }
                console.log(offerFields);
                chosenPropertiesFactory.ShortlistedPropertiesDetails(offerFields)
                    .success(function (shortlistedProperties) {
                        //Google Analytics
                        ga('send', 'event', 'Shortlists Tab', 'Saved Offer Details', 'for PropertyId: ' + property.prPropertyCode + ' in enquiry ' + enqRef + ' by ' + userCode);
                        logger.info('Your offer have been saved successfully');
                    });
            }


        $scope.SaveSelectedProperties = function () {
            $rootScope.typeOfTemplate = "Generate Proposal";
            console.log("save selected properties");
            var prPropertyIdsList = [];
            $("input:text[name=propertyId]")
                .each(function () {
                    prPropertyIdsList.push($(this).val());
                });
            console.log(prPropertyIdsList);
            $scope.prPriceList = [];
            var i = 0;
            $("input:text[name=price]")
                .each(function () {
                    $scope.prPriceList.push({ prPropertyCode: prPropertyIdsList[i], prPrice: $(this).val() });
                    i++;
                });
            console.log($scope.prPriceList);
            chosenPropertiesFactory.SavePrices($scope.prPriceList);
            var selectedProperties = [];
            $.each($("input[name='shortlistedProperty']:checked"), function () {
                selectedProperties.push($(this).val());
            });
            $rootScope.selectedProperties = selectedProperties;
            console.log($rootScope.selectedProperties);
            console.log("Selected Properties are: " + selectedProperties.join(", "));
            console.log("$scope.secureBookingStatus: " + $scope.secureBookingStatus);
            console.log("$scope.payNowStatus: " + $scope.payNowStatus);
            console.log("$scope.bookNowStatus: " + $scope.bookNowStatus);
            if (MakeEmptyStringWhenNull($rootScope.selectedProperties) == "" || MakeEmptyStringWhenNull($scope.selectedTemplateValue) == "") {
                document.getElementById("id-validateProposalTemplate").style.display = 'block';
                document.getElementById("id-validateProposalTemplate").textContent = "Please select the properties along with template to display";
            }
            else {
                if ($scope.secureBookingStatus == "true" || $scope.payNowStatus == "true" || $scope.bookNowStatus == "true") {
                    if ($scope.secureBookingStatus == "true" && MakeEmptyStringWhenNull($scope.selectedtemplate) == "") {
                        document.getElementById("id-validateSecureBookingTemplate").style.display = 'block';
                        document.getElementById("id-validateSecureBookingTemplate").textContent = "Please select any of the option from secure booking form ";
                    }
                    else if ($scope.bookNowStatus == "true" && MakeEmptyStringWhenNull($scope.bookNowtemplate) == "") {
                        document.getElementById("id-validateBookNowTemplate").style.display = 'block';
                        document.getElementById("id-validateBookNowTemplate").textContent = "Please select any of the option from acknowledgement ";
                    }
                    else {
                        $('#idShortlistedProperties').modal('hide');
                        console.log($rootScope.APSProperties);
                        var landlordsEmailAddress = $("#emailaddress").val();
                        $rootScope.ETEmailFrom = "etrak@apartmentservice.com";
                        $rootScope.isResteamShortlist = $("#IsResteamInShortlist").val();
                        console.log($rootScope.generateProposalTemplateSubject);
                        $rootScope.ETEmailSubject = $rootScope.generateProposalTemplateSubject;
                        if (MakeEmptyStringWhenNull($rootScope.generateProposalTemplateSubject) != "") {
                            $rootScope.ETEmailSubject = $rootScope.generateProposalTemplateSubject.replace(/\#\#EnquiryRef\#\#/gi, $scope.glbCurrentEnquiryRef);
                        }
                        //$rootScope.ETEmailSubject = "Your list of recommended properties";
                        console.log($rootScope.ETEmailSubject);
                        $scope.DTEnquiry.enLastEmailSentTo = landlordsEmailAddress;
                        $rootScope.globalLandlordsEmailAddress = landlordsEmailAddress;
                        //$scope.DTEnquiry.enLastTemplateChosen = 2008;
                        $('#idCheckAvailability').modal('show');

                        etImportTemplate($rootScope.selectedTemplateID);
                        console.log($rootScope.templateId);
                        etImportTemplate($rootScope.templateId);
                        etImportTemplateSubject($rootScope.ETEmailSubject);
                    }
                }
                else {
                    $scope.validationForBookNow = false;
                }
            }

        }

        $("#id_acknowledgementTemplates").click(function () {
            document.getElementById("id-validateBookNowTemplate").style.display = 'none';
        });

        $("#id_secureBookingTemplates").click(function () {
            document.getElementById("id-validateSecureBookingTemplate").style.display = 'none';
        });

        $("#proposalTemplates-List").click(function () {
            document.getElementById("id-validateProposalTemplate").style.display = 'none';
        });

        $("#bookNowTemplates-List").click(function () {
            document.getElementById("id-validateBookNow").style.display = 'none';
        });

        $("#id_secureBookingTemplatesForBookNow").click(function () {
            document.getElementById("id-validateSecureBookingTemplateForBookNow").style.display = 'none';
        });

        $("#idCheckAvailability").on("hidden.bs.modal", function () {
            console.log("Is Link Sent? : " + $rootScope.linkSent);
            $rootScope.linkSent = false;
        });

        $scope.DisplaySelectedProperties = function () {
            $rootScope.linkSent = true;
            $rootScope.typeOfTemplate = "Book Now";
            console.log("display selected properties of Book Now");
            var propertyIdsList = [];
            $("input:text[name=propertyId_BookNow]")
                .each(function () {
                    propertyIdsList.push($(this).val());
                });
            console.log(propertyIdsList);
            var selectedProperties = [];
            $.each($("input[name='bookNowShortlistedProperty']:checked"), function () {
                selectedProperties.push($(this).val());
            });
            $rootScope.shortlistedProperties = selectedProperties;
            console.log("Selected Properties are: " + selectedProperties.join(", "));
            if (MakeEmptyStringWhenNull($rootScope.shortlistedProperties) == "" || MakeEmptyStringWhenNull($scope.selectedBookNowTemplateValue) == "") {
                document.getElementById("id-validateBookNow").style.display = 'block';
                document.getElementById("id-validateBookNow").textContent = "Please select the properties along with templates to display";
            }
            else if ($scope.secureBookingStatus == true && MakeEmptyStringWhenNull($scope.selectedtemplate) == "") {
                document.getElementById("id-validateSecureBookingTemplateForBookNow").style.display = 'block';
                document.getElementById("id-validateSecureBookingTemplateForBookNow").textContent = "Please select any of the option from secure booking form";
            }
            else {
                $('#id_BookNowAcknowledgement').modal('hide');
                console.log($rootScope.APSProperties);
                var landlordsEmailAddress = $("#emailaddress").val();
                $rootScope.ETEmailFrom = "etrak@apartmentservice.com";
                $rootScope.isResteamShortlist = $("#IsResteamInShortlist").val();
                $rootScope.ETEmailSubject = $rootScope.bookNowTemplateSubject;
                if (MakeEmptyStringWhenNull($rootScope.bookNowTemplateSubject) != "") {
                    $rootScope.ETEmailSubject = $rootScope.bookNowTemplateSubject.replace(/\#\#EnquiryRef\#\#/gi, $scope.glbCurrentEnquiryRef);
                }
                //$rootScope.ETEmailSubject = "Your list of recommended properties";
                console.log($rootScope.ETEmailSubject);
                $scope.DTEnquiry.enLastEmailSentTo = landlordsEmailAddress;
                $rootScope.globalLandlordsEmailAddress = landlordsEmailAddress;
                $('#idCheckAvailability').modal('show');
                console.log($rootScope.selectedTemplateID);
                etImportTemplateSubject($rootScope.ETEmailSubject);
                etImportTemplate($rootScope.selectedTemplateID);

            }
        }


        function getAPSProperties() {
            console.log('Shortlisted properties');
            chosenPropertiesFactory.getProposalProperties(enqRef, 1)
                .success(function (chosenProperties) {
                    $rootScope.APSProperties = chosenProperties;
                    console.log($rootScope.APSProperties);

                    $rootScope.prImages = [];
                    $rootScope.imageValues = [];
                    $rootScope.prReferencePoints = [];
                    for (var i = 0; i < ($rootScope.APSProperties).length; i++) {
                        let prPropertyCode = chosenProperties[i].prPropertyCode;
                        let template = {
                            "PropertyId": prPropertyCode,
                            "UserId": 0,
                            "UserGroupId": 4, "UserGroupLabel": "TAS", "IsForHeatmap": false
                        }
                        emailTemplatesService.getImagesByPropertyId(template, $rootScope.NewTasAPIUrl).then((response) => {
                            if (response && response.data) {
                                let imageValues = { id: prPropertyCode, image: response.data.prImages, referencePoints: response.data.prReferencePoints };
                                let isPropertyExists = $rootScope.imageValues.filter((x) => x.id == prPropertyCode);
                                if (!isPropertyExists || isPropertyExists.length == 0) {
                                    $rootScope.imageValues.push(imageValues);
                                }
                            }
                        });
                        var prHasLandLordUpdated = chosenProperties[i].prHasLandLordUpdated;
                        var prRatePerNightUpdated = chosenProperties[i].prRatePerNightUpdated;
                        //chosenProperties[i].prHeldUntilDate = $filter('date')(chosenProperties[i].prHeldUntilDate, 'dd-MMM-yyyy HH:mm');
                        chosenProperties[i].showGreenTickForOfferNote = ((prHasLandLordUpdated) && (!(chosenProperties[i].prOfferNoteUpdated)));
                        chosenProperties[i].showGreenTickForCancellationPolicy = ((prHasLandLordUpdated) && (!(chosenProperties[i].prCancellationPolicyUpdated)));
                        chosenProperties[i].showGreenTickForRatePerNight = ((prHasLandLordUpdated) && (!(chosenProperties[i].prRatePerNightUpdated)));
                        chosenProperties[i].showGreenTickForTaxIncluded = ((prHasLandLordUpdated) && (!(chosenProperties[i].prTaxUpdated)));
                        //chosenProperties[i].showGreenTickForTomsTaxIncluded = ((prHasLandLordUpdated) && (!(chosenProperties[i].prTomsTaxUpdated)));
                        chosenProperties[i].showGreenTickForTaxRate = ((prHasLandLordUpdated) && (!(chosenProperties[i].prTaxRateUpdated)));
                        chosenProperties[i].showGreenTickForHeldUntil = ((prHasLandLordUpdated) && (!(chosenProperties[i].prHeldUntilUpdated)));
                        chosenProperties[i].showGreenTickForApartmentType = ((prHasLandLordUpdated) && (!(chosenProperties[i].prApartmentTypeUpdated)));
                        chosenProperties[i].showGreenTickForName = ((prHasLandLordUpdated) && (!(chosenProperties[i].prNameUpdated)));
                        chosenProperties[i].showGreenTickForTaxNotes = ((prHasLandLordUpdated) && (!(chosenProperties[i].prTaxNotesUpdated)));
                        chosenProperties[i].showGreenTickForTaxApplied = ((prHasLandLordUpdated) && (!(chosenProperties[i].prTaxAppliedUpdated)));
                        chosenProperties[i].showGreenTickForReference = ((prHasLandLordUpdated) && (!(chosenProperties[i].prReferenceUpdated)));
                        chosenProperties[i].showGreenTickForCommissionIncluded = ((prHasLandLordUpdated) && (!(chosenProperties[i].prCommissionIncludedUpdated)));
                        chosenProperties[i].showGreenTickForTelephone = ((prHasLandLordUpdated) && (!(chosenProperties[i].prTelephoneUpdated)));
                        console.log(chosenProperties[i].showGreenTickForRatePerNight);
                        if (chosenProperties[i].prApartmentTypeWhenOther != null) {
                            chosenProperties[i].prApartmentType = "Other";
                            chosenProperties[i].showApartmentOtherField = true;
                        }
                        else {
                            chosenProperties[i].showApartmentOtherField = false;
                        }
                        var prCommissionIncluded = chosenProperties[i].prCommissionIncluded;
                        console.log("commission=" + prCommissionIncluded + "Id=" + chosenProperties[i].ID);
                        var dataAttributeQuery = 'data-commissionpropertyid="' + chosenProperties[i].ID + '"';
                        if (prCommissionIncluded == "10%" || prCommissionIncluded == "15%" || prCommissionIncluded == "20%" || prCommissionIncluded == "Remote 5%") {
                            console.log("when commissions are equal");
                            chosenProperties[i].showOtherField = false;
                            console.log('attribute set to display none');
                            chosenProperties[i].CommissionIncluded = prCommissionIncluded;
                        }
                        else if (prCommissionIncluded == null) {
                            console.log("When Commisions are null");
                            chosenProperties[i].showOtherField = false;
                            console.log('attribute set to display none');
                            chosenProperties[i].CommissionIncluded = "Please select";
                        }
                        else {
                            console.log("when commissions are not equal");
                            var commissionIncluded = prCommissionIncluded;
                            console.log(commissionIncluded);
                            chosenProperties[i].CommissionIncluded = "Other";
                            console.log('display');
                            chosenProperties[i].showOtherField = true;
                            console.log('attribute set to display block');
                            chosenProperties[i].prCommissionIncludedInRate = commissionIncluded;
                            console.log(chosenProperties[i].prCommissionIncludedInRate);
                        }
                    }
                    $scope.$apply();
                });

        }

        function getCookie(cookieName) {
            var cookies = document.cookie.split("; ");
            var res = "";
            if (cookies != null) {
                for (var i = 0; i < cookies.length; i++) {
                    console.log(cookies[i]);
                    if (cookies[i].indexOf(cookieName + "=") === 0) {
                        var text = cookies[i].toString();
                        res = text.substring(text.indexOf("=") + 1, text.length);
                        break;
                    }
                }
            }
            return res;
        }

        getAPSProperties();

        $scope.displayPropertyInfo = function (popUpHTMLURL, propertyName, prID) {
            console.log(popUpHTMLURL);
            popUpHTMLURL = $rootScope.NewTasUrl + "#/property?id=" + prID;
            var myWindow = window.open(popUpHTMLURL, propertyName, "scrollbars=1,width=1000, height=1000");
            apartmentTypesService.createViewPropertyTrackingEntry(userCode, propertyName);
        }

        getApartmentTypes();
        function getApartmentTypes() {
            apartmentTypesService.getApartmentTypes()
                .success(function (apartmentTypes) {
                    $scope.ApartmentTypes = apartmentTypes;
                });
        }

        $scope.BindEmailSendToTextBox = function (contact) {
            $scope.DTEnquiry.enLastEmailSentTo = contact.Email;
            console.log($scope.DTEnquiry.enLastEmailSentTo);
            $rootScope.contactPersonName = contact.Name;
            console.log("BindEmailSendToTextBox" + $rootScope.contactPersonName);
            getTemplatesBySourceForCheckAvailability();
        }

        $('#id_getOldNewValues').on('focusin', function () {
            console.log("Saving value " + $(this).val());
            $(this).data('val', $(this).val());
        });

        $('#id_getOldNewValues').on('keyup', function () {
            delay(function () {
                console.log('delay func called');
                var previousToAddress = $('#id_getOldNewValues').data('val');
                var newToAddress = $('#id_getOldNewValues').val();
                console.log("Prev value " + previousToAddress);
                console.log("New value " + newToAddress);
                if (previousToAddress != newToAddress) {
                    $rootScope.contactPersonName = "Partner";
                    getTemplatesBySourceForCheckAvailability();
                }
            }, 1000);
        });

        var delay = (function () {
            var timer = 80;
            return function (callback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callback, ms);
            };
        })();

        $scope.BindEmailCCToTextBox = function (contact) {
            $scope.DTEnquiry.enLastEmailCCTo = contact.Email;
            console.log($scope.DTEnquiry.enLastEmailCCTo);
        }

        $scope.checkAvailability = function () {
            var property = $scope.checkAvailabilityProperty;
            var contacts = $scope.checkAvailabilityContactType;
            $scope.includeFooterSignature = true;
            $rootScope.typeOfTemplate = "Check Availability";
            console.log(property.prPriority);
            console.log('Check availability');
            console.log(contacts);
            $scope.DTEnquiry.enLastEmailCCTo = "";
            $rootScope.ContactsList = contacts;
            $scope.hideEmailSentToCheckAvailability = false;
            $scope.hideEmailSentToGenerateProposal = true;
            console.log($rootScope.ContactsList);
            console.log(property.prName);
            console.log(property.prPropertyCode);
            var landlordsEmailAddress = "";
            var landlordsName = "";
            var searchFor = 'Reservations';
            if (MakeEmptyStringWhenNull(contacts) != "") {
                for (var i = 0; i < contacts.length; i++) {
                    if (contacts[i].Type == searchFor) {
                        landlordsEmailAddress = contacts[i].Email;
                        landlordsName = contacts[i].Name;
                    }
                }
            }
            $scope.DTEnquiry.enLastEmailSentTo = landlordsEmailAddress;
            $rootScope.globalLandlordsEmailAddress = landlordsEmailAddress;
            $rootScope.globalLandlordsName = landlordsName;
            console.log("globalLandlordsName" + $rootScope.globalLandlordsName);
            $rootScope.contactPersonName = $rootScope.globalLandlordsName;
            console.log("contactPersonName in check avilability: " + $rootScope.contactPersonName);
            $rootScope.apartmentType = property.prApartmentType;
            if ($rootScope.apartmentType == "Other") {
                $rootScope.apartmentType = property.prApartmentTypeWhenOther;
            }
            $rootScope.propertyDetails = property;
            $rootScope.propertyDescription = property.prLongDescription;
            $rootScope.priorityStatus = property.prPriority;
            $rootScope.globalPropertyID = property.prPropertyCode;
            $rootScope.globalPropertyName = property.prName;
            $rootScope.ETEmailFrom = "eTrackTesttest@Apartment.co.uk";
            $rootScope.isResteamShortlist = $("#IsResteamInShortlist").val();
            $scope.templateID = $rootScope.selectedTemplateID;
            $rootScope.templateIdForApartmentVerification = $scope.templateID;
            $rootScope.ETEmailSubject = $rootScope.bookNowTemplateSubject;
            // $rootScope.propertyFullAddress = $.grep([property.prAddress1, property.prAddress2, property.prCity, property.prCountry], Boolean).join(", ");
            console.log($rootScope.propertyFullAddress);
            //getTemplatesBySourceForCheckAvailability();
            chosenPropertiesFactory.TrackingCheckAvailability(userCode, enqRef, $rootScope.globalPropertyName);
            $('#id_CheckAvailability').modal('hide');
            $('#idCheckAvailability').modal('show');
            etImportTemplateSubject($rootScope.ETEmailSubject);
            etImportTemplate($scope.templateID);
        }

        $scope.checkAvailabilityTypes = function (contactTypes, propertyDetails) {
            console.log(propertyDetails);
            $scope.checkAvailabilityProperty = propertyDetails;
            $scope.checkAvailabilityContactType = contactTypes;
            $scope.selectedPropertyName = propertyDetails.prName;
            $('#id_CheckAvailability').modal('show');
        }

        $scope.GenerateProposal = function () {
            $scope.includeFooterSignature = true;
            $scope.DTEnquiry.enLastEmailCCTo = "";
            $scope.hideEmailSentToCheckAvailability = true;
            $scope.hideEmailSentToGenerateProposal = false;
            $rootScope.templateType = $rootScope.templateTypeCopy;
            console.log($rootScope.templateType);
            $('#idShortlistedProperties').modal('show');
            chosenPropertiesFactory.TrackingGenerateProposal(userCode, enqRef);
        }

        $scope.BookNowAcknowledgement = function () {
            $scope.includeFooterSignature = true;
            $scope.DTEnquiry.enLastEmailCCTo = "";
            $scope.hideEmailSentToCheckAvailability = true;
            $scope.hideEmailSentToGenerateProposal = false;
            $rootScope.IsBookNowTemplateType = $rootScope.bookNowTemplateTypeCopy;
            console.log($rootScope.IsBookNowTemplateType);
            $('#id_BookNowAcknowledgement').modal('show');
            chosenPropertiesFactory.TrackingBookNowAcknowledgement(userCode, enqRef);
        }

        function MakeEmptyStringWhenNull(value) {
            if (value == null) {
                value = "";
            }
            if (value == " Please select") {
                value = "";
            }
            else if (value == "undefined") {
                value = "";
            }
            else if (value == undefined) {
                value = "";
            }
            else {
                value = value;
            }
            return value;
        }

        function MakeZeroWhenNull(value) {
            if (value == null) {
                value = 0;
            }
            else if (value == "undefined") {
                value = 0;
            }
            else if (value == undefined) {
                value = 0;
            }
            else if (value == "") {
                value = 0;
            }
            else {
                value = value;
            }
            return value;
        }

        $scope.CheckAvailabilitiesNotYetResponded = function () {

            chosenPropertiesFactory.checkAvailabilitiesNotYetResponded(enqRef)
                .success(function (checkAvailabilities) {
                    $rootScope.checkAvailabilitiesNotYetResponded = checkAvailabilities;
                    console.log("Check Availability");
                    console.log($rootScope.checkAvailabilitiesNotYetResponded);

                    $("#checkAvailabilitiesNotYetResponded").modal("show");
                });
        }

        // Change proposal type
        var changeProposalType = function (recID, proposalStatus) {
            //alert("here " + recID+" "+proposalStatus);
            var timeout = setTimeout(function () {
                // Get the EnquiryFilter
                chosenPropertiesFactory.getAPropertyWithID(recID)
                    .success(function (copyProperty) {
                        //alert("Found property " + copyProperty.ID);
                        copyProperty.prCurrentProposal = proposalStatus;
                        console.log(copyProperty);
                        var timeout1 = setTimeout(function () {
                            chosenPropertiesFactory.savePropertyWithID(recID, copyProperty)
                                .success(function () {
                                    getAPSProperties();
                                    getRPSProperties();
                                })
                                .catch(function () {
                                    // logger.error('Failed to create new Enquiry Filter');
                                });
                        }, 50);
                    })
                    .catch(function () {
                    });
            }, 50);
        }

        $scope.removeFromProposal = function (recID) {
            logger.info('Removal');
            changeProposalType(recID, 0);
        };
        $scope.addToProposal = function (recID) {
            logger.info('Add to');
            changeProposalType(recID, 1);
        }

        function getRPSProperties() {
            console.log('Entering into Removed Properties');
            chosenPropertiesFactory.getProposalProperties(enqRef, 0)
                .success(function (chosenProperties) {
                    // alert("found Properties " + chosenProperties.length);
                    $scope.RPSProperties = chosenProperties;
                    console.log("removed properties" + $scope.RPSProperties);
                    //alert(chosenProperties[0].prContactDetails);
                    $scope.RPSContactList = jQuery.parseJSON(chosenProperties[0]?.prContactDetails);
                    //$scope.RPSContactOptions.reloadData();
                    $scope.$apply();
                });
        }

        getRPSProperties();

        // Copy from EmailTemplates Controller - Quick fix for Simon
        function getEmailTemplates() {
            alert("hello");
            emailTemplatesService.getEmailTemplates()
                .success(function (emailTemplates) {
                    $scope.EmailTemplates = emailTemplates;
                });
        };


        getEmailTemplates();

        function getQueryFailed() {
            logger.Error("Cannot find the template");
            return;
        }

        var currentEmailLocale = "en-GB";

        // Import the email Template into ideMailOutput / DTEnquiry.enLastTemplateChosen
        function etImportTemplate(passedTemplateID) {
            var templateID = passedTemplateID;
            console.log("Import Template" + templateID);
            $rootScope.RecentTemplateId = templateID;
            console.log(templateID);
            // $scope.DTEnquiry.enLastTemplateChosen
            var timeout = setTimeout(function () {
                var promiseGet = emailTemplatesService.getATemplate(templateID)
                    .then(getEmailLocale)
                    .catch(getQueryFailed);
            }, 50);
            return;
        };

        function etImportTemplateSubject(subject) {
            enquiryDataService.getAllEnquiryDetails($scope.glbCurrentEnquiryRef).success(function (enquiryDetails) {
                //Client related tags

                subject = subject.replace(/\#\#EnquiryRef\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCode));
                subject = subject.replace(/\#\#EnquiryStatus\#\#/gi, MakeEmptyStringWhenNull($scope.DTEnquiry.enEDProgressWord));
                subject = subject.replace(/\#\#ClientName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDClientName));
                subject = subject.replace(/\#\#DuplicateWarning\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enDuplicateWarning));
                subject = subject.replace(/\#\#CompanyName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDCompanyName));
                subject = subject.replace(/\#\#ClientGroup\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDClientGroupName));
                subject = subject.replace(/\#\#PrimaryContactAsClient\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDPrimaryContact));
                subject = subject.replace(/\#\#ClientTitle\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDTitle));
                subject = subject.replace(/\#\#ClientFirstName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDFirstName));
                subject = subject.replace(/\#\#ClientLastName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDLastName));
                subject = subject.replace(/\#\#ClientJobTitle\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDJobTitle));
                subject = subject.replace(/\#\#ClientAddress1\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDAddress1));
                subject = subject.replace(/\#\#ClientAddress2\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDAddress2));
                subject = subject.replace(/\#\#ClientAddress3\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDAddress3));
                subject = subject.replace(/\#\#ClientAddress4\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDAddress4));
                subject = subject.replace(/\#\#ClientAddress5\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDAddress5));
                subject = subject.replace(/\#\#ClientPostCode\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDPostCode));
                subject = subject.replace(/\#\#ClientEmailAddress\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDEmailAddress));
                subject = subject.replace(/\#\#ClientSkype\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDSkype));
                subject = subject.replace(/\#\#ClientTelephone\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDTelephone1));
                subject = subject.replace(/\#\#ClientTimeZone\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDClientTimeZone));
                subject = subject.replace(/\#\#ClientCountry\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDCountryName));
                subject = subject.replace(/\#\#ClientFaxNumber\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDFaxNo));
                subject = subject.replace(/\#\#ClientTASAccountOwner\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDTASAccountOwner));
                subject = subject.replace(/\#\#ClientGroupContact\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDGroupContact));
                subject = subject.replace(/\#\#ClientGroupName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDGroupName));
                subject = subject.replace(/\#\#ClientNotes\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDNotes));

                //Traveller related tags

                subject = subject.replace(/\#\#TravellerClientName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRClientName));
                subject = subject.replace(/\#\#TravellerCompanyName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRCompanyName));
                subject = subject.replace(/\#\#TravellerGroup\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRClientGroupName));
                subject = subject.replace(/\#\#PrimaryContactAsTraveller\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRPrimaryContact));
                subject = subject.replace(/\#\#TravellerTitle\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRTitle));
                subject = subject.replace(/\#\#TravellerFirstName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRFirstName));
                subject = subject.replace(/\#\#TravellerLastName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRLastName));
                subject = subject.replace(/\#\#TravellerJobTitle\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRJobTitle));
                subject = subject.replace(/\#\#TravellerAddress1\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRAddress1));
                subject = subject.replace(/\#\#TravellerAddress2\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRAddress2));
                subject = subject.replace(/\#\#TravellerAddress3\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRAddress3));
                subject = subject.replace(/\#\#TravellerAddress4\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRAddress4));
                subject = subject.replace(/\#\#TravellerAddress5\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRAddress5));
                subject = subject.replace(/\#\#TravellerPostCode\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRPostCode));
                subject = subject.replace(/\#\#TravellerEmailAddress\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTREmailAddress));
                subject = subject.replace(/\#\#TravellerSkype\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRSkype));
                subject = subject.replace(/\#\#TravellerTelephone\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRTelephone1));
                subject = subject.replace(/\#\#TravellerTimeZone\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRTravellerTimeZone));
                subject = subject.replace(/\#\#TravellerCountry\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRCountryName));
                subject = subject.replace(/\#\#TravellerFaxNumber\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRFaxNo));
                subject = subject.replace(/\#\#TravellerTASAccountOwner\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRTASAccountOwner));
                subject = subject.replace(/\#\#TravellerNotes\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRNotes));
                subject = subject.replace(/\#\#TravellerGroupName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRGroupName));

                //Enquiry related tags
                subject = subject.replace(/\#\#CountyOrState\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDState));
                subject = subject.replace(/\#\#SantaFeBudgetAmount\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enSfBudgetAmount));
                subject = subject.replace(/\#\#SantaFeAssigneeOfficeAddress\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enSfAssigneeOfficeAddress));
                subject = subject.replace(/\#\#SantaFeInvoiceEmail\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enSfInvoiceEmail));
                subject = subject.replace(/\#\#SantaFeInvoiceAddress\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enSfInvoiceAddress));
                subject = subject.replace(/\#\#SantaFeOfficeAddress\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enSfOfficeAddress));

                subject = subject.replace(/\#\#EnquirySource\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDSourceName));
                subject = subject.replace(/\#\#PrimaryContactName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enPrimaryContactName).replace('/', ''));
                subject = subject.replace(/\#\#NoOfGuests\#\#/gi, MakeZeroWhenNull(enquiryDetails.enEDNoOfGuests));
                subject = subject.replace(/\#\#AssignedUser\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDUserAssigned));
                subject = subject.replace(/\#\#PreferredContact\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDPreferredContact));
                subject = subject.replace(/\#\#OrderReference\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDOrderRef));
                subject = subject.replace(/\#\#SpecialInterest\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDSpecialInterest));
                subject = subject.replace(/\#\#EnquiryAddedDate\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDDateAddedFormat) + (MakeEmptyStringWhenNull(enquiryDetails.enEDUTCDateAdded) == "" ? "" : " (" + enquiryDetails.enEDUTCDateAdded + ")"));
                subject = subject.replace(/\#\#LastActioned\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDDateLastActionedFormat) + (MakeEmptyStringWhenNull(enquiryDetails.enEDUTCLastActioned) == "" ? "" : " (" + enquiryDetails.enEDUTCLastActioned + ")"));
                subject = subject.replace(/\#\#NextAction\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDDateNextActionFormat) + (MakeEmptyStringWhenNull(enquiryDetails.enEDUTCNextActioned) == "" ? "" : " (" + enquiryDetails.enEDUTCNextActioned + ")"));
                subject = subject.replace(/\#\#TripType\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDTripType));
                subject = subject.replace(/\#\#EnquiryApartmentType\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDApartmentTypeName));
                subject = subject.replace(/\#\#BudgetCategeory\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDBudgetCategoryName));
                subject = subject.replace(/\#\#BudgetAmount\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDBudgetAmount));
                subject = subject.replace(/\#\#BudgetCurrency\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.currencyName));
                subject = subject.replace(/\#\#SpecificApartment\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDSpecificApartment));
                subject = subject.replace(/\#\#EnquiryCountry\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDCountryName));
                subject = subject.replace(/\#\#EnquiryCity\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDEnquiryCityName));
                subject = subject.replace(/\#\#EnquiryCorrectedCity\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDCorrectedCityName));
                subject = subject.replace(/\#\#ArrivalDate\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDDateOfArrivalFormat));
                subject = subject.replace(/\#\#DepartureDate\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDDepartureDateFormat));
                subject = subject.replace(/\#\#MaximumDistance\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDMaxDistance));
                subject = subject.replace(/\#\#DesiredLocationInfo\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDDesiredLocationInfo));
                subject = subject.replace(/\#\#ManualStatus\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enManualStatus));
                subject = subject.replace(/\#\#ManualStatusForBooking\#\#/gi, "Book Now");
                subject = subject.replace(/\#\#Nights\#\#/gi, enquiryDetails.enEDNights);
                subject = subject.replace(/\#\#PrimaryContactAsGuest\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enED1PrimaryContact));
                subject = subject.replace(/\#\#Guest1Title\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enED1Title));
                subject = subject.replace(/\#\#Guest1FirstName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enED1FirstName));
                subject = subject.replace(/\#\#Guest1LastName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enED1LastName));
                subject = subject.replace(/\#\#Guest1Age\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enED1Age));
                subject = subject.replace(/\#\#Guest1RelationShip\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enED1Relationship));
                subject = subject.replace(/\#\#Guest2Title\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enED2Title));
                subject = subject.replace(/\#\#Guest2FirstName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enED2FirstName));
                subject = subject.replace(/\#\#Guest2LastName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enED2LastName));
                subject = subject.replace(/\#\#Guest2Age\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enED2Age));
                subject = subject.replace(/\#\#Guest2RelationShip\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enED2Relationship));
                subject = subject.replace(/\#\#TotalPassengers\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDTotalPassengers));
                subject = subject.replace(/\#\#ChildrenAges\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDChildrensAges));
                subject = subject.replace(/\#\#DoubleBedroom\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDDoubleBedroom));
                subject = subject.replace(/\#\#TwinBedroom\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDTwinBedroom));
                subject = subject.replace(/\#\#SingleBedroom\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDSingleBedroom));
                subject = subject.replace(/\#\#ExtraBeds\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDExtraBeds));
                subject = subject.replace(/\#\#SpecialRequestNotes\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDComments));
                subject = subject.replace(/\#\#AdultPassengersCount\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDNoAdultPassengers));
                subject = subject.replace(/\#\#ChildrenCount\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDNoChildren));
                subject = subject.replace(/\#\#Guest1Email\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enED1EmailAddress));
                subject = subject.replace(/\#\#TimeOfArrival\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDTimeOfArrival));
                subject = subject.replace(/\#\#Guest2Email\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enED2EmailAddress));
                subject = subject.replace(/\#\#EnquiryGroupName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enGroupName));
                subject = subject.replace(/\#\#ParkingRequired\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.parkingRequired));
                subject = subject.replace(/\#\#PetsRequired\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.petsRequired));
                subject = subject.replace(/\#\#PetsType\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDPetsType));
                subject = subject.replace(/\#\#TermsandConditions\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.termsAndConditionsOut));
                subject = subject.replace(/\#\#Gdpr\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.gdprOut));

                //Enquiry Closure Tags              

                subject = subject.replace(/\#\#ClosureHomeAddress\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECHomeAddress));
                subject = subject.replace(/\#\#ClosureCountry\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECCountryName));
                subject = subject.replace(/\#\#ClosureCity\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECCityName));
                subject = subject.replace(/\#\#ClosurePostCode\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECPoCode));
                subject = subject.replace(/\#\#FivestarReference\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECFiveStarRef));
                subject = subject.replace(/\#\#ClosureReason\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECDeadReason));
                subject = subject.replace(/\#\#EnquiryClosedDate\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECCloseDateFormat) + (MakeEmptyStringWhenNull(enquiryDetails.enECCloseDateUTC) == "" ? "" : " (" + enquiryDetails.enECCloseDateUTC + ")"));
                subject = subject.replace(/\#\#EnquiryReOpen\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECReOpen));
                subject = subject.replace(/\#\#ClosureTelephone\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECTelephone1));
                subject = subject.replace(/\#\#ECIDNumber\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECIDNumber));
                subject = subject.replace(/\#\#EmergencyContact\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECEmergencyContact));
                subject = subject.replace(/\#\#ECIDType\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECIDType));
                subject = subject.replace(/\#\#ECLowestOfferedRate\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECLowestOfferedRate));
                subject = subject.replace(/\#\#ECHighestOfferedRate\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECHighestOfferedRate));
                subject = subject.replace(/\#\#ECOfferedCurrency\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECOfferedCurrencyName));
                subject = subject.replace(/\#\#FlightNumber\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECFlightNo));
                subject = subject.replace(/\#\#FlightDate\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECFlightDateFormat));
                subject = subject.replace(/\#\#ArrivalFrom\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECArrivingFrom));
                subject = subject.replace(/\#\#TransferRequired\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECTransferRequired));
                subject = subject.replace(/\#\#TransferBookingInfo\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECTransferBookingInfo));
                subject = subject.replace(/\#\#BookingNotes\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECBookingNotes));
                subject = subject.replace(/\#\#Salutation\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enPrimarySalutation));
                subject = subject.replace(/\#\#EnquiryTimeAdded\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDTimeAdded));
                subject = subject.replace(/\#\#NextActionTime\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDTimeNextAction));
                subject = subject.replace(/\#\#LastActionTime\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDTimeLastActioned));
                subject = subject.replace(/\#\#LeadPassengerName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRTitle) + " " + MakeEmptyStringWhenNull(enquiryDetails.enTRFirstName) + " " + MakeEmptyStringWhenNull(enquiryDetails.enTRLastName));
                subject = subject.replace(/\#\#AcknowledgementSent\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enAcknowledgementSent));
                subject = subject.replace(/\#\#LineManagersEmailAddress\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enLineManagersEmailAddress));
                subject = subject.replace(/\#\#GlCompanyCode\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enGlCompanyCode));
                subject = subject.replace(/\#\#GlLocationCode\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enGlLocationCode));
                subject = subject.replace(/\#\#GlCostCentre\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enGlCostCentre));
                subject = subject.replace(/\#\#EmployeeOrContractorId\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEmployeeOrContractorId));
                subject = subject.replace(/\#\#SvpName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enSvpName));
                subject = subject.replace(/\#\#TravelTrackingCode\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTravelTrackingCode));
                subject = subject.replace(/\#\#Gender\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enGender));
                subject = subject.replace(/\#\#DateOfBirth\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enDateOfBirth));
                subject = subject.replace(/\#\#FlightComments\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enFlightComments));
                subject = subject.replace(/\#\#CheckInBagRequired\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCheckInBagRequired));
                subject = subject.replace(/\#\#AmazonBadgeColour\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enAmazonBadgeColour));
                subject = subject.replace(/\#\#DepartureAirport\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enDepartureAirport));
                subject = subject.replace(/\#\#ReturnAirport\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enReturnAirport));
                subject = subject.replace(/\#\#NumberOfRooms\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enNumberOfRooms));
                subject = subject.replace(/\#\#Amenities\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enAmenities));
                subject = subject.replace(/\#\#IsUrgent\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enIsUrgent));
                subject = subject.replace(/\#\#LineManagerAddress\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enLineManagerAddress));
                subject = subject.replace(/\#\#AirportStationDepartureDate\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enAirportStationDepartureDate));
                subject = subject.replace(/\#\#AirportStationReturnDate\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enAirportStationReturnDate));
                subject = subject.replace(/\#\#VirtualPaymentRequiredApartment\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enVirtualPaymentRequiredApartment));
                subject = subject.replace(/\#\#RoomRequirement\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enRoomRequirement));
                subject = subject.replace(/\#\#SpecialRemarks\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDSpecialRemarks));
                subject = subject.replace(/\#\#EmployeeId\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEmployeeID));
                subject = subject.replace(/\#\#AirportStationDepartureDay\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.AirportStationDepartureDay));
                subject = subject.replace(/\#\#AirportStationDepartureMonth\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.AirportStationDepartureMonth));
                subject = subject.replace(/\#\#AirportStationDepartureYear\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.AirportStationDepartureYear));
                subject = subject.replace(/\#\#AirportStationReturnDay\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.AirportStationDepartureDay));
                subject = subject.replace(/\#\#AirportStationReturnMonth\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.AirportStationDepartureMonth));
                subject = subject.replace(/\#\#AirportStationReturnYear\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.AirportStationDepartureYear));
                subject = subject.replace(/\#\#DateOfBirthDay\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.DateOfBirthDay));
                subject = subject.replace(/\#\#DateOfBirthMonth\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.DateOfBirthMonth));
                subject = subject.replace(/\#\#DateOfBirthYear\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.DateOfBirthYear));
                subject = subject.replace(/\#\#ArrivalDateDay\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.ArrivalDateDay));
                subject = subject.replace(/\#\#ArrivalDateMonth\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.ArrivalDateMonth));
                subject = subject.replace(/\#\#ArrivalDateYear\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.ArrivalDateYear));
                subject = subject.replace(/\#\#DepartureDateDay\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.DepartureDateDay));
                subject = subject.replace(/\#\#DepartureDateMonth\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.DepartureDateMonth));
                subject = subject.replace(/\#\#DepartureDateYear\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.DepartureDateYear));
                subject = subject.replace(/\#\#FlightDateDay\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.FlightDateDay));
                subject = subject.replace(/\#\#FlightDateMonth\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.FlightDateMonth));
                subject = subject.replace(/\#\#FlightDateYear\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.FlightDateYear));
                $rootScope.ETEmailSubject = subject;
            });
        }

        function getEmailLocale(ret) {
            console.log("getEmailLocale" + ret.data.etLanguageCode);
            var timeout = setTimeout(function () {
                var promiseGet = languageCodesService.getALanguageCode(ret.data.etLanguageCode)
                    .then(function (languageCodeRecord) {
                        currentEmailLocale = languageCodeRecord.data.lcCode;
                        getQuerySucceeded(ret);
                    })
                    .catch(getQuerySucceeded(ret));
            }, 50);
            return;
        };

        function getQuerySucceeded(ret) {
            enquiryDataService.getAllEnquiryDetails(enqRef)
                .success(function (enquiryDetails) {
                    var enquiryDetails = enquiryDetails;
                    console.log(enquiryDetails);
                    console.log("enquiryDetails");

                    if (currentEmailLocale == null || currentEmailLocale == "") {
                        currentEmailLocale = "en-GB";
                    }
                    var strTemplate = "";
                    strTemplate = ret.data.etTemplate;
                    console.log("Template" + strTemplate);
                    //////Replace Generic tags in Template///////////////

                    emailTemplatesService.getGenericTemplate(strTemplate)
                        .success(function (emailTemplateString) {
                            emailTemplatesService.replaceClientVariables(emailTemplateString, enqRef)
                                .success(async function (templateString) {

                                    strTemplate = templateString;
                                    console.log(strTemplate);

                                    var strContactPersonName = $rootScope.contactPersonName;
                                    if (MakeEmptyStringWhenNull(strContactPersonName) == "") {
                                        strContactPersonName = "Partner";
                                    }
                                    console.log(strContactPersonName);
                                    console.log("typeOfTemplate: " + $rootScope.typeOfTemplate);
                                    console.log($scope.includeFooterSignature);
                                    console.log($rootScope.footerTemplate);
                                    if ($scope.includeFooterSignature == true) {
                                        strTemplate = strTemplate.replace(/\#\#UserFooter\#\#/gi, MakeEmptyStringWhenNull($rootScope.footerTemplate));
                                    }
                                    else {
                                        strTemplate = strTemplate.replace(/\#\#UserFooter\#\#/gi, "");
                                    }

                                    console.log(enquiryDetails.enECFlightDateFormat);
                                    if (enquiryDetails.enECFlightDateFormat == "01 Jan 1970 00:00") {
                                        enquiryDetails.enECFlightDateFormat = "";
                                    }

                                    //Client related tags

                                    strTemplate = strTemplate.replace(/\#\#EnquiryRef\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCode));
                                    strTemplate = strTemplate.replace(/\#\#EnquiryStatus\#\#/gi, MakeEmptyStringWhenNull($scope.DTEnquiry.enEDProgressWord));
                                    strTemplate = strTemplate.replace(/\#\#ClientName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDClientName));
                                    strTemplate = strTemplate.replace(/\#\#DuplicateWarning\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enDuplicateWarning));
                                    strTemplate = strTemplate.replace(/\#\#CompanyName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDCompanyName));
                                    strTemplate = strTemplate.replace(/\#\#ClientGroup\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDClientGroupName));
                                    strTemplate = strTemplate.replace(/\#\#PrimaryContactAsClient\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDPrimaryContact));
                                    strTemplate = strTemplate.replace(/\#\#ClientTitle\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDTitle));
                                    strTemplate = strTemplate.replace(/\#\#ClientFirstName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDFirstName));
                                    strTemplate = strTemplate.replace(/\#\#ClientLastName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDLastName));
                                    strTemplate = strTemplate.replace(/\#\#ClientJobTitle\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDJobTitle));
                                    strTemplate = strTemplate.replace(/\#\#ClientAddress1\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDAddress1));
                                    strTemplate = strTemplate.replace(/\#\#ClientAddress2\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDAddress2));
                                    strTemplate = strTemplate.replace(/\#\#ClientAddress3\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDAddress3));
                                    strTemplate = strTemplate.replace(/\#\#ClientAddress4\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDAddress4));
                                    strTemplate = strTemplate.replace(/\#\#ClientAddress5\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDAddress5));
                                    strTemplate = strTemplate.replace(/\#\#ClientPostCode\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDPostCode));
                                    strTemplate = strTemplate.replace(/\#\#ClientEmailAddress\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDEmailAddress));
                                    strTemplate = strTemplate.replace(/\#\#ClientSkype\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDSkype));
                                    strTemplate = strTemplate.replace(/\#\#ClientTelephone\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDTelephone1));
                                    strTemplate = strTemplate.replace(/\#\#ClientTimeZone\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDClientTimeZone));
                                    strTemplate = strTemplate.replace(/\#\#ClientCountry\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDCountryName));
                                    strTemplate = strTemplate.replace(/\#\#ClientFaxNumber\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDFaxNo));
                                    strTemplate = strTemplate.replace(/\#\#ClientTASAccountOwner\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDTASAccountOwner));
                                    strTemplate = strTemplate.replace(/\#\#ClientGroupContact\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDGroupContact));
                                    strTemplate = strTemplate.replace(/\#\#ClientGroupName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDGroupName));
                                    strTemplate = strTemplate.replace(/\#\#ClientNotes\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCDNotes));

                                    //Traveller related tags

                                    strTemplate = strTemplate.replace(/\#\#TravellerClientName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRClientName));
                                    strTemplate = strTemplate.replace(/\#\#TravellerCompanyName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRCompanyName));
                                    strTemplate = strTemplate.replace(/\#\#TravellerGroup\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRClientGroupName));
                                    strTemplate = strTemplate.replace(/\#\#PrimaryContactAsTraveller\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRPrimaryContact));
                                    strTemplate = strTemplate.replace(/\#\#TravellerTitle\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRTitle));
                                    strTemplate = strTemplate.replace(/\#\#TravellerFirstName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRFirstName));
                                    strTemplate = strTemplate.replace(/\#\#TravellerLastName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRLastName));
                                    strTemplate = strTemplate.replace(/\#\#TravellerJobTitle\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRJobTitle));
                                    strTemplate = strTemplate.replace(/\#\#TravellerAddress1\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRAddress1));
                                    strTemplate = strTemplate.replace(/\#\#TravellerAddress2\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRAddress2));
                                    strTemplate = strTemplate.replace(/\#\#TravellerAddress3\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRAddress3));
                                    strTemplate = strTemplate.replace(/\#\#TravellerAddress4\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRAddress4));
                                    strTemplate = strTemplate.replace(/\#\#TravellerAddress5\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRAddress5));
                                    strTemplate = strTemplate.replace(/\#\#TravellerPostCode\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRPostCode));
                                    strTemplate = strTemplate.replace(/\#\#TravellerEmailAddress\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTREmailAddress));
                                    strTemplate = strTemplate.replace(/\#\#TravellerSkype\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRSkype));
                                    strTemplate = strTemplate.replace(/\#\#TravellerTelephone\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRTelephone1));
                                    strTemplate = strTemplate.replace(/\#\#TravellerTimeZone\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRTravellerTimeZone));
                                    strTemplate = strTemplate.replace(/\#\#TravellerCountry\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRCountryName));
                                    strTemplate = strTemplate.replace(/\#\#TravellerFaxNumber\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRFaxNo));
                                    strTemplate = strTemplate.replace(/\#\#TravellerTASAccountOwner\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRTASAccountOwner));
                                    strTemplate = strTemplate.replace(/\#\#TravellerNotes\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRNotes));
                                    strTemplate = strTemplate.replace(/\#\#TravellerGroupName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRGroupName));

                                    //Enquiry related tags
                                    strTemplate = strTemplate.replace(/\#\#CountyOrState\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDState));
                                    strTemplate = strTemplate.replace(/\#\#SantaFeBudgetAmount\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enSfBudgetAmount));
                                    strTemplate = strTemplate.replace(/\#\#SantaFeAssigneeOfficeAddress\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enSfAssigneeOfficeAddress));
                                    strTemplate = strTemplate.replace(/\#\#SantaFeInvoiceEmail\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enSfInvoiceEmail));
                                    strTemplate = strTemplate.replace(/\#\#SantaFeInvoiceAddress\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enSfInvoiceAddress));
                                    strTemplate = strTemplate.replace(/\#\#SantaFeOfficeAddress\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enSfOfficeAddress));

                                    strTemplate = strTemplate.replace(/\#\#EnquirySource\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDSourceName));
                                    strTemplate = strTemplate.replace(/\#\#PrimaryContactName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enPrimaryContactName).replace('/', ''));
                                    strTemplate = strTemplate.replace(/\#\#NoOfGuests\#\#/gi, MakeZeroWhenNull(enquiryDetails.enEDNoOfGuests));
                                    strTemplate = strTemplate.replace(/\#\#AssignedUser\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDUserAssigned));
                                    strTemplate = strTemplate.replace(/\#\#PreferredContact\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDPreferredContact));
                                    strTemplate = strTemplate.replace(/\#\#OrderReference\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDOrderRef));
                                    strTemplate = strTemplate.replace(/\#\#SpecialInterest\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDSpecialInterest));
                                    strTemplate = strTemplate.replace(/\#\#EnquiryAddedDate\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDDateAddedFormat) + (MakeEmptyStringWhenNull(enquiryDetails.enEDUTCDateAdded) == "" ? "" : " (" + enquiryDetails.enEDUTCDateAdded + ")"));
                                    strTemplate = strTemplate.replace(/\#\#LastActioned\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDDateLastActionedFormat) + (MakeEmptyStringWhenNull(enquiryDetails.enEDUTCLastActioned) == "" ? "" : " (" + enquiryDetails.enEDUTCLastActioned + ")"));
                                    strTemplate = strTemplate.replace(/\#\#NextAction\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDDateNextActionFormat) + (MakeEmptyStringWhenNull(enquiryDetails.enEDUTCNextActioned) == "" ? "" : " (" + enquiryDetails.enEDUTCNextActioned + ")"));
                                    strTemplate = strTemplate.replace(/\#\#TripType\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDTripType));
                                    strTemplate = strTemplate.replace(/\#\#EnquiryApartmentType\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDApartmentTypeName));
                                    strTemplate = strTemplate.replace(/\#\#BudgetCategeory\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDBudgetCategoryName));
                                    strTemplate = strTemplate.replace(/\#\#BudgetAmount\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDBudgetAmount));
                                    strTemplate = strTemplate.replace(/\#\#BudgetCurrency\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.currencyName));
                                    strTemplate = strTemplate.replace(/\#\#SpecificApartment\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDSpecificApartment));
                                    strTemplate = strTemplate.replace(/\#\#EnquiryCountry\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDCountryName));
                                    strTemplate = strTemplate.replace(/\#\#EnquiryCity\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDEnquiryCityName));
                                    strTemplate = strTemplate.replace(/\#\#EnquiryCorrectedCity\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDCorrectedCityName));
                                    strTemplate = strTemplate.replace(/\#\#ArrivalDate\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDDateOfArrivalFormat));
                                    strTemplate = strTemplate.replace(/\#\#DepartureDate\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDDepartureDateFormat));
                                    strTemplate = strTemplate.replace(/\#\#AirportStationDepartureDay\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.DepartureDate));
                                    strTemplate = strTemplate.replace(/\#\#AirportStationDepartureMonth\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.DepartureMonth));
                                    strTemplate = strTemplate.replace(/\#\#AirportStationDepartureYear\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.DepartureYear));
                                    strTemplate = strTemplate.replace(/\#\#MaximumDistance\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDMaxDistance));
                                    strTemplate = strTemplate.replace(/\#\#DesiredLocationInfo\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDDesiredLocationInfo));
                                    strTemplate = strTemplate.replace(/\#\#ManualStatus\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enManualStatus));
                                    strTemplate = strTemplate.replace(/\#\#ManualStatusForBooking\#\#/gi, "Book Now");
                                    strTemplate = strTemplate.replace(/\#\#Nights\#\#/gi, enquiryDetails.enEDNights);
                                    strTemplate = strTemplate.replace(/\#\#PrimaryContactAsGuest\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enED1PrimaryContact));
                                    strTemplate = strTemplate.replace(/\#\#Guest1Title\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enED1Title));
                                    strTemplate = strTemplate.replace(/\#\#Guest1FirstName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enED1FirstName));
                                    strTemplate = strTemplate.replace(/\#\#Guest1LastName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enED1LastName));
                                    strTemplate = strTemplate.replace(/\#\#Guest1Age\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enED1Age));
                                    strTemplate = strTemplate.replace(/\#\#Guest1RelationShip\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enED1Relationship));
                                    strTemplate = strTemplate.replace(/\#\#Guest2Title\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enED2Title));
                                    strTemplate = strTemplate.replace(/\#\#Guest2FirstName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enED2FirstName));
                                    strTemplate = strTemplate.replace(/\#\#Guest2LastName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enED2LastName));
                                    strTemplate = strTemplate.replace(/\#\#Guest2Age\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enED2Age));
                                    strTemplate = strTemplate.replace(/\#\#Guest2RelationShip\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enED2Relationship));
                                    strTemplate = strTemplate.replace(/\#\#TotalPassengers\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDTotalPassengers));
                                    strTemplate = strTemplate.replace(/\#\#ChildrenAges\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDChildrensAges));
                                    strTemplate = strTemplate.replace(/\#\#DoubleBedroom\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDDoubleBedroom));
                                    strTemplate = strTemplate.replace(/\#\#TwinBedroom\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDTwinBedroom));
                                    strTemplate = strTemplate.replace(/\#\#SingleBedroom\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDSingleBedroom));
                                    strTemplate = strTemplate.replace(/\#\#ExtraBeds\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDExtraBeds));
                                    strTemplate = strTemplate.replace(/\#\#SpecialRequestNotes\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDComments));
                                    strTemplate = strTemplate.replace(/\#\#AdultPassengersCount\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDNoAdultPassengers));
                                    strTemplate = strTemplate.replace(/\#\#ChildrenCount\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDNoChildren));
                                    strTemplate = strTemplate.replace(/\#\#Guest1Email\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enED1EmailAddress));
                                    strTemplate = strTemplate.replace(/\#\#TimeOfArrival\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDTimeOfArrival));
                                    strTemplate = strTemplate.replace(/\#\#Guest2Email\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enED2EmailAddress));
                                    strTemplate = strTemplate.replace(/\#\#EnquiryGroupName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enGroupName));
                                    strTemplate = strTemplate.replace(/\#\#ParkingRequired\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.parkingRequired));
                                    strTemplate = strTemplate.replace(/\#\#PetsRequired\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.petsRequired));
                                    strTemplate = strTemplate.replace(/\#\#PetsType\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDPetsType));
                                    strTemplate = strTemplate.replace(/\#\#TermsandConditions\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.termsAndConditionsOut));
                                    strTemplate = strTemplate.replace(/\#\#Gdpr\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.gdprOut));

                                    //Enquiry Closure Tags              

                                    strTemplate = strTemplate.replace(/\#\#ClosureHomeAddress\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECHomeAddress));
                                    strTemplate = strTemplate.replace(/\#\#ClosureCountry\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECCountryName));
                                    strTemplate = strTemplate.replace(/\#\#ClosureCity\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECCityName));
                                    strTemplate = strTemplate.replace(/\#\#ClosurePostCode\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECPoCode));
                                    strTemplate = strTemplate.replace(/\#\#FivestarReference\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECFiveStarRef));
                                    strTemplate = strTemplate.replace(/\#\#ClosureReason\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECDeadReason));
                                    strTemplate = strTemplate.replace(/\#\#EnquiryClosedDate\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECCloseDateFormat) + (MakeEmptyStringWhenNull(enquiryDetails.enECCloseDateUTC) == "" ? "" : " (" + enquiryDetails.enECCloseDateUTC + ")"));
                                    strTemplate = strTemplate.replace(/\#\#EnquiryReOpen\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECReOpen));
                                    strTemplate = strTemplate.replace(/\#\#ClosureTelephone\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECTelephone1));
                                    strTemplate = strTemplate.replace(/\#\#ECIDNumber\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECIDNumber));
                                    strTemplate = strTemplate.replace(/\#\#EmergencyContact\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECEmergencyContact));
                                    strTemplate = strTemplate.replace(/\#\#ECIDType\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECIDType));
                                    strTemplate = strTemplate.replace(/\#\#ECLowestOfferedRate\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECLowestOfferedRate));
                                    strTemplate = strTemplate.replace(/\#\#ECHighestOfferedRate\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECHighestOfferedRate));
                                    strTemplate = strTemplate.replace(/\#\#ECOfferedCurrency\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECOfferedCurrencyName));
                                    strTemplate = strTemplate.replace(/\#\#FlightNumber\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECFlightNo));
                                    strTemplate = strTemplate.replace(/\#\#FlightDate\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECFlightDateFormat));
                                    strTemplate = strTemplate.replace(/\#\#ArrivalFrom\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECArrivingFrom));
                                    strTemplate = strTemplate.replace(/\#\#TransferRequired\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECTransferRequired));
                                    strTemplate = strTemplate.replace(/\#\#TransferBookingInfo\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECTransferBookingInfo));
                                    strTemplate = strTemplate.replace(/\#\#BookingNotes\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECBookingNotes));
                                    strTemplate = strTemplate.replace(/\#\#Salutation\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enPrimarySalutation));
                                    strTemplate = strTemplate.replace(/\#\#EnquiryTimeAdded\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDTimeAdded));
                                    strTemplate = strTemplate.replace(/\#\#NextActionTime\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDTimeNextAction));
                                    strTemplate = strTemplate.replace(/\#\#LastActionTime\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDTimeLastActioned));
                                    strTemplate = strTemplate.replace(/\#\#LeadPassengerName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTRTitle) + " " + MakeEmptyStringWhenNull(enquiryDetails.enTRFirstName) + " " + MakeEmptyStringWhenNull(enquiryDetails.enTRLastName));
                                    strTemplate = strTemplate.replace(/\#\#AcknowledgementSent\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enAcknowledgementSent));
                                    strTemplate = strTemplate.replace(/\#\#LineManagersEmailAddress\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enLineManagersEmailAddress));
                                    strTemplate = strTemplate.replace(/\#\#GlCompanyCode\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enGlCompanyCode));
                                    strTemplate = strTemplate.replace(/\#\#GlLocationCode\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enGlLocationCode));
                                    strTemplate = strTemplate.replace(/\#\#GlCostCentre\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enGlCostCentre));
                                    strTemplate = strTemplate.replace(/\#\#EmployeeOrContractorId\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEmployeeOrContractorId));
                                    strTemplate = strTemplate.replace(/\#\#SvpName\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enSvpName));
                                    strTemplate = strTemplate.replace(/\#\#TravelTrackingCode\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enTravelTrackingCode));
                                    strTemplate = strTemplate.replace(/\#\#Gender\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enGender));
                                    strTemplate = strTemplate.replace(/\#\#DateOfBirth\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enDateOfBirth));
                                    strTemplate = strTemplate.replace(/\#\#FlightComments\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enFlightComments));
                                    strTemplate = strTemplate.replace(/\#\#CheckInBagRequired\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enCheckInBagRequired));
                                    strTemplate = strTemplate.replace(/\#\#AmazonBadgeColour\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enAmazonBadgeColour));
                                    strTemplate = strTemplate.replace(/\#\#DepartureAirport\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enDepartureAirport));
                                    strTemplate = strTemplate.replace(/\#\#ReturnAirport\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enReturnAirport));
                                    strTemplate = strTemplate.replace(/\#\#NumberOfRooms\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enNumberOfRooms));
                                    strTemplate = strTemplate.replace(/\#\#Amenities\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enAmenities));
                                    strTemplate = strTemplate.replace(/\#\#IsUrgent\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enIsUrgent));
                                    strTemplate = strTemplate.replace(/\#\#LineManagerAddress\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enLineManagerAddress));
                                    strTemplate = strTemplate.replace(/\#\#AirportStationDepartureDate\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enAirportStationDepartureDate));
                                    strTemplate = strTemplate.replace(/\#\#AirportStationReturnDate\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enAirportStationReturnDate));
                                    strTemplate = strTemplate.replace(/\#\#VirtualPaymentRequiredApartment\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enVirtualPaymentRequiredApartment));
                                    strTemplate = strTemplate.replace(/\#\#RoomRequirement\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enRoomRequirement));
                                    strTemplate = strTemplate.replace(/\#\#SpecialRemarks\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDSpecialRemarks));
                                    strTemplate = strTemplate.replace(/\#\#EmployeeId\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEmployeeID));
                                    strTemplate = strTemplate.replace(/\#\#AirportStationDepartureDay\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.AirportStationDepartureDay));
                                    strTemplate = strTemplate.replace(/\#\#AirportStationDepartureMonth\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.AirportStationDepartureMonth));
                                    strTemplate = strTemplate.replace(/\#\#AirportStationDepartureYear\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.AirportStationDepartureYear));
                                    strTemplate = strTemplate.replace(/\#\#AirportStationReturnDay\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.AirportStationDepartureDay));
                                    strTemplate = strTemplate.replace(/\#\#AirportStationReturnMonth\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.AirportStationDepartureMonth));
                                    strTemplate = strTemplate.replace(/\#\#AirportStationReturnYear\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.AirportStationDepartureYear));
                                    strTemplate = strTemplate.replace(/\#\#DateOfBirthDay\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.DateOfBirthDay));
                                    strTemplate = strTemplate.replace(/\#\#DateOfBirthMonth\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.DateOfBirthMonth));
                                    strTemplate = strTemplate.replace(/\#\#DateOfBirthYear\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.DateOfBirthYear));
                                    strTemplate = strTemplate.replace(/\#\#ArrivalDateDay\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.ArrivalDateDay));
                                    strTemplate = strTemplate.replace(/\#\#ArrivalDateMonth\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.ArrivalDateMonth));
                                    strTemplate = strTemplate.replace(/\#\#ArrivalDateYear\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.ArrivalDateYear));
                                    strTemplate = strTemplate.replace(/\#\#DepartureDateDay\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.DepartureDateDay));
                                    strTemplate = strTemplate.replace(/\#\#DepartureDateMonth\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.DepartureDateMonth));
                                    strTemplate = strTemplate.replace(/\#\#DepartureDateYear\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.DepartureDateYear));
                                    strTemplate = strTemplate.replace(/\#\#FlightDateDay\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.FlightDateDay));
                                    strTemplate = strTemplate.replace(/\#\#FlightDateMonth\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.FlightDateMonth));
                                    strTemplate = strTemplate.replace(/\#\#FlightDateYear\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.FlightDateYear));
                                    console.log(strTemplate);


                                    //Template Dates                  
                                    var strLongDate = "";
                                    var strShortDate = "";
                                    var todayDate = new Date();
                                    var longOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                                    strLongDate = todayDate.toLocaleDateString(currentEmailLocale, longOptions);
                                    var shortOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
                                    strShortDate = todayDate.toLocaleDateString(currentEmailLocale, shortOptions);
                                    strTemplate = strTemplate.replace(/\#\#TodayLong\#\#/gi, strLongDate);
                                    strTemplate = strTemplate.replace(/\#\#TodayShort\#\#/gi, strShortDate);

                                    //Property Related Tags 
                                    console.log("$rootScope.propertyDetails");
                                    console.log($rootScope.propertyDetails);

                                    if (MakeEmptyStringWhenNull($rootScope.typeOfTemplate) == "Check Availability") {

                                        $rootScope.pageName = randomString(50);
                                        console.log("PageName:" + $rootScope.pageName);
                                        $rootScope.globalLandlordLandingPage = $rootScope.eTrakUrl + "/LandlordEmail/index?PageName=" + $rootScope.pageName + "#/";

                                        var propertyFullAddress = $.grep([$rootScope.propertyDetails.prAddress1, $rootScope.propertyDetails.prAddress2, $rootScope.propertyDetails.prCity, $rootScope.propertyDetails.prCountry, $rootScope.propertyDetails.prPostCode], Boolean).join(", ");

                                        var appendPercentile = "%";
                                        console.log("prTaxRate: " + $rootScope.propertyDetails.prTaxRate);
                                        $rootScope.propertyDetails.prTaxRate = MakeZeroWhenNull($rootScope.propertyDetails.prTaxRate);
                                        if ($rootScope.propertyDetails.prTaxRate != "") {
                                            if ($rootScope.propertyDetails.prTaxRate.indexOf("%") != -1) {
                                                appendPercentile = "";
                                            }
                                        }

                                        var appendZero = ".00";
                                        console.log("prRatePerNight: " + $rootScope.propertyDetails.prRatePerNight);
                                        $rootScope.propertyDetails.prRatePerNight = MakeZeroWhenNull($rootScope.propertyDetails.prRatePerNight);
                                        if ($rootScope.propertyDetails.prRatePerNight != "") {
                                            if ($rootScope.propertyDetails.prRatePerNight.indexOf(".") !== -1) {
                                                appendZero = "";
                                            }
                                        }

                                        var contacts = $rootScope.ContactsList;
                                        $rootScope.reservationsName = "";
                                        $rootScope.reservationsEmail = "";
                                        $rootScope.reservationsPhone = "";
                                        $rootScope.SMName = "";
                                        $rootScope.SMEmail = "";
                                        $rootScope.SMPhone = "";

                                        if (MakeEmptyStringWhenNull(contacts) != "") {
                                            for (var l = 0; l < contacts.length; l++) {
                                                if (contacts[l].Type == "Reservations") {
                                                    $rootScope.reservationsName = contacts[l].Name;
                                                    $rootScope.reservationsEmail = contacts[l].Email;
                                                    $rootScope.reservationsPhone = contacts[l].Phone;
                                                }
                                                if (contacts[l].Type == "SalesAndMarketing") {
                                                    $rootScope.SMName = contacts[l].Name;
                                                    $rootScope.SMEmail = contacts[l].Email;
                                                    $rootScope.SMPhone = contacts[l].Phone;
                                                }
                                            }
                                        }

                                        strTemplate = strTemplate.replace(/\#\#LandlordsName\#\#/gi, $rootScope.globalLandlordsName);
                                        strTemplate = strTemplate.replace(/\#\#ApartmentVerificationPage\#\#/gi, $rootScope.globalLandlordLandingPage);
                                        strTemplate = strTemplate.replace(/\#\#ContactPersonName\#\#/gi, strContactPersonName);
                                        strTemplate = strTemplate.replace(/\#\#PropertyId\#\#/gi, MakeEmptyStringWhenNull($rootScope.propertyDetails.prPropertyCode));
                                        strTemplate = strTemplate.replace(/\#\#PropertyName\#\#/gi, MakeEmptyStringWhenNull($rootScope.propertyDetails.prName));
                                        strTemplate = strTemplate.replace(/\#\#RealPropertyName\#\#/gi, MakeEmptyStringWhenNull($rootScope.propertyDetails.prRealPropertyName));
                                        strTemplate = strTemplate.replace(/\#\#Currency\#\#/gi, MakeEmptyStringWhenNull($rootScope.propertyDetails.prCurrency));
                                        strTemplate = strTemplate.replace(/\#\#CommissionIncluded\#\#/gi, MakeEmptyStringWhenNull($rootScope.propertyDetails.prCommissionIncluded));
                                        strTemplate = strTemplate.replace(/\#\#PropertyAddress\#\#/gi, MakeEmptyStringWhenNull(propertyFullAddress));
                                        strTemplate = strTemplate.replace(/\#\#PropertyChainName\#\#/gi, MakeEmptyStringWhenNull($rootScope.propertyDetails.prChainName));

                                        if ($scope.propertyDetails.prApartmentType != null && $scope.propertyDetails.prApartmentType != "Other") {
                                            $rootScope.propertyDetails.prApartmentType = $scope.propertyDetails.prApartmentType
                                        }
                                        else if ($scope.propertyDetails.prApartmentType == "Other") {
                                            $rootScope.propertyDetails.prApartmentType = $rootScope.apartmentType;
                                            console.log($scope.propertyDetails.prApartmentType);
                                        }
                                        strTemplate = strTemplate.replace(/\#\#PropertyApartmentType\#\#/gi, MakeEmptyStringWhenNull($rootScope.propertyDetails.prApartmentType));
                                        strTemplate = strTemplate.replace(/\#\#PropertyServices\#\#/gi, MakeEmptyStringWhenNull($rootScope.propertyDetails.prLongDescription));
                                        strTemplate = strTemplate.replace(/\#\#PropertyCancellationPolicy\#\#/gi, MakeEmptyStringWhenNull($rootScope.propertyDetails.prCancellationPolicy));
                                        strTemplate = strTemplate.replace(/\#\#OfferNote\#\#/gi, MakeEmptyStringWhenNull($rootScope.propertyDetails.prOfferDetails));
                                        strTemplate = strTemplate.replace(/\#\#TaxIncluded\#\#/gi, MakeEmptyStringWhenNull($rootScope.propertyDetails.prTaxIncluded));
                                        strTemplate = strTemplate.replace(/\#\#HeldUntilDate\#\#/gi, $filter('date')(MakeEmptyStringWhenNull($rootScope.propertyDetails.prHeldUntilDate), 'dd-MMM-yyyy HH:mm') + (MakeEmptyStringWhenNull($rootScope.propertyDetails.prHeldUntilUTC) == "" ? "" : " (" + $rootScope.propertyDetails.prHeldUntilUTC + ")"));
                                        strTemplate = strTemplate.replace(/\#\#PropertyTaxRates\#\#/gi, $rootScope.propertyDetails.prTaxRate + appendPercentile);
                                        strTemplate = strTemplate.replace(/\#\#PropertyRatePerNight\#\#/gi, $rootScope.propertyDetails.prRatePerNight + appendZero);
                                        strTemplate = strTemplate.replace(/\#\#TaxNotes\#\#/gi, MakeEmptyStringWhenNull($rootScope.propertyDetails.prTaxNotes));
                                        strTemplate = strTemplate.replace(/\#\#PropertyImage\#\#/gi, MakeEmptyStringWhenNull($rootScope.propertyDetails.prPropertyImageUrl));
                                        strTemplate = strTemplate.replace(/\#\#PropertyDetailsUrl\#\#/gi, MakeEmptyStringWhenNull($rootScope.propertyDetails.prPropertyPopUpHTML));
                                        strTemplate = strTemplate.replace(/\#\#Clientrequested\#\#/gi, $filter('date')($rootScope.propertyDetails.prClientRequestedDate, 'dd-MMM-yyyy HH:mm') + (MakeEmptyStringWhenNull($rootScope.propertyDetails.prUTCDateAdded) == "" ? "" : " (" + $rootScope.propertyDetails.prUTCDateAdded + ")"));
                                        strTemplate = strTemplate.replace(/\#\#Addedtoshortlist\#\#/gi, $filter('date')($rootScope.propertyDetails.prDateAdded, 'dd-MMM-yyyy HH:mm') + (MakeEmptyStringWhenNull($rootScope.propertyDetails.prUTCDateAdded) == "" ? "" : " (" + $rootScope.propertyDetails.prUTCDateAdded + ")"));
                                        strTemplate = strTemplate.replace(/\#\#PrivateNotes\#\#/gi, MakeEmptyStringWhenNull($rootScope.propertyDetails.prPrivateNotes));
                                        strTemplate = strTemplate.replace(/\#\#YourName\#\#/gi, MakeEmptyStringWhenNull($rootScope.propertyDetails.prHolderName));
                                        strTemplate = strTemplate.replace(/\#\#Yourintref\#\#/gi, MakeEmptyStringWhenNull($rootScope.propertyDetails.prInternalReference));
                                        strTemplate = strTemplate.replace(/\#\#TaxAppliedAllNights\#\#/gi, MakeEmptyStringWhenNull($rootScope.propertyDetails.prTaxAppliedAllNights));
                                        strTemplate = strTemplate.replace(/\#\#ReservationsName\#\#/gi, MakeEmptyStringWhenNull($rootScope.reservationsName));
                                        strTemplate = strTemplate.replace(/\#\#ReservationsPhone\#\#/gi, MakeEmptyStringWhenNull($rootScope.reservationsPhone));
                                        strTemplate = strTemplate.replace(/\#\#ReservationsEmail\#\#/gi, MakeEmptyStringWhenNull($rootScope.reservationsEmail));
                                        strTemplate = strTemplate.replace(/\#\#SalesAndMarketingName\#\#/gi, MakeEmptyStringWhenNull($rootScope.SMName));
                                        strTemplate = strTemplate.replace(/\#\#SalesAndMarketingPhone\#\#/gi, MakeEmptyStringWhenNull($rootScope.SMPhone));
                                        strTemplate = strTemplate.replace(/\#\#SalesAndMarketingEmail\#\#/gi, MakeEmptyStringWhenNull($rootScope.SMEmail));
                                        strTemplate = strTemplate.replace(/\#\#PhoneNumber\#\#/gi, MakeEmptyStringWhenNull($rootScope.propertyDetails.prTelephoneNumber));
                                        strTemplate = strTemplate.replace(/\#\#PropertyCancPolUrl\#\#/gi, $rootScope.eTrakUrl + "/Properties/CancellationPolicy/" + enquiryDetails.enCode + "/" + $rootScope.propertyDetails.prPropertyCode + "/" + $rootScope.Token);
                                        strTemplate = strTemplate.replace(/\#\#PropertyOfferNotesUrl\#\#/gi, $rootScope.eTrakUrl + "/Properties/OfferNotes/" + enquiryDetails.enCode + "/" + $rootScope.propertyDetails.prPropertyCode + "/" + $rootScope.Token);
                                        strTemplate = strTemplate.replace(/\#\#PropertyPrivateNotesUrl\#\#/gi, $rootScope.eTrakUrl + "/Properties/PrivateNotes/" + enquiryDetails.enCode + "/" + $rootScope.propertyDetails.prPropertyCode + "/" + $rootScope.Token);
                                        strTemplate = strTemplate.replace(/\#\#PropertyTaxNotesUrl\#\#/gi, $rootScope.eTrakUrl + "/Properties/TaxNotes/" + enquiryDetails.enCode + "/" + $rootScope.propertyDetails.prPropertyCode + "/" + $rootScope.Token);
                                        strTemplate = strTemplate.replace(/\#\#PropertyTerminationPolicy\#\#/gi, $rootScope.propertyDetails.prEarlyTerminationPolicy);
                                        strTemplate = strTemplate.replace(/\#\#PropertySecurityDeposit\#\#/gi, $rootScope.propertyDetails.prSecurityDeposit);
                                        strTemplate = strTemplate.replace(/\#\#PropertyParking\#\#/gi, $rootScope.propertyDetails.prParking);
                                        strTemplate = strTemplate.replace(/\#\#PropertyPaymentTerms\#\#/gi, $rootScope.propertyDetails.prPaymentTerms);
                                        strTemplate = strTemplate.replace(/\#\#PropertyDepositPolicy\#\#/gi, $rootScope.propertyDetails.prDepositPolicy);
                                        console.log(strTemplate);

                                        $scope.ETEmailBody = strTemplate;
                                        $(".ideMailOutput").code('<span style="font-family: Verdana;font-size: 14px;background-color: rgb(255, 255, 255);">' + strTemplate + '</scan>');
                                        $rootScope.emailBody = $(".ideMailOutput").code();
                                        $scope.$apply();
                                        $scope.DTEnquiry.enLastTemplateChosen = "";
                                    }

                                    console.log("Book now template type: " + $rootScope.IsBookNowTemplateType);
                                    console.log("Generate proposal type:" + $rootScope.templateType);

                                    if (MakeEmptyStringWhenNull($rootScope.typeOfTemplate) == "Generate Proposal" || MakeEmptyStringWhenNull($rootScope.typeOfTemplate) == "Book Now") {
                                        if ($rootScope.IsBookNowTemplateType == "Book Now" || ($rootScope.templateType) == "Generate Proposal") {
                                            var recentTemplate = strTemplate;

                                            var startIndex = recentTemplate.indexOf("<!--START_PROPERTY_ROW_MARKER-->");
                                            var endIndex = recentTemplate.indexOf("<!--END_PROPERTY_ROW_MARKER-->");
                                            var propertiesList = $rootScope.APSProperties;
                                            console.log("propertiesList");
                                            console.log(propertiesList);

                                            var selectedProperties = "";
                                            if (MakeEmptyStringWhenNull($rootScope.IsBookNowTemplateType) != "" && ($rootScope.IsBookNowTemplateType).toUpperCase().trim() == "BOOK NOW") {
                                                selectedProperties = $rootScope.shortlistedProperties;
                                            }
                                            else {
                                                selectedProperties = $rootScope.selectedProperties;
                                            }
                                            console.log(selectedProperties);

                                            for (var k = selectedProperties.length - 1; k >= 0; k--) {
                                                var i = propertiesList.length - 1;
                                                for (var j = 0; j < propertiesList.length; j++, i--) {
                                                    console.log("Selected property");
                                                    console.log(selectedProperties[k]);
                                                    console.log(propertiesList[i].prPropertyCode);

                                                    if (selectedProperties[k] == propertiesList[i].prPropertyCode) {

                                                        console.log(propertiesList[i].ID);
                                                        console.log('Comparing both properties');
                                                        $rootScope.prID = propertiesList[i].ID;
                                                        $rootScope.prPropertyCode = propertiesList[i].prPropertyCode;
                                                        $rootScope.prName = propertiesList[i].prName;
                                                        $rootScope.prRealPropertyName = propertiesList[i].prRealPropertyName;
                                                        $rootScope.prLongDescription = propertiesList[i].prLongDescription;
                                                        $rootScope.prCancellationPolicy = propertiesList[i].prCancellationPolicy;
                                                        $rootScope.prPropertyPopUpHTML = propertiesList[i].prPropertyPopUpHTML;
                                                        $rootScope.prRatePerNight = propertiesList[i].prRatePerNight;
                                                        $rootScope.prTaxRate = propertiesList[i].prTaxRate;
                                                        $rootScope.prPropertyImageUrl = propertiesList[i].prPropertyImageUrl;
                                                        $rootScope.prTaxIncluded = propertiesList[i].prTaxIncluded;
                                                        $rootScope.prApartmentType = MakeEmptyStringWhenNull(propertiesList[i].prApartmentType);
                                                        $rootScope.prApartmentTypeWhenOther = propertiesList[i].prApartmentTypeWhenOther;
                                                        $rootScope.prAddress1 = propertiesList[i].prAddress1;
                                                        $rootScope.prAddress2 = propertiesList[i].prAddress2;
                                                        $rootScope.prPostCode = propertiesList[i].prPostCode;
                                                        $rootScope.prCurrency = propertiesList[i].Currency;
                                                        $rootScope.prCommissionIncluded = propertiesList[i].prCommissionIncluded;
                                                        $rootScope.prOfferDetails = propertiesList[i].prOfferDetails;
                                                        $rootScope.prTaxNotes = propertiesList[i].prTaxNotes;
                                                        $rootScope.prCity = propertiesList[i].prCity;
                                                        $rootScope.prCountry = propertiesList[i].prCountry;
                                                        $rootScope.prTelephoneNumber = propertiesList[i].prTelephoneNumber;
                                                        $rootScope.prEarlyTerminationPolicy = propertiesList[i].prEarlyTerminationPolicy;
                                                        $rootScope.prSecurityDeposit = propertiesList[i].prSecurityDeposit;
                                                        $rootScope.prParking = propertiesList[i].prParking;
                                                        $rootScope.prPaymentTerms = propertiesList[i].prPaymentTerms;
                                                        $rootScope.prDepositPolicy = propertiesList[i].prDepositPolicy;
                                                        $rootScope.prChainName = propertiesList[i].prChainName;
                                                        //$rootScope.prImages = propertiesList[i].prImages;
                                                        //$rootScope.prKeyServices = propertiesList[i].prKeyServices;
                                                        //$rootScope.prImportantPoints = propertiesList[i].prImportantPoints;
                                                        $rootScope.prLat = propertiesList[i].prLat;
                                                        $rootScope.prLong = propertiesList[i].prLong;
                                                        //$rootScope.prReferencePoints = propertiesList[i].prReferencePoints;

                                                        if (propertiesList[i].prHeldUntilYear == null && propertiesList[i].prHeldUntilMonth == null && propertiesList[i].prHeldUntilDay == null) {
                                                            $rootScope.prHeldUntilDate = "";
                                                        }
                                                        else {
                                                            $rootScope.prHeldUntilDate = $filter('date')(new Date(propertiesList[i].prHeldUntilYear, propertiesList[i].prHeldUntilMonth - 1, propertiesList[i].prHeldUntilDay), 'dd-MMM-yyyy') + ' ' + propertiesList[i].prHeldUntilTime;
                                                        }
                                                        console.log($rootScope.prHeldUntilDate);

                                                        $rootScope.prClientRequestedDate = propertiesList[i].prClientRequestedDate;
                                                        $rootScope.prDateAdded = propertiesList[i].prDateAdded;
                                                        $rootScope.prUTCDateAdded = propertiesList[i].prUTCDateAdded;
                                                        $rootScope.prPrivateNotes = propertiesList[i].prPrivateNotes;
                                                        $rootScope.prHolderName = propertiesList[i].prHolderName;
                                                        $rootScope.prInternalReference = propertiesList[i].prInternalReference;
                                                        $rootScope.prTaxAppliedAllNights = propertiesList[i].prTaxAppliedAllNights;
                                                        $rootScope.prHeldUntilUTC = propertiesList[i].prHeldUntilUTC;

                                                        console.log("Contacts List");
                                                        console.log(propertiesList[i].Contacts);
                                                        var contacts = propertiesList[i].Contacts;
                                                        $rootScope.reservationsName = "";
                                                        $rootScope.reservationsEmail = "";
                                                        $rootScope.reservationsPhone = "";
                                                        $rootScope.SMName = "";
                                                        $rootScope.SMEmail = "";
                                                        $rootScope.SMPhone = "";

                                                        if (MakeEmptyStringWhenNull(contacts) != "") {
                                                            for (var l = 0; l < contacts.length; l++) {
                                                                if (contacts[l].Type == "Reservations") {
                                                                    $rootScope.reservationsName = contacts[l].Name;
                                                                    $rootScope.reservationsEmail = contacts[l].Email;
                                                                    $rootScope.reservationsPhone = contacts[l].Phone;
                                                                }
                                                                if (contacts[l].Type == "SalesAndMarketing") {
                                                                    $rootScope.SMName = contacts[l].Name;
                                                                    $rootScope.SMEmail = contacts[l].Email;
                                                                    $rootScope.SMPhone = contacts[l].Phone;
                                                                }
                                                            }
                                                        }

                                                        if (MakeEmptyStringWhenNull($rootScope.prCommissionIncluded) == "") {
                                                            $rootScope.prCommissionIncluded = "0%";
                                                        }

                                                        if ($rootScope.prTaxIncluded == 1)
                                                            $rootScope.prTaxIncluded = "Yes";
                                                        else
                                                            $rootScope.prTaxIncluded = "No";

                                                        if ($rootScope.prApartmentType == "Other") {
                                                            $rootScope.prApartmentType = $rootScope.prApartmentTypeWhenOther;
                                                        }

                                                        var appendZero = ".00";
                                                        $rootScope.prRatePerNight = MakeZeroWhenNull($rootScope.prRatePerNight);
                                                        if ($rootScope.prRatePerNight != "") {
                                                            if ($rootScope.prRatePerNight.indexOf(".") !== -1) {
                                                                appendZero = "";
                                                            }
                                                        }

                                                        var appendPercentile = "%";
                                                        $rootScope.prTaxRate = MakeZeroWhenNull($rootScope.prTaxRate);
                                                        if ($rootScope.prTaxRate != "") {
                                                            if ($rootScope.prTaxRate.indexOf("%") !== -1) {
                                                                appendPercentile = "";
                                                            }
                                                        }

                                                        enquiryDetails.enECFlightNo = MakeEmptyStringWhenNull(enquiryDetails.enECFlightNo);
                                                        if (enquiryDetails.enECFlightDate == '1970-01-01T00:00:00') {
                                                            enquiryDetails.enECFlightDate = "";
                                                        }

                                                        console.log("$scope.secureBookingStatus: " + $scope.secureBookingStatus);
                                                        console.log("$scope.payNowStatus: " + $scope.payNowStatus);
                                                        console.log("$scope.bookNowStatus" + $scope.bookNowStatus);

                                                        var paymentUrl = "";
                                                        if ($scope.secureBookingStatus == "true") {
                                                            paymentUrl = $rootScope.eTrakUrl + "/Booking/index?enqRef=" + enqRef + "&propertyId=" + $rootScope.prPropertyCode + "&templateID=" + $scope.selectedtemplate;
                                                        }

                                                        if ($scope.payNowStatus == "true") {
                                                            paymentUrl = $rootScope.TasUrl + "/payments?ttl=" + MakeEmptyStringWhenNull(enquiryDetails.enCDTitle) + "&fname=" + MakeEmptyStringWhenNull(enquiryDetails.enCDFirstName) + "&lname=" + MakeEmptyStringWhenNull(enquiryDetails.enCDLastName) + "&ph=" + MakeEmptyStringWhenNull(enquiryDetails.enCDTelephone1) + "&fax=" + MakeEmptyStringWhenNull(enquiryDetails.enCDFaxNo) + "&em=" + MakeEmptyStringWhenNull(enquiryDetails.enCDEmailAddress) + "&addr1=" + MakeEmptyStringWhenNull(enquiryDetails.enCDAddress1) + "&addr2=" + MakeEmptyStringWhenNull(enquiryDetails.enCDAddress2) + "&zip=" + MakeEmptyStringWhenNull(enquiryDetails.enCDPostCode) + "&cit=" + MakeEmptyStringWhenNull(enquiryDetails.enEDEnquiryCityName) + "&cntr=" + MakeEmptyStringWhenNull(enquiryDetails.enEDCountryName) + "&payref=" + propertiesList[i].prPropertyCode + ', eTrak ref: ' + enqRef + "&price=" + $rootScope.prRatePerNight + "&cur=" + $rootScope.prCurrency;
                                                        }

                                                        console.log("BookNow Template ID:" + $scope.bookNowtemplate);
                                                        if ($scope.bookNowStatus == "true") {
                                                            paymentUrl = $rootScope.eTrakUrl + "/Enquiries/BookProperty?propertyName=" + $rootScope.prName + "&propertyId=" + $rootScope.prPropertyCode + "&apartmentType=" + $rootScope.prApartmentType + "&templateID=" + $scope.bookNowtemplate + "&guestName=" + MakeEmptyStringWhenNull(enquiryDetails.enTRTitle) + " " + MakeEmptyStringWhenNull(enquiryDetails.enTRFirstName) + " " + MakeEmptyStringWhenNull(enquiryDetails.enTRLastName) + "&arrivalDate=" + enquiryDetails.enEDDateOfArrivalFormat + "&departureDate=" + enquiryDetails.enEDDepartureDateFormat + "&enqRef=" + enqRef + "&footerStatus=" + $scope.includeFooterSignatureForBookNow + "&userCode=" + userCode + "&token=" + $rootScope.Token;
                                                        }

                                                        var fullAddress = $.grep([$rootScope.prAddress1, $rootScope.prAddress2, $rootScope.prCity, $rootScope.prCountry, $rootScope.prPostCode], Boolean).join(", ");
                                                        console.log(fullAddress);
                                                        var propertyTemplateString = recentTemplate.substring(startIndex, endIndex);
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#PropertyId\#\#/gi, MakeEmptyStringWhenNull($rootScope.prPropertyCode));
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#PropertyName\#\#/gi, MakeEmptyStringWhenNull($rootScope.prName));
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#RealPropertyName\#\#/gi, MakeEmptyStringWhenNull($rootScope.prRealPropertyName));
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#Currency\#\#/gi, MakeEmptyStringWhenNull($rootScope.prCurrency));
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#CommissionIncluded\#\#/gi, MakeEmptyStringWhenNull($rootScope.prCommissionIncluded));
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#PropertyAddress\#\#/gi, MakeEmptyStringWhenNull(fullAddress));
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#PropertyApartmentType\#\#/gi, $rootScope.prApartmentType);
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#PropertyServices\#\#/gi, MakeEmptyStringWhenNull($rootScope.prLongDescription));
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#PropertyCancellationPolicy\#\#/gi, MakeEmptyStringWhenNull($rootScope.prCancellationPolicy));
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#OfferNote\#\#/gi, MakeEmptyStringWhenNull($rootScope.prOfferDetails));
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#TaxIncluded\#\#/gi, MakeEmptyStringWhenNull($rootScope.prTaxIncluded));
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#HeldUntilDate\#\#/gi, MakeEmptyStringWhenNull($rootScope.prHeldUntilDate) + (MakeEmptyStringWhenNull($rootScope.prHeldUntilUTC) == "" ? "" : " (" + $rootScope.prHeldUntilUTC + ")"));
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#PropertyTaxRates\#\#/gi, MakeEmptyStringWhenNull($rootScope.prTaxRate) + appendPercentile);
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#PropertyRatePerNight\#\#/gi, MakeEmptyStringWhenNull($rootScope.prRatePerNight) + appendZero);
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#TaxNotes\#\#/gi, MakeEmptyStringWhenNull($rootScope.prTaxNotes));
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#PropertyImage\#\#/gi, MakeEmptyStringWhenNull($rootScope.prPropertyImageUrl));
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#PropertyDetailsUrl\#\#/gi, MakeEmptyStringWhenNull($rootScope.prPropertyPopUpHTML));
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#ReservationsName\#\#/gi, MakeEmptyStringWhenNull($rootScope.reservationsName));
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#ReservationsPhone\#\#/gi, MakeEmptyStringWhenNull($rootScope.reservationsPhone));
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#ReservationsEmail\#\#/gi, MakeEmptyStringWhenNull($rootScope.reservationsEmail));
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#SalesAndMarketingName\#\#/gi, MakeEmptyStringWhenNull($rootScope.SMName));
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#SalesAndMarketingPhone\#\#/gi, MakeEmptyStringWhenNull($rootScope.SMPhone));
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#SalesAndMarketingEmail\#\#/gi, MakeEmptyStringWhenNull($rootScope.SMEmail));
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#Clientrequested\#\#/gi, $filter('date')($rootScope.prClientRequestedDate, 'dd-MMM-yyyy HH:mm') + (MakeEmptyStringWhenNull($rootScope.prUTCDateAdded) == "" ? "" : " (" + $rootScope.prUTCDateAdded + ")"));
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#Addedtoshortlist\#\#/gi, $filter('date')($rootScope.prDateAdded, 'dd-MMM-yyyy HH:mm') + (MakeEmptyStringWhenNull($rootScope.prUTCDateAdded) == "" ? "" : " (" + $rootScope.prUTCDateAdded + ")"));
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#PrivateNotes\#\#/gi, MakeEmptyStringWhenNull($rootScope.prPrivateNotes));
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#YourName\#\#/gi, MakeEmptyStringWhenNull($rootScope.prHolderName));
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#Yourintref\#\#/gi, MakeEmptyStringWhenNull($rootScope.prInternalReference));
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#TaxAppliedAllNights\#\#/gi, MakeEmptyStringWhenNull($rootScope.prTaxAppliedAllNights));
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#PropertyCancPolUrl\#\#/gi, $rootScope.eTrakUrl + "/Properties/CancellationPolicy/" + enquiryDetails.enCode + "/" + $rootScope.prPropertyCode + "/" + $rootScope.Token);
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#PropertyOfferNotesUrl\#\#/gi, $rootScope.eTrakUrl + "/Properties/OfferNotes/" + enquiryDetails.enCode + "/" + $rootScope.prPropertyCode + "/" + $rootScope.Token);
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#PropertyPrivateNotesUrl\#\#/gi, $rootScope.eTrakUrl + "/Properties/PrivateNotes/" + enquiryDetails.enCode + "/" + $rootScope.prPropertyCode + "/" + $rootScope.Token);
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#PropertyTaxNotesUrl\#\#/gi, $rootScope.eTrakUrl + "/Properties/TaxNotes/" + enquiryDetails.enCode + "/" + $rootScope.prPropertyCode + "/" + $rootScope.Token);
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#PropertyUrl\#\#/gi, paymentUrl);
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#PhoneNumber\#\#/gi, MakeEmptyStringWhenNull($rootScope.prTelephoneNumber));
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#PropertyTerminationPolicy\#\#/gi, $rootScope.prEarlyTerminationPolicy);
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#PropertySecurityDeposit\#\#/gi, $rootScope.prSecurityDeposit);
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#PropertyParking\#\#/gi, $rootScope.prParking);
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#PropertyPaymentTerms\#\#/gi, $rootScope.prPaymentTerms);
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#PropertyDepositPolicy\#\#/gi, $rootScope.prDepositPolicy);
                                                        propertyTemplateString = propertyTemplateString.replace(/\#\#PropertyChainName\#\#/gi, MakeEmptyStringWhenNull($rootScope.prChainName));

                                                        if (propertyTemplateString.includes("##PropertyImages") && $rootScope.prPropertyImageUrl.lastIndexOf("/") != -1 && $rootScope.imageValues && $rootScope.imageValues.length > 1) {
                                                            var index = $rootScope.prPropertyImageUrl.lastIndexOf("/") + 1;
                                                            var filename = $rootScope.prPropertyImageUrl.substr(index);
                                                            filename = filename.replace("_sm", "");
                                                            var filteredImages = [];
                                                            var imageLimit = 2;
                                                            let imageTag = "";
                                                            for (var m = 1; m < 30; m++) {
                                                                imageTag = "##PropertyImages" + m.toString() + "##";
                                                                if (propertyTemplateString.includes(imageTag)) {
                                                                    let filteredwithId = $rootScope.imageValues.filter((value) => value.id == $rootScope.prPropertyCode);
                                                                    if (filteredwithId) {
                                                                        filteredImages = filteredwithId[0].image.filter((image) => image.Name != filename)
                                                                        imageLimit = m;
                                                                    }
                                                                    break;
                                                                }
                                                            }
                                                            if (filteredImages.length > 1) {

                                                                let html = '';
                                                                html = html + '<table style="width: 560px;" cellspacing="0" cellpadding="0" border="0" align="left"> <tbody> <tr> <td style="padding-bottom: 10px;"> <table cellspacing="0" cellpadding="0" border="0" align="left"> <tbody>';
                                                                let rowCount = 0;
                                                                let totalCount = 1;
                                                                for (var image of filteredImages) {
                                                                    html = html + '';
                                                                    if (rowCount == 0) {
                                                                        html = html + '<tr>';
                                                                    }
                                                                    html = html + '<td style="padding: 3px;" bgcolor="#FFFFFF">';
                                                                    html = html + '<a href="' + image.src + '/' + image.name + '" target="_blank">'
                                                                    html = html + '<img src="' + image.src + '/' + image.name + '" alt="Property Image" style="display: block;" width="120" height="70" />'
                                                                    html = html + '</a> </td>'

                                                                    if (rowCount == 2 || filteredImages.length - 1 == totalCount || imageLimit == totalCount) {
                                                                        rowCount = 0;
                                                                        html = html + '</tr>';
                                                                        if (imageLimit == totalCount) {
                                                                            break;
                                                                        }
                                                                    } else {
                                                                        rowCount++;
                                                                    }
                                                                    totalCount++;
                                                                }

                                                                html = html + '</tbody> </table> </td> </tr> </tbody> </table>';
                                                                propertyTemplateString = propertyTemplateString.replace(imageTag, html);

                                                            }
                                                            else {
                                                                propertyTemplateString = propertyTemplateString.replace(imageTag, "");
                                                            }
                                                        }
                                                        else {
                                                            if (propertyTemplateString.includes("##PropertyImages")) {
                                                                let imageTag = "";
                                                                for (var m = 1; m < 30; m++) {
                                                                    imageTag = "##PropertyImages" + m.toString() + "##";
                                                                    if (propertyTemplateString.includes(imageTag)) {
                                                                        break;
                                                                    }
                                                                }
                                                                propertyTemplateString = propertyTemplateString.replace(imageTag, "");
                                                            }
                                                        }

                                                        if (propertyTemplateString.includes("##PropertyImporantToKnow##")) {
                                                            let html = '';
                                                            html = html + '<table style="width: 560px; " cellspacing="0" cellpadding="0" border="0" align="center"> <tbody> <tr> <td style="color: #333333; font-family: Arial,sans-serif; font-size: 12px; line-height: 20px;" align="left"> <p><b>Important To Know: </b><br /> <ul style="list-style:square">';
                                                            if ($rootScope.prKeyServices) {
                                                                let keyServices = $rootScope.prKeyServices.split(/[\n.]+/);
                                                                for (let keyService of keyServices) {
                                                                    html = html + '<li> ' + keyService + ' </li>';
                                                                }
                                                            }
                                                            else {
                                                                html = html + '<li> none </li>';
                                                            }

                                                            html = html + '</ul> </td> </tr> </tbody> </table >';
                                                            propertyTemplateString = propertyTemplateString.replace(/\#\#PropertyImporantToKnow\#\#/gi, html);
                                                        }
                                                        else {
                                                            propertyTemplateString = propertyTemplateString.replace(/\#\#PropertyImporantToKnow\#\#/gi, "");
                                                        }

                                                        if (propertyTemplateString.includes("##PropertyKeyHighlightsServicesIncluded##")) {
                                                            let html = '';
                                                            html = html + '<table style="width: 560px; " cellspacing="0" cellpadding="0" border="0" align="center"> <tbody> <tr> <td style="color: #333333; font-family: Arial,sans-serif; font-size: 12px; line-height: 20px;" align="left"> <p><b>Key Highlights & Services Included: </b><br /> <ul  style="list-style:disc">';
                                                            if ($rootScope.prImportantPoints) {
                                                                let notes = $rootScope.prImportantPoints.split(/[\n.]+/);
                                                                for (let note of notes) {
                                                                    html = html + '<li> ' + note + ' </li>';
                                                                }
                                                            }
                                                            else {
                                                                html = html + '<li> none </li>';
                                                            }
                                                            html = html + '</ul> </td> </tr> </tbody> </table >';
                                                            propertyTemplateString = propertyTemplateString.replace(/\#\#PropertyKeyHighlightsServicesIncluded\#\#/gi, html);
                                                        }
                                                        else {
                                                            propertyTemplateString = propertyTemplateString.replace(/\#\#PropertyKeyHighlightsServicesIncluded\#\#/gi, "");
                                                        }

                                                        if (propertyTemplateString.includes("##PropertyDistanceToNearbyStations##")) {
                                                            let html = '';
                                                            let filteredImages = $rootScope.imageValues.filter((value) => value.id == $rootScope.prPropertyCode);
                                                            if (filteredImages) {
                                                                $rootScope.prReferencePoints = filteredImages[0].referencePoints;
                                                            }
                                                            let list = '', markers = '&markers=size:mid%7Ccolor:red%7c' + $rootScope.prLat + ',' + $rootScope.prLong;
                                                            if ($rootScope.prReferencePoints && $rootScope.prReferencePoints.length > 0) {
                                                                for (let refPoint of $rootScope.prReferencePoints) {
                                                                    list = list + '<li> Distance to ' + refPoint.name + ' is approximately ' + refPoint.dist + 'km </li>';
                                                                    markers = markers + '&markers=size:mid%7Ccolor:blue%7c' + refPoint.lat + ',' + refPoint.lon;
                                                                }
                                                            }
                                                            else {
                                                                list = list + '<li> none </li>';
                                                            }
                                                            html = html + '<table style="width: 560px; " cellspacing="0" cellpadding="0" border="0" align="center"> <tbody> <tr> <td> ';

                                                            //html = html + ' <iframe src="https://www.google.com/maps/embed/v1/place?center=' + $rootScope.prLat + ',' + $rootScope.prLong + '&q=' + fullAddress.replace(/" "/gi, "+") + '&key=' + $rootScope.googleAPIKey+'"';
                                                            //html = html + 'width = "350" height = "250" frameborder = "0" style = "border:0;" allowfullscreen = "" aria-hidden="false" tabindex = "0" > </iframe ></td>';

                                                            html = html + '<img src="https://maps.googleapis.com/maps/api/staticmap?center=' + $rootScope.prLat + ',' + $rootScope.prLong + markers + '&key=' + $rootScope.googleAPIKey + '&size=350x250&maptype=roadmap"';
                                                            html = html + 'width = "350" height = "250" frameborder = "0" style = "border:0;" allowfullscreen = "" aria-hidden="false" tabindex = "0" > </iframe ></td>';

                                                            html = html + '<td style="vertical-align: baseline; color: #333333; font-family: Arial,sans-serif; font-size: 12px; line-height: 20px;" align="left"> <p><b>Distance to nearby stations: </b><br /> <ul>';
                                                            html = html + list;
                                                            html = html + '</ul> </td> </tr> </tbody> </table >';
                                                            propertyTemplateString = propertyTemplateString.replace(/\#\#PropertyDistanceToNearbyStations\#\#/gi, html);
                                                        }
                                                        else {
                                                            propertyTemplateString = propertyTemplateString.replace(/\#\#PropertyDistanceToNearbyStations\#\#/gi, "");
                                                        }

                                                        propertyTemplateString = propertyTemplateString.replace(/tasbeta.apartmentservice.com/gi, "v2.apartmentservice.com");
                                                        console.log('before result');

                                                        String.prototype.splice = function (idx, rem, str) {
                                                            return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
                                                        };
                                                        if (k == selectedProperties.length - 1) {
                                                            console.log("Before j=" + j + "Template=" + strTemplate);
                                                            strTemplate = recentTemplate.splice(endIndex - 1, 0, propertyTemplateString);
                                                            console.log("After j=" + j + "Template=" + strTemplate);
                                                        }
                                                        else {
                                                            console.log("Before j=" + j + "Template=" + strTemplate);
                                                            strTemplate = strTemplate.splice(endIndex - 1, 0, propertyTemplateString);
                                                            console.log("After j=" + j + "Template=" + strTemplate);
                                                        }

                                                        // additional tags to add images and map

                                                        // additional tags to add images and map ends here
                                                    }
                                                }
                                            }
                                            strTemplate = (remove(strTemplate, startIndex + 31, endIndex - startIndex - 31));
                                            var urlStartIndex = strTemplate.indexOf("https://forms.apartmentservice.com/forms/view.php?");
                                            var urlEndIndex = strTemplate.indexOf("--END_TAG--");
                                            if (urlStartIndex > 0 && urlEndIndex > 0) {
                                                getReplacedTemplate(strTemplate);
                                            } else {
                                                $scope.ETEmailBody = strTemplate;
                                                $(".ideMailOutput").code('<span style="font-family: Verdana;font-size: 14px;background-color: rgb(255, 255, 255);">' + strTemplate + '</scan>');
                                                $rootScope.emailBody = $(".ideMailOutput").code();
                                                $scope.$apply();
                                                $rootScope.IsBookNowTemplateType = "";
                                                $rootScope.templateType = "";
                                            }
                                        }
                                    }

                                    $rootScope.IsBookNowTemplateType = "";
                                    $rootScope.templateType = "";

                                    function remove(str, startIndex, count) {
                                        return str.substr(0, startIndex) + str.substr(startIndex + count);
                                    }
                                })
                                .catch(function (err) {
                                    console.log("Error Occured");
                                });
                        })
                        .catch(function (err) {
                            console.log("Error Occurred");
                        });
                }).catch(function (err) {
                    console.log("Error Occurred");
                });
        }

        $rootScope.emailConfirmationFuncion = function () {
            var emailBody = $rootScope.emailBody;
            var updatedEmailBody = $("#idemailoutput").code();
            console.log(emailBody);
            console.log("emailBody");
            console.log(updatedEmailBody);
            console.log("updatedEmailBody");
            if (emailBody !== updatedEmailBody) {
                console.log("content updated");
                $('#idConfirmationModal').modal('show');
            } else {
                console.log("not updated");
                $('#idCheckAvailability').modal('hide');
            }
        }

        $rootScope.closeEmailPopup = function () {
            $('#idConfirmationModal').modal('hide');
            $('#idCheckAvailability').modal('hide');
        }

        function getReplacedTemplate(strTemplate) {
            var urlStartIndex = strTemplate.indexOf("https://forms.apartmentservice.com/forms/view.php?");
            var urlEndIndex = strTemplate.indexOf("--END_TAG--");
            if (urlStartIndex > 0 && urlEndIndex > 0) {
                var templateFullUrl = strTemplate.substring(urlStartIndex, urlEndIndex + 11);
                enquiryDataService.getReducedUrl(strTemplate, templateFullUrl)
                    .success(function (response) {
                        strTemplate = response.StrTemplate;
                        var bookNowUrl = $rootScope.eTrakUrl + "/Booking/BookNow?refId=" + response.UrlReducer;
                        strTemplate = strTemplate.replace(response.OriginalUrl, MakeEmptyStringWhenNull(bookNowUrl));
                        getReplacedTemplate(strTemplate);
                    })
                    .catch(function (err) {
                        console.log("Error Occured");
                    });
            } else {
                $scope.ETEmailBody = strTemplate;
                $(".ideMailOutput").code('<span style="font-family: Verdana;font-size: 14px;background-color: rgb(255, 255, 255);">' + strTemplate + '</scan>');
                $rootScope.emailBody = $(".ideMailOutput").code();
                $scope.$apply();
                $rootScope.IsBookNowTemplateType = "";
                $rootScope.templateType = "";
            }
        }

        $scope.BookProperty = function (prPropertyCode) {
            var propertyCode = prPropertyCode;
            var enref = $rootScope.globalEnCode;
            var enquiryDetails = enquiryDataservice.getEnquiry(enqRef)
                .success(function (enquiry) {
                    var enquiryDetails = enquiry;
                    var enref = $rootScope.globalEnCode;
                    chosenPropertiesFactory.getaChosenProperty(enref, propertyCode)
                        .success(function (lowestRate) {
                            var ratePerNight = lowestRate[0].prRatePerNight;
                            var currency = lowestRate[0].prCurrency;
                            console.log(currency);
                            console.log(ratePerNight);
                            citiesService.getCityName(MakeZeroWhenNull(enquiryDetails.enEDCityCode))
                                .success(function (cityName) {
                                    var cityName = cityName;
                                    console.log(cityName);
                                    countriesService.getCountryName(MakeZeroWhenNull(enquiryDetails.enEDCountryCode))
                                        .success(function (enquiryCountry) {
                                            var countryName = enquiryCountry;
                                            console.log("country name" + countryName);
                                            var paymentUrl = $rootScope.TasUrl + "/payments?ttl=" + MakeEmptyStringWhenNull(enquiryDetails.enCDTitle) + "&fname=" + MakeEmptyStringWhenNull(enquiryDetails.enCDFirstName) + "&lname=" + MakeEmptyStringWhenNull(enquiryDetails.enCDLastName) + "&ph=" + MakeEmptyStringWhenNull(enquiryDetails.enCDTelephone1) + "&fax=" + MakeEmptyStringWhenNull(enquiryDetails.enCDFaxNo) + "&em=" + MakeEmptyStringWhenNull(enquiryDetails.enCDEmailAddress) + "&addr1=" + MakeEmptyStringWhenNull(enquiryDetails.enCDAddress1) + "&addr2=" + MakeEmptyStringWhenNull(enquiryDetails.enCDAddress2) + "&zip=" + MakeEmptyStringWhenNull(enquiryDetails.enCDPostCode) + "&cit=" + MakeEmptyStringWhenNull(cityName) + "&cntr=" + MakeEmptyStringWhenNull(countryName) + "&payref=" + prPropertyCode + ', eTrak ref: ' + enqRef + "&price=" + ratePerNight + "&cur=" + currency;
                                            console.log(paymentUrl);
                                            var myWindow = window.open(paymentUrl, "scrollbars=1,width=1000, height=1000");
                                        });
                                });
                        });
                });
        }


        function randomString(length) {
            var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

            if (!length) {
                length = Math.floor(Math.random() * chars.length);
            }

            var str = '';
            for (var i = 0; i < length; i++) {
                str += chars[Math.floor(Math.random() * chars.length)];
            }
            return str;
        }

        $scope.ViewCreditCardDetails = function (enCode, prCode, prFiveWinId) {
            console.log("enCode" + enCode + "prCode" + prCode + "prFiveWinId" + prFiveWinId);
            $scope.enCode = enCode;
            $scope.prCode = prCode;
            $scope.prFiveWinId = prFiveWinId;
            $scope.data = "";
            $('#idshowcardDetails').modal('show');
            $scope.details = false;
            $scope.key = true;
            $scope.footer = true;
            $scope.validationForCardDetails = false;
        };

        $scope.submitKey = function (enCode, prCode, data) {
            var cardDetails = {
                EnCode: enCode,
                PrCode: prCode,
                Data: data
            }
            console.log(cardDetails);
            chosenPropertiesFactory.getCreditCardDetails(cardDetails)
                .success(function (response) {
                    console.log("response");
                    console.log(response);
                    if (response !== "") {
                        $scope.key = false;
                        $scope.footer = false;
                        $scope.details = true;
                        $scope.validationForCardDetails = false;
                        $scope.ccDetails = angular.fromJson(response);
                        $scope.cardName = $scope.ccDetails[0];
                        $scope.cardHolderBillingAddress = $scope.ccDetails[1];
                        $scope.cardType = $scope.ccDetails[2];
                        $scope.cardNumber = $scope.ccDetails[3];
                        $scope.expiryDate = $scope.ccDetails[4];
                        $scope.securityCode = $scope.ccDetails[6] === "" ? $scope.ccDetails[5] : "";

                    } else {
                        $scope.data = "";
                        $scope.validationForCardDetails = true;
                    }
                });
        };
    };
})();
