function MakeEmptyStringWhenNull(value) {
    if (value == null) {
        value = "";
    }
    else if (value == "undefined") {
        value = "";
    }
    else if (value == undefined) {
        value = "";
    }
    else if (value == "null") {
        value = "";
    }
    else {
        value = value;
    }
    return value;
}
(function () {
    'use strict';
    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                views: {
                    'enquiriesTab': {
                        templateUrl: '/Partials/Page1AdvancedSearchEnquiriesDashboard',
                        controller: 'breadcrumbsEnquiriesDashboardTab'
                    }
                }
            });

        $stateProvider
        //Details Tab
            .state('detailsTab', {
                url: '/Details-Tab/:enqRef',
                views: {
                    'enquiriesTab': {
                        templateUrl: 'Partials/Page1DetailsTab',
                        controller: 'P_DetailsTab'
                    }
                },
                onEnter: ['$stateParams', '$rootScope', 'R_EnquiriesService', 'R_UsersService', function ($stateParams, $rootScope, enquiryDataservice, usersService) {
                    $rootScope.loader = true;
                    var user = document.getElementById("divUserCode").value;
                    var enqRef = $stateParams.enqRef;
                    console.log($stateParams.enqRef);
                    
                    usersService.viewsBasedOnRoles(enqRef).success(function (record) {
                        console.log("Record in Roles: " + record);
                        if (record == null || record === "null") {
                            window.location.href = $rootScope.eTrakUrl + '/Account/Login?ReturnUrl=%2f#/';
                        }
                        else {
                            $rootScope.record = angular.fromJson(record);
                        }
                    });

                    enquiryDataservice.TrackingVisitingTabs(user, enqRef, 'Details Tab View')
                    .then(function () {
                    });
                }]
            })

            //Search Tab
            .state('detailsTab.search', {
                url: '/Search',
                views: {
                    'currentEnquiry': {
                        templateUrl: '/Partials/PV_CurrentEnquiry'
                    },
                    'enquiriesTabTabs': {
                        templateUrl: '/Partials/Page1SearchTab',
                        controller: 'P_SearchTab'
                    }
                },
                onEnter: ['$stateParams', '$rootScope', '$state', 'R_EnquiriesService', 'R_UsersService',
                    function ($stateParams, $rootScope, $state, enquiryDataservice, usersService) {
                        console.log($rootScope.DTEnquiry);

                        var user = document.getElementById("divUserCode").value;
                        var enqRef = $stateParams.enqRef;
                        usersService.viewsBasedOnRoles(enqRef).success(function (record) {
                            console.log("Record in Roles: " + record);
                            if (record == null || record === "null") {
                                window.location.href = $rootScope.eTrakUrl + '/Account/Login?ReturnUrl=%2f#/';
                            }
                            else {
                                $rootScope.record = angular.fromJson(record);
                            }
                        });
                        if ($rootScope.DTEnquiry != undefined) {

                            SaveEnquiry($rootScope.DTEnquiry);

                            //Check Enquiry
                            function SaveEnquiry(enquiry) {
                                console.log(enquiry);
                                if (enquiry.enCDCompanyName == null || enquiry.enCDCompanyName == undefined || enquiry.enCDCompanyName == "") {
                                    document.getElementById("id_enCDCompanyName").style.display = 'block';
                                    document.getElementById("id_enCDCompanyName").textContent = "Please enter the company name";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enCDClientGroup == null || enquiry.enCDClientGroup == undefined || enquiry.enCDClientGroup == "") {
                                    document.getElementById("id_enCDClientGroup").style.display = 'block';
                                    document.getElementById("id_enCDClientGroup").textContent = "Please select the group";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if ((enquiry.enCDFirstName == null || enquiry.enCDFirstName == undefined) && (enquiry.enCDLastName == null || enquiry.enCDLastName == undefined)) {
                                    document.getElementById("id_ClientFirstName").style.display = 'block';
                                    document.getElementById("id_ClientFirstName").textContent = "Please Specify the name";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enCDEmailAddress == null || enquiry.enCDEmailAddress == undefined || enquiry.enCDEmailAddress == "") {
                                    document.getElementById("id_ClientEmail").style.display = 'block';
                                    document.getElementById("id_ClientEmail").textContent = "Please enter the email";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enTRCompanyName == null || enquiry.enTRCompanyName == undefined || enquiry.enTRCompanyName == "") {
                                    document.getElementById("id_enTRCompanyName").style.display = 'block';
                                    document.getElementById("id_enTRCompanyName").textContent = "Please enter the company name";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enTRClientGroup == null || enquiry.enTRClientGroup == undefined || enquiry.enTRClientGroup == "") {
                                    document.getElementById("id_enTRClientGroup").style.display = 'block';
                                    document.getElementById("id_enTRClientGroup").textContent = "Please enter the group name";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if ((enquiry.enTRFirstName == null || enquiry.enTRFirstName == undefined || enquiry.enTRFirstName == "")) {
                                    document.getElementById("id_TravellerFirstName").style.display = 'block';
                                    document.getElementById("id_TravellerFirstName").textContent = "Please Specify the first name";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if ((enquiry.enTRLastName == null || enquiry.enTRLastName == undefined || enquiry.enTRLastName == "")) {
                                    document.getElementById("id_TravellerLastName").style.display = 'block';
                                    document.getElementById("id_TravellerLastName").textContent = "Please Specify the last name";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enTREmailAddress == null || enquiry.enTREmailAddress == undefined || enquiry.enTREmailAddress == "") {
                                    document.getElementById("id_TravellerEmail").style.display = 'block';
                                    document.getElementById("id_TravellerEmail").textContent = "Please enter the email";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enEDSourceCode == "" || enquiry.enEDSourceCode == null || enquiry.enEDSourceCode == undefined) {
                                    document.getElementById("idSourceCode").style.display = 'block';
                                    document.getElementById("idSourceCode").textContent = "Please select a source";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enEDUserAssigned == "" || enquiry.enEDUserAssigned == null || enquiry.enEDUserAssigned == undefined) {
                                    document.getElementById("id_UserAssigned").style.display = 'block';
                                    document.getElementById("id_UserAssigned").textContent = "Please assign the user";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if ((enquiry.enEDBudgetAmount == null || enquiry.enEDBudgetAmount == undefined || enquiry.enEDBudgetAmount == "") && enquiry.enEDBudgetAmount != 0) {
                                    document.getElementById("id_enEDBudgetAmount").style.display = 'block';
                                    document.getElementById("id_enEDBudgetAmount").textContent = "Please enter the Amount";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enEDBudgetCurrency == "" || enquiry.enEDBudgetCurrency == null || enquiry.enEDBudgetCurrency == undefined) {
                                    document.getElementById("id_BudgetCurrency").style.display = 'block';
                                    document.getElementById("id_BudgetCurrency").textContent = "Please enter currency";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enEDCorrectedCity == null || enquiry.enEDCorrectedCity == undefined || enquiry.enEDCorrectedCity == "") {
                                    document.getElementById("id_enEDCorrectedCity").style.display = 'block';
                                    document.getElementById("id_enEDCorrectedCity").textContent = "Please enter the city";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if ((enquiry.enEDTotalPassengers == null || enquiry.enEDTotalPassengers == undefined || enquiry.enEDTotalPassengers == "") && (MakeEmptyStringWhenNull($("#idDTenEDTotalPassengers").val()) == "")) {
                                    document.getElementById("id_enEDTotalPassengers").style.display = 'block';
                                    document.getElementById("id_enEDTotalPassengers").textContent = "Please enter total number of guests";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enEDSourceCode != null && enquiry.enEDSourceCode == 994) {
                                    if (enquiry.enCDCountryCode == 0 || enquiry.enCDCountryCode == null) {
                                        document.getElementById("id_ClientCountry").style.display = 'block';
                                        document.getElementById("id_ClientCountry").textContent = "Please select the Country";
                                        $state.go('detailsTab', { enqRef: enquiry.enCode });
                                        $("#myModal").modal("show");
                                    }
                                    else if (MakeEmptyStringWhenNull(enquiry.enCDAddress5.trim()) == "") {
                                        document.getElementById("id_ClientAddress").style.display = 'block';
                                        document.getElementById("id_ClientAddress").textContent = "Please select the Address";
                                        $state.go('detailsTab', { enqRef: enquiry.enCode });
                                        $("#myModal").modal("show");
                                    }
                                    else if (MakeEmptyStringWhenNull(enquiry.enEmployeeID.trim() == "")) {
                                        document.getElementById("id_EmployeeId").style.display = 'block';
                                        document.getElementById("id_EmployeeId").textContent = "Please enter the EmployeeId";
                                        $state.go('detailsTab', { enqRef: enquiry.enCode });
                                        $("#myModal").modal("show");
                                    }
                                    else if (MakeEmptyStringWhenNull(enquiry.enTRAddress5.trim()) == "") {
                                        document.getElementById("id_TravellerAddress").style.display = 'block';
                                        document.getElementById("id_TravellerAddress").textContent = "Please select the Address";
                                        $state.go('detailsTab', { enqRef: enquiry.enCode });
                                        $("#myModal").modal("show");
                                    }
                                    else if (enquiry.enTRCountryCode == 0 || enquiry.enTRCountryCode == null) {
                                        document.getElementById("id_Country").style.display = 'block';
                                        document.getElementById("id_Country").textContent = "Please select the Country";
                                        $state.go('detailsTab', { enqRef: enquiry.enCode });
                                        $("#myModal").modal("show");
                                    }
                                    else if (MakeEmptyStringWhenNull(enquiry.enTRFaxNo.trim()) == "") {
                                        document.getElementById("id_TravellerFax").style.display = 'block';
                                        document.getElementById("id_TravellerFax").textContent = "Please enter the Fax";
                                        $state.go('detailsTab', { enqRef: enquiry.enCode });
                                        $("#myModal").modal("show");
                                    }
                                    else if (MakeEmptyStringWhenNull(enquiry.enEDOrderRef.trim()) == "") {
                                        document.getElementById("id_EDOOrderRef").style.display = 'block';
                                        document.getElementById("id_EDOOrderRef").textContent = "Please enter the Order reference";
                                        $state.go('detailsTab', { enqRef: enquiry.enCode });
                                        $("#myModal").modal("show");
                                    }
                                    else if (MakeEmptyStringWhenNull(enquiry.enEDTripType.trim()) == "") {
                                        document.getElementById("id_TripType").style.display = 'block';
                                        document.getElementById("id_TripType").textContent = "Please select the Trip Type";
                                        $state.go('detailsTab', { enqRef: enquiry.enCode });
                                        $("#myModal").modal("show");
                                    }
                                }
                                else {
                                    //saveClient(enquiry);
                                }
                                $("#idDTenEDBudgetCurrency").click(function () {
                                    document.getElementById("id_enTRClientGroup").style.display = 'none';
                                });
                                $("#idDTenEDSourceCode").click(function () {
                                    document.getElementById("idSourceCode").style.display = 'none';
                                });
                                $("#idDTenCDClientGroup").click(function () {
                                    document.getElementById("id_enCDClientGroup").style.display = 'none';
                                });
                                $("#idDTenEDUserAssigned").click(function () {
                                    document.getElementById("id_UserAssigned").style.display = 'none';
                                });
                                $("#idDTenTRClientGroup").click(function () {
                                    document.getElementById("id_BudgetCurrency").style.display = 'none';
                                });
                                $("#idDTenEDTotalPassengers").click(function () {
                                    document.getElementById("id_enEDTotalPassengers").style.display = 'none';
                                });
                                $("#idDTenECFiveStarRef").click(function () {
                                    document.getElementById("id_enECFiveStarRef").style.display = 'none';
                                });
                                $("#idDTenTotalPassengers").click(function () {
                                    document.getElementById("id_enEDTotalPassengers").style.display = 'none';
                                });

                            }

                            console.log($stateParams.enqRef);
                            enquiryDataservice.TrackingVisitingTabs(user, enqRef, "Search Tab View");
                        }
                        //else {
                        //    $state.go('detailsTab', { enqRef: $stateParams.enqRef });
                        //}
                    }]
            })

            //Shortlists Tab
            .state('detailsTab.shortlist', {
                parent: 'detailsTab',
                url: '/Shortlist',
                views: {
                    'currentEnquiry': {
                        templateUrl: '/Partials/PV_CurrentEnquiry'
                    },
                    'enquiriesTabTabs': {
                        templateUrl: 'Partials/Page1ShortlistTab',
                        controller: 'P_ShortlistTab'
                    }
                },
                onEnter: ['$stateParams', '$rootScope', '$state', 'R_EnquiriesService', 'R_UsersService',
                    function ($stateParams, $rootScope, $state, enquiryDataservice, usersService) {

                        var enqRef = $stateParams.enqRef;
                        usersService.viewsBasedOnRoles(enqRef).success(function (record) {
                            console.log("Record in Roles: " + record);
                            if (record == null || record === "null") {
                                window.location.href = $rootScope.eTrakUrl + '/Account/Login?ReturnUrl=%2f#/';
                            }
                            else {
                                $rootScope.record = angular.fromJson(record);
                            }
                        });

                        console.log($rootScope.DTEnquiry);
                        if ($rootScope.DTEnquiry != undefined) {

                            SaveEnquiry($rootScope.DTEnquiry);

                            //Check Enquiry
                            function SaveEnquiry(enquiry) {
                                console.log(enquiry);
                                if (enquiry.enCDCompanyName == null || enquiry.enCDCompanyName == undefined || enquiry.enCDCompanyName == "") {
                                    document.getElementById("id_enCDCompanyName").style.display = 'block';
                                    document.getElementById("id_enCDCompanyName").textContent = "Please enter the company name";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enCDClientGroup == null || enquiry.enCDClientGroup == undefined || enquiry.enCDClientGroup == "") {
                                    document.getElementById("id_enCDClientGroup").style.display = 'block';
                                    document.getElementById("id_enCDClientGroup").textContent = "Please select the group";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if ((enquiry.enCDFirstName == null || enquiry.enCDFirstName == undefined) && (enquiry.enCDLastName == null || enquiry.enCDLastName == undefined)) {
                                    document.getElementById("id_ClientFirstName").style.display = 'block';
                                    document.getElementById("id_ClientFirstName").textContent = "Please Specify the name";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enCDEmailAddress == null || enquiry.enCDEmailAddress == undefined || enquiry.enCDEmailAddress == "") {
                                    document.getElementById("id_ClientEmail").style.display = 'block';
                                    document.getElementById("id_ClientEmail").textContent = "Please enter the email";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enTRCompanyName == null || enquiry.enTRCompanyName == undefined || enquiry.enTRCompanyName == "") {
                                    document.getElementById("id_enTRCompanyName").style.display = 'block';
                                    document.getElementById("id_enTRCompanyName").textContent = "Please enter the company name";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enTRClientGroup == null || enquiry.enTRClientGroup == undefined || enquiry.enTRClientGroup == "") {
                                    document.getElementById("id_enTRClientGroup").style.display = 'block';
                                    document.getElementById("id_enTRClientGroup").textContent = "Please enter the group name";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if ((enquiry.enTRFirstName == null || enquiry.enTRFirstName == undefined || enquiry.enTRFirstName == "")) {
                                    document.getElementById("id_TravellerFirstName").style.display = 'block';
                                    document.getElementById("id_TravellerFirstName").textContent = "Please Specify the first name";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if ((enquiry.enTRLastName == null || enquiry.enTRLastName == undefined || enquiry.enTRLastName == "")) {
                                    document.getElementById("id_TravellerLastName").style.display = 'block';
                                    document.getElementById("id_TravellerLastName").textContent = "Please Specify the last name";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enTREmailAddress == null || enquiry.enTREmailAddress == undefined || enquiry.enTREmailAddress == "") {
                                    document.getElementById("id_TravellerEmail").style.display = 'block';
                                    document.getElementById("id_TravellerEmail").textContent = "Please enter the email";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enEDSourceCode == "" || enquiry.enEDSourceCode == null || enquiry.enEDSourceCode == undefined) {
                                    document.getElementById("idSourceCode").style.display = 'block';
                                    document.getElementById("idSourceCode").textContent = "Please select a source";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enEDUserAssigned == "" || enquiry.enEDUserAssigned == null || enquiry.enEDUserAssigned == undefined) {
                                    document.getElementById("id_UserAssigned").style.display = 'block';
                                    document.getElementById("id_UserAssigned").textContent = "Please assign the user";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if ((enquiry.enEDBudgetAmount == null || enquiry.enEDBudgetAmount == undefined || enquiry.enEDBudgetAmount == "") && enquiry.enEDBudgetAmount != 0) {
                                    document.getElementById("id_enEDBudgetAmount").style.display = 'block';
                                    document.getElementById("id_enEDBudgetAmount").textContent = "Please enter the Amount";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enEDBudgetCurrency == "" || enquiry.enEDBudgetCurrency == null || enquiry.enEDBudgetCurrency == undefined) {
                                    document.getElementById("id_BudgetCurrency").style.display = 'block';
                                    document.getElementById("id_BudgetCurrency").textContent = "Please enter currency";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enEDCorrectedCity == null || enquiry.enEDCorrectedCity == undefined || enquiry.enEDCorrectedCity == "") {
                                    document.getElementById("id_enEDCorrectedCity").style.display = 'block';
                                    document.getElementById("id_enEDCorrectedCity").textContent = "Please enter the city";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if ((enquiry.enEDTotalPassengers == null || enquiry.enEDTotalPassengers == undefined || enquiry.enEDTotalPassengers == "") && (MakeEmptyStringWhenNull($("#idDTenEDTotalPassengers").val()) == "")) {
                                    document.getElementById("id_enEDTotalPassengers").style.display = 'block';
                                    document.getElementById("id_enEDTotalPassengers").textContent = "Please enter total number of guests";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else {
                                    //saveClient(enquiry);
                                }
                                $("#idDTenTRClientGroup").click(function () {
                                    document.getElementById("id_enTRClientGroup").style.display = 'none';
                                });
                                $("#idDTenEDSourceCode").click(function () {
                                    document.getElementById("idSourceCode").style.display = 'none';
                                });
                                $("#idDTenCDClientGroup").click(function () {
                                    document.getElementById("id_enCDClientGroup").style.display = 'none';
                                });
                                $("#idDTenEDUserAssigned").click(function () {
                                    document.getElementById("id_UserAssigned").style.display = 'none';
                                });
                                $("#idDTenEDBudgetCurrency").click(function () {
                                    document.getElementById("id_BudgetCurrency").style.display = 'none';
                                });
                                $("#idDTenEDTotalPassengers").click(function () {
                                    document.getElementById("id_enEDTotalPassengers").style.display = 'none';
                                });
                                $("#idDTenECFiveStarRef").click(function () {
                                    document.getElementById("id_enECFiveStarRef").style.display = 'none';
                                });
                                $("#idDTenTotalPassengers").click(function () {
                                    document.getElementById("id_enEDTotalPassengers").style.display = 'none';
                                });

                                var user = document.getElementById("divUserCode").value;
                                var enqRef = $stateParams.enqRef;
                                console.log($stateParams.enqRef);
                                enquiryDataservice.TrackingVisitingTabs(user, enqRef, "Shortlist Tab View");
                            }
                        }
                        //else {
                        //    $state.go('detailsTab', { enqRef: $stateParams.enqRef });
                        //}
                    }]
            })

            //Emails Tab 
            .state('detailsTab.emails', {
                url: '/Emails/:emailAddress',
                views: {
                    'currentEnquiry': {
                        templateUrl: '/Partials/PV_CurrentEnquiry'
                    },
                    'enquiriesTabTabs': {
                        templateUrl: '/Partials/Page1EmailsTab',
                        controller: 'P_EmailsTab'
                    }
                },
                onEnter: ['$stateParams', '$rootScope', '$state', 'R_EnquiriesService', 'R_UsersService',
                    function ($stateParams, $rootScope, $state, enquiryDataservice, usersService) {

                        var user = document.getElementById("divUserCode").value;
                        var enqRef = $stateParams.enqRef;
                        usersService.viewsBasedOnRoles(enqRef).success(function (record) {
                            console.log("Record in Roles: " + record);
                            if (record == null || record === "null") {
                                window.location.href = $rootScope.eTrakUrl + '/Account/Login?ReturnUrl=%2f#/';
                            }
                            else {
                                $rootScope.record = angular.fromJson(record);
                            }
                        });

                        console.log($rootScope.DTEnquiry);
                        if ($rootScope.DTEnquiry != undefined) {

                            SaveEnquiry($rootScope.DTEnquiry);

                            //Check Enquiry
                            function SaveEnquiry(enquiry) {
                                console.log(enquiry);
                                if (enquiry.enCDCompanyName == null || enquiry.enCDCompanyName == undefined || enquiry.enCDCompanyName == "") {
                                    document.getElementById("id_enCDCompanyName").style.display = 'block';
                                    document.getElementById("id_enCDCompanyName").textContent = "Please enter the company name";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enCDClientGroup == null || enquiry.enCDClientGroup == undefined || enquiry.enCDClientGroup == "") {
                                    document.getElementById("id_enCDClientGroup").style.display = 'block';
                                    document.getElementById("id_enCDClientGroup").textContent = "Please select the group";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if ((enquiry.enCDFirstName == null || enquiry.enCDFirstName == undefined) && (enquiry.enCDLastName == null || enquiry.enCDLastName == undefined)) {
                                    document.getElementById("id_ClientFirstName").style.display = 'block';
                                    document.getElementById("id_ClientFirstName").textContent = "Please Specify the name";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enCDEmailAddress == null || enquiry.enCDEmailAddress == undefined || enquiry.enCDEmailAddress == "") {
                                    document.getElementById("id_ClientEmail").style.display = 'block';
                                    document.getElementById("id_ClientEmail").textContent = "Please enter the email";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enTRCompanyName == null || enquiry.enTRCompanyName == undefined || enquiry.enTRCompanyName == "") {
                                    document.getElementById("id_enTRCompanyName").style.display = 'block';
                                    document.getElementById("id_enTRCompanyName").textContent = "Please enter the company name";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enTRClientGroup == null || enquiry.enTRClientGroup == undefined || enquiry.enTRClientGroup == "") {
                                    document.getElementById("id_enTRClientGroup").style.display = 'block';
                                    document.getElementById("id_enTRClientGroup").textContent = "Please enter the group name";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if ((enquiry.enTRFirstName == null || enquiry.enTRFirstName == undefined || enquiry.enTRFirstName == "")) {
                                    document.getElementById("id_TravellerFirstName").style.display = 'block';
                                    document.getElementById("id_TravellerFirstName").textContent = "Please Specify the first name";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if ((enquiry.enTRLastName == null || enquiry.enTRLastName == undefined || enquiry.enTRLastName == "")) {
                                    document.getElementById("id_TravellerLastName").style.display = 'block';
                                    document.getElementById("id_TravellerLastName").textContent = "Please Specify the last name";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enTREmailAddress == null || enquiry.enTREmailAddress == undefined || enquiry.enTREmailAddress == "") {
                                    document.getElementById("id_TravellerEmail").style.display = 'block';
                                    document.getElementById("id_TravellerEmail").textContent = "Please enter the email";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enEDSourceCode == "" || enquiry.enEDSourceCode == null || enquiry.enEDSourceCode == undefined) {
                                    document.getElementById("idSourceCode").style.display = 'block';
                                    document.getElementById("idSourceCode").textContent = "Please select a source";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enEDUserAssigned == "" || enquiry.enEDUserAssigned == null || enquiry.enEDUserAssigned == undefined) {
                                    document.getElementById("id_UserAssigned").style.display = 'block';
                                    document.getElementById("id_UserAssigned").textContent = "Please assign the user";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if ((enquiry.enEDBudgetAmount == null || enquiry.enEDBudgetAmount == undefined || enquiry.enEDBudgetAmount == "") && enquiry.enEDBudgetAmount != 0) {
                                    document.getElementById("id_enEDBudgetAmount").style.display = 'block';
                                    document.getElementById("id_enEDBudgetAmount").textContent = "Please enter the Amount";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enEDBudgetCurrency == "" || enquiry.enEDBudgetCurrency == null || enquiry.enEDBudgetCurrency == undefined) {
                                    document.getElementById("id_BudgetCurrency").style.display = 'block';
                                    document.getElementById("id_BudgetCurrency").textContent = "Please enter currency";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enEDCorrectedCity == null || enquiry.enEDCorrectedCity == undefined || enquiry.enEDCorrectedCity == "") {
                                    document.getElementById("id_enEDCorrectedCity").style.display = 'block';
                                    document.getElementById("id_enEDCorrectedCity").textContent = "Please enter the city";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if ((enquiry.enEDTotalPassengers == null || enquiry.enEDTotalPassengers == undefined || enquiry.enEDTotalPassengers == "") && (MakeEmptyStringWhenNull($("#idDTenEDTotalPassengers").val()) == "")) {
                                    document.getElementById("id_enEDTotalPassengers").style.display = 'block';
                                    document.getElementById("id_enEDTotalPassengers").textContent = "Please enter total number of guests";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else {
                                    //saveClient(enquiry);
                                }
                                $("#idDTenTRClientGroup").click(function () {
                                    document.getElementById("id_enTRClientGroup").style.display = 'none';
                                });
                                $("#idDTenEDSourceCode").click(function () {
                                    document.getElementById("idSourceCode").style.display = 'none';
                                });

                                $("#idDTenCDClientGroup").click(function () {
                                    document.getElementById("id_enCDClientGroup").style.display = 'none';
                                });

                                $("#idDTenEDUserAssigned").click(function () {
                                    document.getElementById("id_UserAssigned").style.display = 'none';
                                });
                                $("#idDTenEDBudgetCurrency").click(function () {
                                    document.getElementById("id_BudgetCurrency").style.display = 'none';
                                });
                                $("#idDTenEDTotalPassengers").click(function () {
                                    document.getElementById("id_enEDTotalPassengers").style.display = 'none';
                                });
                                $("#idDTenECFiveStarRef").click(function () {
                                    document.getElementById("id_enECFiveStarRef").style.display = 'none';
                                });
                                $("#idDTenTotalPassengers").click(function () {
                                    document.getElementById("id_enEDTotalPassengers").style.display = 'none';
                                });

                            }

                            console.log($stateParams.enqRef);
                            enquiryDataservice.TrackingVisitingTabs(user, enqRef, "Emails Tab View");
                        }
                        //else {
                        //    $state.go('detailsTab', { enqRef: $stateParams.enqRef });
                        //}
                    }]
            })

            //Actions Tab
            .state('detailsTab.actions', {
                url: '/Actions',
                views: {
                    'currentEnquiry': {
                        templateUrl: '/Partials/PV_CurrentEnquiry'
                    },
                    'enquiriesTabTabs': {
                        templateUrl: '/Partials/Page1ActionsTab',
                        controller: 'P_ActionsTab'
                    }
                },
                onEnter: ['$stateParams', '$rootScope', '$state', 'R_EnquiriesService', 'R_UsersService',
                    function ($stateParams, $rootScope, $state, enquiryDataservice, usersService) {

                        var enqRef = $stateParams.enqRef;
                        usersService.viewsBasedOnRoles(enqRef).success(function (record) {
                            console.log("Record in Roles: " + record);
                            if (record == null || record === "null") {
                                window.location.href = $rootScope.eTrakUrl + '/Account/Login?ReturnUrl=%2f#/';
                            }
                            else {
                                $rootScope.record = angular.fromJson(record);
                            }
                        });

                        console.log($rootScope.DTEnquiry);
                        if ($rootScope.DTEnquiry != undefined) {

                            SaveEnquiry($rootScope.DTEnquiry);

                            //Check Enquiry
                            function SaveEnquiry(enquiry) {
                                console.log(enquiry);
                                if (enquiry.enCDCompanyName == null || enquiry.enCDCompanyName == undefined || enquiry.enCDCompanyName == "") {
                                    document.getElementById("id_enCDCompanyName").style.display = 'block';
                                    document.getElementById("id_enCDCompanyName").textContent = "Please enter the company name";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enCDClientGroup == null || enquiry.enCDClientGroup == undefined || enquiry.enCDClientGroup == "") {
                                    document.getElementById("id_enCDClientGroup").style.display = 'block';
                                    document.getElementById("id_enCDClientGroup").textContent = "Please select the group";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if ((enquiry.enCDFirstName == null || enquiry.enCDFirstName == undefined) && (enquiry.enCDLastName == null || enquiry.enCDLastName == undefined)) {
                                    document.getElementById("id_ClientFirstName").style.display = 'block';
                                    document.getElementById("id_ClientFirstName").textContent = "Please Specify the name";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enCDEmailAddress == null || enquiry.enCDEmailAddress == undefined || enquiry.enCDEmailAddress == "") {
                                    document.getElementById("id_ClientEmail").style.display = 'block';
                                    document.getElementById("id_ClientEmail").textContent = "Please enter the email";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enTRCompanyName == null || enquiry.enTRCompanyName == undefined || enquiry.enTRCompanyName == "") {
                                    document.getElementById("id_enTRCompanyName").style.display = 'block';
                                    document.getElementById("id_enTRCompanyName").textContent = "Please enter the company name";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enTRClientGroup == null || enquiry.enTRClientGroup == undefined || enquiry.enTRClientGroup == "") {
                                    document.getElementById("id_enTRClientGroup").style.display = 'block';
                                    document.getElementById("id_enTRClientGroup").textContent = "Please enter the group name";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if ((enquiry.enTRFirstName == null || enquiry.enTRFirstName == undefined || enquiry.enTRFirstName == "")) {
                                    document.getElementById("id_TravellerFirstName").style.display = 'block';
                                    document.getElementById("id_TravellerFirstName").textContent = "Please Specify the first name";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if ((enquiry.enTRLastName == null || enquiry.enTRLastName == undefined || enquiry.enTRLastName == "")) {
                                    document.getElementById("id_TravellerLastName").style.display = 'block';
                                    document.getElementById("id_TravellerLastName").textContent = "Please Specify the last name";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enTREmailAddress == null || enquiry.enTREmailAddress == undefined || enquiry.enTREmailAddress == "") {
                                    document.getElementById("id_TravellerEmail").style.display = 'block';
                                    document.getElementById("id_TravellerEmail").textContent = "Please enter the email";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enEDSourceCode == "" || enquiry.enEDSourceCode == null || enquiry.enEDSourceCode == undefined) {
                                    document.getElementById("idSourceCode").style.display = 'block';
                                    document.getElementById("idSourceCode").textContent = "Please select a source";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enEDUserAssigned == "" || enquiry.enEDUserAssigned == null || enquiry.enEDUserAssigned == undefined) {
                                    document.getElementById("id_UserAssigned").style.display = 'block';
                                    document.getElementById("id_UserAssigned").textContent = "Please assign the user";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if ((enquiry.enEDBudgetAmount == null || enquiry.enEDBudgetAmount == undefined || enquiry.enEDBudgetAmount == "") && enquiry.enEDBudgetAmount != 0) {
                                    document.getElementById("id_enEDBudgetAmount").style.display = 'block';
                                    document.getElementById("id_enEDBudgetAmount").textContent = "Please enter the Amount";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enEDBudgetCurrency == "" || enquiry.enEDBudgetCurrency == null || enquiry.enEDBudgetCurrency == undefined) {
                                    document.getElementById("id_BudgetCurrency").style.display = 'block';
                                    document.getElementById("id_BudgetCurrency").textContent = "Please enter currency";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enEDCorrectedCity == null || enquiry.enEDCorrectedCity == undefined || enquiry.enEDCorrectedCity == "") {
                                    document.getElementById("id_enEDCorrectedCity").style.display = 'block';
                                    document.getElementById("id_enEDCorrectedCity").textContent = "Please enter the city";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if ((enquiry.enEDTotalPassengers == null || enquiry.enEDTotalPassengers == undefined || enquiry.enEDTotalPassengers == "") && (MakeEmptyStringWhenNull($("#idDTenEDTotalPassengers").val()) == "")) {
                                    document.getElementById("id_enEDTotalPassengers").style.display = 'block';
                                    document.getElementById("id_enEDTotalPassengers").textContent = "Please enter total number of guests";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else {
                                    //saveClient(enquiry);
                                }
                                $("#idDTenEDSourceCode").click(function () {
                                    document.getElementById("idSourceCode").style.display = 'none';
                                });
                                $("#idDTenCDClientGroup").click(function () {
                                    document.getElementById("id_enTRClientGroup").style.display = 'none';
                                });
                                $("#idDTenEDUserAssigned").click(function () {
                                    document.getElementById("id_UserAssigned").style.display = 'none';
                                });
                                $("#idDTenEDBudgetCurrency").click(function () {
                                    document.getElementById("id_BudgetCurrency").style.display = 'none';
                                });
                                $("#idDTenTRClientGroup").click(function () {
                                    document.getElementById("id_BudgetCurrency").style.display = 'none';
                                });
                                $("#idDTenEDTotalPassengers").click(function () {
                                    document.getElementById("id_enEDTotalPassengers").style.display = 'none';
                                });
                                $("#idDTenECFiveStarRef").click(function () {
                                    document.getElementById("id_enECFiveStarRef").style.display = 'none';
                                });
                                $("#idDTenTotalPassengers").click(function () {
                                    document.getElementById("id_enEDTotalPassengers").style.display = 'none';
                                });

                                var user = document.getElementById("divUserCode").value;
                                var enqRef = $stateParams.enqRef;
                                console.log($stateParams.enqRef);
                                enquiryDataservice.TrackingVisitingTabs(user, enqRef, "Actions Tab View");
                            }
                        }
                        //else {
                        //    $state.go('detailsTab', { enqRef: $stateParams.enqRef });
                        //}
                    }]
            })

            //Notes Tab
            .state('detailsTab.notes', {
                url: '/Notes',
                views: {
                    'currentEnquiry': {
                        templateUrl: '/Partials/PV_CurrentEnquiry'
                    },
                    'enquiriesTabTabs': {
                        templateUrl: '/Partials/Page1NotesTab',
                        controller: 'P_NotesTab'
                    }
                }
            })

            //QACheck Tab    
            .state('detailsTab.qaCheck', {
                url: '/QACheck',
                views: {
                    'currentEnquiry': {
                        templateUrl: '/Partials/PV_CurrentEnquiry'

                    },
                    'enquiriesTabTabs': {
                        templateUrl: '/Partials/Page1QACheckTab',
                        controller: 'P_QACheckTab'
                    }
                },
                onEnter: ['$stateParams', '$rootScope', '$state', 'R_EnquiriesService', 'R_UsersService',
                    function ($stateParams, $rootScope, $state, enquiryDataservice, usersService) {
                        usersService.getRoleNameForUser().success(function (role) {
                            $rootScope.Role = role;
                            console.log("Role: " + $rootScope.Role);
                            console.log("URL: " + $rootScope.eTrakUrl + '/Account/Login?ReturnUrl=%2f#/');
                            if ($rootScope.Role === "Home User" || $rootScope.Role === "Client User") {
                                window.location.href = $rootScope.eTrakUrl + '/Account/Login?ReturnUrl=%2f#/';
                            }
                        });

                        var enqRef = $stateParams.enqRef;
                        usersService.viewsBasedOnRoles(enqRef).success(function (record) {
                            console.log("Record in Roles: " + record);
                            if (record == null || record === "null") {
                                window.location.href = $rootScope.eTrakUrl + '/Account/Login?ReturnUrl=%2f#/';
                            }
                            else {
                                $rootScope.record = angular.fromJson(record);
                            }
                        });

                        console.log($rootScope.DTEnquiry);
                        if ($rootScope.DTEnquiry != undefined) {

                            SaveEnquiry($rootScope.DTEnquiry);

                            //Check Enquiry
                            function SaveEnquiry(enquiry) {
                                console.log(enquiry);
                                if (enquiry.enCDCompanyName == null || enquiry.enCDCompanyName == undefined || enquiry.enCDCompanyName == "") {
                                    document.getElementById("id_enCDCompanyName").style.display = 'block';
                                    document.getElementById("id_enCDCompanyName").textContent = "Please enter the company name";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enCDClientGroup == null || enquiry.enCDClientGroup == undefined || enquiry.enCDClientGroup == "") {
                                    document.getElementById("id_enCDClientGroup").style.display = 'block';
                                    document.getElementById("id_enCDClientGroup").textContent = "Please select the group";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if ((enquiry.enCDFirstName == null || enquiry.enCDFirstName == undefined) && (enquiry.enCDLastName == null || enquiry.enCDLastName == undefined)) {
                                    document.getElementById("id_ClientFirstName").style.display = 'block';
                                    document.getElementById("id_ClientFirstName").textContent = "Please Specify the name";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enCDEmailAddress == null || enquiry.enCDEmailAddress == undefined || enquiry.enCDEmailAddress == "") {
                                    document.getElementById("id_ClientEmail").style.display = 'block';
                                    document.getElementById("id_ClientEmail").textContent = "Please enter the email";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enTRCompanyName == null || enquiry.enTRCompanyName == undefined || enquiry.enTRCompanyName == "") {
                                    document.getElementById("id_enTRCompanyName").style.display = 'block';
                                    document.getElementById("id_enTRCompanyName").textContent = "Please enter the company name";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enTRClientGroup == null || enquiry.enTRClientGroup == undefined || enquiry.enTRClientGroup == "") {
                                    document.getElementById("id_enTRClientGroup").style.display = 'block';
                                    document.getElementById("id_enTRClientGroup").textContent = "Please enter the group name";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if ((enquiry.enTRFirstName == null || enquiry.enTRFirstName == undefined || enquiry.enTRFirstName == "")) {
                                    document.getElementById("id_TravellerFirstName").style.display = 'block';
                                    document.getElementById("id_TravellerFirstName").textContent = "Please Specify the first name";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if ((enquiry.enTRLastName == null || enquiry.enTRLastName == undefined || enquiry.enTRLastName == "")) {
                                    document.getElementById("id_TravellerLastName").style.display = 'block';
                                    document.getElementById("id_TravellerLastName").textContent = "Please Specify the last name";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enTREmailAddress == null || enquiry.enTREmailAddress == undefined || enquiry.enTREmailAddress == "") {
                                    document.getElementById("id_TravellerEmail").style.display = 'block';
                                    document.getElementById("id_TravellerEmail").textContent = "Please enter the email";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enEDSourceCode == "" || enquiry.enEDSourceCode == null || enquiry.enEDSourceCode == undefined) {
                                    document.getElementById("idSourceCode").style.display = 'block';
                                    document.getElementById("idSourceCode").textContent = "Please select a source";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enEDUserAssigned == "" || enquiry.enEDUserAssigned == null || enquiry.enEDUserAssigned == undefined) {
                                    document.getElementById("id_UserAssigned").style.display = 'block';
                                    document.getElementById("id_UserAssigned").textContent = "Please assign the user";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if ((enquiry.enEDBudgetAmount == null || enquiry.enEDBudgetAmount == undefined || enquiry.enEDBudgetAmount == "") && enquiry.enEDBudgetAmount != 0) {
                                    document.getElementById("id_enEDBudgetAmount").style.display = 'block';
                                    document.getElementById("id_enEDBudgetAmount").textContent = "Please enter the Amount";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enEDBudgetCurrency == "" || enquiry.enEDBudgetCurrency == null || enquiry.enEDBudgetCurrency == undefined) {
                                    document.getElementById("id_BudgetCurrency").style.display = 'block';
                                    document.getElementById("id_BudgetCurrency").textContent = "Please enter currency";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if (enquiry.enEDCorrectedCity == null || enquiry.enEDCorrectedCity == undefined || enquiry.enEDCorrectedCity == "") {
                                    document.getElementById("id_enEDCorrectedCity").style.display = 'block';
                                    document.getElementById("id_enEDCorrectedCity").textContent = "Please enter the city";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else if ((enquiry.enEDTotalPassengers == null || enquiry.enEDTotalPassengers == undefined || enquiry.enEDTotalPassengers == "") && (MakeEmptyStringWhenNull($("#idDTenEDTotalPassengers").val()) == "")) {
                                    document.getElementById("id_enEDTotalPassengers").style.display = 'block';
                                    document.getElementById("id_enEDTotalPassengers").textContent = "Please enter total number of guests";
                                    $state.go('detailsTab', { enqRef: enquiry.enCode });
                                    $("#myModal").modal("show");
                                }
                                else {
                                    //saveClient(enquiry);
                                }
                                $("#idDTenTRClientGroup").click(function () {
                                    document.getElementById("id_enTRClientGroup").style.display = 'none';
                                });
                                $("#idDTenEDSourceCode").click(function () {
                                    document.getElementById("idSourceCode").style.display = 'none';
                                });
                                $("#idDTenCDClientGroup").click(function () {
                                    document.getElementById("id_enCDClientGroup").style.display = 'none';
                                });
                                $("#idDTenEDUserAssigned").click(function () {
                                    document.getElementById("id_UserAssigned").style.display = 'none';
                                });
                                $("#idDTenEDBudgetCurrency").click(function () {
                                    document.getElementById("id_BudgetCurrency").style.display = 'none';
                                });
                                $("#idDTenEDTotalPassengers").click(function () {
                                    document.getElementById("id_enEDTotalPassengers").style.display = 'none';
                                });
                                $("#idDTenECFiveStarRef").click(function () {
                                    document.getElementById("id_enECFiveStarRef").style.display = 'none';
                                });
                                $("#idDTenTotalPassengers").click(function () {
                                    document.getElementById("id_enEDTotalPassengers").style.display = 'none';
                                });

                                var user = document.getElementById("divUserCode").value;
                                var enqRef = $stateParams.enqRef;
                                console.log($stateParams.enqRef);
                                enquiryDataservice.TrackingVisitingTabs(user, enqRef, "QACheck Tab View");
                            }
                        }
                        //else {
                        //    $state.go('detailsTab', { enqRef: $stateParams.enqRef });
                        //}
                    }]
            })

            //Company Details Tab
            .state('detailsTab.companyDetails', {
                url: '/CompanyDetails',
                views: {
                    'currentEnquiry': {
                        templateUrl: '/Partials/PV_CurrentEnquiry'

                    },
                    'enquiriesTabTabs': {
                        templateUrl: '/Partials/Page2CompanyDetailsTab',
                        controller: 'P_CompanyDetailsTab'
                    }
                }
            })

            //Client Users Tab
            .state('detailsTab.clientUsers', {
                url: '/ClientUsers',
                views: {
                    'currentEnquiry': {
                        templateUrl: '/Partials/PV_CurrentEnquiry'
                    },
                    'enquiriesTabTabs': {
                        templateUrl: '/Partials/Page2ClientUsersTab',
                        controller: 'P_ClientUsersTab'
                    }
                }
            })

            //Client OP Agreement Tab
            .state('detailsTab.clientOpAgreement', {
                url: '/ClientOpAgreement/:enqRef',
                views: {
                    'currentEnquiry': {
                        templateUrl: '/Partials/PV_CurrentEnquiry'

                    },
                    'enquiriesTabTabs': {
                        templateUrl: '/Partials/Page2ClientOpAgreementTab',
                        controller: 'P_ClientOpAgreementTab'
                    }
                }
            })

            //Enquiry History Tab
            .state('detailsTab.enquiryHistory', {
                url: '/EnquiryHistory',
                views: {
                    'currentEnquiry': {
                        templateUrl: '/Partials/PV_CurrentEnquiry'

                    },
                    'enquiriesTabTabs': {
                        templateUrl: '/Partials/Page2EnquiryHistoryTab',
                        controller: 'P_EnquiryHistoryTab'
                    }
                }
            });

    });
})();