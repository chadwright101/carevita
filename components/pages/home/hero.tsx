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
        className="w-full h-[450px] tabletLarge:h-[600px] object-cover desktop:max-w-[1400px] mx-auto"
        poster="https://the-wright-designs-website-images.s3.af-south-1.amazonaws.com/carevita/the-crescent/sliders/hero/DJI_0961.jpg"
        playsInline
      >
        <source src="https://the-wright-designs-website-images.s3.af-south-1.amazonaws.com/carevita/home-page/the-crescent-test.mp4" />
      </video>
    </section>
  );
};

export default Hero;
