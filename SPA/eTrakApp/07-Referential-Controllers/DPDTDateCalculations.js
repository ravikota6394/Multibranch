(function () {
    'use strict';
    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.controller('DPDTDateCalculations',['$filter','$scope', function ($filter, $scope) {
      
        //$scope.$watch('dateDateOfArrival', function (newValue, oldValue) {
        //    //	if(newValue !== oldValue) {

        //    var d1 = new Date($scope.dateDateOfArrival);
        //    $scope.DTEnquiry.enEDDateOfArrival = $filter('date')(d1, 'dd-MM-yyyy');
        //    var d2 = new Date($scope.dateDepartureDate);
        //    alert("Arrival Date " + d1);
        //    alert("Departure Date  " + d2);

        //    if (d2 < d1) {
        //        alert("Arrival is greater than departure Date");
        //        d2 = d1;
        //        $scope.DTEnquiry.enEDDepartureDate = $filter('date')(d2, 'dd-MM-yyyy');
        //        $scope.dateDepartureDate = new Date(d2);

        //    }

        //    var t1 = $scope.dateDateOfArrival.getTime();
        //    var t2 = $scope.dateDepartureDate.getTime();
        //    $scope.DTEnquiry.enEDNights = parseInt((t2 - t1) / (24 * 3600 * 1000)) + 1;


        //    $scope.$apply();
        //    //		}
        //}, true);

        //$scope.$watch('dateDepartureDate', function (newValue, oldValue) {
        //    //	if(newValue !== oldValue) {

        //    var d1 = new Date($scope.dateDateOfArrival);
        //    $scope.DTEnquiry.enEDDateOfArrival = $filter('date')(d1, 'dd-MM-yyyy');
        //    var d2 = new Date($scope.dateDepartureDate);
        //    alert("DT Arrival Date " + d1);
        //    alert("DT Departure Date  " + d2);

        //    if (d2 < d1) {
        //        alert("Arrival is greater than departure Date");
        //        d2 = d1;
        //        $scope.DTEnquiry.enEDDepartureDate = $filter('date')(d2, 'dd-MM-yyyy');
        //        $scope.dateDepartureDate = new Date(d2);

        //    }

        //    var t1 = $scope.dateDateOfArrival.getTime();
        //    var t2 = $scope.dateDepartureDate.getTime();

        //    $scope.DTEnquiry.enEDNights = parseInt((t2 - t1) / (24 * 3600 * 1000)) + 1;


        //    $scope.$apply();
        //    //		}
        //}, true);
    }]);
})();