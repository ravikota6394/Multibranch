(function () {
    'use strict';

    var eTrakApp = angular.module('eTrakApp');

    // Breadcrumbs controller
    eTrakApp.controller('breadcrumbs', [
        '$rootScope',
        function ($rootScope) {
            $rootScope.breadcrumbsValue = '';
            $rootScope.displayPV_CurrentEnquiry = false;
        }
    ]);

    eTrakApp.controller('breadcrumbsEnquiriesDashboardTab', [
        '$rootScope',
        function ($rootScope) {
            $rootScope.breadcrumbsValue = '> User Area > Enquiries Dashboard';
            $rootScope.displayPV_CurrentEnquiry = false;
        }
    ]);

    eTrakApp.controller('breadcrumbsDetailsTab1', ['$rootScope','$state','$stateParams',
        function ($rootScope, $state, $stateParams) {
            var enqRef = $stateParams.enqRef;
            $rootScope.breadcrumbsValue = '> User Area > Enquiry # ' + enqRef + ' > Details';
            $rootScope.displayPV_CurrentEnquiry = false;
        }]
    );
    eTrakApp.controller('breadcrumbsSearchTab', [
        '$rootScope',
        function ($rootScope) {
            var enqRef = document.getElementById('idglbCurrentEnquiryRef').value;
            $rootScope.breadcrumbsValue = ' > User Area > Enquiry # ' + enqRef+' > Search';
            $rootScope.displayPV_CurrentEnquiry = true;
        }
    ]);
    eTrakApp.controller('breadcrumbsShortlistTab', [
        '$rootScope',
        function ($rootScope) {
            var enqRef = document.getElementById('idglbCurrentEnquiryRef').value;
            $rootScope.breadcrumbsValue = ' > User Area > Enquiry # ' + enqRef + ' > Shortlist';
            $rootScope.displayPV_CurrentEnquiry = true;
        }
    ]);
    eTrakApp.controller('breadcrumbsEmailsTab', [
        '$rootScope',
        function ($rootScope) {
            var enqRef = document.getElementById('idglbCurrentEnquiryRef').value;
            $rootScope.breadcrumbsValue = ' > User Area > Enquiry # ' + enqRef + ' > Emails';
        }
    ]);
    eTrakApp.controller('breadcrumbsActionsTab', [
        '$rootScope',
        function ($rootScope) {
            var enqRef = document.getElementById('idglbCurrentEnquiryRef').value;
            $rootScope.breadcrumbsValue = ' > User Area > Enquiry # ' + enqRef + ' > Actions';
            $rootScope.displayPV_CurrentEnquiry = true;
        }
    ]);
    eTrakApp.controller('breadcrumbsNotesTab', [
        '$rootScope',
        function ($rootScope) {
            var enqRef = document.getElementById('idglbCurrentEnquiryRef').value;
            $rootScope.breadcrumbsValue = ' > User Area > Enquiry # ' + enqRef + ' > Notes';
        }
    ]);
    eTrakApp.controller('breadcrumbsQACheckTab', [
        '$rootScope',
        function ($rootScope) {
            var enqRef = document.getElementById('idglbCurrentEnquiryRef').value;
            $rootScope.breadcrumbsValue = ' > User Area > Enquiry # ' + enqRef + ' > QA Check';
            $rootScope.displayPV_CurrentEnquiry = true;
        }
    ]);
    eTrakApp.controller('breadcrumbsCompanyDetailsTab', [
        '$rootScope',
        function ($rootScope) {
            var enqRef = document.getElementById('idglbCurrentEnquiryRef').value;
            $rootScope.breadcrumbsValue = ' > User Area  > Enquiry # ' + enqRef + ' > Company Details';
            $rootScope.displayPV_CurrentEnquiry = true;
        }
    ]);
    eTrakApp.controller('breadcrumbsClientUsersTab', [
        '$rootScope',
        function ($rootScope) {
            var enqRef = document.getElementById('idglbCurrentEnquiryRef').value;
            $rootScope.breadcrumbsValue = ' > User Area > Enquiry # ' + enqRef + ' > Client Users';
            $rootScope.displayPV_CurrentEnquiry = true;
        }
    ]);
    eTrakApp.controller('breadcrumbsClientOpAgreementTab', [
        '$rootScope',
        function ($rootScope) {
            var enqRef = document.getElementById('idglbCurrentEnquiryRef').value;
            $rootScope.breadcrumbsValue = ' > User Area > Enquiry # ' + enqRef + ' > Client Operations Agreement';
            $rootScope.displayPV_CurrentEnquiry = true;
        }
    ]);
    eTrakApp.controller('breadcrumbsEnquiryHistoryTab', [
        '$rootScope',
        function ($rootScope) {
            var enqRef = document.getElementById('idglbCurrentEnquiryRef').value;
            $rootScope.breadcrumbsValue = ' > User Area > Enquiry # ' + enqRef + ' > Enquiry History';
            $rootScope.displayPV_CurrentEnquiry = true;
        }
    ]);
})();
