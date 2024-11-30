import { useClinica } from '@clinica/context/ClinicaContext';
import React, { useEffect, useRef, useState } from 'react';

interface Coordinates {
  lat: number;
  lng: number;
}

interface YandexMapProps {
  onSelectPoint: (coords: Coordinates) => void; // Nuqta tanlanganda ishlaydigan callback
}

const YandexMap: React.FC<YandexMapProps> = ({ onSelectPoint }) => {
  const mapRef = useRef<HTMLDivElement>(null); // Xarita uchun container
  const [map, setMap] = useState<any>(null); // Karta obyekti
  const [marker, setMarker] = useState<any>(null); // Markerni saqlash

  const { data } = useClinica()
  // Yandex xaritasini initializatsiya qilish
  useEffect(() => {
    const initializeMap = async () => {
      const ymaps = (window as any).ymaps;

      await ymaps.ready(); // Yandex xaritasi tayyor bo'lsa

      const mapInstance = new ymaps.Map(
        mapRef.current,
        {
          // center: [41.311081, 69.24056], // Toshkent koordinatalari (Markaz)
          center: [
            data.geolocationLatitude ? data.geolocationLatitude : 41.311081,
            data.geolocationLongitude ? data.geolocationLongitude : 69.24056
          ], // Toshkent koordinatalari (Markaz)
          zoom: 10, // Zoom darajasi
        }
      );

      setMap(mapInstance); // Kartani saqlash
    };

    initializeMap();
  }, []);

  // Karta bosilganda nuqtani qo'yish
  const handleMapClick = (event: any) => {
    const coords = event.get('coords'); // [latitude, longitude]

    // Agar marker mavjud bo'lsa, uni o'chirish
    if (marker) {
      map.geoObjects.remove(marker);
    }
    console.log(coords, "44444444");


    // Yangi marker yaratish
    const newMarker = new (window as any).ymaps.GeoObject(
      {
        geometry: {
          type: 'Point',
          coordinates: coords,
        },
      },
      {
        preset: 'islands#greenDotIcon', // Marker ko'rinishi
      }
    );

    // Kartaga yangi marker qo'yish
    map.geoObjects.add(newMarker);
    setMarker(newMarker); // Yangi markerni saqlash

    // Koordinatalarni asosiy komponentga uzatish
    onSelectPoint({
      lat: coords[0], // Latitude
      lng: coords[1], // Longitude
    });
  };

  // Karta yaratildimi va markerni qo'shish uchun eventni qo'shish
  useEffect(() => {
    if (map) {
      map.events.add('click', handleMapClick); // Xarita bosilganda
    }

    return () => {
      if (map) {
        map.events.remove('click', handleMapClick); // Karta bosilishi tugatilganda
      }
    };
  }, [map, marker]);

  return (
    <div
      ref={mapRef}
      className='absolute top-[-470px]'
      style={{ width: '100%', height: '400px' }} // Kartani ko'rsatish
    />
  );
};

export default YandexMap;
