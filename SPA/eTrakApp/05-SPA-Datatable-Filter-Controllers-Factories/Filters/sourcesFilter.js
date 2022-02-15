(function () {
    'use strict';
    var eTrakApp = angular.module('eTrakApp');

    // This will be the sources Dropdown Filter
    eTrakApp.filter('sourcesFilter', [function () {

        return function (items, enUserAdded, whiteLabelCodeFilter, preChosen) {


            var countItems = 0;
            var filtered = [];
            var isOK = 0;
            //var nightsFrom = 0;
            //var nightsTo = 0;
            var test;
            var notThere = undefined;

            angular.forEach(items, function (item) {

                isOK = 1;
                // some conditions

                if (item.soCode !== preChosen) {
                    if (enUserAdded !== 'EMAIL') {
                        if (item.soDescription < '999999') {
                            isOK = 0;
                        }
                    }

                    if (item.soStatus !== 'L') {
                        isOK = 0;
                    }
                    if (whiteLabelCodeFilter === undefined || whiteLabelCodeFilter === null || whiteLabelCodeFilter === "") {

                    } else {
                        if (item.wlCode !== whiteLabelCodeFilter) {
                            isOK = 0;
                        }

                    }
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