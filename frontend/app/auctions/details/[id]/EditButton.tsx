"use client";
import { useRouter } from "next/navigation";

import {
  RxCheckCircled,
  RxCrossCircled,
  RxPencil2,
  RxTrash,
} from "react-icons/rx";
import { useState } from "react";
import { deleteAuction } from "@/app/Actions/auctionActions";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;
import toast from "react-hot-toast";

type Props = {
  id: string;
};
export default function EditButton({ id }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleDelete() {
    deleteAuction(id)
      .then((res) => {
        if (res.error) throw res.error();
        router.push("/");
        toast.success("Auction has been removed!");
      })
      .catch((error) => {
        toast.error("Something went wrong", error.message);
      });
  }

  return (
    <>
      <div className="join my-4">
        <button
          onClick={() => router.push(`/auctions/update/${id}`)}
          className="join-item btn btn-sm btn-outline"
        >
          <RxPencil2 size={20} />
          Update
        </button>

        <button
          // @ts-ignore
          onClick={() => window.delete_modal.showModal()}
          className="join-item btn btn-sm btn-outline"
        >
          <RxTrash size={20} />
          Delete
        </button>
      </div>
      <dialog id="delete_modal" className="modal modal-middle">
        <form method="dialog" className="modal-box max-w-sm">
          <h3 className="font-bold text-accent text-lg">
            Confirm your deletion
          </h3>
          <p>Are you sure about this?</p>
          <div className="modal-action gap-2">
            <button className="btn btn-sm btn-outline">
              <RxCrossCircled size={20} />
              Cancel
            </button>
            <button className="btn btn-sm btn-outline" onClick={handleDelete}>
              <RxCheckCircled size={20} />
              Confirm
            </button>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
