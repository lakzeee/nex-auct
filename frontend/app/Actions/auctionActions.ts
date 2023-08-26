"use server";

import { Auction, PageResult } from "@/types";
import { getTokenWorkAround } from "@/app/Actions/authActions";

export async function getData(query: string): Promise<PageResult<Auction>> {
  const res = await fetch(`http://localhost:6001/search${query}`);
  if (!res.ok) throw new Error("Fail to fetch data");
  return res.json();
}

export async function UpdateAuctionTest() {
  const token = await getTokenWorkAround();
  const data = {
    make: "ford",
    model: "UpdatedAgain222",
    color: "red",
    mileage: Math.floor(Math.random() * 100000) + 1,
    year: 1999,
  };

  const res = await fetch(
    "http://localhost:6001/auctions/403ab113-e97a-4674-aac6-77a69635ea98",
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token?.access_token,
      },
      body: JSON.stringify(data),
    },
  );
  if (!res.ok) return { status: res.status, message: res.statusText };
  return res.statusText;
}
