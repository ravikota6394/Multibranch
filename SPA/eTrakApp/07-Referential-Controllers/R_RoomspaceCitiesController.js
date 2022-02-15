(function () {
    'use strict';

    var eTrakApp = angular.module('eTrakApp');

    // Roomspace Cities list
    eTrakApp.controller('R_RoomspaceCities', [
        '$scope', 'R_RoomspaceCitiesService',
        function ($scope, roomspaceCitiesFactory) {

            function getRoomspaceCities() {
                roomspaceCitiesFactory.getRoomspaceCities()
                    .success(function (roomspaceCities) {
                        $scope.RoomspaceCities = roomspaceCities;
                        console.log($scope.RoomspaceCities);
                    });

            }

            getRoomspaceCities();
        }
    ]);
})();
