eTrakApp.service('ipAddressService', function ($http) {

    this.getIpAddress = function () {
        return $http.get("IpAddress/GetIpAddresses");
    }

});
