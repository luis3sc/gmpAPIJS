 // mapa
//mapa
 // mapa
 $(document).ready(function() {

	$('#get-location-button').on('click', function() {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var latitude = position.coords.latitude;
				var longitude = position.coords.longitude;
	
				$('#map-lat').val(latitude);
				$('#map-lon').val(longitude);
				$('#lat').val(latitude + ',' + longitude);
	
				$('#direccion').val("Current Location: " + latitude + ", " + longitude);
	
				$('#map').locationpicker('location', {
					latitude: latitude,
					longitude: longitude
				});
	
				calculateDistanceAndTime();
			}, function(error) {
				alert("Error al obtener la ubicación actual: " + error.message);
			});
		} else {
			alert("La geolocalización no está disponible en este navegador.");
		}
	});
	function updateDistanceInSoles(distanceText) {
		var distanceValue = parseFloat(distanceText);
		
		if (!isNaN(distanceValue)) {
			var newDistanceValue = (distanceValue * 1.5).toFixed(2);
			$('#distancia-soles').text('S/' + newDistanceValue); // Cambia .text() por .val()
		}
	}
	$('#lat').on('change', function() {
					calculateDistanceAndTime();
				});
				var distance, duration;
			   
	
	function calculateDistanceAndTime() {
		var origin = $('#origen').val();
		var destination = $('#lat').val();
	
		var service = new google.maps.DistanceMatrixService();
		service.getDistanceMatrix({
			origins: [origin],
			destinations: [destination],
			travelMode: google.maps.TravelMode.DRIVING,
			unitSystem: google.maps.UnitSystem.METRIC,
		}, function(response, status) {
			if (status === 'OK') {
				var rows = response.rows;
				if (rows && rows.length > 0) {
					var elements = rows[0].elements;
					if (elements && elements.length > 0) {
						var distance = elements[0].distance; // Accede al objeto de distancia
						var duration = elements[0].duration; // Accede al objeto de duración
	
						// Asegúrate de que los objetos distance y duration no sean undefined
						if (distance && duration) {
							var distanceText = distance.text;
							var durationText = duration.text;
	
							$('#distanciakm').val(distanceText);
							$('#distanciadelivery').val(durationText);
	
							// Calcula el valor en soles y lo muestra en el elemento #distancia-soles
							updateDistanceInSoles(distanceText);
						}
					}
				}
			} else {
				console.log('Error:', status);
			}
		});
	}
	
	$.fn.locationpicker.defaults = {
		location: {
			latitude: "",
			longitude: ""
		},
		locationName: "",
		radius: 500,
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: [],
		mapOptions: {},
		scrollwheel: true,
		inputBinding: {
			latitudeInput: null,
			longitudeInput: null,
			radiusInput: null,
			locationNameInput: null
		},
		enableAutocompleteBlur: true,
		autocompleteOptions: null,
		addressFormat: "ST_NAME",
		enableReverseGeocode: true,
		draggable: true,
		onchanged: function(currentLocation, radius, isMarkerDropped) {},
		onlocationnotfound: function(locationName) {},
		oninitialized: function(component) {},
		markerIcon: undefined,
		markerDraggable: true,
		markerVisible: true
	};
	
	$('#map').locationpicker({
		enableAutocomplete: true,
		enableReverseGeocode: true,
		radius: 0,
		inputBinding: {
			latitudeInput: $('#map-lat'),
			longitudeInput: $('#map-lon'),
			radiusInput: $('#map-radius'),
			locationNameInput: $('#direccion')
		},
		onchanged: function(currentLocation, radius, isMarkerDropped) {
			document.getElementById("lat").value = currentLocation.latitude + ',' + currentLocation.longitude;
			var addressComponents = $(this).locationpicker('map').location.addressComponents;
			updateControls(addressComponents); //Data
		}
	});    
	
	function updateControls(addressComponents) {
		// ...
	}
	
	calculateDistanceAndTime();
	
	
	});