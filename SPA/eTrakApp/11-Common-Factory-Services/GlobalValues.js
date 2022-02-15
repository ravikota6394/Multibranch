(function () {
    'use strict';
    var eTrakApp = angular.module('eTrakApp');
    eTrakApp.controller('globalValues', [
        '$scope', '$rootScope', '$interval', '$state', 'R_UsersService', 'R_EnquiriesService', 'PV_MyEmailsService', 'PV_EnquiriesDashboardService', 'logger',
            function ($scope, $rootScope, $interval, $state, usersService, enquiryService, myEmailsFactory, enquiriesDashboardFactory, logger, pvEnquiriesDashboardController) {
                $rootScope.$state = $state;
                var cneEnqRef = 0;

                $rootScope.NewTasUrl = "https://taslive.apartmentservice.com/";
                $rootScope.NewTasAPIUrl = "https://taslivebetaapi.apartmentservice.com/";
                $rootScope.TasUrl = "https://v2.apartmentservice.com";
                $rootScope.googleAPIKey = "AIzaSyA2-egeI8NnmrE8f-obAYmpZ3VxkdjqI1I";
                
                var eTrakWebsiteUrl = $(location).attr("href").split("/#/");
                $rootScope.eTrakUrl = eTrakWebsiteUrl[0].replace("..", ".");
                $rootScope.Token = "4p4rtm3nt";
                console.log("$rootScope.eTrakUrl");
                console.log($rootScope.eTrakUrl);
                refreshQueries();

                $scope.createNewEnquiry = function () {
                    document.getElementById('idglbCurrentEnquiryRef').value = 0;
                    $state.go("detailsTab", { enqRef: 0 });
                }

                var userCode = document.getElementById("divUserCode").value;

                function getFooterSignatureTemplateOfUser() {
                    //var userCode = $rootScope.glbMainUserID;
                    usersService.getFooterSignatureTemplateOfUser(userCode)
                        .then(function (footerTemplate) {
                            $rootScope.footerTemplate = footerTemplate.data.usEmailFooter;
                            console.log("Footer Template");
                            console.log($rootScope.footerTemplate);
                        });
                }

                bookedEnquiriesCount();
                function bookedEnquiriesCount() {
                    var queryName = '$Book Now$';
                    enquiriesDashboardFactory.GetQueryDetailsByQueryName(queryName)
                    .then(function (queryDetails) {
                        $scope.queryDetails = queryDetails.data;
                        console.log($scope.queryDetails);
                        enquiriesDashboardFactory.BookedEnquiriesCount($scope.queryDetails)
                        .then(function (bookedEnquiriesCount) {
                            $rootScope.bookedEnquiriesCount = bookedEnquiriesCount.data;
                            console.log($scope.bookedEnquiriesCount);
                        });
                    });
                }

                checkWhetherUserIsReportTeam();
                function checkWhetherUserIsReportTeam() {
                    usersService.checkWhetherUserIsReportTeam(userCode)
                        .then(function (isReportTeam) {
                            $scope.isReportTeam = isReportTeam.data;
                            console.log("$scope.isReportTeam");
                            console.log($scope.isReportTeam);
                            if ($scope.isReportTeam == "True") {
                                $("#li-ReportQueries").show();
                            } else {
                                $("#li-ReportQueries").hide();
                            }
                        });
                }

                emailsInCount(userCode);
                function emailsInCount(userCode) {
                    var queryName = '$Action Required$';
                    enquiriesDashboardFactory.GetQueryDetailsByQueryName(queryName)
                    .then(function (queryDetails) {
                        $scope.queryDetails = queryDetails.data;
                        console.log($scope.queryDetails);
                        $scope.queryDetails.usFullName = userCode;
                        console.log($scope.queryDetails.usFullName);
                        enquiriesDashboardFactory.BookedEnquiriesCount($scope.queryDetails)
                        .then(function (emailsCount) {
                            $rootScope.EmailsInCount = emailsCount.data;
                            console.log($scope.EmailsInCount);
                        });
                    });
                }

                getDuplicatesStatus();

                function getDuplicatesStatus() {
                    enquiriesDashboardFactory.getDuplicatesStatus()
                    .success(function (status) {
                        console.log(status);
                        if (status == 'True') {
                            $("#chkDuplicatesStatus").prop("checked", true);
                        }
                        else {
                            $("#chkDuplicatesStatus").prop("checked", false);
                        }
                    })
                     .error(function (data) {
                         console.log(data);
                     });
                }

                $scope.SaveDuplicatesStatus = function () {
                    var duplicateStatus = $scope.duplicateStatus;
                    console.log(duplicateStatus);
                    if ($scope.duplicateStatus == undefined) {
                        duplicateStatus = false;
                    }
                    enquiriesDashboardFactory.SaveDuplicatesStatus(duplicateStatus)
                            .success(function (result) {
                                console.log(result);
                                getDuplicatesStatus();
                                $('#idDuplicateStatus').modal('hide');
                            })
                            .catch(function () {
                                $('#idDuplicateStatus').modal();
                                return;
                            });
                };

                $scope.SaveTickerText = function () {
                    var tickerTapeText = $scope.tickerTape;
                    console.log($scope.tickerTape);
                    enquiriesDashboardFactory.tickerText(tickerTapeText)
                            .success(function (result) {
                                console.log(result);
                                GetTickerText();
                                $('#idDashboardTickerTaps').modal('hide');
                                //$scope.tickerTape = null;
                            })
                            .catch(function () {
                                tickerTapsFailed();
                            });
                };

                GetTickerText();

                function GetTickerText() {
                    enquiriesDashboardFactory.getTickerText()
                    .success(function (result) {
                        console.log(result);
                        $scope.tickerText = result;
                        $("#id-tickerText").val(result);
                    })
                     .error(function (data) {
                         console.log(data);
                     });
                }

                function tickerTapsFailed() {
                    $('#idDashboardTickerTaps').modal();
                    return;
                };

                //var counter = 0;
                //$interval(function () {
                //    counter = counter + 1;
                //    if (counter === $rootScope.glbRefreshSeconds) {
                //        counter = 0;
                //        $scope.changeUser = $("#idgblBuddyUser").val();
                //        console.log($scope.changeUser);
                //        BookedEnquiriesCount();
                //        emailsInCount($scope.changeUser);
                //    }
                //}, 1000);

                $scope.dashboardAESearch = function () {

                    cneEnqRef = $scope.dashboardAECode;
                    var timeout = setTimeout(function () {
                        var promiseGet = enquiryService.getEnquiry(cneEnqRef)
                            .success(function () {
                                cneQuerySucceeded();
                            })
                            .catch(function () {
                                $scope.globalEnquirySearch = "";
                                cneQueryFailed();

                            });

                    }, 50);
                };

                getVUsers();
                function getVUsers() {
                    usersService.getUsersForDropdown()
                        .success(function (users) {
                            $rootScope.Users = angular.fromJson(users);
                        });
                }

                function cneQuerySucceeded() {
                    $('#idDashboardAmendEnquiryChoice').modal('hide');
                    document.getElementById('idglbCurrentEnquiryRef').value = cneEnqRef;
                    enquiryService.createTrackingRecordForAmendEnquiry(cneEnqRef, userCode)
                    $state.go("detailsTab", { enqRef: cneEnqRef });
                };

                function cneQueryFailed() {
                    $('#idDashboardWrongEnquiryCodeWarning').modal();
                    return;
                };

                $scope.searchedEnquiry = function () {

                    cneEnqRef = document.getElementById('idnav-search-input').value;
                    var timeout = setTimeout(function () {
                        var promiseGet = enquiryService.getEnquiry(cneEnqRef)
                            .success(function () {
                                cneQuerySucceeded();
                            })
                            .catch(function () {
                                cneQueryFailed();
                            });

                    }, 50);
                };

                //--------------------------------------------------------------

                function getGlobalBuddy(usBuddy) {
                    var timeout = setTimeout(function () {
                        var promiseGet = usersService.getUser(usBuddy)
                            .success(getBuddyQuerySucceeded);
                    }, 50);
                    return "";

                    function getBuddyQuerySucceeded(ret) {

                        if (ret.data != undefined) {
                            $("#idglbUserBuddy").val(ret.data[0].usBuddy);
                            console.log('Applying Buddy ' + ret.data[0].usBuddy);
                            $scope.glbDisplayBuddy = ret.data[0].usBuddy;
                            $("#idglbDisplayBuddy").val(ret.data[0].usBuddy);
                        }
                    }
                }

                getFooterSignatureTemplateOfUser();

                $scope.$watch('glbMainUserID',
                    function (newValue, oldValue) {
                        if (newValue !== oldValue) {
                            getGlobalBuddy(newValue);
                        }
                    });

                $scope.$watch('glbDisplayBuddy',
                    function (newValue, oldValue) {
                        if (newValue !== oldValue) {
                            $("#idglbUserBuddy").val(newValue);
                            $scope.saveGlobalBuddy();
                            getMyEmails();

                        }
                    });

                $scope.saveGlobalBuddy = function () {
                    var globalBuddy = $('#idglbUserBuddy').val();
                    var globalMainUser = $('#idglbMainUserID').val();
                    // First the current user is removed from all other buddies

                    var timeout = setTimeout(function () {
                        var promiseGet = usersService.clearBuddy(globalMainUser);
                    }, 50);
                    console.log('1. Cleared ' + $scope.glbMainUserID + ' as a Buddy ');

                    // For safety, the user record is initially refound and then
                    // the changed Buddy is written away with the rest of the record
                    //--------------------------------------------------------------
                    var timeout = setTimeout(function () {
                        var promiseGet = usersService.getUser(globalMainUser)
                            .success(saveGetBuddyQuerySucceeded);
                    }, 50);

                    function saveGetBuddyQuerySucceeded(ret) {

                        var newBuddy = $('#idglbDisplayBuddy').val();

                        var userRecord = {};
                        userRecord = ret;
                        userRecord.data[0].usBuddy = newBuddy;
                        var globalUserID = userRecord.data[0].usID;
                        var timeout = setTimeout(function () {
                            var promiseSave = usersService.saveUserChanges(globalUserID, userRecord)
                                .success(saveUserChangesQuerySucceeded);
                        }, 50);
                    }

                    function saveUserChangesQuerySucceeded(ret) {
                        console.log('2. Saved user ' + $scope.glbMainUserID);
                        // Now do the same for the other Buddy
                        //------------------------------------
                        var newBuddy = $('#idglbDisplayBuddy').val();

                        var timeout = setTimeout(function () {
                            var promiseGet = usersService.getUser(newBuddy)
                                .success(saveGetOtherBuddyQuerySucceeded);
                        }, 50);
                    }

                    function saveGetOtherBuddyQuerySucceeded(ret) {
                        var globalUser = $('#idglbMainUserID').val();

                        console.log('2. Got Other user ' + $scope.glbDisplayBuddy);
                        var userRecord = {};
                        userRecord = ret;
                        userRecord.data[0].usBuddy = globalUser;
                        var buddyID = userRecord.data[0].usID;

                        var timeout = setTimeout(function () {
                            var promiseSave = usersService.saveUserChanges(buddyID, userRecord)
                                .success(saveBuddyUserChangesQuerySucceeded);

                        }, 50);
                    }

                    function saveBuddyUserChangesQuerySucceeded(ret) {
                        var globalUser = $('#idglbMainUserID').val();
                        var newBuddy = $('#idglbDisplayBuddy').val();
                        console.log('3. Saved ' + globalUser + ' in Buddy ' + newBuddy + ' Record');
                    }
                }

                function getMyEmails() {
                    var usBuddy = $('#idglbUserBuddy').val();
                    var usUser = $('#idglbMainUserID').val();
                    if (usBuddy === undefined) usBuddy = "";
                    if (usUser === undefined) usUser = "";
                    myEmailsFactory.getFilter(usUser, usBuddy)
                        .success(
                        function (myEmails) {
                            $rootScope.myEmails = myEmails;
                        });
                }

                function refreshQueries() {
                    getIndividualQueries($rootScope.glbMainUserID);
                    getGlobalQueries();
                    getExternalReportQueries();
                    getReservationsReportQueries();
                    getSalesReportQueries();
                    getSupplyReportQueries();
                    getReportingQueries();
                }

                function getIndividualQueries() {
                    enquiriesDashboardFactory.GetIndividualQueries($rootScope.glbMainUserID)
                        .success(function (queries) {
                            console.log('Get individual query success');
                            $rootScope.IndividualQueryNames = queries;
                            console.log($rootScope.IndividualQueryNames);
                        });
                }

                function getGlobalQueries() {
                    enquiriesDashboardFactory.GetGlobalQueries()
                        .success(function (globalQueries) {
                            console.log('Get Global Query success');
                            $rootScope.GlobalQueryNames = globalQueries;
                            console.log($rootScope.GlobalQueryNames);
                        });
                }

                function getExternalReportQueries() {
                    enquiriesDashboardFactory.GetExternalReportQueries()
                        .success(function (reportQueries) {
                            console.log('Get Report Query success');
                            $rootScope.ExternalReportQueryNames = reportQueries;
                            console.log($rootScope.ExternalReportQueryNames);
                        });
                }

                function getReservationsReportQueries() {
                    enquiriesDashboardFactory.getReservationsReportQueries()
                        .success(function (reportQueries) {
                            console.log('Get Report Query success');
                            $rootScope.ReservationsReportQueryNames = reportQueries;
                            console.log($rootScope.ReservationsReportQueryNames);
                        });
                }

                function getSalesReportQueries() {
                    enquiriesDashboardFactory.getSalesReportQueries()
                        .success(function (reportQueries) {
                            console.log('Get Report Query success');
                            $rootScope.SalesReportQueryNames = reportQueries;
                            console.log($rootScope.SalesReportQueryNames);
                        });
                }

                function getSupplyReportQueries() {
                    enquiriesDashboardFactory.getSupplyReportQueries()
                        .success(function (reportQueries) {
                            console.log('Get Report Query success');
                            $rootScope.SupplyReportQueryNames = reportQueries;
                            console.log($rootScope.SupplyReportQueryNames);
                        });
                }

                function getReportingQueries() {
                    enquiriesDashboardFactory.getReportingQueries()
                        .success(function (reportQueries) {
                            console.log('Get Report Query success');
                            $rootScope.reportingQueryNames = reportQueries;
                            console.log($rootScope.reportingQueryNames);
                        });
                }
            }
    ]);
})();