"use client";
import Image from "next/image";
import { useState } from "react";

type Props = {
  imageUrl: string;
};
export default function AuctionCardImage({ imageUrl }: Props) {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      priority
      height={500}
      width={500}
      className={`
                object-cover
                group-hover:opacity-75
                duration-700
                ease-in-out
                ${isLoading ? "blur-2xl scale-110" : "blur-0 scale-100"}
            `}
      src={imageUrl}
      alt="image"
      onLoadingComplete={() => setLoading(false)}
    />
  );
}
