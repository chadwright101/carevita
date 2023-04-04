import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

interface Props {
  cssClasses?: string;
}

const CrescentMap = ({ cssClasses }: Props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
  });
  if (!isLoaded) return <div>Loading...</div>;
  return <Map cssClasses={cssClasses} />;
};

export default CrescentMap;

const Map = ({ cssClasses }: Props) => {
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
