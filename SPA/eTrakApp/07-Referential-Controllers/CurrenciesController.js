eTrakApp.controller('Currencies',['$scope','CurrenciesService', function ($scope, CurrenciesService) {

    getCurrencies();

    function getCurrencies() {
        CurrenciesService.getCurrencies()
            .success(function (currencies) {
                console.log(currencies);
                $scope.currencies = currencies;
            });
    }

}]);