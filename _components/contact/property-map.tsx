"use client";

import { useCallback, useRef } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

interface PropertyMapProps {
  cssClasses?: string;
  lat: number;
  lng: number;
  zoom: number;
}

const libraries: "marker"[] = ["marker"];

const PropertyMap = ({ cssClasses, lat, lng, zoom }: PropertyMapProps) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries,
    preventGoogleFontsLoading: true,
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);

  const onMapLoad = useCallback(
    (map: google.maps.Map) => {
      try {
        mapRef.current = map;
        if (
          window.google &&
          window.google.maps &&
          window.google.maps.marker &&
          window.google.maps.marker.AdvancedMarkerElement
        ) {
          markerRef.current = new google.maps.marker.AdvancedMarkerElement({
            map,
            position: { lat, lng },
          });
        }
      } catch (error) {
        console.error("Error loading map:", error);
      }
    },
    [lat, lng]
  );

  const onUnmount = useCallback(() => {
    try {
      if (markerRef.current) {
        markerRef.current.map = null;
        markerRef.current = null;
      }
      mapRef.current = null;
    } catch (error) {
      console.error("Error unmounting map:", error);
    }
  }, []);

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
      mapContainerClassName={cssClasses}
      onLoad={onMapLoad}
      onUnmount={onUnmount}
      options={{
        mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID,
      }}
    />
  );
};

export default PropertyMap;
