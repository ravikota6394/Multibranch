(function () {
    'use strict';
var eTrakApp = angular.module('eTrakApp');

    eTrakApp.service('R_BudgetCategoriesService', [
        '$http', function ($http) {

            var urlBase = '/api/R_BudgetCategories';

            this.getBudgetCategories = function () {

                return $http.get(urlBase);
            };
            //Get a record
            this.getABudgetCategory = function (budgetCategory) {
               
                var urlBaseGet1 = '/api/R_BudgetCategories/' + budgetCategory;
                var request = $http({
                    method: "get",
                    url: urlBaseGet1
                });
                return request;

            };

        }
    ]);
})();