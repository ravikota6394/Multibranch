eTrakApp.controller('TripTypes', ['$scope', 'TripTypesService', TripTypes]);
    
    function TripTypes($scope, TripTypesService) {

    getTripTypes();

    function getTripTypes() {
        TripTypesService.getTripTypes()
            .success(function (tripTypes) {
                console.log(tripTypes);
                $scope.tripTypes = tripTypes;
            });
    }
};