"use client";
import Countdown, { zeroPad } from "react-countdown";
import { useBidStore } from "@/app/Components/hooks/useBidStore";
import { usePathname } from "next/navigation";

type TimerProps = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
};

type Props = {
  auctionEnd: string;
};

function renderer({ days, hours, minutes, seconds, completed }: TimerProps) {
  return (
    <div
      suppressHydrationWarning={true}
      className={`badge ${
        completed
          ? "badge-error"
          : days === 0 && hours < 10
          ? "badge-warning"
          : "badge-info"
      }`}
    >
      {completed
        ? "Auction Ended"
        : `${zeroPad(days)}:${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(
            seconds,
          )}`}
    </div>
  );
}

export default function CountdownTimerBadge({ auctionEnd }: Props) {
  const setOpen = useBidStore((state) => state.setOpen);
  const curPath = usePathname();

  function auctionFinished() {
    if (curPath.startsWith("/auctions/details")) setOpen(false);
  }

  return (
    <div>
      <Countdown
        date={auctionEnd}
        renderer={renderer}
        onComplete={auctionFinished}
      />
    </div>
  );
}
