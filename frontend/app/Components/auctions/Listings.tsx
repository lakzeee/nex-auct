"use client";

import AuctionCard from "@/app/Components/auctions/AuctionCard";
import AppPagination from "@/app/Components/layout/AppPagination";
import { getData } from "@/app/Actions/auctionActions";
import { useEffect, useState } from "react";
import { Auction, PageResult } from "@/types";
import Filters from "@/app/Components/auctions/Filters";
import { useParamsStore } from "@/app/Components/hooks/useParamsStore";
import qs from "query-string";
import EmptyFilter from "@/app/Components/auctions/EmptyFilter";

export default function Listings() {
  const [data, setData] = useState<PageResult<Auction>>();
  const params = useParamsStore((state) => ({
    pageNumber: state.pageNumber,
    pageSize: state.pageSize,
    searchTerm: state.searchTerm,
    orderBy: state.orderBy,
    filterBy: state.filterBy,
  }));
  const setParams = useParamsStore((state) => state.setParams);
  const url = qs.stringifyUrl({ url: "", query: params });

  function setPageNumber(pageNumber: number) {
    setParams({ pageNumber });
  }

  useEffect(() => {
    getData(url).then((data) => {
      setData(data);
    });
  }, [url]);

  if (!data) return <h3>...Loading</h3>;

  return (
    <>
      <Filters />
      {data.totalCount === 0 ? (
        <EmptyFilter showReset={true} />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {data &&
              data.results.map((auction) => (
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
