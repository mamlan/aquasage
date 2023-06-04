let latitude = 0.0;
let longitude = 0.0;

function geoFindMe() {
  const status = document.querySelector("#status");
  const mapLink = document.querySelector("#map-link");

//   mapLink.href = "";
  mapLink.textContent = "";

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    status.textContent = "";
    // mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;

    fetchSoilMoisture();
  }

  function error() {
    status.textContent = "Unable to retrieve your location";
  }

  if (!navigator.geolocation) {
    status.textContent = "Geolocation is not supported by your browser";
  } else {
    // status.textContent = "Locating…";
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

function fetchSoilMoisture(){
	const moistureLevel= document.querySelector("#moistureLevel");
	const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=soil_moisture_1_3cm`;

	// Fetch weather data from the API
	fetch(apiUrl)
		.then(response => response.json())
		.then(data => {
		// Extract the soil moisture data from the response
		let moisture = data.hourly.soil_moisture_1_3cm;

		// Process and display the soil moisture data
		moistureLevel.textContent="Moisture level: "+moisture[0]+"%";
		console.log("Soil Moisture Data:");
		console.log(moisture[0]);
		})
		.catch(error => {
		console.log('An error occurred:', error);
		});
}
document.querySelector("#locate-me").addEventListener("click", geoFindMe);
  
/*        MAP             */


/*				legend				*/

tippy('#cell1', {
	content: 'The soil is significantly dry and may require immediate watering.'+
	'Plants may be experiencing water stress, and further delay in watering could '+
	'potentially harm their health and growth.',
	arrow:true,
	placement: 'bottom',
	animation: 'shift-away',
	// followCursor: true,
});
tippy('#cell2', {
	content: 'The soil is somewhat dry but not critically so. Watering is still necessary, '+
	'but it may not be as urgent as in the very dry range. Providing water at this stage '+
	'helps maintain adequate moisture for plant health.',
	arrow:true,
	placement: 'bottom',
	animation: 'shift-away',
	// followCursor: true,

});tippy('#cell3', {
	content: 'The soil is has moderate moisture. This means the soil has '+
	'adequate amount of water for most plants. This moisture can be considered '+
	'for plant growth and development',
	arrow:true,
	placement: 'bottom',
	animation: 'shift-away',
	// followCursor: true,
});
tippy('#cell4', {
	content: 'This means the soil has an ideal level of moisture for plant growth and development. Optimal '+
	'soil moisture typically provides a balanced environment where plants can thrive.',
	arrow:true,
	placement: 'bottom',
	animation: 'shift-away',
	// followCursor: true,
});
tippy('#cell5', {
	content: 'This means that the soil is holding an excessive amount of water. '+
	'This condition can have negative effects on plant health. Additional watering is not recommended.',
	arrow:true,
	placement: 'bottom',
	animation: 'fade',
	// followCursor: true,
	


});
/*                  NAVBAR                 */  
document.querySelector('#menu').addEventListener('click', ()=>{
  document.querySelector('nav ul').classList.toggle('showmenu');
})