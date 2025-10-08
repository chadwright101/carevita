import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

interface Props {
  cssClasses?: string;
}

const EastlandsMap = ({ cssClasses }: Props) => {
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
      zoom={13}
      center={{ lat: -26.0576208, lng: 28.3282441 }}
      mapContainerClassName={`${cssClasses}`}
    >
      <MarkerF position={{ lat: -26.0576208, lng: 28.3282441 }} />
    </GoogleMap>
  );
};

export default EastlandsMap;
