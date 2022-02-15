(function () {
    'use strict';

    var eTrakApp = angular.module('eTrakApp');
   
    eTrakApp.controller('R_PreCodedNotes', [
        '$scope', '$rootScope', 'R_PreCodedNotesService',
        function ($scope, $rootScope, preCodedNotesFactory) {
            var enqRef = document.getElementById('idglbCurrentEnquiryRef').value;           
            var userCode = document.getElementById("userCode").value;
          
            $scope.saveTrackingEntry = function () {             
                var record =
                    {
                        trenCode: enqRef,
                        trUserCode: userCode,
                        trDescription: $scope.trTextNotes,
                        trType: $scope.trActionType
                    };
                console.log(record);
                preCodedNotesFactory.TrackingEntry(record)
                     .success(function (trackingRecord) {
                         $scope.trackingRecord = trackingRecord;
                         $scope.trTextNotes = "";
                         $scope.trActionType = "Please select";
                         GetTrackingEntries();
                     });
            }
            GetTrackingEntries();
            function GetTrackingEntries() {
                preCodedNotesFactory.TrackingEntries(enqRef)
                   .success(function (trackingRecords) {                    
                       $scope.trackingRecords = trackingRecords;
                       $scope.trActionType = "Please select";
                       console.log($scope.trackingRecords);
                       for (var i = 0; i < $scope.trackingRecords.length; i++) {
                           var time = trackingRecords[i].trTimeStamp;

                           var hours = Number(time.match(/^(\d+)/)[1]);
                           var minutes = Number(time.match(/:(\d+)/)[1]);
                           var AMPM = time.match(/\s(.*)$/)[1].toLowerCase();
                           if (AMPM == "pm" && hours < 12) hours = hours + 12;
                           if (AMPM == "am" && hours == 12) hours = hours - 12;
                           var sHours = hours.toString();
                           var sMinutes = minutes.toString();
                           if (hours < 10) sHours = "0" + sHours;
                           if (minutes < 10) sMinutes = "0" + sMinutes;
                           trackingRecords[i].trTimeStamp = sHours + ':' + sMinutes;
                           //alert(sHours + ':' + sMinutes);
                           //alert(trackingEntries[i].trTimeStamp);

                       }
                   });
            }

            function getPreCodedNotes() {            
                preCodedNotesFactory.getPreCodedNotes()
                    .success(function (preCodedNotes) {
                        $scope.PreCodedNotes = JSON.parse(preCodedNotes);                       
                        console.log($scope.PreCodedNotes);                       
                    });
            }
            getPreCodedNotes();


        }
    ]);

})();
