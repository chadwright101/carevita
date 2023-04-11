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
      <div className="mt-10 bg-lightGreen/20 text-heading font-thin text-center py-16 max-w-[1400px]">
        Map loading...
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
