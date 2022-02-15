eTrakApp.controller('IpAddress', function ($scope,ipAddressService) {

    getIpAddress();

    function getIpAddress() {
        ipAddressService.getIpAddress()
            .success(function (ipAddresses) {
                console.log(ipAddresses);
                $scope.ipAddresses = ipAddresses;
            });
    }

});
