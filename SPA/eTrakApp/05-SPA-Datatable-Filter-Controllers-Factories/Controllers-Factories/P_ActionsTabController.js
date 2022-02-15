(function () {
    'use strict';

    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.controller('P_ActionsTab', ['$q', '$scope', '$rootScope', '$stateParams', '$state', '$timeout', '$filter', 'logger',
                        'R_EnquiriesService',
                        'R_TrackingRecordsService', 'R_PropertiesService',
                        controller]);

    function controller($q, $scope, $rootScope, $stateParams, $state, $timeout, $filter, logger,
                        enquiryDataService,
                        trackingRecordsDataService, chosenPropertiesFactory) {

        $rootScope.$state = $state;

        var enqRef = $stateParams.enqRef;

        if (enqRef > "0") {
            $('#idglbCurrentEnquiryRef').val(enqRef);
            $scope.glbCurrentEnquiryRef = enqRef;
        }
        else {
            enqRef = document.getElementById('idglbCurrentEnquiryRef').value;
        }

        $scope.actionTabs = {
            "atDeadReasonCode": null
        }
        $scope.actionTabs.atDeadReasonCode = null;
        $scope.actionTabs.atProgramCode = null;
        $scope.actionTabs.atProperties = $rootScope.APSProperties;

        $scope.disActionTabPage = {
            "disDateNextAction": null,
            "disTimeNextAction": null
        };

        // ensure the correct details are in place
        enqRef = $rootScope.globalEnCode;
        if (enqRef > "0") {
            $('#idglbCurrentEnquiryRef').val(enqRef);
            $scope.glbCurrentEnquiryRef = enqRef;
        } else {
            enqRef = document.getElementById('idglbCurrentEnquiryRef').value;
        }
        var userId = $('#idglbMainUserID').val();

        var userCode = document.getElementById("userCode").value;

        //Google Analytics 
        ga('send', 'event', 'Actions Tab', 'Entered The Actions Tab', 'by ' + userCode + ' in enquiry number ' + enqRef);

        //------------
        doBreadcrumbs();
        $rootScope.displayPV_CurrentEnquiry = false;

        $rootScope.TemplatesPresent = "No";
        if ($rootScope.body != undefined) {
            if ($rootScope.body != "") {
                $rootScope.globalEmailBody = $rootScope.body;
                $(".ideMailOutput").code('<span style="font-family: Verdana;font-size: 14px;background-color: rgb(255, 255, 255);">' + $rootScope.body + '</scan>');
                $scope.$apply();
                $rootScope.globalEmailBody = "";
                $rootScope.body = "";
            }
        }

        function doBreadcrumbs() {
            $rootScope.breadcrumbsValueGoTo = '> User Area > Enquiry # ' + enqRef;
            $rootScope.breadcrumbsValueAreHere = '> Actions';
            $rootScope.breadcrumbsValueUiSref = "detailsTab({enqRef: '" + $rootScope.glbCurrentEnquiryRef + "'})";
        }

        $scope.atReopenEnquiryButtonShow = false;

        function setTheClosedEnquiryButtons() {
            if ($rootScope.globalEnProgress !== "40") {
                $scope.atDisableDeadReasonButtonClass = "fa fa-times";
                $scope.atDisableDeadReasonButtonClassType = "btn-danger";
                $scope.atDisableDeadReasonButtonWords = "Close Enquiry";
                $scope.actionTabs.atDeadReasonCode = null;
                $scope.$apply();
            } else {
                $("#idATClosedCheckbox").prop('checked', true);
                $scope.atDisableDeadReasonButtonClass = "fa fa-check";
                $scope.atDisableDeadReasonButtonClassType = "btn-success";
                $scope.atDisableDeadReasonButtonWords = "Reopen Enquiry";
                $scope.actionTabs.atDeadReasonCode = null;
                $scope.$apply();
            }
        }

        function resetActionsRecord() {
            var d1 = new Date();
            d1.setMinutes(d1.getMinutes() + 120);
            var tobeTimeNextAction = "";

            if ($scope.DTEnquiry.enEDDateNextAction === null || $scope.DTEnquiry.enEDDateNextAction === undefined) {
                $scope.DTEnquiry.enEDDateNextAction = d1;
                $scope.DTEnquiry.enEDTimeNextAction = $filter('date')(d1, 'H:mm');
            }

            var d0 = new Date();
            d0 = $scope.DTEnquiry.enEDDateNextAction;
            $scope.disActionTabPage.disDateNextAction = $filter('date')(d0, 'dd-MMM-yyyy HH:mm') + '' + '(' + $scope.DTEnquiry.enEDUTCNextActioned + ')';
            $scope.disActionTabPage.disTimeNextAction = $scope.DTEnquiry.enEDTimeNextAction;
            var tobeMonthNextAction = $scope.DTEnquiry.enEDMonthNextActioned;
            var tobeDayNextAction = $scope.DTEnquiry.enEDDayNextActioned;
            var tobeYearNextAction = $scope.DTEnquiry.enEDYearNextActioned;
            var tobeNextTimeAction = $scope.DTEnquiry.enEDNextTimeActioned;
            tobeTimeNextAction = $scope.DTEnquiry.enEDTimeNextAction;
            var tobeUTCNextAction = $scope.DTEnquiry.enEDUTCNextActioned;

            $scope.actionsRecord = {
                "trenCode": enqRef,
                "trEmailID": null,
                "trStatus": 'L',
                "trDateStamp": new Date(),
                "trTimeStamp": $filter('date')(new Date(), ' HH:mm'),
                "trUserCode": $scope.DTEnquiry.enEDUserAssigned,
                "trType": 'NA',
                "trDescription": ' ',
                "trMonthNextAction": tobeMonthNextAction,
                "trDayNextAction": tobeDayNextAction,
                "trYearNextAction": tobeYearNextAction,
                "trNextTimeAction": tobeNextTimeAction,
                "trNextActionTime": tobeTimeNextAction,
                "trUTCNextAction": tobeUTCNextAction
            }

            setTheClosedEnquiryButtons();
            $scope.atPriority = 0;
            $scope.actionTabs.atDeadReasonCode = null;
            $scope.actionTabs.atDeadReasonCode = $rootScope.globalDeadReasonCode;
            console.log($scope.actionTabs.atDeadReasonCode);
            console.log($rootScope.enECFiveStarRef);
            $scope.actionTabs.enECFiveStarRef = $rootScope.globalEnFiveStarRef;
            console.log($scope.actionTabs.enECFiveStarRef);
            if ($scope.actionTabs.atDeadReasonCode === 0) {
                $scope.actionTabs.atDeadReasonCode = null;
            }
            $scope.$apply();
        }

        $scope.atResetActionsRecord = function () {
            resetActionsRecord();
        }

        $scope.atSaveActionsRecord = function () {

            if ($scope.atDisableDeadReasonButtonWords === "Close Enquiry when Saved" && ($scope.actionTabs.atDeadReasonCode === undefined || $scope.actionTabs.atDeadReasonCode === 0 || $scope.actionTabs.atDeadReasonCode === null)) {
                alert("You must give a reason for closing the enquiry");
                return;
            }
            if ($scope.atDisableDeadReasonButtonWords === "Close Enquiry when Saved") {
                $scope.actionsRecord.trDescription = "Enquiry Closed ... " + $scope.actionsRecord.trDescription;
            }
            if ($scope.atDisableDeadReasonButtonWords === "Reopen Enquiry when Saved") {
                $scope.actionsRecord.trDescription = "Enquiry Reopened ... " + $scope.actionsRecord.trDescription;
            }
            if ($scope.actionsRecord.trDescription === undefined || $scope.actionsRecord.trDescription === null || $scope.actionsRecord.trDescription === " ") {
                alert("Please fill in the Notes field");
                return;
            }

            var tempBody = $scope.actionsRecord.trDescription;
            tempBody = tempBody.replace(/[']+/g, '');
            $scope.actionsRecord.trDescription = tempBody;

            if ($scope.atDisableDeadReasonButtonWords === "Reopen Enquiry when Saved") {
                $scope.DTEnquiry.enECReOpen = '1';
                $scope.actionTabs.atDeadReasonCode = null;
                $scope.DTEnquiry.enECDeadReasonCode = null;
                $rootScope.globalDeadReasonCode = null;
                $scope.DTEnquiry.enManualStatus = "";
            }
            if ($scope.atDisableDeadReasonButtonWords === "Close Enquiry when Saved" && $scope.actionTabs.atDeadReasonCode !== undefined) {
                $scope.DTEnquiry.enECDeadReasonCode = $scope.actionTabs.atDeadReasonCode;
                $rootScope.globalDeadReasonCode = $scope.actionTabs.atDeadReasonCode;
            }

            if ($scope.actionsRecord.trMonthNextAction !== $scope.DTEnquiry.enEDMonthNextActioned || $scope.actionsRecord.trDayNextAction !== $scope.DTEnquiry.enEDDayNextActioned
                || $scope.actionsRecord.trYearNextAction !== $scope.DTEnquiry.enEDYearNextActioned || $scope.actionsRecord.trNextTimeAction !== $scope.DTEnquiry.enEDNextTimeActioned || $scope.actionsRecord.trUTCNextAction !== $scope.DTEnquiry.enEDUTCNextActioned) {
                $scope.DTEnquiry.enEDDateNextAction = $filter('date')(new Date($scope.actionsRecord.trYearNextAction, $scope.actionsRecord.trMonthNextAction - 1, $scope.actionsRecord.trDayNextAction), 'dd-MMM-yyyy') + ' ' + $scope.actionsRecord.trNextTimeAction;
                $scope.DTEnquiry.enEDMonthNextActioned = $scope.actionsRecord.trMonthNextAction;
                $scope.DTEnquiry.enEDDayNextActioned = $scope.actionsRecord.trDayNextAction;
                $scope.DTEnquiry.enEDYearNextActioned = $scope.actionsRecord.trYearNextAction;
                $scope.DTEnquiry.enEDNextTimeActioned = $scope.actionsRecord.trNextTimeAction;
                $scope.DTEnquiry.enEDUTCNextActioned = $scope.actionsRecord.trUTCNextAction;

                var d1 = new Date();
                $scope.DTEnquiry.enEDTimeNextAction = d1.toLocaleTimeString().replace("/.*(\d{2}:\d{2}:\d{2}).*/", "$1");
                if ($scope.DTEnquiry.enEDTimeNextAction !== null) {
                    if ($scope.DTEnquiry.enEDTimeNextAction.indexOf(":", 3) > 0) {
                        var tempSecondColon = $scope.DTEnquiry.enEDTimeNextAction.indexOf(":", 3);
                        $scope.DTEnquiry.enEDTimeNextAction = $scope.DTEnquiry.enEDTimeNextAction.substr(0, tempSecondColon) + $scope.DTEnquiry.enEDTimeNextAction.substr(tempSecondColon + 2);
                    }
                }

                $scope.DTEnquiry.enEDTimeNextAction = $scope.DTEnquiry.enEDTimeNextAction.substr(0, 5);
                tempBody = $scope.actionsRecord.trDescription + " - Next Action Date set to: " + $filter('date')(new Date($scope.actionsRecord.trYearNextAction, $scope.actionsRecord.trMonthNextAction - 1, $scope.actionsRecord.trDayNextAction), 'dd-MMM-yyyy') + ' ' + $scope.actionsRecord.trNextTimeAction + '' + ' (' + $scope.actionsRecord.trUTCNextAction + ')';
                tempBody = tempBody.replace(/[']+/g, '');
                $scope.actionsRecord.trDescription = tempBody;
                $scope.actionsRecord.trType = "AC";
                $scope.DTEnquiry.enEDDateLastActioned = $scope.actionsRecord.trDateStamp;
                $scope.DTEnquiry.enEDTimeLastActioned = $scope.actionsRecord.trTimeStamp;
            }
            else {
                var date = new Date().addHours(2);
                $scope.DTEnquiry.enEDDateNextAction = $filter('date')(date, 'dd-MM-yyyy HH:mm');
                $scope.DTEnquiry.enEDDayNextActioned = $filter('date')(date, 'dd').replace(/^0+/, '');
                $scope.DTEnquiry.enEDMonthNextActioned = $filter('date')(date, 'MM').replace(/^0+/, '');
                $scope.DTEnquiry.enEDYearNextActioned = $filter('date')(date, 'yyyy');
                $scope.DTEnquiry.enEDNextTimeActioned = $filter('date')(date, 'HH:mm');
            }

            if ($scope.actionsRecord.trUserCode !== $scope.DTEnquiry.enEDUserAssigned) {
                $scope.DTEnquiry.enEDUserAssigned = $scope.actionsRecord.trUserCode;
            }
            $scope.DTEnquiry.enProgress = '30';
            var promiseSave = trackingRecordsDataService.createTrackingRecord($scope.actionsRecord)
                    .then(function (ret) { trackingRecordAddSucceeded() })
                    .catch(function (err) { trackingRecordAddFailed(err) });
        }

        $scope.atRunScript = function (programId, propertyId) {

            console.log(programId);
            console.log(enqRef);
            console.log(propertyId);
            console.log($rootScope.APSProperties.length);

            if (programId == null) {
                document.getElementById("idScriptValidation").style.display = 'block';
                document.getElementById("idScriptValidation").textContent = "Please select a script";
            }
            else if (propertyId == undefined) {
                document.getElementById("idPropertyValidation").style.display = 'block';
                document.getElementById("idPropertyValidation").textContent = "Please select a property";
            } else {
                $('#actionTabScript').modal('show');
                trackingRecordsDataService.runScript(enqRef, programId, propertyId)
                    .success(function () {
                        $('#actionTabScript').modal('hide');
                        $scope.actionTabs.atProgramCode = null;
                        $scope.actionTabs.atProperties = null;
                    });
            }

            $("#idProgramName").click(function () {
                document.getElementById("idScriptValidation").style.display = 'none';
            });
            $("#idPropertyName").click(function () {
                document.getElementById("idPropertyValidation").style.display = 'none';
            });
        }

        $scope.atRunActionScript = function (programId, enqRef) {
            console.log("programId: " + programId);
            console.log("enqRef: " + enqRef);
            if (programId == undefined) {
                document.getElementById("idActionTabScriptValidation").style.display = 'block';
                document.getElementById("idActionTabScriptValidation").textContent = "Please select a script";
            } else {
                $rootScope.actionsTabProgramId = programId;
                $('#actionTabScriptRun').modal('show');
            }
            $("#idActionProgramName").click(function () {
                document.getElementById("idActionTabScriptValidation").style.display = 'none';
            });
        }

        $scope.CreateDuplicateEnquiries = function (enqRef, count) {
            console.log("enqRef: " + enqRef);
            console.log("count: " + count);

            var duplicatesCount = /^[1-9][0-9]?$/;

            enqRef = enqRef = document.getElementById('idglbCurrentEnquiryRef').value;
            var userName = document.getElementById("userCode").value;

            if (!(duplicatesCount.test(count))) {
                document.getElementById("idValidateDuplicatesCount").style.display = 'block';
                document.getElementById("idValidateDuplicatesCount").textContent = "Please enter value between 1 to 99";
            }
            else {
                console.log($rootScope.actionsTabProgramId);
                var pgId = $rootScope.actionsTabProgramId;
                trackingRecordsDataService.duplicateEnquiries(enqRef, count, pgId, userName)
                    .success(function (data) {
                        if (data === "Invalid Enquiry Reference") {
                            document.getElementById("idValidateEnqRef").style.display = 'block';
                            document.getElementById("idValidateEnqRef").textContent = "Enter valid enquiry reference";
                        }
                        else if (data === "Success") {
                            $('#actionTabScriptRun').modal('hide');
                            $scope.actionTabs.atActionProgramCode = "";
                            logger.info("Created " + count + " duplicates of this enquiry #" + enqRef);
                        }
                    });
            }

            $("#idDuplicateEnquiriesCount").click(function () {
                document.getElementById("idValidateDuplicatesCount").style.display = 'none';
            });
            $("#idEnquiryRef").click(function () {
                document.getElementById("idValidateEnqRef").style.display = 'none';
            });
        }

        function trackingRecordAddFailed(err) {
            logger.error('FAILED to ADD ACTION Record - ' + err);
        }

        function trackingRecordAddSucceeded() {
            //Google Analytics
            ga('send', 'event', 'Actions Tab', 'Added Notes', 'in enquiry ' + enqRef + ' by ' + userCode);

            $scope.DTEnquiry.enEDDayLastActioned = $filter('date')(new Date(), 'dd').replace(/^0+/, '');
            $scope.DTEnquiry.enEDMonthLastActioned = $filter('date')(new Date(), 'MM').replace(/^0+/, '');
            $scope.DTEnquiry.enEDYearLastActioned = $filter('date')(new Date(), 'yyyy');
            $scope.DTEnquiry.enEDLastTimeActioned = $filter('date')(new Date(), 'HH:mm');
            $scope.DTEnquiry.enECDeadReasonCode = $scope.actionTabs.atDeadReasonCode;
            $timeout(function () {

                angular.element('#idDTSaveEnquiryButton').trigger('click');
            }, 100);

            resetActionsRecord();
        }

        Date.prototype.addHours = function (h) {
            this.setTime(this.getTime() + (h * 60 * 60 * 1000));
            return this;
        }

        $scope.atToCloseEnquiry = function () {
            if ($rootScope.globalEnProgress !== '40') {
                $scope.atDisableDeadReasonButtonWords = "Close Enquiry when Saved";
                $scope.$apply();
            } else {
                $scope.atDisableDeadReasonButtonWords = "Reopen Enquiry when Saved";
                $scope.$apply();
            }
        }

        $timeout(function () { resetActionsRecord(); }, 100);
        setTheClosedEnquiryButtons();
        $scope.actionTabs.atDeadReasonCode = $rootScope.globalDeadReasonCode;
        if ($scope.actionTabs.atDeadReasonCode === 0) {
            $scope.actionTabs.atDeadReasonCode = null;
        }

    }
})();
