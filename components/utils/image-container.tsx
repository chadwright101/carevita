import Image from "next/image";
import { useState } from "react";

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
  onClick,
}: Props) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      alt={alt || "Carevita"}
      src={src}
      width={width}
      height={height}
      quality={isLoading ? 5 : quality || 50}
      loading={eager ? "eager" : "lazy"}
      className={classNames(`${cssClasses}`, {
        "blur-xl": isLoading,
        "blur-none": !isLoading,
      })}
      onClick={onClick}
      onLoadStart={() => setLoading(true)}
      onLoadingComplete={() => setLoading(false)}
      sizes={`(max-width: 425px) ${
        isLoading ? smallest! / 10 : smallest
      }vw,(max-width: 650px) ${
        isLoading ? phone! / 10 : phone
      }vw, (max-width: 900px) ${
        isLoading ? tablet! / 10 : tablet
      }vw, (max-width: 1100px) ${
        isLoading ? tabletLarge! / 10 : tabletLarge
      }vw, (max-width: 1400px) ${
        isLoading ? desktopSmall! / 10 : desktopSmall
      }vw, ${isLoading ? desktop! / 10 : desktop}vw `}
    />
  );
};

export default ImageContainer;
