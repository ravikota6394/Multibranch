(function () {
    'use strict';
    var eTrakApp = angular.module('eTrakApp');

    // This will be the sources Dropdown Filter
    eTrakApp.filter('travellersCountryFilter', [function () {

        return function (items, enProgress, preChosen) {
            
           var countItems = 0;
            var filtered = [];
            var isOK = 0;

            var test;
            var notThere = undefined;

            angular.forEach(items, function (item) {

                isOK = 1;
                // some conditions

                if (enProgress === '10' && item.coStatus !== 'L') {
                        isOK = 0;
                    }
                if (enProgress !== '10' && item.coStatus !== 'L' && item.coDescription !== preChosen) {
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