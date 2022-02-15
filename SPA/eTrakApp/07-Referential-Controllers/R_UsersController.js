(function () {
    'use strict';
    var eTrakApp = angular.module('eTrakApp');

    //    Users list
    eTrakApp.controller('R_Users', [
        '$scope', '$rootScope', 'logger', 'R_UsersService', 'PV_MyEmailsService',
        function ($scope, $rootScope, logger, usersFactory, myEmailsFactory) {
            var userCode = document.getElementById("userCode").value;
            var buddy;
            var enqRef = document.getElementById('idglbCurrentEnquiryRef').value;

            function getAddedBuddy(userCode) {
                console.log('Get Buddy');
                console.log(userCode);
                var buddyUser = usersFactory.getUser(userCode);
                buddyUser.then(function (user) {
                    console.log(user.data[0]);
                    buddy = angular.fromJson(user.data[0]).usBuddy;
                    $rootScope.buddy = buddy;
                    if ($rootScope.buddy == "") {
                        $rootScope.buddy = "No Buddy Selected";
                    }
                    console.log($rootScope.buddy);
                }).catch(function () { $rootScope.buddy = null; });
            }

            function getVUsers() {
                usersFactory.getUsersView()
                    .success(function (users) {
                        $scope.UsersView = users;
                        console.log("$scope.UsersView.length");
                        console.log($scope.UsersView);
                        getAddedBuddy(userCode);
                    });
            }

            function getAllUsersAssignedMeAsBuddy() {
                usersFactory.getAllUsersAssignedMeAsBuddy(userCode)
                    .success(function (users) {
                        $scope.AssignedBuddyUsers = users;
                        console.log($scope.AssignedBuddyUsers);
                        for (var i = 0; i < $scope.AssignedBuddyUsers.length; i++) {
                            if ($scope.AssignedBuddyUsers[i].usCode == userCode) {
                                $scope.selectedUser = userCode;
                            }
                        }
                    });
            }

            function getAllUsersUnderSupervisors() {
                usersFactory.getAllUsersUnderSupervisors(userCode)
                    .success(function (users) {
                        $scope.usersUnderSupervisors = users;
                        console.log($scope.usersUnderSupervisors);                      
                    });
            }

            $scope.SaveBuddy = function (selectedBuddy) {
                console.log("selectedBuddy=" + selectedBuddy + "userCode=" + userCode);
                usersFactory.UpdateBuddy(userCode, selectedBuddy, enqRef)
                    .success(function (buddy) {
                        console.log(buddy);
                        if (buddy == "Success") {
                            logger.info('Buddy has been updated successfully');
                            //Google Analytics 
                            ga('send', 'event', 'Dashboard', 'Save/Update Buddy', userCode + ' Selected his/her Buddy As ' + '"' + selectedBuddy + '"');
                        }
                        else {
                            logger.error("Buddy has NOT been updated successfully");
                        }                       
                        getMyEmails();
                        $rootScope.glbUserBuddy = selectedBuddy;
                    });
            }
            getVUsers();

            function getMyEmails() {
                console.log($("#IsClientManagerCheck").val());
                var isClientManager = 0;
                if ($("#IsClientManagerCheck").val() == "true") {
                    isClientManager = 1;
                }
                myEmailsFactory.getMyEmails(userCode, isClientManager)
                    .success(function (myEmails) {
                        $scope.MyEmails = angular.fromJson(myEmails);
                        $rootScope.MyEmails = $scope.MyEmails;
                        console.log($scope.MyEmails);
                    });
            }
            getAllUsersAssignedMeAsBuddy();
            getAllUsersUnderSupervisors();
            //$scope.hideUserDropdown = true;
            //$scope.GetUsersForAutoDropdown = function (user) {
            //    console.log(user);
            //    usersFactory.getAllUsers(user)
            //      .success(function (users) {
            //          $scope.allUsers = users;
            //          console.log($scope.allUsers);
            //          $scope.hideUserDropdown = false;
            //      });
            //}

            //$scope.selectedUser = function (source) {
            //    $scope.hideUserDropdown = true;
            //}

        }
    ]);
})();
