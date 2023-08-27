import Heading from "@/app/Components/layout/Heading";
import AuctionForm from "@/app/Components/auctions/AuctionForm";
import { getDetailViewData } from "@/app/Actions/auctionActions";

export default async function Update({ params }: { params: { id: string } }) {
  const data = await getDetailViewData(params.id);
  return (
    <div className="mx-auto max-w-[75%] shadow-lg p-10 bg-neutral-focus rounded-lg">
      <Heading
        title="Update your auction"
        subTitle="Please update the detail of your car"
      />
      <AuctionForm auction={data} />
    </div>
  );
}
