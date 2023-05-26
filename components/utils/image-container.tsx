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
  loading?: "eager" | "lazy";
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
  loading,
  onClick,
}: Props) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      alt={alt || "Carevita"}
      src={src}
      width={isLoading ? width / 5 : width}
      height={isLoading ? height / 5 : height}
      quality={isLoading ? 1 : quality || 50}
      loading={loading || "lazy"}
      className={classNames(`${cssClasses}`, {
        "blur-md": isLoading,
        "blur-none": !isLoading,
      })}
      onClick={onClick}
      onLoadStart={() => setLoading(true)}
      onLoadingComplete={() => setLoading(false)}
      sizes={`(max-width: 425px) ${
        isLoading ? smallest! / 5 : smallest
      }px,(max-width: 650px) ${
        isLoading ? phone! / 5 : phone
      }px, (max-width: 900px) ${
        isLoading ? tablet! / 5 : tablet
      }px, (max-width: 1100px) ${
        isLoading ? tabletLarge! / 5 : tabletLarge
      }px, (max-width: 1400px) ${
        isLoading ? desktopSmall! / 5 : desktopSmall
      }px, ${isLoading ? desktop! / 5 : desktop}px `}
    />
  );
};

export default ImageContainer;
