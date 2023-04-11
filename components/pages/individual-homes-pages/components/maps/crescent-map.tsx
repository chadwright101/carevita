import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

interface Props {
  cssClasses?: string;
}

const CrescentMap = ({ cssClasses }: Props) => {
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
      zoom={13.75}
      center={{ lat: -34.062417, lng: 23.3702613 }}
      mapContainerClassName={`${cssClasses}`}
    >
      <Marker position={{ lat: -34.0628026, lng: 23.3723729 }} />
    </GoogleMap>
  );
};

export default CrescentMap;
