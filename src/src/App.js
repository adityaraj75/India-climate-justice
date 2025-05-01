import React, { useEffect, useRef } from 'react';
import './App.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import indiaStates from './assets/india_states.json';

function App() {
  const mapRef = useRef(null); // useRef to store the map instance

  useEffect(() => {
    if (mapRef.current) return; // Prevent re-initialization of the map

    // Initialize the map
    const map = L.map('map').setView([20.5937, 78.9629], 5);
    mapRef.current = map; // Store the map instance in the ref

    // Add a tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Add GeoJSON data
    L.geoJSON(indiaStates, {
      style: {
        color: 'orange',
        weight: 2,
        fillOpacity: 0.2,
      },
    }).addTo(map);

    return () => {
      map.remove(); // Clean up the map instance on unmount
      mapRef.current = null;
    };
  }, []);

  return <div id="map" style={{ height: '100vh', width: '100%' }}></div>;
}

export default App;