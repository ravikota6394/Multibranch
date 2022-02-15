(function() {
    'use strict';

var eTrakApp = angular.module('eTrakApp');

eTrakApp.controller('P_ClientOpAgreementTab', [
    '$rootScope', '$stateParams', 'R_EnquiriesService',
    function ($rootScope, $stateParams, enquiryFactory) {

        //----------------- this is code to see what has changed if anything
        //$scope.project = project;
        //$scope.original = angular.copy(project);

        //$scope.initialComparison = angular.equals($scope.project, $scope.original);
        //$scope.dataHasChanged = angular.copy($scope.initialComparison);
        //----------------- end of changed code capability
        // Watch for above

        //$scope.$watch('project', function (newValue, oldValue) {
        //    if (newValue != oldValue) {
        //        $scope.dataHasChanged = angular.equals($scope.project, $scope.original);
        //    }
        //}, true);
        //----------------------------------------
        var enqRef = $stateParams.enqRef;
        //alert(enqRef);
        //------------
        $rootScope.breadcrumbsValueGoTo = '> User Area > Enquiry #' + enqRef ;
        $rootScope.breadcrumbsValueAreHere = '> Client Op Agreement';

        $rootScope.breadcrumbsValueUiSref = "detailsTab({enqRef: '" + $rootScope.glbCurrentEnquiryRef + "'})";
        $rootScope.displayPV_CurrentEnquiry = false;

        function getEnquiry(enqRef) {
            //window.opener.location.href = window.opener.location.href;
            enquiryFactory.getEnquiry(enqRef)
                .success(function (enquiry) {
                    //alert('success');
                    $rootScope.DTEnquiry = enquiry;
                });

        }

        getEnquiry(enqRef);
        $rootScope.glbCurrentEnquiryRef = enqRef;
    }
]);

 })();