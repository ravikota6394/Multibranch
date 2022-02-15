(function () {
    'use strict';

    var eTrakApp = angular.module('eTrakApp');

    // Email Templates
    eTrakApp.controller('R_EmailTemplates', [
        '$scope', '$rootScope', 'R_EnquiriesService', 'R_EmailTemplatesService', 'R_EmailApartmentVerificationsService', 'R_EnqSourcesService', 'R_LanguageCodesService', 'R_CitiesService', 'R_CountriesService', 'R_BudgetCategoriesService', 'R_ApartmentTypesService', 'R_PropertiesService', '$filter', '$state', 'logger', 'R_EmailStatusService',
        function ($scope, $rootScope, enquiryDataservice, emailTemplatesService, emailVerificationsService, enqSourcesService, languageCodesService, citiesService, countriesService, budgetCategoriesService, apartmentTypesService, chosenPropertiesFactory, $filter, $state, logger, emailStatusService) {

            $scope.isResteam = $("#IsResteamInEmails").val();
            console.log($scope.isResteam);
            $scope.ETEmailFrom = "etrak@apartmentservice.com";

            function getEmailTemplates() {
                emailTemplatesService.getEmailTemplates()
                    .success(function (emailTemplates) {
                        $scope.EmailTemplates = emailTemplates;
                        console.log($scope.EmailTemplates);
                    });
            };

            $rootScope.footerSignature = true;
            $rootScope.ReplyOrForwardEmailId = null;

            $rootScope.IncludeFooterSignature = function (footerSignature) {
                if (footerSignature == true) {
                    $rootScope.footerSignature = true;
                } else {
                    $rootScope.footerSignature = false;
                }
            }

            $rootScope.multipleToAddresses = [];

            $rootScope.OnOpen_ToAddresses = function () {
                $scope.DTEnquiry.enLastEmailSentTo = "";
            }

            $rootScope.OnClose_ToAddresses = function (toAddressesList) {
                $scope.toAddressesList = toAddressesList;
                var toAddresses = "";
                for (var i = 0; i < $scope.toAddressesList.length; i++) {
                    toAddresses = toAddresses + "," + $scope.toAddressesList[i].DisplayFrom;
                }
                toAddresses = (toAddresses[0] == ',') ? toAddresses.substr(1) : toAddresses;
                $scope.DTEnquiry.enLastEmailSentTo = toAddresses;
                console.log("toAddressesList");
                console.log(toAddressesList);
            }

            $rootScope.multipleCCAddresses = [];

            $rootScope.OnOpen_CCAddresses = function () {
                $scope.DTEnquiry.enLastEmailCCTo = "";
            }

            $rootScope.OnClose_CCAddresses = function (ccAddressesList) {
                $scope.ccAddressesList = ccAddressesList;
                var ccAddresses = "";
                for (var i = 0; i < $scope.ccAddressesList.length; i++) {
                    ccAddresses = ccAddresses + "," + $scope.ccAddressesList[i].DisplayFrom;
                }
                ccAddresses = (ccAddresses[0] == ',') ? ccAddresses.substr(1) : ccAddresses;
                $scope.DTEnquiry.enLastEmailCCTo = ccAddresses;
                console.log("ccAddresses");
                console.log(ccAddresses);
            }

            console.log("Email templates: " + $rootScope.TemplatesPresent);

            function getEmailTemplatesByTypeOfTemplate() {
                var enqRef = "";
                if (document.getElementById('idglbCurrentEnquiryRef') != null) {
                    enqRef = document.getElementById('idglbCurrentEnquiryRef').value;
                }
                console.log(enqRef);
                emailTemplatesService.getEmailTemplatesByTypeOfTemplate(enqRef)
                    .success(function (emailTemplates) {
                        $rootScope.EmailTemplatesByTemplateType = emailTemplates;
                        console.log("Templates:");
                        console.log($rootScope.EmailTemplatesByTemplateType);
                    });
            };

            $scope.IncludeBookerTemplates = function (glbCurrentEnquiryRef) {
                var id = document.getElementById("isBookingTemplatesSelected");
                emailTemplatesService.getBookingConfirmation(glbCurrentEnquiryRef).success(function (emailTemplates) {
                    if (id.checked) {
                        $rootScope.EmailTemplatesByTemplateType = emailTemplates;
                        console.log("Booking Confirmation Templates:");
                        console.log($rootScope.EmailTemplatesByTemplateType);
                    } else {
                        emailTemplatesService.getEmailTemplatesByTypeOfTemplate(glbCurrentEnquiryRef)
                            .success(function (emailTemplates) {
                                $rootScope.EmailTemplatesByTemplateType = emailTemplates;
                                console.log("Templates:");
                                console.log($rootScope.EmailTemplatesByTemplateType);
                            });
                    }

                });
            }

            if ($rootScope.TemplatesPresent == undefined || $rootScope.TemplatesPresent == "No") {
                getEmailTemplatesByTypeOfTemplate();
            }

            $rootScope.GetSelectedEmailTemplate = function (templateValue) {
                console.log(templateValue);
                var template = [];
                templateValue = templateValue.split('-');
                template.push(templateValue.shift().trim());
                template.push(templateValue.join('-').trim());
                console.log(template);
                $rootScope.emailTemplateId = template[0];
                console.log($rootScope.emailTemplateId);
                $rootScope.ETEmailSubject = template[1];
                etImportTemplateSubject($rootScope.ETEmailSubject);
                if (MakeEmptyStringWhenNull(template[1]) != "") {
                    $rootScope.ETEmailSubject = template[1].replace(/\#\#EnquiryRef\#\#/gi, $scope.glbCurrentEnquiryRef);
                }
                console.log($rootScope.ETEmailSubject);
            }

            function etImportTemplateSubject(subject) {
                enquiryDataservice.getAllEnquiryDetails($scope.glbCurrentEnquiryRef).success(function (enquiryDetails) {
                    //Client related tags
                    console.log("email subject in importing template subject is: " + subject);
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

            function getParentAttachments(emailId) {
                emailStatusService.GetAttachmentsPath(emailId)
                    .success(function (response) {
                        $rootScope.replyOrForwardFiles = angular.fromJson(response);
                        if ($rootScope.replyOrForwardFiles && $rootScope.replyOrForwardFiles.length > 0) {
                            for (var i = 0; i < $rootScope.replyOrForwardFiles.length; i++) {
                                $rootScope.replyOrForwardFiles[i].Id = null;
                             // $rootScope.replyOrForwardFiles[i].Name = $rootScope.replyOrForwardFiles[i].PhysicalFilePath.substring($rootScope.replyOrForwardFiles[i].PhysicalFilePath.lastIndexOf('/') + 1);
                                $rootScope.replyOrForwardFiles[i].Name = $rootScope.replyOrForwardFiles[i].PhysicalFileName;
                                console.log("attachment name: " + $rootScope.replyOrForwardFiles[i].Name);
                            }
                        }
                    }).error(function (err) {
                        console.log(err);
                    });
            }

            $rootScope.ReplyToEmail = function (email, subject, body, emailTo, emailCc, emailBcc, emailReceived, emailId) {
                $scope.DTEnquiry.enLastEmailSentTo = "";
                $scope.DTEnquiry.enLastEmailCCTo = "";
                $rootScope.TemplatesPresent = "Yes";
                $rootScope.ReplyOrForwardEmailId = emailId;
                if (emailCc.trim() !== '') {
                    $scope.Cc = emailCc.replace(";", ",");
                } else {
                    $scope.Cc = "";
                }
                $rootScope.subject = subject;
                $rootScope.body = body;
                console.log($rootScope.email);
                console.log($rootScope.subject);
                console.log($rootScope.body);
                $rootScope.DTEnquiry.enLastEmailSentTo = email;
                $rootScope.DTEnquiry.enLastEmailCCTo = $scope.Cc;
                $rootScope.emailToAddress = email;
                $rootScope.emailCcAddress = $scope.Cc;
                $rootScope.ETEmailSubject = subject;
                $rootScope.received = moment(emailReceived).format('DD-MMM-YYYY, hh:mm:ss');

                $scope.emailInfo = "<b> From: </b>" + email +
                    "<br/> <b> Sent: </b>" + $rootScope.received + " UTC" +
                    "<br/> <b> To: </b>" + emailTo +
                    "<br/> <b> Subject: </b>" + subject;
                $rootScope.body = "<br/><br/>" + $scope.emailInfo + "<br/>" + body;

                getParentAttachments($rootScope.ReplyOrForwardEmailId);

                emailTemplatesService.getTemplatesForReply($scope.DTEnquiry.enCode)
                    .success(function (templates) {
                        $rootScope.repliedTemplates = angular.fromJson(templates);
                        console.log($rootScope.repliedTemplates);
                        $rootScope.EmailTemplatesByTemplateType = "";
                        $rootScope.EmailTemplatesByTemplateType = $rootScope.repliedTemplates;
                        console.log($rootScope.EmailTemplatesByTemplateType);
                        $state.go("detailsTab.emails", { enqRef: $scope.DTEnquiry.enCode });
                        $(".ideMailOutput").code('<span style="font-family: Verdana;font-size: 14px;background-color: rgb(255, 255, 255);">' + $rootScope.body + '</scan>');
                        $scope.$apply();
                        $rootScope.globalEmailBody = "";
                        $("#emailPopup").modal("hide");
                        $("#oldEmailPopup").modal("hide");
                        $("#emailreceived").modal("hide");
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                    });
            }

            $rootScope.ForwardEmail = function (emailFrom, subject, body, emailReceived, emailTo, emailId) {
                $rootScope.emailToAddress = "";
                $rootScope.emailCcAddress = "";
                $rootScope.TemplatesPresent = "Yes";
                $rootScope.ReplyOrForwardEmailId = emailId;
                $rootScope.received = moment(emailReceived).format('DD-MMM-YYYY, hh:mm:ss');

                $scope.emailInfo = "<b> From: </b>" + emailFrom +
                    "<br/> <b> Sent: </b>" + $rootScope.received + " UTC" +
                    "<br/> <b> To: </b>" + emailTo +
                    "<br/> <b> Subject: </b>" + subject;
                $rootScope.body = "<br/><br/>" + $scope.emailInfo + "<br/>" + body;

                $rootScope.email = emailFrom;
                console.log("body: ");
                console.log($rootScope.body);
                $rootScope.subject = "Fwd: " + subject;
                $rootScope.ETEmailSubject = "Fwd: " + subject;

                getParentAttachments($rootScope.ReplyOrForwardEmailId);

                emailTemplatesService.getTemplatesForReply($scope.DTEnquiry.enCode)
                    .success(function (templates) {
                        $rootScope.repliedTemplates = angular.fromJson(templates);
                        console.log($rootScope.repliedTemplates);
                        $rootScope.EmailTemplatesByTemplateType = "";
                        $scope.DTEnquiry.enLastEmailSentTo = "";
                        $scope.DTEnquiry.enLastEmailCCTo = "";
                        $rootScope.EmailTemplatesByTemplateType = $rootScope.repliedTemplates;
                        console.log($rootScope.EmailTemplatesByTemplateType);
                        $state.go("detailsTab.emails", { enqRef: $scope.DTEnquiry.enCode });
                        $(".ideMailOutput").code('<span style="font-family: Verdana;font-size: 14px;background-color: rgb(255, 255, 255);">' + $rootScope.body + '</scan>');
                        $scope.$apply();
                        $rootScope.globalEmailBody = "";
                        $("#emailPopup").modal("hide");
                        $("#oldEmailPopup").modal("hide");
                        $("#emailreceived").modal("hide");
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                    });
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

            function MakeEmptyStringWhenNull(value) {
                if (value == null) {
                    value = "";
                }
                else if (value == "undefined") {
                    value = "";
                }
                else if (value == undefined) {
                    value = "";
                }
                else if (value == "null") {
                    value = "";
                }
                else {
                    value = value;
                }
                return value;
            }

            $rootScope.files = [];
            $rootScope.replyOrForwardFiles = [];

            $scope.getFileDetails = function (e) {
                $scope.$apply(function () {
                    // STORE THE FILE OBJECT IN AN ARRAY.
                    for (var i = 0; i < e.files.length; i++) {
                        $rootScope.files.push(e.files[i])
                    }
                    console.log($rootScope.files);
                });
            };

            $rootScope.RemoveFile = function (index) {
                $rootScope.files.splice(index, 1);
                console.log($rootScope.files);
            }

            $rootScope.RemoveAttachmentFile = function (index) {
                $rootScope.replyOrForwardFiles.splice(index, 1);
            }

            getEmailTemplates();

            function getQueryFailed() {
                logger.Error("Cannot find the template");
                return;
            }

            var currentEmailLocale = "en-GB";

            // Import the email Template into ideMailOutput / DTEnquiry.enLastTemplateChosen
            $scope.ETImportTemplate = function () {
                //var templateID = $scope.DTEnquiry.enLastTemplateChosen;
                $rootScope.typeOfTemplate = "Emails Tab";
                var templateID = $rootScope.emailTemplateId;
                var timeout = setTimeout(function () {
                    var promiseGet = emailTemplatesService.getATemplate(templateID)
                        .then(getEmailLocale)
                        .catch(getQueryFailed);
                }, 50);
                //document.getElementById("emailPreview").disabled = false;
                return;
            };

            function getEmailLocale(ret) {
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
                var enqRef = "";
                if (document.getElementById('idglbCurrentEnquiryRef') != null) {
                    enqRef = document.getElementById('idglbCurrentEnquiryRef').value;
                }

                enquiryDataservice.getAllEnquiryDetails(enqRef)
                    .success(function (enquiryDetails) {
                        var enquiryDetails = enquiryDetails;
                        console.log(enquiryDetails);
                        console.log("enquiryDetails");
                        if (currentEmailLocale == null || currentEmailLocale == "") {
                            currentEmailLocale = "en-GB";
                        }

                        var strTemplate = ret.data.etTemplate;
                        console.log("Template" + strTemplate);

                        //////Replace Generic tags in Template///////////////

                        emailTemplatesService.getGenericTemplate(strTemplate)
                            .success(function (emailtemplatestring) {
                                emailTemplatesService.replaceClientVariables(emailtemplatestring, enqRef)
                                    .success(function (templatestring) {
                                        strTemplate = templatestring;
                                        console.log(strTemplate);

                                        var strContactPersonName = $rootScope.contactPersonName;
                                        if (MakeEmptyStringWhenNull(strContactPersonName) == "") {
                                            strContactPersonName = "Partner";
                                        }
                                        console.log(strContactPersonName);

                                        console.log($rootScope.footerSignature);
                                        console.log($rootScope.footerTemplate);
                                        if ($rootScope.footerSignature == true) {
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
                                        strTemplate = strTemplate.replace(/\#\#SpecificApartment\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDSpecificApartment));
                                        strTemplate = strTemplate.replace(/\#\#EnquiryCountry\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDCountryName));
                                        strTemplate = strTemplate.replace(/\#\#EnquiryCity\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDEnquiryCityName));
                                        strTemplate = strTemplate.replace(/\#\#EnquiryCorrectedCity\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDCorrectedCityName));
                                        //strTemplate = strTemplate.replace(/\#\#EnquiryClosedDate\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enECCloseDateFormat));
                                        strTemplate = strTemplate.replace(/\#\#ArrivalDate\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDDateOfArrivalFormat));
                                        strTemplate = strTemplate.replace(/\#\#DepartureDate\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDDepartureDateFormat));
                                        
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
                                        strTemplate = strTemplate.replace(/\#\#TermsandConditions\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.termsAndConditionsOut));
                                        strTemplate = strTemplate.replace(/\#\#Gdpr\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.gdprOut));

                                        //Enquiry Closure Tags       
                                        strTemplate = strTemplate.replace(/\#\#CountyOrState\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDState));
                                        strTemplate = strTemplate.replace(/\#\#SantaFeBudgetAmount\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enSfBudgetAmount));
                                        strTemplate = strTemplate.replace(/\#\#SantaFeAssigneeOfficeAddress\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enSfAssigneeOfficeAddress));
                                        strTemplate = strTemplate.replace(/\#\#SantaFeInvoiceEmail\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enSfInvoiceEmail));
                                        strTemplate = strTemplate.replace(/\#\#SantaFeInvoiceAddress\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enSfInvoiceAddress));
                                        strTemplate = strTemplate.replace(/\#\#SantaFeOfficeAddress\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enSfOfficeAddress));

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
                                        strTemplate = strTemplate.replace(/\#\#PrimarySalutation\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enPrimarySalutation));
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
                                        strTemplate = strTemplate.replace(/\#\#BudgetCurrency\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.currencyName));
                                        strTemplate = strTemplate.replace(/\#\#BudgetAmount\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enEDBudgetAmount));
                                        console.log(enquiryDetails.currencyName);
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

                                        //$rootScope.pageName = randomString(50);
                                        $rootScope.globalLandlordLandingPage = $rootScope.eTrakUrl + "/LandlordEmail/index?PageName=" + $rootScope.pageName + "#/";
                                        strTemplate = strTemplate.replace(/\#\#Salutation\#\#/gi, MakeEmptyStringWhenNull(enquiryDetails.enPrimarySalutation));
                                        strTemplate = strTemplate.replace(/\#\#LandlordsName\#\#/gi, $rootScope.globalLandlordsName);
                                        strTemplate = strTemplate.replace(/\#\#ApartmentVerificationPage\#\#/gi, $rootScope.globalLandlordLandingPage);

                                        //-----------------------------------------------------------------------
                                        //logger.info('Template sucessfully Parsed ');                    

                                        if (strTemplate.indexOf("<!--START_PROPERTY_ROW_MARKER-->") != -1 && strTemplate.indexOf("<!--END_PROPERTY_ROW_MARKER-->") != -1) {
                                            chosenPropertiesFactory.getProposalProperties(enqRef, 1)
                                                .success(function (chosenProperties) {
                                                    $rootScope.propertyDetails = chosenProperties;
                                                    console.log("$rootScope.propertyDetails");
                                                    console.log($rootScope.propertyDetails);
                                                    var recentTemplate = strTemplate;

                                                    var startIndex = recentTemplate.indexOf("<!--START_PROPERTY_ROW_MARKER-->");
                                                    var endIndex = recentTemplate.indexOf("<!--END_PROPERTY_ROW_MARKER-->");


                                                    var propertiesList = $rootScope.propertyDetails;
                                                    console.log("propertiesList");
                                                    console.log(propertiesList);
                                                    console.log($rootScope.propertyDetails.length);

                                                    var selectedProperties = "";

                                                    selectedProperties = propertiesList;
                                                    console.log(selectedProperties);


                                                    console.log(selectedProperties);

                                                    for (var k = selectedProperties.length - 1; k >= 0; k--) {
                                                        var i = propertiesList.length - 1;
                                                        for (var j = 0; j < propertiesList.length; j++ , i--) {
                                                            console.log("Selected property");
                                                            console.log(selectedProperties[k].prPropertyCode);
                                                            console.log(propertiesList[i].prPropertyCode);

                                                            if (selectedProperties[k].prPropertyCode == propertiesList[i].prPropertyCode) {

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
                                                                $rootScope.prCurrency = propertiesList[i].Currency;
                                                                $rootScope.prCommissionIncluded = propertiesList[i].prCommissionIncluded;
                                                                $rootScope.prOfferDetails = propertiesList[i].prOfferDetails;
                                                                $rootScope.prTaxNotes = propertiesList[i].prTaxNotes;
                                                                $rootScope.prCity = propertiesList[i].prCity;
                                                                $rootScope.prCountry = propertiesList[i].prCountry;
                                                                $rootScope.prTelephoneNumber = propertiesList[i].prTelephoneNumber;
                                                                $rootScope.prChainName = propertiesList[i].prChainName;

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
                                                                    paymentUrl = $rootScope.eTrakUrl + "/Enquiries/DocuSignBook?shortlistPropertyId=" + $rootScope.prID + "&token=" + $rootScope.Token;
                                                                }

                                                                if ($scope.payNowStatus == "true") {
                                                                    paymentUrl = $rootScope.TasUrl + "/payments?ttl=" + MakeEmptyStringWhenNull(enquiryDetails.enCDTitle) + "&fname=" + MakeEmptyStringWhenNull(enquiryDetails.enCDFirstName) + "&lname=" + MakeEmptyStringWhenNull(enquiryDetails.enCDLastName) + "&ph=" + MakeEmptyStringWhenNull(enquiryDetails.enCDTelephone1) + "&fax=" + MakeEmptyStringWhenNull(enquiryDetails.enCDFaxNo) + "&em=" + MakeEmptyStringWhenNull(enquiryDetails.enCDEmailAddress) + "&addr1=" + MakeEmptyStringWhenNull(enquiryDetails.enCDAddress1) + "&addr2=" + MakeEmptyStringWhenNull(enquiryDetails.enCDAddress2) + "&zip=" + MakeEmptyStringWhenNull(enquiryDetails.enCDPostCode) + "&cit=" + MakeEmptyStringWhenNull(enquiryDetails.enEDEnquiryCityName) + "&cntr=" + MakeEmptyStringWhenNull(enquiryDetails.enEDCountryName) + "&payref=" + propertiesList[i].prPropertyCode + ', eTrak ref: ' + enqRef + "&price=" + $rootScope.prRatePerNight + "&cur=" + $rootScope.prCurrency;
                                                                }

                                                                console.log("BookNow Template ID:" + $scope.bookNowtemplate);
                                                                if ($scope.bookNowStatus == "true") {
                                                                    paymentUrl = $rootScope.eTrakUrl + "/Enquiries/BookProperty?propertyName=" + $rootScope.prName + "&propertyId=" + $rootScope.prPropertyCode + "&apartmentType=" + $rootScope.prApartmentType + "&templateID=" + $scope.bookNowtemplate + "&guestName=" + enquiryDetails.enPrimaryContactName.replace('/', '') + "&arrivalDate=" + enquiryDetails.enEDDateOfArrivalFormat + "&departureDate=" + enquiryDetails.enEDDepartureDateFormat + "&enqRef=" + enqRef + "&footerStatus=" + $scope.includeFooterSignatureForBookNow + "&userCode=" + userCode + "&token=" + $rootScope.Token;
                                                                }

                                                                var fullAddress = $.grep([$rootScope.prAddress1, $rootScope.prAddress2, $rootScope.prCity, $rootScope.prCountry], Boolean).join(", ");
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
                                                                propertyTemplateString = propertyTemplateString.Replace(/\#\#PropertyTerminationPolicy\#\#/gi, $rootScope.prEarlyTerminationPolicy);
                                                                propertyTemplateString = propertyTemplateString.Replace(/\#\#PropertySecurityDeposit\#\#/gi, $rootScope.prSecurityDeposit);
                                                                propertyTemplateString = propertyTemplateString.Replace(/\#\#PropertyParking\#\#/gi, $rootScope.prParking);
                                                                propertyTemplateString = propertyTemplateString.Replace(/\#\#PropertyPaymentTerms\#\#/gi, $rootScope.prPaymentTerms);
                                                                propertyTemplateString = propertyTemplateString.Replace(/\#\#PropertyDepositPolicy\#\#/gi, $rootScope.prDepositPolicy);
                                                                propertyTemplateString = propertyTemplateString.replace(/\#\#PropertyChainName\#\#/gi, MakeEmptyStringWhenNull($rootScope.prChainName));

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
                                                            }
                                                        }
                                                    }
                                                    strTemplate = (Remove(strTemplate, startIndex + 31, endIndex - startIndex - 31));
                                                });
                                        }
                                        $scope.ETEmailBody = strTemplate;
                                        $scope.$apply();
                                        $rootScope.globalEmailBody = strTemplate;

                                        console.log($rootScope.body);
                                        if ($rootScope.body === undefined) {
                                            $(".ideMailOutput").code('<span style="font-family: Verdana;font-size: 14px;background-color: rgb(255, 255, 255);">' + strTemplate + '</span>');
                                            $scope.$apply();
                                        }
                                        else {
                                            $(".ideMailOutput").code('<span style="font-family: Verdana;font-size: 14px;background-color: rgb(255, 255, 255);">' + strTemplate + "<br/>------------------------ " + $rootScope.body + '</span>');
                                            $scope.$apply();
                                        }
                                        function Remove(str, startIndex, count) {
                                            return str.substr(0, startIndex) + str.substr(startIndex + count);
                                        }
                                    })
                                    .catch(function (err) {
                                        console.log("Error Occurred");
                                    });
                            })
                            .catch(function (err) {
                                console.log("Error Occurred");
                            });
                    }).catch(function (err) {
                        console.log("Error Occurred");
                    });
            }

            $scope.HideModal = function () {
                var clearFile = $("#clearFile");
                clearFile.replaceWith(clearFile = clearFile.clone(true));
                $('#idManualAcknowledgement').modal('hide');
                $('#idCheckAvailability').modal('hide');
                $rootScope.files = [];
            }

            Date.prototype.addHours = function (h) {
                this.setTime(this.getTime() + (h * 60 * 60 * 1000));
                return this;
            }

            function setTheNextActionDateTime() {
                $rootScope.DTEnquiry.enProgress = 30;
                $rootScope.DTEnquiry.enEDProgressWord = 'Actioned';
                $rootScope.DTEnquiry.enEDProgressCSS = 'label-info';
                $rootScope.DTEnquiry.enEDDayLastActioned = $filter('date')(new Date(), 'dd').replace(/^0+/, '');
                $rootScope.DTEnquiry.enEDMonthLastActioned = $filter('date')(new Date(), 'MM').replace(/^0+/, '');
                $rootScope.DTEnquiry.enEDYearLastActioned = $filter('date')(new Date(), 'yyyy');
                $rootScope.DTEnquiry.enEDLastTimeActioned = $filter('date')(new Date(), 'HH:mm');
                $rootScope.DTEnquiry.enEDDayNextActioned = $filter('date')(new Date().addHours(2), 'dd').replace(/^0+/, '');
                $rootScope.DTEnquiry.enEDMonthNextActioned = $filter('date')(new Date().addHours(2), 'MM').replace(/^0+/, '');
                $rootScope.DTEnquiry.enEDYearNextActioned = $filter('date')(new Date().addHours(2), 'yyyy');
                $rootScope.DTEnquiry.enEDNextTimeActioned = $filter('date')(new Date().addHours(2), 'HH:mm');
            }

            function MakeEmptyStringWhenNull(value) {
                if (value == null) {
                    value = "";
                }
                else if (value == "undefined") {
                    value = "";
                }
                else if (value == "null") {
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

            $rootScope.ETEmailPreview = function () {


                var strTemplate = $("#idemailoutput").code();

                emailTemplatesService.getGenericTemplate(strTemplate).success(function (templatestring) {
                    strTemplate = templatestring;

                    console.log("updated body: " + templatestring);
                    $scope.preview = "TEST";
                    console.log("preview: " + $scope.preview);

                    $("#previewModalBodyId").html(templatestring);
                    $('#id_templatePreview').modal('show');
                });


                console.log("Enqref: " + $scope.glbCurrentEnquiryRef);
                console.log("Body: " + $("#idemailoutput").code());


            }

            // Send Email
            $rootScope.ETSendEmail = function () {

                console.log("typeOfTemplate: " + $rootScope.typeOfTemplate);
                if (MakeEmptyStringWhenNull($rootScope.linkSent) == "") {
                    $rootScope.linkSent = false;
                }

                console.log("Link Sent: " + $rootScope.linkSent);
                setTheNextActionDateTime();
                var userCode = document.getElementById("userCode").value;
                console.log(userCode);
                var user = document.getElementById("divUserCode").value;

                console.log("Template Id for entering the Apartment Verification record");
                console.log($rootScope.templateIdForApartmentVerification);
                var emailTemplateUsed = $rootScope.templateIdForApartmentVerification;
                console.log(emailTemplateUsed);

                var emailValidation = /^([\w\'-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,}|[0-9]{1,3}|([\w]{2,}))(\]?)$/;

                console.log("toAddresses: " + $scope.DTEnquiry.enLastEmailSentTo);
                var toAddresses = $scope.DTEnquiry.enLastEmailSentTo;

                if (toAddresses != null) {
                    if (MakeEmptyStringWhenNull(toAddresses) != "") {
                        toAddresses = toAddresses.replace(';', ',');
                    }
                    var toAddresses_Array = toAddresses.split(',');

                    for (var i = 0; i < toAddresses_Array.length; i++) {
                        if (!emailValidation.test(toAddresses_Array[i]) || toAddresses_Array[i] === undefined || toAddresses_Array[i] === '') {
                            alert("The email TO field must be filled in with a valid email address");
                            return;
                        };
                    }
                }

                console.log("toCCAddresses: " + $scope.DTEnquiry.enLastEmailCCTo);
                var toCCAddresses = $scope.DTEnquiry.enLastEmailCCTo;
                if (toCCAddresses != null) {

                    if (MakeEmptyStringWhenNull(toCCAddresses) != "") {
                        toCCAddresses = toCCAddresses.replace(';', ',');
                    }
                    var toCCAddresses_Array = toCCAddresses.split(',');
                    for (var i = 0; i < toCCAddresses_Array.length; i++) {
                        console.log(toCCAddresses_Array[i]);
                        if (!emailValidation.test(toCCAddresses_Array[i]) && toCCAddresses_Array[i] != '') {
                            alert("The email CC field must be filled in with a valid email address");
                            return;
                        };
                    }
                }

                console.log("Subject in Emails tab: " + $("#id_ETSubject").val());

                $scope.ETEmailSubject = $("#id_ETSubject").val();
                if ($scope.ETEmailSubject === undefined || $scope.ETEmailSubject === '') {
                    alert("The SUBJECT field must be not be empty");
                    return;
                }

                if ($scope.ETEmailFrom === undefined || $scope.ETEmailFrom === '') {
                    alert("The email FROM field must be filled in with a vaid email address");
                    return;
                }

                document.getElementById("id_sendEmail").disabled = true;
                console.log($rootScope.isResteamShortlist);
                if ($scope.isResteam == "true" || $rootScope.isResteamShortlist == "true") {
                    $scope.ETEmailFrom = $("#idETEmailFrom").val();
                }
                console.log($scope.ETEmailFrom);

                $rootScope.isResteamShortlist = "";

                var tempBody = $("#idemailoutput").code();
                tempBody = tempBody.replace(/[']+/g, '');
                console.log("Html");
                console.log($("#idemailoutput").code());
                console.log("Selected Files" + $rootScope.files);
                console.log($rootScope.files.length);

                var attachmentsCount = $rootScope.files.length + ($rootScope.replyOrForwardFiles ? $rootScope.replyOrForwardFiles.length : 0);

                if (!$scope.ETEmailSubject.includes("ENQ: #<" + $scope.glbCurrentEnquiryRef + "># ")) {
                    $scope.ETEmailSubject = "ENQ: #<" + $scope.glbCurrentEnquiryRef + "># " + $scope.ETEmailSubject;
                }

                var newValue = {
                    seFrom: $scope.ETEmailFrom,
                    seDisplayTo: $scope.DTEnquiry.enLastEmailSentTo,
                    seTo: $scope.DTEnquiry.enLastEmailSentTo,
                    seCC: $scope.DTEnquiry.enLastEmailCCTo,
                    seSubject: $scope.ETEmailSubject,
                    seBody: tempBody,
                    seEnquiryRef: $scope.glbCurrentEnquiryRef,
                    seDraft: 0,
                    seActionRequired: 1,
                    seUserAssigned: $scope.DTEnquiry.enEDUserAssigned,
                    seDateSent: (new Date()).toJSON(),
                    seAttachments: attachmentsCount
                }

                var parentMailAttachmentBlobPaths = [];
                if ($rootScope.ReplyOrForwardEmailId && $rootScope.replyOrForwardFiles && $rootScope.replyOrForwardFiles.length > 0) {
                    for (var i = 0; i < $rootScope.replyOrForwardFiles.length; i++) {
                        parentMailAttachmentBlobPaths.push($rootScope.replyOrForwardFiles[i].PhysicalFileName);
                    }
                }

                console.log($rootScope.priorityStatus);
                console.log("newValue");
                console.log(newValue);
                emailTemplatesService.createEmail(newValue, userCode, $rootScope.priorityStatus, $rootScope.linkSent, $rootScope.typeOfTemplate, parentMailAttachmentBlobPaths)
                    .success(function (emailSentRecord) {
                        console.log($scope.ETEmailSubject);

                        if ($rootScope.typeOfTemplate == "Check Availability") {
                            //Google Analytics
                            ga('send', 'event', 'Shortlists Tab', 'Sent Check Availability', 'for PropertyId: ' + $scope.globalPropertyID + ' in enquiry ' + $scope.glbCurrentEnquiryRef + ' by ' + userCode);
                        }
                        if ($rootScope.typeOfTemplate == "Generate Proposal") {
                            //Google Analytics
                            ga('send', 'event', 'Shortlists Tab', 'Sent Generate Proposal', 'for enquiry ' + $scope.glbCurrentEnquiryRef + ' by ' + userCode);
                        }
                        if ($rootScope.typeOfTemplate == "Emails Tab") {
                            //Google Analytics
                            ga('send', 'event', 'Emails Tab', 'Sent Mail', 'With Subject ' + '"' + $scope.ETEmailSubject + '" ' + 'for enquiry ' + $scope.glbCurrentEnquiryRef + ' by ' + userCode);
                        }
                        if ($rootScope.typeOfTemplate == "Book Now") {
                            //Google Analytics
                            ga('send', 'event', 'Shortlists Tab', 'Sent Link', 'With Subject ' + '"' + $scope.ETEmailSubject + '" ' + 'for enquiry ' + $scope.glbCurrentEnquiryRef + ' by ' + userCode);
                        }

                        $rootScope.emailSentRecordId = emailSentRecord.ID;
                        console.log($rootScope.emailSentRecordId);
                        console.log("Selected Files" + $rootScope.files);

                        if ($rootScope.files != undefined) {
                            for (var i = 0; i < $rootScope.files.length; i++) {
                                var xhr = new XMLHttpRequest();
                                var fd = new FormData();
                                fd.append("attachFile", $rootScope.files[i]);
                                xhr.open("POST", "/EnquiryFileUpload/SaveAttachedFilePath?emailSentRecordId=" + $rootScope.emailSentRecordId, true);
                                xhr.send(fd);
                                xhr.addEventListener("load", function (event) {
                                    console.log(event.target.response);
                                    if (event.target.response == "success") {
                                    }
                                    else if (event.target.response == "Please select a file") {
                                    }
                                }, false);
                            }
                        }
                        $rootScope.files = [];
                        $rootScope.replyOrForwardFiles = [];

                    }).then(emailAddSucceeded).catch(emailAddFailed);

                function emailAddFailed() {
                    logger.error('FAILED to ADD NEW Email');
                    var clearFile = $("#clearFile");
                    clearFile.replaceWith(clearFile = clearFile.clone(true));
                    $('#idCheckAvailability').modal('hide');
                }

                function emailAddSucceeded() {
                    $rootScope.templateIdForApartmentVerification = "";
                    console.log("After Email Send Succeded: " + emailTemplateUsed);
                    emailTemplatesService.getTemplateTypeById(emailTemplateUsed)
                        .success(function (templateType) {
                            $scope.etTemplateType = angular.fromJson(templateType);
                            console.log($scope.etTemplateType);
                            if ($scope.etTemplateType == null) {
                                $scope.etTemplateType = "";
                            }
                            console.log($scope.etTemplateType);
                            if (($scope.etTemplateType).toUpperCase().trim() == "CHECK AVAILABILITY") {
                                ETApartmentVerificationPage(emailTemplateUsed);
                            }
                        });
                    $('#idpopup').modal('show');
                    if ($rootScope.typeOfTemplate === "Emails Tab") {
                        $scope.DTEnquiry.enLastEmailSentTo = "";
                        $scope.DTEnquiry.enLastEmailCCTo = "";
                        $scope.DTEnquiry.ETEmailSubject = "";
                        $scope.DTEnquiry.enLastTemplateChosen = "";
                        $("#id_ETSubject").val("");
                        $(".ideMailOutput").code("");
                        $("#clearFile").val("");
                    }
                    var clearFile = $("#clearFile");
                    clearFile.replaceWith(clearFile = clearFile.clone(true));
                    $("#clearFile").val("");
                    emailTemplatesService.TrackingEmailSending(user, $scope.globalPropertyName, $rootScope.typeOfTemplate);
                    $('#idCheckAvailability').modal('hide');
                    document.getElementById("id_sendEmail").disabled = false;
                }
            };



            function ETApartmentVerificationPage(emailTemplateUsed) {
                var tempBody = $(".ideMailOutput").code();
                tempBody = tempBody.replace(/[']+/g, '');
                $scope.globalPropertyName = $scope.globalPropertyName.replace(/[']+/g, '');
                $scope.ETEmailSubject = $scope.ETEmailSubject.replace(/[']+/g, '');

                var avValue = {
                    avFrom: $scope.ETEmailFrom,
                    avDisplayTo: $scope.DTEnquiry.enLastEmailSentTo,
                    avTo: $scope.DTEnquiry.enLastEmailSentTo,
                    avCC: $scope.DTEnquiry.enLastEmailCCTo,
                    avSubject: "ENQ: #<" + $scope.glbCurrentEnquiryRef + "># " + $scope.ETEmailSubject,
                    seBody: tempBody,
                    avEnquiryRef: $scope.glbCurrentEnquiryRef,
                    avDraft: 0,
                    avActionRequired: 1,
                    avUserAssigned: $scope.DTEnquiry.enEDUserAssigned,
                    avDateSent: (new Date()).toJSON(),
                    avAttachments: $scope.ETEmailFileAttchments,
                    avPageName: $rootScope.pageName,
                    avDateFrom: (new Date()).toJSON(),
                    avDateTo: (new Date()).toJSON(),
                    avHeldUntil: (new Date()).toJSON(),
                    avDayRate: "Day Rate to be inserted",
                    avCancellationPolicy: "Cancellation Policy to be inserted",
                    avComments: "",
                    avPropertyID: $scope.globalPropertyID,
                    avLandLordEmailAddress: $scope.globalLandlordsEmailAddress,
                    avPropertyName: $scope.globalPropertyName,
                    avTCAccepted: 0
                }

                console.log(avValue);
                emailVerificationsService.createAv(avValue)
                    .then(avAddSucceeded).catch(avAddFailed);


                function avAddFailed() {
                    logger.error('FAILED to ADD NEW avRecord');
                    $('#idCheckAvailability').modal('hide');
                }

                function avAddSucceeded() {
                    $('#idCheckAvailability').modal('hide');
                }
            };

        }
    ]);
})();
