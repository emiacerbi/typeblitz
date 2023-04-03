import Image from 'next/image';
import { useState } from 'react';

type Props = {
  alt: string;
  src: string;
  width: number;
  height: number;
};

export function FallBackImage({ alt, src, ...props }: Props) {
  const [image, setImage] = useState(src);

  return (
    <Image
      {...props}
      src={image}
      alt={alt}
      onError={() => setImage('/next.svg')}
      // placeholder="blur"
      blurDataURL="/next.svg"
    />
  );
}
