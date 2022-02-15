(function () {
    
    'use strict';

    var eTrakApp = angular.module('eTrakApp');

    eTrakApp.controller('R_CodedNotes', [
        '$scope', '$rootScope', 'R_PreCodedNotesService',
        function ($scope, $rootScope, preCodedNotesFactory) {  
            getPreCodedNotes();
            function getPreCodedNotes() {      
                preCodedNotesFactory.getPreCodedNotes()
                    .success(function (preCodedNotes) {
                        $scope.PreCodedNotes = JSON.parse(preCodedNotes);
                        console.log($scope.PreCodedNotes);
                    });
            }
        }
    ]);

})();
