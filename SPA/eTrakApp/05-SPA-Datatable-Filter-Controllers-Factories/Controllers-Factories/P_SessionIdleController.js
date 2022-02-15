(function () {
    'use strict';
    var eTrakApp = angular.module('eTrakApp');
    eTrakApp.controller('SessionIdle', ['$scope', '$rootScope', 'Idle',
        function ($scope, $rootScope, Idle) {
            $scope.started = false;
            start();

            function start() {
                console.log("session");
                closeModals();
                Idle.watch();
                $scope.started = true;
            }

            function closeModals() {
                if ($scope.warning) {
                    $('#warning').modal('hide');
                    $scope.warning = null;
                }
            }

            $scope.$on('IdleStart',
                function () {
                    closeModals();
                    warning();
                });

            $scope.$on('IdleTimeout',
                function () {
                    closeModals();
                    timedout();
                });

            function warning() {
                $('#warning').modal('show');
            }

            function timedout() {
                Idle.unwatch();
                var parts = $rootScope.eTrakUrl.split("/");
                console.log("$rootScope.eTrakUrl: " + $rootScope.eTrakUrl);
                console.log("parts: " + parts);                
                $scope.http = parts[0];
                $scope.logoutUrl = parts[2];

                window.location.href = $scope.http + '//' + $scope.logoutUrl + '/Account/LogOff?ReturnUrl=%2f#/';
            }

            $scope.logout = function () {
                window.location.href = $rootScope.eTrakUrl + '/Account/LogOff?ReturnUrl=%2f#/';
            };

            $scope.continueLoggedIn = function () {
                $('#warning').modal('hide');
            };
        }
    ]);
    eTrakApp.config(['IdleProvider','KeepaliveProvider', function (IdleProvider, KeepaliveProvider) {
        IdleProvider.idle(3600);
        IdleProvider.timeout(10);
        KeepaliveProvider.interval(3600);
    }]);



})();
