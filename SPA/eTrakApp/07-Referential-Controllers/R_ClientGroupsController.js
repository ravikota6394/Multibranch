(function () {
   'use strict';

   var eTrakApp = angular.module('eTrakApp');

    eTrakApp.controller('R_ClientGroups', [
        '$scope', 'R_ClientGroupsService','$rootScope',
        function ($scope, clientGroupsFactory,$rootScope) {
            var user = $('#idUserCode').val();       
           
            
             getClientGroups();
             function getClientGroups() {
                 clientGroupsFactory.getClientGroups()
                     .success(function (clientGroupsInput) {
                         var clientGroups = angular.fromJson(clientGroupsInput);
                         $scope.ClientGroups = clientGroups;
                         $rootScope.clientGroupsdata = angular.fromJson(clientGroupsInput);
                     });
             }

            getAllClientGroupsList();
            function getAllClientGroupsList() {
                clientGroupsFactory.getAllClientGroupsList()
                    .success(function (clientGroups) {
                        var allClientGroups = angular.fromJson(clientGroups);
                        $scope.allClientGroups = allClientGroups;
                        console.log("allClientGroups");
                        console.log($scope.allClientGroups);
                    });
            }


            getclient();
            function getclient() {
             var isclient = $('#IsClientmanagerCheck').val();          
                var username = "";
                if (isclient == "true") {
                    username = user;
                }
                else {
                    isclient = null;
                }
                clientGroupsFactory.getclientGroup(username)
                    .success(function (clientGroupsInput) {                       
                        var clientGroups = angular.fromJson(clientGroupsInput);
                        $scope.clientGroups = clientGroups;
                    });
            }


        }
    ]);
})();
