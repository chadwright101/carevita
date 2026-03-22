interface Props {
  largeMp4: string;
  smallMp4?: string;
  largeWebm?: string;
  smallWebm?: string;
  posterImage?: string;
}

const VideoHeroComponent = ({
  largeMp4,
  smallMp4,
  largeWebm,
  smallWebm,
  posterImage,
}: Props) => {
  return (
    <video
      autoPlay
      muted
      loop
      className="w-full h-[450px] tablet:h-[600px] object-cover desktop:max-w-[1280px] mx-auto"
      poster={posterImage}
      playsInline
    >
      {largeWebm && (
        <source src={largeWebm} media="(min-width: 651px)" type="video/webm" />
      )}
      <source src={largeMp4} media="(min-width: 651px)" type="video/mp4" />
      {smallWebm && <source src={smallWebm} type="video/webm" />}
      {smallMp4 && <source src={smallMp4} type="video/mp4" />}
    </video>
  );
};

export default VideoHeroComponent;
