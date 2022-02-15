(function () {
    'use strict';

    var eTrakApp = angular.module('eTrakApp');

    // Email Templates
    eTrakApp.controller('R_Properties', [
        '$scope', '$rootScope', '$stateParams', '$state', 'R_PropertiesService', 'R_EnquiryFiltersService', 'R_EnqSourcesService', 'R_CitiesService', 'R_CountriesService', 'R_BudgetCategoriesService', 'R_ApartmentTypesService', 'logger',
        function ($scope, $rootScope, $stateParams, $state, chosenPropertiesFactory, enquiryFiltersFactory, enqSourcesService, citiesService, countriesService, budgetCategoriesService, apartmentTypesService, logger) {

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
            var user = document.getElementById("divUserCode").value;


            $scope.swOptions = {
                retrieve: true,
                autoWidth: false,
                order: [[1, 'asc']],
                columnDefs: [
                    { width: '25px', targets: 0 },
                    { width: '25px', targets: 2 }
                ]
            };

            $scope.title = "Search Widget Demo";

            $scope.autoDropdownForProperty = true;

            $scope.selectPropertyName = function (propertyDetails) {
                console.log("Passing Property Details For API" + propertyDetails);
                chosenPropertiesFactory.getChosenPropertyInformation(propertyDetails)
                    .success(function (detailsOfProperty) {
                        $scope.chosenPropertyDetails = detailsOfProperty;
                        console.log($scope.chosenPropertyDetails);
                        $scope.autoDropdownForProperty = false;
                    });
            }

            $(document).on("click",
                function (event) {
                    var $trigger = $("#autoComplete");
                    if ($trigger !== event.target && !$trigger.has(event.target).length) {
                        $scope.autoDropdownForProperty = true;
                    }
                });

            $scope.AddChosenPropertyToTable = function () {
                console.log("Add Chosen Property");
                console.log("Property Id:" + $rootScope.chosenPropertyId + " , " + enqRef);
                chosenPropertiesFactory.getChosenProperties(enqRef)
                    .success(function (chosenProperties) {
                        $scope.listedProperties = chosenProperties;
                        console.log($scope.listedProperties);
                        angular.forEach(chosenProperties, function (value, key) {
                            console.log(value);
                            if (value.prPropertyCode == $rootScope.chosenPropertyId) {
                                $scope.isAdded = $rootScope.chosenPropertyId;
                            }
                        });
                        if ($scope.isAdded == $rootScope.chosenPropertyId) {
                            $scope.isAdded = 0;
                            $("#propertiesModal").modal("show");
                        }
                        else {
                            $scope.isAdded = 0;
                            saveApartment(enqRef);
                        }
                    });
            }

            function saveApartment(enqRef) {
                chosenPropertiesFactory.saveSpecificApartmentdetails(enqRef, $rootScope.chosenPropertyId)
                    .success(function (detailsOfProperty) {
                        //Google Analytics
                        ga('send', 'event', 'Search Tab', 'Shortlisted the Property ', 'of PropertyId: ' + $rootScope.chosenPropertyId + ' in enquiry ' + enqRef + ' by ' + userCode);
                        getChosenProperties();
                    });
            }

            $scope.selectedProperty = function (propertyDetails) {
                console.log(propertyDetails);
                $rootScope.chosenPropertyId = propertyDetails.PropertyID;
                $scope.chosenPropertyName = propertyDetails.Name;
                console.log($scope.chosenPropertyId + '' + $scope.chosenPropertyName);
                $scope.autoDropdownForProperty = true;
            }


            function getChosenProperties() {
                chosenPropertiesFactory.getChosenProperties(enqRef)
                    .success(function (chosenProperties) {
                        $scope.ChosenProperties = chosenProperties;
                        $scope.swOptions.reloadData();
                        $scope.apply();
                    });
            }

            getChosenProperties();

            $scope.searchWidget = new TasSearchWidget(document.getElementById("searchWidget"));

            console.log(document.getElementById("searchWidget"));

            console.log($scope.searchWidget);

            // Search widget 'init' event. This handler it called whenever the widget needs data refresh
            //$scope.searchWidget.onInit = function () {                
            //    // Creating array of property ids to set as shortlisted
            //    var propertyIDs = $scope.ChosenProperties.map(function (property) { return property.prPropertyCode });
            //    //$scope.searchWidget.initShortListProperties(propertyIDs);                
            //}

            // SEARCH WIDGET EVENTS
            // Property was added to shortlist in the search widget
            $scope.searchWidget.onShortListPropertyAdded = function (property) {
                $scope.addChosenProperty(property);
                getChosenProperties();
                $scope.swOptions.reloadData();
                $scope.$apply();
            }

            // Property was removed from shortlist in the search widget
            $scope.searchWidget.onShortListPropertyRemoved = function (property) {
                removePropertyCode(property.PrId);
                $scope.swOptions.reloadData();
                $scope.$apply();
            }

            // INTERNAL EVENTS 
            // Property removed from the list - reflect in the search widget
            // This gets the ID using the enqRef and propertyCode longwinded but now linked with the delete button
            $scope.onPropertyRemoved = function (propertyId, propertyCode) {
                //Google Analytics
                ga('send', 'event', 'Search Tab', 'Removed the Shortlisted Property ', 'of PropertyId: ' + propertyCode + ' in enquiry ' + enqRef + ' by ' + userCode);
                removePropertyId(propertyId);
                chosenPropertiesFactory.createTrackingEntryForDeletingProperty(user, propertyCode);
                $scope.searchWidget.removeShortListProperty(propertyCode);
                $scope.$apply();
            }

            var removePropertyId = function (propertyId) {
                var timeout = setTimeout(function () {
                    var promiseGet = chosenPropertiesFactory.deleteChosenPropertyId(propertyId)
                        .success(function () {
                            getChosenProperties();
                            $scope.apply();
                            $scope.swOptions.reloadData();
                        }, 50);

                });
            }

            var removePropertyCode = function (propertyCode) {
                // alert("delete property Code " + propertyCode);
                var timeout = setTimeout(function () {
                    var promiseGet = chosenPropertiesFactory.getChosenProperty(enqRef, propertyCode)
                        .success(function (ret) {
                            removePropertyCode2(ret[0].ID);
                        })
                        .catch(
                            function () {
                                logger.info("Failed Property Code");
                            }
                        );

                }, 50);

                function removePropertyCode2(propertyID) {
                    var timeout = setTimeout(function () {
                        var promiseGet = chosenPropertiesFactory.deleteChosenPropertyId(propertyID)
                            .success(function () {
                                getChosenProperties();
                                $scope.apply();
                                $scope.swOptions.reloadData();
                            }
                            ).catch(failedGet);
                    }, 50);


                }
                function failedGet() {
                    //alert("Failed");
                }
                return;

            }

            $scope.addChosenProperty = function (property) {
                console.log(property);
                var propertyRecord = {
                    prEnCode: enqRef,
                    prCurrentProposal: 1,
                    prPropertyCode: property.PrId,
                    prName: property.PrName,
                    prDateAdded: new Date(),
                    prPropertyPopUpHTML: $rootScope.NewTasUrl + "#/property?id=" + property.PrId + "?popupClass=true",
                    prSearchFilterID: $rootScope.globalEfCurrentID,
                    // These need getting from TAS and FiveWin
                    //----------------------------------------
                    prTASID: 0,
                    prFiveWinID: 0,
                    prShortDescription: property.PropertyName,
                    prLongDescription: property.PrShortDescription.toString(),
                    prStatus: "Status",
                    prCurrencyID: 0,
                    prContactDetails: '',
                    prClientRequestedDate: new Date(),
                    prOfferDetails: "",
                    prCancellationPolicy: "",
                    prTaxIncluded: 1,
                    prTaxRate: "",
                    prPriority: property.PropertyPriority

                };
                console.log(propertyRecord);
                chosenPropertiesFactory.getChosenProperties(enqRef)
                    .success(function (chosenProperties) {
                        $scope.listedProperties = chosenProperties;
                        console.log($scope.listedProperties);
                        angular.forEach($scope.listedProperties, function (value, key) {
                            if (value.prPropertyCode == property.PrId) {
                                $scope.propertId = property.PrId;
                            }
                        });
                        if ($scope.propertId == property.PrId) {
                            $("#propertiesModal").modal("show");
                        }
                        else {
                            chosenPropertiesFactory.createPropertyChoice(propertyRecord)
                                .success(function () {
                                    //Google Analytics
                                    ga('send', 'event', 'Search Tab', 'Shortlisted the Property ', 'of PropertyId: ' + property.id + ' in enquiry ' + enqRef + ' by ' + userCode);
                                    getChosenProperties();
                                    createTrackingRecordForShortListingProperty(propertyRecord);
                                    $scope.swOptions.reloadData();
                                    $scope.swOptions.reloadData();

                                });
                        }
                    });
            }


            function createTrackingRecordForShortListingProperty(propertyRecord) {
                console.log("propertylog");
                console.log(propertyRecord);
                chosenPropertiesFactory.createTrackingEntryForShortListedProperty(user, propertyRecord.prName, propertyRecord.prEnCode);
            }

            $scope.displayPropertyInfo = function (popUpHTMLURL, propertyName, prID) {
                console.log(prID);
                popUpHTMLURL = $rootScope.NewTasUrl + "#/property?id=" + prID;
                chosenPropertiesFactory.createTrackingEntryForViewingProperty(user, propertyName);
                window.open(popUpHTMLURL, propertyName, "width=1000, height=1000");
            }
        }
    ]);
})();
