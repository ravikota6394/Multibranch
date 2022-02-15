(function () {
    'use strict';

    //PV_TrackingEntries
    //---------------------
    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.controller('PV_TrackingEntries', [
        '$scope', '$rootScope', '$filter', '$interval', '$sce', '$state', 'PV_TrackingEntriesService',
        function ($scope, $rootScope, $filter, $interval, $sce, $state, trackingEntriesFactory) {

            $rootScope.$state = $state;
            // ensure the correct details are in place
            var enqRef = $rootScope.globalEnCode;
            if (enqRef > "0") {
                $('#idglbCurrentEnquiryRef').val(enqRef);
                $scope.glbCurrentEnquiryRef = enqRef;
            } else {
                enqRef = document.getElementById('idglbCurrentEnquiryRef').value;
            }

            var userCode = document.getElementById("userCode").value;
            console.log("userCode: " + userCode);

            $scope.dtOptions = {
                destroy: true,
                autoWidth: false,
                order: [[1, 'desc']],
                columnDefs: [
                    {
                        targets: ['no-sort'],
                        orderable: false
                    }
                ],
                dom:
                    "<'row no-margin'<'col-sm-6 no-padding'l><'col-sm-6 no-padding'f>r>" +
                        "t" +
                        "<'row no-margin'<'col-sm-6 no-padding'i><'col-sm-6 no-padding'p>>"
            };

            function getTrackingEntries() {
                trackingEntriesFactory.getTrackingEntries(enqRef)
                    .success(function (trackingEntries) {
                        $scope.trackingEntries = trackingEntries;
                        console.log($scope.trackingEntries);
                    });

            };

            getTrackingEntries();

            function getTrackingEmails() {
                trackingEntriesFactory.getTrackingEmails(enqRef)
                    .success(function (trackingEmails) {
                        $scope.trackingEmails = trackingEmails;
                        console.log("trackingEmails");
                        console.log($scope.trackingEmails);
                    });
            };

            getTrackingEmails();

            $scope.ShowEmailDetails = function (trEmailId, trCode) {
                trackingEntriesFactory.getEmailDetails(trEmailId, userCode)
                    .success(function (emailDetails) {
                        $("#" + trCode).removeClass("ng-hide").addClass("ng-show");
                        $("#id_" + trCode).removeClass("ng-show").addClass("ng-hide");
                        $rootScope.EmailDetails = emailDetails;
                        $scope.Body = angular.fromJson($sce.trustAsHtml(emailDetails.Body));
                        console.log($scope.Body);
                        if ($rootScope.EmailDetails.CC == "null") {
                            $rootScope.EmailDetails.CC = "";
                        }
                        console.log($rootScope.EmailDetails.EmailAttachmentEntities);
                        if (MakeEmptyStringWhenNull($rootScope.EmailDetails.EmailAttachmentEntities) == "") {
                            $scope.hideAttachments = true;
                        }
                        else {
                            $scope.hideAttachments = false;
                        }
                        console.log("Email Details:");
                        console.log($rootScope.EmailDetails);
                        console.log("Action: " + $rootScope.EmailDetails.Action);
                        if ($rootScope.EmailDetails.Action == "Old Email") {
                            $('#oldEmailPopup').modal('show');
                        }
                        else {
                            $('#emailPopup').modal('show');
                        }
                        $("#" + trCode).css('cursor', 'pointer').attr('title', 'Viewed this email on ' + $filter('date')($rootScope.EmailDetails.DateTimeViewed, ' dd-MMM-yyyy HH:mm') + " by " + $rootScope.EmailDetails.ViewedUsers);
                    });
            }

            $scope.ShowSecureFormMessage = function (trDescription) {
                if (trDescription == "Saved Payment Details using Secure Booking Form, see shortlist tab for cc icon") {
                    $state.go('detailsTab.shortlist', { enqRef: $scope.DTEnquiry.enCode });
                }
            };

            function MakeEmptyStringWhenNull(value) {
                if (value == null) {
                    value = "";
                }
                else if (value == "undefined") {
                    value = "";
                }
                else if (value == undefined) {
                    value = "";
                }
                else if (value == "null") {
                    value = "";
                }
                else {
                    value = value;
                }
                return value;
            }

            $('#idTrackingEmails').contextmenu({
                target: '#context-menu',
                scopes: 'tbody > tr',
                onItem: function (row, e) {
                    var trCode = $(row.children('*')[0]).text();
                    console.log('trCode: ' + trCode);
                    trackingEntriesFactory.madeEmailAsUnRead(trCode)
                        .success(function (status) {
                            console.log(status);
                            if (status === "Success") {
                                console.log(status);
                                $("#" + trCode).removeClass("ng-show").addClass("ng-hide");
                                $("#id_" + trCode).removeClass("ng-show").addClass("ng-hide");
                            }
                        });
                }
            });

            $scope.ShowAttachments = function (id) {
                console.log("Email Id:" + id);
                trackingEntriesFactory.getAttachments(id)
                    .success(function (attachments) {
                        $rootScope.AttachmentsList = attachments;
                        console.log($scope.AttachmentsList);
                        $('#emailPopup').modal('hide');
                        $('#oldEmailPopup').modal('hide');
                        $('#myAttachments').modal('show');
                    });
            }

        }
    ]);

})();
