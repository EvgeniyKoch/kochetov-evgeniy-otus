// const options = {
//   enableHighAccuracy: true,
//   timeout: 1000,
//   maximumAge: 5,
// };

// function showLocation(position) {
//   const latitude = position.coords.latitude;
//   const longitude = position.coords.longitude;

//   alert("Latitude : " + latitude + " Longitude: " + longitude);
//   return [latitude, longitude];
// }

// function errorHandler(err) {
//   if (err.code == 1) {
//     alert("Error: Access is denied!");
//   } else if (err.code == 2) {
//     alert("Error: Position is unavailable!");
//   }
// }

// function getLocation() {
//   if (navigator.geolocation) {
//     return navigator.geolocation.getCurrentPosition(
//       showLocation,
//       errorHandler,
//       options
//     );
//   } else {
//     alert("Sorry, browser does not support geolocation!");
//   }
// }

// const userCoord = getLocation();
