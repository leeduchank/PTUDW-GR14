let map;
let marker;
let geocoder;
let responseDiv;
let response;

const spaceList = [
  {lat: 10.7645554,lng: 106.6819694 },
  { lat: 10.2442, lng: 106.24242 },
  { lat: 10.3456, lng: 106.56789 },
  { lat: 10.1234, lng: 106.98765 },
  { lat: 10.1245, lng: 106.24242 },
  { lat: 10.2245, lng: 106.42145 },
  { lat: 10.2244, lng: 106.1111 },

]

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
  spaceList.forEach((location, index) => {
    const marker = new google.maps.Marker({
      position: location,
      map,
      title: "test",
      icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    });
  });
  marker = new google.maps.Marker({
   
    map,
    
  });

  
  map.addListener("click", (e) => {
    geocode({ location: e.latLng });
  });
  submitButton.addEventListener("click", () =>
    geocode({ address: inputText.value }),
  );
  clearButton.addEventListener("click", () => {
    clear();
  });
  clear();
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
      // responseDiv.style.display = "block";
      //response.innerText = JSON.stringify(result, null, 2);
      console.log(JSON.stringify(result, null, 2))
      return results;
    })
    .catch((e) => {
      alert("Geocode was not successful for the following reason: " + e);
    });
}

window.initMap = initMap;