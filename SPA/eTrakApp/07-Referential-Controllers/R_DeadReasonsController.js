(function () {
    'use strict';

    var eTrakApp = angular.module('eTrakApp');

    // Dead Reasons list
    eTrakApp.controller('R_DeadReasons', [
        '$scope', '$rootScope','R_DeadReasonsService',
        function ($scope, $rootScope, deadReasonsFactory) {


            function getDeadReasons(getSelected) {
                deadReasonsFactory.getDeadReasons(getSelected)
                    .success(function (deadReasons) {
                        $rootScope.DeadReasons = deadReasons;
                    });
            }
            getDeadReasons();

        }
    ]);
})();
