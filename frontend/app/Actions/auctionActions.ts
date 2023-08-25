"use server";

import { Auction, PageResult } from "@/types";

export async function getData(query: string): Promise<PageResult<Auction>> {
  const res = await fetch(`http://localhost:6001/search${query}`);
  console.log(`http://localhost:6001/search${query}`);
  if (!res.ok) throw new Error("Fail to fetch data");
  return res.json();
}
