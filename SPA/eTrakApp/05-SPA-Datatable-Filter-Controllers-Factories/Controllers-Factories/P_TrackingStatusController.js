(function () {
    'use strict';

    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.controller('P_TrackingStatus', ['$scope', '$rootScope', 'PV_TrackingEntriesService', controller]);

    function controller($scope, $rootScope, usersFactory) {

        getFunctionalities();
        var functionalityId = 2;
        getDashboardStatusRecords(functionalityId);

        function getDashboardStatusRecords(functionalityId) {
            usersFactory.getTrackingStatusRecords(functionalityId)
                .success(function (TrackingRecords) {
                    $scope.TrackingRecords = TrackingRecords;
                    console.log(TrackingRecords);
                    setTimeout(gethighChart, 100);
                });
        }

        function getFunctionalities() {
            usersFactory.getFunctionalities()
                .success(function (Functionalities) {
                    $scope.Functionalities = Functionalities;
                    console.log("Functionalities");
                    console.log($scope.Functionalities);
                });
        }


        $scope.getTrackingStatusRecords = function (functionalityId) {
            usersFactory.getTrackingStatusRecords(functionalityId)
                .success(function (TrackingRecords) {
                    $scope.TrackingRecords = TrackingRecords;
                    console.log(TrackingRecords);
                    setTimeout(gethighChart, 100);
                });
        }

        function gethighChart() {

            var chart = Highcharts.StockChart('container', {

                data: {
                    table: 'datatable'
                },

                chart: {
                    type: 'spline'
                },

                title: {
                    text: 'Tracking Status'
                },

                xAxis: {
                    type: 'datetime',
                    labels: {
                        formatter: function () {
                            return Highcharts.dateFormat('%d %b', this.value);
                        }
                    },
                    title: {
                        text: 'Viewed DateTime'
                    }
                    //tickInterval: 24 * 3600 * 1000,
                    //min: new Date().setDate(new Date().getDate() - 30),
                    //max: new Date().getTime()
                },

                yAxis: {
                    title: {
                        text: 'No Of Users Viewed'
                    },
                    min: 0
                },

                credits: {
                    enabled: false
                },

                series: [{
                    showInLegend: false
                }]
            });
        }
    };
})();