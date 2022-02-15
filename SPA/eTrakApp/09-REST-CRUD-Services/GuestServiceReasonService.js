eTrakApp.service('GuestServiceReasonService',['$http', function ($http) {
    
    this.getGuestServiceReason = function () {
        return $http.get("GuestServiceReason/GetGuestServiceReason");
    }
}]);