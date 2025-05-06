
import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

interface MapProps {
  userLocation: [number, number]; 
  setUserLocation: (location: [number, number]) => void;
  landmarks: Array<{id: number, name: string, location: [number, number], type: string}>;
  isTracking: boolean;
}

const ClientOnlyMap: React.FC<MapProps> = ({ userLocation, setUserLocation, landmarks, isTracking }) => {
  const [isMounted, setIsMounted] = useState(false);
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const landmarkMarkersRef = useRef<L.Marker[]>([]);
  
  useEffect(() => {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl,
      iconUrl,
      shadowUrl
    });
    
    if (!mapContainerRef.current || mapRef.current) return;
    
    const map = L.map(mapContainerRef.current).setView(userLocation, 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    const userLocationIcon = new L.Icon({
      iconUrl: '/culture-uploads/Marker.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
    
    userMarkerRef.current = L.marker(userLocation, { icon: userLocationIcon })
      .addTo(map)
      .bindPopup(`
        <div>
          <p class="font-semibold">Lokasi Anda</p>
          <p class="text-xs">Koordinat: ${userLocation[0].toFixed(4)}, ${userLocation[1].toFixed(4)}</p>
        </div>
      `);
    
    const landmarkIcon = new L.Icon({
      iconUrl: '/culture-uploads/Marker.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
    
    landmarks.forEach(landmark => {
      const marker = L.marker(landmark.location, { icon: landmarkIcon })
        .addTo(map)
        .bindPopup(`
          <div>
            <p class="font-semibold">${landmark.name}</p>
            <p class="text-sm text-gray-600">${landmark.type}</p>
          </div>
        `);
      landmarkMarkersRef.current.push(marker);
    });
    
    mapRef.current = map;
    setIsMounted(true);
    
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      setIsMounted(false);
    };
  }, []);
  
  useEffect(() => {
    if (!mapRef.current || !userMarkerRef.current) return;
    
    userMarkerRef.current.setLatLng(userLocation);
    userMarkerRef.current.setPopupContent(`
      <div>
        <p class="font-semibold">Lokasi Anda</p>
        <p class="text-xs">Koordinat: ${userLocation[0].toFixed(4)}, ${userLocation[1].toFixed(4)}</p>
      </div>
    `);
    
    if (isTracking) {
      mapRef.current.setView(userLocation);
    }
  }, [userLocation, isTracking]);
  
  useEffect(() => {
    let watchId: number | undefined;
    
    if (isTracking && typeof navigator !== 'undefined' && navigator.geolocation) {
      const updateLocation = (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      };
      
      const handleError = (error: GeolocationPositionError) => {
        console.error('Error getting location:', error);
        let errorMessage = 'Tidak dapat melacak lokasi Anda';
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Akses lokasi ditolak. Silakan izinkan akses lokasi di pengaturan peramban Anda.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Informasi lokasi tidak tersedia.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Waktu permintaan lokasi habis.';
            break;
        }
        
        if (window.toast) {
          window.toast.error(errorMessage);
        }
      };
      
      navigator.geolocation.getCurrentPosition(updateLocation, handleError);
      watchId = navigator.geolocation.watchPosition(updateLocation, handleError, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    }
    
    return () => {
      if (watchId !== undefined && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [isTracking, setUserLocation]);
  
  return (
    <div
      ref={mapContainerRef}
      className="h-full w-full rounded-lg"
      style={{ height: '100%', width: '100%' }}
    />
  );
};

export default ClientOnlyMap;
