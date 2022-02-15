(function () {
    'use strict';

    eTrakApp.controller('R_Buddy', [
        '$scope', 'R_UsersService',
        function ($scope, usersFactory) {
            var mainUserId = document.getElementById("idglbMainUserID");
            $scope.fltBuddy = mainUserId.value;
            $scope.$apply();

            function getUsers() {
                usersFactory.getUsers()
                    .success(function (users) {
                        $scope.Users = users;
                        var selectedUser;

                        users.forEach(function (user) {
                            if (user.usCode === mainUserId.value) {
                                selectedUser = user.usCode + ' - ' + user.usDescription;
                                document.getElementById("fltBuddy").value = selectedUser;
                            }
                        });
                        $scope.fltBuddy = selectedUser;
                        $scope.$apply();
                        return selectedUser;
                    });
            }

            getUsers($scope);
        }
    ]);
})();
