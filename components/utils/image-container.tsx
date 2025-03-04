import Link from "next/link";
import Image from "next/image";

import classNames from "classnames";

interface Props {
  src: string;
  alt?: string;
  width: number;
  height: number;
  phone?: number;
  tabletLarge?: number;
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
  phone,
  tabletLarge,
  desktop,
  cssClasses,
  quality,
  eager,
  url,
  onClick,
}: Props) => {
  if (url) {
    return (
      <Link prefetch={false} href={url} className="overflow-hidden">
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
          sizes={`${phone ? `(max-width: 650px) ${phone}vw,` : ""} ${
            tabletLarge ? `(max-width: 1100px) ${tabletLarge}vw,` : ""
          } ${desktop}vw `}
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
        sizes={`${phone ? `(max-width: 650px) ${phone}vw,` : ""} ${
          tabletLarge ? `(max-width: 1100px) ${tabletLarge}vw,` : ""
        } ${desktop}vw `}
      />
    );
  }
};

export default ImageContainer;
