eTrakApp.controller('QueriesScheduleController',['$scope','$filter', '$rootScope',  'QueriesScheduleService', function ($scope, $filter, $rootScope, QueriesScheduleService) {
    var userCode = document.getElementById("divUserCode").value;
    var userRole = document.getElementById("divUserRole").value;
    console.log(userRole);
    console.log(userCode);
    GetQueryNames(userCode, userRole);
    function GetQueryNames(userCode, userRole) {
        QueriesScheduleService.GetQueryNames(userCode,userRole)
            .success(function (queryNames) {
                console.log('Get query names success');
                $scope.QueryNames = angular.fromJson(queryNames);
                console.log($scope.QueryNames);
            });
    }

    GetTemplateNames();
    function GetTemplateNames() {
        QueriesScheduleService.GetTemplateNames()
            .success(function (templateNames) {
                console.log('Get template names success');
                $scope.TemplateNames = angular.fromJson(templateNames);
                console.log($scope.TemplateNames);
            });
    }
    var isClientManager = $("#IsClientManagerCheck").val();
    console.log(isClientManager);

    GetQueriesSchedulesDetails();
    function GetQueriesSchedulesDetails() {
        var user = "";            
        if (isClientManager == "true") {
            user = userCode;
        }
        else{
            user = null;
        }
        QueriesScheduleService.GetQueriesSchedulesDetails(user)
            .success(function (scheduleDetails) {
                console.log('Get schedule details success');
                $rootScope.QueriesScheduleDetails = angular.fromJson(scheduleDetails);
                console.log($scope.QueriesScheduleDetails);

            });
    }

    $scope.DeleteSchedule = function (id) {
        console.log('Schedule Id: ' + id);
        QueriesScheduleService.DeleteSchedule(id)
            .success(function (scheduleDetails) {
                console.log('Delete schedule details success');
                $scope.Schedule = scheduleDetails;
                console.log($scope.Schedule);
                console.log($scope.Schedule.qs_ScheduleName);
                //Google Analytics 
                ga('send', 'event', 'Queries Schedule', 'Deleted the Schedule', 'of Schedule Name "' + $scope.Schedule.qs_ScheduleName + '"' + ' by ' + userCode);
                GetQueriesSchedulesDetails();
            });
    }

    $scope.dtQuerySchedule = {
        destroy: true,
        autoWidth: false,
        order: [[1, 'desc']],
        columnDefs: [
            {
                targets: ['no-sort'],
                orderable: false
            }
        ],
        dom:
            "<'row no-margin'<'col-sm-6 no-padding'l><'col-sm-6 no-padding'f>r>" +
                "t" +
                "<'row no-margin'<'col-sm-6 no-padding'i><'col-sm-6 no-padding'p>>"
    };


    $scope.dtqueryAudit = {
        destroy: true,
        autoWidth: false,
        order: [[1, 'desc']],
        columnDefs: [
            {
                targets: ['no-sort'],
                orderable: false
            }
        ],
        dom:
            "<'row no-margin'<'col-sm-6 no-padding'l><'col-sm-6 no-padding'f>r>" +
                "t" +
                "<'row no-margin'<'col-sm-6 no-padding'i><'col-sm-6 no-padding'p>>"
    };

    $rootScope.qs_ID = 0;
    document.getElementById("id_qs_ScheduleName").readOnly = false;

    $scope.CreateNewSchedule = function () {
        var qs_da_RecurNoOfDays, qs_da_EveryWeekDay, qs_wk_RecurNoOfWeeks, qs_mt_Date, qs_mt_RecurNoOfMonths, qs_mt_RecurWeeks,
            qs_mt_RecurWeekdays, qs_mt_RecurMonths, qs_yr_RecurNoOfYears, qs_yr_RecurMonth, qs_yr_RecurDate, qs_yr_RecurWeeks,
            qs_yr_RecurWeekDays, qs_yr_RecurNoOfMonths, qs_EndAfterOccurences, qs_EndDay, qs_EndMonth, qs_EndYear, qs_Daily, qs_Weekly, qs_Monthly,
            qs_Yearly, qs_rangeOfRecurrenceText, qs_dailyText, qs_weeklyText, qs_monthlyText, qs_YearlyText, qs_wk_Mon, qs_wk_Tue, qs_wk_Wed, qs_wk_Thu,
            qs_wk_Fri, qs_wk_Sat, qs_wk_Sun;
        var query = document.getElementById("id_qs_QueryName");
        var queryName = query.options[query.selectedIndex].text;
        var template = document.getElementById("id_qs_Template");
        var TemplateName = template.options[template.selectedIndex].text;
        if (queryName == "Please Select") {
            queryName = "";
        }
        if (TemplateName == "Please Select") {
            TemplateName = "";
        }
        console.log(queryName);
        console.log(TemplateName);
        //-----Range of recurrence checked -----
        //---1st Part--- 

        if ($("#id_qs_NoEndDate:checked").val() == "true") {
            qs_NoEndDate = true;
        }
        else {
            qs_NoEndDate = false;
        }

        //--- 2nd part ----
        if ($("#id_qs_EndAfterOccurences:checked").val() == "true") {
            qs_EndAfterOccurences = $scope.qs_EndAfterOccurences;
        }
        //-------3rd Part-------
        if ($("#id_qs_EndDate:checked").val() == "true") {
            console.log($scope.qs_EndDay);
            console.log($scope.qs_EndYear);
            console.log($scope.qs_EndMonth);
            qs_EndDay = $scope.qs_EndDay;
            qs_EndYear = $scope.qs_EndYear;
            qs_EndMonth = $scope.qs_EndMonth;
        }
        qs_rangeOfRecurrenceText = GetRangeOfRecurrenceText(qs_NoEndDate, qs_EndAfterOccurences, $scope.qs_EndDay, $scope.qs_EndYear, $scope.qs_EndMonth);
        console.log(qs_rangeOfRecurrenceText);

        //-----Daily Checked----
        if ($('.nav-tabs .active').text() == "Daily") {
            qs_Daily = true;
            if ($("#id_qs_da_RecurNoOfDays:checked").val() == "true") {
                qs_da_RecurNoOfDays = $scope.qs_da_RecurNoOfDays;
            }
            if ($("#id_qs_da_EveryWeekDay:checked").val() == "true")
                qs_da_EveryWeekDay = true;
            else
                qs_da_EveryWeekDay = false;
            qs_dailyText = GetDailyText(qs_da_RecurNoOfDays, qs_da_EveryWeekDay);
            console.log(qs_dailyText);
        }
        else {
            qs_Daily = false;
        }

        //------Weekly Checked-------
        if ($('.nav-tabs .active').text() == "Weekly") {
            qs_Weekly = true;
            qs_wk_RecurNoOfWeeks = $scope.qs_wk_RecurNoOfWeeks;
            qs_wk_Mon = $("#id_qs_Monday:checked").val() ? true : false;
            qs_wk_Tue = $("#id_qs_Tuesday:checked").val() ? true : false;
            qs_wk_Wed = $("#id_qs_Wednesday:checked").val() ? true : false;
            qs_wk_Thu = $("#id_qs_Thursday:checked").val() ? true : false;
            qs_wk_Fri = $("#id_qs_Friday:checked").val() ? true : false;
            qs_wk_Sat = $("#id_qs_Saturday:checked").val() ? true : false;
            qs_wk_Sun = $("#id_qs_Sunday:checked").val() ? true : false;
            qs_weeklyText = GetweeklyText(qs_wk_RecurNoOfWeeks, qs_wk_Mon, qs_wk_Tue, qs_wk_Wed, qs_wk_Thu, qs_wk_Fri,
                                          qs_wk_Sat, qs_wk_Sun);
            console.log(qs_weeklyText);
        }
        else {
            qs_Weekly = false;
        }

        //------Monthly checked ------
        if ($('.nav-tabs .active').text() == "Monthly") {
            qs_Monthly = true;
            if ($("#id_qs_mt_DateMonth:checked").val() == "true") {
                qs_mt_Date = $scope.qs_mt_Date;
                qs_mt_RecurNoOfMonths = $scope.qs_mt_RecurNoOfMonths;
            }
            if ($("#id_qs_mt_DateDayMonth:checked").val() == "true") {
                qs_mt_RecurWeeks = $scope.qs_mt_RecurWeeks;
                qs_mt_RecurWeekdays = $scope.qs_mt_RecurWeekdays;
                qs_mt_RecurMonths = $scope.qs_mt_RecurMonths;
            }
            qs_monthlyText = GetMonthlyText(qs_mt_Date, qs_mt_RecurNoOfMonths, qs_mt_RecurWeeks, qs_mt_RecurWeekdays, qs_mt_RecurMonths);
            console.log(qs_monthlyText);
        }
        else {
            qs_Monthly = false;
        }

        //---------Yearly checked-------------
        if ($('.nav-tabs .active').text() == "Yearly") {
            qs_Yearly = true;
            qs_yr_RecurNoOfYears = $scope.qs_yr_RecurNoOfYears;
            if ($("#id_qs_yr_DateMonth:checked").val() == "true") {
                qs_yr_RecurMonth = $scope.qs_yr_RecurMonth;
                qs_yr_RecurDate = $scope.qs_yr_RecurDate;
            }
            if ($("#id_qs_yrDayMonth:checked").val() == "true") {
                qs_yr_RecurWeeks = $scope.qs_yr_RecurWeeks;
                qs_yr_RecurWeekDays = $scope.qs_yr_RecurWeekDays;
                qs_yr_RecurNoOfMonths = $scope.qs_yr_RecurNoOfMonths;
            }
            qs_YearlyText = GetYearlyText(qs_yr_RecurNoOfYears, qs_yr_RecurMonth, qs_yr_RecurDate, qs_yr_RecurWeeks,
                                          qs_yr_RecurWeekDays, qs_yr_RecurNoOfMonths);
            console.log(qs_YearlyText);
        }
        else {
            qs_Yearly = false;
        }       
        var scheduleObject = {
            qs_User: userCode,
            qs_ScheduleName: $scope.qs_ScheduleName,
            qs_ID: $rootScope.qs_ID,
            qs_QueryId: $scope.qs_QueryId,
            qs_QueryName: queryName,
            qs_Email: $scope.qs_Email,
            qs_TemplateId: $scope.qs_TemplateId,
            qs_Template: TemplateName,
            qs_FileType: $scope.qs_FileType,
            qs_StartTime: $scope.qs_StartTime,         
            qs_StartMonth : $scope.qs_StartMonth,
            qs_StartDay : $scope.qs_StartDay,
            qs_StartYear : $scope.qs_StartYear,          
            qs_EndMonth: $scope.qs_EndMonth,
            qs_EndDay: $scope.qs_EndDay,
            qs_EndYear: $scope.qs_EndYear,
            qs_NoEndDate: qs_NoEndDate,
            qs_EndAfterOccurences: qs_EndAfterOccurences,
            qs_Daily: qs_Daily,
            qs_Weekly: qs_Weekly,
            qs_Monthly: qs_Monthly,
            qs_Yearly: qs_Yearly,
            qs_da_RecurNoOfDays: qs_da_RecurNoOfDays,
            qs_da_EveryWeekDay: qs_da_EveryWeekDay,
            qs_wk_RecurNoOfWeeks: qs_wk_RecurNoOfWeeks,
            qs_mt_Date: qs_mt_Date,
            qs_mt_RecurNoOfMonths: qs_mt_RecurNoOfMonths,
            qs_mt_RecurWeeks: qs_mt_RecurWeeks,
            qs_mt_RecurWeekdays: qs_mt_RecurWeekdays,
            qs_mt_RecurMonths: qs_mt_RecurMonths,
            qs_yr_RecurNoOfYears: qs_yr_RecurNoOfYears,
            qs_yr_RecurMonth: qs_yr_RecurMonth,
            qs_yr_RecurDate: qs_yr_RecurDate,
            qs_yr_RecurWeeks: qs_yr_RecurWeeks,
            qs_yr_RecurWeekDays: qs_yr_RecurWeekDays,
            qs_yr_RecurNoOfMonths: qs_yr_RecurNoOfMonths,
            qs_rangeOfRecurrenceText: qs_rangeOfRecurrenceText,
            qs_dailyText: qs_dailyText,
            qs_weeklyText: qs_weeklyText,
            qs_monthlyText: qs_monthlyText,
            qs_YearlyText: qs_YearlyText,
            qs_wk_Mon: qs_wk_Mon,
            qs_wk_Tue: qs_wk_Tue,
            qs_wk_Wed: qs_wk_Wed,
            qs_wk_Thu: qs_wk_Thu,
            qs_wk_Fri: qs_wk_Fri,
            qs_wk_Sat: qs_wk_Sat,
            qs_wk_Sun: qs_wk_Sun
        }
        console.log(scheduleObject);
        QueriesScheduleService.SaveQuerySchedule(scheduleObject)
           .success(function (status) {
               console.log('Save Query Schedule Success');
               $scope.Status = status;
               console.log($scope.Status);
               GetQueriesSchedulesDetails();
               $rootScope.qs_ID = 0;
               $("#idCreateSchedule").modal('hide');
               //Google Analytics 
               ga('send', 'event', 'Queries Schedule', 'Created/Updated Schedule', 'With Schedule Name ' + '"' + $scope.qs_ScheduleName + '"' + ' by ' + userCode);
           });
    }

    function GetRangeOfRecurrenceText(noendDate, occurences, endDay, endYear,endMonth) {
        console.log("Get RangeOfRecurrence Text");
        console.log(noendDate, occurences, endDay, endYear, endMonth);
        if (noendDate) {
            qs_rangeOfRecurrenceText = " with no end date";
        }
        else {
            if ($("#id_qs_EndAfterOccurences:checked").val())
                qs_rangeOfRecurrenceText = " end after " + occurences + " occurences";
            else
                qs_rangeOfRecurrenceText = "with end date of " + endDay + "-" + endMonth + "-" + endYear;
        }
        return qs_rangeOfRecurrenceText;
    }

    function GetDailyText(days, weekDay) {
        console.log("Get Daily Text");
        console.log(days, weekDay);
        if (weekDay) {
            qs_dailyText = "every week day";
        }
        else {
            qs_dailyText = "for every " + days + " day(s)";
        }
        return qs_dailyText;
    }

    function GetweeklyText(weeks, mon, tue, wed, thu, fri, sat, sun) {
        console.log("Get weekly Text");
        console.log(weeks, mon, tue, wed, thu, fri, sat, sun);
        if (weeks == undefined) {
            weeks = "";
        }
        qs_weeklyText = "recur every " + weeks + " week(s) on ";
        if (mon) {
            qs_weeklyText = qs_weeklyText + "monday";
        }
        if (tue) {
            qs_weeklyText = qs_weeklyText + ", tuesday";
        }
        if (wed) {
            qs_weeklyText = qs_weeklyText + ", wednesday";
        }
        if (thu) {
            qs_weeklyText = qs_weeklyText + ", thursday";
        }
        if (fri) {
            qs_weeklyText = qs_weeklyText + ", friday";
        }
        if (sat) {
            qs_weeklyText = qs_weeklyText + ", saturday";
        }
        if (sun) {
            qs_weeklyText = qs_weeklyText + ", sunday";
        }
        return qs_weeklyText;
    }

    function GetMonthlyText(date, months, week, weekday, recurmonths) {
        console.log("Get Monthly Text");
        console.log(date, months, week, weekday, recurmonths);
        if ($("#id_qs_mt_DateMonth:checked").val() == "true") {
            qs_monthlyText = date + " of every " + months + " month(s) ";
        }
        else {
            qs_monthlyText = week + " " + weekday + " of every " + recurmonths + " month(s)";
        }
        return qs_monthlyText;
    }

    function GetYearlyText(year, month, date, week, weekday, recurmonths) {
        console.log("Get Monthly Text");
        console.log(year, date, month, week, weekday, recurmonths);
        if (year == undefined) {
            year = "";
        }
        if ($("#id_qs_yr_DateMonth:checked").val() == "true") {
            qs_YearlyText = " every " + year + " year(s) on " + month + " " + date;
        }
        else {
            qs_YearlyText = " every " + year + " year(s) on the " + week + " " + weekday + " of " + recurmonths;
        }
        return qs_YearlyText;
    }

    $scope.OpenDialogueForEditingSchedule = function (id) {
        resetViewModel();
        QueriesScheduleService.EditQueryScheduleDetails(id)
           .success(function (queryDetails) {
               console.log('Edit Query Schedule Success');
               $scope.scheduleDetails = angular.fromJson(queryDetails);
               console.log($scope.scheduleDetails);
               document.getElementById("id_qs_ScheduleName").readOnly = true;
               $("#idCreateSchedule").modal('show');
               $rootScope.qs_ID = queryDetails.qs_ID;
               $scope.qs_QueryName = queryDetails.qs_QueryName;
               $scope.qs_Email = queryDetails.qs_Email;
               $scope.qs_Template = queryDetails.qs_Template;
               $scope.qs_FileType = queryDetails.qs_FileType;
               console.log($scope.qs_Template);
               $scope.qs_ScheduleName = queryDetails.qs_ScheduleName;
               $scope.qs_StartTime = $filter('date')(queryDetails.qs_StartTime, 'HH:mm');             
               $scope.qs_StartMonth = queryDetails.qs_StartMonth;
               $scope.qs_StartDay = queryDetails.qs_StartDay;
               $scope.qs_StartYear = queryDetails.qs_StartYear;
               $scope.qs_StartMonth = queryDetails.qs_StartMonth;
                       
               $("#recurrence_tabs_content .tab-pane").each(function () {
                   $(this).removeClass('active');
               });
               $("#recurrence_tabs li").each(function () {
                   $(this).removeClass('active');
               });

               if (queryDetails.qs_Daily) {
                   $("#li_daily").addClass("active").show();
                   $("#daily").addClass("active").show();
                   if (queryDetails.qs_da_EveryWeekDay) {
                       console.log('daily true if');
                       $scope.ch_da_forWeek = true;
                   }
                   else {
                       console.log('daily true else');
                       $scope.qs_da_RecurNoOfDays = queryDetails.qs_da_RecurNoOfDays;
                       $scope.ch_da_forDays = true;
                   }
               }

               if (queryDetails.qs_Weekly) {
                   $("#weekly").addClass("active").show();
                   $("#li_weekly").addClass("active").show();
                   console.log("weekly true " + queryDetails.qs_Weekly);
                   $scope.qs_wk_RecurNoOfWeeks = queryDetails.qs_wk_RecurNoOfWeeks;
                   $scope.ch_wk_mon = queryDetails.qs_wk_Mon;
                   $scope.ch_wk_tue = queryDetails.qs_wk_Tue;
                   $scope.ch_wk_wed = queryDetails.qs_wk_Wed;
                   $scope.ch_wk_thu = queryDetails.qs_wk_Thu;
                   $scope.ch_wk_fri = queryDetails.qs_wk_Fri;
                   $scope.ch_wk_sat = queryDetails.qs_wk_Sat;
                   $scope.ch_wk_sun = queryDetails.qs_wk_Sun;
               }

               if (queryDetails.qs_Monthly) {
                   $("#monthly").addClass("active").show();
                   $("#li_monthly").addClass("active").show();
                   console.log("monthly true " + queryDetails.qs_Monthly);
                   console.log(queryDetails.qs_mt_Date);
                   if (queryDetails.qs_mt_Date != null && queryDetails.qs_mt_RecurNoOfMonths != null) {
                       console.log('monthly true if');
                       $scope.ch_mn_dateMonth = true;
                       $scope.qs_mt_Date = queryDetails.qs_mt_Date;
                       $scope.qs_mt_RecurNoOfMonths = queryDetails.qs_mt_RecurNoOfMonths;
                   }
                   else {
                       console.log('monthly true else');
                       $scope.ch_da_dayMonth = true;
                       $scope.qs_mt_RecurWeeks = queryDetails.qs_mt_RecurWeeks;
                       $scope.qs_mt_RecurWeekdays = queryDetails.qs_mt_RecurWeekdays;
                       $scope.qs_mt_RecurMonths = queryDetails.qs_mt_RecurMonths;
                   }
               }

               if (queryDetails.qs_Yearly) {
                   $("#yearly").addClass("active").show();
                   $("#li_yearly").addClass("active").show();
                   console.log("yearly true " + queryDetails.qs_Yearly);
                   console.log(queryDetails.qs_mt_Date);
                   $scope.qs_yr_RecurNoOfYears = queryDetails.qs_yr_RecurNoOfYears;
                   if (queryDetails.qs_yr_RecurMonth != null && queryDetails.qs_yr_RecurDate != null) {
                       console.log('yearly true if');
                       $scope.ch_yr_dateMonth = true;
                       $scope.qs_yr_RecurMonth = queryDetails.qs_yr_RecurMonth;
                       $scope.qs_yr_RecurDate = queryDetails.qs_yr_RecurDate;
                   }
                   else {
                       console.log('yearly true else');
                       $scope.ch_yr_dayMonth = true;
                       $scope.qs_yr_RecurWeeks = queryDetails.qs_yr_RecurWeeks;
                       $scope.qs_yr_RecurWeekDays = queryDetails.qs_yr_RecurWeekDays;
                       $scope.qs_yr_RecurNoOfMonths = queryDetails.qs_yr_RecurNoOfMonths;
                   }
               }

               $scope.ch_NoEndDate = queryDetails.qs_NoEndDate;
               if ($scope.ch_NoEndDate == true) {
                   $scope.qs_EndAfterOccurences = "";
                   $scope.qs_EndDay = "";
                   $scope.qs_EndMonth = "";
                   $scope.qs_EndYear = "";
               }

               if (queryDetails.qs_EndAfterOccurences != null) {
                   $scope.ch_EndAfterOccurences = true;
                   $scope.qs_EndAfterOccurences = queryDetails.qs_EndAfterOccurences;
                   $scope.qs_EndDay = "";
                   $scope.qs_EndMonth = "";
                   $scope.qs_EndYear = "";
               }             
               if (queryDetails.qs_EndDay != null && queryDetails.qs_EndMonth != null && queryDetails.qs_EndYear != 0) {
                   $scope.ch_EndDate = true;                  
                   $scope.qs_EndDay = queryDetails.qs_EndDay;
                   $scope.qs_EndMonth = queryDetails.qs_EndMonth;
                   $scope.qs_EndYear = queryDetails.qs_EndYear;
                   $scope.qs_EndAfterOccurences = "";
               }
           });
    }

    $scope.ShowAuditDetails = function (id) {        
        QueriesScheduleService.ShowAuditDetails(id)
           .success(function (auditDetails) {
               console.log('Audit Query Schedule Success');
               $scope.AuditDetails = angular.fromJson(auditDetails);
               console.log($scope.AuditDetails);
               $("#id_AuditDetails").modal('show');              
           });
    }

    $scope.RunSchedule = function (qs_ScheduleName, queryName, email, scheduleId, templateName, fileType) {
        var fromAddress = 'etrak@apartmentservice.com';
        var user = userCode;
        console.log(user);
        console.log("qs_ScheduleName:" + qs_ScheduleName);
        var scheduleObject = {
            qs_ScheduleName: qs_ScheduleName,
            qs_QueryName: queryName,
            qs_Email: email,
            qs_ID: scheduleId,
            qs_Template: templateName,
            qs_FileType: fileType
        }
        document.getElementById("id-Processing").style.display = 'block';
        document.getElementById("id-Processing").textContent = "Schedule run is in progress...";        
        QueriesScheduleService.RunSchedule(scheduleObject, fromAddress, user)
           .success(function (status) {
               //Google Analytics 
               ga('send', 'event', 'Queries Schedule', 'Run the Schedule', 'of Schedule Name "' + qs_ScheduleName + '"' + ' by ' + userCode);
               console.log('Get Query Details Success');
               $scope.Status = status;
               console.log($scope.Status);
               document.getElementById("id-Processing").style.display = 'none';
               $("#idSuccessModal").modal('show');             
           });
    }

    $scope.OpenDialogueForCreatingSchedule = function () {
        GetQueryNames(userCode, userRole);
        var queryName = $("#id_QueryName").val();
        $rootScope.qs_ID = 0;
        $("#idCreateSchedule").modal('show');
        document.getElementById("id_qs_ScheduleName").readOnly = false;

        $("#recurrence_tabs_content .tab-pane").each(function () {
            $(this).removeClass('active');
        });
        $("#recurrence_tabs li").each(function () {
            $(this).removeClass('active');
        });

        $("#weekly").addClass("active").show();
        $("#li_weekly").addClass("active").show();
        resetViewModel();
    }

    function resetViewModel() {
        $scope.qs_Email = "";
        $scope.qs_ScheduleName = "";
        $scope.qs_QueryName = "";
        $scope.qs_Template = "";
        $scope.qs_FileType = "";
        $scope.ch_da_forDays = false;
        $scope.qs_da_RecurNoOfDays = "";
        $scope.ch_da_forWeek = false;
        $scope.qs_wk_RecurNoOfWeeks = "";
        $scope.ch_wk_mon = false;
        $scope.ch_wk_tue = false;
        $scope.ch_wk_wed = false;
        $scope.ch_wk_thu = false;
        $scope.ch_wk_fri = false;
        $scope.ch_wk_sat = false;
        $scope.ch_wk_sun = false;
        $scope.ch_mn_dateMonth = false;
        $scope.qs_mt_Date = "";
        $scope.qs_mt_RecurNoOfMonths = "";
        $scope.ch_da_dayMonth = false;
        $scope.qs_mt_RecurWeeks = "";
        $scope.qs_mt_RecurWeekdays = "";
        $scope.qs_mt_RecurMonths = "";
        $scope.qs_yr_RecurNoOfYears = "";
        $scope.ch_yr_dateMonth = false;
        $scope.qs_yr_RecurMonth = "";
        $scope.qs_yr_RecurDate = "";
        $scope.ch_yr_dayMonth = false;
        $scope.qs_yr_RecurWeeks = "";
        $scope.qs_yr_RecurWeekDays = "";
        $scope.qs_yr_RecurNoOfMonths = "";
        $scope.ch_NoEndDate = false;
        $scope.ch_EndAfterOccurences = false;
        $scope.qs_EndAfterOccurences = "";
        $scope.ch_EndDate = false;
        $scope.qs_EndDay = "";
        $scope.qs_EndMonth = "";
        $scope.qs_EndYear = "";
        $scope.qs_StartTime = $filter('date')(new Date(), 'HH:00');       
        $scope.qs_StartDay = $filter('date')(new Date(), 'dd');
        $scope.qs_StartYear = $filter('date')(new Date(), 'yyyy');
        $scope.qs_StartMonth = $filter('date')(new Date(), 'MM');
    }

    $scope.OpenModalForRecurrence = function () {
        $("#idRecurrence").modal('show');
    }

}]);