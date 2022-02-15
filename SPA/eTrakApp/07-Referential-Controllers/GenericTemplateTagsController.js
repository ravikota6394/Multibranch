eTrakApp.controller('GenericTemplateTags',['$scope','GenericTemplateTagsService', function ($scope, GenericTemplateTagsService) {
    getGenericTemplateTags();
    
    function getGenericTemplateTags() {
        GenericTemplateTagsService.getGenericTemplateTags()
            .success(function (genericTags) {
            console.log("Generic");
            console.log("Generic Tags: " + genericTags);
            $scope.genericTags = genericTags;
        });
    }
}]);