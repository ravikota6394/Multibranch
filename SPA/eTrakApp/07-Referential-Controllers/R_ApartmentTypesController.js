(function () {
    'use strict';

    var eTrakApp = angular.module('eTrakApp');

//// Budget Categories list
eTrakApp.controller('R_ApartmentTypes', [
    '$scope', 'R_ApartmentTypesService',
    function ($scope, apartmentTypesFactory) {

        function getApartmentTypes() {
            apartmentTypesFactory.getApartmentTypes()
                .success(function (apartmentTypes) {
                    $scope.ApartmentTypes = apartmentTypes;
                });

        }

        getApartmentTypes();

    }
]);
})();