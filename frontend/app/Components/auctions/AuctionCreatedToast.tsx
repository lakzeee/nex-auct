import { Auction } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  auction: Auction;
};

export default function AuctionCreatedToast({ auction }: Props) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/auctions/details/${auction.id}`)}
      className="flex flex-row items-center bg-neutral gap-4 hover:cursor-pointer shadow-lg"
    >
      <Image
        src={auction.imageUrl}
        alt="img"
        height={60}
        width={60}
        className="mask mask-circle w-auto h-auto"
      />
      <span className="text-accent-content">
        New Auction! {auction.make} {auction.model} has been added
      </span>
    </div>
  );
}
