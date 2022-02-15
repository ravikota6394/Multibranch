(function () {
    'use strict';
var eTrakApp = angular.module('eTrakApp');

    eTrakApp.service('R_UsersService', [
        '$http', function ($http) {

            var urlBase = '/api/V_eTrakUsers';
            
            this.getUsers = function () {
                console.log('Get Buddies Service');
                return $http.get('/api/V_eTrakUsers');
            }

            this.getAllUsers = function (user) {              
                return $http.get('/AdvancedSearch/getAllUsers?user=' + user);
            }

            this.checkWhetherUserIsReportTeam = function (user) {
                return $http.get('/Users/CheckWhetherUserIsReportTeam?user=' + user);
            }

            this.getAUser = function (usCode) {
                return $http.get(urlBase+"/"+usCode);
            }
           
            this.getUsersView = function () {               
            return $http.get(urlBase);
            }

            this.getAllUsersAssignedMeAsBuddy = function (userCode) {
                return $http.get('Users/GetAllUsersAssignedMeAsBuddy?userCode=' + userCode);
            }

            this.getAllUsersUnderSupervisors = function (userCode) {
                return $http.get('Users/GetAllUsersUnderSupervisors?userCode=' + userCode);
            }

            this.getSelectedUserRole = function (selectedUser) {
                return $http.get('Users/GetSelectedUserRole?selectedUser=' + selectedUser);
            }

            this.getUsersForDropdown = function () {       
                return $http.get('Users/GetUsersForDropdown');              
            }

            this.getUsersForQueries = function () {
                return $http.get('Users/GetUsersForQueries');
            }

            this.getRoleNameForUser = function() {
                return $http.get('Users/GetRoleNameForUser');
            }

            this.viewsBasedOnRoles = function(enqRef) {
                return $http.get('Users/ViewsBasedOnRoles?enqRef=' + enqRef);
            }

            this.getFooterSignatureTemplateOfUser = function (user) {
                return $http.get('Users/GetFooterSignatureTemplateOfUser?user=' + user);
            }

            this.getUser = function (usCode) {
              if (usCode === undefined) {
                  return false;
              }
                var paramValue = usCode;
                var urlBase = '/api/V_eTrakUsers?paramValue=' + encodeURIComponent(paramValue);
                return $http.get(urlBase);
            }

            this.clearBuddy = function (usCode) {
                var paramValue = usCode;
                var urlBase = '/api/R_Users?buddyValue=' + encodeURIComponent(paramValue);
                $http.get(urlBase);
                return true;
            }

            this.saveUserChanges = function (usCode, user) {
                var request = $http({
                    method: "put",
                    url: urlBase + "/" + usCode,
                    data: user.data[0]
                });

                return request;
            }

            this.UpdateBuddy = function ( userCode, selectedBuddy, enqRef) {
                console.log("selectedBuddy=" + selectedBuddy + "userCode=" + userCode);
                var response = $http(
                   {
                       method: "post",
                       url: '/api/R_Users?selectedBuddy=' + selectedBuddy + "&userCode=" + userCode + "&enqRef=" + enqRef,
                       contentType: "application/json;charset=utf-8",
                       dataType: "json"
                   });
                return response;
            }
        }
    ]);
})();