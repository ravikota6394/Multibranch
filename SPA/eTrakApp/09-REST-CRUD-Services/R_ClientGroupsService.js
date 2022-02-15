(function () {
    'use strict';
var eTrakApp = angular.module('eTrakApp');

    eTrakApp.service('R_ClientGroupsService', [
        '$http', function ($http) {

            var urlBase = '/ClientGroups/GetAllClientGroups';

            this.getClientGroups = function () {
                return $http.get(urlBase);
            };

            this.getclientGroup = function (username) {
                return $http.get("/ClientGroups/GetClientGroups?username=" + username);
            };
            
            this.getClientGroupName = function (clientGroupCode) {
                return $http.get("Clients/GetClientGroup?clientGroupCode=" + clientGroupCode);
            }

            this.getAllClientGroupsList = function () {
                return $http.get('/ClientGroups/GetAllClientGroupsList');
            };

        }
    ]);
})();