//(function() {
//    'use strict';

   var eTrakApp = angular.module('eTrakApp');
   eTrakApp.directive('datepickerTimezone', function () {
       return {
           restrict: 'A',
           priority: 1,
           require: 'ngModel',
           link: function (scope, element, attrs, ctrl) {
               ctrl.$formatters.push(function (value) {
                   var date = new Date(Date.parse(value));
                   date = new Date(date.getTime() + (60000 * date.getTimezoneOffset()));
                   //if (!dateFormat || !modelValue) return "";
                   //var retVal = moment(modelValue).format(dateFormat);
                   return date;
               });

               ctrl.$parsers.push(function (value) {
                   var date = new Date(value.getTime() - (60000 * value.getTimezoneOffset()));
                   return date;
               });
           }
       };
   });

//})();