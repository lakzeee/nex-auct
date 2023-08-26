"use client";
import { useState } from "react";

type Props = {
  imageUrl: string;
};
export default function AuctionCardImage({ imageUrl }: Props) {
  return (
    <img
      className="group-hover:opacity-70 duration-700 ease-in-out z-0"
      src={imageUrl}
      alt="Shoes"
    />
  );
}
