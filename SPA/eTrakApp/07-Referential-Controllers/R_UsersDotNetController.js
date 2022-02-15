(function () {
    'use strict';
    var eTrakApp = angular.module('eTrakApp');

    //    Users list
    eTrakApp.controller('R_UsersDotNet', [
        '$scope','$rootScope', 'R_UsersService',
        function ($scope, $rootScope,usersFactory) {

            function getUsers() {
                usersFactory.getUsersView()
                    .success(function (users) {
                       $scope.AllUsers = users;

                    });
            }

            getUsers();
        }
    ]);
})();
