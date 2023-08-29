import {
  getBidsForAuctionByAuctionId,
  getDetailViewData,
} from "@/app/Actions/auctionActions";
import Heading from "@/app/Components/layout/Heading";
import CountdownTimerBadge from "@/app/Components/auctions/CountdownTimerBadge";
import AuctionCardImage from "@/app/Components/auctions/AuctionCardImage";
import DetailedSpecs from "@/app/auctions/details/[id]/DetailedSpecs";
import { getCurrentUser } from "@/app/Actions/authActions";
import EditButton from "@/app/auctions/details/[id]/EditButton";
import SellerBidItem from "@/app/auctions/details/[id]/SellerBidItem";
import BidsList from "@/app/auctions/details/[id]/BidsList";
import BidForm from "@/app/auctions/details/[id]/BidForm";
import BidDisplay from "@/app/auctions/details/[id]/BidDisplay";

export default async function Details({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const user = await getCurrentUser();
  const data = await getDetailViewData(params.id);
  const bids = await getBidsForAuctionByAuctionId(params.id);
  const sellerIsCurrentUser = user?.username === data.seller;

  return (
    <div>
      <div className="flex justify-between">
        <Heading title={`${data.make} ${data.model}`} />
        <div className="flex gap-3">
          <h2>Time Remaining:</h2>
          <CountdownTimerBadge auctionEnd={data.auctionEnd} />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6 mt-3">
        <div className="w-full aspect-h-10 aspect-w-16 rounded-lg overflow-hidden">
          <AuctionCardImage imageUrl={data.imageUrl} />
        </div>
        <div>
          <DetailedSpecs auction={data} />
        </div>
      </div>
      {sellerIsCurrentUser ? (
        <EditButton id={data.id} />
      ) : (
        <div className="my-4"></div>
      )}
      <BidDisplay user={user} data={data} />
    </div>
  );
}
