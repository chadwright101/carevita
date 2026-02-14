interface Props {
  desktopMp4: string;
  mobileMp4: string;
  desktopWebm: string;
  mobileWebm: string;
  poster: string;
}

const VideoHeroComponent = ({
  desktopMp4,
  mobileMp4,
  desktopWebm,
  mobileWebm,
  poster,
}: Props) => {
  return (
    <video
      autoPlay
      muted
      loop
      className="w-full h-[450px] tablet:h-[600px] object-cover desktop:max-w-[1280px] mx-auto"
      poster={poster}
      playsInline
    >
      <source src={desktopWebm} media="(min-width: 651px)" type="video/webm" />
      <source src={desktopMp4} media="(min-width: 651px)" type="video/mp4" />
      <source src={mobileWebm} type="video/webm" />
      <source src={mobileMp4} type="video/mp4" />
    </video>
  );
};

export default VideoHeroComponent;
