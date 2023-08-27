"use client";
import { FieldValues, useForm } from "react-hook-form";
import FormInput from "@/app/Components/auctions/FormInput";
import { useEffect } from "react";
import DateInput from "@/app/Components/auctions/DateInput";
import { createAuction, updateAuction } from "@/app/Actions/auctionActions";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Auction } from "@/types";

type Props = {
  auction?: Auction;
};
export default function AuctionForm({ auction }: Props) {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setFocus,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onTouched",
  });

  const curPath = usePathname();

  useEffect(() => {
    if (auction) {
      const { make, model, color, mileage, year, imageUrl } = auction;
      reset({ make, model, color, mileage, year, imageUrl });
    }

    setFocus("make");
  }, [setFocus]);

  async function onSubmit(data: FieldValues) {
    try {
      let id = "";
      let res;
      let actionType;
      if (curPath === "/auctions/create") {
        res = await createAuction(data);
        id = res.id;
        actionType = "Create";
      } else {
        if (auction) {
          res = await updateAuction(data, auction.id);
          id = auction.id;
          actionType = "Update";
        }
      }

      if (res.error) {
        throw res.error;
      }
      router.push(`/auctions/details/${id}`);
      toast.success(`${actionType} auction success!`);
    } catch (error: any) {
      toast.error(`Something went wrong, ${error.message}`);
    }
  }

  return (
    <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        label="Make"
        name="make"
        control={control}
        rules={{ required: "Make is required" }}
      />
      <FormInput
        label="Model"
        name="model"
        control={control}
        rules={{ required: "Model is required" }}
      />
      <FormInput
        label="Color"
        name="color"
        control={control}
        rules={{ required: "Color is required" }}
      />
      <div className="grid grid-cols-2 gap-2">
        <FormInput
          label="Year"
          name="year"
          control={control}
          rules={{ required: "Year is required" }}
          type="number"
        />
        <FormInput
          label="Mileage"
          name="mileage"
          control={control}
          rules={{ required: "Mileage is required" }}
          type="number"
        />
      </div>
      <FormInput
        label="Image URL"
        name="imageUrl"
        control={control}
        rules={{ required: "Image URL is required" }}
      />
      {curPath === "/auctions/create" && (
        <div className="grid md:grid-cols-2 md:gap-2">
          <FormInput
            label="Reserve Price (Enter 0 if none)"
            name="reservePrice"
            control={control}
            rules={{ required: "reservePrice is required" }}
            type="number"
          />
          <DateInput
            showTimeSelect
            label="Auction End Date"
            name="auctionEnd"
            control={control}
            rules={{ required: "Mileage is required" }}
            type="date"
            dateFormat="dd MMMM yyyy h:mm a"
          />
        </div>
      )}
      <div className="flex justify-between gap-4">
        <button type="button" className="btn btn-outline rounded-full">
          Cancel
        </button>
        <button
          type="submit"
          className={`btn btn-primary rounded-full ${
            !isValid && "btn-disabled btn-outline"
          }`}
        >
          {isSubmitting && <span className="loading loading-spinner" />}
          Submit
        </button>
      </div>
    </form>
  );
}
