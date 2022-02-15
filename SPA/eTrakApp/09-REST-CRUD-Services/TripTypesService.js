eTrakApp.service('TripTypesService',['$http', function ($http) {

    this.getTripTypes = function () {
        return $http.get("TripTypes/GetTrips");
    }
}]);