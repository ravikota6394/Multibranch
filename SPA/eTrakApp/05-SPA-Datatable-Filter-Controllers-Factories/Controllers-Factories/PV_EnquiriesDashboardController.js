'use strict';
eTrakApp.controller('pvEnquiriesDashboardController', ['$scope', '$rootScope', '$timeout', '$location', '$state', '$http', '$sce', 'R_EmailStatusService', 'R_UsersService', 'R_TrackingRecordsService', 'DTOptionsBuilder', 'DTColumnBuilder', 'PV_EnquiriesDashboardService', 'R_EnqSourcesService', 'R_PropertiesService', 'logger', 'R_ClientGroupsService','R_ClientsService', pvEnquiriesDashboardController]);
function pvEnquiriesDashboardController($scope, $rootScope, $timeout, $location, $state, $http, $sce, rEmailStatusService, usersFactory, trackingRecordsDataService, dtOptionsBuilder, dtColumnBuilder, enquiriesDashboardFactory, enqSourcesService, chosenPropertiesFactory, logger, clientGroupsFactory, clientsService) {

    $rootScope.showBuddyQueries = true;
    var isSupervisor = $("#IsSupervisorCheck").val();
    var selectedQueryDetails = {
        enCode: null,
        usFullName: 'DONOTRETURN',
        enEDSpecialInterest: null,
        enEDDateAddedFrom: null,
        enEDDateAddedTo: null,
        enNewStatus: null,
        enAssignedStatus: null,
        enActionedStatus: null,
        enClosedStatus: null,
        enPossibleDuplicatesStatus: null,
        enActionRequiredStatus: null,
        enEDCountryCode: null,
        coName: null,
        ciDescription: null,
        correctedCiDescription: null,
        enEDBudgetCategoryCode: null,
        enEDBudgetAmountFrom: null,
        enEDBudgetAmountTo: null,
        enEDDateOfArrivalFrom: null,
        enEDDateOfArrivalTo: null,
        enEDDepartureDateFrom: null,
        enEDDepartureDateTo: null,
        enEDDateClosedFrom: null,
        enEDDateClosedTo: null,
        enEDNights: null,
        enEDNightsTo: null,
        enClientName: null,
        enCDCompanyName: null,
        enFullName: null,
        enEDSourceCode: null,
        enEDSourceStatus: null,
        enCDClientGroup: null,
        enECDeadReasonCode: null,
        enECAvailabilityReason: null,
        enCDFaxNo: null,
        enCDEmailAddress: null,
        enBuddy: null,
        enArrivalvalue: null,
        enArrivalDays: null,
        enArrivalDate: null,
        enDepartureValue: null,
        enDepartureDays: null,
        enDepartureDate: null,
        enDateAddedvalue: null,
        enDateAddedDate: null,
        enDateAddedDays: null,
        enClosedDateValue: null,
        enClosedDate: null,
        enClosedDays: null,
        propertyName: null,
        privateNotes: null,
        enEDBudgetValue: null,
        enEDBudgetAmount: null,
        enEDRMC: null,
        enEmployeeID: null,
        enECOfferedCurrency: null,
        enECLowestOfferedRate: null,
        enECHighestOfferedRate: null,
        enSfAssigneeOfficeAddress: null,
        enSfInvoiceAddress: null,
        enSfInvoiceEmail: null,
        enSfBudgetAmount: null,
        enSfOfficeAddress: null
    };
    $("#id_DeleteQuery").hide();
    var vm = this;
    vm.dtInstance2 = null;
    vm.dtInstanceCallback = dtInstanceCallback;
    
    $rootScope.breadcrumbsValueGoTo = '';
    $rootScope.breadcrumbsValueAreHere = '> User Area';
    $rootScope.breadcrumbsValueUiSref = '';

    if ($scope.fltUser === undefined) {
        $scope.fltUser = "";
    }

    $rootScope.leftColumnNames = [];
    $rootScope.rightColumnNames = [];

    $rootScope.CurrentQueryName = '';
    $rootScope.QueryNameInDashboard = '';

    $rootScope.autoPropertySelect = true;

    function initiateCalls() {
        getEmailStatus();
    }
    
    resetColumns();
    renderAngularDataTable(selectedQueryDetails, true, 'initial');

    function getEnqSources() {
        enqSourcesService.getEnqSources()
            .success(function (enqSources) {
                $rootScope.EnqSourcesdata = enqSources;
                console.log("$scope.EnqSources");
                console.log($scope.EnqSources);
            });
    }
    
    function getClientGroups() {
        clientGroupsFactory.getClientGroups()
            .success(function (clientGroupsInput) {
                $rootScope.clientGroupsdata = angular.fromJson(clientGroupsInput);
            });
    }

    function getEmailStatus() {
        var emailStatusJson = rEmailStatusService.FetchEmailStatus();
        emailStatusJson.then(function (response) {
            console.log(angular.fromJson(response.data));
            $rootScope.EmailStatus = angular.fromJson(response.data);
        }, function () {
        });
    }
   
    function getVUsers() {
        usersFactory.getUsersForQueries()
            .success(function (users) {
                $rootScope.multipleUsersselected = null;
                $rootScope.Users = angular.fromJson(users);
                $rootScope.Users.unshift({
                    usCode: "No User"
                });
                $rootScope.Users.unshift({
                    usCode: "All Users"
                });
                $rootScope.Users.unshift({
                    usCode: "*Me*"
                });
            });

    }

    $rootScope.OnClose_Users = function (usersList) {
        $scope.usersList = usersList;
        var users = "";
        for (var i = 0; i < $scope.usersList.length; i++) {
            if ($scope.usersList[i].usCode == "*Me*") {
                users = users + "," + $rootScope.glbMainUserID;
            }
            else
                users = users + "," + $scope.usersList[i].usCode;
        }
        users = (users[0] == ',') ? users.substr(1) : users;
        $scope.CurrentQueryObject.usFullName = users;
        console.log("users");
        console.log(users);
    }
    $rootScope.OnClose_Sources = function (sourcesList) {
        $scope.sourcesList = sourcesList;
        var sources = "";
        for (var i = 0; i < $scope.sourcesList.length; i++) {
            sources = sources + "," + $scope.sourcesList[i].soDescription;
        }
        sources = (sources[0] == ',') ? sources.substr(1) : sources;
        $scope.CurrentQueryObject.enEDSourceCode = sources;
        console.log("sources");
        console.log(sources);
    }
    $rootScope.OnClose_Groups = function (groupsList) {
        $scope.groupsList = groupsList;
        var groups = "";
        for (var i = 0; i < $scope.groupsList.length; i++) {
            groups = groups + "," + $scope.groupsList[i].cgCode;
        }
        groups = (groups[0] == ',') ? groups.substr(1) : groups;
        $scope.CurrentQueryObject.enCDClientGroup = groups;
        console.log("groupsList");
        console.log(groups);
    }
    
    $rootScope.GetDashboardOfSelectedUser = function (selectedUser) {
        $rootScope.QueryNameInDashboard = "All enquiries";
        $rootScope.globalUserId = selectedUser;
        console.log(selectedUser);
        $rootScope.userSelected = selectedUser;
        usersFactory.getSelectedUserRole(selectedUser)
            .then(function (userRole) {
                $scope.SelectedUserRole = angular.fromJson(userRole.data);
                console.log($scope.SelectedUserRole);
                $rootScope.UserRole = $scope.SelectedUserRole;
                $rootScope.SelectedUserRoleofDropdown = $scope.SelectedUserRole;
                enquiriesDashboardFactory.getColumnsByRole($rootScope.SelectedUserRoleofDropdown)
                    .success(function (selectedColumns) {
                        console.log('selectedColumns');
                        $rootScope.ColumnsSelected = selectedColumns;
                        console.log($rootScope.ColumnsSelected);
                        var selectedMeAsBuddyUser = null;
                        var clientGroupOfUser = null;

                        if (isSupervisor == "true") {
                            selectedMeAsBuddyUser = $rootScope.userSelected;
                        }
                        else {
                            if ($scope.SelectedUserRole == "Resteam" || $scope.SelectedUserRole == "Home User" || $scope.SelectedUserRole == "Client User") {
                                selectedMeAsBuddyUser = $rootScope.userSelected;
                            }
                            if ($scope.SelectedUserRole == "Client Manager") {
                                clientGroupOfUser = $rootScope.userClientGroup;
                            }
                        }
                        var selectedQueryDetails = {
                            enCode: null,
                            usFullName: selectedMeAsBuddyUser,
                            enEDSpecialInterest: null,
                            enEDDateAddedFrom: null,
                            enEDDateAddedTo: null,
                            enNewStatus: true,
                            enAssignedStatus: true,
                            enActionedStatus: true,
                            enClosedStatus: null,
                            enPossibleDuplicatesStatus: true,
                            enActionRequiredStatus: true,
                            enEDCountryCode: null,
                            coName: null,
                            ciDescription: null,
                            correctedCiDescription: null,
                            enEDBudgetCategoryCode: null,
                            enEDBudgetAmountFrom: null,
                            enEDBudgetAmountTo: null,
                            enEDDateOfArrivalFrom: null,
                            enEDDateOfArrivalTo: null,
                            enEDDepartureDateFrom: null,
                            enEDDepartureDateTo: null,
                            enEDDateClosedFrom: null,
                            enEDDateClosedTo: null,
                            enEDNights: null,
                            enEDNightsTo: null,
                            enClientName: null,
                            enCDCompanyName: null,
                            enFullName: null,
                            enEDSourceCode: null,
                            enEDSourceStatus: null,
                            enCDClientGroup: clientGroupOfUser,
                            enECDeadReasonCode: null,
                            enECAvailabilityReason: null,
                            enCDFaxNo: null,
                            enCDEmailAddress: null,
                            enBuddy: null,
                            enArrivalvalue: null,
                            enArrivalDays: null,
                            enArrivalDate: null,
                            enDepartureValue: null,
                            enDepartureDays: null,
                            enDepartureDate: null,
                            enClosedDateValue: null,
                            enClosedDate: null,
                            enClosedDays: null,
                            enDateAddedvalue: null,
                            enDateAddedDate: null,
                            enDateAddedDays: null,
                            propertyName: null,
                            privateNotes: null,
                            enEDBudgetValue: null,
                            enEDBudgetAmount: null,
                            enECOfferedCurrency: null,
                            enECLowestOfferedRate: null,
                            enECHighestOfferedRate: null,
                            enEDRMC: null,
                            enEmployeeID: null,
                            enSfAssigneeOfficeAddress: null,
                            enSfInvoiceAddress: null,
                            enSfInvoiceEmail: null,
                            enSfBudgetAmount: null,
                            enSfOfficeAddress: null
                        };
                        renderAngularDataTable(selectedQueryDetails, false, 'selectedUserDashboard');
                        if ($rootScope.globalUserId != $rootScope.glbMainUserID) {
                            $rootScope.showBuddyQueries = false;
                        }
                        else {
                            $rootScope.showBuddyQueries = true;
                        }
                        $location.path('home');
                        console.log($rootScope.userSelected);
                        emailsInCount($rootScope.userSelected);
                    });
            });
    }

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

    $rootScope.RefreshBuddyQueries = function () {
        getBuddyIndividualQueries($rootScope.globalUserId);
        getGlobalQueries();
        getReservationsReportQueries();
        getSalesReportQueries();
        getSupplyReportQueries();
        getReportingQueries();
    }

    function getBuddyIndividualQueries(userID) {
        enquiriesDashboardFactory.GetIndividualQueries(userID)
            .success(function (queries) {
                console.log('Get buddy individual query success');
                $rootScope.BuddyIndividualQueryNames = queries;
                console.log($rootScope.BuddyIndividualQueryNames);
            });
    }

    //Save Default query Id
    $rootScope.SaveDefaultQueryId = function () {
        $scope.QueryId = $("#id_QueryId").val();
        console.log($scope.QueryId);
        $scope.userId = $rootScope.glbMainUserID;
        console.log($scope.userId);
        enquiriesDashboardFactory.SaveDefaultQueryId($scope.QueryId, $scope.userId)
            .then(function (response) {
                console.log(response.data);
                $scope.MakeDefault = response.data;
                console.log($scope.MakeDefault);
                if ($scope.MakeDefault == "Success") {
                    logger.info('Your selected Query has become default query');
                }
            });
    }

    //Remove Default query Id
    $rootScope.RemoveDefaultQuery = function () {
        $scope.QueryId = $("#id_QueryId").val();
        $scope.userId = $rootScope.glbMainUserID;
        console.log($scope.userId);
        enquiriesDashboardFactory.RemoveDefaultQuery($scope.userId)
            .then(function (response) {
                console.log(response.data);
                $scope.RemoveDefault = response.data;
                logger.info('Your default query has been Removed');
            });
    }

    function dtInstanceCallback(dtInstance) {
        console.log('dtInstance');
        vm.dtInstance2 = dtInstance;
    }
    

    $rootScope.btnSearchForRecords = function () {

        console.log($rootScope.ColumnsSelected);

        console.log($("#idFltEnCode").val() + ',' + $("#idFltUser").val() + ',' + $("#idFltSpInt").val() + ',' + $("#idFltCountry").val() + ',' + $("#idFltCity").val()
            + ',' + $("#idFltBudgetCategory").val() + ',' + $("#idFltArrivalDateFrom").val() + ',' + $("#idFltArrivalDateTo").val() + ',' + $("#idFltNightsFrom").val()
            + ',' + $("#idFltClient").val() + ',' + $("#idFltCompany").val() + ',' + $("#idFltLeadName").val() + ',' + ',' + $("#idFltAvailabilityReason").val() +
            'Source' + $scope.CurrentQueryObject.enEDSourceCode + '------' + $("#idFltSource").val() + ',' + $scope.CurrentQueryObject.enCDClientGroup + ',' + $("#idFltDeadReason").val() + ',' + $("#idDTenCDFaxNo").val() + ',' + $("#emailaddress").val() + $("#idFltenManualStatus").val());

        var budget = document.getElementById("idFltBudgetCategory");
        var budgetName = budget.options[budget.selectedIndex].text;

        if ($("#idFltSpInt").val().startsWith("? object:null ?")) {
            $("#idFltSpInt").val(null);
        }
        if ($("#idFltenManualStatus").val().startsWith("? object:null ?")) {
            $("#idFltenManualStatus").val(null);
        }
        if ($("#idFltBudgetValue").val().startsWith("? object:null ?")) {
            $("#idFltBudgetValue").val(null);
        }
        //if ($("#idFltUser").val().startsWith("? object:null ?")) {
        //    $("#idFltUser").val(null);
        //}
        if ($("#idFltCountry").val().startsWith("? object:null ?")) {
            $("#idFltCountry").val(null);
        }
        var newStatus = $("#idFltProgressNew:checked").val();
        var assignedStatus = $("#idFltProgressAssigned:checked").val();
        var actionedStatus = $("#idFltProgressActioned:checked").val();
        var actionRequiredStatus = $("#idFltProgressActionRequired:checked").val();
        var closedStatus = $("#idFltProgressClosed:checked").val();
        var possibleDuplicatesStatus = $("#idFltProgressPossibleDuplicates:checked").val();

        console.log("New: " + $("#idFltProgressNew:checked").val());
        console.log("Assigned: " + $("#idFltProgressAssigned:checked").val());
        console.log("Actioned: " + $("#idFltProgressActioned:checked").val());
        console.log("Action Required:" + $("#idFltProgressActionRequired:checked").val());
        console.log("Closed:" + $("#idFltProgressClosed:checked").val());
        var user = $("#idFltUser").val();
        if (user == "*Me*") {
            user = $rootScope.glbMainUserID;
        }

        if (newStatus == undefined && assignedStatus == undefined
            && actionedStatus == undefined && actionRequiredStatus == undefined && possibleDuplicatesStatus == undefined
            && closedStatus == undefined && $("#idFltenManualStatus").val() != "Closed") {
            newStatus = true;
            assignedStatus = true;
            actionedStatus = true;
            actionRequiredStatus = true;
            possibleDuplicatesStatus = true;
        }
        var userInDropdown = $("#idgblBuddyUser").val();
        usersFactory.getSelectedUserRole(userInDropdown)
            .then(function (userRole) {
                console.log(angular.fromJson(userRole.data));
                $scope.SelectedUserRole = angular.fromJson(userRole.data);
                if ($scope.SelectedUserRole == "Resteam" || $scope.SelectedUserRole == "Home User" || $scope.SelectedUserRole == "Client User") {
                    user = userInDropdown;
                }
                var enquiryDetails = {
                    enCode: $("#idFltEnCode").val(),
                    usFullName: $scope.CurrentQueryObject.usFullName != null ? $scope.CurrentQueryObject.usFullName.toString() : null,//user,
                    enEDSpecialInterest: $("#idFltSpInt").val(),
                    enEDDateAddedFrom: $("#idFltAddedDateFrom").val(),
                    enEDDateAddedTo: $("#idFltAddedDateTo").val(),
                    enNewStatus: newStatus,
                    enAssignedStatus: assignedStatus,
                    enActionedStatus: actionedStatus,
                    enClosedStatus: closedStatus,
                    enPossibleDuplicatesStatus: possibleDuplicatesStatus,
                    enActionRequiredStatus: actionRequiredStatus,
                    enEDCountryCode: $("#idFltCountry").val(),
                    coName: $("#idFltCountry").val(),
                    ciDescription: $("#idFltCity").val(),
                    correctedCiDescription: $("#idFltCorrectedCity").val(),
                    enEDBudgetCategoryCode: budgetName,
                    enEDBudgetAmountFrom: $("#idFltBudgetAmountFrom").val(),
                    enEDBudgetAmountTo: $("#idFltBudgetAmountTo").val(),
                    enEDDateOfArrivalFrom: $("#idFltArrivalDateFrom").val(),
                    enEDDateOfArrivalTo: $("#idFltArrivalDateTo").val(),
                    enEDDepartureDateFrom: $("#idFltDepartureDateFrom").val(),
                    enEDDepartureDateTo: $("#idFltDepartureDateTo").val(),
                    enEDDateClosedFrom: $("#idFltDateClosedFrom").val(),
                    enEDDateClosedTo: $("#idFltDateClosedTo").val(),
                    enEDNights: $("#idFltNightsFrom").val(),
                    enEDNightsTo: $("#idFltNightsTo").val(),
                    enClientName: $("#idFltClient").val(),
                    //enCDCompanyName: $scope.CurrentQueryObject.enCDCompanyName != null ? $scope.CurrentQueryObject.enCDCompanyName.toString() : null,//$("#idFltCompany").val(),
                    enCDCompanyName:$("#idFltCompany").val(),
                    enFullName: $("#idFltLeadName").val(),
                    //enEDSourceCode: $("#idFltSource").val(),
                    enEDSourceCode: $scope.CurrentQueryObject.enEDSourceCode != null ? $scope.CurrentQueryObject.enEDSourceCode.toString() : null,//$("#idFltSource").val(),
                    enEDSourceStatus: $("#idFltSourceStatus").val(),
                    //enCDClientGroup: $("#idFltClientGroup").find("option:selected").text(),
                    enCDClientGroup: $scope.CurrentQueryObject.enCDClientGroup != null ? $scope.CurrentQueryObject.enCDClientGroup.toString() : null,//$("#idFltClientGroup").find("option:selected").text(),
                    enECDeadReasonCode: $("#idFltDeadReason").find("option:selected").text(),
                    enECAvailabilityReason: $("#idFltAvailabilityReason").find("option:selected").text(),
                    enManualStatus: $("#idFltenManualStatus").val(),
                    enBuddy: null,
                    enArrivalvalue: $("#idFltArrivalDates").find("option:selected").text(),
                    enArrivalDays: $("#idFltArrivaldays").val(),
                    enArrivalDate: $("#idFltArrivalDate").val(),
                    enDepartureValue: $("#idFltDeparturevalue").find("option:selected").text(),
                    enDepartureDays: $("#idFltDeparturedays").val(),
                    enDepartureDate: $("#idFltDepartureDate").val(),
                    enClosedDateValue: $("#idFltClosedDates").find("option:selected").text(),
                    enClosedDays: $("#idFltClosedDays").val(),
                    enClosedDate: $("#idFltClosedDate").val(),
                    enECLowestOfferedRate: $("#idECLowestOfferedRate").val(),
                    enECHighestOfferedRate: $("#idECHighestOfferedRate").val(),
                    enECOfferedCurrency: $scope.CurrentQueryObject.enECOfferedCurrency != null ? $scope.CurrentQueryObject.enECOfferedCurrency.toString() : null,
                    enDateAddedvalue: $("#idFltDateAddedvalue").find("option:selected").text(),
                    enDateAddedDays: $("#idFltDateAddedDays").val(),
                    enDateAddedDate: $("#idFltDateAddedDate").val(),
                    propertyName: $("#idFltPropertyName").val(),
                    privateNotes: $("#idFltPrivateNotes").val(),
                    enEDBudgetValue: $("#idFltBudgetValue").val(),
                    enEDBudgetAmount: $("#idFltBudgetAmount").val(),
                    enEDRMC: $("#idTmcType").val(),
                    enEmployeeID: $("#id_EmployeeId").val()
                }
                console.log('Search Object:');
                console.log(enquiryDetails);
                renderAngularDataTable(enquiryDetails, false, 'btnSearchForRecords');
                $("#advanced-search-options").modal('hide');
            });
    };

    $rootScope.showAdvancedSearchDialog = function () {
        $("#id_CreateQuery").hide();
        $("#id_AdvancedSearch").show();
        $rootScope.autoPropertySelect = true;
        $("#advanced-search-options").modal('show');
    };

    $rootScope.SaveQueryAs = function () {
        $("#saveQuery").modal('show');
    }

    $rootScope.SaveQueryName = function (queryName, userQueryId) {
        $rootScope.hideSubReportQueries = false;
        $rootScope.hideReportQueries = false;
        console.log('queryName');
        console.log(queryName);
        console.log('userQueryId');
        console.log(userQueryId);
        $("#queryName").val("");
        $("#renameQuery").val("");
        document.getElementById("newNameOfQuery").style.display = 'none';
        document.getElementById("nameOfQuery").style.display = 'none';
        if (queryName == undefined || queryName === "") {
            $("#saveQuery").modal('show');
        }
        else {
            $("#update-Query").modal('show');
        }
    }

    $rootScope.UpdateQuery = function (userQueryId, queryName) {
        $scope.usersList = $scope.multipleUsers;
        var users = "";
        for (var i = 0; i < $scope.usersList.length; i++) {
            if ($scope.usersList[i].usCode == "*Me*") {
                users = users + "," + $rootScope.glbMainUserID;
            }
            else
                users = users + "," + $scope.usersList[i].usCode;
        }
        users = (users[0] == ',') ? users.substr(1) : users;
        $scope.CurrentQueryObject.usFullName = users;
        console.log("users");
        console.log(users);
        console.log(userQueryId);
        console.log(queryName);
        var newQueryName, j;
        if (queryName != "") {
            for (j = 0; j < $rootScope.IndividualQueryNames.length; j++) {
                newQueryName = $rootScope.IndividualQueryNames[j].QueryName;
                if (queryName == newQueryName) {
                    document.getElementById("newNameOfQuery").style.display = 'block';
                    document.getElementById("newNameOfQuery").textContent = "This query name already exists";
                    return;
                }
            }
            for (j = 0; j < $rootScope.GlobalQueryNames.length; j++) {
                newQueryName = $rootScope.GlobalQueryNames[j].QueryName;
                if (queryName == newQueryName) {
                    document.getElementById("newNameOfQuery").style.display = 'block';
                    document.getElementById("newNameOfQuery").textContent = "This query name already exists";
                    return;
                }
            }
        }

        var budget = document.getElementById("idFltBudgetCategory");
        var budgetName = budget.options[budget.selectedIndex].text;

        if ($("#idFltSpInt").val().startsWith("? object:null ?")) {
            $("#idFltSpInt").val(null);
        }
        if ($("#idFltenManualStatus").val().startsWith("? object:null ?")) {
            $("#idFltenManualStatus").val(null);
        }
        if ($("#idFltBudgetValue").val().startsWith("? object:null ?")) {
            $("#idFltBudgetValue").val(null);
        }
        //if ($("#idFltUser").val().startsWith("? object:null ?")) {
        //    $("#idFltUser").val(null);
        //}
        if ($("#idFltCountry").val().startsWith("? object:null ?")) {
            $("#idFltCountry").val(null);
        }

        var queryDetails = {
            QueryName: queryName,
            UserQueryId: userQueryId,
            user: $rootScope.glbMainUserID,
            enCode: $("#idFltEnCode").val(),
            usFullName: $scope.CurrentQueryObject.usFullName != null ? $scope.CurrentQueryObject.usFullName.toString() : null,// $("#idFltUser").val(),
            enEDSpecialInterest: $("#idFltSpInt").val(),
            enEDDateAddedFrom: $("#idFltAddedDateFrom").val(),
            enEDDateAddedTo: $("#idFltAddedDateTo").val(),
            enNewStatus: $("#idFltProgressNew:checked").val(),
            enAssignedStatus: $("#idFltProgressAssigned:checked").val(),
            enActionedStatus: $("#idFltProgressActioned:checked").val(),
            enClosedStatus: $("#idFltProgressClosed:checked").val(),
            enPossibleDuplicatesStatus: $("#idFltProgressPossibleDuplicates:checked").val(),
            enActionRequiredStatus: $("#idFltProgressActionRequired:checked").val(),
            coName: $("#idFltCountry").val(),
            enEDCountryCode: $("#idFltCountry").val(),
            ciDescription: $("#idFltCity").val(),
            correctedCiDescription: $("#idFltCorrectedCity").val(),
            enEDBudgetCategoryCode: budgetName,
            enEDBudgetAmountFrom: $("#idFltBudgetAmountFrom").val(),
            enEDBudgetAmountTo: $("#idFltBudgetAmountTo").val(),
            enEDDateOfArrivalFrom: $("#idFltArrivalDateFrom").val(),
            enEDDateOfArrivalTo: $("#idFltArrivalDateTo").val(),
            enEDDepartureDateFrom: $("#idFltDepartureDateFrom").val(),
            enEDDepartureDateTo: $("#idFltDepartureDateTo").val(),
            enEDDateClosedFrom: $("#idFltDateClosedFrom").val(),
            enEDDateClosedTo: $("#idFltDateClosedTo").val(),
            enEDNights: $("#idFltNightsFrom").val(),
            enEDNightsTo: $("#idFltNightsTo").val(),
            enClientName: $("#idFltClient").val(),
            enCDCompanyName: $scope.CurrentQueryObject.enCDCompanyName != null ? $scope.CurrentQueryObject.enCDCompanyName.toString() : null,//$("#idFltCompany").val(),
            enFullName: $("#idFltLeadName").val(),
            enEDSourceCode: $scope.CurrentQueryObject.enEDSourceCode != null ? $scope.CurrentQueryObject.enEDSourceCode.toString() : null,// $("#idFltSourceStatus").val(),
            enEDSourceStatus: $("#idFltSourceStatus").val(),
            enCDClientGroup: $scope.CurrentQueryObject.enCDClientGroup != null ? $scope.CurrentQueryObject.enCDClientGroup.toString() : null,//$("#idFltClientGroup").find("option:selected").text(),
            enECDeadReasonCode: $("#idFltDeadReason").find("option:selected").text(),
            enECAvailabilityReason: $("#idFltAvailabilityReason").find("option:selected").text(),
            enManualStatus: $("#idFltenManualStatus").val(),
            enArrivalvalue: $("#idFltArrivalDates").find("option:selected").text(),
            enArrivalDays: $("#idFltArrivaldays").val(),
            enArrivalDate: $("#idFltArrivalDate").val(),
            enDepartureValue: $("#idFltDeparturevalue").find("option:selected").text(),
            enDepartureDays: $("#idFltDeparturedays").val(),
            enDepartureDate: $("#idFltDepartureDate").val(),
            enClosedDateValue: $("#idFltClosedDates").find("option:selected").text(),
            enClosedDate: $("#idFltClosedDate").val(),
            enClosedDays: $("#idFltClosedDays").val(),
            enECLowestOfferedRate: $("#idECLowestOfferedRate").val(),
            enECHighestOfferedRate: $("#idECHighestOfferedRate").val(),
            enECOfferedCurrency: $scope.CurrentQueryObject.enECOfferedCurrency != null ? $scope.CurrentQueryObject.enECOfferedCurrency.toString() : null,
            enDateAddedvalue: $("#idFltDateAddedvalue").find("option:selected").text(),
            enDateAddedDays: $("#idFltDateAddedDays").val(),
            enDateAddedDate: $("#idFltDateAddedDate").val(),
            propertyName: $("#idFltPropertyName").val(),
            privateNotes: $("#idFltPrivateNotes").val(),
            enEDBudgetValue: $("#idFltBudgetValue").val(),
            enEDBudgetAmount: $("#idFltBudgetAmount").val(),
            enEDRMC: $("#idTmcType").val(),
            enEmployeeID: $("#id_EmployeeId").val()
        }
        console.log(queryDetails);
        enquiriesDashboardFactory.SaveQueryDetails(queryDetails)
            .success(function (query) {
                var queryId = query;
                console.log('Save query success.');
                console.log($rootScope.ColumnsSelected);
                console.log($rootScope.ColumnsSorted);
                if ($rootScope.ColumnsSorted == undefined) {
                    $rootScope.ColumnsSorted = false;
                }
                if ($rootScope.ColumnsSelected != undefined || $rootScope.ColumnsSelected !== "") {
                    enquiriesDashboardFactory.DeleteAndInsertColumnsByQueryId($rootScope.glbMainUserID, queryId, $rootScope.ColumnsSelected, $rootScope.ColumnsSorted)
                        .success(function () {
                            console.log('DeleteAndInsertColumnsByQueryId Success');
                            $("#update-Query").modal('hide');
                            logger.info('Your query has been updated successfully');
                            $rootScope.ColumnsSorted = false;
                        });
                }
                else {
                    $("#update-Query").modal('hide');
                    logger.info('Your query has been updated successfully');
                }
            });
    }

    $rootScope.RefreshQueries = function () {
        getIndividualQueries($rootScope.glbMainUserID);
        getGlobalQueries();
        getExternalReportQueries();
        getReservationsReportQueries();
        getSalesReportQueries();
        getSupplyReportQueries();
        getReportingQueries();
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

    function getIndividualQueries() {
        enquiriesDashboardFactory.GetIndividualQueries($rootScope.glbMainUserID)
            .success(function (queries) {
                console.log('Get individual query success');
                $rootScope.IndividualQueryNames = queries;
                console.log($rootScope.IndividualQueryNames);
            });
    }

    $rootScope.resetAllFields = function () {
        $("#idFltSpInt").select2("val", 0);
        $("#idFltUser").select2("val", 0);
        $("#idFltCountry").select2("val", 0);
        $("#idFltCity").select2("val", 0);
        $("#idFltCorrectedCity").select2("val", 0);
        $("#idFltBudgetCategory").select2("val", 0);
        $("#idFltClientGroup").select2("val", 0);
        $("#idFltAvailabilityReason").select2("val", 0);
        $("#idFltDeadReason").select2("val", 0);
        $("#idFltSource").select2("val", 0);
        $("#idFltenManualStatus").select2("val", 0);
        if ($rootScope.Users != undefined) {
            $rootScope.Users.some(function (user) {
                // ReSharper disable once ClosureOnModifiedVariable
                user["ticked"] = false;

            });
        }
        if ($rootScope.clientGroupsdata != undefined) {
            $rootScope.clientGroupsdata.some(function (group) {
                // ReSharper disable once ClosureOnModifiedVariable
                group["ticked"] = false;

            });
        }
        if ($rootScope.EnqSourcesdata != undefined) {
            $rootScope.EnqSourcesdata.some(function (source) {
                // ReSharper disable once ClosureOnModifiedVariable
                source["ticked"] = false;
            });
        }
        //if ($rootScope.clientcomapniesdata != undefined) {
        //    $rootScope.clientcomapniesdata.some(function (company) {
        //        // ReSharper disable once ClosureOnModifiedVariable
        //        company["ticked"] = false;
        //    });
        //}
        resetColumns();
        //$rootScope.refreshData();
    }

    $rootScope.DeleteQuery = function (userQueryId) {
        $('#deletequery').modal('show');
        $rootScope.DeleteSelectedQuery = userQueryId;
    }

    $rootScope.DeleteSelectedUserQuery = function (userQuery) {
        console.log(userQuery);
        enquiriesDashboardFactory.DeleteQuery(userQuery)
            .success(function (queryName) {
                console.log(queryName);
                //Google Analytics 
                ga('send', 'event', 'Queries', 'Deleted the Query', 'of Query Name "' + queryName + '"' + ' by ' + $rootScope.glbMainUserID);
                console.log('Delete query success.');
                logger.info('Your query has been deleted successfully');
            });
    }

    $("#idFltPropertyName").focus(function () {
        $rootScope.autoPropertySelect = false;
    });
    $("#autoSelectDiv").focus(function () {
        $rootScope.autoPropertySelect = false;
    });

    $rootScope.SelectedPropertyName = function (propertyName) {
        chosenPropertiesFactory.getPropertyInformation(propertyName)
            .success(function (detailsOfProperty) {
                $rootScope.propertyDetails = detailsOfProperty;
                console.log($rootScope.propertyDetails);
                $rootScope.autoPropertySelect = false;
            });
    }

    $rootScope.SelectedProperty = function () {
        $rootScope.autoPropertySelect = true;
    }

    $rootScope.AutopopulateQueryInTable = function (queryId, queryType) {
        if (queryId == 0) {
            $location.path('home');
        }
        usersFactory.getSelectedUserRole($rootScope.glbMainUserID)
            .success(function (userRole) {
                $scope.SelectedUserRole = angular.fromJson(userRole);
                console.log($scope.SelectedUserRole);
                console.log(queryType);
                if (queryType == "Personal") {
                    $("#id_DeleteQuery").show();
                }
                else if (($scope.SelectedUserRole == "Admin" || $scope.SelectedUserRole == "SuperAdmin" || $scope.SelectedUserRole == "Manager") && (queryType == "Global")) {
                    $("#id_DeleteQuery").show();
                }
                else if (MakeEmptyStringWhenNull(queryType) != "" && queryType.indexOf("Report") != -1) {
                    $("#id_DeleteQuery").show();
                }
                else {
                    $("#id_DeleteQuery").hide();
                }
                console.log("queryId: " + queryId);
                runQuery(queryId, false);
            });
    }

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
        else if (value == -1) {
            value = "";
        }
        else {
            value = value;
        }
        return value;
    }

    function clearQueryFields() {
        if ($rootScope.Users != undefined) {
            $rootScope.Users.some(function (user) {
                // ReSharper disable once ClosureOnModifiedVariable
                user["ticked"] = false;

            });
        }
        if ($rootScope.clientGroupsdata != undefined) {
            $rootScope.clientGroupsdata.some(function (group) {
                // ReSharper disable once ClosureOnModifiedVariable
                group["ticked"] = false;

            });
        }
        if ($rootScope.EnqSourcesdata != undefined) {
            $rootScope.EnqSourcesdata.some(function (source) {
                // ReSharper disable once ClosureOnModifiedVariable
                source["ticked"] = false;
            });
        }
        //if ($rootScope.clientcomapniesdata != undefined) {
        //    $rootScope.clientcomapniesdata.some(function (company) {
        //        // ReSharper disable once ClosureOnModifiedVariable
        //        company["ticked"] = false;
        //    });
        //}
        enquiriesDashboardFactory.GetQueryDetailsByName(-1, $rootScope.glbMainUserID)
            .success(function (currentQueryReturned) {
                console.log(currentQueryReturned);
                console.log('Get AutopopulateQueryInTable success');
                enquiriesDashboardFactory.getSelectedColumns(-1)
                    .success(function (selectedColumns) {
                        console.log(selectedColumns);
                        console.log('getSelectedColumns success ');
                        resetColumns(angular.fromJson(selectedColumns));
                        $rootScope.CurrentQueryObject = currentQueryReturned;
                        console.log('Current Query Object');
                        console.log($rootScope.CurrentQueryObject);
                        $rootScope.CurrentQueryName = $rootScope.CurrentQueryObject.QueryName;
                        $rootScope.UserQueryId = $rootScope.CurrentQueryObject.UserQueryId;
                        console.log("selected column names.");
                        console.log($rootScope.ColumnsSelected);
                    });
            });
    }

    function getUserClientGroup() {
        var selectedUserInDropdown = $("#idgblBuddyUser").val();
        enquiriesDashboardFactory.getUserClientGroup(selectedUserInDropdown)
            .success(function (userClientGroup) {
                $rootScope.userClientGroup = userClientGroup;
                if ($rootScope.userClientGroup == "") {
                    $rootScope.userClientGroup = "Do Not Return";
                }
                console.log($rootScope.userClientGroup);
            });
    }

    function runQuery(userQueryId, isActionRequiredQuery) {
        if ($rootScope.Users != undefined) {
            $rootScope.Users.some(function (user) {
                // ReSharper disable once ClosureOnModifiedVariable
                user["ticked"] = false;

            });
        }
        if ($rootScope.clientGroupsdata != undefined) {
            $rootScope.clientGroupsdata.some(function (group) {
                // ReSharper disable once ClosureOnModifiedVariable
                group["ticked"] = false;

            });
        }
        if ($rootScope.EnqSourcesdata != undefined) {
            $rootScope.EnqSourcesdata.some(function (source) {
                // ReSharper disable once ClosureOnModifiedVariable
                source["ticked"] = false;
            });
        }
        //if ($rootScope.clientcomapniesdata != undefined) {
        //    $rootScope.clientcomapniesdata.some(function (company) {
        //        // ReSharper disable once ClosureOnModifiedVariable
        //        company["ticked"] = false;
        //    });
        //}
        enquiriesDashboardFactory.GetQueryDetailsByName(userQueryId, $rootScope.glbMainUserID)
            .success(function (currentQueryReturned) {  
                console.log(currentQueryReturned);
                console.log('Get AutopopulateQueryInTable success');
                if (userQueryId == 0) {
                    userQueryId = currentQueryReturned.UserQueryId;
                }
                enquiriesDashboardFactory.getSelectedColumns(userQueryId)
                    .success(function (selectedColumns) {
                        console.log(selectedColumns);
                        console.log('getSelectedColumns success ');
                        resetColumns(angular.fromJson(selectedColumns));
                        $rootScope.CurrentQueryObject = currentQueryReturned;
                        console.log('Current Query Object');
                        console.log($rootScope.CurrentQueryObject);
                        $rootScope.CurrentQueryName = $rootScope.CurrentQueryObject.QueryName;
                        console.log($rootScope.CurrentQueryName);

                        var newStatus = $rootScope.CurrentQueryObject.enNewStatus;
                        var assignedStatus = $rootScope.CurrentQueryObject.enAssignedStatus;
                        var actionedStatus = $rootScope.CurrentQueryObject.enActionedStatus;
                        var actionRequiredStatus = $rootScope.CurrentQueryObject.enActionRequiredStatus;
                        var closedStatus = $rootScope.CurrentQueryObject.enClosedStatus;
                        var possibleDuplicatesStatus = $rootScope.CurrentQueryObject.enPossibleDuplicatesStatus;

                        console.log("New: " + $rootScope.CurrentQueryObject.enNewStatus);
                        console.log("Assigned: " + $rootScope.CurrentQueryObject.enAssignedStatus);
                        console.log("Actioned: " + $rootScope.CurrentQueryObject.enActionedStatus);
                        console.log("Action Required:" + $rootScope.CurrentQueryObject.enActionRequiredStatus);
                        console.log("Closed:" + $rootScope.CurrentQueryObject.enClosedStatus);
                        console.log("Possible Duplicates:" + $rootScope.CurrentQueryObject.enPossibleDuplicatesStatus);

                        if (newStatus == undefined && assignedStatus == undefined
                            && actionedStatus == undefined && actionRequiredStatus == undefined && possibleDuplicatesStatus == undefined
                            && closedStatus == undefined && $rootScope.CurrentQueryObject.enManualStatus != "Closed") {
                            newStatus = true;
                            assignedStatus = true;
                            actionedStatus = true;
                            actionRequiredStatus = true;
                            possibleDuplicatesStatus = true;
                        }

                        if ($rootScope.CurrentQueryName == "All enquiries") {
                            $("#id_DeleteQuery").hide();
                            $("#id_AdvancedSearchLink").hide();
                            $("#id_AdvancedSearchDivider").hide();
                        }
                        else {
                            $("#id_AdvancedSearchLink").show();
                            $("#id_AdvancedSearchDivider").show();
                        }

                        $rootScope.QueryNameInDashboard = $rootScope.CurrentQueryObject.QueryName;
                        $rootScope.UserQueryId = $rootScope.CurrentQueryObject.UserQueryId;
                        console.log($rootScope.QueryNameInDashboard);
                        console.log("selected column names.");
                        console.log($rootScope.ColumnsSelected);
                        console.log($("#idgblBuddyUser").val());
                        var userInDropdown = $("#idgblBuddyUser").val();
                        console.log(userInDropdown);
                        usersFactory.getSelectedUserRole(userInDropdown)
                            .then(function (userRole) {
                                $scope.SelectedUserRole = angular.fromJson(userRole.data);
                                $rootScope.UserRole = $scope.SelectedUserRole;
                                console.log($scope.SelectedUserRole);
                                console.log($rootScope.CurrentQueryObject.QueryType);
                                console.log($rootScope.glbMainUserID);
                                usersFactory.getSelectedUserRole($rootScope.glbMainUserID)
                                    .then(function (loggedUserRole) {
                                        var loggedInUserRole = angular.fromJson(loggedUserRole.data);
                                        console.log(loggedInUserRole);
                                        console.log("$rootScope.CurrentQueryObject");
                                        console.log($rootScope.CurrentQueryObject);
                                        console.log($rootScope.CurrentQueryObject.QueryType);
                                        if (MakeEmptyStringWhenNull($rootScope.CurrentQueryObject.QueryType) != "" && ($rootScope.CurrentQueryObject.QueryType == "Global" || $rootScope.CurrentQueryObject.QueryType.indexOf("Report") != -1)) {
                                            if ((loggedInUserRole == "SuperAdmin" || loggedInUserRole == "Admin" || loggedInUserRole == "Manager" || loggedInUserRole == "Senior Manager")) {
                                                $("#saveQueryOfPV_EnquiriesDashboard").show();
                                            }
                                            else {
                                                $("#saveQueryOfPV_EnquiriesDashboard").hide();
                                            }
                                        }
                                        else {
                                            $("#saveQueryOfPV_EnquiriesDashboard").show();
                                        }
                                    })
                                if ($scope.SelectedUserRole == "Resteam" || $scope.SelectedUserRole == "Home User" || $scope.SelectedUserRole == "Client User") {
                                    $rootScope.CurrentQueryObject.usFullName = userInDropdown;
                                }
                                if ($scope.SelectedUserRole == "Client Manager") {
                                    $rootScope.CurrentQueryObject.enCDClientGroup = $rootScope.userClientGroup;
                                }

                                var user = $rootScope.CurrentQueryObject.usFullName;
                                if (user == "*Me*") {
                                    user = $rootScope.glbMainUserID;
                                }

                                if ($rootScope.CurrentQueryObject.enEDSourceStatus == true) {
                                    $rootScope.CurrentQueryObject.enEDSourceStatus = "true";
                                }
                                else if ($rootScope.CurrentQueryObject.enEDSourceStatus == false) {
                                    $rootScope.CurrentQueryObject.enEDSourceStatus = "false";
                                }

                                $("#idFltPropertyName").val($rootScope.CurrentQueryObject.propertyName);
                                console.log($("#idFltPropertyName").val($rootScope.CurrentQueryObject.propertyName));
                                // $scope.CurrentQueryObject.usFullName = "TEST,Gayu Test";
                                $scope.CurrentQueryObject.usFullName = $rootScope.CurrentQueryObject.usFullName != null ? $rootScope.CurrentQueryObject.usFullName.split(',') : null;// ["TEST", "Gayu Test"];
                                $scope.CurrentQueryObject.enCDClientGroup = $rootScope.CurrentQueryObject.enCDClientGroupDescription != null ? $rootScope.CurrentQueryObject.enCDClientGroupDescription.split(',') : null;// ["5", "55"];
                                $scope.CurrentQueryObject.enEDSourceCode = $rootScope.CurrentQueryObject.enEDSourceCode != null ? $rootScope.CurrentQueryObject.enEDSourceCode.split(',') : null;// ["0000", "Roomspace"];

                                $scope.selectedgroups = $rootScope.CurrentQueryObject.enCDClientGroup;
                                if ($scope.selectedgroups != null) {
                                    for (var i = 0; i < $scope.selectedgroups.length; i++) {
                                        console.log("i value" + i);
                                        console.log($scope.selectedgroups[i]);
                                        var userObj = $scope.selectedgroups[i];
                                        $rootScope.clientGroupsdata.some(function (group) {
                                            // ReSharper disable once ClosureOnModifiedVariable
                                            if (group.cgCode == userObj) {
                                                group["ticked"] = true;
                                            }
                                        });
                                    }
                                }

                                $scope.selectedsources = $rootScope.CurrentQueryObject.enEDSourceCode;
                                if ($scope.selectedsources != null) {
                                    for (var i = 0; i < $scope.selectedsources.length; i++) {
                                        console.log("i value" + i);
                                        console.log($scope.selectedsources[i]);
                                        var userObj = $scope.selectedsources[i];
                                        $rootScope.EnqSourcesdata.some(function (source) {
                                            // ReSharper disable once ClosureOnModifiedVariable
                                            if (source.soDescription == userObj) {
                                                source["ticked"] = true;
                                            }
                                        });
                                    }
                                }

                                $scope.selectedusers = $rootScope.CurrentQueryObject.usFullName;
                                if ($scope.selectedusers != null) {
                                    for (var i = 0; i < $scope.selectedusers.length; i++) {
                                        console.log("i value" + i);
                                        console.log($scope.selectedusers[i]);
                                        var userObj = $scope.selectedusers[i];
                                        $rootScope.Users.some(function (user) {
                                            // ReSharper disable once ClosureOnModifiedVariable
                                            if (user.usCode == userObj) {
                                                user["ticked"] = true;
                                            }
                                        });
                                    }
                                }
                                //$scope.selectedcompanies = $rootScope.CurrentQueryObject.enCDCompanyName;
                                //if ($scope.selectedcompanies != null) {
                                //    for (var i = 0; i < $scope.selectedcompanies.length; i++) {
                                //        console.log("i value" + i);
                                //        console.log($scope.selectedcompanies[i]);
                                //        var userObj = $scope.selectedcompanies[i];
                                //        $rootScope.clientcomapniesdata.some(function (company) {
                                //            // ReSharper disable once ClosureOnModifiedVariable
                                //            if (company.ClCompanyName == userObj) {
                                //                company["ticked"] = true;
                                //            }
                                //        });
                                //    }
                                //}


                                var selectedQueryDetails = {
                                    enCode: $rootScope.CurrentQueryObject.enCode,
                                    usFullName: $scope.CurrentQueryObject.usFullName != null
                                        ? $scope.CurrentQueryObject.usFullName.toString()
                                        : null, //user,
                                    enEDSpecialInterest: $rootScope.CurrentQueryObject.enEDSpecialInterest,
                                    enEDDateAddedFrom: $rootScope.CurrentQueryObject.enEDDateAddedFrom,
                                    enEDDateAddedTo: $rootScope.CurrentQueryObject.enEDDateAddedTo,
                                    enNewStatus: newStatus,
                                    enAssignedStatus: assignedStatus,
                                    enActionedStatus: actionedStatus,
                                    enClosedStatus: closedStatus,
                                    enPossibleDuplicatesStatus: possibleDuplicatesStatus,
                                    enActionRequiredStatus: actionRequiredStatus,
                                    enEDCountryCode: $rootScope.CurrentQueryObject.enEDCountryCode,
                                    coName: $rootScope.CurrentQueryObject.coName,
                                    ciDescription: $rootScope.CurrentQueryObject.ciDescription,
                                    correctedCiDescription: $rootScope.CurrentQueryObject.correctedCiDescription,
                                    enEDBudgetCategoryCode: $rootScope.CurrentQueryObject.enEDBudgetCategoryCode,
                                    enEDBudgetAmountFrom: $rootScope.CurrentQueryObject.enEDBudgetAmountFrom,
                                    enEDBudgetAmountTo: $rootScope.CurrentQueryObject.enEDBudgetAmountTo,
                                    enEDDateOfArrivalFrom: $rootScope.CurrentQueryObject.enEDDateOfArrivalFrom,
                                    enEDDateOfArrivalTo: $rootScope.CurrentQueryObject.enEDDateOfArrivalTo,
                                    enEDDepartureDateFrom: $rootScope.CurrentQueryObject.enEDDepartureDateFrom,
                                    enEDDepartureDateTo: $rootScope.CurrentQueryObject.enEDDepartureDateTo,
                                    enEDDateClosedFrom: $rootScope.CurrentQueryObject.enEDDateClosedFrom,
                                    enEDDateClosedTo: $rootScope.CurrentQueryObject.enEDDateClosedTo,
                                    enEDNights: $rootScope.CurrentQueryObject.enEDNightsFrom,
                                    enEDNightsTo: $rootScope.CurrentQueryObject.enEDNightsTo,
                                    enClientName: $rootScope.CurrentQueryObject.enClientName,
                                    enCDCompanyName: $rootScope.CurrentQueryObject.enCDCompanyName,
                                    enFullName: $rootScope.CurrentQueryObject.enEDLeadPassengerName,
                                    enEDSourceCode: $rootScope.CurrentQueryObject.enEDSourceCode != null
                                        ? $rootScope.CurrentQueryObject.enEDSourceCode.toString()
                                        : null,
                                    enEDSourceStatus: $rootScope.CurrentQueryObject.enEDSourceStatus,
                                    enCDClientGroup: $rootScope.CurrentQueryObject.enCDClientGroup != null
                                        ? $rootScope.CurrentQueryObject.enCDClientGroup.toString()
                                        : null,
                                    enECDeadReasonCode: $rootScope.CurrentQueryObject.enECDeadReasonCode,
                                    enCDEmailAddress: $rootScope.CurrentQueryObject.enCDEmailAddress,
                                    enManualStatus: $rootScope.CurrentQueryObject.enManualStatus,
                                    enBuddy: null,
                                    enArrivalvalue: $rootScope.CurrentQueryObject.enArrivalValue,
                                    enArrivalDays: $rootScope.CurrentQueryObject.enArrivalDays,
                                    enArrivalDate: $rootScope.CurrentQueryObject.enArrivalDate,
                                    enDepartureValue: $rootScope.CurrentQueryObject.enDepartureValue,
                                    enDepartureDays: $rootScope.CurrentQueryObject.enDepartureDays,
                                    enDepartureDate: $rootScope.CurrentQueryObject.enDepartureDate,
                                    enClosedDateValue: $rootScope.CurrentQueryObject.enClosedDateValue,
                                    enClosedDays: $rootScope.CurrentQueryObject.enClosedDays,
                                    enClosedDate: $rootScope.CurrentQueryObject.enClosedDate,
                                    enDateAddedvalue: $rootScope.CurrentQueryObject.enDateAddedvalue,
                                    enDateAddedDays: $rootScope.CurrentQueryObject.enDateAddedDays,
                                    enDateAddedDate: $rootScope.CurrentQueryObject.enDateAddedDate,
                                    propertyName: $rootScope.CurrentQueryObject.propertyName,
                                    privateNotes: $rootScope.CurrentQueryObject.privateNotes,
                                    enEDBudgetValue: $rootScope.CurrentQueryObject.enEDBudgetValue,
                                    enEDBudgetAmount: $rootScope.CurrentQueryObject.enEDBudgetAmount,
                                    isActionRequiredQuery: isActionRequiredQuery,
                                    enECAvailabilityReason: $rootScope.CurrentQueryObject.enECAvailabilityReason,
                                    enEDRMC: $rootScope.CurrentQueryObject.enEDRMC,
                                    enEmployeeID: $rootScope.CurrentQueryObject.enEmployeeID,
                                    enSfBudgetAmount: $rootScope.CurrentQueryObject.enSfBudgetAmount,    
                                    enSfAssigneeOfficeAddress: $rootScope.CurrentQueryObject.enSfAssigneeOfficeAddress,
                                    enSfInvoiceAddress: $rootScope.CurrentQueryObject.enSfInvoiceAddress,
                                    enSfInvoiceEmail: $rootScope.CurrentQueryObject.enSfInvoiceEmail,
                                    enSfOfficeAddress: $rootScope.CurrentQueryObject.enSfOfficeAddress,
                                    enECOfferedCurrency: $rootScope.CurrentQueryObject.enECOfferedCurrency,
                                    enECLowestOfferedRate: $rootScope.CurrentQueryObject.enECLowestOfferedRate,
                                    enECHighestOfferedRate: $rootScope.CurrentQueryObject.enECHighestOfferedRate
                                }
                                console.log("selectedQueryDetails");
                                console.log(selectedQueryDetails);
                                if ($rootScope.CurrentQueryObject.enEDBudgetValue == "is" || $rootScope.CurrentQueryObject.enEDBudgetValue == ">=" || $rootScope.CurrentQueryObject.enEDBudgetValue == "<=") {
                                    $rootScope.SingleCurrency = true;
                                }
                                if ($rootScope.CurrentQueryObject.enEDBudgetValue == "between") {
                                    $rootScope.DoubleCurrency = true;
                                }
                                if ($rootScope.CurrentQueryObject.enArrivalValue == "is" || $rootScope.CurrentQueryObject.enArrivalValue == ">=" || $rootScope.CurrentQueryObject.enArrivalValue == "<=") {
                                    $rootScope.ArrivalSingleDatePicker = true;
                                }
                                if ($rootScope.CurrentQueryObject.enArrivalValue == "between") {
                                    $rootScope.ArrivalDoubleDatePicker = true;
                                }
                                if ($rootScope.CurrentQueryObject.enArrivalValue == "less than days ago" || $rootScope.CurrentQueryObject.enArrivalValue == "more than days ago" || $rootScope.CurrentQueryObject.enArrivalValue == "in the past" || $rootScope.CurrentQueryObject.enArrivalValue == "days ago") {
                                    $rootScope.EditableArrivalTextbox = true;
                                }
                                if ($rootScope.CurrentQueryObject.enDepartureValue == "is" || $rootScope.CurrentQueryObject.enDepartureValue == ">=" || $rootScope.CurrentQueryObject.enDepartureValue == "<=") {
                                    $rootScope.DepartureSingleDatePicker = true;
                                }
                                if ($rootScope.CurrentQueryObject.enDepartureValue == "between") {
                                    $rootScope.DepartureDoubleDatePicker = true;
                                }
                                if ($rootScope.CurrentQueryObject.enDepartureValue == "less than days ago" || $rootScope.CurrentQueryObject.enDepartureValue == "more than days ago" || $rootScope.CurrentQueryObject.enDepartureValue == "in the past" || $rootScope.CurrentQueryObject.enDepartureValue == "days ago") {
                                    $rootScope.EditableDepartureTextbox = true;
                                }
                                if ($rootScope.CurrentQueryObject.enClosedDateValue == "is" || $rootScope.CurrentQueryObject.enClosedDateValue == ">=" || $rootScope.CurrentQueryObject.enClosedDateValue == "<=") {
                                    $rootScope.DateClosedSingleDatePicker = true;
                                }
                                if ($rootScope.CurrentQueryObject.enClosedDateValue == "between") {
                                    $rootScope.DateClosedDoubleDatePicker = true;
                                }
                                if ($rootScope.CurrentQueryObject.enClosedDateValue == "less than days ago" || $rootScope.CurrentQueryObject.enClosedDateValue == "more than days ago" || $rootScope.CurrentQueryObject.enClosedDateValue == "in the past" || $rootScope.CurrentQueryObject.enClosedDateValue == "days ago") {
                                    $rootScope.EditableDateClosedTextbox = true;
                                }

                                if ($rootScope.CurrentQueryObject.enDateAddedvalue == "is" || $rootScope.CurrentQueryObject.enDateAddedvalue == ">=" || $rootScope.CurrentQueryObject.enDateAddedvalue == "<=") {
                                    $rootScope.DateAddedSingleDatepicker = true;
                                }
                                if ($rootScope.CurrentQueryObject.enDateAddedvalue == "between") {
                                    $rootScope.DateAddedDoubleDatePicker = true;
                                }
                                if ($rootScope.CurrentQueryObject.enDateAddedvalue == "less than days ago" || $rootScope.CurrentQueryObject.enDateAddedvalue == "more than days ago" || $rootScope.CurrentQueryObject.enDateAddedvalue == "in the past" || $rootScope.CurrentQueryObject.enDateAddedvalue == "days ago") {
                                    $rootScope.EditableDateAddedTextbox = true;
                                }
                                if (userQueryId == 0 || $rootScope.CurrentQueryObject.QueryName == "All enquiries") {
                                    renderAngularDataTable(selectedQueryDetails, false, 'runQuery');
                                }
                                else {
                                    renderAngularDataTable(selectedQueryDetails, false, 'populateQuery');
                                }

                            });
                    });
            });
    }

    $rootScope.refreshData = function () {
        $rootScope.ArrivalSingleDatePicker = false;
        $rootScope.ArrivalDoubleDatePicker = false;
        $rootScope.EditableArrivalTextbox = false;
        $rootScope.DepartureSingleDatePicker = false;
        $rootScope.DepartureDoubleDatePicker = false;
        $rootScope.EditableDepartureTextbox = false;
        $rootScope.DateAddedSingleDatepicker = false;
        $rootScope.DateAddedDoubleDatePicker = false;
        $rootScope.DateClosedSingleDatePicker = false;
        $rootScope.DateClosedDoubleDatePicker = false;
        $rootScope.EditableDateClosedTextbox = false;
        $rootScope.DateAddedSingleDatepicker = false;
        $rootScope.DateAddedDoubleDatePicker = false;
        $rootScope.EditableDateAddedTextbox = false;
    }
    function SetColumnWidth(length) {
        console.log(length);
        if (length > 0 && length < 6) {
            $("#tblWidth").addClass("tblFive");
        }
        else if (length == 6) {
            $("#tblWidth").addClass("tblSix");
        }
        else if (length == 7) {
            $("#tblWidth").addClass("tblSeven");
        }
        else if (length == 8) {
            $("#tblWidth").addClass("tblEight");
        }
        else if (length == 9) {
            $("#tblWidth").addClass("tblNine");
        }
        else if (length == 10) {
            $("#tblWidth").addClass("tblTen");
        }
        else if (length == 11) {
            $("#tblWidth").addClass("tblEleven");
        }
        else if (length == 12) {
            $("#tblWidth").addClass("tblTwelve");
        }
        else if (length == 13) {
            $("#tblWidth").addClass("tblTwelve");
        }
        else {
            $("#tblWidth").addClass("tblTotal");
        }
    }

    $rootScope.getQueryId = function (queryName) {
        var queryName = queryName;
        enquiriesDashboardFactory.getQueryId(queryName)
            .success(function (queryId) {
                if (queryName == "$Action Required$") {
                    runQuery(queryId, true);
                } else {
                    runQuery(queryId, false);
                }

            });
    }

    function renderAngularDataTable(selectedQueryDetails, isdefault, source) {
        console.log($rootScope.UserRole);
        console.log(source);
        console.log('render Angular Data Table');
        console.log(selectedQueryDetails);
        console.log('columns selected');
        console.log($rootScope.ColumnsSelected);
        $("#tblForFixSize").removeClass();
        $("#tblWidth").removeClass();
        $("#tblWidth").addClass("table table-bordered row-border hover");
        SetColumnWidth($rootScope.ColumnsSelected.length);
        var columnsArray = [];

        if ($rootScope.ColumnsSelected.length > 0) {
            
            console.log($rootScope.ColumnsSelected);
            for (var i = 0; i < $rootScope.ColumnsSelected.length; i++) {
                if ($rootScope.ColumnsSelected[i] == 'enCode') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCode')) {
                        columnsArray.push(dtColumnBuilder.newColumn(null).withTitle("Enq #").renderWith(disCheckedHtmlEnqRef).notSortable().withOption('name', 'enCode'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'usFullName') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'usFullName')) {
                        columnsArray.push(dtColumnBuilder.newColumn('usFullName', "User").withOption('name', 'usFullName'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enClientName') {
                    if ($rootScope.ColumnsSelected[i] == 'enClientName') {
                        if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enClientName')) {
                            columnsArray.push(dtColumnBuilder.newColumn("enClientName", "Client").withOption('name', 'enClientName'));
                        }
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enFullName') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enFullName')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enFullName", "Lead").withOption('name', 'enFullName'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'coName') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'coName')) {
                        columnsArray.push(dtColumnBuilder.newColumn("coName", "Country").withOption('name', 'coName'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'ciDescription') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'ciDescription')) {
                        columnsArray.push(dtColumnBuilder.newColumn("ciDescription", "City").withOption('name', 'ciDescription'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'correctedCiDescription') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'correctedCiDescription')) {
                        columnsArray.push(dtColumnBuilder.newColumn("correctedCiDescription", "Corrected City").notSortable().withOption('name', 'correctedCiDescription'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enEDDateOfArrival') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDDateOfArrival')) {
                        columnsArray.push(dtColumnBuilder.newColumn("disDateOfArrival", "ArrivalDate").withOption('name', 'disDateOfArrival'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enEDDepartureDate') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDDepartureDate')) {
                        columnsArray.push(dtColumnBuilder.newColumn("disDepartureDate", "DepartureDate").withOption('name', 'disDepartureDate'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enSfAssigneeOfficeAddress') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enSfAssigneeOfficeAddress')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enSfAssigneeOfficeAddress", "Santafe Assignee Office Address").withOption('name', 'enSfAssigneeOfficeAddress'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enSfBudgetAmount') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enSfBudgetAmount')) {                        
                        columnsArray.push(dtColumnBuilder.newColumn("enSfBudgetAmount", "Santafe Budget Amount").notSortable().withOption('name', 'enSfBudgetAmount'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enSfInvoiceAddress') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enSfInvoiceAddress')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enSfInvoiceAddress", "Santafe Invoice Address").withOption('name', 'enSfInvoiceAddress'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enSfInvoiceEmail') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enSfInvoiceEmail')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enSfInvoiceEmail", "Santafe Invoice Email").withOption('name', 'enSfInvoiceEmail'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enSfOfficeAddress') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enSfOfficeAddress')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enSfOfficeAddress", "Santafe Office Address").withOption('name', 'enSfOfficeAddress'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enEDDateAdded') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDDateAdded')) {
                        columnsArray.push(dtColumnBuilder.newColumn("disDateAdded", "DateAdded").withOption('name', 'disDateAdded'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enEDDateNextAction') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDDateNextAction')) {
                        columnsArray.push(dtColumnBuilder.newColumn("disNextAction", "NextAction").withOption('name', 'disNextAction'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enEDDateLastAction') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDDateLastAction')) {
                        columnsArray.push(dtColumnBuilder.newColumn("disDateLastAction", "LastAction").withOption('name', 'disDateLastAction'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enEDNights') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDNights')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enEDNights", "Nights").withOption('name', 'enEDNights'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enCDCompanyName') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDCompanyName')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enCDCompanyName", "Client Company").withOption('name', 'enCDCompanyName'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enCDEmailAddress') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDEmailAddress')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enCDEmailAddress", " Client Email").withOption('name', 'enCDEmailAddress'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enCDClientGroupName') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDClientGroupName')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enCDClientGroupName", " Client Group").notSortable().withOption('name', 'enCDClientGroupName'));
                    }
                }
                console.log("Source: " + source);
                console.log("$rootScope.UserRole: " + $rootScope.UserRole);
                if ($rootScope.UserRole == "Resteam" || $rootScope.UserRole == "Admin") {
                    if (source == "populateQuery" || source == "btnSearchForRecords") {
                        if ($rootScope.ColumnsSelected[i] == 'enCDFaxNo') {
                            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDFaxNo')) {
                                columnsArray.push(dtColumnBuilder.newColumn("enCDFaxNo", "Client FaxNO").withOption('name', 'enCDFaxNo'));
                            }
                        }
                        if ($rootScope.ColumnsSelected[i] == 'enCDPostCode') {
                            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDPostCode')) {
                                columnsArray.push(dtColumnBuilder.newColumn("enCDPostCode", " Client PostCode").withOption('name', 'enCDPostCode'));
                            }
                        }
                        if ($rootScope.ColumnsSelected[i] == 'enCDAddress1') {
                            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDAddress1')) {
                                columnsArray.push(dtColumnBuilder.newColumn("enCDAddress1", "Client Address1").withOption('name', 'enCDAddress1'));
                            }
                        }
                        if ($rootScope.ColumnsSelected[i] == 'enCDAddress2') {
                            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDAddress2')) {
                                columnsArray.push(dtColumnBuilder.newColumn("enCDAddress2", "Client Address2").withOption('name', 'enCDAddress2'));
                            }
                        }
                        if ($rootScope.ColumnsSelected[i] == 'enCDAddress3') {
                            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDAddress3')) {
                                columnsArray.push(dtColumnBuilder.newColumn("enCDAddress3", "Client Address3").withOption('name', 'enCDAddress3'));
                            }
                        }
                        if ($rootScope.ColumnsSelected[i] == 'enCDAddress4') {
                            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDAddress4')) {
                                columnsArray.push(dtColumnBuilder.newColumn("enCDAddress4", "Client Address4").withOption('name', 'enCDAddress4'));
                            }
                        }
                        if ($rootScope.ColumnsSelected[i] == 'enCDAddress5') {
                            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDAddress5')) {
                                columnsArray.push(dtColumnBuilder.newColumn("enCDAddress5", "Client Address5").withOption('name', 'enCDAddress5'));
                            }
                        }
                    }
                }
                else {
                    if ($rootScope.ColumnsSelected[i] == 'enCDFaxNo') {
                        if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDFaxNo')) {
                            columnsArray.push(dtColumnBuilder.newColumn("enCDFaxNo", "Client FaxNO").withOption('name', 'enCDFaxNo'));
                        }
                    }
                    if ($rootScope.ColumnsSelected[i] == 'enCDPostCode') {
                        if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDPostCode')) {
                            columnsArray.push(dtColumnBuilder.newColumn("enCDPostCode", " Client PostCode").withOption('name', 'enCDPostCode'));
                        }
                    }
                    if ($rootScope.ColumnsSelected[i] == 'enCDAddress1') {
                        if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDAddress1')) {
                            columnsArray.push(dtColumnBuilder.newColumn("enCDAddress1", "Client Address1").withOption('name', 'enCDAddress1'));
                        }
                    }
                    if ($rootScope.ColumnsSelected[i] == 'enCDAddress2') {
                        if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDAddress2')) {
                            columnsArray.push(dtColumnBuilder.newColumn("enCDAddress2", "Client Address2").withOption('name', 'enCDAddress2'));
                        }
                    }
                    if ($rootScope.ColumnsSelected[i] == 'enCDAddress3') {
                        if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDAddress3')) {
                            columnsArray.push(dtColumnBuilder.newColumn("enCDAddress3", "Client Address3").withOption('name', 'enCDAddress3'));
                        }
                    }
                    if ($rootScope.ColumnsSelected[i] == 'enCDAddress4') {
                        if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDAddress4')) {
                            columnsArray.push(dtColumnBuilder.newColumn("enCDAddress4", "Client Address4").withOption('name', 'enCDAddress4'));
                        }
                    }
                    if ($rootScope.ColumnsSelected[i] == 'enCDAddress5') {
                        if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDAddress5')) {
                            columnsArray.push(dtColumnBuilder.newColumn("enCDAddress5", "Client Address5").withOption('name', 'enCDAddress5'));
                        }
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enCDJobTitle') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDJobTitle')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enCDJobTitle", "Client job").withOption('name', 'enCDJobTitle'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enCDTelephone1') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDTelephone1')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enCDTelephone1", "Client Phone").withOption('name', 'enCDTelephone1'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enCDSkype') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDSkype')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enCDSkype", "Client Skype").withOption('name', 'enCDSkype'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enCDTimeZone') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDTimeZone')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enCDTimeZone", "Client TimeZone").withOption('name', 'enCDTimeZone'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enCDCountryName') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDCountryName')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enCDCountryName", "Client Country").withOption('name', 'enCDCountryName'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enCDTASAccountOwner') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDTASAccountOwner')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enCDTASAccountOwner", "Client TAS").withOption('name', 'enCDTASAccountOwner'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enCDGroupContact') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDGroupContact')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enCDGroupContact", "Client GroupContact").withOption('name', 'enCDGroupContact'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enCDNotes') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDNotes')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enCDNotes", "Client Notes").withOption('name', 'enCDNotes'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enEDState') {
                    if ($rootScope.ColumnsSelected.length === 0 ||
                        contains($rootScope.ColumnsSelected, 'enEDState')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enEDState", "County/State").withOption('name', 'enEDState'));
                    }
                }               
                if ($rootScope.ColumnsSelected[i] == 'enTRFirstName') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRFirstName')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enTRFirstName", "Traveller Fname").withOption('name', 'enTRFirstName'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enTRLastName') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRLastName')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enTRLastName", "Traveller Lname").withOption('name', 'enTRLastName'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enTRCompanyName') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRCompanyName')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enTRCompanyName", "Traveller Company").withOption('name', 'enTRCompanyName'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enTRJobTitle') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRJobTitle')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enTRJobTitle", "Traveller Job").withOption('name', 'enTRJobTitle'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enTRClientGroupName') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRClientGroupName')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enTRClientGroupName", " Traveller Group").notSortable().withOption('name', 'enTRClientGroupName'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enTRTelephone1') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRTelephone1')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enTRTelephone1", "Traveller Phone").withOption('name', 'enTRTelephone1'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enTRSkype') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRSkype')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enTRSkype", "Traveller Skype").withOption('name', 'enTRSkype'));
                    }
                }                
                if ($rootScope.ColumnsSelected[i] == 'enECFiveStarRef') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enECFiveStarRef')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enECFiveStarRef", "FiveStar Ref").withOption('name', 'enECFiveStarRef'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enEDBudgetInGBP') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDBudgetInGBP')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enEDBudgetInGBP", "Budget In GBP").notSortable().withOption('name', 'enEDBudgetInGBP'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enEDRMC') {
                    if ($rootScope.ColumnsSelected.length === 0 ||
                        contains($rootScope.ColumnsSelected, 'enEDRMC')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enEDRMC", "TMC/RMC").withOption('name', 'enEDRMC'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enEmployeeID') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEmployeeID')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enEmployeeID", "Employee Id").withOption('name', 'enEmployeeID'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enTRTimeZone') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRTimeZone')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enTRTimeZone", "Traveller TimeZone").withOption('name', 'enTRTimeZone'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enTRCountryName') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRCountryName')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enTRCountryName", "Traveller Country").withOption('name', 'enTRCountryName'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enTRFaxNo') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRFaxNo')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enTRFaxNo", "Traveller Fax").withOption('name', 'enTRFaxNo'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enTREmailAddress') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTREmailAddress')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enTREmailAddress", "Traveller Email").withOption('name', 'enTREmailAddress'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enTRAddress1') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRAddress1')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enTRAddress1", "Traveller Address1").withOption('name', 'enTRAddress1'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enTRAddress2') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRAddress2')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enTRAddress2", "Traveller Address2").withOption('name', 'enTRAddress2'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enTRAddress3') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRAddress3')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enTRAddress3", "Traveller Address3").withOption('name', 'enTRAddress3'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enTRAddress4') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRAddress4')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enTRAddress4", "Traveller Address4").withOption('name', 'enTRAddress4'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enTRAddress5') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRAddress5')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enTRAddress5", "Traveller Address5").withOption('name', 'enTRAddress5'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enTRTASAccountOwner') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRTASAccountOwner')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enTRTASAccountOwner", "Traveller TAS").withOption('name', 'enTRTASAccountOwner'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enTRNotes') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRNotes')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enTRNotes", "Traveller Notes").withOption('name', 'enTRNotes'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'bcDescription') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'bcDescription')) {
                        columnsArray.push(dtColumnBuilder.newColumn("bcDescription", "Budget").withOption('name', 'bcDescription'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'soDescription') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'soDescription')) {
                        columnsArray.push(dtColumnBuilder.newColumn("soDescription", "Source").withOption('name', 'soDescription'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'drReason') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'drReason')) {
                        columnsArray.push(dtColumnBuilder.newColumn("drReason", "Closed Reason").notSortable().withOption('name', 'drReason'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enECCloseDate') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enECCloseDate')) {
                        columnsArray.push(dtColumnBuilder.newColumn("disClosedDate", "Closed Date").notSortable().withOption('name', 'disClosedDate'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enECLowestOfferedRate') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enECLowestOfferedRate')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enECLowestOfferedRate", "Lowest Offered Rate").notSortable().withOption('name', 'enECLowestOfferedRate'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enECHighestOfferedRate') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enECHighestOfferedRate')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enECHighestOfferedRate", "Highest Offered Rate").notSortable().withOption('name', 'enECHighestOfferedRate'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enECOfferedCurrency') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enECOfferedCurrency')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enECOfferedCurrency", "Offered Currency").notSortable().withOption('name', 'enECOfferedCurrency'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enEDNoChildren') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDNoChildren')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enEDNoChildren", "Children").withOption('name', 'enEDNoChildren'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enEDNoAdultPassengers') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDNoAdultPassengers')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enEDNoAdultPassengers", "Adult Passengers").withOption('name', 'enEDNoAdultPassengers'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enEDTotalPassengers') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDTotalPassengers')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enEDTotalPassengers", "Total Guests").withOption('name', 'enEDTotalPassengers'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enEDChildrensAges') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDChildrensAges')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enEDChildrensAges", "Children Ages ").withOption('name', 'enEDChildrensAges'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enEDDoubleBedroom') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDDoubleBedroom')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enEDDoubleBedroom", "Double Bedrooms").withOption('name', 'enEDDoubleBedroom'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enEDTwinBedroom') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDTwinBedroom')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enEDTwinBedroom", "Twin Bedrooms").withOption('name', 'enEDTwinBedroom'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enEDSingleBedroom') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDSingleBedroom')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enEDSingleBedroom", "Single Bedrooms").withOption('name', 'enEDSingleBedroom'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enEDExtraBeds') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDExtraBeds')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enEDExtraBeds", "Extra Beds").withOption('name', 'enEDExtraBeds'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enEDSpecificApartment') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDSpecificApartment')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enEDSpecificApartment", "Specific Apartment").withOption('name', 'enEDSpecificApartment'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'atDescription') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'atDescription')) {
                        columnsArray.push(dtColumnBuilder.newColumn("atDescription", "Apartment Type").notSortable().withOption('name', 'atDescription'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enEDMaxDistance') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDMaxDistance')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enEDMaxDistance", "Max Distance").withOption('name', 'enEDMaxDistance'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enEDDesiredLocationInfo') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDDesiredLocationInfo')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enEDDesiredLocationInfo", "Desired Location").withOption('name', 'enEDDesiredLocationInfo'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enEDTripType') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDTripType')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enEDTripType", "Trip Type").withOption('name', 'enEDTripType'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enEDUserAssigned') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDUserAssigned')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enEDUserAssigned", "User Assigned").withOption('name', 'enEDUserAssigned'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enEDSpecialInterest') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDSpecialInterest')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enEDSpecialInterest", " Special Interest").withOption('name', 'enEDSpecialInterest'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enManualStatus') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enManualStatus')) {
                        columnsArray.push(dtColumnBuilder.newColumn(null).withTitle("Manual status").notSortable().renderWith(manualStatus));

                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enEDTimeOfArrival') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDTimeOfArrival')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enEDTimeOfArrival", " Arrival Time").withOption('name', 'enEDTimeOfArrival'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enEDOrderRef') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDOrderRef')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enEDOrderRef", "Order Ref").withOption('name', 'enEDOrderRef'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enED1FirstName') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enED1FirstName')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enED1FirstName", "Guest1 Fname").withOption('name', 'enED1FirstName'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enED1LastName') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enED1LastName')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enED1LastName", "Guest1 Lname").withOption('name', 'enED1LastName'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enED1Age') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enED1Age')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enED1Age", "Guest1 Age").withOption('name', 'enED1Age'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enED1EmailAddress') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enED1EmailAddress')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enED1EmailAddress", "Guest1 Email").withOption('name', 'enED1EmailAddress'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enED1Relationship') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enED1Relationship')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enED1Relationship", " Guest1 Relation").withOption('name', 'enED1Relationship'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enED2FirstName') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enED2FirstName')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enED2FirstName", "Guest2 Fname").withOption('name', 'enED2FirstName'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enED2LastName') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enED2LastName')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enED2LastName", "Guest2 Lname").withOption('name', 'enED2LastName'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enED2Age') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enED2Age')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enED2Age", "Guest2 Age").withOption('name', 'enED2Age'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enED2EmailAddress') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enED2EmailAddress')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enED2EmailAddress", " Guest2 Email").withOption('name', 'enED2EmailAddress'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enED2Relationship') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enED2Relationship')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enED2Relationship", " Guest2 Relation").withOption('name', 'enED2Relationship'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enEDPreferredContact') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDPreferredContact')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enEDPreferredContact", "Prefered Contact").withOption('name', 'enEDPreferredContact'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'enEDComments') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDComments')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enEDComments", "Special Request Notes").withOption('name', 'enEDComments'));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'disProgressWord') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'disProgressWord')) {
                        columnsArray.push(dtColumnBuilder.newColumn(null).withTitle("Status").withOption('name', 'disProgressWord').renderWith(disCheckedHtml));
                    }
                }
                if ($rootScope.ColumnsSelected[i] == 'disChecked') {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'disChecked')) {
                        columnsArray.push(dtColumnBuilder.newColumn(null).withTitle("Checked").notSortable().renderWith(disCheckedHtmls));
                    }
                }
            }
        }
        else {
            console.log($rootScope.ColumnsSelected.length);
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCode')) {
                columnsArray.push(dtColumnBuilder.newColumn(null).withTitle("Enq #").renderWith(disCheckedHtmlEnqRef).notSortable().withOption('name', 'enCode'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'usFullName')) {
                columnsArray.push(dtColumnBuilder.newColumn('usFullName', "User").withOption('name', 'usFullName'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enClientName')) {
                columnsArray.push(dtColumnBuilder.newColumn("enClientName", "Client").withOption('name', 'enClientName'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enFullName')) {
                columnsArray.push(dtColumnBuilder.newColumn("enFullName", "Lead").withOption('name', 'enFullName'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'coName')) {
                columnsArray.push(dtColumnBuilder.newColumn("coName", "Country").withOption('name', 'coName'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'ciDescription')) {
                columnsArray.push(dtColumnBuilder.newColumn("ciDescription", "City").withOption('name', 'ciDescription'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'correctedCiDescription')) {
                columnsArray.push(dtColumnBuilder.newColumn("correctedCiDescription", "Corrected City").notSortable().withOption('name', 'correctedCiDescription'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDDateOfArrival')) {
                columnsArray.push(dtColumnBuilder.newColumn("disDateOfArrival", "ArrivalDate").withOption('name', 'disDateOfArrival'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDDepartureDate')) {
                columnsArray.push(dtColumnBuilder.newColumn("disDepartureDate", "DepartureDate").withOption('name', 'disDepartureDate'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDDateAdded')) {
                columnsArray.push(dtColumnBuilder.newColumn("disDateAdded", "DateAdded").withOption('name', 'disDateAdded'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDDateNextAction')) {
                columnsArray.push(dtColumnBuilder.newColumn("disNextAction", "NextAction").withOption('name', 'disNextAction'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDDateLastAction')) {
                columnsArray.push(dtColumnBuilder.newColumn("disDateLastAction", "LastAction").withOption('name', 'disDateLastAction'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDNights')) {
                columnsArray.push(dtColumnBuilder.newColumn("enEDNights", "Nights").withOption('name', 'enEDNights'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDCompanyName')) {
                columnsArray.push(dtColumnBuilder.newColumn("enCDCompanyName", "Client Company").withOption('name', 'enCDCompanyName'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDEmailAddress')) {
                columnsArray.push(dtColumnBuilder.newColumn("enCDEmailAddress", " Client Email").withOption('name', 'enCDEmailAddress'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDClientGroupName')) {
                columnsArray.push(dtColumnBuilder.newColumn("enCDClientGroupName", " Client Group").notSortable().withOption('name', 'enCDClientGroupName'));
            }
            console.log("Source: " + source);
            console.log("$rootScope.UserRole: " + $rootScope.UserRole);
            if ($rootScope.UserRole == "Resteam" || $rootScope.UserRole == "Admin") {
                if (source == "populateQuery" || source == "btnSearchForRecords") {
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDFaxNo')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enCDFaxNo", "Client FaxNO").withOption('name', 'enCDFaxNo'));
                    }
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDPostCode')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enCDPostCode", " Client PostCode").withOption('name', 'enCDPostCode'));
                    }
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDAddress1')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enCDAddress1", "Client Address1").withOption('name', 'enCDAddress1'));
                    }
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDAddress2')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enCDAddress2", "Client Address2").withOption('name', 'enCDAddress2'));
                    }
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDAddress3')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enCDAddress3", "Client Address3").withOption('name', 'enCDAddress3'));
                    }
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDAddress4')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enCDAddress4", "Client Address4").withOption('name', 'enCDAddress4'));
                    }
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDAddress5')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enCDAddress5", "Client Address5").withOption('name', 'enCDAddress5'));
                    }
                    if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDAddress5')) {
                        columnsArray.push(dtColumnBuilder.newColumn("enCDAddress5", "Client Address5").withOption('name', 'enCDAddress5'));
                    }
                }
            }
            else {
                if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDFaxNo')) {
                    columnsArray.push(dtColumnBuilder.newColumn("enCDFaxNo", "Client FaxNO").withOption('name', 'enCDFaxNo'));
                }
                if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDPostCode')) {
                    columnsArray.push(dtColumnBuilder.newColumn("enCDPostCode", " Client PostCode").withOption('name', 'enCDPostCode'));
                }
                if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDAddress1')) {
                    columnsArray.push(dtColumnBuilder.newColumn("enCDAddress1", "Client Address1").withOption('name', 'enCDAddress1'));
                }
                if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDAddress2')) {
                    columnsArray.push(dtColumnBuilder.newColumn("enCDAddress2", "Client Address2").withOption('name', 'enCDAddress2'));
                }
                if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDAddress3')) {
                    columnsArray.push(dtColumnBuilder.newColumn("enCDAddress3", "Client Address3").withOption('name', 'enCDAddress3'));
                }
                if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDAddress4')) {
                    columnsArray.push(dtColumnBuilder.newColumn("enCDAddress4", "Client Address4").withOption('name', 'enCDAddress4'));
                }
                if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDAddress5')) {
                    columnsArray.push(dtColumnBuilder.newColumn("enCDAddress5", "Client Address5").withOption('name', 'enCDAddress5'));
                }
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDJobTitle')) {
                columnsArray.push(dtColumnBuilder.newColumn("enCDJobTitle", "Client job").withOption('name', 'enCDJobTitle'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDTelephone1')) {
                columnsArray.push(dtColumnBuilder.newColumn("enCDTelephone1", "Client Phone").withOption('name', 'enCDTelephone1'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDSkype')) {
                columnsArray.push(dtColumnBuilder.newColumn("enCDSkype", "Client Skype").withOption('name', 'enCDSkype'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDTimeZone')) {
                columnsArray.push(dtColumnBuilder.newColumn("enCDTimeZone", "Client TimeZone").withOption('name', 'enCDTimeZone'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDCountryName')) {
                columnsArray.push(dtColumnBuilder.newColumn("enCDCountryName", "Client Country").withOption('name', 'enCDCountryName'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDTASAccountOwner')) {
                columnsArray.push(dtColumnBuilder.newColumn("enCDTASAccountOwner", "Client TAS").withOption('name', 'enCDTASAccountOwner'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDGroupContact')) {
                columnsArray.push(dtColumnBuilder.newColumn("enCDGroupContact", "Client GroupContact").withOption('name', 'enCDGroupContact'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enCDNotes')) {
                columnsArray.push(dtColumnBuilder.newColumn("enCDNotes", "Client Notes").withOption('name', 'enCDNotes'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDState')) {
                columnsArray.push(dtColumnBuilder.newColumn("enEDState", "County/State").withOption('name', 'enEDState'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDRMC')) {
                columnsArray.push(dtColumnBuilder.newColumn("enEDRMC", "TMC/RMC").withOption('name', 'enEDRMC'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEmployeeID')) {
                columnsArray.push(dtColumnBuilder.newColumn("enEmployeeID", "Employee Id").withOption('name', 'enEmployeeID'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRFirstName')) {
                columnsArray.push(dtColumnBuilder.newColumn("enTRFirstName", "Traveller Fname").withOption('name', 'enTRFirstName'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRLastName')) {
                columnsArray.push(dtColumnBuilder.newColumn("enTRLastName", "Traveller Lname").withOption('name', 'enTRLastName'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRCompanyName')) {
                columnsArray.push(dtColumnBuilder.newColumn("enTRCompanyName", "Traveller Company").withOption('name', 'enTRCompanyName'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRJobTitle')) {
                columnsArray.push(dtColumnBuilder.newColumn("enTRJobTitle", "Traveller Job").withOption('name', 'enTRJobTitle'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRClientGroupName')) {
                columnsArray.push(dtColumnBuilder.newColumn("enTRClientGroupName", " Traveller Group").notSortable().withOption('name', 'enTRClientGroupName'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRTelephone1')) {
                columnsArray.push(dtColumnBuilder.newColumn("enTRTelephone1", "Traveller Phone").withOption('name', 'enTRTelephone1'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRSkype')) {
                columnsArray.push(dtColumnBuilder.newColumn("enTRSkype", "Traveller Skype").withOption('name', 'enTRSkype'));
            }            
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enECFiveStarRef')) {
                columnsArray.push(dtColumnBuilder.newColumn("enECFiveStarRef", "FiveStar Ref").withOption('name', 'enECFiveStarRef'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDBudgetInGBP')) {
                columnsArray.push(dtColumnBuilder.newColumn("enEDBudgetInGBP", "Budget In GBP").notSortable().withOption('name', 'enEDBudgetInGBP'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRTimeZone')) {
                columnsArray.push(dtColumnBuilder.newColumn("enTRTimeZone", "Traveller TimeZone").withOption('name', 'enTRTimeZone'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRCountryName')) {
                columnsArray.push(dtColumnBuilder.newColumn("enTRCountryName", "Traveller Country").withOption('name', 'enTRCountryName'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRFaxNo')) {
                columnsArray.push(dtColumnBuilder.newColumn("enTRFaxNo", "Traveller Fax").withOption('name', 'enTRFaxNo'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTREmailAddress')) {
                columnsArray.push(dtColumnBuilder.newColumn("enTREmailAddress", "Traveller Email").withOption('name', 'enTREmailAddress'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRAddress1')) {
                columnsArray.push(dtColumnBuilder.newColumn("enTRAddress1", "Traveller Address1").withOption('name', 'enTRAddress1'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRAddress2')) {
                columnsArray.push(dtColumnBuilder.newColumn("enTRAddress2", "Traveller Address2").withOption('name', 'enTRAddress2'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRAddress3')) {
                columnsArray.push(dtColumnBuilder.newColumn("enTRAddress3", "Traveller Address3").withOption('name', 'enTRAddress3'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRAddress4')) {
                columnsArray.push(dtColumnBuilder.newColumn("enTRAddress4", "Traveller Address4").withOption('name', 'enTRAddress4'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRAddress5')) {
                columnsArray.push(dtColumnBuilder.newColumn("enTRAddress5", "Traveller Address5").withOption('name', 'enTRAddress5'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRTASAccountOwner')) {
                columnsArray.push(dtColumnBuilder.newColumn("enTRTASAccountOwner", "Traveller TAS").withOption('name', 'enTRTASAccountOwner'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enTRNotes')) {
                columnsArray.push(dtColumnBuilder.newColumn("enTRNotes", "Traveller Notes").withOption('name', 'enTRNotes'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'bcDescription')) {
                columnsArray.push(dtColumnBuilder.newColumn("bcDescription", "Budget").withOption('name', 'bcDescription'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'soDescription')) {
                columnsArray.push(dtColumnBuilder.newColumn("soDescription", "Source").withOption('name', 'soDescription'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'drReason')) {
                columnsArray.push(dtColumnBuilder.newColumn("drReason", "Closed Reason").notSortable().withOption('name', 'drReason'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enECCloseDate')) {
                columnsArray.push(dtColumnBuilder.newColumn("disClosedDate", "Closed Date").notSortable().withOption('name', 'disClosedDate'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enECLowestOfferedRate')) {
                columnsArray.push(dtColumnBuilder.newColumn("enECLowestOfferedRate", "Lowest Offered Rate").notSortable().withOption('name', 'enECLowestOfferedRate'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enECHighestOfferedRate')) {
                columnsArray.push(dtColumnBuilder.newColumn("enECHighestOfferedRate", "Highest Offered Rate").notSortable().withOption('name', 'enECHighestOfferedRate'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enECOfferedCurrency')) {
                columnsArray.push(dtColumnBuilder.newColumn("enECOfferedCurrency", "Offered Currency").notSortable().withOption('name', 'enECOfferedCurrency'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDNoChildren')) {
                columnsArray.push(dtColumnBuilder.newColumn("enEDNoChildren", "Children").withOption('name', 'enEDNoChildren'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDNoAdultPassengers')) {
                columnsArray.push(dtColumnBuilder.newColumn("enEDNoAdultPassengers", "Adult Passengers").withOption('name', 'enEDNoAdultPassengers'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDTotalPassengers')) {
                columnsArray.push(dtColumnBuilder.newColumn("enEDTotalPassengers", "Total Guests").withOption('name', 'enEDTotalPassengers'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDChildrensAges')) {
                columnsArray.push(dtColumnBuilder.newColumn("enEDChildrensAges", "Children Ages ").withOption('name', 'enEDChildrensAges'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDDoubleBedroom')) {
                columnsArray.push(dtColumnBuilder.newColumn("enEDDoubleBedroom", "Double Bedrooms").withOption('name', 'enEDDoubleBedroom'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDTwinBedroom')) {
                columnsArray.push(dtColumnBuilder.newColumn("enEDTwinBedroom", "Twin Bedrooms").withOption('name', 'enEDTwinBedroom'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDSingleBedroom')) {
                columnsArray.push(dtColumnBuilder.newColumn("enEDSingleBedroom", "Single Bedrooms").withOption('name', 'enEDSingleBedroom'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDExtraBeds')) {
                columnsArray.push(dtColumnBuilder.newColumn("enEDExtraBeds", "Extra Beds").withOption('name', 'enEDExtraBeds'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDSpecificApartment')) {
                columnsArray.push(dtColumnBuilder.newColumn("enEDSpecificApartment", "Specific Apartment").withOption('name', 'enEDSpecificApartment'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'atDescription')) {
                columnsArray.push(dtColumnBuilder.newColumn("atDescription", "Apartment Type").notSortable().withOption('name', 'atDescription'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDMaxDistance')) {
                columnsArray.push(dtColumnBuilder.newColumn("enEDMaxDistance", "Max Distance").withOption('name', 'enEDMaxDistance'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDDesiredLocationInfo')) {
                columnsArray.push(dtColumnBuilder.newColumn("enEDDesiredLocationInfo", "Desired Location").withOption('name', 'enEDDesiredLocationInfo'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDTripType')) {
                columnsArray.push(dtColumnBuilder.newColumn("enEDTripType", "Trip Type").withOption('name', 'enEDTripType'));
            }

            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDUserAssigned')) {
                columnsArray.push(dtColumnBuilder.newColumn("enEDUserAssigned", "User Assigned").withOption('name', 'enEDUserAssigned'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDSpecialInterest')) {
                columnsArray.push(dtColumnBuilder.newColumn("enEDSpecialInterest", " Special Interest").withOption('name', 'enEDSpecialInterest'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enManualStatus')) {
                columnsArray.push(dtColumnBuilder.newColumn(null).withTitle("Manual status").notSortable().renderWith(manualStatus));
            }

            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDTimeOfArrival')) {
                columnsArray.push(dtColumnBuilder.newColumn("enEDTimeOfArrival", " Arrival Time").withOption('name', 'enEDTimeOfArrival'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDOrderRef')) {
                columnsArray.push(dtColumnBuilder.newColumn("enEDOrderRef", "Order Ref").withOption('name', 'enEDOrderRef'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enED1FirstName')) {
                columnsArray.push(dtColumnBuilder.newColumn("enED1FirstName", "Guest1 Fname").withOption('name', 'enED1FirstName'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enED1LastName')) {
                columnsArray.push(dtColumnBuilder.newColumn("enED1LastName", "Guest1 Lname").withOption('name', 'enED1LastName'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enED1Age')) {
                columnsArray.push(dtColumnBuilder.newColumn("enED1Age", "Guest1 Age").withOption('name', 'enED1Age'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enED1EmailAddress')) {
                columnsArray.push(dtColumnBuilder.newColumn("enED1EmailAddress", "Guest1 Email").withOption('name', 'enED1EmailAddress'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enED1Relationship')) {
                columnsArray.push(dtColumnBuilder.newColumn("enED1Relationship", " Guest1 Relation").withOption('name', 'enED1Relationship'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enED2FirstName')) {
                columnsArray.push(dtColumnBuilder.newColumn("enED2FirstName", "Guest2 Fname").withOption('name', 'enED2FirstName'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enED2LastName')) {
                columnsArray.push(dtColumnBuilder.newColumn("enED2LastName", "Guest2 Lname").withOption('name', 'enED2LastName'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enED2Age')) {
                columnsArray.push(dtColumnBuilder.newColumn("enED2Age", "Guest2 Age").withOption('name', 'enED2Age'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enED2EmailAddress')) {
                columnsArray.push(dtColumnBuilder.newColumn("enED2EmailAddress", " Guest2 Email").withOption('name', 'enED2EmailAddress'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enED2Relationship')) {
                columnsArray.push(dtColumnBuilder.newColumn("enED2Relationship", " Guest2 Relation").withOption('name', 'enED2Relationship'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDPreferredContact')) {
                columnsArray.push(dtColumnBuilder.newColumn("enEDPreferredContact", "Prefered Contact").withOption('name', 'enEDPreferredContact'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'enEDComments')) {
                columnsArray.push(dtColumnBuilder.newColumn("enEDComments", "Special Request Notes").withOption('name', 'enEDComments'));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'disProgressWord')) {
                columnsArray.push(dtColumnBuilder.newColumn(null).withTitle("Status").withOption('name', 'disProgressWord').renderWith(disCheckedHtml));
            }
            if ($rootScope.ColumnsSelected.length === 0 || contains($rootScope.ColumnsSelected, 'disChecked')) {
                columnsArray.push(dtColumnBuilder.newColumn(null).withTitle("Checked").notSortable().renderWith(disCheckedHtmls));
            }
        }

        if (source == "btnSearchForRecords") {
            createTrackingEntryForSearchRecords();
        }

        if (source == "selectedUserDashboard") {
            createTrackingEntryForRefreshDashboard();
        }

        vm.dtColumns = columnsArray;
        console.log("columnsArray");
        console.log(vm.dtColumns);
        vm.dtOptions = dtOptionsBuilder.newOptions().withOption('ajax', {
            dataSrc: "data",
            data: selectedQueryDetails,
            url: "/AdvancedSearch/GetEnquiriesDashboard",
            type: "POST"
            
        })
            .withOption('processing', true) //for show progress bar
            .withOption('serverSide', true) // for server side processing
            .withOption("deferLoading", 0)
            .withOption('rowCallback', rowCallback)
            .withPaginationType('full_numbers') // for get full pagination options // first / last / prev / next and page numbers
            .withDisplayLength(50) // Page size
            //.withOption('aaSorting', [0, 'desc']); // for default sorting column // here 0 means first column
        console.log('vm.dtInstance');
        console.log(vm.dtInstance2);
        if (vm.dtInstance2 !== null) {
            console.log('inside $rootScope.dtInstance');
            $timeout(loadData, 100);

        }

        if (isdefault) {
            runQuery(0, false);
        }
    }

    function loadData() {
        if (vm.dtInstance2 !== null) {
            vm.dtInstance2.dataTable.api()
                .order( [ 0, 'desc' ] )
                .draw();
            $timeout(initiateCalls, 100);
        }
    }

    function createTrackingEntryForSearchRecords() {
        var user = document.getElementById("divUserCode").value;
        enquiriesDashboardFactory.createTrackingEntryForSearch(user);
    }

    function createTrackingEntryForRefreshDashboard() {
        var user = document.getElementById("divUserCode").value;
        enquiriesDashboardFactory.createTrackingEntryForRefreshDashboard(user, $rootScope.SelectedUserRoleofDropdown, $rootScope.globalUserId);
    }

    $rootScope.CreateQuery = function () {
        $rootScope.autoPropertySelect = true;
        $("#id_CreateQuery").show();
        $("#id_AdvancedSearch").hide();
        $("#id_DeleteQuery").hide();
        clearQueryFields();
        $("#advanced-search-options").modal('show');
        $("#idFltArrivalDateFrom").val("");
        $("#idFltArrivalDateTo").val("");
        $("#idFltAddedDateFrom").val("");
        $("#idFltAddedDateTo").val("");
        $("#idFltDateClosedFrom").val("");
        $("#idFltDateClosedTo").val("");
        $("#idFltPropertyName").val("");
        $("#idFltPrivateNotes").val("");
        getEnqSources();
        getClientGroups();
        getVUsers();
        getUserClientGroup();
    }

    $rootScope.ShowReportQueries = function () {
        if ($("#isPrivateQuery:checked").val() == "true") {
            $rootScope.hideReportQueries = false;
        }
        if ($("#isReportQuery:checked").val() == "true") {
            $rootScope.hideReportQueries = true;
        }
        if ($("#isGlobalQuery:checked").val() == "true") {
            $rootScope.hideReportQueries = false;
        }
    }

    $rootScope.ShowSubReportQueries = function () {
        if ($("#isExternalReport:checked").val() == "true") {
            $rootScope.hideSubReportQueries = false;
        }
        if ($("#isInternalReport:checked").val() == "true") {
            $rootScope.hideSubReportQueries = true;
        }
    }

    $rootScope.SaveQuery = function () {
        console.log($rootScope.glbMainUserID);
        var budget = document.getElementById("idFltBudgetCategory");
        var budgetName = budget.options[budget.selectedIndex].text;
        var queryType = "";
        var isAdmin = $("#IsAdminCheck").val();
        if (isAdmin == "true") {
            if ($("#isPrivateQuery:checked").val() == undefined && $("#isReportQuery:checked").val() == undefined && $("#isGlobalQuery:checked").val() == undefined) {
                document.getElementById("id_ValidateQueryType").style.display = 'block';
                document.getElementById("id_ValidateQueryType").textContent = "Please select the query type";
                return;
            }
            if ($("#isReportQuery:checked").val() == "true") {
                if ($("#isInternalReport:checked").val() == undefined && $("#isExternalReport:checked").val() == undefined) {
                    document.getElementById("id_ValidateQueryType").style.display = 'block';
                    document.getElementById("id_ValidateQueryType").textContent = "Please select any of the sub categeories of report query type";
                    return;
                }
            }
            if ($("#isReportQuery:checked").val() == "true" && $("#isInternalReport:checked").val() == "true") {
                if ($("#isReservationsReport:checked").val() == undefined && $("#isSalesReport:checked").val() == undefined && $("#isSupportReport:checked").val() == undefined && $("#isReportingReport:checked").val() == undefined) {
                    document.getElementById("id_ValidateQueryType").style.display = 'block';
                    document.getElementById("id_ValidateQueryType").textContent = "Please select any of the sub categeories of internal report query type";
                    return;
                }
            }
            if ($("#isPrivateQuery:checked").val() == "true") {
                queryType = "Personal";
            }
            if ($("#isReportQuery:checked").val() == "true") {
                if ($("#isInternalReport:checked").val() == "true") {
                    if ($("#isReservationsReport:checked").val() == "true") {
                        queryType = "ReservationReport";
                    }
                    if ($("#isSalesReport:checked").val() == "true") {
                        queryType = "SalesReport";
                    }
                    if ($("#isSupportReport:checked").val() == "true") {
                        queryType = "SupplyReport";
                    }
                    if ($("#isReportingReport:checked").val() == "true") {
                        queryType = "ReportingReport";
                    }
                }
                if ($("#isExternalReport:checked").val() == "true") {
                    queryType = "Report";
                }
            }
            if ($("#isGlobalQuery:checked").val() == "true") {
                queryType = "Global";
            }
            console.log('if');
        }
        else {
            queryType = "Personal";
            console.log('else');
        }
        console.log(queryType);

        var insertedQueryName = $("#queryName").val();
        if (insertedQueryName === "" || insertedQueryName == undefined || insertedQueryName == null) {
            document.getElementById("nameOfQuery").style.display = 'block';
            document.getElementById("nameOfQuery").textContent = "Please enter query name";
            return;
        }

        if ($("#idFltSpInt").val().startsWith("? object:null ?")) {
            $("#idFltSpInt").val(null);
        }
        if ($("#idFltenManualStatus").val().startsWith("? object:null ?")) {
            $("#idFltenManualStatus").val(null);
        }
        if ($("#idFltBudgetValue").val().startsWith("? object:null ?")) {
            $("#idFltBudgetValue").val(null);
        }
        //if ($("#idFltUser").val().startsWith("? object:null ?")) {
        //    $("#idFltUser").val(null);
        //}
        if ($("#idFltCountry").val().startsWith("? object:null ?")) {
            $("#idFltCountry").val(null);
        }

        var queryDetails = {
            user: $rootScope.glbMainUserID,
            QueryName: $("#queryName").val(),
            QueryType: queryType,
            enCode: $("#idFltEnCode").val(),
            usFullName: $scope.CurrentQueryObject.usFullName != null ? $scope.CurrentQueryObject.usFullName.toString() : null,//$("#idFltUser").val(),
            //usFullName: $("#idFltUser").val(),
            enEDSpecialInterest: $("#idFltSpInt").val(),
            enEDDateAddedFrom: $("#idFltAddedDateFrom").val(),
            enEDDateAddedTo: $("#idFltAddedDateTo").val(),
            enNewStatus: $("#idFltProgressNew:checked").val(),
            enAssignedStatus: $("#idFltProgressAssigned:checked").val(),
            enActionedStatus: $("#idFltProgressActioned:checked").val(),
            enClosedStatus: $("#idFltProgressClosed:checked").val(),
            enPossibleDuplicatesStatus: $("#idFltProgressPossibleDuplicates:checked").val(),
            enActionRequiredStatus: $("#idFltProgressActionRequired:checked").val(),
            coName: $("#idFltCountry").val(),
            enEDCountryCode: $("#idFltCountry").val(),
            ciDescription: $("#idFltCity").val(),
            correctedCiDescription: $("#idFltCorrectedCity").val(),
            enEDBudgetCategoryCode: budgetName,
            enEDBudgetAmountFrom: $("#idFltBudgetAmountFrom").val(),
            enEDBudgetAmountTo: $("#idFltBudgetAmountTo").val(),
            enEDDateOfArrivalFrom: $("#idFltArrivalDateFrom").val(),
            enEDDateOfArrivalTo: $("#idFltArrivalDateTo").val(),
            enEDDepartureDateFrom: $("#idFltDepartureDateFrom").val(),
            enEDDepartureDateTo: $("#idFltDepartureDateTo").val(),
            enEDDateClosedFrom: $("#idFltDateClosedFrom").val(),
            enEDDateClosedTo: $("#idFltDateClosedTo").val(),
            enEDNights: $("#idFltNightsFrom").val(),
            enEDNightsTo: $("#idFltNightsTo").val(),
            enClientName: $("#idFltClient").val(),
            //enCDCompanyName: $scope.CurrentQueryObject.enCDCompanyName != null ? $scope.CurrentQueryObject.enCDCompanyName.toString() : null,//$("#idFltCompany").val(),
            enCDCompanyName: $("#idFltCompany").val(),
            enFullName: $("#idFltLeadName").val(),
            enEDSourceCode: $scope.CurrentQueryObject.enEDSourceCode != null ? $scope.CurrentQueryObject.enEDSourceCode.toString() : null,//$("#idFltSource").val(),
            //enEDSourceCode: $("#idFltSource").val(),
            enEDSourceStatus: $("#idFltSourceStatus").val(),
            //enCDClientGroup:  $("#idFltClientGroup").find("option:selected").text(),
            enCDClientGroup: $scope.CurrentQueryObject.enCDClientGroup != null ? $scope.CurrentQueryObject.enCDClientGroup.toString() : null,//$("#idFltClientGroup").find("option:selected").text(),
            enECDeadReasonCode: $("#idFltDeadReason").find("option:selected").text(),
            enECAvailabilityReason: $("#idFltAvailabilityReason").find("option:selected").text(),
            enManualStatus: $("#idFltenManualStatus").val(),
            enCDFaxNo: $("#idFltFaxNo").val(),
            enArrivalvalue: $("#idFltArrivalDates").find("option:selected").text(),
            enArrivalDays: $("#idFltArrivaldays").val(),
            enArrivalDate: $("#idFltArrivalDate").val(),
            enDepartureValue: $("#idFltDeparturevalue").find("option:selected").text(),
            enDepartureDays: $("#idFltDeparturedays").val(),
            enDepartureDate: $("#idFltDepartureDate").val(),
            enClosedDateValue: $("#idFltClosedDates").find("option:selected").text(),
            enClosedDays: $("#idFltClosedDays").val(),
            enClosedDate: $("#idFltClosedDate").val(),
            enECLowestOfferedRate: $("#idECLowestOfferedRate").val(),
            enECHighestOfferedRate: $("#idECHighestOfferedRate").val(),
            enECOfferedCurrency: $scope.CurrentQueryObject.enECOfferedCurrency != null ? $scope.CurrentQueryObject.enECOfferedCurrency.toString() : null,
            enDateAddedvalue: $("#idFltDateAddedvalue").find("option:selected").text(),
            enDateAddedDays: $("#idFltDateAddedDays").val(),
            enDateAddedDate: $("#idFltDateAddedDate").val(),
            propertyName: $("#idFltPropertyName").val(),
            privateNotes: $("#idFltPrivateNotes").val(),
            enEDBudgetValue: $("#idFltBudgetValue").val(),
            enEDBudgetAmount: $("#idFltBudgetAmount").val(),
            enEDRMC: $("#idTmcType").val(),
            enEmployeeID: $("#id_EmployeeId").val()
        }
        console.log(queryDetails);

        enquiriesDashboardFactory.checkWhetherQueryNameExists(queryType, insertedQueryName)
            .success(function (status) {
                if (status == "Name Exists") {
                    document.getElementById("nameOfQuery").style.display = 'block';
                    document.getElementById("nameOfQuery").textContent = "This query name already exists";
                }
                else {
                    enquiriesDashboardFactory.SaveQueryDetails(queryDetails)
                        .success(function (queryId) {
                            console.log(queryId);
                            console.log('Save query success ');
                            console.log($rootScope.ColumnsSelected);
                            if ($rootScope.ColumnsSelected != undefined) {
                                console.log($rootScope.ColumnsSelected);
                                enquiriesDashboardFactory.SaveSelectedColumnsQuery($rootScope.glbMainUserID, queryId, $rootScope.ColumnsSelected)
                                    .success(function () {
                                        console.log('Saved Selected Columns Query');
                                        $("#queryName").val("");
                                        $("#isPrivateQuery").removeAttr('checked');
                                        $("#isGlobalQuery").removeAttr('checked');
                                        $("#isReportQuery").removeAttr('checked');
                                        $("#isInternalReport").removeAttr('checked');
                                        $("#isReservationsReport").removeAttr('checked');
                                        $("#isSalesReport").removeAttr('checked');
                                        $("#isSupportReport").removeAttr('checked');
                                        $("#isReportingReport").removeAttr('checked');
                                        $("#isExternalReport").removeAttr('checked');
                                        $("#saveQuery").modal('hide');
                                        $("#advanced-search-options").modal('hide');
                                        logger.info('Your query has been saved successfully');
                                        $rootScope.refreshData();
                                    });
                            }
                            else {
                                $("#queryName").val("");
                                $("#isPrivateQuery").removeAttr('checked');
                                $("#isGlobalQuery").removeAttr('checked');
                                $("#isReportQuery").removeAttr('checked');
                                $("#isInternalReport").removeAttr('checked');
                                $("#isReservationsReport").removeAttr('checked');
                                $("#isSalesReport").removeAttr('checked');
                                $("#isSupportReport").removeAttr('checked');
                                $("#isReportingReport").removeAttr('checked');
                                $("#isExternalReport").removeAttr('checked');
                                $("#saveQuery").modal('hide');
                                $("#advanced-search-options").modal('hide');
                                logger.info('Your query has been saved successfully');
                                $rootScope.refreshData();
                            }
                            //Google Analytics 
                            ga('send', 'event', 'Queries', 'Created/Updated Query', 'With Query Name ' + '"' + $("#queryName").val() + '"' + ' by ' + $rootScope.glbMainUserID);
                        });
                }
            });
    }

    $("#queryName").focus(function () {
        document.getElementById("nameOfQuery").style.display = 'none';
    });

    $("#renameQuery").focus(function () {
        document.getElementById("newNameOfQuery").style.display = 'none';
    });

    $("#isPrivateQuery").click(function () {
        document.getElementById("id_ValidateQueryType").style.display = 'none';
    });

    $("#isGlobalQuery").click(function () {
        document.getElementById("id_ValidateQueryType").style.display = 'none';
    });

    $("#isReportQuery").click(function () {
        document.getElementById("id_ValidateQueryType").style.display = 'none';
    });

    $("#isReservationsReport").click(function () {
        document.getElementById("id_ValidateQueryType").style.display = 'none';
    });

    $("#isSalesReport").click(function () {
        document.getElementById("id_ValidateQueryType").style.display = 'none';
    });

    $("#isSupportReport").click(function () {
        document.getElementById("id_ValidateQueryType").style.display = 'none';
    });

    $("#isReportingReport").click(function () {
        document.getElementById("id_ValidateQueryType").style.display = 'none';
    });

    $("#isInternalReport").click(function () {
        document.getElementById("id_ValidateQueryType").style.display = 'none';
    });

    $("#isExternalReport").click(function () {
        document.getElementById("id_ValidateQueryType").style.display = 'none';
    });

    $rootScope.CancelQuery = function () {
        $("#queryName").val("");
        $("#isPrivateQuery").removeAttr('checked');
        $("#isGlobalQuery").removeAttr('checked');
        $("#isReportQuery").removeAttr('checked');
        $("#isInternalReport").removeAttr('checked');
        $("#isReservationsReport").removeAttr('checked');
        $("#isSalesReport").removeAttr('checked');
        $("#isSupportReport").removeAttr('checked');
        $("#isReportingReport").removeAttr('checked');
        $("#isExternalReport").removeAttr('checked');
        $("#saveQuery").modal('hide');
    }

    function resetColumns(preExistingSelectedColumnNames) {
        console.log('called into resetColumns');
        console.log($rootScope.leftColumnNames.length);
        console.log($rootScope.rightColumnNames.length);
        console.log(preExistingSelectedColumnNames);

        if (preExistingSelectedColumnNames == undefined) {
            preExistingSelectedColumnNames = [];
        }

        while ($rootScope.leftColumnNames.length > 0) {
            $rootScope.leftColumnNames.pop();
        }

        while ($rootScope.rightColumnNames.length > 0) {
            $rootScope.rightColumnNames.pop();
        }

        if (!contains(preExistingSelectedColumnNames, 'enCode')) {
            $rootScope.leftColumnNames.push({ name: 'enCode', displayName: 'Enq #' });
        }
        if (!contains(preExistingSelectedColumnNames, 'usFullName')) {
            $rootScope.leftColumnNames.push({ name: 'usFullName', displayName: 'User' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enClientName')) {
            $rootScope.leftColumnNames.push({ name: 'enClientName', displayName: 'Client' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enFullName')) {
            $rootScope.leftColumnNames.push({ name: 'enFullName', displayName: 'Lead' });
        }
        if (!contains(preExistingSelectedColumnNames, 'coName')) {
            $rootScope.leftColumnNames.push({ name: 'coName', displayName: 'Country' });
        }
        if (!contains(preExistingSelectedColumnNames, 'ciDescription')) {
            $rootScope.leftColumnNames.push({ name: 'ciDescription', displayName: 'City' });
        }
        if (!contains(preExistingSelectedColumnNames, 'correctedCiDescription')) {
            $rootScope.leftColumnNames.push({ name: 'correctedCiDescription', displayName: 'Corrected City' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enEDDateOfArrival')) {
            $rootScope.leftColumnNames.push({ name: 'enEDDateOfArrival', displayName: 'Arrival' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enEDDepartureDate')) {
            $rootScope.leftColumnNames.push({ name: 'enEDDepartureDate', displayName: 'DepartureDate' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enEDDateAdded')) {
            $rootScope.leftColumnNames.push({ name: 'enEDDateAdded', displayName: 'Date Added' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enEDDateNextAction')) {
            $rootScope.leftColumnNames.push({ name: 'enEDDateNextAction', displayName: 'Next Action' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enEDDateLastAction')) {
            $rootScope.leftColumnNames.push({ name: 'enEDDateLastAction', displayName: 'Last Action' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enEDNights')) {
            $rootScope.leftColumnNames.push({ name: 'enEDNights', displayName: 'Nights' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enCDCompanyName')) {
            $rootScope.leftColumnNames.push({ name: 'enCDCompanyName', displayName: 'Client Company' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enCDFaxNo')) {
            $rootScope.leftColumnNames.push({ name: 'enCDFaxNo', displayName: 'Client FaxNo' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enCDEmailAddress')) {
            $rootScope.leftColumnNames.push({ name: 'enCDEmailAddress', displayName: ' Client Email' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enCDClientGroupName')) {
            $rootScope.leftColumnNames.push({ name: 'enCDClientGroupName', displayName: ' Client Group' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enCDPostCode')) {
            $rootScope.leftColumnNames.push({ name: 'enCDPostCode', displayName: 'Client PostCode' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enCDAddress1')) {
            $rootScope.leftColumnNames.push({ name: 'enCDAddress1', displayName: ' Client Address1' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enCDAddress2')) {
            $rootScope.leftColumnNames.push({ name: 'enCDAddress2', displayName: 'Client Address2' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enCDAddress3')) {
            $rootScope.leftColumnNames.push({ name: 'enCDAddress3', displayName: 'Client Address3' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enCDAddress4')) {
            $rootScope.leftColumnNames.push({ name: 'enCDAddress4', displayName: 'Client Address4' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enCDAddress5')) {
            $rootScope.leftColumnNames.push({ name: 'enCDAddress5', displayName: 'Client Address5' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enCDJobTitle')) {
            $rootScope.leftColumnNames.push({ name: 'enCDJobTitle', displayName: ' Client job' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enCDTelephone1')) {
            $rootScope.leftColumnNames.push({ name: 'enCDTelephone1', displayName: 'Client Phone' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enCDSkype')) {
            $rootScope.leftColumnNames.push({ name: 'enCDSkype', displayName: ' Client Skype' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enCDTimeZone')) {
            $rootScope.leftColumnNames.push({ name: 'enCDTimeZone', displayName: 'Client TimeZone' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enCDCountryName')) {
            $rootScope.leftColumnNames.push({ name: 'enCDCountryName', displayName: 'Client Country' });
        }       
        if (!contains(preExistingSelectedColumnNames, 'enCDTASAccountOwner')) {
            $rootScope.leftColumnNames.push({ name: 'enCDTASAccountOwner', displayName: 'Client TAS' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enCDGroupContact')) {
            $rootScope.leftColumnNames.push({ name: 'enCDGroupContact', displayName: 'Client GroupContact' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enCDNotes')) {
            $rootScope.leftColumnNames.push({ name: 'enCDNotes', displayName: 'Client Notes' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enEDState')) {
            $rootScope.leftColumnNames.push({ name: 'enEDState', displayName: 'County/State' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enEDRMC')) {
            $rootScope.leftColumnNames.push({ name: 'enEDRMC', displayName: 'TMC/RMC' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enEmployeeID')) {
            $rootScope.leftColumnNames.push({ name: 'enEmployeeID', displayName: 'Employee Id' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enTRFirstName')) {
            $rootScope.leftColumnNames.push({ name: 'enTRFirstName', displayName: 'Traveller Fname' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enTRLastName')) {
            $rootScope.leftColumnNames.push({ name: 'enTRLastName', displayName: 'Traveller Lname' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enTRCompanyName')) {
            $rootScope.leftColumnNames.push({ name: 'enTRCompanyName', displayName: 'Traveller Company' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enTRJobTitle')) {
            $rootScope.leftColumnNames.push({ name: 'enTRJobTitle', displayName: 'Traveller Job' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enTRClientGroupName')) {
            $rootScope.leftColumnNames.push({ name: 'enTRClientGroupName', displayName: ' Traveller Group' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enTRTelephone1')) {
            $rootScope.leftColumnNames.push({ name: 'enTRTelephone1', displayName: 'Traveller Phone' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enTRSkype')) {
            $rootScope.leftColumnNames.push({ name: 'enTRSkype', displayName: 'Traveller Skype' });
        }        
        if (!contains(preExistingSelectedColumnNames, 'enTRTimeZone')) {
            $rootScope.leftColumnNames.push({ name: 'enTRTimeZone', displayName: 'Traveller TimeZone' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enTRCountryName')) {
            $rootScope.leftColumnNames.push({ name: 'enTRCountryName', displayName: 'Traveller Country' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enTRFaxNo')) {
            $rootScope.leftColumnNames.push({ name: 'enTRFaxNo', displayName: 'Traveller Fax' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enTREmailAddress')) {
            $rootScope.leftColumnNames.push({ name: 'enTREmailAddress', displayName: 'Traveller Email' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enTRAddress1')) {
            $rootScope.leftColumnNames.push({ name: 'enTRAddress1', displayName: 'Traveller Address1' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enTRAddress2')) {
            $rootScope.leftColumnNames.push({ name: 'enTRAddress2', displayName: 'Traveller Address2' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enTRAddress3')) {
            $rootScope.leftColumnNames.push({ name: 'enTRAddress3', displayName: 'Traveller Address3' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enTRAddress4')) {
            $rootScope.leftColumnNames.push({ name: 'enTRAddress4', displayName: 'Traveller Address4' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enTRAddress5')) {
            $rootScope.leftColumnNames.push({ name: 'enTRAddress5', displayName: 'Traveller Address5' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enTRTASAccountOwner')) {
            $rootScope.leftColumnNames.push({ name: 'enTRTASAccountOwner', displayName: 'Traveller TAS' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enTRNotes')) {
            $rootScope.leftColumnNames.push({ name: 'enTRNotes', displayName: 'Traveller Notes' });
        }
        if (!contains(preExistingSelectedColumnNames, 'bcDescription')) {
            $rootScope.leftColumnNames.push({ name: 'bcDescription', displayName: 'Budget' });
        }
        if (!contains(preExistingSelectedColumnNames, 'soDescription')) {
            $rootScope.leftColumnNames.push({ name: 'soDescription', displayName: 'Source' });
        }
        if (!contains(preExistingSelectedColumnNames, 'drReason')) {
            $rootScope.leftColumnNames.push({ name: 'drReason', displayName: 'Closed Reason' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enECCloseDate')) {
            $rootScope.leftColumnNames.push({ name: 'enECCloseDate', displayName: 'Closed Date' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enEDNoChildren')) {
            $rootScope.leftColumnNames.push({ name: 'enEDNoChildren', displayName: 'Children' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enEDNoAdultPassengers')) {
            $rootScope.leftColumnNames.push({ name: 'enEDNoAdultPassengers', displayName: 'Adult Passengers' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enEDTotalPassengers')) {
            $rootScope.leftColumnNames.push({ name: 'enEDTotalPassengers', displayName: 'Total Guests' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enEDChildrensAges')) {
            $rootScope.leftColumnNames.push({ name: 'enEDChildrensAges', displayName: 'Children Ages' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enEDDoubleBedroom')) {
            $rootScope.leftColumnNames.push({ name: 'enEDDoubleBedroom', displayName: 'Double Bedroom' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enEDTwinBedroom')) {
            $rootScope.leftColumnNames.push({ name: 'enEDTwinBedroom', displayName: 'Twin Bedroom' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enEDSingleBedroom')) {
            $rootScope.leftColumnNames.push({ name: 'enEDSingleBedroom', displayName: 'Single Bedroom' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enEDExtraBeds')) {
            $rootScope.leftColumnNames.push({ name: 'enEDExtraBeds', displayName: 'Extra Beds' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enEDSpecificApartment')) {
            $rootScope.leftColumnNames.push({ name: 'enEDSpecificApartment', displayName: 'Specific Apartment' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enManualStatus')) {
            $rootScope.leftColumnNames.push({ name: 'enManualStatus', displayName: 'Manual status' });
        }
        if (!contains(preExistingSelectedColumnNames, 'atDescription')) {
            $rootScope.leftColumnNames.push({ name: 'atDescription', displayName: 'Apartment Type' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enEDMaxDistance')) {
            $rootScope.leftColumnNames.push({ name: 'enEDMaxDistance', displayName: 'Max Distance' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enEDDesiredLocationInfo')) {
            $rootScope.leftColumnNames.push({ name: 'enEDDesiredLocationInfo', displayName: 'Desired Location' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enEDTripType')) {
            $rootScope.leftColumnNames.push({ name: 'enEDTripType', displayName: 'Trip Type' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enEDUserAssigned')) {
            $rootScope.leftColumnNames.push({ name: 'enEDUserAssigned', displayName: 'User Assigned' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enEDSpecialInterest')) {
            $rootScope.leftColumnNames.push({ name: 'enEDSpecialInterest', displayName: 'Special Interest' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enEDTimeOfArrival')) {
            $rootScope.leftColumnNames.push({ name: 'enEDTimeOfArrival', displayName: 'Arrival Time' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enEDOrderRef')) {
            $rootScope.leftColumnNames.push({ name: 'enEDOrderRef', displayName: 'Order Ref' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enED1FirstName')) {
            $rootScope.leftColumnNames.push({ name: 'enED1FirstName', displayName: 'Guest1 Fname' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enED1LastName')) {
            $rootScope.leftColumnNames.push({ name: 'enED1LastName', displayName: 'Guest1 Lname' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enED1Age')) {
            $rootScope.leftColumnNames.push({ name: 'enED1Age', displayName: 'Guest1 Age' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enED1EmailAddress')) {
            $rootScope.leftColumnNames.push({ name: 'enED1EmailAddress', displayName: 'Guest1 Email' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enED1Relationship')) {
            $rootScope.leftColumnNames.push({ name: 'enED1Relationship', displayName: ' Guest1 Relation' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enED2FirstName')) {
            $rootScope.leftColumnNames.push({ name: 'enED2FirstName', displayName: 'Guest2 Fname' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enED2LastName')) {
            $rootScope.leftColumnNames.push({ name: 'enED2LastName', displayName: 'Guest2 Lname' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enED2Age')) {
            $rootScope.leftColumnNames.push({ name: 'enED2Age', displayName: 'Guest2 Age' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enED2EmailAddress')) {
            $rootScope.leftColumnNames.push({ name: 'enED2EmailAddress', displayName: 'Guest2 Email' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enED2Relationship')) {
            $rootScope.leftColumnNames.push({ name: 'enED2Relationship', displayName: ' Guest2 Relation' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enEDPreferredContact')) {
            $rootScope.leftColumnNames.push({ name: 'enEDPreferredContact', displayName: 'Prefered Contact' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enEDComments')) {
            $rootScope.leftColumnNames.push({ name: 'enEDComments', displayName: 'Special Request Notes' });
        }
        if (!contains(preExistingSelectedColumnNames, 'disProgressWord')) {
            $rootScope.leftColumnNames.push({ name: 'disProgressWord', displayName: 'Status' });
        }
        if (!contains(preExistingSelectedColumnNames, 'disChecked')) {
            $rootScope.leftColumnNames.push({ name: 'disChecked', displayName: 'Checked' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enECFiveStarRef')) {
            $rootScope.leftColumnNames.push({ name: 'enECFiveStarRef', displayName: 'FiveStar Ref' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enECLowestOfferedRate')) {
            $rootScope.leftColumnNames.push({ name: 'enECLowestOfferedRate', displayName: 'Lowest Offered Rate' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enECHighestOfferedRate')) {
            $rootScope.leftColumnNames.push({ name: 'enECHighestOfferedRate', displayName: 'Highest Offered Rate' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enECOfferedCurrency')) {
            $rootScope.leftColumnNames.push({ name: 'enECOfferedCurrency', displayName: 'Offered Currency' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enEDBudgetInGBP')) {
            $rootScope.leftColumnNames.push({ name: 'enEDBudgetInGBP', displayName: 'Budget In GBP' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enSfAssigneeOfficeAddress')) {
            $rootScope.leftColumnNames.push({ name: 'enSfAssigneeOfficeAddress', displayName: 'Santafe Assignee Office Address' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enSfBudgetAmount')) {
            $rootScope.leftColumnNames.push({ name: 'enSfBudgetAmount', displayName: 'Santafe Budget Amount' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enSfInvoiceAddress')) {
            $rootScope.leftColumnNames.push({ name: 'enSfInvoiceAddress', displayName: 'Santafe Invoice Address' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enSfInvoiceEmail')) {
            $rootScope.leftColumnNames.push({ name: 'enSfInvoiceEmail', displayName: 'Santafe Invoice Email' });
        }
        if (!contains(preExistingSelectedColumnNames, 'enSfOfficeAddress')) {
            $rootScope.leftColumnNames.push({ name: 'enSfOfficeAddress', displayName: 'Santafe Office Address' });
        }

        if (preExistingSelectedColumnNames.length > 0) {
            for (var i = 0; i < preExistingSelectedColumnNames.length; i++) {
                if (preExistingSelectedColumnNames[i] == 'enCode') {
                    $rootScope.rightColumnNames.push({ name: 'enCode', displayName: 'Enq #' });
                }
                if (preExistingSelectedColumnNames[i] == 'usFullName') {
                    $rootScope.rightColumnNames.push({ name: 'usFullName', displayName: 'User' });
                }
                if (preExistingSelectedColumnNames[i] == 'enClientName') {
                    $rootScope.rightColumnNames.push({ name: 'enClientName', displayName: 'Client' });
                }
                if (preExistingSelectedColumnNames[i] == 'enFullName') {
                    $rootScope.rightColumnNames.push({ name: 'enFullName', displayName: 'Lead' });
                }
                if (preExistingSelectedColumnNames[i] == 'coName') {
                    $rootScope.rightColumnNames.push({ name: 'coName', displayName: 'Country' });
                }
                if (preExistingSelectedColumnNames[i] == 'ciDescription') {
                    $rootScope.rightColumnNames.push({ name: 'ciDescription', displayName: 'City' });
                }
                if (preExistingSelectedColumnNames[i] == 'correctedCiDescription') {
                    $rootScope.rightColumnNames.push({ name: 'correctedCiDescription', displayName: 'Corrected City' });
                }
                if (preExistingSelectedColumnNames[i] == 'enEDDateOfArrival') {
                    $rootScope.rightColumnNames.push({ name: 'enEDDateOfArrival', displayName: 'Arrival' });
                }
                if (preExistingSelectedColumnNames[i] == 'enEDDepartureDate') {
                    $rootScope.rightColumnNames.push({ name: 'enEDDepartureDate', displayName: 'DepartureDate' });
                }
                if (preExistingSelectedColumnNames[i] == 'enEDDateAdded') {
                    $rootScope.rightColumnNames.push({ name: 'enEDDateAdded', displayName: 'Date Added' });
                }
                if (preExistingSelectedColumnNames[i] == 'enEDDateNextAction') {
                    $rootScope.rightColumnNames.push({ name: 'enEDDateNextAction', displayName: 'Next Action' });
                }
                if (preExistingSelectedColumnNames[i] == 'enEDDateLastAction') {
                    $rootScope.rightColumnNames.push({ name: 'enEDDateLastAction', displayName: 'Last Action' });
                }
                if (preExistingSelectedColumnNames[i] == 'enEDNights') {
                    $rootScope.rightColumnNames.push({ name: 'enEDNights', displayName: 'Nights' });
                }
                if (preExistingSelectedColumnNames[i] == 'enCDCompanyName') {
                    $rootScope.rightColumnNames.push({ name: 'enCDCompanyName', displayName: 'Client Company' });
                }
                if (preExistingSelectedColumnNames[i] == 'enCDFaxNo') {
                    $rootScope.rightColumnNames.push({ name: 'enCDFaxNo', displayName: 'Client FaxNo' });
                }
                if (preExistingSelectedColumnNames[i] == 'enCDEmailAddress') {
                    $rootScope.rightColumnNames.push({ name: 'enCDEmailAddress', displayName: ' Client Email' });
                }
                if (preExistingSelectedColumnNames[i] == 'enCDClientGroupName') {
                    $rootScope.rightColumnNames.push({ name: 'enCDClientGroupName', displayName: ' Client Group' });
                }
                if (preExistingSelectedColumnNames[i] == 'enCDPostCode') {
                    $rootScope.rightColumnNames.push({ name: 'enCDPostCode', displayName: 'Client PostCode' });
                }
                if (preExistingSelectedColumnNames[i] == 'enCDAddress1') {
                    $rootScope.rightColumnNames.push({ name: 'enCDAddress1', displayName: ' Client Address1' });
                }
                if (preExistingSelectedColumnNames[i] == 'enCDAddress2') {
                    $rootScope.rightColumnNames.push({ name: 'enCDAddress2', displayName: 'Client Address2' });
                }
                if (preExistingSelectedColumnNames[i] == 'enCDAddress3') {
                    $rootScope.rightColumnNames.push({ name: 'enCDAddress3', displayName: 'Client Address3' });
                }
                if (preExistingSelectedColumnNames[i] == 'enCDAddress4') {
                    $rootScope.rightColumnNames.push({ name: 'enCDAddress4', displayName: 'Client Address4' });
                }
                if (preExistingSelectedColumnNames[i] == 'enCDAddress5') {
                    $rootScope.rightColumnNames.push({ name: 'enCDAddress5', displayName: 'Client Address5' });
                }
                if (preExistingSelectedColumnNames[i] == 'enCDJobTitle') {
                    $rootScope.rightColumnNames.push({ name: 'enCDJobTitle', displayName: ' Client job' });
                }
                if (preExistingSelectedColumnNames[i] == 'enCDTelephone1') {
                    $rootScope.rightColumnNames.push({ name: 'enCDTelephone1', displayName: 'Client Phone' });
                }
                if (preExistingSelectedColumnNames[i] == 'enCDSkype') {
                    $rootScope.rightColumnNames.push({ name: 'enCDSkype', displayName: ' Client Skype' });
                }
                if (preExistingSelectedColumnNames[i] == 'enCDTimeZone') {
                    $rootScope.rightColumnNames.push({ name: 'enCDTimeZone', displayName: 'Client TimeZone' });
                }
                if (preExistingSelectedColumnNames[i] == 'enCDCountryName') {
                    $rootScope.rightColumnNames.push({ name: 'enCDCountryName', displayName: 'Client Country' });
                }
                if (preExistingSelectedColumnNames[i] == 'enCDTASAccountOwner') {
                    $rootScope.rightColumnNames.push({ name: 'enCDTASAccountOwner', displayName: 'Client TAS' });
                }
                if (preExistingSelectedColumnNames[i] == 'enCDGroupContact') {
                    $rootScope.rightColumnNames.push({ name: 'enCDGroupContact', displayName: 'Client GroupContact' });
                }
                if (preExistingSelectedColumnNames[i] == 'enCDNotes') {
                    $rootScope.rightColumnNames.push({ name: 'enCDNotes', displayName: 'Client Notes' });
                }
                if (preExistingSelectedColumnNames[i] == 'enEDState') {
                    $rootScope.rightColumnNames.push({ name: 'enEDState', displayName: 'County/State' });
                }
                if (preExistingSelectedColumnNames[i] == 'enEDRMC') {
                    $rootScope.rightColumnNames.push({ name: 'enEDRMC', displayName: 'TMC/RMC' });
                }
                if (preExistingSelectedColumnNames[i] == 'enEmployeeID') {
                    $rootScope.rightColumnNames.push({ name: 'enEmployeeID', displayName: 'Employee Id' });
                }
                if (preExistingSelectedColumnNames[i] == 'enTRFirstName') {
                    $rootScope.rightColumnNames.push({ name: 'enTRFirstName', displayName: 'Traveller Fname' });
                }
                if (preExistingSelectedColumnNames[i] == 'enTRLastName') {
                    $rootScope.rightColumnNames.push({ name: 'enTRLastName', displayName: 'Traveller Lname' });
                }
                if (preExistingSelectedColumnNames[i] == 'enTRCompanyName') {
                    $rootScope.rightColumnNames.push({ name: 'enTRCompanyName', displayName: 'Traveller Company' });
                }
                if (preExistingSelectedColumnNames[i] == 'enTRJobTitle') {
                    $rootScope.rightColumnNames.push({ name: 'enTRJobTitle', displayName: 'Traveller Job' });
                }
                if (preExistingSelectedColumnNames[i] == 'enTRClientGroupName') {
                    $rootScope.rightColumnNames.push({ name: 'enTRClientGroupName', displayName: ' Traveller Group' });
                }
                if (preExistingSelectedColumnNames[i] == 'enTRTelephone1') {
                    $rootScope.rightColumnNames.push({ name: 'enTRTelephone1', displayName: 'Traveller Phone' });
                }
                if (preExistingSelectedColumnNames[i] == 'enTRSkype') {
                    $rootScope.rightColumnNames.push({ name: 'enTRSkype', displayName: 'Traveller Skype' });
                }                
                if (preExistingSelectedColumnNames[i] == 'enTRTimeZone') {
                    $rootScope.rightColumnNames.push({ name: 'enTRTimeZone', displayName: 'Traveller TimeZone' });
                }
                if (preExistingSelectedColumnNames[i] == 'enTRCountryName') {
                    $rootScope.rightColumnNames.push({ name: 'enTRCountryName', displayName: 'Traveller Country' });
                }
                if (preExistingSelectedColumnNames[i] == 'enTRFaxNo') {
                    $rootScope.rightColumnNames.push({ name: 'enTRFaxNo', displayName: 'Traveller Fax' });
                }
                if (preExistingSelectedColumnNames[i] == 'enTREmailAddress') {
                    $rootScope.rightColumnNames.push({ name: 'enTREmailAddress', displayName: 'Traveller Email' });
                }
                if (preExistingSelectedColumnNames[i] == 'enTRAddress1') {
                    $rootScope.rightColumnNames.push({ name: 'enTRAddress1', displayName: 'Traveller Address1' });
                }
                if (preExistingSelectedColumnNames[i] == 'enTRAddress2') {
                    $rootScope.rightColumnNames.push({ name: 'enTRAddress2', displayName: 'Traveller Address2' });
                }
                if (preExistingSelectedColumnNames[i] == 'enTRAddress3') {
                    $rootScope.rightColumnNames.push({ name: 'enTRAddress3', displayName: 'Traveller Address3' });
                }
                if (preExistingSelectedColumnNames[i] == 'enTRAddress4') {
                    $rootScope.rightColumnNames.push({ name: 'enTRAddress4', displayName: 'Traveller Address4' });
                }
                if (preExistingSelectedColumnNames[i] == 'enTRAddress5') {
                    $rootScope.rightColumnNames.push({ name: 'enTRAddress5', displayName: 'Traveller Address5' });
                }
                if (preExistingSelectedColumnNames[i] == 'enTRTASAccountOwner') {
                    $rootScope.rightColumnNames.push({ name: 'enTRTASAccountOwner', displayName: 'Traveller TAS' });
                }
                if (preExistingSelectedColumnNames[i] == 'enTRNotes') {
                    $rootScope.rightColumnNames.push({ name: 'enTRNotes', displayName: 'Traveller Notes' });
                }
                if (preExistingSelectedColumnNames[i] == 'bcDescription') {
                    $rootScope.rightColumnNames.push({ name: 'bcDescription', displayName: 'Budget' });
                }
                if (preExistingSelectedColumnNames[i] == 'soDescription') {
                    $rootScope.rightColumnNames.push({ name: 'soDescription', displayName: 'Source' });
                }
                if (preExistingSelectedColumnNames[i] == 'drReason') {
                    $rootScope.rightColumnNames.push({ name: 'drReason', displayName: 'Closed Reason' });
                }
                if (preExistingSelectedColumnNames[i] == 'enECCloseDate') {
                    $rootScope.rightColumnNames.push({ name: 'enECCloseDate', displayName: 'Closed Date' });
                }
                if (preExistingSelectedColumnNames[i] == 'enEDNoChildren') {
                    $rootScope.rightColumnNames.push({ name: 'enEDNoChildren', displayName: 'Children' });
                }
                if (preExistingSelectedColumnNames[i] == 'enEDNoAdultPassengers') {
                    $rootScope.rightColumnNames.push({ name: 'enEDNoAdultPassengers', displayName: 'Adult Passengers' });
                }
                if (preExistingSelectedColumnNames[i] == 'enEDTotalPassengers') {
                    $rootScope.rightColumnNames.push({ name: 'enEDTotalPassengers', displayName: 'Total Guests' });
                }
                if (preExistingSelectedColumnNames[i] == 'enEDChildrensAges') {
                    $rootScope.rightColumnNames.push({ name: 'enEDChildrensAges', displayName: 'Children Ages' });
                }
                if (preExistingSelectedColumnNames[i] == 'enEDDoubleBedroom') {
                    $rootScope.rightColumnNames.push({ name: 'enEDDoubleBedroom', displayName: 'Double Bedroom' });
                }
                if (preExistingSelectedColumnNames[i] == 'enEDTwinBedroom') {
                    $rootScope.rightColumnNames.push({ name: 'enEDTwinBedroom', displayName: 'Twin Bedroom' });
                }
                if (preExistingSelectedColumnNames[i] == 'enEDSingleBedroom') {
                    $rootScope.rightColumnNames.push({ name: 'enEDSingleBedroom', displayName: 'Single Bedroom' });
                }
                if (preExistingSelectedColumnNames[i] == 'enEDExtraBeds') {
                    $rootScope.rightColumnNames.push({ name: 'enEDExtraBeds', displayName: 'Extra Beds' });
                }
                if (preExistingSelectedColumnNames[i] == 'enEDSpecificApartment') {
                    $rootScope.rightColumnNames.push({ name: 'enEDSpecificApartment', displayName: 'Specific Apartment' });
                }
                if (preExistingSelectedColumnNames[i] == 'atDescription') {
                    $rootScope.rightColumnNames.push({ name: 'atDescription', displayName: 'Apartment Type' });
                }
                if (preExistingSelectedColumnNames[i] == 'enEDMaxDistance') {
                    $rootScope.rightColumnNames.push({ name: 'enEDMaxDistance', displayName: 'Max Distance' });
                }
                if (preExistingSelectedColumnNames[i] == 'enEDDesiredLocationInfo') {
                    $rootScope.rightColumnNames.push({ name: 'enEDDesiredLocationInfo', displayName: 'Desired Location' });
                }
                if (preExistingSelectedColumnNames[i] == 'enEDTripType') {
                    $rootScope.rightColumnNames.push({ name: 'enEDTripType', displayName: 'Trip Type' });
                }
                if (preExistingSelectedColumnNames[i] == 'enEDUserAssigned') {
                    $rootScope.rightColumnNames.push({ name: 'enEDUserAssigned', displayName: 'User Assigned' });
                }
                if (preExistingSelectedColumnNames[i] == 'enEDSpecialInterest') {
                    $rootScope.rightColumnNames.push({ name: 'enEDSpecialInterest', displayName: 'Special Interest' });
                }
                if (preExistingSelectedColumnNames[i] == 'enManualStatus') {
                    $rootScope.rightColumnNames.push({ name: 'enManualStatus', displayName: 'Manual status' });
                }
                if (preExistingSelectedColumnNames[i] == 'enEDTimeOfArrival') {
                    $rootScope.rightColumnNames.push({ name: 'enEDTimeOfArrival', displayName: 'Arrival Time' });
                }
                if (preExistingSelectedColumnNames[i] == 'enEDOrderRef') {
                    $rootScope.rightColumnNames.push({ name: 'enEDOrderRef', displayName: 'Order Ref' });
                }
                if (preExistingSelectedColumnNames[i] == 'enED1FirstName') {
                    $rootScope.rightColumnNames.push({ name: 'enED1FirstName', displayName: 'Guest1 Fname' });
                }
                if (preExistingSelectedColumnNames[i] == 'enED1LastName') {
                    $rootScope.rightColumnNames.push({ name: 'enED1LastName', displayName: 'Guest1 Lname' });
                }
                if (preExistingSelectedColumnNames[i] == 'enED1Age') {
                    $rootScope.rightColumnNames.push({ name: 'enED1Age', displayName: 'Guest1 Age' });
                }
                if (preExistingSelectedColumnNames[i] == 'enED1EmailAddress') {
                    $rootScope.rightColumnNames.push({ name: 'enED1EmailAddress', displayName: 'Guest1 Email' });
                }
                if (preExistingSelectedColumnNames[i] == 'enED1Relationship') {
                    $rootScope.rightColumnNames.push({ name: 'enED1Relationship', displayName: ' Guest1 Relation' });
                }
                if (preExistingSelectedColumnNames[i] == 'enED2FirstName') {
                    $rootScope.rightColumnNames.push({ name: 'enED2FirstName', displayName: 'Guest2 Fname' });
                }
                if (preExistingSelectedColumnNames[i] == 'enED2LastName') {
                    $rootScope.rightColumnNames.push({ name: 'enED2LastName', displayName: 'Guest2 Lname' });
                }
                if (preExistingSelectedColumnNames[i] == 'enED2Age') {
                    $rootScope.rightColumnNames.push({ name: 'enED2Age', displayName: 'Guest2 Age' });
                }
                if (preExistingSelectedColumnNames[i] == 'enED2EmailAddress') {
                    $rootScope.rightColumnNames.push({ name: 'enED2EmailAddress', displayName: 'Guest2 Email' });
                }
                if (preExistingSelectedColumnNames[i] == 'enED2Relationship') {
                    $rootScope.rightColumnNames.push({ name: 'enED2Relationship', displayName: ' Guest2 Relation' });
                }
                if (preExistingSelectedColumnNames[i] == 'enEDPreferredContact') {
                    $rootScope.rightColumnNames.push({ name: 'enEDPreferredContact', displayName: 'Prefered Contact' });
                }
                if (preExistingSelectedColumnNames[i] == 'enEDComments') {
                    $rootScope.rightColumnNames.push({ name: 'enEDComments', displayName: 'Special Request Notes' });
                }
                if (preExistingSelectedColumnNames[i] == 'disProgressWord') {
                    $rootScope.rightColumnNames.push({ name: 'disProgressWord', displayName: 'Status' });
                }
                if (preExistingSelectedColumnNames[i] == 'disChecked') {
                    $rootScope.rightColumnNames.push({ name: 'disChecked', displayName: 'Checked' });
                }
                if (preExistingSelectedColumnNames[i] == 'enECFiveStarRef') {
                    $rootScope.rightColumnNames.push({ name: 'enECFiveStarRef', displayName: 'FiveStar Ref' });
                }
                if (preExistingSelectedColumnNames[i] == 'enECLowestOfferedRate') {
                    $rootScope.rightColumnNames.push({ name: 'enECLowestOfferedRate', displayName: 'Lowest Offered Rate' });
                }
                if (preExistingSelectedColumnNames[i] == 'enECHighestOfferedRate') {
                    $rootScope.rightColumnNames.push({ name: 'enECHighestOfferedRate', displayName: 'Highest Offered Rate' });
                }
                if (preExistingSelectedColumnNames[i] == 'enECOfferedCurrency') {
                    $rootScope.rightColumnNames.push({ name: 'enECOfferedCurrency', displayName: 'Offered Currency' });
                }
                if (preExistingSelectedColumnNames[i] == 'enEDBudgetInGBP') {
                    $rootScope.rightColumnNames.push({ name: 'enEDBudgetInGBP', displayName: 'Budget In GBP' });
                }
                if (preExistingSelectedColumnNames[i] == 'enSfAssigneeOfficeAddress') {
                    $rootScope.rightColumnNames.push({ name: 'enSfAssigneeOfficeAddress', displayName: 'Santafe Assignee Office Address' });
                }
                if (preExistingSelectedColumnNames[i] == 'enSfBudgetAmount') {
                    $rootScope.rightColumnNames.push({ name: 'enSfBudgetAmount', displayName: 'Santafe Budget Amount' });
                }
                if (preExistingSelectedColumnNames[i] == 'enSfInvoiceAddress') {
                    $rootScope.rightColumnNames.push({ name: 'enSfInvoiceAddress', displayName: 'Santafe Invoice Address' });
                }
                if (preExistingSelectedColumnNames[i] == 'enSfInvoiceEmail') {
                    $rootScope.rightColumnNames.push({ name: 'enSfInvoiceEmail', displayName: 'Santafe Invoice Email' });
                }
                if (preExistingSelectedColumnNames[i] == 'enSfOfficeAddress') {
                    $rootScope.rightColumnNames.push({ name: 'enSfOfficeAddress', displayName: 'Santafe Office Address' });
                }
            }
        }

        $rootScope.ColumnsSelected = [];
        for (var j = 0; j < $rootScope.rightColumnNames.length; j++) {
            $rootScope.ColumnsSelected.push($rootScope.rightColumnNames[j].name);
        }
    }

    function contains(a, obj) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] === obj) {
                return true;
            }
        }
        return false;
    }

    $rootScope.MoveLeftColumnsToRight = function () {
        console.log($rootScope.leftColumnNames);
        console.log($rootScope.rightColumnNames);

        var selectedLeftHandColumnNames = [];

        $.each($("#leftColumnSelectionList :selected"), function (index, Object) {
            console.log(Object.value);
            selectedLeftHandColumnNames.push(Object.value);
        });

        console.log(selectedLeftHandColumnNames);

        $rootScope.rightColumnNames = [];
        $.each($('#rightColumnSelectionList option'), function (index, Object) {
            console.log(Object.value);
            console.log(Object.label);
            $rootScope.rightColumnNames.push({ name: Object.value, displayName: Object.label });
        });

        for (var i = 0; i < selectedLeftHandColumnNames.length; i++) {

            for (var k = 0; k < $rootScope.leftColumnNames.length; k++) {

                console.log('comparing ' + $rootScope.leftColumnNames[k].name + ' with ' + selectedLeftHandColumnNames[i]);

                if ($rootScope.leftColumnNames[k].name === selectedLeftHandColumnNames[i]) {
                    console.log('match - ' + $rootScope.leftColumnNames[k].name + ' with ' + selectedLeftHandColumnNames[i]);
                    $rootScope.rightColumnNames.push({ name: $rootScope.leftColumnNames[k].name, displayName: $rootScope.leftColumnNames[k].displayName });
                    $rootScope.leftColumnNames.splice(k, 1);
                    break;
                }
            }
        }

        $rootScope.$apply();

        MakeSureColumnsSelectedReflectTheUserSelectedAndPlayedColumns();
    }

    $rootScope.MoveRightColumnsToLeft = function () {
        console.log($rootScope.leftColumnNames);
        console.log($rootScope.rightColumnNames);

        var selectedRightHandColumnNames = [];

        $.each($("#rightColumnSelectionList :selected"), function (index, Object) {
            console.log(Object.value);
            selectedRightHandColumnNames.push(Object.value);
        });

        console.log(selectedRightHandColumnNames);

        for (var i = 0; i < selectedRightHandColumnNames.length; i++) {

            for (var k = 0; k < $rootScope.rightColumnNames.length; k++) {

                if ($rootScope.rightColumnNames[k].name === selectedRightHandColumnNames[i]) {
                    $rootScope.leftColumnNames.push({ name: $rootScope.rightColumnNames[k].name, displayName: $rootScope.rightColumnNames[k].displayName });
                    $rootScope.rightColumnNames.splice(k, 1);
                    break;
                }
            }
        }

        $rootScope.$apply();
        MakeSureColumnsSelectedReflectTheUserSelectedAndPlayedColumns();
    }

    $rootScope.MoveRightColumnsTop = function () {

        var $op = $('#rightColumnSelectionList option:selected');

        if ($op.length) {
            $op.insertBefore('#rightColumnSelectionList option:first-child');
        }

        delay(function () {
            MakeSureColumnsSelectedReflectTheUserSelectedAndPlayedColumns();
            $rootScope.ColumnsSorted = true;
        }, 1000);
    }

    $rootScope.MoveRightColumnsBottom = function () {
        $('#rightColumnSelectionList option:selected').appendTo('#rightColumnSelectionList');
        delay(function () {
            MakeSureColumnsSelectedReflectTheUserSelectedAndPlayedColumns();
            $rootScope.ColumnsSorted = true;
        }, 1000);
    }

    $rootScope.MoveRightColumnsUp = function () {
        $("#rightColumnSelectionList option:selected").each(function () {
            var listItem = $(this);
            var listItemPosition = $("#rightColumnSelectionList option").index(listItem) + 1;
            if (listItemPosition === 1) return false;
            listItem.insertBefore(listItem.prev());
            return true;
        });
        delay(function () {
            MakeSureColumnsSelectedReflectTheUserSelectedAndPlayedColumns();
            $rootScope.ColumnsSorted = true;
        }, 1000);
    }

    $rootScope.MoveRightColumnsDown = function () {
        var itemsCount = $("#rightColumnSelectionList option").length;
        $($("#rightColumnSelectionList option:selected").get().reverse()).each(function () {
            var listItem = $(this);
            var listItemPosition = $("#rightColumnSelectionList option").index(listItem) + 1;
            if (listItemPosition === itemsCount) return false;
            listItem.insertAfter(listItem.next());
            return true;
        });
        delay(function () {
            MakeSureColumnsSelectedReflectTheUserSelectedAndPlayedColumns();
            $rootScope.ColumnsSorted = true;
        }, 1000);
    }

    function MakeSureColumnsSelectedReflectTheUserSelectedAndPlayedColumns() {
        $rootScope.ColumnsSelected = [];
        console.log($('#rightColumnSelectionList option'));
        $.each($('#rightColumnSelectionList option'), function (index, Object) {
            console.log(Object.value);
            $rootScope.ColumnsSelected.push(Object.value);
        });
        console.log($rootScope.ColumnsSelected);
    }

    var delay = (function () {
        var timer = 15;
        return function (callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })();

    $rootScope.changeDateAddedDates = function (enEDDateAddedDays) {
        if (enEDDateAddedDays == "is" || enEDDateAddedDays == ">=" || enEDDateAddedDays == "<=") {
            $rootScope.DateAddedSingleDatepicker = true;
            $rootScope.DateAddedDoubleDatePicker = false;
            $rootScope.EditableDateAddedTextbox = false;
        }
        if (enEDDateAddedDays == "between") {
            $rootScope.DateAddedDoubleDatePicker = true;
            $rootScope.DateAddedSingleDatepicker = false;
            $rootScope.EditableDateAddedTextbox = false;
        }
        if (enEDDateAddedDays == "less than days ago" || enEDDateAddedDays == "more than days ago" || enEDDateAddedDays == "in the past" || enEDDateAddedDays == "days ago") {
            $rootScope.EditableDateAddedTextbox = true;
            $rootScope.DateAddedSingleDatepicker = false;
            $rootScope.DateAddedDoubleDatePicker = false;
        }
        if (enEDDateAddedDays == "today" || enEDDateAddedDays == "yesterday" || enEDDateAddedDays == "this week" || enEDDateAddedDays == "last week" || enEDDateAddedDays == "last 2 weeks" || enEDDateAddedDays == "this month" || enEDDateAddedDays == "last month" || enEDDateAddedDays == "this year" || enEDDateAddedDays == "any") {
            $rootScope.EditableDateAddedTextbox = false;
            $rootScope.DateAddedSingleDatepicker = false;
            $rootScope.DateAddedDoubleDatePicker = false;
        }
        $("#idFltDateAddedDate").val("");
        $("#idFltAddedDateFrom").val("");
        $("#idFltAddedDateTo").val("");
        $("#idFltDateAddedDays").val("");

    }

    $rootScope.changeBudgetValue = function (budgetValue) {
        if (budgetValue == "is" || budgetValue == ">=" || budgetValue == "<=") {
            $rootScope.SingleCurrency = true;
            $rootScope.DoubleCurrency = false;
        }
        if (budgetValue == "between") {
            $rootScope.DoubleCurrency = true;
            $rootScope.SingleCurrency = false;
        }
        $("#idFltBudgetAmount").val("");
        $("#idFltBudgetCurrency").val("");
        $("#idFltBudgetAmountFrom").val("");
        $("#idFltBudgetAmountTo").val("");
    }

    $rootScope.changeArrivalDates = function (enEDArrivalDays) {
        if (enEDArrivalDays == "is" || enEDArrivalDays == ">=" || enEDArrivalDays == "<=") {
            $rootScope.ArrivalSingleDatePicker = true;
            $rootScope.ArrivalDoubleDatePicker = false;
            $rootScope.EditableArrivalTextbox = false;
        }
        if (enEDArrivalDays == "between") {
            $rootScope.ArrivalDoubleDatePicker = true;
            $rootScope.ArrivalSingleDatePicker = false;
            $rootScope.EditableArrivalTextbox = false;
        }
        if (enEDArrivalDays == "less than days ago" || enEDArrivalDays == "more than days ago" || enEDArrivalDays == "in the past" || enEDArrivalDays == "days ago") {
            $rootScope.EditableArrivalTextbox = true;
            $rootScope.ArrivalSingleDatePicker = false;
            $rootScope.ArrivalDoubleDatePicker = false;
        }
        if (enEDArrivalDays == "today" || enEDArrivalDays == "yesterday" || enEDArrivalDays == "this week" || enEDArrivalDays == "last week" || enEDArrivalDays == "last 2 weeks" || enEDArrivalDays == "this month" || enEDArrivalDays == "last month" || enEDArrivalDays == "this year" || enEDArrivalDays == "any") {
            $rootScope.EditableArrivalTextbox = false;
            $rootScope.ArrivalSingleDatePicker = false;
            $rootScope.ArrivalDoubleDatePicker = false;
        }
        $("#idFltArrivalDateFrom").val("");
        $("#idFltArrivalDateTo").val("");
        $("#idFltArrivalDate").val("");
        $("#idFltArrivaldays").val("");
    }

    $rootScope.changeDepartureDates = function (enEDDepartureDays) {
        if (enEDDepartureDays == "is" || enEDDepartureDays == ">=" || enEDDepartureDays == "<=") {
            $rootScope.DepartureSingleDatePicker = true;
            $rootScope.DepartureDoubleDatePicker = false;
            $rootScope.EditableDepartureTextbox = false;
        }
        if (enEDDepartureDays == "between") {
            $rootScope.DepartureDoubleDatePicker = true;
            $rootScope.DepartureSingleDatePicker = false;
            $rootScope.EditableDepartureTextbox = false;
        }
        if (enEDDepartureDays == "less than days ago" || enEDDepartureDays == "more than days ago" || enEDDepartureDays == "in the past" || enEDDepartureDays == "days ago") {
            $rootScope.EditableDepartureTextbox = true;
            $rootScope.DepartureSingleDatePicker = false;
            $rootScope.DepartureDoubleDatePicker = false;
        }
        if (enEDDepartureDays == "today" || enEDDepartureDays == "yesterday" || enEDDepartureDays == "this week" || enEDDepartureDays == "last week" || enEDDepartureDays == "last 2 weeks" || enEDDepartureDays == "this month" || enEDDepartureDays == "last month" || enEDDepartureDays == "this year" || enEDDepartureDays == "any") {
            $rootScope.EditableDepartureTextbox = false;
            $rootScope.DepartureSingleDatePicker = false;
            $rootScope.DepartureDoubleDatePicker = false;
        }
        $("#idFltDepartureDateFrom").val("");
        $("#idFltDepartureDateTo").val("");
        $("#idFltDepartureDate").val("");
        $("#idFltDeparturedays").val("");

    }
    $rootScope.ChangeClosedDates = function (closedDateValue) {
        if (closedDateValue == "is" || closedDateValue == ">=" || closedDateValue == "<=") {
            $rootScope.DateClosedSingleDatePicker = true;
            $rootScope.DateClosedDoubleDatePicker = false;
            $rootScope.EditableDateClosedTextbox = false;
        }
        if (closedDateValue == "between") {
            $rootScope.DateClosedDoubleDatePicker = true;
            $rootScope.DateClosedSingleDatePicker = false;
            $rootScope.EditableDateClosedTextbox = false;
        }
        if (closedDateValue == "less than days ago" || closedDateValue == "more than days ago" || closedDateValue == "in the past" || closedDateValue == "days ago") {
            $rootScope.EditableDateClosedTextbox = true;
            $rootScope.DateClosedSingleDatePicker = false;
            $rootScope.DateClosedDoubleDatePicker = false;
        }
        if (closedDateValue == "today" || closedDateValue == "yesterday" || closedDateValue == "this week" || closedDateValue == "last week" || closedDateValue == "last 2 weeks" || closedDateValue == "this month" || closedDateValue == "last month" || closedDateValue == "this year" || closedDateValue == "any") {
            $rootScope.EditableDateClosedTextbox = false;
            $rootScope.DateClosedSingleDatePicker = false;
            $rootScope.DateClosedDoubleDatePicker = false;
        }
        $("#idFltDateClosedFrom").val("");
        $("#idFltDateClosedTo").val("");
        $("#idFltClosedDate").val("");
        $("#idFltClosedDays").val("");
    }

    function getRepliedEmail(enCode, manualStatus) {
        console.log(enCode);
        if (manualStatus === "Email In") {
            trackingRecordsDataService.getRepliedEmailFromTrakingRecord(enCode)
                .success(function (record) {
                    $scope.TrackingRecord = record;
                    console.log($scope.TrackingRecord);
                    $scope.Body = angular.fromJson($sce.trustAsHtml(record.Body));
                    console.log($scope.Body);
                    $("#emailreceived").modal("show");
                });
        }
    }

    function manualStatus(data, type, full, meta) {
        return '<a>' + data.enManualStatus + '</a>';
    }
    function disCheckedHtmls(data, type, full, meta) {
        return '<i class="ace-icon fa ' + data.disCheckedClass + ' bigger-110" title="' + data.disCheckedWord + '"><span class="sr-only">' + data.disCheckedWord + '</span></i>';
    }
    function disCheckedHtml(data, type, full, meta) {
        return '<span>' + data.disProgressWord + '</span>';
    }
    function disCheckedHtmlEnqRef(data, type, full, meta) {
        if (data.disProgressClass == 'custom-label-actionpending') {
            return '<i class="custom-label-actionpending"><span>' + data.enCode + '</span></i>';
        } else {
            return '<span>' + data.enCode + '</span>';
        }
    }
    function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        // Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
        $('td', nRow).unbind('click');
        $('td', nRow).bind('click', function (event) {
            if ($(event.target).is('a')) {
                console.log("Manual Status: " + aData.enManualStatus);
                getRepliedEmail(aData.enCode, aData.enManualStatus);
            }
            else {
                $scope.$apply(function () {
                    console.log(aData);
                    $state.go('detailsTab', { enqRef: aData.enCode });
                });
            }
        });

        $('td', nRow).hover(function () {
            console.log(aData);
            if (aData.disProgressClass == 'custom-label-duplicates') {
                $('td', nRow).css('cursor', 'pointer').attr('title', 'Possible duplicate of ' + aData.enDuplicates);
            }
            else {
                $('td', nRow).css('cursor', 'pointer');
            }
        });

        if (aData.disProgressClass == 'custom-label-actionpending') {
            nRow.className = aData.className + ' menu_links custom-label-assigned';
        } else {
            nRow.className = aData.className + ' menu_links ' + aData.disProgressClass;
        }

        return nRow;
    };

}

