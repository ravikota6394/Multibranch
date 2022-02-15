(function () {
    'use strict';

    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.controller('P_QACheckTab', ['$q', '$scope', '$rootScope', '$stateParams', '$timeout', '$interval', 'logger', 'R_QAChecksService', controller]);

    function controller($q, $scope, $rootScope, $stateParams, $timeout, $interval, logger, QACheckDataservice) {
        // ensure the correct details are in place
        var enqRef = $rootScope.globalEnCode;
        if (enqRef > "0") {
            $('#idglbCurrentEnquiryRef').val(enqRef);
            $scope.glbCurrentEnquiryRef = enqRef;
        } else {
            enqRef = document.getElementById('idglbCurrentEnquiryRef').value;
        }
        var userId = $('#idglbMainUserID').val();
        var userCode = document.getElementById("userCode").value;
       
        //Google Analytics 
        ga('send', 'event', 'QACheck Tab', 'Entered The QACheck Tab', 'by ' + userCode + ' in enquiry number ' + enqRef);


        //------------
        doBreadcrumbs();
        $rootScope.displayPV_CurrentEnquiry = false;
        //------------

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

        // Controlling Variables
        //----------------------
        $scope.QACheck = {};
        var id;

        function doBreadcrumbs() {
            $rootScope.breadcrumbsValueGoTo = '> User Area > Enquiry #' + enqRef;
            $rootScope.breadcrumbsValueAreHere = '> QA Check';
            $rootScope.breadcrumbsValueUiSref = "detailsTab({enqRef: '" + $rootScope.glbCurrentEnquiryRef + "'})";
        }

        // Data Table options Section
        $scope.qaOptions = {
            destroy: true,
            autoWidth: false,
            order: [[0, 'asc']],
            columnDefs: [
                {
                    targets: ['no-sort'],
                    orderable: false
                }
            ],
            dom:
                "<'row no-margin'<'col-sm-6 no-padding'l><'col-sm-6 no-padding'f>r>" +
                    "t" +
                    "<'row no-margin'<'col-sm-6 no-padding'i><'col-sm-6 no-padding'p>>"
        };
        //-------------------------------


        function getQAChecks() {           
            var checkList = QACheckDataservice.getQACheckList(enqRef)
                            .then(function (ret) {
                                $scope.qaCheckList = ret.data; 
                                console.log($scope.qaCheckList);
                            });
        }


        $scope.EditQACheck = function (checkId) {
            $scope.qaCode = checkId;
            id = $scope.qaCode;
            var qaCheck = QACheckDataservice.getQACheck(checkId)
                .then(function (ret) {
                    console.log(angular.fromJson(ret.data));
                    $scope.QACheck = ret.data;
                }).catch(function () { alert("Retrieve QA Record failed") });
        }
        //Emails written Count
        emailsCount();
        function emailsCount() {
            var emailsCount = QACheckDataservice.getEmailsCount(enqRef)
            .then(function (emails) {             
                $scope.totalEmails = emails.data;
                console.log($scope.totalEmails);
                var emailsCount = $scope.totalEmails.split(',');
                console.log(emailsCount);
                $scope.autoEmailsCount = emailsCount[1];
                $scope.emailsWritten = emailsCount[0];
            })
        }

        //SLA Met Count
        slaMetCount();
        function slaMetCount() {
            var slaMetCount = QACheckDataservice.getSlaMetCount(enqRef)
            .then(function (slaMetCount) {
                $scope.SlaMetCount = slaMetCount.data;
                console.log($scope.SlaMetCount);
            })
        }

        //SLA Miss Count
        slaMissCount();
        function slaMissCount() {
            var slaMissCount = QACheckDataservice.getSlaMissCount(enqRef)
            .then(function (slaMissCount) {
                $scope.SlaMissCount = slaMissCount.data;
                console.log($scope.SlaMissCount);
            })
        }      

        $scope.SaveCheck = function (qaCode) {          

            if (($scope.QACheck.qaSLAMet == 0 && $('#idQAqaSLAMetExplanation').val() == "") || ($scope.QACheck.qaCompliance == 0 && $('#idQAqaComplianceExplanation').val() == "") || ($scope.QACheck.qaRequirementsMet == 0) && $('#idQAqaRequirementsMetExplanation').val() == "") {
                if ($scope.QACheck.qaSLAMet == $('#idQAqaSLAMet0').val()) {
                    if ($('#idQAqaSLAMetExplanation').val() == "" || $('#idQAqaSLAMetExplanation').val() == null || $('#idQAqaSLAMetExplanation').val() == undefined) {
                        document.getElementById("idslamet").style.display = 'block';
                        document.getElementById("idslamet").textContent = "Please explain the reason for choosing 'No'";
                    }
                }
                if ($scope.QACheck.qaCompliance == $('#idQAqaComplience0').val()) {
                    if ($('#idQAqaComplianceExplanation').val() == "" || $('#idQAqaComplianceExplanation').val() == null || $('#idQAqaComplianceExplanation').val() == undefined) {
                        document.getElementById("idslacompliance").style.display = 'block';
                        document.getElementById("idslacompliance").textContent = "Please explain the reason for choosing 'No'";
                    }
                }
                if ($scope.QACheck.qaRequirementsMet == $('#idQAqaRequirementsMet0').val()) {
                    if ($('#idQAqaRequirementsMetExplanation').val() == "" || $('#idQAqaRequirementsMetExplanation').val() == null || $('#idQAqaRequirementsMetExplanation').val() == undefined) {
                        document.getElementById("idslarequirements").style.display = 'block';
                        document.getElementById("idslarequirements").textContent = "Please explain the reason for choosing 'No'";
                    }
                }
            }
            else {
                console.log(qaCode);
                SaveCheck(qaCode);
            }
        }
        $("#idQAqaSLAMetExplanation").focus(function () {
            document.getElementById("idslamet").style.display = 'none';
        });
        $("#idQAqaComplianceExplanation").focus(function () {
            document.getElementById("idslacompliance").style.display = 'none';
        });
        $("#idQAqaRequirementsMetExplanation").focus(function () {
            document.getElementById("idslarequirements").style.display = 'none';
        });

        function SaveCheck(qaCode)
        {        
            var newCheckRecord =
               {
                   qaCode: qaCode,
                   qaenCode: enqRef,
                   qaCreatedDate: new Date(),
                   qaUserCode: userCode,
                   qaUserID: userId,
                   qaSLAMet: $scope.QACheck.qaSLAMet,
                   qaCompliance: $scope.QACheck.qaCompliance,
                   qaRequirementsMet: $scope.QACheck.qaRequirementsMet,
                   qaProactive: $scope.QACheck.qaProactive,
                   qaProfessional: $scope.QACheck.qaProfessional,
                   qaEfficient: $scope.QACheck.qaEfficient,
                   qaPersonalContact: $scope.QACheck.qaPersonalContact,
                   qaSLAMetExplanation: $scope.QACheck.qaSLAMetExplanation,
                   qaComplianceExplanation: $scope.QACheck.qaComplianceExplanation,
                   qaRequirementsMetExplanation: $scope.QACheck.qaRequirementsMetExplanation                  
               };
            console.log(newCheckRecord);
            var addCheck = QACheckDataservice.SaveCheck(newCheckRecord)
                        .then(function (newQAcheck) {
                            //Google Analytics
                            ga('send', 'event', 'QACheck Tab', 'Saved/Updated QACheck', 'in enquiry ' + enqRef + ' by ' + userCode);
                            $scope.QACheck.qaCode = 0;
                            $scope.QACheck.qaSLAMet = "";
                            $scope.QACheck.qaCompliance = "";
                            $scope.QACheck.qaRequirementsMet = "";
                            $scope.QACheck.qaProactive = "";
                            $scope.QACheck.qaProfessional = "";
                            $scope.QACheck.qaEfficient = "";
                            $scope.QACheck.qaPersonalContact = "";
                            $scope.QACheck.qaSLAMetExplanation = "";
                            $scope.QACheck.qaComplianceExplanation = "";
                            $scope.QACheck.qaRequirementsMetExplanation = "";
                            getQAChecks();
                            slaMetCount();
                            slaMissCount();
                        }).catch(function () { alert("Add QA Record Failed") });
            
            }
       
        $scope.DeleteQACheck = function (checkId) {
            var qaCheckDel = QACheckDataservice.deleteQACheck(checkId)
                    .then(function (ret) {
                        //Google Analytics
                        ga('send', 'event', 'QACheck Tab', 'Deleted QACheck', 'in enquiry ' + enqRef + ' by ' + userCode);
                        getQAChecks();                  
                    }).catch(function () { alert("Failed to Delete a  QA Record"); });
        }
        getQAChecks();
        // Refreshes the Data Table -------
        var counter = 0;
        var timer = $interval(function () {
            counter = counter + 1;
            if (counter === $rootScope.glbRefreshSeconds) {
                counter = 0;
                getQAChecks();
            }
        }, 1000);

    };


})();
