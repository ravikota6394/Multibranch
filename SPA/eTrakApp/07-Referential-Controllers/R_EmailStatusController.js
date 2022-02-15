eTrakApp.controller('R_EmailStatusController', ['$scope','R_EmailStatusService','$rootScope', function ($scope, R_EmailStatusService, $rootScope) {
    
    GetEmails();
    function GetEmails() {
        console.log('request in for getting all emails.');
        var listOfEmails = R_EmailStatusService.EmailsList();
        listOfEmails.then(function (response) {            
            console.log(angular.fromJson(response.data));
            console.log("another large query fired for emails and got lot of data to front end.");
            $rootScope.EmailsList = angular.fromJson(response.data);            
        }, function () {
        });
    }
   
    $scope.FindAttachmentsPath = function (id) {               
        console.log("Email Id:" + id);
        var attachmentsPath = R_EmailStatusService.GetAttachmentsPath(id);
        attachmentsPath.then(function (filenames) {           
            console.log(angular.fromJson(filenames.data));
            console.log("Getting Attached File Names.");
            $rootScope.AttachmentsPathList = angular.fromJson(filenames.data);
            console.log($rootScope.AttachmentsPathList);           
            $('#myAttachmentPaths').modal('show');  
        }, function () {
        });
    }

    $rootScope.ShowAttachment = function (attachmentPath) {       
        console.log(attachmentPath);
        var myWindow = window.open(attachmentPath, "scrollbars=1,width=1000, height=1000");        
    }

}]);
