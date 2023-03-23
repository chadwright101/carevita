interface Props {
  cssClasses?: string;
}

const Hero = ({ cssClasses }: Props) => {
  return (
    <div className={`-mx-6 ${cssClasses}`}>
      <video
        autoPlay
        muted
        loop
        className="w-full h-screen tablet:h-[579px] object-cover"
      >
        <source src="https://the-wright-designs-website-images.s3.af-south-1.amazonaws.com/carevita/placeholders/video.mp4" />
      </video>
    </div>
  );
};

export default Hero;
