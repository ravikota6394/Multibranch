(function () {
    'use strict';

    var eTrakApp = angular.module('eTrakApp');
    eTrakApp.controller('Programs', [
        '$scope', 'ProgramsService', '$rootScope',
        function ($scope, programsFactory, $rootScope) {

            getPrograms();

            function getPrograms() {
                programsFactory.getPrograms()
                    .then(function (program) {
                        console.log(program.data);
                        $scope.programs = program.data;
                        console.log("program");
                    });
            }

            getProgramsBasedOnRoles();

            function getProgramsBasedOnRoles() {
                programsFactory.getProgramsBasedOnRoles().then(function(programsBasedOnRoles) {
                    console.log("ProgramsBasedOnRoles: " + programsBasedOnRoles.data);
                    $scope.programsBasedOnRoles = programsBasedOnRoles.data;
                });
            }

            getActionTabScripts();

            function getActionTabScripts() {
                programsFactory.getActionTabScripts().then(function (actionTabScripts) {
                    console.log("actionTabScripts: " + actionTabScripts.data);
                    $scope.actionTabScripts = actionTabScripts.data;
                });
            }

            getProgramQuery();

            function getProgramQuery() {
                var programId = $("#programId").val();
                console.log(programId);
                programsFactory.getProgramQuery(programId)
                    .then(function (programQuery) {
                        console.log("programQuery");
                        console.log(programQuery.data);
                        $scope.programQuery = programQuery.data.pqQuery;
                        $scope.programQueryId = programQuery.data.pqId;
                        $scope.programIdValue = programQuery.data.pqProgramId;
                        console.log("$scope.programIdValue: " + $scope.programIdValue);
                        console.log("$scope.programQueryId: " + $scope.programQueryId);
                        console.log($scope.programQueryId);
                        $scope.programInitialized = programQuery.data.pqRunIntialized;
                        $scope.programPaused = programQuery.data.pqIsPaused;
                        $scope.programRunning = programQuery.data.pqIsRunning;
                        console.log("$scope.programPaused: " + $scope.programPaused);
                        console.log("$scope.programRunning: " + $scope.programRunning);
                        console.log($scope.programQuery);
                    });
            }

            $("#programName").focus(function () {
                document.getElementById("scriptName").style.display = 'none';
            });

            $("#programQuery").focus(function () {
                document.getElementById("scriptQuery").style.display = 'none';
            });

            $scope.saveProgramQuery = function () {
                console.log("saveProgramQuery");

                var selectedrole = [];
                $('#checkboxes input:checked').each(function () {
                    selectedrole.push($(this).attr('value'));
                });
                
                var programQueryObject = {
                    pqId: $scope.programQueryId,
                    pqQuery: $scope.programQuery,
                    pqProgramId: $("#programId").val(),
                    queryName: document.getElementById("programName").value,
                    selectedrole: selectedrole
                }
                console.log(programQueryObject);

                if (programQueryObject.queryName === "" || programQueryObject.queryName === null || programQueryObject.queryName == undefined) {
                    document.getElementById("scriptName").style.display = 'block';
                    document.getElementById("scriptName").textContent = "Please enter query name";
                    return;
                }

                if (programQueryObject.pqQuery === "" || programQueryObject.pqQuery === null || programQueryObject.pqQuery == undefined) {
                    document.getElementById("scriptQuery").style.display = 'block';
                    document.getElementById("scriptQuery").textContent = "Please enter query";
                    return;
                }

                if (selectedrole.length === 0) {
                    document.getElementById("scriptRoles").style.display = 'block';
                    document.getElementById("scriptRoles").textContent = "Please select any role before saving query";
                    return;
                }

                programsFactory.saveProgramQuery(programQueryObject)
                    .success(function (programQueryId) {
                        console.log('Save Query Schedule Success');
                        document.getElementById("scriptRoles").style.display = 'none';
                        console.log(programQueryId);
                        $("#programQuerySuccess").modal('show');
                        $scope.programQueryId = programQueryId;
                        if (programQueryId !== 0) {
                            $scope.Status = "Program Query saved successfully";
                        }
                        else {
                            $scope.Status = "Failed saving program query";
                        }
                    });
            }

            $scope.getAuditDetails = function () {
                var programId = $("#programId").val();
                programsFactory.getAuditDetails(programId)
                   .success(function (queryAuditDetails) {
                       console.log('Audit details');
                       $("#id_QueryAuditDetails").modal('show');
                       $scope.queryAuditDetails = queryAuditDetails;
                       console.log($scope.queryAuditDetails);
                   });
            }

            $scope.getProgramSyntax = function () {
                var programId = $("#programId").val();
                programsFactory.getProgramSyntax(programId)
                   .success(function (programSyntax) {
                       console.log('Program syntax');
                       console.log(programSyntax);
                       $("#programSyntax").modal('show');
                       $scope.programSyntax = programSyntax;
                   });
            }

            $scope.initializeOrStopQueryRun = function (isQueryInitialize) {
                var programQueryId = $scope.programQueryId;
                console.log(programQueryId);
                console.log(isQueryInitialize);
                programsFactory.initializeOrStopQueryRun(programQueryId, isQueryInitialize)
                   .success(function (status) {
                       console.log(status);
                       if (status === "Success" && isQueryInitialize === true) {
                           $scope.Status = "Query run is initialized";
                           $("#programQuerySuccess").modal('show');
                           $scope.programInitialized = true;
                           $scope.programRunning = true;
                       }
                       else if (status === "Success" && isQueryInitialize === false) {
                           $scope.Status = "Stopped initializing the query";
                           $("#programQuerySuccess").modal('show');
                           $scope.programInitialized = false;
                           $scope.programRunning = false;
                           $scope.programPaused = true;
                       }
                       else {
                           $scope.Status = "Failed to initialize query";
                       }
                   });
            }

            $scope.pauseOrResumeQuery = function (isQueryPaused) {
                var programQueryId = $scope.programQueryId;
                console.log("programQueryId: " + programQueryId);
                console.log("isQueryPaused: " + isQueryPaused);
                programsFactory.pauseOrResumeQuery(programQueryId, isQueryPaused).success(function (status) {
                    if (status === "PausedOrResumed" && isQueryPaused === true) {
                        $scope.Status = "Paused the Query Run";
                        $("#programQuerySuccess").modal('show');
                        $scope.programPaused = false;
                        $scope.programRunning = false;
                    }
                    else if (status === "PausedOrResumed" && isQueryPaused === false) {
                        $scope.Status = "Resumed the Query Run";
                        $("#programQuerySuccess").modal('show');
                        $scope.programPaused = true;
                        $scope.programRunning = true;
                    }
                    else {
                        $scope.Status = "Failed to Resume query";
                    }
                });
            }

            $scope.runProgramQuery = function () {
                $("#progressBar").show();
                var programQueryId = $scope.programQueryId;
                console.log(programQueryId);
                $scope.programRunning = true;
                programsFactory.runProgramQuery(programQueryId)
                    .success(function (status) {
                        console.log(status);
                        if (status === "Success") {
                            $scope.Status = "Query run was Success. View Audit link for details";
                            $("#programQuerySuccess").modal('show');
                            $scope.programPaused = true;
                            $scope.programRunning = false;
                        }
                        else if (status === "Conditions not met") {
                            $scope.Status = "Query running failed as conditions are not met";
                            $("#programQuerySuccess").modal('show');
                            $scope.programPaused = true;
                            $scope.programRunning = false;
                        }
                        else {
                            $scope.Status = "Query running failed due to reason of " + status;
                            $("#programQuerySuccess").modal('show');
                            $scope.programPaused = true;
                            $scope.programRunning = true;
                        }
                        $("#progressBar").hide();
                    });
            }

            $scope.dtqueryAudit = {
                destroy: true,
                autoWidth: false,
                order: [[1, 'desc']],
                columnDefs: [
                    {
                        targets: ['no-sort'],
                        orderable: false
                    }
                ],
                dom:
                    "<'row no-margin'<'col-sm-6 no-padding'l><'col-sm-6 no-padding'f>r>" +
                        "t" +
                        "<'row no-margin'<'col-sm-6 no-padding'i><'col-sm-6 no-padding'p>>"
            };

            $scope.beautifyXml = function (xml, type) {
                var programQueryObject = {
                    pqQuery: xml
                }
                programsFactory.beautifyXml(programQueryObject)
                    .success(function (status) {
                        console.log(status);
                        if (type === "Syntax") {
                            $scope.programSyntax = status;
                        } else {
                            $scope.programQuery = status;
                        }
                    });
            }

            $scope.DeleteScript = function (id) {
                console.log("DeleteScript");
                console.log("DeleteScript id: " + id);

                $rootScope.deleteScriptId = id;
                $("#id_DeleteScript").modal("show");
            }

            $(function () {
                $(document).on("click", "#id_ConfirmScriptDelete", function () {
                    console.log("id_programId: " + $scope.deleteScriptId);
                    var programQueryId = $scope.deleteScriptId;
                    programsFactory.deleteProgramQuery(programQueryId).success(function () {
                        var parts = $rootScope.eTrakUrl.split("/");
                        console.log("$rootScope.eTrakUrl: " + $rootScope.eTrakUrl);
                        console.log("parts: " + parts);
                        $scope.http = parts[0];
                        $scope.Url = parts[2];
                        console.log("standing page: " + $scope.http + '//' + $scope.Url + '/Programs/#/');
                        window.location.href = $scope.http + '//' + $scope.Url + '/Programs/#/';

                        var delayInMilliseconds = 1000;
                        setTimeout(function () {
                            location.reload();
                        }, delayInMilliseconds);
                    });
                });
            });
        }
    ]);
})();


