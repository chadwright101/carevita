import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

interface Props {
  cssClasses?: string;
}

const CrescentMap = ({ cssClasses }: Props) => {
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
      zoom={13.75}
      center={{ lat: -34.062417, lng: 23.3702613 }}
      mapContainerClassName={`${cssClasses}`}
    >
      <MarkerF position={{ lat: -34.0628026, lng: 23.3723729 }} />
    </GoogleMap>
  );
};

export default CrescentMap;
