import { Bid } from "@/types";
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

type State = {
  bids: Bid[];
  open: boolean;
};

type Actions = {
  setBids: (bids: Bid[]) => void;
  addBid: (bid: Bid) => void;
  setOpen: (value: boolean) => void;
};

export const useBidStore = createWithEqualityFn<State & Actions>(
  (set) => ({
    bids: [],
    open: true,
    setBids: (bids: Bid[]) => {
      set(() => ({
        bids,
      }));
    },
    addBid: (bid: Bid) => {
      set((state) => ({
        bids: !state.bids.find((x) => x.id === bid.id)
          ? [bid, ...state.bids]
          : [...state.bids],
      }));
    },
    setOpen: (value: boolean) => {
      set(() => ({
        open: value,
      }));
    },
  }),
  shallow,
);
