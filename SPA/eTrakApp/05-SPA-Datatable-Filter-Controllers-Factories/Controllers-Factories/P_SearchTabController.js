(function () {
    'use strict';

    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.controller('P_SearchTab', ['$scope', '$rootScope', '$stateParams', '$state', '$timeout', 'logger', controller]);

    function controller($scope, $rootScope, $stateParams, $state, $timeout, logger) {
       
        $rootScope.$state = $state;
        // ensure the correct details are in place
        var enqRef = $rootScope.globalEnCode;
        if (enqRef > "0") {
            $('#idglbCurrentEnquiryRef').val(enqRef);
            $scope.glbCurrentEnquiryRef = enqRef;
        } else {
            enqRef = document.getElementById('idglbCurrentEnquiryRef').value;
        }
        var userCode = document.getElementById("userCode").value;
        // var userId = $('#idglbMainUserID').val();
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

        //------------
        doBreadcrumbs();

        //Google Analytics 
        ga('send', 'event', 'Search Tab', 'Entered The Search Tab', 'by ' + userCode + ' in enquiry number ' + enqRef);

        $rootScope.displayPV_CurrentEnquiry = true;

        // Controlling Variables
        //----------------------

        function doBreadcrumbs() {
            $rootScope.breadcrumbsValueGoTo = '> User Area > Enquiry # ' + enqRef;
            $rootScope.breadcrumbsValueAreHere = '> Search';
            $rootScope.breadcrumbsValueUiSref = "detailsTab({enqRef: '" + enqRef + "'})";
        }

    };

})();
