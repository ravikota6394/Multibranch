(function () {
    'use strict';

    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.controller('P_DetailsTab', ['$q', '$scope', '$rootScope', '$stateParams', '$state', '$sce', '$interval', '$timeout', '$filter', 'logger',
        'R_EnquiriesService',
        'R_DeadReasonsService',
        'R_UsersService',
        'R_CitiesService',
        'R_CountriesService',
        'R_TrackingRecordsService',
        'R_ClientsService',
        'R_PropertiesService',
        'R_EmailTemplatesService',
        'R_EnqSourcesService',
        'R_EmailStatusService',
        'R_ClientGroupsService',
        controller]);

    function controller($q, $scope, $rootScope, $stateParams, $state, $sce, $interval, $timeout, $filter, logger,
        enquiryDataservice,
        deadReasonsDataService,
        userDataService,
        cityDataService,
        countryDataService,
        trackingRecordsDataService,
        clientsService,
        chosenPropertiesFactory,
        emailTemplatesService,
        enqSourcesFactory,
        emailStatusService,
        clientGroupsFactory) {

        $rootScope.DTHideTheDetailsTab = false;
        $rootScope.TemplatesPresent = "No";
        $rootScope.$state = $state;
        var enqRef = $stateParams.enqRef;
        if (enqRef > "0") {
            $('#idglbCurrentEnquiryRef').val(enqRef);
            $scope.glbCurrentEnquiryRef = enqRef;
        }
        else {
            enqRef = document.getElementById('idglbCurrentEnquiryRef').value;
        }
        var userId = $('#idglbMainUserID').val();
        var userCode = document.getElementById("userCode").value;

        doBreadcrumbsDetails();
        $rootScope.displayPV_CurrentEnquiry = false;
        $rootScope.setPossibleDuplicates = false;

        $("#idDTenTRSpecificApartment").focus(function () {
            $scope.autoDropdown = false;
        });
        $("#autoCompleteDiv").focus(function () {
            $scope.autoDropdown = false;
        });
        $scope.autoDropdown = true;
        $scope.selectApartmentType = function (enEdSpecificApartment) {
            chosenPropertiesFactory.getPropertyInformation(enEdSpecificApartment)
                .success(function (detailsOfProperty) {
                    $rootScope.propertyDetails = detailsOfProperty;
                    console.log($rootScope.propertyDetails);
                    $scope.autoDropdown = false;
                });
        }

        //$(document).ready(function () {
        //    // getdetails($scope.DTEnquiry.enSourceId);
        //    console.log($rootScope.DTEnquiry.enSourceId);
        //});

        $(document).on("click",
            function (event) {
                var $trigger = $("#autoCompleteDiv");
                if ($trigger !== event.target && !$trigger.has(event.target).length) {
                    $scope.autoDropdown = true;
                }
            });

        $scope.selectedApartment = function (specificApartment) {
            $rootScope.selectedPropertyId = specificApartment.PropertyID;
            $rootScope.selectedPropertyName = specificApartment.Name;
            $scope.autoDropdown = true;
            chosenPropertiesFactory.TrackingSpecficApartment(userCode, enqRef, specificApartment.Name);
        }

        $scope.AddLogsForFiveStarRef = function (fivestarRef) {
            console.log(fivestarRef);
            console.log($rootScope.enqFivestarRef);
            if ($rootScope.enqFivestarRef != fivestarRef) {
                var trackingRecord = {
                    "trenCode": enqRef,
                    "trStatus": "L",
                    "trDateStamp": new Date(),
                    "trTimeStamp": $filter('date')(new Date(), ' HH:mm'),
                    "trUserCode": document.getElementById("userCode").value,
                    "trType": "AC",
                    "trDescription": "Updated the fivestar ref as: " + fivestarRef
                }

                var promiseSave = trackingRecordsDataService.createTrackingRecord(trackingRecord)
                    .then(function (ret) { logger.info("Saved Tracking Record ") })
                    .catch(function (err) { logger.error("Failed to CREATE Tracking Record " + err) });

            }
        }

        $scope.CopyToTraveller = function () {
            $scope.DTEnquiry.enTRClientCode = $scope.DTEnquiry.enCDClientCode;
            $scope.DTEnquiry.enTRCompanyName = $scope.DTEnquiry.enCDCompanyName;
            $scope.DTEnquiry.enTRClientName = $scope.DTEnquiry.enCDClientName;
            $scope.DTEnquiry.enTRClientGroup = $scope.DTEnquiry.enCDClientGroup;
            $scope.DTEnquiry.enTRTitle = $scope.DTEnquiry.enCDTitle;
            $scope.DTEnquiry.enTRFirstName = $scope.DTEnquiry.enCDFirstName;
            $scope.DTEnquiry.enTRLastName = $scope.DTEnquiry.enCDLastName;
            $scope.DTEnquiry.enTRJobTitle = $scope.DTEnquiry.enCDJobTitle;
            $scope.DTEnquiry.enTREmailAddress = $scope.DTEnquiry.enCDEmailAddress;
            $scope.DTEnquiry.enTRAddress1 = $scope.DTEnquiry.enCDAddress1;
            $scope.DTEnquiry.enTRAddress2 = $scope.DTEnquiry.enCDAddress2;
            $scope.DTEnquiry.enTRAddress3 = $scope.DTEnquiry.enCDAddress3;
            $scope.DTEnquiry.enTRAddress4 = $scope.DTEnquiry.enCDAddress4;
            $scope.DTEnquiry.enTRAddress5 = $scope.DTEnquiry.enCDAddress5;
            $scope.DTEnquiry.enTRPostCode = $scope.DTEnquiry.enCDPostCode;
            $scope.DTEnquiry.enTRSkype = $scope.DTEnquiry.enCDSkype;
            $scope.DTEnquiry.enTRTelephone1 = $scope.DTEnquiry.enCDTelephone1;
            $scope.DTEnquiry.enTRTelephone2 = $scope.DTEnquiry.enCDTelephone2;
            $scope.DTEnquiry.enTRTelephone3 = $scope.DTEnquiry.enCDTelephone3;
            $scope.DTEnquiry.enTRFaxNo = $scope.DTEnquiry.enCDFaxNo;
            $scope.DTEnquiry.enTRTimeZone = $scope.DTEnquiry.enCDTimeZone;
            $scope.DTEnquiry.enTRCountryCode = $scope.DTEnquiry.enCDCountryCode;
            $scope.DTEnquiry.enTRTASAccountOwner = $scope.DTEnquiry.enCDTASAccountOwner;
            $scope.DTEnquiry.enTRNotes = $scope.DTEnquiry.enCDNotes;
            enquiryDataservice.trackingCopyToTraveller(userCode, enqRef);
        }


        $scope.CopyToLeadGuest = function () {
            $scope.DTEnquiry.enED1Title = $scope.DTEnquiry.enTRTitle;
            $scope.DTEnquiry.enED1FirstName = $scope.DTEnquiry.enTRFirstName;
            $scope.DTEnquiry.enED1LastName = $scope.DTEnquiry.enTRLastName;
            $scope.DTEnquiry.enED1EmailAddress = $scope.DTEnquiry.enTREmailAddress;
            enquiryDataservice.trackingCopyToLeadGuest(userCode, enqRef);
        }

        $scope.ClearTraveller = function () {
            $scope.DTEnquiry.enTRClientCode = null;
            $scope.DTEnquiry.enTRCompanyName = "";
            $scope.DTEnquiry.enTRClientName = "";
            $scope.DTEnquiry.enTRClientGroup = null;
            $scope.DTEnquiry.enTRTitle = "";
            $scope.DTEnquiry.enTRFirstName = "";
            $scope.DTEnquiry.enTRLastName = "";
            $scope.DTEnquiry.enTRJobTitle = "";
            $scope.DTEnquiry.enTREmailAddress = "";
            $scope.DTEnquiry.enTRAddress1 = "";
            $scope.DTEnquiry.enTRAddress2 = "";
            $scope.DTEnquiry.enTRAddress3 = "";
            $scope.DTEnquiry.enTRAddress4 = "";
            $scope.DTEnquiry.enTRAddress5 = "";
            $scope.DTEnquiry.enTRPostCode = "";
            $scope.DTEnquiry.enTRSkype = "";
            $scope.DTEnquiry.enTRTelephone1 = "";
            $scope.DTEnquiry.enTRTelephone2 = "";
            $scope.DTEnquiry.enTRTelephone3 = "";
            $scope.DTEnquiry.enTRFaxNo = "";
            $scope.DTEnquiry.enTRTimeZone = null;
            $scope.DTEnquiry.enTRCountryCode = null;
            $scope.DTEnquiry.enTRTASAccountOwner = "";
            $scope.DTEnquiry.enTRNotes = "";
            enquiryDataservice.trackingClearTraveller(userCode, enqRef);
        }

        getEnquirySources();
        function getEnquirySources() {
            enqSourcesFactory.getEnquirySources()
                .success(function (enquirySources) {
                    $scope.enquirySources = enquirySources;
                    console.log("enquirySources");
                    console.log($scope.enquirySources);
                });
        }

        if (enqRef < "1" || enqRef == undefined) {
            addEnquiry();
        }
        else {
            $rootScope.glbCurrentEnquiryRef = enqRef;
            doBreadcrumbsDetails();
            getEnquiry(enqRef);
            getClientGroups();
        }

        function getClientGroups() {
            clientGroupsFactory.getClientGroups()
                .success(function (clientGroupsInput) {
                    var clientGroups = angular.fromJson(clientGroupsInput);
                    $scope.ClientGroups = clientGroups;
                    $rootScope.clientGroupsdata = angular.fromJson(clientGroupsInput);
                });
        }

        $rootScope.sendAcknowledgement = false;
        console.log("Details Tab: " + $rootScope.sendAcknowledgement);

        function doBreadcrumbsDetails() {
            $rootScope.breadcrumbsValueGoTo = "> User Area > Enquiry # " + enqRef;
            $rootScope.breadcrumbsValueAreHere = "> Details";
            $rootScope.breadcrumbsValueUiSref = "detailsTab({enqRef: '" + enqRef + "'})";
        }

        /*** implementation details ***/

        var editEnquiry = null; // this is the enquiry being edited at the moment

        //Google Analytics
        ga('send', 'event', 'Details Tab', 'Entered The Details Tab', 'by ' + userCode + ' in enquiry number ' + enqRef);

        function addEnquiry() {
            var uniqueGuidValue = uniqueGuid();
            var newValue = "{enProgress: 10," +
                "            enDuplicateCheckKey: '" + uniqueGuidValue + "'," +
                "            enEDTimeAdded: '" + new Date().getHours() + ":" + new Date().getMinutes() + "'," +
                "            enEDDateAdded: '" + "'," +
                "            enUserAdded: '" + userId + "'" +
                "               }";
            console.log('Adding Enquiry');
            console.log(newValue);
            enquiryDataservice.createEnquiry(newValue).success(addSucceeded).catch(addFailed);

            function addFailed() {
                logger.error('FAILED to ADD NEW Enquiry');
            }

            function addSucceeded() {
                enquiryDataservice.getEnquiryBasedOnUniqueGuid(uniqueGuidValue)
                    .then(findGuidQuerySucceeded)
                    .catch(findGuidQueryFailed);

                function findGuidQueryFailed(err) {
                    logger.error('FAILED to Create NEW Enquiry ' + err);
                    alert(err);
                }

                function findGuidQuerySucceeded(ret) {
                    $scope.DTEnquiry = ret.data[0];
                    $scope.$apply();
                    initialiseDetailsTab($scope.DTEnquiry);

                    $scope.$apply();

                    enqRef = ret.data[0].enCode;

                    getEnquiry(enqRef);
                    $('#idglbCurrentEnquiryRef').val(enqRef);
                    $scope.glbCurrentEnquiryRef = enqRef;
                    var tempUrl = document.URL;
                    var herePos = tempUrl.indexOf('/', tempUrl.length - 7);
                    var newUrl = tempUrl.substring(0, herePos + 1) + enqRef.toString();
                    doBreadcrumbsDetails();

                    // Save the Action away to TrackingRecords
                    // Action Date is 2 hours + now . This could need changing sometime to a global option and also deal with business hours
                    var d1 = new Date();
                    //d1.setMinutes(d1.getMinutes() + 120);
                    d1.addHours(2);
                    $scope.DTEnquiry.enEDDateNextAction = $filter('date')(d1, 'MM/dd/yyyy');
                    // $scope.DTEnquiry.enEDTimeNextAction =  d1.toLocaleTimeString().replace("/.*(\d{2}:\d{2}:\d{2}).*/", "$1");
                    var d2 = new Date();
                    $scope.enEDDateLastActioned = $filter('date')(d2, 'MM/dd/yyyy');
                    var trackingRecord = {
                        "trenCode": enqRef,
                        "trStatus": "L",
                        "trDateStamp": new Date(),
                        "trTimeStamp": $filter('date')(new Date(), ' HH:mm'),
                        "trUserCode": document.getElementById("userCode").value,
                        "trType": "",
                        "trDescription": "New Enquiry manually added by " + document.getElementById("userCode").value,
                        "trNextActionDate": $scope.DTEnquiry.enEDDateNextAction,
                        "trNextActionTime": ''
                    }

                    trackingRecordsDataService.createTrackingRecord(trackingRecord)
                        .then(function (ret) { logger.info("Saved Tracking Record ") })
                        .catch(function (err) { logger.error("Failed to CREATE Tracking Record " + err) });
                    alert('NEW enquiry #' + enqRef + ' has been CREATED');
                    enquiryDataservice.TrackingNewEnquiryCreation(userCode, enqRef);
                    window.location.href = newUrl;
                }
            }
        }

        // Watch for change of data
        //-------------------------
        function userSaveConfirmation(oldEnqRef) {
            return confirm('DO YOU WANT SAVE THE CHANGED ENQUIRY' + oldEnqRef + ' FIRST?\nPlease choose !');
        }
        //----------------------------------------
        function getEnquiry(enqRef) {

            var isItChanged = document.getElementById('idglbDataHasChanged').checked;

            var oldEnqRef = document.getElementById('idglbWasEnquiryRef').value;
            if (enqRef !== undefined && enqRef !== oldEnqRef) {
                if (isItChanged && oldEnqRef) {
                    console.log("old ref");
                }
                enqRef = document.getElementById('idglbCurrentEnquiryRef').value;

                setTimeout(function () {
                    enquiryDataservice.getEnquiry(enqRef)
                        .then(getQuerySucceeded)
                        .catch(getQueryFailed);
                }, 50);
            } else {
                console.log("not old ref");
                if (enqRef !== undefined && enqRef == oldEnqRef) {
                    setTimeout(function () {
                        enquiryDataservice.getEnquiry(enqRef)
                            .then(getQuerySucceeded)
                            .catch(getQueryFailed);
                    }, 50);
                }
            }
            return;
        }

        Date.prototype.addHours = function (h) {
            this.setTime(this.getTime() + (h * 60 * 60 * 1000));
            return this;
        }

        function getSourceRelatedClosingReasons(sourceId) {
            setTimeout(function () {
                enqSourcesFactory.getEnqSource(sourceId)
                    .then(getSourcename)
                    .catch(getQueryFailed);
            }, 50);
        }

        $scope.$watch('DTEnquiry.enEDSourceCode', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                getSourceRelatedClosingReasons($scope.DTEnquiry.enEDSourceCode);
            }
        });

        function getSourcename(ret) {
            var sourcename = JSON.parse(ret.data);
            console.log("sourcename");
            console.log(sourcename.soDescription);
            if (sourcename != undefined && sourcename != null && sourcename.soDescription == 'santafe') {
                document.getElementById("id_enSfBudgetAmount").style.display = 'block';
                document.getElementById("id_enSfAssigneeOfficeAddress").style.display = 'block';
                document.getElementById("id_enSfInvoiceAddress").style.display = 'block';
                document.getElementById("id_enSfInvoiceEmail").style.display = 'block';
                document.getElementById("id_enSfOfficeAddress").style.display = 'block';
                deadReasonsDataService.getDeadReasons(false)
                    .success(function (deadreasons) {
                        $rootScope.DeadReasons = deadreasons;
                        console.log($rootScope.DeadReasons);
                    });
            }
            else {
                document.getElementById("id_enSfBudgetAmount").style.display = 'none';
                document.getElementById("id_enSfAssigneeOfficeAddress").style.display = 'none';
                document.getElementById("id_enSfInvoiceAddress").style.display = 'none';
                document.getElementById("id_enSfInvoiceEmail").style.display = 'none';
                document.getElementById("id_enSfOfficeAddress").style.display = 'none';
                deadReasonsDataService.getDeadReasons(true)
                    .success(function (deadreasons) {
                        $rootScope.DeadReasons = deadreasons;
                        console.log($rootScope.DeadReasons);
                    });
            }
        }

        function getQuerySucceeded(ret) {
            $("#idglbWasEnquiryRef").val(enqRef);
            $scope.DTEnquiry = ret.data;
            $rootScope.DTEnquiry = ret.data;
            getSourceRelatedClosingReasons($scope.DTEnquiry.enEDSourceCode);
            $rootScope.enqFivestarRef = $scope.DTEnquiry.enECFiveStarRef;
            $rootScope.actualUser = $rootScope.DTEnquiry.enEDUserAssigned;
            console.log("getEnquiry: " + $rootScope.actualUser);
            console.log("Checking for enquiry");
            console.log($scope.DTEnquiry);

            $scope.DTEnquiry.enEDParkingRequired = String($scope.DTEnquiry.enEDParkingRequired);
            $scope.DTEnquiry.enEDPetsRequired = String($scope.DTEnquiry.enEDPetsRequired);

            $scope.DTEnquiry.enEDDateAddedDisplay = ($filter('date')($scope.DTEnquiry.enEDDateAdded, 'dd-MMM-yyyy HH:mm'));

            $scope.DTEnquiry.enECFlightDate = ($filter('date')(new Date($scope.DTEnquiry.enECFlightDate), 'dd-MM-yyyy'));
            if ($scope.DTEnquiry.enECFlightDate == '01-01-1970') {
                $scope.DTEnquiry.enECFlightDate = "";
            }

            if ($scope.DTEnquiry.enECFlightDate == "") {
                $scope.dateFlightDate = null;
            } else {
                $scope.dateFlightDate = new Date(parseInt($scope.DTEnquiry.enECFlightDate.substring(6, 10)), parseInt($scope.DTEnquiry.enECFlightDate.substring(3, 5)) - 1, parseInt($scope.DTEnquiry.enECFlightDate.substring(0, 2)), 1, 0, 0);
            }

            initialiseDetailsTab($scope.DTEnquiry);
            setGlobalCurrentEnquiryWindow();

            $scope.specificApartment = {};
            $scope.specificApartment.Name = $scope.DTEnquiry.enEDSpecificApartment;

            //-------- this is code to see what has changed if anything
            $scope.project = $scope.DTEnquiry;

            $scope.original = angular.copy($scope.DTEnquiry);

            $scope.initialComparison = angular.equals($scope.project, $scope.original);
            $scope.dataHasChanged = angular.copy($scope.initialComparison);

            setTimeout(function () {
                $scope.$watch('project', function (newValue, oldValue) {
                    $scope.dataHasChanged = angular.equals($scope.project, $scope.original);
                    $rootScope.enquiriesObject = $scope.DTEnquiry;
                    $("#idglbWasDTEnquiry").val($scope.DTEnquiry);
                    $("#idglbDataHasChanged").prop('checked', true);
                }, true);
                $scope.dataHasChanged = false;
                $('#idglbDataHasChanged').val(false);
            }, 500);

            $scope.$apply();
            $rootScope.loader = false;
        }

        $scope.AddGuest = function () {
            $rootScope.OtherGuests.push({
                enEDOtherTitle: '',
                enEDOtherFirstName: '',
                enEDOtherLastName: '',
                enEDOtherAge: '',
                enEDOtherEmailAddress: '',
                enEDOtherRelationship: ''
            });
        }

        getOtherGuests();
        function getOtherGuests() {
            enquiryDataservice.GetOtherGuests(enqRef)
                .success(function (otherGuests) {
                    console.log('getOther Guests success ');
                    $rootScope.OtherGuests = otherGuests;
                    console.log($scope.OtherGuests);
                });
        }

        $scope.Remove = function (index, guestId) {
            $rootScope.guestId = guestId;
            $scope.OtherGuests.splice(index, 1);
        }

        function getQueryFailed(errorPl) {
            logger.error('failure loading Enquiry #' + enqRef, errorP1);
        };

        function setGlobalCurrentEnquiryWindow() {
            // Set global values for Current Enquiry Window
            //------------------
            $rootScope.globalEnCode = enqRef;
            $rootScope.globalDeadReasonCode = $scope.DTEnquiry.enECDeadReasonCode;
            $rootScope.globalEnEDCity = "";
            $rootScope.globalEnEDAssignedUser = "";
            $rootScope.globalEnProgress = $scope.DTEnquiry.enProgress;
            $rootScope.globalEnEDProgressCSS = $scope.DTEnquiry.enEDProgressCSS;
            $rootScope.globalEnEDProgressWord = $scope.DTEnquiry.enEDProgressWord;
            $rootScope.globalEnPrimaryContactName = $scope.DTEnquiry.enPrimaryContactName;
            $rootScope.globalEnEDDateAdded = $scope.DTEnquiry.enEDDateAdded;
            $rootScope.globalCDClientEmail = $scope.DTEnquiry.enCDEmailAddress;
            // Date control convert changed local to UTC for saving later
            $rootScope.globalEnEDDateOfArrival = $scope.DTEnquiry.enEDDateOfArrival;
            $rootScope.globalEnEDDepartureDate = $scope.DTEnquiry.enEDDepartureDate;
            $rootScope.globalEnEDFlightDate = $scope.DTEnquiry.enEDFlightDate;
            $rootScope.globalEnEDFlightDate = $scope.DTEnquiry.enEDFlightDate;
            $rootScope.globalEnFiveStarRef = $scope.DTEnquiry.enECFiveStarRef;
            console.log($scope.DTEnquiry);
            console.log("$scope.DTEnquiry");
            console.log("enECFiveStarRef: " + $rootScope.globalEnFiveStarRef);
            //-----End pruning----------------------------------------

            if ($scope.DTEnquiry.enEDUserAssigned != undefined) {
                setTimeout(function () {
                    userDataService.getUser($scope.DTEnquiry.enEDUserAssigned)
                        .then(function (ret) {
                            if (ret.data[0] !== undefined) {
                                $rootScope.globalEnEDAssignedUser = ret.data[0].usFirstName.substring(0, 1) + ". " + ret.data[0].usLastName;
                            }
                            userQueryFinished();
                        })
                        .catch(function (err) { userQueryFinished(); });
                }, 50);
            }
            return;
        }

        function userQueryFinished() {
            if ($scope.DTEnquiry.enEDCityCode != undefined) {
                setTimeout(function () {
                    cityDataService.getCity($scope.DTEnquiry.enEDCityCode)
                        .success(function (cities) {
                            var strCityName = JSON.parse(cities).ciDescription;
                            var intCountryCode = JSON.parse(cities).ciCountryCode;
                            $rootScope.globalEnEDCity = strCityName;
                            if (intCountryCode != undefined) {
                                $rootScope.globalEnEDCity = $rootScope.globalEnEDCity + ", " + JSON.parse(cities).coName;
                            }
                        });
                }, 50);
            }
            return;
        }


        function reset() {
            $("#idglbDataHasChanged").prop('checked', false);
            $('#idglbWasEnquiryRef').val(null);
            getEnquiry(enqRef);
            return;
        };

        getSourceCode();

        function getSourceCode() {
            enquiryDataservice.getEnquiry(enqRef)
                .then(function (response) {
                    var sourceCode = angular.fromJson(response.data).enEDSourceCode;
                    enquiryDataservice.SourcesList(sourceCode)
                        .then(function (response) {
                            $rootScope.soIsReadOnly = angular.fromJson(response.data);
                        });
                });
        }

        function save(wasEnqRef) {
            var saveBlob;
            var promiseSave;
            var localEnqRef = wasEnqRef;
            // Get Date corrected if changed to UTC time
            var getLocalDate = new Date();
            var timeDifference = getLocalDate.getTimezoneOffset();
            if (!localEnqRef) {
                localEnqRef = enqRef;
                saveBlob = $scope.DTEnquiry;
                console.log("saveBlob");
                console.log(saveBlob);
            }
            else {
                saveBlob = $scope.enquiriesObject;
                $("#idglbDataHasChanged").prop('checked', false);
                $('#idglbWasEnquiryRef').val(null);
            }

            console.log(saveBlob);

            if ($("#idenTRClientCode").val() !== undefined && $("#idenTRClientCode").val() !== null && $("#idenTRClientCode").val() !== 0 && $("#idenTRClientCode").val() !== '') {
                saveBlob.enTRClientCode = $("#idenTRClientCode").val();

                $("#idenTRClientCode").val('');
            }
            if ($("#idenCDClientCode").val() !== undefined && $("#idenCDClientCode").val() !== null && $("#idenCDClientCode").val() !== 0 && $("#idenTRClientCode").val() !== '') {
                saveBlob.enCDClientCode = $("#idenCDClientCode").val();

                $("#idenTRClientCode").val('');
            }
            if ($("#idDTenEDTotalPassengers").val() !== undefined && $("#idDTenEDTotalPassengers").val() !== null && $("#idDTenEDTotalPassengers").val() !== 0 && $("#idDTenEDTotalPassengers").val() !== '') {
                saveBlob.enEDTotalPassengers = $("#idDTenEDTotalPassengers").val();
            }
            if ($("#idDTenEDNoAdultPassengers").val() !== undefined && $("#idDTenEDNoAdultPassengers").val() !== null && $("#idDTenEDNoAdultPassengers").val() !== 0 && $("#idDTenEDNoAdultPassengers").val() !== '') {
                saveBlob.enEDNoAdultPassengers = $("#idDTenEDNoAdultPassengers").val();
            }
            if ($("#idDTenEDNoChildren").val() !== undefined && $("#idDTenEDNoChildren").val() !== null && $("#idDTenEDNoChildren").val() !== 0 && $("#idDTenEDNoChildren").val() !== '') {
                saveBlob.enEDNoChildren = $("#idDTenEDNoChildren").val();
            }
            if ($("#idDTenEDDoubleBedroom").val() !== undefined && $("#idDTenEDDoubleBedroom").val() !== null && $("#idDTenEDDoubleBedroom").val() !== 0 && $("#idDTenEDDoubleBedroom").val() !== '') {
                saveBlob.enEDDoubleBedroom = $("#idDTenEDDoubleBedroom").val();
            }
            if ($("#idDTenEDTwinBedroom").val() !== undefined && $("#idDTenEDTwinBedroom").val() !== null && $("#idDTenEDTwinBedroom").val() !== 0 && $("#idDTenEDTwinBedroom").val() !== '') {
                saveBlob.enEDTwinBedroom = $("#idDTenEDDoubleBedroom").val();
            }
            if ($("#idDTenEDSingleBedroom").val() !== undefined && $("#idDTenEDSingleBedroom").val() !== null && $("#idDTenEDSingleBedroom").val() !== 0 && $("#idDTenEDSingleBedroom").val() !== '') {
                saveBlob.enEDSingleBedroom = $("#idDTenEDSingleBedroom").val();
            }
            if ($("#idDTenEDExtraBeds").val() !== undefined && $("#idDTenEDExtraBeds").val() !== null && $("#idDTenEDExtraBeds").val() !== 0 && $("#idDTenEDExtraBeds").val() !== '') {
                saveBlob.enEDExtraBeds = $("#idDTenEDExtraBeds").val();
            }
            console.log($("#idDTenEDSpecificApartment").val());
            saveBlob.enEDSpecificApartment = $("#idDTenEDSpecificApartment").val();

            var d3 = new Date(parseInt(saveBlob.enECFlightDate.substring(6, 10)), parseInt(saveBlob.enECFlightDate.substring(3, 5)) - 1, parseInt(saveBlob.enECFlightDate.substring(0, 2)));
            d3.setMinutes(d3.getMinutes() - timeDifference);
            saveBlob.enECFlightDate = $filter('date')(d3, 'MM/dd/yyyy');
            console.log(saveBlob);
            console.log($rootScope.selectedPropertyId);
            if ($rootScope.selectedPropertyId != undefined || $rootScope.selectedPropertyId != "" || $rootScope.selectedPropertyId != null) {
                chosenPropertiesFactory.getChosenProperties(enqRef)
                    .success(function (chosenProperties) {
                        $scope.ChosenPropertiesByEnqref = chosenProperties;
                        console.log($scope.ChosenPropertiesByEnqref);
                        var found = false;
                        for (var i = 0; i < $scope.ChosenPropertiesByEnqref.length; i++) {
                            if ($scope.ChosenPropertiesByEnqref[i].prPropertyCode == $rootScope.selectedPropertyId) {
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            chosenPropertiesFactory.saveSpecificApartmentdetails(enqRef, $rootScope.selectedPropertyId)
                                .success(function (message) {
                                    $rootScope.selectedPropertyId = "";
                                });
                        }
                    });
            }

            $scope.DTEnquiry = saveBlob;
            console.log(saveBlob);
            console.log("Save blob");
            console.log(saveBlob.enEDSourceCode);
            $rootScope.DTEnquiry.enEDSourceCode = saveBlob.enEDSourceCode;
            console.log("Save Enquiry: " + $rootScope.actualUser);
            console.log("enquiry: " + saveBlob.enEDUserAssigned);
            console.log("userAssignedRecordTracked: " + $rootScope.userAssignedRecordTracked);
            if ($rootScope.actualUser != saveBlob.enEDUserAssigned && $rootScope.userAssignedRecordTracked != true) {
                trackingRecordsDataService.trackRecordWhenUserChanged(enqRef, saveBlob.enEDUserAssigned, userCode)
                    .success(function (status) {
                        console.log('Tracking record when user changed Success');
                    });
            }
            if ($rootScope.userAssignedRecordTracked == true) {
                $rootScope.userAssignedRecordTracked = false;
            }

            if (saveBlob.enTRPrimaryContact == 1 && saveBlob.enPrimaryContactName == "null null / null") {
                if (saveBlob.enTRLastName == null && saveBlob.enTRFirstName == null && saveBlob.enTRTitle == null) {
                    saveBlob.enPrimaryContactName = null;
                    saveBlob.enPrimarySalutation = null;
                }
                else {
                    if (saveBlob.enTRTitle == null) {
                        console.log(saveBlob.enTRTitle);
                        saveBlob.enTRTitle = "";
                    }
                    if (saveBlob.enTRFirstName == null) {
                        console.log(saveBlob.enTRFirstName);
                        saveBlob.enTRFirstName = "";
                    }
                    if (saveBlob.enTRLastName == null) {
                        console.log(saveBlob.enTRLastName);
                        saveBlob.enTRLastName = "";
                    }
                    saveBlob.enPrimaryContactName = saveBlob.enTRTitle + " " + saveBlob.enTRFirstName + " / " + saveBlob.enTRLastName;
                    saveBlob.enPrimarySalutation = saveBlob.enTRTitle + " " + saveBlob.enTRFirstName + " " + saveBlob.enTRLastName;
                }
            }

            console.log("showAcknowledgementPopup:" + $scope.showAcknowledgementPopup);
            if ($scope.showAcknowledgementPopup == true) {
                saveBlob.enAcknowledgementSent = true;
            }
            saveBlob.loggedInUser = document.getElementById("userCode").value;
            saveBlob.setPossibleDuplicatesValue = $rootScope.setPossibleDuplicates;
            console.log(saveBlob.loggedInUser);
            saveBlob.actionRequiredStatusMessage = $scope.ActionRequired;
            console.log(saveBlob.actionRequiredStatusMessage);
            setTimeout(function () {
                promiseSave = enquiryDataservice.saveChanges(localEnqRef, saveBlob)
                    .then(function (ret) {
                        $scope.ActionRequired = "";
                        console.log($scope.ActionRequired);
                        $rootScope.setPossibleDuplicates = false;
                        console.log(saveBlob.enAcknowledgementSent);
                        var userCode = document.getElementById("userCode").value;
                        if (saveBlob.enAcknowledgementSent != true) {
                            if (saveBlob.enED1EmailAddress != null) {
                                $scope.EmailsList = [{ code: "CD", email: saveBlob.enCDEmailAddress }, { code: "TR", email: saveBlob.enTREmailAddress }, { code: "ED1", email: saveBlob.enED1EmailAddress }];
                            }
                            else {
                                $scope.EmailsList = [{ code: "CD", email: saveBlob.enCDEmailAddress }, { code: "TR", email: saveBlob.enTREmailAddress }];
                            }
                            console.log($scope.EmailsList);
                            $scope.ETAcknowledgementEmailFrom = "etrak@apartmentservice.com";
                            if (saveBlob.enTRPrimaryContact == 1) {
                                $scope.enEmailSentTo = saveBlob.enTREmailAddress;
                            }
                            if (saveBlob.enCDPrimaryContact == 1) {
                                $scope.enEmailSentTo = saveBlob.enCDEmailAddress;
                            }
                            if (saveBlob.enED1PrimaryContact == 1) {
                                $scope.enEmailSentTo = saveBlob.enED1EmailAddress;
                            }
                            console.log("In True Block");
                            console.log(userCode);
                            enquiryDataservice.SendNotificationEmailForManualEnquiry(enqRef, userCode)
                                .success(function (emailDetails) {
                                    var emailTemplate = emailDetails;
                                    emailTemplatesService.replaceClientVariables(emailDetails.etTemplate, enqRef)
                                        .success(function (template) {
                                            emailTemplate.etTemplate = template;
                                            $scope.ETAcknowledgementEmailSubject = emailTemplate.etSubject;
                                            etImportTemplateSubject($scope.ETAcknowledgementEmailSubject);
                                            if (MakeEmptyStringWhenNull($scope.ETAcknowledgementEmailSubject) != "") {
                                                $scope.ETAcknowledgementEmailSubject = $scope.ETAcknowledgementEmailSubject.replace(/\#\#EnquiryRef\#\#/gi, $scope.glbCurrentEnquiryRef);
                                            }
                                            $(".ideMailOutput").code('<span style="font-family: Verdana;font-size: 14px;background-color: rgb(255, 255, 255);">' + emailTemplate.etTemplate + '</span>');
                                            $scope.$apply();
                                            $('#idManualAcknowledgement').modal('show');
                                            $rootScope.sendAcknowledgement = true;
                                        });
                                });
                        }
                        logger.info("Saved enquiry #" + localEnqRef);
                        //Google Analytics 
                        ga('send', 'event', 'Details Tab', 'Saved/Updated Enquiry', + ' ' + enqRef + ' by ' + userCode);
                        // Delete Guests                        
                        enquiryDataservice.RemoveGuests(enqRef)
                            .success(function (otherguests) {
                                //Add Guests                                                             
                                console.log($rootScope.OtherGuests);
                                enquiryDataservice.AddGuests(enqRef, $rootScope.OtherGuests);
                            });
                        //Refresh After Saving Enquiry
                        getEnquiry(localEnqRef);
                    })
                    .catch(function (err) { logger.error("Failed to SAVE enquiry #" + localEnqRef + " " + err) });
            }, 50);
        };

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

                $scope.ETAcknowledgementEmailSubject = subject;
            });
        }

        $scope.ClearFields = function () {
            $scope.DTEnquiry.enED2Title = "Please Select";
            $scope.DTEnquiry.enED2FirstName = null;
            $scope.DTEnquiry.enED2LastName = null;
            $scope.DTEnquiry.enED2Age = null;
            $scope.DTEnquiry.enED2EmailAddress = null;
            $scope.DTEnquiry.enED2Relationship = null;
        }

        $scope.BindMailToDisplayBox = function (toAddress) {
            $scope.enEmailSentTo = toAddress;
        }

        $scope.BindMailToDisplayBoxCC = function (ccAddress) {
            $scope.DTEnquiry.enLastEmailCCTo = ccAddress;
        }

        $scope.ETSendAutoAcknowledgement = function () {
            // Check that fields have been added 
            var emailValidation = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,}|[0-9]{1,3}|([\w]{2,}))(\]?)$/;

            console.log("to address: " + $scope.enEmailSentTo);
            var toAddresses = $scope.enEmailSentTo;
            var toAddresses_Array = toAddresses.split(',');

            for (var i = 0; i < toAddresses_Array.length; i++) {
                if (!emailValidation.test(toAddresses_Array[i]) || toAddresses_Array[i] === undefined || toAddresses_Array[i] === '') {
                    alert("The email TO field must be filled in with a valid email address");
                    return;
                };
            }
            console.log("CC address: " + $scope.DTEnquiry.enLastEmailCCTo);

            var toCCAddresses = $scope.DTEnquiry.enLastEmailCCTo;
            if (toCCAddresses != null && toCCAddresses !== "") {
                if (!emailValidation.test($scope.DTEnquiry.enLastEmailCCTo)) {
                    console.log("ccValue: " + $scope.DTEnquiry.enLastEmailCCTo);
                    alert("The email CC field must be filled in with a valid email address");
                    return;
                }
            }
            if ($scope.ETAcknowledgementEmailFrom === undefined || $scope.ETAcknowledgementEmailFrom === '') {
                alert("The email FROM field must be filled in with a vaid email address");
                return;
            }
            if ($scope.ETAcknowledgementEmailSubject === undefined || $scope.ETAcknowledgementEmailSubject === '') {
                alert("The SUBJECT field must be not be empty");
                return;
            }
            document.getElementById("id_sendAutoAcknowledgement").disabled = true;
            var tempBody = $(".ideMailOutput").code();
            tempBody = tempBody.replace(/[']+/g, '');

            var newValue = "{seFrom: '" + $scope.ETAcknowledgementEmailFrom + "'," +
                "            seDisplayTo: '" + $scope.enEmailSentTo + "'," +
                "            seTo: '" + $scope.enEmailSentTo + "'," +
                "            seCC: '" + $scope.DTEnquiry.enLastEmailCCTo + "'," +
                "            seSubject: 'ENQ: #<" + $scope.glbCurrentEnquiryRef + "># " + $scope.ETAcknowledgementEmailSubject + "'," +
                "            seBody: '" + tempBody + "'," +
                "            seEnquiryRef: " + $scope.glbCurrentEnquiryRef + "," +
                "            seDraft: 0," +
                "            seActionRequired: 1," +
                "            seUserAssigned: '" + "" + "'," +
                "            seDateSent: '" + (new Date()).toJSON() + "'," +
                "            seAttachments: '" + "" + "'" +
                "               }";

            emailTemplatesService.createAutoAcknowledgementEmail(newValue, userCode)
                .success(function (emailSentRecord) {
                    console.log(emailSentRecord);
                    $scope.DTEnquiry.enAcknowledgementSent = true;
                    $scope.ETAcknowledgementEmailFrom = "";
                    $scope.ETAcknowledgementEmailSubject = "";
                    $scope.enEmailSentTo = "";
                    $scope.DTEnquiry.enLastEmailCCTo = "";
                    $('#idManualAcknowledgement').modal('hide');
                });
        }

        $scope.doSave = function () {
            // Saves the current enquiry only
            doSaveActual(null);
        }

        //Function for client save
        function saveClient(transferEnquiryData, saveThisEnq) {
            console.log("Entered into client save");
            console.log(transferEnquiryData);
            console.log("saveThisEnq: " + saveThisEnq);
            var clClientCode = "";
            var email = transferEnquiryData.enCDEmailAddress;
            clientsService.clientFoundOrNot(email)
                .then(function (ret) {
                    $scope.clClientCode = ret.data;
                    clClientCode = $scope.clClientCode;
                    console.log($scope.clClientCode);
                    var clientRecord = {
                        clCode: $scope.clClientCode,
                        clFileImportCode: null,
                        clTitle: transferEnquiryData.enCDTitle,
                        clFirstName: transferEnquiryData.enCDFirstName,
                        clLastName: transferEnquiryData.enCDLastName,
                        clCompanyName: transferEnquiryData.enCDCompanyName,
                        clJobTitle: transferEnquiryData.enCDJobTitle,
                        clAddress1: transferEnquiryData.enCDAddress1,
                        clAddress2: transferEnquiryData.enCDAddress2,
                        clAddress3: transferEnquiryData.enCDAddress3,
                        clAddress4: transferEnquiryData.enCDAddress4,
                        clAddress5: transferEnquiryData.enCDAddress5,
                        clPostCode: transferEnquiryData.enCDPostCode,
                        clTelephone1: transferEnquiryData.enCDTelephone1,
                        clTelephone2: transferEnquiryData.enCDTelephone2,
                        clTelephone3: transferEnquiryData.enCDTelephone3,
                        clFaxNo: transferEnquiryData.enCDFaxNo,
                        clEmailAddress: transferEnquiryData.enCDEmailAddress,
                        clWholeName: transferEnquiryData.enCDLastName + ", " + transferEnquiryData.enCDFirstName + " " + transferEnquiryData.enCDTitle,
                        clSalutation: transferEnquiryData.enCDTitle + " " + transferEnquiryData.enCDLastName,
                        clStatus: "L",
                        clClientGroup: transferEnquiryData.enCDClientGroup,
                        clExportFlag: null,
                        clCountryCode: transferEnquiryData.enCDCountryCode,
                        clSkype: transferEnquiryData.enCDSkype,
                        clTimeZone: transferEnquiryData.enCDTimeZone,
                        clTASAccountOwner: transferEnquiryData.enCDTASAccountOwner
                    }
                    console.log("clientRecord");
                    console.log(clientRecord);
                    if ($scope.clClientCode != 0) {
                        var clientCode = $scope.clClientCode;
                        console.log("updateClientRecord");
                        clientsService.saveClientChangesInternal(clientCode, clientRecord)
                            .then(function (ret) {
                                transferEnquiryData.enCDClientCode = clClientCode;
                                saveTraveller(transferEnquiryData, saveThisEnq);
                            })
                            .catch(function (err) {
                                logger.error("Failed to update client " + err);
                                saveTraveller(transferEnquiryData, saveThisEnq);
                            });
                    }
                    else {
                        console.log("saveClientRecord");
                        clientsService.createClientInternal(clientRecord)
                            .then(function (ret) {
                                console.log("return client");
                                console.log(ret.data.clCode);
                                transferEnquiryData.enCDClientCode = ret.data.clCode;
                                saveTraveller(transferEnquiryData, saveThisEnq);
                            })
                            .catch(function (err) {
                                logger.error("Failed to add client " + err);
                                saveTraveller(transferEnquiryData, saveThisEnq);
                            });
                    }
                });
        }

        //Function for traveller save
        function saveTraveller(transferEnquiryData, saveThisEnq) {
            console.log("Entered into Traveller save");
            console.log(transferEnquiryData);
            console.log("saveThisEnq: " + saveThisEnq);
            var trTravellerCode = "";

            var email = transferEnquiryData.enTREmailAddress;
            clientsService.travellerFoundOrNot(email)
                .then(function (ret) {
                    $scope.trTravellerCode = ret.data;
                    console.log($scope.trTravellerCode);
                    trTravellerCode = $scope.trTravellerCode;
                    var travellerRecord = {
                        trCode: $scope.trTravellerCode,
                        trFileImportCode: null,
                        trTitle: transferEnquiryData.enTRTitle,
                        trFirstName: transferEnquiryData.enTRFirstName,
                        trLastName: transferEnquiryData.enTRLastName,
                        trCompanyName: transferEnquiryData.enTRCompanyName,
                        trJobTitle: transferEnquiryData.enTRJobTitle,
                        trAddress1: transferEnquiryData.enTRAddress1,
                        trAddress2: transferEnquiryData.enTRAddress2,
                        trAddress3: transferEnquiryData.enTRAddress3,
                        trAddress4: transferEnquiryData.enTRAddress4,
                        trAddress5: transferEnquiryData.enTRAddress5,
                        trPostCode: transferEnquiryData.enTRPostCode,
                        trTelephone1: transferEnquiryData.enTRTelephone1,
                        trTelephone2: transferEnquiryData.enTRTelephone2,
                        trTelephone3: transferEnquiryData.enTRTelephone3,
                        trFaxNo: transferEnquiryData.enTRFaxNo,
                        trEmailAddress: transferEnquiryData.enTREmailAddress,
                        trWholeName: transferEnquiryData.enTRLastName + ", " + transferEnquiryData.enTRFirstName + " " + transferEnquiryData.enTRTitle,
                        trSalutation: transferEnquiryData.enTRTitle + " " + transferEnquiryData.enTRLastName,
                        trStatus: "L",
                        trClientGroup: transferEnquiryData.enTRClientGroup,
                        trExportFlag: null,
                        trCountryCode: transferEnquiryData.enTRCountryCode,
                        trSkype: transferEnquiryData.enTRSkype,
                        trTimeZone: transferEnquiryData.enTRTimeZone,
                        trTASAccountOwner: transferEnquiryData.enTRTASAccountOwner
                    }
                    console.log("travellerRecord");
                    console.log(travellerRecord);
                    console.log("update travellerRecord");
                    clientsService.saveTravellerChangesInternal(travellerRecord)
                        .then(function (ret) {
                            console.log("ret traveller");
                            console.log(ret.data);
                            transferEnquiryData.enTRClientCode = ret.data;
                            saveEnq(saveThisEnq);
                        })
                        .catch(function (err) {
                            logger.error("Failed to add traveller " + err);
                            saveEnq(saveThisEnq);
                        });
                });
        }

        //function for save enquiry
        function saveEnq(saveThisEnq) {
            save(saveThisEnq);
        }

        $scope.CalculateNights = function (DTEnquiry) {
            if ((DTEnquiry.dayOfArrival != "" && DTEnquiry.MonthOfArrival != "" && DTEnquiry.YearOfArrival != "") && (DTEnquiry.DepartureDay != "" && DTEnquiry.DepartureMonth != "" && DTEnquiry.DepartureYear != "")) {
                console.log("Arrival - Departure");
                enquiryDataservice.CalculateNights(DTEnquiry)
                    .success(function (nights) {
                        $scope.DTEnquiry.enEDNights = nights;
                        console.log($scope.DTEnquiry.enEDNights);
                    });
            }
        }

        $scope.CalculateArrivalAndDepartureDates = function (DTEnquiry) {
            if ((MakeEmptyStringWhenNull(DTEnquiry.enEDNights) != "") && (DTEnquiry.dayOfArrival != "" && DTEnquiry.MonthOfArrival != "" && DTEnquiry.YearOfArrival != "")) {
                console.log("Arrival - Nights");
                enquiryDataservice.CalculateArrivalAndDepartureDates(DTEnquiry)
                    .success(function (enquiry) {
                        $scope.DTEnquiry.DepartureDay = enquiry.DepartureDay;
                        $scope.DTEnquiry.DepartureMonth = enquiry.DepartureMonth;
                        $scope.DTEnquiry.DepartureYear = enquiry.DepartureYear;
                    });
            }
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

        $scope.getdetails = function (enSourceId) {
            getdetails(enSourceId);
        }

        function getdetails(enEDSourceCode) {
            if (enEDSourceCode != null && enEDSourceCode == 994) {
                setDisplay('inline-block');
            }
            else {
                document.getElementById("id_TripType").style.display = 'none';
                document.getElementById("id_TravellerFax").style.display = 'none';
                document.getElementById("id_EDOOrderRef").style.display = 'none';
                document.getElementById("id_Country").style.display = 'none';
                document.getElementById("id_EmployeeId").style.display = 'none';
                document.getElementById("id_ClientCountry").style.display = 'none';
                document.getElementById("id_ClientAddress").style.display = 'none';
                document.getElementById("id_TravellerAddress").style.display = 'none';
                setDisplay('none');
            }
        }

        function setDisplay(display) {
            document.getElementById("id_HSBCRequiredCountry").style.display = display;
            document.getElementById("id_HSBCRequiredEmployeeId").style.display = display;
            document.getElementById("id_HSBCRequiredTravellerCountry").style.display = display;
            document.getElementById("id_HSBCRequiredTripType").style.display = display;
            document.getElementById("id_HSBCRequiredOrderRef").style.display = display;
            document.getElementById("id_HSBCRequiredFax").style.display = display;
            document.getElementById("id_HSBCRequiredClientAddress").style.display = display;
            document.getElementById("id_HSBCRequiredTravellerAddress").style.display = display;
        }

        function doSaveActual(saveThisEnq) {
            var transferEnquiryData = {};
            console.log(saveThisEnq);
            if (saveThisEnq) {
                // This is the old enquiry to be saved before getting the one that is new
                transferEnquiryData = $scope.enquiriesObject;
            } else {
                transferEnquiryData = $scope.DTEnquiry;
                console.log(transferEnquiryData);
            }
            console.log(transferEnquiryData.enEDSourceCode);
            $rootScope.dayOfArrival = $("#idDTenEDDayOfArrival").find("option:selected").val();
            if ($rootScope.dayOfArrival.length == 1) {
                $rootScope.dayOfArrival = "0" + $rootScope.dayOfArrival;
            }
            $rootScope.MonthOfArrival = $("#idDTenEDMonthOfArrival").find("option:selected").val();
            if ($rootScope.MonthOfArrival.length == 1) {
                $rootScope.MonthOfArrival = "0" + $rootScope.MonthOfArrival;
            }
            $rootScope.YearOfArrival = $("#idDTenEDYearOfArrival").val();
            $rootScope.DepartureDay = $("#idDTenEDDepartureDay").find("option:selected").val();
            if ($rootScope.DepartureDay.length == 1) {
                $rootScope.DepartureDay = "0" + $rootScope.DepartureDay;
            }
            $rootScope.DepartureMonth = $("#idDTenEDDepartureMonth").find("option:selected").val();
            if ($rootScope.DepartureMonth.length == 1) {
                $rootScope.DepartureMonth = "0" + $rootScope.DepartureMonth;
            }
            $rootScope.DepartureYear = $("#idDTenEDDepartureYear").val();
            var flag = false;
            if ($rootScope.DepartureYear >= $rootScope.YearOfArrival) {
                if ($rootScope.DepartureYear > $rootScope.YearOfArrival) {
                    flag = true;
                }
                else {
                    if ($rootScope.DepartureMonth > $rootScope.MonthOfArrival) {
                        flag = true;
                    }
                    else {
                        if ($rootScope.DepartureMonth == $rootScope.MonthOfArrival) {
                            if ($rootScope.DepartureDay > $rootScope.dayOfArrival) {
                                flag = true;
                            }
                            else {
                                flag = false;
                            }
                        }
                        else {
                            flag = false;
                        }
                    }
                }
            }
            else {
                flag = false;
            }
            if (flag == true) {
                if (MakeEmptyStringWhenNull(transferEnquiryData.enCDCompanyName) == "") {
                    document.getElementById("id_enCDCompanyName").style.display = 'block';
                    document.getElementById("id_enCDCompanyName").textContent = "Please enter the company name";
                }
                else if (MakeEmptyStringWhenNull(transferEnquiryData.enCDClientGroup) == "") {
                    document.getElementById("id_enCDClientGroup").style.display = 'block';
                    document.getElementById("id_enCDClientGroup").textContent = "Please select the group";
                }
                else if ((MakeEmptyStringWhenNull(transferEnquiryData.enCDFirstName) == "") && (MakeEmptyStringWhenNull(transferEnquiryData.enCDLastName) == "")) {
                    document.getElementById("id_ClientFirstName").style.display = 'block';
                    document.getElementById("id_ClientFirstName").textContent = "Please Specify the name";
                }
                else if (MakeEmptyStringWhenNull(transferEnquiryData.enCDEmailAddress) == "") {
                    document.getElementById("id_ClientEmail").style.display = 'block';
                    document.getElementById("id_ClientEmail").textContent = "Please enter the email";
                }
                else if (MakeEmptyStringWhenNull(transferEnquiryData.enTRCompanyName) == "") {
                    document.getElementById("id_enTRCompanyName").style.display = 'block';
                    document.getElementById("id_enTRCompanyName").textContent = "Please enter the company name";
                }
                else if (MakeEmptyStringWhenNull(transferEnquiryData.enTRClientGroup) == "") {
                    document.getElementById("id_enTRClientGroup").style.display = 'block';
                    document.getElementById("id_enTRClientGroup").textContent = "Please enter the Group name";
                }
                else if ((MakeEmptyStringWhenNull(transferEnquiryData.enTRFirstName) == "")) {
                    document.getElementById("id_TravellerFirstName").style.display = 'block';
                    document.getElementById("id_TravellerFirstName").textContent = "Please Specify the first name";
                }
                else if ((MakeEmptyStringWhenNull(transferEnquiryData.enTRLastName) == "")) {
                    document.getElementById("id_TravellerLastName").style.display = 'block';
                    document.getElementById("id_TravellerLastName").textContent = "Please Specify the last name";
                }
                else if (MakeEmptyStringWhenNull(transferEnquiryData.enTREmailAddress) == "") {
                    document.getElementById("id_TravellerEmail").style.display = 'block';
                    document.getElementById("id_TravellerEmail").textContent = "Please enter the email";
                }
                else if (MakeEmptyStringWhenNull(transferEnquiryData.enEDSourceCode) == "") {
                    document.getElementById("idSourceCode").style.display = 'block';
                    document.getElementById("idSourceCode").textContent = "Please select a source";
                }
                else if (MakeEmptyStringWhenNull(transferEnquiryData.enEDUserAssigned) == "") {
                    document.getElementById("id_UserAssigned").style.display = 'block';
                    document.getElementById("id_UserAssigned").textContent = "Please assign the user";
                }
                else if (MakeEmptyStringWhenNull(transferEnquiryData.enEDBudgetAmount) == "" && transferEnquiryData.enEDBudgetAmount != 0) {
                    document.getElementById("id_enEDBudgetAmount").style.display = 'block';
                    document.getElementById("id_enEDBudgetAmount").textContent = "Please enter the Amount";
                }
                else if (MakeEmptyStringWhenNull(transferEnquiryData.enEDBudgetCurrency) == "") {
                    document.getElementById("id_BudgetCurrency").style.display = 'block';
                    document.getElementById("id_BudgetCurrency").textContent = "Please enter currency";
                }
                else if (MakeEmptyStringWhenNull(transferEnquiryData.enEDCorrectedCity) == "") {
                    document.getElementById("id_enEDCorrectedCity").style.display = 'block';
                    document.getElementById("id_enEDCorrectedCity").textContent = "Please enter the city";
                }
                else if (MakeEmptyStringWhenNull(transferEnquiryData.enEDTotalPassengers) == "" && MakeEmptyStringWhenNull($("#idDTenEDTotalPassengers").val()) == "") {
                    document.getElementById("id_enEDTotalPassengers").style.display = 'block';
                    document.getElementById("id_enEDTotalPassengers").textContent = "Please enter total number of guests";
                }
                else if (transferEnquiryData.enEDSourceCode != null && transferEnquiryData.enEDSourceCode == 994) {
                    if (transferEnquiryData.enCDCountryCode == 0 || transferEnquiryData.enCDCountryCode == null) {
                        document.getElementById("id_ClientCountry").style.display = 'block';
                        document.getElementById("id_ClientCountry").textContent = "Please select the Country";
                    }
                    else if (MakeEmptyStringWhenNull(transferEnquiryData.enCDAddress5 == null ? transferEnquiryData.enCDAddress5 : transferEnquiryData.enCDAddress5) == "") {
                        document.getElementById("id_ClientAddress").style.display = 'block';
                        document.getElementById("id_ClientAddress").textContent = "Please select the Address";
                    }
                    else if (MakeEmptyStringWhenNull(transferEnquiryData.enEmployeeID == null ? transferEnquiryData.enEmployeeID : transferEnquiryData.enEmployeeID.trim()) == "") {
                        document.getElementById("id_EmployeeId").style.display = 'block';
                        document.getElementById("id_EmployeeId").textContent = "Please enter the EmployeeId";
                    }
                    else if (MakeEmptyStringWhenNull(transferEnquiryData.enTRAddress5 == null ? transferEnquiryData.enTRAddress5 : transferEnquiryData.enTRAddress5.trim()) == "") {
                        document.getElementById("id_TravellerAddress").style.display = 'block';
                        document.getElementById("id_TravellerAddress").textContent = "Please select the Address";
                    }
                    else if (transferEnquiryData.enTRCountryCode == 0 || transferEnquiryData.enTRCountryCode == null) {
                        document.getElementById("id_Country").style.display = 'block';
                        document.getElementById("id_Country").textContent = "Please select the Country";
                    }
                    else if (MakeEmptyStringWhenNull(transferEnquiryData.enTRFaxNo == null ? transferEnquiryData.enTRFaxNo : transferEnquiryData.enTRFaxNo.trim()) == "") {
                        document.getElementById("id_TravellerFax").style.display = 'block';
                        document.getElementById("id_TravellerFax").textContent = "Please enter the Fax";
                    }
                    else if (MakeEmptyStringWhenNull(transferEnquiryData.enEDOrderRef == null ? transferEnquiryData.enEDOrderRef : transferEnquiryData.enEDOrderRef.trim()) == "") {
                        document.getElementById("id_EDOOrderRef").style.display = 'block';
                        document.getElementById("id_EDOOrderRef").textContent = "Please enter the Order reference";
                    }
                    else if (MakeEmptyStringWhenNull(transferEnquiryData.enEDTripType == null ? transferEnquiryData.enEDTripType : transferEnquiryData.enEDTripType.trim()) == "") {
                        document.getElementById("id_TripType").style.display = 'block';
                        document.getElementById("id_TripType").textContent = "Please select the Trip Type";
                    }
                    else {
                        saveClient(transferEnquiryData, saveThisEnq);
                    }
                }
                else {
                    saveClient(transferEnquiryData, saveThisEnq);
                }
            }
            else {
                alert("Arrival  is greater than departure");
            }

            $("#idDTenEDSourceCode").click(function () {
                document.getElementById("idSourceCode").style.display = 'none';
            });
            $("#idDTenEDUserAssigned").click(function () {
                document.getElementById("id_UserAssigned").style.display = 'none';
            });
            $("#idDTenEDBudgetCurrency").click(function () {
                document.getElementById("id_BudgetCurrency").style.display = 'none';
            });
            $("#idDTenCDCountryCode").click(function () {
                document.getElementById("id_ClientCountry").style.display = 'none';
            });
            $("#idDTenTRClientGroup").click(function () {
                document.getElementById("id_enTRClientGroup").style.display = 'none';
            });
            $("#idDTenCDClientGroup").click(function () {
                document.getElementById("id_enCDClientGroup").style.display = 'none';
            });
            $("#idDTenEDTotalPassengers").click(function () {
                document.getElementById("id_enEDTotalPassengers").style.display = 'none';
            });
            $("#idDTenTotalPassengers").click(function () {
                document.getElementById("id_enEDTotalPassengers").style.display = 'none';
            });
        }

        $scope.doReset = function () {
            enquiryDataservice.trackingCancelSaveEnquiry(userCode, enqRef);
            reset();
        };

        function progressWordCreate() {
            var progressValue = $scope.DTEnquiry.enProgress;
            console.log($scope.DTEnquiry.enManualStatus);
            if ($scope.DTEnquiry.enManualStatus != null && progressValue != "70") {
                $("#manualStatusReason").show();
                if ($scope.DTEnquiry.enManualStatus == "Book Now") {
                    $scope.manualStatusReason = "Book Now Opened";
                }
                else {
                    $scope.manualStatusReason = $scope.DTEnquiry.enManualStatus;
                }
            }
            else {
                $("#manualStatusReason").hide();
            }
            if (progressValue != "70") {
                $("#statusReason").hide();
            }
            else {
                $("#statusReason").show();
            }
            var strProgressWord = '';
            switch (progressValue) {
                case '10':
                    strProgressWord = 'New';
                    break;
                case '20':
                    strProgressWord = 'Assigned';
                    break;
                case '30':
                    strProgressWord = 'Actioned';
                    break;
                case '40':
                    strProgressWord = 'Closed';
                    break;
                case '60':
                    strProgressWord = 'Deleted';
                    break;
                case '70': {
                    strProgressWord = 'Action required';
                    enquiryDataservice.ShowStatusReason(enqRef)
                        .success(function (reason) {
                            console.log(reason);
                            if (reason == "Email Received from Client" || reason == "Email Received From Landlord") {
                                console.log(reason);
                                if (reason == "Email Received from Client") {
                                    $("#emailReceivedProgress").removeClass("label-danger").addClass("label-purple");
                                    $("#emailReceivedProgress").css('cursor', 'pointer').attr('title', 'Email From Client');
                                }
                                else if (reason == "Email Received From Landlord") {
                                    $("#emailReceivedProgress").removeClass("label-danger").addClass("label-pink");
                                    $("#emailReceivedProgress").css('cursor', 'pointer').attr('title', 'Email From Landlord');
                                }
                                reason = "Email Received";
                            }
                            if (reason == "Secure Booking Form Received") {
                                $("#emailReceivedProgress").css('cursor', 'pointer').attr('title', 'CC details received. See Action tab or go direct to Shortlist and look for Credit Card icon on the Shortlist Tab');
                            }
                            if (reason == "Payment Done") {
                                $("#emailReceivedProgress").removeClass("label-danger").addClass("label-purple");
                            }
                            $scope.ActionRequired = reason;
                        });
                }
                    break;
                case '80':
                    strProgressWord = 'Possible duplicate';
                    break;
                default:
                    strProgressWord = 'New';
            }

            $scope.DTEnquiry.enEDProgressWord = strProgressWord;
            return;
        }

        $scope.NavigateToTab = function (status) {
            if (status == 'Landlord Responded') {
                $state.go("detailsTab.shortlist", { enqRef: $scope.DTEnquiry.enCode });
            }
            if (status == 'NextAction < Current time') {
                $state.go("detailsTab.shortlist", { enqRef: $scope.DTEnquiry.enCode });
            }
            if (status == 'Email Received') {
                trackingRecordsDataService.getRepliedEmailFromTrakingRecord($scope.DTEnquiry.enCode)
                    .success(function (record) {
                        $scope.TrackingRecord = record;
                        console.log($scope.TrackingRecord);
                        $scope.Body = angular.fromJson($sce.trustAsHtml(record.Body));
                        console.log($scope.Body);
                        $("#emailreceived").modal("show");
                    });
            }
            if (status == 'Book Now Opened' || status == 'Booking Form Received') {
                console.log(status);
                emailStatusService.getBookNowAcknowledgementEmail($scope.DTEnquiry.enCode, status)
                    .success(function (email) {
                        $scope.TrackingRecord = email;
                        console.log($scope.TrackingRecord);
                        $scope.Body = angular.fromJson($sce.trustAsHtml(email.Body));
                        console.log($scope.Body);
                        if (status == 'Book Now Opened')
                            $scope.hideAttachments = true;
                        else
                            $scope.hideAttachments = false;
                        $("#emailreceived").modal("show");
                    });
            }
        }

        $scope.ShowAttachments = function (id) {
            console.log("Email Id:" + id);
            trackingRecordsDataService.getAttachments(id)
                .success(function (attachments) {
                    $scope.AttachmentsList = attachments;
                    console.log($scope.AttachmentsList);
                    $('#myAttachments').modal('show');
                });
        }

        $scope.ShowAttachment = function (attachmentPath) {
            console.log(attachmentPath);
            var myWindow = window.open(attachmentPath, "scrollbars=1,width=1000, height=1000");
        }

        function progressCSSCreate() {
            var progressValue = $scope.DTEnquiry.enProgress;
            var strProgressCSS = '';
            switch (progressValue) {
                case '10':
                    strProgressCSS = 'label-success';
                    break;

                case '20':
                    strProgressCSS = 'label-warning';
                    break;

                case '30':
                    strProgressCSS = 'label-info';
                    break;
                case '40':
                    strProgressCSS = '';
                    break;
                case '50':
                    strProgressCSS = '';
                    break;
                case '60':
                    strProgressCSS = '';
                    break;
                case '70':
                    strProgressCSS = 'label-danger';
                    break;
                case '80':
                    strProgressCSS = 'label-success';
                    break;
                default:
                    strProgressCSS = 'label-success';
            }
            $scope.DTEnquiry.enEDProgressCSS = strProgressCSS;
            return;
        }

        function initialiseDetailsTab(enquiry) {

            if (!$scope.DTEnquiry.enECIDType) $scope.DTEnquiry.enECIDType = " ";
            if (!$scope.DTEnquiry.enCDGroupContact) $scope.DTEnquiry.enCDGroupContact = " ";
            if (!$scope.DTEnquiry.enEDTripType) $scope.DTEnquiry.enEDTripType = " ";
            if ($scope.DTEnquiry.enECBookingNotes) {
                var element = document.getElementById("EnquiryClosure");
                element.classList.remove("collapsed");
                var toggleElement = document.getElementById("ToggleClosure");
                toggleElement.classList.remove("fa-chevron-down");
                toggleElement.classList.add("fa-chevron-up");
            }

            primaryContactChoice(enquiry);

            $("#idECTransferRequired").prop('checked', false);
            if (enquiry.enECTransferRequired !== undefined && enquiry.enECTransferRequired !== null) {
                if (enquiry.enECTransferRequired == 1) {
                    $("#idECTransferRequired").prop('checked', true);
                }
            }
            $("#idECReOpen").prop('checked', false);
            $("#idECReOpenClose").prop('checked', false);

            if (enquiry.enECReOpen !== undefined && enquiry.enECReOpen !== null) {
                if (enquiry.enECReOpen == 1) {
                    $("#idDTenECReOpen").prop('checked', true);
                    $("#idDTenECReOpenClose").prop('checked', false);
                } else {
                    $("#idDTenECReOpen").prop('checked', false);
                    $("#idDTenECReOpenClose").prop('checked', true);

                }
            }
            getdetails($scope.DTEnquiry.enEDSourceCode);
            $rootScope.globalProgress = $scope.DTEnquiry.enProgress;
            progressWordCreate();
            progressCSSCreate();
        }

        $scope.doPrimaryContactChoiceCD = function () {
            if ($scope.DTEnquiry.enCDFirstName == null && $scope.DTEnquiry.enCDLastName == null) {
                document.getElementById("id_ClientPrimaryContact").style.display = 'block';
                document.getElementById("id_ClientPrimaryContact").textContent = "Please fill the name of the client before making it as primary contact";
                $("#id_enCDPrimaryContact").prop('checked', false);
            }
            else {
                $scope.DTEnquiry.enCDPrimaryContact = 1;
                $scope.DTEnquiry.enTRPrimaryContact = 0;
                $scope.DTEnquiry.enED1PrimaryContact = 0;
                primaryContactChoice($scope.DTEnquiry);
            }
        }

        $scope.doPrimaryContactChoiceTR = function () {
            $scope.DTEnquiry.enCDPrimaryContact = 0;
            $scope.DTEnquiry.enTRPrimaryContact = 1;
            $scope.DTEnquiry.enED1PrimaryContact = 0;
            primaryContactChoice($scope.DTEnquiry);
        }

        $scope.doPrimaryContactChoiceED1 = function () {
            if ($scope.DTEnquiry.enED1FirstName == null && $scope.DTEnquiry.enED1LastName == null) {
                document.getElementById("id_EnquiryPrimaryContact").style.display = 'block';
                document.getElementById("id_EnquiryPrimaryContact").textContent = "Please fill the name in the enquiry before making it as primary contact";
                $("#id_enED1PrimaryContact").prop('checked', false);
            }
            else {
                $scope.DTEnquiry.enCDPrimaryContact = 0;
                $scope.DTEnquiry.enTRPrimaryContact = 0;
                $scope.DTEnquiry.enED1PrimaryContact = 1;
                primaryContactChoice($scope.DTEnquiry);
            }
        }

        function primaryContactChoice(enquiry) {
            $("#idCDPrimaryContact").prop('checked', false);
            if (enquiry.enCDPrimaryContact !== undefined && enquiry.enCDPrimaryContact !== null) {
                if (enquiry.enCDPrimaryContact == 1) {
                    $scope.DTEnquiry.enPrimaryContactName = $scope.DTEnquiry.enCDTitle + " " + $scope.DTEnquiry.enCDFirstName + " / " + $scope.DTEnquiry.enCDLastName;
                    $scope.DTEnquiry.enPrimarySalutation = $scope.DTEnquiry.enCDTitle + " " + $scope.DTEnquiry.enCDFirstName + " " + $scope.DTEnquiry.enCDLastName;
                    $scope.enCDPrimaryContact = 1;
                    $scope.DTEnquiry.enTRPrimaryContact = 0;
                    $scope.DTEnquiry.enED1PrimaryContact = 0;
                    $("#idCDPrimaryContact").prop('checked', true);
                    $("#idTRPrimaryContact").prop('checked', false);
                    $("#idED1PrimaryContact").prop('checked', false);
                }
            }
            $("#idTRPrimaryContact").prop('checked', false);
            if (enquiry.enTRPrimaryContact !== undefined && enquiry.enTRPrimaryContact !== null) {
                if (enquiry.enTRPrimaryContact == 1) {
                    $scope.DTEnquiry.enPrimaryContactName = $scope.DTEnquiry.enTRTitle + " " + $scope.DTEnquiry.enTRFirstName + " / " + $scope.DTEnquiry.enTRLastName;
                    $scope.DTEnquiry.enPrimarySalutation = $scope.DTEnquiry.enTRTitle + " " + $scope.DTEnquiry.enTRFirstName + " " + $scope.DTEnquiry.enTRLastName;
                    $scope.DTEnquiry.enCDPrimaryContact = 0;
                    $scope.DTEnquiry.enTRPrimaryContact = 1;
                    $scope.DTEnquiry.enED1PrimaryContact = 0;
                    $("#idTRPrimaryContact").prop('checked', true);
                    $("#idCDPrimaryContact").prop('checked', false);
                    $("#idED1PrimaryContact").prop('checked', false);
                }
            }

            $("#idED1PrimaryContact").prop('checked', false);
            if (enquiry.enED1PrimaryContact !== undefined && enquiry.enED1PrimaryContact !== null) {
                if (enquiry.enED1PrimaryContact == 1) {
                    $scope.DTEnquiry.enPrimaryContactName = $scope.DTEnquiry.enED1Title + " " + $scope.DTEnquiry.enED1FirstName + " / " + $scope.DTEnquiry.enED1LastName;
                    $scope.DTEnquiry.enPrimarySalutation = $scope.DTEnquiry.enED1Title + " " + $scope.DTEnquiry.enED1FirstName + " " + $scope.DTEnquiry.enED1LastName;
                    $scope.DTEnquiry.enCDPrimaryContact = 0;
                    $scope.DTEnquiry.enTRPrimaryContact = 0;
                    $scope.DTEnquiry.enED1PrimaryContact = 1;
                    $("#idED1PrimaryContact").prop('checked', true);
                    $("#idTRPrimaryContact").prop('checked', false);
                    $("#idCDPrimaryContact").prop('checked', false);
                }
            }
            $scope.$apply();
        }

        // Watch functions
        //----------------
        // Assigned User Status
        //=====================
        $scope.$watch('DTEnquiry.enEDUserAssigned', function (newValue, oldValue) {
            if (newValue !== oldValue) {

                if ($scope.DTEnquiry.enEDProgressWord !== undefined && ($scope.DTEnquiry.enProgress == '10' || $scope.DTEnquiry.enProgress == '80')) {
                    $rootScope.userAssignedRecordTracked = true;
                    $scope.DTEnquiry.enProgress = '20';
                    $rootScope.globalEnProgress = '20';
                    progressWordCreate();
                    progressCSSCreate();

                    userDataService.getUser($scope.DTEnquiry.enEDUserAssigned)
                        .then(function (ret) {
                            var userRecord = ret.data;
                            if (userRecord[0] !== undefined) {
                                console.log(userRecord[0].usCode);
                                //Google Analytics
                                ga('send', 'event', 'Details Tab', 'Assigned the Enquiry ', +enqRef + ' to ' + userRecord[0].usCode + ' by ' + userCode);
                                $rootScope.globalEnEDAssignedUser = userRecord[0].usFirstName.substring(0, 1) + ". " + userRecord[0].usLastName;
                                $scope.DTEnquiry.enEDDayLastActioned = $filter('date')(new Date(), 'dd').replace(/^0+/, '');
                                $scope.DTEnquiry.enEDMonthLastActioned = $filter('date')(new Date(), 'MM').replace(/^0+/, '');
                                $scope.DTEnquiry.enEDYearLastActioned = $filter('date')(new Date(), 'yyyy');
                                $scope.DTEnquiry.enEDLastTimeActioned = $filter('date')(new Date(), 'HH:mm');
                                $scope.DTEnquiry.enEDDayNextActioned = $filter('date')(new Date().addHours(2), 'dd').replace(/^0+/, '');
                                $scope.DTEnquiry.enEDMonthNextActioned = $filter('date')(new Date().addHours(2), 'MM').replace(/^0+/, '');
                                $scope.DTEnquiry.enEDYearNextActioned = $filter('date')(new Date().addHours(2), 'yyyy');
                                $scope.DTEnquiry.enEDNextTimeActioned = $filter('date')(new Date().addHours(2), 'HH:mm');
                                writeUserTrackingRecord();
                            }
                        })
                        .catch(function (err) { logger.error("Failed to FIND User description " + err) });
                }
            }

            function writeUserTrackingRecord() {
                // Action Date is 2 hours + now . This could need changing sometime to a global option and also deal with business hours
                var d1 = new Date();
                //d1.setMinutes(d1.getMinutes() + 120);
                d1.addHours(2);
                $scope.DTEnquiry.enEDDateNextAction = $filter('date')(d1, 'MM/dd/yyyy HH:mm');
                var d2 = new Date();
                $scope.enEDDateLastActioned = $filter('date')(d2, 'MM/dd/yyyy HH:mm');

                // Save the Action away to TrackingRecords
                var trackingRecord = {
                    "trenCode": enqRef,
                    "trStatus": "L",
                    "trDateStamp": new Date(),
                    "trTimeStamp": $filter('date')(new Date(), ' HH:mm'),
                    "trUserCode": document.getElementById("userCode").value,
                    "trType": "AC",
                    "trDescription": "Enquiry Assigned to .. " + $rootScope.globalEnEDAssignedUser,
                    "trNextActionDate": $scope.DTEnquiry.enEDDateNextAction,
                    "trNextActionTime": d1.toLocaleTimeString().replace("/.*(\d{2}:\d{2}:\d{2}).*/", "$1")
                }

                var promiseSave = trackingRecordsDataService.createTrackingRecord(trackingRecord)
                    .then(function (ret) { logger.info("Saved Tracking Record ") })
                    .catch(function (err) { logger.error("Failed to CREATE Tracking Record " + err) });

                $rootScope.setPossibleDuplicates = true;
                if ($scope.DTEnquiry.enAcknowledgementSent == true) {
                    $rootScope.setPossibleDuplicates = false;
                    save(enqRef, false);
                }
            }
        }, true);

        // Closed Enquiry Status
        //=====================
        $scope.$watch('DTEnquiry.enECDeadReasonCode', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.DTEnquiry.enEDProgressWord !== undefined && $scope.DTEnquiry.enECDeadReasonCode !== null) {
                    // removed condition && $scope.DTEnquiry.enProgress > '10'
                    var deadReasonName = "";
                    var promiseGet = deadReasonsDataService.getDeadReason($scope.DTEnquiry.enECDeadReasonCode)
                        .then(function (deadReasons) {
                            //deadReasonName = deadReasons.data.drReason;
                            deadReasonName = deadReasons.data.drReason;
                            var commaSeparatedInt = /^([0-9,]*)$/;
                            console.log($('#idDTenECFiveStarRef').val());
                            if (deadReasonName.toUpperCase() == "BOOKED TO FIVESTAR" && ($('#idDTenECFiveStarRef').val() == null || $('#idDTenECFiveStarRef').val() == "")) {
                                //document.getElementById("id_enECFiveStarRef").style.display = 'block';
                                //document.getElementById("id_enECFiveStarRef").textContent = "Please enter Five Star reference before selecting the closed reason as 'Booked to Fivestar'";
                                //$scope.DTEnquiry.enECDeadReasonCode = null;

                                enquiryDataservice.getAllEnquiryDetails($scope.DTEnquiry.enCode)
                                    .success(function (enquiryDetails) {
                                        console.log("enquiryDetails");
                                        console.log(enquiryDetails);
                                        $scope.enquiryData = enquiryDetails;
                                        console.log("Getting details of enquiry: " + enquiryDetails.enCode);
                                        console.log($scope.enquiryData);
                                        $("#saveDetailsToFivewin").modal("show");
                                    });
                            }
                            else if (deadReasonName.toUpperCase() == "BOOKED TO FIVESTAR" && !(commaSeparatedInt.test($('#idDTenECFiveStarRef').val()))) {
                                document.getElementById("id_enECFiveStarRef").style.display = 'block';
                                document.getElementById("id_enECFiveStarRef").textContent = "Please provide comma separated Fivestar reference values. Example: 123456,123457";
                                $scope.DTEnquiry.enECDeadReasonCode = null;
                            }
                            else {
                                document.getElementById("id_enECFiveStarRef").style.display = 'none';
                                alert("Closing the Enquiry ");
                                if (deadReasonName.match(/test/gi)) {
                                    enqSourcesFactory.changeEnquirySourceCode($scope.DTEnquiry.enCode).then(function (sourceCode) {
                                        $scope.DTEnquiry.enEDSourceCode = sourceCode.data;
                                    });

                                }
                                $scope.DTEnquiry.enProgress = '40';
                                $rootScope.globalEnProgress = '40';
                                progressWordCreate();
                                progressCSSCreate();

                                //Google Analytics
                                ga('send', 'event', 'Details Tab', 'Closed the Enquiry ', +enqRef + ' by ' + userCode + ' for the reason of ' + '"' + deadReasons.data.drReason + '"');

                                $scope.DTEnquiry.enEDDayLastActioned = $filter('date')(new Date(), 'dd').replace(/^0+/, '');
                                $scope.DTEnquiry.enEDMonthLastActioned = $filter('date')(new Date(), 'MM').replace(/^0+/, '');
                                $scope.DTEnquiry.enEDYearLastActioned = $filter('date')(new Date(), 'yyyy');
                                $scope.DTEnquiry.enEDLastTimeActioned = $filter('date')(new Date(), 'HH:mm');
                                $scope.DTEnquiry.enEDDayNextActioned = $filter('date')(new Date().addHours(2), 'dd').replace(/^0+/, '');
                                $scope.DTEnquiry.enEDMonthNextActioned = $filter('date')(new Date().addHours(2), 'MM').replace(/^0+/, '');
                                $scope.DTEnquiry.enEDYearNextActioned = $filter('date')(new Date().addHours(2), 'yyyy');
                                $scope.DTEnquiry.enEDNextTimeActioned = $filter('date')(new Date().addHours(2), 'HH:mm');
                                $scope.DTEnquiry.enManualStatus = "Closed";
                                writeDeadReason(deadReasonName);
                            }
                        })
                        .catch(function (err) {
                            alert(err);
                            logger.error("Failed to get Dead Reason description " + err);
                        });
                }
            }

            $scope.saveEnquiryDetailsToFivewin = function () {                
                
                if (($("#id_bookedProperty").find("option:selected").text() === "") || ($("#id_bookedProperty").find("option:selected").text() === undefined)) {
                    $rootScope.validateBookedProperty = true;
                    return;
                }
                else if (($("#id_bookedPropertyAprtmentType").find("option:selected").text() === "") || ($("#id_bookedPropertyAprtmentType").find("option:selected").text() === undefined)) {
                    $rootScope.validateBookedPropertyApartmentType = true;
                    return;
                }
                var propertyId = JSON.parse($("#id_bookedProperty").find("option:selected").val()).prPropertyCode;
                console.log(propertyId);
                $scope.enquiryData.enEDApartmentTypeName = $("#id_bookedPropertyAprtmentType").find("option:selected").val();
                $("#saveDetailsToFivewin").modal("hide");
                $("#SavingDetails").modal("show");
                console.log("Passed to fivestar via API");
                var enquiryDetails = $scope.enquiryData;
                console.log("enquiry");
                console.log(enquiryDetails);
                enquiryDataservice.saveEnquiryDetails(enquiryDetails, propertyId).success(function (id) {
                    $("#SavingDetails").modal("hide");
                        $scope.DTEnquiry.enECFiveStarRef = id;
                        var closedReason = "Booked to Fivestar";
                        $scope.DTEnquiry.enProgress = '40';
                        $rootScope.globalEnProgress = '40';
                        $scope.DTEnquiry.enManualStatus = "Closed";
                        progressWordCreate();
                        progressCSSCreate();
                        writeDeadReason(closedReason);
                });
            };

            $("#id_bookedProperty").focus(function () {
                $rootScope.validateBookedProperty = false;
            });

            $("#id_bookedPropertyAprtmentType").focus(function () {
                $rootScope.validateBookedPropertyApartmentType = false;
            });

            $scope.dontSaveDetailsToFivewin = function () {
                console.log("declined API push to fivestar");
                if (MakeEmptyStringWhenNull($("#idDTenECFiveStarRef").val()) == "") {
                    $rootScope.validateBookedProperty = false;
                    $rootScope.validateBookedPropertyApartmentType = false;
                    document.getElementById("id_bookedPropertyAprtmentType").value = null;
                    document.getElementById("id_bookedProperty").value = null;
                    $("#saveDetailsToFivewin").modal("hide");
                    document.getElementById("id_enECFiveStarRef").style.display = 'block';
                    document.getElementById("id_enECFiveStarRef").textContent = "Please enter Five Star reference before selecting the closed reason as 'Booked to Fivestar'";
                    $scope.DTEnquiry.enECDeadReasonCode = null;
                }
                else {
                    enquiryDataservice.dontSaveEnquiryDetails($scope.enquiryData).success(function (details) {
                        $("#saveDetailsToFivewin").modal("hide");
                        var closedReason = "Booked to Fivestar";
                        $scope.DTEnquiry.enProgress = '40';
                        $rootScope.globalEnProgress = '40';
                        $scope.DTEnquiry.enManualStatus = "Closed";
                        progressWordCreate();
                        progressCSSCreate();
                        writeDeadReason(closedReason);
                    });
                }
            }

            function writeDeadReason(deadReasonName) {
                $rootScope.globalDeadReasonCode = $scope.enECDeadReasonCode;
                var d1 = new Date();
                //d1.setMinutes(d1.getMinutes() + 120);
                d1.addHours(2);
                $scope.DTEnquiry.enEDDateNextAction = $filter('date')(d1, 'MM/dd/yyyy');
                var d2 = new Date();
                $scope.enEDDateLastActioned = $filter('date')(d2, 'MM/dd/yyyy');

                // Save the Action away to TrackingRecords
                var trackingRecord = {
                    "trenCode": enqRef,
                    "trStatus": "L",
                    "trDateStamp": new Date(),
                    "trTimeStamp": $filter('date')(new Date(), ' HH:mm'),
                    "trUserCode": document.getElementById("userCode").value,
                    "trType": "AC",
                    "trDescription": "Enquiry Closed .. Reason is " + deadReasonName
                }

                var promiseSave = trackingRecordsDataService.createTrackingRecord(trackingRecord)
                    .then(function (ret) { logger.info("Saved Tracking Record ") })
                    .catch(function (err) { logger.error("Failed to CREATE Tracking Record " + err) });

                $scope.DTEnquiry.enECReOpen = 0;
                save(enqRef, false);
                if (MakeEmptyStringWhenNull($rootScope.Properties) != "" && (deadReasonName == "Not enough Budget" || deadReasonName == "Went with another agent" || deadReasonName == "We couldn't help")) {
                    $rootScope.validateReason = false;
                    $("#id-turndownReport").modal("show");
                }

            }
        }, true);

        $scope.getApartments = function () {
            var property = JSON.parse( $("#id_bookedProperty").find("option:selected").val());
            console.log(property);
            $scope.apartmentTypes = property.ApartmentTypes;
        }

        getPropertiesWithAvailabilityReasons();
        function getPropertiesWithAvailabilityReasons() {
            enquiryDataservice.getAvailabilityReasons()
                .success(function (availabilityReasons) {
                    chosenPropertiesFactory.getChosenProperties(enqRef)
                        .success(function (properties) {
                            $rootScope.AvailabilityReasons = availabilityReasons;
                            $rootScope.Properties = properties;
                            console.log($rootScope.AvailabilityReasons);
                            console.log($rootScope.Properties);
                        });
                });
        }

        $scope.saveReport = function () {
            if (MakeEmptyStringWhenNull($rootScope.Properties) != "") {
                var length = $rootScope.Properties.length;
                for (var i = 0; i < length; i++) {
                    console.log($("#id-availabilityReasons" + i).find("option:selected").val());
                    if ($("#id-availabilityReasons" + i).find("option:selected").val() == "") {
                        console.log($("#id-availabilityReasons" + i).find("option:selected").text());
                        $rootScope.validateReason = true;
                        return;
                    }
                }
                $("#id-turndownReport").modal("hide");
            }
        }

        $scope.saveAvailabilityReason = function (property, reason) {
            console.log("save reason");
            console.log(property);
            console.log(reason);
            enquiryDataservice.saveAvailabilityReason(enqRef, property.prPropertyCode, reason.av_Id)
                .success(function (status) {
                    $scope.status = status;
                });
        }

        $scope.selectedTravellerCountry = function (enTRCountryCode) {
            if (enTRCountryCode != null || enTRCountryCode > 0) {
                document.getElementById("id_Country").style.display = 'none';
            }
        }

        $scope.selectedClientCountry = function (enCDCountryCode) {
            if (enCDCountryCode != null || enCDCountryCode > 0) {
                document.getElementById("id_ClientCountry").style.display = 'none';
            }
        }

        $scope.selectedTripType = function (enEDTripType) {
            if (!(MakeEmptyStringWhenNull(enEDTripType.trim()) == "")) {
                document.getElementById("id_TripType").style.display = 'none';
            }
        }

        $("#btn_upload").show();
        $("#btn_delete").hide();
        $("#lbl_validationUpload").hide();

        $("#btn_upload2").show();
        $("#btn_delete2").hide();
        $("#lbl_validationUpload2").hide();

        $scope.DeleteUploadedImage = function () {
            var enqRefNo = enqRef;
            enquiryDataservice.DeleteImage(enqRefNo)
                .success(function (status) {
                    $scope.Status = status;
                    if ($scope.Status == "Success") {
                        $("#btn_upload").show();
                        $("#btn_delete").hide();
                        $("#image_hide").hide();
                    }
                });
        }

        $scope.DeleteUploadedImagePath = function () {
            var enqRefNo = enqRef;
            enquiryDataservice.DeleteImagePath(enqRefNo)
                .success(function (status) {
                    $scope.StatusOfPath = status;
                    if ($scope.StatusOfPath == "Success") {
                        $("#btn_upload2").show();
                        $("#btn_delete2").hide();
                        $("#image_hide2").hide();
                    }
                });
        }

        getImage();
        function getImage() {
            $scope.image_hide = false;
            var enqRefNo = enqRef;
            enquiryDataservice.EditImage(enqRefNo)
                .success(function (imagePath) {
                    $scope.imageUrl = imagePath;
                    if ($scope.imageUrl == null || $scope.imageUrl == "" || $scope.imageUrl == undefined) {
                        $("#btn_upload").show();
                        $("#btn_delete").hide();
                    }
                    else {
                        $("#btn_upload").hide();
                        $("#btn_delete").show();
                    }
                });
        }

        getImagePath();
        function getImagePath() {
            $scope.image_hide2 = false;
            var enqRefNo = enqRef;
            enquiryDataservice.EditImagePath(enqRefNo)
                .success(function (imagePath) {
                    $scope.imageUrl2 = imagePath;
                    if ($scope.imageUrl2 == null || $scope.imageUrl2 == "" || $scope.imageUrl2 == undefined) {
                        $("#btn_upload2").show();
                        $("#btn_delete2").hide();
                    }
                    else {
                        $("#btn_upload2").hide();
                        $("#btn_delete2").show();
                    }
                });
        }


        //Image Upload       
        var readURL = function (input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                var enqRefNo = enqRef;
                var file = document.getElementById('imageUpload').files[0];
                console.log(file);
                console.log(enqRefNo);
                var xhr = new XMLHttpRequest();
                var fd = new FormData();
                fd.append("file", file);
                xhr.open("POST", "/EnquiryFileUpload/SaveImagePath?enqRefNo=" + enqRefNo, true);
                xhr.send(fd);
                xhr.addEventListener("load", function (event) {
                    console.log(event.target.response);
                    $scope.imageUrl = event.target.response;
                    $("#btn_upload").hide();
                    $("#btn_delete").show();
                    $("#image_hide").show();
                    if (event.target.response == "Please select a file") {
                        $("#lbl_validationUpload").show();
                        $("#btn_upload").show();
                    }
                }, false);
                reader.onload = function (e) {
                    $('.profile-pic').attr('src', e.target.result);
                }
                reader.readAsDataURL(input.files[0]);
            }
        }
        $(".file-upload").on('change', function () {
            readURL(this);
        });

        $(".upload-button").on('click', function () {
            $(".file-upload").click();
        });

        var readImageFile = function (input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                var enqRefNo = enqRef;
                var file = document.getElementById('imageUpload2').files[0];
                console.log(file);
                console.log(enqRefNo);
                var xhr = new XMLHttpRequest();
                var fd = new FormData();
                fd.append("file", file);
                xhr.open("POST", "/EnquiryFileUpload/SaveImage?enqRefNo=" + enqRefNo, true);
                xhr.send(fd);
                xhr.addEventListener("load", function (event) {
                    console.log(event.target.response);
                    $scope.imageUrl2 = event.target.response;
                    $("#btn_upload2").hide();
                    $("#btn_delete2").show();
                    $("#image_hide2").show();
                    if (event.target.response == "Please select a file") {
                        $("#lbl_validationUpload2").show();
                        $("#btn_upload2").show();
                    }
                }, false);
                reader.onload = function (e) {
                    $('.profile-pic2').attr('src', e.target.result);
                }
                reader.readAsDataURL(input.files[0]);
            }
        }

        $(".file-upload2").on('change', function () {
            readImageFile(this);
        });

        $(".upload-button2").on('click', function () {
            $(".file-upload2").click();
        });

        $rootScope.GetClientDetails = function (clientGroup) {
            enquiryDataservice.GetClientDetails(clientGroup).then(function (clientDetails) {
                console.log(clientDetails);
                $("#modalBodyId").html(clientDetails.data);
                $('#id_clientGroupDetails').modal('show');
            });
        };

        // Reopen Enquiry Status
        //=====================
        $scope.$watch('DTEnquiry.enECReOpen', function (newValue, oldValue) {
            if (newValue !== oldValue) {


                if ($scope.DTEnquiry.enEDProgressWord !== undefined && $scope.DTEnquiry.enProgress == '40' && $scope.DTEnquiry.enECReOpen == '1') {
                    alert("Reopening the Enquiry ");
                    //Google Analytics
                    ga('send', 'event', 'Details Tab', 'Reopened the Enquiry', +enqRef + ' by ' + userCode);
                    $scope.DTEnquiry.enProgress = '30';
                    $rootScope.globalEnProgress = '30';
                    progressWordCreate();
                    progressCSSCreate();
                    $scope.DTEnquiry.enEDDayLastActioned = $filter('date')(new Date(), 'dd').replace(/^0+/, '');
                    $scope.DTEnquiry.enEDMonthLastActioned = $filter('date')(new Date(), 'MM').replace(/^0+/, '');
                    $scope.DTEnquiry.enEDYearLastActioned = $filter('date')(new Date(), 'yyyy');
                    $scope.DTEnquiry.enEDLastTimeActioned = $filter('date')(new Date(), 'HH:mm');
                    $scope.DTEnquiry.enEDDayNextActioned = $filter('date')(new Date().addHours(2), 'dd').replace(/^0+/, '');
                    $scope.DTEnquiry.enEDMonthNextActioned = $filter('date')(new Date().addHours(2), 'MM').replace(/^0+/, '');
                    $scope.DTEnquiry.enEDYearNextActioned = $filter('date')(new Date().addHours(2), 'yyyy');
                    $scope.DTEnquiry.enEDNextTimeActioned = $filter('date')(new Date().addHours(2), 'HH:mm');
                    $scope.DTEnquiry.enManualStatus = "";
                    // Action Date is 2 hours + now . This could need changing sometime to a global option and also deal with business hours
                    var d1 = new Date();
                    //d1.setMinutes(d1.getMinutes() + 120);
                    d1.addHours(2);
                    $scope.DTEnquiry.enEDDateNextAction = $filter('date')(d1, 'MM/dd/yyyy');
                    var d2 = new Date();
                    $scope.enEDDateLastActioned = $filter('date')(d2, 'MM/dd/yyyy');


                    // Save the Action away to TrackingRecords
                    var trackingRecord = {
                        "trenCode": enqRef,
                        "trStatus": "L",
                        "trDateStamp": new Date(),
                        "trTimeStamp": $filter('date')(new Date(), ' HH:mm'),
                        "trUserCode": document.getElementById("userCode").value,
                        "trType": "AC",
                        "trDescription": "Enquiry Reopened",
                        "trNextActionDate": $scope.DTEnquiry.enEDDateNextAction,
                        "trNextActionTime": d1.toLocaleTimeString().replace("/.*(\d{2}:\d{2}:\d{2}).*/", "$1")

                    }

                    var user = document.getElementById("divUserCode").value;
                    enquiryDataservice.createTrackingEntryWhenReopen(user, enqRef);
                    var promiseSave = trackingRecordsDataService.createTrackingRecord(trackingRecord)
                        .then(function (ret) { logger.info("Saved Tracking Record ") })
                        .catch(function (err) { logger.error("Failed to CREATE Tracking Record " + err) });

                    $scope.DTEnquiry.enECReOpen = 1;
                    $scope.DTEnquiry.enECDeadReasonCode = null;
                    $rootScope.globalDeadReasonCode = null;
                    save(enqRef, false);
                } else {
                    $scope.DTEnquiry.enECReOpen = 0;
                }
            }
        }, true);

        $("#idDTenTRAddress5").click(function () {
            document.getElementById("id_TravellerAddress").style.display = 'none';
        });
        $("#idDTenCDAddress5").click(function () {
            document.getElementById("id_ClientAddress").style.display = 'none';
        });
        $("#idDTenEDTripType").click(function () {
            document.getElementById("id_TripType").style.display = 'none';
        });
        $("#idDTenTRFaxNo").click(function () {
            document.getElementById("id_TravellerFax").style.display = 'none';
        });
        $("#idDTenEDOrderRef").click(function () {
            document.getElementById("id_EDOOrderRef").style.display = 'none';
        });
        $("#idDTenTRCountryCode").click(function () {
            document.getElementById("id_Country").style.display = 'none';
        });
        $("#id_enEmployeeId").click(function () {
            document.getElementById("id_EmployeeId").style.display = 'none';
        });
        $("#idDTenCDCountryCode").click(function () {
            document.getElementById("id_ClientCountry").style.display = 'none';
        });
        $("#idDTenCDFirstName").focus(function () {
            document.getElementById("id_ClientFirstName").style.display = 'none';
            document.getElementById("id_ClientPrimaryContact").style.display = 'none';
        });
        $("#emailaddress").focus(function () {
            document.getElementById("id_ClientEmail").style.display = 'none';
        });
        $("#idDTenTREmailAddress").focus(function () {
            document.getElementById("id_TravellerEmail").style.display = 'none';
        });
        $("#idDTenTRFirstName").focus(function () {
            document.getElementById("id_TravellerFirstName").style.display = 'none';
        });
        $("#idDTenTRLastName").focus(function () {
            document.getElementById("id_TravellerLastName").style.display = 'none';
        });
        $("#idDTenEDFirstName").focus(function () {
            document.getElementById("id_EnquiryPrimaryContact").style.display = 'none';
        });
        $("#idDTenCDCompanyName").focus(function () {
            document.getElementById("id_enCDCompanyName").style.display = 'none';
        });
        $("#idDTenTRCompanyName").focus(function () {
            document.getElementById("id_enTRCompanyName").style.display = 'none';
        });
        $("#idDTenEDBudgetAmount").focus(function () {
            document.getElementById("id_enEDBudgetAmount").style.display = 'none';
        });
        $("#idDTenTRClientGroup").focus(function () {
            document.getElementById("id_enTRClientGroup").style.display = 'none';
        });
        $("#idDTenEDCorrectedCity").focus(function () {
            document.getElementById("id_enEDCorrectedCity").style.display = 'none';
        });
        $("#idDTenECFiveStarRef").focus(function () {
            document.getElementById("id_enECFiveStarRef").style.display = 'none';
        });

        (function ($) {
            $('.spinner .btn:first-of-type').on('click', function () {
                var id = $(this).parents(".spinner").find("input").attr("id");
                if ($('.spinner #' + id).val() === '') {
                    $('.spinner #' + id).val(0);
                    $('.spinner #' + id).val(parseInt($('.spinner #' + id).val(), 10) + 1);
                }
                else {
                    $('.spinner #' + id).val(parseInt($('.spinner #' + id).val(), 10) + 1);
                }
            });
            $('.spinner .btn:last-of-type').on('click', function () {
                var id = $(this).parents(".spinner").find("input").attr("id");
                if ($('.spinner  #' + id).val() === 0) {
                    return false;
                }
                else {
                    $('.spinner  #' + id).val(parseInt($('.spinner  #' + id).val(), 10) - 1);
                }
            });
            $('.spinner .btn:last-of-type').on('click', function () {
                var id = $(this).parents(".spinner").find("input").attr("id");
                if ($('.spinner  #' + id).val() == -1) {
                    return $('.spinner  #' + id).val(parseInt($('.spinner  #' + id).val(), 10) + 1);
                }
                else if ($('.spinner  #' + id).val() == 'NaN') {
                    var a = $('.spinner  #' + id).val(0);
                    return a;
                }
            });

        })(jQuery);

    };
})();
