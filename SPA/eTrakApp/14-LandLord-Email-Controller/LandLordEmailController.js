eTrakAppModuleLandlord.controller('LandLordEmailController', function ($scope, $sce, $filter, $rootScope, LandLordEmailService) {
    getLandLordEmailInformation();
    console.log('landlord controller');
    var avLandLordId, heldUntil, heldUntilInDays;
    function getLandLordEmailInformation() {
        var emailKey = document.getElementById("txtEmailKey").value;
        $scope.Id = emailKey;
        console.log($scope.Id);
        var landlordEmailResponse = LandLordEmailService.LandLordEmailInformation($scope.Id);
        landlordEmailResponse.then(function (landlordEmailRecord) {
            avLandLordId = angular.fromJson(landlordEmailRecord.data).ID;
            $scope.heldUntilDay = angular.fromJson(landlordEmailRecord.data).avDateHeldUntilDay;
            $scope.heldUntilMonth = angular.fromJson(landlordEmailRecord.data).avDateHeldUntilMonth;
            $scope.heldUntilYear = angular.fromJson(landlordEmailRecord.data).avDateHeldUntilYear;
            $scope.heldUntilTime = angular.fromJson(landlordEmailRecord.data).avDateHeldUntilTime;
            heldUntilInDays = angular.fromJson(landlordEmailRecord.data).heldUntilInDays;
            console.log('Offer held until in days: ' + heldUntilInDays);
            if (heldUntilInDays === "0.5") {
                $scope.HeldUntil = "12hrs";
                document.getElementById("offer_HeldUntil").style.display = 'none';
            }
            else if (heldUntilInDays === "1") {
                $scope.HeldUntil = "24hrs";
                document.getElementById("offer_HeldUntil").style.display = 'none';
            }
            else if (heldUntilInDays === "2") {
                $scope.HeldUntil = "48hrs";
                document.getElementById("offer_HeldUntil").style.display = 'none';
            }
            else if (heldUntilInDays === "5") {
                $scope.HeldUntil = "5days";
                document.getElementById("offer_HeldUntil").style.display = 'none';
            }
            else if (heldUntilInDays === "7") {
                $scope.HeldUntil = "7days";
                document.getElementById("offer_HeldUntil").style.display = 'none';
            }
            else if (heldUntilInDays === "30") {
                $scope.HeldUntil = "1Month";
                document.getElementById("offer_HeldUntil").style.display = 'none';
            }
            else {
                $scope.HeldUntil = "Other";
                document.getElementById("offer_HeldUntil").style.display = 'block';
            }
            console.log(angular.fromJson(landlordEmailRecord.data));
            if (landlordEmailRecord.data.avDateAccepted != null) {
                $scope.InputDivVisible = false;
                $scope.ShowMessage = true;
                $scope.Message = "The availability request has already been accepted.";
                console.log($scope.Message);
            }
            else {
                $scope.avDayRate = angular.fromJson(landlordEmailRecord.data).avDayRate;
                $scope.avCancellationPolicy = angular.fromJson(landlordEmailRecord.data).avCancellationPolicy;
                $scope.prEncode = angular.fromJson(landlordEmailRecord.data).prEncode;
                //Google Analytics 
                ga('send', 'event', 'Landlord Form', 'Entered the Landlord Response Form', 'of enquiry number ' + $scope.prEncode);
                $scope.prLongDescription = angular.fromJson(landlordEmailRecord.data).prLongDescription;
                $scope.prOfferDetails = angular.fromJson(landlordEmailRecord.data).prOfferDetails;
                $scope.prTaxIncluded = angular.fromJson(landlordEmailRecord.data).prTaxIncluded;
                if ($scope.prTaxIncluded == 1)
                    $scope.prTaxIncluded = "Yes";
                else if ($scope.prTaxIncluded == 0)
                    $scope.prTaxIncluded = "No";
                else if ($scope.prTaxIncluded == null || $scope.prTaxIncluded == undefined)
                    $scope.prTaxIncluded = "";
                else
                    $scope.prTaxIncluded = "";
                //$scope.prTomsTaxIncluded = angular.fromJson(landlordEmailRecord.data).prTomsTaxIncluded;
                //if ($scope.prTomsTaxIncluded == 1)
                //    $scope.prTomsTaxIncluded = "Yes";
                //else if ($scope.prTomsTaxIncluded == 0)
                //    $scope.prTomsTaxIncluded = "No";
                //else if ($scope.prTomsTaxIncluded == null || $scope.prTomsTaxIncluded == undefined)
                //    $scope.prTomsTaxIncluded = "";
                //else
                //    $scope.prTomsTaxIncluded = "";
                $scope.enEDLeadPassengerName = angular.fromJson(landlordEmailRecord.data).enEDLeadPassengerName;
                $scope.coName = angular.fromJson(landlordEmailRecord.data).coName;
                $scope.coCity = angular.fromJson(landlordEmailRecord.data).coCity;
                $scope.enEDTimeOfArrival = angular.fromJson(landlordEmailRecord.data).enEDTimeOfArrival;
                $scope.bcDescription = angular.fromJson(landlordEmailRecord.data).bcDescription;
                $scope.enEDTotalPassengers = angular.fromJson(landlordEmailRecord.data).enEDTotalPassengers;
                $scope.enEDDateOfArrival = angular.fromJson(landlordEmailRecord.data).enEDDateOfArrival;
                $scope.enEDDepartureDate = angular.fromJson(landlordEmailRecord.data).enEDDepartureDate;
                $scope.enEDNights = angular.fromJson(landlordEmailRecord.data).enEDNights;
                $scope.enEDComments = angular.fromJson(landlordEmailRecord.data).enEDComments;
                $scope.enEDApartmentType = angular.fromJson(landlordEmailRecord.data).enEDApartmentType;
                $scope.currencyName = angular.fromJson(landlordEmailRecord.data).currencyName;
                $scope.enEDBudgetAmount = angular.fromJson(landlordEmailRecord.data).enEDBudgetAmount;
                $scope.enEDParkingRequired = angular.fromJson(landlordEmailRecord.data).enEDParkingRequired;
                console.log("pets");
                console.log($scope.enEDParkingRequired);                
                if ($scope.enEDParkingRequired == true) {
                    $scope.enEDParkingRequired = "Yes"
                    console.log("pets");
                    console.log($scope.enEDParkingRequired);
                }
               else {
                    $scope.enEDParkingRequired = "No"
                    console.log($scope.enEDParkingRequired);
                }                                  
                console.log($scope.enEDParkingRequired);
                $scope.enEDPetsRequired = angular.fromJson(landlordEmailRecord.data).enEDPetsRequired;
                if ($scope.enEDPetsRequired == true) {
                    $scope.enEDPetsRequired = "Yes"
                    console.log("pets");
                    console.log($scope.enEDPetsRequired);
                }
                else {
                    $scope.enEDPetsRequired = "No"
                    console.log($scope.enEDPetsRequired);
                }
                $scope.enEDPetsType = angular.fromJson(landlordEmailRecord.data).enEDPetsType;
                $scope.atDescription = angular.fromJson(landlordEmailRecord.data).atDescription;               
                if ($scope.atDescription == null || $scope.atDescription == undefined) {
                    $scope.atDescription = "";                    
                }
                else {
                    if ($scope.atDescription == "Other") {
                        $scope.atDescriptionWhenOther = angular.fromJson(landlordEmailRecord.data).atDescriptionWhenOther;
                        $rootScope.atDescriptionWhenSelectedOther = $scope.atDescriptionWhenOther;
                        document.getElementById("apartment-Type").style.display = 'block';
                    }
                }
                $rootScope.apartmentType = $scope.atDescription;
                $scope.prTaxAppliedAllNights = angular.fromJson(landlordEmailRecord.data).prTaxAppliedAllNights;
                if ($scope.prTaxAppliedAllNights == null || $scope.prTaxAppliedAllNights == undefined)
                    $scope.prTaxAppliedAllNights = "";
                $scope.prTaxNotes = angular.fromJson(landlordEmailRecord.data).prTaxNotes;
                $scope.prCommissionIncluded = angular.fromJson(landlordEmailRecord.data).prCommissionIncluded;
                console.log($scope.prCommissionIncluded);
                if ($scope.prCommissionIncluded == "Remote 5%" || $scope.prCommissionIncluded == "10%" || $scope.prCommissionIncluded == "15%" || $scope.prCommissionIncluded == "20%" || $scope.prCommissionIncluded == "" || $scope.prCommissionIncluded == null || $scope.prCommissionIncluded == undefined) {
                    if ($scope.prCommissionIncluded == null || $scope.prCommissionIncluded == undefined) {
                        document.getElementById("commission-Included").style.display = 'none';
                        $scope.prCommissionIncluded = "";
                    }
                    else {
                        document.getElementById("commission-Included").style.display = 'none';
                        $scope.prCommissionIncluded = $scope.prCommissionIncluded;
                    }
                }
                else {
                    var prCommissionIncluded = $scope.prCommissionIncluded;
                    $scope.prCommissionIncluded = "Other";
                    document.getElementById("commission-Included").style.display = 'block';
                    $scope.CommissionIncludedRate = prCommissionIncluded;
                }
                $scope.prHolderName = angular.fromJson(landlordEmailRecord.data).prHolderName;
                $scope.prInternalReference = angular.fromJson(landlordEmailRecord.data).prInternalReference;
                $scope.prTelephoneNumber = angular.fromJson(landlordEmailRecord.data).prTelephoneNumber;
                $scope.prCurrency = angular.fromJson(landlordEmailRecord.data).prCurrency;
                $scope.prTaxRate = angular.fromJson(landlordEmailRecord.data).prTaxRate;
                $scope.avPropertyName = angular.fromJson(landlordEmailRecord.data).avPropertyName;
                $scope.heldUntilUTC = angular.fromJson(landlordEmailRecord.data).avHeldUntilUTC;
                $scope.avRealPropertyName = angular.fromJson(landlordEmailRecord.data).avRealPropertyName;
                $scope.prAddress = angular.fromJson(landlordEmailRecord.data).prAddress;
                console.log($scope.avPropertyName);
                $scope.InputDivVisible = true;
                $scope.MessageVisible = false;
                $scope.ShowMessage = false;
                $scope.Message = "";
                $("#id_IsAvailabile").modal("show");
            }
        }, function () {
        });
    }

    $scope.DissmissAvailabilityCheck = function () {      
        $("#id_IsAvailabile").modal("hide");
    }

    $scope.ConfirmNoAvailability = function () {
        $("#id_ConfirmAvailability").modal("show");
    }


    $scope.NoAvailabity = function () {
        var emailKey = document.getElementById("txtEmailKey").value;
        LandLordEmailService.LandLordNoAvailabilityInformation(emailKey)
            .then(function (message) {
                $("#id_ConfirmAvailability").modal("hide");
                $("#id_IsAvailabile").modal("hide");
                console.log(message.data);
                $scope.Message = $sce.trustAsHtml(message.data);
                console.log($sce.trustAsHtml(message.data));
                $scope.InputDivVisible = false;
                $scope.MessageVisible = true;
            });
    }

    $scope.DismissNoAvailability = function () {
        $("#id_ConfirmAvailability").modal("hide");
        $scope.isNotAvailable = false;
    }

    $scope.ValidateTaxRate = function (event) {
        console.log(event);
        if (event.which != 8 && event.which != 0 && (event.which < 48 || event.which > 57)) {
            $("#validate_TaxRate").html("Enter only digits").show().fadeOut(3000);
            return event.preventDefault();
        }
    }

    getApartmentTypes();
    function getApartmentTypes() {
        var emailKey = document.getElementById("txtEmailKey").value;
        console.log(emailKey);
        var apartmentTypes = LandLordEmailService.getApartmentTypes(emailKey);
        apartmentTypes.then(function (response) {
            $scope.ApartmentTypes = angular.fromJson(response.data);
            console.log($scope.ApartmentTypes);
        });
    }

    $scope.saveCommissionIncluded = function (prCommissionIncluded) {
        if (prCommissionIncluded == "Other") {
            document.getElementById("commission-Included").style.display = 'block';
        }
        else {
            document.getElementById("commission-Included").style.display = 'none';
        }
    }

    $rootScope.apartmentType != "";
    $scope.ChangeApartmentType = function (apartmentType) {
        console.log("Real Apartment Type: " + $rootScope.apartmentType);
        console.log("Changed Apartment Type: " + apartmentType);
        if ($rootScope.apartmentType != apartmentType && $rootScope.apartmentType != "") {
            if (apartmentType == "Other") {
                document.getElementById("apartment-Type").style.display = 'block';
            }
            else {
                document.getElementById("apartment-Type").style.display = 'none';
            }
            $("#id_ChangeSuppliedApartmentType").modal("show");
        }
        else {
            if (apartmentType == "Other") {
                document.getElementById("apartment-Type").style.display = 'block';
            }
            else {
                document.getElementById("apartment-Type").style.display = 'none';
            }
            $rootScope.changedApartmentType = false;
        }
    }

    $rootScope.ChangeApartmentText = function (apartment) {
        console.log("Changed apartment text: " + apartment);
        console.log("existed apartment text: " + $rootScope.apartmentType);        
        if ($rootScope.atDescriptionWhenSelectedOther != apartment && $rootScope.atDescriptionWhenSelectedOther != "" && $rootScope.apartmentType != "") {
            $("#id_ChangeSuppliedApartmentType").modal("show");
        }
        else {
            $rootScope.changedApartmentType = false;
        }
    }

    $scope.NotToChangeApartmentType = function () {
        $scope.atDescription = $rootScope.apartmentType;
        if ($rootScope.apartmentType == "Other") {
            document.getElementById("apartment-Type").style.display = 'block';
            $scope.atDescriptionWhenOther = $rootScope.atDescriptionWhenSelectedOther;
        }
        $rootScope.changedApartmentType = false;
        $("#id_ChangeSuppliedApartmentType").modal("hide");
    }

    $scope.AgreeToChangeApartmentType = function () {
        $rootScope.changedApartmentType = true;
        $("#id_ChangeSuppliedApartmentType").modal("hide");
    }

    $scope.saveHeldUntil = function (HeldUntil) {
        console.log("Entering into the method of change helduntil:" + HeldUntil);
        if (HeldUntil == "Other") {
            document.getElementById("offer_HeldUntil").style.display = 'block';
        }
        else {
            document.getElementById("offer_HeldUntil").style.display = 'none';
        }
    }

    $scope.UpdateInformation = function () {
        console.log($('#aof-apartmenttype').val());
        var checkWhetherDateOrDays;
        var emailKey = document.getElementById("txtEmailKey").value;
        $scope.Id = emailKey;
        console.log($scope.Id);
        console.log('Enter into update information');
        console.log("Dropdown value:" + $('#aof-offerhelduntil').val());
        console.log("Dropdown value of prCommissionIncluded:" + $('#aof-commissioninclinrate').val());
        console.log("Text Box value of prCommissionIncluded:" + $('#commission-Included').val());
        console.log("Dropdown value of prApartmentType:" + $('#aof-apartmenttype').val());
        console.log("Text Box value of prApartmentType:" + $('#apartment-Type').val());
        var record =
        {
            ID: avLandLordId,
            avDayRate: $('#aof-ratepernight').val(),
            avCancellationPolicy: $('#aof-cancellationpolicy').val(),
            heldUntilInDays: $('#aof-offerhelduntil').val(),
            avDateHeldUntilDay: $('#offer_HeldUntilDay').find("option:selected").val(),
            avDateHeldUntilMonth: $('#offer_HeldUntilMonth').find("option:selected").val(),
            avDateHeldUntilYear: $('#offer_HeldUntilYear').val(),
            avDateHeldUntilTime: $('#offer_HeldUntilTime').val(),
            avHeldUntilUTC: $('#aof-utcofferhelduntil').val(),
            prTaxIncluded: $('#aof-taxesapplicable').val(),
            //prTomsTaxIncluded: $('#aof-tomsTax').val(),
            prOfferDetails: $('#aof-offernotes').val(),
            prTaxAppliedAllNights: $('#aof-taxappliedallnights').val(),
            prTaxNotes: $('#aof-taxnotes').val(),
            prCommissionIncluded: $('#aof-commissioninclinrate').val(),
            prCommissionIncludedWhenOther: $('#commission-Included').val(),
            prHolderName: $('#aof-name').val(),
            prInternalReference: $('#aof-reference').val(),
            prTelephoneNumber: $('#aof-phone').val(),
            prCurrency: $('#aof-currency').val(),
            atDescription: $('#aof-apartmenttype').val(),
            atDescriptionWhenOther: $('#apartment-Type').val(),
            prTaxRate: $('#aof-taxRate').val(),
            avPageName: $scope.Id,
            termsAndConditions: document.getElementById("termsAndConditions").checked,
            gdpr: document.getElementById("gdpr").checked,
            seFrom: 'etrak@apartmentservice.com'
        };
        var regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
        console.log(record);
        console.log($rootScope.changedApartmentType);
        console.log($('#aof-offernotes').val());
        if ($('#aof-ratepernight').val() == "" || $('#aof-ratepernight').val() == null || $('#aof-ratepernight').val() == undefined) {
            document.getElementById("ratePerNight").style.display = 'block';
            document.getElementById("ratePerNight").textContent = "This field is required";
        }
        else if ($('#aof-apartmenttype').val() == "" || $('#aof-apartmenttype').val() == null || $('#aof-apartmenttype').val() == undefined) {
            document.getElementById("appartmentType").style.display = 'block';
            document.getElementById("appartmentType").textContent = "This field is required";
        }
        else if (($('#apartment-Type').val() == "" || $('#apartment-Type').val() == null) && ($('#aof-apartmenttype').val() == "Other")) {
            document.getElementById("appartmentType").style.display = 'block';
            document.getElementById("appartmentType").textContent = "This field is required";
        }
        else if ($('#aof-taxappliedallnights').val() == "" || $('#aof-taxappliedallnights').val() == null || $('#aof-taxappliedallnights').val() == undefined) {
            document.getElementById("taxAppliedAllNights").style.display = 'block';
            document.getElementById("taxAppliedAllNights").textContent = "This field is required";
        }
        else if ($('#aof-cancellationpolicy').val() == "" || $('#aof-cancellationpolicy').val() == null || $('#aof-cancellationpolicy').val() == undefined) {
            document.getElementById("cancellationpolicy").style.display = 'block';
            document.getElementById("cancellationpolicy").textContent = "This field is required";
        }
        else if ($('#aof-name').val() == "" || $('#aof-name').val() == null || $('#aof-name').val() == undefined) {
            document.getElementById("name").style.display = 'block';
            document.getElementById("name").textContent = "This field is required";
        }
        else if (!(regex.test($('#aof-phone').val())) || $('#aof-phone').val() == "" || $('#aof-phone').val() == null || $('#aof-phone').val() == undefined) {
            document.getElementById("phone").style.display = 'block';
            document.getElementById("phone").textContent = "Please start with +(country code) and then add local telephone number";
        }
        else if ($('#aof-commissioninclinrate').val() == "" || $('#aof-commissioninclinrate').val() == null || $('#aof-commissioninclinrate').val() == undefined) {
            document.getElementById("commissionIncluded").style.display = 'block';
            document.getElementById("commissionIncluded").textContent = "This field is required";
        }
        else if (($('#commission-Included').val() == "" || $('#commission-Included').val() == null) && ($('#aof-commissioninclinrate').val() == "Other")) {
            document.getElementById("commissionIncluded").style.display = 'block';
            document.getElementById("commissionIncluded").textContent = "This field is required";
        }
        else if ($('#aof-offerhelduntil').val() == "" || $('#aof-offerhelduntil').val() == null || $('#aof-offerhelduntil').val() == undefined || $('#aof-offerhelduntil').val() == "Please select") {
            document.getElementById("offerHeldUntil").style.display = 'block';
            document.getElementById("offerHeldUntil").textContent = "This field is required";
        }
        else if (($('#offer_HeldUntilDay').find("option:selected").val() == "" || $('#offer_HeldUntilDay').find("option:selected").val() == null) && ($('#aof-offerhelduntil').val() == "Other")) {
            document.getElementById("offerHeldUntil").style.display = 'block';
            document.getElementById("offerHeldUntil").textContent = "This field is required";
        }
        else if (($('#offer_HeldUntilMonth').find("option:selected").val() == "" || $('#offer_HeldUntilMonth').find("option:selected").val() == null) && ($('#aof-offerhelduntil').val() == "Other")) {
            document.getElementById("offerHeldUntil").style.display = 'block';
            document.getElementById("offerHeldUntil").textContent = "This field is required";
        }
        else if (($('#offer_HeldUntilYear').val() == "" || $('#offer_HeldUntilYear').val() == null) && ($('#aof-offerhelduntil').val() == "Other")) {
            document.getElementById("offerHeldUntil").style.display = 'block';
            document.getElementById("offerHeldUntil").textContent = "This field is required";
        }
        else if (($('#offer_HeldUntilTime').val() == "" || $('#offer_HeldUntilTime').val() == null) && ($('#aof-offerhelduntil').val() == "Other")) {
            document.getElementById("offerHeldUntil").style.display = 'block';
            document.getElementById("offerHeldUntil").textContent = "This field is required";
        }
        else if ($('#aof-taxRate').val() == "" || $('#aof-taxRate').val() == null || $('#aof-taxRate').val() == undefined) {
            document.getElementById("taxRate").style.display = 'block';
            document.getElementById("taxRate").textContent = "This field is required";
        }
        else if ($('#aof-taxesapplicable').val() == "" || $('#aof-taxesapplicable').val() == null || $('#aof-taxesapplicable').val() == undefined) {
            document.getElementById("taxApplied").style.display = 'block';
            document.getElementById("taxApplied").textContent = "This field is required";
        }
        else if ($('#aof-offernotes').val() == "" && $rootScope.changedApartmentType == true) {
            document.getElementById("offerNotes").style.display = 'block';
            document.getElementById("offerNotes").textContent = "Please tell us why you have changed the apartment type";
        }
        else if ($scope.termsAndConditions === undefined || $scope.termsAndConditions === false || $scope.termsAndConditions === 0) {
            document.getElementById("hasAgreedToTerms").style.display = 'block';
            document.getElementById("hasAgreedToTerms").textContent = "Please agree to Terms and Conditions";
        }
        else if ($scope.gdpr === undefined || $scope.gdpr === false || $scope.gdpr === 0) {
            document.getElementById("hasAgreedToPrivacy").style.display = 'block';
            document.getElementById("hasAgreedToPrivacy").textContent = "Please agree to Privacy Policy";
        }
        else {
            var information = LandLordEmailService.LandLordInformation(record);
            information.then(function (message) {
                console.log(message.data);
                $scope.Message = $sce.trustAsHtml(message.data);
                console.log($sce.trustAsHtml(message.data));
                console.log($scope.avPropertyName);
                //Google Analytics 
                ga('send', 'event', 'Landlord Form', 'Landlord Responded', 'to the Property "' + $scope.avPropertyName + '" of enquiry number ' + $scope.prEncode);
                $scope.newemployee = true;
                $scope.avDayRate = '';
                $scope.avCancellationPolicy = '';
                $scope.HeldUntil = '';
                $scope.InputDivVisible = false;
                $scope.MessageVisible = true;
            });
        }
    }
    $("#aof-ratepernight").focus(function () {
        document.getElementById("ratePerNight").style.display = 'none';
    });
    $("#aof-offernotes").focus(function () {
        document.getElementById("offerNotes").style.display = 'none';
    });
    $("#aof-apartmenttype").click(function () {
        document.getElementById("appartmentType").style.display = 'none';
    });
    $("#aof-name").focus(function () {
        document.getElementById("name").style.display = 'none';
    });
    $("#aof-phone").focus(function () {
        document.getElementById("phone").style.display = 'none';
    });
    $("#aof-taxappliedallnights").click(function () {
        document.getElementById("taxAppliedAllNights").style.display = 'none';
    });
    $("#aof-taxesapplicable").click(function () {
        document.getElementById("taxApplied").style.display = 'none';
    });
    $("#aof-cancellationpolicy").focus(function () {
        document.getElementById("cancellationpolicy").style.display = 'none';
    });
    $("#aof-offerhelduntil").click(function () {
        document.getElementById("offerHeldUntil").style.display = 'none';
    });
    $("#aof-commissioninclinrate").click(function () {
        document.getElementById("commissionIncluded").style.display = 'none';
    });
    $("#aof-taxRate").click(function () {
        document.getElementById("taxRate").style.display = 'none';
    });
    $("#offer_HeldUntilDay").click(function () {
        document.getElementById("offerHeldUntil").style.display = 'none';
    });
    $("#offer_HeldUntilMonth").click(function () {
        document.getElementById("offerHeldUntil").style.display = 'none';
    });
    $("#offer_HeldUntilYear").focus(function () {
        document.getElementById("offerHeldUntil").style.display = 'none';
    });
    $("#offer_HeldUntilTime").focus(function () {
        document.getElementById("offerHeldUntil").style.display = 'none';
    });
    $("#commission-Included").click(function () {
        document.getElementById("commissionIncluded").style.display = 'none';
    });
    $("#apartment-Type").click(function () {
        document.getElementById("appartmentType").style.display = 'none';
    });
    $("#termsAndConditions").click(function () {
        document.getElementById("hasAgreedToTerms").style.display = 'none';
    });
    $("#gdpr").click(function () {
        document.getElementById("hasAgreedToPrivacy").style.display = 'none';
    });
    
});
