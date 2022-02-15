(function () {
    'use strict';

    // This will be the main Enquiries Dasboard Filter
    eTrakApp.filter('enquiriesDashboardFilter', [function () {


        alert("here enquiriesDashboardFilter");

        return function (items, $scope) {

            var countItems = 0;
            var filtered = [];
            var isOK = 0;
            var nightsFrom = 0;
            var nightsTo = 0;
            var test;
            var notThere = undefined;
            //break;
            var dateAdded; // as an init
            var dateArrival; // as an init
            var dateFrom;
            var dateTo;


            if ($scope.fltAddedDateFrom === notThere) {
                $scope.fltAddedDateFrom = '01/01/2000';
            };

            if ($scope.fltAddedDateTo === notThere) {
                $scope.fltAddedDateTo = '01/01/3000';
            }

            if ($scope.fltEnCode === notThere) $scope.fltEnCode = "";
            if ($scope.fltUser === notThere) $scope.fltUser = "";

            if ($scope.fltSpInt === notThere) $scope.fltSpInt = "";

            if ($scope.fltCountry === notThere) $scope.fltCountry = "";
            if ($scope.fltCity === notThere) $scope.fltCity = "";
            if ($scope.fltBudgetCategory === notThere) $scope.fltBudgetCategory = "";

            if ($scope.fltArrivalDateFrom === notThere) $scope.fltArrivalDateFrom = '01/01/2000';
            if ($scope.fltArrivalDateTo === notThere) $scope.fltArrivalDateTo = '01/01/3000';
            if ($scope.fltNightsFrom === notThere) $scope.fltNightsFrom = "0";
            if ($scope.fltNightsTo === notThere) $scope.fltNightsTo = "9999";
            if ($scope.fltClient === notThere) $scope.fltClient = "";
            if ($scope.fltCompany === notThere) $scope.fltCompany = "";
            if ($scope.fltLeadName === notThere) $scope.fltLeadName = "";
            if ($scope.fltSource === notThere) $scope.fltSource = "";
            if ($scope.fltClientGroup === notThere) $scope.fltClientGroup = "";
            if ($scope.fltDeadReason === notThere) $scope.fltDeadReason = "";
            var progress = "";
            if ($scope.fltProgressNew === true) progress = progress + "10|";
            if ($scope.fltProgressAssigned === true) progress = progress + "20|";
            if ($scope.fltProgressActioned === true) progress = progress + "30|";
            if ($scope.fltProgressClosed === true) progress = progress + "40";

            angular.forEach(items, function (item) {

                isOK = 1;
                // some conditions

                if ($scope.fltEnCode !== "") {
                    if (item.enCode === null) { test = ""; } else { test = item.enCode; }
                    if (test.indexOf($scope.fltEnCode) < 0) isOK = 0;
                }
                if ($scope.fltUser !== "") {
                    if (item.enUserAssigned === null) { test = ""; } else { test = item.enUserAssigned; };
                    if (test.toLowerCase().indexOf($scope.fltUser.toLowerCase()) < 0) isOK = 0;
                }


                if ($scope.fltSpInt !== "") {
                    if (item.enSpecialInterest === null) { test = ""; } else { test = item.enSpecialInterest; }
                    if (test.toLowerCase().indexOf($scope.fltSpInt.toLowerCase) < 0) isOK = 0;
                }

                if (item.enDateAdded === notThere) {
                    dateAdded = new Date().toISOString.substring(0, 10);
                } else {
                    dateAdded = item.enDateAdded.substring(0, 10);
                }
                dateFrom = $scope.fltAddedDateFrom.substring(6, 11) + "-" + $scope.fltAddedDateFrom.substring(3, 5) + "-" + $scope.fltAddedDateFrom.substring(0, 2);
                dateTo = $scope.fltAddedDateTo.substring(6, 11) + "-" + $scope.fltAddedDateTo.substring(3, 5) + "-" + $scope.fltAddedDateTo.substring(0, 2);


                if (dateFrom >= dateAdded || dateAdded >= dateTo) isOK = 0;
                if (countItems < 0) {
                    alert(dateAdded);
                    alert(dateFrom);
                    alert(dateTo);
                    alert(dateFrom >= dateAdded || dateAdded >= dateTo);
                }

                if ($scope.fltCountry !== "") {
                    if (item.enCountryCode === null) { test = ""; } else { test = item.enCountryCode; }
                    if (test.indexOf($scope.fltCountry) < 0) isOK = 0;
                }
                // if (isOK = 0) alert("test");

                if ($scope.fltCity !== "") {
                    if (item.enCityCode === null) { test = ""; } else { test = item.enCityCode; }
                    if (test.toLowerCase().indexOf($scope.fltCity.toLowerCase()) < 0) isOK = 0;
                }

                if ($scope.fltBudgetCategory !== "") {
                    if (item.enBudgetCategoryCode === null) { test = ""; } else { test = item.enBudgetCategoryCode; }
                    if (test.toLowerCase().indexOf($scope.fltBudgetCategory.toLowerCase()) < 0) isOK = 0;
                }

                if (item.enDateOfArrival === notThere) {
                    dateArrival = new Date().toISOString.substring(0, 10);
                } else {
                    dateArrival = item.enDateOfArrival.substring(0, 10);
                }
                dateFrom = $scope.fltArrivalDateFrom.substring(6, 11) + "-" + $scope.fltArrivalDateFrom.substring(3, 5) + "-" + $scope.fltArrivalDateFrom.substring(0, 2);
                dateTo = $scope.fltArrivalDateTo.substring(6, 11) + "-" + $scope.fltArrivalDateTo.substring(3, 5) + "-" + $scope.fltArrivalDateTo.substring(0, 2);


                if (dateFrom >= dateArrival || dateArrival >= dateTo) isOK = 0;
                if (countItems < 0) {
                    alert(dateArrival);
                    alert(dateFrom);
                    alert(dateTo);
                    alert(dateFrom >= dateArrival || dateAdded >= dateTo);
                }


                if (progress !== "") {
                    if (item.enProgress === null) { test = ""; } else { test = item.enProgress; };
                    if (progress.indexOf(test) < 0) isOK = 0;
                }


                if ($scope.fltNightsFrom !== "0" || $scope.fltNightsTo !== "9999") {
                    nightsFrom = parseInt($scope.fltNightsFrom);
                    nightsTo = parseInt($scope.fltNightsTo);
                    if (item.enNights === null || item.enNights === undefined) { test = 0; } else { test = parseInt(item.enNights); }
                    if (nightsFrom >= test || nightsTo <= test) isOK = 0;
                }


                if ($scope.fltClient !== "") {
                    if (item.enFullName === null) { test = ""; } else { test = item.enFullName; };
                    if (test.toLowerCase().indexOf($scope.fltClient.toLowerCase()) < 0) isOK = 0;
                }

                if ($scope.fltCompany !== "") {
                    if (item.clCompanyName === null) { test = ""; } else { test = item.clCompanyName; };
                    if (test.toLowerCase().indexOf($scope.fltCompany.toLowerCase()) < 0) isOK = 0;
                }

                if ($scope.fltLeadName !== "") {
                    if (item.enLeadPassengerName === null) { test = ""; } else { test = item.enLeadPassengerName; };
                    if (test.toLowerCase().indexOf($scope.fltLeadName.toLowerCase()) < 0) isOK = 0;
                }

                //if ($scope.fltSource !== "" && item.enSourceCode !== $scope.fltSource)  isOK = 0;
                if ($scope.fltSource !== "") {
                    if (item.enSourceCode === null) { test = ""; } else { test = item.enSourceCode; };
                    if (test !== $scope.fltSource) isOK = 0;
                }

                if ($scope.fltClientGroup !== "") {
                    if (item.clClientGroup === null) { test = ""; } else { test = item.clClientGroup; };
                    if (test !== $scope.fltClientGroup) isOK = 0;
                }

                if ($scope.fltDeadReason !== "") {
                    if (item.enDeadReasonCode === null) { test = ""; } else { test = item.enDeadReasonCode; };
                    if (test !== $scope.fltDeadReason) isOK = 0;
                }


                if (isOK > 0) {
                    filtered.push(item);
                    countItems++;
                }

            });
          //alert(filtered.length);
            return filtered;
        };
    }]);
})();
