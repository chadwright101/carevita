import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

interface Props {
  cssClasses?: string;
}

const HartlandMap = ({ cssClasses }: Props) => {
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
      center={{ lat: -34.10100507599022, lng: 22.12163566099227 }}
      mapContainerClassName={`${cssClasses}`}
    >
      <MarkerF position={{ lat: -34.10100507599022, lng: 22.12163566099227 }} />
    </GoogleMap>
  );
};
export default HartlandMap;
