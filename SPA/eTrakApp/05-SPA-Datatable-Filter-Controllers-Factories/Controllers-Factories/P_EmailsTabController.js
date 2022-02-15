(function () {
    'use strict';

    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.controller('P_EmailsTab', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout', 'logger', 'R_EnquiriesService', 'R_EmailTemplatesService', controller]);

    function controller($scope, $rootScope, $state, $stateParams, $timeout, logger, enquiryDataservice, emailTemplatesService) {
        console.log("$scope.DTEnquiry" + $scope.DTEnquiry);
        if ($stateParams.emailAddress !== undefined && $scope.DTEnquiry != undefined) {
            $scope.DTEnquiry.enLastEmailSentTo = "";
            $scope.DTEnquiry.enLastEmailCCTo = "";
        }
        if ($rootScope.ETEmailSubject != null) {
            $rootScope.ETEmailSubject = "";
            $scope.DTEnquiry.enLastTemplateChosen = "";
        }
       
        if ($rootScope.emailToAddress != undefined && $rootScope.emailToAddress !== "") {
            $rootScope.DTEnquiry.enLastEmailSentTo = $rootScope.emailToAddress;
        }

        if ($rootScope.emailCcAddress != undefined && $rootScope.emailCcAddress !== "") {
            $rootScope.DTEnquiry.enLastEmailCCTo = $rootScope.emailCcAddress;
        }

        if ($rootScope.body != undefined) {
            if ($rootScope.body != "") {
                $scope.ETEmailSubject = $rootScope.subject;
                $rootScope.globalEmailBody = $rootScope.body;                                  
                $(".ideMailOutput").code('<span style="font-family: Verdana;font-size: 14px;background-color: rgb(255, 255, 255);">' + $rootScope.body + '</scan>');
                $scope.$apply();
                $rootScope.globalEmailBody = "";               
            }
        }

        //$scope.state = $state.current;
        //$scope.params = $stateParams;

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
        ga('send', 'event', 'Emails Tab', 'Entered The Emails Tab', 'by ' + userCode + ' in enquiry number ' + enqRef);

        //------------
        doBreadcrumbs();
        $rootScope.displayPV_CurrentEnquiry = false;
        //------------


        // Controlling Variables
        //----------------------


        function doBreadcrumbs() {
            $rootScope.breadcrumbsValueGoTo = '> User Area > Enquiry # ' + enqRef;
            $rootScope.breadcrumbsValueAreHere = '> Emails';
            $rootScope.breadcrumbsValueUiSref = "detailsTab({enqRef: '" + $rootScope.glbCurrentEnquiryRef + "'})";
        }


    };


})();
