eTrakApp.service('GenericTemplateTagsService', ['$http', function ($http) {

    this.getGenericTemplateTags = function () {
        return $http.get("GenericTemplateTags/GetGenericTemplateTags");
    }

}]);