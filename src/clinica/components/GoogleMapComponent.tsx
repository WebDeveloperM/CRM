import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

interface Coordinates {
  lat: number;
  lng: number;
}

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center: Coordinates = {
  lat: 41.311081, // Toshkent koordinatalari
  lng: 69.240562,
};

const GoogleMapComponent: React.FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC6gUQW2FvN4YYGd7LxJhLQPFKTxdlZVps', // API kalitni bu yerga qo'shing
  });

  const [marker, setMarker] = useState<Coordinates | null>(null);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setMarker({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        onClick={handleMapClick}
      >
        {marker && <Marker position={{ lat: marker.lat, lng: marker.lng }} />}
      </GoogleMap>
      {marker && (
        <div style={{ marginTop: '20px' }}>
          <p>Latitude: {marker.lat}</p>
          <p>Longitude: {marker.lng}</p>
        </div>
      )}
    </div>
  );
};

export default GoogleMapComponent;
