/* ==========================================================================
   JS File For Etrak Property Map Component
   ========================================================================== */


/* Global Variables
   ========================================================================== */
var map = ''; // map object
var gmInfoWindow = new google.maps.InfoWindow({maxWidth: 320}); // one global info window
var gmPinImageSuffix = "ABCDEFGHIJKLMNOPQRSTUWVXYZ".split("");  // array for marker image
var gmMarkers = []; // marker array
var gmMarkerImageRoot = 'http://maps.google.com/mapfiles/marker'; // root folder for marker images
var bounds = new google.maps.LatLngBounds(); // viewpoint bound


/* List of Properties as JSON objects (testing data only) */
var propertySet = [
	{
		latitude: 51.581834,
		longitude: -0.199332,
		name: 'Roomspace Serviced Apartments - Sterling House',
		url: '/path-to-property',
		image: 'http://maps.google.com/mapfiles/markerA.png',
		location: 'United Kingdom, London',
		price: 'from &pound;113.14 per night',
		apartmentType: '1:1',
		minimumStay: '7 night(s)',
		availability: 'book online'
	},
	{
		latitude: 51.525490,
		longitude: -0.141617,
		name: 'Executive Roomspace - King Regents Place',
		url: '/path-to-property',
		location: 'United Kingdom, London',
		price: 'from &pound;96.77 per night',
		apartmentType: '1:1',
		minimumStay: '7 night(s)',
		availability: 'please enter travel dates'
	},
	{
		latitude: 51.519425,
		longitude: -0.152435,
		name: 'Executive Roomspace - Cramer House',
		url: '/path-to-property',
		location: 'United Kingdom, London',
		price: 'from &pound;121.18 per night',
		apartmentType: '1:1',
		minimumStay: '7 night(s)',
		availability: 'book online'
	},
	{
		latitude: 51.482202,
		longitude: -0.029035,
		name: 'Executive Roomspace - Howard House',
		url: '/path-to-property',
		location: 'United Kingdom, London',
		price: 'from &pound;113.05 per night',
		apartmentType: '1:1',
		minimumStay: '7 night(s)',
		availability: 'make enquiry'
	},
	{
		latitude: 51.522802,
		longitude: -0.421155,
		name: 'Roomspace Serviced Apartments - Point West',
		url: '/path-to-property',
		location: 'United Kingdom, London',
		price: 'from &pound;104.57 per night',
		apartmentType: '1:1',
		minimumStay: '7 night(s)',
		availability: 'please enter travel dates'
	}
];


/* Sets up property map view
   ========================================================================== */
var setUpPropertyMapView = function() {
	initializeGM();

	/* Loop through the properties */
	$.each(propertySet, function (index,property) {
		createMarker(index);
		extendBounds(index);
	});

	/* When marker icon is clicked in the property list, update the map */
	$('[data-marker-ref]').on( "click", function(e) {
		var markerRef = $(this).data("marker-ref");
		deSelectActiveListItem();
		$(this).parent().parent().addClass('active');
		showInfoWindow(markerRef);
	});
};


/* Initializes Google Map
   ========================================================================== */
var initializeGM = function() {
	/* Configure map options */
	var mapOptions = {
		mapTypeId: google.maps.MapTypeId.HYBRID,
		zoom: 18,
		mapTypeControl: true,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
			position: google.maps.ControlPosition.TOP_CENTER
		},
		panControl: true,
		panControlOptions: {
			position: google.maps.ControlPosition.RIGHT_TOP
		},
		zoomControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.LARGE,
			position: google.maps.ControlPosition.RIGHT_TOP
		}
	};

	/* Initialize map */
	map = new google.maps.Map(document.getElementById('property-map'), mapOptions);
};


/* Adds a marker to the map and pushes it to global marker array
   ========================================================================== */
var createMarker = function(index) {
	var property = propertySet[index];
	var position = new google.maps.LatLng(property.latitude, property.longitude);
	var gmMarkerImage = gmMarkerImageRoot + gmPinImageSuffix[index] + '.png';

	var gmMarker = new google.maps.Marker({
		animation: google.maps.Animation.DROP,
		icon: gmMarkerImage,
		map: map,
		position: position
	});
	gmMarkers.push(gmMarker);

	google.maps.event.addListener(gmMarker, 'click', function() {
		showInfoWindow(index);
		selectActiveListItem(index);
	});
};


/* Zooms the map out so all properties are visible
   ========================================================================== */
var extendBounds = function(index) {
	var property = propertySet[index];
	var position = new google.maps.LatLng(property.latitude, property.longitude);
	bounds.extend(position);
	map.fitBounds(bounds); // 
};


/* Populates info window with relevant content and shows it
   ========================================================================== */
var showInfoWindow = function(index) {
	var property = propertySet[index];
	var position = new google.maps.LatLng(property.latitude, property.longitude);
	var content =
		'<div class="infowindow-content">'+
		'<h5 class="infowindow-title lighter blue">'+ property.name + '</h5>' +
		'<div class="infowindow-body">' +
		'<p><strong>Location:' + '</strong> ' + property.location + '</p>' +
		'<p><strong>Price:' + '</strong> ' + property.price + '</p>' +
		'<p><strong>Apartment Type:' + '</strong> ' + property.apartmentType + '</p>' +
		'<p><strong>Minimum stay:'   + '</strong> ' + property.minimumStay   + '</p>' +
		'<p class="mb-10"><strong>Availability:'   + '</strong> ' + property.availability  + '</p>' +
		'<p><a href="' + property.url + '" class="btn btn-info no-border btn-xs">view property</a></p>' +
		'</div></div>';

	gmInfoWindow.setContent(content);
	gmInfoWindow.setPosition(position);
	gmInfoWindow.open(map,gmMarkers[index]);

	google.maps.event.addListener(gmInfoWindow,'closeclick',function() {
		deSelectActiveListItem();
	});
};


/* Adds 'active' class to the selected item in the property list
   ========================================================================== */
var selectActiveListItem = function(index) {
	deSelectActiveListItem();
	$('.property-map-list li').eq(index).addClass("active");
};


/* Removes 'active' class from the selected item in the property list
   ========================================================================== */
var deSelectActiveListItem = function() {
	$('.property-map-list li').removeClass('active');
};


/* Reset Google Map
   ========================================================================== */
var resetGm = function() {
	map.fitBounds(bounds);
	gmInfoWindow.close();
	deSelectActiveListItem();
};


/* Trigger GM Reset
   ========================================================================== */
$('.property-map-reset').on('click', function() {
	resetGm();
});