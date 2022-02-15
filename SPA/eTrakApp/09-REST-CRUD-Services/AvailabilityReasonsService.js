eTrakApp.service('AvailabilityReasonsService',['$http', function ($http) {

    this.getAvailabilityReasons = function () {
        return $http.get("AvailabilityReasons/GetAvailabilityReasons");
    }

}]);