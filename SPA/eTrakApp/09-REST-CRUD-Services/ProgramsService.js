(function () {
    'use strict';
    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.service('ProgramsService', [
        '$http', function ($http) {

            this.getPrograms = function () {
                return $http.get("Programs/GetPrograms");
            }

            this.getProgramsBasedOnRoles = function() {
                return $http.get("Programs/GetProgramsBasedOnRoles");
            }

            this.getActionTabScripts = function () {
                return $http.get("Programs/GetActionTabScripts");
            }

            this.saveProgramQuery = function (programQueryObject) {
                console.log(programQueryObject);
                console.log('Save program query details');
                var response = $http(
                    {
                        method: "post",
                        url: '/Programs/SaveProgramQuery',
                        data: programQueryObject,
                        contentType: "application/json;charset=utf-8",
                        dataType: "json"
                    });
                return response;
            }

            this.getProgramQuery = function (programId) {
                return $http.get("Programs/GetProgramQuery?programId=" + programId);
            }

            this.getAuditDetails = function (programId) {
                return $http.get("Programs/GetAuditDetails?programId=" + programId);
            }

            this.getProgramSyntax = function (programId) {
                return $http.get("Programs/GetProgramSyntax?programId=" + programId);
            }

            this.initializeOrStopQueryRun = function (programQueryId, isQueryInitialize) {
                return $http.get("Programs/initializeOrStopQueryRun?programQueryId=" + programQueryId + "&isQueryInitialize=" + isQueryInitialize);
            }

            this.pauseOrResumeQuery = function (programQueryId, isQueryPaused) {
                return $http.get("Programs/IsQueryPaused?programQueryId=" + programQueryId + "&isQueryPaused=" + isQueryPaused);
            }

            this.runProgramQuery = function (programQueryId) {
                return $http.get("Programs/RunProgramQuery?programQueryId=" + programQueryId);
            }

            this.deleteProgramQuery = function (programQueryId) {
                return $http.get("Programs/DeleteProgramQuery?programId=" + programQueryId);
            }

            this.beautifyXml = function (programQueryObject) {
                console.log(programQueryObject);
                console.log('Save program query details');
                var response = $http(
                    {
                        method: "post",
                        url: '/Programs/BeautifyXml',
                        data: programQueryObject,
                        contentType: "application/json;charset=utf-8",
                        dataType: "json"
                    });
                return response;
            }
        }
    ]);
})();

