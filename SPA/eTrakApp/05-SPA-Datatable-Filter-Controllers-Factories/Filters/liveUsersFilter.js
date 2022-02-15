(function () {
    'use strict';
    var eTrakApp = angular.module('eTrakApp');

    // This will be the sources Dropdown Filter
    eTrakApp.filter('liveUsersFilter', [function () {

        return function (items, preChosen, whiteLabelCodeFilter) {

           var countItems = 0;
            var filtered = [];
            var isOK = 0;

            angular.forEach(items, function (item) {

                isOK = 1;
                // some conditions

                if (item.usStatus !== 'L' && item.usID !== preChosen) {
                    isOK = 0;
                }
                if (whiteLabelCodeFilter === undefined && whiteLabelCodeFilter === null && whiteLabelCodeFilter === "") {

                }else {
                    if (item.usWhiteLabel !== whiteLabelCodeFilter) {
                        isOK = 0;
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