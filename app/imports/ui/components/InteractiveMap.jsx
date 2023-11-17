import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

const InteractiveMap = () => {
  useEffect(() => {
    // Initialize the map
    const map = L.map('map').setView([51.505, -0.09], 13);

    // Add a tile layer (you can choose a different tile layer)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Add a marker
    L.marker([51.505, -0.09]).addTo(map)
      .bindPopup('A simple popup');

  }, []); // Empty dependency array ensures useEffect runs once

  return (
    <div id="map" style={{ height: '400px' }}></div>
  );
};

export default InteractiveMap;
