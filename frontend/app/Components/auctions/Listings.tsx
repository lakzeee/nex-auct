"use client";

import AuctionCard from "@/app/Components/auctions/AuctionCard";
import AppPagination from "@/app/Components/layout/AppPagination";
import { getData } from "@/app/Actions/auctionActions";
import { useEffect, useState } from "react";
import Filters from "@/app/Components/auctions/Filters";
import { useParamsStore } from "@/app/Components/hooks/useParamsStore";
import qs from "query-string";
import EmptyFilter from "@/app/Components/auctions/EmptyFilter";
import { useAuctionStore } from "@/app/Components/hooks/useAuctionStore";

export default function Listings() {
  const [loading, setLoading] = useState(true);
  const params = useParamsStore((state) => ({
    pageNumber: state.pageNumber,
    pageSize: state.pageSize,
    searchTerm: state.searchTerm,
    orderBy: state.orderBy,
    filterBy: state.filterBy,
    seller: state.seller,
    winner: state.winner,
  }));
  const data = useAuctionStore((state) => ({
    auctions: state.auctions,
    totalCount: state.totalCount,
    pageCount: state.pageCount,
  }));

  const setParams = useParamsStore((state) => state.setParams);
  const setData = useAuctionStore((state) => state.setData);
  const url = qs.stringifyUrl({ url: "", query: params });

  function setPageNumber(pageNumber: number) {
    setParams({ pageNumber });
  }

  useEffect(() => {
    getData(url).then((data) => {
      setData(data);
      setLoading(false);
    });
  }, [url, setData]);

  if (loading)
    return (
      <div className="flex h-screen justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <>
      <Filters />
      {data.totalCount === 0 ? (
        <EmptyFilter showReset={true} />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {data &&
              data.auctions.map((auction) => (
                <AuctionCard auction={auction} key={auction.id} />
              ))}
          </div>
          <div className="flex justify-center my-4">
            <AppPagination
              currentPage={params.pageNumber}
              pageCount={data.pageCount}
              pageChanged={setPageNumber}
            />
          </div>
        </>
      )}
    </>
  );
}
