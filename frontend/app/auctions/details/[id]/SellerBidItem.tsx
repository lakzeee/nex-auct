import { DateTimeHelper } from "@/lib/DateTimeHelper";
import { Auction } from "@/types";
import { CurrencyFormatHelper } from "@/lib/CurrencyFormatHelper";

type Props = {
  user: any;
  auction: Auction;
};
export default function SellerBidItem({ user, auction }: Props) {
  let sellerIsCurrentUser = user?.username === auction.seller;
  let chatPosition = sellerIsCurrentUser ? "chat-end" : "chat-start";

  return (
    <div className={`chat ${chatPosition}`}>
      <div className="chat-image avatar placeholder">
        <div
          className={`w-10 rounded-full ${
            sellerIsCurrentUser ? "bg-accent" : "bg-primary"
          }`}
        >
          <span className="text-accent-content">
            {auction.seller.slice(0, 2).toUpperCase()}
          </span>
        </div>
      </div>
      <div className="chat-header flex flex-row gap-2">
        <div>{auction.seller.toUpperCase()}</div>
        <time className="text-xs opacity-50">
          {DateTimeHelper(auction.createdAt)}
        </time>
      </div>
      <div className={`chat-bubble`}>
        I started an auction for {auction.year} {auction.make} {auction.model},
        reserved price is ${CurrencyFormatHelper(auction.reservePrice)}
      </div>
      <div className="chat-footer opacity-50">Auction Started</div>
    </div>
  );
}
