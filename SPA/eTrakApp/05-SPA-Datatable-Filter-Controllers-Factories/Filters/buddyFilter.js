(function () {
    'use strict';
    var eTrakApp = angular.module('eTrakApp');

    // This will be the sources Dropdown Filter
    eTrakApp.filter('buddyFilter', [function () {

        return function (items,whiteLabelCode) {
            var countItems = 0;
            var filtered = [];
            var isOK = 0;
            //var nightsFrom = 0;
            //var nightsTo = 0;
            var test;
            var notThere = undefined;

            angular.forEach(items, function(item) {

                isOK = 1;
                // some conditions

                if (item.usStatus !== 'L') {
                    isOK = 0;
                }

                if (item.usWhiteLabel !== whiteLabelCode) {                
                    isOK = 0;
                }
                
                if (isOK > 0) {
                    filtered.push(item);
                    countItems++;
                }

            });

            return filtered;
        };
    }]);
})();