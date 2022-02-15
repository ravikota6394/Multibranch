(function () {
	'use strict';
	var eTrakApp = angular.module('eTrakApp');

	eTrakApp.controller('DPEFControllerDepartureDate',['$filter','$scope', function ($filter, $scope) {
		$scope.today = function () {
		    $scope.ef.efDepartureDate = new Date();
		};
		
		$scope.clear = function () {
		    $scope.ef.efDepartureDate = null;
		};
		$scope.$watch('ef.efDepartureDate', function (newValue, oldValue) {
		    var d1 = new Date($scope.ef.efDateOfArrival);
		    var d2 = new Date($scope.ef.efDepartureDate);
		    if (d2 < d1) {
		        alert("Arrival Date is greater than departure Date");
                d2=oldValue;
		        //d2 = d1;
		        //$scope.ef.efDepartureDate = $filter('date')(d2, 'dd-MM-yyyy');
		        $scope.ef.efDepartureDate = new Date(d2);
		    }
		    var t1 = $scope.ef.efDateOfArrival.getTime();
		    var t2 = $scope.ef.efDepartureDate.getTime();
		    $scope.ef.efNights = parseInt((t2 - t1) / (24 * 3600 * 1000));
            $scope.$apply();

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