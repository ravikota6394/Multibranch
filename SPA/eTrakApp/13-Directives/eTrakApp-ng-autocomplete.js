(function() {
    'use strict';

    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.directive('typeahead',['$timeout','$http', function ($timeout, $http) {
        return {
            restrict: 'AEC',
            scope: {
                title: '@',
                retkey: '@',
                displaykey: '@',
                modeldisplay: '=',
                subtitle: '@',
                modelret: '='
            },

            link: function(scope, elem, attrs) {
                scope.current = 0;
                scope.selected = false;

                scope.da = function(txt) {
                    scope.ajaxClass = 'loadImage';
                    $http({ method: 'Get', url: 'AdvancedSearch/GetAllSources?source=' + txt }).
                        success(function(data, status) {
                            scope.TypeAheadData = data;
                            scope.ajaxClass = '';
                        });
                }

                scope.handleSelection = function(key, val) {
                    scope.modelret = key;
                    scope.modeldisplay = val;
                    scope.current = 0;
                    scope.selected = true;
                }

                scope.isCurrent = function(index) {
                    return scope.current == index;
                }

                scope.setCurrent = function(index) {
                    scope.current = index;
                }

            },
            template: '<input type="text" ng-model="modeldisplay" ng-KeyPress="da(modeldisplay)"  ng-keydown="selected=false"' +
                'style="width:100%;" ng-class="ajaxClass">' +
                '<div class="list-group table-condensed overlap" ng-hide="!modeldisplay.length || selected" style="width:100%">' +
                '<a href="javascript:void();" class="list-group-item noTopBottomPad" ng-repeat="item in TypeAheadData|filter:model  track by $index" ' +
                'ng-click="handleSelection(item[retkey],item[displaykey])" style="cursor:pointer" ' +
                'ng-class="{active:isCurrent($index)}" ' +
                'ng-mouseenter="setCurrent($index)">' +
                ' {{item[title]}}<br />' +
                '<i>{{item[subtitle]}} </i>' +
                '</a> ' +
                '</div>' +
                '</input>'
        };
    }]);
});