(function () {
    'use strict';
    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.controller('DPControllerDateOfArrival', ['$scope', '$filter', function ($scope, $filter) {
        $scope.$watch('dateDateOfArrival', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                var d1 = new Date($scope.dateDateOfArrival);
              //  var d2 = new Date($scope.DTEnquiry.enEDDepartureDate);
              //  var d1Temp = $filter('date')(d1, 'dd-MM-yyyy');

                var startDate = $scope.DTEnquiry.enEDDepartureDate;
                var day = parseInt(startDate.split('-')[0], 10);
                var month = parseInt(startDate.split('-')[1], 10) - 1;
                var year = parseInt(startDate.split('-')[2], 10);
                var endDate = new Date(year, month, day, 23, 59);

                if (d1 > endDate) {
                    alert("Arrival is greater than departure Date");                    
                    //if (oldValue == undefined)
                    //    d1 =  new Date();
                    //else
                        d1 = oldValue;
                
                //$scope.DTEnquiry.enEDDateOfArrival = $filter('date')(d1, 'dd-MM-yyyy');
                //$scope.dateDateOfArrival = new Date(d1);
                }

                $scope.DTEnquiry.enEDDateOfArrival = $filter('date')(d1, 'dd-MM-yyyy');
                $scope.dateDateOfArrival = new Date(d1)
                var t1 = $scope.dateDateOfArrival.getTime();
                var t2 = endDate.getTime();
                $scope.DTEnquiry.enEDNights = parseInt((t2 - t1) / (24 * 3600 * 1000));
                $scope.$apply();
                
            }
        }, true);

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

        $scope.today = function () {
            $scope.dateDateOfArrival = new Date();
        };

        $scope.clear = function () {
            $scope.dateDateOfArrival = null;
        };

        //$scope.$watch('dateDateOfArrival', function(newValue, oldValue) {
        //	//	if(newValue !== oldValue) {

        //	var d = new Date($scope.dateDateOfArrival);
        //	$scope.DTEnquiry.enEDDateOfArrival = $filter('date')(d, 'dd-MM-yyyy');
        //	var d2 = new Date($scope.dateDepartureDate);
        //	alert("Arrival Date " + d);
        //	alert("Departure Date  " + d2);
        //	alert(d2);
        //	if (d2 < d) {
        //		alert("Arrival is greater than departure Date");
        //		d2 = d;
        //		$scope.DTEnquiry.enEDDepartureDate = $filter('date')(d2, 'dd-MM-yyyy');
        //		$scope.dateDepartureDate = new Date(d2);
        //		var d3 = new Date($scope.dateDepartureDate);
        //		alert(d3);
        //		//$scope.DTEnquiry.enEDDepartureDate = $filter('date')(d, 'dd-MM-yyyy');

        //		//    $scope.dateDepartureDate = new Date(parseInt($scope.DTEnquiry.enEDDepartureDate.substring(6, 10)), parseInt($scope.DTEnquiry.enEDDepartureDate.substring(3, 5)) - 1, parseInt($scope.DTEnquiry.enEDDepartureDate.substring(0, 2)), 1, 0, 0);

        //		//$("#idDTenEDDepartureDate").datepicker(d3);
        //		alert("here " + d3 + $scope.dateDepartureDate);

        //	}
        //	var t2 = $scope.dateDepartureDate.getTime();
        //	var t1 = $scope.dateDateOfArrival.getTime();
        //	$scope.DTEnquiry.enEDNights = parseInt((t2 - t1) / (24 * 3600 * 1000)) + 1;


        //	$scope.$apply();
        //	//		}
        //}, true);

        //$scope.$watch('dateDepartureDate', function(newValue, oldValue) {
        //    if (newValue !== oldValue) {
        //        alert("here at a changed dateDepartureDate");
        //        dateDepartureDate = dateDateOfArrival;
        //    }
        //}, true);


        $scope.open = function ($event) {
            $scope.status.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

        $scope.status = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate());
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate());
        $scope.events =
		  [
			{
			    date: tomorrow,
			    status: 'full'
			},
			{
			    date: afterTomorrow,
			    status: 'partially'
			}
		  ];

        $scope.getDayClass = function (date, mode) {
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        };
    }]);
})();