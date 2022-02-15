(function () {
    'use strict';

var eTrakApp = angular.module('eTrakApp');

    //// Cities list
    eTrakApp.controller('R_V_EmailAddresses', [
        '$scope', 'R_V_EmailAddressesService',
        function ($scope, emailAddressesFactory) {
            var enqRef = $scope.glbCurrentEnquiryRef;
            function getEmailAddresses() {
                //alert("at r_v_EmailAddresses");
                var emailAddresses = "";
                emailAddressesFactory.getEmailAddresses(enqRef)
                    .success(function (emailAddresses) {
                        var comma = " ";
                        if (emailAddresses == null) emailAddresses = "]";
                        if (emailAddresses != "]") comma = ",";

                        if ($scope.DTEnquiry.enED2EmailAddress !== undefined && $scope.DTEnquiry.enED2EmailAddress !== null) {
                            emailAddresses = '{"CameFrom":"' + $scope.DTEnquiry.enED2EmailAddress + '","DisplayFrom":"' + $scope.DTEnquiry.enED2EmailAddress + '","Source":"ED2"}'+ comma + emailAddresses;
                        }
                        if (emailAddresses != "]") comma = ",";

                        if ($scope.DTEnquiry.enED1EmailAddress !== undefined && $scope.DTEnquiry.enED1EmailAddress !== null) {
                            emailAddresses = '{"CameFrom":"' + $scope.DTEnquiry.enED1EmailAddress + '","DisplayFrom":"' + $scope.DTEnquiry.enED1EmailAddress + '","Source":"ED1"}' + comma + emailAddresses;
                        }
                        if (emailAddresses != "]") comma = ",";

                        if ($scope.DTEnquiry.enTREmailAddress !== undefined && $scope.DTEnquiry.enTREmailAddress !== null) {
                            emailAddresses = '{"CameFrom":"' + $scope.DTEnquiry.enTREmailAddress + '","DisplayFrom":"' + $scope.DTEnquiry.enTREmailAddress + '","Source":"TR"}' + comma + emailAddresses;
                        }
                        if (emailAddresses != "]") comma = ",";
                        if ($scope.DTEnquiry.enCDEmailAddress !== undefined && $scope.DTEnquiry.enCDEmailAddress !== null) {
                            emailAddresses = '{"CameFrom":"' + $scope.DTEnquiry.enCDEmailAddress + '","DisplayFrom":"' + $scope.DTEnquiry.enCDEmailAddress + '","Source":"CD"}' + comma + emailAddresses;
                        }
                        emailAddresses = '[' + emailAddresses;
                        //alert("found emailaddresses " + emailAddresses);
                        $scope.EmailAddresses = JSON.parse(emailAddresses);
                        $scope.EmailAddressesCopy = JSON.parse(emailAddresses);
                    })
                .catch(function () {
                        //alert("failed SQL search");
                        emailAddresses = "]";
                        var comma = " ";
                        if (emailAddresses != "]") comma = ",";


                        if ($scope.DTEnquiry.enED2EmailAddress !== undefined && $scope.DTEnquiry.enED2EmailAddress !== null) {
                            emailAddresses = '{"CameFrom":"' + $scope.DTEnquiry.enED2EmailAddress + '","DisplayFrom":"' + $scope.DTEnquiry.enED2EmailAddress + '","Source":"ED2"}' + comma + emailAddresses;
                        }
                        if (emailAddresses != "]") comma = ",";
                        if ($scope.DTEnquiry.enED1EmailAddress !== undefined && $scope.DTEnquiry.enED1EmailAddress !== null) {
                            emailAddresses = '{"CameFrom":"' + $scope.DTEnquiry.enED1EmailAddress + '","DisplayFrom":"' + $scope.DTEnquiry.enED1EmailAddress + '","Source":"ED1"}' + comma + emailAddresses;
                        }
                        if (emailAddresses != "]") comma = ",";
                        if ($scope.DTEnquiry.enTREmailAddress !== undefined && $scope.DTEnquiry.enTREmailAddress !== null) {
                            emailAddresses = '{"CameFrom":"' + $scope.DTEnquiry.enTREmailAddress + '","DisplayFrom":"' + $scope.DTEnquiry.enTREmailAddress + '","Source":"TR"}' + comma + emailAddresses;
                        }
                        if (emailAddresses != "]") comma = ",";
                        if ($scope.DTEnquiry.enCDEmailAddress !== undefined && $scope.DTEnquiry.enCDEmailAddress !== null) {
                            emailAddresses = '{"CameFrom":"' + $scope.DTEnquiry.enCDEmailAddress + '","DisplayFrom":"' + $scope.DTEnquiry.enCDEmailAddress + '","Source":"CD"}' + comma + emailAddresses;
                        }
                        emailAddresses = '[' + emailAddresses;

                        $scope.EmailAddresses = JSON.parse(emailAddresses);
                        $scope.EmailAddressesCopy = JSON.parse(emailAddresses);

                    });

            }


            getEmailAddresses();

        }
    ]);
})();
