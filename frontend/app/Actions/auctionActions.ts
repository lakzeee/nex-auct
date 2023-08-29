"use server";

import { Auction, Bid, PageResult } from "@/types";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { FieldValues } from "react-hook-form";
import { revalidatePath } from "next/cache";

export async function getData(query: string): Promise<PageResult<Auction>> {
  return await fetchWrapper.get(`search${query}`);
}

export async function updateAuctionTest() {
  const data = {
    mileage: Math.floor(Math.random() * 100000) + 1,
  };
  return await fetchWrapper.put(
    "auctions/403ab113-e97a-4674-aac6-77a69635ea98",
    data,
  );
}

export async function createAuction(data: FieldValues) {
  return await fetchWrapper.post("auctions", data);
}

export async function getDetailViewData(id: string): Promise<Auction> {
  return await fetchWrapper.get(`auctions/${id}`);
}

export async function updateAuction(data: FieldValues, id: string) {
  const res = await fetchWrapper.put(`auctions/${id}`, data);
  revalidatePath(`auctions/${id}`);
  return res;
}

export async function deleteAuction(id: string) {
  const res = await fetchWrapper.del(`auctions/${id}`);
  revalidatePath("/");
  return res;
}

export async function getBidsForAuctionByAuctionId(id: string): Promise<Bid[]> {
  return await fetchWrapper.get(`bids/${id}`);
}

export async function placeBidForAuctionByAuctionId(
  auctionId: string,
  amount: number,
) {
  return await fetchWrapper.post(
    `bids?auctionId=${auctionId}&amount=${amount}`,
    {},
  );
}
