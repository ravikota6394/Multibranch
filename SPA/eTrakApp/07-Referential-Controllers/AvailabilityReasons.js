eTrakApp.controller('AvailabilityReasons',['$scope','AvailabilityReasonsService', function ($scope, AvailabilityReasonsService) {

    getAvailabilityReasons();

    function getAvailabilityReasons() {
        AvailabilityReasonsService.getAvailabilityReasons()
            .success(function (availabilityReasons) {
                console.log(availabilityReasons);
                $scope.availabilityReasons = availabilityReasons;
            });
    }

}]);