import { Bid } from "@/types";
import { DateTimeHelper } from "@/lib/DateTimeHelper";
import { CurrencyFormatHelper } from "@/lib/CurrencyFormatHelper";

type Props = {
  user: any;
  bid: Bid;
};
export default function BidItem({ user, bid }: Props) {
  let bidderIsCurrentUser = bid.bidder === user?.username;
  let chatPosition = bidderIsCurrentUser ? "chat-end" : "chat-start";

  function getBidInfo() {
    let color = "";
    let text = "";
    switch (bid.bidStatus) {
      case "Accepted":
        color = "chat-bubble-accent";
        text = "Bid Accepted";
        break;
      case "AcceptedBelowReserve":
        color = "chat-bubble-secondary";
        text = "Reserve not met";
        break;
      case "TooLow":
        color = "chat-bubble-warning";
        text = "Reserve not met";
        break;
      default:
        text = "Invalid bid";
        break;
    }
    return { color, text };
  }

  const bidInfo = getBidInfo();

  return (
    <div className={`chat ${chatPosition}`}>
      <div className="chat-image avatar placeholder">
        <div
          className={`w-10 rounded-full ${
            bidderIsCurrentUser ? "bg-accent" : "bg-primary"
          }`}
        >
          <span className={`${bidderIsCurrentUser && "text-accent-content"}`}>
            {bid.bidder.slice(0, 2).toUpperCase()}
          </span>
        </div>
      </div>
      <div className="chat-header flex flex-row gap-2">
        {!bidderIsCurrentUser && <div>{bid.bidder.toUpperCase()}</div>}
        <time className="text-xs opacity-50">
          {DateTimeHelper(bid.bidTime)}
        </time>
      </div>
      <div className={`chat-bubble ${bidInfo.color}`}>
        I placed a bid for ${CurrencyFormatHelper(bid.amount)}
      </div>
      <div className="chat-footer opacity-50">{bidInfo.text}</div>
    </div>
  );
}
