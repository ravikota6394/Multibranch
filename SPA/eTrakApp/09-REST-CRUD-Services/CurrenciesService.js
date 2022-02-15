eTrakApp.service('CurrenciesService', ['$http',function ($http) {

    this.getCurrencies = function () {
        return $http.get("Currency/GetCurrencies");
    }

}]);