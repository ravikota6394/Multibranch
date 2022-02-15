(function () {
    'use strict';
    var eTrakApp = angular.module('eTrakApp');

    // This will be the sources Dropdown Filter
    eTrakApp.filter('deadReasonsFilter', [function () {

        return function (items, preChosen) {
            
           var countItems = 0;
            var filtered = [];
            var isOK = 0;

            var test;
            var notThere = undefined;

            angular.forEach(items, function (item) {

                isOK = 1;
                // some conditions

                if (item.drStatus !== 'L' && item.drCode !== preChosen) {
                    isOK = 0;
                }
                if (isOK > 0) {
                    filtered.push(item);
                    countItems++;
                }

            });
         // alert(filtered.length);
            return filtered;
        };
    }]);
})();