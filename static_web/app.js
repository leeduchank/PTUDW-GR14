let map;
let marker;
let geocoder;
let responseDiv;
let response;
let locations
let infoWindow1

// x = navigator.geolocation;
// x.getCurrentPosition(sucssess,failure);

// function success(position){

// }


function fetchLocationsFromApi() {
  
  return fetch("http://localhost:3000/spaces" ,{
  method: 'GET',
  mode: 'cors',})
    .then(response => response.json())
    .then(data => {
      locations = data;
      return data;
    })
    .catch(error => {
      console.error("Error fetching data from the API:", error);
      return [];
    });
}
window.handleButtonClick = function(index) {
  // You can use the index to identify which marker's button was clicked
  // alert(`Button clicked for marker at index ${index}`);
};
function initMap() {
  
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: { lat: 10.7645554, lng: 106.6819694 },
    mapTypeControl: false,
  });

  infoWindow1 = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow1.setPosition(pos);
          infoWindow1.setContent("Location found.");
          infoWindow1.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow1, map.getCenter());
        },
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow1, map.getCenter());
    }
  });




  geocoder = new google.maps.Geocoder();

  const inputText = document.createElement("input");

  inputText.type = "text";
  inputText.placeholder = "Enter a location";

  const submitButton = document.createElement("input");

  submitButton.type = "button";
  submitButton.value = "Geocode";
  submitButton.classList.add("button", "button-primary");

  const clearButton = document.createElement("input");

  clearButton.type = "button";
  clearButton.value = "Clear";
  clearButton.classList.add("button", "button-secondary");
  response = document.createElement("pre");
  response.id = "response";
  response.innerText = "";
  responseDiv = document.createElement("div");
  responseDiv.id = "response-container";
  responseDiv.appendChild(response);



  const instructionsElement = document.createElement("p");

  instructionsElement.id = "instructions";
  instructionsElement.innerHTML =
    "<strong>Instructions</strong>: Enter an address in the textbox to geocode or click on the map to reverse geocode.";
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearButton);
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(instructionsElement);
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(responseDiv);
  fetchLocationsFromApi()
  .then(locations => {
    locations.forEach((location, index) => {
      const marker = new google.maps.Marker({
        position: { lat: location.longitude, lng: location.latitude },
        map,
        title: "test",
        icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
      });

      const infowindow = new google.maps.InfoWindow({
        content: "Loading..." // Initial content before the button is added
      });

      marker.addListener("click", () => {
        // Modify the info window content when the marker is clicked
        console.log(location)
        infowindow.setContent(`
          <div>
            <p>Marker Information</p>
            <button onclick="handleButtonClick(${location})">Click me</button>
          </div>
        `);

        infowindow.open(map, marker);
      });
    });
  })
  .catch(error => {
    console.error("Error initializing the map:", error);
  });

 
  
  marker = new google.maps.Marker({
   
    map,
    
  });

  map.addListener("click", (e) => {
    const clickedLocation = findClosestLocation(e.latLng);
  
    if (clickedLocation) {
      console.log("Location found:", clickedLocation);
      
      // Tạo marker cho vị trí được click
     
    } else {
      geocode({ location: e.latLng });
      console.log("Location not found in the list");
    }
  });
  
  
  submitButton.addEventListener("click", () =>
    geocode({ address: inputText.value }),
  );
  clearButton.addEventListener("click", () => {
    clear();
  });
  clear();
}


function handleLocationError(browserHasGeolocation, infoWindow1, pos) {
  infoWindow1.setPosition(pos);
  infoWindow1.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation.",
  );
  infoWindow1.open(map);
}

function findClosestLocation(clickedLatLng) {
  // Tìm địa điểm gần nhất với vị trí click
  const geometry = google.maps.geometry;
  let closestLocation = null;
  let closestDistance = Infinity;

  locations.forEach(location => {
    const locationLatLng = new google.maps.LatLng(location.latitude, location.longitude);
    const distance = geometry.spherical.computeDistanceBetween(clickedLatLng, locationLatLng);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestLocation = location;
    }
  });

  // Nếu khoảng cách nhỏ hơn một ngưỡng nào đó, coi như địa điểm được click
  const threshold = 100; // Tùy chỉnh ngưỡng theo nhu cầu
  return closestDistance < threshold ? closestLocation : null;
}
function createMarkers(){


const newMarker = new google.maps.Marker({
  
  map: map,

});
}


function clear() {
  marker.setMap(null);
  responseDiv.style.display = "none";
}

function geocode(request) {
  clear();
  geocoder
    .geocode(request)
    .then((result) => {
      const { results } = result;
      
      map.setCenter(results[0].geometry.location);
      marker.setPosition(results[0].geometry.location);
      marker.setMap(map);
      console.log(JSON.stringify(result, null, 2))
      return results;
    })
    .catch((e) => {
      alert("Geocode was not successful for the following reason: " + e);
    });
}

window.initMap = initMap;