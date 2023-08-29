import CountdownTimerBadge from "@/app/Components/auctions/CountdownTimerBadge";
import AuctionCardImage from "@/app/Components/auctions/AuctionCardImage";
import { Auction } from "@/types";
import Link from "next/link";
import CurrentBidBadge from "@/app/Components/auctions/CurrentBidBadge";
import { isLessThanOneDayOld } from "@/lib/DateTimeHelper";

type Props = {
  auction: Auction;
};

export default function AuctionCard({ auction }: Props) {
  return (
    <Link href={`/auctions/details/${auction.id}`} className="group">
      <div className="card card-compact md:card-normal h-full bg-base-100 hover:bg-neutral-focus shadow-xl duration-700 ease-in-out">
        <figure>
          <div className="relative w-full">
            <div className="absolute top-2 right-2 z-40">
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
          <h3 className="card-title">
            {auction.make} {auction.model}
          </h3>
          <p>
            Year: <div className="badge">{auction.year}</div>
          </p>
          <p>
            Color: <div className="badge">{auction.color}</div>
          </p>
          <p>
            Mileage: <div className="badge">{auction.mileage}</div>
          </p>
          {isLessThanOneDayOld(auction.createdAt) && (
            <div className="badge badge-secondary">NEW</div>
          )}
        </div>
      </div>
    </Link>
  );
}
