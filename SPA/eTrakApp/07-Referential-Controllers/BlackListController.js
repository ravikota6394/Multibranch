eTrakApp.controller('BlackList', ['$scope','BlackListService', function ($scope, BlackListService) {

    getBlackedEmails();

    function getBlackedEmails() {
        BlackListService.getBlackedEmails()
            .success(function (emails) {
                console.log(emails);
                $scope.emails = emails;
            });
    }

}]);