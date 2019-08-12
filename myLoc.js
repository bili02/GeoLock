var map;

function showMap(coords){
	var googleLatAndLong = 
	new google.maps.LatLng(coords.latitude,coords.longitude);

	var mapOptions = {
		zoom: 10, 
		center: googleLatAndLong,
		mapTypeId: google.maps.MapTypeId.SATELLITE

	};
	var mapDiv = document.getElementById("map");
	map = new google.maps.Map(mapDiv, mapOptions);
}







//lokalizacja docelowa (helion)
var ourCoords = {
	latitude: 50.288962,
	longitude: 18.659609
};


window.onload = getMyLocation;

function getMyLocation() {
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(displayLocation, displayError);

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

	var km = computeDistance(positon.coords, ourCoords);
	var distance = document.getElementById("distance");
	distance.innerHTML = "jesteś " + km + " km od siedziby Helionu";

	showMap(positon.coords);
}
