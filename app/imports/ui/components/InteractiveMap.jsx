import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const InteractiveMap = () => {
  useEffect(() => {

    // Initialize the map
    const map = L.map('map').setView([21.299, -157.816], 16.5);

    // Add a Mapbox tile layer with your custom style
    L.tileLayer('https://api.mapbox.com/styles/v1/narowetz/clp20vbuu00e101rbgtgg2bsp/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibmFyb3dldHoiLCJhIjoiY2xwMjByMTN2MG05bjJtcXZrZnN6c3huNyJ9.Nx_FRbDji3ptjsCFz7YOPA', {
      attribution: '© OpenStreetMap contributors',
      tileSize: 512,
      zoomOffset: -1,
    }).addTo(map);

    // Add a marker
    L.marker([21.299, -157.816]).addTo(map).bindPopup('A simple popup');
  }, []); // Empty dependency array ensures useEffect runs once

  return (
    <div id="map" style={{ height: '1000px', width: '800px' }} />
  );
};

export default InteractiveMap;
