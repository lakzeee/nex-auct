import CountdownTimer from "@/app/Components/auctions/CountdownTimer";
import AuctionCardImage from "@/app/Components/auctions/AuctionCardImage";
import { Auction } from "@/types";
import Link from "next/link";

type Props = {
  auction: Auction;
};

export default function AuctionCard({ auction }: Props) {
  return (
    <Link href={`/auctions/details/${auction.id}`} className="group">
      <div className="card card-compact md:card-normal h-full bg-base-100 hover:bg-neutral-focus shadow-xl duration-700 ease-in-out">
        <figure>
          <div className="relative w-full">
            <AuctionCardImage imageUrl={auction.imageUrl} />
            <div className="absolute bottom-2 left-2 object-cover">
              <CountdownTimer auctionEnd={auction.auctionEnd}></CountdownTimer>
            </div>
          </div>
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {auction.make} {auction.model}
            {/*<div className="badge badge-secondary">NEW</div>*/}
          </h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          {/*<div className="card-actions justify-end">*/}
          {/*  <div className="badge badge-outline">Fashion</div>*/}
          {/*  <div className="badge badge-outline">Products</div>*/}
          {/*</div>*/}
        </div>
      </div>
    </Link>
  );
}
