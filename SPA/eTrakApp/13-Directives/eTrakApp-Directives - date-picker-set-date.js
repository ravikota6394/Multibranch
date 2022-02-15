(function() {
    'use strict';

   var eTrakApp = angular.module('eTrakApp');
   eTrakApp.directive('datepickersetdate', function () {
       alert("here");
       return {
           require : 'ngModel',
           link : function (scope, element, attrs, ngModelCtrl) {
               $(function(){
                   element.datepicker({
                       dateFormat:'dd/mm/yy',
                       onSelect:function (date) {
                           ngModelCtrl.$setViewValue(date);
                           scope.$apply();
                       }
                   });
               });
           }

           //restrict: 'EAC',
           //require: 'ngModel',
           //scope:{"ngModel": "="},
           //link: function (scope, element, attr) {
           //    $(element).datepicker({
           //        format: "mm/dd/yyyy",
           //    }).on("changeDate", function (e) {
           //        return scope.$apply(function () {
           //            alert("here");
           //            return scope.ngModel = e.format();
           //        });
           //    });

               //return scope.$watch("ngModel", function (newValue) {
               //    $(element).datepicker("update", newValue);
               //});



          //  }
           ////link: function (scope, element, attrs, ctrl) {
           //    ctrl.$formatters.push(function (value) {
           //        var date = new Date(Date.parse(value));
           //        date = new Date(date.getTime() + (60000 * date.getTimezoneOffset()));
           //        //if (!dateFormat || !modelValue) return "";
           //        //var retVal = moment(modelValue).format(dateFormat);
           //        return date;
           //    });

           //    ctrl.$parsers.push(function (value) {
           //        var date = new Date(value.getTime() - (60000 * value.getTimezoneOffset()));
           //        return date;
           //    });
           //}
       };
   });

})();