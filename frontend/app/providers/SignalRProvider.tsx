"use client";
import { ReactNode, useEffect, useState } from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useAuctionStore } from "@/app/Components/hooks/useAuctionStore";
import { useBidStore } from "@/app/Components/hooks/useBidStore";
import { Auction, AuctionFinished, Bid } from "@/types";
import toast from "react-hot-toast";
import AuctionCreatedToast from "@/app/Components/auctions/AuctionCreatedToast";
import { getDetailViewData } from "@/app/Actions/auctionActions";
import AuctionFinishedToast from "@/app/Components/auctions/AuctionFinishedToast";

type Props = {
  children: ReactNode;
  user: any;
};

export default function SignalRProvider({ children, user }: Props) {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const setCurrentPrice = useAuctionStore((state) => state.setCurrentPrice);
  const addBid = useBidStore((state) => state.addBid);

  const apiUrl =
    process.env.NODE_ENV === "production"
      ? "https://api.zehu.tech/"
      : process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(apiUrl + "notifications")
      .withAutomaticReconnect()
      .build();
    setConnection(newConnection);
  }, [apiUrl]);

  useEffect(() => {
    if (connection) {
      connection.start().then(() => {
        console.log("Connected to notification hub");
        connection.on("BidPlaced", (bid: Bid) => {
          if (bid.bidStatus.includes("Accepted"))
            setCurrentPrice(bid.auctionId, bid.amount);
          addBid(bid);
        });
        connection.on("AuctionCreated", (auction: Auction) => {
          if (user?.username !== auction.seller)
            return toast(<AuctionCreatedToast auction={auction} />, {
              duration: 10000,
              style: {
                border: "1px solid #28333C",
                background: "#28333C",
              },
              position: "bottom-right",
            });
        });
        connection.on("AuctionFinished", (auctionFinished: AuctionFinished) => {
          const auction = getDetailViewData(auctionFinished.auctionId);
          return toast.promise(
            auction,
            {
              loading: "Loading",
              success: (auction) => (
                <AuctionFinishedToast
                  auctionFinished={auctionFinished}
                  auction={auction}
                />
              ),
              error: (err) => "auction finished",
            },
            {
              success: { duration: 5000, icon: null, position: "bottom-right" },
            },
          );
        });
      });
    }

    return () => {
      connection?.stop();
    };
  }, [connection, setCurrentPrice, addBid, user?.username]);

  return children;
}
