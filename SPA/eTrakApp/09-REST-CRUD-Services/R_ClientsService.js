(function () {
    'use strict';
    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.service('R_ClientsService', [
        '$http', function ($http) {

            var self = this;
            var fetchClientsUrl = '/api/R_Clients';
            var fetchTravellersUrl = '/api/R_Traveller';
      
            //Get A Client Record
            this.getClientRecord = function (clCode) {
                console.log("client record service");
                return $http.get(fetchClientsUrl + "/" + clCode);
            }

            this.getTravellerRecord = function (trCode) {     
                return $http.get(fetchTravellersUrl + "/" + trCode);
            }
            
            //Get A Fivewin Client Record
            this.getFivewinClientRecord = function (clientRef) {
                return $http.get("Clients/GetClientRecord?clientRef=" + clientRef);
            }
          
            //Update the Client Record
            this.saveClientChanges = function (clCode, clRecord) {
                var request = $http({
                    method: "put",
                    url: fetchClientsUrl + "/" + clCode,
                    data: clRecord
                });

                return request;
            }

            //Update the Client Record
            this.saveClientChangesInternal = function (clCode, clRecord) {
                var request = $http({
                    method: "put",
                    url: fetchClientsUrl + "/" + clCode,
                    data: clRecord
                });
                return request;
            }

            //Update the traveller Record
            this.saveTravellerChangesInternal = function (trRecord) {               
                console.log(trRecord);
                var request = $http({
                    method: "post",
                    url: "Clients/SaveTraveller/",
                    data: trRecord
                });
                return request;
            }
            
            //Create new client
            this.createClient = function (clientDetails) {
                console.log(clientDetails);
                var request = $http({
                    method: "post",
                    url: "Clients/AddNewClient/",
                    data: clientDetails
                });
                return request;
            }

            this.createTraveller = function (travellerDetails) {
                console.log(travellerDetails);
                var request = $http({
                    method: "post",
                    url: "Clients/AddNewTraveller/",
                    data: travellerDetails
                });
                return request;
            }


            //Create new record
            this.createClientInternal = function (clientRecord) {
                var request = $http({
                    method: "post",
                    url: fetchClientsUrl,
                    data: clientRecord
                });
                return request;
            }

            this.getClientsFiltered = function (csClientGroup) {
                var request = $http({
                    method: "post",
                    url: "Clients/SearchForClient",
                    data: csClientGroup
                });
                return request;                
            };
            this.getTravellersFiltered = function (tsTravellerGroup) {
                var request = $http({
                    method: "post",
                    url: "Clients/SearchForTraveller",
                    data: tsTravellerGroup
                });
                return request;
            };

            this.CheckWhetherClientFound = function (email) {
                var request = $http({
                    method: "get",
                    url: "Clients/CheckWhetherClientFound?email=" + email 
                });
                return request;
            };
            this.CheckWhetherTravellerFound = function (email) {
                var request = $http({
                    method: "get",
                    url: "Clients/CheckWhetherTravellerFound?email=" + email
                });
                return request;
            };
            this.clientFoundOrNot = function (email) {
                var request = $http({
                    method: "get",
                    url: "Clients/ClientFoundOrNot?email=" + email
                });
                return request;
            };

            this.travellerFoundOrNot = function (email) {
                var request = $http({
                    method: "get",
                    url: "Clients/TravellerFoundOrNot?email=" + email
                });
                return request;
            };
            this.GetCompaniesForDropdown = function () {
                return $http.get('Clients/GetCompaniesForDropdown');
            }

        }
    ]);
})();