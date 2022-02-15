(function () {
    'use strict';

    var eTrakApp = angular.module('eTrakApp');

    //// Budget Categories list
    eTrakApp.controller('R_BudgetCategories', [
        '$scope', 'R_BudgetCategoriesService',
        function ($scope, budgetCategoriesFactory) {

            function getBudgetCategories() {
                budgetCategoriesFactory.getBudgetCategories()
                    .success(function (budgetCategories) {
                        $scope.BudgetCategories = budgetCategories;
                        console.log($scope.BudgetCategories);
                    });

            }

            getBudgetCategories();

        }
    ]);
})();
