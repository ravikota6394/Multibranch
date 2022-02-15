(function () {
    'use strict';
    var eTrakApp = angular.module('eTrakApp');

    // Sources list
    eTrakApp.controller('R_Suppliers', [
        '$scope', 'R_SuppliersService',
        function ($scope, suppliersFactory) {


            function getSuppliers() {
                suppliersFactory.getSuppliers()
                    .success(function (suppliers) {
                        $scope.Suppliers = suppliers;
                    });
            }

            getSuppliers();
        }
    ]);
})();
