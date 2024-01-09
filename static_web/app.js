let map;
let marker;
let geocoder;
let responseDiv;
let response;
let locations

const spaceList = [
  {lat: 10.7645554,lng: 106.6819694 },
  { lat: 10.2442, lng: 106.24242 },
  { lat: 10.3456, lng: 106.56789 },
  { lat: 10.1234, lng: 106.98765 },
  { lat: 10.1245, lng: 106.24242 },
  { lat: 10.2245, lng: 106.42145 },
  { lat: 10.2244, lng: 106.1111 },

]
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
  alert(`Button clicked for marker at index ${index}`);
};
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: { lat: 10.7645554, lng: 106.6819694 },
    mapTypeControl: false,
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
        infowindow.setContent(`
          <div>
            <p>Marker Information</p>
            <button onclick="handleButtonClick(${index})">Click me</button>
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