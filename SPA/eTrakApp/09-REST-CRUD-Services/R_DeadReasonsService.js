(function () {
    'use strict';

    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.service('R_DeadReasonsService', [
        '$http', function ($http) {

            var urlBase = '/api/R_DeadReasons';

            this.getDeadReasons = function (getSelected) {
                if (getSelected == null || getSelected == undefined)
                    getSelected = false;
                return $http.get(urlBase + "/?getSelectedReasons=" + getSelected);
            };

            //Get a dead reason
            this.getDeadReason = function (drCode) {
                return $http.get(urlBase + "/" + drCode);
            }

            //Get deadReason Name
            this.getDeadReasonName = function (deadReasonCode) {
                return $http.get("DeadReasons/GetDeadReason?deadReasonCode=" + deadReasonCode);
            }

        }
    ]);
})();