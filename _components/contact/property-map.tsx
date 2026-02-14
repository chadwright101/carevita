"use client";

import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

interface PropertyMapProps {
  cssClasses?: string;
  lat: number;
  lng: number;
  zoom: number;
}

const PropertyMap = ({ cssClasses, lat, lng, zoom }: PropertyMapProps) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

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
    >
      <MarkerF position={{ lat, lng }} />
    </GoogleMap>
  );
};

export default PropertyMap;
