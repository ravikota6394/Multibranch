(function () {
    'use strict';
    var eTrakApp = angular.module('eTrakApp');

    // Sources list
    eTrakApp.controller('R_WhiteLabels', [
        '$scope', 'R_WhiteLabelsService',
        function ($scope, whiteLabelsFactory) {


            function getWhiteLabels() {
                whiteLabelsFactory.getWhiteLabels()
                    .success(function (whiteLabels) {
                        $scope.WhiteLabels = whiteLabels;
                    });
            }

            getWhiteLabels();
        }
    ]);
})();
