(function () {
    'use strict';
    var eTrakApp = angular.module('eTrakApp');

     eTrakApp.controller('PV_MyEmails', [
        '$scope', '$rootScope', '$interval', 'PV_MyEmailsService',
        
        function ($scope, $rootScope,$interval, myEmailsFactory) {
            var userCode = document.getElementById("userCode").value;         

            $scope.homeUserRole = $("#IsHomeUserCheck").val();
            console.log($scope.homeUserRole);

            $scope.dtEmailOptions = {
                retrieve: true,
                autoWidth: false,
                dom: 't',
                info: false,
                order: [],
                searching: false,
                columnDefs: [{
                    targets: ['no-sort'],
                    orderable: false
                }]
            };

            function getMyEmails() {
                console.log("MyEmailsController: " + $("#IsClientManagerCheck").val());
                var isClientManager = 0;
                if ($("#IsClientManagerCheck").val() == "true") {
                    isClientManager = 1;
                }
                myEmailsFactory.getMyEmails(userCode, isClientManager)
                    .success(function (myEmails) {
                        $rootScope.MyEmails = angular.fromJson(myEmails);                                                
                    });
            }

            getMyEmails();
        }
    ]);
})();
