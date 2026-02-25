"use client";

import { useEffect, useRef } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

interface PropertyMapProps {
  cssClasses?: string;
  lat: number;
  lng: number;
  zoom: number;
}

const libraries: ("marker")[] = ["marker"];

const PropertyMap = ({ cssClasses, lat, lng, zoom }: PropertyMapProps) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries,
    preventGoogleFontsLoading: true,
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || !isLoaded) return;

    const marker = new google.maps.marker.AdvancedMarkerElement({
      map: mapRef.current,
      position: { lat, lng },
    });

    return () => {
      marker.map = null;
    };
  }, [isLoaded, lat, lng]);

  if (!isLoaded)
    return (
      <div className="bg-lightGreen/20 grid place-items-center py-16 max-w-[1280px]">
        <p className="text-heading font-extralight">Map loading...</p>
      </div>
    );

  return (
    <GoogleMap
      zoom={zoom}
      center={{ lat, lng }}
      mapContainerClassName={`${cssClasses}`}
      onLoad={(map) => {
        mapRef.current = map;
        (map as any).setMapId(process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID);
      }}
    />
  );
};

export default PropertyMap;
