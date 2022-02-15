(function() {
    'use strict';

    var eTrakApp = angular.module('eTrakApp');
    
    eTrakApp.directive('passLogon',['R_UsersService', '$rootScope',function (usersService,$rootScope) {
        var linkFunction = function (rootScope, element, attributes) {
            $rootScope.glbMainUserID = attributes['passLogon'];          
            if ($rootScope.glbMainUserID !== undefined) {
                usersService.getUser($rootScope.glbMainUserID).then(function(data) {
                    var obj = JSON.parse(JSON.stringify(data));
                    $rootScope.glbWhiteLabelName = obj.data[0].wlName;
                    $rootScope.glbWhiteLabel = obj.data[0].wlCode;
                    $rootScope.fltWhiteLabelCode = obj.data[0].wlCode;
                    if (obj.data[0].usControllerRefresh === null) {
                       $rootScope.glbRefreshSeconds = 60;   
                    } else {
                        $rootScope.glbRefreshSeconds = obj.data[0].usControllerRefresh;
                    }

                }).catch();
            }
        };

        return {
            restrict: "A",
            template: "<p></p>",
            link: linkFunction
        };
    }]);

    eTrakApp.directive('passLogonRoles', ['$rootScope', function($rootScope) {
        var linkFunction = function(rootScope, element, attributes) {
            $rootScope.glbRoles = attributes['passLogonRoles'];
            var roles = $rootScope.glbRoles;
            var sourceWhiteLabelCodeFilter = $rootScope.fltWhiteLabelCode;

            if (roles.indexOf('@SuperAdmin@') !== -1 || roles.indexOf('@Admin@') !== -1) {
                sourceWhiteLabelCodeFilter = "";
            }
            $rootScope.fltWhiteLabelCode = sourceWhiteLabelCodeFilter;
        };

        return {
            restrict: "A",
            template: "<p></p>",
            link: linkFunction
        };
    }]);

    eTrakApp.directive('capitalizeFirst',['$parse', function ($parse) {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                var capitalize = function (inputValue) {
                    if (inputValue === undefined) { inputValue = ''; }
                    var capitalized = inputValue.charAt(0).toUpperCase() +
                                      inputValue.substring(1);
                    if (capitalized !== inputValue) {
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                    }
                    return capitalized;
                }
                modelCtrl.$parsers.push(capitalize);
                capitalize($parse(attrs.ngModel)(scope)); 
            }
        };
    }]);
    eTrakApp.directive('capitalizeAll',['$parse',  function ($parse) {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                var capitalize = function (inputValue) {
                    if (inputValue === undefined) { inputValue = ''; }
                    var capitalized = inputValue.toUpperCase();
                    if (capitalized !== inputValue) {
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                    }
                    return capitalized;
                }
                modelCtrl.$parsers.push(capitalize);
                capitalize($parse(attrs.ngModel)(scope)); // capitalize all
            }
        };
    }]); eTrakApp.directive('tagList',['$timeout', function ($timeout) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                scope.$watch(attrs.ngModel, function (value) {
                    if (value !== undefined) {
                        element.select2('val', value);
                        alert(value);
                    }
                });

                element.bind('change', function () {
                    var value = element.select2('val');
                    controller.$setViewValue(value);
                });

                $timeout(function () {
                    element.select2({
                        tags: []
                    });
                });
            }
        };
    }]);
})();