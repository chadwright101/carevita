import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

interface Props {
  cssClasses?: string;
}

const EastlandsMap = ({ cssClasses }: Props) => {
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
      zoom={13}
      center={{ lat: -26.0576208, lng: 28.3282441 }}
      mapContainerClassName={`${cssClasses}`}
    >
      <Marker position={{ lat: -26.0576208, lng: 28.3282441 }} />
    </GoogleMap>
  );
};

export default EastlandsMap;
