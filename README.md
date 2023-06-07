# Mapping Earthquake Data with Leaflet

# Overview

For this project, I was asked to map data from the United States Geological Survey in an interactive visualization, using Leaflet. In many ways, this required many of the same tools used to make interactive plots in a web application, including an HTML file to track how the website will parse and display information and d3 to import data. In essence, the methods used to develop this visualization and necessary to use it will be familiar to anyone with experience creating visualizations in JavaScript.

# Data Used

I selected the JSON object that contained earthquake data over the course of a month, as I decided it would provide my map with the greatest variety of earthquake data and perhaps be more reliable by illustrating longer-term trends.

The dataset can be found at the following link: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson.

# Features

The features of this map are quite simple, including the use of a tile layer from www.openstreetmap.com (https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png) and the use of earthquake data to adjust the appearance of markers on the map.
For example, when determining the size of each marker, I was asked to use magnitude as the determining factor, so I created a function that made the size of each marker conditional upon each earthquake's magnitude, then told the code where to look for magnitude in the following function.

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

As for the popups that appear when markers are selected by a user's mouse, I used DOM manipulation to set an HTML layout for each popup, then bound each popup to the markers in the GeoJSON layer.

When creating the legend, I simply set the color code to match the markers on the map, with colors becoming darker to signify where Earth is deeper. However, I also had to adjust the CSS code to place the legend, as is shown below:

      /* Update to include formatting for legend */
      .legend {
        position: absolute;
        bottom: 30px;
        right: 30px;
        background-color: rgb(255, 255, 255);
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
      }

      .legend i {
        width: 18px;
        height: 18px;
        float: left;
        margin-right: 8px;
        opacity: 0.8;
      }

      .legend label {
        line-height: 18px;
        color: #555;
      }

Without these adjustments, the webpage would have no source on which to base the style of the legend. As a result, prior to these adjustments, the legend failed to appear when the webpage loaded.

# Instructions
Simply clone this Git repository to your local machine, then open the HTML file in Google Chrome. Click on map markers to view the popups.

# Sources
Assignment created by edX Data Visualization and Analytics Bootcamp at The Ohio State University.

Dataset (https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson) created by US Geological Survey.

# Author
Daniel Adamson
