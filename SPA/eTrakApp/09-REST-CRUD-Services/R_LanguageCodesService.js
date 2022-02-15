(function () {
    'use strict';
    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.service('R_LanguageCodesService', [
    '$http', function ($http) {

      
        var urlBase = '/api/V_LanguageCodes';
        this.getLanguageCodes = function () {            
            return $http.get(urlBase);
        };
        this.getALanguageCode = function (languageCode) {
            console.log("getALanguageCode service" + languageCode);
            var urlBaseGet1 = '/api/R_LanguageCodes/' + languageCode;
            var request = $http({
                method: "get",
                url: urlBaseGet1
            });
            return request;

        };


    }
    ]);
})();