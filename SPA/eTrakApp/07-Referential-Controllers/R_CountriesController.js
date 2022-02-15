(function () {
    'use strict';

    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.controller('R_Countries', [
        '$scope','$rootScope', 'logger','R_CountriesService',
        function ($scope, $rootScope, logger,countriesFactory) {
        
            function getCountries() {
                countriesFactory.getCountries()
                    .success(function (countries) {
                        $scope.Countries = countries;
                    });

            }

            getCountries();
        }
    ]);

})();
