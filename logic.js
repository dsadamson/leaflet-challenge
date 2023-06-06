// Define the createMap function
function createMap() {
    // Create the Leaflet map
    var map = L.map("map").setView([0, 0], 2);
  
    // Add the tile layer to the map
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors",
    }).addTo(map);
  
// Use depth to determine marker colors
function markerColor(depth) {
    if (depth > 90) {
      return "#660066"; 
    } else if (depth > 70) {
      return "#800080"; 
    } else if (depth > 50) {
      return "#0000FF"; 
    } else if (depth > 30) {
      return "#00BFFF"; 
    } else if (depth > 10) {
      return "#00FFFF";
    } else {
      return "#66FF66"; 
    }
  }
  
    // Use magnitude to find marker size
    function markerSize(magnitude) {
      return magnitude;
    }
  
    // Create markers
    function markerStyle(feature, latlng) {
      return L.circleMarker(latlng, {
        radius: markerSize(feature.properties.mag),
        fillColor: markerColor(feature.geometry.coordinates[2]),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
      });
    }
  
    // Bind the popups to each marker
    function popup(feature, layer) {
      layer.bindPopup(
        "Place: " +
          feature.properties.place +
          "<br/>Magnitude: " +
          feature.properties.mag +
          "<br/>Depth: " +
          feature.geometry.coordinates[2] +
          " km"
      );
    }
  
    // Add GeoJSON layer, with markers and popups
    function createGeoJSONLayer(data) {
      return L.geoJSON(data, {
        pointToLayer: markerStyle,
        onEachFeature: popup,
      });
    }
  
    // Create legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function (map) {
      var div = L.DomUtil.create("div", "info legend");
  
      var legendLabels = [
        { depth: 0, label: "<10 km", color: "#66FF66" }, 
        { depth: 10, label: "10-30 km", color: "#00FFFF" }, 
        { depth: 30, label: "30-50 km", color: "#00BFFF" }, 
        { depth: 50, label: "50-70 km", color: "#0000FF" }, 
        { depth: 70, label: "70-90 km", color: "#800080" }, 
        { depth: 90, label: ">90 km", color: "#660066" } 
        ];
  
      // Generate the legend HTML
      for (var i = 0; i < legendLabels.length; i++) {
        var legendLabel = legendLabels[i];
        var legendItem = document.createElement("div");
        legendItem.innerHTML =
          '<i style="background:' +
          legendLabel.color +
          '"></i> ' +
          legendLabel.label;
        div.appendChild(legendItem);
      }
  
      return div;
    };
  
    // Add the legend to the map
    legend.addTo(map);
    
    //Load earthquake data from the past month   
    d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson").then(function (data) {
        // Add GeoJSON layer to map
        var geoJSONLayer = createGeoJSONLayer(data);
        geoJSONLayer.addTo(map);
      });
    
    }
  
  createMap();