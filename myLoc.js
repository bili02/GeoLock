var map;
var watchId = null;

function showMap(coords){
	var googleLatAndLong = 
	new google.maps.LatLng(coords.latitude,coords.longitude);

	var mapOptions = {
		zoom: 10, 
		center: googleLatAndLong,
		mapTypeId: google.maps.MapTypeId.ROADMAP

	};
	var mapDiv = document.getElementById("map");
	map = new google.maps.Map(mapDiv, mapOptions);

	var title = "Twoja lokalizacja";
	var content = "Jesteś tu: " + coords.latitude + ", " + coords.longitude;
	addMarker(map, googleLatAndLong, title, content);
}
//pinezki
function addMarker(map, latlong, title, content) {
	var markerOptions = {
		position: latlong,
		map: map,
		title: title,
		clickable: true
	}
	var marker = new google.maps.Marker(markerOptions);
    
    var infoWindowOptions = {
    	content: content,
    	positon: latlong
    };

    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

    google.maps.event.addListener(marker, "click", function() {
    	infoWindow.open(map);
    })


}





//lokalizacja docelowa (helion)
var ourCoords = {
	latitude: 50.288962,
	longitude: 18.659609
};


window.onload = getMyLocation;

function getMyLocation() {
	if (navigator.geolocation){
		var watchButton = document.getElementById("watch");
		watchButton.onclick = watchLocation;
		var clearWatchButton = document.getElementById("clearWatch");
		clearWatchButton.onclick = clearWatch;

	}

  else {
  	alert("Brak wsparcia dla twojej przeglądarki :c, napisz pv");
  }
}
function displayLocation(positon) {
	var latitude = positon.coords.latitude;
	var longitude = positon.coords.longitude;

	var div = document.getElementById("location");
	div.innerHTML = "jesteś na szerokości: " + latitude + " i długości: " + longitude;
	showMap(positon.coords);
}
// Funkcja wywalanie błędów
function displayError(error){
var errorTypes = {
	0: "Nieznany błąd :(",
	1: "Dostęp zabroniony przez użytkownika",
	2: "Położenia jest niedostępne",
	3: "Zbyt długi czas oczekiwania"
};
var errorMassage = errorTypes[error.code];
if (error.code ==0 || error.code ==2) {
	errorMassage = errorMassage + " " + errorMassage;
}
var div = document.getElementById("location");
div.innerHTML = errorMassage;
}
//kod obliczający odległość
function computeDistance(startCoords, destCoords) {
	var startLatRads = degreesToRadians(startCoords.latitude);
	var startLongRads = degreesToRadians(startCoords.longitude);
	var destlatRads = degreesToRadians(destCoords.latitude);
	var destLongRads = degreesToRadians(destCoords.longitude);

	var Radius = 6371; // promień ziemi w km
	var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destlatRads) +
	Math.cos(startLatRads) * Math.cos(destlatRads) *
	Math.cos(startLongRads - destLongRads)) * Radius;

	return distance;


}

function degreesToRadians(degrees){
	var radians = (degrees * Math.PI)/180;
	return radians;
}


function displayLocation(positon){
	var latitude = positon.coords.latitude;
	var longitude = positon.coords.longitude;

	var div = document.getElementById("location");
	div.innerHTML = "Jesteś na szerokości " + latitude + " i długości " + longitude;
    div.innerHTML += "  (z dokładnością do " + positon.coords.accuracy + " m)";

	var km = computeDistance(positon.coords, ourCoords);
	var distance = document.getElementById("distance");
	distance.innerHTML = "jesteś " + km + " km od siedziby Helionu";

	if (map == null) {
		showMap(positon.coords);
	}
}
//funkcja śledzenia
function watchLocation() {
	watchId = navigator.geolocation.watchPosition(displayLocation,
		displayError);
}
function clearWatch(){
	if (watchId){
		navigator.geolocation.clearWatch(watchId);
		watchId = null;
	}
}
