/* ==========================================================================
   JS Scripts For Achieving Custom Functionalities
   ========================================================================== */


/* Calling Functions On Pageload
   ========================================================================== */
$(function() {
	setUpDataTables();
	setUpDataTablesBasic();
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
		}],
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
var setUpMyEmailsTable = function() {
	$('#my-emails').on('click','.email-preview-trigger',function() {
		var trigger = $(this);
		var element = trigger.parent().find('.email-preview-text');

		trigger.toggleClass('open');
		element.toggleClass('show');
		$('#my-emails').ace_scroll('reset');
	});
};


/* Set Up Popovers
   ========================================================================== */
var setUpPopovers = function() {
	$('[data-rel=popover]').popover();
	$('[data-rel=tooltip]').tooltip();
};


/* Set Up Form Utilities
   ========================================================================== */
var setUpFormUtilities = function() {
	/* initializing date picker */
	if ( $('.date-picker').exists()) {
		$('.date-picker').datepicker({
			format: 'dd/mm/yyyy',
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
			format: 'DD/MM/YYYY hh:mm'
		}).next().on(ace.click_event, function(){
			$(this).prev().focus();
		});
	}

	/* initializing select2 plugin */
	if ( $('select.select2').exists()) {
		$("select.select2").select2();
	}

	/* initializing ace spinner plugin */
	if ( $('.ace-spinner-input').exists()) {
		$(".ace-spinner-input").ace_spinner({
			btn_up_class: 'btn-default',
			btn_down_class:'btn-default'
		});
	}
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
var setUpEmailNew = function() {
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
					{id: 1, text:'email1@prc.com'},
					{id: 2, text:'email2@prc.com'},
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
	$('.wysiwyg-editor').ace_wysiwyg({
		toolbar: [
			'bold',
			'italic',
			'underline',
			null,
			'justifyleft',
			'justifycenter',
			'justifyright',
			null,
			'createLink',
			'unlink',
			null,
			'undo',
			'redo'
		]
	}).prev().addClass('wysiwyg-style1');
};


/* Helper Functions
   ========================================================================== */
$.fn.exists = function(){ return this.length > 0; };