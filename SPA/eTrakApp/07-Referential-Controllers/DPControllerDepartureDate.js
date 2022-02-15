(function () {
	'use strict';
	var eTrakApp = angular.module('eTrakApp');

	eTrakApp.controller('DPControllerDepartureDate',['$scope','$filter',function ($scope,$filter)  {
		$scope.today = function () {
			$scope.dateDepartureDate = new Date();
		};
		
		$scope.clear = function () {
			$scope.dateDepartureDate = null;
		};
		$scope.$watch('dateDepartureDate', function (newValue, oldValue) {
		    	if(newValue !== oldValue) {
             var d1 = new Date($scope.dateDateOfArrival);
		     var d2 = new Date($scope.dateDepartureDate);
		  //  $scope.DTEnquiry.enEDDateOfArrival = $filter('date')(d1, 'dd-MM-yyyy');
		    //var d2 = new Date($scope.dateDepartureDate);
		    //$scope.dateDepartureDate = new Date(d2);
		    //$scope.DTEnquiry.enEDDepartureDate = $filter('date')(d2, 'dd-MM-yyyy');
		    if (d2 < d1) {
		        alert("departure is less than Arrival Date ");
		        //d2 = d1;
                d2=oldValue;
		        //$scope.DTEnquiry.enEDDepartureDate = $filter('date')(d2, 'dd-MM-yyyy');
		        //$scope.dateDepartureDate = new Date(d2);
		    }

		    $scope.DTEnquiry.enEDDepartureDate = $filter('date')(d2, 'dd-MM-yyyy');
		    $scope.dateDepartureDate = new Date(d2);

		    var t1 = $scope.dateDateOfArrival.getTime();
		    var t2 = $scope.dateDepartureDate.getTime();
		    $scope.DTEnquiry.enEDNights = parseInt((t2 - t1) / (24 * 3600 * 1000));
		    $scope.$apply();
		    		}
		}, true);

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