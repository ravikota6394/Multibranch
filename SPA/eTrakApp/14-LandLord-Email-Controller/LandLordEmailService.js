eTrakAppModuleLandlord.service('LandLordEmailService', function ($http) {
    console.log('landlord service');
    this.LandLordEmailInformation = function (emailKey) {
        console.log(emailKey);
        return $http.get("/LandLordEmail/EditLandLordEmailInformation?PageName=" + emailKey);
    }

    this.getApartmentTypes = function (emailKey) {
        return $http.get("/LandLordEmail/GetApartmentTypes?pageName=" + emailKey);
    }

    this.LandLordInformation = function (record) {
        console.log(record);       
        var response = $http(
           {
               method: "post",
               url: "/LandLordEmail/UpdateLandLordEmailInformation/",
               data: record,
               contentType: "application/json;charset=utf-8",
               dataType: "json"
           });
        return response;
    }

    this.LandLordNoAvailabilityInformation = function (emailKey) {
        console.log(emailKey);
        return $http.get("/LandLordEmail/LandLordNoAvailabilityInformation?emailKey=" + emailKey);
    }    

});