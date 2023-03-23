interface Props {
  cssClasses?: string;
}

const Hero = ({ cssClasses }: Props) => {
  return (
    <section className={`${cssClasses}`}>
      <video
        autoPlay
        muted
        loop
        className="w-full h-screen tabletLarge:h-[600px] object-cover"
      >
        <source src="https://the-wright-designs-website-images.s3.af-south-1.amazonaws.com/carevita/placeholders/video.mp4" />
      </video>
    </section>
  );
};

export default Hero;
