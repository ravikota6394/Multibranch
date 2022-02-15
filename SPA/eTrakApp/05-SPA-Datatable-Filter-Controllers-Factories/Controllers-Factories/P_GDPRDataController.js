(function () {
    'use strict';

    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.controller('P_GDPRData', ['$scope', '$rootScope', 'GDPRDataService', controller]);

    function controller($scope, $rootScope, usersFactory) {

        $scope.validateEmails = function () {
            if ($('#id_emails').val() == "" || $('#id_emails').val() == null || $('#id_emails').val() == undefined) {
                document.getElementById("id_Emails").style.display = 'block';
                document.getElementById("id_Emails").textContent = "This field is required";
            }
            else if ($('#id_status').val() == "" ||
                $('#id_status').val() == null ||
                $('#id_status').val() == undefined) {
                document.getElementById("id_Status").style.display = 'block';
                document.getElementById("id_Status").textContent = "This field is required";
            } else {
                var emaillist = $('#id_emails').val();
                var emailslist = emaillist.split('\n');
                //if (emailslist.length > 50 ) {
                //    alert("Emails count should be lessthan or equal to 50");
                //    return;
                //}
                var status = $('#id_status').val();
                console.log("emails");
                console.log(emailslist);
                var emails = emailslist.join(',');
                $scope.validatedEmailsList = null;
                console.log($scope.emailslist);
                usersFactory.validateEmails(emails, status)
                    .success(function (emailList) {
                        $scope.emailList = emailList;
                        console.log(emailList);
                    });
                $('#idshowGdprDetails').modal('show');
            }
        }

        $scope.OpenFile = function (url) {
            window.open(url,'_blank');
        }

        $("#id_emails").focus(function () {
            document.getElementById("id_Emails").style.display = 'none';
        });
        $("#id_status").focus(function () {
            document.getElementById("id_Status").style.display = 'none';
        });

        $scope.selectRecord = function (i) {
            var selected = $scope.gdprDATA[i].IsSelected;
            $scope.gdprDATA[i].IsSelected = !(selected);
            $scope.setSelectAll();
            if (!selected) {
                document.getElementById('GDPRError').style.display = "none";
            }
        }

        $scope.submitConfirmation = function () {
            var emailslist = $('#id_emails').val().split('\n');
            $('#idshowGdprDetails').modal('hide');
            $('#id_GDPRData').modal('show');
            document.getElementById("GDPR_DeleteNotes").style.display = "none";
            $scope.emailList = $scope.emailList.find(x => x.Message == "Record existed with this EmailId");
            if ($scope.emailList) {
                document.getElementById("id_NoRecorsFound").style.display = "none";
                document.getElementById("id_recordsFound").style.display = "block";
                document.getElementById("GDPRSubmit").style.display = "initial";
                var status = $('#id_status').val();
                var usersemails = emailslist.join(',');
                $('#id_loading').show();
                $scope.gdprDATA = null;
                $scope.IsDelete = false;
                $scope.IsSend = false;
                document.getElementById('selectAllGDPR').checked = false;
                usersFactory.getGDPRData(usersemails, status)
                    .success(function (gdprDATA) {
                        $scope.gdprDATA = gdprDATA;
                        if (status.includes("Delete")) {
                            $scope.IsDelete = true;
                            document.getElementById("GDPR_DeleteNotes").style.display = "block";
                        }

                        if (status.toLowerCase().includes(("Send me").toLowerCase())) {
                            $scope.IsSend = true;
                        }

                        console.log($scope.IsSend.toString() + " " + $scope.IsDelete.toString());

                        $('#id_loading').hide();
                        document.getElementById('GDPRSubmit').innerText = $('#id_status').val();
                    });
            }
            else {
                $scope.gdprDATA = null;
                document.getElementById("GDPRSubmit").style.display = "none";
                document.getElementById("id_recordsFound").style.display = "none";
                document.getElementById("id_NoRecorsFound").style.display = "block";
            }
        }

        $scope.validateGDPR = function () {
            var gdpr = $scope.gdprDATA.find(x => x.IsSelected == true);
            if (gdpr == null) {
                document.getElementById('GDPRError').style.display = "block";
            }
            else {
                document.getElementById('GDPRError').style.display = "none";
                var gDPRs = $scope.gdprDATA;
                var status = $('#id_status').val();
                usersFactory.submitGDPRConfirmation(gDPRs, status)
                    .success(function () {
                    });
                $('#id_GDPRData').modal('hide');
                $('#id_processing').modal('show');
                if ($scope.IsSend) {
                    document.getElementById("id_senMail").style.display = "block";
                }

                if ($scope.IsSend && $scope.IsDelete) {
                    document.getElementById("id_both").style.display = "block";
                }

                if ($scope.IsDelete) {
                    document.getElementById("id_isDelete").style.display = "block";
                }
            }
        }

        $scope.setSelectAll = function () {
            var notSelected = $scope.gdprDATA.find(x => x.IsSelected == false);
            document.getElementById('selectAllGDPR').checked = notSelected == null ? true : false;
            if (notSelected == null)
                $scope.selectAllGDPR();
        }

        $scope.selectAllGDPR = function () {
            var checked = document.getElementById('selectAllGDPR').checked;
            for (let i = 0; i < $scope.gdprDATA.length; i++) {
                $scope.gdprDATA[i].IsSelected = checked;
            }
            if (checked)
                document.getElementById('GDPRError').style.display = "none";
        }
    };
})();