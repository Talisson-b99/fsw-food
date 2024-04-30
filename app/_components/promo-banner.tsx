/* eslint-disable jsx-a11y/alt-text */
import Image, { ImageProps } from "next/image";

const PromoBanner = (props: ImageProps) => {
  return (
    <Image
      width={0}
      height={0}
      sizes="100vw"
      quality={100}
      className="h-auto w-full"
      {...props}
    />
  );
};

export default PromoBanner;
