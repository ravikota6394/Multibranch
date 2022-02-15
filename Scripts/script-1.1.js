/* ==========================================================================
   JS Scripts For Achieving Custom Functionalities
   ========================================================================== */

/* Calling Functions On Pageload
   ========================================================================== */
$(function() {

});

/*
 * Datetimepicker
 * https://github.com/xdan/datetimepicker 
   =================================================== */
function setUpDatetimepickers() {
	if ($('.datetime-picker').exists()) {
		$('.datetime-picker').datetimepicker({
			format: 'd M Y / H:i',
		});
	}

	if ($('.date-picker').exists()) {
		$('.date-picker').datetimepicker({
			format: 'd M Y',
			autoclose: true,
			todayHighlight: true,
			timepicker:false
		});
	}
	
	if ($('.time-picker').exists()) {
		$('.time-picker').datetimepicker({
			datepicker:false,
			format:'H:i'
		});
	}
}

/*
 * Tooltipster
 * https://github.com/iamceege/tooltipster
   ===================================================== */
function setUpTooltips() {
	$('.tooltip').tooltipster({
		position: 'top',
		maxWidth: 200
	 });
}

/* Helper Functions
   =================================================== */
$.fn.exists = function() { return this.length > 0; };