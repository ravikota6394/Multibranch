(function () {
    'use strict';

var eTrakApp = angular.module('eTrakApp');

    //// Cities list
    eTrakApp.controller('R_UserTimeZones', [
        '$scope', 'R_UserTimeZonesService',
        function ($scope, userTimeZonesFactory) {
            $scope.dtOptions = {
                autoWidth: false,
                order:[[1,'desc']],
                columnDefs: [
                    {
                        targets: ['no-sort'],
                        orderable: false
                    }
                ],
                dom:
                    "<'row no-margin'<'col-sm-6 no-padding'l><'col-sm-6 no-padding'f>r>" +
                        "t" +
                        "<'row no-margin'<'col-sm-6 no-padding'i><'col-sm-6 no-padding'p>>"
            };

            function getUserTimeZones() {
                userTimeZonesFactory.getUserTimeZones()
                    .success(function (userTimeZones) {
                        angular.forEach(userTimeZones, function (data) {
                            data.tzAdjustmentTime = parseFloat(data.tzAdjustmentTime);
                        });
                        $scope.UserTimeZones = userTimeZones;

                    });

            }

            getUserTimeZones();

        }
    ]);
})();
