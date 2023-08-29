import CountdownTimerBadge from "@/app/Components/auctions/CountdownTimerBadge";
import AuctionCardImage from "@/app/Components/auctions/AuctionCardImage";
import { Auction } from "@/types";
import Link from "next/link";
import CurrentBidBadge from "@/app/Components/auctions/CurrentBidBadge";

type Props = {
  auction: Auction;
};

export default function AuctionCard({ auction }: Props) {
  return (
    <Link href={`/auctions/details/${auction.id}`} className="group">
      <div className="card card-compact md:card-normal h-full bg-base-100 hover:bg-neutral-focus shadow-xl duration-700 ease-in-out">
        <figure>
          <div className="relative w-full">
            <div className="absolute top-2 right-2 z-50">
              <CurrentBidBadge
                amount={auction.currentHighBid}
                reservePrice={auction.reservePrice}
              />
            </div>
            <AuctionCardImage imageUrl={auction.imageUrl} />
            <div className="absolute bottom-2 left-2 object-cover">
              <CountdownTimerBadge
                auctionEnd={auction.auctionEnd}
              ></CountdownTimerBadge>
            </div>
          </div>
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {auction.make} {auction.model}
          </h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
        </div>
      </div>
    </Link>
  );
}
