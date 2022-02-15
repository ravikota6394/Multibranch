(function () {
    'use strict';

    var eTrakApp = angular.module('eTrakApp');


    // Countries list
    eTrakApp.controller('R_CountriesFrontSearch', [
        '$scope','$rootScope', 'logger','R_CountriesService',
        function ($scope, $rootScope, logger,countriesFactory) {


            function getCountries() {
                countriesFactory.getCountries()
                    .success(function (countries) {
                        $scope.Countries = countries;
                    });

            }

            getCountries();

            //$scope.hideCountryDropdown = true;
            //$scope.GetCountriesForAutoDropdown = function (country) {
            //    console.log(country);
            //    countriesFactory.getAllCountries(country)
            //      .success(function (countries) {
            //          $scope.allCountries = countries;
            //          console.log($scope.allCountries);
            //          $scope.hideCountryDropdown = false;
            //      });
            //}

            //$scope.selectedCountry = function (country) {
            //    $scope.hideCountryDropdown = true;
            //}


        }
    ]);

})();
