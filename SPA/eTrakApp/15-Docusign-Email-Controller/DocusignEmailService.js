eTrakAppModuleLandlord.service('DocusignEmailService',
    function ($http) {
        console.log('Docusign service');
        this.DoscusignEmailInformation = function (enCode,prCode) {
            console.log(enCode);
            console.log(prCode);
            return $http.get("/Booking/GetDocusignInformation?enCode=" + enCode + "&prCode=" + prCode);
        }

        this.billingInformation = function (cardDetails) {
            console.log(cardDetails);
            var response = $http(
                {
                    method: "post",
                    url: "/Booking/ValidatingCardDetails/",
                    data: cardDetails,
                    contentType: "application/json;charset=utf-8",
                    dataType: "json"
                });
            return response;
        }
  });