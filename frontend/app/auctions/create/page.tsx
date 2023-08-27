import Heading from "@/app/Components/layout/Heading";
import AuctionForm from "@/app/Components/auctions/AuctionForm";

export default function Create() {
  return (
    <div className="mx-auto max-w-[75%] shadow-lg p-10 bg-neutral-focus rounded-lg">
      <Heading
        title="Start a auction"
        subTitle="Please enter the detail of your car"
      />
      <AuctionForm />
    </div>
  );
}
