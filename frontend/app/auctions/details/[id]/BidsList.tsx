"use client";
import { getBidsForAuctionByAuctionId } from "@/app/Actions/auctionActions";
import { User } from "next-auth";
import { Auction, Bid } from "@/types";
import { useEffect, useState } from "react";
import { useBidStore } from "@/app/Components/hooks/useBidStore";
import toast from "react-hot-toast";
import BidItem from "@/app/auctions/details/[id]/BidItem";

type Props = {
  user: any;
  auction: Auction;
};
export default function BidsList({ user, auction }: Props) {
  const [loading, setLoading] = useState(true);
  const bids = useBidStore((state) => state.bids);
  const setBids = useBidStore((state) => state.setBids);

  useEffect(() => {
    getBidsForAuctionByAuctionId(auction.id)
      .then((res: any) => {
        if (res.error) throw res.error;
        setBids(res as Bid[]);
      })
      .catch((err) => {
        toast.error("Something went wrong" + err.message);
      })
      .finally(() => setLoading(false));
  }, [auction.id, setLoading, setBids]);

  if (loading)
    return (
      <div className="flex h-full justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <>
      {bids.map((bid) => (
        <BidItem user={user} key={bid.id} bid={bid} />
      ))}
    </>
  );
}
