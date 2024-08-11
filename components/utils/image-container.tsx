import Link from "next/link";
import Image from "next/image";

import classNames from "classnames";

interface Props {
  src: string;
  alt?: string;
  width: number;
  height: number;
  smallest?: number;
  phone?: number;
  tablet?: number;
  tabletLarge?: number;
  desktopSmall?: number;
  desktop?: number;
  cssClasses?: string;
  quality?: number;
  eager?: boolean;
  url?: string;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
}

const ImageContainer = ({
  src,
  alt,
  width,
  height,
  smallest,
  phone,
  tablet,
  tabletLarge,
  desktop,
  desktopSmall,
  cssClasses,
  quality,
  eager,
  url,
  onClick,
}: Props) => {
  if (url) {
    return (
      <Link href={url} className="overflow-hidden">
        <Image
          alt={alt || "Carevita"}
          src={src}
          width={width}
          height={height}
          quality={quality || 50}
          loading={eager ? "eager" : "lazy"}
          className={classNames(`ease-in-out duration-500 ${cssClasses}`, {
            "desktopSmall:hover:scale-105": url,
          })}
          onClick={onClick}
          sizes={`(max-width: 425px) ${smallest}vw,(max-width: 650px) ${phone}vw, (max-width: 900px) ${tablet}vw, (max-width: 1100px) ${tabletLarge}vw, (max-width: 1400px) ${desktopSmall}vw, ${desktop}vw `}
        />
      </Link>
    );
  } else {
    return (
      <Image
        alt={alt || "Carevita"}
        src={src}
        width={width}
        height={height}
        quality={50}
        loading={eager ? "eager" : "lazy"}
        className={`ease-in-out duration-500 ${cssClasses}`}
        onClick={onClick}
        sizes={`(max-width: 425px) ${smallest}vw,(max-width: 650px) ${phone}vw, (max-width: 900px) ${tablet}vw, (max-width: 1100px) ${tabletLarge}vw, (max-width: 1400px) ${desktopSmall}vw, ${desktop}vw `}
      />
    );
  }
};

export default ImageContainer;
