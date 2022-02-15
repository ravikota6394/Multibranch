(function () {
    'use strict';


    var eTrakApp = angular.module('eTrakApp');
    eTrakApp.controller('P_DetailsTab-StaticDropdowns',['$scope','$http', function ($scope, $http) {

        //


        $scope.DTGroupContactData = [
               { code: ' ', description: '' },
               { code: 'Contact #1', description: 'Contact #1' },
               { code: 'Contact #2', description: 'Contact #2' },
               { code: 'Contact #3', description: 'Contact #3' }
        ];

        $scope.DTPreferredContactData = [
            { code: ' ', description: '' },
            { code: 'Email', description: 'Email' },
            { code: 'Telephone', description: 'Telephone' },
            { code: 'Letter', description: 'Letter' }
        ];


        $scope.DTTripTypeData = [
            { code: ' ', description: '' },
            { code: 'AT&T Business Trip', description: 'AT&T Business Trip' },
            { code: 'AT&T Disaster Recovery', description: 'AT&T Disaster Recovery' },
            { code: 'AT&T Network Build', description: 'AT&T Network Build' },
            { code: 'AT&T Other', description: 'AT&T Other' },
            { code: 'AT&T Project Work', description: 'AT&T Project Work' },
            { code: 'AT&T Restoration', description: 'AT&T Restoration' },
            { code: 'AT&T Relocation', description: 'AT&T Relocation' },
            { code: 'AT&T Training', description: 'AT&T Training' },
            { code: 'Business Trip', description: 'Business Trip' },
            { code: 'HSBC - Client Billable', description: 'HSBC - Client Billable' },
            { code: 'HSBC - Customer Trip', description: 'HSBC - Customer Trip' },
            { code: 'HSBC - External Conference', description: 'HSBC - External Conference' },
            { code: 'HSBC - IM', description: 'HSBC - IM' },
            { code: 'HSBC - Internal Meeting', description: 'HSBC - Internal Meeting' },
            { code: 'HSBC - IS', description: 'HSBC - IS' },
            { code: 'HSBC - IT', description: 'HSBC - IT' },
            { code: 'HSBC - Personal Trip (Not to be used by HKG)', description: 'HSBC - Personal Trip (Not to be used by HKG)' },
            { code: 'HSBC - Relocation', description: 'HSBC - Relocation' },
            { code: 'HSBC - Roadshows', description: 'HSBC - Roadshows' },
            { code: 'HSBC - Short Term Assignment (STA)', description: 'HSBC - Short Term Assignment (STA)' },
            { code: 'HSBC - Training', description: 'HSBC - Training' },
            { code: 'HSBC - Visiting External Client', description: 'HSBC - Visiting External Client' },
            { code: 'Leisure', description: 'Leisure' },
            { code: 'Relocation', description: 'Relocation' },
            { code: 'Other', description: 'Other' }
        ];

        $scope.DTIDTypeData = [
            { code: ' ', description: '' },
            { code: 'Passport', description: 'Passport' },
            { code: 'Driving License', description: 'Driving License' },
            { code: 'European ID Card', description: 'European ID Card' }
        ];
    }]);
})();
