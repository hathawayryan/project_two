

// Create our initial map object
// Set the longitude, latitude, and the starting zoom level
var myMap = L.map("map").setView ([31.63, -100.30], 6);

var mapData = {features: []};

// Add a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token="+API_KEY, {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);


let xhr = new XMLHttpRequest();
xhr.open('GET', 'map.geo.json');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.responseType = 'json';
xhr.onload = function() {
    if (xhr.status !== 200) return
    mapData = xhr.response;
printMap();
    
};
xhr.send();



function printMap(){
myMap.eachLayer((layer)=>{
  !layer._url && myMap.removeLayer(layer);
});
L.geoJSON(mapData,{
      onEachFeature: (feature, layer) => {

let popupContent = "<strong>Graduation Rate: </strong>"+feature.properties.graduation_rate+
"<br><hr><strong>School Name: </strong>"+feature.properties.school_name;
layer.bindPopup(popupContent);
      },
      filter: (feature, layer) => {
        if(feature.properties.graduation_rate < parseInt(document.querySelector("#graduationRateSlider").value)){
          return true;
        }
        return false;
      }
    }).addTo(myMap);
}
// // Create a new marker
// // Pass in some initial options, and then add it to the map using the addTo method
// var marker = L.marker([27.63, -98.49], {
//   draggable: false,
//   title: "ZEPHYR SCHOOL"
// }).addTo(myMap);

//{"type":"FeatureCollection","features":[{"type":"Feature","properties":,"geometry":{"type":"Point","coordinates":[-96.75033,33.34028]}}


// // An array containing each city's name, location, and population
// var cities = [{
//   location: [40.7128, -74.0059],
//   name: "New York",
//   population: "8,550,405"
// },
// {
//   location: [41.8781, -87.6298],
//   name: "Chicago",
//   population: "2,720,546"
// },
// {
//   location: [29.7604, -95.3698],
//   name: "Houston",
//   population: "2,296,224"
// },
// {
//   location: [34.0522, -118.2437],
//   name: "Los Angeles",
//   population: "3,971,883"
// },
// {
//   location: [41.2524, -95.9980],
//   name: "Omaha",
//   population: "446,599"
// }
// ];

// // Loop through the cities array and create one marker for each city, bind a popup containing its name and population add it to the map
// for (var i = 0; i < cities.length; i++) {
//   var city = cities[i];
//   L.marker(city.location)
//     .bindPopup("<h1>" + city.name + "</h1> <hr> <h3>Population " + city.population + "</h3>")
//     .addTo(myMap);
// }

// // Binding a pop-up to our marker
// marker.bindPopup("Hello There!");
