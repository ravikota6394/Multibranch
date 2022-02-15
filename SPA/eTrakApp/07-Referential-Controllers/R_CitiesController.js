(function () {
    'use strict';

    var eTrakApp = angular.module('eTrakApp');

    //// Cities list
    eTrakApp.controller('R_Cities', [
        '$scope','$rootScope', '$timeout','logger','R_CitiesService', 'R_CountriesService',
        function ($scope, $rootScope, $timeout,logger,citiesFactory, countriesFactory) {

            function getCities() {
                citiesFactory.getCities()
                    .success(function (cities) {
                        $scope.Cities = cities;
                    });

            }

            getCities();

            // Set watch nto correct Country / GMT Time zone on change of City
            var timeout = setTimeout(function () {
                $scope.$watch('DTEnquiry.enEDCityCode', function(newValue, oldValue) {
                    //if (newValue !== oldValue) {
                    //$scope.dataHasChanged = angular.equals($scope.project, $scope.original);

                    var tempCountryCode = 0;
                    var timeout = setTimeout(function() {
                        //alert("City code = " + $scope.DTEnquiry.enEDCityCode);
                        try {
                            if ($scope.DTEnquiry.enEDCityCode !== undefined) {
                                var promiseGet = citiesFactory.getCity($scope.DTEnquiry.enEDCityCode)
                                    .success(function(city) {
                                        //var tempCity = eval('(' + city + ')');
                                        var tempCity = city;
                                        //alert(tempCity.coName);
                                        tempCountryCode = tempCity.ciCountryCode;
                                        //$scope.DTEnquiry.enEDCountryCode = tempCountryCode;
                                        $scope.DTEnquiry.enEDCountryName = tempCity.coName;

                                        //alert("changed country code " + tempCountryCode + " - " + tempCity.coName);
                                    })
                                    .catch(function() {
                                        $scope.DTEnquiry.enEDCountryCode = tempCountryCode;
                                        $scope.DTEnquiry.enEDCountryName = "Not Known";

                                    });
                            } else {
                                $scope.DTEnquiry.enEDCountryCode = tempCountryCode;
                                $scope.DTEnquiry.enEDCountryName = "Not Known";

                            }
                        } catch (err) {
                        }
                    }, 50);

                //}
                    //logger.info("EDCity Data has changed");
                }, true);

            }, 500);
            // Set watch onto enECCityCode for Country / GMT Time zone on change of City
            var timeout1 = setTimeout(function () {
                $scope.$watch('DTEnquiry.enECCityCode', function (newValue, oldValue) {
                   // if (newValue !== oldValue) {
                        //$scope.dataHasChanged = angular.equals($scope.project, $scope.original);

                        var tempCountryCode = 0;
                        var timeout = setTimeout(function () {
                            //alert("City code = " + $scope.DTEnquiry.enECCityCode);
                            try {
                                if ($scope.DTEnquiry.enECCityCode !== undefined) {
                                    var promiseGet = citiesFactory.getCity($scope.DTEnquiry.enECCityCode)
                                        .success(function(city) {
                                            //var tempCity = eval('(' + city + ')');
                                            var tempCity = city;
                                            //alert(tempCity.coName);
                                            tempCountryCode = tempCity.ciCountryCode;
                                            $scope.DTEnquiry.enECCountryCode = tempCountryCode;
                                            $scope.DTEnquiry.enECCountryName = tempCity.coName;
                                            //alert("changed country code " + tempCountryCode + " - " + tempCity.coName);
                                        })
                                        .catch(function() {
                                            $scope.DTEnquiry.enECCountryCode = tempCountryCode;
                                            $scope.DTEnquiry.enECCountryName = "Not Known";

                                        });
                                } else {
                                    $scope.DTEnquiry.enECCountryCode = tempCountryCode;
                                    $scope.DTEnquiry.enECCountryName = "Not Known";
                                }

                            } catch (err) {
                            }

                        }, 50);

                    //}
                    //logger.info("ECCity Data has changed");
                }, true);

            }, 500);
            // Set watch onto ef.efCountryCode for Country / GMT Time zone on change of City
            var timeout3 = setTimeout(function () {
                $scope.$watch('ef.efCityCode', function (newValue, oldValue) {
                    //alert("here "+ $scope.ef.efCityCode + " "+ $scope.ef.ID);
                    // if (newValue !== oldValue) {
                    //$scope.dataHasChanged = angular.equals($scope.project, $scope.original);
                    try {
                        if ($scope.ef.efCityCode) {
                            var tempCountryCode = 0;
                            var tempCountryName = "";
                            var timeout4 = setTimeout(function() {
                                //alert("City code = " + $scope.DTEnquiry.enECCityCode);
                                var promiseGet = citiesFactory.getCity($scope.ef.efCityCode)
                                    .success(function(city) {
                                        //var tempCity = eval('(' + city + ')');
                                        var tempCity = city;
                                        //alert(tempCity);
                                        // alert(tempCity.coName);
                                        tempCountryCode = tempCity.ciCountryCode;
                                        tempCountryName = tempCity.coName;

                                        $scope.ef.efCountryCode = tempCountryCode;
                                        //alert('#idEFCountryName-' + $scope.ef.ID + " country name " + tempCountryName);
                                        $('#idEFCountryName-' + $scope.ef.ID).val(tempCountryName);
                                        // document.getElementById('idEFCountryName-' + $scope.ef.ID).value = tempCountryName;
                                    })
                                    .catch(function() {
                                        $scope.ef.efCountryCode = tempCountryCode;
                                        $('#idEFCountryName-' + $scope.ef.ID).val("Not Known");

                                    });

                            }, 50);
                        } else {
                            $scope.ef.efCountryCode = tempCountryCode;
                            $('#idEFCountryName-' + $scope.ef.ID).val("Not Known");

                        }
                    } catch (err) {
                    }


                    //logger.info("ECCity Data has changed");
                }, true);

            }, 500);

        }
    ]);
})();
