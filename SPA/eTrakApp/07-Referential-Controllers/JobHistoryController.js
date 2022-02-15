eTrakApp.controller('JobHistoryRunDetails',['$scope','jobHistoryRunDetailsService', function ($scope, jobHistoryRunDetailsService) {

    getJobHistoryRunDetails();

    function getJobHistoryRunDetails() {
        jobHistoryRunDetailsService.getJobHistoryRunDetails()
            .success(function (jobHistoryRunDetails) {
                console.log(jobHistoryRunDetails);
                $scope.jobHistoryRunDetails = jobHistoryRunDetails;
            });
    }

}]);