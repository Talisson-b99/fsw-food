/* eslint-disable jsx-a11y/alt-text */
import Image, { ImageProps } from "next/image";

const PromoBanner = (props: ImageProps) => {
  return (
    <Image
      width={600}
      height={600}
      quality={100}
      className="h-auto max-h-full w-full max-w-full"
      {...props}
    />
  );
};

export default PromoBanner;
