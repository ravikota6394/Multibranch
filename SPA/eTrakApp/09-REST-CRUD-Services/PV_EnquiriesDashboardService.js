(function () {
    'use strict';
    var eTrakApp = angular.module('eTrakApp');
    eTrakApp.service('PV_EnquiriesDashboardService', ['$http', function ($http) {

        this.SaveQueryDetails = function (queryDetails) {
            console.log("querydetails");
            console.log(queryDetails);
            var response = $http(
               {
                   method: "post",
                   url: '/AdvancedSearch/SaveQueryDetails',
                   data: queryDetails,
                   contentType: "application/json;charset=utf-8"
               });
            return response;
        }
        //save Make Default Id
        this.SaveDefaultQueryId = function (queryId,userId) {
            console.log( queryId, userId);
            var response = $http(
                {
                    method: "get",
                    url: '/AdvancedSearch/SaveDefaultQueryId?queryId=' + queryId + '&userId=' + userId,                   
                    contentType: "application/json;charset=utf-8"
                });
            return response;
        }

        //Remove Default query
        this.RemoveDefaultQuery = function (userId) {
            console.log(userId);
            var response = $http(
                {
                    method: "get",
                    url: '/AdvancedSearch/RemoveDefaultQuery?userId=' + userId,
                    contentType: "application/json;charset=utf-8"
                });
            return response;
        }
        
        this.SaveSelectedColumnsQuery = function (userId, queryId, selectedColumns) {
            console.log(userId + ',' + queryId + ',' + selectedColumns);
            var response = $http(
               {
                   method: "post",
                   url: '/AdvancedSearch/SaveSelectedColumnsQuery?queryId=' + queryId + '&userId=' + userId,
                   data: selectedColumns,
                   contentType: "application/json;charset=utf-8"
               });
            return response;
        }

        this.DeleteAndInsertColumnsByQueryId = function (userId, queryId, selectedColumns, columnsSorted) {
            console.log(userId + ',' + queryId + ',' + selectedColumns);
            var response = $http(
               {
                   method: "post",
                   url: '/AdvancedSearch/DeleteAndInsertColumnsByQueryId?queryId=' + queryId + '&userId=' + userId + '&columnsSorted=' + columnsSorted,
                   data: selectedColumns,
                   contentType: "application/json;charset=utf-8"
               });
            return response;
        }

        this.BookedEnquiriesCount = function (queryDetails) {
            console.log(queryDetails);
            var response = $http(
               {
                   method: "post",
                   url: '/AdvancedSearch/BookedEnquiriesCount',
                   data: queryDetails,
                   contentType: "application/json;charset=utf-8"
               });
            return response;
        }

        //Delete Query
        this.DeleteQuery = function (userQueryId) {
            return $http.get('/AdvancedSearch/DeleteQuery?userQueryId=' + userQueryId);
        };      

        this.GetGlobalQueries = function () {
            return $http.get('/AdvancedSearch/GetGlobalQueries');
        };
       
        this.GetExternalReportQueries = function () {
            return $http.get('/AdvancedSearch/GetExternalReportQueries');
        };

        this.getReservationsReportQueries = function () {
            return $http.get('/AdvancedSearch/GetReservationsReportQueries');
        };

        this.getSalesReportQueries = function () {
            return $http.get('/AdvancedSearch/GetSalesReportQueries');
        };

        this.getSupplyReportQueries = function () {
            return $http.get('/AdvancedSearch/GetSupplyReportQueries');
        };

        this.getReportingQueries = function () {
            return $http.get('/AdvancedSearch/GetReportingQueries');
        };

        this.GetIndividualQueries = function (userId) {
            return $http.get('/AdvancedSearch/GetIndividualQueries?userId='+userId);
        };

        this.GetQueryDetailsByQueryName = function (queryName) {
            return $http.get('/AdvancedSearch/GetQueryDetailsByQueryName?queryName=' + queryName);
        };

        this.GetQueryDetailsByName = function (userQueryId, userId) {
            return $http.get('/AdvancedSearch/GetQueryDetailsByQueryId?UserQueryId=' + userQueryId + "&userId="+userId);
        };

        this.getQueryId = function (queryName) {
            return $http.get('/AdvancedSearch/GetQueryId?queryName=' + queryName);
        };

        this.getUserClientGroup = function (userId) {
            return $http.get('/AdvancedSearch/GetUserClientGroup?userId=' + userId);
        };

        this.getSelectedColumns = function (userQueryId) {
            return $http.get('/AdvancedSearch/GetSelectedColumns?UserQueryId=' + userQueryId);
        };

        this.getColumnsByRole = function (userRole) {
            return $http.get('/AdvancedSearch/GetColumnsByRole?userRole=' + userRole);
        };

        this.checkWhetherQueryNameExists = function (queryType, insertedQueryName) {
            return $http.get('/AdvancedSearch/CheckWhetherQueryNameExists?queryType=' + queryType + '&insertedQueryName=' + insertedQueryName);
        };

        this.tickerText = function (tickerTapeText) {
            console.log(tickerTapeText);
            return $http.post('/AdvancedSearch/tickerText?tickerTapeText=' + tickerTapeText);
        }

        this.getTickerText = function () {
            return $http.get('/AdvancedSearch/GetTickerText');
        }

        this.getDuplicatesStatus = function () {
            return $http.get('/AdvancedSearch/GetDuplicatesStatus');
        }

        this.SaveDuplicatesStatus = function (duplicateStatus) {
            console.log(duplicateStatus);
            return $http.post('/AdvancedSearch/SaveDuplicatesStatus?duplicateStatus=' + duplicateStatus);
        }

        this.createTrackingEntryForSearch = function (userCode) {
            return $http.get('/AdvancedSearch/CreateTrackingEntryForSearch?userCode=' + userCode);
        };

        this.createTrackingEntryForRefreshDashboard = function (userCode, selectedRole, selectedUser) {
            return $http.get('/AdvancedSearch/CreateTrackingEntryForRefreshDashboard?userCode=' + userCode + '&selectedRole=' + selectedRole + '&selectedUser=' + selectedUser);
        };
    }
    ]);
})();