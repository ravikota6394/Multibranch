(function () {
    'use strict';
    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.service('R_RoomspaceCitiesService', [
        '$http', function ($http) {

            this.getRoomspaceCities = function () {
                return $http.get("RoomspaceCities/GetRoomspaceCities");
            }
            
        }
    ]);
})();