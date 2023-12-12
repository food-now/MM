import React, { useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import FoodTruckRowPopup from './map-components/FoodTruckRowPopup';
import ParadisePopup from './map-components/ParadisePopup';
import BeanCounterPopup from './map-components/BeanCounterPopup';

const InteractiveMap = () => {
  useEffect(() => {

    // Initialize the map
    const map = L.map('map').setView([21.300, -157.818], 16.40);

    // Add a Mapbox tile layer with your custom style
    L.tileLayer('https://api.mapbox.com/styles/v1/narowetz/clpsx6mis00ev01q11wim1lp0/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibmFyb3dldHoiLCJhIjoiY2xwMjByMTN2MG05bjJtcXZrZnN6c3huNyJ9.Nx_FRbDji3ptjsCFz7YOPA', {
      attribution: '© OpenStreetMap contributors',
      tileSize: 512,
      zoomOffset: -1,
    }).addTo(map);

    // Icon
    const defaultIcon = L.icon({
      iconUrl: 'https://i.postimg.cc/sg194X3r/burger.png',
      iconSize: [35, 35],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowSize: [68, 95],
      shadowAnchor: [22, 94],
    });

    // Add a marker
    L.marker([21.297, -157.818], { icon: defaultIcon }).addTo(map).bindPopup(ReactDOMServer.renderToString(<FoodTruckRowPopup />));
    L.marker([21.300670, -157.815596], { icon: defaultIcon }).addTo(map).bindPopup(ReactDOMServer.renderToString(<ParadisePopup />));
    L.marker([21.300480, -157.820094], { icon: defaultIcon }).addTo(map).bindPopup(ReactDOMServer.renderToString(<BeanCounterPopup />));
  }, []); // Empty dependency array ensures useEffect runs once

  return (
    <div id="map" style={{ height: '700px', width: '550px' }} />
  );
};

export default InteractiveMap;
