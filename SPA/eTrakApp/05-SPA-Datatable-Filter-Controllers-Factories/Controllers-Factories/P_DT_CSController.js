(function () {
    'use strict';
    var areaSearched = "";

    eTrakApp.controller('P_DT_CSController', [
            '$scope', '$rootScope', '$element', '$state', 'R_ClientsService','R_ClientGroupsService',
            function ($scope, $rootScope, $element, $state, clientsFactory, clientGroupsFactory) {

                $scope.$state = $state;
                $scope.displayClient = { "csClientGroup": null, "csClientCode": null };
                $scope.displayTraveller = { "tsTravellerGroup": null, "tsTravellerCode": null };
                $scope.displayChosenClient = {
                    "clFileImportCode": null,
                    "clTitle": null,
                    "clFirstName": null,
                    "clLastName": null,
                    "clCompanyName": null,
                    "clJobTitle": null,
                    "clAddress1": null,
                    "clAddress2": null,
                    "clAddress3": null,
                    "clAddress4": null,
                    "clAddress5": null,
                    "clPostCode": null,
                    "clTelephone1": null,
                    "clTelephone2": null,
                    "clTelephone3": null,
                    "clFaxNo": null,
                    "clEmailAddress": null,
                    "clWholeName": null,
                    "clSalutation": null,
                    "clStatus": null,
                    "clClientGroup": null,
                    "clExportFlag": null,
                    "clCountryCode": null,
                    "clSkype": null,
                    "clTimeZone": null,
                    "clTASAccountOwner": null
                }
                var clientFilterOnSelect = 0;
                var travellerFilterOnSelect = 0;
                var clientCode = "";
                var emailAddress = "";
                var lastName = "";
                var firstName = "";
                var companyName = "";
                var address1 = "";
                var postCode = "";

                $scope.dtCsClientSearch = function () {
                    areaSearched = "Clients";
                    $('#idDTClientChoice').on('show.bs.modal', function (event) {
                        var button = $(event.relatedTarget); // Button that triggered the modal
                        var modal = $(this);
                        modal.find('.modal-title').text('Find Client for Client Details');
                    });
                    $('#idDTClientChoice').modal('show');
                    $scope.displayClient = { "csClientCode": $scope.DTEnquiry.enCDClientCode };
                    clientCode = $scope.DTEnquiry.enCDClientCode;
                    $scope.emailAddress = $scope.DTEnquiry.enCDEmailAddress;
                    $scope.firstName = $scope.DTEnquiry.enCDFirstName;
                    $scope.lastName = $scope.DTEnquiry.enCDLastName;
                    $scope.companyName = $scope.DTEnquiry.enCDCompanyName;
                    $scope.address1 = $scope.DTEnquiry.enCDAddress1;
                    $scope.postCode = $scope.DTEnquiry.enCDPostCode;
                    $scope.clientGroup = $scope.DTEnquiry.enCDClientGroup;

                    getInitialClientSearch("Client");
                    getAllClientGroupsList();

                }

                function getAllClientGroupsList() {
                    clientGroupsFactory.getAllClientGroupsList()
                        .success(function (clientGroups) {
                            var allClientGroups = angular.fromJson(clientGroups);
                            $scope.allClientGroups = allClientGroups;
                            console.log("allClientGroups");
                            console.log($scope.allClientGroups);
                        });
                }

                $scope.dtCsTravellerSearch = function () {
                    areaSearched = "Traveller";
                    $('#idDTTravellerChoice').on('show.bs.modal', function (event) {
                        var button = $(event.relatedTarget); // Button that triggered the modal
                        var modal = $(this);
                        modal.find('.modal-title').text('Find Client for Traveller Details');
                    });
                    $('#idDTTravellerChoice').modal('show');
                    $scope.displayTraveller = { "tsTravellerCode": $scope.DTEnquiry.enTRClientCode };
                    clientCode = $scope.DTEnquiry.enTRClientCode;
                    $scope.emailAddress = $scope.DTEnquiry.enTREmailAddress;
                    $scope.firstName = $scope.DTEnquiry.enTRFirstName;
                    $scope.lastName = $scope.DTEnquiry.enTRLastName;
                    $scope.companyName = $scope.DTEnquiry.enTRCompanyName;
                    $scope.address1 = $scope.DTEnquiry.enTRAddress1;
                    $scope.postCode = $scope.DTEnquiry.enTRPostCode;
                    $scope.clientGroup = $scope.DTEnquiry.enTRClientGroup;
                    getInitialTravellerSearch("Traveller");
                }
             
                $scope.dtCsSelect = function (selectClientID, recordHighlightCss) {
                    console.log("selected Client ID : " + selectClientID);
                    console.log($scope.Clients);
                    console.log("selected Client recordHighlightCss : " + recordHighlightCss);
                    var isRecordHighlighted = (recordHighlightCss == 'highlight');
                    console.log("isRecordHighlighted : " + isRecordHighlighted);
                    var isFiveWinRecord = isRecordHighlighted ? true : false;
                    console.log("isFiveWinRecord : " + isFiveWinRecord);
                    if (isFiveWinRecord) {
                        var clientRef = $scope.Clients[selectClientID].clCode;
                        console.log($scope.Clients[selectClientID].clCode);
                        console.log("clientRef : " + clientRef);
                        var timeout = setTimeout(function () {
                            var promiseSeeIfThere = clientsFactory.getFivewinClientRecord(clientRef)
                                .then(function (fivewinClientRecord) {
                                    var disTitle = $scope.Clients[selectClientID].clTitle;
                                    var disFirstName = $scope.Clients[selectClientID].clFirstName;
                                    var disLastName = $scope.Clients[selectClientID].clLastName;
                                    if (disTitle == undefined) {
                                        disTitle = "";
                                    } if (disFirstName == undefined) {
                                        disFirstName = "";
                                    }
                                    if (disLastName == undefined) {
                                        disLastName = "";
                                    }
                                    var displayName = disTitle + " " + disLastName + "," + disFirstName;
                                    var clientsRecord = angular.fromJson(fivewinClientRecord).data;
                                    console.log("FiveWin Client record on clicking on select");
                                    console.log(clientsRecord);
                                    if (areaSearched === 'Clients') {
                                        $scope.displayClient = { "csClientCode": $scope.DTEnquiry.enCDClientCode };
                                        $scope.DTEnquiry.enCDClientName = displayName;
                                        $scope.DTEnquiry.enCDClientCode = clientsRecord.CD_Counter;
                                        $scope.DTEnquiry.enCDTitle = clientsRecord.CD_ContactTitle;
                                        $scope.DTEnquiry.enCDFirstName = clientsRecord.CD_ContactFirstName;
                                        $scope.DTEnquiry.enCDLastName = clientsRecord.CD_ContactSurname;
                                        $scope.DTEnquiry.enCDCompanyName = clientsRecord.CD_CompanyName;
                                        $scope.DTEnquiry.enCDJobTitle = clientsRecord.CD_ContactPosition;
                                        $scope.DTEnquiry.enCDAddress1 = clientsRecord.CD_Address1;
                                        $scope.DTEnquiry.enCDAddress2 = clientsRecord.CD_Address2;
                                        $scope.DTEnquiry.enCDPostCode = clientsRecord.CD_Postcode;
                                        $scope.DTEnquiry.enCDTelephone1 = clientsRecord.CD_Telephone1;
                                        $scope.DTEnquiry.enCDTelephone2 = clientsRecord.CD_Telephone2;
                                        $scope.DTEnquiry.enCDFaxNo = clientsRecord.CD_Facsimile;
                                        $scope.DTEnquiry.enCDEmailAddress = clientsRecord.CD_EMail;
                                        $scope.DTEnquiry.enCDCountryCode = clientsRecord.CD_CountryCode;
                                        $scope.DTEnquiry.enCDTimeZone = clientsRecord.GEN_Upd;
                                        $scope.DTEnquiry.enCDTASAccountOwner = clientsRecord.CD_AccountOwner;
                                        $scope.DTEnquiry.enCDClientGroup = clientsRecord.CD_ClientGroup;                                        
                                    }
                                })
                                .catch(function () {
                                    alert("Failed to get FiveWin Client Record");
                                });
                        }, 50);
                    }
                    else {
                        var clientRef = $scope.Clients[selectClientID].clCode;
                        console.log("clientRef : " + clientRef);
                        console.log("else condition");
                        var timeout = setTimeout(function () {
                            var promiseSeeIfThere = clientsFactory.getClientRecord(clientRef)
                                .then(function (clientRecord) {
                                    var disTitle = $scope.Clients[selectClientID].clTitle;
                                    var disFirstName = $scope.Clients[selectClientID].clFirstName;
                                    var disLastName = $scope.Clients[selectClientID].clLastName;
                                    if (disTitle == undefined) {
                                        disTitle = "";
                                    } if (disFirstName == undefined) {
                                        disFirstName = "";
                                    }
                                    if (disLastName == undefined) {
                                        disLastName = "";
                                    }
                                    var displayName = disTitle + " " + disLastName + "," + disFirstName;
                                    var clientsRecord = clientRecord.data;
                                    console.log("Client record on clicking on select");
                                    console.log(clientsRecord);
                                    if (areaSearched === 'Clients') {
                                        $scope.displayClient = { "csClientCode": $scope.DTEnquiry.enCDClientCode };
                                        $scope.DTEnquiry.enCDClientName = displayName;
                                        $scope.DTEnquiry.enCDClientCode = clientsRecord.clCode;
                                        $scope.DTEnquiry.enCDTitle = clientsRecord.clTitle;
                                        $scope.DTEnquiry.enCDFirstName = clientsRecord.clFirstName;
                                        $scope.DTEnquiry.enCDLastName = clientsRecord.clLastName;
                                        $scope.DTEnquiry.enCDCompanyName = clientsRecord.clCompanyName;
                                        $scope.DTEnquiry.enCDJobTitle = clientsRecord.clJobTitle;
                                        $scope.DTEnquiry.enCDAddress1 = clientsRecord.clAddress1;
                                        $scope.DTEnquiry.enCDAddress2 = clientsRecord.clAddress2;
                                        $scope.DTEnquiry.enCDAddress3 = clientsRecord.clAddress3;
                                        $scope.DTEnquiry.enCDAddress4 = clientsRecord.clAddress4;
                                        $scope.DTEnquiry.enCDAddress5 = clientsRecord.clAddress5;
                                        $scope.DTEnquiry.enCDPostCode = clientsRecord.clPostCode;
                                        $scope.DTEnquiry.enCDTelephone1 = clientsRecord.clTelephone1;
                                        $scope.DTEnquiry.enCDTelephone2 = clientsRecord.clTelephone2;
                                        $scope.DTEnquiry.enCDTelephone3 = clientsRecord.clTelephone3;
                                        $scope.DTEnquiry.enCDFaxNo = clientsRecord.clFaxNo;
                                        $scope.DTEnquiry.enCDEmailAddress = clientsRecord.clEmailAddress;
                                        $scope.DTEnquiry.enCDCountryCode = clientsRecord.clCountryCode;
                                        $scope.DTEnquiry.enCDSkype = clientsRecord.clSkype;
                                        $scope.DTEnquiry.enCDTimeZone = clientsRecord.clTimeZone;
                                        $scope.DTEnquiry.enCDTASAccountOwner = clientsRecord.clTASAccountOwner;
                                        $scope.DTEnquiry.enCDClientGroup = clientsRecord.clClientGroup;
                                    }

                                })
                                .catch(function () {
                                    alert("Failed to get Client Record");
                                });
                        }, 50);
                    }

                    $('#idDTClientChoice').modal('hide');
                }

                $scope.dtTsSelect = function (selectTravellerID, recordHighlightCss) {
                    var isRecordHighlighted = (recordHighlightCss == 'highlight');
                    console.log("isRecordHighlighted : " + isRecordHighlighted);
                    var TravellerRef = $scope.Travellers[selectTravellerID].trCode;
                    console.log("clientRef : " + TravellerRef);

                    var timeout = setTimeout(function () {
                        var promiseSeeIfThere = clientsFactory.getTravellerRecord(TravellerRef)
                            .then(function (travellerRecord) {
                                var disTitle = $scope.Travellers[selectTravellerID].trTitle;
                                var disFirstName = $scope.Travellers[selectTravellerID].trFirstName;
                                var disLastName = $scope.Travellers[selectTravellerID].trLastName;
                                if (disTitle == undefined) {
                                    disTitle = "";
                                } if (disFirstName == undefined) {
                                    disFirstName = "";
                                }
                                if (disLastName == undefined) {
                                    disLastName = "";
                                }
                                var displayName = disTitle + " " + disLastName + "," + disFirstName;
                                var travellerRecord = travellerRecord.data;
                                console.log("Client record on clicking on select");
                                console.log(travellerRecord);

                                if (areaSearched === 'Traveller') {
                                    $scope.displayTraveller = { "tsTravellerCode": $scope.DTEnquiry.enTRClientCode };
                                    $scope.DTEnquiry.enTRClientName = displayName;
                                    $scope.DTEnquiry.enTRClientCode = travellerRecord.trCode;
                                    $scope.DTEnquiry.enTRTitle = travellerRecord.trTitle;
                                    $scope.DTEnquiry.enTRFirstName = travellerRecord.trFirstName;
                                    $scope.DTEnquiry.enTRLastName = travellerRecord.trLastName;
                                    $scope.DTEnquiry.enTRClientGroup = travellerRecord.trClientGroup;
                                    $scope.DTEnquiry.enTRCompanyName = travellerRecord.trCompanyName;
                                    $scope.DTEnquiry.enTRJobTitle = travellerRecord.trJobTitle;
                                    $scope.DTEnquiry.enTRAddress1 = travellerRecord.trAddress1;
                                    $scope.DTEnquiry.enTRAddress2 = travellerRecord.trAddress2;
                                    $scope.DTEnquiry.enTRAddress3 = travellerRecord.trAddress3;
                                    $scope.DTEnquiry.enTRAddress4 = travellerRecord.trAddress4;
                                    $scope.DTEnquiry.enTRAddress5 = travellerRecord.trAddress5;
                                    $scope.DTEnquiry.enTRPostCode = travellerRecord.trPostCode;
                                    $scope.DTEnquiry.enTRTelephone1 = travellerRecord.trTelephone1;
                                    $scope.DTEnquiry.enTRTelephone2 = travellerRecord.trTelephone2;
                                    $scope.DTEnquiry.enTRTelephone3 = travellerRecord.trTelephone3;
                                    $scope.DTEnquiry.enTRFaxNo = travellerRecord.trFaxNo;
                                    $scope.DTEnquiry.enTREmailAddress = travellerRecord.trEmailAddress;
                                    $scope.DTEnquiry.enTRCountryCode = travellerRecord.trCountryCode;
                                    $scope.DTEnquiry.enTRSkype = travellerRecord.trSkype;
                                    $scope.DTEnquiry.enTRTimeZone = travellerRecord.trTimeZone;
                                    $scope.DTEnquiry.enTRTASAccountOwner = travellerRecord.trTASAccountOwner;
                                }

                            })
                        .catch(function () {
                            alert("Failed to get Client Record");
                        });

                    })

                    $('#idDTTravellerChoice').modal('hide');
                }

                if ($scope.fltUser === undefined) {
                    $scope.fltUser = "";
                }
                $scope.dtCSOptions = {
                    destroy: true,
                    autoWidth: false,
                    order: [[0, 'asc']],
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

                $scope.dtTSOptions = {
                    destroy: true,
                    autoWidth: false,
                    order: [[0, 'asc']],
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

                function getClientsFiltered() {
                    console.log("csClientGroup: " + $scope.displayClient.csClientGroup);
                    var clientFilterOnSelect = {
                        clFileImportCode: $("#idFltCsImportCode").val(),
                        clFirstName: $("#idFltCsFirstName").val(),
                        clLastName: $("#idFltCsLastName").val(),
                        clCompanyName: $("#idFltCsCompany").val(),
                        clClientGroupName: $scope.displayClient.csClientGroup,
                        clAddress: $("#idFltCsAddress").val(),
                        clPostCode: $("#idFltCsPostCode").val(),
                        clEmailAddress: $("#idFltCsEmail").val(),
                        clPreviousEnquiriesFrom: $("#idFltCsEnquiriesFrom").val(),
                        clPreviousEnquiriesTo: $("#idFltCsEnquiriesTo").val(),
                        clFiveStarCode: $("#idFltCs5StarCode").val(),
                    }
                    console.log("Client search object:");
                    console.log(clientFilterOnSelect);
                    clientsFactory.getClientsFiltered(clientFilterOnSelect)
                        .success(function (clients) {
                            $scope.Clients = angular.fromJson(clients);
                            console.log($scope.Clients);
                            $scope.$apply();
                        })
                    .catch(function () {
                        alert("Failed to get records");
                    });

                };
                function getTravellersFiltered() {
                    var travellerFilterOnSelect = {
                        trFileImportCode: $("#idFltTsImportCode").val(),
                        trFirstName: $("#idFltTsFirstName").val(),
                        trLastName: $("#idFltTsLastName").val(),
                        trCompanyName: $("#idFltTsCompany").val(),
                        trClientGroupCode: $scope.displayTraveller.tsTravellerGroup,
                        trAddress: $("#idFltTsAddress").val(),
                        trPostCode: $("#idFltTsPostCode").val(),
                        trEmailAddress: $("#idFltTsEmail").val(),
                        trFiveStarCode: $("#idFltTs5StarCode").val(),
                        trPreviousEnquiriesFrom: $("#idFltTsEnquiriesFrom").val(),
                        trPreviousEnquiriesTo: $("#idFltTsEnquiriesTo").val(),
                    }
                    console.log("Traveller search object:");
                    console.log(travellerFilterOnSelect);
                    clientsFactory.getTravellersFiltered(travellerFilterOnSelect)
                        .success(function (travellers) {
                            $scope.Travellers = angular.fromJson(travellers);
                            console.log($scope.Travellers);
                            $scope.$apply();
                        })
                    .catch(function () {
                        alert("Failed to get records");
                    });

                };

                $scope.DTcsSearch = function () {
                    getClientsFiltered();
                    $scope.dtCSOptions.reloadData();
                }
                $scope.DTtsSearch = function () {
                    getTravellersFiltered();
                    $scope.dtTSOptions.reloadData();
                }
                //add client
                $scope.Addclient = function () {
                    $('#idDTClientChoice').modal('hide');
                    $('#clientpopup').modal('show');
                }
                $scope.AddTraveller = function () {
                    $('#idDTTravellerChoice').modal('hide');
                    $('#travellerpopup').modal('show');
                }
                //numaric values only

                $(document).ready(function () {
                    $("#idFltclTelephone1").keypress(function (e) {
                        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                            $("#errmsg1").html("Digits Only").show().fadeOut("slow");
                            return false;
                        }
                    });
                });

                $(document).ready(function () {
                    $("#idFltclTelephone2").keypress(function (e) {
                        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                            $("#errmsg2").html("Digits Only").show().fadeOut("slow");
                            return false;
                        }
                    });
                });

                $(document).ready(function () {
                    $("#idFltclTelephone3").keypress(function (e) {
                        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                            $("#errmsg3").html("Digits Only").show().fadeOut("slow");
                            return false;
                        }
                    });
                });

                $(document).ready(function () {
                    $("#idFltclFaxNo").keypress(function (e) {
                        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                            $("#errmsg").html("Digits Only").show().fadeOut("slow");
                            return false;
                        }
                    });
                });


                $(document).ready(function () {
                    $("#idFlttrTelephone1").keypress(function (e) {
                        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                            return false;
                        }
                    });
                });

                $(document).ready(function () {
                    $("#idFlttrTelephone2").keypress(function (e) {
                        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                            return false;
                        }
                    });
                });

                $(document).ready(function () {
                    $("#idFlttrTelephone3").keypress(function (e) {
                        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                            return false;
                        }
                    });
                });

                $(document).ready(function () {
                    $("#idFlttrFaxNo").keypress(function (e) {
                        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                            return false;
                        }
                    });
                });



                //add new client
                $scope.AddRecord = function () {
                    var exportFlag = $("#idFltclExportFlag:checked").val();
                    if (exportFlag == undefined) {
                        exportFlag = false;
                    }
                    var newclientRecord =
                       {
                           clFileImportCode: $("#idFltclFileImportCode").val(),
                           clTitle: $("#idFltclTitle").val(),
                           clFirstName: $("#idFltclFirstName").val(),
                           clMiddleName: $("#idFltclMiddleName").val(),
                           clLastName: $("#idFltclLastName").val(),
                           clWholeName: $("#idFltclWholeName").val(),
                           clSalutation: $("#idFltclSalutation").val(),
                           clJobTitle: $("#idFltclJobTitle").val(),
                           clCompanyName: $("#idFltclCompanyName").val(),
                           clClientName: $("#idFltclClientGroup").val(),
                           clAddress1: $("#idFltclAddress1").val(),
                           clStatus: $("#idFltclStatus").val(),
                           clAddress2: $("#idFltclAddress2").val(),
                           clAddress3: $("#idFltclAddress3").val(),
                           clAddress4: $("#idFltclAddress4").val(),
                           clAddress5: $("#idFltclAddress5").val(),
                           clPostCode: $("#idFltclPostCode").val(),
                           clTelephone1: $("#idFltclTelephone1").val(),
                           clTelephone2: $("#idFltclTelephone2").val(),
                           clTelephone3: $("#idFltclTelephone3").val(),
                           clFaxNo: $("#idFltclFaxNo").val(),
                           clEmailAddress: $("#idFltclEmailAddress").val(),
                           clExportFlag: exportFlag
                       };
                    console.log(newclientRecord);
                    var firstName = $("#idFltclFirstName").val();
                    var lastName = $("#idFltclLastName").val();
                    var email = $("#idFltclEmailAddress").val();
                    var checkClientFound = clientsFactory.CheckWhetherClientFound(email)
                    .then(function (ret) {
                        $scope.message = ret.data;
                        var clientRecordFound = "";
                        clientRecordFound = $scope.message;
                        if (clientRecordFound == "false")
                            clientRecordFound = false;
                        else
                            clientRecordFound = true;
                        console.log(clientRecordFound);
                        if (clientRecordFound) {
                            $("#msg_exsistingClient").modal('show');
                        }
                        else {
                            var addClient = clientsFactory.createClient(newclientRecord)
                              .then(function (clientRecord) {
                                  $("#idFltclFileImportCode").val("");
                                  $("#idFltclTitle").val("");
                                  $("#idFltclFirstName").val("");
                                  $("#idFltclMiddleName").val("");
                                  $("#idFltclLastName").val("");
                                  $("#idFltclWholeName").val("");
                                  $("#idFltclSalutation").val("");
                                  $("#idFltclJobTitle").val("");
                                  $("#idFltclCompanyName").val("");
                                  $("#idFltclClientGroup").val("");
                                  $("#idFltclAddress1").val("");
                                  $("#idFltclStatus").val("");
                                  $("#idFltclAddress2").val("");
                                  $("#idFltclAddress3").val("");
                                  $("#idFltclAddress4").val("");
                                  $("#idFltclAddress5").val("");
                                  $("#idFltclPostCode").val("");
                                  $("#idFltclTelephone1").val("");
                                  $("#idFltclTelephone2").val("");
                                  $("#idFltclTelephone3").val("");
                                  $("#idFltclFaxNo").val("");
                                  $("#idFltclEmailAddress").val("");
                                  $("#idFltclExportFlag").prop('checked', false);
                                  $('#clientpopup').modal('hide');
                              });
                        }
                    });
                }

                $scope.AddTravellerRecord = function () {
                    var exportFlag = $("#idFlttrExportFlag:checked").val();
                    if (exportFlag == undefined) {
                        exportFlag = false;
                    }
                    var newclientRecord =
                       {
                           trFileImportCode: $("#idFlttrFileImportCode").val(),
                           trTitle: $("#idFlttrTitle").val(),
                           trFirstName: $("#idFlttrFirstName").val(),
                           trMiddleName: $("#idFlttrMiddleName").val(),
                           trLastName: $("#idFlttrLastName").val(),
                           trWholeName: $("#idFlttrWholeName").val(),
                           trSalutation: $("#idFlttrSalutation").val(),
                           trJobTitle: $("#idFlttrJobTitle").val(),
                           trCompanyName: $("#idFlttrCompanyName").val(),
                           trClientName: $("#idFlttrClientGroup").val(),
                           trAddress1: $("#idFlttrAddress1").val(),
                           trStatus: $("#idFlttrStatus").val(),
                           trAddress2: $("#idFlttrAddress2").val(),
                           trAddress3: $("#idFlttrAddress3").val(),
                           trAddress4: $("#idFlttrAddress4").val(),
                           trAddress5: $("#idFlttrAddress5").val(),
                           trPostCode: $("#idFlttrPostCode").val(),
                           trTelephone1: $("#idFlttrTelephone1").val(),
                           trTelephone2: $("#idFlttrTelephone2").val(),
                           trTelephone3: $("#idFlttrTelephone3").val(),
                           trFaxNo: $("#idFlttrFaxNo").val(),
                           trEmailAddress: $("#idFlttrEmailAddress").val(),
                           trExportFlag: exportFlag
                       };
                    console.log(newclientRecord);
                    var firstName = $("#idFlttrFirstName").val();
                    var lastName = $("#idFlttrLastName").val();
                    var email = $("#idFlttrEmailAddress").val();
                    var checkClientFound = clientsFactory.CheckWhetherTravellerFound(email)
                    .then(function (ret) {
                        $scope.message = ret.data;
                        var clientRecordFound = "";
                        clientRecordFound = $scope.message;
                        if (clientRecordFound == "false")
                            clientRecordFound = false;
                        else
                            clientRecordFound = true;
                        console.log(clientRecordFound);
                        if (clientRecordFound) {
                            $("#msg_exsistingTraveller").modal('show');
                        }
                        else {
                            var addClient = clientsFactory.createTraveller(newclientRecord)
                              .then(function (clientRecord) {
                                  $("#idFlttrFileImportCode").val("");
                                  $("#idFlttrTitle").val("");
                                  $("#idFlttrFirstName").val("");
                                  $("#idFlttrMiddleName").val("");
                                  $("#idFlttrLastName").val("");
                                  $("#idFlttrWholeName").val("");
                                  $("#idFlttrSalutation").val("");
                                  $("#idFlttrJobTitle").val("");
                                  $("#idFlttrCompanyName").val("");
                                  $("#idFlttrClientGroup").val("");
                                  $("#idFlttrAddress1").val("");
                                  $("#idFlttrStatus").val("");
                                  $("#idFlttrAddress2").val("");
                                  $("#idFlttrAddress3").val("");
                                  $("#idFlttrAddress4").val("");
                                  $("#idFlttrAddress5").val("");
                                  $("#idFlttrPostCode").val("");
                                  $("#idFlttrTelephone1").val("");
                                  $("#idFlttrTelephone2").val("");
                                  $("#idFlttrTelephone3").val("");
                                  $("#idFlttrFaxNo").val("");
                                  $("#idFlttrEmailAddress").val("");
                                  $("#idFlttrExportFlag").prop('checked', false);
                                  $('#travellerpopup').modal('hide');
                              });
                        }
                    });
                }

                $scope.csClientGroupOnSelect = function (clientGroupID) {
                    clientFilterOnSelect = $scope.displayClient.csClientGroup;
                }
                $scope.tsClientGroupOnSelect = function (travellerGroupID) {
                    travellerFilterOnSelect = $scope.displayTraveller.tsTravellerGroup;
                }

                $scope.DTcsClear = function () {
                    $("#idFltCsImportCode").val("");
                    $("#idFltCsFirstName").val("");
                    $("#idFltCsLastName").val("");
                    $("#idFltCsCompany").val("");
                    $("#idFltCsEmail").val("");
                    $("#idFltCs5StarCode").val("");
                    $("#idFltCsAddress").val("");
                    $("#idFltCsPostCode").val("");
                    $("#idFltCsEnquiriesFrom").val("");
                    $("#idFltCsEnquiriesTo").val("");
                    $scope.displayClient = { "csClientGroup": null, "csImportCode": "", "csFirstName": "", "csLastName": "", "csCompany": "", "csEmail": "", "cs5StarCode": "", "csPostCode": "", "csAddress": "" };
                    clientFilterOnSelect = null;
                    $scope.Clients = {};
                    $scope.$apply();
                }
                $rootScope.DTtsClear = function () {
                    $("#idFltTsImportCode").val("");
                    $("#idFltTsFirstName").val("");
                    $("#idFltTsLastName").val("");
                    $("#idFltTsCompany").val("");
                    $("#idFltTsEmail").val("");
                    $("#idFltTs5StarCode").val("");
                    $("#idFltTsAddress").val("");
                    $("#idFltTsPostCode").val("");
                    $("#idFltTsEnquiriesFrom").val("");
                    $("#idFltTsEnquiriesTo").val("");
                    $scope.displayTraveller = { "tsTravellerGroup": null, "tsImportCode": "", "tsFirstName": "", "tsLastName": "", "tsCompany": "", "tsEmail": "", "ts5StarCode": "", "tsPostCode": "", "tsAddress": "" };
                    travellerFilterOnSelect = null;
                    $scope.Travellers = {};
                    $scope.$apply();
                }

                $(document).ready(function () {
                    var $content, $modal, $apnData, $modalCon;
                    $content = $(".min");

                    $(".modalMinimize").on("click", function () {
                        $modalCon = $(this).closest(".mymodal").attr("id");
                        $apnData = $(this).closest(".mymodal");
                        $modal = "#" + $modalCon;
                        $(".modal-backdrop").addClass("display-none");
                        $($modal).toggleClass("min");
                        if ($($modal).hasClass("min")) {
                            $(".minmaxCon").append($apnData);
                            $(this).find("i").toggleClass('fa-minus').toggleClass('fa-square-o');
                            document.body.style.overflow = "visible";
                        }
                        else {
                            $(".modal fade mymodal").append($apnData);
                            $(this).find("i").toggleClass('fa-square-o').toggleClass('fa-minus');
                            $(".modal-backdrop").removeClass("display-none");
                            document.body.style.overflow = "hidden";
                        };
                    });

                    $("button[data-dismiss='modal']").click(function () {
                        $(this).closest(".mymodal").removeClass("min");
                        $(".container").removeClass($apnData);
                        $(this).next('.modalMinimize').find("i").removeClass('fa fa-windows').addClass('fa fa-minus');
                        document.body.style.overflow = "visible";
                    });
                });

                $scope.CloseClientSearchModal = function () {
                    document.body.style.overflow = "visible";
                    $(".modal-backdrop").addClass("display-none");                    
                }

                var getInitialClientSearch = function (Type) {

                    var email = $scope.DTEnquiry.enCDEmailAddress;
                    console.log("Email Address: " + $scope.DTEnquiry.enCDEmailAddress);
                    if (email == "" || email == null) {
                        email = "Do not return";
                    }

                    var csClientInitialParameters = {
                        clFileImportCode: null,
                        clFiveStarCode: null,
                        clFirstName: null,
                        clLastName: null,
                        clCompanyName: null,
                        clClientGroupName: null,
                        clAddress: null,
                        clPostCode: null,
                        clPreviousEnquiriesTo: null,
                        clPreviousEnquiriesFrom: null,
                        clEmailAddress: email
                    };
                    console.log(csClientInitialParameters);
                    clientsFactory.getClientsFiltered(csClientInitialParameters)
                            .success(function (clients) {
                                $scope.Clients = angular.fromJson(clients);
                                console.log("Get initial search");
                                console.log($scope.Clients);
                                $scope.$apply();
                                //$scope.dtCSOptions.reloadData();
                            })
                        .catch(function () {
                            alert("There are no matching Client records");
                        });
                }


                var getInitialTravellerSearch = function (Type) {

                    var email = $scope.DTEnquiry.enTREmailAddress;
                    console.log("Email Address: " + $scope.DTEnquiry.enTREmailAddress);
                    if (email == "" || email == null) {
                        email = "Do not return";
                    }

                    var csTravellerInitialParameters = {
                        trFileImportCode: null,
                        trFirstName: null,
                        trLastName: null,
                        trCompanyName: null,
                        trClientGroupCode: null,
                        trAddress: null,
                        trPostCode: null,
                        trPreviousEnquiriesTo: null,
                        trPreviousEnquiriesFrom: null,
                        trEmailAddress: email
                    };
                    console.log(csTravellerInitialParameters);
                    clientsFactory.getTravellersFiltered(csTravellerInitialParameters)
                            .success(function (traveller) {
                                $scope.Travellers = angular.fromJson(traveller);
                                console.log("Get initial search");
                                console.log($scope.Travellers);
                                $scope.$apply();
                                //$scope.dtCSOptions.reloadData();
                            })
                        .catch(function () {
                            alert("There are no matching Traveller records");
                        });
                }

            }]);
})();
