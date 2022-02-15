eTrakAppModuleLandlord.controller('DocusignEmailController', function ($scope, $sce, $window, $rootScope, DocusignEmailService) {

    var enquirycode = document.getElementById("txtenCode").value;
    var propertycode = document.getElementById("txtprCode").value;
    var templateId = document.getElementById("txttemplateID").value;
    var sourceName = document.getElementById("txtSourceName").value;
    $scope.prEncode = enquirycode;
    $scope.InputDivVisible = true;
    $scope.source = sourceName;
    console.log($scope.source);
    getDocusignEmailInformation();
    function getDocusignEmailInformation() {
        $scope.enCode = enquirycode;
        $scope.prCode = propertycode;
        console.log($scope.enCode);
        console.log($scope.prCode);
        var docusignEmailResponse = DocusignEmailService.DoscusignEmailInformation($scope.enCode, $scope.prCode);
        docusignEmailResponse.then(function (docusignEmailResponse) {
            $scope.docusignData = angular.fromJson(docusignEmailResponse.data);
            if ($scope.docusignData.prSecureBookingStatus === true) {
                $scope.InputDivVisible = false;
                $window.location.href = "/Booking/ErrorMessage?enCode=" + $scope.enCode + "&templateId=" + templateId;
            }
            console.log("docusign Information");
            console.log($scope.docusignData);
        });
    }

    $scope.UpdateSecureBookingInformation = function () {
        var cardnumber = $('#aof-cardNumber').val();
        var cardno = cardnumber.replace(/\s/gi, "");
        var expresscardno = /^(?:3[47][0-9]{13})$/;
        var dinersCardNumber = /^(?:(3|5)[0-9]{13}(?:[0-9]{2})?)$/;
        var visaCardNumber = /^(?:(4|5|6)[0-9]{12}(?:[0-9]{3,6})?)$/;
        var visaCreditCardNo = /^(?:(4|6)[0-9]{14}(?:[0-9]{1})?$)/;
        var mastercardno = /^(?:5[1-5][0-9]{14})$/;
        var expirydate = /^(0[1-9]|1[0-2])\/([0-9]{4}|[0-9]{2})$/;
        var expresssecuritycode = /^([0-9]{4})$/;
        var dinersecuritycode = /^([0-9]{3})$/;
        var visaCreditSecurityCode = /^([0-9]{3,4})$/;
        var excludedSources = ["AMAZON", "KPMG"];
        var arrivaltimeformat = /^\d{2}:\d{2}$/;
        var arrivaltime = $('#aof-arrivalTime').val();

        if (($('#aof-arrivalTime').val() !== "") && ($('#aof-arrivalTime').val() !== undefined) && !(arrivaltimeformat.test(arrivaltime))) {
            document.getElementById("arrivalTime").style.display = 'block';
            document.getElementById("arrivalTime").textContent = "Please enter time in 24Hrs(HH:MM) format";
        }
        else if ($('#aof-cardholderName').val() == "" || $('#aof-cardholderName').val() == null || $('#aof-cardholderName').val() == undefined) {
            document.getElementById("cardholderName").style.display = 'block';
            document.getElementById("cardholderName").textContent = "This field is required";
        }
        else if ($('#aof-cardhorderBillingAddress').val() == "" || $('#aof-cardhorderBillingAddress').val() == null || $('#aof-cardhorderBillingAddress').val() == undefined) {
            document.getElementById("cardhorderBillingAddress").style.display = 'block';
            document.getElementById("cardhorderBillingAddress").textContent = "This field is required";
        }
        else if ($('#aof-cardType').val() == "" || $('#aof-cardType').val() == null || $('#aof-cardType').val() == undefined) {
            document.getElementById("cardType").style.display = 'block';
            document.getElementById("cardType").textContent = "This field is required";
        }
        else if ($('#aof-cardNumber').val() == "" || $('#aof-cardNumber').val() == null || $('#aof-cardNumber').val() == undefined) {
            document.getElementById("cardNumber").style.display = 'block';
            document.getElementById("cardNumber").textContent = "This field is required";
        }
        else if ($('#aof-expiryDate').val() == "" || $('#aof-expiryDate').val() == null || $('#aof-expiryDate').val() == undefined) {
            document.getElementById("expiryDate").style.display = 'block';
            document.getElementById("expiryDate").textContent = "This field is required";
        }
        else if ($('#aof-securityCode').val() == "" || $('#aof-securityCode').val() == null || $('#aof-securityCode').val() == undefined) {
            document.getElementById("securityCode").style.display = 'block';
            document.getElementById("securityCode").textContent = "This field is required";
        }
        else if ($('#aof-cardType').val() == "American Express" && !(expresscardno.test(cardno))) {
            document.getElementById("cardNumber").style.display = 'block';
            document.getElementById("cardNumber").textContent = "Please enter valid card number";
        }
        else if ($('#aof-cardType').val() == "Diners Card" && !(dinersCardNumber.test(cardno))) {
            document.getElementById("cardNumber").style.display = 'block';
            document.getElementById("cardNumber").textContent = "Please enter valid card number";
        }
        else if ($('#aof-cardType').val() == "Master Card" && !(mastercardno.test(cardno))) {
            document.getElementById("cardNumber").style.display = 'block';
            document.getElementById("cardNumber").textContent = "Please enter valid card number";
        }
        else if (!(expirydate.test($('#aof-expiryDate').val()))) {
            document.getElementById("expiryDate").style.display = 'block';
            document.getElementById("expiryDate").textContent = "Please enter valid expiry date";
        }
        else if ($('#aof-cardType').val() == "American Express" && !(expresssecuritycode.test($('#aof-securityCode').val()))) {
            document.getElementById("securityCode").style.display = 'block';
            document.getElementById("securityCode").textContent = "Please enter valid 4 digit security code";
        }
        else if (($('#aof-cardType').val() == "Diners Card" || $('#aof-cardType').val() == "VISA debit/electron/maestro" || $('#aof-cardType').val() == "Master Card") && !(dinersecuritycode.test($('#aof-securityCode').val()))) {
            document.getElementById("securityCode").style.display = 'block';
            document.getElementById("securityCode").textContent = "Please enter valid 3 digit security code";
        }
        else if (($('#aof-cardType').val() == "VISA credit") && !(visaCreditSecurityCode.test($('#aof-securityCode').val()))) {
            document.getElementById("securityCode").style.display = 'block';
            document.getElementById("securityCode").textContent = "Please enter valid 3 or 4 digit security code";
        }
        else if ($scope.hasAgreedEsig === undefined || $scope.hasAgreedEsig == false) {
            document.getElementById("agreedEsig").style.display = 'block';
            document.getElementById("agreedEsig").textContent = "Please agree the terms by selecting the checkbox";
        }
        else if ($('#aof-cardType').val() == "VISA debit/electron/maestro" && !(visaCardNumber.test(cardno))) {
            document.getElementById("cardNumber").style.display = 'block';
            document.getElementById("cardNumber").textContent = "Please enter valid card number";
        }
        else if ($('#aof-cardType').val() == "VISA credit" && !(visaCreditCardNo.test(cardno))) {
            document.getElementById("cardNumber").style.display = 'block';
            document.getElementById("cardNumber").textContent = "Please enter valid card number";
        }
        else if (excludedSources.indexOf($scope.source.trim().toUpperCase()) === -1 && ($scope.TermsAndConditionsInput === undefined || $scope.TermsAndConditionsInput === false)) {
            document.getElementById("agreedTermsAndConditions").style.display = 'block';
            document.getElementById("agreedTermsAndConditions").textContent = "Please agree the Terms and Conditions";
        }
        
        else if ($scope.GdprInput === undefined || $scope.GdprInput == false) {
            document.getElementById("agreedGdpr").style.display = 'block';
            document.getElementById("agreedGdpr").textContent = "Please agree the Privacy policy";
        }
        else {
            var agreedToTerms;
            var agreedToGdpr;
            var agreedToEsigTerms;
            var agreedToRentalCharge;
            var agreedToPetsCharge;
            var agreedToParkingCharge;
            var agreedToSecurityCharge;
            if ($scope.TermsAndConditionsInput === true) {
                agreedToTerms = "Yes";
                $scope.agreedToTerms = agreedToTerms;
            } else {
                agreedToTerms = "No";
                $scope.agreedToTerms = agreedToTerms;
            }
            if ($scope.GdprInput === true) {
                agreedToGdpr = "Yes";
                $scope.agreedToGdpr = agreedToGdpr;
            } else {
                agreedToGdpr = "No";
                $scope.agreedToGdpr = agreedToGdpr;
            }
            if ($scope.hasAgreedEsig === true) {
                agreedToEsigTerms = "Yes";
                $scope.agreedToEsigTerms = agreedToEsigTerms;
            } else {
                agreedToEsigTerms = "No";
                $scope.agreedToEsigTerms = agreedToEsigTerms;
            }
            if ($scope.rentalCharge === true) {
                agreedToRentalCharge = "Yes";
                $scope.agreedToRentalCharge = agreedToRentalCharge;
            } else {
                agreedToRentalCharge = "No";
                $scope.agreedToRentalCharge = agreedToRentalCharge;
            }
            if ($scope.petDepositCharge === true) {
                agreedToPetsCharge = "Yes";
                $scope.agreedToPetsCharge = agreedToPetsCharge;
            } else {
                agreedToPetsCharge = "No";
                $scope.agreedToPetsCharge = agreedToPetsCharge;
            }
            if ($scope.parkingCharge === true) {
                agreedToParkingCharge = "Yes";
                $scope.agreedToParkingCharge = agreedToParkingCharge;
            } else {
                agreedToParkingCharge = "No";
                $scope.agreedToParkingCharge = agreedToParkingCharge;
            }
            if ($scope.securityDepositsCharge === true) {
                agreedToSecurityCharge = "Yes";
                $scope.agreedToSecurityCharge = agreedToSecurityCharge;
            } else {
                agreedToSecurityCharge = "No";
                $scope.agreedToSecurityCharge = agreedToSecurityCharge;
            }
            var ccNumberValue = document.getElementById('aof-cardNumber');
            ccNumberValue = ccNumberValue.value.replace(/\s/g, "");
            var ccNumberLastDigits = new Array(ccNumberValue.length - 3).join('x') + ccNumberValue.substr(ccNumberValue.length - 4, 4);
            $scope.ccNumberLastDigits = ccNumberLastDigits;
            
            $('#id_confirmBillingDetails').modal('show');
        }
    }
    
    $("#aof-airline").focus(function () {
        document.getElementById("airline").style.display = 'none';
    });
    $("#aof-cardholderName").focus(function () {
        document.getElementById("cardholderName").style.display = 'none';
    });
    $("#aof-cardhorderBillingAddress").focus(function () {
        document.getElementById("cardhorderBillingAddress").style.display = 'none';
    });
    $("#aof-cardNumber").focus(function () {
        document.getElementById("cardNumber").style.display = 'none';
    });
    $("#aof-cardType").focus(function () {
        document.getElementById("cardType").style.display = 'none';
    });
    $("#aof-expiryDate").focus(function () {
        document.getElementById("expiryDate").style.display = 'none';
    });
    $("#aof-securityCode").focus(function () {
        document.getElementById("securityCode").style.display = 'none';
    });
    $("#aof-agreedEsig").focus(function () {
        document.getElementById("agreedEsig").style.display = 'none';
    });
    $("#aof-termsAndConditionsInput").focus(function () {
        document.getElementById("agreedTermsAndConditions").style.display = 'none';
    });
    $("#aof-GdprInput").focus(function () {
        document.getElementById("agreedGdpr").style.display = 'none';
    });
    $("#aof-arrivalTime").focus(function () {
        document.getElementById("arrivalTime").style.display = 'none';
    });

    $scope.ConfirmPaymentDetails = function () {
        $('#id_confirmBillingDetails').modal('hide');
        $("#id_processingCardDetails").modal('show');
        var cardDetails = {
            bkEnCode: enquirycode,
            bkPrCode: propertycode,
            bkArrivalTime: $scope.arrivalTime,
            bkAirline: $scope.airline,
            bkFlightNo: $scope.flightNumber,
            bkCardHolderName: $scope.cardholderName,
            bkCardHolderBillingAddress: $scope.cardhorderBillingAddress,
            bkCardNo: $scope.cardNumber,
            bkCardType: $scope.cardType,
            bkExpiryDate: $scope.expiryDate,
            bkSecurityCode: $scope.securityCode,
            bkHasAgreedEsig: $scope.hasAgreedEsig,
            bkTrAdditionalRequest: $scope.travellerAdditionalRequest,
            bkTrEmailAddress: $scope.emailAddress,
            bkTrContactNumber: $scope.contactNumber,
            bkTrFlightDetails: $scope.flightDetails,
            bkTrArrivalTime: $scope.arrivalTime,
            bkAdditionalRequest: $scope.AdditionalRequestsInput,
            bkOtherGuestDetails: $scope.OtherGuestNamesInput,
            bkaggreedEsigDateTime: $scope.aggreedEsigDateTime,
            bkTermsAndConditions: $scope.TermsAndConditionsInput,
            bkGdpr: $scope.GdprInput,
            pdRentalCharge: $scope.rentalCharge,
            pdPetDepositCharge: $scope.petDepositCharge,
            pdParkingCharge: $scope.parkingCharge,
            pdSecurityDepositsCharge: $scope.securityDepositsCharge
        };
        console.log("card details");
        console.log(cardDetails);
        var information = DocusignEmailService.billingInformation(cardDetails);
        information.then(function (message) {
            console.log(message);
            if (message.data == "True") {
                $window.location.href = "/Booking/SuccessMessage?enCode=" + cardDetails.bkEnCode + "&templateId=" + templateId;
            } else {
                $('#id_confirmBillingDetails').modal('hide');
                $("#id_processingCardDetails").modal('hide');
                $scope.errorMessage = message.data + " while saving card details";
                $('#id_failure').modal('show');
            }
        });
    }

    $scope.HideModal = function () {
        $('#id_confirmBillingDetails').modal('hide');
    }
});