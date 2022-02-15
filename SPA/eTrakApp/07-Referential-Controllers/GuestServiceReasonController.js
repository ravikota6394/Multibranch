eTrakApp.controller('GuestServiceReason',['$scope','GuestServiceReasonService', function ($scope, GuestServiceReasonService) {
    
    getGuestServiceReason();

    function getGuestServiceReason() {
        GuestServiceReasonService.getGuestServiceReason()
            .success(function (guestServiceReason) {
                console.log(guestServiceReason);
                $scope.guestServiceReason = guestServiceReason;
            });
    }

}]);