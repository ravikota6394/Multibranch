eTrakApp.service('R_EmailStatusService',['$http', function ($http) {
    this.EmailsList = function () {  
        return $http.get("EmailStatus/GetEmails");
    }
    this.FetchEmailStatus = function () {
        return $http.get("EmailStatus/FetchEmailStatus");
    }
    this.GetAttachmentsPath = function (id) {
        return $http.get("EmailStatus/GetAttachmentsPath?id=" + id);
    }

    this.getBookNowAcknowledgementEmail = function (enCode, status) {
        console.log(status);
        return $http.get("EmailStatus/GetBooKNowAcknowledgementEmail?enCode=" + enCode + "&status=" + status);
    }

}]);