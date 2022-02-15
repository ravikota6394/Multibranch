(function () {

    //// Ensure that breeze is minimally configured by loading it when the app runs
    //eTrakApp.run(['breeze', function (breeze) { }]); // doing nothing at the moment
    //breeze.config.initializeAdapterInstance("modelLibrary", "backingStore", true);
    //breeze.NamingConvention.camelCase.setAsDefault();
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    
})();