(function () {
	'use strict';
	var eTrakApp = angular.module('eTrakApp');

	eTrakApp.controller('DPControllerFlightDate',['$filter','$scope', function ($filter,$scope) {
		$scope.today = function() {
		    $scope.dateFlightDate = new Date();
		};

		$scope.clear = function () {
		    $scope.dateFlightDate = null;
		};

		$scope.$watch('dateFlightDate', function (newValue, oldValue) {
		    if (newValue !== oldValue) {

		        var d = new Date($scope.dateFlightDate);

		        $scope.DTEnquiry.enECFlightDate = $filter('date')(d, 'dd-MM-yyyy');
		        $scope.$apply();
		    }

		}, true);


		$scope.open = function($event) {
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
		tomorrow.setDate(tomorrow.getDate() + 1);
		var afterTomorrow = new Date();
		afterTomorrow.setDate(tomorrow.getDate() + 2);
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

		$scope.getDayClass = function(date, mode) {
			if (mode === 'day') {
				var dayToCheck = new Date(date).setHours(0,0,0,0);

				for (var i=0;i<$scope.events.length;i++){
					var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

					if (dayToCheck === currentDay) {
						return $scope.events[i].status;
					}
				}
			}

			return '';
		};
	}]);
})();