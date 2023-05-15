import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

interface Props {
  cssClasses?: string;
}

const SereneParkMap = ({ cssClasses }: Props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });
  if (!isLoaded)
    return (
      <div className="bg-lightGreen/20 grid place-items-center py-16 max-w-[1400px]">
        <p className="text-heading font-thin">Map loading...</p>
      </div>
    );
  return (
    <GoogleMap
      zoom={14.25}
      center={{ lat: -25.7882638, lng: 28.2861379 }}
      mapContainerClassName={`${cssClasses}`}
    >
      <Marker position={{ lat: -25.7882638, lng: 28.2861379 }} />
    </GoogleMap>
  );
};

export default SereneParkMap;
