eTrakApp.service('jobHistoryRunDetailsService', ['$http' ,function ($http) {

    this.getJobHistoryRunDetails = function () {
        return $http.get("JobRunningHistory/GetJobHistoryRunningDetails");
    }
}]);