//(function () {
'use strict';

var eTrakApp = angular.module('eTrakApp');

eTrakApp.controller('P_NotesTab', ['$q', '$scope', '$rootScope','$stateParams', '$timeout', 'logger', 'R_EnquiriesService', controller]);

function controller($q, $scope, $rootScope,$stateParams, $timeout, logger, enquiryDataservice) {

    // ensure the correct details are in place

    var enqRef = $rootScope.globalEnCode;
    if (enqRef > "0") {
        $('#idglbCurrentEnquiryRef').val(enqRef);
        $scope.glbCurrentEnquiryRef = enqRef;
    } else {
        enqRef = document.getElementById('idglbCurrentEnquiryRef').value;
    }
    var userId = $('#idglbMainUserID').val();

    //------------
    doBreadcrumbs();
    $rootScope.displayPV_CurrentEnquiry = false;
    //------------


    // Controlling Variables
    //----------------------

//    alert((enqRef < "1") + enqRef);
    //if (enqRef < "1" || enqRef === undefined) {
    //    alert('Creating a NEW enquiry');
    //    addEnquiry();
    //} else {
    //    getEnquiry(enqRef);
    //}

    function doBreadcrumbs() {
        $rootScope.breadcrumbsValueGoTo = '> User Area > Enquiry # ' + enqRef;
        $rootScope.breadcrumbsValueAreHere = '> Notes';
        $rootScope.breadcrumbsValueUiSref = "detailsTab({enqRef: '" + $rootScope.glbCurrentEnquiryRef + "'})";
    }

 
    //$scope.progressWord = progressWordCreate();
 



};


//})();
