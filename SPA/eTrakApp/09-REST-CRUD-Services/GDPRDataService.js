eTrakApp.service('GDPRDataService',['$http', function ($http) {

    this.validateEmails = function (emails, status) {
        var data = { usersemails: emails, status: status };
        return $http.post("GDPRData/ValidateEmailsFromDb", data);
    }

    this.submitConfirmation = function (usersemails, status) {
        var data = { usersemails: usersemails, status: status };
        return $http.post("GDPRData/SubmitConfirmation",data);
    }

    this.getGDPRData = function (usersemails, status) {
        var data = { userEmails: usersemails, status: status };
        return $http.post("MatchFormApi/GetGDPRData", data);
    }

    this.submitGDPRConfirmation = function (gDPRs, status) {
        var data = { gDPRs: gDPRs, status: status };
        return $http.post("GDPRData/SubmitGDPRConfirmation", data);
    }

}]);