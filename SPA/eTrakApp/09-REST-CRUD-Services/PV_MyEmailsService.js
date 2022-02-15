var eTrakApp = angular.module('eTrakApp');

eTrakApp.service('PV_MyEmailsService', [
    '$http', function ($http) {
          
        this.getMyEmails = function (userCode, isClientManager) {
            var urlById = '/api/PV_MyEmails?userCode=' + userCode + '&isClientManager=' + isClientManager;
            return $http.get(urlById);
        };

        this.getFilter = function (usCode, usCodeBuddy) {
            var paramValue;

            if (usCodeBuddy !== '') {
                paramValue = "( enEDUserAssigned = '" + usCode + "' OR enEDUserAssigned = '" + usCodeBuddy + "' )";
            } else {
                paramValue = "enEDUserAssigned = '" + usCode + "' ";
            }
            var urlBase = 'api/PV_MyEmails?paramValue=' + encodeURIComponent(paramValue);

            return $http.get(urlBase);
        }
    }
]);