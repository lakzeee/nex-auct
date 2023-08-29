import { Auction, AuctionFinished } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  auctionFinished: AuctionFinished;
  auction: Auction;
};

export default function AuctionFinishedToast({
  auction,
  auctionFinished,
}: Props) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/auctions/details/${auction.id}`)}
      className="flex flex-row items-center bg-neutral gap-4 hover:cursor-pointer shadow-lg"
    >
      <Image
        src={auction.imageUrl}
        alt="img"
        height={60}
        width={60}
        className="mask mask-circle w-auto h-auto"
      />
      <div className="flex flex-col">
        <span className="text-accent-content">
          Auction for {auction.make} {auction.model} has finished
        </span>
        {auctionFinished.itemSold && auctionFinished.amount ? (
          <p>
            {auctionFinished.winner} won this auction for $$
            {auctionFinished.amount}
          </p>
        ) : (
          <p>This Item did not sell</p>
        )}
      </div>
    </div>
  );
}
