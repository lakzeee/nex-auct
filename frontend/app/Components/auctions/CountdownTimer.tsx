"use client";
import Countdown, { zeroPad } from "react-countdown";

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

  // if (completed) {
  //   return <span>Finished</span>;
  // } else {
  //   return (
  //     <span>
  //       {days}:{hours}:{minutes}:{seconds}
  //     </span>
  //   );
  // }
}

export default function CountdownTimer({ auctionEnd }: Props) {
  return (
    <div>
      <Countdown date={auctionEnd} renderer={renderer} />
    </div>
  );
}
