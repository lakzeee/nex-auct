"use client";
import { BsSend } from "react-icons/bs";
import { FieldValues, useForm } from "react-hook-form";
import { useBidStore } from "@/app/Components/hooks/useBidStore";
import { placeBidForAuctionByAuctionId } from "@/app/Actions/auctionActions";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { CurrencyFormatHelper } from "@/lib/CurrencyFormatHelper";
import { Auction } from "@/types";

type Props = {
  auction: Auction;
  highBid: number;
  user: any;
};
export default function BidForm({ auction, highBid, user }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const addBid = useBidStore((state) => state.addBid);
  const isBidOpen = useBidStore((state) => state.open);
  const setIsBidOpen = useBidStore((state) => state.setOpen);
  const openForBids = new Date(auction.auctionEnd) > new Date();
  let sellerIsCurrentUser = user?.username === auction.seller;

  useEffect(() => {
    setIsBidOpen(openForBids);
  }, [openForBids, setIsBidOpen]);

  function onSubmit(data: FieldValues) {
    setLoading(true);
    if (data.amount <= highBid) {
      setLoading(false);
      reset();
      return toast.error(
        "Bid must be at least $" + CurrencyFormatHelper(highBid + 1),
      );
    }
    placeBidForAuctionByAuctionId(auction.id, +data.amount)
      .then((bid) => {
        if (bid.error) throw bid.error;
        addBid(bid);
        toast.success("Successfully Placed Bid!");
        reset();
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  }

  if (isBidOpen && user && !sellerIsCurrentUser) {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-control relative flex flex-row py-2 items-center"
      >
        <input
          {...register("amount")}
          type="number"
          placeholder={`Placed Your Bid Price Here ( Minimun bid is $${CurrencyFormatHelper(
            highBid + 1,
          )} )`}
          className="input input-bordered focus:outline-none focus:border-primary rounded-full w-full transition-all duration-300"
        />
        <div className="absolute right-2">
          <button className="btn btn-circle btn-primary btn-sm">
            {loading ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <BsSend className="text-accent-content" size={16} />
            )}
          </button>
        </div>
      </form>
    );
  } else if (isBidOpen && !user) {
    return (
      <div className="rounded-full w-full mt-2 p-4 border-accent-content bg-base-100 text-center">
        Please Log In to Make a Bid
      </div>
    );
  } else if (!isBidOpen) {
    return (
      <div className="rounded-full w-full mt-2 p-4 border-accent-content bg-base-100 text-center">
        Auction Has Ended
      </div>
    );
  }
}
