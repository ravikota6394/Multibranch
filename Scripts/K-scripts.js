/* ==========================================================================
   JS Scripts For Achieving Custom Functionalities
   ========================================================================== */


/* Calling Functions On Pageload
   ========================================================================== */
$(function() {
//	setUpDataTables();
//	setUpDataTablesBasic();
//	setUpDataTablesAsp();
	setUpScrollables();
	setUpMyEmailsTable();
});


/* Set Up DataTables
   ========================================================================== */
// Common Version
var setUpDataTables = function() {
	var enqTable = $('.datatable').dataTable({
		autoWidth: false,
		order: [],
		columnDefs: [{
			targets: ['no-sort'],
			orderable: false
		}],
		dom:
			"<'row no-margin'<'col-sm-6 no-padding'l><'col-sm-6 no-padding'f>r>"+
			"t"+
			"<'row no-margin'<'col-sm-6 no-padding'i><'col-sm-6 no-padding'p>>",
	});
};

// Basic Version
var setUpDataTablesBasic = function() {
	var datatable = $('.datatable-basic').dataTable({
		autoWidth: false,
		dom: 't',
		info: false,
		order: [],
		paging: false,
		searching: false,
		columnDefs: [{
			targets: ['no-sort'],
			orderable: false
		}]
	});
};

// ASP.NET Version
var setUpDataTablesAsp = function() {
	var datatable = $('.datatable-asp').dataTable({
		"sPaginationType": "full_numbers",
		"aLengthMenu": [[2, 5, 10, -1], ["Two", "Five", "Ten", "All"]],
		"bProcessing": true,
		"iODataVersion": 3,
		"bUseODataViaJSONP": false // set to true if using cross-domain requests

	});
};

/* Set Up Scrollables
   ========================================================================== */
var setUpScrollables = function() {
	$('.scrollable').ace_scroll({
		styleClass: 'scroll-visible'
	});

	$('.scrollable').on('click','table.dataTable.dtr-inline.collapsed tbody td:first-child',function() {
		$(this).closest('.scrollable').ace_scroll('reset');
	});
};


/* Set Up 'My Emails' table
   ========================================================================== */
var setUpMyEmailsTable = function () {
	$('#my-emails').on('click', '.email-preview', function () {
		var trigger = $(this);
		var element = trigger.parent().find('.email-preview-text');

		trigger.toggleClass('open');
		element.toggleClass('show');
		$('#my-emails').ace_scroll('reset');
	});
};

/* Set Up 'SearchWidgetResults' table
   ========================================================================== */
var setUpSearchWidgetResultsTable = function () {
	$('#idSearchWidgetResults').on('click', '.search-preview', function () {
		var trigger = $(this);
		var element = trigger.parent().find('.email-preview-text');

		trigger.toggleClass('open');
		element.toggleClass('show');
	   // $('#idSearchWidgetResults').ace_scroll('reset');
	});
};

/* Set Up Popovers
   ========================================================================== */
var setUpPopovers = function () {
	alert("setting up popover");
	$('[data-rel=popover]').popover();
	$('[data-rel=tooltip]').tooltip();
};


/* Set Up Form Utilities
   ========================================================================== */
var setUpFormUtilities = function() {

  
	/* initializing date picker */
	if ( $('.date-picker').exists()) {
		$('.date-picker').datepicker({
			format: 'dd-mm-yyyy',
			autoclose: true,
			todayHighlight: true
		}).next().on(ace.click_event, function(){
			$(this).prev().focus();
		});
	}

	/* initializing timepicker */
	if ( $('.time-picker').exists()) {
		$('.time-picker').timepicker({
			minuteStep: 1,
			showMeridian: false
		}).next().on(ace.click_event, function(){
			$(this).prev().focus();
		});
	}

	/* initializing datetimepicker */
	if ( $('.datetime-picker').exists()) {
		$('.datetime-picker').datetimepicker({
			format: 'DD-MMMM-YYYY HH:mm'
		}).next().on(ace.click_event, function(){
			$(this).prev().focus();
		});
	}

	/* initializing select2 plugin */
	if ($('select.select2').exists()) {
		
		$("select.select2").select2({
			
		});
	}

	/* initializing ace spinner plugin */
	if ($('.ace-spinner-input').exists()) {
		$(".ace-spinner-input").ace_spinner({
			btn_up_class: 'btn-default',
			btn_down_class:'btn-default'
		});
	}
};

/* Set Up Enquiry Details Form
   ========================================================================== */
var setUpDetailsTabForm = function () {
	$('#idDTenCDTitle').select2({
				createSearchChoice: function (term, data) {
			if ($(data).filter(function () {
				return this.text.localeCompare(term) === 0;
			}).length === 0) {
				return { id: capitalizeFirstLetter(term), text: capitalizeFirstLetter(term) };
			}
		},
		multiple: false,
		data: [
			{ id: '', text: 'Please select' },
			{ id: 'Mr', text: 'Mr' },
			{ id: 'Mrs', text: 'Mrs' },
			{ id: 'Miss', text: 'Miss' },
			{ id: 'Ms', text: 'Ms' }


		],

	});



	$('#idDTenTRTitle').select2({
		createSearchChoice: function (term, data) {
			if ($(data).filter(function () {
				return this.text.localeCompare(term) === 0;
			}).length === 0) {
				return { id: capitalizeFirstLetter(term), text: capitalizeFirstLetter(term) };
			}
		},
		multiple: false,
		data: [
			{ id: '', text: 'Please select' },
			{ id: 'Mr', text: 'Mr' },
			{ id: 'Mrs', text: 'Mrs' },
			{ id: 'Miss', text: 'Miss' },
			{ id: 'Ms', text: 'Ms' }
		]
	});
	$('#idDTenED1Title').select2({
		createSearchChoice: function (term, data) {
			if ($(data).filter(function () {
				return this.text.localeCompare(term) === 0;
			}).length === 0) {
				return { id: capitalizeFirstLetter(term), text: capitalizeFirstLetter(term) };
			}
		},
		multiple: false,
		data: [
			{ id: '', text: 'Please select' },
			{ id: 'Mr', text: 'Mr' },
			{ id: 'Mrs', text: 'Mrs' },
			{ id: 'Miss', text: 'Miss' },
			{ id: 'Ms', text: 'Ms' }
		]
	});
	$('#idDTenED2Title').select2({
		createSearchChoice: function (term, data) {
			if ($(data).filter(function () {
				return this.text.localeCompare(term) === 0;
			}).length === 0) {
				return { id: capitalizeFirstLetter(term), text: capitalizeFirstLetter(term) };
			}
		},
		multiple: false,
		data: [
			{ id: '', text: 'Please select' },
			{ id: 'Mr', text: 'Mr' },
			{ id: 'Mrs', text: 'Mrs' },
			{ id: 'Miss', text: 'Miss' },
			{ id: 'Ms', text: 'Ms' }
		]
	});

};

/* Set Up Enquiry Details Form
   ========================================================================== */
var setUpEnquiryDetailsForm = function() {
	$('#destination-city').select2({
		createSearchChoice: function(term, data) {
			if ($(data).filter(function() {
				return this.text.localeCompare(term) === 0; }).length === 0) {
					return {id:term, text:term};
				}
			},
		multiple: false,
		data: [
			{id: 0, text: 'Please select'},
			{id: 1, text: 'City #1'},
			{id: 2, text: 'City #2'},
			{id: 2, text: 'City #3'}
		]
	});

	$('#property-map-modal').on('shown.bs.modal', function() {
		setUpPropertyMapView();
	});
};


/* Set Up Property Details
   ========================================================================== */
var setUpPropertyDetails = function() {
	$('.room-type-selector').select2({
		createSearchChoice: function(term, data) {
			if ($(data).filter(function() {
				return this.text.localeCompare(term) === 0; }).length === 0) {
					return {id:term, text:term};
				}
			},
		multiple: false,
		data: [
			{id: 0, text: 'Please select'},
			{id: 1, text: 'Room Type #1'},
			{id: 2, text: 'Room Type #2'},
			{id: 2, text: 'Room Type #3'}
		]
	});
};


/* Set Up New Email Form
   ========================================================================== */
var setUpEmailNew = function () {
	alert('setting up email-to 4');
	$('#email-to').on('change', function () {
		$("#free-email-to").val($(this).val());
		alert($(this).val());

	});
	

	$('#email-to').select2({
		createSearchChoice: function(term, data) {
			if ($(data).filter(function() {
				return this.text.localeCompare(term) === 0; }).length === 0) {
					return {id:term, text:term};
				}
			},
		multiple: false,
		data: [
			{id: 0, text: 'Please select'},
			{
				text: 'Property Reservation Contact',
				children: [
					{ id: 'email1@prc.com', text: 'email1@prc.com' },
					{ id: 'email2@prc.com', text: 'email2@prc.com' },
					{id: 3, text:'email3@prc.com'},
					{id: 4, text:'email4@prc.com'},
				]
			},
			{
				text: 'Client Contact',
				children: [
					{id: 1, text:'email1@cc.com'},
					{id: 2, text:'email2@cc.com'},
					{id: 3, text:'email3@cc.com'},
					{id: 4, text:'email4@cc.com'},
				]
			},
			{
				text: 'Traveller',
				children: [
					{id: 1, text:'email1@trav.com'},
					{id: 2, text:'email2@trav.com'},
					{id: 3, text:'email3@trav.com'},
					{id: 4, text:'email4@trav.com'},
				]
			},
		]
	});
};


/* Set Up New Action Form
   ========================================================================== */
var setUpActionNew = function() {
	$('#action-closed').on('change', function() {
		if (this.checked) {
			$('#action-closed-reason').removeAttr('disabled');
		} else {
			$('#action-closed-reason').attr('disabled', 'disabled');
			$('#action-closed-reason-details').attr('disabled', 'disabled');
		}
	});

	$('#action-closed-reason').on('change', function() {
		if (this.value === 'Other') {
			$('#action-closed-reason-details').removeAttr('disabled');
		} else {
			$('#action-closed-reason-details').attr('disabled', 'disabled');
		}
	});
};


/* Set Up Shortlist Form
   ========================================================================== */
var setUpShortlistForm = function() {
	var parentForm = '.offer-form ';
	var inputs = parentForm + ':input:not(button)';
	var saveButton = '.btn-save-offer';
	var editButton = '.btn-edit-offer';

	if ($(parentForm).hasClass('form-editable')) {
		$(inputs).removeAttr('disabled');
		$(editButton).hide();
		$(saveButton).show();
	}

	$(saveButton).on('click',function(e) {
		var parentForm = $(this).closest('form').attr('id');
		makeFormReadonly(parentForm);

		//for illustration purposes only, change this if ajax is used
		return false;
	});

	$(editButton).on('click',function(e) {
		var parentForm = $(this).closest('form').attr('id');
		makeFormEditable(parentForm);

		//for illustration purposes only, change this if ajax is used
		return false;
	});
};

/* Make all fields in the form readonly */
function makeFormReadonly(element) {
	var parent = '#' + element + '.form-editable ';
	var inputs = parent + ':input:not(button)';
	var saveButton = parent + ' .btn-save-offer';
	var editButton = parent + ' .btn-edit-offer';
	
	$(inputs).attr("disabled", true);
	$(editButton).show();
	$(saveButton).hide();

	$(parent).removeClass('form-editable').addClass('form-readonly');
}

/* Make all fields in the form editable */
function makeFormEditable(element) {
	var parent = '#' + element + '.form-readonly ';
	var inputs = parent + ':input:not(button)';
	var saveButton = parent + ' .btn-save-offer';
	var editButton = parent + ' .btn-edit-offer';

	$(inputs).removeAttr('disabled');
	$(editButton).hide();
	$(saveButton).show();

	$(parent).removeClass('form-readonly').addClass('form-editable');
}


/* Set Up QA Scoring Form
   ========================================================================== */
var setUpQAScoring = function() {
	$('#form-qa-check input[name*="clientreporting-"]').each(function() {
		var fieldToToggle = $(this).closest('.form-group').find('.toggle-field');
		if ($(this).is(':checked') && ($(this).val() == 'no')) {
			fieldToToggle.show();
		} else {
			fieldToToggle.hide();
		}
	});

	$('#form-qa-check input[name*="clientreporting-"]').change(function(e) {
		var fieldToToggle = $(this).closest('.form-group').find('.toggle-field');
		if ($(this).val() == 'no') {
			fieldToToggle.show();
		}
		else {
			fieldToToggle.hide();
		}
	});
};


/* Set Up Gritter Notifications
   ========================================================================== */
var setUpNotifications = function() {
	$('.property-shortlist-add-success').click(function() {
		$.gritter.add({
			title: 'Property Shortlisted',
			text: 'You successfully added <strong>Fab Apartments City Center</strong> to your shortlist. For a complete list of your favourites, please <a href="shortlist-tab.html" class="orange">click here</a>.',
			class_name: 'gritter-success'
		});
	});

	$('.property-shortlist-add-error').click(function() {
		$.gritter.add({
			title: 'Oh snap!',
			text: 'Property <strong>Fab Apartments City Center</strong> could not be added to your shortlist, please try again or contact support team.',
			class_name: 'gritter-error'
		});
	});

	$('.property-shortlist-remove-success').click(function() {
		$.gritter.add({
			title: 'Property Removed From Shortlist',
			text: 'You successfully removed <strong>Fab Apartments City Center</strong> from your shortlist. For a complete list of your favourites, please <a href="shortlist-tab.html" class="orange">click here</a>.',
			class_name: 'gritter-success'
		});
	});

	$('.note-added-success').click(function() {
		$.gritter.add({
			title: 'Note Added',
			text: 'You successfully added a note to property <strong>Fab Apartments City Center</strong>. To see all notes please <a class="orange" href="#">click here</a>.',
			class_name: 'gritter-success'
		});
	});

	$('.note-added-error').click(function() {
		$.gritter.add({
			title: 'Oh snap!',
			text: 'There was an error trying to add a note to property <strong>Fab Apartments City Center</strong>. Please try again or contact support team.',
			class_name: 'gritter-error'
		});
	});
};


/* Set Up WYSIWYG Editor
   ========================================================================== */
var setUpWysiwygEditor = function() {



	//$('.wysiwyg-editor').ace_wysiwyg(
	//{
	//	toolbar: [
	//		'font',
	//		'fontSize',
	//		null,
	//		'bold',
	//		'italic',
	//		'underline',
	//		null,
	//		'insertorderedlist',
	//		'insertunorderedlist',
	//		'outdent',
	//		'indent',
	//		null,
	//		'justifyleft',
	//		'justifycenter',
	//		'justifyright',
	//		null,
	//		'createLink',
	//		'unlink',
	//		null,
	//		'insertimage',
	//		null,
	//		'undo',
	//		'redo'
	//	]
	//}).prev().addClass('wysiwyg-style1');

	$('.ideMailOutput').summernote({
		height: 280,
		tabsize: 2
		//airMode: true
	});
	$('.summernote').summernote({
		height: 280,
		tabsize: 2
		//airMode: true
	});

};
/* Set Up ClientSearchModal
   ========================================================================== */
var setUpClientSearchModal = function () {
	
	$('#idDTClientChoice').on('show', function () {
		//alert("shown");
		$('.modal-body', this).css({ width: 'auto', height: 'auto', 'max-height': '100%' });
	});
	$('#idDTTravellerChoice').on('show', function () {
	    //alert("shown");
	    $('.modal-body', this).css({ width: 'auto', height: 'auto', 'max-height': '100%' });
	});
	$('#idDTClientChosenOption').on('show', function () {
	    alert("shown");
	    $('.modal-body', this).css({ width: 'auto', height: 'auto', 'max-height': '100%' });
	});
	//$('#idDTClientChoice').on('show.bs.modal', function(event) {
	//    var button = $(event.relatedTarget); // Button that triggered the modal
	//    var from = event.relatedTarget ? event.relatedTarget : event.fromElement;
	//    var to = event.target ? event.target : event.toElement;
	//    alert(from);
	//    alert(to);
	//	alert(button.id);
	//	var recipient = button.data('whatever'); // Extract info from data-* attributes
	//	// If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
	//	// Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
	//	var modal = $(this);
	//	modal.find('.modal-title').text('Find Client in ' + recipient);
	//	//modal.find('.modal-body input').val(recipient)
	//});
};
/* Helper Functions
   ========================================================================== */
$.fn.exists = function(){ return this.length > 0; };