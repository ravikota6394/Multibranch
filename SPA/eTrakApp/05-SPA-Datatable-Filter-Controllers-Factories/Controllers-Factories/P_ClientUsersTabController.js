(function () {
'use strict';

var eTrakApp = angular.module('eTrakApp');

eTrakApp.controller('P_ClientUsersTab', ['$q', '$scope', '$rootScope','$stateParams', '$timeout', 'logger', 'R_EnquiriesService', controller]);

function controller($q, $scope, $rootScope,$stateParams, $timeout, logger, enquiryDataservice) {

    // ensure the correct details are in place
    var enqRef = $rootScope.globalEnCode;
    if (enqRef > "0") {
        $('#idglbCurrentEnquiryRef').val(enqRef);
        $scope.glbCurrentEnquiryRef = enqRef;
    } else {
        enqRef = document.getElementById('idglbCurrentEnquiryRef').value;
    }
   // var userId = $('#idglbMainUserID').val();

    //------------
    doBreadcrumbs();

    $rootScope.displayPV_CurrentEnquiry = true;
    //------------


    // Controlling Variables
    //----------------------


    function doBreadcrumbs() {
        $rootScope.breadcrumbsValueGoTo = '> User Area > Enquiry #' + enqRef;
        $rootScope.breadcrumbsValueAreHere = '> Client Users';
        $rootScope.breadcrumbsValueUiSref = "detailsTab({enqRef: '" + $rootScope.glbCurrentEnquiryRef + "'})";
    }

 

};


})();
