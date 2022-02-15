eTrakApp.service('BlackListService', ['$http', function ($http) {

    this.getBlackedEmails = function () {
        return $http.get("BlackList/GetBlackedEmails");
    }
}]);