eTrakApp.service('QueriesScheduleService',['$http', function ($http) {
    this.GetQueryNames = function (userCode, userRole) {
        return $http.get("QueriesSchedule/GetQueryNames?userCode=" + userCode + '&userRole=' + userRole);
    }
    this.GetTemplateNames = function () {
        return $http.get("QueriesSchedule/GetTemplateNames");
    }
    this.GetQueriesSchedulesDetails = function (user) {
        return $http.get("QueriesSchedule/GetQueriesSchedulesDetails?user=" + user);
    }
    this.SaveQuerySchedule = function (scheduleObject) {
        console.log(scheduleObject);
        console.log('Save Schedule Details');
        var response = $http(
        {
            method: "post",
            url: '/QueriesSchedule/SaveQuerySchedule',
            data: scheduleObject,
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        });
        return response;
    }

    this.EditQueryScheduleDetails = function (id) {
        return $http.get("QueriesSchedule/EditQueryScheduleDetails?id=" + id);
    }

    this.DeleteSchedule = function (id) {
        return $http.get("QueriesSchedule/DeleteSchedule?id=" + id);
    }

    this.ShowAuditDetails = function (id) {
        return $http.get("QueriesSchedule/ShowAuditDetails?id=" + id);
    } 

    this.RunSchedule = function (scheduleObject,fromAddress,user) {
        console.log(scheduleObject);
        console.log('Get Query Details');
        var response = $http(
        {
            method: "post",
            url: '/QueriesSchedule/RunSchedule?fromAddress=' + fromAddress + '&&user=' + user,
            data: scheduleObject,
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        });
        return response;
    }
}]);