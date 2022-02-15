(function () {
    'use strict';

var eTrakApp = angular.module('eTrakApp');

    // Email Templates
    eTrakApp.controller('R_LanguageCodes', [
        '$scope', 'R_LanguageCodesService',
        function ($scope, languageCodesFactory) {

            function getLanguageCodes() {

                languageCodesFactory.getLanguageCodes()
                    .success(function (languageCodes) {
                        $scope.LanguageCodes = languageCodes;
                    });

            }

            getLanguageCodes();

        }
    ]);
})();
