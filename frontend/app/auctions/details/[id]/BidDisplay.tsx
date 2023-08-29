"use client";
import Heading from "@/app/Components/layout/Heading";
import BidsList from "@/app/auctions/details/[id]/BidsList";
import SellerBidItem from "@/app/auctions/details/[id]/SellerBidItem";
import BidForm from "@/app/auctions/details/[id]/BidForm";
import { Auction } from "@/types";
import { useBidStore } from "@/app/Components/hooks/useBidStore";

type Props = {
  user: any;
  data: Auction;
};
export default function BidDisplay({ user, data }: Props) {
  const bids = useBidStore((state) => state.bids);

  const highBid = bids.reduce(
    (prev, current) =>
      prev > current.amount
        ? prev
        : current.bidStatus.includes("Accepted")
        ? current.amount
        : prev,
    0,
  );
  return (
    <>
      <div className="rounded-lg p-4 bg-neutral-focus mb-4">
        <Heading title={`Current high bid is $${highBid}`} />
        <div className="max-h-[400px] overflow-auto ">
          <BidsList user={user} auction={data} bids={bids} />
          <SellerBidItem user={user} auction={data} />
        </div>
        <BidForm auction={data} highBid={highBid} user={user} />
      </div>
    </>
  );
}
